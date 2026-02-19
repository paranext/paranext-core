using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// V2 encyclopedia entry data model with XML parser.
/// Represents the root element of the Thematic Lexicon XML format.
///
/// === PORTED FROM PT9 ===
/// Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:1-476
/// Method: Thematic_Lexicon and related data model classes
/// Maps to: EXT-067, BHV-414
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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:35-47
    // Method: Thematic_Lexicon.ParseXml()
    // Maps to: EXT-067
    public static Thematic_Lexicon ParseXml(string encyclopediaXml)
    {
        var doc = XDocument.Parse(encyclopediaXml);

        var entries = new List<Thematic_LexiconThemLex_Entry>();
        foreach (var entry in doc.Descendants("ThemLex_Entry"))
            entries.Add(ParseEntry(entry));

        var result = new Thematic_Lexicon();
        result.ThemLex_Entry = entries.ToArray();

        return result;
    }

    #region private helper methods

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:53-66
    // Method: Thematic_Lexicon.ParseEntry()
    // Maps to: EXT-067
    private static Thematic_LexiconThemLex_Entry ParseEntry(XElement entry)
    {
        var result = new Thematic_LexiconThemLex_Entry();
        var bibleImages = new List<BibleImage>();

        result.Key = entry.Attribute("Key")?.Value;
        result.Title = entry.Element("Title")?.Value;
        result.Index = ParseIndex(entry);
        result.Sections = ParseSections(entry, bibleImages);
        result.BibleImages = bibleImages.ToArray();

        return result;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:68-83
    // Method: Thematic_Lexicon.ParseIndex()
    // Maps to: EXT-067
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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:85-114
    // Method: Thematic_Lexicon.ParseSections()
    // Maps to: EXT-067
    private static Thematic_LexiconThemLex_EntrySection[] ParseSections(
        XElement entry,
        List<BibleImage> bibleImages
    )
    {
        var sections = new List<Thematic_LexiconThemLex_EntrySection>();

        foreach (var sectionElem in entry.Descendants("Section"))
        {
            var section = new Thematic_LexiconThemLex_EntrySection();
            section.Type = sectionElem.Attribute("Type")?.Value;
            section.Content = sectionElem.Attribute("Content")?.Value ?? "";
            var headingElem = sectionElem.Element("Heading");
            section.Heading =
                headingElem != null
                    ? string.Join("", headingElem.Nodes().Select(n => n.ToString()))
                    : "";

            var paragraphs = new List<string>();
            foreach (var paragraphElem in sectionElem.Descendants("Paragraph"))
            {
                // can't just take the value since there are sub-elements for formatting
                paragraphs.Add(string.Join("", paragraphElem.Nodes().Select(n => n.ToString())));
            }

            section.Paragraphs = paragraphs.ToArray();

            section.LanguageSets = ParseLanguageSets(sectionElem);

            ParseBibleImages(sectionElem, bibleImages);

            sections.Add(section);
        }

        return sections.ToArray();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:116-139
    // Method: Thematic_Lexicon.ParseLanguageSets()
    // Maps to: EXT-067
    // EXPLANATION:
    // PT9 uses Memento.FromXmlString<T>() to deserialize each LanguageSet element.
    // In PT10 we use manual LINQ parsing instead since Memento is not available.
    // LanguageSets with null Language attribute are filtered out (PT9 behavior).
    private static Thematic_LexiconThemLex_EntrySectionLanguageSet[] ParseLanguageSets(
        XElement sectionElem
    )
    {
        var languageSets = new List<Thematic_LexiconThemLex_EntrySectionLanguageSet>();
        foreach (var languageSetElem in sectionElem.Descendants("LanguageSet"))
        {
            var languageSet = new Thematic_LexiconThemLex_EntrySectionLanguageSet();
            languageSet.Language = languageSetElem.Attribute("Language")?.Value;

            // PT9 behavior: skip sets without a Language attribute
            if (languageSet.Language == null)
                continue;

            languageSet.Lemma = languageSetElem.Element("Lemma")?.Value;
            languageSet.Transliteration = languageSetElem.Element("Transliteration")?.Value;

            var references = new List<ulong>();
            foreach (var refElem in languageSetElem.Descendants("Reference"))
            {
                if (ulong.TryParse(refElem.Value, out var refValue))
                    references.Add(refValue);
            }
            languageSet.References = references.ToArray();

            languageSets.Add(languageSet);
        }

        return languageSets.ToArray();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleEncyclopediaEntry.cs:141-148
    // Method: Thematic_Lexicon.ParseBibleImages()
    // Maps to: EXT-067
    // EXPLANATION:
    // PT9 uses Memento.FromXmlString<BibleImage>() to deserialize each BibleImage element.
    // In PT10 we use manual LINQ parsing instead since Memento is not available.
    // Images are collected from all sections and placed on the entry.
    private static void ParseBibleImages(XElement sectionElem, List<BibleImage> bibleImages)
    {
        foreach (var imageElem in sectionElem.Descendants("BibleImage"))
        {
            var image = new BibleImage();
            image.Id = imageElem.Attribute("Id")?.Value;
            image.MediaType = imageElem.Attribute("Type")?.Value;
            image.Collection = imageElem.Element("Collection")?.Value;
            image.Path = imageElem.Element("Path")?.Value;
            image.FileName = imageElem.Element("FileName")?.Value;
            image.Copyright = imageElem.Element("Copyright")?.Value;
            image.Caption = imageElem.Element("Caption")?.Value;
            image.Description = imageElem.Element("Description")?.Value;
            bibleImages.Add(image);
        }
    }

    #endregion
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
