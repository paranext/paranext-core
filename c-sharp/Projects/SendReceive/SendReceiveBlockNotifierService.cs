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
/// An <c>paratextBibleSendReceive.onSyncWriteLockChanged</c> event, pushed whenever the gate's block
/// state changes (this service subscribes to <see cref="SendReceiveWriteLock.BlockStateChanged"/>).
/// </description></item>
/// <item><description>
/// A <c>command:paratextBibleSendReceive.getAutoSyncBlocking</c> request handler returning the
/// current snapshot, so a renderer can seed its state on demand (e.g. when a WebView mounts) without
/// waiting for the next transition.
/// </description></item>
/// </list>
/// </para>
/// <para>
/// <b>Inert in open-source Platform.Bible.</b> Nothing arms <see cref="SendReceiveWriteLock"/> in
/// public core, so <see cref="SendReceiveWriteLock.BlockStateChanged"/> never fires and the command
/// always returns a not-blocking snapshot. The service is truthful either way — it just has nothing
/// to report until the Paratext 10 Studio patch brackets a sync with the gate (PT-4210).
/// </para>
/// <para>
/// <b>Why the event is an "unregistered announcement".</b> <see cref="PapiClient"/> exposes
/// <c>network:registerMethod</c> (via <see cref="PapiClient.RegisterRequestHandlerAsync"/>) but has
/// no <c>network:registerEvent</c> counterpart, so C# cannot formally register an event type. We
/// therefore emit this event with <see cref="PapiClient.SendEventAsync"/> without a prior
/// registration, following the existing precedent of <c>SharedStore</c>'s <c>shared-store:change</c>
/// event. The main process logs at most a deprecation warning for such an event today; when C# gains
/// a registerEvent API this should register the event properly (TODO PT-4214 follow-up).
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

    private PapiClient PapiClient { get; } = papiClient;

    public async Task InitializeAsync()
    {
        // Forward every gate transition to the renderer. The subscription lives for the process
        // lifetime (this service is a startup singleton, like the other PAPI services), so there is
        // no unsubscribe — mirrors SharedStore's process-lifetime change-event handler.
        SendReceiveWriteLock.BlockStateChanged += OnBlockStateChanged;

        // Register the pull command so a renderer can read the current snapshot on demand instead of
        // waiting for the next transition. GetBlockState returns the snapshot the handler serializes
        // straight back to the caller.
        await PapiClient.RegisterRequestHandlerAsync(
            GetAutoSyncBlockingCommand,
            SendReceiveWriteLock.GetBlockState
        );
    }

    /// <summary>
    /// Forwards a gate transition to the renderer as a PAPI event. Fire-and-forget: the gate raises
    /// <see cref="SendReceiveWriteLock.BlockStateChanged"/> inline on the arming/clearing thread and
    /// must never be delayed or thrown into, so we do not await the send and we swallow + log any
    /// failure (mirrors <c>SharedStore.Set</c>'s event-send error handling).
    /// </summary>
    private void OnBlockStateChanged(SendReceiveBlockState state)
    {
        try
        {
            _ = PapiClient.SendEventAsync(BlockStateChangedEvent, state);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending {BlockStateChangedEvent} event: {ex}");
        }
    }
}
