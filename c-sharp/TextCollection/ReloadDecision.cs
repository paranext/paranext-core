namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Single-pane reload decision (EXT-008).
/// Indicates whether a full reload is needed and what zoom level to apply.
/// </summary>
public record ReloadDecision(bool FullReloadNeeded, double ZoomToApply);
