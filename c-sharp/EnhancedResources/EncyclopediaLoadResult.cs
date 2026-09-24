namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of encyclopedia loading. V1: simpler paragraph structure.
/// V2: richer with images and cross-refs (no new info, just restructured XML).
/// Source: CAP-009, EXT-057, EXT-058, BHV-604
/// </summary>
public record EncyclopediaLoadResult(
    IList<EncyclopediaDisplayItem> Items,
    string? EmptyStateMessage
);
