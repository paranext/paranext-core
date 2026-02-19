namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleLexicalLink.cs (EXT-009, CAP-005)

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
    public static IReadOnlyList<ParsedLexicalLink> ParseLexicalLinks(string rawLinkString)
    {
        if (string.IsNullOrWhiteSpace(rawLinkString))
            return Array.Empty<ParsedLexicalLink>();

        var results = new List<ParsedLexicalLink>();
        string[] segments = rawLinkString.Split(';');

        foreach (string segment in segments)
        {
            if (string.IsNullOrWhiteSpace(segment))
                continue;

            string[] parts = segment.Split(':');
            if (parts.Length != 3)
                continue;

            string dictionary = parts[0];
            string lemma = parts[1];
            string numbers = parts[2];

            string baseFormIndex = numbers.Length >= 3 ? numbers.Substring(0, 3) : numbers;
            string meaningIndex = numbers.Length >= 6 ? numbers.Substring(3, 3) : "";

            results.Add(
                new ParsedLexicalLink(dictionary, lemma, baseFormIndex, meaningIndex, segment)
            );
        }

        return results;
    }

    /// <summary>
    /// Checks if any link in the semicolon-separated link string contains the given lemma.
    /// </summary>
    /// <param name="lemma">The lemma to search for.</param>
    /// <param name="links">Semicolon-separated link string.</param>
    /// <returns>True if the lemma appears in any link in the string.</returns>
    public static bool IsAnyLemmaInLinks(string lemma, string links)
    {
        if (string.IsNullOrWhiteSpace(links))
            return false;

        return ParseLexicalLinks(links).Any(link => link.Lemma == lemma);
    }
}
