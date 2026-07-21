using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for Paratext project directories
/// </summary>
internal class LocalParatextProjects : IDisposable
{
    #region Constructors, consts, and fields

    /// <summary>
    /// Directory inside a project's root directory where Platform.Bible's extension data is stored
    /// </summary>
    public const string EXTENSION_DATA_SUBDIRECTORY = "shared/platform.bible/extensions";

    private bool _isInitialized = false;
    private readonly object _initializationLock = new();

    /// <summary>
    /// PAPI client used to emit <see cref="PROJECTS_CHANGED_EVENT_TYPE"/>. Null in tests/tooling that
    /// construct this without one; <see cref="NotifyProjectsChanged"/> is then a no-op.
    /// </summary>
    private readonly PapiClient? _papiClient;

    /// <summary>
    /// Network event fired when the set of available projects changes (a project is added or
    /// removed) or when a project's display metadata (name/fullName/language/languageTag/isEditable)
    /// changes. Consumers (the project picker, Home, New Tab) refetch cheap project metadata when it
    /// fires. Keep identical to the `platform.onDidChangeProjects` string the TS consumers subscribe
    /// to via `getNetworkEvent` (renderer `use-project-picker-data.hook.ts` and the get-resources
    /// `use-local-projects.hook.ts`).
    /// </summary>
    public const string PROJECTS_CHANGED_EVENT_TYPE = "platform.onDidChangeProjects";

    /// <summary>
    /// Debounce window for coalescing a burst of project-directory changes (e.g. a clone or install
    /// writing several files) into a single refresh + notify.
    /// </summary>
    private static readonly TimeSpan s_projectChangeDebounce = TimeSpan.FromMilliseconds(500);

    // Live watchers over the fixed set of ParatextData containers (root, _projectsById,
    // _Resources, _resourcesById). All non-recursive; count is bounded by that fixed set, never
    // by project count or .hg depth.
    private readonly List<FileSystemWatcher> _watchers = [];

    // Container directories currently watched, so lazy-attach is idempotent. Guarded, together
    // with _watchers, by _watchersLock (watcher events arrive on background threads).
    private readonly HashSet<string> _watchedContainerPaths = new(StringComparer.OrdinalIgnoreCase);
    private readonly object _watchersLock = new();

    // Set first in Dispose (before the watcher/timer teardown it guards), so an in-flight
    // AttachContainerWatcher/event-handler thread racing the Dispose sees it and backs off instead
    // of registering a watcher into (or touching a timer of) an already-disposed instance.
    private volatile bool _disposed;

    private Timer? _projectChangeDebounceTimer;
    private readonly object _projectChangeLock = new();

    // By-GUID sibling of the project root that ParatextData also enumerates for projects
    // (ScrTextCollection.GetProjectFolders). The name is a private const in ParatextData
    // (projectsByIdDirName); mirror it here and keep in sync.
    private const string PROJECTS_BY_ID_DIR_NAME = "_projectsById";

    // By-GUID sibling resource container that ParatextData also enumerates
    // (ScrTextCollection.GetResourceProjectNames). The name is a private const in ParatextData
    // (resourcesByIdDirName); mirror it here and keep in sync.
    private const string RESOURCES_BY_ID_DIR_NAME = "_resourcesById";

    /// <summary>
    /// Debounce window for coalescing a burst of <see cref="NotifyProjectsChanged"/> calls into a
    /// single emitted event. Every consumer does a full metadata refetch per event, so collapsing a
    /// burst (e.g. the inline setting-write notify plus the watcher catching that same on-disk write,
    /// or several display-setting writes in a row) avoids redundant refetch storms.
    /// </summary>
    private static readonly TimeSpan s_notifyDebounce = TimeSpan.FromMilliseconds(500);

    private Timer? _notifyDebounceTimer;
    private readonly object _notifyLock = new();

    private readonly List<string> _requiredProjectRootFiles =
    [
        "usfm.sty",
        "usfm_sb.sty",
        "Attribution.md",
        "CountryStatuses.xml",
    ];

