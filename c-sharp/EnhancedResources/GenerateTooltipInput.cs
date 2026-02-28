namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for generating HTML tooltip text for a linked word, combining
/// gloss, POS, and rendering status information.
///
/// Contract: Section 4.13 GenerateTooltip (data-contracts.md)
/// Extraction: EXT-025 (Tooltip Generation for Scripture Words)
/// </summary>
public record GenerateTooltipInput(
    /// <summary>The lexical link to generate a tooltip for.</summary>
    LexicalLink Link,
    /// <summary>Rendering status code from term rendering analysis.</summary>
    TermRenderingStatusCode RenderingStatus,
    /// <summary>Language ID for gloss localization.</summary>
    string GlossLanguageId,
    /// <summary>Book number for testament determination and dictionary routing.</summary>
    int BookNumber,
    /// <summary>Resource identifier.</summary>
    string ResourceId
);
