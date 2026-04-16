namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for structured tooltip data lookup. Identifies a token in parsed
/// chapter data and specifies the preferred gloss language.
/// Source: Section 4.14 M-014, EXT-002
/// </summary>
public record TooltipInput(string TokenId, string ResourceId, string GlossLanguage);
