namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of tooltip generation for a linked word.
///
/// On success: TooltipHtml contains the formatted HTML tooltip string.
/// On failure: Error contains error code and message.
///
/// Contract: Section 4.13 GenerateTooltip (data-contracts.md)
/// </summary>
public record TooltipResult(
    bool Success,
    /// <summary>Formatted HTML title attribute string combining lemma, gloss, POS, and rendering status.</summary>
    string? TooltipHtml = null,
    /// <summary>Error information when Success is false.</summary>
    ErrorInfo? Error = null
);
