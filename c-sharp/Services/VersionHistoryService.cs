using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
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
        await papiClient.RegisterRequestHandlerAsync("command:versionHistory.commit", Commit);
        await papiClient.RegisterRequestHandlerAsync(
            "command:versionHistory.commitDaily",
            CommitDaily
        );
        await papiClient.RegisterRequestHandlerAsync(
            "command:versionHistory.quickCommit",
            QuickCommit
        );
    }

    #endregion

    #region Private handler methods

    /// <summary>
    /// Function to commit a snapshot of the current changes. Without `forceCommit` set to `true`,
    /// will only commit if there are changes/revisions detected.
    /// </summary>
    /// <returns>Whether there were changes to commit (if not forcing)</returns>
    private Boolean Commit(String projectId, String comment, Boolean? forceCommit = false)
    {
        throw new Exception("This command is unimplemented!");
    }

    /// <summary>
    /// Function that only commits if it's been a day since the last commit
    /// </summary>
    private void CommitDaily(String projectId)
    {
        throw new Exception("This command is unimplemented!");
    }

    /// <summary>
    /// Function that quickly commits changes, bypassing merger check and few other things
    /// </summary>
    private void QuickCommit(
        String projectId,
        String comment,
        String? dblRevisionNumber = null,
        String? forcedUserName = null
    )
    {
        throw new Exception("This command is unimplemented!");
    }

    #endregion
}
