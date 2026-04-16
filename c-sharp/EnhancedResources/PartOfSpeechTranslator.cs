namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Translates Greek and Hebrew POS tag codes to localized display strings.
/// Static dictionaries map tag codes to localization keys.
/// Hebrew: final 'H' stripped before lookup. 28 Greek codes, 14 Hebrew codes.
/// Localization keys: EnhancedResource.PartOfSpeech.{form}
///
/// Source: EXT-052, BHV-615
/// </summary>
public static class PartOfSpeechTranslator
{
    /// <summary>
    /// Translates a compound POS tag string into human-readable long or short form.
    /// </summary>
    /// <param name="tag">Compound POS tag code (e.g., "noun-dans", "nspmaH")</param>
    /// <param name="language">"Greek" or "Hebrew"</param>
    /// <param name="form">"long" or "short"</param>
    /// <returns>Translation result with display string, known flag, and localization key</returns>
    public static PosTranslateResult Translate(string tag, string language, string form)
    {
        throw new NotImplementedException(
            "CAP-005: PartOfSpeechTranslator.Translate - awaiting TDD implementation"
        );
    }
}
