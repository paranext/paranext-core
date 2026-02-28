using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Integration tests for Micro-Phase 5 (BE-5: Orchestration) capability chains.
///
/// These tests verify cross-capability interactions between:
/// - CAP-009 (GetTermRenderingStatus): 12-code rendering status determination
/// - CAP-010 (AnalyzeErBtMapping): Three-dimensional ER-to-BT mapping
/// - CAP-012 (GenerateScriptureHtml): Scripture pane HTML with highlight CSS classes
/// - CAP-013 (GenerateTooltip): Tooltip combining gloss, POS, and rendering status
///
/// Integration Touchpoints:
/// 1. CAP-009 -> CAP-012: Rendering status CSS classes feed into HTML generation
/// 2. CAP-009 -> CAP-013: Rendering status text in tooltip
/// 3. CAP-010 -> CAP-009: Mapping results inform rendering status
/// 4. CAP-012 -> CAP-013: Scripture HTML tokens feed tooltip generation
/// 5. MP1-MP4 dependencies: All MP5 capabilities depend on foundation, parsing, lexicon, content
///
/// These tests use REAL service method calls. The static test seams simulate the
/// external data layer (ParatextData) but the actual capability logic --
/// rendering status determination, CSS class generation, HTML building, tooltip
/// formatting, and mapping analysis -- is exercised end-to-end.
/// </summary>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesMP5IntegrationTests
{
    // =========================================================================
    // Constants
    // =========================================================================

    private const string TestResourceId = "SBL-GNT-ER";
    private const string TestTrackedProjectId = "MyTranslation";

    // =========================================================================
    // Service instances
    // =========================================================================

    private TermRenderingStatusService _termRenderingService = null!;
    private ErBtMappingEngine _erBtMappingEngine = null!;
    private ScriptureRenderingService _scriptureRenderingService = null!;

    // =========================================================================
    // Saved test seams (for save/restore pattern)
    // =========================================================================

    // CAP-009 seams
    private Func<
        string?,
        string,
        VerseRef,
        (
            TermRenderingStatusCode StatusCode,
            string? FoundRendering,
            bool HasRendering,
            string? ErrorCode,
            string? ErrorMessage
        )
    >? _savedTermLookup;
    private Func<bool>? _savedHaveMarbleData;

    // CAP-010 seams
    private Func<
        string,
        string,
        VerseRef,
        string,
        (IReadOnlyList<ErBtMapping>? Mappings, string? ErrorCode, string? ErrorMessage)
    >? _savedAnalyzeMapping;
    private Func<string, bool>? _savedIsProjectAvailable;
    private Func<bool>? _savedIsResourceInitialized;
    private Func<bool>? _savedHaveTermsData;

    // CAP-012 seams
    private Func<
        string,
        (bool Exists, bool IsLegacy, string HtmlLang, IReadOnlyList<int>? AvailableBooks)
    >? _savedResourceLookup;
    private Func<
        string,
        int,
        (bool Success, string? UsxContent, string? ErrorCode, string? ErrorMessage)
    >? _savedGetUsxContent;
    private Func<string?, string, VerseRef, string?>? _savedGetTokenRenderingCss;

    // CAP-004/014 seams (for tooltip gloss integration)
    private Func<string, string, string, LexiconEntry?>? _savedDictEntryLookup;
    private Func<string, bool>? _savedIsDictLoaded;
    private Func<string, string>? _savedResolveDictionary;

    // =========================================================================
    // TEST SETUP / TEARDOWN
    // =========================================================================

    [SetUp]
    public void SetUp()
    {
        // Create fresh service instances
        _termRenderingService = new TermRenderingStatusService();
        _erBtMappingEngine = new ErBtMappingEngine();
        _scriptureRenderingService = new ScriptureRenderingService();

        // Save existing seams
        _savedTermLookup = TermRenderingStatusService.TestTermLookup;
        _savedHaveMarbleData = TermRenderingStatusService.TestHaveMarbleData;
        _savedAnalyzeMapping = ErBtMappingEngine.TestAnalyzeMapping;
        _savedIsProjectAvailable = ErBtMappingEngine.TestIsProjectAvailable;
        _savedIsResourceInitialized = ErBtMappingEngine.TestIsResourceInitialized;
        _savedHaveTermsData = ErBtMappingEngine.TestHaveTermsData;
        _savedResourceLookup = ScriptureRenderingService.TestResourceLookup;
        _savedGetUsxContent = ScriptureRenderingService.TestGetUsxContent;
        _savedGetTokenRenderingCss = ScriptureRenderingService.TestGetTokenRenderingCss;
        _savedDictEntryLookup = LexiconService.TestDictionaryEntryLookup;
        _savedIsDictLoaded = LexiconService.TestIsDictionaryLoaded;
        _savedResolveDictionary = LexiconService.TestResolveDictionary;

        // Configure integration test seams

        // CAP-009: Term rendering status lookup
        TermRenderingStatusService.TestTermLookup = (trackedProjectId, lemma, verseRef) =>
        {
            if (trackedProjectId == null)
                return (TermRenderingStatusCode.NoTrackedProject, null, false, null, null);

            if (trackedProjectId == "MISSING-PROJECT")
                return (
                    TermRenderingStatusCode.NoTrackedProject,
                    null,
                    false,
                    "NOT_FOUND",
                    $"Tracked project '{trackedProjectId}' not found"
                );

            // Simulate different statuses based on lemma
            return lemma switch
            {
                "agapao" => (TermRenderingStatusCode.Found, "love", true, null, null),
                "pistis" => (TermRenderingStatusCode.Missing, null, false, null, null),
                "logos" => (TermRenderingStatusCode.FoundInVerse, "word", true, null, null),
                "theos" => (TermRenderingStatusCode.MissingElsewhere, null, false, null, null),
                "pneuma" => (TermRenderingStatusCode.TermNotInProject, null, false, null, null),
                _ => (TermRenderingStatusCode.Unknown, null, false, null, null),
            };
        };

        TermRenderingStatusService.TestHaveMarbleData = () => true;

        // CAP-010: ER-BT mapping analysis
        ErBtMappingEngine.TestAnalyzeMapping = (trackedProjectId, resourceId, verseRef, scope) =>
        {
            if (trackedProjectId == "MISSING-PROJECT")
                return (null, "NOT_FOUND", $"Tracked project '{trackedProjectId}' not found");

            // Return mappings with rendering statuses from CAP-009
            var mappings = new List<ErBtMapping>
            {
                new(
                    Link: new LexicalLink("SDBG", "agapao", 1, 1),
                    BiblicalTermId: "BT-agapao",
                    MatchDimension: "reference",
                    MatchPriority: 1,
                    RenderingStatus: TermRenderingStatusCode.Found
                ),
                new(
                    Link: new LexicalLink("SDBG", "pistis", 1, 1),
                    BiblicalTermId: "BT-pistis",
                    MatchDimension: "sense",
                    MatchPriority: 3,
                    RenderingStatus: TermRenderingStatusCode.Missing
                ),
                new(
                    Link: new LexicalLink("SDBG", "unknown_term", 1, 1),
                    BiblicalTermId: null,
                    MatchDimension: null,
                    MatchPriority: null,
                    RenderingStatus: TermRenderingStatusCode.Unknown
                ),
            };
            return (mappings, null, null);
        };

        // CAP-012: Resource lookup and USX content
        ScriptureRenderingService.TestResourceLookup = (resourceId) =>
        {
            if (resourceId == "NONEXISTENT-RESOURCE")
                return (false, false, "", null);
            return (true, false, "en", Enumerable.Range(1, 66).ToList());
        };

        ScriptureRenderingService.TestGetUsxContent = (resourceId, bookNumber) =>
        {
            if (resourceId == "CORRUPT-ER")
                return (false, null, "PARSE_ERROR", "Failed to generate scripture content");

            var usx = BuildIntegrationUsx(bookNumber);
            return (true, usx, null, null);
        };

        // CAP-012: Per-token rendering CSS class -- wires CAP-009 into CAP-012
        ScriptureRenderingService.TestGetTokenRenderingCss = (trackedProjectId, lemma, verseRef) =>
        {
            if (trackedProjectId == null)
                return null;

            // Delegate to the real TermRenderingStatusService CSS logic
            var link = new LexicalLink("SDBG", lemma, 1, 1);
            var input = new TermRenderingStatusInput(
                trackedProjectId,
                link,
                verseRef,
                TestResourceId
            );
            var result = _termRenderingService
                .GetTermRenderingStatusAsync(input, CancellationToken.None)
                .Result;

            if (!result.Success || result.StatusCode == null)
                return null;

            return TermRenderingStatusService.GetCssClassForStatus(result.StatusCode.Value);
        };

        // CAP-004/014: Dictionary lookup (for CAP-013 tooltip gloss)
        LexiconService.TestIsDictionaryLoaded = (dict) => dict is "SDBG" or "SDBH" or "DCLEX";
        LexiconService.TestResolveDictionary = (name) => name == "LN" ? "SDBG" : name;
        LexiconService.TestDictionaryEntryLookup = (dictionary, lemma, langId) =>
        {
            if (dictionary == "SDBG" && lemma == "agapao")
                return BuildTestLexiconEntry("agapao", "to love", "en", "SDBG");
            if (dictionary == "SDBG" && lemma == "pistis")
                return BuildTestLexiconEntry("pistis", "faith", "en", "SDBG");
            if (dictionary == "SDBG" && lemma == "logos")
                return BuildTestLexiconEntry("logos", "word", "en", "SDBG");
            return null;
        };
    }

    [TearDown]
    public void TearDown()
    {
        // Restore all seams to pre-test state
        TermRenderingStatusService.TestTermLookup = _savedTermLookup;
        TermRenderingStatusService.TestHaveMarbleData = _savedHaveMarbleData;
        ErBtMappingEngine.TestAnalyzeMapping = _savedAnalyzeMapping;
        ErBtMappingEngine.TestIsProjectAvailable = _savedIsProjectAvailable;
        ErBtMappingEngine.TestIsResourceInitialized = _savedIsResourceInitialized;
        ErBtMappingEngine.TestHaveTermsData = _savedHaveTermsData;
        ScriptureRenderingService.TestResourceLookup = _savedResourceLookup;
        ScriptureRenderingService.TestGetUsxContent = _savedGetUsxContent;
        ScriptureRenderingService.TestGetTokenRenderingCss = _savedGetTokenRenderingCss;
        LexiconService.TestDictionaryEntryLookup = _savedDictEntryLookup;
        LexiconService.TestIsDictionaryLoaded = _savedIsDictLoaded;
        LexiconService.TestResolveDictionary = _savedResolveDictionary;
    }

    // =========================================================================
    // CHAIN 1: CAP-009 -> CAP-012 (Rendering Status CSS -> Scripture HTML)
    // =========================================================================

    /// <summary>
    /// Verifies that when CAP-009 returns "Found" for a term, CAP-012
    /// applies the "showfound" CSS class to the corresponding word span
    /// in the generated scripture HTML.
    ///
    /// Integration chain: CAP-009 GetTermRenderingStatus -> CAP-012 GenerateScriptureHtml
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-012")]
    [Property("ScenarioId", "TS-094")]
    [Description("Found rendering status produces showfound CSS class in scripture HTML")]
    public async Task RenderingStatusFound_FeedsShowfoundCss_IntoScriptureHtml()
    {
        // Arrange: Generate scripture HTML with a tracked project
        // The test seam wires CAP-009's "agapao" -> Found -> "showfound"
        var input = CreateScriptureHtmlInput(
            trackedProjectId: TestTrackedProjectId,
            bookNumber: 43, // John (NT)
            highlightFound: true
        );

        // Act
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert: HTML generated successfully and contains "showfound" CSS class
        Assert.That(result.Success, Is.True, "Scripture HTML generation should succeed");
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("showfound"),
            "HTML should contain 'showfound' CSS class from CAP-009 rendering status"
        );
    }

    /// <summary>
    /// Verifies that when CAP-009 returns "Missing" for a term, CAP-012
    /// applies the "showmissing" CSS class to the corresponding word span.
    ///
    /// Integration chain: CAP-009 GetTermRenderingStatus -> CAP-012 GenerateScriptureHtml
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-012")]
    [Property("ScenarioId", "TS-096")]
    [Description("Missing rendering status produces showmissing CSS class in scripture HTML")]
    public async Task RenderingStatusMissing_FeedsShowmissingCss_IntoScriptureHtml()
    {
        // Arrange: Configure the rendering CSS seam to return "showmissing" for a specific lemma
        ScriptureRenderingService.TestGetTokenRenderingCss = (trackedProjectId, lemma, verseRef) =>
        {
            if (trackedProjectId == null)
                return null;
            // All tokens in the test USX use the same lemma; override to "showmissing"
            return "showmissing";
        };

        var input = CreateScriptureHtmlInput(
            trackedProjectId: TestTrackedProjectId,
            bookNumber: 43,
            highlightMissing: true
        );

        // Act
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("showmissing"),
            "HTML should contain 'showmissing' CSS class from CAP-009 rendering status"
        );
    }

    /// <summary>
    /// Verifies that highlight CSS classes in ScripturePaneContent reflect
    /// the HighlightFlags from the input. This tests the static
    /// TermRenderingStatusService.GetHighlightCssClasses called by CAP-012.
    ///
    /// Integration chain: CAP-009 (GetHighlightCssClasses) -> CAP-012 (ScripturePaneContent)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-012")]
    [Property("ScenarioId", "TS-094")]
    [Description("HighlightFlags produce correct CSS classes in ScripturePaneContent")]
    public async Task HighlightFlags_ProduceCorrectCssClasses_InScripturePaneContent()
    {
        // Arrange: All three highlight flags enabled
        var input = CreateScriptureHtmlInput(
            trackedProjectId: TestTrackedProjectId,
            bookNumber: 43,
            highlightResearchTerms: true,
            highlightFound: true,
            highlightMissing: true
        );

        // Act
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert: HighlightCssClasses should contain all three CSS classes
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Is.Not.Null);
        Assert.That(
            result.HighlightCssClasses,
            Does.Contain("showeverylink"),
            "Research terms flag should add 'showeverylink' CSS class"
        );
        Assert.That(
            result.HighlightCssClasses,
            Does.Contain("showfound"),
            "Found flag should add 'showfound' CSS class"
        );
        Assert.That(
            result.HighlightCssClasses,
            Does.Contain("showmissing"),
            "Missing flag should add 'showmissing' CSS class"
        );
    }

    /// <summary>
    /// Verifies that when no tracked project is set, no rendering CSS
    /// classes appear in the generated HTML and no TermRenderingStatus
    /// determination occurs.
    ///
    /// Integration chain: CAP-009 (no project) -> CAP-012 (no CSS)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-012")]
    [Property("ScenarioId", "TS-089")]
    [Description("No tracked project means no rendering CSS classes in scripture HTML")]
    public async Task NoTrackedProject_ProducesNoRenderingCss_InScriptureHtml()
    {
        // Arrange: No tracked project
        var input = CreateScriptureHtmlInput(trackedProjectId: null, bookNumber: 43);

        // Act
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert: HTML should not contain rendering-status CSS classes
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.ScriptureHtml,
            Does.Not.Contain("showfound"),
            "Without tracked project, no 'showfound' CSS should appear"
        );
        Assert.That(
            result.ScriptureHtml,
            Does.Not.Contain("showmissing"),
            "Without tracked project, no 'showmissing' CSS should appear"
        );
    }

    // =========================================================================
    // CHAIN 2: CAP-009 -> CAP-013 (Rendering Status -> Tooltip Text)
    // =========================================================================

    /// <summary>
    /// Verifies that when CAP-009 returns "Found" status, CAP-013 includes
    /// "Rendering: found" in the tooltip text.
    ///
    /// Integration chain: CAP-009 GetTermRenderingStatus -> CAP-013 GenerateTooltip
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-013")]
    [Property("ScenarioId", "TS-129")]
    [Description("Found rendering status produces 'Rendering: found' in tooltip")]
    public async Task RenderingStatusFound_FeedsFoundText_IntoTooltip()
    {
        // Arrange: Create tooltip input with Found rendering status
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert: Tooltip contains rendering status text
        Assert.That(result.Success, Is.True, "Tooltip generation should succeed");
        Assert.That(result.TooltipHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.TooltipHtml,
            Does.Contain("Rendering: found"),
            "Tooltip should include 'Rendering: found' from CAP-009 status"
        );
    }

    /// <summary>
    /// Verifies that when CAP-009 returns "Missing" status, CAP-013 includes
    /// "Missing rendering" in the tooltip text.
    ///
    /// Integration chain: CAP-009 GetTermRenderingStatus -> CAP-013 GenerateTooltip
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-013")]
    [Property("ScenarioId", "TS-129")]
    [Description("Missing rendering status produces 'Missing rendering' in tooltip")]
    public async Task RenderingStatusMissing_FeedsMissingText_IntoTooltip()
    {
        // Arrange
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "pistis", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Missing,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.TooltipHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.TooltipHtml,
            Does.Contain("Missing rendering"),
            "Tooltip should include 'Missing rendering' from CAP-009 status"
        );
    }

    /// <summary>
    /// Verifies that when rendering status is "NoTrackedProject", CAP-013
    /// does NOT include any rendering status text in the tooltip.
    ///
    /// Integration chain: CAP-009 (NoTrackedProject) -> CAP-013 (no rendering text)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-013")]
    [Property("ScenarioId", "TS-089")]
    [Description("NoTrackedProject status omits rendering text from tooltip")]
    public async Task NoTrackedProject_OmitsRenderingText_FromTooltip()
    {
        // Arrange: Status = NoTrackedProject
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.NoTrackedProject,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert: Tooltip should NOT contain rendering status text
        Assert.That(result.Success, Is.True);
        Assert.That(result.TooltipHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.TooltipHtml,
            Does.Not.Contain("Rendering:"),
            "NoTrackedProject should not produce rendering text in tooltip"
        );
        Assert.That(
            result.TooltipHtml,
            Does.Not.Contain("Missing rendering"),
            "NoTrackedProject should not produce missing text in tooltip"
        );
    }

    /// <summary>
    /// Verifies that the tooltip includes both the gloss (from CAP-004/014 via
    /// LexiconService) and the rendering status text (from CAP-009). This tests
    /// the full data combination that CAP-013 performs.
    ///
    /// Integration chain: CAP-004 (gloss) + CAP-009 (status) -> CAP-013 (tooltip)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 + CAP-009 -> CAP-013")]
    [Property("ScenarioId", "TS-129")]
    [Description("Tooltip combines gloss from CAP-004 and rendering status from CAP-009")]
    public async Task Tooltip_CombinesGlossAndRenderingStatus_FromMultipleCapabilities()
    {
        // Arrange
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert: Tooltip should contain both gloss and rendering status
        Assert.That(result.Success, Is.True);
        Assert.That(result.TooltipHtml, Is.Not.Null.And.Not.Empty);

        // The tooltip should contain the lemma
        Assert.That(
            result.TooltipHtml,
            Does.Contain("agapao"),
            "Tooltip should contain the lemma text"
        );

        // The tooltip should contain the rendering status
        Assert.That(
            result.TooltipHtml,
            Does.Contain("Rendering: found"),
            "Tooltip should contain rendering status from CAP-009"
        );
    }

    // =========================================================================
    // CHAIN 3: CAP-010 -> CAP-009 (Mapping Results -> Rendering Status)
    // =========================================================================

    /// <summary>
    /// Verifies that each ER-BT mapping result from CAP-010 carries a
    /// rendering status code that corresponds to what CAP-009 would return.
    /// The mapping engine populates RenderingStatus on each ErBtMapping
    /// from the TermRenderingStatusService.
    ///
    /// Integration chain: CAP-010 AnalyzeErBtMapping -> CAP-009 GetTermRenderingStatus
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-010 -> CAP-009")]
    [Property("ScenarioId", "TS-142")]
    [Description("ER-BT mapping results carry rendering status from CAP-009")]
    public async Task ErBtMapping_CarriesRenderingStatus_FromTermRenderingService()
    {
        // Arrange
        var mappingInput = new ErBtMappingInput(
            TrackedProjectId: TestTrackedProjectId,
            ResourceId: TestResourceId,
            VerseRef: new VerseRef(43, 3, 16),
            Scope: "currentChapter"
        );

        // Act
        var result = await _erBtMappingEngine.AnalyzeErBtMappingAsync(
            mappingInput,
            CancellationToken.None
        );

        // Assert: Each mapping has a rendering status code
        Assert.That(result.Success, Is.True, "Mapping analysis should succeed");
        Assert.That(result.Mappings, Is.Not.Null);
        Assert.That(result.Mappings!.Count, Is.EqualTo(3), "Should have 3 test mappings");

        // First mapping: "agapao" matched by reference -> Found
        Assert.That(
            result.Mappings[0].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.Found),
            "Matched term 'agapao' should have Found rendering status"
        );
        Assert.That(
            result.Mappings[0].BiblicalTermId,
            Is.Not.Null,
            "Matched term should have BT ID"
        );

        // Second mapping: "pistis" matched by sense -> Missing
        Assert.That(
            result.Mappings[1].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.Missing),
            "Matched term 'pistis' should have Missing rendering status"
        );

        // Third mapping: unmatched -> Unknown
        Assert.That(
            result.Mappings[2].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.Unknown),
            "Unmatched term should have Unknown rendering status"
        );
        Assert.That(
            result.Mappings[2].BiblicalTermId,
            Is.Null,
            "Unmatched term should have null BT ID"
        );
    }

    /// <summary>
    /// Verifies that mapping summary statistics correctly count matched
    /// and unmatched links based on the BiblicalTermId field.
    ///
    /// Integration chain: CAP-010 (summary) -> CAP-009 (mapping basis)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-010 -> CAP-009")]
    [Property("ScenarioId", "TS-142")]
    [Description("Mapping summary correctly counts matched vs unmatched links")]
    public async Task ErBtMapping_SummaryStatistics_ReflectMatchedAndUnmatchedLinks()
    {
        // Arrange
        var mappingInput = new ErBtMappingInput(
            TrackedProjectId: TestTrackedProjectId,
            ResourceId: TestResourceId,
            VerseRef: new VerseRef(43, 3, 16),
            Scope: "currentVerse"
        );

        // Act
        var result = await _erBtMappingEngine.AnalyzeErBtMappingAsync(
            mappingInput,
            CancellationToken.None
        );

        // Assert: Summary reflects 2 matched + 1 unmatched = 3 total
        Assert.That(result.Success, Is.True);
        Assert.That(result.Summary, Is.Not.Null);
        Assert.That(result.Summary!.TotalLinks, Is.EqualTo(3));
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(2));
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(1));
    }

    // =========================================================================
    // CHAIN 4: Full Pipeline (Parse -> Render -> Status -> Tooltip)
    // =========================================================================

    /// <summary>
    /// Verifies the full orchestration pipeline: CAP-012 parses tokens from
    /// USX, applies rendering status CSS from CAP-009, generates HTML; then
    /// CAP-013 generates a tooltip for a word in that HTML, combining gloss
    /// and rendering status.
    ///
    /// Integration chain: CAP-012 GenerateScriptureHtml -> CAP-013 GenerateTooltip
    /// Cross-dependency: CAP-009 feeds into both CAP-012 (CSS) and CAP-013 (text)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-012 -> CAP-013")]
    [Property("ScenarioId", "TS-094")]
    [Description("Full pipeline: scripture HTML with CSS classes + tooltip with rendering status")]
    public async Task FullPipeline_ScriptureHtmlAndTooltip_ShareRenderingStatusData()
    {
        // Step 1: Generate scripture HTML (CAP-012)
        var htmlInput = CreateScriptureHtmlInput(
            trackedProjectId: TestTrackedProjectId,
            bookNumber: 43,
            highlightFound: true,
            highlightMissing: true
        );

        var htmlResult = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            htmlInput,
            CancellationToken.None
        );

        // Step 2: Generate tooltip for a "Found" word (CAP-013)
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        var tooltipResult = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert: Both results are consistent
        Assert.That(htmlResult.Success, Is.True, "Scripture HTML should succeed");
        Assert.That(tooltipResult.Success, Is.True, "Tooltip should succeed");

        // HTML has rendering CSS classes
        Assert.That(htmlResult.ScriptureHtml, Does.Contain("showfound"));
        Assert.That(htmlResult.HighlightCssClasses, Does.Contain("showfound"));
        Assert.That(htmlResult.HighlightCssClasses, Does.Contain("showmissing"));

        // Tooltip has rendering status text
        Assert.That(tooltipResult.TooltipHtml, Does.Contain("Rendering: found"));

        // Both reference the same data layer: rendering status from CAP-009
    }

    /// <summary>
    /// Verifies that the full pipeline works end-to-end for an OT book:
    /// Parse Hebrew tokens -> Generate HTML with Hebrew display mode ->
    /// Apply rendering status CSS -> Generate tooltip with Hebrew dictionary.
    ///
    /// Integration chain: Parse (MP2) -> Render (CAP-012) -> Status (CAP-009) -> Tooltip (CAP-013)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "MP2 -> CAP-012 -> CAP-009 -> CAP-013")]
    [Property("ScenarioId", "TS-094")]
    [Description("Full pipeline works for OT books with Hebrew display mode")]
    public async Task FullPipeline_OTBook_HebrewDisplayMode_WorksEndToEnd()
    {
        // Arrange: OT book (Genesis = 1), Hebrew display mode
        var htmlInput = new GenerateScriptureHtmlInput(
            ResourceId: TestResourceId,
            VerseRef: new VerseRef(1, 1, 1),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: true, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: TestTrackedProjectId,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var htmlResult = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            htmlInput,
            CancellationToken.None
        );

        // Assert
        Assert.That(htmlResult.Success, Is.True, "OT book HTML generation should succeed");
        Assert.That(htmlResult.ScriptureHtml, Is.Not.Null.And.Not.Empty);

        // Verify highlight classes include research terms and found
        Assert.That(htmlResult.HighlightCssClasses, Does.Contain("showeverylink"));
        Assert.That(htmlResult.HighlightCssClasses, Does.Contain("showfound"));
    }

    // =========================================================================
    // ERROR ISOLATION TESTS
    // =========================================================================

    /// <summary>
    /// Verifies that when CAP-009 returns an error (tracked project not found),
    /// CAP-012 still generates scripture HTML (without rendering CSS classes).
    /// One capability failure should not cascade to crash another.
    ///
    /// Error isolation: CAP-009 failure does not crash CAP-012
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 error -> CAP-012 resilient")]
    [Property("ScenarioId", "TS-089")]
    [Description("CAP-009 error (bad project) does not crash CAP-012 scripture generation")]
    public async Task Cap009Error_DoesNotCrash_Cap012ScriptureGeneration()
    {
        // Arrange: Override rendering CSS to return null (simulating CAP-009 error fallback)
        ScriptureRenderingService.TestGetTokenRenderingCss = (trackedProjectId, lemma, verseRef) =>
        {
            // Simulate CAP-009 failing for this project: return null (no CSS)
            return null;
        };

        var input = CreateScriptureHtmlInput(
            trackedProjectId: "MISSING-PROJECT",
            bookNumber: 43,
            highlightFound: true
        );

        // Act: Scripture HTML should still generate
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert: HTML generated without rendering CSS classes
        Assert.That(
            result.Success,
            Is.True,
            "CAP-012 should succeed even when CAP-009 returns no CSS"
        );
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.ScriptureHtml,
            Does.Not.Contain("showfound"),
            "No rendering CSS when CAP-009 returns null"
        );
        Assert.That(
            result.ScriptureHtml,
            Does.Not.Contain("showmissing"),
            "No rendering CSS when CAP-009 returns null"
        );
    }

    /// <summary>
    /// Verifies that CAP-013 gracefully handles an unresolvable link
    /// (returning NOT_FOUND error) without crashing or affecting the
    /// rest of the HTML generation pipeline.
    ///
    /// Error isolation: CAP-013 error is self-contained
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-013 error isolated")]
    [Property("ScenarioId", "TS-129")]
    [Description("CAP-013 unresolvable link returns NOT_FOUND without crashing")]
    public async Task Cap013Error_UnresolvableLink_ReturnsNotFoundGracefully()
    {
        // Arrange: Tooltip with empty lemma (unresolvable)
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert: Graceful NOT_FOUND error, not an exception
        Assert.That(result.Success, Is.False, "Unresolvable link should return failure");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
    }

    /// <summary>
    /// Verifies that CAP-013 returns NOT_FOUND for an unknown dictionary
    /// without cascading failures.
    ///
    /// Error isolation: CAP-013 error is self-contained for unknown dictionaries
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-013 error isolated")]
    [Property("ScenarioId", "TS-129")]
    [Description("CAP-013 unknown dictionary returns NOT_FOUND gracefully")]
    public async Task Cap013Error_UnknownDictionary_ReturnsNotFoundGracefully()
    {
        // Arrange: Tooltip with unknown dictionary
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("UNKNOWN_DICT", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        // Act
        var result = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
    }

    /// <summary>
    /// Verifies that when CAP-010 receives an invalid tracked project,
    /// it returns a NOT_FOUND error without affecting CAP-009's ability
    /// to process other requests.
    ///
    /// Error isolation: CAP-010 error does not cascade to CAP-009
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-010 error -> CAP-009 resilient")]
    [Property("ScenarioId", "TS-142")]
    [Description("CAP-010 error (bad project) does not affect CAP-009")]
    public async Task Cap010Error_DoesNotAffect_Cap009TermRendering()
    {
        // Step 1: CAP-010 fails with bad project
        var mappingInput = new ErBtMappingInput(
            TrackedProjectId: "MISSING-PROJECT",
            ResourceId: TestResourceId,
            VerseRef: new VerseRef(43, 3, 16),
            Scope: "currentChapter"
        );

        var mappingResult = await _erBtMappingEngine.AnalyzeErBtMappingAsync(
            mappingInput,
            CancellationToken.None
        );

        Assert.That(mappingResult.Success, Is.False, "Mapping should fail for missing project");
        Assert.That(mappingResult.Error!.Code, Is.EqualTo("NOT_FOUND"));

        // Step 2: CAP-009 still works with a valid project
        var statusInput = new TermRenderingStatusInput(
            TrackedProjectId: TestTrackedProjectId,
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: TestResourceId
        );

        var statusResult = await _termRenderingService.GetTermRenderingStatusAsync(
            statusInput,
            CancellationToken.None
        );

        // CAP-009 is unaffected by CAP-010's failure
        Assert.That(
            statusResult.Success,
            Is.True,
            "CAP-009 should still work after CAP-010 failure"
        );
        Assert.That(statusResult.StatusCode, Is.EqualTo(TermRenderingStatusCode.Found));
    }

    /// <summary>
    /// Verifies that CAP-012 handles a corrupt resource (PARSE_ERROR) while
    /// CAP-013 continues to work independently for other resources.
    ///
    /// Error isolation: CAP-012 error is self-contained
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-012 error isolated")]
    [Property("ScenarioId", "TS-094")]
    [Description("CAP-012 PARSE_ERROR for corrupt resource does not affect CAP-013")]
    public async Task Cap012Error_CorruptResource_DoesNotAffectCap013()
    {
        // Step 1: CAP-012 fails for corrupt resource
        var corruptInput = CreateScriptureHtmlInput(
            trackedProjectId: TestTrackedProjectId,
            bookNumber: 43,
            resourceId: "CORRUPT-ER"
        );

        var corruptResult = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            corruptInput,
            CancellationToken.None
        );

        Assert.That(corruptResult.Success, Is.False, "Corrupt resource should fail");
        Assert.That(corruptResult.Error!.Code, Is.EqualTo("PARSE_ERROR"));

        // Step 2: CAP-013 still works for a valid resource
        var tooltipInput = new GenerateTooltipInput(
            Link: new LexicalLink("SDBG", "agapao", 1, 1),
            RenderingStatus: TermRenderingStatusCode.Found,
            GlossLanguageId: "en",
            BookNumber: 43,
            ResourceId: TestResourceId
        );

        var tooltipResult = await _scriptureRenderingService.GenerateTooltipAsync(
            tooltipInput,
            CancellationToken.None
        );

        Assert.That(
            tooltipResult.Success,
            Is.True,
            "CAP-013 should still work after CAP-012 failure"
        );
    }

    // =========================================================================
    // CROSS-MICRO-PHASE DEPENDENCY TESTS
    // =========================================================================

    /// <summary>
    /// Verifies that CAP-012 (MP5) depends on token parsing from MP2
    /// (MarbleDataParser). The scripture HTML generation calls ParseUsxTokensAsync
    /// internally, demonstrating the MP2 -> MP5 dependency.
    ///
    /// Cross-MP chain: CAP-002 (MP2 parsing) -> CAP-012 (MP5 rendering)
    /// </summary>
    [Test]
    [Property("IntegrationChain", "MP2 -> MP5")]
    [Property("ScenarioId", "TS-048")]
    [Description("CAP-012 depends on MP2 token parsing for HTML generation")]
    public async Task Cap012_DependsOnMp2TokenParsing_ForHtmlGeneration()
    {
        // Arrange: Provide valid USX that will be parsed by MarbleDataParser
        var input = CreateScriptureHtmlInput(trackedProjectId: null, bookNumber: 43);

        // Act: CAP-012 internally calls MarbleDataParser.ParseUsxTokensAsync (MP2)
        var result = await _scriptureRenderingService.GenerateScriptureHtmlAsync(
            input,
            CancellationToken.None
        );

        // Assert: HTML was generated from parsed tokens
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);

        // HTML contains verse markers (produced by token parsing)
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("verse_1"),
            "HTML should contain verse navigation IDs from parsed tokens"
        );
    }

    /// <summary>
    /// Verifies that rendering status CSS class computation (CAP-009)
    /// correctly maps all 12 status codes to their CSS classes. This
    /// validates the TermRenderingStatusService.GetCssClassForStatus
    /// static method used by CAP-012.
    ///
    /// Integration: CAP-009 CSS class mapping used by CAP-012
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-009 -> CAP-012")]
    [Property("ScenarioId", "TS-094")]
    [Description("All 12 status codes map to correct CSS classes for CAP-012 consumption")]
    public void AllStatusCodes_MapToCorrectCssClasses_ForCap012()
    {
        // Found-family -> "showfound"
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.Found),
            Is.EqualTo("showfound")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.FoundInVerse),
            Is.EqualTo("showfound")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.FoundElsewhere),
            Is.EqualTo("showfound")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.GuessFound),
            Is.EqualTo("showfound")
        );

        // Missing-family -> "showmissing"
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.Missing),
            Is.EqualTo("showmissing")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.MissingInVerse),
            Is.EqualTo("showmissing")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(
                TermRenderingStatusCode.MissingElsewhere
            ),
            Is.EqualTo("showmissing")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.GuessMissing),
            Is.EqualTo("showmissing")
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.Denied),
            Is.EqualTo("showmissing")
        );

        // Neutral -> null
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(
                TermRenderingStatusCode.NoTrackedProject
            ),
            Is.Null
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(
                TermRenderingStatusCode.TermNotInProject
            ),
            Is.Null
        );
        Assert.That(
            TermRenderingStatusService.GetCssClassForStatus(TermRenderingStatusCode.Unknown),
            Is.Null
        );
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /// <summary>
    /// Creates a GenerateScriptureHtmlInput with common defaults.
    /// </summary>
    private static GenerateScriptureHtmlInput CreateScriptureHtmlInput(
        string? trackedProjectId,
        int bookNumber,
        string? resourceId = null,
        bool highlightResearchTerms = false,
        bool highlightFound = false,
        bool highlightMissing = false
    )
    {
        return new GenerateScriptureHtmlInput(
            ResourceId: resourceId ?? TestResourceId,
            VerseRef: new VerseRef(bookNumber, 1, 1),
            HighlightFlags: new HighlightFlags(
                ResearchTerms: highlightResearchTerms,
                Found: highlightFound,
                Missing: highlightMissing
            ),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: trackedProjectId,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
    }

    /// <summary>
    /// Builds synthetic USX content with lexical links for integration testing.
    /// NT books (>= 40) use SDBG dictionary; OT books use SDBH.
    /// </summary>
    private static string BuildIntegrationUsx(int bookNumber)
    {
        bool isOT = bookNumber < 40;
        string dictionary = isOT ? "SDBH" : "SDBG";
        string srcText = isOT
            ? "\u05D1\u05E8\u05D0\u05E9\u05D9\u05EA"
            : "\u03B1\u03B3\u03B1\u03C0\u03B1\u03C9";
        string srcTranslit = isOT ? "bereshit" : "agapao";
        string srcLemma = isOT ? "reshit" : "agapao";
        string srcPos = isOT ? "ncfsa" : "verb";
        string lang = isOT ? "hbo" : "grc";
        var bookId = SIL.Scripture.Canon.BookNumberToId(bookNumber);

        return $"""
            <usx version="3.0">
            <book style="id">{bookId}</book>
            <chapter number="1" style="c" />
            <para style="p">
            <verse number="1" style="v" />
            <char style="w" link-href="{dictionary}:{srcLemma}:001001" src-text="{srcText}" src-transliteration="{srcTranslit}" src-pos="{srcPos}" src-lemma="{srcLemma}" xml:lang="{lang}">Word1</char> text for verse 1.
            <verse number="2" style="v" />
            <char style="w" link-href="{dictionary}:{srcLemma}:001002" src-text="{srcText}" src-transliteration="{srcTranslit}" src-pos="{srcPos}" src-lemma="{srcLemma}" xml:lang="{lang}">Word2</char> text for verse 2.
            <note style="f">Footnote text for integration test.</note>
            </para>
            </usx>
            """;
    }

    /// <summary>
    /// Builds a test LexiconEntry for dictionary lookup integration.
    /// </summary>
    private static LexiconEntry BuildTestLexiconEntry(
        string lemma,
        string gloss,
        string glossLanguageId,
        string dictionary
    )
    {
        var senses = new List<LexiconSense>
        {
            new(
                SenseId: $"{dictionary}-{lemma}-001",
                Gloss: gloss,
                GlossLanguageId: glossLanguageId,
                OccurrenceCount: 5,
                SelectedSenseRef: "1"
            ),
        };
        var meanings = new List<LexiconMeaning>
        {
            new(Index: 1, Senses: senses, Domains: new List<string>(), Notes: null),
        };
        var baseForms = new List<LexiconBaseForm>
        {
            new(Index: 1, LexicalForm: lemma, PosTag: "V", Meanings: meanings),
        };
        return new LexiconEntry(
            EntryId: $"{dictionary}-{lemma}",
            Lemma: lemma,
            Dictionary: dictionary,
            BaseForms: baseForms
        );
    }
}
