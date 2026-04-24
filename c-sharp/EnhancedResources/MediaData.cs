// === NEW IN PT10 ===
// Reason: Backing record for MediaService.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Images: display items built from IMG_INDX, with ImageSource/ThumbnailSource URLs
/// pre-formatted as papi-er://images/{imageId}.
/// ImageProjects: installed image-binary packages (IMG_THMB, IMG_LD, IMG_SD, IMG_HD)
/// used by FetchImageBytes for binary extraction. Stored as IMarblePackage so loaders
/// and tests can populate the map without constructing real ResourceScrText instances;
/// production wraps ResourceScrText via MarblePackage. Task 8 may further refine this
/// to an IImageProject abstraction.
/// </summary>
internal sealed record MediaData(
    IReadOnlyList<MediaDisplayItem> Images,
    IReadOnlyDictionary<string, IMarblePackage> ImageProjects,
    IReadOnlySet<string> KnownResourceIds
)
{
    public static MediaData Empty { get; } =
        new(
            [],
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase),
            new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );
}
