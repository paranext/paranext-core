using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: Shared base for the two CAP-021 services
//   (`BackupableProjectsService`, `RestoreDestinationProjectsService`).
//   Both services need an identical lock + snapshot + subscriber-set + wire-event
//   machinery; only the per-element projection (`BuildSnapshot`) and per-element
//   equality (`AreEquivalent`) differ. Extracting the common shape via a
//   template-method pattern eliminates ~120 lines of duplication and gives a single
//   place to evolve the subscriber-set semantics.
// Maps to: data-contracts.md §5.1 / §5.2 (subscription emission shape)
// Source:  c-sharp/BackupRestore/BackupableProjectsService.cs (concrete subclass)
//          c-sharp/BackupRestore/RestoreDestinationProjectsService.cs (concrete subclass)
// Pattern: Existing PT10 abstract-class precedent — `NetworkObjects.NetworkObject`,
//          `NetworkObjects.DataProvider`, `Projects.ProjectDataProvider`.

/// <summary>
/// Template-method base for services that expose a snapshot of <typeparamref name="TItem"/>
/// plus an in-process subscriber set plus a wire-event emission on change. Derived classes
/// supply only the snapshot-projection (<see cref="BuildSnapshot"/>), the per-element
/// equality used for the no-change short-circuit (<see cref="AreEquivalent"/>), and the
/// data-type name announced on the wire (<see cref="DataTypeName"/>).
/// </summary>
/// <remarks>
/// <para>
/// <b>Thread-safety</b>: A single <c>_lock</c> guards both the cached snapshot and the
/// subscriber list. The critical section is small (no I/O). Subscriber handlers are
/// invoked OUTSIDE the lock so handler code that itself calls
/// <see cref="Subscribe"/> / <c>Dispose</c> cannot deadlock.
/// </para>
///
/// <para>
/// <b>Event emission</b>: The service emits
/// <c>PapiClient.SendEventAsync(updateEventType, [DataTypeName])</c>. The send is awaited
/// synchronously via <c>.GetAwaiter().GetResult()</c> because <c>NotifyProjectsChanged</c>
/// is <c>void</c> and tests assert the event has landed before the call returns.
/// </para>
///
/// <para>
/// <b>No-change short-circuit</b>: After <see cref="BuildSnapshot"/> produces a candidate
/// list, <see cref="AreEquivalent"/> compares it to the cached list. If equivalent, the
/// event is suppressed (strategic-plan §CAP-021 "rapid lifecycle" coalescing).
/// </para>
/// </remarks>
internal abstract class SubscribableSnapshotService<TItem>
{
    /// <summary>
    /// The default PAPI update event type for the backup/restore data provider. Both
    /// concrete services use this value unless a test or future configuration overrides it
    /// via the constructor argument.
    /// </summary>
    public const string DefaultUpdateEventType =
        "platformBackupRestore.backupRestore-data:onDidUpdate";

    private readonly PapiClient _papiClient;
    private readonly string _updateEventType;

    /// <summary>
    /// The project source. Derived classes call
    /// <see cref="LocalParatextProjects.GetAllProjectDetails"/> inside their
    /// <see cref="BuildSnapshot"/> override.
    /// </summary>
    protected readonly LocalParatextProjects _paratextProjects;

    // Single lock guards both _cachedSnapshot and _subscribers — see remarks.
    private readonly object _lock = new();
    private List<TItem> _cachedSnapshot = [];
    private readonly List<Action<IReadOnlyList<TItem>>> _subscribers = [];

