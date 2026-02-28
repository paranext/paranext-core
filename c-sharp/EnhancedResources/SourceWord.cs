namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Greek/Hebrew source word data associated with a TextLink token.
/// Contract: Section 3.2 MarbleToken (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
/// </summary>
public record SourceWord(string SurfaceText, string Transliteration, string PosTag, string Lemma);
