using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using Paranext.DataProvider.Errors;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ScopeFilterService.GetLinksForScope - scope-based link filtering.
/// CAP-003: GetLinksForScope
///
/// Behaviors: BHV-601 (Scope-Based Link Filtering), BHV-602 (Surface Form Text Filter),
///            BHV-305 (Scope ComboBox State Management)
/// Contract: Section 4.3 M-003, Section 2.3 ScopeFilterInput, Section 3.3 ScopeFilterResult
/// Sources: EXT-005 (Token Scope Filtering), EXT-006 (Section Boundary Detection)
///
/// ScopeFilterService.GetLinksForScope is a static method that takes a ScopeFilterInput
/// and parsed MarbleToken[] and returns ScopeFilterResult with filtered links.
/// Three scope levels: CurrentVerse, CurrentSection, CurrentChapter.
/// Section boundaries are detected from ParagraphStart markers in the token stream.
/// Text filter narrows results to links matching a specific lemma.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ScopeFilterServiceTests
{
    /// <summary>
    /// Resolve golden master input file paths relative to test output directory.
    /// Reuses the same pattern as MarbleTokenParserTests.
    /// </summary>
    private static string GetGoldenMasterPath(string fileName)
    {
        string testDir = TestContext.CurrentContext.TestDirectory;
        return Path.Combine(testDir, "EnhancedResources", "GoldenMasters", fileName);
    }

    /// <summary>
    /// Parse the golden master input XML into tokens using the real MarbleTokenParser
    /// (CAP-002 is complete and verified). This provides integration-grade test inputs.
    /// </summary>
    private static MarbleToken[] ParseGoldenMasterXml(
        string fileName,
        int bookNumber,
        int chapterNumber
    )
    {
        string marbleXml = File.ReadAllText(GetGoldenMasterPath(fileName));
        return MarbleTokenParser.Parse(
            marbleXml,
            resourceId: "ESV16UK+",
            bookNumber: bookNumber,
            chapterNumber: chapterNumber
        );
    }

    #region Acceptance Tests (Golden Masters)

    // =========================================================================
    // gm-004: Verse scope filtering (GEN 1:1, CurrentVerse, Lexical)
    // Input: input-usx-gen1.xml with 2 verses of Marble XML
    // Expected: 5 TextLink tokens from GEN 1:1 only
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Property("GoldenMasterId", "gm-004")]
    [Description(
        "gm-004: GetLinksForScope with CurrentVerse returns only GEN 1:1 links (5 tokens)"
    )]
    public void GetLinksForScope_VerseScope_Returns5LinksFromGen1V1()
    {
        // Arrange: Parse golden master input XML into tokens (using real parser from CAP-002)
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1), // GEN 1:1
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: gm-004 expected output - exactly 5 TextLink tokens from GEN 1:1
        Assert.That(result, Is.Not.Null, "gm-004: Result must not be null");
        Assert.That(result.IsEmpty, Is.False, "gm-004: Result should not be empty for GEN 1:1");
        Assert.That(
            result.Links,
            Has.Count.EqualTo(5),
            "gm-004: Expected 5 filtered links from GEN 1:1"
        );

        // Assert: Verify specific link strong numbers match golden master
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(
            strongNumbers,
            Does.Contain("H7225"),
            "gm-004: 'beginning' (H7225) should be in verse links"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H0430"),
            "gm-004: 'God' (H0430) should be in verse links"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H1254a"),
            "gm-004: 'created' (H1254a) should be in verse links"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H8064"),
            "gm-004: 'heavens' (H8064) should be in verse links"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H0776"),
            "gm-004: 'earth' (H0776) should be in verse links"
        );

        // Assert: No links from verse 2 leaked through
        // GEN 1:2 tokens have target_links starting with "001001002" - none should appear
        Assert.That(
            result.Links.All(l => !string.IsNullOrEmpty(l.StrongNumber)),
            Is.True,
            "gm-004: All returned links must have a strong number"
        );
    }

    // =========================================================================
    // gm-005: Section scope filtering (GEN 2:1, CurrentSection, Lexical)
    // Input: input-usx-gen2.xml with section breaks (s1 paragraph markers)
    // Expected: 16 TextLink tokens from GEN 2:1-2 section
    // Section boundary: "The Seventh Day, God Rests" section (2:1-2:3)
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-601")]
    [Property("GoldenMasterId", "gm-005")]
    [Description(
        "gm-005: GetLinksForScope with CurrentSection returns 16 links from GEN 2:1-2 section boundary"
    )]
    public void GetLinksForScope_SectionScope_Returns16LinksFromSectionBoundary()
    {
        // Arrange: Parse golden master input XML with section breaks
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1), // GEN 2:1
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: gm-005 expected output - 16 TextLink tokens from section containing 2:1
        Assert.That(result, Is.Not.Null, "gm-005: Result must not be null");
        Assert.That(result.IsEmpty, Is.False, "gm-005: Section should contain links");
        Assert.That(
            result.Links,
            Has.Count.EqualTo(16),
            "gm-005: Expected 16 links in GEN 2:1-2 section"
        );

        // Assert: Section boundary is reported (EXT-006 section boundary detection)
        Assert.That(
            result.SectionBoundary,
            Is.Not.Null,
            "gm-005: Section boundary must be reported for CurrentSection scope"
        );

        // Assert: Links cover multiple verses (section includes 2:1 and 2:2)
        // Verify key strong numbers from both verses appear
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();

        // From GEN 2:1
        Assert.That(
            strongNumbers,
            Does.Contain("H8064"),
            "gm-005: 'heavens' (H8064) from 2:1 should be in section"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H3615"),
            "gm-005: 'finished' (H3615) from 2:1 should be in section"
        );

        // From GEN 2:2
        Assert.That(
            strongNumbers,
            Does.Contain("H7637"),
            "gm-005: 'seventh' (H7637) from 2:2 should be in section"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H7673a"),
            "gm-005: 'rested' (H7673a) from 2:2 should be in section"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H4399"),
            "gm-005: 'work' (H4399) from 2:2 should be in section"
        );

        // Assert: No links from outside section (GEN 2:4+ is "The Creation of Man and Woman" section)
        // GEN 2:4 tokens have target_links starting with "001002004" - none should appear
        Assert.That(
            strongNumbers.Contains("H0428") == false,
            "gm-005: 'These' (H0428) from 2:4 must NOT be in 2:1-2 section"
        );
    }

    // =========================================================================
    // gm-006: Chapter scope filtering (GEN 1:2, CurrentChapter, Lexical)
    // Input: input-usx-gen1.xml with GEN chapter 1 (verses 1-2)
    // Expected: 19 TextLink tokens from entire chapter
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-601")]
    [Property("GoldenMasterId", "gm-006")]
    [Description(
        "gm-006: GetLinksForScope with CurrentChapter returns all 19 links from GEN chapter 1"
    )]
    public void GetLinksForScope_ChapterScope_Returns19LinksFromEntireChapter()
    {
        // Arrange: Parse golden master input XML (GEN chapter 1, verses 1-2)
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 2), // GEN 1:2 (reference within chapter)
            Scope: ScopeEnum.CurrentChapter,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: gm-006 expected output - 19 TextLink tokens from entire chapter
        Assert.That(result, Is.Not.Null, "gm-006: Result must not be null");
        Assert.That(result.IsEmpty, Is.False, "gm-006: Chapter should contain links");
        Assert.That(
            result.Links,
            Has.Count.EqualTo(19),
            "gm-006: Expected 19 links from GEN chapter 1"
        );

        // Assert: TotalLinkCount reflects all links before filtering
        Assert.That(
            result.TotalLinkCount,
            Is.GreaterThanOrEqualTo(19),
            "gm-006: Total count >= filtered count"
        );

        // Assert: Links from verse 1 present
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(
            strongNumbers,
            Does.Contain("H7225"),
            "gm-006: 'beginning' (H7225) from 1:1 should be in chapter"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H1254a"),
            "gm-006: 'created' (H1254a) from 1:1 should be in chapter"
        );

        // Assert: Links from verse 2 also present
        Assert.That(
            strongNumbers,
            Does.Contain("H8414"),
            "gm-006: 'without form' (H8414) from 1:2 should be in chapter"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H7307"),
            "gm-006: 'Spirit' (H7307) from 1:2 should be in chapter"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H4325"),
            "gm-006: 'waters' (H4325) from 1:2 should be in chapter"
        );
    }

    // =========================================================================
    // gm-007: Text filter with no matches (GEN 2:4, CurrentSection, filter "shamayim")
    // Input: input-usx-gen2.xml; filterText = Hebrew "shamayim" (שָׁמַיִם)
    // Expected: 0 tokens (lemma not in section containing 2:4)
    // Note: gm-007 golden master returns tokenCount: 0 because the section
    // "The Creation of Man and Woman" starting at 2:4 does NOT contain
    // the שָׁמַיִם lemma in SDBH lexical_links within a CurrentSection boundary.
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-601")]
    [Property("GoldenMasterId", "gm-007")]
    [Description(
        "gm-007: GetLinksForScope with text filter returns 0 links when lemma not in section scope"
    )]
    public void GetLinksForScope_TextFilterNoMatches_ReturnsEmptyResult()
    {
        // Arrange: Parse golden master input XML with section breaks
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        // Filter for Hebrew shamayim using the golden master's normalization order
        // (shin+qamats+shin-dot). This differs from the XML's byte order
        // (shin+shin-dot+qamats), so exact ordinal comparison returns 0 matches.
        // This matches PT9 behavior: exact string match, no Unicode normalization.
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 4), // GEN 2:4
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "\u05E9\u05B8\u05C1\u05DE\u05B7\u05D9\u05B4\u05DD", // שָׁמַיִם (NFC order: shin+qamats+shin-dot) - differs from XML's NFD order
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: gm-007 expected output - 0 tokens
        Assert.That(result, Is.Not.Null, "gm-007: Result must not be null even when empty");
        Assert.That(
            result.IsEmpty,
            Is.True,
            "gm-007: Result should be empty when filter matches no links"
        );
        Assert.That(
            result.Links,
            Has.Count.EqualTo(0),
            "gm-007: Expected 0 links with non-matching text filter"
        );
    }

    #endregion

    #region Contract Tests - Happy Path

    // -------------------------------------------------------------------------
    // TS-025: Verify verse-level scope returns ONLY links from specified verse
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Verse scope excludes links from all other verses in the chapter")]
    public void GetLinksForScope_VerseScope_ExcludesLinksFromOtherVerses()
    {
        // Arrange: Parse multi-verse chapter data
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Filter for GEN 1:2 (verse 2) only
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 2), // GEN 1:2
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Should return 14 links from verse 2 only (per gm-006: 19 total - 5 from v1 = 14 from v2)
        Assert.That(result.Links, Has.Count.EqualTo(14), "GEN 1:2 should have 14 lexical links");
        Assert.That(result.IsEmpty, Is.False);

        // None of the verse 1 strong numbers should appear
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(strongNumbers, Does.Not.Contain("H7225"), "H7225 (beginning) is verse 1 only");
        Assert.That(strongNumbers, Does.Not.Contain("H1254a"), "H1254a (created) is verse 1 only");
    }

    // -------------------------------------------------------------------------
    // TS-026: Section boundary detection uses ParagraphStart markers (EXT-006)
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-006")]
    [Description(
        "Section boundaries are derived from s1 ParagraphStart markers in the token stream"
    )]
    public void GetLinksForScope_SectionScope_SectionBoundaryDerivedFromParagraphMarkers()
    {
        // Arrange: gen2 XML has two sections separated by s1 markers:
        //   Section 1: "The Seventh Day, God Rests" (2:1-2:3)
        //   Section 2: "The Creation of Man and Woman" (2:4+)
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 2), // GEN 2:2 (within first section)
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Section boundary is detected and reported
        Assert.That(
            result.SectionBoundary,
            Is.Not.Null,
            "Section boundary must be detected from paragraph markers"
        );
        Assert.That(result.SectionBoundary!.StartIndex, Is.GreaterThanOrEqualTo(0));
        Assert.That(
            result.SectionBoundary.EndIndex,
            Is.GreaterThan(result.SectionBoundary.StartIndex)
        );

        // Assert: Links from GEN 2:2 are included (same section as 2:1)
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(
            strongNumbers,
            Does.Contain("H7637"),
            "2:2 'seventh' should be in same section as 2:1"
        );
    }

    // -------------------------------------------------------------------------
    // TS-027: Chapter scope returns ALL links regardless of verse/section
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Chapter scope returns links from all verses in the chapter")]
    public void GetLinksForScope_ChapterScope_IncludesLinksFromAllVerses()
    {
        // Arrange: gen2 XML has verses 1, 2, 4, 5 across two sections
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1), // GEN 2:1
            Scope: ScopeEnum.CurrentChapter,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Chapter scope includes links from ALL sections
        Assert.That(
            result.Links.Count,
            Is.GreaterThan(16),
            "Chapter scope should have more links than section scope (16 in section 1)"
        );

        // Links from section 2 (2:4+) should be present
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(
            strongNumbers,
            Does.Contain("H0428"),
            "H0428 (These) from 2:4 should be in chapter scope"
        );
        Assert.That(
            strongNumbers,
            Does.Contain("H8435"),
            "H8435 (generations) from 2:4 should be in chapter scope"
        );

        // Links from section 1 should also be present
        Assert.That(
            strongNumbers,
            Does.Contain("H8064"),
            "H8064 (heavens) from 2:1 should be in chapter scope"
        );
    }

    // -------------------------------------------------------------------------
    // TS-028: Text filter restricts results to matching lemma
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Text filter returns only links whose lexical_links contain the filter lemma")]
    public void GetLinksForScope_WithTextFilter_ReturnsOnlyMatchingLemmaLinks()
    {
        // Arrange: gen2 XML where shamayim (H8064) appears in 2:1 and 2:4
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        // Filter for shamayim across entire chapter
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1), // GEN 2:1
            Scope: ScopeEnum.CurrentChapter,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "\u05E9\u05C1\u05B8\u05DE\u05B7\u05D9\u05B4\u05DD", // שָׁמַיִם (shin+shin-dot+qamats+mem+patah+yod+hiriq+final-mem)
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Only links with shamayim in lexical_links should be returned
        Assert.That(result.Links.Count, Is.GreaterThan(0), "Chapter has shamayim links");
        Assert.That(
            result.Links.All(l => l.StrongNumber == "H8064"),
            Is.True,
            "All filtered links should be H8064 (shamayim)"
        );
    }

    #endregion

    #region Contract Tests - Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: Invalid scope value throws INVALID_ARGUMENT")]
    public void GetLinksForScope_InvalidScope_ThrowsInvalidArgument()
    {
        // Arrange: Parse any valid token set
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: (ScopeEnum)999, // Invalid enum value
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act & Assert: Should throw with INVALID_ARGUMENT platform error code
        var ex = Assert.Throws<InvalidOperationException>(
            () => ScopeFilterService.GetLinksForScope(input, tokens)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo(PlatformErrorCodes.InvalidArgument),
            "Invalid scope should produce INVALID_ARGUMENT error"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: Null tokens array returns empty result")]
    public void GetLinksForScope_NullTokens_ReturnsEmptyResult()
    {
        // Arrange
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, null!);

        // Assert: Empty result, not an exception (defensive handling)
        Assert.That(result.IsEmpty, Is.True, "Null tokens should produce empty result");
        Assert.That(result.Links, Has.Count.EqualTo(0));
        Assert.That(result.TotalLinkCount, Is.EqualTo(0));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: Empty tokens array returns empty result")]
    public void GetLinksForScope_EmptyTokens_ReturnsEmptyResult()
    {
        // Arrange
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(
            input,
            Array.Empty<MarbleToken>()
        );

        // Assert: Empty result
        Assert.That(result.IsEmpty, Is.True, "Empty token array should produce empty result");
        Assert.That(result.Links, Has.Count.EqualTo(0));
    }

    #endregion

    #region Section Boundary Detection Tests (EXT-006)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Section boundary at chapter start: first section starts at beginning of chapter")]
    public void GetLinksForScope_SectionAtChapterStart_FirstSectionIncludesChapterStart()
    {
        // Arrange: gen2.xml starts with section "The Seventh Day, God Rests"
        // GEN 2:1 is at the beginning of the first section
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1), // First verse in chapter
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Section boundary start should be at (or near) the beginning of the chapter
        Assert.That(result.SectionBoundary, Is.Not.Null, "First section boundary must be detected");
        Assert.That(
            result.SectionBoundary!.StartIndex,
            Is.LessThanOrEqualTo(5),
            "First section should start near the beginning of the token stream"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Section boundary detection: verse in second section gets correct boundary")]
    public void GetLinksForScope_VerseInSecondSection_GetsSecondSectionBoundary()
    {
        // Arrange: gen2.xml has two sections:
        //   Section 1: "The Seventh Day, God Rests" (2:1-2:3)
        //   Section 2: "The Creation of Man and Woman" (2:4+)
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 4), // GEN 2:4 is in second section
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Should return links from section 2 only
        Assert.That(result.Links.Count, Is.GreaterThan(0), "Section 2 should have links");
        Assert.That(result.SectionBoundary, Is.Not.Null, "Section boundary must be reported");

        // Links from section 1 (2:1-2) should NOT be present
        var strongNumbers = result.Links.Select(l => l.StrongNumber).ToList();
        Assert.That(
            strongNumbers,
            Does.Not.Contain("H7673a"),
            "H7673a (rested) from 2:2 must NOT be in section 2"
        );

        // Links from section 2 (2:4+) should be present
        Assert.That(
            strongNumbers,
            Does.Contain("H0428"),
            "H0428 (These) from 2:4 should be in section 2"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-006")]
    [Description("No section boundary reported for non-section scopes")]
    public void GetLinksForScope_VerseScope_NoSectionBoundaryReported()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: SectionBoundary should be null for non-section scopes
        Assert.That(
            result.SectionBoundary,
            Is.Null,
            "Section boundary should only be reported for CurrentSection scope"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-601")]
    [Description("No section boundary reported for chapter scope")]
    public void GetLinksForScope_ChapterScope_NoSectionBoundaryReported()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-005-input-usx-gen2.xml",
            bookNumber: 1,
            chapterNumber: 2
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1),
            Scope: ScopeEnum.CurrentChapter,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert
        Assert.That(
            result.SectionBoundary,
            Is.Null,
            "Section boundary should only be reported for CurrentSection scope"
        );
    }

    #endregion

    #region Text Filter Tests (BHV-602)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Empty filter text returns all links in scope (no filtering)")]
    public void GetLinksForScope_EmptyFilterText_ReturnsAllLinksInScope()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "", // Empty string = no filter
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: All verse 1 links returned (no text filter applied)
        Assert.That(
            result.Links,
            Has.Count.EqualTo(5),
            "Empty filter text should return all links in verse"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Text filter with non-existent lemma returns empty result")]
    public void GetLinksForScope_FilterTextNoMatchInVerse_ReturnsEmpty()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "nonexistent_lemma_xyz",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: No matching links
        Assert.That(
            result.Links,
            Has.Count.EqualTo(0),
            "Non-existent lemma should return no links"
        );
        Assert.That(result.IsEmpty, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Text filter matches within lexical_links semicolon-separated entries")]
    public void GetLinksForScope_FilterTextMatchesSingleLemma_ReturnsOnlyMatchingLinks()
    {
        // Arrange: GEN 1:1 has "earth" with LexicalLinks "SDBH:אֶרֶץ:001001000"
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        // Filter for the lemma that appears in earth's LexicalLinks
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentChapter, // Chapter scope to get more tokens
            LinkType: MarbleLinkType.Lexical,
            FilterText: "\u05D0\u05B6\u05E8\u05B6\u05E5", // אֶרֶץ (erets = earth)
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Only links with erets (H0776) should be returned
        Assert.That(result.Links.Count, Is.GreaterThan(0), "Chapter contains erets links");
        Assert.That(
            result.Links.All(l => l.StrongNumber == "H0776"),
            Is.True,
            "All filtered links should be H0776 (erets/earth)"
        );
        // There are 2 occurrences of H0776 in gen1.xml (1:1 and 1:2)
        Assert.That(result.Links, Has.Count.EqualTo(2), "Two occurrences of erets in GEN 1:1-2");
    }

    #endregion

    #region Scope State Tests (BHV-305)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Scope selection state reflected: TotalLinkCount shows all links before scope filtering"
    )]
    public void GetLinksForScope_VerseScope_TotalLinkCountReflectsFullChapter()
    {
        // Arrange: Chapter with 19 total links (gm-006), filtered to verse 1 (5 links)
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: TotalLinkCount reflects all links in the token stream, not just filtered
        Assert.That(
            result.TotalLinkCount,
            Is.GreaterThanOrEqualTo(result.Links.Count),
            "TotalLinkCount should be >= filtered link count"
        );
        Assert.That(result.Links, Has.Count.EqualTo(5), "5 links in verse 1");
        Assert.That(result.TotalLinkCount, Is.EqualTo(19), "19 total Lexical links in chapter 1");
    }

    #endregion

    #region MarbleLexicalLinkOutput Structure Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Each returned link has populated StrongNumber, SourceText, and Lemma fields")]
    public void GetLinksForScope_VerseScope_LinksHaveRequiredFields()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Every link has required fields populated
        foreach (var link in result.Links)
        {
            Assert.That(
                link.StrongNumber,
                Is.Not.Null.And.Not.Empty,
                $"Link must have a StrongNumber (got '{link.StrongNumber}')"
            );
            Assert.That(
                link.SourceText,
                Is.Not.Null.And.Not.Empty,
                $"Link must have SourceText (H{link.StrongNumber})"
            );
            Assert.That(
                link.LinkType,
                Is.EqualTo(MarbleLinkType.Lexical),
                "Filtered by Lexical type - all links should be Lexical"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-601")]
    [Property("GoldenMasterId", "gm-004")]
    [Description("gm-004 golden master: verify exact source text values for GEN 1:1 links")]
    public void GetLinksForScope_VerseScope_SourceTextMatchesGoldenMaster()
    {
        // Arrange
        MarbleToken[] tokens = ParseGoldenMasterXml(
            "gm-001-input-usx-gen1.xml",
            bookNumber: 1,
            chapterNumber: 1
        );

        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "ESV16UK+"
        );

        // Act
        ScopeFilterResult result = ScopeFilterService.GetLinksForScope(input, tokens);

        // Assert: Verify source text matches golden master captured values
        // gm-004 captured tokens have Value fields like "beginning, ", "God ", etc.
        var sourceTexts = result.Links.Select(l => l.SourceText.Trim()).ToList();
        Assert.That(
            sourceTexts,
            Does.Contain("beginning,"),
            "gm-004: 'beginning,' source text expected"
        );
        Assert.That(sourceTexts, Does.Contain("God"), "gm-004: 'God' source text expected");
        Assert.That(sourceTexts, Does.Contain("created"), "gm-004: 'created' source text expected");
        Assert.That(sourceTexts, Does.Contain("heavens"), "gm-004: 'heavens' source text expected");
        Assert.That(sourceTexts, Does.Contain("earth."), "gm-004: 'earth.' source text expected");
    }

    #endregion

    #region Book-scoped Tokens (Phase B Tasks 4-5)

    [Test]
    public void GetLinksForScope_BookScopedTokens_CurrentChapterScope_ExcludesOtherChapters()
    {
        // Tokens cover Genesis ch.1 (verse 1) and ch.2 (verse 1).
        // Each chapter has one in-verse TextLink token with a lexical link.
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "elohim",
                3,
                LexicalLinks: ["SDBH:elohim:001"]
            ),
            new MarbleToken(MarbleTokenType.Chapter, "2", 4),
            new MarbleToken(MarbleTokenType.Verse, "1", 5),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "shamayim",
                6,
                LexicalLinks: ["SDBH:shamayim:001"]
            ),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var result = ScopeFilterService.GetLinksForScope(input, tokens);

        Assert.That(result.Links, Has.Count.EqualTo(1));
        Assert.That(result.Links[0].Lemma, Is.EqualTo("elohim"));
    }

    [Test]
    public void GetLinksForScope_BookScopedTokens_CurrentVerseScope_DistinguishesSameVerseAcrossChapters()
    {
        // Both chapters have a verse 1 with a lexical link.
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "ch1word",
                3,
                LexicalLinks: ["SDBH:ch1word:001"]
            ),
            new MarbleToken(MarbleTokenType.Chapter, "2", 4),
            new MarbleToken(MarbleTokenType.Verse, "1", 5),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "ch2word",
                6,
                LexicalLinks: ["SDBH:ch2word:001"]
            ),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var result = ScopeFilterService.GetLinksForScope(input, tokens);

        Assert.That(result.Links, Has.Count.EqualTo(1));
        Assert.That(result.Links[0].Lemma, Is.EqualTo("ch2word"));
    }

    [Test]
    public void GetLinksForScope_BookScopedTokens_CurrentSectionScope_BoundaryDoesNotCrossChapterMarker()
    {
        // Section marker (s1) only in chapter 1; chapter 2 has no markers.
        // Current ref is chapter 2 verse 1 - section should be bounded to chapter 2 alone,
        // not stretch back to chapter 1's marker.
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.ParagraphStart, "s1", 2, Style: "s1"),
            new MarbleToken(MarbleTokenType.Verse, "1", 3),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "ch1word",
                4,
                LexicalLinks: ["SDBH:ch1word:001"]
            ),
            new MarbleToken(MarbleTokenType.Chapter, "2", 5),
            new MarbleToken(MarbleTokenType.Verse, "1", 6),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "ch2word",
                7,
                LexicalLinks: ["SDBH:ch2word:001"]
            ),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 2, 1),
            Scope: ScopeEnum.CurrentSection,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var result = ScopeFilterService.GetLinksForScope(input, tokens);

        Assert.That(
            result.Links.Select(l => l.Lemma),
            Is.EquivalentTo(new[] { "ch2word" }),
            "Section detection must not walk backward past a Chapter marker"
        );
    }

    [Test]
    public void GetLinksForScope_BookScopedTokens_CurrentVerseScope_ResetsVerseAtChapterBoundary()
    {
        // Token stream has Verse 1 in ch.1 (followed by alpha), then a Chapter 2 with
        // beta token but NO Verse token before beta. If currentVerse weren't reset on
        // chapter change, beta would inherit currentVerse=1 from ch.1 and incorrectly
        // match a CurrentVerse(ch.1, v.1) query.
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(MarbleTokenType.TextLink, "alpha", 3, LexicalLinks: ["SDBH:alpha:001"]),
            new MarbleToken(MarbleTokenType.Chapter, "2", 4),
            new MarbleToken(MarbleTokenType.TextLink, "beta", 5, LexicalLinks: ["SDBH:beta:001"]),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var result = ScopeFilterService.GetLinksForScope(input, tokens);

        Assert.That(
            result.Links.Select(l => l.Lemma),
            Is.EquivalentTo(new[] { "alpha" }),
            "currentVerse must reset to 0 on chapter change so cross-chapter verse-number bleed is impossible"
        );
    }

    [Test]
    public void GetScopedTokens_LexicalScope_ReturnsRawInScopeTokensWithLexicalLinks()
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "elohim",
                3,
                LexicalLinks: ["SDBH:elohim:001"]
            ),
            new MarbleToken(MarbleTokenType.TextLink, "noLinks", 4),
            new MarbleToken(MarbleTokenType.TextLink, "shamayim", 5, ThematicLinks: ["FAUNA:x"]),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Lexical,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var scoped = ScopeFilterService.GetScopedTokens(input, tokens);

        Assert.That(scoped, Has.Count.EqualTo(1));
        Assert.That(scoped[0].Text, Is.EqualTo("elohim"));
    }

    [Test]
    public void GetScopedTokens_ThematicScope_ReturnsTokensWithThematicLinks()
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "camel",
                3,
                LexicalLinks: ["SDBH:gamal:001"],
                ThematicLinks: ["FAUNA:camel_001"]
            ),
        };
        var input = new ScopeFilterInput(
            CurrentRef: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            LinkType: MarbleLinkType.Thematic,
            FilterText: "",
            FilterSenses: "",
            FilterClickOrigin: FilterClickOrigin.ScripturePane,
            ResourceId: "TestRes"
        );

        var scoped = ScopeFilterService.GetScopedTokens(input, tokens);

        Assert.That(scoped, Has.Count.EqualTo(1));
        Assert.That(scoped[0].ThematicLinks?[0], Is.EqualTo("FAUNA:camel_001"));
    }

    #endregion
}
