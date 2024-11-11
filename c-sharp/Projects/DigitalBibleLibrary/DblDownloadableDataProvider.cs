using System.Text.Json;
using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

internal class DblResourcesDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider("platformBibleDownloadResources.dblResourcesProvider", papiClient)
{
    #region Internal classes

    private class DblResourceData(
        string DblEntryUid,
        string DisplayName,
        string FullName,
        string BestLanguageName,
        bool Installed,
        bool UpdateAvailable
    )
    {
        public string DblEntryUid { get; set; } = DblEntryUid;
        public string DisplayName { get; set; } = DisplayName;
        public string FullName { get; set; } = FullName;
        public string BestLanguageName { get; set; } = BestLanguageName;
        public bool Installed { get; set; } = Installed;
        public bool UpdateAvailable { get; set; } = UpdateAvailable;
    }

    #endregion

    #region Consts and member variables

    private List<InstallableResource> _resources = [];

    #endregion

    #region DataProvider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return [("getDblResources", GetDblResources)];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region Private properties and methods

    private void FetchAvailableDBLResources()
    {
        Console.WriteLine("Fetching");
        _resources = InstallableDBLResource.GetInstallableDBLResources(
            RegistrationInfo.DefaultUser,
            new DBLRESTClientFactory(),
            new DblProjectDeleter(),
            new DblMigrationOperations(),
            new DblResourcePasswordProvider()
        );
        Console.WriteLine("Fetching done");
        Console.WriteLine(_resources.First().ToString());
    }

    private List<DblResourceData> GetDblResources(JsonElement _ignore)
    {
        Console.WriteLine("Rolf");
        if (!RegistrationInfo.DefaultUser.IsValid)
        {
            throw new Exception(
                $"User registration is not valid. Cannot retrieve resources from DBL"
            );
        }

        FetchAvailableDBLResources();
        Console.WriteLine("Fetching done");

        return _resources
            .Select(resource => new DblResourceData(
                resource.DBLEntryUid.Id,
                resource.DisplayName,
                resource.FullName,
                resource.BestLanguageName,
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

    private bool InstallDBLResource(JsonElement _ignore, string DBLEntryUid)
    {
        if (!TryFindResource(DBLEntryUid, out var installableResource))
        {
            throw new Exception($"Resource not available from DBL");
        }

        if (installableResource == null)
            return false;
        if (installableResource.Installed)
            return true;

        installableResource.Install();
        // Note that we don't get any info telling if the installation succeeded or failed

        ScrTextCollection.RefreshScrTexts();
        SendDataUpdateEvent("*", "DBL resources data updated");
        // DblResources
        return true;

        // see paratextprojectdataprovider
    }

    #endregion
}
