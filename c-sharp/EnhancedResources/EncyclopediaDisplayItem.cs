namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single row in the Encyclopedia research tab.
/// Contains rendered article HTML, teaser text, scripture references, and image presence.
///
/// Contract: data-contracts.md (EncyclopediaDisplayItem)
/// CAP-010, BHV-414
/// </summary>
public record EncyclopediaDisplayItem(
    string Id,
    string Title,
    string Transliteration,
    string SourceText,
    string TeaserHtml,
    string FullArticleHtml,
    IReadOnlyList<VerseReference> ScriptureReferences,
    bool HasImages,
    bool Expanded
);

/// <summary>
/// Result of loading the Encyclopedia research tab content.
/// Contains the display items and header HTML.
///
/// Contract: data-contracts.md Method 10, CAP-010
/// </summary>
public record EncyclopediaTabContent(
    IReadOnlyList<EncyclopediaDisplayItem> Items,
    string HeaderHtml
);
