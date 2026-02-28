namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of an abbreviation definition lookup.
///
/// Contract: Section 4.19 GetAbbreviationDefinition (data-contracts.md)
///
/// On success: Success=true, Key and Definition are populated.
/// On failure: Success=false, Error contains the error code and message.
/// </summary>
public record AbbreviationResult(
    bool Success,
    string? Key = null,
    string? Definition = null,
    ErrorInfo? Error = null
);
