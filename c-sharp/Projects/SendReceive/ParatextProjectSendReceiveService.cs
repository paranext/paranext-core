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
            )
        );
    }

    #endregion

    #region Protected properties and methods

    protected PapiClient PapiClient { get; } = papiClient;

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
            $"Command '{nameof(CommitChanges)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
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
            $"Command '{nameof(CommitDaily)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    /// <summary>
    /// Syncs projects from the provided IDs: filters for editable projects and S/Rs them,
    /// then reads each editable project's connected resources and projects (one level deep —
    /// connections of connections are not included) and S/Rs connected translation projects
    /// or DBL-updates connected resources. Non-editable and unknown IDs are skipped.
    /// Deduplication is handled internally.
    /// Exception is thrown if this function is not implemented in the current application
    /// or if an error was encountered syncing.
    /// </summary>
    /// <param name="projectIds">IDs of the open webview projects to evaluate</param>
    protected void SyncProjects(String[] projectIds)
    {
        throw new PlatformUnimplementedException(
            $"Command '{nameof(SyncProjects)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    #endregion
}
