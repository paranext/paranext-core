namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Token types produced by the USX/Emdros XML parser.
/// Maps to PT9 MarbleTokenType with PT10 renames:
///   PT9 PlainText -> PT10 Text
///   PT9 Reference -> PT10 CrossRef
///   PT10 adds SectionHead (new)
/// </summary>
public enum MarbleTokenType
{
    Book,
    Chapter,
    ParagraphStart,
    ParagraphEnd,
    CharacterStart,
    CharacterEnd,
    Note,
    TextLink,
    Verse,
    SectionHead,
    Text,
    CrossRef,
}

/// <summary>
/// Represents a parsed token from the USX/Emdros-format Enhanced Resource text.
/// This is the core data unit for all research pane operations.
/// TextLink tokens carry all link attributes; other types have null for link fields.
/// </summary>
/// <remarks>
/// Ported from PT9: Paratext/Marble/MarbleDataParser.cs (MarbleToken class)
/// EXT-055, CAP-002, BHV-600
/// </remarks>
public record MarbleToken(
    MarbleTokenType Type,
    string? Text,
    string? Style,
    VerseReference? VerseRef,
    // TextLink-specific attributes (only present when Type == TextLink)
    string? TargetLinks = null,
    string? Strong = null,
    string? LexicalLinks = null,
    string? ThematicLinks = null,
    string? TextualLinks = null,
    string? ImageLinks = null,
    string? MapLinks = null
);
