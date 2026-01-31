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
    /// <summary>First book number in the New Testament (Matthew = 40).</summary>
    private const int FirstNewTestamentBook = 40;

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

    /// <summary>
    /// Finds a related passage of a different type that shares verses with the given passage.
    /// Lazily builds bidirectional dictionaries for NTtoOT &lt;-&gt; OTtoOT and NTtoOT &lt;-&gt; NTtoNT.
    /// </summary>
    /// <param name="passage">The source passage to find a related passage for.</param>
    /// <param name="targetType">The target passage type to look for.</param>
    /// <returns>The related passage, or null if none exists.</returns>
    public ParallelPassageEntry? FindRelatedPassage(
        ParallelPassageEntry passage,
        ParallelPassageType targetType
    )
    {
        // TODO: MP-3 implementation (CAP-011)
        // Build 4 bidirectional dictionaries lazily using ConcurrentDictionary.
        throw new NotImplementedException("CAP-011: FindRelatedPassage not yet implemented");
    }

    private const string XmlRelativePath = "ParallelPassages/ParallelPassages.xml";

    private static string FindXmlPath()
    {
        string settingsDir = ScrTextCollection.SettingsDirectory;

        var candidateDirs = BuildCandidateDirectories(settingsDir);

        foreach (var dir in candidateDirs)
        {
            string path = Path.Combine(dir, XmlRelativePath);
            if (File.Exists(path))
                return path;
        }

        // Default path even if file does not exist
        return Path.Combine(settingsDir ?? "", XmlRelativePath);
    }

    private static IEnumerable<string> BuildCandidateDirectories(string settingsDir)
    {
        if (!string.IsNullOrEmpty(settingsDir))
        {
            yield return settingsDir;
            string? parentDir = Path.GetDirectoryName(settingsDir);
            if (parentDir != null)
                yield return parentDir;
        }

        string home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        yield return Path.Combine(home, "Paratext9Projects");
        yield return Path.Combine(home, "Paratext", "Paratext");
    }

    private static ParallelPassageType DeterminePassageType(List<XElement> verseElements)
    {
        bool IsNewTestament(XElement verse) =>
            Canon.BookIdToNumber(verse.Value.Trim().Split(' ')[0]) >= FirstNewTestamentBook;

        bool hasNT = verseElements.Any(IsNewTestament);
        bool hasOT = verseElements.Any(v => !IsNewTestament(v));

        return (hasNT, hasOT) switch
        {
            (true, true) => ParallelPassageType.NTtoOT,
            (true, false) => ParallelPassageType.NTtoNT,
            _ => ParallelPassageType.OTtoOT,
        };
    }
}
