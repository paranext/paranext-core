using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-021: GetMatchingTokens public API (Method 21).
/// Validates the public command API that filters tokens by a WordFilter,
/// supporting exact match (ScripturePane) and partial match (DictionaryTab) modes.
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs GetMatchingTokens logic
/// Golden Master: gm-014-token-filter-matching
/// Extraction: EXT-054
/// Behavior: BHV-600
/// Scenario: TS-154
///
/// Dependencies: CAP-025 (Matches/MatchesTextFilter already implemented),
///               CAP-005 (ParseLexicalLinks already implemented)
/// </summary>
[TestFixture]
public class GetMatchingTokensTests
{
    #region Test Data

    // --- Greek (SDBG) tokens ---

    /// <summary>Token with SDBG lexical link "SDBG:logos:001001" (sense 1).</summary>
    private static readonly MarbleToken GreekTokenSense1 = new(
        MarbleTokenType.TextLink,
        "word",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100004",
        Strong: "G3056",
        LexicalLinks: "SDBG:logos:001001"
    );

    /// <summary>Token with SDBG lexical link "SDBG:logos:001002" (sense 2, same base form).</summary>
    private static readonly MarbleToken GreekTokenSense2 = new(
        MarbleTokenType.TextLink,
        "speech",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100200008",
        Strong: "G3056",
        LexicalLinks: "SDBG:logos:001002"
    );

    /// <summary>Token with SDBG lexical link "SDBG:logos:002001" (different base form index).</summary>
    private static readonly MarbleToken GreekTokenDifferentBaseForm = new(
        MarbleTokenType.TextLink,
        "reason",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100300012",
        Strong: "G3056",
        LexicalLinks: "SDBG:logos:002001"
    );

    /// <summary>Token with unrelated SDBG lexical link.</summary>
    private static readonly MarbleToken GreekTokenUnrelated = new(
        MarbleTokenType.TextLink,
        "light",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100400016",
        Strong: "G5457",
        LexicalLinks: "SDBG:phos:001001"
    );

    // --- Hebrew (SDBH) tokens with 9-digit format ---

    /// <summary>Token with SDBH lexical link "SDBH:דָּבָר:001001000" (sense 1).</summary>
    private static readonly MarbleToken HebrewTokenSense1 = new(
        MarbleTokenType.TextLink,
        "דָּבָר",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100003",
        Strong: "H1697",
        LexicalLinks: "SDBH:דָּבָר:001001000"
    );

    /// <summary>Token with SDBH lexical link "SDBH:דָּבָר:001002000" (sense 2, same base form).</summary>
    private static readonly MarbleToken HebrewTokenSense2 = new(
        MarbleTokenType.TextLink,
        "דְּבַר",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100200007",
        Strong: "H1697",
        LexicalLinks: "SDBH:דָּבָר:001002000"
    );

    /// <summary>Token with SDBH unrelated lexical link.</summary>
    private static readonly MarbleToken HebrewTokenUnrelated = new(
        MarbleTokenType.TextLink,
        "אֶרֶץ",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100300011",
        Strong: "H0776",
        LexicalLinks: "SDBH:אֶרֶץ:001001000"
    );

    // --- Tokens with multiple links ---

    /// <summary>Token with two semicolon-separated SDBG lexical links.</summary>
    private static readonly MarbleToken TokenWithMultipleLinks = new(
        MarbleTokenType.TextLink,
        "beginning",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100001",
        Strong: "G0746",
        LexicalLinks: "SDBG:arche:001001;SDBG:arche:001002"
    );

    // --- Non-TextLink tokens ---

    /// <summary>A Verse token (should never match).</summary>
    private static readonly MarbleToken VerseToken = new(
        MarbleTokenType.Verse,
        "1",
        Style: null,
        VerseRef: null
    );

    /// <summary>A ParagraphStart token (should never match).</summary>
    private static readonly MarbleToken ParagraphToken = new(
        MarbleTokenType.ParagraphStart,
        null,
        Style: "p",
        VerseRef: null
    );

    /// <summary>A plain Text token (no lexical links, should never match).</summary>
    private static readonly MarbleToken PlainTextToken = new(
        MarbleTokenType.Text,
        "some plain text",
        Style: null,
        VerseRef: null
    );

