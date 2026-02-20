using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-002: ParseScriptureTokens.
/// Validates parsing of USX/Emdros-format XML into flat MarbleToken lists.
/// Covers all token types: Book, Chapter, ParagraphStart/End, CharacterStart/End,
/// Verse, TextLink (with all 6 link attributes), Note, Text, CrossRef.
///
/// PT9 Source: Paratext/Marble/MarbleDataParser.cs:65-173
/// Golden Master: gm-003-xml-to-token-parsing
/// Extraction: EXT-055
/// Behavior: BHV-600
/// </summary>
[TestFixture]
public class MarbleDataParserTests
{
    #region Test XML Data

    // Based on PT9 MarbleDataParserTests.cs sampeleResultGen1 (GEN 1:1-2)
    // This is the canonical golden master data from the PT9 test suite.
    private const string Gen1SampleXml = """
        <?xml version='1.0' encoding='utf-8'?>
        <EmdrosDump>
        <usx version="2.0">
        <book code="GEN">
        <usx_book style="id" code="GEN">
        <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
        <para style="s1">The Creation of the World</para>
        <para style="p">
        <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
        In the
        <note style="x" caller="+">
        <char style="xo" closed="false">1:1 </char>
        <char style="xt" closed="false">Job 38:4-7</char>
        </note>
        <wg target_links="00100100100004" strong="H7225" thematic_links="" lexical_links="SDBH:רֵאשִׁית:001001000" textual_links="HOTTP0" image_links="" map_links="" >
        beginning,
        </wg>
        <char style="nd" closed="">
        <wg target_links="00100100100008" strong="H0430" thematic_links="" lexical_links="SDBH:אֱלֹהִים:001003000" textual_links="HOTTP0" image_links="" map_links="" >
        God
        </wg>
        </char>
        <wg target_links="00100100100006" strong="H1254a" thematic_links="" lexical_links="SDBH:ברא:001002000" textual_links="HOTTP0" image_links="" map_links="" >
        created
        </wg>
        the
        <wg target_links="00100100100014" strong="H8064" thematic_links="" lexical_links="SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001" textual_links="" image_links="" map_links="" >
        heavens
        </wg>
        and the
        <wg target_links="00100100100022" strong="H0776" thematic_links="" lexical_links="SDBH:אֶרֶץ:001001000" textual_links="" image_links="" map_links="" >
        earth.
        </wg>
        <verse chapter="1" style="v" code="GEN" pubnumber="2"/>
        The
        <wg target_links="00100100200006" strong="H0776" thematic_links="" lexical_links="SDBH:אֶרֶץ:001001000" textual_links="" image_links="" map_links="" >
        earth
        </wg>
        <wg target_links="00100100200008" strong="H1961" thematic_links="" lexical_links="SDBH:היה:001001000" textual_links="" image_links="" map_links="" >
        was
        </wg>
        <note style="x" caller="+"><char style="xo" closed="false">1:2 </char><char style="xt" closed="false">Jer. 4:23</char></note>
        <wg target_links="00100100200010" strong="H8414" thematic_links="" lexical_links="SDBH:תֹּהוּ:001001000" textual_links="" image_links="" map_links="" >
        without form
        </wg>
        and
        <wg target_links="00100100200014" strong="H0922" thematic_links="" lexical_links="SDBH:בֹּהוּ:001001000" textual_links="" image_links="" map_links="" >
        void,
        </wg>
        and
        <wg target_links="00100100200018" strong="H2822" thematic_links="" lexical_links="SDBH:חשׁךְ:001001000;SDBH:חֹשֶׁךְ:001001000" textual_links="" image_links="" map_links="" >
        darkness
        </wg>
        was
        <wg target_links="00100100200020" strong="H5921a" thematic_links="" lexical_links="SDBH:עַל:001002000" textual_links="" image_links="" map_links="" >
        over
        </wg>
        the
        <wg target_links="00100100200022" strong="H6440" thematic_links="" lexical_links="SDBH:פָּנֶה:001003000" textual_links="" image_links="" map_links="" >
        face
        </wg>
        of the
        <wg target_links="00100100200024" strong="H8415" thematic_links="" lexical_links="SDBH:תְּהוֹם:001001000" textual_links="" image_links="" map_links="" >
        deep.
        </wg>
        And the
        <wg target_links="00100100200028" strong="H7307" thematic_links="" lexical_links="SDBH:רוּחַ:001001000;SDBH:רוּחַ:001001001;SDBH:רוּחַ:001001017;SDBH:רוּחַ:002001000" textual_links="" image_links="" map_links="" >
        Spirit
        </wg>
        of
        <wg target_links="00100100200030" strong="H0430" thematic_links="" lexical_links="SDBH:אֱלֹהִים:001003000;SDBH:אֱלֹהִים:001003060;SDBH:אֱלֹהִים:001009000;SDBH:אֱלֹהִים:001009004" textual_links="" image_links="" map_links="" >
        God
        </wg>
        was
        <wg target_links="00100100200032" strong="H7363b" thematic_links="" lexical_links="SDBH:רחף:001002000" textual_links="" image_links="" map_links="" >
        hovering
        </wg>
        <wg target_links="00100100200034" strong="H5921a" thematic_links="" lexical_links="SDBH:עַל:001002000" textual_links="" image_links="" map_links="" >
        over
        </wg>
        the
        <wg target_links="00100100200036" strong="H6440" thematic_links="" lexical_links="SDBH:פָּנֶה:001003000" textual_links="" image_links="" map_links="" >
        face
        </wg>
        of the
        <wg target_links="00100100200040" strong="H4325" thematic_links="" lexical_links="SDBH:מַיִם:001001000" textual_links="" image_links="" map_links="" >
        waters.
        </wg>
        </para>
        </usx_book>
        </book>
        </usx>
        </EmdrosDump>
        """;

