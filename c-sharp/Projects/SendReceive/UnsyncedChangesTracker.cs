using Paratext.Data;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Keeps the set of projects whose local repository holds changes Send/Receive has not sent, and
/// raises <see cref="Changed"/> whenever that set changes.
/// <para>
/// A project is (re)checked when a write scope for it closes
/// (<see cref="SendReceiveWriteLock.WriteScopeExited"/>, debounced per project so a burst of edits
/// costs one check, and skipped while the project is already marked and no check of it is running),
/// when a Send/Receive run ends (the projects it announced, or every project seen so far when it
/// announced none; plus every marked project), and once for every project in the baseline scan. A check re-reads the repository through
/// <see cref="ParatextProjectSendReceiveService.HasUnsyncedLocalChanges"/> rather than trusting the
/// trigger, and never writes project data.
/// </para>
/// <para>
/// Concurrency: all state is guarded by one lock, and no check or subscriber runs under it. At most
/// one check runs per project at a time; a trigger that lands while that project's check is running
/// requests exactly one re-run, so the last write is always observed. No check starts while a sync
/// is active — the project is parked and rechecked at the sync-end transition. A check that started
/// just before a sync is harmless: it only reads, and the sync-end recheck corrects its result.
/// </para>
/// <para>
/// Two sync signals are consumed, and "a sync is active" means either one says so:
/// <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> is authoritative for every
/// sync path but is not raised by every Send/Receive implementation (the current Paratext 10 patch
/// raises none), while
/// <see cref="SendReceiveWriteLock.BlockStateChanged"/> is armed by every real sync. The end of
/// either one triggers the recheck; when both end one sync, the per-project claim absorbs the
/// second pass into at most one extra check per project. This relies on each source already
/// reporting idle through its live read (<see cref="ParatextProjectSendReceiveService.GetSyncActivity"/>,
/// <see cref="SendReceiveWriteLock.GetBlockState"/>) when it raises its end transition; if the other
/// signal is still active then, the recheck parks again and runs when that one ends.
/// </para>
/// </summary>
internal sealed class UnsyncedChangesTracker : IDisposable
{
    private static readonly TimeSpan s_productionDebounce = TimeSpan.FromMilliseconds(1500);

    private readonly Func<string, bool?> _detect;
    private readonly Func<bool> _isSyncing;
    private readonly Func<IEnumerable<string>> _allProjectIds;
    private readonly TimeSpan _debounce;
    private readonly ParatextProjectSendReceiveService? _service;

    // Everything below up to _raiseLock is guarded by _lock. Ids are normalized (upper-cased).
    private readonly object _lock = new();
    private readonly HashSet<string> _unsynced = [];
    private readonly HashSet<string> _tracked = []; // every known project checked so far
    private readonly HashSet<string> _deferred = []; // checks parked while a sync was active
    private readonly HashSet<string> _syncCovered = []; // ids the current or last sync announced
    private bool _activityActive; // the run marker last reported a sync
    private bool _gateActive; // the write gate last reported armed
    private int _postSyncPasses; // sync-end rechecks scheduled or running
    private readonly Dictionary<string, CancellationTokenSource> _debounces = [];
    private readonly Dictionary<string, bool> _inFlight = []; // id → re-run requested
    private long _syncEndCount;
    private int _outstandingWork;
    private TaskCompletionSource _idle = new();
    private bool _started;
    private bool _disposed;

    // Serializes raises so subscribers receive states in order. Taken before _lock, never inside it.
    private readonly object _raiseLock = new();
    private UnsyncedChangesState _lastRaised = UnsyncedChangesState.Empty;

    public UnsyncedChangesTracker(
        ParatextProjectSendReceiveService service,
        LocalParatextProjects projects
    )
        : this(
            projectId => DetectInProject(service, projectId),
            () => IsAnySyncActive(service),
            () =>
                projects
                    .GetAvailableUnpublishedProjectDetails()
                    .Select(details => details.Metadata.Id),
            s_productionDebounce
        )
    {
        _service = service;
    }

    /// <param name="detect">Whether a project has unsent local changes; <see langword="null"/> when
    /// that could not be determined, which leaves the project's state unchanged; throws
    /// <see cref="ProjectNotFoundException"/> when the project no longer exists, which drops it from
    /// the set.</param>
    /// <param name="isSyncing">Whether a Send/Receive run is active.</param>
    /// <param name="allProjectIds">Every project the baseline scan checks.</param>
    /// <param name="debounce">Quiet time after a project's last write before it is checked.</param>
    internal UnsyncedChangesTracker(
        Func<string, bool?> detect,
        Func<bool> isSyncing,
        Func<IEnumerable<string>> allProjectIds,
        TimeSpan debounce
    )
    {
        _detect = detect;
        _isSyncing = isSyncing;
        _allProjectIds = allProjectIds;
        _debounce = debounce;
        _idle.SetResult();
    }

