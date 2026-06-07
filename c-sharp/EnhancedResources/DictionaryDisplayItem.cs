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
/// <para>
/// RelevantSenseIndices lists the indices into the resolved entry's Senses list
/// that apply to THIS token at THIS verse (PT9 DictionaryTab.cs:485-517 SelectedSense).
/// Empty list when no relevance data is available.
/// </para>
/// <para>
/// FirstRelevantSensePreview is the preview text rendered in the collapsed list row
/// (uses the first relevant sense's Definition; falls back to first gloss per
/// PT9 DictionaryTab.cs:554-555). Empty string when no preview is available.
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
    IList<int> RelevantSenseIndices,
    string FirstRelevantSensePreview,
    IList<SemanticDomainRef>? SemanticDomains = null,
    IList<EncyclopediaLinkRef>? EncyclopediaLinks = null,
    IList<VerseRef>? VerseOccurrences = null
);
