namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleLexicalLink.cs:1-119 (EXT-009, CAP-005)

/// <summary>
/// Service for parsing Marble lexical link strings.
/// Links follow the format "Dictionary:Lemma:BBBMMM" where
/// Dictionary is "SDBG" or "SDBH",
/// BBB is a 3-digit base form index,
/// MMM is a 3-digit meaning index.
/// Multiple links are semicolon-separated.
/// </summary>
internal static class LexicalLinkService
{
    /// <summary>
    /// Parses raw lexical link strings into structured link objects.
    /// Invalid entries are silently skipped; returns empty list for invalid input.
    /// </summary>
    /// <param name="rawLinkString">
    /// Semicolon-separated link string (e.g., "SDBG:logos:001001;SDBH:dabar:002003").
    /// </param>
    /// <returns>Parsed link objects. Empty list if input is null, empty, or invalid.</returns>
    public static IReadOnlyList<ParsedLexicalLink> ParseLexicalLinks(string rawLinkString) =>
        throw new NotImplementedException();

    /// <summary>
    /// Checks if any link in the semicolon-separated link string contains the given lemma.
    /// </summary>
    /// <param name="lemma">The lemma to search for.</param>
    /// <param name="links">Semicolon-separated link string.</param>
    /// <returns>True if the lemma appears in any link in the string.</returns>
    public static bool IsAnyLemmaInLinks(string lemma, string links) =>
        throw new NotImplementedException();
}
