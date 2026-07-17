using System.Collections.Immutable;
using System.Diagnostics;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Process-wide coordination between ordinary project writes and an automatic (scheduled)
/// Send/Receive, so an editor change can never race the sync's on-disk file replacement (Mercurial
/// merge) and corrupt the project.
/// </summary>
/// <remarks>
/// <para>
/// <b>The coordination works in both directions:</b>
/// <list type="number">
/// <item>
/// <description>
/// <b>An armed sync rejects new writes to the syncing projects (fail-fast).</b> While a set of
/// projects is syncing, every <see cref="EnterWrite"/> for one of THOSE projects throws immediately
/// (message ending in <see cref="EditBlockedSentinel"/>) rather than queueing — a user's keystroke
/// must never hang behind a background sync. The editor catches the sentinel, shows an "editing
/// paused during Send/Receive" notice, and reverts the un-saved change. A write to a project that
/// is NOT being synced is unaffected and proceeds (see the per-project remarks below).
/// </description>
/// </item>
/// <item>
/// <description>
/// <b>A starting sync WAITS (bounded) for in-flight writes to drain.</b> <see cref="SetSyncing"/>
/// arms the gate, then waits up to <see cref="DrainTimeout"/> for already-open write scopes to
/// close before returning. The wait is bounded so a single stuck write can never deadlock a sync
/// start — on timeout it logs a warning and proceeds anyway (see the degraded path below).
/// </description>
/// </item>
/// </list>
/// </para>
/// <para>
/// <b>How it works — one atomic word.</b> All gate state that synchronization depends on lives in a
/// single <see cref="long"/> (<c>_state</c>): an "armed" flag bit plus the count of in-flight write
/// scopes. Every transition — enter a write, exit a write, arm, disarm — is a single interlocked
/// read-modify-write on that one word, so all transitions are totally ordered and each one sees the
/// exact state it replaces. The safety invariant falls out directly: a write scope can only open by
/// atomically incrementing the count on the very same word that arming sets the flag on, so every
/// scope-open is ordered strictly before or strictly after the arm. A scope that opened BEFORE the
/// arm is one the drain then waits for; a scope that opens AFTER the arm is rejected for any
/// project in the synced set (the per-project filter — see below), so no write to a synced project
/// can open once that project is armed. Because a write's mutation happens entirely between its
/// enter and exit operations (both full fences), a drained count also means every finished write's
/// effects are visible to the sync. (One consequence of the per-project filter: the drain is still
/// GLOBAL — it waits for the count to reach zero across ALL projects — but writes to NON-synced
/// projects may keep opening while armed, so a busy unrelated project can push the drain toward
/// its timeout and into the degraded path. That is an accepted cost of letting unrelated edits
/// continue; it never threatens safety, since only synced-project writes are what a synced
/// project's replacement could race, and those are barred.) The word also carries an arm
/// generation — the token <see cref="SetSyncing"/> returns — so <see cref="Clear(long)"/> can
/// check-and-disarm in the same single CAS (see the overlap remarks below). The core
/// mutual-exclusion invariant — no write executes inside its scope during a synced project's
/// file-replacement window — depends ONLY on the atomic word: the count++/arm ordering proves it,
/// and there is deliberately no "is the lock held" bookkeeping to fall out of step with reality.
/// <c>_blockedProjectIds</c> is pure data that
/// layers a per-project FILTER on top of that invariant: it selects WHICH projects an armed gate
/// rejects (both <see cref="EnterWrite"/> and <see cref="IsBlocked"/> now consult it), but it never
/// weakens the invariant — narrowing rejection can only let MORE writes through, and the
/// count++/arm ordering still bars any write to a synced project from racing that project's file
/// replacement. The set is published data-then-flag (see <see cref="SetSyncing"/>), so a reader
/// that observes the armed bit always observes the matching set; the only skew is the two benign
/// flag/set windows in the overlap remarks below, both of which resolve to "allow".
/// </para>
/// <para>
/// <b>Forgiving lifecycle contract (deliberate).</b> The arm→clear bracket is activated by code
/// that lives outside this repository (see activation below) and whose threading model this class
/// cannot see or test, so the gate assumes as little as possible:
/// <list type="bullet">
/// <item>
/// <description>
/// <see cref="SetSyncing"/> and <see cref="Clear()"/>/<see cref="Clear(long)"/> may run on ANY
/// thread, including different threads — an <c>await</c> between them (which resumes on a
/// different pool thread) is fine.
/// </description>
/// </item>
/// <item>
/// <description>
/// A write scope may be disposed on a different thread than the one that opened it, so a gated
/// method that comes to hold its scope across an <c>await</c> stays correct. (Still, hold scopes
/// tightly: a long-held scope delays a sync's drain toward its timeout.)
/// </description>
/// </item>
/// <item>
/// <description>
/// Nested <see cref="EnterWrite"/> calls do not crash or deadlock (there is no recursion policy) —
/// while the inner project is not armed, an inner scope simply counts as one more in-flight write.
/// They are NOT rejection-safe, though: the gate tracks no ownership, so if a sync of the SAME
/// project arms while the outer scope is open (the normal drain window), the inner call for that
/// project throws the sentinel MID-mutation and tears the outer write. (A method mutates one
/// project, so its outer and inner scopes share that project — the per-project filter does not save
/// it.) Keep one scope per mutation — a method that delegates to another write must call an un-gated
/// core inside its single outer scope (see <c>SetBookUsfmInScope</c>), never a second gated entry
/// point.
/// </description>
/// </item>
/// <item>
/// <description>
/// <see cref="Clear()"/> is idempotent and safe to call when nothing is armed, so it can serve as
/// crash recovery: if a sync worker dies without clearing, ANY thread (e.g. a watchdog or the next
/// sync) can call it to recover. Bracket code should prefer <see cref="Clear(long)"/> with the
/// token its <see cref="SetSyncing"/> returned — a newer arm turns that into a logged no-op, so a
/// late or duplicate Clear cannot disarm a sync it does not own. Double-disposing a scope and
/// over-releasing are guarded no-ops. No SetSyncing/Clear/Dispose sequence, on any combination of
/// threads, can leave writes permanently rejected. (A write scope that is never disposed is the
/// one durable failure: its count is deliberately NOT reset by Clear, so every later sync waits
/// out the full <see cref="DrainTimeout"/> and proceeds degraded.)
/// </description>
/// </item>
/// </list>
/// </para>
/// <para>
/// <b>Degraded (drain-timed-out) path.</b> If in-flight writes do not drain within
/// <see cref="DrainTimeout"/>, <see cref="SetSyncing"/> logs a warning and returns anyway — a sync
/// start must never hang forever behind a stuck write. The armed flag keeps rejecting NEW writes
/// exactly as on the normal path; only the already-stuck write(s) may still overlap the sync. This
/// is an accepted residual risk, traded against deadlocking every future sync. A caller that must
/// not run concurrently with even a stuck write can opt out per call: <see cref="SetSyncing"/>
/// with <c>throwOnDrainTimeout: true</c> rolls the arm back and throws
/// <see cref="TimeoutException"/> instead, leaving the retry/defer decision to the scheduler.
/// </para>
/// <para>
/// <b>Per-project rejection; one sync slot; overlap semantics.</b> Rejection is PER-PROJECT: while a
/// set of projects is syncing, only writes to THOSE projects are rejected — a write to any other
/// project proceeds normally. This is a DELIBERATE product requirement (PT9 parity — a sync locks
/// only the project it is syncing, so a user can keep editing project B while project A syncs). It
/// is a reversal of this gate's original "one global sync slot rejects ALL writes" behavior; both
/// <see cref="EnterWrite"/> and <see cref="IsBlocked"/> now consult <c>_blockedProjectIds</c>, and
/// the safety invariant is unaffected (narrowing rejection can only allow more writes; the
/// count++/arm ordering still bars any write to a synced project). There is still ONE arm slot (one
/// armed flag + generation): a repeat <see cref="SetSyncing"/> while armed takes over the slot — it
/// replaces the armed project-id set and returns a NEW token, invalidating every earlier one (call
/// it once per sync batch with the full set, and Clear with the latest token). A parameterless
/// <see cref="Clear()"/> always disarms; <see cref="Clear(long)"/> disarms only the bracket that
/// owns the slot, so a stale bracket's late Clear is a logged no-op instead of silently disarming a
/// newer sync. Overlapping arm→clear brackets are still not meaningful — the scheduler must
/// serialize sync runs — but no interleaving of calls can corrupt the state word; the worst outcome
/// of an overlap is an early disarm via a force-<see cref="Clear()"/> (or a stale pure-data set,
/// possibly for that whole bracket — see the benign windows below).
/// </para>
/// <para>
/// <b>Two benign flag/set-skew windows (why the per-project read is always safe).</b> The armed
/// flag and <c>_blockedProjectIds</c> are two separate words, so a disarm updates them in some
/// order and there is a brief window where they disagree. Both windows resolve to "allow the write",
/// never to a wrong rejection:
/// <list type="bullet">
/// <item><description>
/// <see cref="Clear(long)"/> disarms <b>flag-then-data</b> (the CAS clears the flag; then the set is
/// dropped to empty). In between: disarmed but the set is still non-empty. Harmless — rejection
/// short-circuits on the flag (<c>armed &amp;&amp; set.Contains</c>), so a disarmed gate rejects
/// nothing regardless of the stale set.
/// </description></item>
/// <item><description>
/// <see cref="Clear()"/> clears <b>data-then-flag</b> (the set is emptied; then the flag is
/// cleared). In between: still armed but the set is already empty, so writes to every project are
/// briefly allowed while technically armed. Acceptable — <see cref="Clear()"/> is the crash-recovery
/// hammer whose whole job is to stop rejecting; allowing writes a beat early is exactly its intent.
/// </description></item>
/// </list>
/// (Symmetrically, the arm side publishes data-then-flag — the set is fully populated before the
/// flag is set — so an armed reader never sees a stale/empty set for the arm it observes.)
/// <see cref="IsBlocked"/> answers per-project queries from the pure-data set alone (it ignores the
/// flag), so during these windows it can momentarily disagree with the gate.
/// </para>
/// <para>
/// <b>Distinct from the Send/Receive server-side repository lock.</b> This class is an
/// <i>in-process</i> gate between local editing and a local sync run. It is <b>not</b> the S/R
/// server's repository lock (the <c>lockrepo</c>/<c>unlockrepo</c> REST calls the sync makes
/// against the Send/Receive server to exclude <i>other clients</i> from pushing concurrently).
/// Different mechanism, different scope (this process vs. all clients of a shared repo), different
/// failure modes. Do not conflate the two.
/// </para>
/// <para>
/// <b>Inert in open-source Platform.Bible.</b> Nothing in public core ever calls
/// <see cref="SetSyncing"/>, so the gate is never armed, <see cref="IsBlocked"/> always returns
/// <c>false</c>, every <see cref="EnterWrite"/> scope succeeds, and no write is ever rejected —
/// public behavior is unchanged by this class. The Paratext 10 Studio closed-source patch brackets
/// each automatic sync with <see cref="SetSyncing"/> / <see cref="Clear(long)"/> (Jira PT-4210),
/// which is what activates the gate. This class is the public seam; the activation lives in the
/// patch.
/// </para>
/// </remarks>
internal static class SendReceiveWriteLock
{
    // The exact suffix on every rejection message. The Paratext 10 Studio Scripture editor matches
    // this sentinel to show an "editing paused during Send/Receive" notification (rather than the
    // generic permissions message) and revert the un-saved change.
    public const string EditBlockedSentinel = "(SR_EDIT_BLOCKED)";

