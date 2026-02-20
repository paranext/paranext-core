using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-004: GetSectionBoundaries.
/// Validates section boundary detection from parsed token lists.
/// Sections are defined by ParagraphStart tokens whose style starts with "s"
/// (case-insensitive) per INV-011.
///
/// PT9 Source: Paratext/Marble/MarbleDataParser.cs:505-550
/// Golden Master: gm-005-section-boundaries
/// Extraction: EXT-053
/// Behavior: BHV-600, INV-011
/// </summary>
[TestFixture]
public class SectionBoundaryTests
{
    #region Helper Methods for Building Token Lists

    /// <summary>
    /// Creates a minimal token list representing a chapter with section headings.
    /// This is the core test data builder for section boundary tests.
    /// </summary>
    private static List<MarbleToken> BuildTokenList(params TokenDef[] defs)
    {
        var tokens = new List<MarbleToken>();
        foreach (var def in defs)
        {
            tokens.Add(
                new MarbleToken(def.Type, def.Text, def.Style, def.VerseRef)
            );
        }
        return tokens;
    }

    /// <summary>Shorthand for defining tokens in test setup.</summary>
    private record TokenDef(
        MarbleTokenType Type,
        string? Text = null,
        string? Style = null,
        VerseReference? VerseRef = null
    );

    private static TokenDef Book(string code) =>
        new(MarbleTokenType.Book, Text: code);

    private static TokenDef Chapter(string number) =>
        new(MarbleTokenType.Chapter, Text: number);

    private static TokenDef Verse(string number) =>
        new(MarbleTokenType.Verse, Text: number);

    private static TokenDef ParaStart(string style) =>
        new(MarbleTokenType.ParagraphStart, Style: style);

    private static TokenDef ParaEnd(string style) =>
        new(MarbleTokenType.ParagraphEnd, Style: style);

    private static TokenDef TextToken(string text) =>
        new(MarbleTokenType.Text, Text: text);

    private static TokenDef TextLink(string text) =>
        new(MarbleTokenType.TextLink, Text: text);

    #endregion

    #region Standard Test Token Lists

    /// <summary>
    /// GEN chapter 1 with two sections:
    ///   Section 0: "The Creation" (s1) - verses 1-5
    ///   Section 1: "The Second Day" (s1) - verses 6-8
    /// </summary>
    private static IReadOnlyList<MarbleToken> TwoSectionTokens => BuildTokenList(
        Book("GEN"),
        Chapter("1"),
        // Section 0: heading at start of chapter
        ParaStart("s1"),
        TextToken("The Creation"),
        ParaEnd("s1"),
        // Content for section 0
        ParaStart("p"),
        Verse("1"),
        TextLink("In the beginning"),
        Verse("2"),
        TextLink("The earth"),
        Verse("3"),
        TextLink("And God said"),
        Verse("4"),
        TextLink("And God saw"),
        Verse("5"),
        TextLink("God called the light Day"),
        ParaEnd("p"),
        // Section 1: heading before verse 6
        ParaStart("s1"),
        TextToken("The Second Day"),
        ParaEnd("s1"),
        ParaStart("p"),
        Verse("6"),
        TextLink("And God said"),
        Verse("7"),
        TextLink("And God made"),
        Verse("8"),
        TextLink("And God called"),
        ParaEnd("p")
    );

    /// <summary>
    /// GEN chapter 1 with NO section headings (just content).
    /// Should result in a single section covering the entire chapter.
    /// </summary>
    private static IReadOnlyList<MarbleToken> NoSectionTokens => BuildTokenList(
        Book("GEN"),
        Chapter("1"),
        ParaStart("p"),
        Verse("1"),
        TextLink("In the beginning"),
        Verse("2"),
        TextLink("The earth"),
        Verse("3"),
        TextLink("And God said"),
        ParaEnd("p")
    );

    /// <summary>
    /// GEN chapter 1 with a single section heading at the start.
    /// Should result in a single section covering the entire chapter.
    /// </summary>
    private static IReadOnlyList<MarbleToken> SingleSectionTokens => BuildTokenList(
        Book("GEN"),
        Chapter("1"),
        ParaStart("s1"),
        TextToken("The Creation of the World"),
        ParaEnd("s1"),
        ParaStart("p"),
        Verse("1"),
        TextLink("In the beginning"),
        Verse("2"),
        TextLink("The earth"),
        Verse("3"),
        TextLink("And God said"),
        ParaEnd("p")
    );

