using Paranext.DataProvider.Errors;
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

    // Test-fixture injection seams (N3: patterns.csharp.testScaffoldingLocation).
    // Production treats null overrides as "no data". Tests populate these in [SetUp]
    // from MediaFixtures and clear them in [TearDown]. Real package-backed data will
    // be wired up by the deferred marble-discovery work.
    internal static IReadOnlyList<MediaDisplayItem>? ImagesOverride { get; set; }
    internal static IReadOnlySet<string>? KnownResourcesOverride { get; set; }

    private static IReadOnlyList<MediaDisplayItem> Images => ImagesOverride ?? s_emptyImages;

    private static IReadOnlySet<string> KnownResources =>
        KnownResourcesOverride ?? s_emptyKnownResources;

    private static readonly IReadOnlyList<MediaDisplayItem> s_emptyImages = [];
    private static readonly IReadOnlySet<string> s_emptyKnownResources = new HashSet<string>(
        StringComparer.OrdinalIgnoreCase
    );

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
        if (!KnownResources.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // Get images matching the current reference scope
        var allImages = GetImagesForScope(input);

        // Apply Satellite Bible Atlas filter (EXT-067)
        var filteredItems = allImages
            .Where(image => !InvalidImageForTab(image.Collection, input.TabType))
            .Select((image, index) => image with { DisplayIndex = index })
            .ToList();

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

    private static List<MediaDisplayItem> GetImagesForScope(MediaLoadInput input)
    {
        int queryBbbcccvvv = input.CurrentReference.BBBCCCVVV;

        return Images
            .Where(image =>
                queryBbbcccvvv >= image.StartRef.BBBCCCVVV
                && queryBbbcccvvv <= image.EndRef.BBBCCCVVV
            )
            .ToList();
    }
}
