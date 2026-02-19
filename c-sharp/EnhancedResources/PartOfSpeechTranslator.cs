namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Translates morphological Part of Speech codes to human-readable descriptions.
/// Hebrew (SDBH): single-char codes with trailing 'H' trimmed.
/// Greek (SDBG): hyphen-separated word codes.
/// Both long and short formats supported.
///
/// Stub: Implementation pending TDD GREEN phase.
/// PT9 Source: Paratext/Marble/PartOfSpeechTranslator.cs:1-1138
/// Extraction: EXT-010
/// </summary>
internal static class PartOfSpeechTranslator
{
    /// <summary>
    /// Translates a POS code to a human-readable description.
    /// </summary>
    /// <param name="sourceDictionary">Either "SDBG" (Greek) or "SDBH" (Hebrew).</param>
    /// <param name="partOfSpeech">The morphological POS code to translate.</param>
    /// <param name="shortFormat">If true, return abbreviated form; otherwise long form.</param>
    /// <returns>
    /// Human-readable POS description, or the raw code unchanged if unrecognized.
    /// </returns>
    /// <exception cref="ArgumentException">Thrown when dictionary is not "SDBG" or "SDBH".</exception>
    public static string Translate(string sourceDictionary, string partOfSpeech, bool shortFormat)
    {
        throw new NotImplementedException(
            "CAP-006: PartOfSpeechTranslator.Translate not yet implemented"
        );
    }
}
