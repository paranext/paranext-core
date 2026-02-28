namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Toggle state for the three highlight buttons (Research Terms, Found, Missing).
///
/// Contract: Section 2.11 MementoInput (data-contracts.md)
/// Behavior: BHV-404 (Highlight Button Toggle State Machine)
/// </summary>
public record HighlightFlags(bool ResearchTerms, bool Found, bool Missing);
