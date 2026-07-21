using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for Paratext project directories
/// </summary>
internal class LocalParatextProjects : IDisposable
{
    #region Constructors, consts, and fields

    // Inside each project's "home" directory, these are the subdirectories and files
    protected const string PROJECT_SETTINGS_FILE = "Settings.xml";

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

    private FileSystemWatcher? _projectDirectoryWatcher;
    private Timer? _projectChangeDebounceTimer;
    private readonly object _projectChangeLock = new();

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
    /// Emit <see cref="PROJECTS_CHANGED_EVENT_TYPE"/> so project-list consumers refetch their cheap
    /// metadata. Call after a project is added/removed or after one of its display-backing settings
    /// changes. Fire-and-forget: a failure to notify only means a stale list until the next refresh,
    /// and must never fail the mutation that triggered it. No-op when constructed without a
    /// <see cref="PapiClient"/> (tests/tooling).
    /// </summary>
    public void NotifyProjectsChanged()
    {
        if (_papiClient == null)
            return;
        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
            _papiClient.SendEventAsync(PROJECTS_CHANGED_EVENT_TYPE, null),
            $"Emitting {PROJECTS_CHANGED_EVENT_TYPE}"
        );
    }

    /// <summary>
    /// Best-effort watch of the project root for projects added or removed on disk by ANY source - a
    /// Send/Receive clone, an out-of-process install, or a manual copy - so the project-list
    /// consumers refresh even when the change did not go through a code path we notify inline (DBL
    /// install/uninstall and setting writes already call <see cref="NotifyProjectsChanged"/>
    /// directly).
    ///
    /// Watches only <see cref="PROJECT_SETTINGS_FILE"/> create/delete/rename (a project IS its
    /// Settings.xml), via <see cref="NotifyFilters.FileName"/> - never content writes and never other
    /// files - so the constant churn of normal editing (scripture text, comments, notes) never
    /// triggers a refresh. Events are debounced because a clone/install writes in a burst.
    ///
    /// A no-op without a <see cref="PapiClient"/> (nothing to notify; also keeps tests/tooling from
    /// spinning up a real watcher). FileSystemWatcher is unreliable on some platforms (WSL mounts,
    /// network drives), so this is a safety net layered on the inline notifications, never the sole
    /// mechanism.
    /// </summary>
    protected void StartWatchingProjectDirectory()
    {
        if (_papiClient == null)
            return;
        try
        {
            var watcher = new FileSystemWatcher(ProjectRootFolder, PROJECT_SETTINGS_FILE)
            {
                IncludeSubdirectories = true,
                NotifyFilter = NotifyFilters.FileName,
            };
            watcher.Created += OnProjectSettingsFileChanged;
            watcher.Deleted += OnProjectSettingsFileChanged;
            watcher.Renamed += OnProjectSettingsFileChanged;
            watcher.EnableRaisingEvents = true;
            _projectDirectoryWatcher = watcher;
        }
        catch (Exception ex)
        {
            // A watcher failure just means we fall back to the inline notifications; never fatal.
            Console.Error.WriteLine($"Could not watch project directory for changes: {ex}");
        }
    }

    private void OnProjectSettingsFileChanged(object sender, FileSystemEventArgs e)
    {
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
        _projectDirectoryWatcher?.Dispose();
        _projectChangeDebounceTimer?.Dispose();
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
        return ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly);
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
