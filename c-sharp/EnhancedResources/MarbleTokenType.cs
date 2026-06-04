namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Token type enum for Marble XML parsing. 11 types correspond to
/// EmdrosDump XML elements: usx_book->Book, chapter->Chapter, verse->Verse,
/// para->ParagraphStart/ParagraphEnd, char->CharacterStart/CharacterEnd,
/// text->PlainText, wg->TextLink, note->Note, ref->Reference.
/// Source: EXT-016, BHV-600
/// </summary>
public enum MarbleTokenType
{
    Book,
    Chapter,
    Verse,
    ParagraphStart,
    ParagraphEnd,
    CharacterStart,
    CharacterEnd,
    PlainText,
    TextLink,
    Note,
    Reference,
}
