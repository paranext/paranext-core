namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.2
// Maps to: EXT-002 (BHV-402, BHV-407)
//
// STUB — Test Writer RED skeleton for CAP-004.
// LastCreatedBookNum is int? — serializer emits it as undefined / field omission
// when null (matches the TypeScript `lastCreatedBookNum?: number` optional).

/// <summary>
/// Result of a book creation operation. LastCreatedBookNum is the book
/// number of the most recent successful create, used for post-dialog
/// navigation (INV-026 / INV-C13). Null/undefined when nothing was created.
/// </summary>
public record CreateBooksResult(
    bool Success,
    int? LastCreatedBookNum,
    List<string> Warnings,
    List<string> Errors,
    int CreatedCount
);
