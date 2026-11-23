using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MarbleImageData - Image reference range matching and language selection.
/// CAP-004: GetImagesForReference
///
/// Behaviors: BHV-612 (Image Reference Range Matching), BHV-452 (Media Viewer Navigation)
/// Contract: Section 4.4 M-004, Section 2.4 ImageReferenceInput, Section 3.4 ImageReferenceResult
/// Source: EXT-009 (MarbleImageData - Image Reference Range Matching)
/// Invariant: VAL-007 (Image Reference Range)
///
/// MarbleImageData.GetForReferenceRange matches images to verse references at three levels:
///   - Book level: image spanning an entire book matches any verse in that book
///   - Chapter level: image spanning a chapter matches any verse in that chapter
///   - Verse level: image spanning specific verses matches overlapping queries
///
/// Images are grouped by StartRef, EndRef, and ImageData.
/// GetBestLanguageCode defaults to English when the user's language is unavailable.
///
/// Golden masters:
///   gm-012: Book-spanning reference matching (1CO entire book) with 4 queries
///   gm-013: Multi-reference image matching (1CO 13:1-36 + ACT 2:0-5:0) with 7 queries
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleImageDataTests
{
    #region Acceptance Tests (Golden Masters)

    // -------------------------------------------------------------------------
    // gm-012: Book-spanning reference range matching
    // Image "one" has reference 04600000000000 (1CO entire book).
    // 4 queries: before book (ROM), overlapping start (ROM-1CO 1:0),
    // within book (1CO 1:0-1:2), after book (2CO 3:0-3 last).
    // Expected: no match, match, match, no match.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-012")]
    [Description(
        "gm-012 query 1: ROM range does not match image spanning 1CO - before book, no match"
    )]
    public void GetForReferenceRange_BeforeBook_NoMatch()
    {
        // Arrange: image "one" spans entire 1CO (book 46)
        var images = CreateBookSpanningImage("one", bookNum: 46);

        // Query: ROM 1:1 to ROM last (book 45) - entirely before 1CO
        var startRef = new VerseRef(45, 1, 1);
        var endRef = new VerseRef(45, 16, 27); // ROM last chapter/verse

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: no match per gm-012 expected output
        Assert.That(result, Is.Empty, "gm-012 query 1: ROM range should not match 1CO image");
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-012")]
    [Description("gm-012 query 2: ROM 1:1 to 1CO 1:0 overlaps start of 1CO - matches")]
    public void GetForReferenceRange_OverlapsBookStart_Matches()
    {
        // Arrange: image "one" spans entire 1CO (book 46)
        var images = CreateBookSpanningImage("one", bookNum: 46);

        // Query: ROM 1:1 to 1CO 1:0 - overlaps start of 1CO
        var startRef = new VerseRef(45, 1, 1);
        var endRef = new VerseRef(46, 1, 0);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-012 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-012 query 2: overlap with 1CO start should match"
        );
        Assert.That(result[0].ImageId, Is.EqualTo("one"));
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-012")]
    [Description("gm-012 query 3: 1CO 1:0 to 1CO 1:2 is within book - matches")]
    public void GetForReferenceRange_WithinBook_Matches()
    {
        // Arrange: image "one" spans entire 1CO (book 46)
        var images = CreateBookSpanningImage("one", bookNum: 46);

        // Query: 1CO 1:0 to 1CO 1:2 - within the book
        var startRef = new VerseRef(46, 1, 0);
        var endRef = new VerseRef(46, 1, 2);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-012 expected output
        Assert.That(result, Has.Count.EqualTo(1), "gm-012 query 3: range within 1CO should match");
        Assert.That(result[0].ImageId, Is.EqualTo("one"));
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-012")]
    [Description("gm-012 query 4: 2CO 3:0 to 2CO 3 last is after book - no match")]
    public void GetForReferenceRange_AfterBook_NoMatch()
    {
        // Arrange: image "one" spans entire 1CO (book 46)
        var images = CreateBookSpanningImage("one", bookNum: 46);

        // Query: 2CO 3:0 to 2CO 3 last (book 47) - entirely after 1CO
        var startRef = new VerseRef(47, 3, 0);
        var endRef = new VerseRef(47, 3, 18); // 2CO 3 last verse

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: no match per gm-012 expected output
        Assert.That(result, Is.Empty, "gm-012 query 4: 2CO range should not match 1CO image");
    }

    // -------------------------------------------------------------------------
    // gm-013: Multi-reference image matching with chapter range
    // Image "one" has two references:
    //   - 04601300100036 (1CO 13:1-36, a verse-level reference)
    //   - 04400200000000-04400500000000 (ACT 2:0 to ACT 5:0, a chapter range)
    // 7 queries testing before, at start, within, mid-range, spanning, at end, after.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 1: ACT 1:1 to ACT 1 last - before range, no match")]
    public void GetForReferenceRange_MultiRef_BeforeRange_NoMatch()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 1:1 to ACT 1 last - before the range
        var startRef = new VerseRef(44, 1, 1);
        var endRef = new VerseRef(44, 1, 26); // ACT 1 last verse

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: no match per gm-013 expected output
        Assert.That(result, Is.Empty, "gm-013 query 1: ACT 1 should not match ACT 2-5 range");
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 2: ACT 2:0 to ACT 2:0 - start of range, matches")]
    public void GetForReferenceRange_MultiRef_AtRangeStart_Matches()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 2:0 to ACT 2:0 - start of range
        var startRef = new VerseRef(44, 2, 0);
        var endRef = new VerseRef(44, 2, 0);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-013 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-013 query 2: ACT 2:0 is at start of range, should match"
        );
        Assert.That(result[0].ImageId, Is.EqualTo("one"));
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 3: ACT 2:1 to ACT 2:3 - within range, matches")]
    public void GetForReferenceRange_MultiRef_WithinRange_Matches()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 2:1 to ACT 2:3 - within range
        var startRef = new VerseRef(44, 2, 1);
        var endRef = new VerseRef(44, 2, 3);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-013 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-013 query 3: ACT 2:1-3 is within range, should match"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 4: ACT 3:4 to ACT 3:4 - mid-range, matches")]
    public void GetForReferenceRange_MultiRef_MidRange_Matches()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 3:4 to ACT 3:4 - mid-range
        var startRef = new VerseRef(44, 3, 4);
        var endRef = new VerseRef(44, 3, 4);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-013 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-013 query 4: ACT 3:4 is mid-range, should match"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 5: ACT 4:7 to ACT 5:0 - spanning chapters within range, matches")]
    public void GetForReferenceRange_MultiRef_SpanningChaptersWithinRange_Matches()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 4:7 to ACT 5:0 - spanning chapters within range
        var startRef = new VerseRef(44, 4, 7);
        var endRef = new VerseRef(44, 5, 0);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-013 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-013 query 5: ACT 4:7-5:0 spans chapters within range, should match"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 6: ACT 5 last to ACT 5 last - end of range, matches")]
    public void GetForReferenceRange_MultiRef_AtRangeEnd_Matches()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 5 last to ACT 5 last - end of range
        var startRef = new VerseRef(44, 5, 42); // ACT 5 last verse
        var endRef = new VerseRef(44, 5, 42);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: matches per gm-013 expected output
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "gm-013 query 6: ACT 5 last is at end of range, should match"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Property("GoldenMasterId", "gm-013")]
    [Description("gm-013 query 7: ACT 6:0 to ACT 6 last - after range, no match")]
    public void GetForReferenceRange_MultiRef_AfterRange_NoMatch()
    {
        // Arrange: image "one" with chapter range ACT 2:0 - ACT 5:0
        var images = CreateMultiRefImage("one", actChapterStart: 2, actChapterEnd: 5);

        // Query: ACT 6:0 to ACT 6 last - after range
        var startRef = new VerseRef(44, 6, 0);
        var endRef = new VerseRef(44, 6, 15); // ACT 6 last verse

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, startRef, endRef);

        // Assert: no match per gm-013 expected output
        Assert.That(result, Is.Empty, "gm-013 query 7: ACT 6 should not match ACT 2-5 range");
    }

    #endregion

    #region Contract Tests - GetForReferenceRange

    // -------------------------------------------------------------------------
    // TS-033: Three-level matching (book, chapter, verse)
    // BHV-612: Images matched at book, chapter, and verse levels
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: Image spanning entire book matches verse query within that book")]
    public void GetForReferenceRange_BookLevelImage_MatchesVerseInBook()
    {
        // Arrange: image spanning GEN (book 1, entire book)
        var images = CreateBookSpanningImage("bookImage", bookNum: 1);

        // Query: GEN 1:1 (single verse within the book)
        var queryRef = new VerseRef(1, 1, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: book-level image matches verse within that book
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Book-level image should match any verse within that book"
        );
        Assert.That(result[0].ImageId, Is.EqualTo("bookImage"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: Image spanning single chapter matches verse query within that chapter")]
    public void GetForReferenceRange_ChapterLevelImage_MatchesVerseInChapter()
    {
        // Arrange: image spanning GEN chapter 1
        var images = CreateChapterSpanningImage("chapterImage", bookNum: 1, chapterNum: 1);

        // Query: GEN 1:5 (verse within the chapter)
        var queryRef = new VerseRef(1, 1, 5);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: chapter-level image matches verse within that chapter
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Chapter-level image should match verse within that chapter"
        );
        Assert.That(result[0].ImageId, Is.EqualTo("chapterImage"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: Image spanning verse range matches overlapping verse query")]
    public void GetForReferenceRange_VerseLevelImage_MatchesOverlappingQuery()
    {
        // Arrange: image spanning GEN 1:1 to GEN 1:3
        var images = CreateVerseSpanningImage(
            "verseImage",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );

        // Query: GEN 1:2 (within the verse range)
        var queryRef = new VerseRef(1, 1, 2);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: verse-level image matches overlapping query
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "Verse-level image should match overlapping query"
        );
        Assert.That(result[0].ImageId, Is.EqualTo("verseImage"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: All three levels (book, chapter, verse) match when querying GEN 1:1")]
    public void GetForReferenceRange_ThreeLevels_AllMatch()
    {
        // Arrange: three images at different granularities
        var bookImage = CreateBookSpanningImage("bookImg", bookNum: 1);
        var chapterImage = CreateChapterSpanningImage("chapterImg", bookNum: 1, chapterNum: 1);
        var verseImage = CreateVerseSpanningImage(
            "verseImg",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );
        var allImages = CombineImages(bookImage, chapterImage, verseImage);

        // Query: GEN 1:1 - should match all three
        var queryRef = new VerseRef(1, 1, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(allImages, queryRef, queryRef);

        // Assert: all three levels match per TS-033 expected output (matchCount: 3)
        Assert.That(
            result,
            Has.Count.EqualTo(3),
            "TS-033: All three granularity levels (book, chapter, verse) should match GEN 1:1"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: Chapter-level image does NOT match verse in a different chapter")]
    public void GetForReferenceRange_ChapterLevelImage_DoesNotMatchDifferentChapter()
    {
        // Arrange: image spanning GEN chapter 1
        var images = CreateChapterSpanningImage("chapterImage", bookNum: 1, chapterNum: 1);

        // Query: GEN 2:1 (different chapter)
        var queryRef = new VerseRef(1, 2, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: chapter-level image should NOT match different chapter
        Assert.That(
            result,
            Is.Empty,
            "Chapter-level image should not match verse in a different chapter"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-033: Book-level image does NOT match verse in a different book")]
    public void GetForReferenceRange_BookLevelImage_DoesNotMatchDifferentBook()
    {
        // Arrange: image spanning GEN (book 1)
        var images = CreateBookSpanningImage("genImage", bookNum: 1);

        // Query: EXO 1:1 (book 2 - different book)
        var queryRef = new VerseRef(2, 1, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: book-level image should NOT match different book
        Assert.That(
            result,
            Is.Empty,
            "Book-level image should not match verse in a different book"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-612")]
    [Description(
        "No image data available returns empty list, not error (error condition: no error)"
    )]
    public void GetForReferenceRange_NoImages_ReturnsEmptyList()
    {
        // Arrange: empty image list
        var images = new List<MarbleImageData>();

        // Query: any reference
        var queryRef = new VerseRef(1, 1, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(images, queryRef, queryRef);

        // Assert: empty list, no exception
        Assert.That(result, Is.Not.Null, "Should return list, not null");
        Assert.That(result, Is.Empty, "Empty image list should return empty result");
    }

    #endregion

    #region Edge Case Tests

    // -------------------------------------------------------------------------
    // TS-034: End reference before start reference
    // BHV-612: Setter checks that end reference comes after start reference
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-612")]
    [Description(
        "TS-034: Setting end reference before start reference is handled gracefully and corrected"
    )]
    public void SetEndRef_BeforeStartRef_CorrectedGracefully()
    {
        // Arrange: start ref is GEN 2:1, end ref is GEN 1:1 (before start)
        var startRef = new VerseRef(1, 2, 1);
        var endRef = new VerseRef(1, 1, 1);

        // Act: creating image data with end before start should not throw
        var imageData = new MarbleImageData("testImg", startRef, endRef);

        // Assert: end ref should be corrected to be >= start ref (no exception, but correction applied)
        Assert.That(
            imageData.EndRef.CompareTo(imageData.StartRef),
            Is.GreaterThanOrEqualTo(0),
            "TS-034: End reference must not precede start reference after correction"
        );
    }

    // -------------------------------------------------------------------------
    // TS-035: Language fallback to English
    // BHV-612: Best language code defaults to English if languageID doesn't exist
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-035: GetBestLanguageCode returns user language when available")]
    public void GetBestLanguageCode_UserLanguageAvailable_ReturnsUserLanguage()
    {
        // Arrange: image data with available languages "en" and "es"
        var imageData = CreateImageDataWithLanguages("img1", ["en", "es"]);

        // Act: request Spanish (available)
        string bestLang = imageData.GetBestLanguageCode("es");

        // Assert: returns user's preferred language
        Assert.That(bestLang, Is.EqualTo("es"), "Should return user language when available");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-035: GetBestLanguageCode defaults to English when user language unavailable")]
    public void GetBestLanguageCode_UserLanguageUnavailable_DefaultsToEnglish()
    {
        // Arrange: image data with available languages "en" and "es"
        var imageData = CreateImageDataWithLanguages("img1", ["en", "es"]);

        // Act: request an unavailable language
        string bestLang = imageData.GetBestLanguageCode("xx-unavail");

        // Assert: defaults to English per TS-035 expected output
        Assert.That(
            bestLang,
            Is.EqualTo("en"),
            "TS-035: Must default to English when user language is not available"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-035: GetBestLanguageCode returns English when only English is available")]
    public void GetBestLanguageCode_OnlyEnglishAvailable_ReturnsEnglish()
    {
        // Arrange: image data with only English available
        var imageData = CreateImageDataWithLanguages("img1", ["en"]);

        // Act: request any language
        string bestLang = imageData.GetBestLanguageCode("fr");

        // Assert: returns English as the only/default option
        Assert.That(bestLang, Is.EqualTo("en"), "Should return English when it's the only option");
    }

    #endregion

    #region Grouping Tests

    // -------------------------------------------------------------------------
    // TS-036: Image grouping by StartRef, EndRef, and ImageData
    // BHV-612: GetForReferenceRangeInternal groups images
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Description(
        "TS-036: Images with same StartRef, EndRef, and different ImageData are grouped together"
    )]
    public void GetForReferenceRange_SameRefRange_DifferentImages_GroupedTogether()
    {
        // Arrange: two images with same reference range but different image IDs
        // Per TS-036: images grouped by StartRef+EndRef+ImageData
        var image1 = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );
        var image2 = CreateVerseSpanningImage(
            "img2",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );
        var allImages = CombineImages(image1, image2);

        // Query: GEN 1:1 (overlaps both images)
        var queryRef = new VerseRef(1, 1, 1);

        // Act
        var result = MarbleImageData.GetForReferenceRange(allImages, queryRef, queryRef);

        // Assert: both images returned (TS-036 says groupCount: 1, imagesInGroup: 2)
        // The grouping means they are in the same group but both are returned
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "TS-036: Two images with same ref range should both be returned"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-612")]
    [Description("TS-036: Images with different reference ranges are in separate groups")]
    public void GetForReferenceRange_DifferentRefRanges_SeparateGroups()
    {
        // Arrange: two images with different reference ranges
        var image1 = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );
        var image2 = CreateVerseSpanningImage(
            "img2",
            bookNum: 1,
            chapter: 1,
            startVerse: 5,
            endVerse: 7
        );
        var allImages = CombineImages(image1, image2);

        // Query: GEN 1:1 to GEN 1:7 (overlaps both images)
        var startRef = new VerseRef(1, 1, 1);
        var endRef = new VerseRef(1, 1, 7);

        // Act
        var result = MarbleImageData.GetForReferenceRange(allImages, startRef, endRef);

        // Assert: both images returned, in separate groups
        Assert.That(
            result,
            Has.Count.EqualTo(2),
            "Both images with different ref ranges should be returned"
        );
    }

    #endregion

    #region Invariant Tests - VAL-007

    // -------------------------------------------------------------------------
    // VAL-007: Image Reference Range
    // Constraint: Image metadata ranges must match the current verse reference
    //             at book, chapter, or verse level
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("InvariantId", "VAL-007")]
    [Property("BehaviorId", "BHV-612")]
    [Description(
        "VAL-007: Matching is symmetric - if query overlaps image range, image range overlaps query"
    )]
    public void GetForReferenceRange_OverlapIsSymmetric()
    {
        // Arrange: image at GEN 1:5-10
        var images = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 5,
            endVerse: 10
        );

        // Query A: GEN 1:3-7 (overlaps from the left)
        var resultA = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 3),
            new VerseRef(1, 1, 7)
        );

        // Query B: GEN 1:8-12 (overlaps from the right)
        var resultB = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 8),
            new VerseRef(1, 1, 12)
        );

        // Assert: both overlapping queries match
        Assert.That(
            resultA,
            Has.Count.EqualTo(1),
            "VAL-007: Left-overlapping query should match image range"
        );
        Assert.That(
            resultB,
            Has.Count.EqualTo(1),
            "VAL-007: Right-overlapping query should match image range"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("InvariantId", "VAL-007")]
    [Property("BehaviorId", "BHV-612")]
    [Description("VAL-007: Non-overlapping ranges never match")]
    public void GetForReferenceRange_NonOverlapping_NeverMatches()
    {
        // Arrange: image at GEN 1:5-10
        var images = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 5,
            endVerse: 10
        );

        // Query before range: GEN 1:1-4
        var resultBefore = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 1),
            new VerseRef(1, 1, 4)
        );

        // Query after range: GEN 1:11-15
        var resultAfter = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 11),
            new VerseRef(1, 1, 15)
        );

        // Assert: no overlap means no match
        Assert.That(
            resultBefore,
            Is.Empty,
            "VAL-007: Query entirely before image range must not match"
        );
        Assert.That(
            resultAfter,
            Is.Empty,
            "VAL-007: Query entirely after image range must not match"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("InvariantId", "VAL-007")]
    [Property("BehaviorId", "BHV-612")]
    [Description("VAL-007: Query that fully contains image range matches")]
    public void GetForReferenceRange_QueryContainsImageRange_Matches()
    {
        // Arrange: image at GEN 1:5-10
        var images = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 5,
            endVerse: 10
        );

        // Query: GEN 1:1-31 (contains entire image range)
        var result = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 1),
            new VerseRef(1, 1, 31)
        );

        // Assert: containing query matches
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "VAL-007: Query containing entire image range must match"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("InvariantId", "VAL-007")]
    [Property("BehaviorId", "BHV-612")]
    [Description("VAL-007: Image range that fully contains query matches")]
    public void GetForReferenceRange_ImageRangeContainsQuery_Matches()
    {
        // Arrange: image at GEN 1:1-31 (entire chapter)
        var images = CreateVerseSpanningImage(
            "img1",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 31
        );

        // Query: GEN 1:5-10 (inside image range)
        var result = MarbleImageData.GetForReferenceRange(
            images,
            new VerseRef(1, 1, 5),
            new VerseRef(1, 1, 10)
        );

        // Assert: contained query matches
        Assert.That(
            result,
            Has.Count.EqualTo(1),
            "VAL-007: Image range containing entire query must match"
        );
    }

    #endregion

    #region Media Viewer Navigation - BHV-452

    // -------------------------------------------------------------------------
    // BHV-452: Media Viewer prev/next navigation uses grouped image indices
    // The result must provide display indices for navigating through images.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-452")]
    [Description("BHV-452: Result includes TotalImageCount for navigation context")]
    public async Task GetImagesForReferenceAsync_ReturnsImageCountForNavigation()
    {
        // Arrange: multiple images
        var bookImage = CreateBookSpanningImage("bookImg", bookNum: 1);
        var chapterImage = CreateChapterSpanningImage("chapterImg", bookNum: 1, chapterNum: 1);
        var verseImage = CreateVerseSpanningImage(
            "verseImg",
            bookNum: 1,
            chapter: 1,
            startVerse: 1,
            endVerse: 3
        );
        var allImages = CombineImages(bookImage, chapterImage, verseImage);

        // This tests the higher-level method that returns ImageReferenceResult
        // with TotalImageCount for media viewer navigation
        var input = new ImageReferenceInput(
            Reference: new VerseRef(1, 1, 1),
            ResourceId: "testResource",
            UserLanguage: "en"
        );

        // Act: Call the service-level method that wraps GetForReferenceRange
        // This method must exist as part of M-004 contract
        ImageReferenceResult result = await GetImagesForReferenceAsync(input, allImages);

        // Assert: TotalImageCount reflects all available images
        Assert.That(
            result.TotalImageCount,
            Is.GreaterThan(0),
            "BHV-452: TotalImageCount must be provided for media viewer navigation"
        );
        Assert.That(
            result.Images,
            Has.Count.EqualTo(3),
            "All three matching images should be in the result"
        );
    }

    #endregion

    #region Test Helpers

    /// <summary>
    /// Creates a list containing a single MarbleImageData that spans an entire book.
    /// </summary>
    private static IList<MarbleImageData> CreateBookSpanningImage(string imageId, int bookNum)
    {
        // Book-spanning: start at book:0:0, end at book:0:0 (whole book)
        var startRef = new VerseRef(bookNum, 0, 0);
        var endRef = new VerseRef(bookNum, 0, 0);
        return [new MarbleImageData(imageId, startRef, endRef)];
    }

    /// <summary>
    /// Creates a list containing a single MarbleImageData that spans an entire chapter.
    /// </summary>
    private static IList<MarbleImageData> CreateChapterSpanningImage(
        string imageId,
        int bookNum,
        int chapterNum
    )
    {
        var startRef = new VerseRef(bookNum, chapterNum, 0);
        var endRef = new VerseRef(bookNum, chapterNum, 0);
        return [new MarbleImageData(imageId, startRef, endRef)];
    }

    /// <summary>
    /// Creates a list containing a single MarbleImageData that spans a verse range.
    /// </summary>
    private static IList<MarbleImageData> CreateVerseSpanningImage(
        string imageId,
        int bookNum,
        int chapter,
        int startVerse,
        int endVerse
    )
    {
        var startRef = new VerseRef(bookNum, chapter, startVerse);
        var endRef = new VerseRef(bookNum, chapter, endVerse);
        return [new MarbleImageData(imageId, startRef, endRef)];
    }

    /// <summary>
    /// Creates a list containing a single MarbleImageData with multi-reference
    /// (chapter range in ACT) per gm-013 pattern.
    /// </summary>
    private static IList<MarbleImageData> CreateMultiRefImage(
        string imageId,
        int actChapterStart,
        int actChapterEnd
    )
    {
        // The image has a chapter range reference: ACT chapterStart:0 to ACT chapterEnd:0
        var startRef = new VerseRef(44, actChapterStart, 0);
        var endRef = new VerseRef(44, actChapterEnd, 0);
        return [new MarbleImageData(imageId, startRef, endRef)];
    }

    /// <summary>
    /// Creates an image data instance with specified available languages for language tests.
    /// </summary>
    private static MarbleImageData CreateImageDataWithLanguages(
        string imageId,
        string[] availableLanguages
    )
    {
        var startRef = new VerseRef(1, 1, 1);
        var endRef = new VerseRef(1, 1, 1);
        return new MarbleImageData(imageId, startRef, endRef, availableLanguages);
    }

    /// <summary>
    /// Combines multiple image lists into one.
    /// </summary>
    private static IList<MarbleImageData> CombineImages(params IList<MarbleImageData>[] imageLists)
    {
        var combined = new List<MarbleImageData>();
        foreach (var list in imageLists)
            combined.AddRange(list);
        return combined;
    }

    /// <summary>
    /// Simulates the service-level GetImagesForReferenceAsync method from M-004 contract.
    /// This wraps GetForReferenceRange and produces an ImageReferenceResult.
    /// Will be replaced by actual service call during implementation.
    /// </summary>
    private static Task<ImageReferenceResult> GetImagesForReferenceAsync(
        ImageReferenceInput input,
        IList<MarbleImageData> allImages
    )
    {
        var matched = MarbleImageData.GetForReferenceRange(
            allImages,
            input.Reference,
            input.Reference
        );
        var entries = matched
            .Select(img => new ImageEntry(
                ImageId: img.ImageId,
                ImageSource: $"images/{img.ImageId}.jpg",
                Title: img.ImageId,
                StartRef: img.StartRef,
                EndRef: img.EndRef,
                Collection: "TestCollection",
                LanguageCode: input.UserLanguage
            ))
            .ToList();

        return Task.FromResult(new ImageReferenceResult(entries, allImages.Count));
    }

    #endregion
}
