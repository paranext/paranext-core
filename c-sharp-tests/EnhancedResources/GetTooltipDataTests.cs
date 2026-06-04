using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using Paranext.DataProvider.Errors;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for GetTooltipData - structured tooltip data for linked words.
/// CAP-014: GetTooltipData
///
/// Behaviors: BHV-354 (BeforeNavigate URL Routing - tooltip display context)
/// Contract: Section 4.14 M-014: GetTooltipDataAsync(TooltipInput, CancellationToken) -> TooltipData
/// Source: EXT-002 (Tooltip Generation, PT9 MarbleForm.cs:2589-2670)
///
/// Phase 3a DTO shape (working-docs/2026-05-15-er-editor-integration-followup-design.md §5b):
/// TooltipData is now a "raw data" DTO with SourceForm, Lemma, PartOfSpeechRaw,
/// RawGlosses, and RenderingStatus. The TS presenter
/// (extensions/src/platform-enhanced-resources/src/presenters/tooltip-presenter.ts)
/// handles gloss filtering, phrase detection, and POS localization; the markdown
/// emitter handles layout and i18n. RenderingStatus is always null until phase 3b
/// wires it against the user's tracked project.
///
/// Key behaviors:
/// - Token not found: NOT_FOUND PlatformError
/// - No gloss available: RawGlosses is empty (not an error)
/// - Lemma parsed from first LexicalLink ("DICT:LEMMA:ID") or falls back to surface text
/// - SourceForm always equals token.Text (the surface form)
/// - PartOfSpeechRaw is the raw style tag (e.g. "noun-dans"); TS layer localizes
/// - Uses MarbleDataAccessService for gloss lookup (CAP-001)
/// - Parsed tokens from MarbleTokenParser (CAP-002) provide token data
///
/// No golden masters for this capability (consumed by UI layer).
/// Acceptance verified via property assertions on TooltipData structure.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class GetTooltipDataTests
{
    // =========================================================================
    // Test data constants
    // =========================================================================

    private const string TestResourceId = "ESV16UK+";
    private const string TestGlossLanguage = "en";

    // Greek noun token data (simulates a parsed TextLink token with annotations).
    // LexicalLinks contains a single token without ':' separators, so the service's
    // ParseLemmaFromLink returns null and lemma falls back to token.Text ("λόγος").
    private static readonly MarbleToken s_greekNounToken =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "λόγος", // logos
            Index: 5,
            VerseRef: new VerseRef(43, 1, 1), // JHN 1:1
            StrongNumber: "G3056",
            LexicalLinks: ["logos_entry_ref"],
            TargetLinks: ["target1"],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );

    // Greek noun token with well-formed "DICT:LEMMA:ID" lexical link. Used to verify
    // that the service parses the middle segment as the lemma (SDBG dictionary,
    // lemma "logos", entry id 001003056).
    private static readonly MarbleToken s_greekNounTokenWithDictLink =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "λόγος", // logos (surface form)
            Index: 6,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: "G3056",
            LexicalLinks: ["SDBG:logos:001003056"],
            TargetLinks: [],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );

    // Hebrew noun token data
    private static readonly MarbleToken s_hebrewNounToken =
        new(
            Type: MarbleTokenType.TextLink,
            Text: MarbleTestHelper.Elohim,
            Index: 3,
            VerseRef: new VerseRef(1, 1, 1), // GEN 1:1
            StrongNumber: "H430",
            LexicalLinks: ["elohim_entry_ref"],
            TargetLinks: [],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );

    // Token with no lexical links (plain text that has a strong number but no dictionary entry)
    private static readonly MarbleToken s_tokenWithNoGloss =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "someRareWord",
            Index: 10,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: "G9999",
            LexicalLinks: ["nonexistent_entry"],
            TargetLinks: [],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );

    // Token with POS annotation (compound Greek tag in Style attribute)
    private static readonly MarbleToken s_tokenWithPos =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "λόγος", // logos
            Index: 5,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: "G3056",
            LexicalLinks: ["logos_entry_ref"],
            TargetLinks: ["target1"],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: [],
            Style: "noun-dans" // POS tag (raw - TS presenter handles localization)
        );

    #region Acceptance Tests

    // =========================================================================
    // Acceptance Test 1: Full tooltip data with surface form, lemma, POS, glosses
    // "TooltipData returned with raw fields populated for downstream TS presenter"
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Full tooltip data contains source form, lemma, and raw glosses when all data is available"
    )]
    public void GetTooltipData_FullTokenData_ReturnsCompleteTooltipData()
    {
        // Arrange: A token with all annotations, marble data initialized with gloss data
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: all fields populated for a fully-annotated token
        Assert.That(result, Is.Not.Null, "TooltipData must not be null for a valid token");
        Assert.That(
            result.SourceForm,
            Is.EqualTo(s_greekNounToken.Text),
            "SourceForm must match the token's surface text"
        );
        Assert.That(
            result.Lemma,
            Is.Not.Null.And.Not.Empty,
            "Lemma must be present for a TextLink token"
        );
        Assert.That(
            result.RawGlosses,
            Is.Not.Null,
            "RawGlosses must not be null (may be empty if no glosses)"
        );
        Assert.That(result.RenderingStatus, Is.Null, "RenderingStatus is always null in phase 3a");
    }

    // =========================================================================
    // Acceptance Test 2: Missing gloss returns partial tooltip (not an error)
    // "missing gloss returns empty RawGlosses without throwing"
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Missing gloss returns TooltipData with empty RawGlosses - not an error, partial data is valid"
    )]
    public void GetTooltipData_NoGlossAvailable_ReturnsPartialTooltipWithoutGloss()
    {
        // Arrange: Token has a strong number and lemma but no gloss entry in marble data
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_tokenWithNoGloss
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_tokenWithNoGloss.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act: This should NOT throw - missing gloss is not an error
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: Tooltip returned with partial data
        Assert.That(result, Is.Not.Null, "Partial tooltip must be returned, not null");
        Assert.That(
            result.SourceForm,
            Is.EqualTo(s_tokenWithNoGloss.Text),
            "SourceForm must match the token's surface text even with no gloss"
        );
        Assert.That(
            result.RawGlosses,
            Is.Empty,
            "RawGlosses must be empty when no gloss is available in marble data"
        );
        Assert.That(
            result.Lemma,
            Is.Not.Null.And.Not.Empty,
            "Lemma must still be present in partial tooltip"
        );
        Assert.That(result.RenderingStatus, Is.Null);
    }

    #endregion

    #region Contract Tests - Happy Path

    // =========================================================================
    // Contract: GetTooltipData returns Lemma falling back to surface text when
    // the lexical link is not in "DICT:LEMMA:ID" form.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "TooltipData.Lemma falls back to token.Text when LexicalLinks lacks 'DICT:LEMMA:ID' format"
    )]
    public void GetTooltipData_LexicalLinkWithoutColons_LemmaFallsBackToSurfaceText()
    {
        // Arrange: s_greekNounToken has LexicalLinks: ["logos_entry_ref"] (no ':'),
        // so the service's ParseLemmaFromLink returns null and lemma defaults to
        // token.Text (the surface form).
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(
            result.SourceForm,
            Is.EqualTo(s_greekNounToken.Text),
            "SourceForm should always match the token's surface text"
        );
        Assert.That(
            result.Lemma,
            Is.EqualTo(s_greekNounToken.Text),
            "Lemma should fall back to surface text when lexical link is not 'DICT:LEMMA:ID'"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "TooltipData.Lemma is parsed from the middle segment of a 'DICT:LEMMA:ID' lexical link"
    )]
    public void GetTooltipData_WellFormedLexicalLink_LemmaParsedFromMiddleSegment()
    {
        // Arrange: s_greekNounTokenWithDictLink has LexicalLinks: ["SDBG:logos:001003056"],
        // so the service parses the middle segment ("logos") as the lemma. The surface
        // form is the Greek "λόγος".
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounTokenWithDictLink
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounTokenWithDictLink.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(
            result.SourceForm,
            Is.EqualTo(s_greekNounTokenWithDictLink.Text),
            "SourceForm should be the surface form (Greek text)"
        );
        Assert.That(
            result.Lemma,
            Is.EqualTo("logos"),
            "Lemma should be parsed from the middle ':'-delimited segment"
        );
        Assert.That(
            result.SourceForm,
            Is.Not.EqualTo(result.Lemma),
            "SourceForm and Lemma should differ when the lexical link supplies a distinct lemma"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "TooltipData.RawGlosses contains the unfiltered glosses from MarbleDataAccessService"
    )]
    public void GetTooltipData_GlossAvailable_RawGlossesFromMarbleData()
    {
        // Arrange: Configure marble data with a known gloss list for the token's surface form.
        // The service uses token.Text as the term key (not the parsed lemma).
        var byLanguage = new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["en"] = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
            {
                [s_greekNounToken.Text] = new List<string> { "word", "speech", "reason" },
            },
        };
        var dataAccess = new MarbleDataAccessService(
            new GlossData(byLanguage, ["en"]),
            LanguageMapping.Empty,
            [FakeResourceScrText.Instance]
        );
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en",
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: RawGlosses should be populated with the three configured glosses,
        // unfiltered (the TS presenter applies "{...}" stripping).
        Assert.That(result.SourceForm, Is.EqualTo(s_greekNounToken.Text));
        Assert.That(
            result.RawGlosses,
            Is.EquivalentTo(new[] { "word", "speech", "reason" }),
            "RawGlosses should match the configured gloss list verbatim"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData contains no HTML - all fields are plain text or structured data")]
    public void GetTooltipData_ValidToken_NoHtmlInAnyField()
    {
        // Arrange
        var byLanguage = new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["en"] = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
            {
                [s_greekNounToken.Text] = new List<string> { "word" },
            },
        };
        var dataAccess = new MarbleDataAccessService(
            new GlossData(byLanguage, ["en"]),
            LanguageMapping.Empty,
            [FakeResourceScrText.Instance]
        );
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en",
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: No HTML tags anywhere - Theme 2 mandates structured data, not HTML
        Assert.That(result.SourceForm, Is.EqualTo(s_greekNounToken.Text));
        Assert.That(result.SourceForm, Does.Not.Contain("<"), "SourceForm must not contain HTML");
        Assert.That(result.Lemma, Does.Not.Contain("<"), "Lemma must not contain HTML");
        Assert.That(
            result.PartOfSpeechRaw,
            Does.Not.Contain("<"),
            "PartOfSpeechRaw must not contain HTML"
        );
        foreach (string gloss in result.RawGlosses)
            Assert.That(gloss, Does.Not.Contain("<"), "RawGlosses entries must not contain HTML");
    }

    #endregion

    #region Contract Tests - Hebrew Token

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Hebrew token tooltip returns correct lemma (surface fallback) and source form")]
    public void GetTooltipData_HebrewToken_ReturnsHebrewLemmaAndSourceForm()
    {
        // Arrange
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            1,
            s_hebrewNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(1, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: Lexical link is "elohim_entry_ref" (no ':'), so lemma falls back to surface.
        Assert.That(result.SourceForm, Is.EqualTo(MarbleTestHelper.Elohim));
        Assert.That(result.Lemma, Is.EqualTo(MarbleTestHelper.Elohim));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Hebrew token with known English gloss returns the English gloss in RawGlosses")]
    public void GetTooltipData_HebrewTokenWithEnglishGloss_ReturnsRawGlosses()
    {
        // Arrange: MarbleTestHelper sets up "God" as the English gloss for Elohim
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            1,
            s_hebrewNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en",
            CurrentReference: new VerseRef(1, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: MarbleTestHelper has "God" as gloss for Elohim in English
        Assert.That(result.SourceForm, Is.EqualTo(s_hebrewNounToken.Text));
        Assert.That(
            result.RawGlosses,
            Is.EquivalentTo(new[] { "God" }),
            "RawGlosses should contain the configured English gloss for Elohim"
        );
    }

    #endregion

    #region Error Cases - Token Not Found

    // =========================================================================
    // Error condition: Token not found -> NOT_FOUND PlatformError
    // Contract Section 4.14 Error Conditions
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Token not found throws InvalidOperationException with NOT_FOUND error code and descriptive message"
    )]
    public void GetTooltipData_TokenNotFound_ThrowsNotFoundError()
    {
        // Arrange: Empty token array - no tokens parsed
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider();
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: "999",
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => tooltipService.GetTooltipData(input)
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Message,
            Does.Contain("999"),
            "Error message must include the missing tokenId"
        );
        Assert.That(
            ex.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Must use PlatformErrorCodes.NotFound"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token ID exists in tokens but does not match any token index -> NOT_FOUND")]
    public void GetTooltipData_TokenIdNotInParsedTokens_ThrowsNotFoundError()
    {
        // Arrange: Tokens exist but requested ID does not match any token index
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: "42", // No token at index 42
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => tooltipService.GetTooltipData(input)
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(ex!.Message, Does.Contain("42"));
        Assert.That(ex.Data["platformErrorCode"], Is.EqualTo("NOT_FOUND"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "NOT_FOUND error message follows the contract pattern: \"Token '{tokenId}' not found\""
    )]
    public void GetTooltipData_TokenNotFound_ErrorMessageMatchesContractPattern()
    {
        // Arrange
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider();
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: "missing-token",
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => tooltipService.GetTooltipData(input)
        );

        // Contract Section 4.14: Message = "Token '{tokenId}' not found"
        Assert.That(
            ex!.Message,
            Is.EqualTo("Token 'missing-token' not found"),
            "Error message must match the exact contract pattern"
        );
    }

    #endregion

    #region Edge Cases - Partial Data

    // =========================================================================
    // Edge case: Various partial data combinations
    // "No gloss available returns partial tooltip without gloss section
    //  (not an error - partial data is valid)"
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token with no strong number still returns tooltip with raw fields populated")]
    public void GetTooltipData_NoStrongNumber_ReturnsTooltipWithRawFields()
    {
        // Arrange: Token without a strong number. (StrongNumber is no longer a TooltipData
        // field in the phase 3a DTO; this test now verifies the tooltip still resolves.)
        var tokenNoStrong = new MarbleToken(
            Type: MarbleTokenType.TextLink,
            Text: "someWord",
            Index: 7,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: null,
            LexicalLinks: ["entry_ref"],
            TargetLinks: [],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            tokenNoStrong
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: tokenNoStrong.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without strong number");
        Assert.That(
            result.SourceForm,
            Is.EqualTo(tokenNoStrong.Text),
            "SourceForm must come from token.Text"
        );
        Assert.That(result.Lemma, Is.EqualTo(tokenNoStrong.Text));
        Assert.That(result.RenderingStatus, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token with no lexical links returns tooltip with empty RawGlosses")]
    public void GetTooltipData_NoLexicalLinks_ReturnsTooltipWithEmptyRawGlosses()
    {
        // Arrange: Token with empty lexical links
        var tokenNoLinks = new MarbleToken(
            Type: MarbleTokenType.TextLink,
            Text: "isolatedWord",
            Index: 8,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: "G1234",
            LexicalLinks: [],
            TargetLinks: [],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: []
        );
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            tokenNoLinks
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: tokenNoLinks.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without lexical links");
        Assert.That(
            result.SourceForm,
            Is.EqualTo(tokenNoLinks.Text),
            "SourceForm must come from token.Text"
        );
        Assert.That(
            result.RawGlosses,
            Is.Empty,
            "RawGlosses must be empty when no lexical links point to glossary entries"
        );
        Assert.That(
            result.Lemma,
            Is.EqualTo(tokenNoLinks.Text),
            "Lemma falls back to surface text when there is no lexical link"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Marble data not initialized (HaveMarbleData=false) returns tooltip with empty RawGlosses"
    )]
    public void GetTooltipData_NoMarbleData_ReturnsTooltipWithEmptyRawGlosses()
    {
        // Arrange: MarbleDataAccessService with no data
        var dataAccess = MarbleTestHelper.BuildServiceWithNoData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act: Should not throw - missing marble data means no gloss, not an error
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without marble data");
        Assert.That(
            result.SourceForm,
            Is.EqualTo(s_greekNounToken.Text),
            "SourceForm must come from token.Text"
        );
        Assert.That(
            result.RawGlosses,
            Is.Empty,
            "RawGlosses should be empty when marble data is unavailable"
        );
        Assert.That(
            result.Lemma,
            Is.Not.Null.And.Not.Empty,
            "Lemma should still come from the token itself"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Token with no LexicalLinks (null collection) returns an empty RawGlosses list without throwing"
    )]
    public void GetTooltipData_NoLexicalLinks_ReturnsEmptyRawGlosses()
    {
        // Arrange: Token where LexicalLinks defaults to null. This complements the
        // "empty list" case above by exercising the explicit-null branch of the
        // service's "is not { Count: > 0 }" guard.
        var tokenWithoutLinks = s_greekNounToken with
        {
            LexicalLinks = null
        };
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            tokenWithoutLinks
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: tokenWithoutLinks.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert
        Assert.That(result.SourceForm, Is.EqualTo(tokenWithoutLinks.Text));
        Assert.That(result.RawGlosses, Is.Empty);
        Assert.That(result.RenderingStatus, Is.Null);
    }

    #endregion

    #region Edge Cases - POS Integration

    // =========================================================================
    // POS raw passthrough: Service returns the raw style tag; the TS presenter
    // localizes and detects the "phrase" case (per phase 3a DTO redesign).
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Token with POS tag in style attribute returns tooltip with the raw POS tag (not localized)"
    )]
    public void GetTooltipData_TokenWithPosTag_ReturnsRawPosTag()
    {
        // Arrange: Token with POS info (compound Greek tag)
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_tokenWithPos
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_tokenWithPos.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: PartOfSpeechRaw should be the raw style tag verbatim - the TS
        // presenter handles localization and any compound-tag normalization.
        Assert.That(result.SourceForm, Is.EqualTo(s_tokenWithPos.Text));
        Assert.That(
            result.PartOfSpeechRaw,
            Is.EqualTo("noun-dans"),
            "PartOfSpeechRaw must be the raw token.Style value (not localized)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token without POS tag returns tooltip with empty PartOfSpeechRaw")]
    public void GetTooltipData_NoPosTag_ReturnsEmptyPartOfSpeechRaw()
    {
        // Arrange: Token without POS data (no style attribute)
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: No POS data available - service returns empty string (not null) per
        // TooltipService: `token.Style ?? string.Empty`.
        Assert.That(result.SourceForm, Is.EqualTo(s_greekNounToken.Text));
        Assert.That(
            result.PartOfSpeechRaw,
            Is.Empty,
            "PartOfSpeechRaw should be empty when token has no Style/POS tag"
        );
    }

    #endregion

    #region Edge Cases - Multiple Tokens

    // =========================================================================
    // Multiple tokens: Verify correct token is looked up by ID
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "When multiple tokens exist, the correct token is resolved by its Index (tokenId)"
    )]
    public void GetTooltipData_MultipleTokens_ResolvesCorrectTokenById()
    {
        // Arrange: Multiple tokens - we request the Hebrew one (index 3)
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            1,
            s_greekNounToken,
            s_hebrewNounToken,
            s_tokenWithNoGloss
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(), // Index 3
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(1, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: Should return data for the Hebrew token, not the Greek one. Lexical
        // link "elohim_entry_ref" has no ':', so lemma falls back to surface form.
        Assert.That(
            result.SourceForm,
            Is.EqualTo(MarbleTestHelper.Elohim),
            "SourceForm should be the Hebrew token's surface text, not the Greek's"
        );
        Assert.That(
            result.Lemma,
            Is.EqualTo(MarbleTestHelper.Elohim),
            "Should resolve the Hebrew token (index 3), not the Greek token"
        );
    }

    #endregion

    #region Determinism and Structural Guarantees

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Same input always produces same output (stateless, deterministic)")]
    public void GetTooltipData_SameInput_AlwaysReturnsSameResult()
    {
        // Arrange
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result1 = tooltipService.GetTooltipData(input);
        TooltipData result2 = tooltipService.GetTooltipData(input);

        // Assert: every field on the new DTO must be equal across calls
        Assert.That(result1.SourceForm, Is.EqualTo(result2.SourceForm));
        Assert.That(result1.Lemma, Is.EqualTo(result2.Lemma));
        Assert.That(result1.PartOfSpeechRaw, Is.EqualTo(result2.PartOfSpeechRaw));
        Assert.That(result1.RawGlosses, Is.EqualTo(result2.RawGlosses));
        Assert.That(result1.RenderingStatus, Is.EqualTo(result2.RenderingStatus));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData record contains all phase-3a fields per design doc §5b")]
    public void GetTooltipData_ValidToken_TooltipDataHasAllContractFields()
    {
        // Arrange
        var dataAccess = MarbleTestHelper.BuildServiceWithTestData();
        var bookTokensProvider = new FakeMarbleBookTokenProvider().With(
            TestResourceId,
            43,
            s_greekNounToken
        );
        var tooltipService = new TooltipService(dataAccess, bookTokensProvider);

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage,
            CurrentReference: new VerseRef(43, 1, 1)
        );

        // Act
        TooltipData result = tooltipService.GetTooltipData(input);

        // Assert: Verify TooltipData has the 5 fields per phase 3a design (§5b):
        // SourceForm, Lemma, PartOfSpeechRaw, RawGlosses, RenderingStatus.
        // Structural check: every non-nullable field is present; the lone nullable
        // (RenderingStatus) is documented to be null in phase 3a.
        Assert.That(result.SourceForm, Is.Not.Null, "SourceForm field must exist and be non-null");
        Assert.That(result.Lemma, Is.Not.Null, "Lemma field must exist and be non-null");
        Assert.That(
            result.PartOfSpeechRaw,
            Is.Not.Null,
            "PartOfSpeechRaw field must exist and be non-null (may be empty)"
        );
        Assert.That(
            result.RawGlosses,
            Is.Not.Null,
            "RawGlosses field must be a non-null list (may be empty)"
        );
        Assert.That(
            result.RenderingStatus,
            Is.Null,
            "RenderingStatus must be null in phase 3a (wired in phase 3b)"
        );
    }

    #endregion
}
