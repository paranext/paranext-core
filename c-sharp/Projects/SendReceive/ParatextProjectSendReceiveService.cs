using Paratext.Data;
using Paratext.Data.Repository;

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
            papiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.commitChanges",
                CommitChanges
            ),
            papiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.commitDaily",
                CommitDaily
            )
        );
    }

    #endregion

    #region Protected properties and methods

    /// <summary>
    /// Function to commit a snapshot of the current changes. Without `forceCommit` set to `true`,
    /// will only commit if there are changes/revisions detected.
    /// Exception is thrown if this function is not implemented in the current application or if an
    /// error was encountered committing.
    /// </summary>
    /// <returns>Whether there were changes to commit (if not forcing)</returns>
    protected Boolean CommitChanges(String projectId, String comment, Boolean forceCommit = false)
    {
        throw new PlatformUnimplementedException(
            "This command is unimplemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    /// <summary>
    /// Function that only commits if it's been a day since the last commit.
    /// Exception is thrown if this function is not implemented in the current application or if an
    /// error was encountered committing.
    /// </summary>
    protected void CommitDaily(String projectId)
    {
        ScrText scrText = LocalParatextProjects.GetParatextProject(projectId);
        VersionedText versionedText = VersioningManager.Get(scrText);
        versionedText.CommitDaily();
        throw new PlatformUnimplementedException(
            "This command is unimplemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    #endregion
}
