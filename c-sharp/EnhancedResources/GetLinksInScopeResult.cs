namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of filtering the token stream by scope.
/// On success: links, tokenIndices, and matchCount are populated.
/// On failure: error contains code and message.
///
/// Contract: Section 4.3 GetLinksInScope (data-contracts.md)
/// </summary>
public record GetLinksInScopeResult(
    bool Success,
    IReadOnlyList<LexicalLink>? Links = null,
    IReadOnlyList<int>? TokenIndices = null,
    int MatchCount = 0,
    ErrorInfo? Error = null
);