    // Minimal XML for isolated token type testing
    private const string MinimalBookXml =
        """<usx_book style="id" code="GEN"></usx_book>""";

    private const string MinimalChapterXml =
        """<usx_book code="GEN"><chapter number="1"/></usx_book>""";

    private const string ChapterWithChapterAttrXml =
        """<usx_book code="GEN"><chapter chapter="5"/></usx_book>""";

    private const string MinimalVerseXml =
        """<usx_book code="GEN"><chapter number="1"/><para style="p"><verse pubnumber="1"/></para></usx_book>""";

    private const string MinimalParagraphXml =
        """<usx_book code="GEN"><para style="p">text</para></usx_book>""";

    private const string MinimalRowXml =
        """<usx_book code="GEN"><row><cell style="tc1">text</cell></row></usx_book>""";

    private const string MinimalCharXml =
        """<usx_book code="GEN"><para style="p"><char style="nd">text</char></para></usx_book>""";

    private const string MinimalNoteXml =
        """<usx_book code="GEN"><para style="p"><note caller="+"><char style="ft">footnote text</char></note></para></usx_book>""";

    private const string MinimalTextLinkXml =
        """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="G3056" lexical_links="SDBG:logos:001001" thematic_links="th1" image_links="img1" map_links="map1">word</wg></para></usx_book>""";

    private const string WgWithoutLinksXml =
        """<usx_book code="GEN"><para style="p"><wg>plain text</wg></para></usx_book>""";

    private const string MinimalRefXml =
        """<usx_book code="GEN"><para style="p"><ref loc="GEN 1:1">Genesis 1:1</ref></para></usx_book>""";

    private const string SectionHeadingXml =
        """<usx_book code="GEN"><chapter number="1"/><para style="s1">Section Title</para><para style="p"><verse pubnumber="1"/></para></usx_book>""";

    private const string AllLinkTypesXml =
        """<usx_book code="GEN"><para style="p"><wg target_links="tgt1" strong="H7225" lexical_links="SDBH:test:001001" thematic_links="thm1" textual_links="txt1" image_links="img1" map_links="map1">word</wg></para></usx_book>""";

