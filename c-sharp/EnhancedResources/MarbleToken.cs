namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured token from Marble XML parsing.
/// Source: EXT-016, BHV-600
/// </summary>
public record MarbleToken(
    MarbleTokenType Type,
    string Text,
    int Index,
    SIL.Scripture.VerseRef? VerseRef = null,
    string? StrongNumber = null,
    IList<string>? TargetLinks = null,
    IList<string>? ThematicLinks = null,
    IList<string>? LexicalLinks = null,
    IList<string>? ImageLinks = null,
    IList<string>? MapLinks = null,
    string? Style = null
);
