using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleEncyclopediaEntry.cs (EXT-067, CAP-029)

/// <summary>
/// V2 encyclopedia entry data model with XML parser.
/// Represents the root element of the Thematic Lexicon XML format.
/// </summary>
public class Thematic_Lexicon
{
    /// <summary>
    /// Array of encyclopedia entries parsed from the XML.
    /// </summary>
    public Thematic_LexiconThemLex_Entry[] ThemLex_Entry { get; set; } =
        Array.Empty<Thematic_LexiconThemLex_Entry>();

    /// <summary>
    /// Parses V2 encyclopedia XML into a structured Thematic_Lexicon object graph.
    /// Uses XDocument/LINQ to parse entries, sections, language sets, and bible images.
    /// </summary>
    /// <param name="encyclopediaXml">V2 encyclopedia XML string</param>
    /// <returns>Parsed Thematic_Lexicon with populated entry array</returns>
    public static Thematic_Lexicon ParseXml(string encyclopediaXml)
    {
        var doc = XDocument.Parse(encyclopediaXml);

        return new Thematic_Lexicon
        {
            ThemLex_Entry = doc.Descendants("ThemLex_Entry").Select(ParseEntry).ToArray(),
        };
    }

    private static Thematic_LexiconThemLex_Entry ParseEntry(XElement entry)
    {
        var bibleImages = new List<BibleImage>();

        return new Thematic_LexiconThemLex_Entry
        {
            Key = entry.Attribute("Key")?.Value,
            Title = entry.Element("Title")?.Value,
            Index = ParseIndex(entry),
            Sections = ParseSections(entry, bibleImages),
            BibleImages = bibleImages.ToArray(),
        };
    }

    private static Thematic_LexiconThemLex_EntryIndexItem[] ParseIndex(XElement entry)
    {
        var indexItems = new List<Thematic_LexiconThemLex_EntryIndexItem>();
        foreach (var indexItem in entry.Descendants("IndexItem"))
        {
            var item = new Thematic_LexiconThemLex_EntryIndexItem();
            item.Number = indexItem.Attribute("Number")?.Value;
            if (item.Number == null)
                continue;
            item.Description = indexItem.Attribute("Description")?.Value;
            item.Target = indexItem.Attribute("Target")?.Value;
            indexItems.Add(item);
        }

        return indexItems.ToArray();
    }

    private static Thematic_LexiconThemLex_EntrySection[] ParseSections(
        XElement entry,
        List<BibleImage> bibleImages
    )
    {
        var sections = new List<Thematic_LexiconThemLex_EntrySection>();

        foreach (var sectionElem in entry.Descendants("Section"))
        {
            var headingElem = sectionElem.Element("Heading");

            sections.Add(
                new Thematic_LexiconThemLex_EntrySection
                {
                    Type = sectionElem.Attribute("Type")?.Value,
                    Content = sectionElem.Attribute("Content")?.Value ?? "",
                    Heading =
                        headingElem != null
                            ? string.Join("", headingElem.Nodes().Select(n => n.ToString()))
                            : "",
                    Paragraphs = sectionElem
                        .Descendants("Paragraph")
                        .Select(p => string.Join("", p.Nodes().Select(n => n.ToString())))
                        .ToArray(),
                    LanguageSets = ParseLanguageSets(sectionElem),
                }
            );

            ParseBibleImages(sectionElem, bibleImages);
        }

        return sections.ToArray();
    }

    // PT9 used Memento.FromXmlString<T>() for deserialization; we use manual LINQ instead.
    // LanguageSets with null Language attribute are filtered out (PT9 behavior).
    private static Thematic_LexiconThemLex_EntrySectionLanguageSet[] ParseLanguageSets(
        XElement sectionElem
    )
    {
        var languageSets = new List<Thematic_LexiconThemLex_EntrySectionLanguageSet>();

        foreach (var elem in sectionElem.Descendants("LanguageSet"))
        {
            string? language = elem.Attribute("Language")?.Value;
            if (language == null)
                continue;

            languageSets.Add(
                new Thematic_LexiconThemLex_EntrySectionLanguageSet
                {
                    Language = language,
                    Lemma = elem.Element("Lemma")?.Value,
                    Transliteration = elem.Element("Transliteration")?.Value,
                    References = elem.Descendants("Reference")
                        .Select(r => ulong.TryParse(r.Value, out var v) ? (ulong?)v : null)
                        .Where(v => v.HasValue)
                        .Select(v => v!.Value)
                        .ToArray(),
                }
            );
        }

        return languageSets.ToArray();
    }

