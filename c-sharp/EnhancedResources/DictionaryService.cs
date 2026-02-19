namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for dictionary tab operations including homonym grouping, deduplication,
/// and display item creation.
///
/// STUB: This file contains method stubs for TDD RED phase.
/// The implementer agent will provide the actual implementation.
/// </summary>
internal static class DictionaryService
{
    /// <summary>
    /// Groups Biblical Terms by base lemma for dictionary lookup, handling homonym suffixes (-N).
    /// Terms with a trailing -N suffix (where N is one or more digits) are grouped by the base
    /// lemma (the part before the last -N).
    ///
    /// PORTED FROM PT9: BiblicalTerms matching logic (MarbleForm.cs:3060-3163)
    /// Maps to: EXT-001 (homonym grouping subset), data-contracts.md Method 23
    /// </summary>
    /// <param name="termIds">List of term IDs, some of which may have -N homonym suffixes.</param>
    /// <returns>Dictionary keyed by base lemma, with values being the full term IDs.</returns>
    public static IReadOnlyDictionary<string, IReadOnlyList<string>> GetHomonymGroups(
        IReadOnlyList<string> termIds
    )
    {
        throw new NotImplementedException(
            "CAP-023: GetHomonymGroups not yet implemented. Awaiting TDD GREEN phase."
        );
    }
}
