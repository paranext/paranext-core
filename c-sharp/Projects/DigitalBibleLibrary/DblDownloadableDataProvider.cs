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

    // The install-status recheck runs on the front end's list-refresh path, where the gate may be
    // held for the length of an unbounded catalog download. It gives up after this long and reports
    // nothing rather than stalling the refresh.
    private const int INSTALL_STATUS_GATE_TIMEOUT_MS = 2000;

    public const string DBL_RESOURCES = "DblResources";

    // Node.js services match this exact text (platform-bible-utils `isErrorMessageAboutRegistryAuthFailure`
    // in util.ts). Changing it requires a matching change in that TypeScript.
    private const string INVALID_USER_REGISTRATION_MESSAGE =
        "User registration is not valid. Cannot retrieve resources from DBL.";

    private List<InstallableResource> _resources = [];

    // Set once the catalog has loaded at least once so a mutation (install/uninstall) that races the
    // initial fetch doesn't operate on an empty _resources list. Read and written only while holding
    // _providerGate.
    private bool _hasFetchedResources;

    // Guards every access to shared state so only one DBL operation touches it at a time:
    //   • _resources — reassigned by FetchResourcesCore, read by FindResource and by
    //     RecomputeDblResourcesInstallStatus
    //   • the Paratext ScrTextCollection — mutated by install/uninstall, read by the fetch's projection
    //   • the process-global Trace.Listeners 401-detection bracket in FetchResourcesCore
    // GetDblResources/InstallDblResource/UninstallDblResource do their blocking work inside Task.Run
    // and take this lock there — never on the JSON-RPC reading thread — so the reading loop stays
    // responsive while an operation runs. See PT-4222.
    private readonly object _providerGate = new();

    #endregion

    #region DataProvider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getDblResources", GetDblResources),
            ("recomputeDblResourcesInstallStatus", RecomputeDblResourcesInstallStatus),
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
                        GetInstalledProjectId(resource)
                    ))
                    .ToList();
            }
        });

    /// <summary>
    /// The id of the local project a resource is installed as, or an empty string when it is not
    /// installed.
    /// </summary>
    /// <remarks>
    /// ParatextData resolves <c>ExistingScrText</c> by the DBL id recorded in each resource
    /// project's settings, so this holds even for a resource whose project id has nothing in common
    /// with its DBL entry uid — which is the normal case, not an exception.
    /// </remarks>
    private static string GetInstalledProjectId(InstallableResource resource) =>
        resource.ExistingScrText?.Guid.ToString().ToUpperInvariant()
        ?? resource.ExistingDictionary?.Guid.ToString().ToUpperInvariant()
        ?? "";

    /// <summary>
    /// Recompute which resources in the already-loaded catalog are installed locally, and under
    /// which project id.
    /// </summary>
    /// <remarks>
    /// Deliberately never loads the catalog, unlike every other method here: this serves the front
    /// end's list refresh, and <see cref="FetchResourcesCore"/> is an unbounded network download.
    /// Skipping it is sound because the catalog side is not what changes — an install or uninstall
    /// changes what is on disk, and ParatextData reads that on every call rather than caching it.
    /// </remarks>
    /// <returns>
    /// The local project id of each catalogued resource, keyed by DBL entry uid, empty for one that
    /// is not installed. The dictionary itself is empty when the catalog has not loaded yet or when
    /// another DBL operation holds the gate; callers then keep the values they have.
    /// </returns>
    private Task<Dictionary<string, string>> RecomputeDblResourcesInstallStatus() =>
        Task.Run(() =>
        {
            var installStatus = new Dictionary<string, string>();
            bool gateTaken = false;
            try
            {
                Monitor.TryEnter(_providerGate, INSTALL_STATUS_GATE_TIMEOUT_MS, ref gateTaken);
                if (!gateTaken || !_hasFetchedResources)
                    return installStatus;

                foreach (var resource in _resources)
                    installStatus[resource.DBLEntryUid.Id] = GetInstalledProjectId(resource);

                return installStatus;
            }
            finally
            {
                if (gateTaken)
                    Monitor.Exit(_providerGate);
            }
        });

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

        // Verify through ExistingScrText, which finds the resource by the DBL id in the installed
        // project's settings. Checking whether InstalledScrText is still in the collection instead
        // reports a successful install as a failure whenever the project it created is keyed on an
        // id unrelated to the DBL entry uid.
        if (GetInstalledProjectId(installableResource) == "")
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
