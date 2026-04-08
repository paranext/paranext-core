using System.Diagnostics;
using NetLoc;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.RegistryServerAccess;
using Paratext.Data.Repository;
using Paratext.Data.Users;
using PtxUtils;
using PtxUtils.Progress;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Commands on the papi that handle Send/Receive-related operations
/// </summary>
internal class ParatextProjectSendReceiveService(
    PapiClient papiClient,
    ParatextProjectDataProviderFactory pdpFactory,
    AppInfo appInfo
)
{
    #region Public properties and methods

    public async Task InitializeAsync()
    {
        // Set up commands on the PAPI
        await Task.WhenAll(
            papiClient.RegisterRequestHandlerAsync("command:versionHistory.commit", Commit),
            papiClient.RegisterRequestHandlerAsync(
                "command:versionHistory.commitDaily",
                CommitDaily
            ),
            papiClient.RegisterRequestHandlerAsync(
                "command:versionHistory.quickCommit",
                QuickCommit
            )
        );
    }

    #endregion

    #region Protected properties and methods

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