    /// <summary>
    /// Raised whenever the block state changes: after a successful arm (with the armed ids), and
    /// after any disarm (with an empty set). A stale-token <see cref="Clear(long)"/> no-op and an
    /// already-disarmed <see cref="Clear()"/> do NOT raise (no transition occurred). This is a
    /// backend-authoritative signal a subscriber can forward to the renderer so the UI never has to
    /// infer the block state from indirect cues.
    /// <para>
    /// Subscribers MUST NOT throw and MUST return quickly: handlers run inline on the arming/clearing
    /// thread, and a slow handler delays that transition. This class is a pure synchronization
    /// primitive with no logger, so it swallows any exception a handler leaks (it must never let a
    /// subscriber fault corrupt the gate or abort an arm/clear) — real error handling and logging
    /// belong to the subscriber (see <see cref="SendReceiveBlockNotifierService"/>). Inert in public
    /// core: nothing arms the gate there, so this never fires.
    /// </para>
    /// <para>
    /// <b>Honest about ordering (deliberately no sequence stamp).</b> A raise happens AFTER its
    /// transition's atomic CAS on the state word, not as part of it, and carries no sequence
    /// number. Under the serialized-scheduler contract (one bracket at a time — see the class
    /// remarks), that is moot: a single thread's CAS-then-raise pairs are trivially delivered in
    /// the order they happened. The contract has exactly two documented escapes:
    /// <see cref="Clear()"/> may run on ANY thread as crash recovery, and a takeover
    /// <see cref="SetSyncing"/> can race a stale bracket's <see cref="Clear(long)"/>. Off-contract
    /// like that, two transitions on
    /// different threads can have their CAS succeed in one order but their raises run in the other
    /// (the winning thread can be preempted between its CAS and its raise while the other thread's
    /// CAS-then-raise both complete first) — a subscriber can then briefly observe events out of
    /// order and hold a stale snapshot. This is self-correcting: <see cref="GetBlockState"/> can
    /// always re-seed on demand, and the very next transition raises the true state again. Given
    /// that self-correction and that the reordering is only reachable outside the serialized
    /// contract this class otherwise guarantees, adding a sequence stamp is deliberately YAGNI — it
    /// would only ever matter for these two off-contract races, for a staleness window no worse
    /// than the benign flag/set-skew windows already documented above.
    /// </para>
    /// </summary>
    public static event Action<SendReceiveBlockState>? BlockStateChanged;

