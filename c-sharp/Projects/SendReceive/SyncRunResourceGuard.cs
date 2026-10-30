using System.Collections.Immutable;
using System.Diagnostics;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Process-wide record of the DBL resources the running Send/Receive run is about to update, so a
/// user-started DBL resource install of one of them waits for that run to end instead of writing
/// the same resource files at the same time.
/// </summary>
/// <remarks>
/// <para>
/// <b>Why it exists.</b> A sync updates the connected DBL resources of the projects it syncs, and a
/// DBL install runs independently of any sync, under the DBL provider's own lock. Two writers on one
/// resource's files can leave it half-replaced. Installs of resources the run does not touch are
/// unaffected and run alongside the sync.
/// </para>
/// <para>
/// <b>Lifecycle.</b> The sync implementation calls <see cref="BeginRun"/> with the run's DBL entry
/// uids once it knows them, and disposes the returned handle when the run ends, success or failure.
/// The DBL provider calls <see cref="WaitIfHeld"/> before an install. This is the only coupling: the
/// guard knows nothing about how a run decides its resources, and the provider nothing about syncs.
/// In open-source Platform.Bible no sync ever runs, so nothing calls <see cref="BeginRun"/> and
/// <see cref="WaitIfHeld"/> always returns at once.
/// </para>
/// <para>
/// <b>No thread affinity.</b> State changes happen under a private lock that is never held while
/// waiting, and each run carries its own end signal. <see cref="BeginRun"/>, the handle's
/// <c>Dispose</c>, and <see cref="WaitIfHeld"/> may run on any threads — an <c>await</c> between
/// beginning and disposing a run is fine.
/// </para>
/// <para>
/// <b>One run at a time.</b> Send/Receive already admits one sync at a time, so a second
/// <see cref="BeginRun"/> while a run is open is a programming error and throws. Disposing a handle
/// is idempotent, and disposing a stale handle never ends a newer run.
/// </para>
/// <para>
/// <b>Not a write gate.</b> This is distinct from <see cref="SendReceiveWriteLock"/>, which guards
/// project writes and rejects them fail-fast. This guards resource installs and makes them wait,
/// because an install is a user request that is still wanted once the run ends — and is idempotent,
/// so an install that finds the sync already brought the resource up to date does nothing.
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
    /// How long <see cref="WaitIfHeld"/> waits when the caller passes no timeout. Bounded so a run
    /// whose handle is never disposed (a hung sync, or a bracket that skipped its <c>finally</c>)
    /// cannot block an install for the rest of the session; the wait then gives up and the install
    /// proceeds. Generous because the wait covers the whole run, and a sync that downloads its
    /// connected resources over a slow link can legitimately take many minutes — giving up while it
    /// is still writing would let the two writers race after all. Settable so tests can shorten it.
    /// </summary>
    internal static TimeSpan WaitTimeout { get; set; } = s_defaultWaitTimeout;

    private static readonly object s_lock = new();

    /// <summary>The open run, or null. Read and written only under <see cref="s_lock"/>.</summary>
    private static Run? s_activeRun;

    /// <summary>
    /// The DBL entry uids the open run will update, each once; empty when no run is open.
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
    /// Blank ids are ignored, so a run with none holds nothing.
    /// </summary>
    /// <param name="dblEntryUids">The DBL entry uids of the resources the run will update.</param>
    /// <returns>A handle whose <c>Dispose</c> ends the run and releases every waiter.</returns>
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
            s_activeRun = new Run(ids);
            return s_activeRun;
        }
    }

    /// <summary>
    /// Blocks while the open run holds <paramref name="dblEntryUid"/>, and returns once no run holds
    /// it. Returns at once when no run is open or the run does not hold this id. If one run ends and
    /// the next one also holds the id, keeps waiting for that one too, within the same timeout.
    /// </summary>
    /// <param name="dblEntryUid">The DBL entry uid about to be installed.</param>
    /// <param name="timeout">How long to wait in total; <see cref="WaitTimeout"/> when null.</param>
    /// <returns>
    /// True when no run holds the id (at once or after waiting); false when the timeout elapsed
    /// with the id still held. The guard does not act on a timeout — the caller decides.
    /// </returns>
    public static bool WaitIfHeld(string dblEntryUid, TimeSpan? timeout = null)
    {
        var budget = timeout ?? WaitTimeout;
        var elapsed = Stopwatch.StartNew();
        var announced = false;
        while (true)
        {
            Run? run;
            lock (s_lock)
                run = s_activeRun;
            if (run == null || !run.ResourceIds.Contains(dblEntryUid))
                return true;

            if (!announced)
            {
                Console.WriteLine(
                    $"DBL resource {dblEntryUid} is being updated by the running sync; waiting for the sync to finish."
                );
                announced = true;
            }

            var remaining = budget - elapsed.Elapsed;
            if (remaining <= TimeSpan.Zero || !run.Ended.Wait(remaining))
                return false;
        }
    }

    /// <summary>
    /// Ends any open run, releasing its waiters, and restores <see cref="WaitTimeout"/>, so a test
    /// cannot leave the process-wide state behind for the next one.
    /// </summary>
    internal static void ResetForTests()
    {
        Run? run;
        lock (s_lock)
            run = s_activeRun;
        run?.Dispose();
        WaitTimeout = s_defaultWaitTimeout;
    }

    /// <summary>
    /// One open run: its ids and the signal that it ended. Each run has its own signal, so a waiter
    /// woken by one run's end can never be confused by the next run's.
    /// </summary>
    private sealed class Run(ImmutableHashSet<string> resourceIds) : IDisposable
    {
        public ImmutableHashSet<string> ResourceIds { get; } = resourceIds;

        // Never disposed: a waiter may still be inside Wait when the run ends, and disposing it
        // there throws. Without a wait handle allocated, it owns no unmanaged resource.
        public ManualResetEventSlim Ended { get; } = new(false);

        public void Dispose()
        {
            lock (s_lock)
            {
                if (ReferenceEquals(s_activeRun, this))
                    s_activeRun = null;
            }
            Ended.Set();
        }
    }
}
