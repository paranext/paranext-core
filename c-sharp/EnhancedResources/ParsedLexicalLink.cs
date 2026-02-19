namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleLexicalLink.cs (EXT-009, CAP-005)

/// <summary>
/// A parsed lexical link with its constituent parts.
/// Format: Dictionary:Lemma:BBBMMM where BBB=base form index, MMM=meaning index.
/// </summary>
public record ParsedLexicalLink(
    string Dictionary,
    string Lemma,
    string BaseFormIndex,
    string MeaningIndex,
    string FullLink
)
{
    /// <summary>
    /// Determines if this link matches the given filter link based on the filter origin.
    /// ScripturePane: exact full link match.
    /// DictionaryTab: partial match (Dictionary + Lemma + BaseFormIndex, ignoring meaning index).
    /// </summary>
    public bool MatchesFilter(ParsedLexicalLink filter, FilterOrigin origin)
    {
        if (origin == FilterOrigin.ScripturePane)
            return FullLink == filter.FullLink;

        // DictionaryTab: partial match on Dictionary + Lemma + BaseFormIndex
        return Dictionary == filter.Dictionary
            && Lemma == filter.Lemma
            && BaseFormIndex == filter.BaseFormIndex;
    }

    /// <summary>
    /// Returns the lemma string from this parsed link for display purposes.
    /// </summary>
    public string GetLemmaString() => Lemma;
}
