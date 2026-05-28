using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: PT9 read the restore-destination project list inline inside `RestoreForm` from
//   `ScrTextCollection`; PT10 owns it as a standalone service so the
//   `BackupRestoreDataProvider` can expose it as a subscribable data type
//   (`RestoreDestinationProjects` per data-contracts.md §5.2).
// Maps to: data-contracts.md §3.11 (element type) + §5.2 (subscription)
// Source:  c-sharp/BackupRestore/RestoreDestinationProject.cs (record)
//          .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-021
//          .context/features/project-backup-and-restore/implementation/backend-alignment.md (line 105)
// Behaviors: BHV-651 (Main-menu Restore entry — consumes this list via RestoreForm)
// Invariants: INV-B05 (admin permission surfaced on destination list)

/// <summary>
/// Internal collaborator of the future <c>BackupRestoreDataProvider</c>. Maintains a snapshot of
/// projects eligible as a restore overlay destination and an in-process subscriber set so callers
/// can react to changes. Notifies subscribers — both the in-process delegates AND the network via
/// <see cref="PapiClient.SendEventAsync"/> — whenever <see cref="NotifyProjectsChanged"/> is called
/// and the recomputed snapshot differs from the previous one.
/// </summary>
/// <remarks>
/// <para>
/// <b>Invariant INV-B05</b>: Each <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/> flag
/// is populated from <c>scrText.Permissions.AmAdministrator</c>. This is the CARRIER of the
/// admin-permission gate; the actual overlay-restore enforcement happens downstream in
/// <see cref="RestorePermissionGate.CheckAdminGate"/> (CAP-019) when M-003 commits the restore. A
/// destination project where <c>CurrentUserIsAdmin == false</c> will be rendered in the UI dropdown
/// (so the user knows it exists) but selecting it will lead to a <c>PERMISSION_DENIED</c> envelope
/// at restore time. See VAL-B05 / BHV-325 / EXT-203.
/// </para>
///
/// <para>
/// <b>Trigger conditions</b> (per <c>data-contracts.md §5.2</c>): a re-emission happens when a
/// project is created/deleted/renamed OR a user's admin permission on any project changes (so the
/// <c>CurrentUserIsAdmin</c> flag would flip).
/// </para>
///
/// <para>
/// <b>Event emission shape</b>: the service emits
/// <c>PapiClient.SendEventAsync(updateEventType, [dataTypeName])</c> where
/// <c>updateEventType</c> defaults to <c>"platformBackupRestore.backupRestore-data:onDidUpdate"</c>
/// and <c>dataTypeName</c> is <c>"RestoreDestinationProjects"</c>.
/// </para>
/// </remarks>
internal sealed class RestoreDestinationProjectsService
{
    // === STUB ===
    // RED-phase placeholder. CAP-021 Implementer fills in:
    //   * `RestoreDestinationProjectsService` ctor stores PapiClient + LocalParatextProjects + event/dataType names
    //   * `GetSnapshot()` returns the cached snapshot
    //   * `Subscribe(handler)` adds to a thread-safe subscriber set; returns an IDisposable that removes
    //   * `NotifyProjectsChanged()` rescans ParatextProjects, populates CurrentUserIsAdmin from
    //     Permissions.AmAdministrator, compares to cached snapshot, and on real change: caches +
    //     fires PapiClient.SendEventAsync + invokes every handler.

    public const string DefaultUpdateEventType =
        "platformBackupRestore.backupRestore-data:onDidUpdate";
    public const string DataTypeName = "RestoreDestinationProjects";

    public RestoreDestinationProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
    {
        _ = papiClient;
        _ = paratextProjects;
        _ = updateEventType;
    }

    /// <summary>
    /// Returns the current snapshot of projects eligible as a restore overlay destination. Each
    /// entry's <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/> reflects the current
    /// user's permission at the time of the last <see cref="NotifyProjectsChanged"/> call.
    /// </summary>
    public IReadOnlyList<RestoreDestinationProject> GetSnapshot() =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");

    /// <summary>
    /// Subscribes <paramref name="handler"/> to receive the new snapshot whenever
    /// <see cref="NotifyProjectsChanged"/> detects a change. Same idempotence + disposal semantics
    /// as <see cref="BackupableProjectsService.Subscribe"/>.
    /// </summary>
    public IDisposable Subscribe(Action<IReadOnlyList<RestoreDestinationProject>> handler) =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");

    /// <summary>
    /// Rescans <see cref="LocalParatextProjects"/>, recomputes the projected snapshot (including
    /// <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/>), and (only if the snapshot
    /// actually changed) updates the cache, fires <see cref="PapiClient.SendEventAsync"/>, and
    /// invokes every currently-subscribed handler.
    /// </summary>
    public void NotifyProjectsChanged() =>
        throw new NotImplementedException("CAP-021 GREEN-phase implementation pending");
}