    /// <summary>
    /// Token list with three sections to test multiple boundaries.
    /// Section 0: s1 "First Section" - verses 1-3
    /// Section 1: s1 "Second Section" - verses 4-6
    /// Section 2: s2 "Third Section" - verses 7-9
    /// </summary>
    private static IReadOnlyList<MarbleToken> ThreeSectionTokens => BuildTokenList(
        Book("GEN"),
        Chapter("1"),
        ParaStart("s1"),
        TextToken("First Section"),
        ParaEnd("s1"),
        ParaStart("p"),
        Verse("1"),
        TextLink("text1"),
        Verse("2"),
        TextLink("text2"),
        Verse("3"),
        TextLink("text3"),
        ParaEnd("p"),
        ParaStart("s1"),
        TextToken("Second Section"),
        ParaEnd("s1"),
        ParaStart("p"),
        Verse("4"),
        TextLink("text4"),
        Verse("5"),
        TextLink("text5"),
        Verse("6"),
        TextLink("text6"),
        ParaEnd("p"),
        ParaStart("s2"),
        TextToken("Third Section"),
        ParaEnd("s2"),
        ParaStart("p"),
        Verse("7"),
        TextLink("text7"),
        Verse("8"),
        TextLink("text8"),
        Verse("9"),
        TextLink("text9"),
        ParaEnd("p")
    );

