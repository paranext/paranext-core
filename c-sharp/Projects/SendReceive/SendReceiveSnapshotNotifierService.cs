using Paranext.DataProvider.NetworkObjects.Documentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Publishes one backend-authoritative Send/Receive snapshot to the PAPI over the two surfaces every
/// such signal needs: a push event for transitions and a pull command for seeding. Both carry the
/// same <typeparamref name="TSnapshot"/>, serialized via the shared camelCase PAPI JSON options.
/// <para>
/// Extracted because the Send/Receive area publishes more than one of these — the write gate's block
/// state and the sync run's activity state — and they differ only in their names, their
/// documentation, and where the snapshot comes from. Everything that is genuinely subtle is shared:
/// subscribe-before-register ordering, best-effort central-registry registration, the awaited live
/// baseline emit, and observing the fire-and-forget forward. Duplicating that per signal means every
/// later correction has to be found and repeated in each copy.
/// </para>
/// <para>
/// <b>Central-registry registration.</b> Unlike the other C#-origin events (the PDP
/// <c>&lt;id&gt;-pdp-data:onDidUpdate</c> family, <c>SharedStore</c>'s <c>shared-store:change</c>),
/// which still announce unregistered and draw main's once-per-name deprecation warning pending a
/// platform-wide migration, these events ARE formally registered with main's central event registry:
/// <see cref="InitializeAsync"/> sends a <c>network:registerEvent</c> request — the same
/// main-process JSON-RPC method TypeScript's <c>createNetworkEventEmitterAsync</c> registration path
/// calls — making this connection the event's single registered source. <see cref="PapiClient"/> has
/// no dedicated wrapper for that method, so the request goes out generically via
/// <see cref="PapiClient.SendRequestAsync{T}"/>, mirroring how
/// <see cref="PapiClient.RegisterRequestHandlerAsync"/> calls <c>network:registerMethod</c>.
/// Registration is best-effort: on rejection or failure we log and still emit, because announcing
/// unregistered remains functional (main just logs the deprecation warning) and a registry hiccup
/// must never break backend startup.
/// </para>
/// </summary>
/// <typeparam name="TSnapshot">The immutable snapshot record sent over both surfaces.</typeparam>
/// <param name="papiClient">Connection the event and command are published on.</param>
/// <param name="eventName">Wire name of the transition event, e.g.
/// <c>paratextBibleSendReceive.onSyncWriteLockChanged</c>.</param>
/// <param name="commandName">Wire name of the pull command, INCLUDING the <c>command:</c> prefix.
/// </param>
/// <param name="readSnapshot">Reads the CURRENT snapshot. Called live at emit time and bound
/// directly as the pull command's handler, so both surfaces answer with present state rather than a
/// cached copy of the last transition.</param>
/// <param name="subscribe">Attaches the forwarding handler to the underlying signal. Takes a
/// delegate rather than an event because the two callers' signals differ in kind (one static, one
/// per-instance). Called exactly once, before any registration round trip.</param>
/// <param name="eventDocumentation">OpenRPC documentation sent with the event registration.</param>
/// <param name="commandDocumentation">OpenRPC documentation sent with the command registration.
/// </param>
internal sealed class SendReceiveSnapshotNotifierService<TSnapshot>(
    PapiClient papiClient,
    string eventName,
    string commandName,
    Func<TSnapshot> readSnapshot,
    Action<Action<TSnapshot>> subscribe,
    OpenRpcSingleNotificationDocumentation eventDocumentation,
    OpenRpcSingleMethodDocumentation commandDocumentation
)
{
    /// <summary>
    /// Wire name of the main-process JSON-RPC method that registers a network event with the
    /// central event registry (the TypeScript <c>REGISTER_EVENT</c> constant).
    /// </summary>
    private const string RegisterEventMethod = "network:registerEvent";

    /// <summary>
    /// Registers both wire surfaces and then emits the current snapshot, awaited, so the emit
    /// attempt completes before this method — and therefore before the startup barrier (Program.cs's
    /// critical <c>Task.WhenAll</c>) — returns. That is deliberately NOT a baseline-before-any-change
    /// guarantee: the S/R command registrations are members of the SAME barrier, and
    /// <c>Task.WhenAll</c> does not order its members, so a command dispatched mid-barrier can change
    /// the underlying state and emit before the baseline goes out. That ordering is safe without
    /// being prevented, because the baseline is a LIVE read — <paramref name="readSnapshot"/>
    /// evaluated at emit time — so a baseline that loses the race carries the changed state rather
    /// than overwriting it with a stale one. What the await does buy: any change AFTER the barrier
    /// emits strictly behind the already-transmitted baseline (one connection, FIFO delivery) for
    /// every subscriber connected throughout. A subscriber that connects later gets no replay either
    /// way — it seeds via the pull command.
    /// </summary>
    public async Task InitializeAsync()
    {
        // Subscribe FIRST, before the registration round-trips below, so no transition can slip
        // through unsubscribed while the network:registerEvent request is in flight. A transition
        // that beats registration just announces unregistered (main logs its once-per-name
        // deprecation warning), which is the right trade — a missed transition would be worse than an
        // early warning. The subscription lives for the process lifetime (these notifiers are startup
        // singletons, like the other PAPI services), so there is no unsubscribe — mirrors
        // SharedStore's process-lifetime change-event handler.
        subscribe(OnSnapshotChanged);

        // Best-effort — on rejection or failure, log and continue; emitting unregistered still works,
        // and startup must never break over this. A local function so the try/catch travels with the
        // request into the Task.WhenAll below.
        async Task RegisterEventBestEffortAsync()
        {
            try
            {
                bool accepted = await papiClient.SendRequestAsync<bool>(
                    RegisterEventMethod,
                    [eventName, eventDocumentation]
                );
                if (!accepted)
                    Console.Error.WriteLine(
                        $"Central registry rejected network event '{eventName}' (already registered "
                            + "by another process?); announcements will warn as unregistered"
                    );
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(
                    $"Failed to register network event '{eventName}' with the central registry; "
                        + $"announcements will warn as unregistered. {ex}"
                );
            }
        }

        // The command registration serves the pull surface: a renderer reads the current snapshot on
        // demand instead of waiting for the next transition. Run both registrations in parallel —
        // each is an independent round-trip to main, and awaiting them serially would let one stalled
        // response stack a second full request timeout onto the startup barrier.
        await Task.WhenAll(
            RegisterEventBestEffortAsync(),
            papiClient.RegisterRequestHandlerAsync(
                commandName,
                readSnapshot,
                null,
                commandDocumentation
            )
        );

        // Emit once now that both surfaces are up, so a subscriber that was already listening across
        // a backend restart converges on the fresh process's state instead of keeping whatever stale
        // state it last saw. AWAITED — unlike the event-driven forwards through OnSnapshotChanged,
        // which must never delay the underlying raise. Still best-effort: a failed emit is logged,
        // not thrown, because the next transition re-converges the subscriber and startup must never
        // break over a notify.
        try
        {
            await papiClient.SendEventAsync(eventName, readSnapshot());
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Failed to emit the baseline {eventName} snapshot: {ex}");
        }
    }

    /// <summary>
    /// Forwards a transition to the renderer as a PAPI event. Fire-and-forget: the underlying signal
    /// is raised inline on whatever thread changed the state (the arming thread, the sync worker) and
    /// must never be delayed or thrown into, so we never await the send.
    /// <para>
    /// <see cref="PapiClient.SendEventAsync"/> is declared <c>async</c>, so the compiler wraps its
    /// ENTIRE body — including anything before its first <c>await</c> — in a state machine: no
    /// exception from it can ever throw synchronously into this method. A bare <c>try/catch</c>
    /// around the discarded call (the shape <c>SharedStore.Set</c> uses for its own fire-and-forget
    /// <c>SendEventAsync</c>) is therefore DEAD here: every failure would land on the discarded
    /// <see cref="Task"/>, unobserved and unlogged. We instead capture the task and attach a
    /// fault-only continuation via <see cref="ThreadingUtils.RunTask"/> (the same helper other
    /// fire-and-forget call sites in this codebase use), so a failed send is actually logged. This
    /// keeps the same fire-and-forget semantics — nothing here awaits or re-throws into the raise.
    /// </para>
    /// </summary>
    private void OnSnapshotChanged(TSnapshot snapshot) =>
        ThreadingUtils.RunTask(
            papiClient.SendEventAsync(eventName, snapshot),
            $"send {eventName} event"
        );
}
