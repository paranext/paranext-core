using System.Collections.Immutable;
using System.Diagnostics;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Process-wide coordination between a running Send/Receive run and user-started DBL resource
/// writes (install, uninstall), so the two never write the same resource's files at the same time.
/// </summary>
/// <remarks>
/// <para>
/// <b>Why it exists.</b> A sync updates the connected DBL resources of the projects it syncs, while
/// the DBL provider installs and uninstalls resources independently of any sync, under its own lock.
/// Two writers on one resource's files can leave it half-replaced. Writes of resources the run does
/// not touch are unaffected and run alongside the sync.
/// </para>
/// <para>
/// <b>Both directions wait, bounded:</b>
/// <list type="number">
/// <item><description>
/// <b>A user write waits for a run that holds its resource.</b> <see cref="EnterResourceWrite"/>
/// blocks while the open run holds the uid, then marks the uid as being written until its scope is
/// disposed. The check and the mark happen under one lock, so no run can slip in between them.
/// </description></item>
/// <item><description>
/// <b>A starting run waits for in-flight writes of its resources.</b> <see cref="RegisterRun"/>
/// registers the run at once — so a write of one of its resources that arrives from then on waits —
/// and <see cref="Run.WaitForResourceWrites"/> then waits for the write scopes already open on any
/// of its uids to close. Registering before draining means a stream of new installs cannot starve
/// the run. The drain is cancellable, so a sync waiting on a user's install still answers its
/// Cancel.
/// </description></item>
/// </list>
/// Both waits are bounded by <see cref="WaitTimeout"/>, measured per counterpart: a write passed
/// over by back-to-back runs on its resource restarts the bound with each new run, so a timeout
/// always means one run (or one set of writes) outlived <see cref="WaitTimeout"/>. On timeout the
/// waiter logs a warning and proceeds: an install or uninstall is a request the user still wants,
/// installs are idempotent, and a counterpart that outlived the bound is most likely one whose end
/// was never signalled.
/// </para>
/// <para>
/// <b>Each waiting write blocks a thread-pool thread</b> for up to <see cref="WaitTimeout"/>, so
/// only user-started, one-at-a-time writes belong on this path; a bulk or automatic install loop
/// must not route through <see cref="EnterResourceWrite"/>.
/// </para>
/// <para>
/// <b>Lifecycle for the sync implementation</b> (nothing in open-source Platform.Bible runs a sync,
/// so there no run is ever registered and every <see cref="EnterResourceWrite"/> returns at once):
/// <list type="bullet">
/// <item><description>
/// Call <see cref="RegisterRun"/> with the DBL entry uids of every resource the run will update,
/// BEFORE the run's connected-resource update loop starts, and dispose the handle once the run has
/// ended — success, failure or cancel — in a <c>finally</c> or <c>using</c>. It never waits, so
/// the run can announce the resources it holds before it starts waiting.
/// </description></item>
/// <item><description>
/// Then call <see cref="Run.WaitForResourceWrites"/> with the sync's cancellation token, before
/// the first resource write. Call it on a background thread: it can block for up to
/// <see cref="WaitTimeout"/>. Never call it while holding a lock the DBL provider needs to finish a
/// write, or the write it waits for cannot finish until the timeout.
/// </description></item>
/// <item><description>
/// The run's own resource updates must NOT go through <see cref="EnterResourceWrite"/> (or through
/// the DBL provider's install command, which uses it): the run holds those uids, so its own writes
/// would wait for the run itself, until the timeout.
/// </description></item>
/// </list>
/// </para>
/// <para>
/// <b>No thread affinity.</b> All state is guarded by one private monitor, released while waiting.
/// <see cref="RegisterRun"/>, <see cref="Run.WaitForResourceWrites"/>,
/// <see cref="EnterResourceWrite"/> and the handles' <c>Dispose</c> may run on any threads — an
/// <c>await</c> between opening and disposing a handle is fine.
/// </para>
/// <para>
/// <b>One run at a time.</b> Send/Receive already admits one sync at a time, so a second
/// <see cref="RegisterRun"/> while a run is open is a programming error and throws. Write scopes are
/// counted per uid: writes of different resources hold scopes at once, and two writes of the same
/// resource are already serialized by the DBL provider's own lock. Every handle's <c>Dispose</c> is
/// idempotent, and disposing a stale run handle never ends a newer run.
/// </para>
/// <para>
/// <b>Not a project-write gate.</b> This is distinct from <see cref="SendReceiveWriteLock"/>, which
/// guards project writes and rejects them fail-fast during a sync. Resource writes wait instead,
/// because the user still wants them once the run ends.
/// </para>
/// <para>
/// <b>Ids</b> are DBL entry uids, matched ignoring case: ParatextData's <c>HexId</c> compares the
/// bytes a uid encodes, so the same uid written in either case names the same resource.
/// </para>
/// </remarks>
internal static class SyncRunResourceGuard
{
    // Declared before s_waitTimeoutTicks: static initializers run in textual order, and that
    // field's initializer reads this.
    private static readonly TimeSpan s_defaultWaitTimeout = TimeSpan.FromMinutes(30);

