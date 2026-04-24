using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Builds the <see cref="MediaData"/> record for MediaService tests. Replaces the
/// prior static ImagesOverride / ApplyDefaults+Clear pattern; each test constructs
/// its own service instance with either <see cref="BuildMediaData"/> or a record-`with`
/// expression derived from it.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class MediaFixtures
{
    internal static readonly IReadOnlySet<string> KnownResources = new HashSet<string>(
        StringComparer.OrdinalIgnoreCase
    )
    {
        "SDBG",
        "SDBH",
    };

    /// <summary>
    /// Canned Media images: mixed collection with both General and SBA items for
    /// Matthew 1 (book 40). Exercises the SatelliteBibleAtlas filter.
    /// </summary>
    internal static IReadOnlyList<MediaDisplayItem> BuildDefaultImages() =>
        [
            new MediaDisplayItem(
                ImageId: "img-001",
                ImageSource: "images/genesis-creation.jpg",
                Title: "Creation Scene",
                ThumbnailSource: "thumbs/genesis-creation.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 1, 25),
                Collection: "General",
                LanguageCode: "en",
                DisplayIndex: 0
            ),
            new MediaDisplayItem(
                ImageId: "img-002",
                ImageSource: "images/holy-land-map.jpg",
                Title: "Holy Land Map",
                ThumbnailSource: "thumbs/holy-land-map.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 28, 20),
                Collection: "Satellite Bible Atlas",
                LanguageCode: "en",
                DisplayIndex: 0
            ),
            new MediaDisplayItem(
                ImageId: "img-003",
                ImageSource: "images/bethlehem-scene.jpg",
                Title: "Bethlehem Scene",
                ThumbnailSource: "thumbs/bethlehem-scene.jpg",
                StartRef: new VerseRef(40, 1, 1),
                EndRef: new VerseRef(40, 2, 23),
                Collection: "General",
                LanguageCode: "en",
                DisplayIndex: 0
            ),
        ];

    /// <summary>
    /// Builds a <see cref="MediaData"/> with the default images, no image-binary
    /// packages, and the canonical known-resources set.
    /// </summary>
    internal static MediaData BuildMediaData() =>
        new(
            Images: BuildDefaultImages(),
            ImageProjects: new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase),
            KnownResourceIds: new HashSet<string>(KnownResources, StringComparer.OrdinalIgnoreCase)
        );
}
