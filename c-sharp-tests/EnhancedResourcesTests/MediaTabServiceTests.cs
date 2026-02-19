using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-018: ImageMatchesVerseRange.
/// Validates that image reference range strings in BBBCCCVVV format are correctly matched
/// against verse reference queries. The function is a pure stateless operation used by
/// the Media and Maps tab loading pipelines (CAP-011, CAP-012) to determine which images
/// are relevant to the current verse context.
///
/// PT9 Source: Paratext/Marble/MarbleImageData.cs:95-150
/// Golden Master: gm-010-image-range-matching
/// Extraction: EXT-064
///
/// Reference format (BBBCCCVVV):
/// - BBB = 3-digit book number (001=GEN, 002=EXO, ..., 066=REV)
/// - CCC = 3-digit chapter number (000 = whole book sentinel)
/// - VVV = 3-digit verse number (000 = whole chapter sentinel)
///
/// Spanning ranges use hyphen separator: BBBCCCVVV-BBBCCCVVV
///
/// Special cases:
/// - CCC=000: Image applies to entire book (matches any verse in that book)
/// - VVV=000: Image applies to entire chapter (matches any verse in that chapter)
/// - Hyphenated range: Numeric overlap detection between image range and query verse
/// </summary>
[TestFixture]
public class MediaTabServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-018.
    /// Verifies all gm-010 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - IRM-01: Whole-book reference (001000000) matches GEN 1:1-1:31
    /// - IRM-02: Whole-chapter reference (001001000) matches GEN 1:1-1:31
    /// - IRM-03: Spanning range (001001026-001002003) matches GEN 2:1
    /// - IRM-04: Non-overlapping reference (001001001) does not match GEN 2:1
    /// - IRM-05: Different book (002001001) does not match GEN 1:1-50:26
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description(
        "Acceptance test: Image reference ranges correctly matched against verse ranges"
    )]
    public void ImageMatchesVerseRange_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // IRM-01: Whole-book reference (chapter=0) matches any verse in the book
            Assert.That(
                MediaTabService.ImageMatchesVerseRange(
                    "001000000",
                    new VerseReference(1, 1, 1)
                ),
                Is.True,
                "IRM-01: Whole-book reference (001000000) must match GEN 1:1"
            );

            // IRM-02: Whole-chapter reference (verse=0) matches any verse in the chapter
            Assert.That(
                MediaTabService.ImageMatchesVerseRange(
                    "001001000",
                    new VerseReference(1, 1, 1)
                ),
                Is.True,
                "IRM-02: Whole-chapter reference (001001000) must match GEN 1:1"
            );

            // IRM-03: Spanning range overlaps query
            Assert.That(
                MediaTabService.ImageMatchesVerseRange(
                    "001001026-001002003",
                    new VerseReference(1, 2, 1)
                ),
                Is.True,
                "IRM-03: Spanning range (001001026-001002003) must match GEN 2:1"
            );

            // IRM-04: Non-overlapping reference
            Assert.That(
                MediaTabService.ImageMatchesVerseRange(
                    "001001001",
                    new VerseReference(1, 2, 1)
                ),
                Is.False,
                "IRM-04: Non-overlapping reference (001001001) must NOT match GEN 2:1"
            );

            // IRM-05: Different book
            Assert.That(
                MediaTabService.ImageMatchesVerseRange(
                    "002001001",
                    new VerseReference(1, 1, 1)
                ),
                Is.False,
                "IRM-05: Different book (002001001=EXO) must NOT match GEN 1:1"
            );
        });
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// Golden master test: IRM-01 from gm-010.
    /// Whole-book reference (chapter=0) matches any verse in the book.
    /// Input: imageRef="001000000", query=GEN 1:1
    /// Expected: true
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("IRM-01: Whole-book reference (chapter=0) matches any verse in the book")]
    public void GoldenMaster_IRM01_WholeBookReference()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "001000000",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.True, "IRM-01 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: IRM-02 from gm-010.
    /// Whole-chapter reference (verse=0) matches any verse in the chapter.
    /// Input: imageRef="001001000", query=GEN 1:1
    /// Expected: true
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-150")]
    [Description("IRM-02: Whole-chapter reference (verse=0) matches any verse in chapter")]
    public void GoldenMaster_IRM02_WholeChapterReference()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001000",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.True, "IRM-02 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: IRM-03 from gm-010.
    /// Spanning range (GEN 1:26 - GEN 2:3) overlaps with query (GEN 2:1).
    /// Input: imageRef="001001026-001002003", query=GEN 2:1
    /// Expected: true
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-151")]
    [Description("IRM-03: Spanning range overlaps query verse")]
    public void GoldenMaster_IRM03_SpanningRangeOverlap()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001026-001002003",
            new VerseReference(1, 2, 1)
        );

        Assert.That(result, Is.True, "IRM-03 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: IRM-04 from gm-010.
    /// Non-overlapping reference (GEN 1:1) does not match query (GEN 2:1).
    /// Input: imageRef="001001001", query=GEN 2:1
    /// Expected: false
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("IRM-04: Non-overlapping reference does not match query")]
    public void GoldenMaster_IRM04_NonOverlappingReference()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001001",
            new VerseReference(1, 2, 1)
        );

        Assert.That(result, Is.False, "IRM-04 golden master mismatch");
    }

    /// <summary>
    /// Golden master test: IRM-05 from gm-010.
    /// Different books (EXO vs GEN) never match.
    /// Input: imageRef="002001001" (EXO 1:1), query=GEN 1:1
    /// Expected: false
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-018")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("IRM-05: Different books never match")]
    public void GoldenMaster_IRM05_DifferentBook()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "002001001",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.False, "IRM-05 golden master mismatch");
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Contract: Whole-book reference (CCC=000) matches any verse in that book.
    /// When a BBBCCCVVV reference has chapter=000, it is a sentinel for "entire book".
    /// Any query verse in the same book must return true, regardless of chapter or verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-book reference matches any verse in the same book")]
    public void ImageMatchesVerseRange_WholeBookRef_MatchesAnyVerseInBook()
    {
        // 001000000 = GEN, entire book
        // Query = GEN 50:26 (last verse of Genesis)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001000000",
            new VerseReference(1, 50, 26)
        );

        Assert.That(result, Is.True, "Whole-book ref must match any verse in the book");
    }

    /// <summary>
    /// Contract: Whole-chapter reference (VVV=000) matches any verse in that chapter.
    /// When a BBBCCCVVV reference has verse=000, it is a sentinel for "entire chapter".
    /// Any query verse in the same book and chapter must return true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-150")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-chapter reference matches any verse in the same chapter")]
    public void ImageMatchesVerseRange_WholeChapterRef_MatchesAnyVerseInChapter()
    {
        // 001003000 = GEN chapter 3, entire chapter
        // Query = GEN 3:15
        var result = MediaTabService.ImageMatchesVerseRange(
            "001003000",
            new VerseReference(1, 3, 15)
        );

        Assert.That(result, Is.True, "Whole-chapter ref must match any verse in the chapter");
    }

    /// <summary>
    /// Contract: Spanning range with hyphen matches a verse within the range.
    /// BBBCCCVVV-BBBCCCVVV format uses numeric comparison for overlap detection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Spanning range matches verse within the range")]
    public void ImageMatchesVerseRange_SpanningRange_MatchesVerseInRange()
    {
        // Range: GEN 2:4 - GEN 3:24
        // Query: GEN 3:1 (within range)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001002004-001003024",
            new VerseReference(1, 3, 1)
        );

        Assert.That(result, Is.True, "Spanning range must match verse within the range");
    }

    /// <summary>
    /// Contract: Exact verse match returns true.
    /// A single 9-digit BBBCCCVVV reference matches exactly that verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Exact verse reference matches the same verse")]
    public void ImageMatchesVerseRange_ExactVerseMatch_ReturnsTrue()
    {
        // 001005010 = GEN 5:10
        // Query = GEN 5:10
        var result = MediaTabService.ImageMatchesVerseRange(
            "001005010",
            new VerseReference(1, 5, 10)
        );

        Assert.That(result, Is.True, "Exact verse match must return true");
    }

    /// <summary>
    /// Contract: Different book always returns false.
    /// No image reference in one book can match a query verse in a different book.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Different book always returns false")]
    public void ImageMatchesVerseRange_DifferentBook_ReturnsFalse()
    {
        // 040001001 = MAT 1:1
        // Query = GEN 1:1
        var result = MediaTabService.ImageMatchesVerseRange(
            "040001001",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.False, "Different book must return false");
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Edge case: Empty string input should return false (pure function, no exceptions).
    /// Per data-contracts.md: "returns false for malformed range strings."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Empty string returns false")]
    public void ImageMatchesVerseRange_EmptyString_ReturnsFalse()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.False, "Empty string must return false");
    }

    /// <summary>
    /// Edge case: Malformed (non-numeric) range string returns false.
    /// Per data-contracts.md: "returns false for malformed range strings."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Malformed non-numeric range returns false")]
    public void ImageMatchesVerseRange_MalformedRange_ReturnsFalse()
    {
        var result = MediaTabService.ImageMatchesVerseRange(
            "not-a-number",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.False, "Malformed range must return false");
    }

    /// <summary>
    /// Edge case: Whole-book reference for a different book returns false.
    /// Even though CCC=000 means "entire book", the book number must match.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-book ref for different book returns false")]
    public void ImageMatchesVerseRange_WholeBookRef_DifferentBook_ReturnsFalse()
    {
        // 002000000 = EXO, entire book
        // Query = GEN 1:1
        var result = MediaTabService.ImageMatchesVerseRange(
            "002000000",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.False, "Whole-book ref for different book must return false");
    }

    /// <summary>
    /// Edge case: Whole-chapter reference for a different chapter returns false.
    /// CCC must match the query chapter for VVV=000 sentinel to apply.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-150")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-chapter ref for different chapter returns false")]
    public void ImageMatchesVerseRange_WholeChapterRef_DifferentChapter_ReturnsFalse()
    {
        // 001002000 = GEN chapter 2, entire chapter
        // Query = GEN 1:5
        var result = MediaTabService.ImageMatchesVerseRange(
            "001002000",
            new VerseReference(1, 1, 5)
        );

        Assert.That(
            result,
            Is.False,
            "Whole-chapter ref for different chapter must return false"
        );
    }

    /// <summary>
    /// Edge case: Spanning range where query verse is before the range start.
    /// Numeric comparison: query BBBCCCVVV less than range start.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Query before spanning range start returns false")]
    public void ImageMatchesVerseRange_SpanningRange_QueryBeforeRange_ReturnsFalse()
    {
        // Range: GEN 5:1 - GEN 5:20
        // Query: GEN 4:26 (before range)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001005001-001005020",
            new VerseReference(1, 4, 26)
        );

        Assert.That(result, Is.False, "Query before range start must return false");
    }

    /// <summary>
    /// Edge case: Spanning range where query verse is after the range end.
    /// Numeric comparison: query BBBCCCVVV greater than range end.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Query after spanning range end returns false")]
    public void ImageMatchesVerseRange_SpanningRange_QueryAfterRange_ReturnsFalse()
    {
        // Range: GEN 5:1 - GEN 5:20
        // Query: GEN 5:21 (after range)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001005001-001005020",
            new VerseReference(1, 5, 21)
        );

        Assert.That(result, Is.False, "Query after range end must return false");
    }

    /// <summary>
    /// Edge case: Spanning range boundary -- query is exactly at range start.
    /// Inclusive comparison: start <= query <= end.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Query at spanning range start (inclusive boundary) returns true")]
    public void ImageMatchesVerseRange_SpanningRange_QueryAtRangeStart_ReturnsTrue()
    {
        // Range: GEN 10:1 - GEN 10:32
        // Query: GEN 10:1 (exactly at start)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001010001-001010032",
            new VerseReference(1, 10, 1)
        );

        Assert.That(result, Is.True, "Query at range start must return true (inclusive)");
    }

    /// <summary>
    /// Edge case: Spanning range boundary -- query is exactly at range end.
    /// Inclusive comparison: start <= query <= end.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Query at spanning range end (inclusive boundary) returns true")]
    public void ImageMatchesVerseRange_SpanningRange_QueryAtRangeEnd_ReturnsTrue()
    {
        // Range: GEN 10:1 - GEN 10:32
        // Query: GEN 10:32 (exactly at end)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001010001-001010032",
            new VerseReference(1, 10, 32)
        );

        Assert.That(result, Is.True, "Query at range end must return true (inclusive)");
    }

    /// <summary>
    /// Edge case: Single verse reference (9-digit, no hyphen) matches exact verse.
    /// A single BBBCCCVVV acts as a range of exactly one verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Single verse ref matches exactly that verse")]
    public void ImageMatchesVerseRange_SingleVerse_ExactMatch_ReturnsTrue()
    {
        // 001001001 = GEN 1:1
        // Query = GEN 1:1
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001001",
            new VerseReference(1, 1, 1)
        );

        Assert.That(result, Is.True, "Single verse ref must match exactly that verse");
    }

    /// <summary>
    /// Edge case: Single verse reference off by one verse does not match.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-149")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Single verse ref off by one verse returns false")]
    public void ImageMatchesVerseRange_SingleVerse_OffByOneVerse_ReturnsFalse()
    {
        // 001001001 = GEN 1:1
        // Query = GEN 1:2 (off by one verse)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001001",
            new VerseReference(1, 1, 2)
        );

        Assert.That(result, Is.False, "Single verse ref must not match off-by-one verse");
    }

    /// <summary>
    /// Edge case: Whole-chapter reference matches verse 1 of that chapter.
    /// Verifies the lower boundary of chapter scope.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-150")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-chapter ref matches verse 1 of that chapter")]
    public void ImageMatchesVerseRange_WholeChapterRef_MatchesVerse1OfChapter()
    {
        // 001010000 = GEN chapter 10, entire chapter
        // Query = GEN 10:1
        var result = MediaTabService.ImageMatchesVerseRange(
            "001010000",
            new VerseReference(1, 10, 1)
        );

        Assert.That(result, Is.True, "Whole-chapter ref must match verse 1 of the chapter");
    }

    /// <summary>
    /// Edge case: Whole-chapter reference matches a high verse number in that chapter.
    /// Verifies the upper boundary of chapter scope.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-150")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Whole-chapter ref matches high verse number in the chapter")]
    public void ImageMatchesVerseRange_WholeChapterRef_MatchesLastVerseOfChapter()
    {
        // 019119000 = PSA chapter 119, entire chapter
        // Query = PSA 119:176 (the longest chapter in the Bible)
        var result = MediaTabService.ImageMatchesVerseRange(
            "019119000",
            new VerseReference(19, 119, 176)
        );

        Assert.That(
            result,
            Is.True,
            "Whole-chapter ref must match high verse number in the chapter"
        );
    }

    /// <summary>
    /// Edge case: Spanning range that crosses chapter boundaries matches a verse
    /// in between. Verifies multi-chapter range handling.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-151")]
    [Property("BehaviorId", "BHV-415")]
    [Description("Cross-chapter spanning range matches verse in between")]
    public void ImageMatchesVerseRange_SpanningRange_CrossChapter_MatchesInBetween()
    {
        // Range: GEN 1:20 - GEN 3:5 (crosses chapter boundary)
        // Query: GEN 2:15 (in the middle)
        var result = MediaTabService.ImageMatchesVerseRange(
            "001001020-001003005",
            new VerseReference(1, 2, 15)
        );

        Assert.That(
            result,
            Is.True,
            "Cross-chapter spanning range must match verse in between"
        );
    }

    #endregion
}
