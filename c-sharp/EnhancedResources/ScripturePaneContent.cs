namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Rendered HTML content for the scripture pane, including footnotes and
/// CSS classes for highlight toggles.
///
/// Contract: Section 3.10 ScripturePaneContent (data-contracts.md)
/// Behaviors: BHV-404 (highlight CSS), BHV-609 (footnote rendering),
///            BHV-417 (verse navigation IDs)
/// Golden Masters: GM-014, GM-025, GM-034
/// </summary>
public record ScripturePaneContent(
    bool Success,
    string? ScriptureHtml,
    string? FootnotesHtml,
    bool? HasFootnotes,
    IReadOnlyList<string>? HighlightCssClasses,
    ErrorInfo? Error
);
