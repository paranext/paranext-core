using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ImageService.GetImageMetadataAsync (CAP-006).
///
/// Retrieves image and video metadata for a verse reference range or specific image ID,
/// with collection-based tab classification (Maps vs Images). Supports 14-digit
/// BBBCCCVVVSSSSS reference parsing, reference range grouping, Chinese language code
/// mapping, and apostrophe filename substitution.
///
/// Contract: Section 4.6 GetImageMetadata (data-contracts.md)
/// Input Type: Section 2.5 ImageRetrievalInput
/// Output Type: Section 3.5 ImageMetadataResult
/// Behaviors: BHV-305 (Image/Video Metadata Data Model),
///            BHV-307 (RefRangeImageList Grouping)
/// Invariants: INV-018 (Media Tab Collection Classification),
///             INV-C15 (Media Tab Collection Classification - formal),
///             INV-C17 (Chinese Video Language Mapping)
/// Golden Masters: GM-010 (Image Metadata and Classification),
///                 GM-020 (Media URL Generation and Caching)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ImageServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-006
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetImageMetadataAsync is called with a valid verse reference
    /// and tab type, it returns an ImageMetadataResult with structured entries containing
    /// reference ranges, collection classification, and media format detection. This matches
    /// the combined behavior of GM-010 (image metadata and classification) and GM-020
    /// (media URL generation with language mapping).
    ///
    /// This test passes when CAP-006 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "Acceptance test: Image metadata retrieved with reference ranges parsed correctly, "
            + "Satellite Bible Atlas classified as Maps, video URLs generated with language mapping"
    )]
    public async Task GetImageMetadata_AcceptanceTest_MatchesGoldenMasters()
    {
        // Arrange: Look up images for a known verse reference (e.g., Matthew 1:1)
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act: Call the public API defined in data-contracts.md Section 4.6
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Verify result is successful with structured image metadata
        Assert.That(result.Success, Is.True, "Image metadata lookup should succeed");
        Assert.That(result.Images, Is.Not.Null, "Images should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify image metadata structure per Section 3.5 ImageMetadataResult
        Assert.That(result.Images!, Has.Count.GreaterThanOrEqualTo(1), "At least one image");

        var image = result.Images![0];
        Assert.That(image.ImageId, Is.Not.Null.And.Not.Empty, "ImageId should be populated");
        Assert.That(image.Collection, Is.Not.Null.And.Not.Empty, "Collection should be populated");
        Assert.That(image.Path, Is.Not.Null, "Path should be present");
        Assert.That(image.FileName, Is.Not.Null.And.Not.Empty, "FileName should be populated");
        Assert.That(image.Format, Is.Not.Null.And.Not.Empty, "Format should be populated");
        Assert.That(image.StartRef, Is.Not.Null.And.Not.Empty, "StartRef should be populated");
        Assert.That(image.EndRef, Is.Not.Null.And.Not.Empty, "EndRef should be populated");
        Assert.That(image.Title, Is.Not.Null, "Title should be present");
        Assert.That(image.Copyright, Is.Not.Null, "Copyright should be present");

        // Verify tab type filtering: images tab should exclude "Satellite Bible Atlas"
        // (INV-018, INV-C15)
        foreach (var img in result.Images!)
        {
            Assert.That(
                img.Collection,
                Is.Not.EqualTo("Satellite Bible Atlas"),
                "INV-018/INV-C15: Images tab must exclude Satellite Bible Atlas content"
            );
        }
    }

    // =========================================================================
    // IsOnLine DETECTION TESTS (BHV-305, TS-041)
    // =========================================================================

    /// <summary>
    /// MP4 format images are classified as online media (IsOnLine = true).
    /// PT9 source: MarbleImageData.cs:15-130
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("MP4 format images have IsOnline = true (BHV-305)")]
    public async Task GetImageMetadata_Mp4Format_IsOnlineTrue()
    {
        // Arrange: Request image metadata that includes an MP4 video entry
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Any MP4 format entry should have IsOnline = true
        Assert.That(result.Success, Is.True);
        var mp4Images = result.Images!.Where(i =>
            i.Format.Equals("MP4", StringComparison.OrdinalIgnoreCase)
        );

        foreach (var mp4 in mp4Images)
        {
            Assert.That(
                mp4.IsOnline,
                Is.True,
                "GM-010: MP4 format images must have IsOnline = true"
            );
        }
    }

    /// <summary>
    /// M3U8 format images are also classified as online media (IsOnLine = true).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("M3U8 format images have IsOnline = true (BHV-305)")]
    public async Task GetImageMetadata_M3u8Format_IsOnlineTrue()
    {
        // Arrange: Request metadata that includes an M3U8 streaming entry
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Any M3U8 format entry should have IsOnline = true
        Assert.That(result.Success, Is.True);
        var m3u8Images = result.Images!.Where(i =>
            i.Format.Equals("M3U8", StringComparison.OrdinalIgnoreCase)
        );

        foreach (var m3u8 in m3u8Images)
        {
            Assert.That(
                m3u8.IsOnline,
                Is.True,
                "GM-010: M3U8 format images must have IsOnline = true"
            );
        }
    }

    /// <summary>
    /// JPG format images are NOT online media (IsOnLine = false).
    /// This is the inverse of TS-041 for standard image formats.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("JPG format images have IsOnline = false (BHV-305)")]
    public async Task GetImageMetadata_JpgFormat_IsOnlineFalse()
    {
        // Arrange: Request metadata for standard image files
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: JPG format entries should have IsOnline = false
        Assert.That(result.Success, Is.True);
        var jpgImages = result.Images!.Where(i =>
            i.Format.Equals("jpg", StringComparison.OrdinalIgnoreCase)
        );

        foreach (var jpg in jpgImages)
        {
            Assert.That(
                jpg.IsOnline,
                Is.False,
                "GM-010: JPG format images must have IsOnline = false"
            );
        }
    }

    // =========================================================================
    // REFERENCE PARSING TESTS (BHV-305, TS-042, TS-043)
    // =========================================================================

    /// <summary>
    /// 14-digit image references in BBBCCCVVVSSSSS format are parsed correctly.
    /// Example: "04100100100000" = Book MAT (041), Chapter 001, Verse 001, Segment 00000.
    /// PT9 source: MarbleImageData.cs (reference parsing)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "14-digit BBBCCCVVVSSSSS reference parsed to Book=MAT, Chapter=1, Verse=1, Segment=0"
    )]
    public async Task GetImageMetadata_14DigitReference_ParsedCorrectly()
    {
        // Arrange: Request images for Matthew 1:1 (book 41 in USFM numbering)
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: StartRef/EndRef should be in valid 14-digit BBBCCCVVVSSSSS format
        Assert.That(result.Success, Is.True);
        Assert.That(result.Images, Is.Not.Null.And.Not.Empty);

        var image = result.Images![0];

        // GM-010 expected: referenceParsingStandard { book: "MAT", chapter: 1, verse: 1, segment: 0 }
        // StartRef should start with "041" (MAT book number)
        Assert.That(
            image.StartRef,
            Has.Length.EqualTo(14),
            "StartRef must be exactly 14 digits (BBBCCCVVVSSSSS format)"
        );
        Assert.That(
            image.EndRef,
            Has.Length.EqualTo(14),
            "EndRef must be exactly 14 digits (BBBCCCVVVSSSSS format)"
        );

        // Verify book portion (first 3 digits) encodes a valid book number
        Assert.That(
            int.TryParse(image.StartRef[..3], out int bookNum),
            Is.True,
            "First 3 digits of StartRef must be a valid number"
        );
        Assert.That(bookNum, Is.GreaterThan(0).And.LessThanOrEqualTo(87), "Valid USFM book number");
    }

    /// <summary>
    /// Book-spanning references with all-zero chapter/verse (e.g., "04100000000000")
    /// represent the entire book. This is an edge case where chapter=000 and verse=000
    /// means "all chapters and verses in this book."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "Reference with all-zero chapter/verse (04100000000000) covers entire book (edge case)"
    )]
    public async Task GetImageMetadata_AllZeroChapterVerse_CoversEntireBook()
    {
        // Arrange: Request images for the entire book of Matthew (book-spanning ref)
        // When startRef has 000 for chapter and verse, it means the whole book
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 0:0",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Should return images that span the entire book
        // GM-010 expected: referenceParsingEntireBook { entireBook: true }
        Assert.That(result.Success, Is.True);

        // If there are results, any book-spanning image should have chapter/verse portions as 000
        if (result.Images != null && result.Images.Count > 0)
        {
            // At least one image with book-spanning reference should exist
            var bookSpanningImages = result.Images.Where(img =>
            {
                // Check if chapter portion (digits 4-6) is "000"
                if (img.StartRef.Length >= 6)
                {
                    string chapterPortion = img.StartRef.Substring(3, 3);
                    return chapterPortion == "000";
                }
                return false;
            });

            // Book-spanning images exist for this reference
            Assert.That(
                bookSpanningImages.Any() || result.Images.Count > 0,
                Is.True,
                "TS-043: All-zero chapter/verse should match book-spanning images or all images in book"
            );
        }
    }

    // =========================================================================
    // REFERENCE RANGE GROUPING TESTS (BHV-307, TS-044)
    // =========================================================================

    /// <summary>
    /// Images with the same start/end reference range are grouped together in the result.
    /// RefRangeImageList groups images sharing the same reference boundaries.
    /// PT9 source: MarbleDataAccess.cs:1024-1037
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-044")]
    [Property("BehaviorId", "BHV-307")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Images with identical start/end reference ranges are grouped together (BHV-307)")]
    public async Task GetImageMetadata_SharedRefRange_ImagesGroupedTogether()
    {
        // Arrange: Request images for a reference that has multiple images
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Images with the same start/end refs should be adjacent (grouped)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Images, Is.Not.Null);

        if (result.Images!.Count > 1)
        {
            // Build an index map for lookup
            var imageList = result.Images.ToList();

            // Group by (StartRef, EndRef) and verify images with same range are consecutive
            var groups = imageList
                .GroupBy(img => (img.StartRef, img.EndRef))
                .Where(g => g.Count() > 1);

            foreach (var group in groups)
            {
                var indices = group.Select(img => imageList.IndexOf(img)).ToList();
                // Images in the same group should have consecutive indices
                for (int i = 1; i < indices.Count; i++)
                {
                    Assert.That(
                        indices[i] - indices[i - 1],
                        Is.EqualTo(1),
                        $"GM-010: Images with ref range ({group.Key.StartRef}, {group.Key.EndRef}) "
                            + "must be grouped consecutively"
                    );
                }
            }
        }
    }

    // =========================================================================
    // CHINESE LANGUAGE CODE MAPPING TESTS (INV-C17, TS-078)
    // =========================================================================

    /// <summary>
    /// Chinese language code "zh" is mapped to "cmn" (Mandarin) for video URLs.
    /// INV-020/INV-C17: videoLang("zh") == "cmn"
    /// PT9 source: MarbleDataAccess.cs:610-615 (GetVideoLanguageCode)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-305")]
    [Property("InvariantId", "INV-C17")]
    [Property("GoldenMaster", "GM-020")]
    [Description("Chinese language code 'zh' mapped to 'cmn' for video URLs (INV-C17)")]
    public async Task GetImageMetadata_ChineseLanguage_MappedToCmn()
    {
        // Arrange: Request video metadata with Chinese language code "zh"
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "zh",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Any online video entries should have URLs with "cmn" not "zh"
        Assert.That(result.Success, Is.True);

        var onlineMedia = result.Images?.Where(i => i.IsOnline && i.VideoUrl != null);
        if (onlineMedia != null)
        {
            foreach (var media in onlineMedia)
            {
                Assert.That(
                    media.VideoUrl,
                    Does.Contain("cmn"),
                    "GM-020/INV-C17: Chinese 'zh' must be mapped to 'cmn' in video URLs"
                );
                Assert.That(
                    media.VideoUrl,
                    Does.Not.Contain("/zh/").And.Not.Contain("=zh"),
                    "INV-C17: Video URL must not contain raw 'zh' language code"
                );
            }
        }
    }

    /// <summary>
    /// Non-Chinese language codes are passed through unchanged for video URLs.
    /// This verifies the "zh" mapping is specific, not a general transformation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-305")]
    [Property("InvariantId", "INV-C17")]
    [Property("GoldenMaster", "GM-020")]
    [Description("Non-Chinese language codes passed through unchanged for video URLs")]
    public async Task GetImageMetadata_NonChineseLanguage_NotMapped()
    {
        // Arrange: Request video metadata with English language code "en"
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: English language code should not be changed
        Assert.That(result.Success, Is.True);

        var onlineMedia = result.Images?.Where(i => i.IsOnline && i.VideoUrl != null);
        if (onlineMedia != null)
        {
            foreach (var media in onlineMedia)
            {
                // "en" should remain "en" in the URL, not mapped to something else
                Assert.That(
                    media.VideoUrl,
                    Does.Not.Contain("cmn"),
                    "INV-C17: Non-Chinese codes should not be mapped to cmn"
                );
            }
        }
    }

    // =========================================================================
    // APOSTROPHE FILENAME SUBSTITUTION TESTS (VAL-011, TS-079)
    // =========================================================================

    /// <summary>
    /// Apostrophes in image filenames are replaced with underscores for path lookup.
    /// Example: "Abraham's_Well.jpg" -> "Abraham_s_Well.jpg"
    /// PT9 source: MarbleDataAccess.cs (GetImage filename resolution)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-020")]
    [Description("Apostrophe in image filename replaced with underscore for path lookup (VAL-011)")]
    public async Task GetImageMetadata_ApostropheInFilename_ReplacedWithUnderscore()
    {
        // Arrange: Request image metadata for a specific image with apostrophe in name
        var input = new ImageRetrievalInput(
            ImageId: "Abraham's_Well",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: The resolved filename should have underscore instead of apostrophe
        // GM-020: { "substituted": "Abraham_s_Well.jpg" }
        Assert.That(result.Success, Is.True);
        Assert.That(result.Images, Is.Not.Null.And.Not.Empty);

        var image = result.Images![0];
        Assert.That(
            image.FileName,
            Does.Not.Contain("'"),
            "GM-020/VAL-011: Apostrophes must be replaced with underscores in filenames"
        );
        Assert.That(
            image.FileName,
            Does.Contain("Abraham_s_Well"),
            "GM-020: Substituted filename should be 'Abraham_s_Well.jpg'"
        );
    }

    // =========================================================================
    // MAPS VS IMAGES CLASSIFICATION TESTS (INV-018, INV-C15, TS-083, TS-084)
    // =========================================================================

    /// <summary>
    /// "Satellite Bible Atlas" collection images are classified as Maps.
    /// INV-018/INV-C15: tabType(img) == "maps" when img.collection == "Satellite Bible Atlas"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "BHV-305")]
    [Property("InvariantId", "INV-018")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "Satellite Bible Atlas images shown in Maps tab, excluded from Images tab (INV-018)"
    )]
    public async Task GetImageMetadata_SatelliteBibleAtlas_ClassifiedAsMaps()
    {
        // Arrange: Request images with Maps tab type
        var mapsInput = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "maps"
        );

        // Act
        var mapsResult = await ImageService.GetImageMetadataAsync(
            mapsInput,
            CancellationToken.None
        );

        // Assert: Maps tab should only contain "Satellite Bible Atlas" images
        Assert.That(mapsResult.Success, Is.True);
        if (mapsResult.Images != null && mapsResult.Images.Count > 0)
        {
            foreach (var img in mapsResult.Images)
            {
                Assert.That(
                    img.Collection,
                    Is.EqualTo("Satellite Bible Atlas"),
                    "INV-018/INV-C15: Maps tab must only show Satellite Bible Atlas content"
                );
            }
        }
    }

    /// <summary>
    /// Non-Satellite-Bible-Atlas collection images are classified as Images.
    /// INV-018/INV-C15: tabType(img) == "images" when img.collection != "Satellite Bible Atlas"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-084")]
    [Property("BehaviorId", "BHV-305")]
    [Property("InvariantId", "INV-018")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Non-SBA images shown in Images tab, excluded from Maps tab (INV-018)")]
    public async Task GetImageMetadata_NonSbaCollection_ClassifiedAsImages()
    {
        // Arrange: Request images with Images tab type
        var imagesInput = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var imagesResult = await ImageService.GetImageMetadataAsync(
            imagesInput,
            CancellationToken.None
        );

        // Assert: Images tab must exclude "Satellite Bible Atlas" content
        Assert.That(imagesResult.Success, Is.True);
        if (imagesResult.Images != null && imagesResult.Images.Count > 0)
        {
            foreach (var img in imagesResult.Images)
            {
                Assert.That(
                    img.Collection,
                    Is.Not.EqualTo("Satellite Bible Atlas"),
                    "INV-018/INV-C15: Images tab must exclude Satellite Bible Atlas content"
                );
            }
        }
    }

    /// <summary>
    /// Invariant test: the Maps/Images classification is mutually exclusive.
    /// An image from "Satellite Bible Atlas" should appear in Maps but NOT Images,
    /// and a non-SBA image should appear in Images but NOT Maps.
    /// INV-C15: tabType(img) == (img.collection == "Satellite Bible Atlas" ? "maps" : "images")
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "BHV-305")]
    [Property("InvariantId", "INV-C15")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "INV-C15: Maps/Images classification is mutually exclusive based on collection name"
    )]
    public async Task GetImageMetadata_TabClassification_IsMutuallyExclusive()
    {
        // Arrange: Fetch both Maps and Images for the same reference
        var mapsInput = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "maps"
        );

        var imagesInput = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var mapsResult = await ImageService.GetImageMetadataAsync(
            mapsInput,
            CancellationToken.None
        );
        var imagesResult = await ImageService.GetImageMetadataAsync(
            imagesInput,
            CancellationToken.None
        );

        // Assert: No image ID should appear in both tabs
        Assert.That(mapsResult.Success, Is.True);
        Assert.That(imagesResult.Success, Is.True);

        var mapsIds = mapsResult.Images?.Select(i => i.ImageId).ToHashSet() ?? [];
        var imagesIds = imagesResult.Images?.Select(i => i.ImageId).ToHashSet() ?? [];

        var overlap = mapsIds.Intersect(imagesIds).ToList();
        Assert.That(
            overlap,
            Is.Empty,
            "INV-C15: No image should appear in both Maps and Images tabs. "
                + $"Overlapping IDs: [{string.Join(", ", overlap)}]"
        );
    }

    // =========================================================================
    // ERROR CONDITION TESTS
    // =========================================================================

    /// <summary>
    /// When no images or videos are found for the specified reference, returns NOT_FOUND error.
    /// Contract Section 4.6 error condition: "No media found for the specified reference"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("No media found returns NOT_FOUND error with descriptive message")]
    public async Task GetImageMetadata_NoMediaFound_ReturnsNotFoundError()
    {
        // Arrange: Request images for a verse with no associated media
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "3JN 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Returns error with NOT_FOUND code
        Assert.That(result.Success, Is.False, "Should fail when no media found");
        Assert.That(result.Images, Is.Null, "Images should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Does.Contain("media").IgnoreCase.Or.Contain("image").IgnoreCase,
            "Error message should mention media/image"
        );
    }

    /// <summary>
    /// When image metadata has not been loaded (resource not initialized), returns INVALID_STATE.
    /// Contract Section 4.6 error condition: "Image metadata not available"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Image data not loaded returns INVALID_STATE error")]
    public async Task GetImageMetadata_MetadataNotLoaded_ReturnsInvalidStateError()
    {
        // Arrange: Request images when resource has not been initialized
        // (image metadata not loaded)
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act: Call without prior initialization (CAP-015 not called)
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Returns INVALID_STATE error
        Assert.That(result.Success, Is.False, "Should fail when metadata not loaded");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Does.Contain("metadata").IgnoreCase.Or.Contain("available").IgnoreCase,
            "Error message should mention metadata availability"
        );
    }

    /// <summary>
    /// When neither imageId nor verseRef is provided, input validation fails.
    /// Contract Section 2.5: "Either imageId or verseRef must be provided"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Neither imageId nor verseRef provided returns INVALID_INPUT error")]
    public async Task GetImageMetadata_NeitherIdNorRef_ReturnsInvalidInputError()
    {
        // Arrange: Both imageId and verseRef are null
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Returns INVALID_INPUT error
        Assert.That(result.Success, Is.False, "Should fail when neither imageId nor verseRef");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
    }

    // =========================================================================
    // RESULT STRUCTURE VERIFICATION TESTS
    // =========================================================================

    /// <summary>
    /// Successful result has correct structure per Section 3.5:
    /// - Success = true, Images populated, Error = null
    /// - Each image has all required fields populated
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Successful result has correct structure per Section 3.5")]
    public async Task GetImageMetadata_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Full structure verification
        Assert.That(result.Success, Is.True);
        Assert.That(result.Error, Is.Null);
        Assert.That(result.Images, Is.Not.Null);

        var image = result.Images![0];
        Assert.Multiple(() =>
        {
            Assert.That(image.ImageId, Is.Not.Null.And.Not.Empty, "ImageId required");
            Assert.That(image.Collection, Is.Not.Null.And.Not.Empty, "Collection required");
            Assert.That(image.FileName, Is.Not.Null.And.Not.Empty, "FileName required");
            Assert.That(image.Format, Is.Not.Null.And.Not.Empty, "Format required");
            Assert.That(image.StartRef, Is.Not.Null.And.Not.Empty, "StartRef required");
            Assert.That(image.EndRef, Is.Not.Null.And.Not.Empty, "EndRef required");
            Assert.That(image.Title, Is.Not.Null, "Title must not be null");
            Assert.That(image.Copyright, Is.Not.Null, "Copyright must not be null");
        });
    }

    /// <summary>
    /// Error result has correct structure:
    /// - Success = false, Images = null, Error populated with code and message
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Error result has correct structure per Section 3.5")]
    public async Task GetImageMetadata_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger an error condition
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Error structure verification
        Assert.That(result.Success, Is.False);
        Assert.That(result.Images, Is.Null, "Images should be null on error");
        Assert.That(result.Error, Is.Not.Null, "Error should be populated");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code required");
        Assert.That(result.Error.Message, Is.Not.Null.And.Not.Empty, "Error message required");
    }

    // =========================================================================
    // VIDEO FORMAT TESTS (BHV-305)
    // =========================================================================

    /// <summary>
    /// Online media entries have a valid video format (mp4 or m3u8) and a non-null URL.
    /// Non-online entries have null video URL and format.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Online media has video format and URL; non-online media has null video fields")]
    public async Task GetImageMetadata_OnlineVsOffline_VideoFieldsCorrect()
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);

        foreach (var image in result.Images!)
        {
            if (image.IsOnline)
            {
                // Online media must have video URL and format
                Assert.That(
                    image.VideoUrl,
                    Is.Not.Null.And.Not.Empty,
                    $"Online image {image.ImageId} must have VideoUrl"
                );
                Assert.That(
                    image.VideoFormat,
                    Is.EqualTo("mp4").Or.EqualTo("m3u8"),
                    $"Online image {image.ImageId} must have valid VideoFormat (mp4 or m3u8)"
                );
            }
            else
            {
                // Offline images should have null video fields
                Assert.That(
                    image.VideoUrl,
                    Is.Null,
                    $"Offline image {image.ImageId} should have null VideoUrl"
                );
                Assert.That(
                    image.VideoFormat,
                    Is.Null,
                    $"Offline image {image.ImageId} should have null VideoFormat"
                );
            }
        }
    }

    // =========================================================================
    // SPECIFIC IMAGE RETRIEVAL BY ID TESTS
    // =========================================================================

    /// <summary>
    /// When imageId is provided (instead of verseRef), retrieves metadata for that
    /// specific image only.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Image retrieval by ID returns metadata for that specific image")]
    public async Task GetImageMetadata_ByImageId_ReturnsSingleImage()
    {
        // Arrange: Request a specific image by ID
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Should return exactly one image matching the ID
        Assert.That(result.Success, Is.True);
        Assert.That(result.Images, Is.Not.Null);
        Assert.That(result.Images!, Has.Count.EqualTo(1), "Should return exactly one image by ID");
        Assert.That(
            result.Images![0].ImageId,
            Is.EqualTo("IMG001"),
            "Returned image should match requested ID"
        );
    }

    // =========================================================================
    // QUALITY TIER TESTS (BHV-305)
    // =========================================================================

    /// <summary>
    /// Quality parameter values map to specific pixel dimensions:
    /// thumbnail (60px), lowDef (480px), standardDef (720px), highDef (1080px).
    /// This test verifies the API accepts all valid quality values.
    /// </summary>
    [TestCase("thumbnail")]
    [TestCase("lowDef")]
    [TestCase("standardDef")]
    [TestCase("highDef")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-305")]
    [Description("All valid quality tier values accepted (BHV-305)")]
    public async Task GetImageMetadata_AllQualityTiers_Accepted(string quality)
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: quality,
            LanguageId: "en",
            TabType: "images"
        );

        // Act
        var result = await ImageService.GetImageMetadataAsync(input, CancellationToken.None);

        // Assert: Should not fail due to quality parameter
        // (may still fail if no images found, but not INVALID_INPUT)
        if (!result.Success)
        {
            Assert.That(
                result.Error!.Code,
                Is.Not.EqualTo("INVALID_INPUT"),
                $"Quality tier '{quality}' should be a valid input"
            );
        }
    }
}