    private const string IgnoredElementsXml =
        """<usx_book code="GEN"><optbreak/><linkedReference/><book/><rem/><table/><figure/><unmatched/></usx_book>""";

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-002.
    /// Verifies all gm-003 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-003:
    /// - XTP-01: Basic chapter with verse and text link
    /// - XTP-02: Multiple link attributes on wg element
    /// - XTP-03: Section heading paragraph
    /// - XTP-04: Footnote element
    /// - XTP-05: Table with rows and cells
    ///
    /// Also validates PT9 golden master data (GEN 1:1-2 token counts).
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Description(
        "Acceptance test: USX/Emdros XML converted to flat token list with correct types and attributes"
    )]
    public void ConvertToTokens_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // XTP-01: Basic chapter with verse and text link
            var xtp01Xml =
                """<usx_book><chapter number="1"/><para style="p"><verse pubnumber="1"/><wg target_links="SDBG:logos:001001" strong="G3056" lexical_links="SDBG:logos:001001">In the beginning</wg></para></usx_book>""";
            var xtp01Tokens = MarbleDataParser.ConvertToTokens(xtp01Xml);
            var xtp01Types = xtp01Tokens.Select(t => t.Type).ToList();
            Assert.That(
                xtp01Types,
                Does.Contain(MarbleTokenType.Book),
                "XTP-01: Must contain Book token"
            );
            Assert.That(
                xtp01Types,
                Does.Contain(MarbleTokenType.Chapter),
                "XTP-01: Must contain Chapter token"
            );
            Assert.That(
                xtp01Types,
                Does.Contain(MarbleTokenType.ParagraphStart),
                "XTP-01: Must contain ParagraphStart token"
            );
            Assert.That(
                xtp01Types,
                Does.Contain(MarbleTokenType.Verse),
                "XTP-01: Must contain Verse token"
            );
            Assert.That(
                xtp01Types,
                Does.Contain(MarbleTokenType.TextLink),
                "XTP-01: Must contain TextLink token"
            );

            // XTP-02: Multiple link attributes on wg element
            var xtp02Tokens = MarbleDataParser.ConvertToTokens(AllLinkTypesXml);
            var xtp02TextLink = xtp02Tokens.First(t => t.Type == MarbleTokenType.TextLink);
            Assert.That(
                xtp02TextLink.TargetLinks,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: target_links must be captured"
            );
            Assert.That(
                xtp02TextLink.Strong,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: strong must be captured"
            );
            Assert.That(
                xtp02TextLink.LexicalLinks,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: lexical_links must be captured"
            );
            Assert.That(
                xtp02TextLink.ThematicLinks,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: thematic_links must be captured"
            );
            Assert.That(
                xtp02TextLink.ImageLinks,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: image_links must be captured"
            );
            Assert.That(
                xtp02TextLink.MapLinks,
                Is.Not.Null.And.Not.Empty,
                "XTP-02: map_links must be captured"
            );

            // XTP-03: Section heading paragraph creates ParagraphStart
            var xtp03Tokens = MarbleDataParser.ConvertToTokens(SectionHeadingXml);
            var xtp03Paras = xtp03Tokens
                .Where(t => t.Type == MarbleTokenType.ParagraphStart)
                .ToList();
            Assert.That(
                xtp03Paras,
                Has.Count.GreaterThanOrEqualTo(2),
                "XTP-03: Section heading and content paragraph both create ParagraphStart"
            );
            Assert.That(
                xtp03Paras.Any(p => p.Style == "s1"),
                Is.True,
                "XTP-03: Section heading must have style 's1'"
            );

            // XTP-04: Footnote element produces Note token
            var xtp04Tokens = MarbleDataParser.ConvertToTokens(MinimalNoteXml);
            Assert.That(
                xtp04Tokens.Any(t => t.Type == MarbleTokenType.Note),
                Is.True,
                "XTP-04: Note element must produce Note token"
            );

            // XTP-05: Table with rows and cells
            var xtp05Tokens = MarbleDataParser.ConvertToTokens(MinimalRowXml);
            Assert.That(
                xtp05Tokens.Any(t => t.Type == MarbleTokenType.ParagraphStart),
                Is.True,
                "XTP-05: Row creates ParagraphStart token"
            );
            Assert.That(
                xtp05Tokens.Any(t => t.Type == MarbleTokenType.CharacterStart),
                Is.True,
                "XTP-05: Cell creates CharacterStart token"
            );

            // PT9 golden master: GEN 1:1-2 token counts
            var gen1Tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.Book),
                Is.EqualTo(1),
                "GM: GEN 1:1-2 must have 1 Book token"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.Chapter),
                Is.EqualTo(1),
                "GM: GEN 1:1-2 must have 1 Chapter token"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.ParagraphStart),
                Is.EqualTo(2),
                "GM: GEN 1:1-2 must have 2 ParagraphStart tokens (s1 + p)"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.ParagraphEnd),
                Is.EqualTo(2),
                "GM: GEN 1:1-2 must have 2 ParagraphEnd tokens"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.CharacterStart),
                Is.EqualTo(1),
                "GM: GEN 1:1-2 must have 1 CharacterStart token (nd)"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.CharacterEnd),
                Is.EqualTo(1),
                "GM: GEN 1:1-2 must have 1 CharacterEnd token"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.Note),
                Is.EqualTo(2),
                "GM: GEN 1:1-2 must have 2 Note tokens"
            );
            Assert.That(
                gen1Tokens.Count(t => t.Type == MarbleTokenType.TextLink),
                Is.EqualTo(19),
                "GM: GEN 1:1-2 must have 19 TextLink tokens"
            );
        });
    }

    #endregion

    #region Contract Tests: Token Type - Book

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("usx_book element produces Book token with code attribute as text")]
    public void ConvertToTokens_UsxBookElement_ProducesBookToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalBookXml);

        var bookToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.Book);
        Assert.That(bookToken, Is.Not.Null, "Must produce a Book token");
        Assert.That(bookToken!.Text, Is.EqualTo("GEN"), "Book token text must be the code attr");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Book token must be the first token in the output")]
    public void ConvertToTokens_UsxBookElement_IsFirstToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalBookXml);

        Assert.That(tokens, Is.Not.Empty, "Must produce tokens");
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book), "Book must be first token");
    }

    #endregion

    #region Contract Tests: Token Type - Chapter

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("chapter element produces Chapter token with number attribute")]
    public void ConvertToTokens_ChapterElement_ProducesChapterToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalChapterXml);

        var chapterToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.Chapter);
        Assert.That(chapterToken, Is.Not.Null, "Must produce a Chapter token");
        Assert.That(chapterToken!.Text, Is.EqualTo("1"), "Chapter text must be the number");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description(
        "chapter element with 'chapter' attribute (not 'number') uses chapter attr as fallback"
    )]
    public void ConvertToTokens_ChapterWithChapterAttr_FallsBackToChapterAttr()
    {
        var tokens = MarbleDataParser.ConvertToTokens(ChapterWithChapterAttrXml);

        var chapterToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.Chapter);
        Assert.That(chapterToken, Is.Not.Null, "Must produce a Chapter token");
        Assert.That(
            chapterToken!.Text,
            Is.EqualTo("5"),
            "Chapter text must use 'chapter' attr when 'number' is absent"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("chapter element does not process child elements")]
    public void ConvertToTokens_ChapterElement_DoesNotProcessChildren()
    {
        // PT9: processChildElements = false for chapter
        var xml =
            """<usx_book code="GEN"><chapter number="1"><wg target_links="tl1" strong="G1">child</wg></chapter></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.False,
            "Chapter must not process child elements"
        );
    }

    #endregion

    #region Contract Tests: Token Type - Paragraph

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("para element produces ParagraphStart and ParagraphEnd tokens with style")]
    public void ConvertToTokens_ParaElement_ProducesParagraphStartAndEnd()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalParagraphXml);

        var paraStart = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.ParagraphStart);
        Assert.That(paraStart, Is.Not.Null, "Must produce ParagraphStart");
        Assert.That(paraStart!.Style, Is.EqualTo("p"), "ParagraphStart must have style 'p'");

        var paraEnd = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.ParagraphEnd);
        Assert.That(paraEnd, Is.Not.Null, "Must produce ParagraphEnd");
        Assert.That(paraEnd!.Style, Is.EqualTo("p"), "ParagraphEnd must have same style");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("row element produces ParagraphStart token (same as para)")]
    public void ConvertToTokens_RowElement_ProducesParagraphStart()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalRowXml);

        var paraStart = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.ParagraphStart);
        Assert.That(paraStart, Is.Not.Null, "Row must produce ParagraphStart token");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("para processes child elements (verse, wg, text, note, etc.)")]
    public void ConvertToTokens_ParaElement_ProcessesChildren()
    {
        var xml =
            """<usx_book code="GEN"><para style="p"><verse pubnumber="1"/><wg target_links="tl1" strong="G1">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Verse),
            Is.True,
            "Para must process child verse elements"
        );
        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "Para must process child wg elements"
        );
    }

    #endregion

    #region Contract Tests: Token Type - Character

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("char element produces CharacterStart and CharacterEnd tokens with style")]
    public void ConvertToTokens_CharElement_ProducesCharacterStartAndEnd()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalCharXml);

        var charStart = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.CharacterStart);
        Assert.That(charStart, Is.Not.Null, "Must produce CharacterStart");
        Assert.That(charStart!.Style, Is.EqualTo("nd"), "CharacterStart must have style");

        var charEnd = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.CharacterEnd);
        Assert.That(charEnd, Is.Not.Null, "Must produce CharacterEnd");
        Assert.That(charEnd!.Style, Is.EqualTo("nd"), "CharacterEnd must have same style");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("cell element produces CharacterStart token (same as char)")]
    public void ConvertToTokens_CellElement_ProducesCharacterStart()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalRowXml);

        var charStart = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.CharacterStart);
        Assert.That(charStart, Is.Not.Null, "Cell must produce CharacterStart token");
        Assert.That(charStart!.Style, Is.EqualTo("tc1"), "Cell style must be preserved");
    }

    #endregion

    #region Contract Tests: Token Type - Verse

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("verse element produces Verse token with pubnumber")]
    public void ConvertToTokens_VerseElement_ProducesVerseToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalVerseXml);

        var verseToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.Verse);
        Assert.That(verseToken, Is.Not.Null, "Must produce a Verse token");
        Assert.That(
            verseToken!.Text,
            Is.EqualTo("1"),
            "Verse token text must be the pubnumber"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("verse element does not process child elements")]
    public void ConvertToTokens_VerseElement_DoesNotProcessChildren()
    {
        // PT9: processChildElements = false for verse
        var xml =
            """<usx_book code="GEN"><para style="p"><verse pubnumber="1"><wg target_links="tl1" strong="G1">child</wg></verse></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.False,
            "Verse must not process child elements"
        );
    }

    #endregion

    #region Contract Tests: Token Type - Note

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("note element produces Note token with outer XML as text")]
    public void ConvertToTokens_NoteElement_ProducesNoteToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalNoteXml);

        var noteToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.Note);
        Assert.That(noteToken, Is.Not.Null, "Must produce a Note token");
        Assert.That(
            noteToken!.Text,
            Does.Contain("note"),
            "Note token text must contain the outer XML"
        );
        Assert.That(
            noteToken.Text,
            Does.Contain("footnote text"),
            "Note token text must contain the note content"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("note element does not process child elements")]
    public void ConvertToTokens_NoteElement_DoesNotProcessChildren()
    {
        // PT9: processChildElements = false for note
        var tokens = MarbleDataParser.ConvertToTokens(MinimalNoteXml);

        // note contains char children, but they must not produce separate tokens
        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.CharacterStart),
            Is.EqualTo(0),
            "Note must not process child char elements as separate tokens"
        );
    }

    #endregion

    #region Contract Tests: Token Type - TextLink (wg with links)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("wg element with target_links produces TextLink token with text content")]
    public void ConvertToTokens_WgWithTargetLinks_ProducesTextLinkToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalTextLinkXml);

        var textLink = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.TextLink);
        Assert.That(textLink, Is.Not.Null, "Must produce a TextLink token");
        Assert.That(
            textLink!.Text,
            Is.EqualTo("word"),
            "TextLink text must be the wg element value"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("TextLink token captures all 6 link attribute types")]
    public void ConvertToTokens_WgWithAllLinks_CapturesAllAttributes()
    {
        var tokens = MarbleDataParser.ConvertToTokens(AllLinkTypesXml);

        var textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);

        Assert.Multiple(() =>
        {
            Assert.That(
                textLink.TargetLinks,
                Is.EqualTo("tgt1"),
                "target_links must be captured"
            );
            Assert.That(textLink.Strong, Is.EqualTo("H7225"), "strong must be captured");
            Assert.That(
                textLink.LexicalLinks,
                Is.EqualTo("SDBH:test:001001"),
                "lexical_links must be captured"
            );
            Assert.That(
                textLink.ThematicLinks,
                Is.EqualTo("thm1"),
                "thematic_links must be captured"
            );
            Assert.That(
                textLink.TextualLinks,
                Is.EqualTo("txt1"),
                "textual_links must be captured"
            );
            Assert.That(textLink.ImageLinks, Is.EqualTo("img1"), "image_links must be captured");
            Assert.That(textLink.MapLinks, Is.EqualTo("map1"), "map_links must be captured");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Description("wg element with strongs attribute (alt spelling) produces TextLink token")]
    public void ConvertToTokens_WgWithStrongsAttr_ProducesTextLinkToken()
    {
        // PT9 line 100 checks both "target_links" and "strongs" to decide if it's a text link
        var xml =
            """<usx_book code="GEN"><para style="p"><wg strongs="G3056">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "wg with 'strongs' attr must produce TextLink token"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("wg element without links or strongs produces Text token")]
    public void ConvertToTokens_WgWithoutLinks_ProducesTextToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(WgWithoutLinksXml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.False,
            "wg without links must not produce TextLink"
        );
        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Text),
            Is.True,
            "wg without links must produce Text token"
        );
        var textToken = tokens.First(t => t.Type == MarbleTokenType.Text);
        Assert.That(
            textToken.Text,
            Is.EqualTo("plain text"),
            "Text token must contain the inner text of wg"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Description("wg element does not process child elements")]
    public void ConvertToTokens_WgElement_DoesNotProcessChildren()
    {
        // PT9: processChildElements = false for wg
        var tokens = MarbleDataParser.ConvertToTokens(MinimalTextLinkXml);

        // wg should not produce additional sub-tokens from its text content
        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.TextLink),
            Is.EqualTo(1),
            "wg must produce exactly one TextLink, not process children"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty link attribute values are normalized to null on TextLink tokens")]
    public void ConvertToTokens_EmptyLinkAttrs_NormalizedToNull()
    {
        // PT9 normalizes empty strings to null via property setter
        var xml =
            """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="H7225" thematic_links="" lexical_links="SDBH:test:001001" textual_links="" image_links="" map_links="">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);

        Assert.Multiple(() =>
        {
            Assert.That(
                textLink.ThematicLinks,
                Is.Null,
                "Empty thematic_links must be null"
            );
            Assert.That(
                textLink.TextualLinks,
                Is.Null,
                "Empty textual_links must be null"
            );
            Assert.That(textLink.ImageLinks, Is.Null, "Empty image_links must be null");
            Assert.That(textLink.MapLinks, Is.Null, "Empty map_links must be null");
            // Non-empty values must be preserved
            Assert.That(
                textLink.TargetLinks,
                Is.EqualTo("tl1"),
                "Non-empty target_links preserved"
            );
            Assert.That(
                textLink.LexicalLinks,
                Is.EqualTo("SDBH:test:001001"),
                "Non-empty lexical_links preserved"
            );
        });
    }

    #endregion

    #region Contract Tests: Token Type - CrossRef (ref element)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("ref element with parseable loc produces CrossRef token with verse reference")]
    public void ConvertToTokens_RefElement_ProducesCrossRefToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(MinimalRefXml);

        var refToken = tokens.FirstOrDefault(t => t.Type == MarbleTokenType.CrossRef);
        Assert.That(refToken, Is.Not.Null, "Must produce a CrossRef token");
        Assert.That(
            refToken!.Text,
            Is.EqualTo("Genesis 1:1"),
            "CrossRef text must be the element value"
        );
        Assert.That(
            refToken.VerseRef,
            Is.Not.Null,
            "CrossRef must have a VerseRef when loc is parseable"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("ref element with unparseable loc produces no token")]
    public void ConvertToTokens_RefWithUnparseableLoc_ProducesNoToken()
    {
        // PT9: Only creates Reference token if VerseRef.IsParseable(verseRef)
        var xml =
            """<usx_book code="GEN"><para style="p"><ref loc="INVALID">text</ref></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.CrossRef),
            Is.False,
            "ref with unparseable loc must not produce CrossRef token"
        );
    }

    #endregion

    #region Contract Tests: Token Type - Text (plain text nodes)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("Text nodes within para produce Text tokens")]
    public void ConvertToTokens_TextNodesInPara_ProduceTextTokens()
    {
        var xml =
            """<usx_book code="GEN"><para style="p">some text content</para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Text),
            Is.True,
            "Text nodes must produce Text tokens"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Whitespace-only text nodes with no line breaks are preserved")]
    public void ConvertToTokens_WhitespaceWithoutLineBreaks_Preserved()
    {
        // PT9: nodeValue.Any(c => !char.IsWhiteSpace(c)) || nodeValue.All(c => c != '\n')
        // Whitespace without newlines passes the second condition and is preserved
        var xml =
            """<usx_book code="GEN"><para style="p"><verse pubnumber="1"/>  <wg target_links="tl1" strong="G1">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        // The space between verse and wg should be preserved as a Text token
        var textTokens = tokens.Where(t => t.Type == MarbleTokenType.Text).ToList();
        Assert.That(
            textTokens.Count,
            Is.GreaterThan(0),
            "Whitespace between elements should be preserved as Text tokens"
        );
    }

    #endregion

    #region Contract Tests: Ignored Elements

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("optbreak, linkedReference, book, rem, table, figure, unmatched are skipped")]
    public void ConvertToTokens_IgnoredElements_ProduceNoTokens()
    {
        var tokens = MarbleDataParser.ConvertToTokens(IgnoredElementsXml);

        // Only the usx_book element should produce a Book token; all children are ignored
        Assert.That(
            tokens.Count,
            Is.EqualTo(1),
            "Only Book token should be produced; all other elements are ignored"
        );
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book));
    }

    #endregion

    #region Contract Tests: Document Order

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Token order must match document order exactly")]
    public void ConvertToTokens_DocumentOrder_Preserved()
    {
        var xml =
            """<usx_book code="GEN"><chapter number="1"/><para style="p"><verse pubnumber="1"/><wg target_links="tl1" strong="G1">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);
        var types = tokens.Select(t => t.Type).ToList();

        // Expected order: Book, Chapter, ParagraphStart, Verse, TextLink, ParagraphEnd
        Assert.That(types.IndexOf(MarbleTokenType.Book), Is.EqualTo(0), "Book must be first");
        Assert.That(
            types.IndexOf(MarbleTokenType.Chapter),
            Is.GreaterThan(types.IndexOf(MarbleTokenType.Book)),
            "Chapter must follow Book"
        );
        Assert.That(
            types.IndexOf(MarbleTokenType.ParagraphStart),
            Is.GreaterThan(types.IndexOf(MarbleTokenType.Chapter)),
            "ParagraphStart must follow Chapter"
        );
        Assert.That(
            types.IndexOf(MarbleTokenType.Verse),
            Is.GreaterThan(types.IndexOf(MarbleTokenType.ParagraphStart)),
            "Verse must follow ParagraphStart"
        );
        Assert.That(
            types.IndexOf(MarbleTokenType.TextLink),
            Is.GreaterThan(types.IndexOf(MarbleTokenType.Verse)),
            "TextLink must follow Verse"
        );
        Assert.That(
            types.LastIndexOf(MarbleTokenType.ParagraphEnd),
            Is.EqualTo(types.Count - 1),
            "ParagraphEnd must be last"
        );
    }

    #endregion

    #region Contract Tests: Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Null input returns empty token list")]
    public void ConvertToTokens_NullInput_ReturnsEmptyList()
    {
        var tokens = MarbleDataParser.ConvertToTokens(null!);

        Assert.That(tokens, Is.Empty, "Null input must return empty list");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty string input returns empty token list")]
    public void ConvertToTokens_EmptyString_ReturnsEmptyList()
    {
        var tokens = MarbleDataParser.ConvertToTokens(string.Empty);

        Assert.That(tokens, Is.Empty, "Empty string must return empty list");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("XML without usx_book element returns empty token list")]
    public void ConvertToTokens_NoUsxBookElement_ReturnsEmptyList()
    {
        // PT9 skips elements before usx_book; if no usx_book found, nothing happens
        var xml = """<EmdrosDump><usx><book code="GEN"/></usx></EmdrosDump>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens,
            Is.Empty,
            "XML without usx_book element must return empty list"
        );
    }

    #endregion

    #region Extraction Tests: EXT-055 Specific Behaviors

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("EmdrosDump wrapper is handled -- parser finds usx_book inside it")]
    public void ConvertToTokens_WithEmdrosDumpWrapper_ParsesUsxBook()
    {
        var xml =
            """<?xml version='1.0' encoding='utf-8'?><EmdrosDump><usx version="2.0"><book code="GEN"><usx_book style="id" code="GEN"><chapter number="1"/></usx_book></book></usx></EmdrosDump>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Book),
            Is.True,
            "Must find and parse usx_book inside EmdrosDump wrapper"
        );
        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Chapter),
            Is.True,
            "Must parse chapter inside usx_book"
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("TextLink with semicolon-separated lexical links preserves full string")]
    public void ConvertToTokens_MultipleLinksInLexicalLinks_PreservesFullString()
    {
        var xml =
            """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="H8064" lexical_links="SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001">heavens</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);
        Assert.That(
            textLink.LexicalLinks,
            Is.EqualTo("SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001"),
            "Must preserve full semicolon-separated lexical links string"
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-128")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("TextLink with textual_links (HOTTP format) preserves the value")]
    public void ConvertToTokens_TextualLinksAttribute_Preserved()
    {
        var xml =
            """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="H7225" textual_links="HOTTP0" lexical_links="SDBH:test:001001">word</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);
        Assert.That(
            textLink.TextualLinks,
            Is.EqualTo("HOTTP0"),
            "textual_links must be preserved"
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("Section heading para (style 's1') produces ParagraphStart with style")]
    public void ConvertToTokens_SectionHeadingPara_HasCorrectStyle()
    {
        var tokens = MarbleDataParser.ConvertToTokens(SectionHeadingXml);

        var sectionHead = tokens
            .Where(t => t.Type == MarbleTokenType.ParagraphStart && t.Style == "s1")
            .ToList();
        Assert.That(
            sectionHead,
            Has.Count.EqualTo(1),
            "Section heading para must produce ParagraphStart with style 's1'"
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-055")]
    [Description("Section heading text content is captured as a Text token")]
    public void ConvertToTokens_SectionHeadingText_CapturedAsTextToken()
    {
        var tokens = MarbleDataParser.ConvertToTokens(SectionHeadingXml);

        // The text "Section Title" inside the s1 para should become a Text token
        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Text && t.Text == "Section Title"),
            Is.True,
            "Section heading text must be captured as a Text token"
        );
    }

    #endregion

    #region Golden Master Tests: PT9 GEN 1:1-2 Token Counts

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 1 Book token")]
    public void GoldenMaster_Gen1_BookTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.Book),
            Is.EqualTo(1),
            "PT9 GM: 1 Book token"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 1 Chapter token")]
    public void GoldenMaster_Gen1_ChapterTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.Chapter),
            Is.EqualTo(1),
            "PT9 GM: 1 Chapter token"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 2 ParagraphStart tokens")]
    public void GoldenMaster_Gen1_ParagraphStartTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.ParagraphStart),
            Is.EqualTo(2),
            "PT9 GM: 2 ParagraphStart tokens (s1 heading + p body)"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 2 ParagraphEnd tokens")]
    public void GoldenMaster_Gen1_ParagraphEndTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.ParagraphEnd),
            Is.EqualTo(2),
            "PT9 GM: 2 ParagraphEnd tokens"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 1 CharacterStart token")]
    public void GoldenMaster_Gen1_CharacterStartTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.CharacterStart),
            Is.EqualTo(1),
            "PT9 GM: 1 CharacterStart token (nd)"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 1 CharacterEnd token")]
    public void GoldenMaster_Gen1_CharacterEndTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.CharacterEnd),
            Is.EqualTo(1),
            "PT9 GM: 1 CharacterEnd token"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 2 Note tokens")]
    public void GoldenMaster_Gen1_NoteTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.Note),
            Is.EqualTo(2),
            "PT9 GM: 2 Note tokens"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 19 TextLink tokens")]
    public void GoldenMaster_Gen1_TextLinkTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.TextLink),
            Is.EqualTo(19),
            "PT9 GM: 19 TextLink tokens"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: GEN 1:1-2 produces exactly 2 Verse tokens")]
    public void GoldenMaster_Gen1_VerseTokenCount()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        Assert.That(
            tokens.Count(t => t.Type == MarbleTokenType.Verse),
            Is.EqualTo(2),
            "PT9 GM: 2 Verse tokens (verse 1 and 2)"
        );
    }

    #endregion

    #region Golden Master Tests: Specific Token Values from PT9

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-128")]
    [Description("PT9 golden master: First TextLink in GEN 1:1 has correct attributes")]
    public void GoldenMaster_Gen1_FirstTextLinkAttributes()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        var firstTextLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);

        Assert.Multiple(() =>
        {
            Assert.That(
                firstTextLink.Strong,
                Is.EqualTo("H7225"),
                "First TextLink strong number"
            );
            Assert.That(
                firstTextLink.LexicalLinks,
                Is.EqualTo("SDBH:רֵאשִׁית:001001000"),
                "First TextLink lexical links"
            );
            Assert.That(
                firstTextLink.TargetLinks,
                Is.EqualTo("00100100100004"),
                "First TextLink target links"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-128")]
    [Description("PT9 golden master: Book token has code 'GEN'")]
    public void GoldenMaster_Gen1_BookTokenValue()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        var bookToken = tokens.First(t => t.Type == MarbleTokenType.Book);
        Assert.That(bookToken.Text, Is.EqualTo("GEN"), "Book token must have code 'GEN'");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description("PT9 golden master: Chapter token has value '1'")]
    public void GoldenMaster_Gen1_ChapterTokenValue()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        var chapterToken = tokens.First(t => t.Type == MarbleTokenType.Chapter);
        Assert.That(chapterToken.Text, Is.EqualTo("1"), "Chapter token must have value '1'");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-128")]
    [Description(
        "PT9 golden master: TextLink with multi-link lexical_links preserves semicolons"
    )]
    public void GoldenMaster_Gen1_MultiLinkLexicalLinks()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        // "heavens" in verse 1 has two lexical links
        var heavensToken = tokens.First(t =>
            t.Type == MarbleTokenType.TextLink && t.Strong == "H8064"
        );
        Assert.That(
            heavensToken.LexicalLinks,
            Is.EqualTo("SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001"),
            "Multi-link lexical_links must preserve semicolon separation"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-128")]
    [Description("PT9 golden master: CharacterStart (nd) wraps a TextLink")]
    public void GoldenMaster_Gen1_CharacterStartWrapsTextLink()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);
        var types = tokens.Select(t => t.Type).ToList();

        // In GEN 1:1, there's <char style="nd"><wg ...>God</wg></char>
        // The order should be: ..., CharacterStart, TextLink, CharacterEnd, ...
        var charStartIdx = types.IndexOf(MarbleTokenType.CharacterStart);
        var charEndIdx = types.IndexOf(MarbleTokenType.CharacterEnd);

        Assert.That(charStartIdx, Is.GreaterThan(-1), "Must have CharacterStart");
        Assert.That(charEndIdx, Is.GreaterThan(charStartIdx), "CharacterEnd must follow Start");

        // There should be a TextLink between CharacterStart and CharacterEnd
        var textLinksBetween = tokens
            .Skip(charStartIdx + 1)
            .Take(charEndIdx - charStartIdx - 1)
            .Where(t => t.Type == MarbleTokenType.TextLink)
            .ToList();
        Assert.That(
            textLinksBetween,
            Has.Count.EqualTo(1),
            "Exactly one TextLink must be between CharacterStart and CharacterEnd"
        );
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty wg element (no text) with target_links still produces TextLink")]
    public void ConvertToTokens_EmptyWgWithLinks_ProducesTextLink()
    {
        // PT9 line 98-104: if has target_links or strongs, creates TextLink even if empty
        var xml =
            """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="G1"></wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "Empty wg with links must still produce TextLink token"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty wg element without links produces no token")]
    public void ConvertToTokens_EmptyWgWithoutLinks_ProducesNoToken()
    {
        // PT9 line 102-103: else if (!element.IsEmpty) creates PlainText
        // Empty wg with no links and no content should produce nothing
        var xml =
            """<usx_book code="GEN"><para style="p"><wg/></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.Text),
            Is.False,
            "Empty self-closing wg without links must produce no Text token"
        );
        Assert.That(
            tokens.Any(t => t.Type == MarbleTokenType.TextLink),
            Is.False,
            "Empty self-closing wg without links must produce no TextLink token"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Multiple verse tokens in same paragraph are all captured")]
    public void ConvertToTokens_MultipleVerses_AllCaptured()
    {
        var xml =
            """<usx_book code="GEN"><chapter number="1"/><para style="p"><verse pubnumber="1"/>text<verse pubnumber="2"/>more text</para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var verses = tokens.Where(t => t.Type == MarbleTokenType.Verse).ToList();
        Assert.That(verses, Has.Count.EqualTo(2), "Both verse elements must be captured");
        Assert.That(verses[0].Text, Is.EqualTo("1"), "First verse is 1");
        Assert.That(verses[1].Text, Is.EqualTo("2"), "Second verse is 2");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Nested char elements produce correct start/end pairs")]
    public void ConvertToTokens_NestedCharElements_ProduceCorrectPairs()
    {
        var xml =
            """<usx_book code="GEN"><para style="p"><char style="nd"><wg target_links="tl1" strong="G1">word</wg></char></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var charStarts = tokens.Where(t => t.Type == MarbleTokenType.CharacterStart).ToList();
        var charEnds = tokens.Where(t => t.Type == MarbleTokenType.CharacterEnd).ToList();

        Assert.That(charStarts, Has.Count.EqualTo(1), "One CharacterStart");
        Assert.That(charEnds, Has.Count.EqualTo(1), "One CharacterEnd");
        Assert.That(
            tokens.ToList().IndexOf(charStarts[0]),
            Is.LessThan(tokens.ToList().IndexOf(charEnds[0])),
            "CharacterStart must come before CharacterEnd"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Multiple paragraphs each produce start/end pairs")]
    public void ConvertToTokens_MultipleParagraphs_EachHasStartAndEnd()
    {
        var xml =
            """<usx_book code="GEN"><para style="s1">heading</para><para style="p">body</para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var paraStarts = tokens.Where(t => t.Type == MarbleTokenType.ParagraphStart).ToList();
        var paraEnds = tokens.Where(t => t.Type == MarbleTokenType.ParagraphEnd).ToList();

        Assert.That(paraStarts, Has.Count.EqualTo(2), "Two ParagraphStart tokens");
        Assert.That(paraEnds, Has.Count.EqualTo(2), "Two ParagraphEnd tokens");
        Assert.That(
            paraStarts[0].Style,
            Is.EqualTo("s1"),
            "First paragraph has style 's1'"
        );
        Assert.That(paraStarts[1].Style, Is.EqualTo("p"), "Second paragraph has style 'p'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Hebrew/Unicode text in lexical links is preserved correctly")]
    public void ConvertToTokens_UnicodeInLinks_Preserved()
    {
        var xml =
            """<usx_book code="GEN"><para style="p"><wg target_links="tl1" strong="H0430" lexical_links="SDBH:אֱלֹהִים:001003000">God</wg></para></usx_book>""";
        var tokens = MarbleDataParser.ConvertToTokens(xml);

        var textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);
        Assert.That(
            textLink.LexicalLinks,
            Does.Contain("אֱלֹהִים"),
            "Hebrew characters in lexical links must be preserved"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-127")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Return type is IReadOnlyList to match contract")]
    public void ConvertToTokens_ReturnType_IsIReadOnlyList()
    {
        var result = MarbleDataParser.ConvertToTokens(MinimalBookXml);

        Assert.That(result, Is.InstanceOf<IReadOnlyList<MarbleToken>>());
    }

    #endregion

    #region PreserveWhiteSpace Test (from PT9)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-127")]
    [Description(
        "PT9 PreserveWhiteSpace test: complex whitespace handling produces correct token count"
    )]
    public void GoldenMaster_PreserveWhitespace_CorrectTokenCount()
    {
        // This is the PT9 PreserveWhiteSpace test case with known token count = 13
        const string usxData = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="s1">The Creation of the World</para>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>In the <note style="x" caller="+"><char style="xo" closed="false">1:1 </char><char style="xt" closed="false">Job 38:4-7</char></note> <verse chapter="1" style="v" code="GEN" pubnumber="2"/><wg target_links="00100100100004" strong="H7225" thematic_links="" lexical_links="SDBH:רֵאשִׁית:001001000" textual_links="HOTTP0" image_links="" map_links="" >beginning</wg>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        var tokens = MarbleDataParser.ConvertToTokens(usxData);

        // PT9 test asserts exactly 13 tokens
        Assert.That(tokens.Count, Is.EqualTo(13), "PT9 PreserveWhiteSpace: exactly 13 tokens");
    }

    #endregion
}
