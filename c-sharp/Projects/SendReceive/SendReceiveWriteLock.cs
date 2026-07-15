using System.Collections.Immutable;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Process-wide coordination between ordinary project writes and an automatic (scheduled)
/// Send/Receive, so an editor change can never race the sync's on-disk file replacement (Mercurial
/// merge) and corrupt the project.
/// </summary>
/// <remarks>
/// <para>
/// <b>A specialized reader-writer coordination, with the roles deliberately inverted.</b> This is
/// built on a <see cref="ReaderWriterLockSlim"/>, but call sites never see that: they use only the
/// domain API (<see cref="EnterWrite"/>). Think of it as the user's own analogy — many people can
/// read a shared document at once, but a writer needs everyone else out. Here the mapping is
/// inverted relative to the words "read"/"write":
/// <list type="bullet">
/// <item>
/// <description>
/// <b>A project write is a "reader".</b> Many PAPI threads mutate different projects concurrently;
/// they are the <i>shared/concurrent</i> side, so each mutation takes the RWLS <b>read</b> lock
/// (many can be held at once). They are "readers" only with respect to <i>this</i> coordination —
/// they are of course real writes to their projects.
/// </description>
/// </item>
/// <item>
/// <description>
/// <b>Send/Receive is the "writer".</b> A starting sync needs <i>exclusive</i> access (it replaces
/// files on disk underneath the editor), so it takes the RWLS <b>write</b> lock — which, by
/// definition, waits for every in-flight read (project write) to finish and excludes new ones.
/// </description>
/// </item>
/// </list>
/// The coordination therefore works in <b>both directions</b>:
/// <list type="number">
/// <item>
/// <description>
/// <b>An armed/queued sync rejects new writes (fail-fast).</b> <see cref="EnterWrite"/> takes the
/// read lock with <c>TryEnterReadLock(0)</c>: if a sync holds (or, being writer-preferring, has
/// queued for) the write lock, the zero-timeout call returns immediately and we throw (message
/// ending in <see cref="EditBlockedSentinel"/>) rather than blocking. This is <b>deviation #1</b>
/// from a textbook reader-writer lock, where a reader would <i>block</i> until the writer released.
/// We fail fast on purpose: a user's keystroke must never hang waiting on a background sync — the
/// editor catches the sentinel, shows an "editing paused during Send/Receive" notice, and reverts
/// the un-saved change.
/// </description>
/// </item>
/// <item>
/// <description>
/// <b>A starting sync WAITS (bounded) for in-flight writes to drain.</b> <see cref="SetSyncing"/>
/// arms the project-id set, then acquires the write lock with a <b>bounded</b> timeout
/// (<see cref="DrainTimeout"/>). That acquisition <i>is</i> the drain: RWLS is writer-preferring, so
/// from the moment the writer queues no new read lock is granted (arm-first for free), and it blocks
/// until existing readers (writes) exit. This is <b>deviation #2</b>: a textbook writer waits
/// unboundedly; here the wait is bounded so a single stuck/slow write can never deadlock a sync
/// start — on timeout we log a warning and <b>proceed UNHELD</b> (see the degraded path below).
/// </description>
/// </item>
/// </list>
/// </para>
/// <para>
/// <b>Why not just expose the raw <see cref="ReaderWriterLockSlim"/>?</b> Three reasons this wrapper
/// exists rather than handing callers the primitive:
/// <list type="bullet">
/// <item>
/// <description>
/// Its <b>thread-affinity rules</b> (the thread that enters a lock must exit it) are easy to violate
/// and would leak into every call site; here they are confined to <see cref="SetSyncing"/> /
/// <see cref="Clear"/> and to the single-method <c>using</c> scope of <see cref="EnterWrite"/>.
/// </description>
/// </item>
/// <item>
/// <description>
/// Raw readers <b>block by default</b>, which conflicts with our fail-fast requirement (deviation
/// #1). The wrapper encodes the zero-timeout + sentinel-throw so no call site can accidentally
/// block a user write on a sync.
/// </description>
/// </item>
/// <item>
/// <description>
/// A bare "take the <i>read</i> lock in order to perform a <i>write</i>" reads confusingly at the
/// call site. <c>EnterWrite</c> names the caller's intent; the inversion is documented once, here.
/// </description>
/// </item>
/// </list>
/// </para>
/// <para>
/// <b>The armed set is pure data.</b> <c>_blockedProjectIds</c> carries no synchronization role (the
/// RWLS does all mutual exclusion); it exists only so <see cref="IsBlocked"/> can answer per-project
/// queries and so rejection messages can name projects. It is still <c>volatile</c> for safe
/// publication across the many threads that read it.
/// </para>
/// <para>
/// <b>Degraded (write-lock-not-held) path, and the belt check.</b> When
/// <c>TryEnterWriteLock(DrainTimeout)</c> times out, the sync proceeds without holding the write lock
/// (we never deadlock a sync). In that window the RWLS would <i>not</i> block readers, so
/// <see cref="EnterWrite"/> has a second, belt-and-suspenders check: after a successful
/// <c>TryEnterReadLock(0)</c> it consults the armed set and, if any project is armed, releases the
/// read lock and throws anyway. So writes stay rejected while a sync is armed even if the writer
/// timed out. <c>_writeLockHeld</c> records whether the write lock was actually taken, so
/// <see cref="Clear"/> only calls <c>ExitWriteLock</c> when it is really held.
/// </para>
/// <para>
/// <b>Thread-affinity contract — IMPORTANT.</b> <see cref="ReaderWriterLockSlim"/> is thread-affine:
/// the thread that enters a lock must be the one that exits it. Two consequences:
/// <list type="bullet">
/// <item>
/// <description>
/// <b><see cref="SetSyncing"/> and <see cref="Clear"/> MUST run on the same thread.</b>
/// <see cref="SetSyncing"/> enters the write lock; <see cref="Clear"/> exits it. The Paratext 10
/// Studio patch activation (Jira PT-4210) satisfies this: both are called from the sync worker's own
/// <c>try</c>/<c>finally</c>. A violation surfaces loudly as a
/// <see cref="SynchronizationLockException"/> — which is the <i>desired</i> fail-fast behavior, not
/// something to swallow.
/// </description>
/// </item>
/// <item>
/// <description>
/// A write scope is entered and disposed within a single synchronous method
/// (<c>using var _ = EnterWrite(id);</c>), so its read lock is always released on the entering
/// thread.
/// </description>
/// </item>
/// </list>
/// The lock uses <see cref="LockRecursionPolicy.NoRecursion"/>: a thread must not take the read lock
/// while already holding it (nor mix read and write on one thread). No gated write path nests a
/// second <see cref="EnterWrite"/> on the same thread — where one gated method delegates to another
/// (e.g. <c>SetBookUsx</c> converts then writes a book), the callee's un-gated core is invoked inside
/// the single outer scope rather than re-entering the gate — and the sync's file replacement uses
/// <c>ParatextData</c> directly, not the gated PAPI write methods. NoRecursion is deliberate: because
/// no path ever legitimately re-enters, any accidental re-entrancy is an immediate, loud
/// <see cref="LockRecursionException"/> instead of a subtle deadlock.
/// </para>
/// <para>
/// <b>Distinct from the Send/Receive server-side repository lock.</b> This class is an
/// <i>in-process</i> gate between local editing and a local sync run. It is <b>not</b> the S/R
/// server's repository lock (the <c>lockrepo</c>/<c>unlockrepo</c> REST calls the sync makes against
/// the Send/Receive server to exclude <i>other clients</i> from pushing concurrently). Different
/// mechanism (an in-memory <see cref="ReaderWriterLockSlim"/> vs. a server-held lock), different
/// scope (this process vs. all clients of a shared repo), and different failure modes (a timed-out
/// drain here vs. an orphaned server lock returning HTTP 403 there). Do not conflate the two.
/// </para>
/// <para>
/// <b>Inert in open-source Platform.Bible.</b> Nothing in public core ever calls
/// <see cref="SetSyncing"/>, so the write lock is never taken, <see cref="IsBlocked"/> always returns
/// <c>false</c>, every <see cref="EnterWrite"/> scope succeeds, and no write is ever rejected —
/// public behavior is unchanged by this class. The Paratext 10 Studio closed-source patch brackets
/// each automatic sync with <see cref="SetSyncing"/> / <see cref="Clear"/> (Jira PT-4210), which is
/// what activates the gate. This class is the public seam; the activation lives in the patch. The
/// activation API (<see cref="SetSyncing"/> / <see cref="Clear"/>) is unchanged by this RWLS-backed
/// upgrade.
/// </para>
/// </remarks>
internal static class SendReceiveWriteLock
{
    // The exact suffix on every rejection message. The Paratext 10 Studio Scripture editor matches
    // this sentinel to show an "editing paused during Send/Receive" notification (rather than the
    // generic permissions message) and revert the un-saved change.
    public const string EditBlockedSentinel = "(SR_EDIT_BLOCKED)";

