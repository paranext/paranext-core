namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for lexical link parsing, dictionary lookups, gloss retrieval,
/// and abbreviation lookups.
///
/// Contract: Section 4.1 ParseLexicalLinks (data-contracts.md)
/// Extraction: EXT-001 (Lexical Link Parsing and Format Handling)
/// Behavior: BHV-302 (Lexical Link Data Model)
/// </summary>
internal static class LexiconService
{
    /// <summary>
    /// Parse semicolon-separated lexical link strings from USX character elements
    /// into structured <see cref="LexicalLink"/> objects.
    ///
    /// Format: "Dictionary:Lemma:BBBMMM" where BBB and MMM are 3-digit zero-padded indices.
    /// Multiple links separated by semicolons.
    ///
    /// Contract: Section 4.1 (data-contracts.md)
    /// Behavior: BHV-302
    /// Extraction: EXT-001
    /// </summary>
    public static Task<ParseLexicalLinksResult> ParseLexicalLinksAsync(
        LexicalLinkInput input,
        CancellationToken ct
    )
    {
        throw new NotImplementedException(
            "CAP-001: ParseLexicalLinks not yet implemented. "
                + "This stub exists so TDD tests can compile in RED state."
        );
    }

    /// <summary>
    /// Determines the dictionary name for a given book number based on testament.
    ///
    /// Invariant: INV-013 (Book-to-Dictionary Mapping)
    /// - OT books -> SDBH (Hebrew dictionary)
    /// - NT books -> SDBG (Greek dictionary)
    /// - DC books -> DCLEX (Deuterocanon dictionary)
    ///
    /// Uses Canon.IsBookOT / Canon.IsBookNT for determination.
    /// </summary>
    public static string GetDictionaryForBook(int bookNumber)
    {
        throw new NotImplementedException(
            "CAP-001: GetDictionaryForBook not yet implemented. "
                + "This stub exists so TDD tests can compile in RED state."
        );
    }
}