    // PT9 used Memento.FromXmlString<BibleImage>(); we use manual LINQ instead.
    // Images are collected from all sections and placed on the entry.
    private static void ParseBibleImages(XElement sectionElem, List<BibleImage> bibleImages)
    {
        foreach (var imageElem in sectionElem.Descendants("BibleImage"))
        {
            bibleImages.Add(
                new BibleImage
                {
                    Id = imageElem.Attribute("Id")?.Value,
                    MediaType = imageElem.Attribute("Type")?.Value,
                    Collection = imageElem.Element("Collection")?.Value,
                    Path = imageElem.Element("Path")?.Value,
                    FileName = imageElem.Element("FileName")?.Value,
                    Copyright = imageElem.Element("Copyright")?.Value,
                    Caption = imageElem.Element("Caption")?.Value,
                    Description = imageElem.Element("Description")?.Value,
                }
            );
        }
    }
}

/// <summary>
/// Represents a single encyclopedia entry (ThemLex_Entry element).
/// Contains title, index items, sections, and collected bible images.
/// </summary>
public class Thematic_LexiconThemLex_Entry
{
    public string? Key { get; set; }
    public string? Title { get; set; }
    public object? Intro { get; set; }
    public Thematic_LexiconThemLex_EntryIndexItem[] Index { get; set; } =
        Array.Empty<Thematic_LexiconThemLex_EntryIndexItem>();
    public Thematic_LexiconThemLex_EntrySection[] Sections { get; set; } =
        Array.Empty<Thematic_LexiconThemLex_EntrySection>();

    /// <summary>
    /// Bible images collected from all sections in the entry.
    /// V2 data places BibleImage elements within sections, but for convenience
    /// they are collected onto the entry during parsing.
    /// </summary>
    public BibleImage[] BibleImages { get; set; } = Array.Empty<BibleImage>();
}

/// <summary>
/// Index item within an encyclopedia entry.
/// Attributes: Number, Description, Target.
/// </summary>
public class Thematic_LexiconThemLex_EntryIndexItem
{
    public string? Number { get; set; }
    public string? Description { get; set; }
    public string? Target { get; set; }
}

/// <summary>
/// Section within an encyclopedia entry.
/// Contains heading, paragraphs, language sets, and type/content attributes.
/// </summary>
public class Thematic_LexiconThemLex_EntrySection
{
    public string? Heading { get; set; }
    public string? SubHeading { get; set; }
    public Thematic_LexiconThemLex_EntrySectionLanguageSet[] LanguageSets { get; set; } =
        Array.Empty<Thematic_LexiconThemLex_EntrySectionLanguageSet>();
    public string[] Paragraphs { get; set; } = Array.Empty<string>();
    public string? Type { get; set; }
    public string? Content { get; set; }
}

/// <summary>
/// Language set within a section. Contains lemma, transliteration, and
/// scripture references as ulong values (14-digit BBBCCCVVVWWWWW format).
/// </summary>
public class Thematic_LexiconThemLex_EntrySectionLanguageSet
{
    public string? Lemma { get; set; }
    public string? Transliteration { get; set; }
    public ulong[] References { get; set; } = Array.Empty<ulong>();
    public string? Language { get; set; }
}

/// <summary>
/// Bible image data from encyclopedia entries.
/// Parsed from BibleImage XML elements within sections.
/// </summary>
public class BibleImage
{
    public string? Id { get; set; }
    public string? MediaType { get; set; }
    public string? Collection { get; set; }
    public string? Path { get; set; }
    public string? FileName { get; set; }
    public string? Copyright { get; set; }
    public string? Caption { get; set; }
    public string? Description { get; set; }
}
