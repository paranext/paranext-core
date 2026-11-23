using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists.Markers;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/MarkerSettingsForm (equivalentMarkers and
// markerFilter form fields)
// Method: MarkerSettings (DTO carrying the two PT9 form values)
// Maps to: EXT-010 (data models), data-contracts.md §2.2
/// <summary>
/// Marker-settings DTO for the Markers checklist. <c>EquivalentMarkers</c> is the
/// bidirectional-mapping string (e.g., <c>"p/q q1/q2"</c>); <c>MarkerFilter</c> is
/// the space-separated list of paragraph markers to include (empty = all paragraph
/// markers per VAL-006). See data-contracts.md §2.2.
/// </summary>
[method: JsonConstructor]
public record MarkerSettings(string EquivalentMarkers, string MarkerFilter);