    // Ticks rather than a TimeSpan so reads and writes from different threads are atomic and
    // visible: a TimeSpan field cannot be volatile.
    private static long s_waitTimeoutTicks = s_defaultWaitTimeout.Ticks;

    /// <summary>
    /// How long a write waits for one run, and a starting run waits for writes, before logging a
    /// warning and proceeding. Bounded so a handle that is never disposed (a hung sync, a bracket
    /// that skipped its <c>finally</c>) cannot block the other side for the rest of the session.
    /// Generous because a write may wait out a whole run, and a sync that downloads its connected
    /// resources over a slow link can legitimately take many minutes — giving up while it is still
    /// writing would let the two writers race after all. Settable so tests can shorten it; each wait
    /// reads it once, when it starts.
    /// </summary>
    internal static TimeSpan WaitTimeout
    {
        get => TimeSpan.FromTicks(Volatile.Read(ref s_waitTimeoutTicks));
        set => Volatile.Write(ref s_waitTimeoutTicks, value.Ticks);
    }

    /// <summary>
    /// Guards every field below, and is the monitor waiters block on: every state change that can
    /// release a waiter ends with <see cref="Monitor.PulseAll"/>. Nothing is logged while it is held.
    /// </summary>
    private static readonly object s_lock = new();

    /// <summary>The open run, or null.</summary>
    private static Run? s_activeRun;

