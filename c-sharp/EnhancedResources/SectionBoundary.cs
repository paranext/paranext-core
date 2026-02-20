namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Defines a section boundary range for section-scope filtering.
/// Sections are delineated by ParagraphStart tokens whose style starts with "s" (INV-011).
/// </summary>
/// <remarks>
/// Maps to: EXT-053, CAP-004, INV-011
/// </remarks>
public record SectionBoundary(VerseReference StartVerse, VerseReference EndVerse, int SectionIndex);
