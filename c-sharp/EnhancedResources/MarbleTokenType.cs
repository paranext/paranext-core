namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Discriminator for tokens in the parsed USX token stream.
/// Contract: Section 3.2 MarbleToken (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
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
    Whitespace,
}
