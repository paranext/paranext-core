namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for looking up a dictionary/lexicon entry by lemma and dictionary name.
///
/// Contract: Section 2.3 DictionaryLookupInput (data-contracts.md)
/// </summary>
public record DictionaryLookupInput(
    string Dictionary,
    string Lemma,
    int BaseFormIndex,
    int MeaningIndex,
    string GlossLanguageId,
    int BookNumber
);
