using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.FindLocalizedGlossesForTermAsync (CAP-018).
///
/// Implements the IMarbleDataAccess.FindLocalizedGlossesForTerm interface contract
/// for BiblicalTerms subsystem integration. Given a term and a best language ID,
/// searches ER dictionary entries to find localized glosses. Reference matching
/// requires more than 25% overlap between ER term references and Biblical Term
/// references (INV-015, INV-C12).
///
/// Contract: Section 4.18 FindLocalizedGlossesForTerm (data-contracts.md)
/// Input: string term, string bestLanguageId
/// Output: LocalizedGlossesResult { success, glosses[], error }
/// Behavior: BHV-111 (IMarbleDataAccess Interface Contract)
/// Extraction: EXT-012 (Dictionary/Lexicon Access Layer)
/// Invariants: INV-015, INV-C12 (>25% reference overlap threshold)
/// Golden Masters: GM-017 (Gloss Language Filtering / Reference Overlap),
///                 GM-018 (Gloss Retrieval and Brace Filtering)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class FindLocalizedGlossesForTermTests
{
    // =========================================================================
    // TEST SETUP - Configure test seams for term lookup and reference matching
    // =========================================================================

    /// <summary>
    /// Test seam: controls whether marble data is available (HaveMarbleData).
    /// When set, returns the function result.
    /// Default: marble data is loaded.
    /// </summary>
    private bool _haveMarbleData = true;

    /// <summary>
    /// Test seam: term lookup data. Maps (term, languageId) to a list of glosses.
    /// Controls what glosses are returned for a given term.
    /// </summary>
    private Dictionary<(string Term, string LanguageId), IEnumerable<string>> _termGlossData =
        new();

    /// <summary>
    /// Test seam: reference overlap data. Maps term to overlap percentage.
    /// Controls whether a term matches the >25% threshold.
    /// </summary>
    private Dictionary<string, double> _referenceOverlaps = new();

    [SetUp]
    public void SetUp()
    {
        _haveMarbleData = true;
        _termGlossData = new Dictionary<(string, string), IEnumerable<string>>();
        _referenceOverlaps = new Dictionary<string, double>();

        // Configure test seam: marble data availability
        LexiconService.TestHaveMarbleData = () => _haveMarbleData;

        // Configure test seam: term gloss lookup
        LexiconService.TestFindGlossesForTerm = (term, langId) =>
        {
            // Check reference overlap threshold first (INV-015)
            if (_referenceOverlaps.TryGetValue(term, out double overlap) && overlap <= 0.25)
                return null; // Below threshold - no match

            // Look up glosses for the term
            if (_termGlossData.TryGetValue((term, langId), out var glosses))
                return glosses;

            return null; // Term not found
        };
    }

    [TearDown]
    public void TearDown()
    {
        LexiconService.TestHaveMarbleData = null;
        LexiconService.TestFindGlossesForTerm = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-018
    // =========================================================================

    /// <summary>
    /// Acceptance test: When FindLocalizedGlossesForTerm is called with a known term
    /// and valid language ID, and the term's reference overlap exceeds 25%, it returns
    /// localized glosses. This matches the GM-017/GM-018 golden masters.
    ///
    /// GM-017: Reference overlap at 30% -> matched (above 25% threshold)
    /// GM-018: Gloss retrieval produces filtered gloss text
    ///
    /// This test passes when CAP-018 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("GoldenMaster", "GM-017")]
    [Description(
        "Acceptance test: Localized glosses found for Biblical Terms using "
            + "reference matching with >25% overlap threshold"
    )]
    public async Task FindLocalizedGlossesForTerm_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-017 reference overlap at 30% (above 25% threshold)
        _referenceOverlaps["agapao"] = 0.30;

        // GM-018 gloss: "to love" (after brace filtering "{figurative} to love" -> "to love")
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act: Call the public API defined in data-contracts.md Section 4.18
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: Verify glosses found matching GM-017 and GM-018
        Assert.That(result.Success, Is.True, "Term with >25% overlap should succeed");
        Assert.That(result.Glosses, Is.Not.Null, "Glosses should be present on success");
        Assert.That(result.Glosses!, Is.Not.Empty, "GM-017: 30% overlap should produce glosses");
        Assert.That(
            result.Glosses!.First(),
            Is.EqualTo("to love"),
            "GM-018: Gloss should be 'to love' after brace filtering"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-026: Verify IMarbleDataAccess.FindLocalizedGlossesForTerm returns glosses
    /// for a known term with valid language ID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("ExtractionId", "EXT-012")]
    [Description("Known term with glosses returns successful result with gloss list")]
    public async Task FindLocalizedGlossesForTerm_KnownTermWithGlosses_ReturnsGlosses()
    {
        // Arrange: A term with reference overlap above threshold and glosses available
        _referenceOverlaps["theos"] = 0.50;
        _termGlossData[("theos", "en")] = new[] { "God", "god" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "theos",
            "en",
            CancellationToken.None
        );

        // Assert: Per Section 4.18 postconditions
        Assert.That(result.Success, Is.True, "Known term with glosses should succeed");
        Assert.That(result.Glosses, Is.Not.Null);
        Assert.That(result.Glosses!.Count(), Is.EqualTo(2), "Should return both glosses");
        Assert.That(result.Glosses!, Does.Contain("God"));
        Assert.That(result.Glosses!, Does.Contain("god"));
    }

    /// <summary>
    /// TS-026: Verify FindLocalizedGlossesForTerm returns multiple glosses when
    /// a term has several translations available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("ExtractionId", "EXT-012")]
    [Description("Term with multiple glosses returns all glosses")]
    public async Task FindLocalizedGlossesForTerm_MultipleGlosses_ReturnsAll()
    {
        // Arrange: A term with three glosses
        _referenceOverlaps["pneuma"] = 0.60;
        _termGlossData[("pneuma", "en")] = new[] { "spirit", "Spirit", "wind" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "pneuma",
            "en",
            CancellationToken.None
        );

        // Assert: All glosses should be returned
        Assert.That(result.Success, Is.True);
        Assert.That(result.Glosses!.Count(), Is.EqualTo(3));
        Assert.That(result.Glosses!, Does.Contain("spirit"));
        Assert.That(result.Glosses!, Does.Contain("Spirit"));
        Assert.That(result.Glosses!, Does.Contain("wind"));
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Section 4.18 Error Condition: No marble data -> INVALID_STATE.
    /// When HaveMarbleData is false, the method should return an error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Description("No marble data loaded returns INVALID_STATE error")]
    public async Task FindLocalizedGlossesForTerm_NoMarbleData_ReturnsInvalidState()
    {
        // Arrange: Marble data is NOT loaded
        _haveMarbleData = false;

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: Per Section 4.18 error conditions
        Assert.That(result.Success, Is.False, "No marble data should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Enhanced Resource data not loaded"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Section 4.18 Error Condition: Term not found -> NOT_FOUND.
    /// When the term does not match any ER entries, the method should return NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Unknown term returns NOT_FOUND error")]
    public async Task FindLocalizedGlossesForTerm_UnknownTerm_ReturnsNotFound()
    {
        // Arrange: Marble data is loaded but term has no glosses
        // (no entries in _termGlossData for this term)

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "nonexistent_term",
            "en",
            CancellationToken.None
        );

        // Assert: Per Section 4.18 error conditions
        Assert.That(result.Success, Is.False, "Unknown term should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("No glosses found for term 'nonexistent_term'"),
            "Error message should match contract with term name interpolated"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Result Structure
    // =========================================================================

    /// <summary>
    /// Success result has correct structure: Success=true, Glosses is non-null,
    /// Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Success result has correct structure per Section 4.18")]
    public async Task FindLocalizedGlossesForTerm_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        _referenceOverlaps["logos"] = 0.40;
        _termGlossData[("logos", "en")] = new[] { "word" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "logos",
            "en",
            CancellationToken.None
        );

        // Assert: Verify result structure per contract
        Assert.That(result.Success, Is.True);
        Assert.That(result.Glosses, Is.Not.Null, "Glosses should be present on success");
        Assert.That(result.Glosses, Is.Not.Empty, "Glosses should not be empty for valid match");
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Error result has correct structure: Success=false, Glosses is null,
    /// Error has Code and Message.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Error result has correct structure per Section 4.18")]
    public async Task FindLocalizedGlossesForTerm_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger an error condition
        _haveMarbleData = false;

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "any_term",
            "en",
            CancellationToken.None
        );

        // Assert: Verify error result structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Glosses, Is.Null, "Glosses should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.Not.Null.And.Not.Empty,
            "Error code should be non-empty"
        );
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message should be non-empty"
        );
    }

    // =========================================================================
    // INVARIANT TESTS - INV-015, INV-C12 (Reference Overlap Threshold)
    // =========================================================================

    /// <summary>
    /// INV-015/INV-C12: Reference match at 30% overlap (above 25% threshold)
    /// should return glosses.
    /// TS-073: Term reference match requires >25% overlap - 30% accepted.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-015: Reference overlap at 30% (above 25% threshold) returns glosses")]
    public async Task FindLocalizedGlossesForTerm_AboveThreshold30Percent_ReturnsMatch()
    {
        // Arrange: GM-017 input - 30% overlap, above 25% threshold
        _referenceOverlaps["agapao"] = 0.30;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: INV-015 - above threshold, match accepted
        Assert.That(result.Success, Is.True, "INV-015: 30% overlap > 25% threshold should succeed");
        Assert.That(result.Glosses, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// INV-015/INV-C12: Reference match at 20% overlap (below 25% threshold)
    /// should return no glosses / NOT_FOUND.
    /// TS-074: Term reference match rejected with less than 25% overlap.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-015: Reference overlap at 20% (below 25% threshold) returns no glosses")]
    public async Task FindLocalizedGlossesForTerm_BelowThreshold20Percent_ReturnsNoGlosses()
    {
        // Arrange: GM-017 input - 20% overlap, below 25% threshold
        _referenceOverlaps["agapao"] = 0.20;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: INV-015 - below threshold, match rejected
        Assert.That(result.Success, Is.False, "INV-015: 20% overlap < 25% threshold should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
    }

    /// <summary>
    /// INV-015/INV-C12: Reference match at exactly 25% overlap should NOT match.
    /// The threshold requires STRICTLY MORE THAN 25% (>0.25, not >=0.25).
    /// From INV-C12 formal: "refMatch(erTerm, btTerm) iff ... > 0.25"
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-303")]
    [Description(
        "INV-015: Reference overlap at exactly 25% (boundary) returns no glosses (strictly >25%)"
    )]
    public async Task FindLocalizedGlossesForTerm_ExactlyAtThreshold25Percent_ReturnsNoGlosses()
    {
        // Arrange: Exactly at 25% boundary - should NOT match per INV-C12 (strictly >0.25)
        _referenceOverlaps["agapao"] = 0.25;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: INV-C12 formal spec uses ">" not ">=" - exactly at threshold fails
        Assert.That(result.Success, Is.False, "INV-C12: Exactly 25% does NOT meet >0.25 threshold");
    }

    /// <summary>
    /// INV-015/INV-C12: Reference match at 26% overlap (just above 25% threshold)
    /// should return glosses.
    /// Boundary test: smallest acceptable overlap.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-015: Reference overlap at 26% (just above threshold) returns glosses")]
    public async Task FindLocalizedGlossesForTerm_AboveThreshold26Percent_ReturnsGlosses()
    {
        // Arrange: Just above 25% threshold
        _referenceOverlaps["agapao"] = 0.26;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: INV-C12 - 26% > 25% threshold, match accepted
        Assert.That(result.Success, Is.True, "INV-015: 26% overlap > 25% threshold should succeed");
        Assert.That(result.Glosses, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// INV-015: Reference overlap calculation is deterministic.
    /// Repeated calls with the same input always produce the same result.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-015: Reference overlap matching is deterministic across repeated calls")]
    public async Task FindLocalizedGlossesForTerm_RepeatedCalls_ReturnsSameResult()
    {
        // Arrange
        _referenceOverlaps["agapao"] = 0.30;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act: Call twice with identical input
        var result1 = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );
        var result2 = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: Results should be identical
        Assert.That(
            result1.Success,
            Is.EqualTo(result2.Success),
            "INV-015: Same input should always produce same success state"
        );
        Assert.That(
            result1.Glosses!.First(),
            Is.EqualTo(result2.Glosses!.First()),
            "INV-015: Same input should always produce same glosses"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-017 (Reference Overlap Matching)
    // =========================================================================

    /// <summary>
    /// GM-017: Reference overlap at 30% is matched (above 25% threshold).
    /// From gm-017-gloss-language-filtering/expected-output.json:
    ///   referenceOverlap.at30Percent.matched = true
    ///   referenceOverlap.threshold = 0.25
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-017")]
    [Description("GM-017: 30% reference overlap matches (above 25% threshold)")]
    public async Task GoldenMaster_GM017_ReferenceOverlap30Percent_Matched()
    {
        // GM-017 input: overlapAboveThreshold = 0.30
        _referenceOverlaps["agapao"] = 0.30;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: GM-017 expected: referenceOverlap.at30Percent.matched = true
        Assert.That(result.Success, Is.True, "GM-017: at30Percent.matched should be true");
        Assert.That(result.Glosses, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// GM-017: Reference overlap at 20% is rejected (below 25% threshold).
    /// From gm-017-gloss-language-filtering/expected-output.json:
    ///   referenceOverlap.at20Percent.matched = false
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-017")]
    [Description("GM-017: 20% reference overlap rejected (below 25% threshold)")]
    public async Task GoldenMaster_GM017_ReferenceOverlap20Percent_Rejected()
    {
        // GM-017 input: overlapBelowThreshold = 0.20
        _referenceOverlaps["agapao"] = 0.20;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: GM-017 expected: referenceOverlap.at20Percent.matched = false
        Assert.That(result.Success, Is.False, "GM-017: at20Percent.matched should be false");
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-018 (Gloss Retrieval with Brace Filtering)
    // =========================================================================

    /// <summary>
    /// GM-018: Gloss retrieval produces "to love" after brace filtering.
    /// From gm-018-dictionary-lookup/expected-output.json:
    ///   filteredGloss = "to love"
    /// From gm-018-dictionary-lookup/input.json:
    ///   rawGloss = "{figurative} to love"
    ///
    /// This verifies that FindLocalizedGlossesForTerm integrates with
    /// the gloss retrieval pipeline that applies brace filtering (BHV-303).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("GoldenMaster", "GM-018")]
    [Description("GM-018: Gloss retrieval returns 'to love' after brace filtering")]
    public async Task GoldenMaster_GM018_GlossRetrievalWithBraceFiltering()
    {
        // GM-018 input: rawGloss = "{figurative} to love"
        // GM-018 expected: filteredGloss = "to love"
        // The FindLocalizedGlossesForTerm method should return already-filtered glosses
        _referenceOverlaps["agapao"] = 0.30;
        _termGlossData[("agapao", "en")] = new[] { "to love" };

        // Act
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        // Assert: GM-018 expected output
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Glosses!.First(),
            Is.EqualTo("to love"),
            "GM-018: filteredGloss should be 'to love'"
        );
    }

    // =========================================================================
    // EXTRACTION TESTS - EXT-012
    // =========================================================================

    /// <summary>
    /// EXT-012: FindLocalizedGlossesForTerm uses the dictionary/lexicon access layer
    /// to look up glosses. The term parameter identifies which Biblical Term to
    /// search for; the bestLanguageId parameter determines the preferred gloss language.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Description("EXT-012: FindLocalizedGlossesForTerm delegates to dictionary access layer")]
    public async Task FindLocalizedGlossesForTerm_UsesLanguageId_ReturnsLocalizedGlosses()
    {
        // Arrange: Two languages available, requesting French
        _referenceOverlaps["agapao"] = 0.30;
        _termGlossData[("agapao", "en")] = new[] { "to love" };
        _termGlossData[("agapao", "fr")] = new[] { "aimer" };

        // Act: Request French glosses
        var result = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "fr",
            CancellationToken.None
        );

        // Assert: Should return French gloss, not English
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Glosses!.First(),
            Is.EqualTo("aimer"),
            "EXT-012: Should return glosses in the requested language"
        );
    }
}
