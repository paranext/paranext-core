namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Identifies a specific verse location for navigation and scope filtering.
/// Book is 1-based (1=GEN, 66=REV), Chapter and Verse are 1-based.
/// </summary>
public record VerseReference(
    int Book, // 1-based book number (1=GEN, 66=REV)
    int Chapter, // 1-based chapter number
    int Verse // 1-based verse number
);
