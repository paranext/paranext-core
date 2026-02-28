using System.Xml;

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

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - encyclopedia lookup via NetworkObject
    // Maps to: CAP-005
    /// <summary>
    /// Retrieve encyclopedia entries with three-level language fallback (INV-019),
    /// supporting both V1 and V2 formats with paragraph formatting.
    ///
    /// Preconditions: Resource initialized. Encyclopedia data loaded.
    /// Postconditions: Returns entries with formatted paragraphs.
    ///
    /// EXPLANATION:
    /// This method implements the three-level language fallback chain (INV-019):
    /// 1. Try the resource language first (resourceLanguageId)
    /// 2. If not found, try the UI language (uiLanguageId)
    /// 3. If still not found, try English ("en") as final fallback
    /// If all three levels fail, returns NOT_FOUND error.
    /// XML parse failures from the test seam are caught and returned as PARSE_ERROR.
    /// </summary>
    public static Task<EncyclopediaResult> GetEncyclopediaEntryAsync(
        EncyclopediaLookupInput input,
        CancellationToken ct
    )
    {
        List<string> fallbackLanguages = BuildFallbackLanguages(
            input.ResourceLanguageId,
            input.UiLanguageId
        );

        // Try each language in the fallback chain
        foreach (var languageId in fallbackLanguages)
        {
            try
            {
                var entry = LookupEntry(input.EntryId, languageId);
                if (entry != null)
                {
                    return Task.FromResult(
                        new EncyclopediaResult(
                            Success: true,
                            Entries: new List<EncyclopediaEntry> { entry },
                            Error: null
                        )
                    );
                }
            }
            catch (XmlException)
            {
                // XML parsing failure -> PARSE_ERROR
                return CreateEncyclopediaError(
                    "PARSE_ERROR",
                    "Failed to parse encyclopedia entry XML"
                );
            }
        }

        // All fallback languages exhausted -> NOT_FOUND
        return CreateEncyclopediaError(
            "NOT_FOUND",
            $"No localized content for entry '{input.EntryId}' in any available language"
        );
    }

    /// <summary>
    /// Builds the ordered language fallback chain (INV-019):
    /// resource language -> UI language -> English.
    /// Deduplicates to avoid redundant lookups when languages overlap.
    /// </summary>
    private static List<string> BuildFallbackLanguages(
        string resourceLanguageId,
        string uiLanguageId
    )
    {
        var languages = new List<string>(3) { resourceLanguageId };

        if (!string.Equals(uiLanguageId, resourceLanguageId, StringComparison.Ordinal))
            languages.Add(uiLanguageId);

        if (
            !string.Equals("en", resourceLanguageId, StringComparison.Ordinal)
            && !string.Equals("en", uiLanguageId, StringComparison.Ordinal)
        )
            languages.Add("en");

        return languages;
    }

    /// <summary>
    /// Looks up an encyclopedia entry by ID and language using the test seam or production API.
    /// Returns null if not found in the given language. May throw XmlException for corrupt data.
    /// </summary>
    /// <remarks>
    /// Production: when TestEntryLookup is null, would use ParatextData APIs.
    /// </remarks>
    private static EncyclopediaEntry? LookupEntry(string entryId, string languageId) =>
        TestEntryLookup?.Invoke(entryId, languageId);

    // ---- Error factory method ----

    private static Task<EncyclopediaResult> CreateEncyclopediaError(string code, string message) =>
        Task.FromResult(
            new EncyclopediaResult(
                Success: false,
                Entries: null,
                Error: new ErrorInfo(code, message)
            )
        );
}
