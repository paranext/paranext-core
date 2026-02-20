using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-003: GetLinksInScope.
/// Validates scope-based token filtering for verse/section/chapter modes
/// with optional link type and word filter application.
///
/// PT9 Source: Paratext/Marble/MarbleDataParser.cs:425-503
/// Golden Master: gm-004-scope-filtering
/// Extraction: EXT-052
/// Behaviors: BHV-600, BHV-302
///
/// Dependencies (all implemented):
///   CAP-002 (ConvertToTokens) - provides parsed token lists
///   CAP-004 (GetSectionBoundaries) - provides section boundary data
///   CAP-025 (Matches) - provides token filter matching
///
/// The method under test is MarbleDataParser.GetLinksInScope, a static method
/// that filters a parsed token list by scope (verse/section/chapter) and optionally
/// by link type and word filter criteria.
/// </summary>
[TestFixture]
public class GetLinksInScopeTests
{
    #region Helper Methods for Building Token Lists

    /// <summary>
    /// Creates a token list from shorthand definitions.
    /// Reuses the proven pattern from SectionBoundaryTests.
    /// </summary>
    private static List<MarbleToken> BuildTokenList(params TokenDef[] defs)
    {
        var tokens = new List<MarbleToken>();
        foreach (var def in defs)
        {
            tokens.Add(
                new MarbleToken(
                    def.Type,
                    def.Text,
                    def.Style,
                    def.VerseRef,
                    def.TargetLinks,
                    def.Strong,
                    def.LexicalLinks,
                    def.ThematicLinks,
                    def.TextualLinks,
                    def.ImageLinks,
                    def.MapLinks
                )
            );
        }
        return tokens;
    }

    /// <summary>Shorthand for defining tokens with all attributes.</summary>
    private record TokenDef(
        MarbleTokenType Type,
        string? Text = null,
        string? Style = null,
        VerseReference? VerseRef = null,
        string? TargetLinks = null,
        string? Strong = null,
        string? LexicalLinks = null,
        string? ThematicLinks = null,
        string? TextualLinks = null,
        string? ImageLinks = null,
        string? MapLinks = null
    );

    private static TokenDef Book(string code) =>
        new(MarbleTokenType.Book, Text: code);

    private static TokenDef Chapter(string number) =>
        new(MarbleTokenType.Chapter, Text: number);

    private static TokenDef Verse(string number) =>
        new(MarbleTokenType.Verse, Text: number);

    private static TokenDef ParaStart(string style) =>
        new(MarbleTokenType.ParagraphStart, Style: style);

    private static TokenDef ParaEnd(string style) =>
        new(MarbleTokenType.ParagraphEnd, Style: style);

    private static TokenDef TextToken(string text) =>
        new(MarbleTokenType.Text, Text: text);

    /// <summary>Creates a TextLink with only lexical links.</summary>
    private static TokenDef LexLink(string text, string lexicalLinks) =>
        new(
            MarbleTokenType.TextLink,
            Text: text,
            LexicalLinks: lexicalLinks,
            TargetLinks: "tl"
        );

    /// <summary>Creates a TextLink with thematic links.</summary>
    private static TokenDef ThematicLink(string text, string thematicLinks) =>
        new(
            MarbleTokenType.TextLink,
            Text: text,
            ThematicLinks: thematicLinks,
            TargetLinks: "tl"
        );

    /// <summary>Creates a TextLink with image links.</summary>
    private static TokenDef ImageLink(string text, string imageLinks) =>
        new(
            MarbleTokenType.TextLink,
            Text: text,
            ImageLinks: imageLinks,
            TargetLinks: "tl"
        );

    /// <summary>Creates a TextLink with map links.</summary>
    private static TokenDef MapLink(string text, string mapLinks) =>
        new(
            MarbleTokenType.TextLink,
            Text: text,
            MapLinks: mapLinks,
            TargetLinks: "tl"
        );

