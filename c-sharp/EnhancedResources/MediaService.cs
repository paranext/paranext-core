using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Media/Maps tab loading and image filtering.
/// Images tab excludes "Satellite Bible Atlas" collection.
/// Maps tab includes only "Satellite Bible Atlas" collection.
/// Source: CAP-011, EXT-060, EXT-067, BHV-359
/// </summary>
internal static class MediaService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs
    // Method: MediaTab.InvalidImageForTab
    // Maps to: EXT-067, BHV-359

    /// <summary>
    /// The exact string used by PT9 to identify Satellite Bible Atlas images.
    /// gm-018 confirms this is a literal string comparison.
    /// </summary>
    private const string SatelliteBibleAtlasCollection = "Satellite Bible Atlas";

    // Known resource IDs for test scaffolding (follows DictionaryService/EncyclopediaService pattern)
    private static readonly HashSet<string> s_knownResources =
        new(StringComparer.OrdinalIgnoreCase) { "SDBG", "SDBH" };

    // Pre-built test image data: mixed collection with both General and SBA images
    private static readonly List<TestImageEntry> s_testImages = BuildTestImages();

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs
    // Method: MediaTab.InvalidImageForTab (~50 lines)
    // Maps to: EXT-067, BHV-359

    /// <summary>
    /// Returns true if image should NOT appear in this tab type.
    /// Images tab: exclude "Satellite Bible Atlas". Maps tab: exclude non-"Satellite Bible Atlas".
    /// PT9 uses exact string comparison - case-sensitive.
    /// </summary>
    public static bool InvalidImageForTab(string collection, MediaTabType tabType)
    {
        bool isSba = collection == SatelliteBibleAtlasCollection;

        // Images tab: SBA images are invalid (excluded)
        // Maps tab: non-SBA images are invalid (excluded)
        return tabType switch
        {
            MediaTabType.Images => isSba,
            MediaTabType.Maps => !isSba,
            _ => false,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs
    // Method: MediaTab.LoadResources (~200 lines)
    // Maps to: EXT-060, BHV-359

    /// <summary>
    /// Loads media items filtered by tab type using InvalidImageForTab.
    /// Returns MediaLoadResult with items, countLabel, and emptyStateMessage.
    /// </summary>
    public static MediaLoadResult LoadResources(MediaLoadInput input)
    {
        // Validate resource existence
        if (!s_knownResources.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // Get images matching the current reference scope
        var allImages = GetImagesForScope(input);

        // Apply Satellite Bible Atlas filter (EXT-067)
        var filteredItems = new List<MediaDisplayItem>();
        int displayIndex = 0;
        foreach (var image in allImages)
        {
            if (!InvalidImageForTab(image.Collection, input.TabType))
            {
                filteredItems.Add(
                    new MediaDisplayItem(
                        ImageId: image.ImageId,
                        ImageSource: image.ImageSource,
                        Title: image.Title,
                        ThumbnailSource: image.ThumbnailSource,
                        StartRef: image.StartRef,
                        EndRef: image.EndRef,
                        Collection: image.Collection,
                        LanguageCode: image.LanguageCode,
                        DisplayIndex: displayIndex
                    )
                );
                displayIndex++;
            }
        }

        // Build count label
        string countLabel = BuildCountLabel(filteredItems.Count, input.TabType);

        // BHV-352: Empty state message when no items
        string? emptyStateMessage =
            filteredItems.Count == 0 ? "No media data available for the current scope." : null;

        return new MediaLoadResult(
            Items: filteredItems,
            CountLabel: countLabel,
            EmptyStateMessage: emptyStateMessage
        );
    }

    private static string BuildCountLabel(int count, MediaTabType tabType)
    {
        string itemType = tabType == MediaTabType.Maps ? "map" : "media";

        if (count == 1)
            return $"1 {itemType} file";

        return $"{count} {itemType} files";
    }

    private static List<TestImageEntry> GetImagesForScope(MediaLoadInput input)
    {
        // Filter test images by reference range overlap
        int queryBbbcccvvv = input.CurrentReference.BBBCCCVVV;

        return s_testImages
            .Where(image =>
                queryBbbcccvvv >= image.StartRef.BBBCCCVVV
                && queryBbbcccvvv <= image.EndRef.BBBCCCVVV
            )
            .ToList();
    }

    private static List<TestImageEntry> BuildTestImages()
    {
        // Test data: mixed collection for Matthew 1:1 (book 40, chapter 1, verse 1)
        // Includes both General and SBA images to exercise the filter
        return
        [
            new TestImageEntry(
                ImageId: "img-001",
                ImageSource: "images/genesis-creation.jpg",
                Title: "Creation Scene",
                ThumbnailSource: "thumbs/genesis-creation.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 1, 25),
                Collection: "General",
                LanguageCode: "en"
            ),
            new TestImageEntry(
                ImageId: "img-002",
                ImageSource: "images/holy-land-map.jpg",
                Title: "Holy Land Map",
                ThumbnailSource: "thumbs/holy-land-map.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 28, 20),
                Collection: "Satellite Bible Atlas",
                LanguageCode: "en"
            ),
            new TestImageEntry(
                ImageId: "img-003",
                ImageSource: "images/bethlehem-scene.jpg",
                Title: "Bethlehem Scene",
                ThumbnailSource: "thumbs/bethlehem-scene.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 2, 23),
                Collection: "General",
                LanguageCode: "en"
            ),
        ];
    }

    private record TestImageEntry(
        string ImageId,
        string ImageSource,
        string Title,
        string ThumbnailSource,
        VerseRef StartRef,
        VerseRef EndRef,
        string Collection,
        string LanguageCode
    );
}
