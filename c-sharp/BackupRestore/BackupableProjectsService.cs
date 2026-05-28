using Paranext.DataProvider.Projects;

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
    // === STUB ===
    // RED-phase placeholder. CAP-021 Implementer fills in:
    //   * `BackupableProjectsService` ctor stores PapiClient + LocalParatextProjects + event/dataType names
    //   * `GetSnapshot()` returns the cached snapshot (defensive copy or read-only view)
    //   * `Subscribe(handler)` adds to a thread-safe subscriber set; returns an IDisposable that removes
    //   * `NotifyProjectsChanged()` rescans ParatextProjects, applies INV-B01 filter, compares to cached
    //     snapshot, and on real change: caches + fires PapiClient.SendEventAsync + invokes every handler.

    public const string DefaultUpdateEventType =
        "platformBackupRestore.backupRestore-data:onDidUpdate";
    public const string DataTypeName = "BackupableProjects";

    public BackupableProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
    {
        // Suppress unused-parameter warnings on the RED stub; the GREEN implementation
        // captures these into private fields.
        _ = papiClient;
        _ = paratextProjects;
        _ = updateEventType;
    }

    /// <summary>
    /// Returns the current snapshot of backup-eligible projects. Resource projects
    /// (<c>IsProtectedText == true</c>) are filtered per INV-B01.
    /// </summary>
    public IReadOnlyList<BackupableProject> GetSnapshot() =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");

    /// <summary>
    /// Subscribes <paramref name="handler"/> to receive the new snapshot whenever
    /// <see cref="NotifyProjectsChanged"/> detects a change. Subscribing the same handler twice
    /// is a no-op (idempotent — only one entry per handler reference). Returns an
    /// <see cref="IDisposable"/> that removes the subscription; calling <c>Dispose</c> twice is
    /// a no-op.
    /// </summary>
    public IDisposable Subscribe(Action<IReadOnlyList<BackupableProject>> handler) =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");

    /// <summary>
    /// Rescans <see cref="LocalParatextProjects"/>, recomputes the filtered+projected snapshot, and
    /// (only if the snapshot actually changed) updates the cache, fires
    /// <see cref="PapiClient.SendEventAsync"/>, and invokes every currently-subscribed handler.
    /// </summary>
    public void NotifyProjectsChanged() =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");
}