    /// <summary>Creates a TextLink with multiple link types.</summary>
    private static TokenDef MultiLink(
        string text,
        string? lexicalLinks = null,
        string? thematicLinks = null,
        string? imageLinks = null,
        string? mapLinks = null
    ) =>
        new(
            MarbleTokenType.TextLink,
            Text: text,
            TargetLinks: "tl",
            LexicalLinks: lexicalLinks,
            ThematicLinks: thematicLinks,
            ImageLinks: imageLinks,
            MapLinks: mapLinks
        );

    #endregion

    #region Standard Test Token Lists

    /// <summary>
    /// GEN chapter 1 with two sections and various link types:
    ///   Section 0: "The Creation" (s1) - verses 1-3
    ///     v1: "beginning" (lexical), "God" (lexical+thematic), "created" (lexical)
    ///     v2: "earth" (lexical), "void" (thematic)
    ///     v3: "said" (lexical), "light" (image)
    ///   Section 1: "The Firmament" (s1) - verses 4-6
    ///     v4: "firmament" (lexical), "waters" (map)
    ///     v5: "called" (lexical+thematic)
    ///     v6: "evening" (lexical)
    /// </summary>
    private static IReadOnlyList<MarbleToken> TwoSectionMultiLinkTokens =>
        BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            // Section 0: heading
            ParaStart("s1"),
            TextToken("The Creation"),
            ParaEnd("s1"),
            // Verse 1
            ParaStart("p"),
            Verse("1"),
            LexLink("beginning", "SDBH:reshit:001001"),
            MultiLink("God", lexicalLinks: "SDBH:elohim:001003", thematicLinks: "th_god"),
            LexLink("created", "SDBH:bara:001002"),
            // Verse 2
            Verse("2"),
            LexLink("earth", "SDBH:erets:001001"),
            ThematicLink("void", "th_chaos"),
            // Verse 3
            Verse("3"),
            LexLink("said", "SDBH:amar:001001"),
            ImageLink("light", "img_light"),
            ParaEnd("p"),
            // Section 1: heading
            ParaStart("s1"),
            TextToken("The Firmament"),
            ParaEnd("s1"),
            // Verse 4
            ParaStart("p"),
            Verse("4"),
            LexLink("firmament", "SDBH:raqia:001001"),
            MapLink("waters", "map_waters"),
            // Verse 5
            Verse("5"),
            MultiLink("called", lexicalLinks: "SDBH:qara:001001", thematicLinks: "th_naming"),
            // Verse 6
            Verse("6"),
            LexLink("evening", "SDBH:erev:001001"),
            ParaEnd("p")
        );

    /// <summary>
    /// GEN chapter 1 with NO section headings, just verses 1-3 with lexical links.
    /// </summary>
    private static IReadOnlyList<MarbleToken> NoSectionLinkTokens =>
        BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("p"),
            Verse("1"),
            LexLink("beginning", "SDBH:reshit:001001"),
            LexLink("God", "SDBH:elohim:001003"),
            Verse("2"),
            LexLink("earth", "SDBH:erets:001001"),
            Verse("3"),
            LexLink("light", "SDBH:or:001001"),
            ParaEnd("p")
        );

    /// <summary>
    /// Tokens with NO TextLink tokens at all (only structural tokens).
    /// </summary>
    private static IReadOnlyList<MarbleToken> NoLinksTokens =>
        BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("p"),
            Verse("1"),
            TextToken("plain text"),
            Verse("2"),
            TextToken("more text"),
            ParaEnd("p")
        );

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-003.
    /// Verifies all gm-004 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-004:
    /// - GLS-01: CurrentVerse scope returns only tokens within the target verse
    /// - GLS-02: CurrentSection scope returns tokens from section containing the verse
    /// - GLS-03: CurrentChapter scope returns all tokens in the chapter
    /// - GLS-04: CurrentVerse + linkType filters by link attribute presence
    /// - GLS-05: CurrentVerse + filterText filters by text match
    ///
    /// Behaviors: BHV-600 (data parsing), BHV-302 (scope filter dropdown)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-129")]
    [Description(
        "Acceptance test: Tokens filtered by verse/section/chapter scope with optional link type and word filter"
    )]
    public void GetLinksInScope_AllGoldenMasterScenarios_Pass()
    {
        var tokens = TwoSectionMultiLinkTokens;

        Assert.Multiple(() =>
        {
            // GLS-01: CurrentVerse at GEN 1:1 returns only verse 1 TextLink tokens
            var verseResult = MarbleDataParser.GetLinksInScope(
                tokens,
                new VerseReference(1, 1, 1),
                ScopeFilter.CurrentVerse,
                null,
                null,
                null
            );
            Assert.That(
                verseResult,
                Has.Count.EqualTo(3),
                "GLS-01: Verse 1 has 3 TextLink tokens (beginning, God, created)"
            );
            Assert.That(
                verseResult.All(t => t.Type == MarbleTokenType.TextLink),
                Is.True,
                "GLS-01: All returned tokens must be TextLink"
            );

            // GLS-02: CurrentSection at GEN 1:3 returns tokens from section 0 (verses 1-3)
            var sectionResult = MarbleDataParser.GetLinksInScope(
                tokens,
                new VerseReference(1, 1, 3),
                ScopeFilter.CurrentSection,
                null,
                null,
                null
            );
            Assert.That(
                sectionResult.Count,
                Is.GreaterThanOrEqualTo(3),
                "GLS-02: Section 0 (verses 1-3) must have at least the verse 1-3 TextLink tokens"
            );

            // GLS-03: CurrentChapter at GEN 1:1 returns all TextLink tokens in chapter
            var chapterResult = MarbleDataParser.GetLinksInScope(
                tokens,
                new VerseReference(1, 1, 1),
                ScopeFilter.CurrentChapter,
                null,
                null,
                null
            );
            Assert.That(
                chapterResult.Count,
                Is.GreaterThan(sectionResult.Count),
                "GLS-03: Chapter scope must return more tokens than section scope"
            );

            // GLS-04: CurrentVerse + linkType="lexical_links" filters to only lexical tokens
            var lexicalResult = MarbleDataParser.GetLinksInScope(
                tokens,
                new VerseReference(1, 1, 1),
                ScopeFilter.CurrentVerse,
                "lexical_links",
                null,
                null
            );
            Assert.That(
                lexicalResult,
                Has.Count.EqualTo(3),
                "GLS-04: All 3 tokens in verse 1 have lexical_links"
            );
        });
    }

    #endregion

    #region Contract Tests: CurrentVerse Scope

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentVerse scope: returns only TextLink tokens within the target verse")]
    public void GetLinksInScope_CurrentVerse_ReturnsOnlyTargetVerseTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(result, Has.Count.EqualTo(3), "Verse 1 has 3 TextLink tokens");
        Assert.That(
            result.All(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "All returned tokens must be TextLink type"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentVerse scope at verse 2: returns tokens for that verse only")]
    public void GetLinksInScope_CurrentVerse_Verse2_ReturnsCorrectTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        // Verse 2: "earth" (lexical) and "void" (thematic) = 2 TextLink tokens
        Assert.That(result, Has.Count.EqualTo(2), "Verse 2 has 2 TextLink tokens");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentVerse scope: tokens from other verses are excluded")]
    public void GetLinksInScope_CurrentVerse_ExcludesOtherVerses()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 3),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        // Verse 3: "said" (lexical) and "light" (image) = 2 tokens
        Assert.That(result, Has.Count.EqualTo(2), "Verse 3 has 2 TextLink tokens");
        // Ensure none of the tokens from other verses appear
        Assert.That(
            result.Any(t => t.Text == "beginning"),
            Is.False,
            "Verse 1 token 'beginning' must not appear in verse 3 results"
        );
        Assert.That(
            result.Any(t => t.Text == "firmament"),
            Is.False,
            "Verse 4 token 'firmament' must not appear in verse 3 results"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentVerse scope at verse in section 1: returns tokens from that verse")]
    public void GetLinksInScope_CurrentVerse_Section1Verse_ReturnsCorrectTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 5),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        // Verse 5: "called" (lexical+thematic) = 1 TextLink token
        Assert.That(result, Has.Count.EqualTo(1), "Verse 5 has 1 TextLink token");
        Assert.That(result[0].Text, Is.EqualTo("called"), "Token text must be 'called'");
    }

    #endregion

    #region Contract Tests: CurrentSection Scope

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentSection scope: returns TextLink tokens from section containing the verse")]
    public void GetLinksInScope_CurrentSection_ReturnsTokensFromSection()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Query verse 2, which is in section 0 (verses 1-3)
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Section 0 has verses 1-3:
        // v1: beginning, God, created (3 tokens)
        // v2: earth, void (2 tokens)
        // v3: said, light (2 tokens)
        // Total: 7 TextLink tokens
        Assert.That(
            result,
            Has.Count.EqualTo(7),
            "Section 0 (verses 1-3) has 7 TextLink tokens"
        );
        Assert.That(
            result.All(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "All returned tokens must be TextLink"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentSection scope: section 1 tokens do not appear in section 0 results")]
    public void GetLinksInScope_CurrentSection_ExcludesOtherSections()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Query verse 1 (section 0)
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Section 1 tokens (firmament, waters, called, evening) must not appear
        Assert.That(
            result.Any(t => t.Text == "firmament"),
            Is.False,
            "Section 1 token 'firmament' must not appear"
        );
        Assert.That(
            result.Any(t => t.Text == "evening"),
            Is.False,
            "Section 1 token 'evening' must not appear"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentSection scope: query in section 1 returns section 1 tokens")]
    public void GetLinksInScope_CurrentSection_Section1_ReturnsSection1Tokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Query verse 5 (section 1, verses 4-6)
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 5),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Section 1 has verses 4-6:
        // v4: firmament, waters (2 tokens)
        // v5: called (1 token)
        // v6: evening (1 token)
        // Total: 4 TextLink tokens
        Assert.That(
            result,
            Has.Count.EqualTo(4),
            "Section 1 (verses 4-6) has 4 TextLink tokens"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentSection scope with no section headings: entire chapter is one section")]
    public void GetLinksInScope_CurrentSection_NoHeadings_ReturnsAllChapterTokens()
    {
        var tokens = NoSectionLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // No section headings = one section = all 4 TextLink tokens
        Assert.That(
            result,
            Has.Count.EqualTo(4),
            "No section headings: entire chapter is one section, all 4 tokens returned"
        );
    }

    #endregion

    #region Contract Tests: CurrentChapter Scope

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-131")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentChapter scope: returns all TextLink tokens in the chapter")]
    public void GetLinksInScope_CurrentChapter_ReturnsAllChapterTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        // All 11 TextLink tokens across both sections
        Assert.That(
            result,
            Has.Count.EqualTo(11),
            "Chapter scope returns all 11 TextLink tokens in the chapter"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-131")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("CurrentChapter scope: includes tokens from all sections")]
    public void GetLinksInScope_CurrentChapter_IncludesAllSections()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 4),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        // Should include tokens from section 0 AND section 1
        Assert.That(
            result.Any(t => t.Text == "beginning"),
            Is.True,
            "Must include section 0 token 'beginning'"
        );
        Assert.That(
            result.Any(t => t.Text == "firmament"),
            Is.True,
            "Must include section 1 token 'firmament'"
        );
    }

    #endregion

    #region Contract Tests: Link Type Filtering

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("linkType=lexical_links: returns only tokens with lexical links")]
    public void GetLinksInScope_LinkTypeLexical_ReturnsOnlyLexicalTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentVerse,
            "lexical_links",
            null,
            null
        );

        // Verse 2: "earth" has lexical_links, "void" has only thematic_links
        Assert.That(result, Has.Count.EqualTo(1), "Only 1 token in verse 2 has lexical_links");
        Assert.That(result[0].Text, Is.EqualTo("earth"), "Token with lexical link is 'earth'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("linkType=thematic_links: returns only tokens with thematic links")]
    public void GetLinksInScope_LinkTypeThematic_ReturnsOnlyThematicTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentVerse,
            "thematic_links",
            null,
            null
        );

        // Verse 2: "earth" has no thematic, "void" has thematic_links
        Assert.That(result, Has.Count.EqualTo(1), "Only 1 token in verse 2 has thematic_links");
        Assert.That(result[0].Text, Is.EqualTo("void"), "Token with thematic link is 'void'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("linkType=image_links: returns only tokens with image links")]
    public void GetLinksInScope_LinkTypeImage_ReturnsOnlyImageTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 3),
            ScopeFilter.CurrentVerse,
            "image_links",
            null,
            null
        );

        // Verse 3: "said" has lexical, "light" has image_links
        Assert.That(result, Has.Count.EqualTo(1), "Only 1 token in verse 3 has image_links");
        Assert.That(result[0].Text, Is.EqualTo("light"), "Token with image link is 'light'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("linkType=map_links: returns only tokens with map links")]
    public void GetLinksInScope_LinkTypeMap_ReturnsOnlyMapTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 4),
            ScopeFilter.CurrentVerse,
            "map_links",
            null,
            null
        );

        // Verse 4: "firmament" has lexical, "waters" has map_links
        Assert.That(result, Has.Count.EqualTo(1), "Only 1 token in verse 4 has map_links");
        Assert.That(result[0].Text, Is.EqualTo("waters"), "Token with map link is 'waters'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("linkType=null: no link type filter applied, returns all TextLink tokens in scope")]
    public void GetLinksInScope_LinkTypeNull_ReturnsAllTokensInScope()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        // Verse 2: "earth" (lexical) and "void" (thematic) = 2 TextLink tokens
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Null linkType returns all TextLink tokens in verse"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Link type filter combined with section scope")]
    public void GetLinksInScope_LinkTypeWithSectionScope_FiltersCorrectly()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentSection,
            "thematic_links",
            null,
            null
        );

        // Section 0 (verses 1-3): thematic tokens are "God" (v1) and "void" (v2)
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Section 0 has 2 tokens with thematic_links"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Link type filter combined with chapter scope")]
    public void GetLinksInScope_LinkTypeWithChapterScope_FiltersCorrectly()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            "image_links",
            null,
            null
        );

        // Only verse 3 "light" has image_links in the entire chapter
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Only 1 token in entire chapter has image_links"
        );
        Assert.That(result[0].Text, Is.EqualTo("light"));
    }

    #endregion

    #region Contract Tests: Word Filter (filterText)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("filterText: returns only tokens whose text matches (case-insensitive substring)")]
    public void GetLinksInScope_FilterText_FiltersByTextContent()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            "God",
            null
        );

        // Only "God" matches the filter text in the entire chapter
        Assert.That(result, Has.Count.EqualTo(1), "Only 1 token matches 'God'");
        Assert.That(result[0].Text, Is.EqualTo("God"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("filterText is case-insensitive")]
    public void GetLinksInScope_FilterText_CaseInsensitive()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            "god",
            null
        );

        // "God" should match case-insensitive "god"
        Assert.That(result, Has.Count.EqualTo(1), "Case-insensitive match for 'god' -> 'God'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("filterText=null: no text filter applied")]
    public void GetLinksInScope_FilterTextNull_NoTextFiltering()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var resultWithFilter = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(
            resultWithFilter,
            Has.Count.EqualTo(3),
            "Null filterText returns all 3 TextLink tokens in verse 1"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("filterText combined with linkType: both filters apply")]
    public void GetLinksInScope_FilterTextAndLinkType_BothApply()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Search for "God" with linkType=thematic_links in chapter scope
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            "thematic_links",
            "God",
            null
        );

        // "God" has both lexical and thematic links, so it passes thematic filter
        Assert.That(result, Has.Count.EqualTo(1), "Only 'God' has thematic_links and text 'God'");
    }

    #endregion

    #region Contract Tests: Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty token list returns empty result")]
    public void GetLinksInScope_EmptyTokenList_ReturnsEmptyResult()
    {
        var result = MarbleDataParser.GetLinksInScope(
            Array.Empty<MarbleToken>(),
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(result, Is.Empty, "Empty token list must return empty result");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Null token list returns empty result")]
    public void GetLinksInScope_NullTokenList_ReturnsEmptyResult()
    {
        var result = MarbleDataParser.GetLinksInScope(
            null!,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(result, Is.Empty, "Null token list must return empty result");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Verse not found in token list returns empty result")]
    public void GetLinksInScope_VerseNotFound_ReturnsEmptyResult()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Verse 99 does not exist in the token list
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 99),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(result, Is.Empty, "Non-existent verse must return empty result");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Link type with no matching tokens returns empty result")]
    public void GetLinksInScope_LinkTypeNoMatches_ReturnsEmptyResult()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Verse 2 has lexical and thematic tokens but no image links
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 2),
            ScopeFilter.CurrentVerse,
            "image_links",
            null,
            null
        );

        Assert.That(result, Is.Empty, "No image_links in verse 2, must return empty");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Filter text that matches no tokens returns empty result")]
    public void GetLinksInScope_FilterTextNoMatches_ReturnsEmptyResult()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            "xyz_nonexistent",
            null
        );

        Assert.That(result, Is.Empty, "No tokens match 'xyz_nonexistent'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Tokens with no TextLink tokens at all return empty result")]
    public void GetLinksInScope_NoTextLinks_ReturnsEmptyResult()
    {
        var tokens = NoLinksTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        Assert.That(result, Is.Empty, "Tokens with no TextLink tokens return empty");
    }

    #endregion

    #region Contract Tests: Postconditions

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Postcondition: returns only TextLink tokens, no structural tokens")]
    public void GetLinksInScope_ReturnsOnlyTextLinkTokens()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        Assert.That(
            result.All(t => t.Type == MarbleTokenType.TextLink),
            Is.True,
            "All returned tokens must be TextLink type (no structural tokens)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Postcondition: token ordering is preserved (document order)")]
    public void GetLinksInScope_PreservesTokenOrdering()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Section 0 tokens should appear in document order
        var texts = result.Select(t => t.Text).ToList();
        var expected = new List<string?>
        {
            "beginning",
            "God",
            "created",
            "earth",
            "void",
            "said",
            "light",
        };
        Assert.That(
            texts,
            Is.EqualTo(expected),
            "Tokens must appear in document order within section scope"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Return type is IReadOnlyList<MarbleToken> to match contract")]
    public void GetLinksInScope_ReturnType_IsIReadOnlyList()
    {
        var result = MarbleDataParser.GetLinksInScope(
            TwoSectionMultiLinkTokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(result, Is.InstanceOf<IReadOnlyList<MarbleToken>>());
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Edge case: verse at section boundary (last verse of section 0)")]
    public void GetLinksInScope_VerseAtSectionEnd_IncludedInSection()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Verse 3 is the last verse in section 0
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 3),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Should include all section 0 tokens (verses 1-3)
        Assert.That(
            result,
            Has.Count.EqualTo(7),
            "Last verse of section 0: section scope includes all 7 tokens in section 0"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Edge case: verse at section boundary (first verse of section 1)")]
    public void GetLinksInScope_VerseAtSectionStart_IncludedInSection()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Verse 4 is the first verse in section 1
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 4),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Should include all section 1 tokens (verses 4-6)
        Assert.That(
            result,
            Has.Count.EqualTo(4),
            "First verse of section 1: section scope includes all 4 tokens in section 1"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("Edge case: token with multiple link types matches when any of them is the filter")]
    public void GetLinksInScope_MultiLinkToken_MatchesAnyLinkType()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // "God" has both lexical_links and thematic_links
        var lexResult = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            "lexical_links",
            null,
            null
        );
        var thematicResult = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            "thematic_links",
            null,
            null
        );

        // "God" should appear in both results
        Assert.That(
            lexResult.Any(t => t.Text == "God"),
            Is.True,
            "Multi-link 'God' must appear in lexical_links results"
        );
        Assert.That(
            thematicResult.Any(t => t.Text == "God"),
            Is.True,
            "Multi-link 'God' must appear in thematic_links results"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Edge case: filterText that is a substring matches")]
    public void GetLinksInScope_FilterTextSubstring_Matches()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // "begin" is a substring of "beginning"
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            "begin",
            null
        );

        Assert.That(
            result.Any(t => t.Text == "beginning"),
            Is.True,
            "Substring 'begin' must match 'beginning'"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Edge case: empty filterText string treated as no filter")]
    public void GetLinksInScope_EmptyFilterText_TreatedAsNoFilter()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var resultEmpty = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            "",
            null
        );
        var resultNull = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.That(
            resultEmpty.Count,
            Is.EqualTo(resultNull.Count),
            "Empty filterText must behave same as null filterText"
        );
    }

    #endregion

    #region Golden Master Tests: gm-004

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004 GLS-01: CurrentVerse at GEN 1:1 returns only verse 1 tokens")]
    public void GoldenMaster_GLS01_CurrentVerseGen1v1()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Has.Count.EqualTo(3), "GLS-01: verse 1 has 3 TextLink tokens");
            Assert.That(result[0].Text, Is.EqualTo("beginning"), "GLS-01: first token");
            Assert.That(result[1].Text, Is.EqualTo("God"), "GLS-01: second token");
            Assert.That(result[2].Text, Is.EqualTo("created"), "GLS-01: third token");
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004 GLS-02: CurrentSection at GEN 1:3 returns section 0 tokens")]
    public void GoldenMaster_GLS02_CurrentSectionGen1v3()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 3),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Has.Count.EqualTo(7), "GLS-02: section 0 has 7 TextLink tokens");
            // Verify section 0 token ordering
            var texts = result.Select(t => t.Text).ToList();
            Assert.That(
                texts,
                Is.EqualTo(
                    new List<string?>
                    {
                        "beginning",
                        "God",
                        "created",
                        "earth",
                        "void",
                        "said",
                        "light",
                    }
                ),
                "GLS-02: section 0 tokens in document order"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-131")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004 GLS-03: CurrentChapter at GEN 1:1 returns all chapter tokens")]
    public void GoldenMaster_GLS03_CurrentChapterGen1()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result,
                Has.Count.EqualTo(11),
                "GLS-03: chapter 1 has 11 TextLink tokens total"
            );
            // Verify all expected tokens are present
            var texts = result.Select(t => t.Text).ToList();
            Assert.That(texts, Does.Contain("beginning"), "GLS-03: must contain 'beginning'");
            Assert.That(texts, Does.Contain("God"), "GLS-03: must contain 'God'");
            Assert.That(texts, Does.Contain("firmament"), "GLS-03: must contain 'firmament'");
            Assert.That(texts, Does.Contain("evening"), "GLS-03: must contain 'evening'");
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004 GLS-04: CurrentVerse + linkType=lexical_links at GEN 1:1")]
    public void GoldenMaster_GLS04_CurrentVerseWithLexicalFilter()
    {
        var tokens = TwoSectionMultiLinkTokens;

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            "lexical_links",
            null,
            null
        );

        Assert.Multiple(() =>
        {
            // All 3 tokens in verse 1 have lexical_links
            Assert.That(
                result,
                Has.Count.EqualTo(3),
                "GLS-04: all 3 tokens in verse 1 have lexical_links"
            );
            Assert.That(
                result.All(t => !string.IsNullOrEmpty(t.LexicalLinks)),
                Is.True,
                "GLS-04: all returned tokens must have lexical_links populated"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004 GLS-05: CurrentVerse + filterText at chapter scope")]
    public void GoldenMaster_GLS05_FilterTextApplied()
    {
        var tokens = TwoSectionMultiLinkTokens;

        // Filter for "earth" in chapter scope
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            "earth",
            null
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result,
                Has.Count.EqualTo(1),
                "GLS-05: only 1 token matches 'earth' filter"
            );
            Assert.That(
                result[0].Text,
                Is.EqualTo("earth"),
                "GLS-05: matching token is 'earth'"
            );
        });
    }

    #endregion

    #region Golden Master Test: Real XML Data Integration

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004: Integration test with real XML data parsed by ConvertToTokens")]
    public void GoldenMaster_RealXml_VerseScope_ReturnsCorrectTokens()
    {
        // Parse real XML data using already-implemented ConvertToTokens (CAP-002)
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        // Get links in verse 1 scope
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            null,
            null,
            null
        );

        Assert.Multiple(() =>
        {
            // Verse 1 of GEN in sample XML has 5 wg (TextLink) tokens:
            // "beginning", "God", "created", "heavens", "earth"
            Assert.That(
                result,
                Has.Count.EqualTo(5),
                "GEN 1:1 from real XML has 5 TextLink tokens"
            );
            Assert.That(
                result.All(t => t.Type == MarbleTokenType.TextLink),
                Is.True,
                "All returned tokens must be TextLink"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004: Integration test with real XML - section scope")]
    public void GoldenMaster_RealXml_SectionScope_ReturnsCorrectTokens()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        // Section scope at verse 1 - the sample has one section (s1) covering verses 1-2
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentSection,
            null,
            null,
            null
        );

        // Verse 1: 5 TextLinks + Verse 2: 1 TextLink ("earth") = 6 total
        Assert.That(
            result,
            Has.Count.EqualTo(6),
            "Section scope: GEN 1:1-2 has 6 TextLink tokens total"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-129")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004: Integration test with real XML - lexical_links filter")]
    public void GoldenMaster_RealXml_LexicalLinksFilter_ReturnsFilteredTokens()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        // Get only tokens with lexical_links in verse 1
        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentVerse,
            "lexical_links",
            null,
            null
        );

        // All 5 tokens in verse 1 have lexical_links (from the XML sample)
        Assert.That(
            result,
            Has.Count.EqualTo(5),
            "All 5 TextLink tokens in GEN 1:1 have lexical_links in the sample XML"
        );
        Assert.That(
            result.All(t => !string.IsNullOrEmpty(t.LexicalLinks)),
            Is.True,
            "All returned tokens must have non-empty lexical_links"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-131")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-052")]
    [Description("gm-004: Integration test with real XML - chapter scope")]
    public void GoldenMaster_RealXml_ChapterScope_ReturnsAllTokens()
    {
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        var result = MarbleDataParser.GetLinksInScope(
            tokens,
            new VerseReference(1, 1, 1),
            ScopeFilter.CurrentChapter,
            null,
            null,
            null
        );

        // Chapter scope: all 6 TextLink tokens in the sample (5 in verse 1, 1 in verse 2)
        Assert.That(
            result,
            Has.Count.EqualTo(6),
            "Chapter scope returns all 6 TextLink tokens in the sample XML"
        );
    }

    #endregion

    #region Reference Data

    // Sample XML based on PT9 MarbleDataParserTests.cs sampleResultGen1
    // Contains: s1 heading, verses 1-2, TextLink tokens with various link attributes
    // Reused from SectionBoundaryTests.cs for integration testing
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
        <wg target_links="00100100100004" strong="H7225" thematic_links="" lexical_links="SDBH:a:001001000" textual_links="HOTTP0" image_links="" map_links="" >
        beginning,
        </wg>
        <char style="nd" closed="">
        <wg target_links="00100100100008" strong="H0430" thematic_links="" lexical_links="SDBH:b:001003000" textual_links="HOTTP0" image_links="" map_links="" >
        God
        </wg>
        </char>
        <wg target_links="00100100100006" strong="H1254a" thematic_links="" lexical_links="SDBH:c:001002000" textual_links="HOTTP0" image_links="" map_links="" >
        created
        </wg>
        the
        <wg target_links="00100100100014" strong="H8064" thematic_links="" lexical_links="SDBH:d:001001000;SDBH:d:001001001" textual_links="" image_links="" map_links="" >
        heavens
        </wg>
        and the
        <wg target_links="00100100100022" strong="H0776" thematic_links="" lexical_links="SDBH:e:001001000" textual_links="" image_links="" map_links="" >
        earth.
        </wg>
        <verse chapter="1" style="v" code="GEN" pubnumber="2"/>
        The
        <wg target_links="00100100200006" strong="H0776" thematic_links="" lexical_links="SDBH:f:001001000" textual_links="" image_links="" map_links="" >
        earth
        </wg>
        was
        </para>
        </usx_book>
        </book>
        </usx>
        </EmdrosDump>
        """;

    #endregion
}