    // Reader = project write; Writer = Send/Receive. NoRecursion is intentional (see the
    // thread-affinity remarks): no gated write path re-enters the gate on one thread, so accidental
    // re-entrancy should throw loudly rather than deadlock.
    private static readonly ReaderWriterLockSlim _lock = new(LockRecursionPolicy.NoRecursion);

    // Pure data (no synchronization role — the RWLS does all exclusion): drives IsBlocked, the belt
    // check in EnterWrite, and the project names in rejection messages. volatile for safe publication
    // across the many threads that read it.
    private static volatile IImmutableSet<string> _blockedProjectIds =
        ImmutableHashSet<string>.Empty;

    // Whether SetSyncing actually acquired the write lock (false after a drain timeout — the degraded
    // path). Only ever read/written by the sync worker thread that owns SetSyncing/Clear, so it needs
    // no synchronization of its own. Guards Clear so it never calls ExitWriteLock on a lock it does
    // not hold.
    private static bool _writeLockHeld;

    // How long SetSyncing waits (via TryEnterWriteLock) for in-flight writes to drain before giving
    // up. BOUNDED on purpose: a sync start must never be able to deadlock behind a write scope that
    // (through a bug, a stuck ParatextData call, or an editor that forgot to dispose) never
    // completes. On timeout we log and proceed unheld, accepting a small residual race rather than
    // hanging the sync forever. Internal setter exists ONLY so tests can shorten it; production
    // always uses the default.
    internal static TimeSpan DrainTimeout { get; set; } = TimeSpan.FromSeconds(10);