    // The single atomic word all mutual exclusion rests on (see the class remarks): bits 0–31
    // count in-flight write scopes, bit 32 is the "a sync is armed" flag, and bits 33–62 hold the
    // 30-bit arm generation — the token SetSyncing returns and Clear(token) checks, riding in the
    // same word so the check-and-disarm stays one CAS. Token 0 is never issued (it is skipped on
    // wrap) so callers can safely treat default(long) as "no arm"; at 30 bits a stale token could
    // only false-match after ~10^9 intervening arms. Mutate ONLY via Interlocked operations; read
    // via Volatile.Read — it gives acquire ordering, and the BCL implements the long overload with
    // an interlocked read on 32-bit runtimes, so (unlike a plain long read, which can tear there)
    // it is also atomic. The shipping targets are 64-bit; that is defense for ports.
    private const long ArmedFlag = 1L << 32;
    private const long InFlightCountMask = 0xFFFF_FFFFL;
    private const int GenerationShift = 33;
    private const long GenerationMask = 0x3FFF_FFFFL << GenerationShift;
    private static long _state;

    private static long CountOf(long state) => state & InFlightCountMask;

    private static long GenerationOf(long state) => (state & GenerationMask) >> GenerationShift;

    // Cached empty set: the non-default comparer defeats ImmutableHashSet's Empty singleton, so a
    // computed property would allocate on every access. MUST stay declared ABOVE _blockedProjectIds
    // (static field initializers run in textual order, and _blockedProjectIds reads this one — the
    // other way around it would silently initialize to null).
    private static readonly IImmutableSet<string> EmptyProjectIds = ImmutableHashSet.Create<string>(
        StringComparer.OrdinalIgnoreCase
    );

