namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses USX/Emdros-format XML into flat MarbleToken lists.
/// Foundational parser for the entire Enhanced Resources feature.
/// </summary>
/// <remarks>
/// Ported from PT9: Paratext/Marble/MarbleDataParser.cs:65-173
/// EXT-055, CAP-002, BHV-600
/// </remarks>
internal static class MarbleDataParser
{
    /// <summary>
    /// Converts USX-like XML into a flat list of MarbleTokens.
    /// Handles: usx_book, chapter, para, row, char, cell, verse, note, wg (text links), ref.
    /// Extracts all link attributes from wg elements.
    /// </summary>
    /// <param name="xml">USX-like XML string from resource data (may include EmdrosDump wrapper)</param>
    /// <returns>Ordered list of tokens with types and link attributes. Empty list if input is null/empty.</returns>
    public static IReadOnlyList<MarbleToken> ConvertToTokens(string xml)
    {
        throw new NotImplementedException(
            "CAP-002: ConvertToTokens not yet implemented. TDD RED phase."
        );
    }
}
