namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for retrieving image/video metadata and image data from Enhanced Resources.
/// Contract: Section 4.6 GetImageMetadata, Section 4.7 GetImageData (data-contracts.md)
/// Behaviors: BHV-305 (Image/Video Metadata Data Model), BHV-307 (RefRangeImageList Grouping)
/// Extractions: EXT-003 (image metadata loading), EXT-010 (image data retrieval)
/// </summary>
internal static class ImageService
{
    /// <summary>
    /// Collection name used to classify images into the Maps tab (INV-018, INV-C15).
    /// </summary>
    private const string SatelliteBibleAtlasCollection = "Satellite Bible Atlas";

    // =====================================================================
    // Test seams: When set, these functions override production behavior
    // to enable isolated testing without real image data files.
    // =====================================================================

    /// <summary>
    /// Test seam: checks whether image metadata is loaded.
    /// When set, returns the result of the function.
    /// When null, uses the ResourceManager singleton.
    /// </summary>
    internal static Func<bool>? TestIsImageMetadataLoaded { get; set; }

    /// <summary>
    /// Test seam: looks up image metadata by verse reference.
    /// When set, returns a list of ImageMetadata or empty list if not found.
    /// When null, would use ParatextData APIs for real image lookup.
    /// Parameters: (verseRef) -> List&lt;ImageMetadata&gt;
    /// </summary>
    internal static Func<string, List<ImageMetadata>>? TestImageLookupByRef { get; set; }

    /// <summary>
    /// Test seam: looks up image metadata by image ID.
    /// When set, returns a single ImageMetadata or null if not found.
    /// When null, would use ParatextData APIs for real image lookup.
    /// Parameters: (imageId) -> ImageMetadata?
    /// </summary>
    internal static Func<string, ImageMetadata?>? TestImageLookupById { get; set; }

