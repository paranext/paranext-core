using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SIL.Scripture;

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
// Implementation (CAP-005 GREEN):
//   * The 5-step wire-layer chain documented above.
//   * BookNum derivation: parses the 3-letter book code at chars 2..4 of the
//     entry id (PT9 backup file convention `NNCCCProj.SFM`) via
//     `Canon.BookIdToNumber`. Non-conforming filenames fall back to 0, which
//     CAP-020 already handles defensively (Canon.BookNumberToId(0) == "").
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
        return Task.FromResult(ExecuteCompareBackupFile(request));
    }

    /// <summary>
    /// Synchronous body of <see cref="CompareBackupFileAsync"/>. Mirrors the
    /// CAP-004 <c>ExecutePerformRestore</c> pattern — the public method wraps
    /// the synchronous chain in <c>Task.FromResult</c> so the body can stay
    /// linear and readable.
    /// </summary>
    private CompareBackupFileResult ExecuteCompareBackupFile(CompareBackupFileRequest request)
    {
        // EXPLANATION:
        // 5-step wire-layer chain per data-contracts.md §4.4 error matrix:
        //   (1) session lookup       → InvalidSession
        //   (2) file lookup          → FileNotFound
        //   (3) CANNOT_COMPARE gate  → CannotCompare (DestDoesNotExist OR
        //                              !CanViewDifferences)
        //   (4) Project wire-side RestoreFileEntry → internal RestoreFileInfo
        //   (5) Delegate to CompareToBackupBridgeService.BuildCompareConfig
        //       (CAP-020) and wrap in Success envelope.

        // (1) Session lookup
        RestoreSession? session = SessionRegistry.Get(request.SessionId);
        if (session == null)
        {
            return Error(CompareBackupFileErrorCode.InvalidSession, "%restore_invalidSession%");
        }

        // (2) File lookup
        RestoreFileEntry? entry = session.Metadata.AllFiles.FirstOrDefault(f =>
            f.Id == request.FileId
        );
        if (entry == null)
        {
            return Error(CompareBackupFileErrorCode.FileNotFound, "%restore_fileNotFoundInBackup%");
        }

        // (3) CANNOT_COMPARE gate (BHV-320 + TS-087)
        if (
            entry.ComparisonResult == ComparisonResult.DestDoesNotExist
            || !entry.CanViewDifferences
        )
        {
            return Error(CompareBackupFileErrorCode.CannotCompare, "%restore_cannotCompareFiles%");
        }

        // (4) Project the wire-side RestoreFileEntry → internal RestoreFileInfo.
        //     CAP-020's BuildCompareConfig reads only SourceFile.FileName +
        //     SourceFile.BookNum. DestinationFile is set when the entry has a
        //     destination display name (TS-087 defensive — CAP-020 also handles
        //     null DestinationFile but the entry-side gate in step (3) means
        //     we only reach here when a destination exists).
        int bookNum = DeriveBookNumberFromEntryId(entry.Id);
        var selectedRow = new RestoreFileInfo
        {
            SourceFile = new RestoreZipMember { FileName = entry.Id, BookNum = bookNum },
            DestinationFile =
                entry.DestinationDisplayName != null
                    ? new RestoreZipMember { FileName = entry.Id, BookNum = bookNum }
                    : null,
        };

        // (5) Delegate to CAP-020. Destination ScrText + sourceVersification
        //     are reserved hooks (per CAP-020 source comments + INV-C02 —
        //     FileCompareConfig has no ScrText fields). `null!` for destination
        //     is safe because CAP-020 does not dereference it; ScrVers.English
        //     is sufficient because the output primitives (InitialBookId,
        //     InitialChapter=1, InitialVerse=0) do not depend on versification.
        FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
            selectedRow,
            destination: null!,
            sourceVersification: ScrVers.English,
            sessionId: request.SessionId
        );

        return new CompareBackupFileResult.Success(config);
    }

    /// <summary>
    /// Build a <see cref="CompareBackupFileResult.Error"/> envelope for an
    /// <see cref="ExecuteCompareBackupFile"/> failure. Centralizes the
    /// wire-stable shape (data-contracts.md §3.8) so the three error sites in
    /// the 5-step wire chain (steps 1, 2, 3 — InvalidSession / FileNotFound /
    /// CannotCompare) stay uniform. Mirrors the <c>Error</c> helper in
    /// <see cref="BackupRestoreDataProvider"/>'s sibling
    /// <c>BackupRestoreDataProvider.PerformRestore.cs</c> partial fragment
    /// (CAP-004) and the <c>OpenError</c> helper in
    /// <c>BackupRestoreDataProvider.RestoreSession.cs</c> (CAP-003).
    /// </summary>
    private static CompareBackupFileResult.Error Error(
        CompareBackupFileErrorCode code,
        string localizationKey
    )
    {
        return new CompareBackupFileResult.Error(code, localizationKey);
    }

    /// <summary>
    /// Derive the ParatextData book number from a wire-side
    /// <see cref="RestoreFileEntry.Id"/>. Parses the 3-letter book code at
    /// characters 2..4 of the id (PT9 backup file convention
    /// <c>NNCCCProj.SFM</c>, e.g., "01GENGmCmpProj.SFM" → "GEN" → 1) via
    /// <see cref="Canon.BookIdToNumber"/>. Returns <c>0</c> for ids that do
    /// not match the convention (e.g., "Settings.xml") — CAP-020 handles 0
    /// defensively (<c>Canon.BookNumberToId(0) == ""</c>).
    /// </summary>
    private static int DeriveBookNumberFromEntryId(string entryId)
    {
        // EXPLANATION:
        // PT9 backup filename convention: NNCCCProj.SFM where NN is the
        // 2-digit book number (01..99) and CCC is the 3-letter ParatextData
        // book code. Examples: "01GENGmCmpProj.SFM" (GEN=1),
        // "40MATMultiProj.SFM" (MAT=40). Parse the 3-letter code rather than
        // the leading digits to leverage Canon.BookIdToNumber's validation —
        // unknown codes return 0, which CAP-020 handles by producing an empty
        // InitialBookId.
        //
        // For ids shorter than 5 chars (e.g., "Settings.xml" is too short for
        // the NNCCC prefix), short-circuit to 0. The CANNOT_COMPARE gate in
        // step (3) usually rejects non-book entries upstream (they have
        // CanViewDifferences=false), so this defensive path mainly serves
        // FilesAreSame/SourceIsNewer rows whose source file IS a book.
        if (entryId.Length < 5)
            return 0;
        string code = entryId.Substring(2, 3).ToUpperInvariant();
        return Canon.BookIdToNumber(code);
    }
}
