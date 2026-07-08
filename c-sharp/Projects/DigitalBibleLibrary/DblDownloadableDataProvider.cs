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

    private List<InstallableResource> _resources = [];

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
    /// Check user registration and, if registration is valid, return a list of information about
    /// available DBL resources
    /// </summary>
    /// <returns>
    /// A list with some information about all available resources on the DBL, for the purpose of
    /// presenting the resources and their installation status on the front-end
    /// </returns>
    [NetworkTimeout(DBL_NETWORK_TIMEOUT)]
    private List<DblResourceData> GetDblResources(JsonElement _ignore)
    {
        // The text of this exception message is searched for by our Node.js services, so if you
        // change it, you may need to change the TypeScript code as well.
        const string INVALID_USER_REGISTRATION_MESSAGE =
            "User registration is not valid. Cannot retrieve resources from DBL.";

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
    private void InstallDblResource(string DBLEntryUid)
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
    private void UninstallDblResource(string DBLEntryUid)
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
