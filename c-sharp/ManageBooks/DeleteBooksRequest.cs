namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.3
// Maps to: EXT-005 (BHV-100, BHV-310, BHV-312, BHV-404)
//
// STUB — Test Writer RED skeleton for CAP-005.
// Record types carry no runtime logic; implementer may keep them as-is.

/// <summary>
/// Input for the book deletion operation. The UI handles confirmation
/// client-side before calling the API.
/// </summary>
public record DeleteBooksRequest(string ProjectId, int[] BookNumbers);
