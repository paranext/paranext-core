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
/// <b>A starting run waits for in-flight writes of its resources.</b> <see cref="BeginRun"/>
/// registers the run first — so a write of one of its resources that arrives from then on waits —
/// and then waits for the write scopes already open on any of its uids to close. Registering before
/// draining means a stream of new installs cannot starve the run.
/// </description></item>
/// </list>
/// Both waits are bounded by <see cref="WaitTimeout"/>. On timeout the waiter logs a warning and
/// proceeds: an install or uninstall is a request the user still wants, installs are idempotent,
/// and a counterpart that outlived the bound is most likely one whose end was never signalled.
/// </para>
/// <para>
/// <b>Lifecycle for the sync implementation</b> (the Paratext 10 patch; nothing in open-source
/// Platform.Bible runs a sync, so there <see cref="BeginRun"/> is never called and every
/// <see cref="EnterResourceWrite"/> returns at once):
/// <list type="bullet">
/// <item><description>
/// Call <see cref="BeginRun"/> with the DBL entry uids of every resource the run will update,
/// BEFORE the run's connected-resource update loop starts, and dispose the handle once the run has
/// ended — success or failure — in a <c>finally</c> or <c>using</c>.
/// </description></item>
/// <item><description>
/// Call it on a background thread: it can block for up to <see cref="WaitTimeout"/>. Never call it
/// while holding a lock the DBL provider needs to finish a write, or the write it waits for cannot
/// finish until the timeout.
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
/// <see cref="BeginRun"/>, <see cref="EnterResourceWrite"/> and the handles' <c>Dispose</c> may run on
/// any threads — an <c>await</c> between opening and disposing a handle is fine.
/// </para>
/// <para>
/// <b>One run at a time.</b> Send/Receive already admits one sync at a time, so a second
/// <see cref="BeginRun"/> while a run is open is a programming error and throws. Write scopes are
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
    // Declared before WaitTimeout: static initializers run in textual order, and WaitTimeout's
    // initializer reads this.
    private static readonly TimeSpan s_defaultWaitTimeout = TimeSpan.FromMinutes(30);

    /// <summary>
    /// How long a write waits for a run, and a starting run waits for writes, before logging a
    /// warning and proceeding. Bounded so a handle that is never disposed (a hung sync, a bracket
    /// that skipped its <c>finally</c>) cannot block the other side for the rest of the session.
    /// Generous because a write may wait out a whole run, and a sync that downloads its connected
    /// resources over a slow link can legitimately take many minutes — giving up while it is still
    /// writing would let the two writers race after all. Settable so tests can shorten it.
    /// </summary>
    internal static TimeSpan WaitTimeout { get; set; } = s_defaultWaitTimeout;

    /// <summary>
    /// Guards every field below, and is the monitor waiters block on: every state change that can
    /// release a waiter ends with <see cref="Monitor.PulseAll"/>.
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
    /// Opens a run that holds <paramref name="dblEntryUids"/> until the returned handle is disposed,
    /// once every write scope already open on one of them has closed (or <see cref="WaitTimeout"/>
    /// has elapsed — then logs a warning and opens anyway). Blank ids are ignored, so a run with none
    /// holds nothing and never waits. See the class remarks for when and where to call this.
    /// </summary>
    /// <param name="dblEntryUids">The DBL entry uids of the resources the run will update.</param>
    /// <returns>A handle whose <c>Dispose</c> ends the run and releases every waiting write.</returns>
    /// <exception cref="InvalidOperationException">A run is already open.</exception>
    public static IDisposable BeginRun(IEnumerable<string> dblEntryUids)
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
            // Registered before draining, so a write of these uids arriving from now on waits for the
            // run rather than adding to the writes the run is waiting for.
            var run = new Run(ids);
            s_activeRun = run;

            bool timedOut;
            try
            {
                timedOut = !WaitWhileLocked(
                    () => ids.Any(s_writeCounts.ContainsKey),
                    () =>
                        Console.WriteLine(
                            "A sync is waiting for an install or removal of one of its DBL resources to finish."
                        )
                );
            }
            catch
            {
                // The caller never receives the handle, so nothing else could ever end this run.
                s_activeRun = null;
                Monitor.PulseAll(s_lock);
                throw;
            }
            if (timedOut)
                Console.WriteLine(
                    $"Warning: gave up after {WaitTimeout} waiting for an install or removal of DBL resources {string.Join(", ", ids.Where(s_writeCounts.ContainsKey))} to finish; syncing anyway."
                );
            return run;
        }
    }

    /// <summary>
    /// Waits while the open run holds <paramref name="dblEntryUid"/>, then marks it as being written
    /// until the returned scope is disposed, so a run that starts meanwhile waits for this write.
    /// Returns at once when no run holds the uid. If one run ends and the next one also holds it,
    /// keeps waiting, within the same <see cref="WaitTimeout"/>; on timeout logs a warning and
    /// proceeds. Wrap the whole write — including any refresh of the project collection it needs —
    /// and nothing else.
    /// </summary>
    /// <param name="dblEntryUid">The DBL entry uid about to be installed or removed.</param>
    /// <returns>A scope whose <c>Dispose</c> ends the write and releases a waiting run.</returns>
    public static IDisposable EnterResourceWrite(string dblEntryUid)
    {
        ArgumentNullException.ThrowIfNull(dblEntryUid);
        lock (s_lock)
        {
            var timedOut = !WaitWhileLocked(
                () => s_activeRun?.ResourceIds.Contains(dblEntryUid) == true,
                () =>
                    Console.WriteLine(
                        $"DBL resource {dblEntryUid} is being updated by the running sync; waiting for the sync to finish."
                    )
            );
            if (timedOut)
                Console.WriteLine(
                    $"Warning: gave up after {WaitTimeout} waiting for the running sync to finish updating DBL resource {dblEntryUid}; writing it anyway."
                );

            s_writeCounts[dblEntryUid] = s_writeCounts.GetValueOrDefault(dblEntryUid) + 1;
            return new WriteScope(dblEntryUid, s_generation);
        }
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
    /// Waits on <see cref="s_lock"/> — which the caller holds — while <paramref name="mustWait"/> is
    /// true, for at most <see cref="WaitTimeout"/> in total. <see cref="Monitor.Wait(object, TimeSpan)"/>
    /// releases the lock while waiting and retakes it before returning, so the condition is always
    /// evaluated under the lock.
    /// </summary>
    /// <param name="mustWait">The condition to wait out; evaluated under the lock.</param>
    /// <param name="onFirstWait">Called once, only if a wait actually starts.</param>
    /// <returns>True when the condition cleared; false on timeout.</returns>
    private static bool WaitWhileLocked(Func<bool> mustWait, Action onFirstWait)
    {
        if (!mustWait())
            return true;
        onFirstWait();
        var budget = WaitTimeout;
        var elapsed = Stopwatch.StartNew();
        while (mustWait())
        {
            var remaining = budget - elapsed.Elapsed;
            if (remaining <= TimeSpan.Zero)
                return false;
            Monitor.Wait(s_lock, remaining);
        }
        return true;
    }

    /// <summary>One open run: the uids it holds.</summary>
    private sealed class Run(ImmutableHashSet<string> resourceIds) : IDisposable
    {
        public ImmutableHashSet<string> ResourceIds { get; } = resourceIds;

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
