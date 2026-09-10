using System.Diagnostics;
using System.Text.Json;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Data provider that can install, update and uninstall DBL (Digital Bible Library) resources
/// </summary>
internal class DblResourcesDataProvider(
    PapiClient papiClient,
    LocalParatextProjects paratextProjects
) : NetworkObjects.DataProvider("platformGetResources.dblResourcesProvider", papiClient)
{
    // These UIDs determine which DBL catalog entries are classified as CommentaryResource.
    // The TypeScript `useCommentaryMarkerStyles` hook (extensions/src/platform-scripture-editor/src/
    // use-commentary-marker-styles.hook.ts) keeps a parallel map and may include additional legacy
    // UIDs for locally-installed resources predating a DBL UID reassignment — those extra entries
    // are intentionally absent here since we no longer serve those UIDs from the catalog.
    private static readonly HashSet<string> CommentariesWhiteList =
    [
        // UBS Translator's Handbook
        "97196133a859179b", // HBKENG — English
        "6c21e835eb8ca3b2", // HBKCS — Chinese (Simplified)
        "77dc05b26ce399dd", // HBKCT — Chinese (Traditional)
        "815f988992157b10", // HBKFRA — French
        "24daa5f24f0020b3", // HBKPT — Portuguese
        "1ff24938918bd69e", // HBKESP — Spanish
        // UBS Translator's Notes
        "72dd0b9b0f2b4024", // TNN — English (UID reassigned in DBL; old UID 090f7cbf7924b245 now belongs to a different resource)
        "0617c397f003127c", // TNNESP — Spanish
        "233345361843ce8b", // TNNPTG — Portuguese
        "d95fde28b4346e61", // TNNFR — French
        // UBS Translator's Notes (Deuterocanon)
        "b58b80b798e22be6", // TND — English
        "943164c222f75687", // TNDESP — Spanish
        "e0b3f20ff8677585", // TNDPTG — Portuguese
    ];

    #region Internal classes

    private class DblResourceData(
        string DblEntryUid,
        string DisplayName,
        string FullName,
        string BestLanguageName,
        ResourceType Type,
        long Size,
        bool Installed,
        bool UpdateAvailable,
        string ProjectId
    )
    {
        public string DblEntryUid { get; set; } = DblEntryUid;
        public string DisplayName { get; set; } = DisplayName;
        public string FullName { get; set; } = FullName;
        public string BestLanguageName { get; set; } = BestLanguageName;
        public string Type { get; set; } =
            CommentariesWhiteList.Contains(DblEntryUid) ? "CommentaryResource"
            : Type.ToString() == "DBL" ? "ScriptureResource"
            : Type.ToString();
        public long Size { get; set; } = Size;
        public bool Installed { get; set; } = Installed;
        public bool UpdateAvailable { get; set; } = UpdateAvailable;
        public string ProjectId { get; set; } = ProjectId;
    }

    #endregion

    #region Consts and member variables

    private const int DBL_NETWORK_TIMEOUT = 0; // Don't timeout DBL network requests

    // Bounds the update-status recheck, which is the one wire method here that must answer promptly:
    // it serves the front end's list refresh, and its TSDoc promises it "gives up rather than
    // blocking". Without an explicit value it would inherit `network.service.ts`'s 30-second
    // default, three orders of magnitude past that promise. Sized well above the work itself — the
    // gate is non-waiting and the recheck is in-memory, though it grows with the catalog and the
    // local project count — while still failing fast enough that a stuck recheck cannot hold a
    // refresh for half a minute.
    private const int UPDATE_STATUS_NETWORK_TIMEOUT = 5000;

    public const string DBL_RESOURCES = "DblResources";

    // Node.js services match this exact text (platform-bible-utils `isErrorMessageAboutRegistryAuthFailure`
    // in util.ts). Changing it requires a matching change in that TypeScript.
    private const string INVALID_USER_REGISTRATION_MESSAGE =
        "User registration is not valid. Cannot retrieve resources from DBL.";

    private List<InstallableResource> _resources = [];

    // Set once the catalog has loaded at least once so a mutation (install/uninstall) that races the
    // initial fetch doesn't operate on an empty _resources list. Written only while holding
    // _providerGate. It may also be read WITHOUT the gate, but only as a one-way hint: it never
    // returns to false, so a lock-free reader that sees false has either not missed anything yet or
    // is about to redo the check under the gate, and one that sees true is correct.
    private bool _hasFetchedResources;

    // Guards every access to shared state so only one DBL operation touches it at a time:
    //   • _resources — reassigned by FetchResourcesCore, read by FindResource and by
    //     RecomputeDblResourcesUpdateStatus
    //   • the Paratext ScrTextCollection — mutated by install/uninstall, read by the fetch's projection
    //   • the process-global Trace.Listeners 401-detection bracket in FetchResourcesCore
    // GetDblResources/InstallDblResource/UninstallDblResource/RecomputeDblResourcesUpdateStatus do
    // their blocking work inside Task.Run and take this lock there — never on the JSON-RPC reading
    // thread — so the reading loop stays responsive while an operation runs. See PT-4222.
    private readonly object _providerGate = new();

    #endregion

    #region DataProvider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getDblResources", GetDblResources),
            ("recomputeDblResourcesUpdateStatus", RecomputeDblResourcesUpdateStatus),
            ("installDblResource", InstallDblResource),
            ("uninstallDblResource", UninstallDblResource),
            ("isGetDblResourcesAvailable", IsGetDblResourcesAvailable),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region Private properties and methods

    /// <summary>
    /// Detect if DBL credentials have been configured. Does not check these credentials for
    /// validity.
    /// </summary>
    /// <returns>
    /// True if any credentials are configured, false if not.
    /// </returns>
    private bool IsGetDblResourcesAvailable()
    {
        return DblResourcePasswordProvider.IsPasswordAvailable();
    }

    /// <summary>
    /// Fetch list DBL resources
    /// </summary>
    /// <returns>
    /// A list of all available resources on the DBL, along with information about their
    /// installation status on the local machine
    /// </returns>
    private void FetchAvailableDBLResources()
    {
        var allResources = InstallableDBLResource.GetInstallableDBLResources(
            RegistrationInfo.DefaultUser,
            new DBLRESTClientFactory(),
            new DblProjectDeleter(),
            new DblMigrationOperations(),
            new DblResourcePasswordProvider()
        );
        _resources = allResources.Where(r => DblResourceWhiteList.IsValidResource(r)).ToList();
        var excludedResources = allResources.Except(_resources).Select(r => r.Name).ToList();
        excludedResources.Sort();
        Console.WriteLine(
            $"Excluded resources (not confirmed to be compatible): {string.Join(", ", excludedResources)}\n"
        );
    }

    /// <summary>
    /// Loads the DBL catalog into <see cref="_resources"/>, surfacing Paratext's trace-only 401 as
    /// <see cref="INVALID_USER_REGISTRATION_MESSAGE"/>. Call only while holding
    /// <see cref="_providerGate"/> (it touches the global Trace.Listeners bracket) and from a
    /// background thread (the network call blocks and has no timeout).
    /// </summary>
    private void FetchResourcesCore()
    {
        if (!RegistrationInfo.DefaultUser.IsValid)
            throw new Exception(INVALID_USER_REGISTRATION_MESSAGE);

        TextSearchingTraceListener traceListener = new("REST ProtocolError = 401");
        Trace.Listeners.Add(traceListener);
        try
        {
            FetchAvailableDBLResources();
        }
        finally
        {
            Trace.Listeners.Remove(traceListener);
        }
        if (traceListener.FoundText)
            throw new Exception(INVALID_USER_REGISTRATION_MESSAGE);

        _hasFetchedResources = true;
    }

    /// <summary>
    /// Loads the catalog once if it has never loaded, so a mutation that runs before any fetch
    /// completes operates on a populated <see cref="_resources"/> instead of an empty one.
    /// No-op after any successful load. Same calling contract as <see cref="FetchResourcesCore"/>.
    /// </summary>
    private void EnsureResourcesLoadedCore()
    {
        if (!_hasFetchedResources)
            FetchResourcesCore();
    }

    /// <summary>
    /// Check user registration and, if registration is valid, return a list of information about
    /// available DBL resources
    /// </summary>
    /// <returns>
    /// A list with some information about all available resources on the DBL, for the purpose of
    /// presenting the resources and their installation status on the front-end
    /// </returns>
    [NetworkTimeout(DBL_NETWORK_TIMEOUT)]
    private Task<List<DblResourceData>> GetDblResources(JsonElement _ignore) =>
        // Offload the DBL catalog fetch to a background thread. This is a blocking, unbounded
        // (NetworkTimeout = 0) network call, and on a cold cache (first run) it downloads the
        // full catalog, which can take a long time. StreamJsonRpc invokes synchronous handlers
        // inline on its message-reading loop, so doing this work synchronously stalls every
        // other request in this process until it finishes — provider-existence checks fail
        // ("No data provider found"), getCachedResources times out, and the fetch never appears
        // to settle. Returning Task.Run yields the reading loop back immediately so the process
        // stays responsive. See PT-4222.
        Task.Run(() =>
        {
            lock (_providerGate)
            {
                FetchResourcesCore();
                return _resources
                    .Select(resource => new DblResourceData(
                        resource.DBLEntryUid.Id,
                        resource.DisplayName,
                        resource.FullName,
                        resource.BestLanguageName,
                        resource.Type,
                        resource.Size,
                        resource.Installed,
                        resource.IsNewerThanCurrentlyInstalled(),
                        resource.ExistingScrText?.Guid.ToString().ToUpperInvariant()
                            ?? resource.ExistingDictionary?.Guid.ToString().ToUpperInvariant()
                            ?? ""
                    ))
                    .ToList();
            }
        });

    /// <summary>
    /// Recompute, for each resource in the already-loaded catalog, whether the DBL has a newer
    /// version than the copy installed locally.
    /// </summary>
    /// <remarks>
    /// Deliberately never loads the catalog, unlike <see cref="GetDblResources"/> and the
    /// install/uninstall methods: this serves the front end's list refresh, and
    /// <see cref="FetchResourcesCore"/> is an unbounded network download. Skipping it is sound
    /// because the DBL-side revision is the half we want held fixed — it is the locally installed
    /// revision that changes after an install, and ParatextData reads that from the installed
    /// resource on every call rather than caching it.
    /// </remarks>
    /// <returns>
    /// Whether an update is available, keyed by DBL entry uid. Empty when the catalog has not loaded
    /// yet or when another DBL operation holds the gate; callers then keep the values they have.
    /// </returns>
    [NetworkTimeout(UPDATE_STATUS_NETWORK_TIMEOUT)]
    internal Task<Dictionary<string, bool>> RecomputeDblResourcesUpdateStatus()
    {
        // Answer on the calling thread while the catalog has never loaded — the whole of startup,
        // during which every list refresh would otherwise queue a thread-pool dispatch and contend
        // the gate held by the in-progress download, all for an answer that is empty by definition.
        // Reading the flag without the gate is sound because it is a one-way hint; see its
        // declaration.
        if (!_hasFetchedResources)
            return Task.FromResult(new Dictionary<string, bool>());

        return Task.Run(() =>
        {
            bool gateTaken = false;
            try
            {
                // Non-waiting on purpose. Everything else that holds this gate — a catalog
                // download, an install, an uninstall — runs for seconds, far longer than a list
                // refresh should block, so waiting could only delay the same empty answer. Two
                // rechecks cannot contend with each other: the only caller runs inside the
                // front end's single-flight installed-flag sync.
                Monitor.TryEnter(_providerGate, ref gateTaken);
                if (!gateTaken || !_hasFetchedResources)
                    return [];

                return ProjectUpdateStatus(_resources, InstalledDblIds());
            }
            finally
            {
                if (gateTaken)
                    Monitor.Exit(_providerGate);
            }
        });
    }

    /// <summary>
    /// The DBL entry uids of every resource currently installed locally, gathered in a single pass
    /// over the project collection.
    /// </summary>
    /// <remarks>
    /// This exists to keep <see cref="ProjectUpdateStatus"/> off
    /// <see cref="InstallableResource.ExistingScrText"/> for entries that are not installed.
    /// That property is computed with no backing field and enumerates the whole project collection
    /// on every access, so asking each of the ~1800 catalog entries whether it is installed costs
    /// ~1800 full scans — and an installed entry pays it twice, once for
    /// <c>Installed</c> and once inside <c>IsNewerThanCurrentlyInstalled</c>. Gating the loop on
    /// <c>Installed</c> does not help, because that property is the same lookup.
    ///
    /// The predicate matches the main branch of <c>ExistingScrText</c>. It deliberately omits that
    /// property's two other branches — a null <c>DBLEntryUid</c> matched by name, and the
    /// <c>SourceLanguageResource</c> fallback — because this provider serves only whitelisted DBL
    /// catalog entries, which always carry a uid and are always <c>ResourceType.DBL</c>. A resource
    /// reaching here without a uid would be reported as not installed, which is what
    /// ParatextData already returns for anything uninstalled.
    /// </remarks>
    private static HashSet<string> InstalledDblIds()
    {
        HashSet<string> installedDblIds = [];
        foreach (var scrText in ScrTextCollection.ScrTexts(IncludeProjects.AllAccessible))
        {
            try
            {
                if (!scrText.IsResourceProject)
                    continue;
                var dblId = scrText.Settings.DBLId;
                if (dblId != null)
                    installedDblIds.Add(dblId.Id);
            }
            catch (Exception e)
            {
                // Both reads above touch project settings, which fault on a corrupt Settings.xml.
                // Skipping the project costs at most one row an accurate flag; letting the
                // exception escape would fault the whole recheck and leave every row stale for the
                // session — the outcome the per-entry guard in ProjectUpdateStatus also prevents.
                // The project is deliberately not named here: reading anything off it is what
                // just failed, so doing it again in the handler could throw out of the catch.
                Console.WriteLine(
                    $"Could not read a project's DBL id while rechecking updates: {e}"
                );
            }
        }
        return installedDblIds;
    }

    /// <summary>
    /// Projects a catalog into "is a newer version available", keyed by DBL entry uid.
    /// </summary>
    /// <param name="resources">The catalog entries to report on.</param>
    /// <param name="installedDblIds">
    /// Uids of the resources installed locally, from <see cref="InstalledDblIds"/>. An entry
    /// outside this set is reported as having an update available without consulting
    /// ParatextData — the same answer <c>IsNewerThanCurrentlyInstalled</c> gives for anything
    /// uninstalled, since it opens with <c>if (!Installed) return true;</c>.
    /// </param>
    internal static Dictionary<string, bool> ProjectUpdateStatus(
        IEnumerable<InstallableResource> resources,
        ISet<string> installedDblIds
    )
    {
        Dictionary<string, bool> updateStatus = [];
        foreach (var resource in resources)
        {
            var dblEntryUid = resource.DBLEntryUid?.Id;
            if (dblEntryUid == null)
                continue;
            try
            {
                // TryAdd, not the indexer, so a duplicate uid resolves to the same
                // InstallableResource that FindResource's FirstOrDefault picks — the flag shown
                // then describes the resource the install/uninstall buttons act on.
                updateStatus.TryAdd(
                    dblEntryUid,
                    !installedDblIds.Contains(dblEntryUid)
                        || resource.IsNewerThanCurrentlyInstalled()
                );
            }
            catch (Exception e)
            {
                // Skipping one entry degrades one row: callers already treat a missing key as
                // "unknown" and keep the value they have. Letting it escape would fault the whole
                // task and leave every row stale for the session instead.
                Console.WriteLine($"Could not recompute update status for {dblEntryUid}: {e}");
            }
        }
        return updateStatus;
    }

    private void FindResource(
        string dblEntryUid,
        string messageToThrowIfNotFound,
        out InstallableResource resource
    )
    {
        resource =
            _resources?.FirstOrDefault(r => r.DBLEntryUid.Id == dblEntryUid)
            ?? throw new Exception(messageToThrowIfNotFound);
    }

    /// <summary>
    /// Try to install DBL resource with specified DBL id
    /// </summary>
    [NetworkTimeout(DBL_NETWORK_TIMEOUT)]
    private Task InstallDblResource(string DBLEntryUid) =>
        // Run the blocking Install()/RefreshScrTexts() on a background thread so the reading loop
        // stays responsive; the lock keeps it from overlapping a fetch or an uninstall.
        Task.Run(() =>
        {
            lock (_providerGate)
            {
                EnsureResourcesLoadedCore();
                InstallDblResourceCore(DBLEntryUid);
            }
        });

    private void InstallDblResourceCore(string DBLEntryUid)
    {
        FindResource(
            DBLEntryUid,
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorInstallResource_resourceNotFound%",
                $"Resource not available from DBL."
            ),
            out var installableResource
        );

        if (installableResource.Installed && !installableResource.IsNewerThanCurrentlyInstalled())
            throw new Exception(
                LocalizationService.GetLocalizedString(
                    PapiClient,
                    "%getResources_errorInstallResource_resourceAlreadyInstalled%",
                    $"Resource is already installed and up to date. Installation skipped."
                )
            );

        // Note that we don't get any info telling if the installation succeeded or failed
        installableResource.Install();

        ScrTextCollection.RefreshScrTexts();

        if (!ScrTextCollection.IsPresent(installableResource.InstalledScrText))
            throw new Exception(
                LocalizationService.GetLocalizedString(
                    PapiClient,
                    "%getResources_errorInstallResource_installationFailed%",
                    $"Resource cannot be found after attempted installation. Installation failed."
                )
            );

        SendDataUpdateEvent(DBL_RESOURCES, "DBL resources data updated");
        // A newly installed resource is a new project on disk; tell the project-list consumers
        // (Home, New Tab, project picker) so it shows up without waiting for an unrelated refresh.
        paratextProjects.NotifyProjectsChanged();
    }

    /// <summary>
    /// Try to uninstall DBL resource with specified DBL id
    /// </summary>
    // Catalog may load on-demand here, so allow the caller to wait without timing out.
    [NetworkTimeout(DBL_NETWORK_TIMEOUT)]
    private Task UninstallDblResource(string DBLEntryUid) =>
        // Run the blocking Delete()/RefreshScrTexts() on a background thread so the reading loop
        // stays responsive; the lock keeps it from overlapping a fetch or an install.
        Task.Run(() =>
        {
            lock (_providerGate)
            {
                EnsureResourcesLoadedCore();
                UninstallDblResourceCore(DBLEntryUid);
            }
        });

    private void UninstallDblResourceCore(string DBLEntryUid)
    {
        FindResource(
            DBLEntryUid,
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorUninstallResource_resourceNotFound%",
                $"Resource not found on list of DBL resources."
            ),
            out var installableResource
        );

        if (!installableResource.Installed)
            throw new Exception(
                LocalizationService.GetLocalizedString(
                    PapiClient,
                    "%getResources_errorUninstallResource_resourceNotInstalled%",
                    $"Resource is not currently installed, so it can't be removed."
                )
            );

        var objectToBeDeleted = installableResource.ExistingScrText;

        var isPresent = ScrTextCollection.IsPresent(objectToBeDeleted);
        if (!isPresent)
            throw new Exception(
                LocalizationService.GetLocalizedString(
                    PapiClient,
                    "%getResources_errorUninstallResource_localResourceNotFound%",
                    $"Resource cannot be located, so it can't be removed."
                )
            );

        // Note that we don't get any info telling if uninstalling succeeded or failed
        ScrTextCollection.DeleteProject(objectToBeDeleted);

        ScrTextCollection.RefreshScrTexts();

        isPresent = ScrTextCollection.IsPresent(objectToBeDeleted);
        if (isPresent)
            throw new Exception(
                LocalizationService.GetLocalizedString(
                    PapiClient,
                    "%getResources_errorUninstallResource_localResourceStillPresent%",
                    $"Resource is still present. Removing failed."
                )
            );

        SendDataUpdateEvent(DBL_RESOURCES, "DBL resources data updated");
        // An uninstalled resource is a project removed from disk; tell the project-list consumers so
        // it disappears from Home / New Tab / the project picker without an unrelated refresh.
        paratextProjects.NotifyProjectsChanged();
    }

    #endregion
}
