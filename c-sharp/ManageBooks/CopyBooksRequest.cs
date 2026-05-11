namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.4
// Maps to: EXT-006 (BHV-313, BHV-600, BHV-601, BHV-403)
//
// STUB — Test Writer RED skeleton for CAP-007.
// Wire-boundary record for ManageBooksService.CopyBooksAsync.
// Matches the TypeScript CopyBooksInput interface; naming follows
// the PT10 wire convention (see backend-alignment.md "Request/response
// record files — one per record (Theme 2, strict PNX004)").

/// <summary>
/// Input for copying books between projects. See data-contracts.md
/// Section 2.4 for the formal contract.
/// </summary>
/// <param name="FromProjectId">Source project id.</param>
/// <param name="ToProjectId">Destination project id.</param>
/// <param name="BookNumbers">1-based canonical book numbers to copy.</param>
/// <param name="ReplaceEntireBook">
/// Sebastian review item #15 (2026-05-11): when true (default), each book is
/// written via <c>PutText(bookNum, 0, ...)</c> — destination is fully replaced.
/// When false, the orchestrator uses the chapter-merge path (port of PT9
/// <c>ImportSfmText.WriteChaptersToBook</c>): source chapters overwrite their
/// dest counterparts; dest chapters not in source survive. Optional + defaults
/// to true so the existing wire-shape contract stays backwards-compatible.
/// </param>
public record CopyBooksRequest(
    string FromProjectId,
    string ToProjectId,
    int[] BookNumbers,
    bool ReplaceEntireBook = true
);
