// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:759-783 (BuildLanguageAndReferenceMapsAsync),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:683-696 (CreateReferenceMappings),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:1135-1171 (GetAvailableGlossLanguageIds),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:1401-1456 (GetLemmaDictionary - per-dict lookup),
//         PT9/Paratext/Marble/MarbleLexiconEntry.cs (XmlSerializer schema)
using System.Xml.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

internal static class MarbleLexiconLoader
{
    private const string SdbgName = "SDBG";
    private const string SdbhName = "SDBH";
    private const string DclexName = "DCLEX";

    // Gloss-language coverage threshold (PT9 MarbleDataAccess.cs:1045)
    private const float GlossLanguageCoverageThreshold = 0.5f;

    // LEXReference values are 14+ char strings; first 9 chars are bbcccvvv
    // (PT9 MarbleDataAccess.cs FindReplaceForm.cs:856).
    private const int VerseRefStringMinLength = 14;
    private const int VerseRefStringPrefixLength = 9;

    // PT9 keeps each research dictionary's cachedLemmaToEntry separate
    // (MarbleDataAccess.cs:1050) and routes lemma lookups per dictionary via
    // GetDictionaryProject(bookNum). PT10 mirrors that by populating per-dict
    // gloss tables; the union view is derived after all dicts have loaded so no
    // dictionary's data is silently dropped.
    private static readonly string[] DictionaryLoadOrder = [SdbhName, SdbgName, DclexName];