    // Pure data (no synchronization role — the atomic word does all exclusion): drives IsBlocked
    // per-project queries. Published (volatile) before the armed flag is set and replaced wholesale,
    // never mutated. Case-insensitive because project ID casing varies across call sites.
    private static volatile IImmutableSet<string> _blockedProjectIds = EmptyProjectIds;

    // How long SetSyncing waits for in-flight writes to drain before giving up. BOUNDED on purpose:
    // a sync start must never be able to deadlock behind a write scope that (through a bug, a stuck
    // ParatextData call, or an editor that forgot to dispose) never completes. On timeout we log
    // and proceed (degraded path), accepting a small residual race rather than hanging the sync
    // forever. Internal setter exists ONLY so tests can shorten it; production always uses the
    // default.
    internal static TimeSpan DrainTimeout { get; set; } = TimeSpan.FromSeconds(10);

    /// <summary>Whether a sync is currently armed. For tests only.</summary>
    internal static bool IsArmed => (Volatile.Read(ref _state) & ArmedFlag) != 0;

    /// <summary>The number of write scopes currently open. For tests only.</summary>
    internal static long InFlightWriteCount => CountOf(Volatile.Read(ref _state));

    /// <summary>The armed project-id set exactly as stored. For tests only.</summary>
    internal static IImmutableSet<string> ArmedProjectIds => _blockedProjectIds;

    /// <summary>The largest value the arm generation can hold before wrapping. For tests only
    /// (lets a test park the generation at the wrap boundary via
    /// <see cref="ResetForTests"/>).</summary>
    internal static long MaxGeneration => GenerationMask >> GenerationShift;

    /// <summary>
    /// Resets ALL gate state, INCLUDING the in-flight count that <see cref="Clear()"/> deliberately
    /// leaves alone. For tests only: contains the blast radius of a test that leaked a write scope
    /// (otherwise every later <see cref="SetSyncing"/> in the run would burn its full
    /// <see cref="DrainTimeout"/>). Optionally seeds the arm generation (e.g. to
    /// <see cref="MaxGeneration"/>, to exercise the wrap). Never call in production — a straggler
    /// scope disposed after this reset would decrement a newer scope's count.
    /// </summary>
    internal static void ResetForTests(long generation = 0)
    {
        // Drop every BlockStateChanged subscriber too — the event is static, so a subscription a
        // test wires up would otherwise leak into later tests (and be invoked by their transitions).
        BlockStateChanged = null;
        _blockedProjectIds = EmptyProjectIds;
        Volatile.Write(ref _state, (generation << GenerationShift) & GenerationMask);
    }

