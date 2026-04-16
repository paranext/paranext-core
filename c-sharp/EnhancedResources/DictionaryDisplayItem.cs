using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Dictionary display item for the Dictionary Tab.
/// Source: CAP-007, data-contracts.md Section 3.7
/// </summary>
public record DictionaryDisplayItem(
    string TokenId,
    string Term,
    string SourceText,
    string Translit,
    IList<string> Glosses,
    string PartOfSpeech,
    int OccurrenceCount,
    string? Definition = null,
    IList<SemanticDomainRef>? SemanticDomains = null,
    IList<RelatedLexemeRef>? RelatedLexemes = null,
    IList<EncyclopediaLinkRef>? EncyclopediaLinks = null,
    IList<VerseRef>? VerseOccurrences = null
);
