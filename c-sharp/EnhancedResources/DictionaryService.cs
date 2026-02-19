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

    /// <summary>
    /// INV-015: Deduplicates dictionary items by (Lemma, SourceText, LexicalLinks) key.
    /// When a match is found, the existing item is replaced with a merged version:
    /// OccurrenceCount is summed, OccurrenceReferences are combined, and RenderingStatus
    /// is merged via CombineTermStatusCodes (CAP-008).
    /// When no match is found, the new item is added to the existing list.
    /// </summary>
    /// <param name="newItem">The new item to merge or add.</param>
    /// <param name="existing">The list of existing items to search and potentially modify.</param>
    /// <returns>True if merged with an existing item, false if added as new.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:796-810
    // Method: DictionaryTab.UpdateDisplayedItem()
    // Maps to: EXT-059, INV-015, CAP-026
    public static bool TryMerge(DictionaryDisplayItem newItem, List<DictionaryDisplayItem> existing)
    {
        for (int i = 0; i < existing.Count; i++)
        {
            var current = existing[i];
            if (
                current.Lemma == newItem.Lemma
                && current.SourceText == newItem.SourceText
                && current.LexicalLinks == newItem.LexicalLinks
            )
            {
                var combinedStatus = TermRenderingStatusService.CombineTermStatusCodes(
                    current.RenderingStatus,
                    newItem.RenderingStatus
                );
                var combinedRefs = current
                    .OccurrenceReferences.Concat(newItem.OccurrenceReferences)
                    .ToList();

                existing[i] = current with
                {
                    OccurrenceCount = current.OccurrenceCount + newItem.OccurrenceCount,
                    OccurrenceReferences = combinedRefs,
                    RenderingStatus = combinedStatus,
                };

                return true;
            }
        }

        existing.Add(newItem);
        return false;
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
