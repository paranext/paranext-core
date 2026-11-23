namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.8
// Maps to: EXT-014 (BHV-411)
//
// STUB — Test Writer RED skeleton for CAP-011.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Result of <c>ProjectFilterService.FilterProjects</c> /
/// <c>ManageBooksService.FilterProjectsAsync</c>: the matching projects in the
/// order they were enumerated from <c>ScrTextCollection</c>.
/// </summary>
public record ProjectListResult(List<ProjectSummary> Projects);
