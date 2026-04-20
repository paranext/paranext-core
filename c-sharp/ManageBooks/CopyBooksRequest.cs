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
public record CopyBooksRequest(string FromProjectId, string ToProjectId, int[] BookNumbers);