    /// <summary>
    /// Raised with the new state when the set of unsynced projects changes by value. Never raised
    /// under the tracker's state lock; raises are serialized and each carries the latest state, so
    /// once checks settle the last state a subscriber received matches <see cref="GetState"/>. The
    /// state includes <see cref="UnsyncedChangesState.IsRechecking"/>, so a change of that flag alone
    /// raises too: the snapshot that clears it is pushed even when no project changed. Not raised
    /// after <see cref="Dispose"/>. A throwing subscriber is logged and does not affect the others.
    /// </summary>
    public event Action<UnsyncedChangesState>? Changed;

    /// <summary>
    /// A snapshot of the projects currently known to hold unsent local changes, and whether a sync
    /// is active or its recheck is still outstanding.
    /// </summary>
    public UnsyncedChangesState GetState()
    {
        lock (_lock)
            return StateLocked();
    }

    // Under _lock.
    private UnsyncedChangesState StateLocked() =>
        new(_unsynced.ToArray(), Array.Empty<string>(), IsRecheckingLocked());

    // Under _lock. True from the start of a sync (either signal) until the recheck that follows its
    // end has finished.
    private bool IsRecheckingLocked() => _activityActive || _gateActive || _postSyncPasses > 0;

    /// <summary>
    /// Subscribes to write-scope exits and both sync signals. Idempotent; does nothing on a
    /// tracker built with the test constructor, which is driven directly instead.
    /// </summary>
    public void Start()
    {
        lock (_lock)
        {
            if (_started || _disposed || _service is null)
                return;
            _started = true;
            SendReceiveWriteLock.WriteScopeExited += OnWriteScopeExited;
            SendReceiveWriteLock.BlockStateChanged += OnBlockStateChanged;
            _service.SyncActivityChanged += OnSyncActivityChanged;
        }
    }

    /// <summary>Checks every project once, one at a time, on a background thread.</summary>
    public void StartBaselineScan()
    {
        lock (_lock)
        {
            if (_disposed)
                return;
            BeginWorkLocked();
        }
        _ = Task.Run(() => RunPass(() => Normalize(_allProjectIds())));
    }

    /// <summary>Schedules a check of the project once its writes have been quiet for the debounce.</summary>
    internal void OnWriteScopeExited(string projectId)
    {
        string? id = Normalize([projectId]).FirstOrDefault();
        if (id is null)
            return;
        // Never disposed: it has no timer or linked token, so Dispose would release nothing, and
        // skipping it lets Cancel run outside the lock without racing a dispose.
        CancellationTokenSource debounce = new();
        CancellationTokenSource? superseded;
        lock (_lock)
        {
            if (_disposed)
                return;
            // A write cannot add unsent work to a project that already has some. A running check
            // may have read the repository before this write, so it must still be asked to re-run.
            if (_unsynced.Contains(id) && !_inFlight.ContainsKey(id))
                return;
            _debounces.Remove(id, out superseded);
            _debounces[id] = debounce;
            BeginWorkLocked();
        }
        superseded?.Cancel();
        _ = DebounceThenCheckAsync(id, debounce);
    }

    /// <summary>
    /// While a sync runs, records the project ids it announces; at the end of the run, rechecks
    /// (see <see cref="RecheckAfterSync"/>).
    /// </summary>
    internal void OnSyncActivityChanged(SyncActivityState state)
    {
        if (state.IsSyncing)
            NoteSyncSignal(isActivity: true, state.ProjectIds);
        else
            EndSyncSignal(isActivity: true);
    }

    /// <summary>
    /// While the write gate is armed, records the project ids it blocks; when it disarms, rechecks
    /// (see <see cref="RecheckAfterSync"/>). Arming starts no check: checks consult the gate when
    /// they start.
    /// </summary>
    internal void OnBlockStateChanged(SendReceiveBlockState state)
    {
        if (state.IsBlocking)
            NoteSyncSignal(isActivity: false, state.ProjectIds);
        else
            EndSyncSignal(isActivity: false);
    }

    // Both signals' announced ids go into one set that resets when the next sync begins (neither
    // signal active), so the second pass of a sync that ends both signals rechecks the same
    // projects as the first.
    private void NoteSyncSignal(bool isActivity, IEnumerable<string> projectIds)
    {
        string[] ids = [.. Normalize(projectIds ?? [])];
        lock (_lock)
        {
            if (_disposed)
                return;
            if (!_activityActive && !_gateActive)
                _syncCovered.Clear();
            if (isActivity)
                _activityActive = true;
            else
                _gateActive = true;
            _syncCovered.UnionWith(ids);
        }
        RaiseLatestState();
    }

