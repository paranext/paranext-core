using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-030: ScriptureRefFormatting (FormatBCVRefs).
/// Validates that BBBCCCVVV reference strings are correctly parsed and converted
/// to human-readable, clickable verse links with versification mapping.
///
/// PT9 Source: Paratext/Marble/EncyclopediaTab.cs:537-584
/// Golden Master: gm-015-scripture-ref-formatting
/// Extraction: EXT-062
///
/// Reference format (BBBCCCVVV):
/// - BBB = 3-digit book number (001=GEN, 002=EXO, ..., 066=REV)
/// - CCC = 3-digit chapter number
/// - VVV = 3-digit verse number
///
/// Extended format (BBBCCCVVVWWWWW, 14 chars):
/// - WWWWW = 5-digit word offset (ignored by FormatBCVRefs, but length accepted)
///
/// Ranges use hyphen separator: BBBCCCVVV-BBBCCCVVV
///
/// Input format: Space-separated BBBCCCVVV strings (PT9 splits on spaces)
///
/// Output format per reference:
///   &lt;a href='goto:{vref.Text}' title='Go To {BookName} {Chapter}:{Verse}'&gt;{displayRef}&lt;/a&gt;
///
/// Multiple references joined by spaces in output.
///
/// Key behaviors:
/// - Leading non-digit character stripped if present (and string length &gt; 9)
/// - Only strings with length &gt;= 9 are processed
/// - BCV int parsed from first 9 chars, mapped from ScrVers.Original to resource versification
/// - Book name from CanonX.BookNumberToName(bookNum)
/// - Within-chapter range: "{startVerse}-{endVerse}"
/// - Cross-chapter range: "{startVerse}-{endChapter}:{endVerse}"
/// - Empty string returned when no valid references found
/// </summary>
[TestFixture]
public class EncyclopediaContentServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-030.
    /// Verifies all gm-015 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - SRF-01: Simple single verse (001001001 -> Gen 1:1)
    /// - SRF-02: Within-chapter range (001001001-001001003 -> Gen 1:1-3)
    /// - SRF-03: Cross-chapter range (001001026-001002003 -> Gen 1:26-2:3)
    /// - SRF-04: NT book reference (040001001 -> Mat 1:1)
    /// - SRF-05: Multiple references (space-separated input -> multiple HTML links)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description(
        "Acceptance test: BBBCCCVVV reference strings converted to clickable verse links"
    )]
    public void FormatBCVRefs_AllGoldenMasterScenarios_Pass()
    {
        var versification = ScrVers.Original;

        Assert.Multiple(() =>
        {
            // SRF-01: Simple single verse (OT)
            var result01 = EncyclopediaContentService.FormatBCVRefs(
                "001001001",
                versification
            );
            Assert.That(
                result01,
                Does.Contain("1:1"),
                "SRF-01: Must contain chapter:verse '1:1'"
            );
            Assert.That(
                result01,
                Does.Contain("<a href='goto:"),
                "SRF-01: Must contain HTML link with goto: scheme"
            );

            // SRF-02: Within-chapter range
            var result02 = EncyclopediaContentService.FormatBCVRefs(
                "001001001-001001003",
                versification
            );
            Assert.That(
                result02,
                Does.Contain("1:1-3"),
                "SRF-02: Within-chapter range must show verse-only end: '1:1-3'"
            );

            // SRF-03: Cross-chapter range
            var result03 = EncyclopediaContentService.FormatBCVRefs(
                "001001026-001002003",
                versification
            );
            Assert.That(
                result03,
                Does.Contain("1:26-2:3"),
                "SRF-03: Cross-chapter range must show chapter:verse end: '1:26-2:3'"
            );

            // SRF-04: NT book reference
            var result04 = EncyclopediaContentService.FormatBCVRefs(
                "040001001",
                versification
            );
            Assert.That(
                result04,
                Does.Contain("1:1"),
                "SRF-04: NT book must contain chapter:verse '1:1'"
            );
            Assert.That(
                result04,
                Does.Contain("<a href='goto:"),
                "SRF-04: NT book must contain HTML link"
            );

            // SRF-05: Multiple references (space-separated)
            var result05 = EncyclopediaContentService.FormatBCVRefs(
                "001001001 040001001",
                versification
            );
            Assert.That(
                result05,
                Does.Contain("</a>"),
                "SRF-05: Multiple refs must contain closing tags"
            );
            // PT9 outputs space-separated links
            var linkCount = System.Text.RegularExpressions.Regex.Matches(
                result05,
                "<a href="
            ).Count;
            Assert.That(
                linkCount,
                Is.EqualTo(2),
                "SRF-05: Multiple refs must produce two HTML links"
            );
        });
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// Golden master test: SRF-01 from gm-015.
    /// Simple single verse reference.
    /// Input: "001001001" (Genesis 1:1)
    /// Expected: HTML link with "Gen 1:1" display text and goto: URL
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description("SRF-01: Simple single verse reference -> Gen 1:1")]
    public void GoldenMaster_SRF01_SingleVerse()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        // PT9 output: <a href='goto:GEN 1:1' title='Go To GEN 1:1'>GEN 1:1</a>
        // Book name comes from CanonX.BookNumberToName(1)
        Assert.That(result, Does.Contain("<a href='goto:"), "Must contain goto: link");
        Assert.That(result, Does.Contain("title='Go To "), "Must contain 'Go To' tooltip");
        Assert.That(result, Does.Contain("1:1"), "Must contain chapter:verse '1:1'");
        Assert.That(result, Does.Contain("</a>"), "Must contain closing tag");
    }

    /// <summary>
    /// Golden master test: SRF-02 from gm-015.
    /// Verse range within same chapter.
    /// Input: "001001001-001001003" (Genesis 1:1-3)
    /// Expected: Within-chapter range shows verse-only end
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description("SRF-02: Within-chapter verse range -> Gen 1:1-3")]
    public void GoldenMaster_SRF02_WithinChapterRange()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001-001001003",
            ScrVers.Original
        );

        // PT9 formats within-chapter range as "{startChapter}:{startVerse}-{endVerse}"
        Assert.That(result, Does.Contain("1:1-3"), "Within-chapter range: '1:1-3'");
        Assert.That(result, Does.Contain("<a href='goto:"), "Must contain goto: link");
    }

    /// <summary>
    /// Golden master test: SRF-03 from gm-015.
    /// Verse range spanning chapters.
    /// Input: "001001026-001002003" (Genesis 1:26 - 2:3)
    /// Expected: Cross-chapter range shows chapter:verse for end
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description("SRF-03: Cross-chapter verse range -> Gen 1:26-2:3")]
    public void GoldenMaster_SRF03_CrossChapterRange()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001026-001002003",
            ScrVers.Original
        );

        // PT9 formats cross-chapter range as "{startChapter}:{startVerse}-{endChapter}:{endVerse}"
        Assert.That(
            result,
            Does.Contain("1:26-2:3"),
            "Cross-chapter range: '1:26-2:3'"
        );
        Assert.That(result, Does.Contain("<a href='goto:"), "Must contain goto: link");
    }

    /// <summary>
    /// Golden master test: SRF-04 from gm-015.
    /// NT book reference (Matthew = book 40).
    /// Input: "040001001" (Matthew 1:1)
    /// Expected: HTML link with NT book name
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description("SRF-04: NT book reference -> Mat 1:1")]
    public void GoldenMaster_SRF04_NTBookReference()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "040001001",
            ScrVers.Original
        );

        // Book 40 = Matthew, CanonX.BookNumberToName(40) returns "MAT" or similar
        Assert.That(result, Does.Contain("1:1"), "Must contain chapter:verse '1:1'");
        Assert.That(result, Does.Contain("<a href='goto:"), "Must contain goto: link");
        Assert.That(result, Is.Not.Empty, "Must not be empty for valid NT reference");
    }

    /// <summary>
    /// Golden master test: SRF-05 from gm-015.
    /// Multiple space-separated references.
    /// Input: "001001001 040001001" (Genesis 1:1, Matthew 1:1)
    /// Expected: Two separate HTML links in output
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-030")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description("SRF-05: Multiple references -> two HTML links")]
    public void GoldenMaster_SRF05_MultipleReferences()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001 040001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(linkCount, Is.EqualTo(2), "Must produce exactly two HTML links");
        Assert.That(
            result,
            Does.Contain("</a> <a"),
            "Links must be space-separated per PT9 output"
        );
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Contract: Single 9-digit BBBCCCVVV string produces one HTML link.
    /// The link must use the goto: URL scheme for verse navigation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Single BBBCCCVVV reference produces one HTML link with goto: scheme")]
    public void FormatBCVRefs_SingleRef_ProducesGotoLink()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "002003004",
            ScrVers.Original
        );

        // EXO 3:4 - must produce a link
        Assert.That(result, Does.Contain("<a href='goto:"), "Must use goto: URL scheme");
        Assert.That(result, Does.Contain("3:4"), "Must contain chapter:verse");
        Assert.That(result, Does.Contain("</a>"), "Must have closing tag");
    }

    /// <summary>
    /// Contract: The HTML link title attribute contains "Go To" followed by the book reference.
    /// PT9 format: title='Go To {BookName} {Chapter}:{Verse}'
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("HTML link contains 'Go To' tooltip with full reference")]
    public void FormatBCVRefs_SingleRef_HasGoToTooltip()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        // PT9: title='Go To GEN 1:1'
        Assert.That(
            result,
            Does.Contain("title='Go To "),
            "Must contain 'Go To' tooltip prefix"
        );
        Assert.That(
            result,
            Does.Contain("1:1'"),
            "Tooltip must contain chapter:verse"
        );
    }

    /// <summary>
    /// Contract: Display text for a single verse shows BookName Chapter:Verse.
    /// The display text is the visible content between the anchor tags.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Display text shows BookName Chapter:Verse format")]
    public void FormatBCVRefs_SingleRef_DisplayShowsBookChapterVerse()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "019023001",
            ScrVers.Original
        );

        // Book 19 = Psalms, Chapter 23, Verse 1
        // CanonX.BookNumberToName(19) should return "PSA" or similar
        Assert.That(result, Does.Contain("23:1"), "Display must contain '23:1'");
        Assert.That(
            result,
            Does.Contain("'>"),
            "Must have display text between '>' and '</a>'"
        );
    }

    /// <summary>
    /// Contract: Within-chapter range displays only the end verse number (no chapter repeat).
    /// PT9 behavior: when range start and end are in same chapter, format is "C:V1-V2".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description(
        "Within-chapter range displays only end verse, no chapter repeat"
    )]
    public void FormatBCVRefs_WithinChapterRange_ShowsVerseOnlyEnd()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001002010-001002015",
            ScrVers.Original
        );

        // GEN 2:10-15 (same chapter, so end shows verse only)
        Assert.That(
            result,
            Does.Contain("2:10-15"),
            "Within-chapter range: chapter:start-end without repeating chapter"
        );
        // Must NOT contain "2:10-2:15" (redundant chapter)
        Assert.That(
            result,
            Does.Not.Contain("2:10-2:15"),
            "Must not repeat chapter number in within-chapter range"
        );
    }

    /// <summary>
    /// Contract: Cross-chapter range displays chapter:verse for both start and end.
    /// PT9 behavior: when chapters differ, format is "C1:V1-C2:V2".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Cross-chapter range displays chapter:verse for end")]
    public void FormatBCVRefs_CrossChapterRange_ShowsChapterVerseEnd()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "023001001-023002010",
            ScrVers.Original
        );

        // ISA 1:1 - 2:10 (different chapters)
        Assert.That(
            result,
            Does.Contain("1:1-2:10"),
            "Cross-chapter range must include end chapter: '1:1-2:10'"
        );
    }

    /// <summary>
    /// Contract: Multiple space-separated references produce space-separated links.
    /// PT9 appends each link with a trailing space, then removes the last space.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Multiple references produce space-separated HTML links")]
    public void FormatBCVRefs_MultipleRefs_SpaceSeparatedLinks()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001 002001001 003001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(linkCount, Is.EqualTo(3), "Three refs must produce three links");

        // No trailing space (PT9 removes last space)
        Assert.That(
            result,
            Does.Not.EndWith(" "),
            "Output must not end with trailing space"
        );
    }

    /// <summary>
    /// Contract: The goto: URL contains the VerseRef.Text representation.
    /// PT9 uses: href='goto:{vref.Text}'
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Link href contains goto: followed by VerseRef.Text")]
    public void FormatBCVRefs_SingleRef_GotoUrlContainsVerseRefText()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        // VerseRef(1,1,1).Text produces something like "GEN 1:1"
        // The href should be: goto:GEN 1:1
        Assert.That(
            result,
            Does.Match(@"href='goto:[^']+\d+:\d+'"),
            "goto: URL must contain verse reference text with chapter:verse"
        );
    }

    /// <summary>
    /// Contract: Versification mapping is applied to the BCV reference.
    /// A VerseRef created with ScrVers.Original is mapped to the resource versification.
    /// With ScrVers.Original, mapping is identity (no change).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Versification mapping applied via ChangeVersification")]
    public void FormatBCVRefs_WithOriginalVersification_IdentityMapping()
    {
        // Using ScrVers.Original should produce identity mapping
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        // GEN 1:1 with Original versification should remain GEN 1:1
        Assert.That(result, Does.Contain("1:1"), "Identity versification preserves reference");
    }

    #endregion

    #region Contract Tests - Edge Cases

    /// <summary>
    /// Edge case: Empty string input returns empty string.
    /// PT9 returns "" when refstr.Length == 0 (no valid refs found).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Empty string input returns empty string")]
    public void FormatBCVRefs_EmptyInput_ReturnsEmptyString()
    {
        var result = EncyclopediaContentService.FormatBCVRefs("", ScrVers.Original);

        Assert.That(result, Is.EqualTo(""), "Empty input must return empty string");
    }

    /// <summary>
    /// Edge case: Whitespace-only input returns empty string.
    /// Split on spaces with RemoveEmptyEntries produces no entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Whitespace-only input returns empty string")]
    public void FormatBCVRefs_WhitespaceInput_ReturnsEmptyString()
    {
        var result = EncyclopediaContentService.FormatBCVRefs("   ", ScrVers.Original);

        Assert.That(result, Is.EqualTo(""), "Whitespace input must return empty string");
    }

    /// <summary>
    /// Edge case: String shorter than 9 characters is skipped.
    /// PT9 filters: Where(s => s.Length >= 9)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Strings shorter than 9 chars are skipped")]
    public void FormatBCVRefs_ShortString_ReturnsEmptyString()
    {
        var result = EncyclopediaContentService.FormatBCVRefs("12345678", ScrVers.Original);

        Assert.That(
            result,
            Is.EqualTo(""),
            "8-char string (less than 9) must be skipped"
        );
    }

    /// <summary>
    /// Edge case: Non-numeric 9-char string is skipped.
    /// PT9: int.TryParse(verseStr.Substring(0, 9), out var bcv) fails.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Non-numeric BBBCCCVVV string is skipped")]
    public void FormatBCVRefs_NonNumericString_ReturnsEmptyString()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "abcdefghi",
            ScrVers.Original
        );

        Assert.That(
            result,
            Is.EqualTo(""),
            "Non-numeric 9-char string must return empty"
        );
    }

    /// <summary>
    /// Edge case: Leading non-digit character is stripped when string length > 9.
    /// PT9: if (!char.IsDigit(s[0]) && s.Length > 9) verseStr = s.Substring(1)
    /// This handles encyclopedia markup prefixes like punctuation before references.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Leading non-digit character stripped when length > 9")]
    public void FormatBCVRefs_LeadingNonDigitPrefix_StrippedAndParsed()
    {
        // "(001001001" is length 10, leading '(' is non-digit, so stripped -> "001001001"
        var result = EncyclopediaContentService.FormatBCVRefs(
            "(001001001",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Contain("1:1"),
            "Leading non-digit stripped, valid ref parsed: '1:1'"
        );
        Assert.That(
            result,
            Does.Contain("<a href='goto:"),
            "Must produce valid HTML link after stripping prefix"
        );
    }

    /// <summary>
    /// Edge case: Exactly 9-digit string with leading non-digit is NOT stripped.
    /// PT9: condition is s.Length > 9 for prefix stripping. At length 9, no stripping.
    /// A 9-char string starting with non-digit fails int.TryParse and is skipped.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("9-char string with leading non-digit is NOT stripped - fails parse")]
    public void FormatBCVRefs_NineCharWithLeadingNonDigit_Skipped()
    {
        // "(01001001" is exactly 9 chars but starts with '(' -- no stripping at length 9
        var result = EncyclopediaContentService.FormatBCVRefs(
            "(01001001",
            ScrVers.Original
        );

        Assert.That(
            result,
            Is.EqualTo(""),
            "9-char string with non-digit prefix must be skipped (no stripping)"
        );
    }

    /// <summary>
    /// Edge case: 14-character extended format (BBBCCCVVVWWWWW) is accepted.
    /// PT9: (verseStr.Length != 9 && verseStr.Length != 14) -> skip
    /// 14-char strings parse the first 9 chars as BCV.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("14-char BBBCCCVVVWWWWW format accepted and parsed")]
    public void FormatBCVRefs_FourteenCharFormat_Accepted()
    {
        // 001001001 + 00001 word offset = "00100100100001" (14 chars)
        var result = EncyclopediaContentService.FormatBCVRefs(
            "00100100100001",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Contain("1:1"),
            "14-char format must parse first 9 chars as BCV"
        );
        Assert.That(
            result,
            Does.Contain("<a href='goto:"),
            "14-char format must produce valid HTML link"
        );
    }

    /// <summary>
    /// Edge case: String with length != 9 and != 14 is skipped.
    /// PT9: (verseStr.Length != 9 && verseStr.Length != 14) -> continue
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("String with length != 9 and != 14 is skipped")]
    public void FormatBCVRefs_InvalidLength_Skipped()
    {
        // 10 chars (not 9 or 14), no leading non-digit -> length stays at 10
        // Actually with 10 digits, the leading char IS digit, so no stripping
        var result = EncyclopediaContentService.FormatBCVRefs(
            "0010010011",
            ScrVers.Original
        );

        Assert.That(
            result,
            Is.EqualTo(""),
            "10-digit string (neither 9 nor 14) must be skipped"
        );
    }

    /// <summary>
    /// Edge case: Leading non-digit character on range end is also stripped.
    /// PT9: rangeRefStr = !char.IsDigit(rangeRefStr[0]) ? rangeRefStr.Substring(1) : rangeRefStr
    /// This handles cases like "001001001-)001001003".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Leading non-digit on range end is stripped")]
    public void FormatBCVRefs_RangeEndWithNonDigitPrefix_StrippedAndParsed()
    {
        // Range end has a leading non-digit that gets stripped
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001-)001001003",
            ScrVers.Original
        );

        // After stripping ')' from range end, should parse "001001003"
        Assert.That(
            result,
            Does.Contain("1:1-3"),
            "Range end non-digit stripped, within-chapter range formatted"
        );
    }

    /// <summary>
    /// Edge case: Mixed valid and invalid references in input.
    /// Only valid references produce links; invalid ones are silently skipped.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Mixed valid and invalid references: only valid ones produce links")]
    public void FormatBCVRefs_MixedValidInvalid_OnlyValidProduceLinks()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001 invalid 040001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(
            linkCount,
            Is.EqualTo(2),
            "Only two valid refs should produce links; 'invalid' is skipped"
        );
    }

    /// <summary>
    /// Edge case: Range with invalid end reference (too short) produces single link without range.
    /// PT9: rangeRefStr checked for length 9 or 14 before parsing end.
    /// If invalid, the start reference is still formatted (without range suffix).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Range with invalid end ref: start still formatted without range")]
    public void FormatBCVRefs_InvalidRangeEnd_StartStillFormatted()
    {
        // "001001001-short" -- range end "short" is too short (5 chars)
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001-short",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Contain("1:1"),
            "Start reference must still be formatted"
        );
        Assert.That(
            result,
            Does.Not.Contain("-"),
            "Invalid range end means no range suffix in display"
        );
    }

    /// <summary>
    /// Edge case: OT book number boundaries.
    /// Book 1 (Genesis) and Book 39 (Malachi) are OT extremes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("OT boundary books (Genesis and Malachi) produce valid links")]
    public void FormatBCVRefs_OTBoundaryBooks_ProduceValidLinks()
    {
        // Book 001 = Genesis, Book 039 = Malachi
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001 039001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(
            linkCount,
            Is.EqualTo(2),
            "Both OT boundary books must produce valid links"
        );
    }

    /// <summary>
    /// Edge case: NT book number boundaries.
    /// Book 40 (Matthew) and Book 66 (Revelation) are NT extremes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("NT boundary books (Matthew and Revelation) produce valid links")]
    public void FormatBCVRefs_NTBoundaryBooks_ProduceValidLinks()
    {
        // Book 040 = Matthew, Book 066 = Revelation
        var result = EncyclopediaContentService.FormatBCVRefs(
            "040001001 066001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(
            linkCount,
            Is.EqualTo(2),
            "Both NT boundary books must produce valid links"
        );
    }

    /// <summary>
    /// Edge case: Range spanning from verse 1 to a later verse in same chapter.
    /// Verifies the basic within-chapter range pattern.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Range from verse 1 to later verse in same chapter")]
    public void FormatBCVRefs_RangeVerse1ToLater_WithinChapterFormat()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "043003016-043003018",
            ScrVers.Original
        );

        // JHN 3:16-18 (same chapter)
        Assert.That(
            result,
            Does.Contain("3:16-18"),
            "JHN 3:16-18 within-chapter range"
        );
    }

    /// <summary>
    /// Edge case: Range with 14-char start and 14-char end.
    /// Both start and end have word offsets but only first 9 chars matter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Range with 14-char start and end: word offsets ignored")]
    public void FormatBCVRefs_FourteenCharRange_WordOffsetsIgnored()
    {
        // GEN 1:1 (word 00001) - GEN 1:3 (word 00002)
        var result = EncyclopediaContentService.FormatBCVRefs(
            "00100100100001-00100100300002",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Contain("1:1-3"),
            "14-char range: word offsets ignored, produces within-chapter range"
        );
    }

    /// <summary>
    /// Edge case: Hyphen at the very end with no range reference after it.
    /// PT9: hyphenIndex > 0 but rangeRefStr would be empty.
    /// This edge case should not crash -- the empty range string is too short.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Trailing hyphen with no range end: does not crash")]
    public void FormatBCVRefs_TrailingHyphen_DoesNotCrash()
    {
        // "001001001-" has a hyphen at the end
        // rangeRefStr will be empty string, which has length < 9
        // So the start reference should still be formatted without range
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001-",
            ScrVers.Original
        );

        // Should produce link for start ref without range
        Assert.That(
            result,
            Does.Contain("1:1"),
            "Start ref must still be formatted when range end is empty"
        );
    }

    /// <summary>
    /// Edge case: Book 0 (invalid book number) should be handled gracefully.
    /// BCV "000001001" would be book 0 which is not a valid book.
    /// CanonX.BookNumberToName(0) behavior determines output.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Book number 0 is handled gracefully")]
    public void FormatBCVRefs_BookZero_HandledGracefully()
    {
        // Book 000 is not a valid book
        // PT9 would create VerseRef(0, 1, 1) which may produce empty/unknown name
        // The method should not throw
        Assert.DoesNotThrow(
            () =>
                EncyclopediaContentService.FormatBCVRefs("000001001", ScrVers.Original),
            "Book 0 must not throw an exception"
        );
    }

    /// <summary>
    /// Edge case: All-zero BCV (000000000) should not crash.
    /// This is a degenerate case that should produce either empty or a graceful result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("All-zero BCV does not crash")]
    public void FormatBCVRefs_AllZeroBCV_DoesNotCrash()
    {
        Assert.DoesNotThrow(
            () =>
                EncyclopediaContentService.FormatBCVRefs("000000000", ScrVers.Original),
            "All-zero BCV must not throw"
        );
    }

    /// <summary>
    /// Edge case: Multiple consecutive spaces in input are handled.
    /// PT9 uses StringSplitOptions.RemoveEmptyEntries so extra spaces are ignored.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Multiple consecutive spaces in input are handled correctly")]
    public void FormatBCVRefs_ConsecutiveSpaces_HandledCorrectly()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001   040001001",
            ScrVers.Original
        );

        var linkCount = System.Text.RegularExpressions.Regex.Matches(
            result,
            "<a href="
        ).Count;
        Assert.That(
            linkCount,
            Is.EqualTo(2),
            "Consecutive spaces must not produce empty entries"
        );
    }

    #endregion

    #region Contract Tests - HTML Output Structure

    /// <summary>
    /// Contract: HTML output follows exact PT9 format.
    /// Format: &lt;a href='goto:{vref}' title='Go To {longref}'&gt;{display}&lt;/a&gt;
    /// Uses single quotes in attributes (PT9 pattern).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("HTML uses single-quote attributes per PT9 format")]
    public void FormatBCVRefs_HtmlFormat_UsesSingleQuoteAttributes()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        // PT9 uses: string.Format("<a href='{0}' title='{1}'>{2}</a>", ...)
        Assert.That(
            result,
            Does.Match(@"<a href='[^']+' title='[^']+'>[^<]+</a>"),
            "HTML must use single-quote attributes in anchor tag"
        );
    }

    /// <summary>
    /// Contract: No trailing space in final output.
    /// PT9: refstr.Length -= 1 removes the last space.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("No trailing space in output")]
    public void FormatBCVRefs_SingleRef_NoTrailingSpace()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Not.EndWith(" "),
            "Output must not end with trailing space"
        );
    }

    /// <summary>
    /// Contract: Link href starts with 'goto:' prefix for verse navigation.
    /// This is the URL scheme used by the ER scripture pane for navigation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-030")]
    [Property("ScenarioId", "TS-161")]
    [Property("BehaviorId", "BHV-414")]
    [Description("Link href uses 'goto:' prefix")]
    public void FormatBCVRefs_LinkHref_UsesGotoPrefix()
    {
        var result = EncyclopediaContentService.FormatBCVRefs(
            "001001001",
            ScrVers.Original
        );

        Assert.That(
            result,
            Does.Contain("href='goto:"),
            "Link must use 'goto:' URL scheme"
        );
    }

    #endregion
}
