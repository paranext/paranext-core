using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists.Markers;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/MarkerSettingsForm.btnOk_Click validation path
// Method: MarkerSettingsValidationResult (structured return of the pre-commit
// validation that PT9 surfaces inline on the form)
// Maps to: EXT-019, data-contracts.md §3.13
/// <summary>
/// Validation result returned by <c>ValidateMarkerSettings</c>. Carries either the
/// parsed marker pairs (valid case) or an error message (invalid case). See
/// data-contracts.md §3.13.
/// </summary>
[method: JsonConstructor]
public record MarkerSettingsValidationResult(
    bool Valid,
    IReadOnlyList<MarkerPair>? ParsedPairs,
    string? ErrorMessage
);
