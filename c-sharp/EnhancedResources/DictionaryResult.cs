namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Full dictionary/lexicon entry result including base forms, meanings,
/// senses, glosses, and domain information.
///
/// Contract: Section 3.3 DictionaryResult (data-contracts.md)
/// </summary>
public record DictionaryResult(bool Success, LexiconEntry? Entry = null, ErrorInfo? Error = null);

/// <summary>
/// Structured lexicon entry with base forms.
/// </summary>
public record LexiconEntry(
    string EntryId,
    string Lemma,
    string Dictionary,
    IReadOnlyList<LexiconBaseForm> BaseForms
);

/// <summary>
/// Base form within a lexicon entry.
/// </summary>
public record LexiconBaseForm(
    int Index,
    string LexicalForm,
    string PosTag,
    IReadOnlyList<LexiconMeaning> Meanings
);

/// <summary>
/// Meaning within a base form, containing senses, domains, and notes.
/// </summary>
public record LexiconMeaning(
    int Index,
    IReadOnlyList<LexiconSense> Senses,
    IReadOnlyList<string> Domains,
    string? Notes
);

/// <summary>
/// Sense within a meaning, with localized gloss and occurrence data.
/// </summary>
public record LexiconSense(
    string SenseId,
    string Gloss,
    string GlossLanguageId,
    int OccurrenceCount,
    string SelectedSenseRef
);
