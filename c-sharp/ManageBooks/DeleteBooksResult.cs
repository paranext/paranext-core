namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.3
// Maps to: EXT-005 (BHV-100, BHV-404)
//
// STUB — Test Writer RED skeleton for CAP-005.

/// <summary>
/// Result of a book deletion operation. Synchronous — the UI handles
/// confirmation client-side before calling the API.
/// </summary>
public record DeleteBooksResult(
    bool Success,
    int DeletedCount,
    List<string> Warnings,
    List<string> Errors
);
