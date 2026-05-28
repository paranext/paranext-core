using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: PT9 read the backup-eligible project list inline inside `BackupForm` from
//   `ScrTextCollection`; PT10 owns it as a standalone service so the
//   `BackupRestoreDataProvider` can expose it as a subscribable data type
//   (`BackupableProjects` per data-contracts.md §5.1).
// Maps to: data-contracts.md §3.10 (element type) + §5.1 (subscription)
// Source:  c-sharp/BackupRestore/BackupableProject.cs (record)
//          .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-021
//          .context/features/project-backup-and-restore/implementation/backend-alignment.md (line 105)
// Behaviors: BHV-650 (Main-menu Backup entry — consumes this list)
// Invariants: INV-B01 (resource projects filtered from backupable list)

/// <summary>
/// Internal collaborator of the future <c>BackupRestoreDataProvider</c>. Maintains a snapshot of
/// backup-eligible projects (i.e., projects with <c>scrText.IsProtectedText == false</c>) and an
/// in-process subscriber set so callers can react to changes. Notifies subscribers — both the
/// in-process delegates AND the network via <see cref="PapiClient.SendEventAsync"/> — whenever
/// <see cref="NotifyProjectsChanged"/> is called and the recomputed snapshot differs from the
/// previous one.
/// </summary>
/// <remarks>
/// <para>
/// <b>Test seam</b>: <see cref="NotifyProjectsChanged"/> is the entry point the future
/// <c>BackupRestoreDataProvider</c> calls when the underlying <see cref="LocalParatextProjects"/>
/// produces a project lifecycle event. <see cref="LocalParatextProjects"/> has no built-in event
/// hooks today, so the test seam is the same as the production seam.
/// </para>
///
/// <para>
/// <b>Invariant INV-B01</b>: Resource projects (<c>scrText.IsProtectedText == true</c>) MUST be
/// filtered out of the snapshot. PT9 enforces this in <c>BackupForm.ValidateData</c>
/// (<c>BackupForm.cs:225-230</c>) at the dialog-OK level; PT10 enforces it earlier, at the
/// list-source level, so resource projects never appear in the UI dropdown to begin with.
/// </para>
///
/// <para>
/// <b>Event emission shape</b> (per <c>data-contracts.md §5.1</c> + <c>DataProvider.cs:19-20</c>):
/// the service emits <c>PapiClient.SendEventAsync(updateEventType, [dataTypeName])</c> where
/// <c>updateEventType</c> defaults to <c>"platformBackupRestore.backupRestore-data:onDidUpdate"</c>
/// and <c>dataTypeName</c> is <c>"BackupableProjects"</c>. The constructor accepts both as
/// parameters so tests (and future configurations) can override.
/// </para>
/// </remarks>
internal sealed class BackupableProjectsService
{
    public const string DefaultUpdateEventType =
        "platformBackupRestore.backupRestore-data:onDidUpdate";
    public const string DataTypeName = "BackupableProjects";

    private readonly PapiClient _papiClient;
    private readonly LocalParatextProjects _paratextProjects;
    private readonly string _updateEventType;

    // Single lock guards both _cachedSnapshot and _subscribers. The critical section is small
    // (no I/O); subscriber handlers are invoked OUTSIDE the lock so handler code that itself
    // calls Subscribe/Dispose cannot deadlock.
    private readonly object _lock = new();
    private List<BackupableProject> _cachedSnapshot = [];
    private readonly List<Action<IReadOnlyList<BackupableProject>>> _subscribers = [];

    public BackupableProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
    {
        _papiClient = papiClient;
        _paratextProjects = paratextProjects;
        _updateEventType = updateEventType;
    }

    /// <summary>
    /// Returns the current snapshot of backup-eligible projects. Resource projects
    /// (<c>IsProtectedText == true</c>) are filtered per INV-B01.
    /// </summary>
    public IReadOnlyList<BackupableProject> GetSnapshot()
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
    /// <see cref="NotifyProjectsChanged"/> detects a change. Subscribing the same handler twice
    /// is a no-op (idempotent — only one entry per handler reference). Returns an
    /// <see cref="IDisposable"/> that removes the subscription; calling <c>Dispose</c> twice is
    /// a no-op.
    /// </summary>
    public IDisposable Subscribe(Action<IReadOnlyList<BackupableProject>> handler)
    {
        lock (_lock)
        {
            if (!_subscribers.Contains(handler))
                _subscribers.Add(handler);
        }
        return new Subscription(this, handler);
    }

    /// <summary>
    /// Rescans <see cref="LocalParatextProjects"/>, recomputes the filtered+projected snapshot, and
    /// (only if the snapshot actually changed) updates the cache, fires
    /// <see cref="PapiClient.SendEventAsync"/>, and invokes every currently-subscribed handler.
    /// </summary>
    public void NotifyProjectsChanged()
    {
        List<BackupableProject> newSnapshot = BuildSnapshot();

        List<Action<IReadOnlyList<BackupableProject>>> handlersToNotify;
        IReadOnlyList<BackupableProject> snapshotForHandlers;
        lock (_lock)
        {
            // Snapshot-equality short-circuit (strategic-plan §CAP-021 "rapid lifecycle"):
            // if the recomputed snapshot is equivalent to the cached one, suppress the event.
            if (AreEquivalent(_cachedSnapshot, newSnapshot))
                return;

            _cachedSnapshot = newSnapshot;
            snapshotForHandlers = newSnapshot.AsReadOnly();
            // Snapshot the subscriber list inside the lock so handler invocation outside the
            // lock cannot race with concurrent Subscribe/Dispose calls.
            handlersToNotify = [.. _subscribers];
        }

        // Fire the wire-side event BEFORE invoking in-process handlers so tests inspecting
        // SentEventCount immediately after NotifyProjectsChanged see the event.
        // DummyPapiClient.SendEventAsync completes synchronously (returns Task.CompletedTask
        // after enqueueing) so .GetAwaiter().GetResult() does not deadlock here.
        _papiClient
            .SendEventAsync(_updateEventType, new List<string> { DataTypeName })
            .GetAwaiter()
            .GetResult();

        foreach (Action<IReadOnlyList<BackupableProject>> handler in handlersToNotify)
            handler(snapshotForHandlers);
    }

