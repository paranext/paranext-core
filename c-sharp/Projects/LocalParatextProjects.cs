using System.Collections.Concurrent;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects.SendReceive;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.ProjectFileUpdates;
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

    // True once the full project scan (and its follow-on setup: sample-project install, watchers)
    // has completed. Volatile: read lock-free by the list getters to switch from snapshot-served
    // to live results.
    private volatile bool _isFullScanComplete = false;
    private readonly object _initializationLock = new();

    // True once minimal ParatextData initialization (project root setup +
    // ParatextGlobals.Initialize, WITHOUT the project scan in snapshot mode) has completed.
    private volatile bool _isMinimalInitialized = false;
    private readonly object _minimalInitializationLock = new();

    // Completed when minimal initialization finishes so targeted pre-scan loads can wait for it
    // (bounded) without taking the initialization locks.
    private readonly TaskCompletionSource _minimalInitializedSource =
        new(TaskCreationOptions.RunContinuationsAsynchronously);

    // Snapshot mode state. _snapshotEntries is written once (before the volatile
    // _isInSnapshotMode publish) and immutable afterwards, so readers need no locking.
    private volatile bool _isInSnapshotMode = false;
    private volatile IReadOnlyList<ProjectMetadataSnapshotEntry>? _snapshotEntries;
    private volatile string? _appVersion;
    private readonly Lazy<ProjectMetadataSnapshotStore> _snapshotStore;

    // Scan gate (snapshot mode only): the full scan does not start before _scanNotBeforeTicks
    // (UTC ticks) so pre-scan targeted loads - which make first-scripture interactive - are not
    // slowed by a concurrent full scan. Every targeted load slides the deadline out by
    // s_scanGateActivitySlide, capped at (gate armed time + s_scanGateCap); a targeted-load
    // fallback collapses it to run the scan immediately. Interlocked (64-bit fields).
    private long _scanNotBeforeTicks;
    private long _scanGateArmedAtTicks;

    // Sticky collapse flag: once a fallback (or test) collapses the gate, a concurrent
    // SlideScanGate must not re-arm it - the fallback's scan wait must stay bounded by the scan,
    // not the gate. Checked by SlideScanGate and WaitForScanGate; never reset.
    private volatile bool _isScanGateCollapsed;
    private static readonly TimeSpan s_scanGateActivitySlide = TimeSpan.FromSeconds(2);
    private static readonly TimeSpan s_scanGateCap = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan s_scanGatePollInterval = TimeSpan.FromMilliseconds(50);

    // Single-flight lock per project id for targeted pre-scan loads, so concurrent requests for
    // the same project construct its ScrText once. Entries are never removed; the map is bounded
    // by the number of distinct requested project ids.
    private readonly ConcurrentDictionary<string, object> _targetedLoadLocksById =
        new(StringComparer.OrdinalIgnoreCase);

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
    // of registering a watcher into (or touching a timer of) an already-disposed instance. The
    // debounce-timer schedulers read it INSIDE their debounce lock — the same lock Dispose tears
    // the timer down under — so check-then-schedule is atomic with the teardown; a bare read
    // before the lock would leave a window to Change a disposed timer, or to construct a new
    // timer after Dispose that nothing ever disposes.
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

        // Lazy (thread-safe) rather than constructed eagerly because ProjectRootFolder is virtual
        // and a derived override's backing state is not initialized until after this constructor
        // runs. Assigned after ProjectRootFolder above so nullable flow analysis knows the
        // captured property is definitely assigned.
        _snapshotStore = new Lazy<ProjectMetadataSnapshotStore>(
            () => new ProjectMetadataSnapshotStore(ProjectRootFolder)
        );
    }

    #endregion

    #region Public properties and methods

    public virtual void Initialize()
    {
        EnsureFullScanCompleted();
    }

    /// <summary>
    /// Attempts to enter snapshot mode for this session: loads the persisted project-metadata
    /// snapshot and, when it is valid for <paramref name="appVersion"/>, serves project lists (and
    /// targeted project loads) from it until the full scan completes. Call once at startup, before
    /// <see cref="Initialize"/> or <see cref="EnsureMinimalInitialized"/> runs (Program.cs calls it
    /// pre-barrier). When no valid snapshot exists this only records the app version (used to write
    /// the snapshot at scan end) and the startup flow is unchanged.
    /// </summary>
    public void TryEnterSnapshotMode(string appVersion)
    {
        _appVersion = appVersion;
        Services.StartupTiming.Mark("snapshot-load-start");
        ProjectMetadataSnapshot? snapshot = _snapshotStore.Value.TryLoad(appVersion);
        Services.StartupTiming.Mark("snapshot-load-end");
        if (snapshot == null)
            return;

        _snapshotEntries = snapshot.Projects.AsReadOnly();
        long armedAtTicks = DateTime.UtcNow.Ticks;
        Interlocked.Exchange(ref _scanGateArmedAtTicks, armedAtTicks);
        Interlocked.Exchange(ref _scanNotBeforeTicks, armedAtTicks + s_scanGateActivitySlide.Ticks);
        _isInSnapshotMode = true;
        Console.WriteLine(
            $"Serving {snapshot.Projects.Count} project(s) from the metadata snapshot until the "
                + "full project scan completes"
        );
    }

    /// <summary>
    /// Whether a valid metadata snapshot was loaded for this session (see
    /// <see cref="TryEnterSnapshotMode"/>). Stays true after the full scan completes; the list
    /// getters additionally check <see cref="_isFullScanComplete"/> to switch to live results.
    /// </summary>
    public bool IsInSnapshotMode => _isInSnapshotMode;

    /// <summary>
    /// Idempotent minimal initialization: project root folder setup plus
    /// <see cref="ParatextGlobals.Initialize"/> - in snapshot mode WITHOUT the initial project
    /// scan (deferred; see <see cref="PlatformScrTextCollection.DeferInitialProjectRefresh"/>).
    /// This is everything a targeted project load needs before constructing a ScrText. Virtual so
    /// test doubles that fake projects can no-op it.
    /// </summary>
    public virtual void EnsureMinimalInitialized()
    {
        if (!_isMinimalInitialized)
        {
            lock (_minimalInitializationLock)
            {
                if (!_isMinimalInitialized)
                {
                    try
                    {
                        // Make sure the necessary directory and files exist for the project root
                        // folder
                        SetUpProjectRootFolder();

                        // Set up the ScrTextCollection (and, when not deferring, read the projects
                        // in that folder)
                        ParatextGlobals.Initialize(
                            ProjectRootFolder,
                            deferProjectScan: _isInSnapshotMode
                        );

                        _isMinimalInitialized = true;
                    }
                    catch (Exception ex)
                    {
                        // Fault the completion source so targeted-load waiters fail fast to the
                        // full-scan fallback instead of burning their bounded timeout on a task
                        // that will never complete. A completion source is one-shot, so if a later
                        // retry of this method succeeds, the source stays faulted (TrySetResult on
                        // a faulted source is a no-op) and targeted loads keep using the full-scan
                        // fallback - a safe, degraded state.
                        _minimalInitializedSource.TrySetException(ex);
                        throw;
                    }
                }
            }
        }
        // Outside the lock so continuations never run under it. TrySetResult: idempotent (and a
        // no-op on a source a failed earlier attempt already faulted - see the catch above).
        _minimalInitializedSource.TrySetResult();
    }

    /// <summary>
    /// Idempotent full initialization: minimal initialization plus the full project scan,
    /// sample-project install for an empty root, directory watchers, and (when an app version is
    /// known) snapshot reconciliation + rewrite. In snapshot mode this first waits for the scan
    /// gate (see <see cref="_scanNotBeforeTicks"/>). With no snapshot in play the flow (and its
    /// startup marks) is exactly the pre-snapshot Initialize.
    /// </summary>
    private void EnsureFullScanCompleted()
    {
        if (_isFullScanComplete)
            return;

        lock (_initializationLock)
        {
            if (_isFullScanComplete)
                return;

            // In snapshot mode, hold off the scan while targeted loads are getting first
            // scripture interactive (each load slides the deadline; a fallback collapses it).
            WaitForScanGate();

            // Both marks live inside the double-checked critical section so they bracket the one
            // real scan: Initialize is re-entered by the second factory at startup and by every
            // first PDP creation per project, and marking outside the guards would emit a
            // dangling/duplicate mark on each of those calls, corrupting the startup waterfall.
            Services.StartupTiming.Mark("project-scan-start");

            // Project root folder setup + ParatextData initialization (includes the scan when no
            // snapshot deferred it). No-op if the factories already ran it in snapshot mode.
            EnsureMinimalInitialized();

            if (_isInSnapshotMode)
            {
                // The initialize-time refresh was deferred; run the real scan now. Clear the
                // deferral first in case the deferred refresh never ran (e.g. ParatextData was
                // already pointed at the project root), so THIS refresh cannot be the one skipped.
                PlatformScrTextCollection.CancelInitialProjectRefreshDeferral();
                ScrTextCollection.RefreshScrTexts();
            }

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

            _isFullScanComplete = true;
            Services.StartupTiming.Mark("project-scan-end");

            // Start watching for projects added/removed on disk out-of-band (e.g. a Send/Receive
            // clone or an install done out-of-process). Done here, not in the ctor, so the root
            // folder exists (SetUpProjectRootFolder above) and setup happens once under the lock.
            StartWatchingProjectDirectory();

            // Correct any stale snapshot-served metadata (notify) and persist a fresh snapshot
            // for the next run. No-op when TryEnterSnapshotMode never ran (tests/tooling).
            ReconcileSnapshotAfterScan();
        }
    }

    /// <summary>
    /// Blocks (snapshot mode only) until the scan gate deadline passes. Polls so a concurrent
    /// <see cref="CollapseScanGate"/> takes effect promptly; bounded because the deadline is
    /// capped at gate-arm time + <see cref="s_scanGateCap"/>.
    /// </summary>
    private void WaitForScanGate()
    {
        if (!_isInSnapshotMode || _isScanGateCollapsed)
            return;
        if (DateTime.UtcNow.Ticks >= Interlocked.Read(ref _scanNotBeforeTicks))
            return;

        Services.StartupTiming.Mark("project-scan-gate-wait");
        while (!_disposed)
        {
            // The sticky flag is authoritative: even if a racing slide's CAS re-armed the ticks
            // after a collapse, a collapsed gate never makes the scan wait.
            if (_isScanGateCollapsed)
                return;
            long remainingTicks = Interlocked.Read(ref _scanNotBeforeTicks) - DateTime.UtcNow.Ticks;
            if (remainingTicks <= 0)
                return;
            var remaining = TimeSpan.FromTicks(remainingTicks);
            Thread.Sleep(remaining < s_scanGatePollInterval ? remaining : s_scanGatePollInterval);
        }
    }

    /// <summary>
    /// Pushes the scan gate deadline out by <see cref="s_scanGateActivitySlide"/> from now (never
    /// pulling an existing later deadline in), capped at gate-arm time +
    /// <see cref="s_scanGateCap"/>. Called on each targeted load so the scan doesn't compete with
    /// getting first scripture interactive.
    /// </summary>
    private void SlideScanGate()
    {
        long candidateTicks = DateTime.UtcNow.Ticks + s_scanGateActivitySlide.Ticks;
        long capTicks = Interlocked.Read(ref _scanGateArmedAtTicks) + s_scanGateCap.Ticks;
        if (candidateTicks > capTicks)
            candidateTicks = capTicks;
        while (true)
        {
            // Sticky collapse: never re-arm a collapsed gate. Re-checked each iteration so a
            // collapse racing this loop wins; the unavoidable window where a collapse lands
            // between this check and a winning CAS is harmless because WaitForScanGate also
            // checks the flag.
            if (_isScanGateCollapsed)
                return;
            long currentTicks = Interlocked.Read(ref _scanNotBeforeTicks);
            if (
                candidateTicks <= currentTicks
                || Interlocked.CompareExchange(
                    ref _scanNotBeforeTicks,
                    candidateTicks,
                    currentTicks
                ) == currentTicks
            )
                return;
        }
    }

    /// <summary>
    /// Collapses the scan gate so a pending/future <see cref="EnsureFullScanCompleted"/> proceeds
    /// immediately. Used by the targeted-load fallback (its wait is then bounded by the scan
    /// itself, not the gate) and by tests. Sticky: a later <see cref="SlideScanGate"/> cannot
    /// re-arm the gate.
    /// </summary>
    internal void CollapseScanGate()
    {
        _isScanGateCollapsed = true;
        Interlocked.Exchange(ref _scanNotBeforeTicks, 0);
    }

    /// <summary>Current scan-gate deadline (UTC ticks; 0 = no wait). For tests only.</summary>
    internal long ScanGateNotBeforeTicksForTesting => Interlocked.Read(ref _scanNotBeforeTicks);

    /// <summary>
    /// At scan end: diffs what consumers were actually SERVED pre-scan against what live
    /// enumeration serves now and asks them to refetch when the two differ (stale display
    /// metadata, ghost projects, new projects, or an entry the serve-time filtering hid), then
    /// rewrites the snapshot for the next run. Runs on a background task (fire-and-forget) so it
    /// never extends the startup critical path; requires <see cref="TryEnterSnapshotMode"/> to
    /// have recorded an app version (otherwise today's flow is preserved exactly and nothing is
    /// written).
    /// </summary>
    private void ReconcileSnapshotAfterScan()
    {
        string? appVersion = _appVersion;
        if (appVersion == null)
            return;
        IReadOnlyList<ProjectMetadataSnapshotEntry>? servedEntries = _snapshotEntries;
        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
            Task.Run(() =>
            {
                // The full, unfiltered capture is what gets persisted (registration state is a
                // serve-time filter, never an invalidation/persistence concern).
                List<ProjectMetadataSnapshotEntry> freshEntries =
                    ProjectMetadataSnapshotStore.BuildEntries(GetScrTexts());
                if (servedEntries != null && DidServedResultsChange(servedEntries, freshEntries))
                    NotifyProjectsChanged();
                _snapshotStore.Value.WriteSnapshot(freshEntries, appVersion);
            }),
            "Reconciling project metadata snapshot after scan"
        );
    }

    /// <summary>
    /// Whether what consumers were served pre-scan differs from what live serving returns now.
    /// Both sides are the SERVED views, not the raw lists: the snapshot side gets the same
    /// liveness + registration filtering <see cref="GetServableSnapshotEntries"/> applied at
    /// serve time, and the fresh side gets the registration filter
    /// (<see cref="GetVisibleScrTexts"/>'s rule; fresh entries are live by definition). Raw-list
    /// comparison would miss a serve-time filtering discrepancy - e.g. an entry the liveness
    /// check hid while the scan produced an identical raw entry (a snapshot-schema bug once made
    /// this the fate of every joined HEB/GRK entry) - and consumers would keep the filtered list
    /// until something else notified. Registration state is read once here; a registration change
    /// between serve time and scan end is corrected by that change's own notify.
    /// </summary>
    private static bool DidServedResultsChange(
        IReadOnlyList<ProjectMetadataSnapshotEntry> servedEntries,
        IReadOnlyList<ProjectMetadataSnapshotEntry> freshEntries
    )
    {
        bool includeResources = RegistrationInfo.DefaultUser.IsValid;
        List<ProjectMetadataSnapshotEntry> servedFiltered = FilterToServableEntries(
            servedEntries,
            includeResources
        );
        List<ProjectMetadataSnapshotEntry> liveFiltered =
        [
            .. freshEntries.Where(entry => includeResources || !entry.IsResource),
        ];
        return !AreEntryListsEquivalent(servedFiltered, liveFiltered);
    }

    private static bool AreEntryListsEquivalent(
        IReadOnlyList<ProjectMetadataSnapshotEntry> first,
        IReadOnlyList<ProjectMetadataSnapshotEntry> second
    )
    {
        // Order-insensitive: the scan's enumeration order is not meaningful. Record value
        // equality covers every field.
        return first
            .OrderBy(entry => entry.Id, StringComparer.Ordinal)
            .SequenceEqual(second.OrderBy(entry => entry.Id, StringComparer.Ordinal));
    }

    /// <summary>
    /// Refresh ParatextData's in-memory project list from disk
    /// (<see cref="ScrTextCollection.RefreshScrTexts()"/>) and then ask project-list consumers to
    /// refetch via <see cref="NotifyProjectsChanged"/>. For writers whose on-disk changes are
    /// invisible to the project-directory watcher — the watcher is non-recursive, so an in-place
    /// <c>Settings.xml</c> rewrite or a mid-clone state landing during a Send/Receive never
    /// reaches it (see <see cref="StartWatchingProjectDirectory"/>) — and that therefore must both
    /// re-read the project set and notify inline themselves. Also the funnel for the watcher path
    /// (<see cref="OnProjectDirectoriesChanged"/> delegates here). Best-effort: a refresh failure
    /// must not suppress the notify (a stale collection is better than a permanently stale list).
    /// No-op until the full project scan completes — refreshing before then would broadcast a
    /// bogus project-list change. Virtual so tests can substitute the ParatextData refresh.
    /// </summary>
    public virtual void RefreshAndNotifyProjectsChanged()
    {
        // Post-Dispose there is no consumer left to serve, so skip the refresh. Best-effort
        // early-out only: the notify debounce timer itself is guarded atomically inside
        // NotifyProjectsChanged (checked under _notifyLock), so a call racing Dispose past this
        // check is still safe.
        if (_disposed)
            return;
        // Before the full scan completes there is nothing to refresh yet, so a caller landing
        // early (e.g. a sync completing before startup initialization finishes) would broadcast a
        // bogus project-list change. Two distinct pre-scan states are covered by this one check:
        // pre-Initialize, where the ScrTextCollection is not set up at all (ParatextGlobals
        // .Initialize has not run); and snapshot mode, where it IS set up but its initial project
        // refresh is deliberately deferred - refreshing here would run the deferred scan out from
        // under EnsureFullScanCompleted, outside its lock and bypassing the scan gate that keeps
        // first scripture interactive. The full scan (and its snapshot reconciliation) supersedes
        // any call skipped here. Lock-free read matches the scan's own fast-path check.
        if (!_isFullScanComplete)
            return;
        try
        {
            ScrTextCollection.RefreshScrTexts();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"RefreshScrTexts failed during a project-list refresh; notifying consumers anyway: {ex}"
            );
        }
        NotifyProjectsChanged();
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
        lock (_notifyLock)
        {
            // Read under the lock — Dispose tears the timer down under this same lock — so
            // check-then-schedule is atomic with the teardown. Checked before the lock, a call
            // racing Dispose could Change an already-disposed timer (ObjectDisposedException)
            // or, if no notify had ever been scheduled, construct a brand-new timer AFTER
            // Dispose that nothing ever disposes and that later emits against a disposing
            // PapiClient.
            if (_disposed)
                return;
            _notifyDebounceTimer ??= new Timer(_ => EmitProjectsChanged());
            _notifyDebounceTimer.Change(s_notifyDebounce, Timeout.InfiniteTimeSpan);
        }
    }

    private void EmitProjectsChanged()
    {
        // Second line of defence for a callback already in flight when Dispose ran —
        // Timer.Dispose() does not wait for in-flight callbacks — so a dying timer does not
        // emit against a disposing PapiClient.
        if (_disposed)
            return;
        if (_papiClient == null)
            return;
        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
            _papiClient.SendEventAsync(PROJECTS_CHANGED_EVENT_TYPE, null),
            $"Emitting {PROJECTS_CHANGED_EVENT_TYPE}"
        );
        // Keep the persisted snapshot fresh: every projects-changed burst (post-scan only, so a
        // pre-scan notify can never persist snapshot-served data as if it were live) rewrites it
        // with current live metadata. Fire-and-forget like the notify itself.
        string? appVersion = _appVersion;
        if (_isFullScanComplete && appVersion != null)
        {
            ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
                Task.Run(
                    () =>
                        _snapshotStore.Value.WriteSnapshot(
                            ProjectMetadataSnapshotStore.BuildEntries(GetScrTexts()),
                            appVersion
                        )
                ),
                "Rewriting project metadata snapshot after projects changed"
            );
        }
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
        FileSystemWatcher? watcher = null;
        try
        {
            watcher = new FileSystemWatcher(directory)
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
            // Dispose the partially-constructed watcher: it never reached Register(), so nothing
            // else owns its native handle, and leaving it for GC finalization keeps the underlying
            // inotify instance held longer than necessary (the exact pressure this attach failure
            // may itself be caused by).
            watcher?.Dispose();
            Console.Error.WriteLine($"Could not watch project container '{directory}': {ex}");
        }
    }

    // A reserved container path is deliberately never released on container deletion: an external
    // process deleting AND recreating one of these well-known containers at runtime is rare, and the
    // always-on root watcher still fires a full RefreshScrTexts on both the delete and the recreate,
    // which catches the common case. Only changes landing well after a recreate's debounce window are
    // missed - an accepted best-effort-safety-net gap (see the design's accepted gaps).
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
        // Debounce: a clone/install fires a burst of events; collapse them into one refresh+notify.
        lock (_projectChangeLock)
        {
            // A watcher event/error can race Dispose; read under the lock — Dispose tears this
            // timer down under this same lock — so check-then-schedule is atomic with the
            // teardown. Same shape and rationale as NotifyProjectsChanged.
            if (_disposed)
                return;
            _projectChangeDebounceTimer ??= new Timer(_ => OnProjectDirectoriesChanged());
            _projectChangeDebounceTimer.Change(s_projectChangeDebounce, Timeout.InfiniteTimeSpan);
        }
    }

    /// <summary>
    /// Run (debounced, on a timer thread) when a project was added/removed on disk. Delegates to
    /// <see cref="RefreshAndNotifyProjectsChanged"/> — the shared refresh-then-notify funnel,
    /// including its best-effort contract (a refresh failure must not suppress the notify). Virtual
    /// so tests can observe firings without mutating the global <c>ScrTextCollection</c>.
    /// </summary>
    protected virtual void OnProjectDirectoriesChanged() => RefreshAndNotifyProjectsChanged();

    /// <summary>
    /// Tear down the watchers and debounce timers. Safe to race with watcher events and notify
    /// calls: <see cref="_disposed"/> is set first, and each debounce timer is disposed under the
    /// same lock its scheduler checks <see cref="_disposed"/> under, so a racing scheduler either
    /// backs off or completes its schedule entirely before the teardown — it can never Change a
    /// disposed timer nor construct a new one after disposal.
    /// </summary>
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
        // Each timer's teardown happens under the same lock its scheduler checks _disposed under
        // (see the summary above). Deadlock-free: no timer callback holds either lock while
        // waiting on Dispose (EmitProjectsChanged takes no locks; OnProjectDirectoriesChanged only
        // briefly re-takes _notifyLock inside NotifyProjectsChanged), and Timer.Dispose() does not
        // block on in-flight callbacks.
        lock (_projectChangeLock)
            _projectChangeDebounceTimer?.Dispose();
        lock (_notifyLock)
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
        // Before the full scan completes in snapshot mode, serve from the persisted snapshot.
        List<ProjectMetadataSnapshotEntry>? snapshotEntries = GetServableSnapshotEntries();
        if (snapshotEntries != null)
        {
            return snapshotEntries
                .Where(entry => !entry.IsResource)
                .Select(CreateProjectDetailsFromSnapshotEntry);
        }

        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes); everything else is unpublished.
        return GetVisibleScrTexts()
            .Where(scrText => !scrText.IsResourceProject)
            .Select(TryGetProjectDetails)
            .OfType<ProjectDetails>();
    }

    /// <summary>
    /// Available published Paratext projects (read-only DBL / biblical resources).
    /// Used by <see cref="ParatextPublishedProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailablePublishedProjectDetails()
    {
        // Before the full scan completes in snapshot mode, serve from the persisted snapshot.
        List<ProjectMetadataSnapshotEntry>? snapshotEntries = GetServableSnapshotEntries();
        if (snapshotEntries != null)
        {
            return snapshotEntries
                .Where(entry => entry.IsResource)
                .Select(CreateProjectDetailsFromSnapshotEntry);
        }

        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes).
        return GetVisibleScrTexts()
            .Where(scrText => scrText.IsResourceProject)
            .Select(TryGetProjectDetails)
            .OfType<ProjectDetails>();
    }

    /// <summary>
    /// The snapshot entries that may be served right now, or null when live results must be used
    /// (no snapshot mode, or the full scan has completed). Applies the liveness check (an entry
    /// deleted on disk since the snapshot was written is hidden) and the same serve-time
    /// registration filter as <see cref="GetVisibleScrTexts"/>. Lock-free: a volatile flag read
    /// plus an immutable list.
    /// </summary>
    private List<ProjectMetadataSnapshotEntry>? GetServableSnapshotEntries()
    {
        if (_isFullScanComplete || !_isInSnapshotMode)
            return null;
        IReadOnlyList<ProjectMetadataSnapshotEntry>? entries = _snapshotEntries;
        if (entries == null)
            return null;
        return FilterToServableEntries(entries, RegistrationInfo.DefaultUser.IsValid);
    }

    /// <summary>
    /// The single definition of serve-time snapshot filtering (registration + liveness), shared
    /// by pre-scan serving and by the scan-end reconciliation diff so the two can never disagree
    /// about what was served.
    /// </summary>
    private static List<ProjectMetadataSnapshotEntry> FilterToServableEntries(
        IEnumerable<ProjectMetadataSnapshotEntry> entries,
        bool includeResources
    )
    {
        return
        [
            .. entries.Where(entry =>
                (includeResources || !entry.IsResource) && IsSnapshotEntryLive(entry)
            ),
        ];
    }

    /// <summary>
    /// Whether the project a snapshot entry describes still exists on disk: the resource file for
    /// resources, the project folder otherwise. Guards against serving (or targeted-loading) a
    /// project deleted since the snapshot was written.
    /// </summary>
    private static bool IsSnapshotEntryLive(ProjectMetadataSnapshotEntry entry)
    {
        // A joined entry's FullPath is its OT member's path (see
        // ProjectMetadataSnapshotStore.BuildEntries), and that member may be a resource file
        // (real HEB/GRK) or a project folder (any projects a user happened to name HEB/GRK), so
        // accept either shape.
        if (entry.IsJoined)
            return File.Exists(entry.FullPath) || Directory.Exists(entry.FullPath);
        return entry.IsResource || entry.IsXmlResource
            ? File.Exists(entry.FullPath)
            : Directory.Exists(entry.HomeDirectory);
    }

    /// <summary>
    /// Projects a snapshot entry to the same <see cref="ProjectDetails"/> shape live enumeration
    /// produces (<c>ScrTextExtensions.GetProjectDetails</c>), re-deriving ProjectInterfaces from
    /// the current interface lists rather than anything persisted.
    /// </summary>
    private static ProjectDetails CreateProjectDetailsFromSnapshotEntry(
        ProjectMetadataSnapshotEntry entry
    )
    {
        return new ProjectDetails(
            entry.Name,
            new ProjectMetadata(
                entry.Id,
                GetParatextProjectInterfaces(isPublished: entry.IsResource),
                name: entry.Name,
                fullName: entry.FullName,
                language: entry.Language,
                languageTag: entry.LanguageTag,
                isEditable: entry.IsEditable,
                isPublished: entry.IsResource
            ),
            entry.HomeDirectory
        );
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

    /// <summary>
    /// Resolves a project by id against the already-loaded <c>ScrTextCollection</c>, throwing
    /// <see cref="ProjectNotFoundException"/> for an unknown id.
    /// <para>
    /// Snapshot-mode caveat: before the full scan completes at startup, a project that has not
    /// been targeted-loaded yet is NOT in the collection, so during that window this throws even
    /// for a valid id. The static consumers (CheckRunner, ChecklistService, ManageBooksService,
    /// VersificationConversionService, the PDP methods, ...) are user-request-driven with TS-side
    /// retry and must tolerate that transient failure; startup-time probes must instead use the
    /// instance's <see cref="GetParatextProjectOrLoadTargeted"/> (see
    /// <c>InventoryDataProvider.StartDataProviderAsync</c>).
    /// </para>
    /// </summary>
    public static ScrText GetParatextProject(string projectId)
    {
        var retVal = ScrTextCollection.GetById(HexId.FromStr(projectId));
        return EnsureRegistrationAllowsProject(retVal);
    }

    /// <summary>
    /// Returns the project's <see cref="ScrText"/>, loading it on demand from its snapshot entry
    /// when the full scan hasn't completed yet (snapshot mode). Behavior:
    /// <list type="bullet">
    ///   <item>Already in the collection (scan done or previously loaded): returned directly
    ///     (with the same registration check as <see cref="GetParatextProject"/>).</item>
    ///   <item>Scan complete or no snapshot: exactly <see cref="GetParatextProject"/> - including
    ///     today's throw for an unknown id.</item>
    ///   <item>Otherwise: single-flight targeted construction from the snapshot entry. Any miss
    ///     (no entry, joined text, deleted on disk, failed validation, lost race) falls back to
    ///     collapsing the scan gate, completing the full scan, and resolving live - so the wait is
    ///     bounded by the scan itself and an unknown project still fails with today's error.</item>
    /// </list>
    /// </summary>
    public ScrText GetParatextProjectOrLoadTargeted(string projectId)
    {
        HexId projectHexId = HexId.FromStr(projectId);
        ScrText? existing = ScrTextCollection.FindById(projectHexId);
        if (existing != null)
            return EnsureRegistrationAllowsProject(existing);

        if (_isFullScanComplete || !_isInSnapshotMode)
            return GetParatextProject(projectId);

        ProjectMetadataSnapshotEntry? entry = _snapshotEntries?.FirstOrDefault(candidate =>
            candidate.Id.Equals(projectId, StringComparison.OrdinalIgnoreCase)
        );
        // Joined texts are assembled by the full scan (never targeted-loaded), and a dead path
        // means the snapshot is stale for this project; both resolve via the full scan.
        if (entry == null || entry.IsJoined || !IsSnapshotEntryLive(entry))
            return LoadViaFullScanFallback(projectId);

        // Same serve-time registration rule as GetParatextProject, checked before construction so
        // an unregistered session never loads resource projects at all.
        if (entry.IsResource && !RegistrationInfo.DefaultUser.IsValid)
            throw new RegistrationRequiredException();

        object targetedLoadLock = _targetedLoadLocksById.GetOrAdd(entry.Id, _ => new object());
        lock (targetedLoadLock)
        {
            // Re-check under the single-flight lock: another caller (or the scan) may have loaded
            // this project while we waited.
            existing = ScrTextCollection.FindById(projectHexId);
            if (existing != null)
                return EnsureRegistrationAllowsProject(existing);
            if (_isFullScanComplete)
                return GetParatextProject(projectId);
            return LoadTargetedProject(entry, projectHexId, projectId);
        }
    }

    /// <summary>
    /// Constructs and indexes one project's <see cref="ScrText"/> from its snapshot entry,
    /// mirroring the full refresh's cheap validations (space-in-name, guid, data version,
    /// migration) and its writable-project file updates. Any validation failure or exception
    /// falls back to the full scan. Caller holds the per-project single-flight lock.
    /// </summary>
    private ScrText LoadTargetedProject(
        ProjectMetadataSnapshotEntry entry,
        HexId projectHexId,
        string projectId
    )
    {
        // Per project id so concurrent/subsequent loads of different projects each get a readable
        // start/end pair in the waterfall (same convention as "activate-start <extension>").
        Services.StartupTiming.MarkOnce($"targeted-project-load-start {projectId}");
        // Give first-scripture work room before the full scan starts competing for I/O.
        SlideScanGate();

        // Bounded wait for minimal ParatextData initialization (kicked in the background by the
        // PDP factories in snapshot mode); fall back to the (self-initializing) full scan if it
        // doesn't arrive in time - or fail fast to that same fallback when initialization
        // faulted (EnsureMinimalInitialized faults the source) instead of burning the timeout.
        // RunTask returns true without throwing for an already-faulted task but lets Wait throw
        // for a task that faults mid-wait, so both shapes are handled here.
        Task minimalInitialization = _minimalInitializedSource.Task;
        bool minimalInitializationCompleted;
        try
        {
            minimalInitializationCompleted = ThreadingUtils.RunTask(
                minimalInitialization,
                $"Minimal initialization before targeted load of project {projectId}",
                ThreadingUtils.DefaultTimeout
            );
        }
        catch (AggregateException)
        {
            minimalInitializationCompleted = true; // Completed by faulting; IsFaulted below.
        }
        if (!minimalInitializationCompleted || minimalInitialization.IsFaulted)
            return LoadViaFullScanFallback(projectId);

        try
        {
            // Mirror the refresh's "space in name" rejection.
            if (entry.Name.Contains(' '))
                return LoadViaFullScanFallback(projectId);

            if (ScrTextCollection.Implementation is not PlatformScrTextCollection scrTextCollection)
                return LoadViaFullScanFallback(projectId);

            // The path-based ProjectName constructor derives IsResource/IsXmlResource from the
            // extension exactly like the scan's enumeration does (those setters are private, so
            // the constructor is the only way to set them). Pin ShortName to the snapshot's name.
            var projectName = new ProjectName(entry.FullPath) { ShortName = entry.Name };
            ScrText scrText = scrTextCollection.CreateScrTextForProjectName(projectName);

            // Mirror the refresh's cheap validations. A guid missing or - unlike the refresh,
            // which trusts enumeration - not matching the requested id (a stale snapshot whose
            // path now holds a different project) resolves via the full scan.
            if (scrText.Guid == null || !scrText.Guid.Equals(projectHexId))
                return LoadViaFullScanFallback(projectId);
            // The refresh converts this rare shape (an XML resource file that is not a resource
            // project) to XmlProjectScrText; let the scan handle it rather than duplicating that.
            if (scrText.IsXmlResource && !scrText.IsResourceProject)
                return LoadViaFullScanFallback(projectId);
            // Mirror the refresh's corrupted-project rejection (a missing/placeholder language
            // code); the scan makes such a project unsupported, so a targeted load must never
            // serve it.
            if (scrText.Settings.LanguageID == null || scrText.Settings.LanguageID.Code == "")
                return LoadViaFullScanFallback(projectId);
            if (
                scrText.Settings.MinParatextDataVersion
                > ParatextInfo.MaxSupportedParatextDataVersion
            )
                return LoadViaFullScanFallback(projectId);
            // Mirror the refresh's unknown-project-type rejection (also made unsupported there).
            if (!scrText.Settings.TranslationInfo.Type.IsKnownProjectType())
                return LoadViaFullScanFallback(projectId);
            if (scrText.NeedsMigration)
                return LoadViaFullScanFallback(projectId);

            if (scrText.FileManager.IsWritable)
            {
                // Send/Receive write gate: PerformUpdates mutates the project (commits pending
                // changes to Mercurial and rewrites project files), so it must run inside a write
                // scope, held tightly around just this mutation. If an automatic Send/Receive is
                // syncing this project (the gate's fail-fast sentinel), resolve via the full scan
                // instead - the scan's own PerformUpdates runs inside ParatextData, outside this
                // gate's responsibility.
                try
                {
                    using var writeScope = SendReceiveWriteLock.EnterWrite(projectId);
                    ProjectFileUpdateManager.Get(scrText).PerformUpdates();
                }
                catch (InvalidOperationException ex)
                    when (ex.Message.EndsWith(
                            SendReceiveWriteLock.EditBlockedSentinel,
                            StringComparison.Ordinal
                        )
                    )
                {
                    return LoadViaFullScanFallback(projectId);
                }
            }

            // Tell the (deferred) first real refresh it must assemble joined texts itself. Set
            // BEFORE the Add so a refresh that takes the arbitrator lock in between can never
            // observe the added text while missing the flag (which would skip the joined-text
            // repair). A spuriously set flag on the failure paths below only costs one idempotent
            // UpdateJoinedTexts.
            PlatformScrTextCollection.NotePreScanTargetedAdd();
            try
            {
                ScrTextCollection.Add(scrText, skipChangeNotify: true);
            }
            catch (ArgumentException)
            {
                // Lost the race to the full scan (or a duplicate-guid conflict): prefer the
                // instance the collection already indexed.
                ScrText? raced = ScrTextCollection.FindById(projectHexId);
                if (raced != null)
                    return EnsureRegistrationAllowsProject(raced);
                return LoadViaFullScanFallback(projectId);
            }
            Services.StartupTiming.MarkOnce($"targeted-project-load-end {projectId}");
            return EnsureRegistrationAllowsProject(scrText);
        }
        catch (Exception ex)
            when (ex is not RegistrationRequiredException and not ProjectNotFoundException)
        {
            // ProjectNotFoundException is excluded above: it is only thrown here by an in-try
            // LoadViaFullScanFallback whose scan already completed and (correctly) found the
            // project unknown - re-running the fallback would be a no-op and the "targeted load
            // failed" log would be misleading.
            Console.Error.WriteLine(
                $"Targeted load of project {projectId} failed; falling back to a full scan: {ex}"
            );
            return LoadViaFullScanFallback(projectId);
        }
    }

    /// <summary>
    /// Resolves a project by completing the full scan: collapses the scan gate (so the wait is
    /// bounded by the scan itself, not the gate), waits for/performs the scan, then resolves the
    /// id against the live collection - preserving today's unknown-project error.
    /// </summary>
    private ScrText LoadViaFullScanFallback(string projectId)
    {
        CollapseScanGate();
        EnsureFullScanCompleted();
        return GetParatextProject(projectId);
    }

    /// <summary>
    /// PT9 rule shared by every project resolution path: resource (published) projects require a
    /// valid Paratext registration.
    /// </summary>
    private static ScrText EnsureRegistrationAllowsProject(ScrText scrText)
    {
        if (scrText.IsResourceProject && !RegistrationInfo.DefaultUser.IsValid)
            throw new RegistrationRequiredException();
        return scrText;
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

    /// <summary>
    /// Projects a <see cref="ScrText"/> to its <see cref="ProjectDetails"/>, isolating a per-project
    /// failure so one unreadable project (e.g. a corrupt Settings.xml, or a language-lookup failure
    /// while enumerating) is skipped with a logged warning rather than throwing out of the whole
    /// enumeration and blanking the entire project list. Returns null for a project whose details
    /// could not be read; callers filter the nulls out.
    /// </summary>
    private static ProjectDetails? TryGetProjectDetails(ScrText scrText)
    {
        try
        {
            return scrText.GetProjectDetails();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"Skipping project '{scrText.Name}' during enumeration; could not read its details: {ex}"
            );
            return null;
        }
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
