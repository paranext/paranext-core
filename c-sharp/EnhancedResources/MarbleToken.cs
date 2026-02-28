namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Represents a single token in the parsed USX token stream.
/// Contract: Section 3.2 MarbleToken (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
/// </summary>
public record MarbleToken(
    MarbleTokenType Type,
    string? Text,
    string? Style,
    IReadOnlyList<LexicalLink>? Links,
    int? VerseNumber,
    int TokenIndex,
    SourceWord? SourceWord,
    string? PhraseText
);
