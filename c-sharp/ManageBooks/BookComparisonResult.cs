namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.5
// Maps to: EXT-007 (BHV-313)
//
// STUB — Test Writer RED skeleton for CAP-006.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Result of <c>ManageBooksService.GetBookComparisonAsync</c> — the full set of
/// <see cref="BookComparisonEntry"/> records, one per book enumerable in the
/// destination project that the user has permission to see/edit (per BHV-313 /
/// BHV-103 enumeration rules; see EXT-007 for the canonical iteration pattern).
/// </summary>
public record BookComparisonResult(List<BookComparisonEntry> Entries);
