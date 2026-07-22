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
internal class DblResourcesDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider("platformGetResources.dblResourcesProvider", papiClient)
{
    // These UIDs are also used by the TypeScript `useCommentaryMarkerStyles` hook to load
    // per-commentary marker stylesheets (extensions/src/platform-scripture-editor/src/
    // use-commentary-marker-styles.hook.ts). Keep these two lists in sync.
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
        "090f7cbf7924b245", // TNN — English
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
    //   • _resources — reassigned by FetchResourcesCore, read by FindResource
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
    }

    #endregion
}
