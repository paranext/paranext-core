namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the ParseLexicalLinks operation.
///
/// On success: Success=true, Links contains parsed LexicalLink objects.
/// On failure: Success=false, Error contains the error code and message.
///
/// Contract: Section 3.1 (data-contracts.md)
/// </summary>
public record ParseLexicalLinksResult(
    bool Success,
    IReadOnlyList<LexicalLink>? Links = null,
    ErrorInfo? Error = null
);
