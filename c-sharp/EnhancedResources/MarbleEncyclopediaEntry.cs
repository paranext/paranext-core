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
    public static Thematic_Lexicon ParseXml(string encyclopediaXml)
    {
        throw new NotImplementedException("CAP-029: ParseXml not yet implemented");
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
