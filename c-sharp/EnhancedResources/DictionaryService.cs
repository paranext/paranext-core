namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Dictionary entry loading, deduplication, gloss formatting.
/// Selects SDBH for OT (books 1-39), SDBG for NT/DC (books 40-66+).
/// Source: CAP-007, EXT-053, EXT-055, EXT-056, BHV-364
/// </summary>
internal static class DictionaryService
{
    /// <summary>
    /// Load dictionary entries with deduplication. SDBH for OT, SDBG for NT/DC.
    /// Source: EXT-053, BHV-364
    /// </summary>
    public static DictionaryLoadResult LoadResources(DictionaryLoadInput input)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Find related lexemes for a source lexeme by shared glosses and semantic domains.
    /// Source: BHV-110, INV-C07
    /// </summary>
    public static IList<RelatedLexemeRef> FindRelatedLexemes(
        string sourceLexeme,
        string glossLanguage
    )
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Format interlinear display string based on morphological type.
    /// Stem: /form/, Suffix: -form, Prefix: form-
    /// Source: spec-007, BHV-112
    /// </summary>
    public static string FormatInterlinearDisplay(string morphType, string lexicalForm)
    {
        throw new NotImplementedException();
    }
}
