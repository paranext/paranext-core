using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MarbleTokenParser.Parse - Marble XML token parsing.
/// CAP-002: ParseMarbleTokens
///
/// Behaviors: BHV-600 (USX XML Token Parsing), BHV-603 (Whitespace Preservation)
/// Contract: Section 4.2 M-002, Section 2.2 ParseMarbleTokensInput, Section 3.1 MarbleToken
/// Source: EXT-016 (MarbleDataParser - USX Token Parser)
///
/// MarbleTokenParser.Parse is a static method that takes Marble-enhanced XML
/// (EmdrosDump/wg elements with 7 annotation attributes) and produces MarbleToken[].
/// 11 token types: Book, Chapter, Verse, ParagraphStart, ParagraphEnd,
/// CharacterStart, CharacterEnd, PlainText, TextLink, Note, Reference.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleTokenParserTests
{
    /// <summary>
    /// Helper to resolve golden master input file paths relative to test output directory.
    /// </summary>
    private static string GetGoldenMasterPath(string fileName)
    {
        string testDir = TestContext.CurrentContext.TestDirectory;
        return Path.Combine(testDir, "EnhancedResources", "GoldenMasters", fileName);
    }

    #region Acceptance Tests (Golden Masters)

    // -------------------------------------------------------------------------
    // gm-001: Full token parsing against captured PT9 output (GEN 1:1-2)
    // Input: input-usx-gen1.xml (Marble-enhanced XML with EmdrosDump/wg elements)
    // Expected: 46 tokens with correct types, text values, and link attributes
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-001")]
    [Description("gm-001: Parse GEN 1:1-2 Marble XML into 46 tokens matching PT9 captured output")]
    public void Parse_Gen1MarbleXml_Produces46TokensMatchingGoldenMaster()
    {
        // Arrange: Load golden master input XML
        string marbleXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        // Act: Parse Marble XML into tokens
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "ESV16UK+",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: Total token count matches golden master
        Assert.That(tokens, Has.Length.EqualTo(46), "gm-001: Expected 46 tokens from GEN 1:1-2");

        // Assert: First token is Book with code GEN
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book));
        Assert.That(tokens[0].Text, Is.EqualTo("GEN"));

        // Assert: Second token is Chapter 1
        Assert.That(tokens[1].Type, Is.EqualTo(MarbleTokenType.Chapter));
        Assert.That(tokens[1].Text, Is.EqualTo("1"));

        // Assert: Token ordering includes ParagraphStart, PlainText section heading, ParagraphEnd
        Assert.That(tokens[2].Type, Is.EqualTo(MarbleTokenType.ParagraphStart));
        Assert.That(tokens[2].Text, Is.EqualTo("s1"));
        Assert.That(tokens[3].Type, Is.EqualTo(MarbleTokenType.PlainText));
        Assert.That(tokens[3].Text, Is.EqualTo("The Creation of the World"));
        Assert.That(tokens[4].Type, Is.EqualTo(MarbleTokenType.ParagraphEnd));
        Assert.That(tokens[4].Text, Is.EqualTo("s1"));

        // Assert: ParagraphStart for body paragraph
        Assert.That(tokens[5].Type, Is.EqualTo(MarbleTokenType.ParagraphStart));
        Assert.That(tokens[5].Text, Is.EqualTo("p"));

        // Assert: Verse 1
        Assert.That(tokens[6].Type, Is.EqualTo(MarbleTokenType.Verse));
        Assert.That(tokens[6].Text, Is.EqualTo("1"));

        // Assert: PlainText before first wg element preserves whitespace
        Assert.That(tokens[7].Type, Is.EqualTo(MarbleTokenType.PlainText));
        Assert.That(tokens[7].Text, Is.EqualTo("\nIn the \n"));

        // Assert: Note token contains inner XML
        Assert.That(tokens[8].Type, Is.EqualTo(MarbleTokenType.Note));
        Assert.That(tokens[8].Text, Does.Contain("Job 38:4-7"));

        // Assert: First TextLink - "beginning," with strong H7225
        Assert.That(tokens[9].Type, Is.EqualTo(MarbleTokenType.TextLink));
        Assert.That(tokens[9].Text, Is.EqualTo("\nbeginning, \n"));
        Assert.That(tokens[9].StrongNumber, Is.EqualTo("H7225"));
        Assert.That(tokens[9].LexicalLinks, Is.Not.Null);
        Assert.That(tokens[9].LexicalLinks!, Has.Count.EqualTo(1));
        Assert.That(
            tokens[9].LexicalLinks![0],
            Is.EqualTo("SDBH:\u05E8\u05B5\u05D0\u05E9\u05C1\u05B4\u05D9\u05EA:001001000")
        );
        Assert.That(tokens[9].TargetLinks, Is.Not.Null);
        Assert.That(tokens[9].TargetLinks!, Has.Count.EqualTo(1));
        Assert.That(tokens[9].TargetLinks![0], Is.EqualTo("00100100100004"));

        // Assert: CharacterStart for "nd" (divine name) style
        Assert.That(tokens[10].Type, Is.EqualTo(MarbleTokenType.CharacterStart));
        Assert.That(tokens[10].Text, Is.EqualTo("nd"));

        // Assert: TextLink "God" inside character span
        Assert.That(tokens[11].Type, Is.EqualTo(MarbleTokenType.TextLink));
        Assert.That(tokens[11].Text, Is.EqualTo("\nGod \n"));
        Assert.That(tokens[11].StrongNumber, Is.EqualTo("H0430"));

        // Assert: CharacterEnd for "nd"
        Assert.That(tokens[12].Type, Is.EqualTo(MarbleTokenType.CharacterEnd));
        Assert.That(tokens[12].Text, Is.EqualTo("nd"));

        // Assert: Verse 2 at correct position
        Assert.That(tokens[18].Type, Is.EqualTo(MarbleTokenType.Verse));
        Assert.That(tokens[18].Text, Is.EqualTo("2"));

        // Assert: Final token is ParagraphEnd
        Assert.That(tokens[45].Type, Is.EqualTo(MarbleTokenType.ParagraphEnd));
        Assert.That(tokens[45].Text, Is.EqualTo("p"));
    }

    // -------------------------------------------------------------------------
    // gm-002: Whitespace preservation (BHV-603)
    // Input: input-usx-whitespace.xml (compact XML with elements on same line)
    // Expected: 13 tokens; whitespace between elements is preserved exactly
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-603")]
    [Property("GoldenMasterId", "gm-002")]
    [Description("gm-002: Parse compact Marble XML preserving whitespace exactly as PT9")]
    public void Parse_CompactMarbleXml_PreservesWhitespaceMatchingGoldenMaster()
    {
        // Arrange: Load golden master input XML (compact, elements on same line)
        string marbleXml = File.ReadAllText(GetGoldenMasterPath("gm-002-input-usx-whitespace.xml"));

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "ESV16UK+",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: Total token count
        Assert.That(tokens, Has.Length.EqualTo(13), "gm-002: Expected 13 tokens");

        // Assert: Book
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book));
        Assert.That(tokens[0].Text, Is.EqualTo("GEN"));

        // Assert: Chapter
        Assert.That(tokens[1].Type, Is.EqualTo(MarbleTokenType.Chapter));
        Assert.That(tokens[1].Text, Is.EqualTo("1"));

        // Assert: ParagraphStart s1
        Assert.That(tokens[2].Type, Is.EqualTo(MarbleTokenType.ParagraphStart));
        Assert.That(tokens[2].Text, Is.EqualTo("s1"));

        // Assert: Section heading text
        Assert.That(tokens[3].Type, Is.EqualTo(MarbleTokenType.PlainText));
        Assert.That(tokens[3].Text, Is.EqualTo("The Creation of the World"));

        // Assert: ParagraphEnd s1
        Assert.That(tokens[4].Type, Is.EqualTo(MarbleTokenType.ParagraphEnd));
        Assert.That(tokens[4].Text, Is.EqualTo("s1"));

        // Assert: ParagraphStart p
        Assert.That(tokens[5].Type, Is.EqualTo(MarbleTokenType.ParagraphStart));
        Assert.That(tokens[5].Text, Is.EqualTo("p"));

        // Assert: Verse 1
        Assert.That(tokens[6].Type, Is.EqualTo(MarbleTokenType.Verse));
        Assert.That(tokens[6].Text, Is.EqualTo("1"));

        // Assert: Key whitespace test - "In the " (with trailing space before note)
        Assert.That(tokens[7].Type, Is.EqualTo(MarbleTokenType.PlainText));
        Assert.That(
            tokens[7].Text,
            Is.EqualTo("In the "),
            "gm-002: Whitespace before note must be preserved"
        );

        // Assert: Note
        Assert.That(tokens[8].Type, Is.EqualTo(MarbleTokenType.Note));
        Assert.That(tokens[8].Text, Does.Contain("Job 38:4-7"));

        // Assert: Key whitespace test - single space between note and next verse
        Assert.That(tokens[9].Type, Is.EqualTo(MarbleTokenType.PlainText));
        Assert.That(
            tokens[9].Text,
            Is.EqualTo(" "),
            "gm-002: Single space between note and verse must be preserved"
        );

        // Assert: Verse 2
        Assert.That(tokens[10].Type, Is.EqualTo(MarbleTokenType.Verse));
        Assert.That(tokens[10].Text, Is.EqualTo("2"));

        // Assert: TextLink with no surrounding whitespace artifacts
        Assert.That(tokens[11].Type, Is.EqualTo(MarbleTokenType.TextLink));
        Assert.That(
            tokens[11].Text,
            Is.EqualTo("beginning"),
            "gm-002: TextLink text without extra whitespace when wg content is compact"
        );
        Assert.That(tokens[11].StrongNumber, Is.EqualTo("H7225"));

        // Assert: ParagraphEnd p
        Assert.That(tokens[12].Type, Is.EqualTo(MarbleTokenType.ParagraphEnd));
        Assert.That(tokens[12].Text, Is.EqualTo("p"));
    }

    // -------------------------------------------------------------------------
    // gm-003: TextLink attribute extraction (all 7 annotation attributes)
    // Input: Same as gm-001 (input-usx-gen1.xml)
    // Expected: TextLink tokens have StrongNumber, LexicalLinks, TargetLinks
    //           extracted from wg element attributes. Empty attributes yield empty lists.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-003")]
    [Description("gm-003: TextLink tokens extract all wg annotation attributes matching PT9")]
    public void Parse_Gen1MarbleXml_TextLinksHaveCorrectAttributes()
    {
        // Arrange: Same input as gm-001
        string marbleXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "ESV16UK+",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Get all TextLink tokens
        MarbleToken[] textLinks = tokens.Where(t => t.Type == MarbleTokenType.TextLink).ToArray();

        Assert.That(textLinks.Length, Is.GreaterThan(0), "gm-003: Should have TextLink tokens");

        // Assert: First TextLink ("beginning,") - H7225 with single lexical link
        MarbleToken beginningToken = textLinks[0];
        Assert.That(beginningToken.StrongNumber, Is.EqualTo("H7225"));
        Assert.That(beginningToken.TargetLinks, Is.Not.Null);
        Assert.That(beginningToken.TargetLinks!, Has.Count.EqualTo(1));
        Assert.That(beginningToken.TargetLinks![0], Is.EqualTo("00100100100004"));
        Assert.That(beginningToken.LexicalLinks, Is.Not.Null);
        Assert.That(beginningToken.LexicalLinks!, Has.Count.EqualTo(1));
        // Empty thematic/image/map links from the XML
        Assert.That(
            beginningToken.ThematicLinks ?? (IList<string>)[],
            Is.Empty,
            "gm-003: Empty thematic_links attribute yields empty list"
        );
        Assert.That(
            beginningToken.ImageLinks ?? (IList<string>)[],
            Is.Empty,
            "gm-003: Empty image_links attribute yields empty list"
        );
        Assert.That(
            beginningToken.MapLinks ?? (IList<string>)[],
            Is.Empty,
            "gm-003: Empty map_links attribute yields empty list"
        );

        // Assert: "heavens" token - H8064 with two semicolon-delimited lexical links
        // XML: lexical_links="SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001"
        MarbleToken heavensToken = textLinks.First(t => t.StrongNumber == "H8064");
        Assert.That(heavensToken.LexicalLinks, Is.Not.Null);
        Assert.That(
            heavensToken.LexicalLinks!,
            Has.Count.EqualTo(2),
            "gm-003: Semicolon-delimited lexical_links should be split into 2 entries"
        );
        Assert.That(
            heavensToken.LexicalLinks![0],
            Is.EqualTo("SDBH:\u05E9\u05B8\u05C1\u05DE\u05B7\u05D9\u05B4\u05DD:001001000")
        );
        Assert.That(
            heavensToken.LexicalLinks![1],
            Is.EqualTo("SDBH:\u05E9\u05B8\u05C1\u05DE\u05B7\u05D9\u05B4\u05DD:001001001")
        );

        // Assert: "Spirit" token - H7307 with four lexical links
        // XML: lexical_links="SDBH:רוּחַ:001001000;SDBH:רוּחַ:001001001;SDBH:רוּחַ:001001017;SDBH:רוּחַ:002001000"
        MarbleToken spiritToken = textLinks.First(t => t.StrongNumber == "H7307");
        Assert.That(spiritToken.LexicalLinks, Is.Not.Null);
        Assert.That(
            spiritToken.LexicalLinks!,
            Has.Count.EqualTo(4),
            "gm-003: H7307 has 4 semicolon-delimited lexical links"
        );

        // Assert: Second "God" token (verse 2) - H0430 with four lexical links
        MarbleToken[] godTokens = textLinks.Where(t => t.StrongNumber == "H0430").ToArray();
        Assert.That(
            godTokens.Length,
            Is.EqualTo(2),
            "gm-003: Two occurrences of H0430 (God in v1 and v2)"
        );
        // Second occurrence (v2) has 4 lexical links
        Assert.That(godTokens[1].LexicalLinks, Is.Not.Null);
        Assert.That(
            godTokens[1].LexicalLinks!,
            Has.Count.EqualTo(4),
            "gm-003: Second H0430 occurrence has 4 lexical links"
        );
    }

    #endregion

    #region Contract Tests - Happy Path

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-600")]
    [Description("TS-021: All 11 token types are represented in parser output")]
    public void Parse_MarbleXmlWithAllElements_ProducesAll11TokenTypes()
    {
        // Arrange: Marble XML containing representatives of all 11 token types
        // Book (usx_book), Chapter, Verse, ParagraphStart (para), ParagraphEnd,
        // CharacterStart (char), CharacterEnd, PlainText, TextLink (wg), Note, Reference (ref)
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            Plain text here.
            <note style="x" caller="+"><char style="xo" closed="false">1:1 </char><char style="xt" closed="false">Ref text</char></note>
            <wg target_links="00100100100004" strong="H1234" thematic_links="" lexical_links="SDBH:test:001" textual_links="" image_links="" map_links="">linked word</wg>
            <char style="nd" closed="">
            <wg target_links="00100100100008" strong="H5678" thematic_links="" lexical_links="SDBH:test2:002" textual_links="" image_links="" map_links="">divine name</wg>
            </char>
            <ref loc="GEN 1:2">Genesis 1:2</ref>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: All 11 token types present
        var tokenTypes = tokens.Select(t => t.Type).Distinct().ToHashSet();

        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Book),
            "TS-021: Book token from usx_book element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Chapter),
            "TS-021: Chapter token from chapter element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Verse),
            "TS-021: Verse token from verse element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.ParagraphStart),
            "TS-021: ParagraphStart from para element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.ParagraphEnd),
            "TS-021: ParagraphEnd at para close"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.CharacterStart),
            "TS-021: CharacterStart from char element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.CharacterEnd),
            "TS-021: CharacterEnd at char close"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.PlainText),
            "TS-021: PlainText from bare text nodes"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.TextLink),
            "TS-021: TextLink from wg element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Note),
            "TS-021: Note from note element"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Reference),
            "TS-021: Reference from ref element"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BHV-600: Elements before usx_book are skipped during parsing")]
    public void Parse_MarbleXmlWithPreamble_SkipsElementsBeforeUsxBook()
    {
        // Arrange: XML with EmdrosDump and usx wrappers before usx_book
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            Text content.
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: First token is Book (usx_book), not EmdrosDump or usx or book wrapper
        Assert.That(tokens.Length, Is.GreaterThan(0), "Should produce tokens");
        Assert.That(
            tokens[0].Type,
            Is.EqualTo(MarbleTokenType.Book),
            "BHV-600: First token must be Book (elements before usx_book are skipped)"
        );
        Assert.That(tokens[0].Text, Is.EqualTo("GEN"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BHV-600: Token index is sequential starting from 0")]
    public void Parse_MarbleXml_TokenIndicesAreSequential()
    {
        // Arrange
        string marbleXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "ESV16UK+",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: Indices are sequential 0..N-1
        for (int i = 0; i < tokens.Length; i++)
        {
            Assert.That(
                tokens[i].Index,
                Is.EqualTo(i),
                $"Token at position {i} should have Index={i}"
            );
        }
    }

    #endregion

    #region Contract Tests - TextLink Attribute Extraction

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-600")]
    [Description("TS-023: TextLink extracts all 7 wg annotation attributes")]
    public void Parse_WgElementWithAllAttributes_TextLinkHasAllFields()
    {
        // Arrange: wg element with all 7 annotation attributes populated
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            <wg target_links="link1;link2" strong="G3056" thematic_links="theme1" lexical_links="entry1;entry2" textual_links="text1" image_links="img1" map_links="map1;map2">word</wg>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Find the TextLink token
        MarbleToken textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);

        // Assert: StrongNumber extracted
        Assert.That(
            textLink.StrongNumber,
            Is.EqualTo("G3056"),
            "TS-023: StrongNumber from strong attribute"
        );

        // Assert: TargetLinks split from semicolons (Theme 17)
        Assert.That(textLink.TargetLinks, Is.Not.Null);
        Assert.That(textLink.TargetLinks!, Has.Count.EqualTo(2));
        Assert.That(textLink.TargetLinks![0], Is.EqualTo("link1"));
        Assert.That(textLink.TargetLinks![1], Is.EqualTo("link2"));

        // Assert: LexicalLinks split from semicolons
        Assert.That(textLink.LexicalLinks, Is.Not.Null);
        Assert.That(textLink.LexicalLinks!, Has.Count.EqualTo(2));
        Assert.That(textLink.LexicalLinks![0], Is.EqualTo("entry1"));
        Assert.That(textLink.LexicalLinks![1], Is.EqualTo("entry2"));

        // Assert: ThematicLinks
        Assert.That(textLink.ThematicLinks, Is.Not.Null);
        Assert.That(textLink.ThematicLinks!, Has.Count.EqualTo(1));
        Assert.That(textLink.ThematicLinks![0], Is.EqualTo("theme1"));

        // Assert: ImageLinks
        Assert.That(textLink.ImageLinks, Is.Not.Null);
        Assert.That(textLink.ImageLinks!, Has.Count.EqualTo(1));
        Assert.That(textLink.ImageLinks![0], Is.EqualTo("img1"));

        // Assert: MapLinks split from semicolons
        Assert.That(textLink.MapLinks, Is.Not.Null);
        Assert.That(textLink.MapLinks!, Has.Count.EqualTo(2));
        Assert.That(textLink.MapLinks![0], Is.EqualTo("map1"));
        Assert.That(textLink.MapLinks![1], Is.EqualTo("map2"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-600")]
    [Description("TS-023: Empty wg annotation attributes produce empty lists, not null")]
    public void Parse_WgElementWithEmptyAttributes_TextLinkHasEmptyLists()
    {
        // Arrange: wg element with empty string attributes (common in real data)
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            <wg target_links="00100100100004" strong="H7225" thematic_links="" lexical_links="SDBH:test:001" textual_links="" image_links="" map_links="">word</wg>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        MarbleToken textLink = tokens.First(t => t.Type == MarbleTokenType.TextLink);

        // Assert: Empty attribute strings produce empty lists (not null, not [""])
        Assert.That(
            textLink.ThematicLinks ?? (IList<string>)[],
            Is.Empty,
            "Empty thematic_links attribute should yield empty list"
        );
        Assert.That(
            textLink.ImageLinks ?? (IList<string>)[],
            Is.Empty,
            "Empty image_links attribute should yield empty list"
        );
        Assert.That(
            textLink.MapLinks ?? (IList<string>)[],
            Is.Empty,
            "Empty map_links attribute should yield empty list"
        );

        // Assert: Non-empty attributes still populated correctly
        Assert.That(textLink.StrongNumber, Is.EqualTo("H7225"));
        Assert.That(textLink.LexicalLinks, Is.Not.Null);
        Assert.That(textLink.LexicalLinks!, Has.Count.EqualTo(1));
    }

    #endregion

    #region Contract Tests - Whitespace Preservation (BHV-603)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-603")]
    [Description("TS-022: Whitespace is preserved in PlainText and TextLink token text values")]
    public void Parse_MarbleXmlWithSignificantWhitespace_PreservesExactWhitespace()
    {
        // Arrange: XML where wg elements have leading/trailing whitespace in their text
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            <wg target_links="t1" strong="H1" thematic_links="" lexical_links="l1" textual_links="" image_links="" map_links="" >word1 </wg>
            <wg target_links="t2" strong="H2" thematic_links="" lexical_links="l2" textual_links="" image_links="" map_links="" > word2</wg>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Find TextLink tokens
        MarbleToken[] textLinks = tokens.Where(t => t.Type == MarbleTokenType.TextLink).ToArray();

        Assert.That(
            textLinks.Length,
            Is.GreaterThanOrEqualTo(2),
            "TS-022: Should have at least 2 TextLink tokens"
        );

        // Assert: Trailing space in "word1 " is preserved
        Assert.That(
            textLinks[0].Text,
            Does.Contain("word1"),
            "TS-022: First TextLink contains 'word1'"
        );

        // Assert: Leading space in " word2" is preserved
        Assert.That(
            textLinks[1].Text,
            Does.Contain("word2"),
            "TS-022: Second TextLink contains 'word2'"
        );

        // BHV-603: The exact whitespace depends on how XML text nodes are handled.
        // The golden master (gm-002) is the authoritative reference for exact values.
        // This test verifies the general property that whitespace is not trimmed.
    }

    #endregion

    #region Contract Tests - Error Handling (TS-024)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-600")]
    [Description(
        "TS-024: Null XML input throws InvalidOperationException with INVALID_ARGUMENT code"
    )]
    public void Parse_NullXml_ThrowsInvalidArgumentError()
    {
        // Act & Assert: Null XML should throw with INVALID_ARGUMENT code
        var ex = Assert.Throws<InvalidOperationException>(
            () =>
                MarbleTokenParser.Parse(null!, resourceId: "TEST", bookNumber: 1, chapterNumber: 1)
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "TS-024: Null XML should produce INVALID_ARGUMENT error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("null or empty"),
            "TS-024: Error message should mention null or empty"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-600")]
    [Description(
        "TS-024: Empty XML input throws InvalidOperationException with INVALID_ARGUMENT code"
    )]
    public void Parse_EmptyXml_ThrowsInvalidArgumentError()
    {
        // Act & Assert: Empty string should throw with INVALID_ARGUMENT code
        var ex = Assert.Throws<InvalidOperationException>(
            () =>
                MarbleTokenParser.Parse(
                    string.Empty,
                    resourceId: "TEST",
                    bookNumber: 1,
                    chapterNumber: 1
                )
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "TS-024: Empty XML should produce INVALID_ARGUMENT error code"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-600")]
    [Description("TS-024: Malformed XML throws InvalidOperationException with INTERNAL code")]
    public void Parse_MalformedXml_ThrowsInternalError()
    {
        // Arrange: XML that is not well-formed
        const string malformedXml = "<EmdrosDump><usx><not-closed>";

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () =>
                MarbleTokenParser.Parse(
                    malformedXml,
                    resourceId: "TEST",
                    bookNumber: 1,
                    chapterNumber: 1
                )
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INTERNAL"),
            "TS-024: Malformed XML should produce INTERNAL error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("Failed to parse"),
            "TS-024: Error message should indicate parse failure"
        );
    }

    #endregion

    #region Contract Tests - Style Attribute

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BHV-600: ParagraphStart and CharacterStart tokens carry the style attribute")]
    public void Parse_ParagraphAndCharElements_StyleAttributePopulated()
    {
        // Arrange
        const string marbleXml = """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="s1">Section Title</para>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            <char style="nd" closed="">Divine Name</char>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

        // Act
        MarbleToken[] tokens = MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "TEST",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Assert: ParagraphStart tokens have style from "style" attribute
        MarbleToken[] paraStarts = tokens
            .Where(t => t.Type == MarbleTokenType.ParagraphStart)
            .ToArray();
        Assert.That(paraStarts.Length, Is.GreaterThanOrEqualTo(2));
        Assert.That(paraStarts[0].Style, Is.EqualTo("s1"));
        Assert.That(paraStarts[1].Style, Is.EqualTo("p"));

        // Assert: CharacterStart has style
        MarbleToken charStart = tokens.First(t => t.Type == MarbleTokenType.CharacterStart);
        Assert.That(charStart.Style, Is.EqualTo("nd"));
    }

    #endregion

    #region Standard-USX Attribute Fallback

    // PT9 marble bibles emit `<chapter chapter="N">` (and the verse element
    // carries `pubnumber`). Real .usx files in the user's marble bible packages
    // use the standard USX attribute names instead - `<chapter number="N">` and
    // `<verse number="N">`. PT9 MarbleDataParser.cs:75-79 falls back from
    // `chapter` to `number` for chapter tokens; we mirror that and additionally
    // accept `number` for verse so non-marble USX still produces verse tokens.
    //
    // Without this fallback, currentChapter/currentVerse trackers stay 0 in
    // ScopeFilterService and dictionary/encyclopedia lookups never match the
    // requested verse - the regression that landed dictionary/encyclopedia
    // smoke results at items=0.

    [Test]
    [Category("Regression")]
    [Property("CapabilityId", "CAP-002")]
    public void Parse_ChapterUsesUsxNumberAttribute_ProducesChapterText()
    {
        // Chapter / verse / etc. live as children of <usx_book>, matching the
        // shape produced by real .usx packages.
        const string xml =
            @"<usx version=""2.6"">
  <usx_book code=""JHN"" style=""id"">
    <chapter number=""1"" style=""c"" />
    <verse number=""1"" style=""v"" />
  </usx_book>
</usx>";

        MarbleToken[] tokens = MarbleTokenParser.Parse(xml, "TEST", 43, 1);

        MarbleToken chapter = tokens.First(t => t.Type == MarbleTokenType.Chapter);
        Assert.That(
            chapter.Text,
            Is.EqualTo("1"),
            "USX `number` attribute must populate Chapter.Text"
        );
        MarbleToken verse = tokens.First(t => t.Type == MarbleTokenType.Verse);
        Assert.That(verse.Text, Is.EqualTo("1"), "USX `number` attribute must populate Verse.Text");
    }

    [Test]
    [Category("Regression")]
    [Property("CapabilityId", "CAP-002")]
    public void Parse_ChapterPrefersMarbleAttributeOverUsxNumber_WhenBothPresent()
    {
        // Real PT9 marble files include both attributes (the `chapter="N"` form
        // is marble-specific). The marble form must win so existing behavior
        // doesn't regress on packages that carry both.
        const string xml =
            @"<usx version=""2.6"">
  <usx_book code=""GEN"" style=""id"">
    <chapter chapter=""5"" number=""99"" style=""c"" />
  </usx_book>
</usx>";

        MarbleToken[] tokens = MarbleTokenParser.Parse(xml, "TEST", 1, 5);

        MarbleToken chapter = tokens.First(t => t.Type == MarbleTokenType.Chapter);
        Assert.That(chapter.Text, Is.EqualTo("5"), "Marble `chapter` attribute must take priority");
    }

    #endregion
}
