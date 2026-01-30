using System.Xml.Linq;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Types representing parallel passage data loaded from ParallelPassages.xml.
/// </summary>
public enum ParallelPassageType
{
    NTtoOT,
    OTtoOT,
    NTtoNT,
}

/// <summary>
/// Represents a single parallel passage entry with head reference and parallel verses.
/// Created by loading and processing ParallelPassages.xml.
/// </summary>
public record ParallelPassageEntry
{
    /// <summary>Head verse reference string (e.g., "MAT 4:1")</summary>
    public required string HeadReference { get; init; }

    /// <summary>All verse references in this passage set</summary>
    public required List<string> Verses { get; init; }

    /// <summary>The type of parallel passage</summary>
    public required ParallelPassageType PassageType { get; init; }

    /// <summary>Unique key for deduplication</summary>
    public string Key => $"{HeadReference}|{string.Join(";", Verses)}";
}

/// <summary>
/// Loads and caches parallel passage data from ParallelPassages.xml.
/// </summary>
public class ParallelPassageAccessor
{
    private readonly Lazy<List<ParallelPassageEntry>> _cachedPassages;

    public ParallelPassageAccessor()
    {
        _cachedPassages = new Lazy<List<ParallelPassageEntry>>(LoadPassages);
    }

    /// <summary>
    /// Loads all parallel passages, creating symmetrical pairs, deduplicating, and sorting.
    /// Caches the result using Lazy&lt;T&gt; for thread safety.
    /// </summary>
    public List<ParallelPassageEntry> GetAllPassages()
    {
        return _cachedPassages.Value;
    }

    private static List<ParallelPassageEntry> LoadPassages()
    {
        string xmlPath = FindXmlPath();
        if (!File.Exists(xmlPath))
            return new List<ParallelPassageEntry>();

        var doc = XDocument.Load(xmlPath);
        var entries = new List<ParallelPassageEntry>();
        var seenKeys = new HashSet<string>();

        foreach (var passageElement in doc.Root!.Elements("Passage"))
        {
            var verseElements = passageElement.Elements("Verse").ToList();
            if (verseElements.Count < 2)
                continue;

            var verseRefs = verseElements.Select(v => v.Value.Trim()).ToList();

            var passageType = DeterminePassageType(verseElements);

            // Create symmetrical pairs: for each verse as head, create an entry
            foreach (var headRef in verseRefs)
            {
                var entry = new ParallelPassageEntry
                {
                    HeadReference = headRef,
                    Verses = new List<string>(verseRefs),
                    PassageType = passageType,
                };

                if (seenKeys.Add(entry.Key))
                    entries.Add(entry);
            }
        }

        entries.Sort(
            (a, b) => string.Compare(a.HeadReference, b.HeadReference, StringComparison.Ordinal)
        );

        return entries;
    }

    private static string FindXmlPath()
    {
        // Standard location: sibling of SettingsDirectory
        string settingsDir = ScrTextCollection.SettingsDirectory;
        if (!string.IsNullOrEmpty(settingsDir))
        {
            string path = Path.Combine(settingsDir, "ParallelPassages", "ParallelPassages.xml");
            if (File.Exists(path))
                return path;

            // Try parent directory
            string? parentDir = Path.GetDirectoryName(settingsDir);
            if (parentDir != null)
            {
                path = Path.Combine(parentDir, "ParallelPassages", "ParallelPassages.xml");
                if (File.Exists(path))
                    return path;
            }
        }

        // Fallback: well-known Paratext paths
        string[] fallbacks =
        {
            Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                "Paratext9Projects",
                "ParallelPassages",
                "ParallelPassages.xml"
            ),
            Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                "Paratext",
                "Paratext",
                "ParallelPassages",
                "ParallelPassages.xml"
            ),
        };

        foreach (var fallback in fallbacks)
        {
            if (File.Exists(fallback))
                return fallback;
        }

        return Path.Combine(settingsDir ?? "", "ParallelPassages", "ParallelPassages.xml");
    }

    private static ParallelPassageType DeterminePassageType(List<XElement> verseElements)
    {
        bool hasNT = false;
        bool hasOT = false;

        foreach (var verse in verseElements)
        {
            string refText = verse.Value.Trim();
            string bookCode = refText.Split(' ')[0];
            int bookNum = Canon.BookIdToNumber(bookCode);

            if (bookNum >= 40)
                hasNT = true;
            else
                hasOT = true;
        }

        if (hasNT && hasOT)
            return ParallelPassageType.NTtoOT;
        if (hasNT)
            return ParallelPassageType.NTtoNT;
        return ParallelPassageType.OTtoOT;
    }
}
