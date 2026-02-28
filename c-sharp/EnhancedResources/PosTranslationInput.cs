namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for translating part-of-speech tags to human-readable text.
///
/// Contract: Section 2.7 (data-contracts.md)
/// Behavior: BHV-610 (Part-of-Speech Translation System)
///
/// SDBH format: character-based codes (e.g., "nspmaH" = noun masculine plural absolute)
/// SDBG format: hyphen-separated (e.g., "noun-dans" = noun declinable accusative neuter singular)
/// </summary>
public record PosTranslationInput(string Dictionary, string PosTag, bool ShortFormat);