    private void EndSyncSignal(bool isActivity)
    {
        lock (_lock)
        {
            if (isActivity)
                _activityActive = false;
            else
                _gateActive = false;
            // Counted in the same critical section as the flag clear, so the flag never reads
            // false between the sync's end and the start of its recheck.
            _postSyncPasses++;
        }
        RecheckAfterSync();
    }

    /// <summary>
    /// Whether either sync signal reports an active sync: the run marker or the armed write gate.
    /// </summary>
    internal static bool IsAnySyncActive(ParatextProjectSendReceiveService service) =>
        service.GetSyncActivity().IsSyncing || SendReceiveWriteLock.GetBlockState().IsBlocking;

    /// <summary>
    /// Rechecks the projects the sync announced (every project seen so far when it announced none),
    /// every project currently marked unsynced, and every check parked during the sync. Marked
    /// projects go first, then parked ones, then the rest, so a project the sync just sent leaves
    /// the set before the pass spends time on any other project.
    /// </summary>
    private void RecheckAfterSync()
    {
        string[] ids;
        lock (_lock)
        {
            if (_disposed)
                return;
            _syncEndCount++;
            ids =
            [
                .. _unsynced
                    .Concat(_deferred)
                    .Concat(_syncCovered.Count > 0 ? _syncCovered : _tracked)
                    .Distinct(),
            ];
            _deferred.Clear();
            // Two work units: RunPass ends one; RunPostSyncPass holds the other until it has
            // lowered the pass count and pushed the state, so FlushAsync cannot complete earlier.
            BeginWorkLocked();
            BeginWorkLocked();
        }
        _ = Task.Run(() => RunPostSyncPass(ids));
    }

    // Runs the sync-end recheck, then lowers the pass count and pushes the state that carries the
    // cleared IsRechecking flag, even when no project changed.
    private void RunPostSyncPass(string[] ids)
    {
        try
        {
            try
            {
                RunPass(() => ids);
            }
            finally
            {
                lock (_lock)
                    _postSyncPasses--;
            }
            RaiseLatestState();
        }
        finally
        {
            EndWork();
        }
    }

    /// <summary>Completes once no debounce, check, or scan is outstanding. For tests.</summary>
    internal Task FlushAsync()
    {
        lock (_lock)
            return _idle.Task;
    }

    /// <summary>Whether a debounce for the project has yet to fire. For tests.</summary>
    internal bool HasPendingDebounce(string projectId)
    {
        string? id = Normalize([projectId]).FirstOrDefault();
        lock (_lock)
            return id is not null && _debounces.ContainsKey(id);
    }

    /// <summary>
    /// Unsubscribes and cancels pending debounces. A check already running finishes, but raises
    /// nothing.
    /// </summary>
    public void Dispose()
    {
        CancellationTokenSource[] debounces;
        lock (_lock)
        {
            if (_disposed)
                return;
            _disposed = true;
            if (_started)
            {
                SendReceiveWriteLock.WriteScopeExited -= OnWriteScopeExited;
                SendReceiveWriteLock.BlockStateChanged -= OnBlockStateChanged;
                _service!.SyncActivityChanged -= OnSyncActivityChanged;
            }
            debounces = [.. _debounces.Values];
            _debounces.Clear();
        }
        foreach (CancellationTokenSource debounce in debounces)
            debounce.Cancel();
    }

