// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:480-620 (LoadImageIndex),
//         constants at MarbleDataAccess.cs:200-220.
// Reason: XML-direct extractor producing PT10-native MediaDisplayItem records from
// the IMG_INDX package. Replaces PT9's XmlSerializer-based BibleImages pipeline.
//
// Theme 2 (Decision 19): video is out of scope. This loader explicitly ignores
// VIDEOS_v2.XML / LumoProjectVideos.XML when present in the IMG_INDX package.
using System.Globalization;
using System.Xml.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses the IMG_INDX research package into a <see cref="MediaData"/> record,
/// selecting <c>IMAGES_V2.XML</c> when V2 bible resources are present and the V2
/// index file exists, else <c>IMAGES.XML</c>. Captures references to installed
/// image-binary packages (IMG_THMB / IMG_LD / IMG_SD / IMG_HD) into
/// <see cref="MediaData.ImageProjects"/> so <c>MediaService.FetchImageBytes</c>
/// can resolve image files at request time.
/// </summary>
internal static class MarbleImageIndexLoader
{
    private const string ImageIndexName = "IMG_INDX";
    private const string ImagesV1FileName = "IMAGES.XML";
    private const string ImagesV2FileName = "IMAGES_V2.XML";
    private const float MinimumImageIndexVersion = 1.38f;

    // Image-binary project short names (PT9 MarbleDataAccess.cs:200-220).
    private static readonly string[] ImageBinaryProjects =
    [
        "IMG_THMB",
        "IMG_LD",
        "IMG_SD",
        "IMG_HD",
    ];

    /// <summary>
    /// Loads the image index into a <see cref="MediaData"/> record.
    /// </summary>
    /// <param name="researchPackages">Map of research-package ShortName → IMarblePackage.</param>
    /// <param name="imageProjects">Map of image-binary ShortName → IMarblePackage.
    /// Typically the subset of installed marble packages whose keys are in
    /// <see cref="ImageBinaryProjects"/>. Only the keys are inspected here; the
    /// values are passed through to <see cref="MediaData.ImageProjects"/> so that
    /// <c>MediaService.FetchImageBytes</c> can later resolve binary files.</param>
    /// <param name="haveVersion2Resources">V2-presence flag from the discoverer.
    /// Drives the V1 vs V2 index-file selection.</param>
    public static MediaData Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages,
        IReadOnlyDictionary<string, IMarblePackage> imageProjects,
        bool haveVersion2Resources
    )
    {
        if (!researchPackages.TryGetValue(ImageIndexName, out var indexPackage))
        {
            return MediaData.Empty;
        }

        var indexFileName = SelectIndexFileName(indexPackage, haveVersion2Resources);
        if (indexFileName is null)
        {
            Console.WriteLine(
                "Enhanced Resources: warning - IMG_INDX has neither IMAGES.XML nor IMAGES_V2.XML; producing empty MediaData"
            );
            return MediaData.Empty with
            {
                KnownResourceIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                {
                    ImageIndexName,
                },
            };
        }

        List<MediaDisplayItem> images;
        try
        {
            var xml = indexPackage.ReadAllText(indexFileName);
            var doc = XDocument.Parse(xml);
            LogVersionIfOutdated(doc, indexFileName);
            images = ParseDisplayItems(doc).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"Enhanced Resources: warning - failed to parse {indexFileName} from IMG_INDX: {e.Message}"
            );
            return MediaData.Empty with
            {
                KnownResourceIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                {
                    ImageIndexName,
                },
            };
        }

        // Preserve only image-binary project entries in MediaData.ImageProjects.
        // Drop unrelated research packages (SDBG, SDBH, etc.) that may have been passed in.
        var imageBinaryFiltered = new Dictionary<string, IMarblePackage>(
            StringComparer.OrdinalIgnoreCase
        );
        foreach (var projectName in ImageBinaryProjects)
        {
            if (imageProjects.TryGetValue(projectName, out var package))
            {
                imageBinaryFiltered[projectName] = package;
            }
        }

        var knownIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ImageIndexName };
        foreach (var key in imageBinaryFiltered.Keys)
        {
            knownIds.Add(key);
        }

        return new MediaData(
            Images: images,
            ImageProjects: imageBinaryFiltered,
            KnownResourceIds: knownIds
        );
    }

    private static string? SelectIndexFileName(IMarblePackage package, bool haveVersion2Resources)
    {
        if (haveVersion2Resources && package.Exists(ImagesV2FileName))
            return ImagesV2FileName;
        if (package.Exists(ImagesV1FileName))
            return ImagesV1FileName;
        return null;
    }

    private static void LogVersionIfOutdated(XDocument doc, string fileName)
    {
        var versionAttr = doc.Root?.Attribute("Version")?.Value;
        if (string.IsNullOrWhiteSpace(versionAttr))
            return;
        if (
            !float.TryParse(
                versionAttr,
                NumberStyles.Float,
                CultureInfo.InvariantCulture,
                out var version
            )
        )
        {
            return;
        }
        if (version < MinimumImageIndexVersion)
        {
            Console.WriteLine(
                $"Enhanced Resources: warning - {fileName} reports version {version:F2}, "
                    + $"below minimum {MinimumImageIndexVersion:F2}; some data may be missing."
            );
        }
    }

    private static IEnumerable<MediaDisplayItem> ParseDisplayItems(XDocument doc)
    {
        int displayIndex = 0;
        foreach (var image in doc.Descendants("BibleImage"))
        {
            var id = (string?)image.Attribute("Id");
            if (string.IsNullOrWhiteSpace(id))
                continue;

            var collection = (string?)image.Element("Collection") ?? string.Empty;
            var fileName = (string?)image.Element("FileName") ?? string.Empty;
            var caption =
                (string?)image.Element("Caption") ?? Path.GetFileNameWithoutExtension(fileName);
            var languageCode = (string?)image.Element("LanguageCode") ?? "en";

            var startRef = ParseVerseRef((string?)image.Element("StartRef"));
            var endRef = ParseVerseRef((string?)image.Element("EndRef"));

            yield return new MediaDisplayItem(
                ImageId: id,
                ImageSource: $"papi-er://images/{id}?size=full",
                Title: caption,
                ThumbnailSource: $"papi-er://images/{id}",
                StartRef: startRef,
                EndRef: endRef,
                Collection: collection,
                LanguageCode: languageCode,
                DisplayIndex: displayIndex++
            );
        }
    }

    // PT9 reference format: BBBCCCVVV + 5-digit word offset (14 chars total).
    private static VerseRef ParseVerseRef(string? reference)
    {
        if (string.IsNullOrWhiteSpace(reference) || reference.Length < 9)
            return new VerseRef(1, 1, 1);

        // Parse only BBBCCCVVV; ignore the 5-digit word offset if present.
        var trimmed = reference.Length > 9 ? reference[..9] : reference;
        if (
            !int.TryParse(
                trimmed,
                NumberStyles.Integer,
                CultureInfo.InvariantCulture,
                out var bbbcccvvv
            )
        )
        {
            return new VerseRef(1, 1, 1);
        }

        int book = bbbcccvvv / 1_000_000;
        int chapter = (bbbcccvvv / 1_000) % 1_000;
        int verse = bbbcccvvv % 1_000;
        if (book < 1 || book > Canon.LastBook)
            return new VerseRef(1, 1, 1);
        return new VerseRef(book, chapter, verse);
    }
}
