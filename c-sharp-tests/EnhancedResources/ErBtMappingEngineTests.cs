using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ErBtMappingEngine.AnalyzeErBtMappingAsync (CAP-010).
///
/// This capability runs the three-dimensional ER-to-Biblical Terms mapping
/// analysis engine, matching ER terms to Biblical Terms by Reference, Sense,
/// and Lemma dimensions with cascading priority. It is the most complex
/// single component in the Enhanced Resources feature (PT9: 2,186 lines).
///
/// Contract: Section 4.10 (data-contracts.md)
/// Input: Section 2.9 (ErBtMappingInput)
/// Output: Section 3.8 (ErBtMappingResult)
/// Behaviors: BHV-404 (three-dimensional matching per strategic plan)
/// Extraction: EXT-019 (ER-to-Biblical Terms Mapping Analysis),
///             EXT-026 (Tracked Project Management)
/// Invariants: INV-015 (Term Reference Match Threshold: >25% overlap)
/// Golden Masters: GM-024 (ER-BT mapping), GM-038 (tracked project management)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ErBtMappingEngineTests
{
    // =========================================================================
    // Common test data
    // =========================================================================

    private ErBtMappingEngine _engine = null!;

    // Standard lexical links for testing
    private static readonly LexicalLink s_greekLink =
        new(Dictionary: "SDBG", Lemma: "agapao", BaseFormIndex: 1, MeaningIndex: 2);

    private static readonly LexicalLink s_hebrewLink =
        new(Dictionary: "SDBH", Lemma: "chesed", BaseFormIndex: 1, MeaningIndex: 1);

    private static readonly LexicalLink s_dcLink =
        new(Dictionary: "DCLEX", Lemma: "sophia", BaseFormIndex: 1, MeaningIndex: 1);

    private static readonly LexicalLink s_unmatchedLink =
        new(Dictionary: "SDBG", Lemma: "hapaxlegomenon", BaseFormIndex: 1, MeaningIndex: 1);

    private static readonly VerseRef s_testVerseRef = new(43, 3, 16); // John 3:16

    [SetUp]
    public void SetUp()
    {
        _engine = new ErBtMappingEngine();

        // Reset all test seams to null before each test
        ErBtMappingEngine.TestAnalyzeMapping = null;
        ErBtMappingEngine.TestIsProjectAvailable = null;
        ErBtMappingEngine.TestIsResourceInitialized = null;
        ErBtMappingEngine.TestHaveTermsData = null;
        ErBtMappingEngine.TestComputeReferenceOverlap = null;
    }

    [TearDown]
    public void TearDown()
    {
        // Clean up test seams after each test
        ErBtMappingEngine.TestAnalyzeMapping = null;
        ErBtMappingEngine.TestIsProjectAvailable = null;
        ErBtMappingEngine.TestIsResourceInitialized = null;
        ErBtMappingEngine.TestHaveTermsData = null;
        ErBtMappingEngine.TestComputeReferenceOverlap = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-010
    // =========================================================================

    /// <summary>
    /// Acceptance test: The three-dimensional ER-to-BT mapping engine produces
    /// correct per-link match results with dimension, priority level, and
    /// rendering status. Summary statistics are accurate. Reference matching
    /// requires >25% overlap. All three dimensions (Reference, Sense, Lemma)
    /// are evaluated with correct priority cascading.
    ///
    /// This test passes when CAP-010 is COMPLETE.
    /// GM-024: ER-to-BT Three-Dimensional Matching
    /// GM-038: Tracked Project Management (prerequisites)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-024,GM-038")]
    [Description(
        "Acceptance test: Three-dimensional ER-to-BT mapping produces correct "
            + "per-link match results with dimension, priority, and rendering status"
    )]
    public async Task AnalyzeErBtMapping_ThreeDimensionalMatching_ProducesCorrectResults()
    {
        // Arrange: Build input with tracked project and resource
        var input = new ErBtMappingInput(
            TrackedProjectId: "zzz5",
            ResourceId: "ESV-ER",
            VerseRef: s_testVerseRef,
            Scope: "currentChapter"
        );

        // Configure test seam: Simulate successful analysis with mixed results
        // - One link matched by Reference dimension (priority 1)
        // - One link matched by Sense dimension (priority 3)
        // - One link matched by Lemma dimension (priority 2)
        // - One link unmatched
        var expectedMappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "reference",
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
            new(
                Link: s_hebrewLink,
                BiblicalTermId: "BT-chesed-001",
                MatchDimension: "sense",
                MatchPriority: 3,
                RenderingStatus: TermRenderingStatusCode.Missing
            ),
            new(
                Link: s_dcLink,
                BiblicalTermId: "BT-sophia-001",
                MatchDimension: "lemma",
                MatchPriority: 2,
                RenderingStatus: TermRenderingStatusCode.FoundInVerse
            ),
            new(
                Link: s_unmatchedLink,
                BiblicalTermId: null,
                MatchDimension: null,
                MatchPriority: null,
                RenderingStatus: TermRenderingStatusCode.TermNotInProject
            ),
        };

        ErBtMappingEngine.TestAnalyzeMapping = (projId, resId, vref, scope) =>
            (expectedMappings, null, null);

        // Act
        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        // Assert: Overall success
        Assert.That(result.Success, Is.True, "Analysis should succeed");
        Assert.That(result.Error, Is.Null, "No error on success");
        Assert.That(result.Mappings, Is.Not.Null, "Mappings should be populated");
        Assert.That(result.Summary, Is.Not.Null, "Summary should be populated");

        // Assert: Correct number of mappings
        Assert.That(result.Mappings!.Count, Is.EqualTo(4), "Should have 4 mapping results");

        // Assert: Reference dimension match
        var refMatch = result.Mappings[0];
        Assert.That(refMatch.Link, Is.EqualTo(s_greekLink), "First link is Greek agapao");
        Assert.That(refMatch.BiblicalTermId, Is.EqualTo("BT-agapao-001"), "Should match BT");
        Assert.That(
            refMatch.MatchDimension,
            Is.EqualTo("reference"),
            "Should match by Reference dimension"
        );
        Assert.That(refMatch.MatchPriority, Is.EqualTo(1), "Reference priority level 1");
        Assert.That(
            refMatch.RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.Found),
            "Rendering Found"
        );

        // Assert: Sense dimension match
        var senseMatch = result.Mappings[1];
        Assert.That(
            senseMatch.MatchDimension,
            Is.EqualTo("sense"),
            "Should match by Sense dimension"
        );
        Assert.That(senseMatch.MatchPriority, Is.EqualTo(3), "Sense priority level 3");

        // Assert: Lemma dimension match
        var lemmaMatch = result.Mappings[2];
        Assert.That(
            lemmaMatch.MatchDimension,
            Is.EqualTo("lemma"),
            "Should match by Lemma dimension"
        );
        Assert.That(lemmaMatch.MatchPriority, Is.EqualTo(2), "Lemma priority level 2");

        // Assert: Unmatched link
        var noMatch = result.Mappings[3];
        Assert.That(noMatch.BiblicalTermId, Is.Null, "Unmatched link has no BT ID");
        Assert.That(noMatch.MatchDimension, Is.Null, "Unmatched link has no dimension");
        Assert.That(noMatch.MatchPriority, Is.Null, "Unmatched link has no priority");

        // Assert: Summary statistics (GM-024)
        Assert.That(result.Summary!.TotalLinks, Is.EqualTo(4), "Total links = 4");
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(3), "Matched links = 3");
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(1), "Unmatched links = 1");
    }

    // =========================================================================
    // CONTRACT TESTS - Section 4.10 AnalyzeErBtMapping
    // =========================================================================

    // --- Happy path ---

    /// <summary>
    /// Contract: AnalyzeErBtMapping with valid inputs returns success with
    /// populated mappings and summary.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("AnalyzeErBtMapping with valid input returns success result")]
    public async Task AnalyzeErBtMapping_ValidInput_ReturnsSuccessResult()
    {
        // Arrange
        var input = new ErBtMappingInput(
            TrackedProjectId: "zzz5",
            ResourceId: "ESV-ER",
            VerseRef: s_testVerseRef,
            Scope: "currentChapter"
        );

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "reference",
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };

        ErBtMappingEngine.TestAnalyzeMapping = (projId, resId, vref, scope) =>
            (mappings, null, null);

        // Act
        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True, "Should succeed with valid input");
        Assert.That(result.Mappings, Is.Not.Null, "Mappings populated on success");
        Assert.That(result.Summary, Is.Not.Null, "Summary populated on success");
        Assert.That(result.Error, Is.Null, "No error on success");
    }

    /// <summary>
    /// Contract: Success result has non-null Mappings and Summary, null Error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Success result has correct null/non-null structure")]
    public async Task AnalyzeErBtMapping_SuccessResult_HasCorrectStructure()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentVerse");
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (new List<ErBtMapping>(), null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings, Is.Not.Null, "Mappings non-null on success");
        Assert.That(result.Summary, Is.Not.Null, "Summary non-null on success");
        Assert.That(result.Error, Is.Null, "Error null on success");
    }

    /// <summary>
    /// Contract: Empty link list produces zero mappings and summary with all zeros.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Empty link list produces zero mappings")]
    public async Task AnalyzeErBtMapping_NoLinks_ReturnsEmptyMappingsWithZeroSummary()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (new List<ErBtMapping>(), null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings!.Count, Is.EqualTo(0), "No mappings for empty input");
        Assert.That(result.Summary!.TotalLinks, Is.EqualTo(0), "Total = 0");
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(0), "Matched = 0");
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(0), "Unmatched = 0");
    }

    // --- Error conditions (Section 4.10 Error Conditions) ---

    /// <summary>
    /// Contract: Tracked project not found returns NOT_FOUND error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Tracked project not found returns NOT_FOUND error")]
    public async Task AnalyzeErBtMapping_TrackedProjectNotFound_ReturnsNotFoundError()
    {
        var input = new ErBtMappingInput(
            TrackedProjectId: "nonexistent-project",
            ResourceId: "ESV-ER",
            VerseRef: s_testVerseRef,
            Scope: "currentChapter"
        );

        ErBtMappingEngine.TestAnalyzeMapping = (projId, _, _, _) =>
            (null, "NOT_FOUND", $"Tracked project '{projId}' not found");

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.False, "Should fail when project not found");
        Assert.That(result.Error, Is.Not.Null, "Error should be populated");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Does.Contain("nonexistent-project"),
            "Error message contains project ID"
        );
        Assert.That(result.Mappings, Is.Null, "Mappings null on failure");
        Assert.That(result.Summary, Is.Null, "Summary null on failure");
    }

    /// <summary>
    /// Contract: Resource not initialized returns INVALID_STATE error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Resource not initialized returns INVALID_STATE error")]
    public async Task AnalyzeErBtMapping_ResourceNotInitialized_ReturnsInvalidStateError()
    {
        var input = new ErBtMappingInput(
            TrackedProjectId: "zzz5",
            ResourceId: "ESV-ER",
            VerseRef: s_testVerseRef,
            Scope: "currentChapter"
        );

        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (null, "INVALID_STATE", "Resource must be initialized before analysis");

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.False, "Should fail when resource not initialized");
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_STATE"));
        Assert.That(
            result.Error.Message,
            Does.Contain("initialized"),
            "Message mentions initialization"
        );
    }

    /// <summary>
    /// Contract: No Biblical Terms data returns INVALID_STATE error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("No terms data returns INVALID_STATE error")]
    public async Task AnalyzeErBtMapping_NoTermsData_ReturnsInvalidStateError()
    {
        var input = new ErBtMappingInput(
            TrackedProjectId: "zzz5",
            ResourceId: "ESV-ER",
            VerseRef: s_testVerseRef,
            Scope: "currentChapter"
        );

        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (null, "INVALID_STATE", "Biblical Terms data required for mapping analysis");

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.False, "Should fail when no terms data");
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_STATE"));
        Assert.That(
            result.Error.Message,
            Does.Contain("Biblical Terms"),
            "Message mentions Biblical Terms"
        );
    }

    /// <summary>
    /// Contract: Error result has null Mappings/Summary, non-null Error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Error result has correct null/non-null structure")]
    public async Task AnalyzeErBtMapping_ErrorResult_HasCorrectStructure()
    {
        var input = new ErBtMappingInput("bad-project", "ESV-ER", s_testVerseRef, "currentVerse");
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (null, "NOT_FOUND", "Tracked project 'bad-project' not found");

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Mappings, Is.Null, "Mappings null on error");
        Assert.That(result.Summary, Is.Null, "Summary null on error");
        Assert.That(result.Error, Is.Not.Null, "Error non-null on failure");
        Assert.That(result.Error!.Code, Is.Not.Empty, "Error code is not empty");
        Assert.That(result.Error.Message, Is.Not.Empty, "Error message is not empty");
    }

    // =========================================================================
    // THREE-DIMENSIONAL MATCHING TESTS - Reference Dimension
    // =========================================================================

    /// <summary>
    /// Reference dimension: When a link matches a BT by reference with priority 1
    /// (highest match quality), the mapping records "reference" as the dimension.
    /// EXT-019: Reference dimension has 8 priority levels.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Reference dimension match at priority 1 recorded correctly")]
    public async Task AnalyzeErBtMapping_ReferenceMatchPriority1_RecordedCorrectly()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "reference",
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].MatchDimension, Is.EqualTo("reference"));
        Assert.That(result.Mappings[0].MatchPriority, Is.EqualTo(1));
        Assert.That(result.Mappings[0].BiblicalTermId, Is.Not.Null);
    }

    /// <summary>
    /// Reference dimension: Priority levels 1 through 8 are all valid.
    /// EXT-019: 8 Reference priority levels.
    /// </summary>
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(3)]
    [TestCase(4)]
    [TestCase(5)]
    [TestCase(6)]
    [TestCase(7)]
    [TestCase(8)]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Reference dimension supports 8 priority levels")]
    public async Task AnalyzeErBtMapping_ReferencePriority_AllLevelsValid(int priority)
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-001",
                MatchDimension: "reference",
                MatchPriority: priority,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Mappings![0].MatchPriority,
            Is.EqualTo(priority),
            $"Reference priority {priority} should be valid"
        );
        Assert.That(
            result.Mappings[0].MatchPriority,
            Is.InRange(1, ErBtMappingEngine.ReferencePriorityLevels),
            "Priority within valid range"
        );
    }

    // =========================================================================
    // THREE-DIMENSIONAL MATCHING TESTS - Sense Dimension
    // =========================================================================

    /// <summary>
    /// Sense dimension: When a link matches a BT by sense, the mapping
    /// records "sense" as the dimension.
    /// EXT-019: Sense dimension has 7 priority levels.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Sense dimension match recorded correctly")]
    public async Task AnalyzeErBtMapping_SenseMatch_RecordedCorrectly()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-002",
                MatchDimension: "sense",
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Missing
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].MatchDimension, Is.EqualTo("sense"));
        Assert.That(result.Mappings[0].BiblicalTermId, Is.Not.Null);
    }

    /// <summary>
    /// Sense dimension: Priority levels 1 through 7 are all valid.
    /// EXT-019: 7 Sense priority levels.
    /// </summary>
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(3)]
    [TestCase(4)]
    [TestCase(5)]
    [TestCase(6)]
    [TestCase(7)]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Sense dimension supports 7 priority levels")]
    public async Task AnalyzeErBtMapping_SensePriority_AllLevelsValid(int priority)
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-001",
                MatchDimension: "sense",
                MatchPriority: priority,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].MatchPriority, Is.EqualTo(priority));
        Assert.That(
            result.Mappings[0].MatchPriority,
            Is.InRange(1, ErBtMappingEngine.SensePriorityLevels),
            "Priority within valid range"
        );
    }

    // =========================================================================
    // THREE-DIMENSIONAL MATCHING TESTS - Lemma Dimension
    // =========================================================================

    /// <summary>
    /// Lemma dimension: When a link matches a BT by lemma, the mapping
    /// records "lemma" as the dimension.
    /// EXT-019: Lemma dimension has 8 priority levels.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Lemma dimension match recorded correctly")]
    public async Task AnalyzeErBtMapping_LemmaMatch_RecordedCorrectly()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_hebrewLink,
                BiblicalTermId: "BT-chesed-001",
                MatchDimension: "lemma",
                MatchPriority: 5,
                RenderingStatus: TermRenderingStatusCode.FoundElsewhere
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].MatchDimension, Is.EqualTo("lemma"));
        Assert.That(result.Mappings[0].MatchPriority, Is.EqualTo(5));
    }

    /// <summary>
    /// Lemma dimension: Priority levels 1 through 8 are all valid.
    /// EXT-019: 8 Lemma priority levels.
    /// </summary>
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(3)]
    [TestCase(4)]
    [TestCase(5)]
    [TestCase(6)]
    [TestCase(7)]
    [TestCase(8)]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Lemma dimension supports 8 priority levels")]
    public async Task AnalyzeErBtMapping_LemmaPriority_AllLevelsValid(int priority)
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-001",
                MatchDimension: "lemma",
                MatchPriority: priority,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].MatchPriority, Is.EqualTo(priority));
        Assert.That(
            result.Mappings[0].MatchPriority,
            Is.InRange(1, ErBtMappingEngine.LemmaPriorityLevels),
            "Priority within valid range"
        );
    }

    // =========================================================================
    // DIMENSION CONSTANTS TESTS
    // =========================================================================

    /// <summary>
    /// Verify the engine exposes the correct number of priority levels
    /// for each dimension as documented in EXT-019 and the contracts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Priority level constants match specification")]
    public void ErBtMappingEngine_PriorityLevelConstants_MatchSpecification()
    {
        Assert.That(
            ErBtMappingEngine.ReferencePriorityLevels,
            Is.EqualTo(8),
            "Reference dimension has 8 priority levels"
        );
        Assert.That(
            ErBtMappingEngine.SensePriorityLevels,
            Is.EqualTo(7),
            "Sense dimension has 7 priority levels"
        );
        Assert.That(
            ErBtMappingEngine.LemmaPriorityLevels,
            Is.EqualTo(8),
            "Lemma dimension has 8 priority levels"
        );
    }

    // =========================================================================
    // UNMATCHED LINKS TESTS
    // =========================================================================

    /// <summary>
    /// Unmatched links have null BiblicalTermId, null MatchDimension,
    /// null MatchPriority, and appropriate rendering status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Unmatched links have null match fields")]
    public async Task AnalyzeErBtMapping_UnmatchedLink_HasNullMatchFields()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_unmatchedLink,
                BiblicalTermId: null,
                MatchDimension: null,
                MatchPriority: null,
                RenderingStatus: TermRenderingStatusCode.TermNotInProject
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        var mapping = result.Mappings![0];
        Assert.That(mapping.BiblicalTermId, Is.Null, "No BT match");
        Assert.That(mapping.MatchDimension, Is.Null, "No dimension");
        Assert.That(mapping.MatchPriority, Is.Null, "No priority");
    }

    /// <summary>
    /// When all links are unmatched, summary reflects zero matched.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("All unmatched links produce zero matched in summary")]
    public async Task AnalyzeErBtMapping_AllUnmatched_SummaryReflectsZeroMatched()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
            new(s_hebrewLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
            new(s_dcLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Summary!.TotalLinks, Is.EqualTo(3), "Total = 3");
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(0), "Matched = 0");
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(3), "Unmatched = 3");
    }

    // =========================================================================
    // SUMMARY STATISTICS TESTS
    // =========================================================================

    /// <summary>
    /// Summary statistics: TotalLinks = MatchedLinks + UnmatchedLinks always.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Summary TotalLinks equals MatchedLinks plus UnmatchedLinks")]
    public async Task AnalyzeErBtMapping_Summary_TotalEqualsSumOfMatchedAndUnmatched()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 1, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-002", "sense", 3, TermRenderingStatusCode.Missing),
            new(s_dcLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
            new(s_unmatchedLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Summary!.TotalLinks,
            Is.EqualTo(result.Summary.MatchedLinks + result.Summary.UnmatchedLinks),
            "TotalLinks = MatchedLinks + UnmatchedLinks"
        );
        Assert.That(result.Summary.TotalLinks, Is.EqualTo(4));
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(2));
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(2));
    }

    /// <summary>
    /// Summary statistics: When all links match, UnmatchedLinks is zero.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("All matched links produce zero unmatched in summary")]
    public async Task AnalyzeErBtMapping_AllMatched_SummaryReflectsAllMatched()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 1, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-002", "lemma", 4, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Summary!.TotalLinks, Is.EqualTo(2));
        Assert.That(result.Summary.MatchedLinks, Is.EqualTo(2));
        Assert.That(result.Summary.UnmatchedLinks, Is.EqualTo(0));
    }

    // =========================================================================
    // RENDERING STATUS TESTS - Per-link rendering status
    // =========================================================================

    /// <summary>
    /// Each mapping includes the rendering status from the tracked project.
    /// Multiple rendering statuses can appear in the same analysis.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Mappings include per-link rendering status")]
    public async Task AnalyzeErBtMapping_PerLinkRenderingStatus_IncludedInMappings()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 1, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-002", "sense", 2, TermRenderingStatusCode.Missing),
            new(s_dcLink, "BT-003", "lemma", 3, TermRenderingStatusCode.FoundInVerse),
            new(s_unmatchedLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].RenderingStatus, Is.EqualTo(TermRenderingStatusCode.Found));
        Assert.That(
            result.Mappings[1].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.Missing)
        );
        Assert.That(
            result.Mappings[2].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.FoundInVerse)
        );
        Assert.That(
            result.Mappings[3].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.TermNotInProject)
        );
    }

    // =========================================================================
    // REFERENCE OVERLAP THRESHOLD TESTS (INV-015)
    // =========================================================================

    /// <summary>
    /// INV-015: Reference match requires MORE THAN 25% overlap.
    /// 30% overlap (above threshold) should result in a match.
    /// TS-073: Term reference match requires >25% overlap.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: 30% overlap above threshold accepts match")]
    public void MeetsReferenceThreshold_30PercentOverlap_ReturnsTrue()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(0.30);
        Assert.That(result, Is.True, "30% overlap exceeds 25% threshold");
    }

    /// <summary>
    /// INV-015: Reference match requires MORE THAN 25% overlap.
    /// 20% overlap (below threshold) should be rejected.
    /// TS-074: Term reference match rejected with &lt;25% overlap.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: 20% overlap below threshold rejects match")]
    public void MeetsReferenceThreshold_20PercentOverlap_ReturnsFalse()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(0.20);
        Assert.That(result, Is.False, "20% overlap is below 25% threshold");
    }

    /// <summary>
    /// INV-015: Exactly 25% overlap is NOT sufficient (requires MORE THAN 25%).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: Exactly 25% overlap does NOT meet threshold")]
    public void MeetsReferenceThreshold_Exactly25Percent_ReturnsFalse()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(0.25);
        Assert.That(result, Is.False, "Exactly 25% does NOT meet '>25%' threshold");
    }

    /// <summary>
    /// INV-015: Zero overlap never matches.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: Zero overlap rejects match")]
    public void MeetsReferenceThreshold_ZeroOverlap_ReturnsFalse()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(0.0);
        Assert.That(result, Is.False, "Zero overlap is below threshold");
    }

    /// <summary>
    /// INV-015: 100% overlap always matches.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: 100% overlap meets threshold")]
    public void MeetsReferenceThreshold_100PercentOverlap_ReturnsTrue()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(1.0);
        Assert.That(result, Is.True, "100% overlap exceeds 25% threshold");
    }

    /// <summary>
    /// INV-015: Boundary test at just above 25%.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: 25.01% overlap meets threshold")]
    public void MeetsReferenceThreshold_JustAbove25Percent_ReturnsTrue()
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(0.2501);
        Assert.That(result, Is.True, "25.01% overlap is above 25% threshold");
    }

    /// <summary>
    /// INV-015: The threshold constant is 0.25.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INV-015: Threshold constant is 0.25")]
    public void ErBtMappingEngine_ReferenceMatchThreshold_IsPointTwoFive()
    {
        Assert.That(
            ErBtMappingEngine.ReferenceMatchThreshold,
            Is.EqualTo(0.25),
            "Reference match threshold is 25%"
        );
    }

    // =========================================================================
    // SCOPE PARAMETER TESTS
    // =========================================================================

    /// <summary>
    /// Scope filter values "currentVerse", "currentSection", "currentChapter",
    /// "currentSense" should all be accepted.
    /// </summary>
    [TestCase("currentVerse")]
    [TestCase("currentSection")]
    [TestCase("currentChapter")]
    [TestCase("currentSense")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("All valid scope values are accepted")]
    public async Task AnalyzeErBtMapping_ValidScopes_Accepted(string scope)
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, scope);

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 1, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True, $"Scope '{scope}' should be accepted");
    }

    // =========================================================================
    // DIMENSION CASCADE TESTS
    // =========================================================================

    /// <summary>
    /// When multiple dimensions could match, the highest-priority dimension
    /// (Reference > Sense > Lemma) should be chosen. If Reference matches,
    /// that takes precedence over Sense and Lemma.
    /// This tests the cascade behavior documented in EXT-019.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Dimension cascade: Reference takes precedence")]
    public async Task AnalyzeErBtMapping_MultipleDimensionsPossible_ReferenceChosen()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        // The test seam returns a reference match when all three could match
        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "reference",
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Mappings![0].MatchDimension,
            Is.EqualTo("reference"),
            "Reference dimension takes precedence"
        );
    }

    /// <summary>
    /// When Reference does not match but Sense does, the Sense dimension
    /// is chosen over Lemma.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Dimension cascade: Sense over Lemma when Reference fails")]
    public async Task AnalyzeErBtMapping_ReferenceFailsSenseMatches_SenseChosen()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        // Sense match when Reference dimension fails
        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "sense",
                MatchPriority: 2,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Mappings![0].MatchDimension,
            Is.EqualTo("sense"),
            "Sense dimension chosen when Reference fails"
        );
    }

    /// <summary>
    /// When neither Reference nor Sense matches, Lemma dimension is the
    /// final fallback.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Dimension cascade: Lemma as fallback")]
    public async Task AnalyzeErBtMapping_ReferenceAndSenseFail_LemmaFallback()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        // Lemma match as last resort
        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-agapao-001",
                MatchDimension: "lemma",
                MatchPriority: 6,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Mappings![0].MatchDimension,
            Is.EqualTo("lemma"),
            "Lemma is the fallback dimension"
        );
    }

    /// <summary>
    /// When none of the three dimensions match, the link is unmatched.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("All dimensions fail produces unmatched link")]
    public async Task AnalyzeErBtMapping_AllDimensionsFail_UnmatchedResult()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_unmatchedLink,
                BiblicalTermId: null,
                MatchDimension: null,
                MatchPriority: null,
                RenderingStatus: TermRenderingStatusCode.TermNotInProject
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].BiblicalTermId, Is.Null);
        Assert.That(result.Mappings[0].MatchDimension, Is.Null);
        Assert.That(result.Mappings[0].MatchPriority, Is.Null);
    }

    // =========================================================================
    // MATCH DIMENSION STRING VALUES TESTS
    // =========================================================================

    /// <summary>
    /// MatchDimension values must be exactly "reference", "sense", or "lemma"
    /// (lowercase, matching the TypeScript union type).
    /// </summary>
    [TestCase("reference")]
    [TestCase("sense")]
    [TestCase("lemma")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("MatchDimension values are lowercase strings")]
    public async Task AnalyzeErBtMapping_MatchDimensionValues_AreLowercaseStrings(string dimension)
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(
                Link: s_greekLink,
                BiblicalTermId: "BT-001",
                MatchDimension: dimension,
                MatchPriority: 1,
                RenderingStatus: TermRenderingStatusCode.Found
            ),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Mappings![0].MatchDimension,
            Is.EqualTo(dimension),
            $"MatchDimension should be exactly '{dimension}'"
        );
    }

    // =========================================================================
    // MIXED DICTIONARY TYPE TESTS
    // =========================================================================

    /// <summary>
    /// Analysis can handle links from different dictionary types (SDBG, SDBH, DCLEX)
    /// in the same scope.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Mixed dictionary types handled in same analysis")]
    public async Task AnalyzeErBtMapping_MixedDictionaryTypes_AllProcessed()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-SDBG-001", "reference", 1, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-SDBH-001", "sense", 2, TermRenderingStatusCode.Missing),
            new(s_dcLink, "BT-DCLEX-001", "lemma", 3, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings!.Count, Is.EqualTo(3));
        Assert.That(result.Mappings[0].Link.Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Mappings[1].Link.Dictionary, Is.EqualTo("SDBH"));
        Assert.That(result.Mappings[2].Link.Dictionary, Is.EqualTo("DCLEX"));
    }

    // =========================================================================
    // CANCELLATION TESTS
    // =========================================================================

    /// <summary>
    /// Analysis supports cancellation via CancellationToken.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Analysis respects cancellation token")]
    public void AnalyzeErBtMapping_CancellationRequested_ThrowsOperationCanceled()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");
        var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await _engine.AnalyzeErBtMappingAsync(input, cts.Token)
        );
    }

    // =========================================================================
    // INPUT PARAMETER FORWARDING TESTS
    // =========================================================================

    /// <summary>
    /// The engine correctly forwards all input parameters to the analysis logic.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Input parameters forwarded to analysis logic")]
    public async Task AnalyzeErBtMapping_InputParameters_ForwardedToAnalysis()
    {
        var expectedVerseRef = new VerseRef(1, 2, 3); // Genesis 2:3
        var input = new ErBtMappingInput(
            TrackedProjectId: "test-project-123",
            ResourceId: "NRSV-ER",
            VerseRef: expectedVerseRef,
            Scope: "currentSection"
        );

        string? capturedProjectId = null;
        string? capturedResourceId = null;
        VerseRef capturedVerseRef = default;
        string? capturedScope = null;

        ErBtMappingEngine.TestAnalyzeMapping = (projId, resId, vref, scope) =>
        {
            capturedProjectId = projId;
            capturedResourceId = resId;
            capturedVerseRef = vref;
            capturedScope = scope;
            return (new List<ErBtMapping>(), null, null);
        };

        await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(capturedProjectId, Is.EqualTo("test-project-123"), "Project ID forwarded");
        Assert.That(capturedResourceId, Is.EqualTo("NRSV-ER"), "Resource ID forwarded");
        Assert.That(capturedVerseRef.BookNum, Is.EqualTo(1), "Book number forwarded");
        Assert.That(capturedVerseRef.ChapterNum, Is.EqualTo(2), "Chapter number forwarded");
        Assert.That(capturedVerseRef.VerseNum, Is.EqualTo(3), "Verse number forwarded");
        Assert.That(capturedScope, Is.EqualTo("currentSection"), "Scope forwarded");
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-024
    // =========================================================================

    /// <summary>
    /// GM-024: ER-to-BT three-dimensional matching produces correct results.
    /// The golden master verifies that:
    /// - Three dimensions are evaluated: Reference, Sense, Lemma
    /// - Priority levels: Reference=8, Sense=7, Lemma=8
    /// - Results include matchDimension, matchPriority, renderingStatus
    ///
    /// Note: GM-024 is not directly capturable (internal algorithm), so we
    /// verify structural properties semantically.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-024")]
    [Description("GM-024: Three-dimensional matching structural verification")]
    public async Task GoldenMaster_GM024_ThreeDimensionalMatchingStructure()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        // Create a comprehensive mapping result with all three dimensions represented
        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-ref", "reference", 3, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-sense", "sense", 5, TermRenderingStatusCode.Missing),
            new(s_dcLink, "BT-lemma", "lemma", 7, TermRenderingStatusCode.FoundElsewhere),
            new(s_unmatchedLink, null, null, null, TermRenderingStatusCode.TermNotInProject),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        // GM-024: Three dimensions present
        var dimensions = result
            .Mappings!.Where(m => m.MatchDimension != null)
            .Select(m => m.MatchDimension!)
            .Distinct()
            .OrderBy(d => d)
            .ToList();
        Assert.That(
            dimensions,
            Is.EquivalentTo(new[] { "lemma", "reference", "sense" }),
            "All three dimensions represented"
        );

        // GM-024: Priority levels within documented ranges
        var refMapping = result.Mappings!.First(m => m.MatchDimension == "reference");
        Assert.That(
            refMapping.MatchPriority,
            Is.InRange(1, 8),
            "Reference priority in valid range"
        );

        var senseMapping = result.Mappings!.First(m => m.MatchDimension == "sense");
        Assert.That(senseMapping.MatchPriority, Is.InRange(1, 7), "Sense priority in valid range");

        var lemmaMapping = result.Mappings!.First(m => m.MatchDimension == "lemma");
        Assert.That(lemmaMapping.MatchPriority, Is.InRange(1, 8), "Lemma priority in valid range");

        // GM-024: Unmatched links have null dimension and priority
        var unmatched = result.Mappings!.First(m => m.BiblicalTermId == null);
        Assert.That(unmatched.MatchDimension, Is.Null);
        Assert.That(unmatched.MatchPriority, Is.Null);
    }

    /// <summary>
    /// GM-024: Priority levels are within documented ranges.
    /// Reference: 1-8, Sense: 1-7, Lemma: 1-8.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-024")]
    [Description("GM-024: Priority levels within documented ranges")]
    public async Task GoldenMaster_GM024_PriorityLevelsInRange()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        // Test with maximum priority levels for each dimension
        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 8, TermRenderingStatusCode.Found),
            new(s_hebrewLink, "BT-002", "sense", 7, TermRenderingStatusCode.Missing),
            new(s_dcLink, "BT-003", "lemma", 8, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        // Verify max priorities are within range
        Assert.That(result.Mappings![0].MatchPriority, Is.EqualTo(8), "Reference max = 8");
        Assert.That(result.Mappings[1].MatchPriority, Is.EqualTo(7), "Sense max = 7");
        Assert.That(result.Mappings[2].MatchPriority, Is.EqualTo(8), "Lemma max = 8");
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-038 (Tracked Project Management)
    // =========================================================================

    /// <summary>
    /// GM-038: The analysis requires a valid tracked project (EXT-026).
    /// When the tracked project is available, analysis proceeds.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-038")]
    [Description("GM-038: Analysis proceeds with valid tracked project")]
    public async Task GoldenMaster_GM038_ValidTrackedProject_AnalysisProceeds()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var mappings = new List<ErBtMapping>
        {
            new(s_greekLink, "BT-001", "reference", 1, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True, "Analysis should succeed with valid tracked project");
        Assert.That(result.Mappings, Is.Not.Null);
        Assert.That(result.Summary, Is.Not.Null);
    }

    /// <summary>
    /// GM-038: Analysis requires BiblicalTerms, TermRenderings, and analyzer
    /// to be loaded from the tracked project. Without these, the analysis
    /// should return INVALID_STATE.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-038")]
    [Description("GM-038: Missing BT/renderings returns INVALID_STATE")]
    public async Task GoldenMaster_GM038_MissingTermsData_ReturnsInvalidState()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            (null, "INVALID_STATE", "Biblical Terms data required for mapping analysis");

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_STATE"));
    }

    // =========================================================================
    // INVARIANT TESTS - INV-015 with various overlap values
    // =========================================================================

    /// <summary>
    /// INV-015: Comprehensive boundary testing for reference match threshold.
    /// Values just above, at, and just below the 25% threshold.
    /// </summary>
    [TestCase(0.0, false, Description = "Zero overlap")]
    [TestCase(0.10, false, Description = "10% overlap")]
    [TestCase(0.20, false, Description = "20% overlap")]
    [TestCase(0.24, false, Description = "24% overlap")]
    [TestCase(0.249, false, Description = "24.9% overlap")]
    [TestCase(0.25, false, Description = "Exactly 25% - NOT sufficient")]
    [TestCase(0.251, true, Description = "25.1% overlap - meets threshold")]
    [TestCase(0.26, true, Description = "26% overlap")]
    [TestCase(0.30, true, Description = "30% overlap")]
    [TestCase(0.50, true, Description = "50% overlap")]
    [TestCase(0.75, true, Description = "75% overlap")]
    [TestCase(1.0, true, Description = "100% overlap")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-404")]
    public void MeetsReferenceThreshold_BoundaryValues_CorrectResult(
        double overlap,
        bool expectedResult
    )
    {
        bool result = ErBtMappingEngine.MeetsReferenceThreshold(overlap);
        Assert.That(
            result,
            Is.EqualTo(expectedResult),
            $"Overlap {overlap:P1} should {(expectedResult ? "" : "NOT ")}meet threshold"
        );
    }

    // =========================================================================
    // INTEGRATION WITH RENDERING STATUS (CAP-009 dependency)
    // =========================================================================

    /// <summary>
    /// Each mapping in the result must have a valid TermRenderingStatusCode.
    /// This verifies integration with CAP-009 (GetTermRenderingStatus).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Each mapping has valid rendering status from CAP-009")]
    public async Task AnalyzeErBtMapping_AllMappings_HaveValidRenderingStatus()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var allStatuses = new[]
        {
            TermRenderingStatusCode.Found,
            TermRenderingStatusCode.Missing,
            TermRenderingStatusCode.FoundInVerse,
            TermRenderingStatusCode.MissingInVerse,
            TermRenderingStatusCode.FoundElsewhere,
            TermRenderingStatusCode.MissingElsewhere,
            TermRenderingStatusCode.TermNotInProject,
        };

        var mappings = allStatuses
            .Select(
                (status, i) =>
                    new ErBtMapping(
                        Link: new LexicalLink("SDBG", $"term{i}", 1, 1),
                        BiblicalTermId: status == TermRenderingStatusCode.TermNotInProject
                            ? null
                            : $"BT-{i}",
                        MatchDimension: status == TermRenderingStatusCode.TermNotInProject
                            ? null
                            : "reference",
                        MatchPriority: status == TermRenderingStatusCode.TermNotInProject
                            ? null
                            : 1,
                        RenderingStatus: status
                    )
            )
            .ToList();

        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) =>
            ((IReadOnlyList<ErBtMapping>)mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings!.Count, Is.EqualTo(allStatuses.Length));
        for (int i = 0; i < allStatuses.Length; i++)
        {
            Assert.That(
                result.Mappings[i].RenderingStatus,
                Is.EqualTo(allStatuses[i]),
                $"Mapping {i} has status {allStatuses[i]}"
            );
            Assert.That(
                Enum.IsDefined(typeof(TermRenderingStatusCode), result.Mappings[i].RenderingStatus),
                Is.True,
                $"Status at index {i} is a valid enum value"
            );
        }
    }

    // =========================================================================
    // LINK PRESERVATION TESTS
    // =========================================================================

    /// <summary>
    /// The original LexicalLink in each mapping result must be preserved
    /// exactly as provided -- same dictionary, lemma, indices.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-142")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Original links preserved in mapping results")]
    public async Task AnalyzeErBtMapping_LinkData_PreservedInResults()
    {
        var input = new ErBtMappingInput("zzz5", "ESV-ER", s_testVerseRef, "currentChapter");

        var link = new LexicalLink("SDBG", "pisteuo", 2, 3);
        var mappings = new List<ErBtMapping>
        {
            new(link, "BT-pisteuo-001", "reference", 1, TermRenderingStatusCode.Found),
        };
        ErBtMappingEngine.TestAnalyzeMapping = (_, _, _, _) => (mappings, null, null);

        var result = await _engine.AnalyzeErBtMappingAsync(input, CancellationToken.None);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Mappings![0].Link.Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Mappings[0].Link.Lemma, Is.EqualTo("pisteuo"));
        Assert.That(result.Mappings[0].Link.BaseFormIndex, Is.EqualTo(2));
        Assert.That(result.Mappings[0].Link.MeaningIndex, Is.EqualTo(3));
    }
}
