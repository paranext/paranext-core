using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleEncyclopediaLoaderTests
{
    private static readonly IReadOnlySet<string> NoKnownResources = new HashSet<string>(
        StringComparer.OrdinalIgnoreCase
    );

    [Test]
    public void Load_MissingMblEncPackage_ReturnsEmpty()
    {
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

        var data = MarbleEncyclopediaLoader.Load(
            researchPackages: research,
            haveVersion2Resources: false,
            knownResourceIds: NoKnownResources
        );

        Assert.That(data, Is.SameAs(EncyclopediaData.Empty));
    }

    private const string Flora_V1_Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""0""><Title>Contents</Title><Intro/><Index/><Sections/></ThemLex_Entry>
  <ThemLex_Entry Key=""1.1"">
    <Title>Olive tree</Title><Intro/><Index/>
    <Sections>
      <Section Type=""entry"" Content=""discussion"">
        <Heading>Discussion</Heading><SubHeading/><LanguageSets/>
        <Paragraphs><Paragraph>The olive is a very important tree.</Paragraph></Paragraphs>
      </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    private const string Fauna_V1_Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""2.8"">
    <Title>Camel</Title><Intro/><Index/>
    <Sections><Section Type=""entry"" Content=""discussion"">
      <Heading>Discussion</Heading><SubHeading/><LanguageSets/>
      <Paragraphs><Paragraph>The camel is a beast of burden.</Paragraph></Paragraphs>
    </Section></Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    private const string Realia_V1_Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1.1.8.3"">
    <Title>Winnowing fork</Title><Intro/><Index/>
    <Sections><Section Type=""entry"" Content=""discussion"">
      <Heading>Discussion</Heading><SubHeading/><LanguageSets/>
      <Paragraphs><Paragraph>The winnowing fork separates grain from chaff.</Paragraph></Paragraphs>
    </Section></Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    private const string AbbrevXml =
        @"<?xml version=""1.0""?>
<Abbreviations>
  <Item Key=""NIV"">New International Version</Item>
  <Item Key=""NRSV"">New Revised Standard Version</Item>
  <Item Key=""ESV"">English Standard Version</Item>
</Abbreviations>";

    [Test]
    public void Load_V1Mode_RegistersEntriesUnderEnglishOnly()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", Flora_V1_Xml)
            .WithFile("FAUNA.XML", Fauna_V1_Xml)
            .WithFile("REALIA.XML", Realia_V1_Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Flora),
            Is.True
        );
        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Flora].Keys,
            Is.EquivalentTo(new[] { "en" }),
            "V1 fallback registers entries under 'en' only"
        );

        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Fauna]["en"]
                .Any(e => e.Title == "Camel"),
            Is.True
        );

        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Realia]["en"]
                .Any(e => e.Title == "Winnowing fork"),
            Is.True
        );

        // Key=0 "Contents" entry is a structural TOC element in source XML; the
        // existing MarbleEncyclopediaEntry.ParseAll includes all entries (no filter).
        // EncyclopediaService filters it out downstream. The loader records all entries as-is.
        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Flora]["en"]
                .Any(e => e.Title == "Olive tree"),
            Is.True
        );
    }

    [Test]
    public void Load_V2Mode_EnumeratesLanguageSuffixedFilesPerType()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA_en.xml", Flora_V1_Xml)
            .WithFile("FLORA_zh.xml", Flora_V1_Xml)
            .WithFile("FLORA_zh-Hans.xml", Flora_V1_Xml)
            .WithFile("FLORA_pt-BR.xml", Flora_V1_Xml)
            .WithFile("FAUNA_en.xml", Fauna_V1_Xml)
            .WithFile("REALIA_en.xml", Realia_V1_Xml)
            .WithFile("REALIA_es.xml", Realia_V1_Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: true,
            NoKnownResources
        );

        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Flora].Keys,
            Is.EquivalentTo(new[] { "en", "zh", "zh-Hans", "pt-BR" }),
            "V2 enumeration extracts the full language tag (incl. region) from each FLORA_{lang}.xml filename"
        );
        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Fauna].Keys,
            Is.EquivalentTo(new[] { "en" })
        );
        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Realia].Keys,
            Is.EquivalentTo(new[] { "en", "es" })
        );
    }

    [Test]
    public void Load_V1Mode_SetsArticleContentIsV2False()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true).WithFile(
            "FLORA.XML",
            Flora_V1_Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(data.ArticlesById.Values, Is.Not.Empty);
        Assert.That(data.ArticlesById.Values.All(a => !a.IsV2), Is.True);
    }

    [Test]
    public void Load_V2Mode_SetsArticleContentIsV2True()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true).WithFile(
            "FLORA_en.xml",
            Flora_V1_Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: true,
            NoKnownResources
        );

        Assert.That(data.ArticlesById.Values, Is.Not.Empty);
        Assert.That(data.ArticlesById.Values.All(a => a.IsV2), Is.True);
    }

    [Test]
    public void Load_V2Mode_IgnoresFilesWithoutLanguageSuffix()
    {
        // A bare "FLORA.XML" inside a V2-mode package is legacy-style; it doesn't match the
        // FLORA_*.xml enumeration pattern and so must not be registered under any language.
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", Flora_V1_Xml)
            .WithFile("FLORA_en.xml", Flora_V1_Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: true,
            NoKnownResources
        );

        Assert.That(
            data.EntriesByTypeAndLanguage[EncyclopediaEntryType.Flora].Keys,
            Is.EquivalentTo(new[] { "en" }),
            "Only files matching FLORA_*.xml pattern contribute language-keyed entries"
        );
    }

    [Test]
    public void Load_V2Mode_TypeAbsentFromPackage_OmittedFromMap()
    {
        // Only FLORA files exist; FAUNA and REALIA yield zero matches and must not
        // appear as empty entries in EntriesByTypeAndLanguage.
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true).WithFile(
            "FLORA_en.xml",
            Flora_V1_Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: true,
            NoKnownResources
        );

        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Flora),
            Is.True
        );
        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Fauna),
            Is.False
        );
        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Realia),
            Is.False
        );
    }

    [Test]
    public void Load_WithAbbrevXml_PopulatesAbbreviationMap()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", Flora_V1_Xml)
            .WithFile("FAUNA.XML", Fauna_V1_Xml)
            .WithFile("REALIA.XML", Realia_V1_Xml)
            .WithFile("Abbrev.xml", AbbrevXml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(data.Abbreviations["NIV"], Is.EqualTo("New International Version"));
        Assert.That(data.Abbreviations["NRSV"], Is.EqualTo("New Revised Standard Version"));
        Assert.That(data.Abbreviations["ESV"], Is.EqualTo("English Standard Version"));
        Assert.That(data.Abbreviations, Has.Count.EqualTo(3));
    }

    [Test]
    public void Load_WithoutAbbrevXml_LeavesAbbreviationMapEmpty()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true).WithFile(
            "FLORA.XML",
            Flora_V1_Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(data.Abbreviations, Is.Empty);
    }

    [Test]
    public void Load_WithMalformedAbbrevXml_SkipsAbbreviationsButKeepsEntries()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", Flora_V1_Xml)
            .WithFile("Abbrev.xml", "<<not xml at all>>");
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(
            data.Abbreviations,
            Is.Empty,
            "Malformed Abbrev.xml must be caught and logged; loader still returns other data"
        );
        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Flora),
            Is.True
        );
    }

    [Test]
    public void Load_PopulatesArticlesById_KeyedByTypeAndEntryKey()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", Flora_V1_Xml)
            .WithFile("FAUNA.XML", Fauna_V1_Xml)
            .WithFile("REALIA.XML", Realia_V1_Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(data.ArticlesById.ContainsKey("FLORA:1.1"), Is.True);
        Assert.That(data.ArticlesById["FLORA:1.1"].Title, Is.EqualTo("Olive tree"));

        Assert.That(data.ArticlesById.ContainsKey("FAUNA:2.8"), Is.True);
        Assert.That(data.ArticlesById["FAUNA:2.8"].Title, Is.EqualTo("Camel"));

        Assert.That(data.ArticlesById.ContainsKey("REALIA:1.1.8.3"), Is.True);
        Assert.That(data.ArticlesById["REALIA:1.1.8.3"].Title, Is.EqualTo("Winnowing fork"));
    }

    [Test]
    public void Load_CopiesKnownResourceIdsIntoResult()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true).WithFile(
            "FLORA.XML",
            Flora_V1_Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };
        var knownIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "TECLOT", "NETS" };

        var data = MarbleEncyclopediaLoader.Load(research, haveVersion2Resources: false, knownIds);

        Assert.That(data.KnownResourceIds, Is.EquivalentTo(new[] { "TECLOT", "NETS" }));
    }

    [Test]
    public void Load_MalformedFloraFile_SkipsFloraKeepsOtherTypes()
    {
        var mblEnc = new FakeMarblePackage("MBL_ENC", isResearchData: true)
            .WithFile("FLORA.XML", "<<not-valid-xml>>")
            .WithFile("FAUNA.XML", Fauna_V1_Xml)
            .WithFile("REALIA.XML", Realia_V1_Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["MBL_ENC"] = mblEnc,
        };

        var data = MarbleEncyclopediaLoader.Load(
            research,
            haveVersion2Resources: false,
            NoKnownResources
        );

        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Flora),
            Is.False,
            "Malformed FLORA.XML must be skipped (not throw)"
        );
        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Fauna),
            Is.True
        );
        Assert.That(
            data.EntriesByTypeAndLanguage.ContainsKey(EncyclopediaEntryType.Realia),
            Is.True
        );
    }
}
