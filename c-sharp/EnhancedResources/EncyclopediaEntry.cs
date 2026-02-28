namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single encyclopedia entry with formatted paragraphs and associated images.
/// </summary>
public record EncyclopediaEntry(
    string EntryId,
    string Title,
    string FormatVersion,
    string? SectionType,
    IReadOnlyList<EncyclopediaParagraph> Paragraphs,
    string LanguageId,
    IReadOnlyList<string> ImageIds
);
