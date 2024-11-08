using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

internal class DblDownloadableDataProvider(PapiClient papiClient)
{
    private readonly object _installLock = new();

    private List<InstallableResource> _resources = new List<InstallableResource>();

    #region Public properties and methods

    public async Task InitializeAsync()
    {
        // Set up commands on the PAPI
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextBibleDownloadResources.getDBLResources",
            GetDBLResources
        );
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextBibleDownloadResources.installDBLResource",
            InstallDBLResource
        );
    }

    #endregion

    #region Private properties and methods

    private PapiClient PapiClient { get; } = papiClient;

    private class ExtendedInstallableResource : InstallableResource
    {
        public ExtendedInstallableResource(
            bool UpdateAvailable,
            string DBLEntryUidString,
            string BestLanguageName
        )
        {
            this.UpdateAvailable = UpdateAvailable;
            this.DBLEntryUidString = DBLEntryUidString;
            this.BestLanguageName = BestLanguageName;
        }

        public bool UpdateAvailable { get; set; }
        public string DBLEntryUidString { get; set; }
        public new string BestLanguageName { get; set; }
    }

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

    private List<ExtendedInstallableResource> GetDBLResources()
    {
        if (!RegistrationInfo.DefaultUser.IsValid)
        {
            throw new Exception(
                $"User registration is not valid. Cannot retrieve resources from DBL"
            );
        }

        FetchAvailableDBLResources();

        return _resources
            .Select(resource => new ExtendedInstallableResource(
                resource.IsNewerThanCurrentlyInstalled(),
                resource.DBLEntryUid.Id,
                resource.BestLanguageName
            )
            {
                DisplayName = resource.DisplayName,
                FullName = resource.FullName,
            })
            .ToList();
    }

    private bool TryFindResource(string dblEntryUid, out InstallableResource? resource)
    {
        resource = _resources?.FirstOrDefault(r => r.DBLEntryUid.Id == dblEntryUid);
        return resource != null;
    }

    private bool InstallDBLResource(string DBLEntryUid)
    {
        Console.Write("Id:", DBLEntryUid);

        if (!TryFindResource(DBLEntryUid, out var installableResource))
        {
            Console.WriteLine("Resource not found");
            return false;
        }

        lock (_installLock)
        {
            if (installableResource.Installed)
                return true;

            bool retVal = installableResource.Install();
            if (retVal)
                ScrTextCollection.RefreshScrTexts();
            return retVal;
        }
    }

    #endregion
}
