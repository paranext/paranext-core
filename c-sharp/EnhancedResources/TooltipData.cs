namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured tooltip data for hovering over linked words in the scripture pane.
/// Contains gloss, POS, strong number, notes, and morphology as structured fields.
/// Frontend renders this as a React tooltip component - no HTML generation.
/// Source: Section 4.14 M-014, EXT-002
/// </summary>
public record TooltipData(
    string Lemma,
    string? Gloss,
    string? PartOfSpeech,
    string? StrongNumber,
    string[] Notes,
    string? Morphology
);
