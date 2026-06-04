namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of dictionary loading with deduplication applied.
/// Source: CAP-007, EXT-053, EXT-055, EXT-056
/// </summary>
public record DictionaryLoadResult(
    IList<DictionaryDisplayItem> Items,
    string ActiveDictionary,
    string? EmptyStateMessage
);
