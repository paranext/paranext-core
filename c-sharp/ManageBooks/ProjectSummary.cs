namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.8
// Maps to: EXT-014 (BHV-411)
//
// STUB — Test Writer RED skeleton for CAP-011.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Minimal project descriptor returned by <c>ProjectFilterService</c>.
/// </summary>
/// <param name="ProjectId">Project identifier (ScrText Guid as a hex string).</param>
/// <param name="Name">Display name of the project.</param>
/// <param name="ProjectType">Project-type string (e.g. "Standard", "BackTranslation", "Daughter").</param>
/// <param name="IsEditable">Whether the project reports itself as editable.</param>
/// <param name="IsResource">
/// Whether the project is a resource (read-only published text). Sourced from
/// PT9 <c>ScrText.IsResourceProject</c>. The Copy "From" / Create "Based on"
/// pickers must exclude resources for copyright reasons; the header picker
/// still includes them (treated like any other read-only project).
/// </param>
public record ProjectSummary(
    string ProjectId,
    string Name,
    string ProjectType,
    bool IsEditable,
    bool IsResource = false
);
