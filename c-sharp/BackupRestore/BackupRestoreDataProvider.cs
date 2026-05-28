using System;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: backend-alignment.md §JSON-RPC Wire Contract — the single
//   `BackupRestoreDataProvider` wire facade hosting all 8 imperative methods (M-001..M-011)
//   plus the 3 subscribable data types (DT-001..DT-003). Replaces PT9's in-process
//   `BackupForm.cmdOK_Click` → `Backup.BackupScrText` direct call. PT9 had NO wire surface
//   for backup/restore because the operations ran inline in the WinForms dialog code-behind;
//   PT10's React UI lives in a separate process so all backup/restore actions must cross
//   the JSON-RPC boundary through this DataProvider.
//
// Class organization (split across CAP-001 / CAP-002 / CAP-003 etc.):
//   * This file (CAP-002) — declares the class as `partial` and lands the FIRST method
//     (`CreateBackupAsync` / M-001).
//   * CAP-001 (BE-7) — will land a sibling `BackupRestoreDataProvider.Facade.cs` (or
//     similar) supplying the `: NetworkObjects.DataProvider(...)` base, the `GetFunctions()`
//     override, and the ctor accepting `PapiClient` + `LocalParatextProjects` + collaborator
//     services.
//   * CAP-003..CAP-011 — each lands its M-### method here as additional `partial` fragments.
//   * CAP-007/008/009 (DT-001..DT-003) — each lands its `Get<DataTypeName>` handler likewise.
//
// The class is declared `internal sealed partial class` (not yet inheriting
// `NetworkObjects.DataProvider`) so CAP-002 can land + test the M-001 wire method without
// taking on the full DataProvider scaffolding. CAP-001 in BE-7 supplies the base class +
// ctor signature. Until CAP-001 lands, callers (and tests) instantiate the class via its
// parameterless ctor.
//
// Maps to: backend-alignment.md §JSON-RPC Wire Contract M-001; data-contracts.md §4.1
//          (M-001 createBackup); strategic-plan-backend.md §CAP-002.
// PT9 anchor: none (NEW IN PT10 — PT9 BackupForm.cmdOK_Click calls Backup.BackupScrText
//   inline; the wire boundary is the PT10-only delta).

/// <summary>
/// The Backup/Restore wire facade: a single DataProvider hosting M-001 createBackup
/// (this file), M-002..M-011 (sibling capabilities), and three subscribable data types
/// (DT-001 BackupableProjects, DT-002 RestoreDestinationProjects, DT-003 BackupLogInfo).
/// </summary>
/// <remarks>
/// <para>
/// CAP-002 partial fragment: lands <see cref="CreateBackupAsync"/> (M-001) only. CAP-001
/// (BE-7) will land the DataProvider base class registration + ctor. CAP-003..CAP-011 will
/// land their respective methods as additional partial fragments.
/// </para>
/// </remarks>
internal sealed partial class BackupRestoreDataProvider
{
    // === CAP-002 RED-STATE STUB ===
    //
    // The wire layer for M-001 createBackup performs four steps:
    //   1. Resolve `request.ProjectId` to a `ScrText` via
    //      `LocalParatextProjects.GetParatextProject`. Failure (unknown / malformed id)
    //      returns `Error(InvalidProject, %backup_invalidProject%)`.
    //   2. Run wire-layer guards (resource project, userName non-empty,
    //      selectedBookIds non-empty unless Notes-type) — failures return the
    //      corresponding `BackupErrorCode` envelope per data-contracts.md §4.1.
    //   3. Convert request inputs to `BackupOrchestrator.ExecuteBackup` arguments:
    //      `selectedBookIds: string[]` → `BookSet` (via `Canon.BookIdToNumber`);
    //      `null` selectedBookIds → project's full `BooksPresentSet`.
    //   4. Delegate to `BackupOrchestrator.ExecuteBackup(...)` and return its
    //      `BackupResult` envelope as-is.
    //
    // Implementation note for the Implementer (CAP-002 implementer plan):
    // `BackupOrchestrator.ExecuteBackup` is synchronous; wrap the call in
    // `Task.FromResult(...)` to satisfy the `Task<BackupResult>` wire contract. The
    // method does I/O (file write + ZIP creation) but the orchestrator already runs
    // synchronously — the M-001 timeout per backend-alignment.md §Additional Patterns
    // is ≥120s, accommodating large projects.
    //
    // The stub returns `NotImplementedException` so RED-state tests fail predictably.

    /// <summary>
    /// Wire entry point for M-001 createBackup (data-contracts.md §4.1). Resolves the
    /// project, validates wire-layer preconditions, and delegates to
    /// <see cref="BackupOrchestrator.ExecuteBackup"/> for the actual ZIP-creation pipeline.
    /// </summary>
    /// <param name="request">Backup request payload. See <see cref="BackupRequest"/>.</param>
    /// <param name="cancellationToken">
    /// Cancellation token from the JSON-RPC dispatcher. Currently unused at the wire layer
    /// — the orchestrator pipeline is synchronous. Reserved for future asynchronicity.
    /// </param>
    /// <returns>
    /// One of <see cref="BackupResult.Success"/>, <see cref="BackupResult.OverwriteRequired"/>,
    /// or <see cref="BackupResult.Error"/>. Errors are returned in the envelope (NOT thrown)
    /// per the wire contract — see data-contracts.md §3.1.
    /// </returns>
    public Task<BackupResult> CreateBackupAsync(
        BackupRequest request,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException(
            "CAP-002 RED-state stub. The Implementer will fill this in to satisfy the wire-layer tests."
        );
    }
}