    /// <summary>Whether the write lock is currently held by a sync. For tests only.</summary>
    internal static bool WriteLockHeld => _writeLockHeld;

    private static string Normalize(string projectId) => projectId.ToLowerInvariant();

    private static InvalidOperationException EditBlocked(string projectId) =>
        new(
            $"Cannot write to project '{projectId}' while an automatic Send/Receive is in "
                + $"progress. {EditBlockedSentinel}"
        );

    /// <summary>
    /// Marks the given projects as being synced (the exclusive "writer" side), then acquires the
    /// write lock — which drains any already-in-flight writes — before returning. After it returns,
    /// new <see cref="EnterWrite"/> calls for any project fail fast (whether because the write lock is
    /// held or, on the degraded path, because the belt check sees the armed set). Replaces any
    /// previously set list; call once per sync batch with the full set of projects. The drain is
    /// bounded (<see cref="DrainTimeout"/>); on timeout it logs a warning and proceeds UNHELD so a
    /// sync start can never deadlock. MUST be called on the same thread that will later call
    /// <see cref="Clear"/> (RWLS thread affinity — see the class remarks).
    /// </summary>
    public static void SetSyncing(IEnumerable<string> projectIds)
    {
        ArgumentNullException.ThrowIfNull(projectIds);

        // FIRST swap the armed set (pure data). Publishing this before acquiring the lock means the
        // belt check in EnterWrite already rejects writes even during the write-lock acquisition
        // below (and on the degraded path where that acquisition times out).
        _blockedProjectIds = projectIds.Select(Normalize).ToImmutableHashSet();

        // If this thread already holds the write lock (a repeat SetSyncing without an intervening
        // Clear — e.g. re-arming a batch), don't re-acquire: NoRecursion would throw
        // LockRecursionException, and there are no in-flight readers to drain while the write lock is
        // already held. The set swap above is enough to update which projects are armed.
        if (_writeLockHeld)
            return;

        // THEN acquire the write lock = drain in-flight writes, bounded. Writer-preferring RWLS
        // blocks new readers (writes) from the moment we queue here.
        if (_lock.TryEnterWriteLock(DrainTimeout))
        {
            _writeLockHeld = true;
        }
        else
        {
            // Degraded: proceed without the lock so we never deadlock a sync. The belt check in
            // EnterWrite keeps rejecting writes while the armed set is non-empty, so correctness
            // holds; only the (already stuck) in-flight write we couldn't drain may still overlap.
            _writeLockHeld = false;
            Console.Error.WriteLine(
                "[SendReceiveWriteLock] Warning: in-flight project write(s) did not drain within "
                    + $"{DrainTimeout.TotalSeconds:0.#}s; proceeding with Send/Receive without the "
                    + "write lock (writes stay blocked via the armed-set check)."
            );
        }
    }

