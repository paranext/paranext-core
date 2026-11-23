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
    /// <param name="knownBibleIds">Bible-package short names from the discoverer
    /// (e.g. "ESV16UK+", "UBSGNT5+"). Marble images aren't packaged per-bible -
    /// the IMG_INDX index covers all installed bibles - so MediaService accepts
    /// any installed bible as a valid resourceId, mirroring DictionaryData's
    /// model. Without this set, callers would have to pass "IMG_INDX" verbatim.</param>
    public static MediaData Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages,
        IReadOnlyDictionary<string, IMarblePackage> imageProjects,
        bool haveVersion2Resources,
        IReadOnlySet<string> knownBibleIds
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
            return MediaData.Empty with { KnownResourceIds = BuildKnownIds([], knownBibleIds) };
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
            return MediaData.Empty with { KnownResourceIds = BuildKnownIds([], knownBibleIds) };
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

        return new MediaData(
            Images: images,
            ImageProjects: imageBinaryFiltered,
            KnownResourceIds: BuildKnownIds(imageBinaryFiltered.Keys, knownBibleIds)
        );
    }

    private static HashSet<string> BuildKnownIds(
        IEnumerable<string> imageBinaryNames,
        IReadOnlySet<string> bibleIds
    )
    {
        var ids = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ImageIndexName };
        foreach (var name in imageBinaryNames)
            ids.Add(name);
        foreach (var bibleId in bibleIds)
            ids.Add(bibleId);
        return ids;
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
            var path = (string?)image.Element("Path") ?? string.Empty;
            var fileName = (string?)image.Element("FileName") ?? string.Empty;
            var caption =
                (string?)image.Element("Caption")
                ?? HumanizeFileName(Path.GetFileNameWithoutExtension(fileName));
            var languageCode = (string?)image.Element("LanguageCode") ?? "en";

            // Extract every <References>/<Reference> string. A single image can carry
            // multiple ranges; emit one MediaDisplayItem per range so the per-verse
            // filter naturally handles overlap-with-current-verse matching.
            // PT9 schema: MarbleImageData.cs:231-232 (XmlArrayItem("Reference") on
            // List<string> References). Format is "BBBCCCVVV<5-digit word offset>"
            // optionally with "-BBBCCCVVV<5-digit word offset>" suffix for ranges
            // (PT9 MarbleImageData.cs:44-67).
            var referencesEl = image.Element("References");
            if (referencesEl is null)
                continue;

            foreach (var refStr in referencesEl.Elements("Reference").Select(e => e.Value))
            {
                if (string.IsNullOrWhiteSpace(refStr))
                    continue;
                var range = ParseReferenceRange(refStr);
                if (range is null)
                    continue;

                yield return new MediaDisplayItem(
                    ImageId: id,
                    ImageSource: $"papi-er://images/{id}?size=full",
                    Title: caption,
                    ThumbnailSource: $"papi-er://images/{id}",
                    StartRef: range.Value.Start,
                    EndRef: range.Value.End,
                    Collection: collection,
                    LanguageCode: languageCode,
                    DisplayIndex: displayIndex++,
                    Path: path,
                    FileName: fileName
                );
            }
        }
    }

    // PT9 reference range format (MarbleImageData.cs:44-67):
    //   "BBBCCCVVV<word>"            - single ref (start = end)
    //   "BBBCCCVVV<word>-BBBCCCVVV<word>" - explicit range
    // The 5-digit "word" suffix is a token offset; divide the parsed long by
    // 100000 to drop it (matches PT9: `(int)(long.Parse(part) / 100000L)`).
    //
    // Whole-book / whole-chapter expansion: if the start ref has ChapterNum=0
    // (whole book) or VerseNum=0 (whole chapter), extend the end ref to the
    // last verse of its chapter / book so range queries against a single verse
    // match correctly.
    private static (VerseRef Start, VerseRef End)? ParseReferenceRange(string refStr)
    {
        var parts = refStr.Split('-');
        var startBbbcccvvv = ParseRefPart(parts[0]);
        if (startBbbcccvvv is null)
            return null;
        var endBbbcccvvv = parts.Length > 1 ? ParseRefPart(parts[1]) : startBbbcccvvv;
        if (endBbbcccvvv is null)
            return null;

        var startRef = ToVerseRef(startBbbcccvvv.Value);
        var endRef = ToVerseRef(endBbbcccvvv.Value);
        if (startRef is null || endRef is null)
            return null;

        var expandedEnd = ExpandEndForPartialRefs(startRef.Value, endRef.Value);
        return (startRef.Value, expandedEnd);
    }

    private static int? ParseRefPart(string part)
    {
        if (string.IsNullOrWhiteSpace(part))
            return null;
        if (
            !long.TryParse(
                part,
                NumberStyles.Integer,
                CultureInfo.InvariantCulture,
                out var withWord
            )
        )
            return null;
        return (int)(withWord / 100_000L);
    }

    private static VerseRef? ToVerseRef(int bbbcccvvv)
    {
        int book = bbbcccvvv / 1_000_000;
        int chapter = (bbbcccvvv / 1_000) % 1_000;
        int verse = bbbcccvvv % 1_000;
        if (book < 1 || book > Canon.LastBook)
            return null;
        try
        {
            return new VerseRef(book, chapter, verse);
        }
        catch
        {
            return null;
        }
    }

    private static VerseRef ExpandEndForPartialRefs(VerseRef startRef, VerseRef endRef)
    {
        // Whole book: start.ChapterNum == 0 implies "every chapter". Promote end
        // to the last verse of the book's last chapter.
        if (startRef.ChapterNum == 0)
        {
            try
            {
                var expanded = new VerseRef(
                    endRef.BookNum,
                    endRef.LastChapter,
                    1,
                    endRef.Versification
                );
                return new VerseRef(
                    expanded.BookNum,
                    expanded.ChapterNum,
                    expanded.LastVerse,
                    expanded.Versification
                );
            }
            catch
            {
                return endRef;
            }
        }
        // Whole chapter (or chapter span): start.VerseNum == 0 implies the
        // entire start chapter. Promote end verse to the last verse of the end
        // chapter so range queries against a specific verse still match.
        if (startRef.VerseNum == 0)
        {
            try
            {
                return new VerseRef(
                    endRef.BookNum,
                    endRef.ChapterNum,
                    endRef.LastVerse,
                    endRef.Versification
                );
            }
            catch
            {
                return endRef;
            }
        }
        return endRef;
    }

    // Mirrors PT9's filename-to-title fallback: strips the collection prefix
    // (e.g. "ATL-0806_"), replaces underscores with spaces, and title-cases.
    private static string HumanizeFileName(string name)
    {
        // Strip leading "LETTERS-DIGITS_" prefix (e.g. "ATL-0806_")
        var underscoreIdx = name.IndexOf('_');
        if (underscoreIdx > 0)
        {
            var prefix = name[..underscoreIdx];
            var dashIdx = prefix.IndexOf('-');
            if (dashIdx > 0 && prefix[(dashIdx + 1)..].All(char.IsDigit))
                name = name[(underscoreIdx + 1)..];
        }
        var spaced = name.Replace('_', ' ');
        return CultureInfo.InvariantCulture.TextInfo.ToTitleCase(spaced);
    }
}
