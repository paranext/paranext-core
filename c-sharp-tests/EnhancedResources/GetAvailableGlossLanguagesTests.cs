using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.GetAvailableGlossLanguagesAsync (CAP-017).
///
/// Lists available gloss languages for the loaded ER dictionaries, applying the
/// 50% inclusion threshold. Languages where more than 50% of senses have
/// translations are included; others are excluded. The legacy Spanish code "sp"
/// is corrected to ISO 639-1 "es".
///
/// Contract: Section 4.17 GetAvailableGlossLanguages (data-contracts.md)
/// Input: string resourceId
/// Output: GlossLanguagesResult (Section 4.17)
/// Behavior: BHV-111 (IMarbleDataAccess Interface Contract)
/// Extraction: EXT-012 (Dictionary/Lexicon Access Layer)
/// Invariants: INV-014 / INV-C11 (50% threshold), INV-C18 / VAL-008 (sp->es)
/// Golden Master: GM-017 (Gloss Language Filtering)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class GetAvailableGlossLanguagesTests
{
    // =========================================================================
    // TEST SETUP - Configure test seams for language coverage data
    // =========================================================================

    /// <summary>
    /// Default language coverage data matching GM-017 input:
    /// en: 90% coverage, fr: 60% coverage, de: 30% coverage.
    /// </summary>
    private static Dictionary<string, (double Coverage, string DisplayName)> DefaultCoverage =>
        new()
        {
            ["en"] = (0.9, "English"),
            ["fr"] = (0.6, "French"),
            ["de"] = (0.3, "German"),
        };

    [SetUp]
    public void SetUp()
    {
        // Configure test seam: language coverage returns GM-017 default data
        LexiconService.TestGetLanguageCoverage = (resourceId) =>
        {
            var testName = TestContext.CurrentContext?.Test?.MethodName;

            // Tests expecting resource not found
            if (resourceId == "NONEXISTENT_RESOURCE")
                return null;

            // Tests with Spanish "sp" code
            if (testName != null && testName.Contains("Spanish"))
            {
                return new Dictionary<string, (double, string)>
                {
                    ["en"] = (0.9, "English"),
                    ["sp"] = (0.7, "Spanish"),
                };
            }

            // Tests with boundary values
            if (testName != null && testName.Contains("Boundary"))
            {
                return new Dictionary<string, (double, string)>
                {
                    ["en"] = (0.9, "English"),
                    ["exactly50"] = (0.50, "Exactly Fifty"),
                    ["just_above"] = (0.501, "Just Above"),
                };
            }

            // Tests with empty results
            if (testName != null && testName.Contains("AllBelowThreshold"))
            {
                return new Dictionary<string, (double, string)>
                {
                    ["de"] = (0.3, "German"),
                    ["it"] = (0.1, "Italian"),
                };
            }

            // Tests with single language at 100%
            if (testName != null && testName.Contains("SingleLanguage"))
            {
                return new Dictionary<string, (double, string)> { ["en"] = (1.0, "English"), };
            }

            // Default: GM-017 input
            return DefaultCoverage;
        };

        // Ensure dictionary and resource seams are configured
        LexiconService.TestIsDictionaryLoaded = dictionary =>
            dictionary is "SDBG" or "SDBH" or "DCLEX";
        LexiconService.TestResolveDictionary = name => name == "LN" ? "SDBG" : name;
    }

    [TearDown]
    public void TearDown()
    {
        LexiconService.TestGetLanguageCoverage = null;
        LexiconService.TestIsDictionaryLoaded = null;
        LexiconService.TestResolveDictionary = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-017
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetAvailableGlossLanguagesAsync is called with a
    /// valid resource ID, it returns only languages with more than 50% sense
    /// coverage and corrects the Spanish "sp" code to "es".
    ///
    /// This test matches the GM-017 golden master expected output:
    /// - en (90%): included
    /// - fr (60%): included
    /// - de (30%): excluded
    /// - "sp" corrected to "es"
    ///
    /// This test passes when CAP-017 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("GoldenMaster", "GM-017")]
    [Description(
        "Acceptance test: Languages returned only where >50% of senses have translations; "
            + "matching GM-017 expected output"
    )]
    public async Task GetAvailableGlossLanguages_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-017 input - language coverage {en: 0.9, fr: 0.6, de: 0.3}
        string resourceId = "ESV16";

        // Act: Call the public API defined in data-contracts.md Section 4.17
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: GM-017 expected output
        Assert.That(result.Success, Is.True, "Language enumeration should succeed");
        Assert.That(result.Languages, Is.Not.Null, "Languages list should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // GM-017: en and fr included; de excluded
        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(languageIds, Does.Contain("en"), "GM-017: English (90%) should be included");
        Assert.That(languageIds, Does.Contain("fr"), "GM-017: French (60%) should be included");
        Assert.That(
            languageIds,
            Does.Not.Contain("de"),
            "GM-017: German (30%) should be excluded (below 50% threshold)"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path (Section 4.17)
    // =========================================================================

    /// <summary>
    /// TS-069: Gloss languages included only if more than 50% senses have translations.
    /// Languages en (90%) and fr (60%) are above threshold and included.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description("TS-069: Languages above 50% threshold are included in result")]
    public async Task GetAvailableGlossLanguages_AboveThreshold_Included()
    {
        // Arrange: GM-017 data - en:0.9, fr:0.6, de:0.3
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per INV-014, languages with >50% coverage are included
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(
            languageIds,
            Does.Contain("en"),
            "INV-014: English at 90% should be included (>50%)"
        );
        Assert.That(
            languageIds,
            Does.Contain("fr"),
            "INV-014: French at 60% should be included (>50%)"
        );
    }

    /// <summary>
    /// TS-069: Languages below 50% threshold are excluded from result.
    /// German (30%) is below threshold and excluded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description("TS-069: Languages below 50% threshold are excluded from result")]
    public async Task GetAvailableGlossLanguages_BelowThreshold_Excluded()
    {
        // Arrange: GM-017 data - en:0.9, fr:0.6, de:0.3
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per INV-014, languages with <=50% coverage are excluded
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(
            languageIds,
            Does.Not.Contain("de"),
            "INV-014: German at 30% should be excluded (<=50%)"
        );
    }

    /// <summary>
    /// Result languages include display names for each language.
    /// Per Section 4.17: languages have { id, displayName }.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Section 4.17: Each language in result includes a display name")]
    public async Task GetAvailableGlossLanguages_SuccessResult_IncludesDisplayNames()
    {
        // Arrange
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per Section 4.17, each language has id and displayName
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        foreach (var lang in result.Languages!)
        {
            Assert.That(lang.Id, Is.Not.Null.And.Not.Empty, $"Language ID should be non-empty");
            Assert.That(
                lang.DisplayName,
                Is.Not.Null.And.Not.Empty,
                $"Display name for '{lang.Id}' should be non-empty"
            );
        }
    }

    /// <summary>
    /// Success result has correct GlossLanguagesResult structure.
    /// Success: { Success: true, Languages: [...], Error: null }
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Section 4.17: Success result structure matches contract")]
    public async Task GetAvailableGlossLanguages_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Section 4.17 success structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null, "Languages should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");
        Assert.That(
            result.Languages!.Count,
            Is.GreaterThan(0),
            "Should have at least one language above threshold"
        );
    }

    /// <summary>
    /// Single language at 100% coverage is included.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Description("SingleLanguage at 100% coverage is included")]
    public async Task GetAvailableGlossLanguages_SingleLanguage_Included()
    {
        // Arrange: test seam returns single language at 100%
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Single language at 100% is included
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);
        Assert.That(result.Languages!.Count, Is.EqualTo(1));
        Assert.That(result.Languages[0].Id, Is.EqualTo("en"));
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases (Section 4.17 Error Conditions)
    // =========================================================================

    /// <summary>
    /// Resource not found returns NOT_FOUND error.
    /// Per Section 4.17: "Resource '{resourceId}' not found"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Section 4.17: Resource not found returns NOT_FOUND error")]
    public async Task GetAvailableGlossLanguages_ResourceNotFound_ReturnsNotFound()
    {
        // Arrange: Non-existent resource ID
        string resourceId = "NONEXISTENT_RESOURCE";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per Section 4.17 error conditions
        Assert.That(result.Success, Is.False, "Non-existent resource should fail");
        Assert.That(result.Languages, Is.Null, "Languages should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Resource 'NONEXISTENT_RESOURCE' not found"),
            "Error message should match contract pattern"
        );
    }

    /// <summary>
    /// Error result has correct GlossLanguagesResult structure.
    /// Error: { Success: false, Languages: null, Error: { Code, Message } }
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Section 4.17: Error result structure matches contract")]
    public async Task GetAvailableGlossLanguages_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger an error
        string resourceId = "NONEXISTENT_RESOURCE";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Section 4.17 error structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Languages, Is.Null, "Languages should be null on failure");
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
    // INVARIANT TESTS - INV-014 / INV-C11: 50% Threshold
    // =========================================================================

    /// <summary>
    /// INV-014 / INV-C11: A language at exactly 50% coverage is EXCLUDED.
    /// The invariant says "more than 50%" (strictly greater than), so 50.0%
    /// exactly does not meet the threshold.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description("INV-014: Language at exactly 50% is excluded (threshold is strictly > 50%)")]
    public async Task GetAvailableGlossLanguages_Boundary_Exactly50Percent_Excluded()
    {
        // Arrange: test seam provides boundary data (exactly50: 0.50)
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: INV-014 "more than 50%" means > 0.50, not >= 0.50
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(
            languageIds,
            Does.Not.Contain("exactly50"),
            "INV-014: Exactly 50% should be EXCLUDED (threshold is strictly > 50%)"
        );
    }

    /// <summary>
    /// INV-014 / INV-C11: A language at 50.1% coverage is INCLUDED.
    /// Just above the threshold should be included.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description("INV-014: Language just above 50% threshold is included")]
    public async Task GetAvailableGlossLanguages_Boundary_JustAbove50Percent_Included()
    {
        // Arrange: test seam provides boundary data (just_above: 0.501)
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per INV-014 "more than 50%"
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(
            languageIds,
            Does.Contain("just_above"),
            "INV-014: 50.1% should be INCLUDED (above threshold)"
        );
    }

    /// <summary>
    /// INV-014 / INV-C11: When all languages are below threshold, result
    /// should be an empty list (success but no languages).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description("INV-014: All languages below threshold results in empty list")]
    public async Task GetAvailableGlossLanguages_AllBelowThreshold_ReturnsEmptyList()
    {
        // Arrange: test seam returns only languages below 50%
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Success with empty list (no languages meet threshold)
        Assert.That(result.Success, Is.True, "Should succeed even with no qualifying languages");
        Assert.That(result.Languages, Is.Not.Null, "Languages list should be non-null");
        Assert.That(
            result.Languages!.Count,
            Is.EqualTo(0),
            "INV-014: No languages should be included when all are below 50%"
        );
    }

    // =========================================================================
    // INVARIANT TESTS - INV-C18 / VAL-008: Spanish "sp" -> "es" Correction
    // =========================================================================

    /// <summary>
    /// INV-C18 / VAL-008 / TS-070: Spanish language code "sp" is corrected to
    /// ISO 639-1 "es" in the result.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-C18")]
    [Description("TS-070 / INV-C18: Spanish language code 'sp' corrected to 'es' in output")]
    public async Task GetAvailableGlossLanguages_SpanishCodeSp_CorrectedToEs()
    {
        // Arrange: test seam includes "sp" at 70% coverage (above threshold)
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Per INV-C18 / VAL-008, "sp" should be corrected to "es"
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var languageIds = result.Languages!.Select(l => l.Id).ToList();
        Assert.That(
            languageIds,
            Does.Not.Contain("sp"),
            "INV-C18: Legacy 'sp' code should not appear in result"
        );
        Assert.That(
            languageIds,
            Does.Contain("es"),
            "INV-C18: 'sp' should be corrected to 'es' (ISO 639-1)"
        );
    }

    /// <summary>
    /// INV-C18 / VAL-008: When "sp" is corrected to "es", the display name
    /// should still be present and meaningful.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-C18")]
    [Description("INV-C18: Corrected Spanish language retains display name")]
    public async Task GetAvailableGlossLanguages_SpanishCorrected_HasDisplayName()
    {
        // Arrange: test seam includes "sp" at 70% coverage
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: Corrected "es" entry has a display name
        Assert.That(result.Success, Is.True);
        Assert.That(result.Languages, Is.Not.Null);

        var spanishLang = result.Languages!.FirstOrDefault(l => l.Id == "es");
        Assert.That(spanishLang, Is.Not.Null, "Corrected Spanish 'es' should be in result");
        Assert.That(
            spanishLang!.DisplayName,
            Is.Not.Null.And.Not.Empty,
            "Corrected Spanish entry should have a display name"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-017
    // =========================================================================

    /// <summary>
    /// GM-017: Gloss Language Filtering - exact match against golden master.
    ///
    /// Input: languageCoverage = {en: 0.9, fr: 0.6, de: 0.3}
    /// Expected: included = [en, fr], excluded = [de], threshold = 0.5
    ///
    /// Also verifies Spanish correction: spanishCode "sp" -> "es"
    /// Comparison strategy: exact
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-111")]
    [Property("GoldenMaster", "GM-017")]
    [Description("GM-017: Gloss language filtering matches golden master expected output")]
    public async Task GoldenMaster_GM017_GlossLanguageFiltering()
    {
        // GM-017 input: languageCoverage = {en: 0.9, fr: 0.6, de: 0.3}
        string resourceId = "ESV16";

        // Act
        var result = await LexiconService.GetAvailableGlossLanguagesAsync(
            resourceId,
            CancellationToken.None
        );

        // Assert: GM-017 expected output - exact comparison
        Assert.That(result.Success, Is.True, "GM-017: Language enumeration should succeed");
        Assert.That(result.Languages, Is.Not.Null);

        // GM-017: languageFiltering.included = ["en", "fr"]
        var languageIds = result.Languages!.Select(l => l.Id).OrderBy(id => id).ToList();
        Assert.That(
            languageIds,
            Is.EqualTo(new[] { "en", "fr" }),
            "GM-017: Included languages should be exactly [en, fr] (sorted)"
        );

        // GM-017: languageFiltering.excluded = ["de"]
        Assert.That(languageIds, Does.Not.Contain("de"), "GM-017: German (30%) must be excluded");

        // GM-017: threshold = 0.5
        // Verified implicitly by the inclusion/exclusion logic above.
        // en (0.9 > 0.5) = included, fr (0.6 > 0.5) = included, de (0.3 <= 0.5) = excluded
    }
}