    /// <summary>
    /// A snapshot of the current block state: whether the gate is armed, and (when armed) the set of
    /// project ids it is rejecting writes for. When not armed, <see cref="SendReceiveBlockState.IsBlocking"/>
    /// is <c>false</c> and the id set is empty. Always the not-blocking snapshot in public core.
    /// <para>
    /// Best-effort, not atomic: the armed flag and the pure-data set are two independent reads, so a
    /// concurrent arm/clear can land between them (the two benign flag/set windows in the class
    /// remarks). Any skew is momentary and self-correcting — every arm and clear also fires
    /// <see cref="BlockStateChanged"/>, so a subscriber that seeds from this and then follows the
    /// event stream converges on the true state.
    /// </para>
    /// </summary>
    public static SendReceiveBlockState GetBlockState()
    {
        bool isBlocking = (Volatile.Read(ref _state) & ArmedFlag) != 0;
        // When disarmed, report an empty set regardless of the pure-data field (Clear() empties the
        // set data-then-flag, so it can briefly still hold ids while already disarmed).
        return new SendReceiveBlockState(
            isBlocking,
            isBlocking ? _blockedProjectIds.ToArray() : []
        );
    }

    // Invokes BlockStateChanged, isolating the gate from any subscriber fault. There is no logger in
    // this pure class by design: subscribers must not throw, and the notifier service owns real
    // error handling and logging (see the BlockStateChanged remarks). Swallowing here is the
    // last-resort backstop that keeps a misbehaving subscriber from corrupting the gate or aborting
    // an arm/clear — it must never rethrow.
    private static void RaiseBlockStateChanged(SendReceiveBlockState state)
    {
        try
        {
            BlockStateChanged?.Invoke(state);
        }
        catch
        {
            // Deliberately swallowed — see above. No logger in this class.
        }
    }

    private static InvalidOperationException EditBlocked(string projectId) =>
        new(
            $"Cannot write to project '{projectId}' while an automatic Send/Receive is in "
                + $"progress. {EditBlockedSentinel}"
        );

