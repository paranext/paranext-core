namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Per-image metadata with reference ranges, collection classification, and URL info.
/// Contract: Section 3.5 ImageMetadataResult (data-contracts.md)
/// Behavior: BHV-305 (Image/Video Metadata Data Model)
/// </summary>
public record ImageMetadata(
    string ImageId,
    string Collection,
    string Path,
    string FileName,
    string Format,
    bool IsOnline,
    string StartRef,
    string EndRef,
    string Title,
    string Copyright,
    string? VideoUrl,
    string? VideoFormat
);
