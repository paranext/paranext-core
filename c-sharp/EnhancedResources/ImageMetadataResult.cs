namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of image metadata retrieval, containing a list of image metadata entries.
/// Contract: Section 3.5 ImageMetadataResult (data-contracts.md)
/// </summary>
public record ImageMetadataResult(
    bool Success,
    IReadOnlyList<ImageMetadata>? Images,
    ErrorInfo? Error
);