    /// <summary>
    /// Marks the given projects as being synced, then waits (bounded by <see cref="DrainTimeout"/>)
    /// for any already-in-flight writes to drain before returning. From the moment this arms the
    /// gate, new <see cref="EnterWrite"/> calls for a project IN THIS BATCH fail fast (the
    /// per-project filter — see the class remarks); a write to a project NOT in the batch is
    /// unaffected. After it returns, either no write scopes remain open (normal path — the drain
    /// itself is still GLOBAL, so it waits on in-flight writes to every project, not just this
    /// batch's), or the drain timed out and it has logged a warning and proceeded anyway (degraded
    /// path — new writes to this batch's projects are still rejected either way; or, with
    /// <paramref name="throwOnDrainTimeout"/>, it rolled this arm back and threw instead), or a
    /// concurrent <see cref="Clear()"/> / newer <see cref="SetSyncing"/> ended this arm mid-drain
    /// (logged — the gate is then no longer rejecting on behalf of THIS sync). Replaces any
    /// previously set project list; call once per sync batch with the full set of projects. Null or
    /// empty ids in the batch are ignored — an all-invalid batch still arms (and the drain still
    /// runs) but then rejects NOTHING, since the per-project filter it arms with is empty (see the
    /// logged warning below).
    /// <para>
    /// May be called from any thread; the bracket-ending Clear may later run on a different thread
    /// (an <c>await</c> between them is fine). End the bracket with <see cref="Clear(long)"/> and
    /// the returned token — a stale token is a logged no-op, so a late Clear can never disarm a
    /// newer sync's arm. Do not call while holding an open <see cref="EnterWrite"/> scope this
    /// call would wait for — the drain cannot finish and will time out into the degraded path.
    /// Overlapping sync brackets are still not meaningful (see the class remarks); the scheduler
    /// must serialize sync runs.
    /// </para>
    /// </summary>
    /// <param name="projectIds">The full set of project ids in this sync batch (null or empty
    /// entries are ignored).</param>
    /// <param name="throwOnDrainTimeout">When <c>true</c>, a drain timeout aborts the sync start
    /// instead of degrading: this arm is rolled back (nothing stays armed on this bracket's
    /// behalf, so writes flow again and the caller has NO cleanup obligation) and a
    /// <see cref="TimeoutException"/> is thrown — the sync must not proceed; the caller decides
    /// whether to retry, defer, or notify. When <c>false</c> (the default), the degraded path
    /// applies (see the class remarks). This affects ONLY the drain-timeout outcome — an arm
    /// ended or replaced mid-drain still returns normally with a logged warning.</param>
    /// <returns>The arm token identifying this bracket; pass it to <see cref="Clear(long)"/>.</returns>
    /// <exception cref="TimeoutException">The drain timed out and
    /// <paramref name="throwOnDrainTimeout"/> was <c>true</c>; the arm has been rolled back.
    /// </exception>
    public static long SetSyncing(IEnumerable<string> projectIds, bool throwOnDrainTimeout = false)
    {
        ArgumentNullException.ThrowIfNull(projectIds);

        // Build the set BEFORE touching any state, so an exception while enumerating (or a
        // defective batch) can never leave a torn arm.
        var armedProjectIds = projectIds
            .Where(projectId => !string.IsNullOrEmpty(projectId))
            .ToImmutableHashSet(StringComparer.OrdinalIgnoreCase);

        // An all-invalid batch is almost certainly a caller bug (e.g. a failed project lookup).
        // Still arm, and the drain still runs and returns a valid token — none of that machinery
        // cares whether the set is empty. But under the PER-PROJECT filter (EnterWrite/IsBlocked
        // both check armed && set.Contains(id)), an empty set can never match, so this arm rejects
        // NO writes for ANY project: it is a fully armed, fully toothless bracket for its whole
        // lifetime. Say so loudly, because IsBlocked will ALSO report false for every project, so
        // nothing here looks broken from the outside — otherwise this is baffling to diagnose.
        if (armedProjectIds.Count == 0)
            Console.Error.WriteLine(
                "[SendReceiveWriteLock] Warning: SetSyncing was called with no valid project ids; "
                    + "the gate is armed and the drain still ran, but the per-project blocked set "
                    + "is empty, so this arm blocks NO writes for any project (IsBlocked will also "
                    + "report false for every project)."
            );

        // Publish the pure data first, then arm. Arming is a single CAS on the state word that
        // sets the flag AND advances the generation (the returned token): every write that enters
        // afterward must observe the flag (all transitions on the word are totally ordered) and is
        // rejected, and every earlier token goes stale in the same atomic step. Token 0 is skipped
        // on wrap — it stays reserved as a natural "no arm" default for callers.
        _blockedProjectIds = armedProjectIds;
        long token;
        while (true)
        {
            long state = Volatile.Read(ref _state);
            token = (GenerationOf(state) + 1) & (GenerationMask >> GenerationShift);
            if (token == 0)
                token = 1;
            long armedState = CountOf(state) | ArmedFlag | (token << GenerationShift);
            if (Interlocked.CompareExchange(ref _state, armedState, state) == state)
                break;
        }

        // The block state just changed (armed, with this batch's ids) — announce it. Raised here,
        // right after the arm, so the signal fires on every arm including the degraded path; on the
        // throwOnDrainTimeout path the subsequent rollback Clear(token) fires its own disarm signal.
        RaiseBlockStateChanged(new SendReceiveBlockState(true, armedProjectIds));

        // Drain: wait (bounded) until no write scopes remain open — or until this arm is ended by
        // a concurrent Clear (without that second condition the loop's premise would be gone: once
        // disarmed, writes enter again and the count may never settle, so the wait would just burn
        // the whole timeout for nothing). Poll with SpinWait.SpinOnce(), which escalates
        // spin → yield → Sleep(1): after the first ~20 iterations the loop wakes ~once per ms and
        // uses negligible CPU. (Deliberately NOT SpinWait.SpinUntil — it never escalates to
        // Sleep(1), so it would busy-burn a core for the whole drain.)
        var spinner = new SpinWait();
        var stopwatch = Stopwatch.StartNew();
        while (true)
        {
            long current = Volatile.Read(ref _state);
            if (CountOf(current) == 0 || (current & ArmedFlag) == 0)
                break;
            if (stopwatch.Elapsed >= DrainTimeout)
                break;
            spinner.SpinOnce();
        }

        // Triage on a fresh read (the authority — the state may have settled between the last poll
        // and here).
        long observed = Volatile.Read(ref _state);
        if ((observed & ArmedFlag) == 0 || GenerationOf(observed) != token)
        {
            Console.Error.WriteLine(
                "[SendReceiveWriteLock] Warning: this arm was ended (Clear) or replaced (a newer "
                    + "SetSyncing) while its drain was still waiting; proceeding, but the gate is "
                    + "no longer rejecting writes on behalf of THIS sync."
            );
            return token;
        }
        long stillInFlight = CountOf(observed);
        if (stillInFlight != 0)
        {
            string drainFailure =
                $"{stillInFlight} in-flight project write(s) did not drain within "
                + $"{DrainTimeout.TotalSeconds:0.#}s";
            if (throwOnDrainTimeout)
            {
                // Roll this arm back BEFORE throwing (own-token disarm — a safe no-op if something
                // else already took or cleared the slot in the meantime), so a throw always means
                // "nothing armed on this bracket's behalf, writes flow again, no cleanup owed".
                Clear(token);
                throw new TimeoutException(
                    $"{drainFailure}; the Send/Receive arm was rolled back and the sync must "
                        + "not proceed."
                );
            }

            // Degraded: proceed rather than deadlock the sync. The armed flag keeps rejecting
            // new writes; only the already-stuck write(s) we couldn't drain may still overlap.
            Console.Error.WriteLine(
                $"[SendReceiveWriteLock] Warning: {drainFailure}; proceeding with Send/Receive "
                    + "anyway (new writes stay rejected while the sync is armed)."
            );
        }
        return token;
    }

