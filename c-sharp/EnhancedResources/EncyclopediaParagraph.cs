namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A formatted paragraph within an encyclopedia entry, containing HTML,
/// raw text, and structured inline elements.
/// </summary>
public record EncyclopediaParagraph(
    string Html,
    string Text,
    IReadOnlyList<InlineElement> InlineElements
);
