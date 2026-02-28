namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Translates part-of-speech tags from SDBH (Hebrew) and SDBG (Greek) formats
/// to human-readable text in both long and short forms.
///
/// Contract: Section 4.8 TranslatePartOfSpeech (data-contracts.md)
/// Behavior: BHV-610 (Part-of-Speech Translation System)
/// Extraction: EXT-008 (POS Translation Worker B1)
///
/// PT9 Source: Paratext.Marble.PartOfSpeechTranslator
/// </summary>
internal static class PosTranslationService
{
    /// <summary>
    /// Translates a POS tag to a human-readable string.
    ///
    /// SDBH (Hebrew): character-based codes (e.g., "nspmaH" = "noun masculine plural absolute")
    /// SDBG (Greek): hyphen-separated (e.g., "noun-dans" = "noun declinable accusative neuter singular")
    ///
    /// Preconditions: None (POS translation data is embedded/static)
    /// Postconditions: Returns human-readable POS description with components.
    /// </summary>
    public static Task<PosTranslationResult> TranslatePartOfSpeechAsync(
        PosTranslationInput input,
        CancellationToken ct
    )
    {
        throw new NotImplementedException(
            "CAP-008: TranslatePartOfSpeech not yet implemented. "
                + "See data-contracts.md Section 4.8 and BHV-610."
        );
    }
}
