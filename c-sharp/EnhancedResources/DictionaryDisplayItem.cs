using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Dictionary display item for the Dictionary Tab.
/// Source: CAP-007, data-contracts.md Section 3.7
/// <para>
/// EntryId is the NFD-normalized lemma - the same key the lexicon loader writes
/// (PT9 MarbleDataAccess.cs:1444 keys cachedLemmaToEntry on the FormD lemma).
/// Clients pass it back to readDictionaryEntry to drill into the full entry.
/// </para>
/// </summary>
public record DictionaryDisplayItem(
    string TokenId,
    string EntryId,
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
