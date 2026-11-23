using Paratext.Data;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Keeps the set of projects for which the Send/Receive server holds changes not yet received
/// here, refreshed by asking the server, and raises <see cref="Changed"/> whenever that set
/// changes.
/// <para>
/// A poll runs on a timer (a first one shortly after <see cref="Start"/>, then at a fixed
/// interval) and once more whenever a Send/Receive run ends. It asks
/// <see cref="ParatextProjectSendReceiveService.GetProjectsWithUnreceivedChanges"/> about every
/// local project in one batched lookup and never writes project data. A failed lookup keeps the
/// previous set: the indicator shows the last answer it got rather than clearing it.
/// </para>
/// <para>
/// Skip, don't defer: a poll that would start while a sync is active, while internet use is not
/// enabled, or while another poll is in flight is dropped and leaves the set unchanged. Nothing is
/// queued, because the next tick or the next sync end polls again anyway.
/// </para>
/// <para>
/// Stale results are discarded: every sync end bumps a generation counter, and a poll publishes
/// its result only if no sync ended since it started — a lookup that overlapped a sync may describe
/// the server before that sync received. A sync end during a poll also requests one follow-up poll,
/// which runs once the poll in flight finishes, subject to the same skip rules at that moment.
/// </para>
/// <para>
/// Concurrency: all state is guarded by one lock. The fetch, the sync and internet reads, and the
/// subscribers all run outside it, so a signal raised by a source while it holds its own lock
/// cannot deadlock against a poll. Raises come from the poll and from the sync signal threads;
/// <see cref="Changed"/> carries no payload and the notifier re-reads both sources, so concurrent
/// raises are harmless.
/// </para>
/// <para>
/// <see cref="RemoteChangesState.IsRechecking"/> is true from the start of a sync (either signal
/// reporting active) until the poll that follows its end has finished. That poll clears the flag
/// whether its lookup succeeded or failed; a poll skipped because internet use is disabled or
/// because the lookup conditions cannot be read clears it too, while a poll skipped because another
/// sync source still reads active leaves it for that source's own end. A poll that a later sync end
/// made stale does not clear it: the follow-up does.
/// </para>
/// <para>
/// Both sync signals the <see cref="UnsyncedChangesTracker"/> uses are consumed:
/// <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> going idle and
/// <see cref="SendReceiveWriteLock.BlockStateChanged"/> disarming. When both end one sync, this
/// costs at most one extra poll; a signal whose poll would start while the other source still
/// reads active is skipped.
/// </para>
/// </summary>
internal sealed class RemoteChangesPoller : IDisposable
{
    private static readonly TimeSpan s_productionFirstDelay = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan s_productionInterval = TimeSpan.FromMinutes(5);

    private readonly Func<IReadOnlyCollection<string>?> _fetch;
    private readonly Func<bool> _isSyncing;
    private readonly Func<bool> _isInternetEnabled;
    private readonly TimeSpan _firstDelay;
    private readonly TimeSpan _interval;
    private readonly ParatextProjectSendReceiveService? _service;

    // Everything below is guarded by _lock. Ids are upper-cased.
    private readonly object _lock = new();
    private HashSet<string> _toReceive = new(StringComparer.OrdinalIgnoreCase);
    private bool _activityActive; // the run marker last reported a sync
    private bool _gateActive; // the write gate last reported armed
    private bool _awaitingPostSyncPoll; // a sync ended and its poll has not completed
    private bool _polling; // at most one poll in flight
    private bool _followUpRequested; // a sync ended during the poll in flight
    private long _generation; // bumped at every sync end
    private Task _current = Task.CompletedTask;
    private Timer? _timer;
    private bool _started;
    private bool _disposed;

    private int _pollFailureWarned; // warn once per run of failures, until a poll succeeds

    public RemoteChangesPoller(
        ParatextProjectSendReceiveService service,
        LocalParatextProjects projects
    )
        : this(
            () => FetchFromServer(service, projects),
            () => UnsyncedChangesTracker.IsAnySyncActive(service),
            service.IsInternetUseEnabled,
            s_productionFirstDelay,
            s_productionInterval
        )
    {
        _service = service;
    }

    /// <param name="fetch">The ids of the projects with changes to receive; <see langword="null"/>
    /// when the lookup failed, which keeps the previous set.</param>
    /// <param name="isSyncing">Whether a Send/Receive run is active.</param>
    /// <param name="isInternetEnabled">Whether internet use is enabled.</param>
    /// <param name="firstDelay">Time from <see cref="Start"/> to the first timed poll.</param>
    /// <param name="interval">Time between timed polls.</param>
    internal RemoteChangesPoller(
        Func<IReadOnlyCollection<string>?> fetch,
        Func<bool> isSyncing,
        Func<bool> isInternetEnabled,
        TimeSpan firstDelay,
        TimeSpan interval
    )
    {
        _fetch = fetch;
        _isSyncing = isSyncing;
        _isInternetEnabled = isInternetEnabled;
        _firstDelay = firstDelay;
        _interval = interval;
    }