    /// <summary>
    /// Ends the sync UNCONDITIONALLY: disarms the gate (whichever bracket armed it) and clears the
    /// armed project set, so writes are accepted again. May be called from ANY thread, is
    /// idempotent, and is safe to call when no sync is active at all — this is the force/crash
    /// recovery path (e.g. a watchdog, or the next sync finding a dead worker's arm still set).
    /// Normal bracket code should prefer <see cref="Clear(long)"/>, which cannot disarm a sync it
    /// does not own.
    /// </summary>
    public static void Clear()
    {
        _blockedProjectIds = EmptyProjectIds;
        long previous = Interlocked.And(ref _state, ~ArmedFlag);
        // Announce the disarm only if this call actually cleared an armed flag — a Clear() when
        // nothing was armed is a no-op and must not fire a spurious "changed" signal (consistent
        // with the stale-token Clear(long) no-op below).
        if ((previous & ArmedFlag) != 0)
            RaiseBlockStateChanged(new SendReceiveBlockState(false, []));
    }

    /// <summary>
    /// Ends the sync bracket identified by <paramref name="token"/> (returned by
    /// <see cref="SetSyncing"/>): disarms only if that bracket still owns the sync slot. A stale
    /// token — a newer <see cref="SetSyncing"/> has taken the slot — is a logged no-op, so a late
    /// or duplicate Clear can never disarm a newer sync's arm. When nothing is armed at all this
    /// is a silent no-op (idempotent). Runs on any thread.
    /// </summary>
    public static void Clear(long token)
    {
        while (true)
        {
            long state = Volatile.Read(ref _state);
            if ((state & ArmedFlag) == 0)
                return; // Idempotent: nothing armed (this bracket was already cleared).
            if (GenerationOf(state) != token)
            {
                Console.Error.WriteLine(
                    "[SendReceiveWriteLock] Warning: Clear(token) ignored a stale token — a newer "
                        + "SetSyncing owns the sync slot (late Clear from an overlapping bracket?)."
                );
                return;
            }
            if (Interlocked.CompareExchange(ref _state, state & ~ArmedFlag, state) == state)
            {
                // The disarm won atomically against the token check; now drop the pure-data set.
                _blockedProjectIds = EmptyProjectIds;
                // A real disarm happened (this bracket owned the slot) — announce it. The
                // stale-token and idempotent-no-op paths above return without raising.
                RaiseBlockStateChanged(new SendReceiveBlockState(false, []));
                return;
            }
        }
    }

    /// <summary>
    /// Whether writes to <paramref name="projectId"/> are currently blocked by an in-progress
    /// automatic Send/Receive. Always <c>false</c> in public core (see the class remarks). Kept for
    /// read-only consumers (e.g. status queries); write paths must use <see cref="EnterWrite"/> so
    /// their mutation is what the sync's drain waits for. This answer is per-project and now agrees
    /// with <see cref="EnterWrite"/>'s rejection decision (both consult the same blocked set), apart
    /// from the two benign flag/set-skew windows noted in the class remarks — this pure-data query
    /// ignores the armed flag, so during those windows it can momentarily disagree with the gate.
    /// </summary>
    public static bool IsBlocked(string? projectId)
    {
        return !string.IsNullOrEmpty(projectId) && _blockedProjectIds.Contains(projectId);
    }

