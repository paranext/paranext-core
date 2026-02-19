namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleLexicalLink.cs (EXT-009, CAP-005)

/// <summary>
/// A parsed lexical link with its constituent parts.
/// Format: Dictionary:Lemma:BBBMMM where BBB=base form index, MMM=meaning index.
/// </summary>
public record ParsedLexicalLink(
    string Dictionary, // "SDBG" or "SDBH"
    string Lemma,
    string BaseFormIndex, // 3-digit padded (e.g., "001")
    string MeaningIndex, // 3-digit padded (e.g., "001")
    string FullLink // Original link string for exact matching
)
{
    /// <summary>
    /// Determines if this link matches the given filter link based on the filter origin.
    /// ScripturePane: exact full link match.
    /// DictionaryTab: partial match (base form only, ignoring meaning index).
    /// </summary>
    public bool MatchesFilter(ParsedLexicalLink filter, FilterOrigin origin) =>
        throw new NotImplementedException();

    /// <summary>
    /// Returns the lemma string from this parsed link for display purposes.
    /// </summary>
    public string GetLemmaString() => throw new NotImplementedException();
}
