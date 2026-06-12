using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.8
// Maps to: EXT-014 (BHV-411)

/// <summary>
/// Minimal project descriptor returned by <c>ProjectFilterService</c>.
/// </summary>
/// <param name="ProjectId">Project identifier (ScrText Guid as a hex string).</param>
/// <param name="Name">Display name of the project.</param>
/// <param name="ProjectType">Project-type string (e.g. "Standard", "BackTranslation", "Daughter").</param>
/// <param name="IsEditable">Whether the project reports itself as editable.</param>
/// <param name="IsResource">
/// Whether the project is a resource (read-only published text). Sourced from
/// PT9 <c>ScrText.IsResourceProject</c>. The Copy "From" picker must exclude
/// resources for licensing reasons (no text may be copied out of a resource);
/// the Create "Based on" picker includes them (structure-only read, PT9
/// parity), and the header picker includes them too (treated like any other
/// read-only project).
/// </param>
public record ProjectSummary(
    string ProjectId,
    string Name,
    string ProjectType,
    bool IsEditable,
    bool IsResource = false
)
{
    /// <summary>
    /// Whether the project can be a target of mutating actions (create/copy/import/delete).
    /// PT9 parity: <c>ProjectSettings.Editable</c> — NOT the raw <c>IsEditableText</c> flag,
    /// whose own doc warns it "does not determine if the project is ultimately editable" —
    /// is the canonical check; <c>ResourceScrText</c> overrides it to false even when the
    /// flag inside an installed DBL resource is "T" (e.g. NBV21). The explicit
    /// <c>!IsResourceProject</c> term restates that production guarantee so the contract
    /// stays enforced for ScrText test doubles, whose plain <c>ProjectSettings</c> cannot
    /// reproduce the resource override.
    /// </summary>
    public static bool IsEditableTarget(ScrText scrText) =>
        scrText.Settings.Editable && !scrText.IsResourceProject;

    /// <summary>
    /// The single production projection from <see cref="ScrText"/> to the Section 3.8 wire
    /// shape, shared by CAP-011 (<c>ProjectFilterService</c>) and CAP-008
    /// (<c>CopyBooksOrchestrator</c>) so id-format or editability fixes cannot silently land
    /// in only one capability (which is exactly what happened to two fixes before this
    /// factory existed).
    /// </summary>
    public static ProjectSummary FromScrText(ScrText scrText) =>
        new(
            // Canonical papi project-id form is UPPERCASE hex (ProjectMetadata.Id
            // applies ToUpperInvariant); the UI compares these against papi-supplied
            // ids (e.g. the scripture editor's webview projectId) case-sensitively.
            ProjectId: scrText.Guid.ToString().ToUpperInvariant(),
            Name: scrText.Name,
            ProjectType: scrText.Settings.TranslationInfo.Type.InternalValue,
            IsEditable: IsEditableTarget(scrText),
            // Plumb IsResourceProject through the wire so the Copy "From" /
            // Create "Based on" pickers can filter resources out on the
            // frontend without a separate API call.
            IsResource: scrText.IsResourceProject
        );
}