    /// <summary>
    /// Opens a write scope for <paramref name="projectId"/>. Use as the FIRST statement of any
    /// method that mutates the project, so the scope brackets the whole mutation:
    /// <code>using var _ = SendReceiveWriteLock.EnterWrite(projectId);</code>
    /// Throws immediately (message ending in <see cref="EditBlockedSentinel"/>) if a Send/Receive is
    /// armed AND <paramref name="projectId"/> is one of the projects being synced — it NEVER queues
    /// or blocks the caller. A write to a project NOT in the syncing set proceeds (its on-disk files
    /// are not what this sync replaces). Otherwise the open scope counts as an in-flight write until
    /// disposed, and a sync starting via <see cref="SetSyncing"/> waits for it to close before
    /// replacing files. A no-op gate in public core (nothing arms the gate there).
    /// <para>
    /// The scope is forgiving: it may be disposed on a different thread (holding it across an
    /// <c>await</c> is safe, though scopes should stay tight — a long-held scope delays a sync's
    /// drain toward its timeout), and double-dispose is a no-op. Nesting does not crash, but it is
    /// NOT safe around a live sync of the SAME project — if a sync of this project arms while the
    /// outer scope is open, the inner call for that project throws mid-mutation (see the class
    /// remarks); keep one scope per mutation.
    /// </para>
    /// This is a PER-PROJECT gate: while a set of projects is syncing, only writes to THOSE projects
    /// are rejected; writes to any other project flow normally (PT9 parity — a sync locks only the
    /// project it is syncing, so editing project B stays possible while project A syncs).
    /// </summary>
    public static IDisposable EnterWrite(string projectId)
    {
        ArgumentNullException.ThrowIfNull(projectId);

        // Atomically "observe (not-armed OR not-my-project) AND count myself in-flight" in one
        // read-modify-write on the state word. This is the load-bearing step: arming is also a
        // single operation on the same word, so the count++ either happens entirely before the arm
        // (the sync's drain then waits for the scope to close) or entirely after it. When it lands
        // after the arm, we reject ONLY if this project is in the blocked set.
        //
        // Why reading the set here is safe (no torn view): SetSyncing publishes _blockedProjectIds
        // (a volatile field) BEFORE the CAS that sets the armed flag (data-then-flag). All writes
        // to the state word are totally ordered, and Volatile.Read gives acquire ordering, so any
        // thread that observes the armed bit is guaranteed to also observe the fully-populated set
        // that was published ahead of it (or a NEWER set from a takeover arm — equally valid). We
        // therefore never see "armed" paired with a stale/empty set belonging to an earlier arm.
        // The set is re-read on every loop iteration together with the freshly re-read state, so a
        // failed CAS that re-reads a newer state also re-reads the set consistent with it. (Two
        // benign windows where flag and set momentarily disagree are documented in the class
        // remarks — both resolve to "allow", never to a wrong rejection.)
        while (true)
        {
            long state = Volatile.Read(ref _state);
            if ((state & ArmedFlag) != 0 && _blockedProjectIds.Contains(projectId))
                throw EditBlocked(projectId);
            if (Interlocked.CompareExchange(ref _state, state + 1, state) == state)
                return new WriteScope();
        }
    }

    /// <summary>
    /// Closes a write scope: atomically decrements the in-flight count. Guarded against underflow
    /// (a release with no matching open scope is logged and ignored) so no caller bug can corrupt
    /// the armed flag stored in the same word.
    /// </summary>
    private static void ExitWrite()
    {
        while (true)
        {
            long state = Volatile.Read(ref _state);
            if (CountOf(state) == 0)
            {
                Console.Error.WriteLine(
                    "[SendReceiveWriteLock] Error: a write scope was released with no write "
                        + "in flight (unbalanced Dispose); ignoring."
                );
                return;
            }
            if (Interlocked.CompareExchange(ref _state, state - 1, state) == state)
                return;
        }
    }

    /// <summary>
    /// The disposable returned by <see cref="EnterWrite"/>. Releases its in-flight count exactly
    /// once, from whatever thread disposes it (an interlocked guard makes cross-thread double-
    /// dispose safe).
    /// </summary>
    private sealed class WriteScope : IDisposable
    {
        private int _disposed;

        public void Dispose()
        {
            if (Interlocked.Exchange(ref _disposed, 1) != 0)
                return;
            ExitWrite();
        }
    }
}

/// <summary>
/// An immutable snapshot of <see cref="SendReceiveWriteLock"/>'s block state, carried by
/// <see cref="SendReceiveWriteLock.BlockStateChanged"/> and returned by
/// <see cref="SendReceiveWriteLock.GetBlockState"/>.
/// </summary>
/// <param name="IsBlocking">Whether an automatic Send/Receive is currently armed (rejecting writes
/// to the listed projects). <c>false</c> whenever the gate is idle — always so in public core.</param>
/// <param name="ProjectIds">The project ids whose writes are being rejected while
/// <paramref name="IsBlocking"/> is <c>true</c>; empty when not blocking. Serialized to the PAPI as
/// a JSON array under the camelCase key <c>projectIds</c> (see below).</param>
/// <remarks>
/// Serializes to the exact wire shape the renderer consumes — <c>{ isBlocking, projectIds }</c> —
/// via the shared PAPI JSON options (<c>PropertyNamingPolicy = CamelCase</c>, configured on the
/// JSON-RPC formatter in <c>SerializationOptions</c>), so no per-property attributes are needed. The
/// notifier (<c>SendReceiveBlockNotifierService</c>) sends this record straight over the wire as both
/// the <c>onSyncWriteLockChanged</c> event payload and the <c>getAutoSyncBlocking</c> command return.
/// </remarks>
public readonly record struct SendReceiveBlockState(
    bool IsBlocking,
    IReadOnlyCollection<string> ProjectIds
);
