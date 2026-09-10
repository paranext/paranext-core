using Paranext.DataProvider.NetworkObjects.Documentation;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Bridges the process-wide <see cref="SendReceiveWriteLock"/> gate to the PAPI so the renderer has a
/// backend-authoritative view of whether an automatic Send/Receive is currently blocking edits, and
/// for which projects. The renderer never has to infer the block state from indirect cues — it reads
/// it here.
/// <para>
/// Two surfaces, both carrying the same wire shape <c>{ isBlocking, projectIds }</c> (a
/// <see cref="SendReceiveBlockState"/> serialized via the shared camelCase PAPI JSON options):
/// <list type="bullet">
/// <item><description>
/// A <c>paratextBibleSendReceive.onSyncWriteLockChanged</c> event, pushed whenever the gate's block
/// state changes (this service subscribes to <see cref="SendReceiveWriteLock.BlockStateChanged"/>).
/// </description></item>
/// <item><description>
/// A <c>command:paratextBibleSendReceive.getAutoSyncBlocking</c> request handler returning the
/// current snapshot, so a renderer can seed its state on demand (e.g. when a WebView mounts) without
/// waiting for the next transition.
/// </description></item>
/// </list>
/// The registration, baseline-emit, and forwarding mechanics all live in
/// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}"/>, which this shares with
/// <see cref="SyncActivityNotifierService"/>; only the names, the documentation, and the snapshot
/// source are specific to the write gate.
/// </para>
/// <para>
/// <b>The gate never arms in open-source Platform.Bible.</b> Nothing arms
/// <see cref="SendReceiveWriteLock"/> in public core, so
/// <see cref="SendReceiveWriteLock.BlockStateChanged"/> never fires there and the command always
/// returns a not-blocking snapshot. Every build — plain Platform.Bible included — still emits the
/// event exactly once per backend (re)start: the not-blocking baseline snapshot at the end of
/// <see cref="InitializeAsync"/>. The service is truthful either way — it just has nothing further
/// to report until the Paratext 10 Studio patch brackets a sync with the gate (PT-4210).
/// </para>
/// </summary>
internal class SendReceiveBlockNotifierService(PapiClient papiClient)
{
    /// <summary>
    /// Wire name of the block-state-changed event. camelCase to match the PAPI event-name convention;
    /// the renderer subscribes to this exact string.
    /// </summary>
    private const string BlockStateChangedEvent = "paratextBibleSendReceive.onSyncWriteLockChanged";

    /// <summary>
    /// Wire name of the "is an automatic Send/Receive currently blocking edits?" pull command.
    /// </summary>
    private const string GetAutoSyncBlockingCommand =
        "command:paratextBibleSendReceive.getAutoSyncBlocking";

    /// <summary>
    /// OpenRPC documentation sent along with the <see cref="BlockStateChangedEvent"/> registration
    /// (the C# counterpart of the TypeScript <c>SingleNotificationDocumentation</c> second argument
    /// to <c>network:registerEvent</c>). The event is @experimental (see the TS declaration in
    /// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>), so this carries the
    /// <c>x-experimental</c> wire marker.
    /// </summary>
    private static readonly OpenRpcSingleNotificationDocumentation s_blockStateChangedEventDocumentation =
        new()
        {
            Notification = new()
            {
                Experimental = true,
                Summary =
                    "Emitted whenever the S/R write gate arms or disarms, carrying the gate's "
                    + "full current block-state snapshot ({ isBlocking, projectIds }).",
                Params =
                [
                    new()
                    {
                        Name = "state",
                        Summary = "The write gate's current block-state snapshot",
                        Required = true,
                        Schema = new() { Type = "object" },
                    },
                ],
            },
        };

    private readonly SendReceiveSnapshotNotifierService<SendReceiveBlockState> _notifier =
        new(
            papiClient,
            BlockStateChangedEvent,
            GetAutoSyncBlockingCommand,
            SendReceiveWriteLock.GetBlockState,
            handler => SendReceiveWriteLock.BlockStateChanged += handler,
            s_blockStateChangedEventDocumentation,
            Create(
                "Returns the S/R write gate's current block-state snapshot ({ isBlocking, projectIds }) "
                    + "so a renderer can seed its blocking state on demand instead of waiting for the "
                    + "next onSyncWriteLockChanged transition.",
                result: ResultOf("object", "The write gate's current block-state snapshot")
            )
        );

    /// <summary>
    /// Registers both wire surfaces and emits the gate's baseline snapshot. See
    /// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}.InitializeAsync"/> for the ordering
    /// guarantees this does and does not provide.
    /// </summary>
    public Task InitializeAsync() => _notifier.InitializeAsync();
}
