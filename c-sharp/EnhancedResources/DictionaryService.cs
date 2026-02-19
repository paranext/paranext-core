namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for dictionary tab operations including homonym grouping, deduplication,
/// and display item creation.
/// </summary>
internal static class DictionaryService
{
    /// <summary>
    /// Groups Biblical Terms by base lemma for dictionary lookup, handling homonym suffixes (-N).
    /// Terms with a trailing -N suffix (where N is one or more digits) are grouped by the base
    /// lemma (the part before the last -N).
    ///
    /// PORTED FROM PT9: BiblicalTerms matching logic (MarbleForm.cs:3060-3163)
    /// Maps to: CAP-023, data-contracts.md Method 23
    /// </summary>
    /// <param name="termIds">List of term IDs, some of which may have -N homonym suffixes.</param>
    /// <returns>Dictionary keyed by base lemma, with values being the full term IDs.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus (homonym grouping subset)
    // Maps to: CAP-023, data-contracts.md Method 23
    public static IReadOnlyDictionary<string, IReadOnlyList<string>> GetHomonymGroups(
        IReadOnlyList<string> termIds
    )
    {
        var groups = new Dictionary<string, IReadOnlyList<string>>();

        foreach (var termId in termIds)
        {
            var baseLemma = GetBaseLemma(termId);

            if (groups.TryGetValue(baseLemma, out var existing))
            {
                ((List<string>)existing).Add(termId);
            }
            else
            {
                groups[baseLemma] = new List<string> { termId };
            }
        }

        return groups;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus (suffix stripping logic)
    // Maps to: CAP-023
    private static string GetBaseLemma(string termId)
    {
        var lastHyphen = termId.LastIndexOf('-');

        if (lastHyphen <= 0)
            return termId;

        var suffix = termId[(lastHyphen + 1)..];

        if (suffix.Length > 0 && suffix.All(char.IsDigit))
            return termId[..lastHyphen];

        return termId;
    }
}
