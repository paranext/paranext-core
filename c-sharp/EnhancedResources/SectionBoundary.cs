namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Section boundary indices in the token stream, detected from ParagraphStart markers.
/// Source: EXT-006
/// </summary>
public record SectionBoundary(int StartIndex, int EndIndex);