    /// <summary>
    /// Token list with consecutive section headings (two headings with no content between).
    /// </summary>
    private static IReadOnlyList<MarbleToken> ConsecutiveHeadingTokens => BuildTokenList(
        Book("GEN"),
        Chapter("1"),
        ParaStart("s1"),
        TextToken("First Heading"),
        ParaEnd("s1"),
        ParaStart("s2"),
        TextToken("Sub Heading"),
        ParaEnd("s2"),
        ParaStart("p"),
        Verse("1"),
        TextLink("text"),
        Verse("2"),
        TextLink("more text"),
        ParaEnd("p")
    );

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-004.
    /// Verifies all gm-005 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-005:
    /// - SB-01: First section boundaries (GEN 1:1-5)
    /// - SB-02: Second section start verse incremented by 1
    /// - SB-03: First section uses chapter start as boundary
    ///
    /// Also validates:
    /// - INV-011: ParagraphStart tokens with style starting 's'
    /// - Postcondition: boundaries contiguous and non-overlapping
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Description(
        "Acceptance test: Section boundaries correctly identified by USFM 's' paragraph markers"
    )]
    public void GetSectionBoundaries_AllGoldenMasterScenarios_Pass()
    {
        var tokens = TwoSectionTokens;

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.Multiple(() =>
        {
            // Must return boundaries
            Assert.That(boundaries, Is.Not.Null, "Must return non-null result");
            Assert.That(boundaries, Has.Count.EqualTo(2), "Two sections = two boundaries");

            // SB-01 / SB-03: First section starts at chapter start (verse 1)
            Assert.That(
                boundaries[0].StartVerse.Verse,
                Is.EqualTo(1),
                "SB-01/SB-03: First section starts at verse 1"
            );
            Assert.That(
                boundaries[0].EndVerse.Verse,
                Is.EqualTo(5),
                "SB-01: First section ends at verse 5"
            );
            Assert.That(
                boundaries[0].SectionIndex,
                Is.EqualTo(0),
                "SB-03: First section has index 0"
            );

            // SB-02: Second section start verse incremented by 1 (excludes heading verse)
            Assert.That(
                boundaries[1].StartVerse.Verse,
                Is.EqualTo(6),
                "SB-02: Second section starts at verse 6 (after heading)"
            );
            Assert.That(
                boundaries[1].EndVerse.Verse,
                Is.EqualTo(8),
                "SB-02: Second section ends at verse 8"
            );
            Assert.That(
                boundaries[1].SectionIndex,
                Is.EqualTo(1),
                "SB-02: Second section has index 1"
            );

            // Postcondition: contiguous (section 0 end + 1 == section 1 start)
            Assert.That(
                boundaries[1].StartVerse.Verse,
                Is.EqualTo(boundaries[0].EndVerse.Verse + 1),
                "Postcondition: boundaries must be contiguous"
            );

            // INV-011: Detection via ParagraphStart with style starting 's'
            // Implicitly verified: 2 boundaries found corresponding to 2 's1' ParagraphStart tokens
        });
    }

    #endregion

    #region Contract Tests: Happy Path

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Single section heading at start produces one boundary covering entire chapter")]
    public void GetSectionBoundaries_SingleSection_ReturnsOneBoundary()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(SingleSectionTokens);

        Assert.That(boundaries, Has.Count.EqualTo(1), "Single section = one boundary");
        Assert.That(
            boundaries[0].SectionIndex,
            Is.EqualTo(0),
            "First (and only) section has index 0"
        );
        Assert.That(
            boundaries[0].StartVerse.Verse,
            Is.EqualTo(1),
            "Single section starts at verse 1"
        );
        Assert.That(
            boundaries[0].EndVerse.Verse,
            Is.EqualTo(3),
            "Single section ends at last verse in chapter"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Multiple sections produce correct number of boundaries")]
    public void GetSectionBoundaries_MultipleSections_ReturnsAllBoundaries()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        Assert.That(boundaries, Has.Count.EqualTo(3), "Three section headings = three boundaries");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("First section (index 0) starts at the first verse of the chapter")]
    public void GetSectionBoundaries_FirstSection_StartsAtChapterStart()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        Assert.That(boundaries[0].SectionIndex, Is.EqualTo(0), "Index must be 0");
        Assert.That(
            boundaries[0].StartVerse.Verse,
            Is.EqualTo(1),
            "First section starts at verse 1 (chapter start)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-133")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description(
        "Section index > 0: start verse is heading verse + 1 (excludes heading verse)"
    )]
    public void GetSectionBoundaries_SecondSection_StartsAfterHeading()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        // Second section (index 1) heading is before verse 4
        // Per EXT-053 edge case: start verse incremented by 1 for sectionIndex > 0
        Assert.That(boundaries[1].SectionIndex, Is.EqualTo(1), "Second section has index 1");
        Assert.That(
            boundaries[1].StartVerse.Verse,
            Is.EqualTo(4),
            "Second section starts at verse 4 (after heading, not at heading verse)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Chapter with no section headings: entire chapter is one section")]
    public void GetSectionBoundaries_NoSectionHeadings_EntireChapterIsOneSection()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(NoSectionTokens);

        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "No section headings = one section covering entire chapter"
        );
        Assert.That(
            boundaries[0].StartVerse.Verse,
            Is.EqualTo(1),
            "Starts at verse 1"
        );
        Assert.That(
            boundaries[0].EndVerse.Verse,
            Is.EqualTo(3),
            "Ends at last verse (3)"
        );
        Assert.That(
            boundaries[0].SectionIndex,
            Is.EqualTo(0),
            "Index is 0"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Last section ends at the last verse in the chapter")]
    public void GetSectionBoundaries_LastSection_EndsAtLastVerse()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        var lastBoundary = boundaries[^1];
        Assert.That(
            lastBoundary.EndVerse.Verse,
            Is.EqualTo(9),
            "Last section must end at the last verse in the chapter"
        );
    }

    #endregion

    #region Contract Tests: Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty token list returns empty boundary list")]
    public void GetSectionBoundaries_EmptyTokenList_ReturnsEmptyList()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(
            Array.Empty<MarbleToken>()
        );

        Assert.That(boundaries, Is.Empty, "Empty tokens must return empty boundaries");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Null token list returns empty boundary list")]
    public void GetSectionBoundaries_NullTokenList_ReturnsEmptyList()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(null!);

        Assert.That(boundaries, Is.Empty, "Null tokens must return empty boundaries");
    }

    #endregion

    #region Invariant Tests: INV-011

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("InvariantId", "INV-011")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("INV-011: ParagraphStart with style 's1' is detected as section boundary")]
    public void GetSectionBoundaries_StyleS1_Detected()
    {
        var tokens = BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("s1"),
            TextToken("Heading"),
            ParaEnd("s1"),
            ParaStart("p"),
            Verse("1"),
            TextLink("content"),
            ParaEnd("p")
        );

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "INV-011: 's1' style must be detected as section boundary"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("InvariantId", "INV-011")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("INV-011: ParagraphStart with style 's2' is detected as section boundary")]
    public void GetSectionBoundaries_StyleS2_Detected()
    {
        var tokens = BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("s2"),
            TextToken("Sub Heading"),
            ParaEnd("s2"),
            ParaStart("p"),
            Verse("1"),
            TextLink("content"),
            ParaEnd("p")
        );

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "INV-011: 's2' style must be detected as section boundary"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("InvariantId", "INV-011")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("INV-011: ParagraphStart with style 'sr' (starts with 's') is detected")]
    public void GetSectionBoundaries_StyleSr_Detected()
    {
        var tokens = BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("sr"),
            TextToken("Reference Heading"),
            ParaEnd("sr"),
            ParaStart("p"),
            Verse("1"),
            TextLink("content"),
            ParaEnd("p")
        );

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "INV-011: 'sr' style (starts with 's') must be detected"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("InvariantId", "INV-011")]
    [Property("BehaviorId", "BHV-600")]
    [Description("INV-011: Case-insensitive: uppercase 'S1' style is also detected")]
    public void GetSectionBoundaries_CaseInsensitiveStyleMatch_DetectsUppercaseS()
    {
        var tokens = BuildTokenList(
            Book("GEN"),
            Chapter("1"),
            ParaStart("S1"),
            TextToken("Heading"),
            ParaEnd("S1"),
            ParaStart("p"),
            Verse("1"),
            TextLink("content"),
            ParaEnd("p")
        );

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "INV-011: Case-insensitive check must detect uppercase 'S1'"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("InvariantId", "INV-011")]
    [Property("BehaviorId", "BHV-600")]
    [Description("INV-011: ParagraphStart with style 'p' is NOT a section boundary")]
    public void GetSectionBoundaries_StyleP_NotDetectedAsBoundary()
    {
        // Token list with only 'p' paragraphs, no 's' paragraphs
        var boundaries = MarbleDataParser.GetSectionBoundaries(NoSectionTokens);

        // With no 's' paragraphs, should still get 1 section (the whole chapter)
        // but no section detected via 's' marker -- the single section is the implicit "no heading" case
        Assert.That(
            boundaries,
            Has.Count.EqualTo(1),
            "INV-011: 'p' style must NOT be detected as section boundary marker"
        );
        // The sole boundary covers the whole chapter (no splits by 'p' markers)
        Assert.That(
            boundaries[0].StartVerse.Verse,
            Is.EqualTo(1),
            "Sole section starts at 1"
        );
        Assert.That(
            boundaries[0].EndVerse.Verse,
            Is.EqualTo(3),
            "Sole section ends at 3"
        );
    }

    #endregion

    #region Contract Tests: Postconditions

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Postcondition: boundaries are contiguous (no gaps between sections)")]
    public void GetSectionBoundaries_BoundariesAreContiguous()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        Assert.That(boundaries, Has.Count.GreaterThan(1), "Need multiple boundaries to test");
        for (int i = 1; i < boundaries.Count; i++)
        {
            Assert.That(
                boundaries[i].StartVerse.Verse,
                Is.EqualTo(boundaries[i - 1].EndVerse.Verse + 1),
                $"Section {i} must start immediately after section {i - 1} ends"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Postcondition: boundaries are non-overlapping")]
    public void GetSectionBoundaries_BoundariesAreNonOverlapping()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        for (int i = 1; i < boundaries.Count; i++)
        {
            Assert.That(
                boundaries[i].StartVerse.Verse,
                Is.GreaterThan(boundaries[i - 1].EndVerse.Verse),
                $"Section {i} start must be after section {i - 1} end (no overlap)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Section indexes are sequential starting from 0")]
    public void GetSectionBoundaries_SectionIndexesAreSequential()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        for (int i = 0; i < boundaries.Count; i++)
        {
            Assert.That(
                boundaries[i].SectionIndex,
                Is.EqualTo(i),
                $"Section index must be {i}"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Return type is IReadOnlyList<SectionBoundary> to match contract")]
    public void GetSectionBoundaries_ReturnType_IsIReadOnlyList()
    {
        var result = MarbleDataParser.GetSectionBoundaries(SingleSectionTokens);

        Assert.That(result, Is.InstanceOf<IReadOnlyList<SectionBoundary>>());
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Property("ExtractionId", "EXT-053")]
    [Description("Edge case: consecutive section headings with no content between")]
    public void GetSectionBoundaries_ConsecutiveHeadings_BothDetected()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ConsecutiveHeadingTokens);

        // Two section headings (s1, s2) should produce two boundaries
        // even if there is no verse content between them
        Assert.That(
            boundaries,
            Has.Count.EqualTo(2),
            "Consecutive headings should each create a section boundary"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-133")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description(
        "Edge case: third section (index 2) also has start verse incremented by 1"
    )]
    public void GetSectionBoundaries_ThirdSection_AlsoStartsAfterHeading()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        Assert.That(boundaries[2].SectionIndex, Is.EqualTo(2), "Third section has index 2");
        Assert.That(
            boundaries[2].StartVerse.Verse,
            Is.EqualTo(7),
            "Third section starts at verse 7 (after heading, not at heading verse)"
        );
        Assert.That(
            boundaries[2].EndVerse.Verse,
            Is.EqualTo(9),
            "Third section ends at verse 9"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Tokens with only a Book and Chapter (no verses) return empty boundaries")]
    public void GetSectionBoundaries_NoVerses_ReturnsEmptyBoundaries()
    {
        var tokens = BuildTokenList(
            Book("GEN"),
            Chapter("1")
        );

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.That(
            boundaries,
            Is.Empty,
            "Token list with no verses should produce no boundaries"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("All boundaries have the same book and chapter as the tokens")]
    public void GetSectionBoundaries_BoundaryVerseRefs_HaveCorrectBookAndChapter()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(TwoSectionTokens);

        foreach (var boundary in boundaries)
        {
            Assert.That(
                boundary.StartVerse.Book,
                Is.EqualTo(1),
                $"Section {boundary.SectionIndex}: start book must be GEN (1)"
            );
            Assert.That(
                boundary.StartVerse.Chapter,
                Is.EqualTo(1),
                $"Section {boundary.SectionIndex}: start chapter must be 1"
            );
            Assert.That(
                boundary.EndVerse.Book,
                Is.EqualTo(1),
                $"Section {boundary.SectionIndex}: end book must be GEN (1)"
            );
            Assert.That(
                boundary.EndVerse.Chapter,
                Is.EqualTo(1),
                $"Section {boundary.SectionIndex}: end chapter must be 1"
            );
        }
    }

    #endregion

    #region Golden Master Tests: gm-005

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("InvariantId", "INV-011")]
    [Property("ExtractionId", "EXT-053")]
    [Description("gm-005: Section boundary detection with real-like GEN 1 token data")]
    public void GoldenMaster_Gen1Tokens_CorrectBoundaries()
    {
        // Use the GEN 1 sample XML from CAP-002 which includes an s1 heading
        // This XML has: s1 "The Creation of the World" + p with verses 1-2
        var tokens = MarbleDataParser.ConvertToTokens(Gen1SampleXml);

        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);

        Assert.Multiple(() =>
        {
            // The GEN 1 sample has one section heading (s1) and content through verse 2
            Assert.That(
                boundaries,
                Has.Count.EqualTo(1),
                "GM: GEN 1:1-2 sample has one section heading"
            );
            Assert.That(
                boundaries[0].SectionIndex,
                Is.EqualTo(0),
                "GM: First section index is 0"
            );
            Assert.That(
                boundaries[0].StartVerse.Verse,
                Is.EqualTo(1),
                "GM: Section starts at verse 1"
            );
            Assert.That(
                boundaries[0].EndVerse.Verse,
                Is.EqualTo(2),
                "GM: Section ends at verse 2 (last verse in sample)"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("gm-005: Two-section chapter produces correct verse ranges")]
    public void GoldenMaster_TwoSections_CorrectVerseRanges()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(TwoSectionTokens);

        Assert.Multiple(() =>
        {
            Assert.That(boundaries, Has.Count.EqualTo(2), "GM: Two sections");

            // Section 0: verses 1-5
            Assert.That(
                boundaries[0].StartVerse,
                Is.EqualTo(new VerseReference(1, 1, 1)),
                "GM: Section 0 starts at GEN 1:1"
            );
            Assert.That(
                boundaries[0].EndVerse,
                Is.EqualTo(new VerseReference(1, 1, 5)),
                "GM: Section 0 ends at GEN 1:5"
            );

            // Section 1: verses 6-8
            Assert.That(
                boundaries[1].StartVerse,
                Is.EqualTo(new VerseReference(1, 1, 6)),
                "GM: Section 1 starts at GEN 1:6"
            );
            Assert.That(
                boundaries[1].EndVerse,
                Is.EqualTo(new VerseReference(1, 1, 8)),
                "GM: Section 1 ends at GEN 1:8"
            );
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ExtractionId", "EXT-053")]
    [Description("gm-005: Three-section chapter: all verse ranges correct")]
    public void GoldenMaster_ThreeSections_AllVerseRangesCorrect()
    {
        var boundaries = MarbleDataParser.GetSectionBoundaries(ThreeSectionTokens);

        Assert.Multiple(() =>
        {
            Assert.That(boundaries, Has.Count.EqualTo(3), "GM: Three sections");

            // Section 0: verses 1-3
            Assert.That(
                boundaries[0].StartVerse,
                Is.EqualTo(new VerseReference(1, 1, 1)),
                "GM: Section 0 = GEN 1:1"
            );
            Assert.That(
                boundaries[0].EndVerse,
                Is.EqualTo(new VerseReference(1, 1, 3)),
                "GM: Section 0 ends GEN 1:3"
            );

            // Section 1: verses 4-6
            Assert.That(
                boundaries[1].StartVerse,
                Is.EqualTo(new VerseReference(1, 1, 4)),
                "GM: Section 1 = GEN 1:4"
            );
            Assert.That(
                boundaries[1].EndVerse,
                Is.EqualTo(new VerseReference(1, 1, 6)),
                "GM: Section 1 ends GEN 1:6"
            );

            // Section 2: verses 7-9
            Assert.That(
                boundaries[2].StartVerse,
                Is.EqualTo(new VerseReference(1, 1, 7)),
                "GM: Section 2 = GEN 1:7"
            );
            Assert.That(
                boundaries[2].EndVerse,
                Is.EqualTo(new VerseReference(1, 1, 9)),
                "GM: Section 2 ends GEN 1:9"
            );
        });
    }

    #endregion

    #region Golden Master Reference Data

    // Based on PT9 MarbleDataParserTests.cs sampeleResultGen1 (GEN 1:1-2)
    // Reused from MarbleDataParserTests.cs for integration-level golden master testing
    private const string Gen1SampleXml = """
        <?xml version='1.0' encoding='utf-8'?>
        <EmdrosDump>
        <usx version="2.0">
        <book code="GEN">
        <usx_book style="id" code="GEN">
        <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
        <para style="s1">The Creation of the World</para>
        <para style="p">
        <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
        In the
        <note style="x" caller="+">
        <char style="xo" closed="false">1:1 </char>
        <char style="xt" closed="false">Job 38:4-7</char>
        </note>
        <wg target_links="00100100100004" strong="H7225" thematic_links="" lexical_links="SDBH:a:001001000" textual_links="HOTTP0" image_links="" map_links="" >
        beginning,
        </wg>
        <char style="nd" closed="">
        <wg target_links="00100100100008" strong="H0430" thematic_links="" lexical_links="SDBH:b:001003000" textual_links="HOTTP0" image_links="" map_links="" >
        God
        </wg>
        </char>
        <wg target_links="00100100100006" strong="H1254a" thematic_links="" lexical_links="SDBH:c:001002000" textual_links="HOTTP0" image_links="" map_links="" >
        created
        </wg>
        the
        <wg target_links="00100100100014" strong="H8064" thematic_links="" lexical_links="SDBH:d:001001000;SDBH:d:001001001" textual_links="" image_links="" map_links="" >
        heavens
        </wg>
        and the
        <wg target_links="00100100100022" strong="H0776" thematic_links="" lexical_links="SDBH:e:001001000" textual_links="" image_links="" map_links="" >
        earth.
        </wg>
        <verse chapter="1" style="v" code="GEN" pubnumber="2"/>
        The
        <wg target_links="00100100200006" strong="H0776" thematic_links="" lexical_links="SDBH:f:001001000" textual_links="" image_links="" map_links="" >
        earth
        </wg>
        was
        </para>
        </usx_book>
        </book>
        </usx>
        </EmdrosDump>
        """;

    #endregion
}