    /// <summary>
    /// Raised when the set of projects with changes to receive changes by value, or when
    /// <see cref="RemoteChangesState.IsRechecking"/> flips; read it with <see cref="GetState"/>.
    /// Never raised under the poller's lock. After <see cref="Dispose"/> the set no longer changes,
    /// so only a raise already under way can still arrive. A throwing subscriber is logged and does
    /// not affect the others.
    /// </summary>
    public event Action? Changed;

    /// <summary>
    /// A snapshot of the projects the last successful poll reported and whether a sync is active or
    /// its poll is still outstanding, read together.
    /// </summary>
    public RemoteChangesState GetState()
    {
        lock (_lock)
            return new(_toReceive.ToArray(), IsRecheckingLocked());
    }

    // Under _lock.
    private bool IsRecheckingLocked() => _activityActive || _gateActive || _awaitingPostSyncPoll;

    /// <summary>
    /// Arms the poll timer and, on a poller built with the production constructor, subscribes to
    /// both sync-end signals. Idempotent.
    /// </summary>
    public void Start()
    {
        lock (_lock)
        {
            if (_started || _disposed)
                return;
            _started = true;
            if (_service is not null)
            {
                _service.SyncActivityChanged += OnSyncActivityChanged;
                SendReceiveWriteLock.BlockStateChanged += OnBlockStateChanged;
            }
            _timer = new Timer(_ => Tick(), null, _firstDelay, _interval);
        }
    }

    /// <summary>
    /// Polls now after a sync ended. A poll in flight is marked stale and followed by one more.
    /// </summary>
    internal void OnSyncEnded() => EndSync(signal: null);

    // Clears the ending signal's flag and requests the post-sync poll in one critical section, so
    // IsRechecking never reads false between the sync's end and its poll.
    private void EndSync(bool? signal)
    {
        lock (_lock)
        {
            if (_disposed)
                return;
            if (signal is true)
                _activityActive = false;
            else if (signal is false)
                _gateActive = false;
            _awaitingPostSyncPoll = true;
            _generation++;
            if (_polling)
            {
                _followUpRequested = true;
                return;
            }
        }
        Tick();
    }

    /// <summary>Starts a poll unless one of the skip conditions holds.</summary>
    internal void Tick()
    {
        lock (_lock)
        {
            if (_disposed || _polling)
                return;
        }
        switch (CanPoll())
        {
            case PollCondition.StillSyncing:
                return;
            case PollCondition.Unavailable:
                ClearAwaitingPostSyncPoll();
                return;
        }
        lock (_lock)
        {
            if (_disposed || _polling)
                return;
            _polling = true;
            long generation = _generation;
            _current = Task.Run(() => Poll(generation));
        }
    }

    /// <summary>Completes once no poll is in flight. For tests.</summary>
    internal async Task FlushAsync()
    {
        while (true)
        {
            Task current;
            lock (_lock)
                current = _current;
            await current.ConfigureAwait(false);
            lock (_lock)
            {
                // A follow-up starts before the poll that requested it completes, so an unchanged
                // task means nothing is left in flight.
                if (ReferenceEquals(current, _current))
                    return;
            }
        }
    }

    /// <summary>
    /// Stops the timer and unsubscribes. A poll already running finishes, but publishes nothing.
    /// </summary>
    public void Dispose()
    {
        Timer? timer;
        lock (_lock)
        {
            if (_disposed)
                return;
            _disposed = true;
            if (_started && _service is not null)
            {
                _service.SyncActivityChanged -= OnSyncActivityChanged;
                SendReceiveWriteLock.BlockStateChanged -= OnBlockStateChanged;
            }
            timer = _timer;
            _timer = null;
        }
        timer?.Dispose();
    }

    internal void OnSyncActivityChanged(SyncActivityState state)
    {
        if (state.IsSyncing)
            BeginSync(isActivity: true);
        else
            EndSync(signal: true);
    }

    internal void OnBlockStateChanged(SendReceiveBlockState state)
    {
        if (state.IsBlocking)
            BeginSync(isActivity: false);
        else
            EndSync(signal: false);
    }

    private void BeginSync(bool isActivity)
    {
        bool flipped;
        lock (_lock)
        {
            if (_disposed)
                return;
            bool before = IsRecheckingLocked();
            if (isActivity)
                _activityActive = true;
            else
                _gateActive = true;
            flipped = before != IsRecheckingLocked();
        }
        if (flipped)
            RaiseChanged();
    }

