using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MarbleDataParser.GetLinksInScopeAsync (CAP-003).
///
/// Filters a parsed token stream by scope (CurrentVerse, CurrentSection,
/// CurrentChapter, CurrentSense) and returns only matching lexical links.
/// Supports text filtering by surface form and lemma filtering.
///
/// Contract: Section 4.3 GetLinksInScope (data-contracts.md)
/// Input: Section 2.2 ScopeFilterInput
/// Output: GetLinksInScopeResult (links, tokenIndices, matchCount)
/// Behaviors: BHV-402 (Scope Filter Selection), BHV-608 (Marble Data Parsing)
/// Invariants: INV-017 (Section Boundaries from USFM Markers)
/// Golden Masters: GM-012 (scope filtering), GM-027 (scope filter UI behavior)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class MarbleDataParserScopeTests
{
    // =========================================================================
    // TEST DATA - USX XML for scope filtering scenarios
    // =========================================================================

    /// <summary>
    /// USX XML with multiple verses, section boundaries (\s1), and lexical links.
    /// Designed for scope filtering tests:
    /// - 2 sections: "Creation" (verses 1-2) and "Light" (verse 3)
    /// - 3 verses with links
    /// - Multiple links per verse for deduplication testing
    /// </summary>
    private const string UsxWithScopeBoundaries = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="s1">The Creation</para>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>In the beginning
            <char style="w" link-href="SDBH:reshit:001001">reshit</char>
            God
            <char style="w" link-href="SDBH:elohim:001001">elohim</char>
            created the heavens and the earth.
            <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>And the earth was
            <char style="w" link-href="SDBH:tohu:001001">without form</char>
            and void, and darkness was upon the face of the
            <char style="w" link-href="SDBH:mayim:001001">waters</char>.
            <verse eid="GEN 1:2"/>
          </para>
          <para style="s1">The Light</para>
          <para style="p">
            <verse number="3" style="v" sid="GEN 1:3"/>And God
            <char style="w" link-href="SDBH:elohim:001001">elohim</char>
            said, Let there be
            <char style="w" link-href="SDBH:or:001001">light</char>.
            <verse eid="GEN 1:3"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    /// <summary>
    /// USX XML with source words for text filter testing.
    /// Contains src-text attributes for surface form matching (TS-054).
    /// </summary>
    private const string UsxWithSourceWords = """
        <usx version="3.0">
          <book code="MAT" style="id">Matthew</book>
          <chapter number="1" style="c" sid="MAT 1"/>
          <para style="s1">Genealogy</para>
          <para style="p">
            <verse number="1" style="v" sid="MAT 1:1"/>
            <char style="w" link-href="SDBG:biblos:001001" src-text="biblos" src-transliteration="biblos" src-pos="noun-ngfs" src-lemma="biblos">book</char>
            of the
            <char style="w" link-href="SDBG:genesis:001001" src-text="geneseos" src-transliteration="geneseos" src-pos="noun-ngfs" src-lemma="genesis">genealogy</char>
            <verse eid="MAT 1:1"/>
            <verse number="2" style="v" sid="MAT 1:2"/>
            <char style="w" link-href="SDBG:biblos:001001" src-text="biblos" src-transliteration="biblos" src-pos="noun-ngfs" src-lemma="biblos">book</char>
            of names
            <verse eid="MAT 1:2"/>
          </para>
          <chapter eid="MAT 1"/>
        </usx>
        """;

    /// <summary>
    /// USX XML with no section markers for testing CurrentSection fallback behavior.
    /// </summary>
    private const string UsxWithoutSections = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>In the beginning
            <char style="w" link-href="SDBH:reshit:001001">reshit</char>.
            <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>And the earth was
            <char style="w" link-href="SDBH:tohu:001001">void</char>.
            <verse eid="GEN 1:2"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    /// <summary>
    /// USX XML with links sharing the same lemma across verses for CurrentSense testing.
    /// </summary>
    private const string UsxWithSharedLemma = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="s1">Section One</para>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>
            <char style="w" link-href="SDBH:elohim:001001">God</char>
            created
            <char style="w" link-href="SDBH:bara:001001">created</char>
            <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>
            <char style="w" link-href="SDBH:elohim:001001">God</char>
            saw
            <verse eid="GEN 1:2"/>
            <verse number="3" style="v" sid="GEN 1:3"/>
            <char style="w" link-href="SDBH:elohim:001001">God</char>
            said
            <char style="w" link-href="SDBH:or:001001">light</char>
            <verse eid="GEN 1:3"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    // =========================================================================
    // HELPER: Parse USX into tokens (CAP-002 prerequisite)
    // =========================================================================

    /// <summary>
    /// Helper to parse USX XML using the already-implemented CAP-002 ParseUsxTokensAsync.
    /// This serves as the test precondition: tokens must be parsed before scope filtering.
    /// </summary>
    private static async Task<ParseUsxTokensResult> ParseTokens(
        string usxContent,
        int bookNumber = 1,
        bool includeSourceWords = false
    )
    {
        var input = new TokenParsingInput(
            UsxContent: usxContent,
            BookNumber: bookNumber,
            IncludeSourceWords: includeSourceWords,
            ResourceId: "ESV-ER"
        );
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);
        Assert.That(result.Success, Is.True, "Precondition: USX parsing must succeed");
        return result;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-003
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetLinksInScopeAsync is called with CurrentVerse scope,
    /// it returns only links from the specified verse. When called with CurrentChapter,
    /// it returns all links from the chapter. This validates the core scope filtering
    /// contract from GM-012.
    ///
    /// This test passes when CAP-003 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-012")]
    [Description(
        "Acceptance test: Scope filtering returns correct links per scope - "
            + "CurrentVerse returns only current verse links, "
            + "CurrentChapter returns all chapter links"
    )]
    public async Task GetLinksInScope_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-012 input - USX with multiple verses and sections
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        // Act: Call GetLinksInScopeAsync with CurrentVerse for GEN 1:3
        var verseRef = new VerseRef(1, 1, 3); // GEN 1:3
        var verseInput = new ScopeFilterInput(
            VerseRef: verseRef,
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );
        var verseResult = await MarbleDataParser.GetLinksInScopeAsync(
            verseInput,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: GM-012 - CurrentVerse returns only links from GEN 1:3
        Assert.That(verseResult.Success, Is.True, "Scope filtering should succeed");
        Assert.That(verseResult.Links, Is.Not.Null, "Links should be present on success");
        Assert.That(verseResult.Links!, Is.Not.Empty, "GEN 1:3 has links");
        Assert.That(verseResult.Error, Is.Null, "Error should be null on success");

        // Verify no links from other verses are included
        // GEN 1:3 has "elohim" and "or" links (2 links)
        Assert.That(
            verseResult.MatchCount,
            Is.GreaterThan(0),
            "GM-012: CurrentVerse should have matching links"
        );

        // Act: Call with CurrentChapter for comparison
        var chapterInput = new ScopeFilterInput(
            VerseRef: verseRef,
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            chapterInput,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: GM-012 - CurrentChapter returns all chapter links (more than verse)
        Assert.That(chapterResult.Success, Is.True);
        Assert.That(chapterResult.Links, Is.Not.Null);
        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThan(verseResult.MatchCount),
            "GM-012: CurrentChapter should return more links than CurrentVerse"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-051: CurrentVerse scope returns only links from the specified verse.
    /// For GEN 1:1, only links "reshit" and "elohim" should be returned.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Description("CurrentVerse scope returns only links from GEN 1:1")]
    public async Task GetLinksInScope_CurrentVerse_ReturnsOnlyCurrentVerseLinks()
    {
        // Arrange: Parse USX with multiple verses
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1), // GEN 1:1
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-051 - only GEN 1:1 links
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        // GEN 1:1 has "reshit" and "elohim" links
        var lemmas = result.Links!.Select(l => l.Lemma).ToList();
        Assert.That(lemmas, Does.Contain("reshit"), "TS-051: GEN 1:1 should contain reshit link");
        Assert.That(lemmas, Does.Contain("elohim"), "TS-051: GEN 1:1 should contain elohim link");

        // Should NOT contain links from other verses
        Assert.That(
            lemmas,
            Does.Not.Contain("tohu"),
            "TS-051: CurrentVerse should not include GEN 1:2 links"
        );
        Assert.That(
            lemmas,
            Does.Not.Contain("mayim"),
            "TS-051: CurrentVerse should not include GEN 1:2 links"
        );
        Assert.That(
            lemmas,
            Does.Not.Contain("or"),
            "TS-051: CurrentVerse should not include GEN 1:3 links"
        );
    }

    /// <summary>
    /// TS-051: CurrentVerse for GEN 1:3 returns only verse 3 links.
    /// Validates that verse boundary detection works correctly for non-first verses.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Description("CurrentVerse scope returns only links from GEN 1:3")]
    public async Task GetLinksInScope_CurrentVerseV3_ReturnsOnlyVerse3Links()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 3), // GEN 1:3
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-051 - only GEN 1:3 links
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        var lemmas = result.Links!.Select(l => l.Lemma).ToList();
        Assert.That(lemmas, Does.Contain("elohim"), "GEN 1:3 should contain elohim link");
        Assert.That(lemmas, Does.Contain("or"), "GEN 1:3 should contain or (light) link");

        // Should NOT contain verse 1 or verse 2 exclusive links
        Assert.That(
            lemmas,
            Does.Not.Contain("reshit"),
            "TS-051: Should not include GEN 1:1 exclusive link"
        );
        Assert.That(lemmas, Does.Not.Contain("tohu"), "TS-051: Should not include GEN 1:2 links");
    }

    /// <summary>
    /// TS-052: CurrentSection scope returns links within section boundaries.
    /// Section "The Creation" spans verses 1-2, so CurrentSection for GEN 1:1
    /// should return links from both verses 1 and 2 but not verse 3.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-608")]
    [Property("InvariantId", "INV-017")]
    [Description("CurrentSection scope returns links within section boundaries from \\s markers")]
    public async Task GetLinksInScope_CurrentSection_ReturnsLinksInSection()
    {
        // Arrange: Parse USX with section boundaries
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1), // GEN 1:1 - in "The Creation" section
            Scope: "currentSection",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-052 and INV-017 - links from "The Creation" section
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        var lemmas = result.Links!.Select(l => l.Lemma).ToList();

        // "The Creation" section contains verses 1 and 2
        Assert.That(
            lemmas,
            Does.Contain("reshit"),
            "TS-052: Section should contain GEN 1:1 link reshit"
        );
        Assert.That(
            lemmas,
            Does.Contain("elohim"),
            "TS-052: Section should contain GEN 1:1 link elohim"
        );
        Assert.That(
            lemmas,
            Does.Contain("tohu"),
            "TS-052: Section should contain GEN 1:2 link tohu"
        );
        Assert.That(
            lemmas,
            Does.Contain("mayim"),
            "TS-052: Section should contain GEN 1:2 link mayim"
        );

        // "The Light" section (verse 3) should be excluded
        Assert.That(
            lemmas,
            Does.Not.Contain("or"),
            "TS-052: Section should not contain GEN 1:3 link 'or'"
        );
    }

    /// <summary>
    /// TS-052: CurrentSection for GEN 1:3 returns only "The Light" section links.
    /// Validates section boundary detection from the second section.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-608")]
    [Property("InvariantId", "INV-017")]
    [Description("CurrentSection for verse in second section returns only that section's links")]
    public async Task GetLinksInScope_CurrentSectionSecondSection_ReturnsSecondSectionLinks()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 3), // GEN 1:3 - in "The Light" section
            Scope: "currentSection",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Only "The Light" section links
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        var lemmas = result.Links!.Select(l => l.Lemma).ToList();
        Assert.That(
            lemmas,
            Does.Contain("or"),
            "TS-052: 'The Light' section should contain 'or' link"
        );

        // Should not contain "The Creation" section exclusive links
        Assert.That(
            lemmas,
            Does.Not.Contain("reshit"),
            "TS-052: Should not contain first section's exclusive link"
        );
        Assert.That(
            lemmas,
            Does.Not.Contain("tohu"),
            "TS-052: Should not contain first section's exclusive link"
        );
    }

    /// <summary>
    /// TS-053: CurrentChapter scope returns all links from the chapter.
    /// All links across all verses and sections should be included.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "BHV-608")]
    [Description("CurrentChapter scope returns all links from entire chapter")]
    public async Task GetLinksInScope_CurrentChapter_ReturnsAllChapterLinks()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1), // GEN 1:1 (any verse in chapter)
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-053 - all chapter links included
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        var lemmas = result.Links!.Select(l => l.Lemma).Distinct().ToList();

        // All links from all 3 verses should be present
        Assert.That(lemmas, Does.Contain("reshit"), "TS-053: Chapter should contain reshit");
        Assert.That(lemmas, Does.Contain("elohim"), "TS-053: Chapter should contain elohim");
        Assert.That(lemmas, Does.Contain("tohu"), "TS-053: Chapter should contain tohu");
        Assert.That(lemmas, Does.Contain("mayim"), "TS-053: Chapter should contain mayim");
        Assert.That(lemmas, Does.Contain("or"), "TS-053: Chapter should contain or");
    }

    /// <summary>
    /// TS-054: Text filter matches tokens by surface form text.
    /// When filteredSource is set, only links whose token text matches are returned.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Text filter by surface form returns only matching links")]
    public async Task GetLinksInScope_FilterBySurfaceForm_ReturnsOnlyMatchingLinks()
    {
        // Arrange: Parse with source words for surface form matching
        var parsedTokens = await ParseTokens(
            UsxWithSourceWords,
            bookNumber: 40,
            includeSourceWords: true
        );

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 1), // MAT 1:1
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: "biblos",
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-054 - only links matching "biblos" surface text
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        // All returned links should have lemma "biblos" (matching surface form)
        foreach (var link in result.Links!)
        {
            Assert.That(
                link.Lemma,
                Is.EqualTo("biblos"),
                "TS-054: Text filter should only return links matching surface form 'biblos'"
            );
        }
    }

    /// <summary>
    /// TS-054: Text filter with no matches returns empty result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Text filter with no matching surface form returns empty links")]
    public async Task GetLinksInScope_FilterNoMatch_ReturnsEmptyLinks()
    {
        // Arrange
        var parsedTokens = await ParseTokens(
            UsxWithSourceWords,
            bookNumber: 40,
            includeSourceWords: true
        );

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 1),
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: "nonexistentword",
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Success but empty
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null);
        Assert.That(
            result.Links!,
            Is.Empty,
            "TS-054: No matching surface form should yield empty links"
        );
        Assert.That(result.MatchCount, Is.EqualTo(0));
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Invalid scope value returns INVALID_INPUT error.
    /// Per data-contracts.md Section 4.3 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-402")]
    [Description("Invalid scope value returns INVALID_INPUT error")]
    public async Task GetLinksInScope_InvalidScope_ReturnsInvalidInputError()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "invalidScope",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per Section 4.3 error conditions
        Assert.That(result.Success, Is.False, "Invalid scope should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo(
                "Scope must be currentVerse, currentSection, currentChapter, or currentSense"
            ),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// TS-101: currentSense scope without an active lemma filter returns INVALID_INPUT.
    /// Per data-contracts.md: "currentSense is only valid when filteredLemma is non-null".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-402")]
    [Description("currentSense scope without lemma filter returns INVALID_INPUT")]
    public async Task GetLinksInScope_CurrentSenseWithoutLemma_ReturnsInvalidInputError()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentSense",
            FilteredLemma: null, // No lemma filter
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-101 and Section 4.3
        Assert.That(result.Success, Is.False, "currentSense without lemma should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("currentSense scope requires an active lemma filter"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Chapter not parsed returns INVALID_STATE error.
    /// When parsedTokens indicates failure (tokens not available), scope filtering cannot proceed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Chapter not parsed returns INVALID_STATE error")]
    public async Task GetLinksInScope_ChapterNotParsed_ReturnsInvalidStateError()
    {
        // Arrange: Create a failed ParseUsxTokensResult (tokens not available)
        var failedParsedTokens = new ParseUsxTokensResult(
            Success: false,
            Error: new ErrorInfo("PARSE_ERROR", "Failed to parse USX content")
        );

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            failedParsedTokens,
            CancellationToken.None
        );

        // Assert: Per Section 4.3 error conditions
        Assert.That(result.Success, Is.False, "Should fail when tokens not parsed");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Chapter tokens not yet available"),
            "Error message should match contract"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-012: Scope filtering returns correct links per scope.
    /// Verifies CurrentVerse returns only current verse links,
    /// CurrentSection respects \s boundaries, CurrentChapter returns all links.
    /// Comparison strategy: semantic.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-012")]
    [Description("GM-012: Scope filtering - verse/section/chapter scopes return correct link sets")]
    public async Task GoldenMaster_GM012_ScopeFilteringSemantics()
    {
        // Arrange: GM-012 input
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);
        var verseRef = new VerseRef(1, 1, 3); // GEN 1:3

        // Act: Three scope queries for the same verse
        var verseResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentVerse", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );
        var sectionResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentSection", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentChapter", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );

        // Assert: GM-012 expected output
        Assert.That(verseResult.Success, Is.True);
        Assert.That(sectionResult.Success, Is.True);
        Assert.That(chapterResult.Success, Is.True);

        // GM-012: currentVerse - only GEN 1:3 links
        Assert.That(
            verseResult.Links,
            Is.Not.Null.And.Not.Empty,
            "GM-012: currentVerse should have links"
        );

        // GM-012: currentSection - GEN 1:3 is in "The Light" section (only verse 3)
        Assert.That(
            sectionResult.Links,
            Is.Not.Null.And.Not.Empty,
            "GM-012: currentSection should have links"
        );

        // GM-012: currentChapter - all links from entire chapter
        Assert.That(
            chapterResult.Links,
            Is.Not.Null.And.Not.Empty,
            "GM-012: currentChapter should have links"
        );

        // Verify ordering: verse <= section <= chapter
        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThanOrEqualTo(sectionResult.MatchCount),
            "GM-012: Chapter scope should have >= links than section scope"
        );
        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThanOrEqualTo(verseResult.MatchCount),
            "GM-012: Chapter scope should have >= links than verse scope"
        );
    }

    /// <summary>
    /// GM-027: Scope filter backend behavior - changing scope changes filtered results.
    /// Verifies that when scope changes from CurrentVerse to CurrentChapter,
    /// the result set grows (more items displayed).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-100")]
    [Property("BehaviorId", "BHV-402")]
    [Property("GoldenMaster", "GM-027")]
    [Description("GM-027: Scope change from CurrentVerse to CurrentChapter increases result count")]
    public async Task GoldenMaster_GM027_ScopeChangeIncreasesResults()
    {
        // Arrange: GM-027 input - changing scope
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);
        var verseRef = new VerseRef(1, 1, 1); // GEN 1:1

        // Act: Query with CurrentVerse, then CurrentChapter
        var verseResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentVerse", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentChapter", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );

        // Assert: GM-027 - scope change yields more results
        Assert.That(verseResult.Success, Is.True);
        Assert.That(chapterResult.Success, Is.True);

        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThan(verseResult.MatchCount),
            "GM-027: Changing scope to currentChapter should display more items"
        );
    }

    // =========================================================================
    // INVARIANT TESTS
    // =========================================================================

    /// <summary>
    /// INV-017: CurrentSection scope respects section boundaries from \s markers.
    /// When sections are present, links from different sections must not be mixed.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-608")]
    [Description("INV-017: CurrentSection does not cross \\s section boundaries")]
    public async Task INV017_CurrentSection_DoesNotCrossSectionBoundaries()
    {
        // Arrange: USX with 2 sections: "The Creation" (v1-2), "The Light" (v3)
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);

        // Query section for verse 1 (in "The Creation")
        var section1Result = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(new VerseRef(1, 1, 1), "currentSection", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );

        // Query section for verse 3 (in "The Light")
        var section2Result = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(new VerseRef(1, 1, 3), "currentSection", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );

        // Assert: INV-017 - sections don't mix
        Assert.That(section1Result.Success, Is.True);
        Assert.That(section2Result.Success, Is.True);

        var section1Lemmas = section1Result.Links!.Select(l => l.Lemma).Distinct().ToHashSet();
        var section2Lemmas = section2Result.Links!.Select(l => l.Lemma).Distinct().ToHashSet();

        // "or" (light) is only in section 2, not in section 1
        Assert.That(
            section1Lemmas,
            Does.Not.Contain("or"),
            "INV-017: Section 1 must not contain section 2's exclusive link"
        );

        // "reshit" (beginning) is only in section 1, not in section 2
        Assert.That(
            section2Lemmas,
            Does.Not.Contain("reshit"),
            "INV-017: Section 2 must not contain section 1's exclusive link"
        );
    }

    /// <summary>
    /// INV-017: CurrentSection when no \s markers are present should fall back to
    /// returning all chapter links (entire content is one implicit section).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-608")]
    [Description("INV-017: No section markers - CurrentSection returns all chapter links")]
    public async Task INV017_NoSectionMarkers_CurrentSectionReturnsAllChapterLinks()
    {
        // Arrange: USX without any \s markers
        var parsedTokens = await ParseTokens(UsxWithoutSections);

        var sectionInput = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentSection",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );
        var chapterInput = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var sectionResult = await MarbleDataParser.GetLinksInScopeAsync(
            sectionInput,
            parsedTokens,
            CancellationToken.None
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            chapterInput,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Without \s markers, section = chapter
        Assert.That(sectionResult.Success, Is.True);
        Assert.That(chapterResult.Success, Is.True);
        Assert.That(
            sectionResult.MatchCount,
            Is.EqualTo(chapterResult.MatchCount),
            "INV-017: No \\s markers means section equals chapter"
        );
    }

    // =========================================================================
    // EDGE CASE TESTS
    // =========================================================================

    /// <summary>
    /// TS-101: CurrentSense scope with active lemma filter returns links for that lemma.
    /// "currentSense" filters to links matching the specified lemma across all verses.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-402")]
    [Description("CurrentSense scope with lemma filter returns only links for that lemma")]
    public async Task GetLinksInScope_CurrentSenseWithLemma_ReturnsLemmaLinks()
    {
        // Arrange: USX with "elohim" appearing in multiple verses
        var parsedTokens = await ParseTokens(UsxWithSharedLemma);

        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentSense",
            FilteredLemma: "elohim", // Filter by lemma
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-101 - only elohim links returned
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null.And.Not.Empty);

        // All returned links should be for the filtered lemma
        foreach (var link in result.Links!)
        {
            Assert.That(
                link.Lemma,
                Is.EqualTo("elohim"),
                "TS-101: CurrentSense should only return links matching the filtered lemma"
            );
        }

        // Should have 3 occurrences (v1, v2, v3 all have "elohim")
        Assert.That(result.MatchCount, Is.EqualTo(3), "TS-101: elohim appears in 3 verses");
    }

    /// <summary>
    /// TS-100: Different scope values produce different result counts for the same verse.
    /// This verifies the backend contract aspect of scope selection reloading content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-100")]
    [Property("BehaviorId", "BHV-402")]
    [Description("Different scope values produce different result counts")]
    public async Task GetLinksInScope_DifferentScopes_ProduceDifferentCounts()
    {
        // Arrange: USX with sections and multiple verses
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);
        var verseRef = new VerseRef(1, 1, 1); // GEN 1:1

        // Act: Query all three standard scopes
        var verseResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentVerse", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );
        var sectionResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentSection", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            new ScopeFilterInput(verseRef, "currentChapter", null, null, "ESV-ER"),
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per TS-100 - wider scopes have more results
        Assert.That(verseResult.Success, Is.True);
        Assert.That(sectionResult.Success, Is.True);
        Assert.That(chapterResult.Success, Is.True);

        // verse < section < chapter (for GEN 1:1 in the first section)
        Assert.That(
            sectionResult.MatchCount,
            Is.GreaterThan(verseResult.MatchCount),
            "TS-100: Section scope should have more links than verse scope"
        );
        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThan(sectionResult.MatchCount),
            "TS-100: Chapter scope should have more links than section scope"
        );
    }

    // =========================================================================
    // RESULT TYPE STRUCTURE TESTS
    // =========================================================================

    /// <summary>
    /// Success result has correct structure: Success=true, Links/TokenIndices/MatchCount
    /// are populated, Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Success result has correct structure per Section 4.3")]
    public async Task GetLinksInScope_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);
        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per Section 4.3 result type structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null, "Links should be present on success");
        Assert.That(result.TokenIndices, Is.Not.Null, "TokenIndices should be present on success");
        Assert.That(
            result.MatchCount,
            Is.GreaterThanOrEqualTo(0),
            "MatchCount should be non-negative"
        );
        Assert.That(
            result.MatchCount,
            Is.EqualTo(result.Links!.Count),
            "MatchCount should equal Links count"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Error result has correct structure: Success=false, Links/TokenIndices are null,
    /// Error has Code and Message.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-402")]
    [Description("Error result has correct structure per Section 4.3")]
    public async Task GetLinksInScope_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Invalid scope to trigger error
        var parsedTokens = await ParseTokens(UsxWithScopeBoundaries);
        var input = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "badScope",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.GetLinksInScopeAsync(
            input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Per Section 4.3 result type structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Links, Is.Null, "Links should be null on failure");
        Assert.That(result.TokenIndices, Is.Null, "TokenIndices should be null on failure");
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
}
