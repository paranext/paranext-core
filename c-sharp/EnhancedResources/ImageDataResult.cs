namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of image data retrieval, containing base64-encoded image bytes with MIME type
/// and dimensions.
/// Contract: Section 4.7 GetImageData (data-contracts.md)
/// </summary>
public record ImageDataResult(
    bool Success,
    string? ImageBase64,
    string? MimeType,
    int Width,
    int Height,
    ErrorInfo? Error
);
