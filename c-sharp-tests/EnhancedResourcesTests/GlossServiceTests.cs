using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-015: FilterGlossBraces and CAP-016: FindLocalizedGlosses.
///
/// CAP-015 validates stripping of curly brace metadata from gloss text before display.
/// MARBLE dictionary glosses contain metadata in {braces} that is not intended
/// for user display. The filter removes all {content} using lazy regex matching,
/// preserving surrounding text and whitespace (no collapsing of double spaces).
///
/// CAP-016 validates localized gloss lookup for Biblical Terms from Marble dictionaries.
/// The service wraps MarbleDataAccess.FindLocalizedGlossesForTerm and returns a
/// GlossResult record containing the glosses list and language code.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs:2747-2792 (GetGloss, RemoveBraces)
/// PT9 Source: Paratext/Marble/MarbleDataAccess.cs:387-430 (FindLocalizedGlossesForTerm)
/// Golden Master: gm-012-gloss-brace-filtering (CAP-015 only)
/// Extraction: EXT-007 (CAP-015), EXT-014 (CAP-016 via MarbleDataAccess)
/// </summary>
[TestFixture]
public class GlossServiceTests
{
    #region CAP-015 Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-015.
    /// Verifies all gm-012 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - GBF-01: Single brace pair in middle of text -> stripped, double space preserved
    /// - GBF-02: No braces -> text passes through unchanged
    /// - GBF-03: Entire string is brace content -> empty string result
    /// - GBF-04: Multiple brace pairs -> all stripped, double spaces preserved
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-155")]
    [Description(
        "Acceptance test: Content within curly braces stripped from gloss text"
    )]
    public void FilterGlossBraces_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // GBF-01: Single brace pair in middle of text
            var result01 = GlossService.FilterGlossBraces("word {metadata} speech");
            Assert.That(
                result01,
                Is.EqualTo("word  speech"),
                "GBF-01: 'word {metadata} speech' must become 'word  speech'"
            );

            // GBF-02: No braces, text passes through unchanged
            var result02 = GlossService.FilterGlossBraces("no braces here");
            Assert.That(
                result02,
                Is.EqualTo("no braces here"),
                "GBF-02: Text without braces must pass through unchanged"
            );

            // GBF-03: Entire string is brace content, result is empty
            var result03 = GlossService.FilterGlossBraces("{only metadata}");
            Assert.That(
                result03,
                Is.EqualTo(""),
                "GBF-03: '{only metadata}' must become empty string"
            );