    /// <summary>Open write scopes per uid; a uid with none has no entry.</summary>
    private static readonly Dictionary<string, int> s_writeCounts =
        new(StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Bumped by <see cref="ResetForTests"/> so a write scope opened before a reset cannot decrement a
    /// count that belongs to a later scope.
    /// </summary>
    private static int s_generation;

    /// <summary>
    /// The DBL entry uids the open run will update, each once; empty when no run is open. Includes a
    /// run that is still waiting for in-flight writes of its resources to finish.
    /// </summary>
    public static IReadOnlyCollection<string> CurrentResourceIds
    {
        get
        {
            lock (s_lock)
                return s_activeRun?.ResourceIds ?? [];
        }
    }

    /// <summary>
    /// Opens a run that holds <paramref name="dblEntryUids"/> until the returned handle is disposed.
    /// Never waits: a write of one of these resources that starts from now on waits for the run,
    /// while writes already open are drained by <see cref="Run.WaitForResourceWrites"/>, which the
    /// caller makes before its first resource write. Blank ids are ignored, so a run with none holds
    /// nothing. See the class remarks for when and where to call this.
    /// </summary>
    /// <param name="dblEntryUids">The DBL entry uids of the resources the run will update.</param>
    /// <returns>A handle whose <c>Dispose</c> ends the run and releases every waiting write.</returns>
    /// <exception cref="InvalidOperationException">A run is already open.</exception>
    public static Run RegisterRun(IEnumerable<string> dblEntryUids)
    {
        ArgumentNullException.ThrowIfNull(dblEntryUids);
        var ids = dblEntryUids
            .Where(id => !string.IsNullOrWhiteSpace(id))
            .ToImmutableHashSet(StringComparer.OrdinalIgnoreCase);

        lock (s_lock)
        {
            if (s_activeRun != null)
                throw new InvalidOperationException(
                    "A sync run already holds DBL resources; end it before beginning another."
                );
            var run = new Run(ids);
            s_activeRun = run;
            return run;
        }
    }

    /// <summary>
    /// Waits while the open run holds <paramref name="dblEntryUid"/>, then marks it as being written
    /// until the returned scope is disposed, so a run that starts meanwhile waits for this write.
    /// Returns at once when no run holds the uid. If one run ends and the next one also holds it,
    /// keeps waiting, and the <see cref="WaitTimeout"/> bound starts again for the new run; when one
    /// run outlives the bound, logs a warning and proceeds. Wrap the whole write — including any
    /// refresh of the project collection it needs — and nothing else.
    /// </summary>
    /// <param name="dblEntryUid">The DBL entry uid about to be installed or removed.</param>
    /// <returns>A scope whose <c>Dispose</c> ends the write and releases a waiting run.</returns>
    public static IDisposable EnterResourceWrite(string dblEntryUid)
    {
        ArgumentNullException.ThrowIfNull(dblEntryUid);
        Run? HoldingRun() =>
            s_activeRun?.ResourceIds.Contains(dblEntryUid) == true ? s_activeRun : null;

        lock (s_lock)
        {
            if (HoldingRun() == null)
                return OpenWriteScopeLocked(dblEntryUid);
        }

        Console.WriteLine(
            $"DBL resource {dblEntryUid} is being updated by the running sync; waiting for the sync to finish."
        );

        var budget = WaitTimeout;
        string? warning = null;
        IDisposable scope;
        lock (s_lock)
        {
            if (!WaitWhileLocked(HoldingRun, budget, CancellationToken.None))
                warning =
                    $"Warning: gave up after {budget} waiting for the running sync to finish updating DBL resource {dblEntryUid}; writing it anyway.";
            // Under the same lock hold as the last check, so no run can begin in between.
            scope = OpenWriteScopeLocked(dblEntryUid);
        }
        if (warning != null)
            Console.WriteLine(warning);
        return scope;
    }

    /// <summary>
    /// Ends any open run, forgets every open write scope, releases all waiters and restores
    /// <see cref="WaitTimeout"/>, so a test cannot leave the process-wide state behind for the next.
    /// </summary>
    internal static void ResetForTests()
    {
        lock (s_lock)
        {
            s_activeRun = null;
            s_writeCounts.Clear();
            s_generation++;
            WaitTimeout = s_defaultWaitTimeout;
            Monitor.PulseAll(s_lock);
        }
    }

    /// <summary>
    /// Runs <paramref name="action"/> while holding the guard's lock, so a test can make several
    /// changes — such as ending one run and beginning the next — that no waiter can observe between.
    /// The lock is reentrant, so the guard's own methods may be called inside.
    /// </summary>
    internal static void InsideGuardLockForTests(Action action)
    {
        lock (s_lock)
            action();
    }

    /// <summary>Records one more open write of <paramref name="dblEntryUid"/>. Call holding the lock.</summary>
    private static WriteScope OpenWriteScopeLocked(string dblEntryUid)
    {
        s_writeCounts[dblEntryUid] = s_writeCounts.GetValueOrDefault(dblEntryUid) + 1;
        return new WriteScope(dblEntryUid, s_generation);
    }

    /// <summary>
    /// Waits on <see cref="s_lock"/> — which the caller holds — while <paramref name="blocker"/>
    /// names something. <see cref="Monitor.Wait(object, TimeSpan)"/> releases the lock while waiting
    /// and retakes it before returning, so the blocker is always read under the lock.
    /// <para>
    /// <paramref name="budget"/> bounds the wait on ONE blocker: whenever the blocker changes to a
    /// different object (by reference), the budget starts again. So a write passed over by
    /// back-to-back runs on its resource times out only if one of those runs outlives the budget,
    /// never because their durations added up.
    /// </para>
    /// </summary>
    /// <param name="blocker">What the caller is waiting for, or null when it may proceed.</param>
    /// <param name="budget">How long one blocker may hold the caller up.</param>
    /// <param name="cancellationToken">Ends the wait with <see cref="OperationCanceledException"/>.
    /// Only checked when the monitor wakes, so the caller must arrange for a cancel to pulse it.</param>
    /// <returns>True when the blocker cleared; false when one blocker outlived the budget.</returns>
    /// <exception cref="OperationCanceledException"><paramref name="cancellationToken"/> was
    /// cancelled while the blocker still named something.</exception>
    private static bool WaitWhileLocked(
        Func<object?> blocker,
        TimeSpan budget,
        CancellationToken cancellationToken
    )
    {
        var seen = blocker();
        var elapsed = Stopwatch.StartNew();
        while (seen != null)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var remaining = budget - elapsed.Elapsed;
            if (remaining <= TimeSpan.Zero)
                return false;
            Monitor.Wait(s_lock, remaining);
            var current = blocker();
            if (current != null && !ReferenceEquals(current, seen))
                elapsed.Restart();
            seen = current;
        }
        return true;
    }