    // The lookup conditions are not met, so no poll will answer for the sync that just ended.
    private void ClearAwaitingPostSyncPoll()
    {
        bool flipped;
        lock (_lock)
        {
            if (_disposed || !_awaitingPostSyncPoll)
                return;
            bool before = IsRecheckingLocked();
            _awaitingPostSyncPoll = false;
            flipped = before != IsRecheckingLocked();
        }
        if (flipped)
            RaiseChanged();
    }

    private static IReadOnlyCollection<string>? FetchFromServer(
        ParatextProjectSendReceiveService service,
        LocalParatextProjects projects
    )
    {
        var scrTexts = new List<ScrText>();
        foreach (var details in projects.GetAvailableUnpublishedProjectDetails())
        {
            try
            {
                scrTexts.Add(LocalParatextProjects.GetParatextProject(details.Metadata.Id));
            }
            catch (ProjectNotFoundException)
            {
                // Removed since it was listed: an expected outcome, not worth a log line.
            }
            catch (Exception ex)
            {
                // Message only: a project that stays broken would otherwise print a stack trace
                // every poll.
                Console.Error.WriteLine(
                    $"[RemoteChangesPoller] Could not resolve project {details.Metadata.Id}: {ex.GetType().Name}: {ex.Message}"
                );
            }
        }
        return service.GetProjectsWithUnreceivedChanges(scrTexts);
    }

    private enum PollCondition
    {
        Ready,
        StillSyncing, // skipped; the sync source that is still active ends with its own signal
        Unavailable, // internet use disabled or the conditions could not be read
    }

    // A failing read counts as "do not poll": skipping is always safe, and the next tick retries.
    private PollCondition CanPoll()
    {
        try
        {
            if (_isSyncing())
                return PollCondition.StillSyncing;
            return _isInternetEnabled() ? PollCondition.Ready : PollCondition.Unavailable;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"[RemoteChangesPoller] Could not read the poll conditions: {ex}"
            );
            return PollCondition.Unavailable;
        }
    }

    private void Poll(long generation)
    {
        try
        {
            IReadOnlyCollection<string>? result;
            try
            {
                result = _fetch();
            }
            catch (Exception ex)
            {
                // The lookup keeps failing the same way while the server is unreachable, so one
                // line per run of failures is enough.
                if (Interlocked.Exchange(ref _pollFailureWarned, 1) == 0)
                {
                    Console.Error.WriteLine(
                        $"[RemoteChangesPoller] Poll failed: {ex.GetType().Name}: {ex.Message}"
                    );
                }
                result = null;
            }
            if (result is not null)
                Interlocked.Exchange(ref _pollFailureWarned, 0);
            if (Apply(result, generation))
                RaiseChanged();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[RemoteChangesPoller] Could not apply the poll result: {ex}");
        }
        finally
        {
            ReleaseAndFollowUp();
        }
    }

    // Publishes the result unless a sync ended since the poll was claimed, and ends the wait for
    // the post-sync poll when the poll is current, whether or not its lookup succeeded (a null
    // result). True when the set changed by value or IsRechecking flipped.
    private bool Apply(IReadOnlyCollection<string>? result, long generation)
    {
        HashSet<string>? next = result is null
            ? null
            : new(result.Select(id => id.ToUpperInvariant()), StringComparer.OrdinalIgnoreCase);
        lock (_lock)
        {
            if (_disposed || generation != _generation)
                return false;
            bool before = IsRecheckingLocked();
            _awaitingPostSyncPoll = false;
            bool setChanged = next is not null && !next.SetEquals(_toReceive);
            if (setChanged)
                _toReceive = next!;
            return setChanged || before != IsRecheckingLocked();
        }
    }

    // Releases the in-flight claim and runs the follow-up a sync end requested during the poll.
    private void ReleaseAndFollowUp()
    {
        bool followUp;
        lock (_lock)
        {
            followUp = _followUpRequested && !_disposed;
            _followUpRequested = false;
            _polling = false;
        }
        // Runs before this poll's task completes, so FlushAsync sees the follow-up's task.
        if (followUp)
            Tick();
    }

    private void RaiseChanged()
    {
        if (Changed is not { } handlers)
            return;
        foreach (Delegate handler in handlers.GetInvocationList())
        {
            try
            {
                ((Action)handler)();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"A {nameof(Changed)} handler threw: {ex}");
            }
        }
    }
}

/// <summary>
/// What <see cref="RemoteChangesPoller.GetState"/> reports, read together.
/// </summary>
/// <param name="ToReceive">The projects the last successful poll reported as having server changes
/// not yet received here.</param>
/// <param name="IsRechecking">True from the start of a sync until the poll that follows its end has
/// finished.</param>
internal readonly record struct RemoteChangesState(
    IReadOnlyCollection<string> ToReceive,
    bool IsRechecking
);
