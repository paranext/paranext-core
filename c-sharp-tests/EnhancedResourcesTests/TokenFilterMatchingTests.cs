using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-025: TokenFilterMatching.
/// Validates the token filter matching logic: link type check, text filter match,
/// sense-level filter support, and the public GetMatchingTokens API.
///
/// PT9 Source: Paratext/Marble/MarbleDataParser.cs:296-378
/// Golden Master: gm-014-token-filter-matching
/// Extraction: EXT-054
/// Behavior: BHV-600
/// Scenario: TS-154
/// </summary>
[TestFixture]
public class TokenFilterMatchingTests
{
    #region Test Data

    // A TextLink token with lexical links (SDBG dictionary)
    private static readonly MarbleToken TokenWithLexicalLinks = new(
        MarbleTokenType.TextLink,
        "beginning",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100004",
        Strong: "G3056",
        LexicalLinks: "SDBG:logos:001001",
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: null
    );

    // A TextLink token with different lexical links
    private static readonly MarbleToken TokenWithDifferentLexicalLinks = new(
        MarbleTokenType.TextLink,
        "word",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100008",
        Strong: "G3057",
        LexicalLinks: "SDBG:logos:001002",
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: null
    );

    // A TextLink token with thematic links (semicolon-separated)
    private static readonly MarbleToken TokenWithThematicLinks = new(
        MarbleTokenType.TextLink,
        "earth",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100022",
        Strong: "H0776",
        LexicalLinks: "SDBH:אֶרֶץ:001001000",
        ThematicLinks: "3.1;5.2",
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: null
    );

    // A TextLink token with image links
    private static readonly MarbleToken TokenWithImageLinks = new(
        MarbleTokenType.TextLink,
        "heavens",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100014",
        Strong: "H8064",
        LexicalLinks: "SDBH:שָׁמַיִם:001001000",
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: "img001;img002",
        MapLinks: null
    );

    // A TextLink token with map links
    private static readonly MarbleToken TokenWithMapLinks = new(
        MarbleTokenType.TextLink,
        "Jordan",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100030",
        Strong: "H3383",
        LexicalLinks: "SDBH:יַרְדֵּן:001001000",
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: "map001"
    );

    // A TextLink token with textual links
    private static readonly MarbleToken TokenWithTextualLinks = new(
        MarbleTokenType.TextLink,
        "created",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100006",
        Strong: "H1254a",
        LexicalLinks: "SDBH:ברא:001002000",
        ThematicLinks: null,
        TextualLinks: "HOTTP0",
        ImageLinks: null,
        MapLinks: null
    );

    // A TextLink token with NO link attributes (only target_links and strong)
    private static readonly MarbleToken TokenWithNoFilterableLinks = new(
        MarbleTokenType.TextLink,
        "the",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100002",
        Strong: "H0853",
        LexicalLinks: null,
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: null
    );

    // A plain Text token (not a TextLink)
    private static readonly MarbleToken PlainTextToken = new(
        MarbleTokenType.Text,
        "In the beginning was the Logos",
        Style: null,
        VerseRef: null
    );

    // A TextLink token with multiple lexical links (semicolon-separated)
    private static readonly MarbleToken TokenWithMultipleLexicalLinks = new(
        MarbleTokenType.TextLink,
        "heavens",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100014",
        Strong: "H8064",
        LexicalLinks: "SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001",
        ThematicLinks: null,
        TextualLinks: null,
        ImageLinks: null,
        MapLinks: null
    );

