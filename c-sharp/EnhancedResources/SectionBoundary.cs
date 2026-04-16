namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Section boundary indices in the token stream, detected from ParagraphStart markers.
/// Source: EXT-006
/// STUB: Created by tdd-test-writer for CAP-003. Will be implemented by tdd-implementer.
/// </summary>
public record SectionBoundary(int StartIndex, int EndIndex);
