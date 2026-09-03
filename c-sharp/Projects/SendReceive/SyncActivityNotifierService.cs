using Paranext.DataProvider.NetworkObjects.Documentation;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Bridges <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> to the PAPI so the
/// renderer has a backend-authoritative view of whether a Send/Receive run is currently active, and
/// for which projects.
/// <para>
/// Two surfaces, both carrying the same wire shape <c>{ isSyncing, projectIds }</c> (a
/// <see cref="SyncActivityState"/> serialized via the shared camelCase PAPI JSON options):
/// <list type="bullet">
/// <item><description>
/// A <c>paratextBibleSendReceive.onSyncActivityChanged</c> event, pushed on every transition of the
/// backend's sync run marker.
/// </description></item>
/// <item><description>
/// A <c>command:paratextBibleSendReceive.getSyncActivity</c> request handler returning the current
/// snapshot, so a renderer can seed its state on demand (e.g. when a WebView mounts mid-sync)
/// without waiting for the next transition.
/// </description></item>
/// </list>
/// The registration, baseline-emit, and forwarding mechanics all live in
/// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}"/>, which this shares with
/// <see cref="SendReceiveBlockNotifierService"/>.
/// </para>
/// <para>
/// <b>No sync ever runs in open-source Platform.Bible.</b> The run bracket that raises
/// <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> only exists in the Paratext 10
/// Studio patch, so in public core the event never fires and the command always returns an idle
/// snapshot. Every build still emits the event exactly once per backend (re)start — the idle baseline
/// at the end of <see cref="InitializeAsync"/> — exactly like
/// <see cref="SendReceiveBlockNotifierService"/>.
/// </para>
/// </summary>
internal class SyncActivityNotifierService(
    PapiClient papiClient,
    ParatextProjectSendReceiveService sendReceiveService
)
{
    /// <summary>
    /// Wire name of the sync-activity-changed event. camelCase to match the PAPI event-name
    /// convention; the renderer subscribes to this exact string.
    /// </summary>
    private const string SyncActivityChangedEvent =
        "paratextBibleSendReceive.onSyncActivityChanged";

    /// <summary>
    /// Wire name of the "is a Send/Receive run currently active?" pull command.
    /// </summary>
    private const string GetSyncActivityCommand =
        "command:paratextBibleSendReceive.getSyncActivity";

    /// <summary>
    /// OpenRPC documentation sent along with the <see cref="SyncActivityChangedEvent"/> registration
    /// (the C# counterpart of the TypeScript <c>SingleNotificationDocumentation</c> second argument to
    /// <c>network:registerEvent</c>). The event is @experimental (see <c>SyncActivitySnapshot</c> in
    /// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>), so this carries the
    /// <c>x-experimental</c> wire marker.
    /// </summary>
    private static readonly OpenRpcSingleNotificationDocumentation s_syncActivityEventDocumentation =
        new()
        {
            Notification = new()
            {
                Experimental = true,
                Summary =
                    "Announces whether a Send/Receive run is active ({ isSyncing, projectIds }) on "
                    + "every transition of the backend's sync run marker. Covers every sync path, "
                    + "including callers that reach the dotnet commands directly and raise no "
                    + "extension-side claim. projectIds is empty while isSyncing is true and the "
                    + "scheduled path has not yet resolved its merge set.",
                Params =
                [
                    new()
                    {
                        Name = "state",
                        Summary = "The current sync-activity snapshot",
                        Required = true,
                        Schema = new() { Type = "object" },
                    },
                ],
            },
        };

    private readonly SendReceiveSnapshotNotifierService<SyncActivityState> _notifier =
        new(
            papiClient,
            SyncActivityChangedEvent,
            GetSyncActivityCommand,
            sendReceiveService.GetSyncActivity,
            handler => sendReceiveService.SyncActivityChanged += handler,
            s_syncActivityEventDocumentation,
            Create(
                "Returns whether a Send/Receive run is currently active ({ isSyncing, projectIds }) so a "
                    + "renderer can seed its sync status on demand instead of waiting for the next "
                    + "onSyncActivityChanged transition. Covers every sync path, including callers that "
                    + "reach the dotnet commands directly.",
                result: ResultOf("object", "The current sync-activity snapshot")
            )
        );

    /// <summary>
    /// Registers both wire surfaces and emits the current activity snapshot. See
    /// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}.InitializeAsync"/> for the ordering
    /// guarantees this does and does not provide.
    /// </summary>
    public Task InitializeAsync() => _notifier.InitializeAsync();
}
