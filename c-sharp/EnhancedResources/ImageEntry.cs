namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Image metadata entry for Enhanced Resource image index lookups.
/// Simplified version of the PT9 BibleImages.BibleImage structure.
/// </summary>
/// <remarks>
/// Ported from PT9 Paratext/Marble/MarbleImageData.cs (EXT-064, CAP-028).
/// </remarks>
public record ImageEntry(
    string ImageId,
    string StartRef,
    string EndRef,
    string CollectionName,
    string FilePath
);
