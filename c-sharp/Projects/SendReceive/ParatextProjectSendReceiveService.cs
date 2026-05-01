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
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.commitChanges",
                CommitChanges
            ),
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.commitDaily",
                CommitDaily
            ),
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.syncProjects",
                SyncProjects
            ),
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.cancelSync",
                CancelSync
            )
        );
    }

    #endregion

    #region Protected properties and methods
    protected PapiClient PapiClient { get; } = papiClient;

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
        throw new PlatformUnimplementedException(
            "This command is unimplemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    /// <summary>
    /// Sends/Receives the provided projects and their connected projects. Also gets and/or updates
    /// the project's connected resources as needed (e.g. from the DBL). Note, this function only
    /// syncs the projects themselves and their connected resources; it does not the connected
    /// projects' connected resources.
    /// Exception is thrown if this function is not implemented in the current application or if an
    /// error was encountered syncing.
    /// </summary>
    protected void SyncProjects(String[]? projectIds)
    {
        throw new PlatformUnimplementedException(
            $"Command '{nameof(SyncProjects)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    /// <summary>
    /// Cancels an in-progress sync operation if one is running. The process will finish dealing
    /// with the current project/resource and then it will abort. It will not undo what has been
    /// done.
    /// Exception is thrown if this function is not implemented in the current application.
    /// </summary>
    protected void CancelSync()
    {
        throw new PlatformUnimplementedException(
            $"Command '{nameof(CancelSync)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    #endregion
}
