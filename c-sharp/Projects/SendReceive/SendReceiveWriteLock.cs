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
/// <b>An armed sync rejects new writes (fail-fast).</b> While a sync is armed, every
/// <see cref="EnterWrite"/> throws immediately (message ending in
/// <see cref="EditBlockedSentinel"/>) rather than queueing — a user's keystroke must never hang
/// behind a background sync. The editor catches the sentinel, shows an "editing paused during
/// Send/Receive" notice, and reverts the un-saved change.
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
/// atomically observing "not armed" while incrementing the count, and arming atomically sets the
/// flag, so after the arming operation NO new write scope can open, and the in-flight count the
/// drain then waits on can only fall. Because a write's mutation happens entirely between its enter
/// and exit operations (both full fences), a drained count also means every finished write's
/// effects are visible to the sync. The word also carries an arm generation — the token
/// <see cref="SetSyncing"/> returns — so <see cref="Clear(long)"/> can check-and-disarm in the
/// same single CAS (see the overlap remarks below). No mutual exclusion depends on any other
/// field: <c>_blockedProjectIds</c> is pure data (it only feeds <see cref="IsBlocked"/> queries,
/// and can disagree with the gate while racing arm/clear calls overlap — potentially for that
/// whole bracket, not just momentarily; rejection never consults it), and there is deliberately
/// no "is the lock held" bookkeeping to fall out of step with reality.
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
/// while nothing is armed, an inner scope simply counts as one more in-flight write. They are NOT
/// rejection-safe, though: the gate tracks no ownership, so if a sync arms while the outer scope
/// is open (the normal drain window), the inner call throws the sentinel MID-mutation and tears
/// the outer write. Keep one scope per mutation — a method that delegates to another write must
/// call an un-gated core inside its single outer scope (see <c>SetBookUsfmInScope</c>), never a
/// second gated entry point.
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
/// <b>One global sync slot; overlap semantics.</b> The gate is global: while ANY sync is armed, ALL
/// project writes are rejected (automatic syncs are globally exclusive by design), which is why
/// rejection does not consult the per-project set. A repeat <see cref="SetSyncing"/> while armed
/// takes over the slot: it replaces the armed project-id set and returns a NEW token, invalidating
/// every earlier one (call it once per sync batch with the full set, and Clear with the latest
/// token). A parameterless <see cref="Clear()"/> always disarms; <see cref="Clear(long)"/> disarms
/// only the bracket that owns the slot, so a stale bracket's late Clear is a logged no-op instead
/// of silently disarming a newer sync. Overlapping arm→clear brackets are still not meaningful —
/// the scheduler must serialize sync runs — but no interleaving of calls can corrupt the state
/// word; the worst outcome of an overlap is now an early disarm via a force-<see cref="Clear()"/>
/// (or a stale pure-data set, possibly for that whole bracket — see above).
/// <see cref="IsBlocked"/> answers per-project queries from the pure-data set and is deliberately
/// narrower than the global gate.
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
        _blockedProjectIds = EmptyProjectIds;
        Volatile.Write(ref _state, (generation << GenerationShift) & GenerationMask);
    }

    private static InvalidOperationException EditBlocked(string projectId) =>
        new(
            $"Cannot write to project '{projectId}' while an automatic Send/Receive is in "
                + $"progress. {EditBlockedSentinel}"
        );

    /// <summary>
    /// Marks the given projects as being synced, then waits (bounded by <see cref="DrainTimeout"/>)
    /// for any already-in-flight writes to drain before returning. From the moment this arms the
    /// gate, new <see cref="EnterWrite"/> calls for ANY project fail fast; after it returns, either
    /// no write scopes remain open (normal path), or the drain timed out and it has logged a
    /// warning and proceeded anyway (degraded path — new writes are still rejected either way; or,
    /// with <paramref name="throwOnDrainTimeout"/>, it rolled this arm back and threw instead), or
    /// a concurrent <see cref="Clear()"/> / newer <see cref="SetSyncing"/> ended this arm mid-drain
    /// (logged — the gate is then no longer rejecting on behalf of THIS sync). Replaces any
    /// previously set project list; call once per sync batch with the full set of projects. Null or
    /// empty ids in the batch are ignored (an all-invalid batch still arms the global gate, with a
    /// logged warning).
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
        // Still arm — fail-safe: an armed gate with an empty set rejects writes exactly like any
        // other arm — but say so, because IsBlocked will report false for every project while
        // every write is rejected, which is otherwise baffling to diagnose.
        if (armedProjectIds.Count == 0)
            Console.Error.WriteLine(
                "[SendReceiveWriteLock] Warning: SetSyncing was called with no valid project ids; "
                    + "the global gate is armed anyway (all writes rejected), but IsBlocked will "
                    + "report false for every project."
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
        Interlocked.And(ref _state, ~ArmedFlag);
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
                return;
            }
        }
    }

    /// <summary>
    /// Whether writes to <paramref name="projectId"/> are currently blocked by an in-progress
    /// automatic Send/Receive. Always <c>false</c> in public core (see the class remarks). Kept for
    /// read-only consumers (e.g. status queries); write paths must use <see cref="EnterWrite"/> so
    /// their mutation is what the sync's drain waits for. Note this pure-data answer is per-project,
    /// whereas <see cref="EnterWrite"/> is a global gate (any armed sync rejects all writes).
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
    /// armed — it NEVER queues or blocks the caller. Otherwise the open scope counts as an in-flight
    /// write until disposed, and a sync starting via <see cref="SetSyncing"/> waits for it to close
    /// before replacing files. A no-op gate in public core (nothing arms the gate there).
    /// <para>
    /// The scope is forgiving: it may be disposed on a different thread (holding it across an
    /// <c>await</c> is safe, though scopes should stay tight — a long-held scope delays a sync's
    /// drain toward its timeout), and double-dispose is a no-op. Nesting does not crash, but it is
    /// NOT safe around a live sync — if a sync arms while the outer scope is open, the inner call
    /// throws mid-mutation (see the class remarks); keep one scope per mutation.
    /// </para>
    /// Because arming is global, this is a global gate: while ANY project is syncing, ALL project
    /// writes are rejected (syncs are globally exclusive by design).
    /// </summary>
    public static IDisposable EnterWrite(string projectId)
    {
        ArgumentNullException.ThrowIfNull(projectId);

        // Atomically "observe not-armed AND count myself in-flight" in one read-modify-write on the
        // state word. This is the load-bearing step: arming is also a single operation on the same
        // word, so this either happens entirely before the arm (the sync's drain then waits for the
        // scope to close) or entirely after it (rejected here). There is no interleaving in which a
        // write slips past an armed sync.
        while (true)
        {
            long state = Volatile.Read(ref _state);
            if ((state & ArmedFlag) != 0)
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
