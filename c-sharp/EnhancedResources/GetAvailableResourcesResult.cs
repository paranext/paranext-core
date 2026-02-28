namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the GetAvailableResources operation (Contract: Section 4.16).
///
/// On success: Success=true, Resources contains the list of installed ER projects.
/// On failure: Success=false, Error contains the error code and message.
/// </summary>
public record GetAvailableResourcesResult(
    bool Success,
    IReadOnlyList<ResourceInfo>? Resources = null,
    ErrorInfo? Error = null
);
