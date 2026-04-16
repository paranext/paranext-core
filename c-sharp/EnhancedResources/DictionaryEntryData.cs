namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured dictionary entry data returned by GetDictionaryEntry.
/// Contains senses, glosses, semantic domains, related lexemes, and morphology.
/// Source: Section 4.8 M-008, EXT-055, Theme 2 (no HTML)
/// </summary>
public record DictionaryEntryData(
    string EntryId,
    string Lemma,
    IList<DictionarySense> Senses,
    IList<string> SemanticDomains,
    IList<RelatedLexemeData> RelatedLexemes,
    string Morphology
);

/// <summary>
/// A single sense within a dictionary entry, with glosses and definition.
/// Source: Section 4.8 M-008
/// </summary>
public record DictionarySense(string SenseId, IList<GlossEntry> Glosses, string Definition);

/// <summary>
/// A gloss entry with language code and text.
/// Source: Section 4.8 M-008
/// </summary>
public record GlossEntry(string Language, string Text);

/// <summary>
/// A related lexeme with relationship information.
/// Source: Section 4.8 M-008
/// </summary>
public record RelatedLexemeData(string Lemma, string EntryId, string Relationship, string Gloss);
