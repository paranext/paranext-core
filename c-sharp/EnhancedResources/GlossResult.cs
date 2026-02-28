namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Formatted gloss string for a lexical link, with brace-filtering applied.
///
/// Contract: Section 3.12 GlossResult (data-contracts.md)
/// </summary>
public record GlossResult(
    bool Success,
    string? Gloss = null,
    string? LanguageId = null,
    ErrorInfo? Error = null
);