    /// <summary>
    /// One registered run: the uids it holds. Returned by <see cref="RegisterRun"/>; disposing it
    /// ends the run.
    /// </summary>
    internal sealed class Run : IDisposable
    {
        internal Run(ImmutableHashSet<string> resourceIds) => ResourceIds = resourceIds;

        /// <summary>The DBL entry uids this run holds, each once.</summary>
        public ImmutableHashSet<string> ResourceIds { get; }

        /// <summary>
        /// Waits until no write scope is open on any of this run's uids — writes that started
        /// before <see cref="RegisterRun"/>, since later ones wait for the run instead. Returns at
        /// once when there are none, or when this run has already ended. Bounded by
        /// <see cref="WaitTimeout"/>: when the writes outlive it, logs a warning and returns false,
        /// and the run proceeds anyway.
        /// </summary>
        /// <param name="cancellationToken">The sync's cancellation: cancelling it ends the wait at
        /// once.</param>
        /// <returns>True when the writes finished; false when the wait timed out.</returns>
        /// <exception cref="OperationCanceledException"><paramref name="cancellationToken"/> was
        /// cancelled before the writes finished. The run stays registered; dispose it as
        /// usual.</exception>
        public bool WaitForResourceWrites(CancellationToken cancellationToken)
        {
            // The run is the blocker's identity: once registered, no new write of its uids can open,
            // so the writes it waits for are one set and one budget covers them. A run that has
            // ended has nothing left to protect, so it stops waiting.
            object? Blocker() =>
                ReferenceEquals(s_activeRun, this) && ResourceIds.Any(s_writeCounts.ContainsKey)
                    ? this
                    : null;

            cancellationToken.ThrowIfCancellationRequested();
            lock (s_lock)
            {
                if (Blocker() == null)
                    return true;
            }

            Console.WriteLine(
                "A sync is waiting for an install or removal of one of its DBL resources to finish."
            );

            var budget = WaitTimeout;
            string? warning = null;
            // Wakes the waiter when the token is cancelled. Registered and disposed outside the
            // lock: the callback takes it, and disposing waits for a running callback to finish.
            using (
                cancellationToken.Register(() =>
                {
                    lock (s_lock)
                        Monitor.PulseAll(s_lock);
                })
            )
            {
                lock (s_lock)
                {
                    if (!WaitWhileLocked(Blocker, budget, cancellationToken))
                        warning =
                            $"Warning: gave up after {budget} waiting for an install or removal of DBL resources {string.Join(", ", ResourceIds.Where(s_writeCounts.ContainsKey))} to finish; syncing anyway.";
                }
            }
            if (warning == null)
                return true;
            Console.WriteLine(warning);
            return false;
        }

        public void Dispose()
        {
            lock (s_lock)
            {
                if (!ReferenceEquals(s_activeRun, this))
                    return;
                s_activeRun = null;
                Monitor.PulseAll(s_lock);
            }
        }
    }

    /// <summary>One open write of one uid.</summary>
    private sealed class WriteScope(string dblEntryUid, int generation) : IDisposable
    {
        private bool _disposed;

        public void Dispose()
        {
            lock (s_lock)
            {
                if (_disposed)
                    return;
                _disposed = true;
                if (generation != s_generation)
                    return;
                if (!s_writeCounts.TryGetValue(dblEntryUid, out var count))
                    return;
                if (count <= 1)
                    s_writeCounts.Remove(dblEntryUid);
                else
                    s_writeCounts[dblEntryUid] = count - 1;
                Monitor.PulseAll(s_lock);
            }
        }
    }
}
