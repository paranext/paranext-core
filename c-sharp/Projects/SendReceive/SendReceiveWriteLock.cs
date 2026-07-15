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
/// effects are visible to the sync. No mutual exclusion depends on any other field:
/// <c>_blockedProjectIds</c> is pure data (it only feeds <see cref="IsBlocked"/> queries), and
/// there is deliberately no "is the lock held" bookkeeping to fall out of step with reality.
/// </para>
/// <para>
/// <b>Forgiving lifecycle contract (deliberate).</b> The arm→clear bracket is activated by code
/// that lives outside this repository (see activation below) and whose threading model this class
/// cannot see or test, so the gate assumes as little as possible:
/// <list type="bullet">
/// <item>
/// <description>
/// <see cref="SetSyncing"/> and <see cref="Clear"/> may run on ANY thread, including different
/// threads — an <c>await</c> between them (which resumes on a different pool thread) is fine.
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
/// Nested <see cref="EnterWrite"/> calls are benign (a gated method may call another gated method);
/// the inner scope simply counts as one more in-flight write until disposed.
/// </description>
/// </item>
/// <item>
/// <description>
/// <see cref="Clear"/> is idempotent and safe to call when nothing is armed, so it can serve as
/// crash recovery: if a sync worker dies without clearing, ANY thread (e.g. a watchdog or the next
/// sync) can call <see cref="Clear"/> to recover. Double-disposing a scope and over-releasing are
/// guarded no-ops. No call sequence, on any combination of threads, can wedge the gate permanently.
/// </description>
/// </item>
/// </list>
/// </para>
/// <para>
/// <b>Degraded (drain-timed-out) path.</b> If in-flight writes do not drain within
/// <see cref="DrainTimeout"/>, <see cref="SetSyncing"/> logs a warning and returns anyway — a sync
/// start must never hang forever behind a stuck write. The armed flag keeps rejecting NEW writes
/// exactly as on the normal path; only the already-stuck write(s) may still overlap the sync. This
/// is an accepted residual risk, traded against deadlocking every future sync.
/// </para>
/// <para>
/// <b>One global sync slot; overlap semantics.</b> The gate is global: while ANY sync is armed, ALL
/// project writes are rejected (automatic syncs are globally exclusive by design), which is why
/// rejection does not consult the per-project set. A repeat <see cref="SetSyncing"/> while armed
/// replaces the armed project-id set (call it once per sync batch with the full set), and any
/// <see cref="Clear"/> fully disarms. Overlapping arm→clear brackets from two concurrent syncs are
/// therefore not meaningful — the scheduler must serialize sync runs — but no interleaving of calls
/// can corrupt the gate; the worst outcome of an overlap is disarming earlier than one of the two
/// syncs expected. <see cref="IsBlocked"/> answers per-project queries from the pure-data set and is
/// deliberately narrower than the global gate.
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
/// each automatic sync with <see cref="SetSyncing"/> / <see cref="Clear"/> (Jira PT-4210), which is
/// what activates the gate. This class is the public seam; the activation lives in the patch.
/// </para>
/// </remarks>
internal static class SendReceiveWriteLock
{
    // The exact suffix on every rejection message. The Paratext 10 Studio Scripture editor matches
    // this sentinel to show an "editing paused during Send/Receive" notification (rather than the
    // generic permissions message) and revert the un-saved change.
    public const string EditBlockedSentinel = "(SR_EDIT_BLOCKED)";

    // The single atomic word all mutual exclusion rests on (see the class remarks): bit 32 is the
    // "a sync is armed" flag, bits 0–31 count in-flight write scopes. Mutate ONLY via Interlocked
    // operations; read via Volatile.Read (a long read is not atomic on 32-bit without it).
    private const long ArmedFlag = 1L << 32;
    private const long InFlightCountMask = 0xFFFF_FFFFL;
    private static long _state;

    // Pure data (no synchronization role — the atomic word does all exclusion): drives IsBlocked
    // per-project queries. Published (volatile) before the armed flag is set and replaced wholesale,
    // never mutated. Case-insensitive because project ID casing varies across call sites.
    private static volatile IImmutableSet<string> _blockedProjectIds = EmptyProjectIds;

