using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ImageService.GetImageDataAsync (CAP-007).
///
/// Retrieves actual image bytes for display, encoded as base64, with quality tier selection
/// and MIME type detection. Thumbnail quality tier produces exactly 90x60 pixel images.
///
/// Contract: Section 4.7 GetImageData (data-contracts.md)
/// Input Type: Section 2.5 ImageRetrievalInput
/// Output Type: ImageDataResult (base64 image data + MIME type + dimensions)
/// Behaviors: BHV-305 (Image/Video Metadata Data Model)
/// Golden Masters: GM-010 (Image Metadata and Classification -- thumbnailDimensions: 90x60)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ImageServiceGetImageDataTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-007
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetImageDataAsync is called with a valid imageId and quality tier,
    /// it returns an ImageDataResult with base64-encoded image bytes, a correct MIME type,
    /// and the actual image dimensions. This matches GM-010 expectations for image data
    /// retrieval at the requested quality tier.
    ///
    /// This test passes when CAP-007 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description(
        "Acceptance test: Image data retrieved as base64 with correct MIME type and dimensions"
    )]
    public async Task GetImageData_AcceptanceTest_ReturnsBase64WithMimeTypeAndDimensions()
    {
        // Arrange: Request image data for a known image at standard quality
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act: Call the public API defined in data-contracts.md Section 4.7
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Verify result is successful with base64 image data
        Assert.That(result.Success, Is.True, "Image data retrieval should succeed");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify base64 image data is present and valid
        Assert.That(
            result.ImageBase64,
            Is.Not.Null.And.Not.Empty,
            "ImageBase64 should contain encoded image data"
        );

        // Verify MIME type is a valid image MIME type
        Assert.That(result.MimeType, Is.Not.Null.And.Not.Empty, "MimeType should be populated");
        Assert.That(
            result.MimeType,
            Does.StartWith("image/"),
            "MimeType should be an image MIME type (e.g., image/jpeg, image/png)"
        );

        // Verify dimensions are present and positive
        Assert.That(result.Width, Is.GreaterThan(0), "Width should be a positive integer");
        Assert.That(result.Height, Is.GreaterThan(0), "Height should be a positive integer");
    }

    // =========================================================================
    // THUMBNAIL DIMENSION TESTS (BHV-305, TS-085)
    // =========================================================================

    /// <summary>
    /// Thumbnail quality tier produces images at exactly 90x60 pixels.
    /// GM-010 expected: thumbnailDimensions { width: 90, height: 60 }
    /// This is a domain constraint from PT9 MarbleImageData.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-307")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Thumbnail quality tier produces exactly 90x60 pixel images (GM-010, TS-085)")]
    public async Task GetImageData_ThumbnailQuality_Returns90x60()
    {
        // Arrange: Request image data at thumbnail quality
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "thumbnail",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Thumbnail dimensions must be exactly 90x60
        Assert.That(result.Success, Is.True, "Thumbnail retrieval should succeed");
        Assert.That(
            result.Width,
            Is.EqualTo(90),
            "GM-010/TS-085: Thumbnail width must be exactly 90 pixels"
        );
        Assert.That(
            result.Height,
            Is.EqualTo(60),
            "GM-010/TS-085: Thumbnail height must be exactly 60 pixels"
        );
    }

    /// <summary>
    /// Thumbnail quality produces valid base64 data and correct MIME type even for small images.
    /// Verifies the base64 string is not empty and represents valid encoded data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Thumbnail quality returns valid base64 data with image MIME type")]
    public async Task GetImageData_ThumbnailQuality_ReturnsValidBase64()
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "thumbnail",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Base64 is valid (can be decoded without error)
        Assert.That(result.Success, Is.True);
        Assert.That(result.ImageBase64, Is.Not.Null.And.Not.Empty);
        Assert.That(result.MimeType, Does.StartWith("image/"));

        // Verify base64 is decodable (not garbage)
        byte[]? decoded = null;
        Assert.DoesNotThrow(
            () => decoded = Convert.FromBase64String(result.ImageBase64!),
            "ImageBase64 must be valid base64-encoded data"
        );
        Assert.That(decoded, Is.Not.Null.And.Not.Empty, "Decoded image data should not be empty");
    }

    // =========================================================================
    // QUALITY TIER TESTS (BHV-305)
    // =========================================================================

    /// <summary>
    /// All four quality tiers are accepted and return image data.
    /// Quality maps to: thumbnail (60px), lowDef (480px), standardDef (720px), highDef (1080px)
    /// </summary>
    [TestCase("thumbnail")]
    [TestCase("lowDef")]
    [TestCase("standardDef")]
    [TestCase("highDef")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("All valid quality tier values return image data (BHV-305)")]
    public async Task GetImageData_AllQualityTiers_ReturnImageData(string quality)
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: quality,
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Should succeed and return image data
        Assert.That(result.Success, Is.True, $"Quality tier '{quality}' should succeed");
        Assert.That(
            result.ImageBase64,
            Is.Not.Null.And.Not.Empty,
            $"Quality tier '{quality}' should return image data"
        );
        Assert.That(
            result.Width,
            Is.GreaterThan(0),
            $"Quality tier '{quality}' should have positive width"
        );
        Assert.That(
            result.Height,
            Is.GreaterThan(0),
            $"Quality tier '{quality}' should have positive height"
        );
    }

    /// <summary>
    /// Higher quality tiers produce larger or equal image dimensions.
    /// The dimension ordering should be: thumbnail &lt; lowDef &lt;= standardDef &lt;= highDef.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Quality tiers produce increasing dimensions: thumbnail < lowDef <= standardDef <= highDef"
    )]
    public async Task GetImageData_QualityTierOrdering_DimensionsIncrease()
    {
        string[] tiers = ["thumbnail", "lowDef", "standardDef", "highDef"];
        var dimensions = new List<(int Width, int Height)>();

        foreach (var tier in tiers)
        {
            var input = new ImageRetrievalInput(
                ImageId: "IMG001",
                VerseRef: null,
                Collection: null,
                Quality: tier,
                LanguageId: "en",
                TabType: null
            );

            var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);
            Assert.That(result.Success, Is.True, $"Quality tier '{tier}' should succeed");
            dimensions.Add((result.Width, result.Height));
        }

        // Thumbnail should be smallest
        Assert.That(
            dimensions[0].Width,
            Is.LessThanOrEqualTo(dimensions[1].Width),
            "Thumbnail width should be <= lowDef width"
        );

        // Each successive tier should be >= the previous
        for (int i = 1; i < dimensions.Count; i++)
        {
            Assert.That(
                dimensions[i].Width,
                Is.GreaterThanOrEqualTo(dimensions[i - 1].Width),
                $"Quality tier {tiers[i]} width should be >= {tiers[i - 1]} width"
            );
        }
    }

    // =========================================================================
    // MIME TYPE TESTS (BHV-305)
    // =========================================================================

    /// <summary>
    /// MIME type correctly identifies JPEG images.
    /// When the source image is a JPEG, the MIME type should be "image/jpeg".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("JPEG image returns MIME type 'image/jpeg'")]
    public async Task GetImageData_JpegImage_ReturnsMimeTypeImageJpeg()
    {
        // Arrange: Request data for a JPEG image
        var input = new ImageRetrievalInput(
            ImageId: "IMG_JPEG",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.MimeType,
            Is.EqualTo("image/jpeg"),
            "JPEG images should have MIME type 'image/jpeg'"
        );
    }

    /// <summary>
    /// MIME type correctly identifies PNG images.
    /// When the source image is a PNG, the MIME type should be "image/png".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("PNG image returns MIME type 'image/png'")]
    public async Task GetImageData_PngImage_ReturnsMimeTypeImagePng()
    {
        // Arrange: Request data for a PNG image
        var input = new ImageRetrievalInput(
            ImageId: "IMG_PNG",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.MimeType,
            Is.EqualTo("image/png"),
            "PNG images should have MIME type 'image/png'"
        );
    }

    // =========================================================================
    // ERROR CONDITION TESTS (Section 4.7)
    // =========================================================================

    /// <summary>
    /// When imageId references an image that does not exist in the resource,
    /// returns NOT_FOUND error.
    /// Contract Section 4.7: "Image '{imageId}' not found in resource"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Image not found returns NOT_FOUND error with imageId in message")]
    public async Task GetImageData_ImageNotFound_ReturnsNotFoundError()
    {
        // Arrange: Request data for a non-existent image
        var input = new ImageRetrievalInput(
            ImageId: "NONEXISTENT_IMAGE_XYZ",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: NOT_FOUND error with image ID in message
        Assert.That(result.Success, Is.False, "Should fail for non-existent image");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Does.Contain("NONEXISTENT_IMAGE_XYZ"),
            "Error message should include the requested imageId"
        );
    }

    /// <summary>
    /// When the image file on disk is corrupt or unreadable, returns DATA_ERROR.
    /// Contract Section 4.7: "Failed to read image data"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Corrupt image file returns DATA_ERROR with descriptive message")]
    public async Task GetImageData_CorruptImageFile_ReturnsDataError()
    {
        // Arrange: Request data for an image that exists but is corrupt
        var input = new ImageRetrievalInput(
            ImageId: "IMG_CORRUPT",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: DATA_ERROR
        Assert.That(result.Success, Is.False, "Should fail for corrupt image");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("DATA_ERROR"),
            "Error code should be DATA_ERROR"
        );
        Assert.That(
            result.Error.Message,
            Does.Contain("read").IgnoreCase.Or.Contain("image").IgnoreCase,
            "Error message should describe image read failure"
        );
    }

    /// <summary>
    /// When no imageId is provided in the input, returns INVALID_INPUT.
    /// Contract Section 4.7 precondition: "imageId must be provided"
    /// Unlike GetImageMetadata (CAP-006) which accepts verseRef as alternative,
    /// GetImageData requires an explicit imageId.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("No imageId provided returns INVALID_INPUT error")]
    public async Task GetImageData_NoImageId_ReturnsInvalidInputError()
    {
        // Arrange: imageId is null (verseRef alone is not sufficient for GetImageData)
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: INVALID_INPUT error
        Assert.That(result.Success, Is.False, "Should fail when imageId not provided");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Does.Contain("imageId").IgnoreCase,
            "Error message should mention imageId requirement"
        );
    }

    /// <summary>
    /// When both imageId and verseRef are null, returns INVALID_INPUT.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Both imageId and verseRef null returns INVALID_INPUT error")]
    public async Task GetImageData_BothIdAndRefNull_ReturnsInvalidInputError()
    {
        // Arrange: Both fields null
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: INVALID_INPUT error
        Assert.That(result.Success, Is.False, "Should fail when no image identifier provided");
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
    /// Successful result has correct structure:
    /// - Success = true, ImageBase64 populated, MimeType populated, Width &gt; 0, Height &gt; 0, Error = null
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Successful result has all required fields populated per ImageDataResult contract"
    )]
    public async Task GetImageData_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Full structure verification
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Success should be true");
            Assert.That(result.ImageBase64, Is.Not.Null.And.Not.Empty, "ImageBase64 required");
            Assert.That(result.MimeType, Is.Not.Null.And.Not.Empty, "MimeType required");
            Assert.That(result.Width, Is.GreaterThan(0), "Width must be positive");
            Assert.That(result.Height, Is.GreaterThan(0), "Height must be positive");
            Assert.That(result.Error, Is.Null, "Error should be null on success");
        });
    }

    /// <summary>
    /// Error result has correct structure:
    /// - Success = false, ImageBase64 = null, Error populated with code and message
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Error result has correct structure per ImageDataResult contract")]
    public async Task GetImageData_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger an error condition (no imageId)
        var input = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Error structure verification
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Success should be false");
            Assert.That(result.Error, Is.Not.Null, "Error should be populated");
            Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code required");
            Assert.That(result.Error.Message, Is.Not.Null.And.Not.Empty, "Error message required");
        });
    }

    // =========================================================================
    // GOLDEN MASTER TEST (GM-010)
    // =========================================================================

    /// <summary>
    /// Golden master test: Thumbnail dimensions match GM-010 expected output.
    /// GM-010 specifies: thumbnailDimensions { width: 90, height: 60 }
    /// This test verifies the exact values from the golden master.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("GM-010: Thumbnail dimensions are exactly 90x60 as specified in golden master")]
    public async Task GetImageData_GoldenMaster_ThumbnailDimensions()
    {
        // Arrange: Request thumbnail quality image data
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "thumbnail",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: GM-010 thumbnailDimensions: { width: 90, height: 60 }
        Assert.That(result.Success, Is.True, "GM-010 thumbnail retrieval should succeed");
        Assert.That(result.Width, Is.EqualTo(90), "GM-010: thumbnailDimensions.width must be 90");
        Assert.That(result.Height, Is.EqualTo(60), "GM-010: thumbnailDimensions.height must be 60");
    }

    // =========================================================================
    // APOSTROPHE FILENAME HANDLING (TS-079, VAL-011)
    // =========================================================================

    /// <summary>
    /// Apostrophes in imageId are handled correctly for path lookup.
    /// This edge case is documented in TS-079 and VAL-011: apostrophes in image
    /// filenames are replaced with underscore for path lookup. GetImageData should
    /// handle imageIds that contain apostrophes by normalizing them.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Apostrophe in imageId is normalized for file lookup (VAL-011, TS-079)")]
    public async Task GetImageData_ApostropheInImageId_HandledCorrectly()
    {
        // Arrange: imageId with apostrophe (as referenced in TS-079)
        var input = new ImageRetrievalInput(
            ImageId: "Abraham's_Well",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Should either succeed (image found after apostrophe substitution)
        // or return NOT_FOUND (which is valid). It should NOT return INVALID_INPUT,
        // because the apostrophe is a valid part of the image name that gets normalized.
        if (result.Success)
        {
            Assert.That(
                result.ImageBase64,
                Is.Not.Null.And.Not.Empty,
                "Image data should be returned after apostrophe normalization"
            );
        }
        else
        {
            // If not found, that is acceptable, but the error should be NOT_FOUND,
            // not INVALID_INPUT (the apostrophe should not cause a validation error)
            Assert.That(
                result.Error!.Code,
                Is.Not.EqualTo("INVALID_INPUT"),
                "TS-079: Apostrophe in imageId should not cause INVALID_INPUT; "
                    + "it should be normalized per VAL-011"
            );
        }
    }

    // =========================================================================
    // BASE64 ENCODING VALIDITY TESTS
    // =========================================================================

    /// <summary>
    /// The base64-encoded image data can be successfully decoded to raw bytes.
    /// This ensures the encoding is valid and not truncated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Base64 image data is valid and decodable")]
    public async Task GetImageData_Base64Data_IsValidAndDecodable()
    {
        // Arrange
        var input = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var result = await ImageService.GetImageDataAsync(input, CancellationToken.None);

        // Assert: Base64 decodes without error and produces non-empty bytes
        Assert.That(result.Success, Is.True);
        Assert.That(result.ImageBase64, Is.Not.Null.And.Not.Empty);

        byte[] decoded = Convert.FromBase64String(result.ImageBase64!);
        Assert.That(decoded.Length, Is.GreaterThan(0), "Decoded image bytes should not be empty");
    }

    /// <summary>
    /// The base64 data size is consistent with the quality tier: higher quality
    /// tiers produce equal or larger base64 payloads.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Description("Higher quality tiers produce equal or larger base64 payloads")]
    public async Task GetImageData_HigherQuality_ProducesLargerPayload()
    {
        // Arrange: Get thumbnail and standardDef for the same image
        var thumbnailInput = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "thumbnail",
            LanguageId: "en",
            TabType: null
        );

        var standardInput = new ImageRetrievalInput(
            ImageId: "IMG001",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );

        // Act
        var thumbnailResult = await ImageService.GetImageDataAsync(
            thumbnailInput,
            CancellationToken.None
        );
        var standardResult = await ImageService.GetImageDataAsync(
            standardInput,
            CancellationToken.None
        );

        // Assert: Standard definition should produce equal or larger payload than thumbnail
        Assert.That(thumbnailResult.Success, Is.True);
        Assert.That(standardResult.Success, Is.True);

        Assert.That(
            standardResult.ImageBase64!.Length,
            Is.GreaterThanOrEqualTo(thumbnailResult.ImageBase64!.Length),
            "Standard definition base64 should be >= thumbnail base64 size"
        );
    }
}
