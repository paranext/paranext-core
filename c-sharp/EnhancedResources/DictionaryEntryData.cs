namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured dictionary entry data returned by GetDictionaryEntry.
/// Contains senses, glosses, semantic domains, and morphology.
/// Source: Section 4.8 M-008, EXT-055, Theme 2 (no HTML)
///
/// Related lexemes were intentionally removed: the PT9 Marble dictionary does not expose them at
/// the entry level (data-shape audit #7a - they were invented by the design phase). PT9's related-
/// lexeme feature (ParatextData LexiconExtensions.GetRelatedLexemes) belongs to Find Related Words
/// / Biblical Terms suggestions over the project lexicon, not this resource dictionary.
/// </summary>
public record DictionaryEntryData(
    string EntryId,
    string Lemma,
    IList<DictionarySense> Senses,
    IList<string> SemanticDomains,
    string Morphology
);

/// <summary>
/// A single sense within a dictionary entry, with glosses and definition.
/// Source: Section 4.8 M-008
/// </summary>
public record DictionarySense(string SenseId, IList<GlossEntry> Glosses, string Definition)
{
    public int OccurrenceCount { get; init; } = 0;
}

/// <summary>
/// A gloss entry with language code and text.
/// Source: Section 4.8 M-008
/// </summary>
public record GlossEntry(string Language, string Text);