    private static IImmutableSet<string> EmptyProjectIds =>
        ImmutableHashSet.Create<string>(StringComparer.OrdinalIgnoreCase);

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
    internal static long InFlightWriteCount => Volatile.Read(ref _state) & InFlightCountMask;

    private static InvalidOperationException EditBlocked(string projectId) =>
        new(
            $"Cannot write to project '{projectId}' while an automatic Send/Receive is in "
                + $"progress. {EditBlockedSentinel}"
        );

    /// <summary>
    /// Marks the given projects as being synced, then waits (bounded by <see cref="DrainTimeout"/>)
    /// for any already-in-flight writes to drain before returning. From the moment this arms the
    /// gate, new <see cref="EnterWrite"/> calls for ANY project fail fast; after it returns, either
    /// no write scopes remain open (normal path) or the drain timed out and it has logged a warning
    /// and proceeded anyway (degraded path — new writes are still rejected either way). Replaces any
    /// previously set project list; call once per sync batch with the full set of projects. Null or
    /// empty ids in the batch are ignored.
    /// <para>
    /// May be called from any thread; <see cref="Clear"/> may later run on a different thread (an
    /// <c>await</c> between them is fine). Do not call while holding an open <see cref="EnterWrite"/>
    /// scope this call would wait for — the drain cannot finish and will time out into the degraded
    /// path. Overlapping sync brackets are not meaningful (see the class remarks); the scheduler
    /// must serialize sync runs.
    /// </para>
    /// </summary>
    public static void SetSyncing(IEnumerable<string> projectIds)
    {
        ArgumentNullException.ThrowIfNull(projectIds);

        // Build the set BEFORE touching any state, so an exception while enumerating (or a
        // defective batch) can never leave a torn arm.
        var armedProjectIds = projectIds
            .Where(projectId => !string.IsNullOrEmpty(projectId))
            .ToImmutableHashSet(StringComparer.OrdinalIgnoreCase);

        // Publish the pure data first, then arm. Arming is a single interlocked bit-set on the
        // state word: every write that enters afterward must observe the flag (all transitions on
        // the word are totally ordered) and is rejected.
        _blockedProjectIds = armedProjectIds;
        Interlocked.Or(ref _state, ArmedFlag);

        // Drain: wait (bounded) until no write scopes remain open. New writes can no longer enter,
        // so the count only falls. SpinWait escalates spin → yield → sleep, so a long drain does
        // not burn a core.
        var spinner = new SpinWait();
        var stopwatch = Stopwatch.StartNew();
        while ((Volatile.Read(ref _state) & InFlightCountMask) != 0)
        {
            if (stopwatch.Elapsed >= DrainTimeout)
            {
                // Degraded: proceed rather than deadlock the sync. The armed flag keeps rejecting
                // new writes; only the already-stuck write(s) we couldn't drain may still overlap.
                Console.Error.WriteLine(
                    "[SendReceiveWriteLock] Warning: in-flight project write(s) did not drain "
                        + $"within {DrainTimeout.TotalSeconds:0.#}s; proceeding with Send/Receive "
                        + "anyway (new writes stay blocked while the sync is armed)."
                );
                return;
            }
            spinner.SpinOnce();
        }
    }

    /// <summary>
    /// Ends the sync: disarms the gate and clears the armed project set, so writes are accepted
    /// again. May be called from ANY thread (not just the one that called <see cref="SetSyncing"/>),
    /// is idempotent, and is safe to call when no sync is active at all — so it doubles as the
    /// recovery path if a sync worker dies without clearing.
    /// </summary>
    public static void Clear()
    {
        _blockedProjectIds = EmptyProjectIds;
        Interlocked.And(ref _state, ~ArmedFlag);
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
    /// drain toward its timeout), double-dispose is a no-op, and nesting (a gated method calling
    /// another gated method) is benign.
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
            if ((state & InFlightCountMask) == 0)
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
