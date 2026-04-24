using Paranext.DataProvider.Errors;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MediaTab.cs (LoadResources, InvalidImageForTab),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:854-897 (GetImageProject, FindImageFile).
// Maps to: CAP-011 (LoadMediaResources), EXT-060, EXT-067, BHV-359, BHV-352.
//
// Refactor 2026-04-24: Converted from static class with ImagesOverride/KnownResourcesOverride
// test seams to instance class with primary-constructor-injected MediaData. Adds
// FetchImageBytes for the papi-er:// protocol handler. InvalidImageForTab stays static
// (pure tab-type predicate). See ADR patterns.csharp.serviceComposition.
//
// Image-binary projects are exposed as IMarblePackage (Task 7 deviation): the same
// abstraction loaders use; production wraps ResourceScrText via MarblePackage; tests
// use FakeMarblePackage. No separate IImageProject interface.
internal sealed class MediaService(MediaData data)
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs:InvalidImageForTab
    /// <summary>
    /// The exact string used by PT9 to identify Satellite Bible Atlas images.
    /// gm-018 confirms literal case-sensitive string comparison.
    /// </summary>
    private const string SatelliteBibleAtlasCollection = "Satellite Bible Atlas";

    // Image-project search orders (PT9 MarbleDataAccess.cs:854-866).
    // Task 7 convention: image-binary project short-names match these strings.
    private static readonly string[] FullImageSearchOrder =
    [
        "IMG_HD",
        "IMG_SD",
        "IMG_LD",
        "IMG_THMB",
    ];
    private static readonly string[] ThumbnailSearchOrder =
    [
        "IMG_THMB",
        "IMG_LD",
        "IMG_SD",
        "IMG_HD",
    ];

    /// <summary>
    /// Returns true if the image should NOT appear on the given tab.
    /// Images tab: exclude "Satellite Bible Atlas". Maps tab: include only "Satellite Bible Atlas".
    /// PT9 uses case-sensitive string comparison.
    /// </summary>
    public static bool InvalidImageForTab(string collection, MediaTabType tabType)
    {
        bool isSba = collection == SatelliteBibleAtlasCollection;
        return tabType switch
        {
            MediaTabType.Images => isSba,
            MediaTabType.Maps => !isSba,
            _ => false,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs:LoadResources
    /// <summary>
    /// Loads media items filtered by tab type using <see cref="InvalidImageForTab"/>.
    /// Returns <see cref="MediaLoadResult"/> with items, count label, and empty-state
    /// message.
    /// </summary>
    public MediaLoadResult LoadResources(MediaLoadInput input)
    {
        if (!data.KnownResourceIds.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        var allImages = GetImagesForScope(input);

        var filteredItems = allImages
            .Where(image => !InvalidImageForTab(image.Collection, input.TabType))
            .Select((image, index) => image with { DisplayIndex = index })
            .ToList();

        string countLabel = BuildCountLabel(filteredItems.Count, input.TabType);

        string? emptyStateMessage =
            filteredItems.Count == 0 ? "No media data available for the current scope." : null;

        return new MediaLoadResult(
            Items: filteredItems,
            CountLabel: countLabel,
            EmptyStateMessage: emptyStateMessage
        );
    }

    private static string BuildCountLabel(int count, MediaTabType tabType)
    {
        string itemType = tabType == MediaTabType.Maps ? "map" : "media";
        return count == 1 ? $"1 {itemType} file" : $"{count} {itemType} files";
    }

    private List<MediaDisplayItem> GetImagesForScope(MediaLoadInput input)
    {
        int queryBbbcccvvv = input.CurrentReference.BBBCCCVVV;

        return data
            .Images.Where(image =>
                queryBbbcccvvv >= image.StartRef.BBBCCCVVV
                && queryBbbcccvvv <= image.EndRef.BBBCCCVVV
            )
            .ToList();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:854-897 (GetImageProject, FindImageFile)
    /// <summary>
    /// Resolves an image binary by ID and size. Walks the PT9 search order of
    /// installed image-binary packages (thumbnail: IMG_THMB > IMG_LD > IMG_SD > IMG_HD;
    /// full: IMG_HD > IMG_SD > IMG_LD > IMG_THMB), checks each for the image file
    /// (honoring the <c>'</c> -> <c>_</c> substitution and <c>.jpg</c> -> <c>.png</c>
    /// fallback), extracts via <see cref="IMarblePackage.ResolveAccessiblePath"/>,
    /// reads bytes, and returns them base64-encoded with an appropriate
    /// <c>Content-Type</c>. Returns <c>null</c> if no installed project holds the file.
    /// </summary>
    public FetchImageBytesResult? FetchImageBytes(FetchImageBytesInput input)
    {
        // Find the image metadata by ID so we know the internal path.
        var metadata = data.Images.FirstOrDefault(i => i.ImageId == input.ImageId);
        if (metadata is null)
            return null;

        string candidatePath = BuildInternalPath(metadata);

        string[] searchOrder = string.Equals(
            input.Size,
            "thumbnail",
            StringComparison.OrdinalIgnoreCase
        )
            ? ThumbnailSearchOrder
            : FullImageSearchOrder;

        foreach (var projectName in searchOrder)
        {
            if (!data.ImageProjects.TryGetValue(projectName, out var project))
                continue;

            var resolvedInternalPath = FindImageFile(project, candidatePath);
            if (resolvedInternalPath is null)
                continue;

            try
            {
                var localPath = project.ResolveAccessiblePath(resolvedInternalPath);
                if (string.IsNullOrWhiteSpace(localPath) || !File.Exists(localPath))
                    continue;

                var bytes = File.ReadAllBytes(localPath);
                var contentType = GetContentTypeFromExtension(resolvedInternalPath);
                return new FetchImageBytesResult(
                    ContentType: contentType,
                    Data: Convert.ToBase64String(bytes)
                );
            }
            catch (Exception e)
            {
                Console.WriteLine(
                    $"Enhanced Resources: warning - failed to extract {resolvedInternalPath} "
                        + $"from {projectName}: {e.Message}"
                );
                continue;
            }
        }

        return null;
    }

    // PT9 MarbleDataAccess.cs:281, 302: Path.Combine(imgMetadata.Path, imgMetadata.FileName).
    // If MediaDisplayItem doesn't carry Path/FileName (legacy fixtures), fall back to
    // ImageId + ".jpg" - the .jpg -> .png fallback in FindImageFile covers PNG-only images.
    private static string BuildInternalPath(MediaDisplayItem metadata)
    {
        if (!string.IsNullOrEmpty(metadata.FileName))
        {
            return string.IsNullOrEmpty(metadata.Path)
                ? metadata.FileName
                : Path.Combine(metadata.Path, metadata.FileName);
        }
        return metadata.ImageId + ".jpg";
    }

    // PT9 MarbleDataAccess.cs:885-897. Apply quote-substitution then .jpg -> .png fallback.
    private static string? FindImageFile(IMarblePackage project, string expectedFileName)
    {
        var substituted = expectedFileName.Replace("'", "_");
        if (project.Exists(substituted))
            return substituted;

        if (
            string.Equals(
                Path.GetExtension(substituted),
                ".jpg",
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            var asPng = Path.ChangeExtension(substituted, ".png");
            if (project.Exists(asPng))
                return asPng;
        }

        return null;
    }

    private static string GetContentTypeFromExtension(string path)
    {
        var ext = Path.GetExtension(path).ToLowerInvariant();
        return ext switch
        {
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".webp" => "image/webp",
            ".svg" => "image/svg+xml",
            _ => "application/octet-stream",
        };
    }
}
