using Paranext.DataProvider.Services;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Commands on the papi that handle Send/Receive-related operations
/// </summary>
internal class ParatextProjectSendReceiveService(
    PapiClient papiClient,
    ParatextProjectDataProviderFactory pdpFactory,
    AppInfo appInfo,
    LocalParatextProjects paratextProjects
)
{
    #region Constructors, consts, and fields

    /// <summary>
    /// Request timeout for the long-running Send/Receive commands, carried on both the syncProjects
    /// and breakSyncLock registrations: a whole-project sync is a multi-minute server operation
    /// (clone/pull/push round-trips per project), and a lock break makes one potentially ~100s
    /// server call per project (N projects in sequence), so either can outlive the default 30s papi
    /// request timeout — with that default the caller would give up while the operation is still
    /// running (and succeeding) on the backend. 0 = deliberately unbounded: no finite budget fits
    /// every project count/size, and the only request a timeout would rescue is a lost response on
    /// an otherwise-live socket — a risk every S/R command shares. Inert in plain Platform.Bible
    /// since the stub bodies below throw immediately, but the registrations already carry it so the
    /// Paratext 10 Studio patch (which fills in the real implementations) inherits the correct
    /// timeout.
    /// </summary>
    internal static readonly TimeSpan s_sendReceiveTimeout = TimeSpan.FromSeconds(0); // 0 = no timeout
    #endregion

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
                SyncProjects,
                s_sendReceiveTimeout
            ),
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.cancelSync",
                CancelSync
            ),
            PapiClient.RegisterRequestHandlerAsync(
                "command:paratextBibleSendReceive.breakSyncLock",
                BreakSyncLock,
                s_sendReceiveTimeout,
                documentation: Create(
                    "Breaks (releases) the Send/Receive server-side repository lock for each given "
                        + "project and reports per-project success. Unrelated to the local "
                        + "in-process sync write gate reported by onSyncWriteLockChanged / "
                        + "getAutoSyncBlocking. Only implemented in Paratext 10 Studio; throws "
                        + "PlatformUnimplementedException elsewhere.",
                    [
                        Param(
                            "projectIds",
                            "Ids of the projects whose server lock to break. An empty array is a "
                                + "no-op (empty result, server not contacted).",
                            "array"
                        ),
                    ],
                    ResultOf(
                        "object",
                        "Map of (upper-cased) project id → whether that project's lock was broken"
                    )
                )
            )
        );
    }

    #endregion

    #region Protected properties and methods

    protected PapiClient PapiClient { get; } = papiClient;

    // The three properties below are read only by the closed-source Paratext 10 Studio patch,
    // which replaces this class's stub bodies with real implementations. Do not remove them —
    // removing them breaks the patch.
    protected ParatextProjectDataProviderFactory PdpFactory { get; } = pdpFactory;

    protected AppInfo AppInfo { get; } = appInfo;

    // ParatextProjects in particular exists for the patch's shared sync wrapper (the single helper
    // both the manual and the scheduled sync command paths funnel through): core's
    // project-directory watcher is non-recursive and cannot see an in-place Settings.xml metadata
    // rewrite (name/language/editable) landing during a receive, so after a sync that can change
    // the project set or its display metadata the patch must call
    // ParatextProjects.RefreshAndNotifyProjectsChanged() for Home / New Tab / the project picker
    // to refresh (see that method's doc).
    protected LocalParatextProjects ParatextProjects { get; } = paratextProjects;

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
    /// Syncs projects from the provided IDs: filters for editable projects and S/Rs them,
    /// then reads each editable project's connected resources and projects (one level deep —
    /// connections of connections are not included) and S/Rs connected translation projects
    /// or DBL-updates connected resources. Non-editable and unknown IDs are skipped.
    /// Deduplication is handled internally.
    /// Exception is thrown if this function is not implemented in the current application
    /// or if an error was encountered syncing.
    /// </summary>
    /// <param name="projectIds">
    /// IDs of the projects to sync. If <see langword="null"/>, all shared projects that are already
    /// present locally (i.e., not new) are synced. An empty array is a no-op.
    /// </param>
    protected void SyncProjects(String[]? projectIds)
    {
#if DEBUG
        // Dev-only placeholder: paranext-core has no S/R impl. PT10 patches the whole method.
        NotificationService.Send(
            PapiClient,
            new("Syncing projects… (dev placeholder)", NotificationSeverity.Info)
            {
                Duration = 3000,
            }
        );
#else
        throw new PlatformUnimplementedException(
            $"Command '{nameof(SyncProjects)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
#endif
    }

    /// <summary>
    /// Cancels an in-progress sync operation if one is running. The process will finish dealing
    /// with the current project/resource and then it will abort. It will not undo what has been
    /// done.
    /// Exception is thrown if this function is not implemented in the current application.
    /// </summary>
    /// <param name="notificationId">
    /// ID of the notification that triggered this cancel, if any. Implementations may use this to
    /// validate that the cancel is for the expected sync operation. <see langword="null"/> when
    /// not called from a notification (e.g., on app shutdown).
    /// </param>
    protected void CancelSync(NotificationId? notificationId = null)
    {
        throw new PlatformUnimplementedException(
            $"Command '{nameof(CancelSync)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
        );
    }

    /// <summary>
    /// Breaks (releases) the Send/Receive server lock for each given project and reports
    /// per-project success. Recovery for a project whose lock is held by the current user
    /// THEMSELVES (this same person on another computer, or a previous interrupted sync). The
    /// server only permits breaking a lock you own, so this can never break another user's lock.
    /// This is the <b>server-side repository lock</b> held on the S/R server — unrelated to the
    /// local in-process write gate (<see cref="SendReceiveWriteLock"/>) reported by the
    /// neighboring onSyncWriteLockChanged event / getAutoSyncBlocking command.
    /// Exception is thrown if this function is not implemented in the current application.
    /// </summary>
    /// <param name="projectIds">Ids of the projects whose server lock to break. An empty list is
    /// a no-op: the result is an empty map and the server is never contacted.</param>
    /// <returns>Map of (upper-cased) project id → whether that project's lock was broken.</returns>
    protected Task<Dictionary<string, bool>> BreakSyncLock(List<string> projectIds)
    {
        // Deliver the fault through the returned task rather than throwing synchronously, so the
        // stub's fault mode matches the async Paratext 10 Studio implementation that replaces this
        // body (and the method stays async-free, avoiding CS1998).
        return Task.FromException<Dictionary<string, bool>>(
            new PlatformUnimplementedException(
                $"Command '{nameof(BreakSyncLock)}' is not implemented in Platform.Bible. Must be running Paratext 10 Studio to use this command."
            )
        );
    }

    #endregion
}
