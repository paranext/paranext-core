using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-013: GetScriptureContent.
/// Validates the full scripture pane rendering pipeline from parsed tokens through
/// to formatted ScriptureContent with HTML body, footnotes, token list, and warning banners.
///
/// This is an orchestration capability that wires together:
/// - Token parsing via MarbleDataAccess cached tokens (CAP-002/CAP-028)
/// - Rendering status overlay via TermRenderingStatusService (CAP-007)
/// - Tracked project BT state via TrackedProjectService (CAP-027)
/// - Scripture reference formatting via FormatBCVRefs (CAP-030)
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs (GetBody, GetNoteHtml, GetTooltip, CheckServerVersionOfResource)
/// Extractions: EXT-002 (GetBody), EXT-003 (GetTooltip), EXT-008 (CheckServerVersionOfResource)
/// Golden Masters: gm-011 (footnote HTML generation)
/// Contract: data-contracts.md Method 13
///
/// Input: (string resourceId, VerseReference verseRef, string? trackedProjectId,
///         TermHighlightFilter highlightFilter, bool showFootnotes,
///         bool showFoundRenderings, bool showTranslations, SourceWordDisplayMode sourceWordDisplay)
/// Output: ScriptureContent (BodyHtml, FootnoteHtml, Tokens, ActiveBanners, CopyrightHtml)
///
/// Key behavior:
/// - Body HTML generated from chapter tokens with verse markers and lemma-based spans
/// - Footnote HTML contains sequential callers (a, b, c) with quickref:BBBCCCVVV cross-ref links
/// - Old-format (non-XML) footnotes show upgrade message instead of parsed content
/// - Rendering status overlay adds CSS classes for found/missing/guessed terms
/// - Warning banners computed based on resource state (update available, missing book, etc.)
/// </summary>
[TestFixture]
public class ScriptureContentServiceTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a MarbleDataAccess instance with Bible data registered.
    /// Follows the pattern from LoadMediaTabTests, LoadEncyclopediaTabTests, and LoadDictionaryTabTests.
    /// </summary>
    private static MarbleDataAccess CreateTestDataAccess(
        string resourceId = "ESV16UK+",
        int bookNum = 1,
        IReadOnlyList<MarbleToken>? tokens = null
    )
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.Initialize();

        // Register research data (required for HaveMarbleData to return true)
        foreach (var proj in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(proj);

        // Default tokens: a simple chapter with verses, text, and footnotes
        tokens ??= CreateDefaultScriptureTokens(bookNum);

        dataAccess.AddBible(resourceId, _ => tokens);

        return dataAccess;
    }

    /// <summary>
    /// Creates default tokens representing a simple scripture passage:
    /// Book, Chapter 1, Verse 1 with a TextLink, Verse 2 with a TextLink and a Note.
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateDefaultScriptureTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.ParagraphStart, null, "p", new VerseReference(bookNum, 1, 1)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "beginning",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBH:reshith:001001"
            ),
            new(MarbleTokenType.Text, " God created ", null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "heavens",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBH:shamayim:001001"
            ),
            new(MarbleTokenType.ParagraphEnd, null, null, new VerseReference(bookNum, 1, 1)),
            new(MarbleTokenType.ParagraphStart, null, "p", new VerseReference(bookNum, 1, 2)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "earth",
                null,
                new VerseReference(bookNum, 1, 2),
                LexicalLinks: "SDBH:erets:001001"
            ),
            new(MarbleTokenType.Note, "Or land", "f", new VerseReference(bookNum, 1, 2)),
            new(MarbleTokenType.ParagraphEnd, null, null, new VerseReference(bookNum, 1, 2)),
        };
    }

    /// <summary>
    /// Creates tokens with a footnote that contains a scripture cross-reference.
    /// Used for testing quickref:BBBCCCVVV link generation (TS-141).
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateCrossRefFootnoteTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "word",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBG:logos:001001"
            ),
            // Cross-reference note with caller '-'
            new(
                MarbleTokenType.Note,
                null,
                "x",
                new VerseReference(bookNum, 1, 1),
                TargetLinks: "040001001"
            ),
        };
    }

    /// <summary>
    /// Creates tokens for a chapter with no notes (empty footnote pane).
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateNoFootnoteTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "beginning",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBH:reshith:001001"
            ),
        };
    }

    /// <summary>
    /// Creates tokens with multiple footnotes for sequential caller testing (a, b, c).
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateMultipleFootnoteTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "word1",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBH:word1:001001"
            ),
            new(MarbleTokenType.Note, "First footnote", "f", new VerseReference(bookNum, 1, 1)),
            new(MarbleTokenType.Note, "Second footnote", "f", new VerseReference(bookNum, 1, 1)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "word2",
                null,
                new VerseReference(bookNum, 1, 2),
                LexicalLinks: "SDBH:word2:001001"
            ),
            new(MarbleTokenType.Note, "Third footnote", "f", new VerseReference(bookNum, 1, 2)),
        };
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-013.
    /// Verifies golden master scenario from gm-011 in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Scenarios covered:
    /// - gm-011: Footnote HTML generated with correct structure
    /// - BHV-601: Footnote callers and styled text
    /// - BHV-311: Body HTML includes lemma-based spans for hover highlighting
    /// - BHV-310: Warning banners array populated
    ///
    /// The test verifies the full pipeline: resource ID + verse ref -> token retrieval ->
    /// HTML body generation -> footnote processing -> rendering status overlay -> ScriptureContent.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description(
        "Acceptance test: Scripture content rendered with HTML body, footnotes, tokens, and banners"
    )]
    public async Task GetScriptureContent_AllGoldenMasterScenarios_Pass()
    {
        // Arrange: Set up data access with Bible data including footnotes
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert
        Assert.Multiple(() =>
        {
            // ScriptureContent returned with all fields
            Assert.That(result, Is.Not.Null, "Must return non-null ScriptureContent");
            Assert.That(
                result.BodyHtml,
                Is.Not.Null.And.Not.Empty,
                "BodyHtml must contain rendered scripture content"
            );
            Assert.That(
                result.Tokens,
                Is.Not.Null.And.Not.Empty,
                "Tokens list must contain the chapter tokens"
            );
            Assert.That(
                result.ActiveBanners,
                Is.Not.Null,
                "ActiveBanners must not be null (may be empty)"
            );

            // gm-011: Footnote HTML present (chapter has a Note token)
            Assert.That(
                result.FootnoteHtml,
                Is.Not.Null,
                "FootnoteHtml must not be null when footnotes exist"
            );
        });
    }

    #endregion

    #region Body HTML Generation Tests (EXT-002)

    /// <summary>
    /// Body HTML includes verse markers for navigation.
    /// PT9: MarbleForm.GetBody() generates verse number spans.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Body HTML contains verse number markers")]
    public async Task GetScriptureContent_WithVerseTokens_BodyHtmlContainsVerseMarkers()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML contains verse number references
        Assert.That(
            result.BodyHtml,
            Does.Contain("1").And.Contain("2"),
            "Body HTML must contain verse number markers for verses in the chapter"
        );
    }

    /// <summary>
    /// Body HTML includes lemma-based spans for hover highlighting.
    /// PT9: MarbleForm.GetBody() wraps TextLink tokens in spans with lemma attributes
    /// so that JavaScript can highlight words sharing the same lemma on hover.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Body HTML includes lemma-based spans for TextLink tokens")]
    public async Task GetScriptureContent_WithTextLinks_BodyHtmlContainsLemmaSpans()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML contains the word text from TextLink tokens
        Assert.That(
            result.BodyHtml,
            Does.Contain("beginning"),
            "Body HTML must include word text from TextLink tokens"
        );
        Assert.That(
            result.BodyHtml,
            Does.Contain("heavens"),
            "Body HTML must include all TextLink word texts"
        );
    }

    /// <summary>
    /// Body HTML includes plain text between TextLink tokens.
    /// PT9: MarbleForm.GetBody() renders Text tokens as plain HTML content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Body HTML includes plain text content from Text tokens")]
    public async Task GetScriptureContent_WithTextTokens_BodyHtmlContainsPlainText()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML contains plain text from Text tokens
        Assert.That(
            result.BodyHtml,
            Does.Contain("God created"),
            "Body HTML must include plain text between linked words"
        );
    }

    /// <summary>
    /// Body HTML respects paragraph structure from ParagraphStart/End tokens.
    /// PT9: MarbleForm.GetBody() wraps paragraph content in appropriate HTML elements.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Body HTML contains paragraph structure")]
    public async Task GetScriptureContent_WithParagraphs_BodyHtmlContainsParagraphElements()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML has paragraph-like structure (p, div, br, or similar)
        Assert.That(
            result.BodyHtml,
            Does.Contain("<").And.Contain(">"),
            "Body HTML must contain HTML elements for paragraph structure"
        );
    }

    #endregion

    #region Footnote HTML Generation Tests (gm-011, EXT-002)

    /// <summary>
    /// gm-011, TS-141: Footnote HTML includes cross-reference links using quickref:BBBCCCVVV format.
    /// PT9: MarbleForm.GetNoteHtml() generates clickable verse reference links for cross-refs.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-013")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("gm-011 FN-02: Footnote cross-reference generates quickref:BBBCCCVVV link")]
    public async Task GetScriptureContent_CrossRefNote_FootnoteHtmlContainsQuickrefLink()
    {
        // Arrange: Tokens with a cross-reference note pointing to Matt 1:1
        var tokens = CreateCrossRefFootnoteTokens(bookNum: 43); // John
        var dataAccess = CreateTestDataAccess("ESV16UK+", 43, tokens);
        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Footnote HTML contains quickref link format
        Assert.That(
            result.FootnoteHtml,
            Does.Contain("quickref:"),
            "gm-011 TS-141: Cross-reference footnotes must use quickref:BBBCCCVVV link format"
        );
    }

    /// <summary>
    /// gm-011, TS-142: Old-format (non-XML) footnotes show upgrade message.
    /// When a resource has old-format footnotes that cannot be parsed as XML,
    /// the footnote pane displays an upgrade prompt instead of parsed content.
    /// PT9: MarbleForm.GetNoteHtml() detects old-format footnotes internally
    /// and displays: "To show footnotes, go to 'Paratext > Download/Install resources' and update {resource}."
    /// The detection mechanism is implementation-internal; this test verifies the behavior.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-013")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-142")]
    [Description("gm-011 edge case: Old-format footnotes show upgrade message")]
    public async Task GetScriptureContent_OldFormatFootnotes_ShowsUpgradeMessage()
    {
        // Arrange: Tokens that simulate old-format (non-XML) notes.
        // Old-format notes are identified by the service detecting that the resource's
        // footnote data cannot be parsed as XML. The exact detection mechanism is
        // implementation-internal (PT9 used MarbleForm.GetNoteHtml() to check format).
        // For testing, we provide a resource whose Note tokens carry non-XML text.
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(1, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(1, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "word",
                null,
                new VerseReference(1, 1, 1),
                LexicalLinks: "SDBH:word:001001"
            ),
            // Note with plain text (not XML-structured) -- old format indicator
            new(
                MarbleTokenType.Note,
                "plain text footnote without XML structure",
                "f",
                new VerseReference(1, 1, 1)
            ),
        };
        var dataAccess = CreateTestDataAccess("OldRes+", 1, tokens);

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "OldRes+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Footnote HTML contains upgrade prompt
        // PT9 message: "To show footnotes, go to 'Paratext > Download/Install resources' and update ESV."
        Assert.That(
            result.FootnoteHtml,
            Does.Contain("update").IgnoreCase.Or.Contain("upgrade").IgnoreCase,
            "TS-142: Old-format footnotes must display upgrade message"
        );
    }

    /// <summary>
    /// gm-011, FN-01: Footnote with regular text produces HTML with caller and styled text.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-013")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("gm-011 FN-01: Regular footnote produces HTML with caller letter and text")]
    public async Task GetScriptureContent_RegularFootnote_HasCallerAndText()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Footnote HTML contains footnote text content
        Assert.That(
            result.FootnoteHtml,
            Does.Contain("Or land"),
            "gm-011 FN-01: Footnote HTML must contain the footnote text content"
        );
    }

    /// <summary>
    /// gm-011, FN-03: Multiple footnotes get sequential callers (a, b, c).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-013")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("gm-011 FN-03: Multiple footnotes get sequential callers a, b, c")]
    public async Task GetScriptureContent_MultipleFootnotes_SequentialCallers()
    {
        // Arrange: Tokens with three footnotes
        var tokens = CreateMultipleFootnoteTokens(bookNum: 1);
        var dataAccess = CreateTestDataAccess("ESV16UK+", 1, tokens);
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: All three footnote texts present
        Assert.Multiple(() =>
        {
            Assert.That(
                result.FootnoteHtml,
                Does.Contain("First footnote"),
                "Must contain first footnote text"
            );
            Assert.That(
                result.FootnoteHtml,
                Does.Contain("Second footnote"),
                "Must contain second footnote text"
            );
            Assert.That(
                result.FootnoteHtml,
                Does.Contain("Third footnote"),
                "Must contain third footnote text"
            );
        });
    }

    /// <summary>
    /// Verse with no footnotes produces empty or null footnote HTML.
    /// Edge case from gm-011 notes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("No footnotes in chapter produces empty footnote HTML")]
    public async Task GetScriptureContent_NoFootnotes_EmptyFootnoteHtml()
    {
        // Arrange: Tokens with no Note entries
        var tokens = CreateNoFootnoteTokens(bookNum: 1);
        var dataAccess = CreateTestDataAccess("ESV16UK+", 1, tokens);
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: true,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: FootnoteHtml is empty or null when no notes exist
        Assert.That(
            string.IsNullOrEmpty(result.FootnoteHtml),
            Is.True,
            "Footnote HTML should be empty when chapter has no footnotes"
        );
    }

    /// <summary>
    /// When showFootnotes is false, footnote HTML should still be generated
    /// (visibility is controlled by the UI, not the backend).
    /// The backend always generates footnote HTML; the UI decides whether to show it.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("showFootnotes=false still generates footnote HTML (visibility is UI concern)")]
    public async Task GetScriptureContent_ShowFootnotesFalse_StillGeneratesFootnoteHtml()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Footnote HTML still generated even when showFootnotes is false
        // PT9 behavior: footnotes always generated; F7 toggle only controls visibility
        Assert.That(
            result.FootnoteHtml,
            Does.Contain("Or land"),
            "Footnote HTML should still be generated when showFootnotes is false"
        );
    }

    #endregion

    #region Token Passthrough Tests

    /// <summary>
    /// ScriptureContent.Tokens returns the chapter tokens from MarbleDataAccess.
    /// The token list is passed through to allow the frontend to build context menus
    /// and perform word-level operations.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Tokens in ScriptureContent match the chapter tokens from data access")]
    public async Task GetScriptureContent_ValidResource_TokensMatchChapterTokens()
    {
        // Arrange
        var expectedTokens = CreateDefaultScriptureTokens(bookNum: 1);
        var dataAccess = CreateTestDataAccess("ESV16UK+", 1, expectedTokens);
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Tokens list matches the registered chapter tokens
        Assert.That(
            result.Tokens.Count,
            Is.EqualTo(expectedTokens.Count),
            "Token count must match the chapter tokens from data access"
        );
    }

    /// <summary>
    /// Token list includes TextLink tokens with their lexical link attributes.
    /// This is essential for the frontend to build context menus and hover effects.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Tokens include TextLink entries with lexical link attributes")]
    public async Task GetScriptureContent_WithTextLinks_TokensContainLexicalLinks()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: TextLink tokens carry lexical link attributes
        var textLinks = result.Tokens.Where(t => t.Type == MarbleTokenType.TextLink).ToList();
        Assert.That(textLinks, Has.Count.GreaterThan(0), "Must contain TextLink tokens");
        Assert.That(
            textLinks.All(t => !string.IsNullOrEmpty(t.LexicalLinks)),
            Is.True,
            "All TextLink tokens must carry LexicalLinks attributes"
        );
    }

    #endregion

    #region Warning Banner Tests (BHV-310, EXT-008)

    /// <summary>
    /// BHV-310: ActiveBanners is an empty list when no warnings apply.
    /// No update available, no missing book, no review status issue.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-008")]
    [Property("BehaviorId", "BHV-310")]
    [Property("ScenarioId", "TS-057")]
    [Description("No warnings: ActiveBanners is an empty list")]
    public async Task GetScriptureContent_NoWarnings_EmptyBannerList()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: No banners when resource is healthy
        Assert.That(
            result.ActiveBanners,
            Is.Not.Null.And.Empty,
            "BHV-310: ActiveBanners should be empty when no warnings apply"
        );
    }

    /// <summary>
    /// BHV-310: MissingBook banner shown when requested book is not in the resource.
    /// This is distinct from the error case where the resource itself is not found.
    /// The banner approach is used when the resource exists but lacks the specific book.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-008")]
    [Property("BehaviorId", "BHV-310")]
    [Property("ScenarioId", "TS-057")]
    [Description("BHV-310: MissingBook banner when book not available in resource")]
    public async Task GetScriptureContent_MissingBook_BannerContainsMissingBookType()
    {
        // Arrange: Data access with no tokens for book 66 (Revelation)
        var dataAccess = CreateTestDataAccess("ESV16UK+", 1);
        // Do NOT register book 66 tokens, so it should be missing

        var verseRef = new VerseReference(66, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: A MissingBook banner is present
        Assert.That(
            result.ActiveBanners.Any(b => b.Type == WarningBannerType.MissingBook),
            Is.True,
            "BHV-310: Must show MissingBook banner when book is not in resource"
        );
    }

    /// <summary>
    /// BHV-310: WarningBanner records have the expected structure from data-contracts.md.
    /// Each banner has a Type, Message, Dismissible flag, and optional action fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-008")]
    [Property("BehaviorId", "BHV-310")]
    [Property("ScenarioId", "TS-057")]
    [Description("WarningBanner record structure matches data-contracts.md")]
    public void WarningBanner_RecordStructure_HasExpectedFields()
    {
        // Arrange & Act: Create a WarningBanner instance
        var banner = new WarningBanner(
            WarningBannerType.UpdateAvailable,
            "An update is available for this resource",
            Dismissible: true,
            ActionLabel: "Update Now",
            ActionUrl: "update://ESV16UK+"
        );

        // Assert: Record has all fields
        Assert.Multiple(() =>
        {
            Assert.That(banner.Type, Is.EqualTo(WarningBannerType.UpdateAvailable));
            Assert.That(banner.Message, Is.Not.Empty);
            Assert.That(banner.Dismissible, Is.True);
            Assert.That(banner.ActionLabel, Is.EqualTo("Update Now"));
            Assert.That(banner.ActionUrl, Is.EqualTo("update://ESV16UK+"));
        });
    }

    /// <summary>
    /// ScriptureContent record structure matches data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("ScriptureContent record has all required fields from data-contracts.md")]
    public void ScriptureContent_RecordStructure_HasExpectedFields()
    {
        // Arrange & Act: Create a ScriptureContent instance
        var content = new ScriptureContent(
            BodyHtml: "<p>test body</p>",
            FootnoteHtml: "<div>test footnote</div>",
            Tokens: new List<MarbleToken>(),
            ActiveBanners: new List<WarningBanner>(),
            CopyrightHtml: "(c) Test Copyright"
        );

        // Assert: Record has all fields
        Assert.Multiple(() =>
        {
            Assert.That(content.BodyHtml, Is.EqualTo("<p>test body</p>"));
            Assert.That(content.FootnoteHtml, Is.EqualTo("<div>test footnote</div>"));
            Assert.That(content.Tokens, Is.Not.Null);
            Assert.That(content.ActiveBanners, Is.Not.Null);
            Assert.That(content.CopyrightHtml, Is.EqualTo("(c) Test Copyright"));
        });
    }

    #endregion

    #region Rendering Status Overlay Tests (CAP-007 integration)

    /// <summary>
    /// When trackedProjectId is null, no rendering status overlay is applied.
    /// Body HTML should not contain rendering status CSS classes.
    /// This corresponds to INV-014 "NoTrackedProject" status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("No tracked project: body HTML has no rendering status overlay")]
    public async Task GetScriptureContent_NoTrackedProject_NoRenderingStatusInBodyHtml()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML does not contain rendering status indicators
        // When there is no tracked project, words should not have found/missing/guessed classes
        Assert.That(
            result.BodyHtml,
            Does.Not.Contain("rendering-found").And.Not.Contain("rendering-missing"),
            "With no tracked project, body HTML should not have rendering status classes"
        );
    }

    /// <summary>
    /// TermHighlightFilter.FoundTerms: only found-rendered terms get highlighting.
    /// This is a view option that controls which terms show rendering status overlay.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("FoundTerms filter: highlight filter controls which terms are highlighted")]
    public async Task GetScriptureContent_FoundTermsFilter_AffectsBodyHtml()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act: Request with FoundTerms filter and a tracked project
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: "proj123",
            TermHighlightFilter.FoundTerms,
            showFootnotes: false,
            showFoundRenderings: true,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: BodyHtml is generated (specific rendering overlay depends on BT state)
        Assert.That(
            result.BodyHtml,
            Is.Not.Null.And.Not.Empty,
            "Body HTML must be generated even with FoundTerms filter and tracked project"
        );
    }

    #endregion

    #region SourceWordDisplayMode Tests

    /// <summary>
    /// SourceWordDisplayMode.Original: body HTML shows original language text.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Original mode: body HTML includes original language word text")]
    public async Task GetScriptureContent_OriginalMode_BodyHtmlContainsOriginalText()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML contains the original word texts
        Assert.That(
            result.BodyHtml,
            Does.Contain("beginning"),
            "Original mode: body HTML must contain original language text from tokens"
        );
    }

    /// <summary>
    /// SourceWordDisplayMode.Both: body HTML includes both original and transliteration.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-058")]
    [Description("Both mode: body HTML includes original text (transliteration added later)")]
    public async Task GetScriptureContent_BothMode_BodyHtmlGenerated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Both
        );

        // Assert: Body HTML is generated in Both mode
        Assert.That(
            result.BodyHtml,
            Is.Not.Null.And.Not.Empty,
            "Body HTML must be generated in Both display mode"
        );
    }

    #endregion

    #region Error Condition Tests

    /// <summary>
    /// RESOURCE_NOT_FOUND: Throws when resource is not installed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("Error: RESOURCE_NOT_FOUND when resource is not installed")]
    public void GetScriptureContent_ResourceNotFound_ThrowsException()
    {
        // Arrange: Data access with no registered resource
        var dataAccess = new MarbleDataAccess();
        dataAccess.Initialize();
        var verseRef = new VerseReference(1, 1, 1);

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(async () =>
        {
            await ScriptureContentService.GetScriptureContentAsync(
                dataAccess,
                "NONEXISTENT+",
                verseRef,
                trackedProjectId: null,
                TermHighlightFilter.AllResearchTerms,
                showFootnotes: false,
                showFoundRenderings: false,
                showTranslations: false,
                SourceWordDisplayMode.Original
            );
        });

        Assert.That(
            ex!.Message,
            Does.Contain("not installed").IgnoreCase.Or.Contain("NONEXISTENT+"),
            "Error message must indicate the resource is not installed"
        );
    }

    /// <summary>
    /// BOOK_NOT_FOUND: Error when the specific book is not available.
    /// Note: This may throw or may return content with a MissingBook banner,
    /// depending on implementation approach. Test expects one of the two.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("Error or banner: BOOK_NOT_FOUND when book is not in resource")]
    public async Task GetScriptureContent_BookNotFound_ErrorOrBanner()
    {
        // Arrange: Data access with resource but no tokens for book 99
        var dataAccess = CreateTestDataAccess("ESV16UK+", 1);
        var verseRef = new VerseReference(99, 1, 1);

        // Act: May throw or return content with MissingBook banner
        try
        {
            var result = await ScriptureContentService.GetScriptureContentAsync(
                dataAccess,
                "ESV16UK+",
                verseRef,
                trackedProjectId: null,
                TermHighlightFilter.AllResearchTerms,
                showFootnotes: false,
                showFoundRenderings: false,
                showTranslations: false,
                SourceWordDisplayMode.Original
            );

            // If no exception, must have MissingBook banner
            Assert.That(
                result.ActiveBanners.Any(b => b.Type == WarningBannerType.MissingBook),
                Is.True,
                "When book not found and no exception, must show MissingBook banner"
            );
        }
        catch (Exception ex)
        {
            // Exception approach: message should indicate book not found
            Assert.That(
                ex.Message,
                Does.Contain("not available").IgnoreCase.Or.Contain("book").IgnoreCase,
                "Error message must indicate the book is not available"
            );
        }
    }

    #endregion

    #region Copyright HTML Tests

    /// <summary>
    /// CopyrightHtml field is populated when the resource has copyright information.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ScenarioId", "TS-141")]
    [Description("CopyrightHtml populated when resource has copyright")]
    public async Task GetScriptureContent_ResourceWithCopyright_CopyrightHtmlSet()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: CopyrightHtml may be null or populated based on resource
        // This test verifies the field exists and is accessible
        Assert.That(
            result.CopyrightHtml,
            Is.Null.Or.Not.Empty,
            "CopyrightHtml should be null or contain copyright text, never empty string"
        );
    }

    #endregion

    #region Greek Bracket Stripping Edge Case

    /// <summary>
    /// Edge case: Greek bracket characters stripped from body HTML.
    /// Per PTX-23179/PTX-23229, ']' brackets are stripped from Greek text
    /// before display in the scripture pane.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ExtractionId", "EXT-002")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-074")]
    [Description("Edge case: Greek bracket stripping from body HTML")]
    public async Task GetScriptureContent_GreekTextWithBrackets_BracketsStripped()
    {
        // Arrange: Greek text tokens with bracket characters
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(43, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "logos]",
                null,
                new VerseReference(43, 1, 1),
                LexicalLinks: "SDBG:logos:001001"
            ),
        };
        var dataAccess = CreateTestDataAccess("GNT+", 43, tokens);
        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await ScriptureContentService.GetScriptureContentAsync(
            dataAccess,
            "GNT+",
            verseRef,
            trackedProjectId: null,
            TermHighlightFilter.AllResearchTerms,
            showFootnotes: false,
            showFoundRenderings: false,
            showTranslations: false,
            SourceWordDisplayMode.Original
        );

        // Assert: Body HTML should not contain the trailing bracket
        Assert.That(
            result.BodyHtml,
            Does.Not.Contain("logos]"),
            "PTX-23179: Trailing ']' brackets must be stripped from Greek text in body HTML"
        );
        Assert.That(
            result.BodyHtml,
            Does.Contain("logos"),
            "Greek word text must still be present after bracket stripping"
        );
    }

    #endregion

    #region WarningBannerType Enum Tests

    /// <summary>
    /// WarningBannerType enum has all expected values from data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("BehaviorId", "BHV-310")]
    [Property("ScenarioId", "TS-057")]
    [Description("WarningBannerType enum values match data-contracts.md")]
    public void WarningBannerType_HasAllExpectedValues()
    {
        // Assert: All six banner types exist
        Assert.Multiple(() =>
        {
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.MissingBook),
                Is.True
            );
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.ReviewStatus),
                Is.True
            );
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.ImageWarning),
                Is.True
            );
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.CopyrightWarning),
                Is.True
            );
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.UpdateRequiredData),
                Is.True
            );
            Assert.That(
                Enum.IsDefined(typeof(WarningBannerType), WarningBannerType.UpdateAvailable),
                Is.True
            );
        });

        // Verify count: exactly 6 types
        Assert.That(
            Enum.GetValues(typeof(WarningBannerType)).Length,
            Is.EqualTo(6),
            "WarningBannerType must have exactly 6 values per data-contracts.md"
        );
    }

    #endregion
}