    protected SubscribableSnapshotService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType
    )
    {
        _papiClient = papiClient;
        _paratextProjects = paratextProjects;
        _updateEventType = updateEventType;
    }

    /// <summary>
    /// The data-type name announced on the wire event payload (e.g.
    /// <c>"BackupableProjects"</c>, <c>"RestoreDestinationProjects"</c>). Returned as an
    /// abstract property so each derived class can forward to its own <c>public const</c>
    /// (which is part of that class's documented surface for tests + future callers).
    /// </summary>
    protected abstract string WireDataTypeName { get; }

    /// <summary>
    /// Rescans <see cref="_paratextProjects"/> and produces the projected snapshot for the
    /// concrete data type. Called inside <see cref="NotifyProjectsChanged"/>.
    /// </summary>
    protected abstract List<TItem> BuildSnapshot();

    /// <summary>
    /// Per-element equality for the no-change short-circuit. C# record default equality
    /// reference-compares collection fields, so each concrete service implements field-wise
    /// equality (using <c>SequenceEqual</c> for any list fields) to make the short-circuit
    /// fire when the rebuilt snapshot is structurally identical to the cached one.
    /// </summary>
    protected abstract bool AreEquivalent(IReadOnlyList<TItem> a, IReadOnlyList<TItem> b);

    /// <summary>
    /// Returns an immutable copy of the current cached snapshot.
    /// </summary>
    public IReadOnlyList<TItem> GetSnapshot()
    {
        lock (_lock)
        {
            // Defensive copy so callers cannot mutate the cached list, and subsequent
            // NotifyProjectsChanged calls cannot mutate state visible to a holder of an
            // earlier snapshot.
            return _cachedSnapshot.ToList().AsReadOnly();
        }
    }

    /// <summary>
    /// Subscribes <paramref name="handler"/> to receive the new snapshot whenever
    /// <see cref="NotifyProjectsChanged"/> detects a change. Subscribing the same handler
    /// twice is a no-op (idempotent — only one entry per handler reference). Returns an
    /// <see cref="IDisposable"/> that removes the subscription; calling <c>Dispose</c>
    /// twice is a no-op.
    /// </summary>
    public IDisposable Subscribe(Action<IReadOnlyList<TItem>> handler)
    {
        lock (_lock)
        {
            if (!_subscribers.Contains(handler))
                _subscribers.Add(handler);
        }
        return new Subscription(this, handler);
    }

    /// <summary>
    /// Rescans the project source, recomputes the snapshot, and (only if the snapshot
    /// actually changed) updates the cache, fires the PAPI wire event, and invokes every
    /// currently-subscribed handler.
    /// </summary>
    public void NotifyProjectsChanged()
    {
        List<TItem> newSnapshot = BuildSnapshot();

        List<Action<IReadOnlyList<TItem>>> handlersToNotify;
        IReadOnlyList<TItem> snapshotForHandlers;
        lock (_lock)
        {
            if (AreEquivalent(_cachedSnapshot, newSnapshot))
                return;

            _cachedSnapshot = newSnapshot;
            snapshotForHandlers = newSnapshot.AsReadOnly();
            // Snapshot the subscriber list inside the lock so handler invocation outside
            // the lock cannot race with concurrent Subscribe/Dispose calls.
            handlersToNotify = [.. _subscribers];
        }

        // Fire the wire-side event BEFORE invoking in-process handlers so tests inspecting
        // SentEventCount immediately after NotifyProjectsChanged see the event.
        // DummyPapiClient.SendEventAsync completes synchronously (returns Task.CompletedTask
        // after enqueueing) so .GetAwaiter().GetResult() does not deadlock here.
        _papiClient
            .SendEventAsync(_updateEventType, new List<string> { WireDataTypeName })
            .GetAwaiter()
            .GetResult();

        foreach (Action<IReadOnlyList<TItem>> handler in handlersToNotify)
            handler(snapshotForHandlers);
    }

    /// <summary>
    /// Defensive read of <see cref="ScrText.FullName"/>. Returns the empty string if the
    /// property throws or is null — both concrete services need the same defensive read.
    /// </summary>
    protected static string SafeFullName(ScrText scrText)
    {
        try
        {
            return scrText.FullName ?? string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }

    private void Unsubscribe(Action<IReadOnlyList<TItem>> handler)
    {
        lock (_lock)
        {
            _subscribers.Remove(handler);
        }
    }

    // IDisposable returned from Subscribe(). Holds the handler reference + a back-pointer
    // to the owning service. Dispose() removes the handler; the _disposed flag ensures a
    // double-Dispose is a no-op.
    private sealed class Subscription : IDisposable
    {
        private readonly SubscribableSnapshotService<TItem> _owner;
        private readonly Action<IReadOnlyList<TItem>> _handler;
        private bool _disposed;

        public Subscription(
            SubscribableSnapshotService<TItem> owner,
            Action<IReadOnlyList<TItem>> handler
        )
        {
            _owner = owner;
            _handler = handler;
        }

        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;
            _owner.Unsubscribe(_handler);
        }
    }
}
