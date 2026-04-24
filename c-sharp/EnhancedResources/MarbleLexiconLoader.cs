// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:759-783 (BuildLanguageAndReferenceMapsAsync),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:683-696 (CreateReferenceMappings),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:1135-1171 (GetAvailableGlossLanguageIds)
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

internal static class MarbleLexiconLoader
{
    private const string SdbgName = "SDBG";
    private const string SdbhName = "SDBH";
    private const string DclexName = "DCLEX";

    // Gloss-language coverage threshold (PT9 MarbleDataAccess.cs:1045)
    private const float GlossLanguageCoverageThreshold = 0.5f;

    // Precedence for cross-dictionary gloss collision: SDBH > SDBG > DCLEX
    private static readonly string[] GlossMergeOrder = [SdbhName, SdbgName, DclexName];

    public static (DictionaryData Dictionary, GlossData Gloss) Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages
    )
    {
        var byDictionary = new Dictionary<string, DictionaryPerPackage>(
            StringComparer.OrdinalIgnoreCase
        );
        var glossByLanguage = new Dictionary<string, Dictionary<string, List<string>>>(
            StringComparer.OrdinalIgnoreCase
        );
        // Track which dictionary first populated each (lang, lemma) so intra-dictionary
        // accumulation (multiple senses for one lemma) is distinguished from
        // cross-dictionary collision (later dictionary loses per GlossMergeOrder).
        var glossOwnerByLanguage = new Dictionary<string, Dictionary<string, string>>(
            StringComparer.OrdinalIgnoreCase
        );
        var senseCountByLanguage = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        int totalMeaningCount = 0;

        // Load each dictionary in the precedence order so SDBH-first collisions win.
        foreach (var dictionaryName in GlossMergeOrder)
        {
            if (!researchPackages.TryGetValue(dictionaryName, out var package))
                continue;
            if (!package.Exists("Lexicon.xml"))
            {
                Console.WriteLine(
                    $"Enhanced Resources: warning - {dictionaryName} has no Lexicon.xml; skipping"
                );
                continue;
            }

            var doc = XDocument.Parse(package.ReadAllText("Lexicon.xml"));

            byDictionary[dictionaryName] = ParsePackage(doc);

            MergePackageIntoGlosses(
                dictionaryName,
                doc,
                glossByLanguage,
                glossOwnerByLanguage,
                senseCountByLanguage,
                ref totalMeaningCount
            );
        }

        var dict = new DictionaryData(
            ByDictionary: byDictionary,
            KnownResourceIds: new HashSet<string>(StringComparer.OrdinalIgnoreCase),
            UninitializedResourceIds: new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );

        var glossImmutable = FreezeGlossData(glossByLanguage);
        // PT9 MarbleDataAccess.cs:1162 uses strict '>' (a language at exactly 50% is excluded).
        // The sp->es correction already happened upstream in MergePackageIntoGlosses, so the
        // language-count keys here are already canonical; no further mapping needed.
        var availableLanguages = senseCountByLanguage
            .Where(kv =>
                totalMeaningCount > 0
                && (float)kv.Value / totalMeaningCount > GlossLanguageCoverageThreshold
            )
            .Select(kv => kv.Key)
            .OrderBy(s => s)
            .ToList();

        var gloss = new GlossData(glossImmutable, availableLanguages);
        return (dict, gloss);
    }

    private static DictionaryPerPackage ParsePackage(XDocument doc)
    {
        var lexicon = new Dictionary<
            string,
            (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
        >(StringComparer.OrdinalIgnoreCase);
        var entriesById = new Dictionary<string, DictionaryEntryRecord>(
            StringComparer.OrdinalIgnoreCase
        );

        foreach (var entry in doc.Descendants("Lexicon_Entry"))
        {
            var lemma = (string?)entry.Element("Lemma");
            if (string.IsNullOrWhiteSpace(lemma))
                continue;

            var enGlosses = new List<string>();
            var domains = new List<string>();

            foreach (var meaning in entry.Descendants("LEXMeaning"))
            {
                foreach (var sense in meaning.Descendants("LEXSense"))
                {
                    var lang = (string?)sense.Element("LanguageCode");
                    var gloss = (string?)sense.Element("Gloss");
                    if (
                        string.Equals(lang, "en", StringComparison.OrdinalIgnoreCase)
                        && !string.IsNullOrEmpty(gloss)
                    )
                        enGlosses.Add(gloss);
                }
                foreach (var domain in meaning.Descendants("LEXDomain"))
                {
                    var text = domain.Value.Trim();
                    if (!string.IsNullOrEmpty(text))
                        domains.Add(text);
                }
            }

            lexicon[lemma] = (enGlosses, domains);
            // TODO(Task 4): DictionaryEntryRecord population deferred - DictionaryService
            // consumption pattern not yet verified. The record type is fully defined in
            // DictionaryEntryRecord.cs; only population from lexicon XML is deferred.
        }

        return new DictionaryPerPackage(
            EntriesById: entriesById,
            Lexicon: lexicon,
            DisplayItems: []
        );
    }

    private static void MergePackageIntoGlosses(
        string dictionaryName,
        XDocument doc,
        Dictionary<string, Dictionary<string, List<string>>> glossByLanguage,
        Dictionary<string, Dictionary<string, string>> glossOwnerByLanguage,
        Dictionary<string, int> senseCountByLanguage,
        ref int totalMeaningCount
    )
    {
        foreach (var meaning in doc.Descendants("LEXMeaning"))
        {
            totalMeaningCount++;
            var lemma = (string?)
                meaning.Ancestors("Lexicon_Entry").FirstOrDefault()?.Element("Lemma");
            if (string.IsNullOrWhiteSpace(lemma))
                continue;

            foreach (var sense in meaning.Descendants("LEXSense"))
            {
                var rawLang = (string?)sense.Element("LanguageCode");
                if (string.IsNullOrEmpty(rawLang))
                    continue;
                var lang = rawLang == "sp" ? "es" : rawLang;
                var gloss = (string?)sense.Element("Gloss");
                if (string.IsNullOrEmpty(gloss))
                    continue;

                senseCountByLanguage.TryGetValue(lang, out var count);
                senseCountByLanguage[lang] = count + 1;

                if (!glossByLanguage.TryGetValue(lang, out var byLemma))
                {
                    byLemma = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                    glossByLanguage[lang] = byLemma;
                }
                if (!glossOwnerByLanguage.TryGetValue(lang, out var ownerByLemma))
                {
                    ownerByLemma = new Dictionary<string, string>(StringComparer.Ordinal);
                    glossOwnerByLanguage[lang] = ownerByLemma;
                }

                if (ownerByLemma.TryGetValue(lemma, out var owner))
                {
                    if (!string.Equals(owner, dictionaryName, StringComparison.OrdinalIgnoreCase))
                    {
                        // Cross-dictionary collision: first dictionary wins per GlossMergeOrder.
                        Console.WriteLine(
                            $"Enhanced Resources: warning - gloss collision: lemma='{lemma}' lang='{lang}' [{dictionaryName}=>{gloss} (skipped); {owner}=>{string.Join(",", byLemma[lemma])} (kept)]"
                        );
                        continue;
                    }
                    // Same dictionary, additional sense for the same lemma+lang: accumulate.
                    byLemma[lemma].Add(gloss);
                }
                else
                {
                    byLemma[lemma] = [gloss];
                    ownerByLemma[lemma] = dictionaryName;
                }
            }
        }
    }

    private static IReadOnlyDictionary<
        string,
        IReadOnlyDictionary<string, IReadOnlyList<string>>
    > FreezeGlossData(Dictionary<string, Dictionary<string, List<string>>> source)
    {
        var outer = new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(
            StringComparer.OrdinalIgnoreCase
        );
        foreach (var (lang, byLemma) in source)
        {
            var inner = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal);
            foreach (var (lemma, glosses) in byLemma)
                inner[lemma] = glosses.AsReadOnly();
            outer[lang] = inner;
        }
        return outer;
    }
}
