namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §5.1 + strategic-plan-backend.md §CAP-008 — the
//   wire-stable request payload for M-007 getBackupableProjects on the
//   `BackupRestoreDataProvider` partial-class facade. Replaces PT9's
//   `BackupForm.cmbProject` inline read from `ScrTextCollection`
//   (`BackupForm.cs:204-208`): PT9 read the backup-eligible project list inline
//   from the in-process `ScrTextCollection`; PT10's React UI lives in a separate
//   process so the list must cross the JSON-RPC boundary.
//
// Selector shape per data-contracts.md §5.1 DT-001:
//   `BackupableProjects` is a subscribable data type with `Selector: undefined`
//   — the provider always returns the full list. There are NO filter fields
//   (unlike CAP-009's `GetRestoreDestinationProjectsRequest`, which carries a
//   `SessionId` + an FN-010 `OnlyAllowNewProjects` re-add stub). The empty
//   record is intentional — it keeps the JSON-RPC envelope shape symmetrical
//   with M-008 / CAP-009 so future selector fields can be added without
//   breaking the wire surface.
//
// Maps to: data-contracts.md §5.1 (DT-001 — selector shape); strategic-plan-backend.md
//   §CAP-008 (M-007 wire shape: `Func<GetBackupableProjectsRequest, Task<List<BackupableProject>>>`).

/// <summary>
/// Request payload for <c>M-007 getBackupableProjects</c>
/// (<see cref="BackupRestoreDataProvider.GetBackupableProjectsAsync"/>).
/// </summary>
/// <remarks>
/// <para>
/// <b>Selector semantics</b> (per data-contracts.md §5.1): DT-001
/// <c>BackupableProjects</c> has no selector — the provider always returns the
/// full list of editable, non-resource projects (BHV-650 / INV-B01). The empty
/// record exists to keep the wire envelope shape symmetrical with M-008
/// (<see cref="GetRestoreDestinationProjectsRequest"/>) and to leave room for
/// future selector fields without breaking the wire surface.
/// </para>
/// </remarks>
internal sealed record GetBackupableProjectsRequest { }
