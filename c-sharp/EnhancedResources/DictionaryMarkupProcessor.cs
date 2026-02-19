namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Processes dictionary markup patterns into HTML.
/// 8+ patterns: {A:}, {L:}, {D:}, {N:}, {S:}, |i, |u, |b
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs:1185-1275
/// Extraction: EXT-056
///
/// STUB: This class is a compilation stub for TDD RED phase.
/// The implementer will provide the full implementation.
/// </summary>
internal static class DictionaryMarkupProcessor
{
    /// <summary>
    /// Processes dictionary markup patterns replacing them with HTML.
    /// </summary>
    /// <param name="rawMarkup">Raw markup text containing dictionary patterns.</param>
    /// <param name="dictionary">Dictionary identifier ("SDBG" or "SDBH").</param>
    /// <returns>HTML string with all markup patterns replaced.</returns>
    public static string ProcessDictionaryMarkup(string rawMarkup, string dictionary)
    {
        throw new NotImplementedException(
            "CAP-014: ProcessDictionaryMarkup not yet implemented (TDD RED phase stub)"
        );
    }
}
