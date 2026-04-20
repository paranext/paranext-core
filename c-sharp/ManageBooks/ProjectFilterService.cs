namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: ParatextBase/ScrTextComboxBox.cs:15-167 (PT9)
// Maps to: EXT-014 — ScrTextComboBox project filtering predicates
// Contract: .context/features/manage-books/data-contracts.md Section 4.13
// Behaviors: BHV-411
//
// STUB — Test Writer RED skeleton for CAP-011. This file intentionally
// throws NotImplementedException so that all CAP-011 tests fail at RED.
// The implementer will replace the method body using the strategic plan:
//
//   AllScripture    -> all scripture projects
//   EditableTexts   -> scripture projects with IsEditable = true
//   ModelProject    -> all scripture projects (read-only sufficient)
//   DeleteSource    -> editable scripture projects
//   CopyDestination -> delegates to CAP-008 GetToProjectFilter (requires SourceProjectType)
//
// Unknown / out-of-range purpose -> INVALID_ARGUMENT via PlatformErrorCodes.WithCode.

/// <summary>
/// Stateless filter service that returns project subsets keyed by
/// <see cref="ProjectFilterPurpose"/>. Used by Create Books / Copy Books /
/// Delete Books / general "choose a project" dropdowns. Read-only — no
/// mutations, no events.
/// </summary>
public static class ProjectFilterService
{
    /// <summary>
    /// Returns the projects matching the filter described by
    /// <paramref name="input"/>. Stub — throws <see cref="NotImplementedException"/>
    /// until CAP-011 is GREEN.
    /// </summary>
    public static ProjectListResult FilterProjects(ProjectFilterInput input)
    {
        throw new NotImplementedException(
            "CAP-011 ProjectFilterService.FilterProjects is a RED stub — to be implemented in BE-1."
        );
    }
}
