namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.6
// Maps to: EXT-007 (BHV-313)
//
// STUB — Test Writer RED skeleton for CAP-006.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Input for <c>ManageBooksService.GetBookComparisonAsync</c> — identifies the
/// source ("from") and destination ("to") projects whose books should be
/// compared. Both ids must be valid and distinct (Section 4.7 preconditions).
/// </summary>
public record BookComparisonInput(string FromProjectId, string ToProjectId);
