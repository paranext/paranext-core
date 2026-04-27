namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured tooltip data for hovering over linked words in the scripture pane.
/// Frontend renders this as a React tooltip component - no HTML generation.
/// Source: Section 4.14 M-014, EXT-002. PT9 source: MarbleForm.GetTooltip
/// (MarbleForm.cs:2692). PT9's tooltip body also includes a transliteration line
/// and a per-project term-rendering status; both are intentionally out of scope
/// here until the rendering-status pipeline is ported.
/// </summary>
/// <remarks>
/// <see cref="Notes"/> and <see cref="Morphology"/> are reserved placeholders. They
/// are always empty / null today: PT9 derives notes from referenced-note caches
/// (DictionaryTab.GetBestReferencedNotes) and per-sense morphology from
/// <c>Lexicon_LexicalMeaning.PartOfSpeech</c>; neither pipeline exists in PT10
/// yet. Following the convention of <see cref="LexiconEntry.Translit"/>, the
/// fields stay on the contract so consumers can adopt them without a record
/// change once the data is wired up.
/// </remarks>
public record TooltipData(
    string Lemma,
    string? Gloss,
    string? PartOfSpeech,
    string? StrongNumber,
    string[] Notes,
    string? Morphology
);
