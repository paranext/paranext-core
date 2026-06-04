// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:789-884 (LoadEncyclopediaData,
//         GetEncyclopediaLanguage, abbreviation parsing)
//         PT9/Paratext/Marble/EncyclopediaTab.cs (per-entry iteration)
// Reason: Extracts V1/V2 encyclopedia entries and the abbreviation map from MBL_ENC
// into an immutable EncyclopediaData record. Per-entry XML parsing delegates to
// MarbleEncyclopediaEntry.ParseAll (already ported).
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

internal static class MarbleEncyclopediaLoader
{
    private const string MblEncShortName = "MBL_ENC";
    private const string AbbreviationsFilename = "Abbrev.xml";

    // Filename shapes for the three entry types.
    // V1: single file per type, no language suffix.
    // V2: one file per language per type, e.g. FLORA_en.xml.
    private static readonly (
        EncyclopediaEntryType Type,
        string V1Filename,
        string V2Prefix
    )[] TypeFileShapes =
    [
        (EncyclopediaEntryType.Flora, "FLORA.XML", "FLORA_"),
        (EncyclopediaEntryType.Fauna, "FAUNA.XML", "FAUNA_"),
        (EncyclopediaEntryType.Realia, "REALIA.XML", "REALIA_"),
    ];

    /// <summary>
    /// Extracts encyclopedia entries and abbreviations from the MBL_ENC research package.
    /// Returns EncyclopediaData.Empty if MBL_ENC is not installed; a partial record (with
    /// whatever loaded successfully) otherwise. Per-file XML parse failures are logged
    /// and skipped - they never throw out of this loader.
    /// </summary>
    /// <param name="researchPackages">Research-package map keyed by ShortName.</param>
    /// <param name="haveVersion2Resources">True when any .mbv2z bible exists; drives V1/V2 mode selection.</param>
    /// <param name="knownResourceIds">ShortNames of installed marble bibles (the UI keys
    ///   encyclopedia loads by resource ID; this set answers "does the encyclopedia know
    ///   about this resource" without depending on the bible list structure).</param>
    public static EncyclopediaData Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages,
        bool haveVersion2Resources,
        IReadOnlySet<string> knownResourceIds
    )
    {
        if (!researchPackages.TryGetValue(MblEncShortName, out var mblEnc))
            return EncyclopediaData.Empty;

        var entriesByTypeAndLanguage =
            new Dictionary<
                EncyclopediaEntryType,
                IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>
            >();
        var articlesById = new Dictionary<string, ArticleContent>(StringComparer.OrdinalIgnoreCase);

        foreach (var shape in TypeFileShapes)
        {
            var perLanguage = haveVersion2Resources
                ? LoadV2ForType(mblEnc, shape.V2Prefix)
                : LoadV1ForType(mblEnc, shape.V1Filename);

            if (perLanguage.Count == 0)
                continue;

            entriesByTypeAndLanguage[shape.Type] = perLanguage;
            PopulateArticles(shape.Type, perLanguage, articlesById, isV2: haveVersion2Resources);
        }

        var abbreviations = LoadAbbreviations(mblEnc);

        return new EncyclopediaData(
            EntriesByTypeAndLanguage: entriesByTypeAndLanguage,
            ArticlesById: articlesById,
            Abbreviations: abbreviations,
            KnownResourceIds: new HashSet<string>(
                knownResourceIds,
                StringComparer.OrdinalIgnoreCase
            )
        );
    }

    private static IReadOnlyDictionary<
        string,
        IReadOnlyList<MarbleEncyclopediaEntry>
    > LoadV1ForType(IMarblePackage package, string v1Filename)
    {
        var entries = TryParseEntries(package, v1Filename);
        if (entries is null)
            return new Dictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>(
                StringComparer.OrdinalIgnoreCase
            );

        return new Dictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["en"] = entries,
        };
    }

    private static IReadOnlyList<MarbleEncyclopediaEntry>? TryParseEntries(
        IMarblePackage package,
        string internalPath
    )
    {
        if (!package.Exists(internalPath))
            return null;
        try
        {
            var xml = package.ReadAllText(internalPath);
            return MarbleEncyclopediaEntry.ParseAll(xml).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"Enhanced Resources: skipped {package.ShortName}/{internalPath}: {e.Message}"
            );
            return null;
        }
    }

    private static void PopulateArticles(
        EncyclopediaEntryType type,
        IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>> perLanguage,
        Dictionary<string, ArticleContent> articlesById,
        bool isV2
    )
    {
        // Article key format: "{TYPE}:{Key}" matches PT9 EncyclopediaTab's LaunchViewer target.
        // Articles are keyed globally; when the same entry exists in multiple languages we keep
        // the first language encountered (typically 'en').
        foreach (var (_, entries) in perLanguage)
        {
            foreach (var entry in entries)
            {
                if (string.IsNullOrEmpty(entry.Key))
                    continue;
                var articleKey = $"{type.ToString().ToUpperInvariant()}:{entry.Key}";
                if (articlesById.ContainsKey(articleKey))
                    continue;
                articlesById[articleKey] = new ArticleContent(
                    Title: entry.Title,
                    RawParagraphs: entry.Paragraphs,
                    ImageIds: entry.BibleImageIds,
                    IsV2: isV2
                );
            }
        }
    }

    private static IReadOnlyDictionary<string, string> LoadAbbreviations(IMarblePackage package)
    {
        var abbreviations = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        if (!package.Exists(AbbreviationsFilename))
            return abbreviations;

        try
        {
            var doc = XDocument.Parse(package.ReadAllText(AbbreviationsFilename));
            foreach (var item in doc.Descendants("Item"))
            {
                var key = (string?)item.Attribute("Key");
                var value = item.Value;
                if (string.IsNullOrEmpty(key))
                    continue;
                abbreviations[key] = value ?? string.Empty;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"Enhanced Resources: skipped {package.ShortName}/{AbbreviationsFilename}: {e.Message}"
            );
        }
        return abbreviations;
    }

    private static IReadOnlyDictionary<
        string,
        IReadOnlyList<MarbleEncyclopediaEntry>
    > LoadV2ForType(IMarblePackage package, string v2Prefix)
    {
        // v2Prefix is e.g. "FLORA_"; enumerate "FLORA_*.xml" and split out language.
        var pattern = v2Prefix + "*.xml";
        var result = new Dictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>(
            StringComparer.OrdinalIgnoreCase
        );

        foreach (var path in package.EnumerateFiles(pattern))
        {
            var fileName = System.IO.Path.GetFileName(path);
            var lang = ExtractLanguageCode(fileName, v2Prefix);
            if (string.IsNullOrEmpty(lang))
                continue;

            var entries = TryParseEntries(package, path);
            if (entries is null)
                continue;

            // First-write-wins across duplicate language files (defensive; shouldn't happen).
            if (result.ContainsKey(lang))
            {
                Console.WriteLine(
                    $"Enhanced Resources: warning - duplicate encyclopedia file for type prefix '{v2Prefix}' lang '{lang}'; keeping first"
                );
                continue;
            }
            result[lang] = entries;
        }
        return result;
    }

    /// <summary>
    /// Extracts the language code between the prefix and the ".xml" suffix.
    /// E.g. ExtractLanguageCode("FLORA_en.xml", "FLORA_") -> "en".
    /// Returns null for filenames that don't match the expected shape.
    /// </summary>
    private static string? ExtractLanguageCode(string fileName, string v2Prefix)
    {
        if (!fileName.StartsWith(v2Prefix, StringComparison.OrdinalIgnoreCase))
            return null;
        if (!fileName.EndsWith(".xml", StringComparison.OrdinalIgnoreCase))
            return null;
        var start = v2Prefix.Length;
        var end = fileName.Length - ".xml".Length;
        if (end <= start)
            return null;
        return fileName.Substring(start, end - start);
    }
}
