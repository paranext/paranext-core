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
public class MarbleEncyclopediaEntry
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
    {
        var element = XElement.Parse(xmlData);

        Key = element.Attribute("Key")?.Value ?? "";
        Title = element.Element("Title")?.Value ?? "";

        // Extract paragraphs from all Section elements
        var paragraphs = new List<string>();
        var sectionsElement = element.Element("Sections");
        if (sectionsElement != null)
        {
            foreach (var section in sectionsElement.Elements("Section"))
            {
                var paragraphsElement = section.Element("Paragraphs");
                if (paragraphsElement != null)
                {
                    foreach (var p in paragraphsElement.Elements("Paragraph"))
                    {
                        // For V2, paragraph content may contain child elements like <image/>
                        // Use the inner XML representation to preserve them
                        string content = GetParagraphContent(p);
                        if (!string.IsNullOrEmpty(content))
                        {
                            paragraphs.Add(content);
                        }
                    }
                }
            }
        }

        Paragraphs = paragraphs;

        // Extract cross-references from LanguageSet/References elements
        var crossRefs = new List<string>();
        if (sectionsElement != null)
        {
            foreach (var section in sectionsElement.Elements("Section"))
            {
                var languageSets = section.Element("LanguageSets");
                if (languageSets != null)
                {
                    foreach (var langSet in languageSets.Elements("LanguageSet"))
                    {
                        var refs = langSet.Element("References");
                        if (refs != null)
                        {
                            foreach (var r in refs.Elements("Reference"))
                            {
                                var refValue = r.Value;
                                if (!string.IsNullOrEmpty(refValue))
                                {
                                    crossRefs.Add(refValue);
                                }
                            }
                        }
                    }
                }
            }
        }

        CrossReferences = crossRefs;

        // Extract BibleImageIds from BibleImages sections (V2 only)
        var imageIds = new List<string>();
        if (sectionsElement != null)
        {
            foreach (var section in sectionsElement.Elements("Section"))
            {
                var bibleImages = section.Element("BibleImages");
                if (bibleImages != null)
                {
                    foreach (var img in bibleImages.Elements("BibleImage"))
                    {
                        var id = img.Attribute("Id")?.Value;
                        if (!string.IsNullOrEmpty(id))
                        {
                            imageIds.Add(id);
                        }
                    }
                }
            }
        }

        BibleImageIds = imageIds;
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
        var entries = new List<MarbleEncyclopediaEntry>();

        var root = doc.Root;
        if (root != null)
        {
            foreach (var entryElement in root.Elements("ThemLex_Entry"))
            {
                entries.Add(new MarbleEncyclopediaEntry(entryElement.ToString()));
            }
        }

        return entries;
    }

    /// <summary>
    /// Gets the text content of a Paragraph element, handling both V1 plain text
    /// and V2 mixed content with child elements.
    /// </summary>
    private static string GetParagraphContent(XElement paragraph)
    {
        // If the paragraph has child elements (V2 format with <image/> etc.),
        // concatenate all text nodes and child element string representations
        if (paragraph.HasElements)
        {
            // Use the inner content: nodes concatenated
            var parts = new List<string>();
            foreach (var node in paragraph.Nodes())
            {
                if (node is XText textNode)
                {
                    parts.Add(textNode.Value);
                }
                else if (node is XElement elem)
                {
                    parts.Add(elem.ToString());
                }
            }

            return string.Concat(parts);
        }

        return paragraph.Value;
    }
}
