namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the term rendering status determination.
///
/// Contract: Section 3.7 TermRenderingStatusResult (data-contracts.md)
/// Behavior: BHV-404 (Highlight Button Toggle State Machine)
/// </summary>
public record TermRenderingStatusResult(
    bool Success,
    TermRenderingStatusCode? StatusCode,
    string? FoundRendering,
    bool? HasRendering,
    string? CssClass,
    ErrorInfo? Error
);