    private static bool? DetectInProject(ParatextProjectSendReceiveService service, string id)
    {
        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(id);
        }
        catch (ProjectNotFoundException)
        {
            throw; // removed or never existed: the caller drops the project from the set
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"[UnsyncedChangesTracker] Could not resolve project {id}: {ex}"
            );
            return null;
        }
        return service.HasUnsyncedLocalChanges(scrText);
    }

    private static IEnumerable<string> Normalize(IEnumerable<string> projectIds) =>
        SendReceiveWriteLock.NormalizeProjectIds(projectIds).Select(id => id.ToUpperInvariant());

    private async Task DebounceThenCheckAsync(string id, CancellationTokenSource debounce)
    {
        bool claimed = false;
        try
        {
            // ForceYielding keeps the check off the writer's thread even with a zero debounce.
            await Task.Delay(_debounce, debounce.Token)
                .ConfigureAwait(
                    ConfigureAwaitOptions.SuppressThrowing | ConfigureAwaitOptions.ForceYielding
                );
            lock (_lock)
            {
                // Only the latest debounce for a project fires; a superseded or disposed one ends.
                if (_debounces.TryGetValue(id, out var current) && current == debounce)
                {
                    _debounces.Remove(id);
                    claimed = ClaimCheckLocked(id);
                }
            }
        }
        finally
        {
            EndWork();
        }
        if (claimed)
            RunCheckLoop(id);
    }

    // Checks the given projects one at a time, so a scan never runs many repository reads at once.
    private void RunPass(Func<IEnumerable<string>> ids)
    {
        try
        {
            foreach (string id in ids())
            {
                bool claimed;
                lock (_lock)
                {
                    if (_disposed)
                        return;
                    claimed = ClaimCheckLocked(id);
                }
                if (claimed)
                    RunCheckLoop(id);
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[UnsyncedChangesTracker] Project scan failed: {ex}");
        }
        finally
        {
            EndWork();
        }
    }

    // Under _lock. True when the caller now owns the project's check and must run RunCheckLoop;
    // false when a check is already running, in which case it is asked for one more run.
    private bool ClaimCheckLocked(string id)
    {
        _tracked.Add(id);
        if (_inFlight.ContainsKey(id))
        {
            _inFlight[id] = true;
            return false;
        }
        _inFlight[id] = false;
        BeginWorkLocked();
        return true;
    }

    // Runs the claimed check, repeating it once per batch of triggers that landed meanwhile, and
    // releases the claim.
    private void RunCheckLoop(string id)
    {
        try
        {
            bool rerun = true;
            while (rerun)
            {
                if (DeferIfSyncing(id))
                    return;
                CheckResult result = Detect(id);
                bool changed = false;
                lock (_lock)
                {
                    switch (result)
                    {
                        case CheckResult.Unsynced:
                            changed = _unsynced.Add(id);
                            break;
                        case CheckResult.Synced:
                            changed = _unsynced.Remove(id);
                            break;
                        case CheckResult.Removed:
                            _tracked.Remove(id);
                            changed = _unsynced.Remove(id);
                            break;
                        case CheckResult.Unknown:
                            break;
                    }
                    rerun = _inFlight[id] && !_disposed;
                    if (rerun)
                        _inFlight[id] = false;
                    else
                        _inFlight.Remove(id);
                }
                if (changed)
                    RaiseLatestState();
            }
        }
        finally
        {
            EndWork();
        }
    }

    // When a sync is active, parks the project for the sync-end recheck and releases its claim. If a
    // sync ends while this reads the sync state, it reads again, so a project can never be parked
    // after the sync-end pass has already collected the parked set.
    private bool DeferIfSyncing(string id)
    {
        while (true)
        {
            long syncEndCount;
            lock (_lock)
                syncEndCount = _syncEndCount;
            if (!IsSyncing())
                return false;
            lock (_lock)
            {
                if (syncEndCount != _syncEndCount)
                    continue;
                _deferred.Add(id);
                _inFlight.Remove(id);
                return true;
            }
        }
    }

    private bool IsSyncing()
    {
        try
        {
            return _isSyncing();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[UnsyncedChangesTracker] Could not read sync state: {ex}");
            return false;
        }
    }

    private enum CheckResult
    {
        Synced,
        Unsynced,
        Unknown,
        Removed,
    }

    // A check that cannot reach an answer leaves the project's state unchanged.
    private CheckResult Detect(string id)
    {
        try
        {
            return _detect(id) switch
            {
                true => CheckResult.Unsynced,
                false => CheckResult.Synced,
                null => CheckResult.Unknown,
            };
        }
        catch (ProjectNotFoundException)
        {
            return CheckResult.Removed;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"[UnsyncedChangesTracker] Check failed for {id}: {ex.Message}"
            );
            return CheckResult.Unknown;
        }
    }

    private void RaiseLatestState()
    {
        lock (_raiseLock)
        {
            UnsyncedChangesState latest;
            lock (_lock)
            {
                if (_disposed)
                    return;
                latest = StateLocked();
            }
            if (latest.Equals(_lastRaised))
                return;
            _lastRaised = latest;
            if (Changed is not { } handlers)
                return;
            foreach (Delegate handler in handlers.GetInvocationList())
            {
                try
                {
                    ((Action<UnsyncedChangesState>)handler)(latest);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"A {nameof(Changed)} handler threw: {ex}");
                }
            }
        }
    }

    private void BeginWorkLocked()
    {
        if (_outstandingWork++ == 0)
            _idle = new(TaskCreationOptions.RunContinuationsAsynchronously);
    }

    private void EndWork()
    {
        lock (_lock)
        {
            if (--_outstandingWork == 0)
                _idle.SetResult();
        }
    }
}
