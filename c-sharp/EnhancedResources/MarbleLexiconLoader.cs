// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:759-783 (BuildLanguageAndReferenceMapsAsync),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:683-696 (CreateReferenceMappings),
//         PT9/Paratext/Marble/MarbleDataAccess.cs:1135-1171 (GetAvailableGlossLanguageIds),
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

    // Precedence for cross-dictionary gloss collision: SDBH > SDBG > DCLEX
    private static readonly string[] GlossMergeOrder = [SdbhName, SdbgName, DclexName];

    public static LexiconLoadResult Load(
        IReadOnlyDictionary<string, IMarblePackage> researchPackages,
        IReadOnlySet<string> knownBibleIds
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

        // Lemma -> aggregated LexiconEntry for source-language search. A given
        // lemma can appear in multiple dictionaries (e.g. SDBH and SDBG); we
        // accumulate occurrences across all its appearances.
        var lemmaEntries = new Dictionary<string, LexiconEntry>(StringComparer.Ordinal);

        // Load each dictionary in the precedence order so SDBH-first collisions win.
        foreach (var dictionaryName in GlossMergeOrder)
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

            byDictionary[dictionaryName] = ParsePackage(doc, lemmaEntries);

            MergePackageIntoGlosses(
                dictionaryName,
                doc,
                glossByLanguage,
                glossOwnerByLanguage,
                senseCountByLanguage,
                ref totalMeaningCount
            );
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

        // Build the source-language by-lemma index. Transliteration index is
        // intentionally empty here: PT9's GreekTrans / HebrewTrans aren't ported
        // yet (MarbleDataAccess.cs:1459-1479). UseTransliteration=true searches
        // simply return no matches until those utilities land.
        var byLemma = new Dictionary<string, IReadOnlyList<LexiconEntry>>(StringComparer.Ordinal);
        foreach (var (lemma, entry) in lemmaEntries)
            byLemma[lemma] = new[] { entry };
        var sourceLanguage =
            lemmaEntries.Count == 0
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

            // Aggregated occurrences across all meanings of this entry, fed
            // into the source-language by-lemma index.
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

            // Accumulate into the cross-dictionary lemma index. If a later
            // dictionary contributes more occurrences for the same lemma, fold
            // them in; first-seen entry's metadata (gloss, POS) wins because
            // GlossMergeOrder is SDBH>SDBG>DCLEX and SDBH is the most precise.
            // Use the same NFD key as the per-package entriesById so token
            // lookups go through one canonical normalization.
            if (lemmaEntries.TryGetValue(lemmaKey, out var existing))
            {
                foreach (var occ in occurrences)
                    existing.Occurrences.Add(occ);
            }
            else
            {
                lemmaEntries[lemmaKey] = new LexiconEntry(
                    Lemma: lemma,
                    Translit: string.Empty,
                    StrongNumber: strongNumber,
                    Gloss: firstEnglishGloss,
                    PartOfSpeech: morphology,
                    Occurrences: occurrences
                );
            }
        }

        return new DictionaryPerPackage(EntriesById: entriesById, Lexicon: lexicon);
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
            var entryEl = meaning.Ancestors("Lexicon_Entry").FirstOrDefault();
            if (entryEl is null)
                continue;
            var lemma = ReadLemma(entryEl);
            if (string.IsNullOrWhiteSpace(lemma))
                continue;

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
                        if (
                            !string.Equals(
                                owner,
                                dictionaryName,
                                StringComparison.OrdinalIgnoreCase
                            )
                        )
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
