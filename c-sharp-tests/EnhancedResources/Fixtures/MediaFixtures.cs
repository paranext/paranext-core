using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test fixtures for MediaService. Holds canned image data and the known-resources
/// set previously embedded in MediaService.cs. Tests populate MediaService overrides
/// from this class in [SetUp] and clear them in [TearDown].
///
/// Precedent: DictionaryFixtures, EncyclopediaFixtures. Enforced by N3 policy
/// (patterns.csharp.testScaffoldingLocation).
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
    /// Canned Media images: mixed collection with both General and SBA items
    /// for Matthew 1 (book 40). Includes both General and SBA to exercise the
    /// SatelliteBibleAtlas filter in InvalidImageForTab. DisplayIndex is 0 as
    /// a placeholder; MediaService.LoadResources reassigns it during filtering.
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

    /// <summary>Populate MediaService overrides with the default fixtures.</summary>
    internal static void ApplyDefaults()
    {
        MediaService.ImagesOverride = BuildDefaultImages();
        MediaService.KnownResourcesOverride = KnownResources;
    }

    /// <summary>Clear MediaService overrides to avoid leaking state between tests.</summary>
    internal static void Clear()
    {
        MediaService.ImagesOverride = null;
        MediaService.KnownResourcesOverride = null;
    }
}
