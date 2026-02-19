using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-015: FilterGlossBraces.
/// Validates stripping of curly brace metadata from gloss text before display.
/// MARBLE dictionary glosses contain metadata in {braces} that is not intended
/// for user display. The filter removes all {content} using lazy regex matching,
/// preserving surrounding text and whitespace (no collapsing of double spaces).
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs:2747-2777
/// Golden Master: gm-012-gloss-brace-filtering
/// Extraction: EXT-007
/// </summary>
[TestFixture]
public class GlossServiceTests
{
    #region Acceptance Test

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

    #region Contract Tests - Happy Path

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

    #region Golden Master Tests

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

    #region Edge Case Tests

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
}