    // Published projects are read-only in PT9 — ResourceProjectFileManager.SetXml() throws
    // AttemptedResourceWritingException — and cannot accept comment writes. They therefore do not
    // advertise legacyCommentManager.comments; everything else still applies because published
    // projects can still be read for scripture and resource-references. The unpublished list is
    // defined as the published list plus the comment interface so the two stay in sync by
    // construction.
    private static readonly List<string> s_paratextPublishedProjectInterfaces =
    [
        ProjectInterfaces.BASE,
        ProjectInterfaces.USFM_BOOK,
        ProjectInterfaces.USFM_CHAPTER,
        ProjectInterfaces.USFM_VERSE,
        ProjectInterfaces.USX_BOOK,
        ProjectInterfaces.USX_CHAPTER,
        ProjectInterfaces.USX_VERSE,
        ProjectInterfaces.PLAIN_TEXT_VERSE,
        ProjectInterfaces.MARKER_NAMES,
        ProjectInterfaces.TEXT_CONNECTION_SETTINGS,
        ProjectInterfaces.USER_EDITOR_SETTINGS,
        ProjectInterfaces.SCRIPTURE_EDIT_PERMISSIONS,
        ProjectInterfaces.VERSIFICATION,
    ];

    private static readonly List<string> s_paratextUnpublishedProjectInterfaces =
    [
        .. s_paratextPublishedProjectInterfaces,
        ProjectInterfaces.LEGACY_COMMENT,
    ];

    public LocalParatextProjects(PapiClient? papiClient = null)
    {
        // Optional so tests/tooling can construct this without a PAPI client (NotifyProjectsChanged
        // is then a no-op). Production passes the real client from Program.cs.
        _papiClient = papiClient;

        // E2E tests (and other tooling) can point the app at an isolated projects folder so runs
        // don't touch the user's real projects; Initialize() installs the bundled sample WEB
        // project into an empty root. See e2e-tests/fixtures/helpers.ts (isolatedProjectRoot).
        string? projectRootOverride = Environment.GetEnvironmentVariable(
            "PLATFORM_BIBLE_PROJECT_ROOT_FOLDER"
        );
        if (string.IsNullOrWhiteSpace(projectRootOverride))
        {
            ProjectRootFolder = Path.Join(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                ".platform.bible",
                "projects",
                "Paratext 9 Projects"
            );
        }
        else
        {
            Console.WriteLine(
                $"PLATFORM_BIBLE_PROJECT_ROOT_FOLDER is set; overriding project root folder to: {projectRootOverride}"
            );
            ProjectRootFolder = projectRootOverride;
        }
    }

    #endregion

    #region Public properties and methods

    public virtual void Initialize()
    {
        if (_isInitialized)
            return;

        lock (_initializationLock)
        {
            if (_isInitialized)
                return;

            // Both marks live inside the double-checked critical section so they bracket the one
            // real scan: Initialize is re-entered by the second factory at startup and by every
            // first PDP creation per project, and marking outside the guards would emit a
            // dangling/duplicate mark on each of those calls, corrupting the startup waterfall.
            Services.StartupTiming.Mark("project-scan-start");

            // Make sure the necessary directory and files exist for the project root folder
            SetUpProjectRootFolder();

            // Set up the ScrTextCollection and read the projects in that folder
            ParatextGlobals.Initialize(ProjectRootFolder);

            Console.WriteLine(
                $"Projects loaded from {ProjectRootFolder}: {string.Join(",", GetScrTexts().Select(scrText => scrText.Name))}"
            );

            // If there are no projects available anywhere, throw in the sample WEB one
            if (!GetScrTexts().Any())
            {
                Console.WriteLine("No projects found. Setting up sample WEB project");
                SetUpSampleProject();

                ScrTextCollection.RefreshScrTexts();
            }

            _isInitialized = true;
            Services.StartupTiming.Mark("project-scan-end");

            // Start watching for projects added/removed on disk out-of-band (e.g. a Send/Receive
            // clone or an install done out-of-process). Done here, not in the ctor, so the root
            // folder exists (SetUpProjectRootFolder above) and setup happens once under the lock.
            StartWatchingProjectDirectory();
        }
    }

