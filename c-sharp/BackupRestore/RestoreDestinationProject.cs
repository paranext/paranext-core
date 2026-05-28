namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.11 / shared-types.md §3.11 — element type for the
//   `RestoreDestinationProjects` subscribable data type. PT9 read the destination
//   project list directly from `ScrTextCollection` inside `RestoreForm`; PT10
//   surfaces it as a subscribable list on the `BackupRestoreDataProvider` so the
//   React restore dialog can render the destination dropdown via
//   `useData(...).RestoreDestinationProjects(sessionId, ...)`.
//
//   This file is landed by CAP-021 (RestoreDestinationProjectsService) ahead of
//   its nominal owner CAP-009 (record-only). Both capabilities reference the
//   same shared-types.md §3.11 source-of-truth; landing the record here is purely
//   a sequencing convenience and does not change the shape.
// Maps to: shared-types.md §3.11 + data-contracts.md §3.11
// Source:  .context/features/project-backup-and-restore/implementation/shared-types.md
//          .context/features/project-backup-and-restore/data-contracts.md
// Behaviors: BHV-315 (Restore destination selector — consumes this list)
// Invariants: INV-B05 (admin permission surfaced on destination list — CurrentUserIsAdmin
//             field is the carrier; the overlay-restore gate per VAL-B05 / BHV-325 / EXT-203
//             is enforced downstream in RestoreOrchestrator using this flag)

/// <summary>
/// One project eligible as a Restore overlay destination (per <c>data-contracts.md §3.11</c>).
/// Augments the project identity with the admin-permission flag that the UI uses to gate the
/// "Restore over existing project" action.
/// </summary>
/// <remarks>
/// <para>
/// <b>Field semantics</b>:
/// </para>
/// <list type="bullet">
///   <item><c>Id</c> — PT10 project metadata id (HexId form).</item>
///   <item><c>ShortName</c> — PT9 <c>scrText.Name</c>.</item>
///   <item><c>FullName</c> — PT9 <c>scrText.FullName</c>.</item>
///   <item><c>CurrentUserIsAdmin</c> — <c>true</c> when the current user is the project
///     Administrator. Gates overlay-restore per VAL-B05 / BHV-325 / EXT-203. The wire-side
///     restore handler (M-003) re-validates the gate via
///     <see cref="RestorePermissionGate.CheckAdminGate"/> before committing the restore.</item>
/// </list>
/// </remarks>
public sealed record RestoreDestinationProject
{
    public string Id { get; init; } = string.Empty;
    public string ShortName { get; init; } = string.Empty;
    public string FullName { get; init; } = string.Empty;
    public bool CurrentUserIsAdmin { get; init; }
}