    /// <summary>
    /// Ends the sync: disarms all projects and releases the write lock if it was held. Safe to call
    /// when the lock was never taken (the degraded path) — it simply disarms. MUST run on the same
    /// thread that called <see cref="SetSyncing"/> (RWLS thread affinity — see the class remarks).
    /// </summary>
    public static void Clear()
    {
        _blockedProjectIds = ImmutableHashSet<string>.Empty;
        if (_writeLockHeld)
        {
            _writeLockHeld = false;
            _lock.ExitWriteLock();
        }
    }

    /// <summary>
    /// Whether writes to <paramref name="projectId"/> are currently blocked by an in-progress
    /// automatic Send/Receive. Always <c>false</c> in public core (see the class remarks). Kept for
    /// read-only consumers (e.g. status queries); write paths must use <see cref="EnterWrite"/> so
    /// their mutation is what the sync's write-lock acquisition drains. Note this pure-data answer is
    /// per-project, whereas <see cref="EnterWrite"/> is a global gate (any active sync rejects all
    /// writes).
    /// </summary>
    public static bool IsBlocked(string? projectId)
    {
        return !string.IsNullOrEmpty(projectId)
            && _blockedProjectIds.Contains(Normalize(projectId));
    }

    /// <summary>
    /// Opens a write scope for <paramref name="projectId"/> (the shared "reader" side). Use as the
    /// FIRST statement of any method that mutates the project, so the scope brackets the whole
    /// mutation:
    /// <code>using var _ = SendReceiveWriteLock.EnterWrite(projectId);</code>
    /// Throws immediately (message ending in <see cref="EditBlockedSentinel"/>) if a Send/Receive is
    /// in progress — it NEVER queues or blocks the caller. Otherwise it holds the RWLS read lock for
    /// the life of the scope, so a sync starting via <see cref="SetSyncing"/> waits for this write to
    /// finish before it replaces files. Dispose the returned scope (via <c>using</c>, on the same
    /// thread) to release the read lock. A no-op gate in public core (nothing arms the lock there).
    /// Because any active sync holds the global write lock, this is a global gate: while ANY project
    /// is syncing, ALL project writes are rejected (syncs are globally exclusive by design).
    /// </summary>
    public static IDisposable EnterWrite(string projectId)
    {
        ArgumentNullException.ThrowIfNull(projectId);

        // Fail fast: a zero timeout means we never queue behind a sync's write lock. If a sync holds
        // (or, RWLS being writer-preferring, has queued for) the write lock, this returns false
        // immediately and we reject the write rather than blocking a user's keystroke.
        if (!_lock.TryEnterReadLock(0))
            throw EditBlocked(projectId);

        // Belt for the degraded window: if the sync timed out draining and proceeded UNHELD, the read
        // lock above would have been granted even though a sync is active. Consult the armed set
        // (pure data) and reject if any project is armed. (Also closes the tiny window inside Clear
        // between disarming the set and releasing the write lock harmlessly: there the set is already
        // empty so this passes, but the still-held write lock already made TryEnterReadLock(0) fail.)
        if (_blockedProjectIds.Count != 0)
        {
            _lock.ExitReadLock();
            throw EditBlocked(projectId);
        }

        return new WriteScope();
    }

    /// <summary>
    /// The disposable returned by <see cref="EnterWrite"/>. Releases the RWLS read lock exactly once
    /// on dispose (guarded so a double-dispose can't call <c>ExitReadLock</c> twice). Must be disposed
    /// on the thread that opened it (RWLS thread affinity) — guaranteed by the
    /// <c>using var _ = EnterWrite(...)</c> usage inside a single synchronous method.
    /// </summary>
    private sealed class WriteScope : IDisposable
    {
        private bool _disposed;

        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;
            _lock.ExitReadLock();
        }
    }
}
