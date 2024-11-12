using System.Text.Json;
using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Data provider that can install, update and uninstall DBL (Digital Bible Library) resources
/// </summary>
internal class DblResourcesDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider("paratextBibleDownloadResources.dblResourcesProvider", papiClient)
{
    #region Internal classes

    private class DblResourceData(
        string DblEntryUid,
        string DisplayName,
        string FullName,
        string BestLanguageName,
        long Size,
        bool Installed,
        bool UpdateAvailable
    )
    {
        public string DblEntryUid { get; set; } = DblEntryUid;
        public string DisplayName { get; set; } = DisplayName;
        public string FullName { get; set; } = FullName;
        public string BestLanguageName { get; set; } = BestLanguageName;
        public long Size { get; set; } = Size;
        public bool Installed { get; set; } = Installed;
        public bool UpdateAvailable { get; set; } = UpdateAvailable;
    }

    #endregion

    #region Consts and member variables

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
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region Private properties and methods

    /// <summary>
    /// Fetch list DBL resources
    /// </summary>
    /// <returns>
    /// A list of all available resources on the DBL, along with information about their
    /// installation status on the local machine
    /// </returns>
    private void FetchAvailableDBLResources()
    {
        _resources = InstallableDBLResource.GetInstallableDBLResources(
            RegistrationInfo.DefaultUser,
            new DBLRESTClientFactory(),
            new DblProjectDeleter(),
            new DblMigrationOperations(),
            new DblResourcePasswordProvider()
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
    private List<DblResourceData> GetDblResources(JsonElement _ignore)
    {
        if (!RegistrationInfo.DefaultUser.IsValid)
        {
            throw new Exception(
                $"User registration is not valid. Cannot retrieve resources from DBL"
            );
        }

        FetchAvailableDBLResources();

        return _resources
            .Select(resource => new DblResourceData(
                resource.DBLEntryUid.Id,
                resource.DisplayName,
                resource.FullName,
                resource.BestLanguageName,
                resource.Size,
                resource.Installed,
                resource.IsNewerThanCurrentlyInstalled()
            ))
            .ToList();
    }

    private bool TryFindResource(string dblEntryUid, out InstallableResource? resource)
    {
        resource = _resources?.FirstOrDefault(r => r.DBLEntryUid.Id == dblEntryUid);
        return resource != null;
    }

    /// <summary>
    /// Try to install DBL resource with specified DBL id
    /// </summary>
    /// <returns>
    /// True if successful. False/throws if unsuccessful.
    /// </returns>
    private bool InstallDblResource(string DBLEntryUid)
    {
        if (!TryFindResource(DBLEntryUid, out var installableResource))
        {
            throw new Exception($"Resource not available from DBL");
        }

#pragma warning disable CS8602 // Dereference of a possibly null reference.
        // We've already checked if installableResource is null
        if (installableResource.Installed && !installableResource.IsNewerThanCurrentlyInstalled())
            throw new Exception(
                $"Resource is already installed and up to date. Installation skipped."
            );
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        // Note that we don't get any info telling if the installation succeeded or failed
        installableResource.Install();

        ScrTextCollection.RefreshScrTexts();

        if (!ScrTextCollection.IsPresent(installableResource.ExistingScrText))
            throw new Exception($"Resource cannot be found. Installation failed.");

        SendDataUpdateEvent(DBL_RESOURCES, "DBL resources data updated");

        return true;
    }

    /// <summary>
    /// Try to uninstall DBL resource with specified DBL id
    /// </summary>
    /// <returns>
    /// True if successful. False/throws if unsuccessful.
    /// </returns>
    private bool UninstallDblResource(string DBLEntryUid)
    {
        if (!TryFindResource(DBLEntryUid, out var installableResource))
        {
            throw new Exception($"Resource not found on list of DBL resources.");
        }

#pragma warning disable CS8602 // Dereference of a possibly null reference.
        // We've already checked if installableResource is null
        if (!installableResource.Installed)
            throw new Exception($"Resource is not currently installed, so it can't be removed.");
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        var objectToBeDeleted = installableResource.ExistingScrText;

        var isPresent = ScrTextCollection.IsPresent(objectToBeDeleted);
        if (!isPresent)
            throw new Exception($"Resource cannot be located, so it can't be removed.");

        // Note that we don't get any info telling if uninstalling succeeded or failed
        ScrTextCollection.DeleteProject(objectToBeDeleted);

        ScrTextCollection.RefreshScrTexts();

        isPresent = ScrTextCollection.IsPresent(objectToBeDeleted);
        if (isPresent)
            throw new Exception($"Resource is still present. Removing failed.");

        SendDataUpdateEvent(DBL_RESOURCES, "DBL resources data updated");

        return true;
    }

    #endregion
}
