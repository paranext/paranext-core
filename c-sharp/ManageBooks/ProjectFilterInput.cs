namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.8
// Maps to: EXT-014 (BHV-411)
//
// STUB — Test Writer RED skeleton for CAP-011.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Input for <c>ProjectFilterService.FilterProjects</c> /
/// <c>ManageBooksService.FilterProjectsAsync</c>. Tags the request with a
/// <see cref="ProjectFilterPurpose"/> and optional source-project-type for
/// <c>CopyDestination</c> dispatch.
/// </summary>
public record ProjectFilterInput(ProjectFilterPurpose Purpose, string? SourceProjectType);
