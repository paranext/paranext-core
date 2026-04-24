// === NEW IN PT10 ===
// Reason: Backing record for MediaService.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Images: display items built from IMG_INDX, with ImageSource/ThumbnailSource URLs
/// pre-formatted as papi-er://images/{imageId}.
/// ImageProjects: installed image-binary packages (IMG_THMB, IMG_LD, IMG_SD, IMG_HD)
/// used by FetchImageBytes for binary extraction.
/// </summary>
internal sealed record MediaData(
    IReadOnlyList<MediaDisplayItem> Images,
    IReadOnlyDictionary<string, ResourceScrText> ImageProjects,
    IReadOnlySet<string> KnownResourceIds
)
{
    public static MediaData Empty { get; } =
        new(
            [],
            new Dictionary<string, ResourceScrText>(StringComparer.OrdinalIgnoreCase),
            new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );
}