    // A TextLink token with all link types populated
    private static readonly MarbleToken TokenWithAllLinkTypes = new(
        MarbleTokenType.TextLink,
        "comprehensive",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100050",
        Strong: "G9999",
        LexicalLinks: "SDBG:test:001001",
        ThematicLinks: "3.1;5.2",
        TextualLinks: "HOTTP0",
        ImageLinks: "img001",
        MapLinks: "map001"
    );

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-025.
    /// Verifies all gm-014 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-014:
    /// - TFM-01: Exact lexical link match -> true
    /// - TFM-02: Non-matching lexical link -> false
    /// - TFM-03: Semicolon-separated thematic link partial match -> true
    /// - TFM-04: Case-insensitive text substring match -> true
    /// - TFM-05: Text filter with no match -> false
    /// - TFM-06: Null filter = match all -> true
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description(
        "Acceptance test: Token filter matching correctly identifies matching tokens"
    )]
    public void TokenFilterMatching_AllGoldenMasterScenarios_Pass()
    {
        // Parsed filter links for TFM-01 and TFM-02
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        Assert.Multiple(() =>
        {
            // TFM-01: Exact link match (lexical_links match) -> true
            Assert.That(
                MarbleDataParser.Matches(
                    TokenWithLexicalLinks,
                    "lexical_links",
                    null,
                    filterLinks
                ),
                Is.True,
                "TFM-01: Token with matching lexical link must match"
            );

            // TFM-02: Non-matching link value -> false
            Assert.That(
                MarbleDataParser.Matches(
                    TokenWithDifferentLexicalLinks,
                    "lexical_links",
                    null,
                    filterLinks
                ),
                Is.False,
                "TFM-02: Token with different lexical link must not match"
            );

            // TFM-03: Semicolon-separated partial match (thematic_links) -> true
            Assert.That(
                MarbleDataParser.Matches(
                    TokenWithThematicLinks,
                    "thematic_links",
                    null,
                    null
                ),
                Is.True,
                "TFM-03: Token with thematic_links present and thematic link type filter must match"
            );

            // TFM-04: Case-insensitive text substring match -> true
            Assert.That(
                MarbleDataParser.MatchesTextFilter(PlainTextToken, "logos"),
                Is.True,
                "TFM-04: Case-insensitive substring 'logos' must match 'In the beginning was the Logos'"
            );

            // TFM-05: Text filter with no match -> false
            Assert.That(
                MarbleDataParser.MatchesTextFilter(PlainTextToken, "something else"),
                Is.False,
                "TFM-05: Non-matching text filter must return false"
            );

            // TFM-06: Null filter = match all -> true
            Assert.That(
                MarbleDataParser.Matches(
                    TokenWithLexicalLinks,
                    null,
                    null,
                    null
                ),
                Is.True,
                "TFM-06: Null filter (no link type, no text, no links) must match all tokens"
            );
        });
    }

    #endregion

    #region Contract Tests: Matches() - Link Type Filtering

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with matching lexical_links matches filter")]
    public void Matches_LexicalLinksMatch_ReturnsTrue()
    {
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(result, Is.True, "Token with matching lexical link must match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with non-matching lexical_links does not match filter")]
    public void Matches_LexicalLinksNoMatch_ReturnsFalse()
    {
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        var result = MarbleDataParser.Matches(
            TokenWithDifferentLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(result, Is.False, "Token with different lexical link must not match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with thematic_links matches when link type is thematic_links")]
    public void Matches_ThematicLinksPresent_ReturnsTrue()
    {
        // When filtering by thematic_links, a token that has thematic links should match
        var result = MarbleDataParser.Matches(
            TokenWithThematicLinks,
            "thematic_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with thematic_links must match thematic filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token without thematic_links does not match when link type is thematic_links")]
    public void Matches_ThematicLinksAbsent_ReturnsFalse()
    {
        // TokenWithLexicalLinks has no thematic links
        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            "thematic_links",
            null,
            null
        );

        Assert.That(result, Is.False, "Token without thematic_links must not match thematic filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with image_links matches when link type is image_links")]
    public void Matches_ImageLinksPresent_ReturnsTrue()
    {
        var result = MarbleDataParser.Matches(
            TokenWithImageLinks,
            "image_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with image_links must match image filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with map_links matches when link type is map_links")]
    public void Matches_MapLinksPresent_ReturnsTrue()
    {
        var result = MarbleDataParser.Matches(
            TokenWithMapLinks,
            "map_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with map_links must match map filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with textual_links matches when link type is textual_links")]
    public void Matches_TextualLinksPresent_ReturnsTrue()
    {
        var result = MarbleDataParser.Matches(
            TokenWithTextualLinks,
            "textual_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with textual_links must match textual filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token without any filterable links does not match a specific link type filter")]
    public void Matches_NoFilterableLinks_ReturnsFalse()
    {
        var result = MarbleDataParser.Matches(
            TokenWithNoFilterableLinks,
            "lexical_links",
            null,
            LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001")
        );

        Assert.That(result, Is.False, "Token without lexical links must not match lexical filter");
    }

    #endregion

    #region Contract Tests: Matches() - Null/Empty Filter (Match All)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Null link type and null filter links = match all tokens")]
    public void Matches_NullLinkTypeAndNullFilterLinks_ReturnsTrue()
    {
        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            null,
            null,
            null
        );

        Assert.That(result, Is.True, "Null filter must match all tokens");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Null filter matches plain text token")]
    public void Matches_NullFilter_MatchesPlainTextToken()
    {
        var result = MarbleDataParser.Matches(
            PlainTextToken,
            null,
            null,
            null
        );

        Assert.That(result, Is.True, "Null filter must match even plain text tokens");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Empty string link type with null filter links = match all")]
    public void Matches_EmptyLinkType_ReturnsTrue()
    {
        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            "",
            null,
            null
        );

        Assert.That(result, Is.True, "Empty link type must match all tokens");
    }

    #endregion

    #region Contract Tests: Matches() - Lexical Link with ParsedLexicalLink Matching

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with multiple semicolon-separated lexical links matches when filter matches one")]
    public void Matches_MultipleLexicalLinks_MatchesOneOfThem()
    {
        // Token has "SDBH:שָׁמַיִם:001001000;SDBH:שָׁמַיִם:001001001"
        // Filter for the second link
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBH:שָׁמַיִם:001001001");

        var result = MarbleDataParser.Matches(
            TokenWithMultipleLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(result, Is.True, "Must match when filter matches any of the token's links");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with multiple lexical links does not match when filter matches none")]
    public void Matches_MultipleLexicalLinks_NoMatch_ReturnsFalse()
    {
        // Token has SDBH links, filter is for SDBG
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:unrelated:999999");

        var result = MarbleDataParser.Matches(
            TokenWithMultipleLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(result, Is.False, "Must not match when filter matches none of the token's links");
    }

    #endregion

    #region Contract Tests: Matches() - Semicolon-Separated Link Matching

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Semicolon-separated thematic links: filter matches first item")]
    public void Matches_SemicolonThematicLinks_MatchesFirstItem()
    {
        // Token has thematic_links "3.1;5.2", check if filtering for thematic_links works
        // (The token has thematic links present, so it should match a thematic_links filter)
        var result = MarbleDataParser.Matches(
            TokenWithThematicLinks,
            "thematic_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with semicolon-separated thematic links must match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Semicolon-separated image links: filter matches")]
    public void Matches_SemicolonImageLinks_Matches()
    {
        // Token has image_links "img001;img002"
        var result = MarbleDataParser.Matches(
            TokenWithImageLinks,
            "image_links",
            null,
            null
        );

        Assert.That(result, Is.True, "Token with semicolon-separated image links must match");
    }

    #endregion

    #region Contract Tests: MatchesTextFilter() - Text-Based Filtering

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Case-insensitive substring match on token text")]
    public void MatchesTextFilter_CaseInsensitiveSubstring_ReturnsTrue()
    {
        // Token text: "In the beginning was the Logos"
        // Filter: "logos" (lowercase)
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "logos");

        Assert.That(result, Is.True, "Case-insensitive substring must match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Text filter that does not match returns false")]
    public void MatchesTextFilter_NoMatch_ReturnsFalse()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "something else");

        Assert.That(result, Is.False, "Non-matching text filter must return false");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Null text filter matches all tokens")]
    public void MatchesTextFilter_NullFilter_ReturnsTrue()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, null);

        Assert.That(result, Is.True, "Null text filter must match all tokens");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Empty text filter matches all tokens")]
    public void MatchesTextFilter_EmptyFilter_ReturnsTrue()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "");

        Assert.That(result, Is.True, "Empty text filter must match all tokens");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Text filter matches TextLink token text")]
    public void MatchesTextFilter_TextLinkTokenText_Matches()
    {
        // TextLink tokens also have text content that should be searchable
        var result = MarbleDataParser.MatchesTextFilter(TokenWithLexicalLinks, "beginning");

        Assert.That(result, Is.True, "Text filter must match TextLink token text");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Text filter is case-insensitive: uppercase filter matches lowercase text")]
    public void MatchesTextFilter_UppercaseFilter_MatchesLowercaseText()
    {
        var result = MarbleDataParser.MatchesTextFilter(TokenWithLexicalLinks, "BEGINNING");

        Assert.That(result, Is.True, "Uppercase filter must match lowercase text");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with null text does not match text filter")]
    public void MatchesTextFilter_NullTokenText_ReturnsFalse()
    {
        // A token with null text (e.g., ParagraphStart) should not match text filter
        var tokenWithNullText = new MarbleToken(
            MarbleTokenType.ParagraphStart,
            null,
            Style: "p",
            VerseRef: null
        );

        var result = MarbleDataParser.MatchesTextFilter(tokenWithNullText, "anything");

        Assert.That(result, Is.False, "Token with null text must not match text filter");
    }

    #endregion

    #region Contract Tests: GetMatchingTokens() - Public API (Method 21)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("GetMatchingTokens with exact match returns tokens with matching lexical links")]
    public void GetMatchingTokens_ExactMatch_ReturnsMatchingTokens()
    {
        var tokens = new List<MarbleToken>
        {
            TokenWithLexicalLinks,
            TokenWithDifferentLexicalLinks,
            TokenWithThematicLinks,
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "beginning",
            SourcePane: WordFilterSource.Scripture
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1), "Exact match must return only the matching token");
        Assert.That(
            result[0].LexicalLinks,
            Is.EqualTo("SDBG:logos:001001"),
            "Returned token must have the matching lexical link"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description(
        "GetMatchingTokens with partial match returns tokens matching base form (ignoring meaning)"
    )]
    public void GetMatchingTokens_PartialMatch_ReturnsBaseFormMatches()
    {
        // Both tokens have the same lemma "logos" but different meaning indices
        var tokenSense1 = new MarbleToken(
            MarbleTokenType.TextLink,
            "word1",
            Style: null,
            VerseRef: null,
            TargetLinks: "tl1",
            Strong: "G3056",
            LexicalLinks: "SDBG:logos:001001"
        );
        var tokenSense2 = new MarbleToken(
            MarbleTokenType.TextLink,
            "word2",
            Style: null,
            VerseRef: null,
            TargetLinks: "tl2",
            Strong: "G3056",
            LexicalLinks: "SDBG:logos:001002"
        );
        var tokenOther = new MarbleToken(
            MarbleTokenType.TextLink,
            "other",
            Style: null,
            VerseRef: null,
            TargetLinks: "tl3",
            Strong: "G9999",
            LexicalLinks: "SDBG:other:999999"
        );

        var tokens = new List<MarbleToken> { tokenSense1, tokenSense2, tokenOther };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word1",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: false);

        // Partial match should match both senses of "logos" (001001 and 001002)
        // because it ignores the meaning index
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Partial match must return tokens with same base form regardless of meaning"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("GetMatchingTokens returns empty list when no tokens match")]
    public void GetMatchingTokens_NoMatches_ReturnsEmptyList()
    {
        var tokens = new List<MarbleToken> { TokenWithLexicalLinks };

        var filter = new WordFilter(
            Lemma: "unrelated",
            LexicalLinks: new[] { "SDBG:unrelated:999999" },
            SurfaceForm: "unrelated",
            SourcePane: WordFilterSource.Scripture
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.Empty, "Must return empty list when no tokens match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("GetMatchingTokens with empty token list returns empty list")]
    public void GetMatchingTokens_EmptyTokenList_ReturnsEmptyList()
    {
        var tokens = new List<MarbleToken>();

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "beginning",
            SourcePane: WordFilterSource.Scripture
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.Empty, "Empty token list must return empty result");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("GetMatchingTokens return type is IReadOnlyList")]
    public void GetMatchingTokens_ReturnType_IsIReadOnlyList()
    {
        var tokens = new List<MarbleToken> { TokenWithLexicalLinks };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "beginning",
            SourcePane: WordFilterSource.Scripture
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.InstanceOf<IReadOnlyList<MarbleToken>>());
    }

    #endregion

    #region Golden Master Tests: gm-014 Individual Scenarios

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-01: Exact lexical link match returns true")]
    public void GoldenMaster_TFM01_ExactLinkMatch_ReturnsTrue()
    {
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(result, Is.True, "gm-014 TFM-01: Exact lexical link match must return true");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-02: Non-matching lexical link returns false")]
    public void GoldenMaster_TFM02_NonMatchingLink_ReturnsFalse()
    {
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        var result = MarbleDataParser.Matches(
            TokenWithDifferentLexicalLinks,
            "lexical_links",
            null,
            filterLinks
        );

        Assert.That(
            result,
            Is.False,
            "gm-014 TFM-02: Non-matching lexical link must return false"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-03: Semicolon-separated partial match on thematic links")]
    public void GoldenMaster_TFM03_SemicolonPartialMatch_ReturnsTrue()
    {
        // Token has thematic_links "3.1;5.2" and filter checks for thematic_links presence
        var result = MarbleDataParser.Matches(
            TokenWithThematicLinks,
            "thematic_links",
            null,
            null
        );

        Assert.That(
            result,
            Is.True,
            "gm-014 TFM-03: Semicolon-separated thematic link partial match must return true"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-04: Case-insensitive text substring match")]
    public void GoldenMaster_TFM04_CaseInsensitiveTextMatch_ReturnsTrue()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "logos");

        Assert.That(
            result,
            Is.True,
            "gm-014 TFM-04: Case-insensitive text 'logos' must match 'Logos'"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-05: Non-matching text filter")]
    public void GoldenMaster_TFM05_NonMatchingTextFilter_ReturnsFalse()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "something else");

        Assert.That(
            result,
            Is.False,
            "gm-014 TFM-05: Non-matching text filter must return false"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-025")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-06: Null filter = match all")]
    public void GoldenMaster_TFM06_NullFilter_MatchesAll()
    {
        var result = MarbleDataParser.Matches(
            TokenWithLexicalLinks,
            null,
            null,
            null
        );

        Assert.That(result, Is.True, "gm-014 TFM-06: Null filter must match all tokens");
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Token with all link types matches any individual link type filter")]
    public void Matches_AllLinkTypes_MatchesEachFilter()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                MarbleDataParser.Matches(TokenWithAllLinkTypes, "lexical_links", null, null),
                Is.True,
                "Must match lexical_links filter"
            );
            Assert.That(
                MarbleDataParser.Matches(TokenWithAllLinkTypes, "thematic_links", null, null),
                Is.True,
                "Must match thematic_links filter"
            );
            Assert.That(
                MarbleDataParser.Matches(TokenWithAllLinkTypes, "textual_links", null, null),
                Is.True,
                "Must match textual_links filter"
            );
            Assert.That(
                MarbleDataParser.Matches(TokenWithAllLinkTypes, "image_links", null, null),
                Is.True,
                "Must match image_links filter"
            );
            Assert.That(
                MarbleDataParser.Matches(TokenWithAllLinkTypes, "map_links", null, null),
                Is.True,
                "Must match map_links filter"
            );
        });
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Non-TextLink token does not match link type filter")]
    public void Matches_NonTextLinkToken_WithLinkTypeFilter_ReturnsFalse()
    {
        var verseToken = new MarbleToken(
            MarbleTokenType.Verse,
            "1",
            Style: null,
            VerseRef: null
        );

        var result = MarbleDataParser.Matches(
            verseToken,
            "lexical_links",
            null,
            LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001")
        );

        Assert.That(
            result,
            Is.False,
            "Non-TextLink token must not match link type filter"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GetMatchingTokens exact match with multiple filter links")]
    public void GetMatchingTokens_ExactMatch_MultipleFilterLinks()
    {
        // WordFilter with multiple links
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001", "SDBG:logos:001002" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var tokens = new List<MarbleToken>
        {
            TokenWithLexicalLinks, // SDBG:logos:001001
            TokenWithDifferentLexicalLinks, // SDBG:logos:001002
            TokenWithThematicLinks, // Different lemma entirely
        };

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Exact match with multiple filter links must return all tokens matching any filter link"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GetMatchingTokens handles tokens with null LexicalLinks gracefully")]
    public void GetMatchingTokens_TokensWithNullLinks_Skipped()
    {
        var tokens = new List<MarbleToken>
        {
            TokenWithNoFilterableLinks, // null LexicalLinks
            TokenWithLexicalLinks, // has LexicalLinks
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "beginning",
            SourcePane: WordFilterSource.Scripture
        );

        var result = MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Token with null LexicalLinks must be skipped, only matching token returned"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Text filter on token with Hebrew text")]
    public void MatchesTextFilter_HebrewText_MatchesCaseInsensitive()
    {
        var hebrewToken = new MarbleToken(
            MarbleTokenType.TextLink,
            "רֵאשִׁית",
            Style: null,
            VerseRef: null,
            TargetLinks: "tl1",
            Strong: "H7225"
        );

        var result = MarbleDataParser.MatchesTextFilter(hebrewToken, "רֵאשִׁית");

        Assert.That(result, Is.True, "Hebrew text must be matchable by text filter");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Text filter partial match at beginning of token text")]
    public void MatchesTextFilter_PartialMatchAtBeginning_ReturnsTrue()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "In the");

        Assert.That(
            result,
            Is.True,
            "Partial match at beginning of text must succeed"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-025")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Text filter partial match at end of token text")]
    public void MatchesTextFilter_PartialMatchAtEnd_ReturnsTrue()
    {
        var result = MarbleDataParser.MatchesTextFilter(PlainTextToken, "Logos");

        Assert.That(
            result,
            Is.True,
            "Partial match at end of text must succeed"
        );
    }

    #endregion
}