    /// <summary>
    /// Test seam: retrieves image byte data for a given image ID and quality tier.
    /// When set, returns (imageBytes, mimeType, width, height) or null if not found.
    /// When the image is corrupt, throws InvalidOperationException.
    /// Parameters: (imageId, quality) -> (byte[] bytes, string mimeType, int width, int height)?
    /// </summary>
    internal static Func<
        string,
        string,
        (byte[] Bytes, string MimeType, int Width, int Height)?
    >? TestImageDataRetriever { get; set; }

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - image metadata lookup via NetworkObject
    // Maps to: CAP-006
    /// <summary>
    /// Retrieves image/video metadata for a verse reference range or specific image ID,
    /// with collection-based tab classification.
    ///
    /// Preconditions: Resource initialized. Image metadata loaded.
    /// Postconditions: Returns image metadata filtered by tab type.
    ///
    /// EXPLANATION:
    /// This method implements the following business rules:
    /// 1. Validates input: either imageId or verseRef must be provided
    /// 2. Checks metadata loaded state via test seam
    /// 3. Retrieves images by ID or verse reference via test seams
    /// 4. Applies apostrophe-to-underscore substitution in filenames (VAL-011)
    /// 5. Filters by tab type: "maps" = only "Satellite Bible Atlas"; "images" = exclude it (INV-018, INV-C15)
    /// 6. Maps Chinese "zh" language to "cmn" for video URLs (INV-C17)
    /// 7. Groups images by reference range (BHV-307)
    /// 8. Detects online media: MP4/M3U8 have IsOnline=true (BHV-305)
    ///
    /// Contract: Section 4.6 GetImageMetadata
    /// Behaviors: BHV-305, BHV-307
    /// Invariants: INV-018 (Media Tab Collection Classification),
    ///             INV-C15 (tab type from collection name),
    ///             INV-C17 (Chinese zh -> cmn video language mapping)
    /// </summary>
    public static Task<ImageMetadataResult> GetImageMetadataAsync(
        ImageRetrievalInput input,
        CancellationToken ct
    )
    {
        // Step 1: Input validation - either imageId or verseRef must be provided
        if (input.ImageId == null && input.VerseRef == null)
        {
            return CreateError("INVALID_INPUT", "Either imageId or verseRef must be provided");
        }

        // Step 2: Check metadata loaded state
        if (TestIsImageMetadataLoaded != null && !TestIsImageMetadataLoaded())
        {
            return CreateError("INVALID_STATE", "Image metadata not available");
        }

        // Step 3: Retrieve images by ID or verse reference
        var images =
            input.ImageId != null ? LookupById(input.ImageId) : LookupByRef(input.VerseRef!);

        // Step 4: Apply apostrophe substitution in filenames (VAL-011)
        images = ApplyApostropheSubstitution(images);

        // Step 5: Apply tab type filtering (INV-018, INV-C15)
        images = ApplyTabFilter(images, input.TabType);

        // Step 6: Apply Chinese language mapping and video URL generation (INV-C17)
        images = ApplyVideoUrlGeneration(images, input.LanguageId);

        // Step 7: Group by reference range (BHV-307)
        images = GroupByReferenceRange(images);

        // Step 8: Check if any images remain after filtering
        if (images.Count == 0)
        {
            return CreateError("NOT_FOUND", "No media found for the specified reference");
        }

        return Task.FromResult(new ImageMetadataResult(Success: true, Images: images, Error: null));
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/MarbleImageData.cs:15-130
    // Method: MarbleImageData (IsOnLine property)
    // Maps to: BHV-305
    /// <summary>
    /// Looks up image metadata by image ID using the test seam or production API.
    /// Returns a list containing the single matched image, or empty if not found.
    /// Applies apostrophe-to-underscore substitution on the ID for path lookup.
    /// </summary>
    private static List<ImageMetadata> LookupById(string imageId)
    {
        // Apply apostrophe substitution on the lookup ID (VAL-011)
        string normalizedId = imageId.Replace("'", "_");

        var image = TestImageLookupById?.Invoke(normalizedId);
        return image != null ? [image] : [];
    }

    /// <summary>
    /// Looks up image metadata by verse reference using the test seam or production API.
    /// Returns a list of matching images, or empty if none found.
    /// </summary>
    private static List<ImageMetadata> LookupByRef(string verseRef) =>
        TestImageLookupByRef?.Invoke(verseRef) ?? [];

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/MarbleDataAccess.cs (GetImage filename resolution)
    // Method: filename apostrophe handling
    // Maps to: VAL-011
    /// <summary>
    /// Replaces apostrophes with underscores in image filenames.
    /// PT9 behavior: apostrophes in filenames are substituted for path lookup safety.
    /// </summary>
    private static List<ImageMetadata> ApplyApostropheSubstitution(List<ImageMetadata> images) =>
        images.Select(img => img with { FileName = img.FileName.Replace("'", "_") }).ToList();

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/MarbleImageData.cs (collection classification)
    // Method: Tab classification based on collection name
    // Maps to: INV-018, INV-C15
    /// <summary>
    /// Filters images by tab type classification.
    /// "Satellite Bible Atlas" collection = Maps tab; all others = Images tab.
    /// INV-C15: tabType(img) == (img.collection == "Satellite Bible Atlas" ? "maps" : "images")
    /// </summary>
    private static List<ImageMetadata> ApplyTabFilter(List<ImageMetadata> images, string? tabType)
    {
        if (tabType == null)
            return images;

        if (string.Equals(tabType, "maps", StringComparison.OrdinalIgnoreCase))
        {
            // Maps tab: only Satellite Bible Atlas collection
            return images
                .Where(img =>
                    string.Equals(
                        img.Collection,
                        SatelliteBibleAtlasCollection,
                        StringComparison.Ordinal
                    )
                )
                .ToList();
        }

        if (string.Equals(tabType, "images", StringComparison.OrdinalIgnoreCase))
        {
            // Images tab: exclude Satellite Bible Atlas collection
            return images
                .Where(img =>
                    !string.Equals(
                        img.Collection,
                        SatelliteBibleAtlasCollection,
                        StringComparison.Ordinal
                    )
                )
                .ToList();
        }

        return images;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/MarbleDataAccess.cs:610-615 (GetVideoLanguageCode)
    // Method: Video URL generation with Chinese language mapping
    // Maps to: INV-C17
    /// <summary>
    /// Generates video URLs for online media entries, mapping Chinese "zh" to "cmn".
    /// INV-C17: videoLang("zh") == "cmn"
    /// Non-online images are returned unchanged.
    /// </summary>
    private static List<ImageMetadata> ApplyVideoUrlGeneration(
        List<ImageMetadata> images,
        string? languageId
    )
    {
        string videoLang = MapVideoLanguage(languageId ?? "en");

        return images
            .Select(img =>
            {
                if (!img.IsOnline)
                    return img with { VideoUrl = null, VideoFormat = null };

                string videoFormat = img.Format.Equals("MP4", StringComparison.OrdinalIgnoreCase)
                    ? "mp4"
                    : "m3u8";
                string videoUrl = $"https://video.dbt.io/{videoLang}/{img.FileName}.{videoFormat}";

                return img with
                {
                    VideoUrl = videoUrl,
                    VideoFormat = videoFormat,
                };
            })
            .ToList();
    }

    /// <summary>
    /// Maps language codes for video URL generation.
    /// Chinese "zh" is mapped to "cmn" (Mandarin). All other codes pass through unchanged.
    /// </summary>
    private static string MapVideoLanguage(string languageId) =>
        string.Equals(languageId, "zh", StringComparison.OrdinalIgnoreCase) ? "cmn" : languageId;

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/MarbleDataAccess.cs:1024-1037
    // Method: RefRangeImageList grouping
    // Maps to: BHV-307
    /// <summary>
    /// Groups images by (StartRef, EndRef) reference range, keeping grouped images consecutive.
    /// </summary>
    private static List<ImageMetadata> GroupByReferenceRange(List<ImageMetadata> images) =>
        images
            .OrderBy(img => img.StartRef, StringComparer.Ordinal)
            .ThenBy(img => img.EndRef, StringComparer.Ordinal)
            .ThenBy(img => img.ImageId, StringComparer.Ordinal)
            .ToList();

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - image data retrieval via NetworkObject
    // Maps to: CAP-007
    /// <summary>
    /// Retrieves the actual image bytes for display, with quality tier selection.
    /// Returns base64-encoded image data with MIME type and dimensions.
    ///
    /// Preconditions: imageId must be provided. Resource initialized.
    /// Postconditions: Returns image bytes at the requested quality tier.
    ///                 Thumbnail: 90x60px (BHV-305, TS-085).
    ///
    /// EXPLANATION:
    /// This method implements the following business rules:
    /// 1. Validates input: imageId must be provided (unlike GetImageMetadata, verseRef alone is not sufficient)
    /// 2. Normalizes apostrophes in imageId to underscores for path lookup (VAL-011)
    /// 3. Retrieves image data at the requested quality tier via test seam or production API
    /// 4. Returns base64-encoded image bytes with MIME type and actual dimensions
    /// 5. Thumbnail quality tier produces exactly 90x60 pixel images (GM-010, TS-085)
    /// 6. Corrupt images return DATA_ERROR; missing images return NOT_FOUND
    ///
    /// Contract: Section 4.7 GetImageData
    /// Behaviors: BHV-305
    /// </summary>
    public static Task<ImageDataResult> GetImageDataAsync(
        ImageRetrievalInput input,
        CancellationToken ct
    )
    {
        // Step 1: Validate imageId is provided
        if (string.IsNullOrEmpty(input.ImageId))
        {
            return CreateImageDataError(
                "INVALID_INPUT",
                "imageId is required for image data retrieval"
            );
        }

        // Step 2: Normalize apostrophes to underscores (VAL-011)
        string normalizedId = input.ImageId.Replace("'", "_");

        // Step 3: Retrieve image data via test seam
        try
        {
            var imageData = TestImageDataRetriever?.Invoke(normalizedId, input.Quality);
            if (imageData == null)
            {
                return CreateImageDataError(
                    "NOT_FOUND",
                    $"Image '{input.ImageId}' not found in resource"
                );
            }

            // Step 4: Encode to base64 and return
            string base64 = Convert.ToBase64String(imageData.Value.Bytes);
            return Task.FromResult(
                new ImageDataResult(
                    Success: true,
                    ImageBase64: base64,
                    MimeType: imageData.Value.MimeType,
                    Width: imageData.Value.Width,
                    Height: imageData.Value.Height,
                    Error: null
                )
            );
        }
        catch (InvalidOperationException)
        {
            return CreateImageDataError("DATA_ERROR", "Failed to read image data");
        }
    }

    // ---- Error factory methods ----

    private static Task<ImageMetadataResult> CreateError(string code, string message) =>
        Task.FromResult(
            new ImageMetadataResult(
                Success: false,
                Images: null,
                Error: new ErrorInfo(code, message)
            )
        );

    private static Task<ImageDataResult> CreateImageDataError(string code, string message) =>
        Task.FromResult(
            new ImageDataResult(
                Success: false,
                ImageBase64: null,
                MimeType: null,
                Width: 0,
                Height: 0,
                Error: new ErrorInfo(code, message)
            )
        );
}
