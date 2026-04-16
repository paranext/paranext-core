namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses encyclopedia entry XML, handles V1/V2 format, extracts paragraphs,
/// headings, cross-references, images.
/// Source: CAP-009, EXT-014, BHV-604
///
/// V1 format: deserialized from XML string via Memento. Uses |f...|f* image tags
/// and |s...|s* verse references in paragraphs.
/// V2 format: parsed by iterating XML entries. Uses &lt;image Id="..."/&gt; tags,
/// &lt;s&gt;H...&lt;/s&gt; verse references, and structured &lt;BibleImages&gt; sections.
/// V2 does NOT add new information - it restructures the XML format.
/// </summary>
public class MarbleEncyclopediaEntry
{
    // === STUB: Implementation pending (EXT-014) ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:1-476
    // Complexity: Complex (476 lines)

    public string Key { get; }
    public string Title { get; }
    public IList<string> Paragraphs { get; }
    public IList<string> CrossReferences { get; }
    public IList<string> BibleImageIds { get; }

    public MarbleEncyclopediaEntry(string xmlData)
    {
        throw new NotImplementedException("CAP-009: MarbleEncyclopediaEntry not yet implemented");
    }

    /// <summary>
    /// Parses all ThemLex_Entry elements from a Thematic_Lexicon XML document.
    /// </summary>
    public static IList<MarbleEncyclopediaEntry> ParseAll(string thematicLexiconXml)
    {
        throw new NotImplementedException(
            "CAP-009: MarbleEncyclopediaEntry.ParseAll not yet implemented"
        );
    }
}
