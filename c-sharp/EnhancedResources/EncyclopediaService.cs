namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for encyclopedia V1/V2 loading, language fallback, and paragraph formatting.
///
/// Contract: Section 4.5 GetEncyclopediaEntry (data-contracts.md)
/// Extraction: EXT-005 (Encyclopedia V1/V2 XML Parsing)
/// Extraction: EXT-011 (Encyclopedia Language Fallback)
/// Extraction: EXT-029 (Encyclopedia Paragraph Formatting)
/// Behavior: BHV-304 (Encyclopedia Entry Data Models)
/// Behavior: BHV-606 (V1/V2 Format Support)
/// Behavior: BHV-607 (Paragraph Formatting Rules)
/// Invariant: INV-019 (Encyclopedia Language Fallback Chain)
/// </summary>
internal static class EncyclopediaService
{
    // =====================================================================
    // Test seams: When set, these functions override production behavior
    // to enable isolated testing without real encyclopedia data files.
    // =====================================================================

    /// <summary>
    /// Test seam: checks whether encyclopedia data is loaded.
    /// When set, returns the result of the function.
    /// When null, uses the ResourceManager singleton.
    /// </summary>
    internal static Func<bool>? TestIsEncyclopediaLoaded { get; set; }

    /// <summary>
    /// Test seam: looks up an encyclopedia entry by ID and language.
    /// When set, returns EncyclopediaEntry or null if not found.
    /// When null, would use ParatextData APIs for real encyclopedia lookup.
    /// Parameters: (entryId, languageId) -> EncyclopediaEntry?
    /// </summary>
    internal static Func<string, string, EncyclopediaEntry?>? TestEntryLookup { get; set; }

    /// <summary>
    /// Test seam: formats a paragraph with inline elements.
    /// When set, returns a formatted EncyclopediaParagraph.
    /// When null, would use real paragraph formatting logic.
    /// Parameters: (rawParagraphXml) -> EncyclopediaParagraph?
    /// </summary>
    internal static Func<string, EncyclopediaParagraph?>? TestFormatParagraph { get; set; }

    /// <summary>
    /// Retrieve encyclopedia entries with three-level language fallback (INV-019),
    /// supporting both V1 and V2 formats with paragraph formatting.
    ///
    /// Preconditions: Resource initialized. Encyclopedia data loaded.
    /// Postconditions: Returns entries with formatted paragraphs.
    /// </summary>
    public static async Task<EncyclopediaResult> GetEncyclopediaEntryAsync(
        EncyclopediaLookupInput input,
        CancellationToken ct
    )
    {
        // Stub: will be implemented during GREEN phase
        await Task.CompletedTask;
        throw new NotImplementedException(
            "EncyclopediaService.GetEncyclopediaEntryAsync is not yet implemented (RED phase stub)"
        );
    }
}
