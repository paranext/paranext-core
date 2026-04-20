namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.4
// Maps to: EXT-006 (BHV-403, BHV-600, BHV-601)
//
// STUB — Test Writer RED skeleton for CAP-007.
// Wire-boundary result record for ManageBooksService.CopyBooksAsync.

/// <summary>
/// Result of a book copy operation. See data-contracts.md Section 3.4
/// for the formal contract. <c>LastCopiedBookNum</c> is the highest
/// canonical book number that was successfully copied (INV-C13); it is
/// omitted (null) when no book was copied.
/// </summary>
public record CopyBooksResult(
    bool Success,
    int? LastCopiedBookNum,
    List<string> Warnings,
    List<string> Errors,
    int CopiedCount
);