            // GBF-04: Multiple brace pairs throughout text
            var result04 = GlossService.FilterGlossBraces(
                "before {m1} middle {m2} after"
            );
            Assert.That(
                result04,
                Is.EqualTo("before  middle  after"),
                "GBF-04: Multiple brace pairs must all be stripped"
            );
        });
    }

    #endregion

    #region CAP-015 Contract Tests - Happy Path

    /// <summary>
    /// Contract: FilterGlossBraces with text containing single brace pair
    /// removes the braces and content, preserving surrounding text.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Single brace pair removed, surrounding text preserved")]
    public void FilterGlossBraces_SingleBracePair_RemovesBracesAndContent()
    {
        var result = GlossService.FilterGlossBraces("word {metadata} speech");
        Assert.That(result, Is.EqualTo("word  speech"));
    }

    /// <summary>
    /// Contract: FilterGlossBraces with text containing no braces
    /// returns the text unchanged.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Text without braces passes through unchanged")]
    public void FilterGlossBraces_NoBraces_ReturnsUnchanged()
    {
        var result = GlossService.FilterGlossBraces("no braces here");
        Assert.That(result, Is.EqualTo("no braces here"));
    }

    /// <summary>
    /// Contract: FilterGlossBraces with multiple brace pairs removes all of them.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Multiple brace pairs all removed")]
    public void FilterGlossBraces_MultipleBracePairs_RemovesAll()
    {
        var result = GlossService.FilterGlossBraces(
            "before {m1} middle {m2} after"
        );
        Assert.That(result, Is.EqualTo("before  middle  after"));
    }

    /// <summary>
    /// Contract: FilterGlossBraces with entire string as brace content returns empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Entire string is brace content, returns empty")]
    public void FilterGlossBraces_EntireStringIsBraces_ReturnsEmpty()
    {
        var result = GlossService.FilterGlossBraces("{only metadata}");
        Assert.That(result, Is.EqualTo(""));
    }

    #endregion

    #region CAP-015 Golden Master Tests

    /// <summary>
    /// Golden master test: GBF-01 from gm-012.
    /// Input: "word {metadata} speech" -> Output: "word  speech" (1 brace stripped)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GBF-01: Single brace pair in middle of text")]
    public void GoldenMaster_GBF01_SingleBracePairInMiddle()
    {
        const string input = "word {metadata} speech";
        const string expected = "word  speech";

        var actual = GlossService.FilterGlossBraces(input);

        Assert.That(actual, Is.EqualTo(expected), "GBF-01 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: GBF-02 from gm-012.
    /// Input: "no braces here" -> Output: "no braces here" (0 braces stripped)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GBF-02: No braces in input")]
    public void GoldenMaster_GBF02_NoBracesPassthrough()
    {
        const string input = "no braces here";
        const string expected = "no braces here";

        var actual = GlossService.FilterGlossBraces(input);

        Assert.That(actual, Is.EqualTo(expected), "GBF-02 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: GBF-03 from gm-012.
    /// Input: "{only metadata}" -> Output: "" (1 brace stripped, nothing left)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GBF-03: Entire string is brace content")]
    public void GoldenMaster_GBF03_EntireStringIsBraceContent()
    {
        const string input = "{only metadata}";
        const string expected = "";

        var actual = GlossService.FilterGlossBraces(input);

        Assert.That(actual, Is.EqualTo(expected), "GBF-03 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: GBF-04 from gm-012.
    /// Input: "before {m1} middle {m2} after" -> Output: "before  middle  after" (2 braces stripped)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GBF-04: Multiple brace pairs")]
    public void GoldenMaster_GBF04_MultipleBracePairs()
    {
        const string input = "before {m1} middle {m2} after";
        const string expected = "before  middle  after";

        var actual = GlossService.FilterGlossBraces(input);

        Assert.That(actual, Is.EqualTo(expected), "GBF-04 golden master mismatch");
    }

    #endregion

    #region CAP-015 Edge Case Tests

    /// <summary>
    /// Edge case: Empty string input should return empty string.
    /// PT9 Regex.Replace on empty string returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty string input returns empty string")]
    public void FilterGlossBraces_EmptyString_ReturnsEmpty()
    {
        var result = GlossService.FilterGlossBraces("");
        Assert.That(result, Is.EqualTo(""));
    }

    /// <summary>
    /// Edge case: Adjacent brace pairs with no space between them.
    /// PT9 regex lazy match: each {pair} removed individually.
    /// "{a}{b}" -> "" (both pairs removed, nothing remains).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Adjacent brace pairs both removed")]
    public void FilterGlossBraces_AdjacentBracePairs_BothRemoved()
    {
        var result = GlossService.FilterGlossBraces("{first}{second}");
        Assert.That(result, Is.EqualTo(""));
    }

    /// <summary>
    /// Edge case: Nested braces. PT9 uses lazy regex \{.*?\} which matches
    /// the FIRST closing brace encountered. So "{outer{inner}rest}" would
    /// remove "{outer{inner}" leaving "rest}".
    ///
    /// This is a quirk of the lazy match behavior in PT9.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Nested braces: lazy regex matches first closing brace")]
    public void FilterGlossBraces_NestedBraces_LazyMatchBehavior()
    {
        // PT9 regex: \{.*?\} (lazy) -- matches "{outer{inner}" as one match
        // because .*? still allows matching { chars, just stops at first }.
        // Input: "{outer{inner}rest}"
        // Match 1: "{outer{inner}" -> removed
        // Remaining: "rest}"
        // No more opening { before the } so no more match.
        var result = GlossService.FilterGlossBraces("{outer{inner}rest}");
        Assert.That(result, Is.EqualTo("rest}"));
    }

    /// <summary>
    /// Edge case: Brace at the start of text with content after.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Brace at start of text")]
    public void FilterGlossBraces_BraceAtStart_RemovedCleanly()
    {
        var result = GlossService.FilterGlossBraces("{prefix} actual text");
        Assert.That(result, Is.EqualTo(" actual text"));
    }

    /// <summary>
    /// Edge case: Brace at the end of text with content before.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Brace at end of text")]
    public void FilterGlossBraces_BraceAtEnd_RemovedCleanly()
    {
        var result = GlossService.FilterGlossBraces("actual text {suffix}");
        Assert.That(result, Is.EqualTo("actual text "));
    }

    /// <summary>
    /// Edge case: Whitespace is NOT collapsed after brace removal.
    /// PT9 RemoveBraces does Regex.Replace only -- no trim or collapse.
    /// The golden master GBF-01 confirms: "word  speech" has double space.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Double spaces preserved after brace removal (no whitespace collapsing)")]
    public void FilterGlossBraces_DoesNotCollapseWhitespace()
    {
        // "a {x} b" -> "a  b" (double space where {x} was)
        var result = GlossService.FilterGlossBraces("a {x} b");
        Assert.That(
            result,
            Is.EqualTo("a  b"),
            "Double spaces must be preserved (no whitespace collapsing per PT9 behavior)"
        );
    }

    /// <summary>
    /// Edge case: Braces with empty content {}.
    /// PT9 regex \{.*?\} matches {} (zero-length content between braces).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty braces {} are removed")]
    public void FilterGlossBraces_EmptyBraces_Removed()
    {
        var result = GlossService.FilterGlossBraces("word {} here");
        Assert.That(result, Is.EqualTo("word  here"));
    }

    /// <summary>
    /// Edge case: Unclosed brace (no matching closing brace).
    /// PT9 regex \{.*?\} will NOT match an unclosed brace because the regex
    /// requires a closing }. Unclosed braces pass through unchanged.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Unclosed brace passes through unchanged")]
    public void FilterGlossBraces_UnclosedBrace_PassesThrough()
    {
        var result = GlossService.FilterGlossBraces("word {unclosed text");
        Assert.That(result, Is.EqualTo("word {unclosed text"));
    }

    /// <summary>
    /// Edge case: Orphan closing brace (no matching opening brace).
    /// PT9 regex \{.*?\} requires opening { first. Orphan } passes through.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Orphan closing brace passes through unchanged")]
    public void FilterGlossBraces_OrphanClosingBrace_PassesThrough()
    {
        var result = GlossService.FilterGlossBraces("word } orphan");
        Assert.That(result, Is.EqualTo("word } orphan"));
    }

    /// <summary>
    /// Edge case: Brace content with special characters (regex meta-characters).
    /// The brace content may contain dots, stars, etc. PT9 regex treats them
    /// as literal characters matched by .*? inside the braces.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Brace content with special characters handled correctly")]
    public void FilterGlossBraces_SpecialCharsInBraces_Removed()
    {
        var result = GlossService.FilterGlossBraces("text {a.b*c?d+e} more");
        Assert.That(result, Is.EqualTo("text  more"));
    }

    /// <summary>
    /// Edge case: Brace content with newlines.
    /// PT9 regex .*? does NOT match newlines by default (no RegexOptions.Singleline).
    /// So braces spanning newlines would NOT be matched. The brace would remain.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Braces spanning newlines not matched (dot does not match newline by default)")]
    public void FilterGlossBraces_BracesSpanningNewline_NotMatched()
    {
        // PT9 regex .*? does not match \n by default
        var result = GlossService.FilterGlossBraces("before {multi\nline} after");
        Assert.That(result, Is.EqualTo("before {multi\nline} after"));
    }

    /// <summary>
    /// Edge case: Multiple brace pairs separated by single character.
    /// Ensures each pair is independently matched and removed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-155")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Three brace pairs all independently removed")]
    public void FilterGlossBraces_ThreeBracePairs_AllRemoved()
    {
        var result = GlossService.FilterGlossBraces("{a} x {b} y {c}");
        Assert.That(result, Is.EqualTo(" x  y "));
    }

    #endregion

    #region CAP-016 Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-016: FindLocalizedGlosses.
    /// Verifies the complete happy path: set up MarbleDataAccess with gloss data,
    /// call FindLocalizedGlossesForTermAsync, and verify the returned GlossResult
    /// contains the correct glosses and language.
    ///
    /// When this test passes, CAP-016 is complete.
    ///
    /// Contract: data-contracts.md Method 16
    /// Behavior: BHV-109 (IMarbleDataAccess interface for gloss lookup)
    /// Scenario: TS-022 (IMarbleDataAccess has three required members)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description(
        "Acceptance test: Localized glosses returned for known term with correct language"
    )]
    public async Task FindLocalizedGlossesForTermAsync_KnownTerm_ReturnsGlossResult()
    {
        // Arrange: Set up MarbleDataAccess with gloss data
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible("TestBible", _ => new List<MarbleToken>().AsReadOnly());
        foreach (var project in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(project);
        dataAccess.AddGlossData("logos", "en", new List<string> { "word", "saying", "reason" });

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "logos",
            "en"
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Result must not be null for a known term");
        Assert.That(
            result!.Glosses,
            Is.EqualTo(new[] { "word", "saying", "reason" }),
            "Glosses must match the registered data"
        );
        Assert.That(
            result.Language,
            Is.EqualTo("en"),
            "Language must match the requested language"
        );
    }

    #endregion

    #region CAP-016 Contract Tests - Happy Path

    /// <summary>
    /// Contract: When a term has glosses registered in the data access layer,
    /// FindLocalizedGlossesForTermAsync returns a GlossResult with those glosses
    /// and the requested language.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Term with single gloss returns GlossResult with one entry")]
    public async Task FindLocalizedGlossesForTermAsync_SingleGloss_ReturnsGlossResult()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("agape", "en", new List<string> { "love" });

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "agape",
            "en"
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Glosses, Has.Count.EqualTo(1));
        Assert.That(result.Glosses[0], Is.EqualTo("love"));
        Assert.That(result.Language, Is.EqualTo("en"));
    }

    /// <summary>
    /// Contract: When a term has multiple glosses, all are returned in the GlossResult.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Term with multiple glosses returns all in GlossResult")]
    public async Task FindLocalizedGlossesForTermAsync_MultipleGlosses_ReturnsAll()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData(
            "pneuma",
            "en",
            new List<string> { "spirit", "wind", "breath" }
        );

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "pneuma",
            "en"
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Glosses, Has.Count.EqualTo(3));
        Assert.That(
            result.Glosses,
            Is.EqualTo(new[] { "spirit", "wind", "breath" })
        );
    }

    /// <summary>
    /// Contract: The language field in GlossResult matches the requested language parameter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("GlossResult language field matches the requested language")]
    public async Task FindLocalizedGlossesForTermAsync_LanguageField_MatchesRequest()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("theos", "fr", new List<string> { "dieu" });

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "theos",
            "fr"
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Language, Is.EqualTo("fr"));
    }

    /// <summary>
    /// Contract: Same term can return different glosses for different languages.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Same term returns language-specific glosses")]
    public async Task FindLocalizedGlossesForTermAsync_DifferentLanguages_ReturnsDifferentGlosses()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("theos", "en", new List<string> { "God", "god" });
        dataAccess.AddGlossData("theos", "fr", new List<string> { "Dieu", "dieu" });

        // Act
        var resultEn = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "theos",
            "en"
        );
        var resultFr = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "theos",
            "fr"
        );

        // Assert
        Assert.That(resultEn, Is.Not.Null);
        Assert.That(resultFr, Is.Not.Null);
        Assert.That(resultEn!.Glosses, Is.EqualTo(new[] { "God", "god" }));
        Assert.That(resultFr!.Glosses, Is.EqualTo(new[] { "Dieu", "dieu" }));
    }

    #endregion

    #region CAP-016 Contract Tests - Error Cases

    /// <summary>
    /// Contract: When HaveMarbleData is false, the method throws an
    /// InvalidOperationException with NO_DATA error.
    /// Per data-contracts.md Method 16 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("No Marble data available throws InvalidOperationException")]
    public void FindLocalizedGlossesForTermAsync_NoMarbleData_ThrowsInvalidOperation()
    {
        // Arrange: MarbleDataAccess with no data registered (HaveMarbleData == false)
        var dataAccess = new MarbleDataAccess();

        // Act & Assert
        var ex = Assert.ThrowsAsync<InvalidOperationException>(async () =>
            await GlossService.FindLocalizedGlossesForTermAsync(dataAccess, "logos", "en")
        );

        Assert.That(
            ex!.Message,
            Does.Contain("No Marble dictionary data"),
            "Error message must indicate missing Marble data"
        );
    }

    #endregion

    #region CAP-016 Edge Case Tests

    /// <summary>
    /// Edge case: Term not found in dictionary data returns null.
    /// Per data-contracts.md: "Returns null if term not found."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Unknown term returns null")]
    public async Task FindLocalizedGlossesForTermAsync_UnknownTerm_ReturnsNull()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        // No gloss data registered for "nonexistent"

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "nonexistent",
            "en"
        );

        // Assert
        Assert.That(result, Is.Null, "Unknown term must return null");
    }

    /// <summary>
    /// Edge case: Term exists in one language but not the requested language.
    /// Should return null because there are no glosses in the requested language.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Term exists in different language returns null")]
    public async Task FindLocalizedGlossesForTermAsync_WrongLanguage_ReturnsNull()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });

        // Act: Request French glosses but only English is available
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "logos",
            "fr"
        );

        // Assert
        Assert.That(
            result,
            Is.Null,
            "Term not available in requested language must return null"
        );
    }

    /// <summary>
    /// Edge case: Empty termId returns null.
    /// MarbleDataAccess.FindLocalizedGlossesForTerm will return empty for an empty key.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Empty termId returns null")]
    public async Task FindLocalizedGlossesForTermAsync_EmptyTermId_ReturnsNull()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "",
            "en"
        );

        // Assert
        Assert.That(result, Is.Null, "Empty termId must return null");
    }

    /// <summary>
    /// Edge case: Empty language returns null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Empty language returns null")]
    public async Task FindLocalizedGlossesForTermAsync_EmptyLanguage_ReturnsNull()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "logos",
            ""
        );

        // Assert
        Assert.That(result, Is.Null, "Empty language must return null");
    }

    /// <summary>
    /// Edge case: Term with empty gloss list. When MarbleDataAccess returns
    /// empty glosses, the service should return null (no meaningful result).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Term with empty gloss list returns null")]
    public async Task FindLocalizedGlossesForTermAsync_EmptyGlossList_ReturnsNull()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("emptyterm", "en", new List<string>());

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "emptyterm",
            "en"
        );

        // Assert: Empty glosses mean no meaningful result
        Assert.That(result, Is.Null, "Term with empty gloss list must return null");
    }

    /// <summary>
    /// Edge case: Glosses with brace metadata. The raw glosses from MarbleDataAccess
    /// may contain {metadata} markers. FindLocalizedGlossesForTermAsync should return
    /// the raw glosses; filtering is done separately by FilterGlossBraces (CAP-015).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Raw glosses returned without brace filtering (filtering is separate concern)")]
    public async Task FindLocalizedGlossesForTermAsync_GlossesWithBraces_ReturnsRawGlosses()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData(
            "logos",
            "en",
            new List<string> { "word {figurative}", "reason {abstract}" }
        );

        // Act
        var result = await GlossService.FindLocalizedGlossesForTermAsync(
            dataAccess,
            "logos",
            "en"
        );

        // Assert: Glosses returned as-is (brace filtering is CAP-015's concern)
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Glosses,
            Is.EqualTo(new[] { "word {figurative}", "reason {abstract}" }),
            "Raw glosses must be returned without brace filtering"
        );
    }

    /// <summary>
    /// Edge case: CancellationToken is respected. When the token is cancelled
    /// before execution, the method should throw OperationCanceledException
    /// or TaskCanceledException.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-022")]
    [Description("Cancelled token throws OperationCanceledException")]
    public void FindLocalizedGlossesForTermAsync_CancelledToken_ThrowsCancellation()
    {
        // Arrange
        var dataAccess = CreateInitializedDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        // Act & Assert
        Assert.ThrowsAsync<OperationCanceledException>(async () =>
            await GlossService.FindLocalizedGlossesForTermAsync(
                dataAccess,
                "logos",
                "en",
                cts.Token
            )
        );
    }

    #endregion

    #region CAP-016 Helper Methods

    /// <summary>
    /// Creates a MarbleDataAccess instance with HaveMarbleData == true.
    /// Registers a bible and all required research data projects.
    /// </summary>
    private static MarbleDataAccess CreateInitializedDataAccess()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible(
            "TestBible",
            _ => new List<MarbleToken>().AsReadOnly()
        );
        foreach (var project in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(project);
        return dataAccess;
    }

    #endregion
}
