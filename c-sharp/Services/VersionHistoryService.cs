using Paranext.DataProvider;
using Paratext.Data.Repository;

namespace Paranext.DataProvider.Services;

/// <summary>
/// Service that manages version history for the projects
/// </summary>
internal class VersionHistoryService(PapiClient papiClient)
{
    #region Public properties and methods

    public async Task InitializeAsync()
    {
        // Set up commands on the PAPI
        await papiClient.RegisterRequestHandlerAsync(
            "command:versionHistory.commitChanges",
            CommitChanges
        );
    }

    #endregion

    #region Private handler methods

    /// <summary>
    /// Function to commit new changes to the version history
    /// </summary>
    /// <returns>Whether the changes were successfully committed</returns>
    private Boolean CommitChanges(String comment)
    {
        throw new Exception("This command is unimplemented!");
    }

    #endregion
}
