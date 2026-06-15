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
/// <param name="FullName">
/// The project's long human-readable name (the secondary label in the project picker rows, e.g.
/// "English Standard Version 2016"). I2: returned here so the frontend no longer needs a
/// per-project <c>pdp.getSetting('platform.fullName')</c> round-trip. Sourced from the same raw
/// "FullName" parameter that <c>platform.fullName</c> getSetting reads; empty when unset (the
/// frontend falls back to the short <see cref="Name"/>).
/// </param>
/// <param name="Versification">
/// The project's versification as the numeric <c>ScrVersType</c> code in string form (e.g. "4" for
/// English), matching exactly what <c>platformScripture.versification</c> getSetting returns. I2:
/// returned here so the frontend no longer needs a per-project versification round-trip (used for
/// the Create "Based on" picker's versification grouping). Defaults to "4" (English) when unset —
/// matching the platformScripture.versification contribution default the old getSetting path
/// returned, and PT9's absent-versification == English semantics.
/// </param>
public record ProjectSummary(
    string ProjectId,
    string Name,
    string ProjectType,
    bool IsEditable,
    bool IsResource = false,
    string FullName = "",
    string Versification = "4"
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
            IsResource: scrText.IsResourceProject,
            // I2: surface fullName + versification on the list so the frontend drops its
            // per-project pdp.getSetting fan-out (the source of the slow initial load).
            FullName: GetRawSetting(scrText, "FullName", string.Empty),
            // Fallback "4" (English), NOT "0" (Unknown): a project with no stored Versification
            // resolved to the contribution default 4 under the old getSetting path
            // (projectSettings.json → platformScripture.versification default: 4), and PT9's own
            // ScrVers accessor treats absent versification as English. "0" would regress such
            // projects from the English group to the Unknown group in the Create "Based on" picker.
            Versification: GetRawSetting(scrText, "Versification", "4")
        );

    /// <summary>
    /// Read a raw Paratext setting value straight from the settings parameter dictionary — exactly
    /// the source (and behavior) <c>ParatextProjectDataProvider.GetProjectSetting</c> uses for
    /// non-special-cased settings, so the value matches what the corresponding <c>pdp.getSetting</c>
    /// call returned before I2 (the frontend's prior source). Specifically: a present value (even
    /// empty) is returned as-is, and a missing key falls back to <paramref name="fallback"/> — which
    /// the caller sets to the same contribution default the old getSetting path returned via
    /// <c>ProjectSettingsService.GetDefault</c>. Read the dictionary directly (NOT
    /// <c>ProjectSettings.GetSetting</c>, which adds base-text delegation the old path did not do,
    /// and NOT typed accessors like <c>Settings.Versification.Type</c>, which construct a
    /// <c>ScrVers</c> per project) so this stays a cheap, exception-free, parity-faithful lookup.
    /// </summary>
    private static string GetRawSetting(ScrText scrText, string ptSettingName, string fallback) =>
        scrText.Settings.ParametersDictionary.TryGetValue(ptSettingName, out string? value)
            ? value
            : fallback;
}