    /// <summary>A TextLink token with null LexicalLinks (should never match).</summary>
    private static readonly MarbleToken TextLinkNoLinks = new(
        MarbleTokenType.TextLink,
        "empty",
        Style: null,
        VerseRef: null,
        TargetLinks: "00100100100099",
        Strong: "G0001",
        LexicalLinks: null
    );

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-021.
    /// Verifies the complete GetMatchingTokens public API:
    /// - Exact match (ScripturePane) returns only tokens with exactly matching links
    /// - Partial match (DictionaryTab) returns tokens sharing the same base form
    /// - Non-matching tokens are excluded
    /// - Non-TextLink tokens are excluded
    /// - Empty and null links are handled gracefully
    ///
    /// When this test passes, the CAP-021 capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-021")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("Acceptance test: GetMatchingTokens returns correct tokens for word filter")]
    public void GetMatchingTokens_AcceptanceTest_FullPipeline()
    {
        // Arrange: Mixed token list with matching and non-matching tokens
        var tokens = new List<MarbleToken>
        {
            GreekTokenSense1, // SDBG:logos:001001
            GreekTokenSense2, // SDBG:logos:001002 (same base form, different meaning)
            GreekTokenDifferentBaseForm, // SDBG:logos:002001 (different base form)
            GreekTokenUnrelated, // SDBG:phos:001001 (completely different lemma)
            VerseToken, // Non-TextLink
            PlainTextToken, // Non-TextLink
            TextLinkNoLinks, // TextLink but no lexical links
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        Assert.Multiple(() =>
        {
            // Act: Exact match (ScripturePane) -- should return only sense1
            var exactResult = TokenFilterService.GetMatchingTokens(
                tokens,
                filter,
                exactMatch: true
            );

            Assert.That(
                exactResult,
                Has.Count.EqualTo(1),
                "Exact match should return only the token with exactly matching link"
            );
            Assert.That(
                exactResult[0].LexicalLinks,
                Is.EqualTo("SDBG:logos:001001"),
                "Exact match must return the token with full link match"
            );

            // Act: Partial match (DictionaryTab) -- should return sense1 + sense2
            // (both share base form "logos:001")
            var partialResult = TokenFilterService.GetMatchingTokens(
                tokens,
                filter,
                exactMatch: false
            );

            Assert.That(
                partialResult,
                Has.Count.EqualTo(2),
                "Partial match should return tokens sharing the same base form (Dictionary+Lemma+BaseFormIndex)"
            );
        });
    }

    #endregion

    #region Contract Tests: Exact Match (ScripturePane)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Exact match returns only tokens with full link match")]
    public void GetMatchingTokens_ExactMatch_ReturnsOnlyExactLinkMatch()
    {
        var tokens = new List<MarbleToken>
        {
            GreekTokenSense1,
            GreekTokenSense2,
            GreekTokenUnrelated,
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].LexicalLinks, Is.EqualTo("SDBG:logos:001001"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Exact match with multiple filter links returns tokens matching any filter link")]
    public void GetMatchingTokens_ExactMatch_MultipleFilterLinks_MatchesAny()
    {
        var tokens = new List<MarbleToken>
        {
            GreekTokenSense1,
            GreekTokenSense2,
            GreekTokenUnrelated,
        };

        // Filter with two exact links
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001", "SDBG:logos:001002" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Exact match with two filter links should return both matching tokens"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Exact match does not match different meaning index")]
    public void GetMatchingTokens_ExactMatch_DifferentMeaning_DoesNotMatch()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense2 }; // SDBG:logos:001002

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" }, // Different meaning
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Is.Empty,
            "Exact match must not match tokens with different meaning index"
        );
    }

    #endregion

    #region Contract Tests: Partial Match (DictionaryTab)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Partial match returns tokens sharing same base form (ignoring meaning index)")]
    public void GetMatchingTokens_PartialMatch_MatchesBaseForm()
    {
        var tokens = new List<MarbleToken>
        {
            GreekTokenSense1, // SDBG:logos:001001
            GreekTokenSense2, // SDBG:logos:001002 (same base form 001)
            GreekTokenDifferentBaseForm, // SDBG:logos:002001 (different base form 002)
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        // Partial match: Dictionary+Lemma+BaseFormIndex match (ignoring meaning index)
        // SDBG:logos:001001 -> base form 001 -> matches
        // SDBG:logos:001002 -> base form 001 -> matches
        // SDBG:logos:002001 -> base form 002 -> does NOT match
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Partial match must return both senses sharing same base form"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Partial match does not match different base form index")]
    public void GetMatchingTokens_PartialMatch_DifferentBaseForm_DoesNotMatch()
    {
        var tokens = new List<MarbleToken>
        {
            GreekTokenDifferentBaseForm, // SDBG:logos:002001
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" }, // base form 001
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        Assert.That(
            result,
            Is.Empty,
            "Partial match must not match different base form index"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Partial match does not match different dictionary")]
    public void GetMatchingTokens_PartialMatch_DifferentDictionary_DoesNotMatch()
    {
        // Hebrew token with SDBH dictionary
        var tokens = new List<MarbleToken> { HebrewTokenSense1 }; // SDBH:...

        // Filter for SDBG dictionary
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        Assert.That(
            result,
            Is.Empty,
            "Partial match must not match different dictionary (SDBH vs SDBG)"
        );
    }

    #endregion

    #region Contract Tests: Hebrew (SDBH) Link Format

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Hebrew SDBH 9-digit links match correctly in exact mode")]
    public void GetMatchingTokens_HebrewLinks_ExactMatch()
    {
        var tokens = new List<MarbleToken>
        {
            HebrewTokenSense1, // SDBH:דָּבָר:001001000
            HebrewTokenSense2, // SDBH:דָּבָר:001002000
            HebrewTokenUnrelated, // SDBH:אֶרֶץ:001001000
        };

        var filter = new WordFilter(
            Lemma: "דָּבָר",
            LexicalLinks: new[] { "SDBH:דָּבָר:001001000" },
            SurfaceForm: "דָּבָר",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1), "Exact match should return only sense1");
        Assert.That(result[0].LexicalLinks, Is.EqualTo("SDBH:דָּבָר:001001000"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Hebrew SDBH 9-digit links partial match groups by base form")]
    public void GetMatchingTokens_HebrewLinks_PartialMatch()
    {
        var tokens = new List<MarbleToken>
        {
            HebrewTokenSense1, // SDBH:דָּבָר:001001000
            HebrewTokenSense2, // SDBH:דָּבָר:001002000
            HebrewTokenUnrelated, // SDBH:אֶרֶץ:001001000
        };

        var filter = new WordFilter(
            Lemma: "דָּבָר",
            LexicalLinks: new[] { "SDBH:דָּבָר:001001000" },
            SurfaceForm: "דָּבָר",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        // Partial match: SDBH + דָּבָר + 001 = base form match
        // sense1 (001001000): base form 001 -> matches
        // sense2 (001002000): base form 001 -> matches
        // unrelated (אֶרֶץ:001001000): different lemma -> does NOT match
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Partial match should return both senses of Hebrew lemma"
        );
    }

    #endregion

    #region Contract Tests: Return Type and Empty Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Return type is IReadOnlyList<MarbleToken>")]
    public void GetMatchingTokens_ReturnType_IsIReadOnlyList()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense1 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.InstanceOf<IReadOnlyList<MarbleToken>>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Empty token list returns empty result")]
    public void GetMatchingTokens_EmptyTokenList_ReturnsEmpty()
    {
        var tokens = new List<MarbleToken>();
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.Empty, "Empty token list must return empty result");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("No matching tokens returns empty list (not null)")]
    public void GetMatchingTokens_NoMatches_ReturnsEmptyNotNull()
    {
        var tokens = new List<MarbleToken> { GreekTokenUnrelated };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.Not.Null, "Result must never be null");
        Assert.That(result, Is.Empty, "Non-matching tokens must return empty list");
    }

    #endregion

    #region Contract Tests: Token Type Filtering

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Non-TextLink tokens are excluded from results")]
    public void GetMatchingTokens_NonTextLinkTokens_Excluded()
    {
        var tokens = new List<MarbleToken>
        {
            VerseToken,
            ParagraphToken,
            PlainTextToken,
            GreekTokenSense1, // Only this should match
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1), "Only TextLink tokens can match");
        Assert.That(result[0].Type, Is.EqualTo(MarbleTokenType.TextLink));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("TextLink token with null LexicalLinks is excluded")]
    public void GetMatchingTokens_TextLinkNullLexicalLinks_Excluded()
    {
        var tokens = new List<MarbleToken>
        {
            TextLinkNoLinks, // TextLink but LexicalLinks is null
            GreekTokenSense1,
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "TextLink with null LexicalLinks must be excluded"
        );
    }

    #endregion

    #region Contract Tests: Multi-Link Tokens

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with multiple semicolon-separated links matches when any link matches")]
    public void GetMatchingTokens_MultiLinkToken_MatchesAnyLink()
    {
        var tokens = new List<MarbleToken> { TokenWithMultipleLinks };
        // Token has "SDBG:arche:001001;SDBG:arche:001002"

        // Filter for the second link
        var filter = new WordFilter(
            Lemma: "arche",
            LexicalLinks: new[] { "SDBG:arche:001002" },
            SurfaceForm: "beginning",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Token must match when any of its semicolon-separated links matches the filter"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-054")]
    [Description("Token with multiple links does not match when none of its links match")]
    public void GetMatchingTokens_MultiLinkToken_NoneMatch_Excluded()
    {
        var tokens = new List<MarbleToken> { TokenWithMultipleLinks };
        // Token has "SDBG:arche:001001;SDBG:arche:001002"

        // Filter for a completely different lemma
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Is.Empty, "Token must not match when none of its links match");
    }

    #endregion

    #region Golden Master Tests: gm-014 Scenarios via GetMatchingTokens API

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-021")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-01 via API: Exact link match returns matching token")]
    public void GoldenMaster_TFM01_ExactMatch_ReturnsToken()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense1 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1), "gm-014 TFM-01: Exact match returns token");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-021")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-02 via API: Non-matching link excludes token")]
    public void GoldenMaster_TFM02_NonMatchingLink_ExcludesToken()
    {
        // Token has SDBG:logos:001002, filter is for 001001
        var tokens = new List<MarbleToken> { GreekTokenSense2 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Is.Empty,
            "gm-014 TFM-02: Non-matching link must exclude token in exact mode"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-021")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-154")]
    [Description("gm-014 TFM-06 via API: Partial match includes same base form")]
    public void GoldenMaster_TFM06_PartialMatch_IncludesSameBaseForm()
    {
        // Both tokens share base form 001 but different meanings
        var tokens = new List<MarbleToken> { GreekTokenSense1, GreekTokenSense2 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "gm-014: Partial match must include both senses of same base form"
        );
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Filter with empty LexicalLinks array returns empty result")]
    public void GetMatchingTokens_EmptyFilterLinks_ReturnsEmpty()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense1 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: Array.Empty<string>(),
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Is.Empty,
            "Empty filter links must produce empty result (nothing to match against)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Large token list is filtered correctly")]
    public void GetMatchingTokens_LargeTokenList_FiltersCorrectly()
    {
        // Simulate a realistic chapter with many tokens
        var tokens = new List<MarbleToken>();
        for (int i = 0; i < 100; i++)
        {
            tokens.Add(
                new MarbleToken(
                    MarbleTokenType.TextLink,
                    $"word{i}",
                    Style: null,
                    VerseRef: null,
                    TargetLinks: $"tl{i:D14}",
                    Strong: $"G{i:D4}",
                    LexicalLinks: $"SDBG:word{i}:001001"
                )
            );
        }

        // Add the token we actually want to find
        tokens.Add(GreekTokenSense1);

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(result, Has.Count.EqualTo(1), "Must find the matching token in a large list");
        Assert.That(result[0].LexicalLinks, Is.EqualTo("SDBG:logos:001001"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Token with empty string LexicalLinks is excluded")]
    public void GetMatchingTokens_EmptyStringLexicalLinks_Excluded()
    {
        var tokenWithEmptyLinks = new MarbleToken(
            MarbleTokenType.TextLink,
            "test",
            Style: null,
            VerseRef: null,
            TargetLinks: "tl1",
            Strong: "G0001",
            LexicalLinks: ""
        );

        var tokens = new List<MarbleToken> { tokenWithEmptyLinks, GreekTokenSense1 };
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Token with empty string LexicalLinks must be excluded"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Result preserves order from input token list")]
    public void GetMatchingTokens_PreservesInputOrder()
    {
        var tokens = new List<MarbleToken>
        {
            GreekTokenSense2, // SDBG:logos:001002
            GreekTokenUnrelated,
            GreekTokenSense1, // SDBG:logos:001001
        };

        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Dictionary
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: false);

        Assert.That(result, Has.Count.EqualTo(2));
        // Order should be preserved from the input list
        Assert.That(
            result[0].LexicalLinks,
            Is.EqualTo("SDBG:logos:001002"),
            "First matched token should be sense2 (appeared first in input)"
        );
        Assert.That(
            result[1].LexicalLinks,
            Is.EqualTo("SDBG:logos:001001"),
            "Second matched token should be sense1 (appeared second in input)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Filter with invalid link format in LexicalLinks is handled gracefully")]
    public void GetMatchingTokens_InvalidFilterLink_HandledGracefully()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense1 };

        // Invalid link format (not enough colons)
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "invalidlink" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        // Should not throw; just return empty (invalid link cannot match anything)
        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Is.Empty,
            "Invalid filter link format must not throw; should return empty"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-021")]
    [Property("ScenarioId", "TS-154")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Filter with mixed valid and invalid links uses only valid ones")]
    public void GetMatchingTokens_MixedValidInvalidFilterLinks_UsesValidOnly()
    {
        var tokens = new List<MarbleToken> { GreekTokenSense1 };

        // One valid, one invalid link
        var filter = new WordFilter(
            Lemma: "logos",
            LexicalLinks: new[] { "invalidlink", "SDBG:logos:001001" },
            SurfaceForm: "word",
            SourcePane: WordFilterSource.Scripture
        );

        var result = TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch: true);

        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Valid filter link should still match despite invalid sibling"
        );
    }

    #endregion
}
