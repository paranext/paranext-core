namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Media/Maps tab loading and image filtering.
/// Images tab excludes "Satellite Bible Atlas" collection.
/// Maps tab includes only "Satellite Bible Atlas" collection.
/// Source: CAP-011, EXT-060, EXT-067, BHV-359
/// </summary>
internal static class MediaService
{
    // === STUB: EXT-060 MediaTab Resource Loading ===
    // Source: PT9/Paratext/Marble/MediaTab.cs
    // Method: MediaTab.LoadResources
    // Maps to: EXT-060, BHV-359

    /// <summary>
    /// Loads media items filtered by tab type using InvalidImageForTab.
    /// Returns MediaLoadResult with items, countLabel, and emptyStateMessage.
    /// </summary>
    public static MediaLoadResult LoadResources(MediaLoadInput input)
    {
        throw new NotImplementedException(
            "CAP-011: MediaService.LoadResources not yet implemented"
        );
    }

    // === STUB: EXT-067 Media Satellite Bible Atlas Filter ===
    // Source: PT9/Paratext/Marble/MediaTab.cs
    // Method: MediaTab.InvalidImageForTab
    // Maps to: EXT-067, BHV-359

    /// <summary>
    /// Returns true if image should NOT appear in this tab type.
    /// Images tab: exclude "Satellite Bible Atlas". Maps tab: exclude non-"Satellite Bible Atlas".
    /// </summary>
    public static bool InvalidImageForTab(string collection, MediaTabType tabType)
    {
        throw new NotImplementedException(
            "CAP-011: MediaService.InvalidImageForTab not yet implemented"
        );
    }
}