    /// <summary>
    /// Ask project-list consumers to refetch their cheap metadata by emitting
    /// <see cref="PROJECTS_CHANGED_EVENT_TYPE"/>. Call after a project is added/removed or after one
    /// of its display-backing settings changes. Debounced (see <see cref="s_notifyDebounce"/>) so a
    /// burst - notably the inline notify plus the watcher catching that same on-disk write - coalesces
    /// into a single event instead of a refetch storm. Fire-and-forget: a failure to notify only means
    /// a stale list until the next refresh, and must never fail the mutation that triggered it. No-op
    /// when constructed without a <see cref="PapiClient"/> (tests/tooling).
    /// </summary>
    public void NotifyProjectsChanged()
    {
        if (_papiClient == null)
            return;
        // Symmetric with ScheduleProjectDirectoriesChanged: a racing post-Dispose call must not
        // touch a debounce timer that may already be disposed.
        if (_disposed)
            return;
        lock (_notifyLock)
        {
            _notifyDebounceTimer ??= new Timer(_ => EmitProjectsChanged());
            _notifyDebounceTimer.Change(s_notifyDebounce, Timeout.InfiniteTimeSpan);
        }
    }

    private void EmitProjectsChanged()
    {
        if (_papiClient == null)
            return;
        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
            _papiClient.SendEventAsync(PROJECTS_CHANGED_EVENT_TYPE, null),
            $"Emitting {PROJECTS_CHANGED_EVENT_TYPE}"
        );
    }

    /// <summary>
    /// Best-effort watch of the ParatextData container directories for projects or resources
    /// added/removed/updated on disk by ANY source - a Send/Receive clone, an out-of-process
    /// install, or a manual copy - so the project-list consumers refresh even when the change did
    /// not go through a code path we notify inline (DBL install/uninstall and metadata setting
    /// writes already call <see cref="NotifyProjectsChanged"/> directly).
    ///
    /// One non-recursive watcher per container in the fixed set ParatextData enumerates
    /// (<c>ScrTextCollection.GetProjectFolders</c>/<c>GetResourceProjectNames</c>): the root and
    /// <see cref="PROJECTS_BY_ID_DIR_NAME"/> for project folders being added/removed/renamed, and
    /// <c>_Resources</c>/<c>_resourcesById</c> for resource files. Because none are recursive, a
    /// project's <c>.hg</c> Mercurial churn and scripture/comment writes (all grandchildren of a
    /// container) are never watched. An in-place <c>Settings.xml</c> rewrite is likewise invisible
    /// and is instead notified inline by its writer.
    ///
    /// Optional containers are created on demand, so the always-on root watcher lazily attaches
    /// them when it sees them appear (see <see cref="OnRootContainerEvent"/>). A no-op without a
    /// <see cref="PapiClient"/> (nothing to notify; also keeps tests/tooling from spinning up real
    /// watchers). FileSystemWatcher is unreliable on some platforms (WSL mounts, network drives),
    /// so this is a safety net layered on the inline notifications, never the sole mechanism.
    /// </summary>
    protected void StartWatchingProjectDirectory()
    {
        if (_papiClient == null)
            return;

        // The root always exists (SetUpProjectRootFolder). Its watcher also lazily attaches the
        // optional containers as they appear.
        AttachRootWatcher();
        // Attach any optional containers that already exist at startup.
        EnsureOptionalContainerWatchers();
    }

    /// <summary>
    /// Watch the project root non-recursively for a project FOLDER being added/removed/renamed.
    /// Uses <see cref="OnRootContainerEvent"/> so it also lazily attaches optional containers.
    /// </summary>
    private void AttachRootWatcher() =>
        AttachContainerWatcher(
            ProjectRootFolder,
            NotifyFilters.DirectoryName,
            resourceExtensionFilters: false,
            handler: OnRootContainerEvent
        );

    /// <summary>
    /// Attach the optional ParatextData containers that currently exist. Idempotent (each attach
    /// is a no-op if the directory is missing or already watched), so it is safe to call at
    /// startup and again whenever the root watcher sees a new top-level directory.
    /// </summary>
    private void EnsureOptionalContainerWatchers()
    {
        // Project container (by GUID): watch folder add/remove/rename, like the root.
        AttachContainerWatcher(
            Path.Combine(ProjectRootFolder, PROJECTS_BY_ID_DIR_NAME),
            NotifyFilters.DirectoryName,
            resourceExtensionFilters: false,
            handler: OnContainerEvent
        );
        // Resource containers: watch resource files (.p8z/.xml1z) add/remove/rename plus an
        // in-place overwrite with a newer version.
        AttachContainerWatcher(
            Path.Combine(ProjectRootFolder, ScrTextCollection.resourcesDirName),
            NotifyFilters.FileName | NotifyFilters.LastWrite,
            resourceExtensionFilters: true,
            handler: OnContainerEvent
        );
        AttachContainerWatcher(
            Path.Combine(ProjectRootFolder, RESOURCES_BY_ID_DIR_NAME),
            NotifyFilters.FileName | NotifyFilters.LastWrite,
            resourceExtensionFilters: true,
            handler: OnContainerEvent
        );
    }

    /// <summary>
    /// Attach one non-recursive watcher for a container directory, if it exists and is not already
    /// watched. Best-effort: any failure logs and is swallowed (the inline notifications remain).
    /// </summary>
    /// <param name="directory">Container directory to watch.</param>
    /// <param name="notifyFilter">
    /// <see cref="NotifyFilters.DirectoryName"/> for project containers (folder add/remove/rename)
    /// or <see cref="NotifyFilters.FileName"/> | <see cref="NotifyFilters.LastWrite"/> for resource
    /// containers (file add/remove/rename/in-place-update).
    /// </param>
    /// <param name="resourceExtensionFilters">
    /// When true, restrict to the two resource extensions ParatextData enumerates; when false
    /// (project containers), no name filter.
    /// </param>
    /// <param name="handler">Change handler (<see cref="OnRootContainerEvent"/> for the root).</param>
    private void AttachContainerWatcher(
        string directory,
        NotifyFilters notifyFilter,
        bool resourceExtensionFilters,
        FileSystemEventHandler handler
    )
    {
        if (!Directory.Exists(directory) || !TryReserveContainer(directory))
            return;
        try
        {
            var watcher = new FileSystemWatcher(directory)
            {
                IncludeSubdirectories = false,
                NotifyFilter = notifyFilter,
            };
            if (resourceExtensionFilters)
            {
                // Only the two extensions ParatextData enumerates as resources
                // (ScrTextCollection.GetResourceProjectNames).
                watcher.Filters.Add("*" + ProjectFileManager.resourceFileExtension); // *.p8z
                watcher.Filters.Add("*" + ProjectFileManager.xmlResourceFileExtension); // *.xml1z
            }
            watcher.Created += handler;
            watcher.Deleted += handler;
            // Renamed is a RenamedEventHandler, not a FileSystemEventHandler, so a
            // FileSystemEventHandler variable cannot be added directly (delegate-type conversion,
            // unlike method-group conversion, is not contravariant). Adapt via a lambda;
            // RenamedEventArgs derives from FileSystemEventArgs, so passing it through is safe.
            watcher.Renamed += (s, e) => handler(s, e);
            // Content updates matter only for resource files (an in-place overwrite with a newer
            // version); project-container folders have no meaningful Changed signal we act on.
            if (resourceExtensionFilters)
                watcher.Changed += handler;
            // The watcher's internal buffer can overflow during a large burst (dropping events
            // silently), so recover by scheduling the same refresh + notify rather than going stale.
            watcher.Error += OnProjectDirectoryWatcherError;
            watcher.EnableRaisingEvents = true;
            Register(watcher);
        }
        catch (Exception ex)
        {
            // Roll back the reservation so a later retry (e.g. a subsequent root event) can attach.
            ReleaseContainer(directory);
            Console.Error.WriteLine($"Could not watch project container '{directory}': {ex}");
        }
    }

    private bool TryReserveContainer(string directory)
    {
        lock (_watchersLock)
            return _watchedContainerPaths.Add(directory);
    }

    private void ReleaseContainer(string directory)
    {
        lock (_watchersLock)
            _watchedContainerPaths.Remove(directory);
    }

    private void Register(FileSystemWatcher watcher)
    {
        lock (_watchersLock)
        {
            // Dispose ran while this watcher was being constructed/wired (it is live -
            // EnableRaisingEvents was already set before this call): don't hand it to a
            // post-Dispose _watchers, dispose it directly so it doesn't leak.
            if (_disposed)
            {
                watcher.Dispose();
                return;
            }
            _watchers.Add(watcher);
        }
    }

    private void OnContainerEvent(object sender, FileSystemEventArgs e) =>
        ScheduleProjectDirectoriesChanged();

    /// <summary>
    /// Root-container change handler. A new top-level directory may be one of the optional
    /// ParatextData containers (<see cref="PROJECTS_BY_ID_DIR_NAME"/>, <c>_Resources</c>,
    /// <c>_resourcesById</c>) being created for the first time; attach its watcher now (idempotent)
    /// so subsequent changes inside it are seen, then schedule the refresh.
    /// </summary>
    private void OnRootContainerEvent(object sender, FileSystemEventArgs e)
    {
        EnsureOptionalContainerWatchers();
        ScheduleProjectDirectoriesChanged();
    }

    /// <summary>
    /// The watcher's internal buffer overflowed (or it otherwise faulted), so events were dropped and
    /// a project add/remove/edit may have been missed. Log it and schedule the same refresh + notify
    /// so the lists resync rather than silently going stale.
    /// </summary>
    private void OnProjectDirectoryWatcherError(object sender, ErrorEventArgs e)
    {
        Console.Error.WriteLine(
            $"Project directory watcher error (events may have been dropped); forcing a refresh: {e.GetException()}"
        );
        ScheduleProjectDirectoriesChanged();
    }

    private void ScheduleProjectDirectoriesChanged()
    {
        // A watcher event/error can race Dispose (see Dispose's comment); back off rather than
        // touching a debounce timer that may already be disposed.
        if (_disposed)
            return;
        // Debounce: a clone/install fires a burst of events; collapse them into one refresh+notify.
        lock (_projectChangeLock)
        {
            _projectChangeDebounceTimer ??= new Timer(_ => OnProjectDirectoriesChanged());
            _projectChangeDebounceTimer.Change(s_projectChangeDebounce, Timeout.InfiniteTimeSpan);
        }
    }

    /// <summary>
    /// Run (debounced, on a timer thread) when a project was added/removed on disk. Refreshes
    /// ParatextData's collection so the change is reflected, then notifies consumers. Best-effort: a
    /// refresh failure must not suppress the notify (a stale collection is better than a permanently
    /// stale list). Virtual so tests can observe firings without mutating the global
    /// <c>ScrTextCollection</c>.
    /// </summary>
    protected virtual void OnProjectDirectoriesChanged()
    {
        try
        {
            ScrTextCollection.RefreshScrTexts();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"RefreshScrTexts failed after a project directory change: {ex}"
            );
        }
        NotifyProjectsChanged();
    }

    public virtual void Dispose()
    {
        // Set first (before any teardown below) so a racing AttachContainerWatcher/Register or a
        // racing watcher-event handler sees it and backs off (Register disposes rather than
        // re-adding; ScheduleProjectDirectoriesChanged/NotifyProjectsChanged return early) instead
        // of touching an already-disposed timer.
        _disposed = true;
        lock (_watchersLock)
        {
            foreach (var watcher in _watchers)
                watcher.Dispose();
            _watchers.Clear();
            _watchedContainerPaths.Clear();
        }
        _projectChangeDebounceTimer?.Dispose();
        _notifyDebounceTimer?.Dispose();
        GC.SuppressFinalize(this);
    }

    /// <summary>
    /// All available Paratext projects (the union of <see cref="GetAvailableUnpublishedProjectDetails"/>
    /// and <see cref="GetAvailablePublishedProjectDetails"/>). Defined in terms of the partition
    /// helpers so future filtering added to either partition automatically applies here too.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAllProjectDetails()
    {
        return GetAvailableUnpublishedProjectDetails()
            .Concat(GetAvailablePublishedProjectDetails());
    }

    /// <summary>
    /// Available unpublished Paratext projects (regular, editable scripture projects).
    /// Used by <see cref="ParatextProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailableUnpublishedProjectDetails()
    {
        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes); everything else is unpublished.
        return GetVisibleScrTexts()
            .Where(scrText => !scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Available published Paratext projects (read-only DBL / biblical resources).
    /// Used by <see cref="ParatextPublishedProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailablePublishedProjectDetails()
    {
        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes).
        return GetVisibleScrTexts()
            .Where(scrText => scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Returns the set of ScrTexts that should be visible to the user given current registration
    /// state. When the user has no valid Paratext registration, published projects are filtered out
    /// entirely (matching PT9 behavior).
    /// </summary>
    private static IEnumerable<ScrText> GetVisibleScrTexts()
    {
        var allScrTexts = GetScrTexts();
        if (!RegistrationInfo.DefaultUser.IsValid)
            allScrTexts = allScrTexts.Where((scrText) => !scrText.IsResourceProject);
        return allScrTexts;
    }

    public ProjectDetails GetProjectDetails(string projectId)
    {
        return GetParatextProject(projectId).GetProjectDetails();
    }

    public static ScrText GetParatextProject(string projectId)
    {
        var retVal = ScrTextCollection.GetById(HexId.FromStr(projectId));
        if (retVal.IsResourceProject && !RegistrationInfo.DefaultUser.IsValid)
            throw new RegistrationRequiredException();
        return retVal;
    }

    public static List<string> GetParatextProjectInterfaces(bool isPublished)
    {
        var source = isPublished
            ? s_paratextPublishedProjectInterfaces
            : s_paratextUnpublishedProjectInterfaces;
        return [.. source];
    }
    #endregion

    #region Protected properties and methods

    protected virtual string ProjectRootFolder { get; }

    protected static void CreateDirectory(string dir)
    {
        if (Directory.Exists(dir))
            return;

        if (OperatingSystem.IsWindows())
            Directory.CreateDirectory(dir);
        else
            Directory.CreateDirectory(
                dir,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute
            );
    }

    #endregion

    #region Private properties and methods

    private static IEnumerable<ScrText> GetScrTexts()
    {
        // Snapshot under the ScrTextArbitrator lock - the same lock ScrTextCollection's own mutators
        // (RefreshScrTexts/Add/DeleteProject) take - and materialize before returning, so enumerating
        // the project list (e.g. during a metadata fetch on an RPC thread) can't race the background
        // watcher's RefreshScrTexts and throw "collection was modified". ScrTextCollection.ScrTexts is
        // lazy and takes no lock of its own.
        using (ScrTextArbitrator.GetLock())
            return ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly).ToList();
    }

    private static void AddProjectToScrTextCollection(ProjectDetails projectDetails)
    {
        var projectPath = projectDetails.HomeDirectory;

        var projectName = new ProjectName
        {
            ShortName = projectDetails.Name,
            ProjectPath = projectPath,
        };
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    private void SetUpProjectRootFolder()
    {
        CreateDirectory(ProjectRootFolder);

        // Add usfm.sty and Attribution.md
        foreach (string requiredFile in _requiredProjectRootFiles)
        {
            string basePath = AppContext.BaseDirectory;
            string sourcePath = Path.Combine(basePath, "assets", requiredFile);
            string dest = Path.Join(ProjectRootFolder, requiredFile);
            File.Copy(sourcePath, dest, true);
        }
    }

    private void SetUpSampleProject()
    {
        string projectName = "WEB";
        string projectFolderName = projectName;
        string projectFolder = Path.Join(ProjectRootFolder, projectFolderName);

        CreateDirectory(Path.Join(projectFolder));

        var projectInAssets = Path.Join(AppContext.BaseDirectory, "assets", projectName);
        foreach (string filePath in Directory.GetFiles(projectInAssets, "*.*"))
        {
            File.Copy(filePath, filePath.Replace(projectInAssets, Path.Join(projectFolder)));
        }
    }

    #endregion
}
