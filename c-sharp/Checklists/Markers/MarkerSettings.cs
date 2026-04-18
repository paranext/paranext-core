namespace Paranext.DataProvider.Checklists.Markers;

/// <summary>
/// RED-phase skeleton. See data-contracts.md §2.2.
///
/// Namespace note: this type lives in <c>Paranext.DataProvider.Checklists.Markers</c>
/// (matches directory layout per PNX005). Tests and downstream capabilities reference
/// it via that fully-qualified name.
/// </summary>
public record MarkerSettings(string EquivalentMarkers, string MarkerFilter);
