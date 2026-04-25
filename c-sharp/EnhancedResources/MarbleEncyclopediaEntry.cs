using System.Xml.Linq;

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
internal sealed class MarbleEncyclopediaEntry
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:1-476
    // Method: MarbleEncyclopediaEntry constructor + property accessors
    // Maps to: EXT-014, BHV-604

    public string Key { get; }
    public string Title { get; }
    public IList<string> Paragraphs { get; }
    public IList<string> CrossReferences { get; }
    public IList<string> BibleImageIds { get; }

    public MarbleEncyclopediaEntry(string xmlData)
        : this(XElement.Parse(xmlData)) { }

    internal MarbleEncyclopediaEntry(XElement element)
    {
        Key = element.Attribute("Key")?.Value ?? "";
        Title = element.Element("Title")?.Value ?? "";

        var sections = element.Element("Sections")?.Elements("Section");

        Paragraphs = ExtractParagraphs(sections);
        CrossReferences = ExtractCrossReferences(sections);
        BibleImageIds = ExtractBibleImageIds(sections);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs
    // Method: Thematic_Lexicon XML iteration
    // Maps to: EXT-014
    /// <summary>
    /// Parses all ThemLex_Entry elements from a Thematic_Lexicon XML document.
    /// </summary>
    public static IList<MarbleEncyclopediaEntry> ParseAll(string thematicLexiconXml)
    {
        var doc = XDocument.Parse(thematicLexiconXml);
        if (doc.Root == null)
            return [];

        return doc
            .Root.Elements("ThemLex_Entry")
            .Select(e => new MarbleEncyclopediaEntry(e))
            .ToList();
    }

    /// <summary>
    /// Extracts paragraph text from all Section elements. Handles both V1 plain text
    /// and V2 mixed content with child elements like &lt;image/&gt;.
    /// </summary>
    private static IList<string> ExtractParagraphs(IEnumerable<XElement>? sections)
    {
        if (sections == null)
            return [];

        return sections
            .SelectMany(s => s.Element("Paragraphs")?.Elements("Paragraph") ?? [])
            .Select(GetParagraphContent)
            .Where(c => !string.IsNullOrEmpty(c))
            .ToList();
    }

    /// <summary>
    /// Extracts cross-reference strings from LanguageSet/References elements.
    /// </summary>
    private static IList<string> ExtractCrossReferences(IEnumerable<XElement>? sections)
    {
        if (sections == null)
            return [];

        return sections
            .SelectMany(s => s.Element("LanguageSets")?.Elements("LanguageSet") ?? [])
            .SelectMany(ls => ls.Element("References")?.Elements("Reference") ?? [])
            .Select(r => r.Value)
            .Where(v => !string.IsNullOrEmpty(v))
            .ToList();
    }

    /// <summary>
    /// Extracts BibleImage IDs from BibleImages sections (V2 format only).
    /// </summary>
    private static IList<string> ExtractBibleImageIds(IEnumerable<XElement>? sections)
    {
        if (sections == null)
            return [];

        return sections
            .SelectMany(s => s.Element("BibleImages")?.Elements("BibleImage") ?? [])
            .Select(img => img.Attribute("Id")?.Value)
            .Where(id => !string.IsNullOrEmpty(id))
            .ToList()!;
    }

    /// <summary>
    /// Gets the text content of a Paragraph element, handling both V1 plain text
    /// and V2 mixed content with child elements.
    /// </summary>
    private static string GetParagraphContent(XElement paragraph)
    {
        if (!paragraph.HasElements)
            return paragraph.Value;

        // V2 format: concatenate text nodes and child element representations
        return string.Concat(paragraph.Nodes().Select(NodeToString));
    }

    private static string NodeToString(XNode node) =>
        node switch
        {
            XText textNode => textNode.Value,
            XElement elem => elem.ToString(),
            _ => "",
        };
}
