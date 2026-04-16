namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses Marble-enhanced XML (EmdrosDump/wg elements with 7 annotation attributes)
/// into structured MarbleToken arrays. NOT standard USX parsing.
///
/// Source: EXT-016, BHV-600, BHV-603
/// CAP-002: ParseMarbleTokens
///
/// STUB: Implementation pending. All methods throw NotImplementedException.
/// </summary>
public static class MarbleTokenParser
{
    /// <summary>
    /// Parse Marble-enhanced XML into structured tokens. 11 token types.
    /// </summary>
    /// <param name="marbleXml">Marble XML string (EmdrosDump format)</param>
    /// <param name="resourceId">Resource identifier for context</param>
    /// <param name="bookNumber">Book number for the content</param>
    /// <param name="chapterNumber">Chapter number being parsed</param>
    /// <returns>Array of MarbleToken with correct types, text, and attributes</returns>
    /// <exception cref="InvalidOperationException">
    /// INVALID_ARGUMENT when marbleXml is null/empty.
    /// INTERNAL when XML is malformed.
    /// NOT_FOUND when resource is not found.
    /// </exception>
    public static MarbleToken[] Parse(
        string marbleXml,
        string resourceId,
        int bookNumber,
        int chapterNumber
    )
    {
        throw new NotImplementedException("CAP-002: MarbleTokenParser.Parse not yet implemented");
    }
}
