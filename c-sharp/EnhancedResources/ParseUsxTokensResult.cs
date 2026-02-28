namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of parsing USX XML into a token stream.
/// Contract: Section 3.2 ParseUsxTokensResult (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
/// </summary>
public record ParseUsxTokensResult(
    bool Success,
    IReadOnlyList<MarbleToken>? Tokens = null,
    IReadOnlyList<int>? SectionBoundaries = null,
    ErrorInfo? Error = null
);
