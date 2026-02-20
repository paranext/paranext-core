namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single row in the Dictionary research tab, potentially merged from multiple verse
/// occurrences. The merge key is (Lemma, SourceText, LexicalLinks) per INV-015.
///
/// Contract: data-contracts.md (DictionaryDisplayItem)
/// Golden Master: gm-013 (deduplication), gm-008 (markup), gm-014 (filtering)
/// </summary>
public record DictionaryDisplayItem(
    string Id,
    string Lemma,
    string Transliteration,
    string SurfaceForm,
    string SourceText,
    string LexicalLinks,
    string PartOfSpeech,
    string PartOfSpeechShort,
    string Gloss,
    IReadOnlyList<string> Translations,
    IReadOnlyList<DictionarySenseDefinition> Definitions,
    int OccurrenceCount,
    IReadOnlyList<VerseReference> OccurrenceReferences,
    TermRenderingStatusCode RenderingStatus,
    bool Expanded
);

/// <summary>
/// A single sense definition for a dictionary entry.
/// Contains the gloss, definition HTML, and semantic domain info.
///
/// Contract: data-contracts.md (DictionarySenseDefinition)
/// </summary>
public record DictionarySenseDefinition(
    string SenseNumber,
    string GlossText,
    string DefinitionHtml,
    bool IsRelevantToContext,
    string? SemanticDomain,
    string? SemanticDomainCode
);
