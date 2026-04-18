using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists.Markers;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists marker-equivalence parsing (tuples emitted by the
// MarkerSettingsForm validation logic)
// Method: MarkerPair (tuple of two marker names)
// Maps to: EXT-010 (data models), data-contracts.md §3.14
/// <summary>
/// Parsed pair of equivalent paragraph markers (e.g., <c>"p"</c> ↔ <c>"q"</c>).
/// Emitted by <c>ValidateMarkerSettings</c>. See data-contracts.md §3.14.
/// </summary>
[method: JsonConstructor]
public record MarkerPair(string Marker1, string Marker2);
