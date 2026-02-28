namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Encyclopedia entry result supporting both V1 and V2 formats with paragraph formatting.
///
/// Contract: Section 3.4 EncyclopediaResult (data-contracts.md)
/// </summary>
public record EncyclopediaResult(
    bool Success,
    IReadOnlyList<EncyclopediaEntry>? Entries,
    ErrorInfo? Error
);