    // EXPLANATION:
    // Custom equality helper. C# record value-equality compares scalar fields by value but
    // compares collection fields (here `DefaultBookIds`, an IReadOnlyList<string>) by REFERENCE.
    // Each NotifyProjectsChanged call builds a fresh list, so reference equality would always
    // report "changed" and the no-change short-circuit would never fire. We compare scalar
    // fields with default record equality (via `with`-style structural compare) and the
    // DefaultBookIds list element-wise with SequenceEqual.
    private static bool AreEquivalent(
        IReadOnlyList<BackupableProject> a,
        IReadOnlyList<BackupableProject> b
    )
    {
        if (a.Count != b.Count)
            return false;
        for (int i = 0; i < a.Count; i++)
        {
            BackupableProject x = a[i];
            BackupableProject y = b[i];
            if (
                x.Id != y.Id
                || x.ShortName != y.ShortName
                || x.FullName != y.FullName
                || x.HasFiguresFolder != y.HasFiguresFolder
                || x.IsNoteType != y.IsNoteType
                || !x.DefaultBookIds.SequenceEqual(y.DefaultBookIds)
            )
                return false;
        }
        return true;
    }

    // EXPLANATION:
    // Rescans LocalParatextProjects.GetAllProjectDetails(), resolves each id to its ScrText,
    // and projects it to the BackupableProject record. Resource projects (IsProtectedText) are
    // filtered out per INV-B01. Field sources match shared-types.md §3.10:
    //   * Id              -- ProjectDetails.Metadata.Id (the PT10 HexId-form id)
    //   * ShortName       -- scrText.Name (PT9 ScrText.cs:257)
    //   * FullName        -- scrText.FullName (PT9 ScrText.cs:287)
    //   * HasFiguresFolder-- Directory.Exists(<scrText.Directory>/figures)
    //   * IsNoteType      -- Settings.TranslationInfo.Type.IsNoteType() (PT9 CommentThread.cs:261)
    //   * DefaultBookIds  -- scrText.BooksPresentSet.SelectedBookNumbers -> Canon.BookNumberToId
    // Defensive nulls because DummyScrText may have an unpopulated Settings.TranslationInfo.
    private List<BackupableProject> BuildSnapshot()
    {
        var result = new List<BackupableProject>();
        foreach (ProjectDetails details in _paratextProjects.GetAllProjectDetails())
        {
            ScrText scrText;
            try
            {
                scrText = LocalParatextProjects.GetParatextProject(details.Metadata.Id);
            }
            catch
            {
                // Defensive: if a project went away between enumeration and resolution, skip it.
                continue;
            }

            // INV-B01: filter resource projects out of the backupable list.
            if (scrText.IsProtectedText)
                continue;

            result.Add(
                new BackupableProject
                {
                    Id = details.Metadata.Id,
                    ShortName = scrText.Name,
                    FullName = SafeFullName(scrText),
                    HasFiguresFolder = HasFiguresFolder(scrText),
                    IsNoteType = IsNoteType(scrText),
                    DefaultBookIds = ComputeDefaultBookIds(scrText),
                }
            );
        }
        return result;
    }

    private static string SafeFullName(ScrText scrText)
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

    private static bool HasFiguresFolder(ScrText scrText)
    {
        try
        {
            string? dir = scrText.Directory;
            return !string.IsNullOrEmpty(dir) && Directory.Exists(Path.Combine(dir, "figures"));
        }
        catch
        {
            return false;
        }
    }

    private static bool IsNoteType(ScrText scrText)
    {
        try
        {
            return scrText.Settings?.TranslationInfo?.Type.IsNoteType() ?? false;
        }
        catch
        {
            return false;
        }
    }

    private static IReadOnlyList<string> ComputeDefaultBookIds(ScrText scrText)
    {
        try
        {
            BookSet? books = scrText.BooksPresentSet;
            if (books == null)
                return Array.Empty<string>();
            var ids = new List<string>();
            foreach (int bookNum in books.SelectedBookNumbers)
            {
                string id = Canon.BookNumberToId(bookNum);
                if (!string.IsNullOrEmpty(id))
                    ids.Add(id);
            }
            return ids;
        }
        catch
        {
            return Array.Empty<string>();
        }
    }

    private void Unsubscribe(Action<IReadOnlyList<BackupableProject>> handler)
    {
        lock (_lock)
        {
            _subscribers.Remove(handler);
        }
    }

    // EXPLANATION:
    // IDisposable returned from Subscribe(). Holds the handler reference + a back-pointer to the
    // service. Dispose() removes the handler from the service's subscriber list. The _disposed
    // flag ensures a double-Dispose is a no-op.
    private sealed class Subscription : IDisposable
    {
        private readonly BackupableProjectsService _owner;
        private readonly Action<IReadOnlyList<BackupableProject>> _handler;
        private bool _disposed;

        public Subscription(
            BackupableProjectsService owner,
            Action<IReadOnlyList<BackupableProject>> handler
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
