// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs (source-language lexicon load for GNT/BHS/LXXDC)
// Reason: Parses .msv1z source-language research packages into a dual-indexed
// LexiconEntry map (native lemma + Latin translit) consumed by SourceLanguageSearchService.
using System.Xml.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Reads GNT / BHS / LXXDC source-language research packages and produces a
/// SourceLanguageData record with two indexes (ByLemma keyed on native script,
/// ByTranslit keyed on Latin transliteration). Each package is an .msv1z zip
/// whose Lexicon.xml has the same &lt;Lexicon_Main&gt; shape as the dictionary
/// packages (SDBG/SDBH/DCLEX), but with source-language-specific content:
/// Greek/Hebrew lemma text, transliteration, Strong number, occurrences.
/// </summary>
internal static class MarbleSourceLanguageLoader
{
    // Package short-names carrying source-language lexicons.
    private static readonly string[] SourceLanguagePackageNames = ["GNT", "BHS", "LXXDC"];

    // Lexicon file name inside each package. Verify against real packages at
    // integration time - if wrong, change to "{ShortName}.xml" or the actual path.
    private const string LexiconFileName = "Lexicon.xml";

    public static SourceLanguageData Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages
    )
    {
        var byLemma = new Dictionary<string, List<LexiconEntry>>(StringComparer.OrdinalIgnoreCase);
        var byTranslit = new Dictionary<string, List<LexiconEntry>>(
            StringComparer.OrdinalIgnoreCase
        );

        foreach (var name in SourceLanguagePackageNames)
        {
            if (!researchPackages.TryGetValue(name, out var package))
                continue;
            try
            {
                ParsePackageInto(name, package, byLemma, byTranslit);
            }
            catch (Exception e)
            {
                Console.WriteLine(
                    $"Enhanced Resources: failed to load source-language package '{name}': {e.Message}"
                );
            }
        }

        if (byLemma.Count == 0 && byTranslit.Count == 0)
            return SourceLanguageData.Empty;

        return new SourceLanguageData(Freeze(byLemma), Freeze(byTranslit));
    }

    private static IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> Freeze(
        Dictionary<string, List<LexiconEntry>> source
    )
    {
        var frozen = new Dictionary<string, IReadOnlyList<LexiconEntry>>(
            StringComparer.OrdinalIgnoreCase
        );
        foreach (var (key, entries) in source)
            frozen[key] = entries.AsReadOnly();
        return frozen;
    }

    private static void ParsePackageInto(
        string packageName,
        IMarblePackage package,
        Dictionary<string, List<LexiconEntry>> byLemma,
        Dictionary<string, List<LexiconEntry>> byTranslit
    )
    {
        if (!package.Exists(LexiconFileName))
        {
            Console.WriteLine(
                $"Enhanced Resources: source-language package '{packageName}' has no {LexiconFileName}; skipping"
            );
            return;
        }

        var xml = package.ReadAllText(LexiconFileName);
        var doc = XDocument.Parse(xml);

        foreach (var entryXml in doc.Descendants("Lexicon_Entry"))
        {
            var translit = (string?)entryXml.Element("Lemma");
            if (string.IsNullOrWhiteSpace(translit))
                continue;

            var nativeLemma = (string?)entryXml.Element("NativeLemma") ?? translit;
            var strongNumber = (string?)entryXml.Element("StrongNumber") ?? string.Empty;
            var partOfSpeech = (string?)entryXml.Element("PartOfSpeech") ?? string.Empty;

            // First English gloss (if any) from the first LEXSense - matches PT9
            // source-language lookup which surfaces a single display gloss per lemma.
            var englishGloss =
                entryXml
                    .Descendants("LEXSense")
                    .Where(s =>
                        string.Equals(
                            (string?)s.Element("LanguageCode"),
                            "en",
                            StringComparison.OrdinalIgnoreCase
                        )
                    )
                    .Select(s => (string?)s.Element("Gloss") ?? string.Empty)
                    .FirstOrDefault(g => !string.IsNullOrEmpty(g)) ?? string.Empty;

            var occurrences = new List<VerseRef>();
            foreach (var occ in entryXml.Descendants("Occurrence"))
            {
                var refText = (string?)occ.Attribute("ref") ?? (string?)occ;
                if (string.IsNullOrWhiteSpace(refText))
                    continue;
                if (VerseRef.TryParse(refText, out var vr))
                    occurrences.Add(vr);
            }

            var record = new LexiconEntry(
                Lemma: nativeLemma,
                Translit: translit,
                StrongNumber: strongNumber,
                Gloss: englishGloss,
                PartOfSpeech: partOfSpeech,
                Occurrences: occurrences
            );

            AddToBucket(byLemma, nativeLemma, record);
            AddToBucket(byTranslit, translit, record);
        }
    }

    private static void AddToBucket(
        Dictionary<string, List<LexiconEntry>> dict,
        string key,
        LexiconEntry record
    )
    {
        if (!dict.TryGetValue(key, out var bucket))
        {
            bucket = [];
            dict[key] = bucket;
        }
        bucket.Add(record);
    }
}