    public static LexiconLoadResult Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages,
        IReadOnlySet<string> knownBibleIds
    )
    {
        var byDictionary = new Dictionary<string, DictionaryPerPackage>(
            StringComparer.OrdinalIgnoreCase
        );

        // Per-dictionary gloss tables. Keyed dictionary -> language -> NFD lemma -> glosses.
        // The outer dictionary is OrdinalIgnoreCase to match how PT9 looks up
        // research dictionaries by name (MarbleDataAccess.cs:768-770).
        var glossByDict = new Dictionary<
            string,
            Dictionary<string, Dictionary<string, List<string>>>
        >(StringComparer.OrdinalIgnoreCase);

        var senseCountByLanguage = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        int totalMeaningCount = 0;

        // Per-dictionary source-language entries. Index 0 = lemma key (NFD-normalized);
        // value = per-dict LexiconEntry built from ParsePackage. PT9 stores these
        // per MarbleScrText (MarbleDataAccess.cs:1401-1456); PT10 keeps the same
        // separation so SourceLanguageData.ByLemma can return one entry per dict
        // for shared lemmas (e.g. Greek words in both SDBG and DCLEX).
        var lemmaEntriesByDict = new Dictionary<string, Dictionary<string, LexiconEntry>>(
            StringComparer.OrdinalIgnoreCase
        );

        foreach (var dictionaryName in DictionaryLoadOrder)
        {
            if (!researchPackages.TryGetValue(dictionaryName, out var package))
                continue;
            // PT9 marble dictionary packages store the lexicon as "{Name}.XML"
            // (e.g., SDBH.XML, SDBG.XML, DCLEX.XML), not "Lexicon.xml"
            // (PT9 MarbleDataAccess.cs:1409 - `FileManager.GetXml<Lexicon_Main>(Name + ".XML")`).
            var lexiconFileName = $"{dictionaryName}.XML";
            if (!package.Exists(lexiconFileName))
            {
                Console.WriteLine(
                    $"Enhanced Resources: warning - {dictionaryName} has no {lexiconFileName}; skipping"
                );
                continue;
            }

            var doc = XDocument.Parse(package.ReadAllText(lexiconFileName));

            var perDictLemmaEntries = new Dictionary<string, LexiconEntry>(StringComparer.Ordinal);
            byDictionary[dictionaryName] = ParsePackage(doc, perDictLemmaEntries);
            lemmaEntriesByDict[dictionaryName] = perDictLemmaEntries;

            var perDictGlosses = new Dictionary<string, Dictionary<string, List<string>>>(
                StringComparer.OrdinalIgnoreCase
            );
            CollectGlossesForPackage(
                doc,
                perDictGlosses,
                senseCountByLanguage,
                ref totalMeaningCount
            );
            glossByDict[dictionaryName] = perDictGlosses;
        }

        // KnownResourceIds = knownBibleIds IFF at least one dictionary slice loaded;
        // empty otherwise (no dictionaries means no enhanced-resource lookup is meaningful).
        var hasAnyDict = byDictionary.Count > 0;
        var knownResourceIds = hasAnyDict
            ? new HashSet<string>(knownBibleIds, StringComparer.OrdinalIgnoreCase)
            : new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        var dict = new DictionaryData(
            ByDictionary: byDictionary,
            KnownResourceIds: knownResourceIds,
            UninitializedResourceIds: new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );

        var byDictionaryImmutable = FreezeByDictionary(glossByDict);
        var unionByLanguage = BuildUnionByLanguage(glossByDict);

        // PT9 MarbleDataAccess.cs:1162 uses strict '>' (a language at exactly 50% is excluded).
        // The sp->es correction already happened upstream in CollectGlossesForPackage, so the
        // language-count keys here are already canonical; no further mapping needed.
        var availableLanguages = senseCountByLanguage
            .Where(kv =>
                totalMeaningCount > 0
                && (float)kv.Value / totalMeaningCount > GlossLanguageCoverageThreshold
            )
            .Select(kv => kv.Key)
            .OrderBy(s => s)
            .ToList();

        var gloss = new GlossData(unionByLanguage, availableLanguages, byDictionaryImmutable);

        // Build the source-language by-lemma index. A lemma can be authored by
        // multiple research dictionaries (e.g. SDBG and DCLEX both have entries
        // for many Greek words); each dictionary contributes its own
        // LexiconEntry so the source-language search can surface dict-specific
        // metadata (gloss/POS/Strong number/occurrences). Transliteration index
        // is intentionally empty here: PT9's GreekTrans / HebrewTrans aren't
        // ported yet (MarbleDataAccess.cs:1459-1479); UseTransliteration=true
        // searches simply return no matches until those utilities land.
        var byLemma = BuildByLemma(lemmaEntriesByDict);
        var totalEntryCount = lemmaEntriesByDict.Values.Sum(d => d.Count);
        var sourceLanguage =
            totalEntryCount == 0
                ? SourceLanguageData.Empty
                : new SourceLanguageData(
                    ByLemma: byLemma,
                    ByTranslit: new Dictionary<string, IReadOnlyList<LexiconEntry>>(
                        StringComparer.Ordinal
                    )
                );

        return new LexiconLoadResult(dict, gloss, sourceLanguage);
    }

    private static DictionaryPerPackage ParsePackage(
        XDocument doc,
        Dictionary<string, LexiconEntry> lemmaEntries
    )
    {
        // Lexicon entries are keyed by NFD-normalized lemma (PT9 MarbleDataAccess.cs:1444:
        //   `cachedLemmaToEntry = main.ToDictionary(e => e.Lemma.Normalize(NormalizationForm.FormD))`).
        // The numeric `Id` attribute on <Lexicon_Entry> exists but is not how PT9
        // resolves a token's lexical_links - those carry "{Dict}:{Lemma}:{Indices}"
        // (PT9 MarbleLexicalLink.cs:37-47), so the lemma is the natural lookup key.
        var lexicon = new Dictionary<
            string,
            (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
        >(StringComparer.Ordinal);
        var entriesById = new Dictionary<string, DictionaryEntryRecord>(StringComparer.Ordinal);

        foreach (var entry in doc.Descendants("Lexicon_Entry"))
        {
            var lemma = ReadLemma(entry);
            if (string.IsNullOrWhiteSpace(lemma))
                continue;

            var lemmaKey = lemma.Normalize(System.Text.NormalizationForm.FormD);
            // The XML Id attribute is preserved in the per-package metadata
            // (used by sense IDs) but is NOT the lookup key.
            var xmlEntryId = ReadEntryId(entry) ?? lemma;

            var enGlosses = new List<string>();
            var domains = new List<string>();
            var senses = new List<SenseRecord>();

            // Aggregated occurrences across all meanings of this entry within
            // THIS dictionary (each dict's entry tracks only its own occurrences).
            var occurrences = new List<VerseRef>();

            foreach (var meaning in entry.Descendants("LEXMeaning"))
            {
                var senseId = ReadSenseId(meaning) ?? $"{xmlEntryId}-s{senses.Count + 1}";
                var senseGlosses = new List<GlossEntry>();

                foreach (var sense in meaning.Descendants("LEXSense"))
                {
                    var lang = ReadLanguageCode(sense) ?? "";
                    foreach (var glossText in ReadGlosses(sense))
                    {
                        if (string.IsNullOrEmpty(glossText))
                            continue;
                        senseGlosses.Add(new GlossEntry(lang, glossText));
                        if (string.Equals(lang, "en", StringComparison.OrdinalIgnoreCase))
                            enGlosses.Add(glossText);
                    }
                }
                foreach (var domain in meaning.Descendants("LEXDomain"))
                {
                    var text = domain.Value.Trim();
                    if (!string.IsNullOrEmpty(text))
                        domains.Add(text);
                }

                foreach (var refStr in ReadReferences(meaning))
                {
                    var vref = ParseLexReference(refStr);
                    if (vref.HasValue)
                        occurrences.Add(vref.Value);
                }

                var definition =
                    (string?)meaning.Element("DefinitionShort")
                    ?? (string?)meaning.Element("DefinitionLong")
                    ?? "";

                senses.Add(new SenseRecord(senseId, senseGlosses, definition));
            }

            var morphology = (string?)entry.Descendants("PartOfSpeech").FirstOrDefault() ?? "";
            var subItemIds = senses.Select(s => s.SenseId).ToList();
            var firstEnglishGloss = enGlosses.FirstOrDefault() ?? string.Empty;
            var strongNumber = ReadFirstStrongCode(entry) ?? string.Empty;

            lexicon[lemmaKey] = (enGlosses, domains);
            entriesById[lemmaKey] = new DictionaryEntryRecord(
                Lemma: lemma,
                Senses: senses,
                SemanticDomains: domains,
                Morphology: morphology,
                SubItemIds: subItemIds
            );

            // One entry per (dict, lemma). PT9 keeps cachedLemmaToEntry per
            // MarbleScrText so each dictionary's metadata stays independent.
            // Use the same NFD key as entriesById so token lookups go through
            // one canonical normalization.
            lemmaEntries[lemmaKey] = new LexiconEntry(
                Lemma: lemma,
                Translit: string.Empty,
                StrongNumber: strongNumber,
                Gloss: firstEnglishGloss,
                PartOfSpeech: morphology,
                Occurrences: occurrences
            );
        }

        return new DictionaryPerPackage(EntriesById: entriesById, Lexicon: lexicon);
    }

    /// <summary>
    /// Walks every LEXSense in <paramref name="doc"/> and adds its glosses to
    /// the per-dictionary <paramref name="perDictGlosses"/> map (lang -> NFD
    /// lemma -> glosses). Also accumulates per-language sense counts and the
    /// total meaning count used to compute AvailableLanguages later. The
    /// "sp -> es" canonicalization mirrors PT9 MarbleDataAccess.cs:1149.
    /// </summary>
    private static void CollectGlossesForPackage(
        XDocument doc,
        Dictionary<string, Dictionary<string, List<string>>> perDictGlosses,
        Dictionary<string, int> senseCountByLanguage,
        ref int totalMeaningCount
    )
    {
        foreach (var meaning in doc.Descendants("LEXMeaning"))
        {
            totalMeaningCount++;
            var entryEl = meaning.Ancestors("Lexicon_Entry").FirstOrDefault();
            if (entryEl is null)
                continue;
            var lemma = ReadLemma(entryEl);
            if (string.IsNullOrWhiteSpace(lemma))
                continue;
            var lemmaKey = lemma.Normalize(System.Text.NormalizationForm.FormD);

            foreach (var sense in meaning.Descendants("LEXSense"))
            {
                var rawLang = ReadLanguageCode(sense);
                if (string.IsNullOrEmpty(rawLang))
                    continue;
                var lang = rawLang == "sp" ? "es" : rawLang;
                foreach (var gloss in ReadGlosses(sense))
                {
                    if (string.IsNullOrEmpty(gloss))
                        continue;

                    senseCountByLanguage.TryGetValue(lang, out var count);
                    senseCountByLanguage[lang] = count + 1;

                    if (!perDictGlosses.TryGetValue(lang, out var byLemma))
                    {
                        byLemma = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                        perDictGlosses[lang] = byLemma;
                    }
                    if (!byLemma.TryGetValue(lemmaKey, out var glossList))
                    {
                        glossList = new List<string>();
                        byLemma[lemmaKey] = glossList;
                    }
                    glossList.Add(gloss);
                }
            }
        }
    }

    /// <summary>
    /// Builds the union-of-all-dictionaries view: lang -> NFD lemma -> glosses
    /// drawn from every dictionary that authored a sense for the (lang, lemma)
    /// pair. Duplicate gloss strings are de-duplicated (case-sensitive ordinal)
    /// while preserving first-seen order, which matches the PT9 user-visible
    /// behaviour where a single dictionary list never carries the same gloss
    /// string twice.
    /// </summary>
    private static IReadOnlyDictionary<
        string,
        IReadOnlyDictionary<string, IReadOnlyList<string>>
    > BuildUnionByLanguage(
        Dictionary<string, Dictionary<string, Dictionary<string, List<string>>>> perDict
    )
    {
        var union = new Dictionary<string, Dictionary<string, List<string>>>(
            StringComparer.OrdinalIgnoreCase
        );
        var seen = new Dictionary<string, Dictionary<string, HashSet<string>>>(
            StringComparer.OrdinalIgnoreCase
        );

        foreach (var dictName in DictionaryLoadOrder)
        {
            if (!perDict.TryGetValue(dictName, out var byLanguage))
                continue;
            foreach (var (lang, byLemma) in byLanguage)
            {
                if (!union.TryGetValue(lang, out var unionByLemma))
                {
                    unionByLemma = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                    union[lang] = unionByLemma;
                }
                if (!seen.TryGetValue(lang, out var seenByLemma))
                {
                    seenByLemma = new Dictionary<string, HashSet<string>>(StringComparer.Ordinal);
                    seen[lang] = seenByLemma;
                }
                foreach (var (lemma, glosses) in byLemma)
                {
                    if (!unionByLemma.TryGetValue(lemma, out var dest))
                    {
                        dest = new List<string>();
                        unionByLemma[lemma] = dest;
                    }
                    if (!seenByLemma.TryGetValue(lemma, out var seenSet))
                    {
                        seenSet = new HashSet<string>(StringComparer.Ordinal);
                        seenByLemma[lemma] = seenSet;
                    }
                    foreach (var g in glosses)
                    {
                        if (seenSet.Add(g))
                            dest.Add(g);
                    }
                }
            }
        }

        return Freeze(union);
    }

    private static IReadOnlyDictionary<
        string,
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>
    > FreezeByDictionary(
        Dictionary<string, Dictionary<string, Dictionary<string, List<string>>>> source
    )
    {
        var outer = new Dictionary<
            string,
            IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>
        >(StringComparer.OrdinalIgnoreCase);
        foreach (var (dict, byLanguage) in source)
            outer[dict] = Freeze(byLanguage);
        return outer;
    }

    private static IReadOnlyDictionary<
        string,
        IReadOnlyDictionary<string, IReadOnlyList<string>>
    > Freeze(Dictionary<string, Dictionary<string, List<string>>> source)
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

    private static IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> BuildByLemma(
        Dictionary<string, Dictionary<string, LexiconEntry>> lemmaEntriesByDict
    )
    {
        var byLemma = new Dictionary<string, List<LexiconEntry>>(StringComparer.Ordinal);
        foreach (var dictName in DictionaryLoadOrder)
        {
            if (!lemmaEntriesByDict.TryGetValue(dictName, out var perDict))
                continue;
            foreach (var (lemma, entry) in perDict)
            {
                if (!byLemma.TryGetValue(lemma, out var list))
                {
                    list = new List<LexiconEntry>();
                    byLemma[lemma] = list;
                }
                list.Add(entry);
            }
        }

        var frozen = new Dictionary<string, IReadOnlyList<LexiconEntry>>(StringComparer.Ordinal);
        foreach (var (lemma, list) in byLemma)
            frozen[lemma] = list.AsReadOnly();
        return frozen;
    }

    // ---- Schema helpers ----
    //
    // Real PT9 schema (PT9/Paratext/Marble/MarbleLexiconEntry.cs XmlSerializer
    // attributes):
    //   <Lexicon_Entry Id="..." Lemma="logos">
    //     <StrongCodes><Strong>3056</Strong></StrongCodes>
    //     <BaseForms>
    //       <BaseForm Id="...">
    //         <PartsOfSpeech><PartOfSpeech>n</PartOfSpeech></PartsOfSpeech>
    //         <LEXMeanings>
    //           <LEXMeaning Id="..." EntryCode="logos-001">
    //             <LEXDomains><LEXDomain>...</LEXDomain></LEXDomains>
    //             <LEXSenses>
    //               <LEXSense LanguageCode="en">
    //                 <Glosses><Gloss>word</Gloss></Glosses>
    //               </LEXSense>
    //             </LEXSenses>
    //             <LEXReferences><LEXReference>043001001|01</LEXReference></LEXReferences>
    //           </LEXMeaning>
    //         </LEXMeanings>
    //       </BaseForm>
    //     </BaseForms>
    //   </Lexicon_Entry>

    private static string? ReadLemma(XElement entry) => (string?)entry.Attribute("Lemma");

    private static string? ReadEntryId(XElement entry) => (string?)entry.Attribute("Id");

    private static string? ReadSenseId(XElement meaning) =>
        (string?)meaning.Attribute("EntryCode") ?? (string?)meaning.Attribute("Id");

    private static string? ReadLanguageCode(XElement sense) =>
        (string?)sense.Attribute("LanguageCode");

    private static IEnumerable<string> ReadGlosses(XElement sense)
    {
        var wrapper = sense.Element("Glosses");
        if (wrapper is null)
            yield break;
        foreach (var g in wrapper.Elements("Gloss"))
            yield return g.Value;
    }

    private static IEnumerable<string> ReadReferences(XElement meaning)
    {
        var wrapper = meaning.Element("LEXReferences");
        if (wrapper is null)
            yield break;
        foreach (var r in wrapper.Elements("LEXReference"))
            yield return r.Value;
    }

    private static string? ReadFirstStrongCode(XElement entry)
    {
        var wrapper = entry.Element("StrongCodes");
        if (wrapper is null)
            return null;
        return wrapper.Elements("Strong").Select(e => e.Value).FirstOrDefault();
    }

    private static VerseRef? ParseLexReference(string refStr)
    {
        if (string.IsNullOrEmpty(refStr) || refStr.Length < VerseRefStringMinLength)
            return null;
        if (
            !int.TryParse(
                refStr.AsSpan(0, VerseRefStringPrefixLength),
                System.Globalization.NumberStyles.Integer,
                System.Globalization.CultureInfo.InvariantCulture,
                out var bbcccvvv
            )
        )
            return null;
        try
        {
            return new VerseRef(bbcccvvv, ScrVers.Original);
        }
        catch
        {
            return null;
        }
    }
}
