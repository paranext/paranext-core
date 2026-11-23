namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of media loading with Satellite Bible Atlas filter applied.
/// Images tab: excludes "Satellite Bible Atlas".
/// Maps tab: only "Satellite Bible Atlas".
/// Source: EXT-060, EXT-067, BHV-359
/// </summary>
public record MediaLoadResult(
    IList<MediaDisplayItem> Items,
    string CountLabel,
    string? EmptyStateMessage
);
