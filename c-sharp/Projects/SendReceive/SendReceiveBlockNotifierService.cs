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
/// <b>Central-registry registration.</b> Unlike the other C#-origin events (the PDP
/// <c>&lt;id&gt;-pdp-data:onDidUpdate</c> family, <c>SharedStore</c>'s <c>shared-store:change</c>),
/// which still announce unregistered and draw main's once-per-name deprecation warning pending a
/// platform-wide migration, this event IS formally registered with main's central event registry:
/// <see cref="InitializeAsync"/> sends a <c>network:registerEvent</c> request — the same
/// main-process JSON-RPC method TypeScript's <c>createNetworkEventEmitterAsync</c> registration
/// path calls — before subscribing to the gate, making this connection the event's single
/// registered source. <see cref="PapiClient"/> has no dedicated wrapper for that method, so the
/// request goes out generically via <see cref="PapiClient.SendRequestAsync{T}"/>, mirroring how
/// <see cref="PapiClient.RegisterRequestHandlerAsync"/> calls <c>network:registerMethod</c>.
/// Registration is best-effort: on rejection or failure we log and still emit, because announcing
/// unregistered remains functional (main just logs the deprecation warning) and a registry hiccup
/// must never break backend startup.
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
    /// Wire name of the main-process JSON-RPC method that registers a network event with the
    /// central event registry (the TypeScript <c>REGISTER_EVENT</c> constant).
    /// </summary>
    private const string RegisterEventMethod = "network:registerEvent";

    private PapiClient PapiClient { get; } = papiClient;

    public async Task InitializeAsync()
    {
        // Register the event with main's central event registry FIRST, so no announcement can
        // precede the registration (see the class doc: best-effort — on rejection or failure, log
        // and continue; emitting unregistered still works, and startup must never break over this).
        try
        {
            bool accepted = await PapiClient.SendRequestAsync<bool>(
                RegisterEventMethod,
                [BlockStateChangedEvent]
            );
            if (!accepted)
                Console.Error.WriteLine(
                    $"Central registry rejected network event '{BlockStateChangedEvent}' (already "
                        + "registered by another process?); announcements will warn as unregistered"
                );
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"Failed to register network event '{BlockStateChangedEvent}' with the central "
                    + $"registry; announcements will warn as unregistered. {ex}"
            );
        }

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
    /// must never be delayed or thrown into, so we never await the send.
    /// <para>
    /// <see cref="PapiClient.SendEventAsync"/> is declared <c>async</c>, so the compiler wraps its
    /// ENTIRE body — including anything before its first <c>await</c> — in a state machine: no
    /// exception from it can ever throw synchronously into this method. A bare <c>try/catch</c>
    /// around the discarded call (the shape <c>SharedStore.Set</c> also uses for its own
    /// fire-and-forget <c>SendEventAsync</c>) is therefore DEAD here: every failure lands on the
    /// discarded <see cref="Task"/>, unobserved and unlogged, and the catch never runs. We
    /// deliberately diverge from that precedent — which has the same dead spot — and instead
    /// capture the task and attach a fault-only continuation via <see cref="ThreadingUtils.RunTask"/>
    /// (the same helper other fire-and-forget call sites in this codebase use to observe a task's
    /// fault without awaiting it), so a failed send is actually logged. This keeps the same
    /// fire-and-forget semantics — nothing here awaits or re-throws into the gate's event raise.
    /// </para>
    /// </summary>
    private void OnBlockStateChanged(SendReceiveBlockState state) =>
        ThreadingUtils.RunTask(
            PapiClient.SendEventAsync(BlockStateChangedEvent, state),
            $"send {BlockStateChangedEvent} event"
        );
}
