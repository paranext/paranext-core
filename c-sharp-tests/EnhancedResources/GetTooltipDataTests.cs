using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for GetTooltipData - structured tooltip data for linked words.
/// CAP-014: GetTooltipData
///
/// Behaviors: BHV-354 (BeforeNavigate URL Routing - tooltip display context)
/// Contract: Section 4.14 M-014: GetTooltipDataAsync(TooltipInput, CancellationToken) -> TooltipData
/// Source: EXT-002 (Tooltip Generation, PT9 MarbleForm.cs:2589-2670)
///
/// GetTooltipData takes a TooltipInput (tokenId + resourceId + glossLanguage) and
/// returns structured TooltipData containing lemma, gloss, POS, strong number,
/// notes, and morphology fields. No HTML generation - returns structured data
/// for frontend React tooltip rendering.
///
/// Key behaviors:
/// - Token not found: NOT_FOUND PlatformError
/// - No gloss available: returns partial tooltip (not an error)
/// - Uses MarbleDataAccessService for gloss lookup (CAP-001)
/// - Uses PartOfSpeechTranslator for POS labels (CAP-005)
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

    // Greek noun token data (simulates a parsed TextLink token with annotations)
    private static readonly MarbleToken s_greekNounToken =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "\u03BB\u03CC\u03B3\u03BF\u03C2", // logos
            Index: 5,
            VerseRef: new VerseRef(43, 1, 1), // JHN 1:1
            StrongNumber: "G3056",
            LexicalLinks: ["logos_entry_ref"],
            TargetLinks: ["target1"],
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

    // Token with POS annotation
    private static readonly MarbleToken s_tokenWithPos =
        new(
            Type: MarbleTokenType.TextLink,
            Text: "\u03BB\u03CC\u03B3\u03BF\u03C2", // logos
            Index: 5,
            VerseRef: new VerseRef(43, 1, 1),
            StrongNumber: "G3056",
            LexicalLinks: ["logos_entry_ref"],
            TargetLinks: ["target1"],
            ThematicLinks: [],
            ImageLinks: [],
            MapLinks: [],
            Style: "noun-dans" // POS tag embedded in style (compound Greek tag)
        );

    // Plain text token (not a TextLink - should not be valid for tooltip)
    private static readonly MarbleToken s_plainTextToken =
        new(
            Type: MarbleTokenType.PlainText,
            Text: "In the beginning",
            Index: 0,
            VerseRef: new VerseRef(43, 1, 1)
        );

    #region Acceptance Tests

    // =========================================================================
    // Acceptance Test 1: Full tooltip data with gloss, POS, strong number, notes
    // "TooltipData returned with gloss, POS info, and note content"
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Full tooltip data contains lemma, gloss, POS, strong number, and notes when all data is available"
    )]
    public void GetTooltipData_FullTokenData_ReturnsCompleteTooltipData()
    {
        // Arrange: A token with all annotations, marble data initialized with gloss data
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);

        // The token collection represents parsed chapter data (CAP-002 dependency)
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: all fields populated for a fully-annotated token
        Assert.That(result, Is.Not.Null, "TooltipData must not be null for a valid token");
        Assert.That(
            result.Lemma,
            Is.Not.Null.And.Not.Empty,
            "Lemma must be present for a TextLink token"
        );
        Assert.That(
            result.StrongNumber,
            Is.EqualTo("G3056"),
            "Strong number must match the token's strong number"
        );
        Assert.That(
            result.Gloss,
            Is.Not.Null,
            "Gloss must be present when marble data has a matching entry"
        );
        Assert.That(result.Notes, Is.Not.Null, "Notes array must not be null (may be empty)");
    }

    // =========================================================================
    // Acceptance Test 2: Missing gloss returns partial tooltip (not an error)
    // "missing gloss returns partial result without gloss section"
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Missing gloss returns partial TooltipData without gloss field - not an error, partial data is valid"
    )]
    public void GetTooltipData_NoGlossAvailable_ReturnsPartialTooltipWithoutGloss()
    {
        // Arrange: Token has a strong number and lemma but no gloss entry in marble data
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);

        MarbleToken[] parsedTokens = [s_tokenWithNoGloss];

        var input = new TooltipInput(
            TokenId: s_tokenWithNoGloss.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act: This should NOT throw - missing gloss is not an error
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: Tooltip returned with partial data
        Assert.That(result, Is.Not.Null, "Partial tooltip must be returned, not null");
        Assert.That(
            result.Gloss,
            Is.Null,
            "Gloss must be null when no gloss is available in marble data"
        );
        Assert.That(
            result.StrongNumber,
            Is.EqualTo("G9999"),
            "Strong number must still be present in partial tooltip"
        );
        Assert.That(result.Lemma, Is.Not.Null, "Lemma must still be present in partial tooltip");
    }

    #endregion

    #region Contract Tests - Happy Path

    // =========================================================================
    // Contract: GetTooltipDataAsync returns structured TooltipData
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData.Lemma contains the token text (surface form of the linked word)")]
    public void GetTooltipData_ValidToken_LemmaMatchesTokenText()
    {
        // Arrange
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(
            result.Lemma,
            Is.EqualTo(s_greekNounToken.Text),
            "Lemma should match the token's text content"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData.StrongNumber contains the token's Strong number annotation")]
    public void GetTooltipData_ValidToken_StrongNumberFromToken()
    {
        // Arrange
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result.StrongNumber, Is.EqualTo("G3056"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData.Gloss contains the localized gloss from MarbleDataAccessService")]
    public void GetTooltipData_GlossAvailable_GlossFromMarbleData()
    {
        // Arrange: Configure marble data with a known gloss for the token's lemma
        var dataAccess = new MarbleDataAccessService();
        var glossData = new Dictionary<string, Dictionary<string, List<string>>>
        {
            ["en"] = new Dictionary<string, List<string>>
            {
                [s_greekNounToken.Text] = ["word", "speech", "reason"],
            },
        };
        dataAccess.SetTestData(haveMarbleData: true, glossLanguages: ["en"], glossData: glossData);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en"
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: Gloss should contain data from marble data access
        Assert.That(result.Gloss, Is.Not.Null.And.Not.Empty, "Gloss should be populated");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("TooltipData.Notes is an empty array when no notes are associated with the token")]
    public void GetTooltipData_NoNotes_NotesArrayEmpty()
    {
        // Arrange: Token without note data
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result.Notes, Is.Not.Null);
        Assert.That(result.Notes, Is.Empty, "Notes should be empty when no notes exist for token");
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
        var dataAccess = new MarbleDataAccessService();
        var glossData = new Dictionary<string, Dictionary<string, List<string>>>
        {
            ["en"] = new Dictionary<string, List<string>> { [s_greekNounToken.Text] = ["word"], },
        };
        dataAccess.SetTestData(haveMarbleData: true, glossLanguages: ["en"], glossData: glossData);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en"
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: No HTML tags anywhere - Theme 2 mandates structured data, not HTML
        Assert.That(result.Lemma, Does.Not.Contain("<"), "Lemma must not contain HTML");
        if (result.Gloss != null)
            Assert.That(result.Gloss, Does.Not.Contain("<"), "Gloss must not contain HTML");
        if (result.PartOfSpeech != null)
            Assert.That(result.PartOfSpeech, Does.Not.Contain("<"), "POS must not contain HTML");
        if (result.StrongNumber != null)
            Assert.That(
                result.StrongNumber,
                Does.Not.Contain("<"),
                "StrongNumber must not contain HTML"
            );
        if (result.Morphology != null)
            Assert.That(
                result.Morphology,
                Does.Not.Contain("<"),
                "Morphology must not contain HTML"
            );
        foreach (string note in result.Notes)
            Assert.That(note, Does.Not.Contain("<"), "Notes must not contain HTML");
    }

    #endregion

    #region Contract Tests - Hebrew Token

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Hebrew token tooltip returns correct lemma and strong number")]
    public void GetTooltipData_HebrewToken_ReturnsHebrewLemmaAndStrong()
    {
        // Arrange
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_hebrewNounToken];

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result.Lemma, Is.EqualTo(MarbleTestHelper.Elohim));
        Assert.That(result.StrongNumber, Is.EqualTo("H430"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Hebrew token with known English gloss returns the English gloss")]
    public void GetTooltipData_HebrewTokenWithEnglishGloss_ReturnsGloss()
    {
        // Arrange: MarbleTestHelper sets up "God" as the English gloss for Elohim
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_hebrewNounToken];

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: "en"
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: MarbleTestHelper has "God" as gloss for Elohim in English
        Assert.That(result.Gloss, Is.Not.Null, "Gloss should be present for Elohim in English");
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [];

        var input = new TooltipInput(
            TokenId: "999",
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => TooltipService.GetTooltipData(input, parsedTokens, dataAccess)
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken]; // Index is 5

        var input = new TooltipInput(
            TokenId: "42", // No token at index 42
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => TooltipService.GetTooltipData(input, parsedTokens, dataAccess)
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [];

        var input = new TooltipInput(
            TokenId: "missing-token",
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => TooltipService.GetTooltipData(input, parsedTokens, dataAccess)
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
    [Description("Token with no strong number returns tooltip with null StrongNumber")]
    public void GetTooltipData_NoStrongNumber_ReturnsTooltipWithNullStrong()
    {
        // Arrange: Token without a strong number
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [tokenNoStrong];

        var input = new TooltipInput(
            TokenId: tokenNoStrong.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without strong number");
        Assert.That(result.StrongNumber, Is.Null, "StrongNumber should be null when not present");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token with no lexical links returns tooltip with null gloss")]
    public void GetTooltipData_NoLexicalLinks_ReturnsTooltipWithNullGloss()
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [tokenNoLinks];

        var input = new TooltipInput(
            TokenId: tokenNoLinks.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without lexical links");
        Assert.That(
            result.Gloss,
            Is.Null,
            "Gloss should be null when no lexical links point to glossary entries"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Marble data not initialized (HaveMarbleData=false) returns tooltip with null gloss"
    )]
    public void GetTooltipData_NoMarbleData_ReturnsTooltipWithNullGloss()
    {
        // Arrange: MarbleDataAccessService with no data
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithNoData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act: Should not throw - missing marble data means no gloss, not an error
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result, Is.Not.Null, "Tooltip must be returned even without marble data");
        Assert.That(result.Gloss, Is.Null, "Gloss should be null when marble data is unavailable");
        Assert.That(
            result.Lemma,
            Is.Not.Null.And.Not.Empty,
            "Lemma should still come from the token itself"
        );
        Assert.That(
            result.StrongNumber,
            Is.EqualTo("G3056"),
            "StrongNumber should still come from the token"
        );
    }

    #endregion

    #region Edge Cases - POS Integration

    // =========================================================================
    // POS integration: Uses PartOfSpeechTranslator (CAP-005) for display labels
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "Token with POS tag in style attribute returns tooltip with translated POS display string"
    )]
    public void GetTooltipData_TokenWithPosTag_ReturnsPosDisplayString()
    {
        // Arrange: Token with POS info (compound Greek tag)
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_tokenWithPos];

        var input = new TooltipInput(
            TokenId: s_tokenWithPos.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: POS should be a human-readable string from PartOfSpeechTranslator
        Assert.That(
            result.PartOfSpeech,
            Is.Not.Null.And.Not.Empty,
            "PartOfSpeech must be populated when token has POS tag"
        );
        // Should not be the raw tag - should be a translated display string
        Assert.That(
            result.PartOfSpeech,
            Is.Not.EqualTo("noun-dans"),
            "PartOfSpeech must be translated to display form, not raw tag"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Token without POS tag returns tooltip with null PartOfSpeech")]
    public void GetTooltipData_NoPosTag_ReturnsNullPartOfSpeech()
    {
        // Arrange: Token without POS data (no style attribute)
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken]; // Has no Style set

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: No POS data available
        Assert.That(
            result.PartOfSpeech,
            Is.Null,
            "PartOfSpeech should be null when token has no POS tag"
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken, s_hebrewNounToken, s_tokenWithNoGloss];

        var input = new TooltipInput(
            TokenId: s_hebrewNounToken.Index.ToString(), // Index 3
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: Should return data for the Hebrew token, not the Greek one
        Assert.That(
            result.Lemma,
            Is.EqualTo(MarbleTestHelper.Elohim),
            "Should resolve the Hebrew token (index 3), not the Greek token"
        );
        Assert.That(result.StrongNumber, Is.EqualTo("H430"));
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
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result1 = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);
        TooltipData result2 = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert
        Assert.That(result1.Lemma, Is.EqualTo(result2.Lemma));
        Assert.That(result1.Gloss, Is.EqualTo(result2.Gloss));
        Assert.That(result1.PartOfSpeech, Is.EqualTo(result2.PartOfSpeech));
        Assert.That(result1.StrongNumber, Is.EqualTo(result2.StrongNumber));
        Assert.That(result1.Morphology, Is.EqualTo(result2.Morphology));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-354")]
    [Property("ExtractionId", "EXT-002")]
    [Description(
        "TooltipData record contains all six expected fields defined in data-contracts.md"
    )]
    public void GetTooltipData_ValidToken_TooltipDataHasAllContractFields()
    {
        // Arrange
        var dataAccess = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(dataAccess);
        MarbleToken[] parsedTokens = [s_greekNounToken];

        var input = new TooltipInput(
            TokenId: s_greekNounToken.Index.ToString(),
            ResourceId: TestResourceId,
            GlossLanguage: TestGlossLanguage
        );

        // Act
        TooltipData result = TooltipService.GetTooltipData(input, parsedTokens, dataAccess);

        // Assert: Verify TooltipData has the 6 fields per Section 4.14 Result Type:
        // lemma, gloss, partOfSpeech, strongNumber, notes, morphology
        // This test verifies the structural contract - fields exist and are accessible
        Assert.That(result.Lemma, Is.Not.Null, "Lemma field must exist and be non-null");
        // gloss, partOfSpeech, strongNumber, morphology are nullable per contract
        // notes is a non-null array (may be empty)
        Assert.That(result.Notes, Is.Not.Null, "Notes field must be a non-null array");

        // Access all fields to verify they compile (structural check)
        _ = result.Gloss;
        _ = result.PartOfSpeech;
        _ = result.StrongNumber;
        _ = result.Morphology;
    }

    #endregion
}
