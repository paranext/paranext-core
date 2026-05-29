using System;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-005 partial-class fragment for M-004 compareBackupFile (per
//   data-contracts.md §4.4 + strategic-plan-backend.md §CAP-005). This file
//   SUPPLIES the CompareBackupFileAsync method onto the
//   `BackupRestoreDataProvider` partial-class declared in
//   BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors the CAP-002 / CAP-003 / CAP-009 / CAP-011 file-split convention: each
// capability owns its own partial-class fragment (one method per file) to avoid
// edit-collision with parallel agents.
//
// Wire-layer responsibilities (per data-contracts.md §4.4):
//   (1) Session lookup — SessionRegistry.Get(request.SessionId) → null →
//       Error(InvalidSession, "%restore_invalidSession%").
//   (2) File lookup — find the row in session.Metadata.AllFiles whose Id ==
//       request.FileId. Null → Error(FileNotFound,
//       "%restore_fileNotFoundInBackup%").
//   (3) CANNOT_COMPARE gate — if the row's ComparisonResult ==
//       DestDoesNotExist OR CanViewDifferences == false → Error(CannotCompare,
//       "%restore_cannotCompareFiles%"). Per data-contracts.md §2.4
//       validation rule + BHV-320 (PT9 UI gates the entry point; CAP-005 is
//       the C# half of the same gate).
//   (4) Build FileCompareConfig — delegate to
//       CompareToBackupBridgeService.BuildCompareConfig (CAP-020 DONE). The
//       wire layer projects the wire-side RestoreFileEntry back to an internal
//       RestoreFileInfo + RestoreZipMember (CAP-020 reads only
//       SourceFile.FileName + SourceFile.BookNum) and passes the sessionId
//       through so the tokens embed the session scope.
//   (5) Return Success(config).
//
// PT9 anchors:
//   * Paratext/BackupRestore/RestoreForm.cs:241-276 dgvFiles_CellMouseDown
//     (right-click handler — the UI half of BHV-320). PT10 splits the gate
//     across two layers: the React component renders the menu item (UI-only
//     suffix per TS-086) and the C# wire layer rejects DestDoesNotExist via
//     CANNOT_COMPARE (TS-087).
//   * Paratext/BackupRestore/RestoreForm.cs:680-694 CompareFiles — the body
//     that builds DiffToolConfigurationInfo and shows DifferencesToolForm.
//     PT10 keeps the "build the diff config" half here (delegated to
//     CompareToBackupBridgeService) and ships the "show the diff" half as a
//     React component (DifferencesToolView, Phase 3 / Decision 23).
//   * Paratext/ToolsMenu/DiffToolConfigurationInfo.cs:161-181 ForGetPutTexts —
//     the FN-001 cross-feature factory CAP-020's BuildCompareConfig replaces.
//
// Implementation (CAP-005 RED → GREEN later):
//   * RED-state body: throw NotImplementedException("CAP-005 RED").
//   * GREEN-state body: the 5-step wire-layer chain documented above.
//
// Maps to: data-contracts.md §4.4 (M-004 compareBackupFile);
//   strategic-plan-backend.md §CAP-005.
// Behaviors: BHV-320 (entry point), BHV-500 (FN-001 read-only diff;
//   structurally enforced by FileCompareConfig having no putters),
//   BHV-501 (single-anchor invariant NOT replicated; structurally enforced by
//   FileCompareConfig having no ScrText fields), BHV-502
//   (DiffToolDisplayOptions enum — Restore emits ShowToolbar).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Wire entry point for M-004 compareBackupFile (data-contracts.md §4.4).
    /// Looks up the session in <see cref="SessionRegistry"/>, finds the file
    /// row in <see cref="RestorerMetadata.AllFiles"/>, applies the BHV-320
    /// CANNOT_COMPARE gate (DestDoesNotExist or !CanViewDifferences), and
    /// delegates to
    /// <see cref="CompareToBackupBridgeService.BuildCompareConfig"/> (CAP-020)
    /// to build the resulting <see cref="FileCompareConfig"/>. On any wire-
    /// layer failure returns the corresponding
    /// <see cref="CompareBackupFileResult.Error"/> envelope — no exceptions
    /// cross the wire boundary per data-contracts.md §3.8 / §4.4.
    /// </summary>
    /// <param name="request">Compare-file request payload. See
    /// <see cref="CompareBackupFileRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — compare is synchronous and short.
    /// Reserved for future asynchronicity (e.g., streaming large file open).</param>
    /// <returns>One of
    /// <see cref="CompareBackupFileResult.Success"/> (config returned) or
    /// <see cref="CompareBackupFileResult.Error"/> (wire-layer failure
    /// envelope).</returns>
    public Task<CompareBackupFileResult> CompareBackupFileAsync(
        CompareBackupFileRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = cancellationToken;
        _ = request;
        // RED-state stub — CAP-005 implementer replaces with the 5-step
        // wire-layer chain documented in the file header.
        throw new NotImplementedException("CAP-005 RED");
    }
}
