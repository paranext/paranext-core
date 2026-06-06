using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Dictionary entry loading, deduplication, gloss formatting.
/// Three-way routing per spec Section 6: OT -> SDBH, NT -> SDBG, DC -> DCLEX
/// (port of PT9's GetDictionaryProject using Canon.IsBookOT / Canon.IsBookNT).
/// Source: CAP-007, EXT-053, EXT-055, EXT-056, BHV-364
/// </summary>
internal sealed class DictionaryService(DictionaryData data, IMarbleBookTokenProvider bookTokens)
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs (GetDefinitionHtml, LoadResources)
    //         PT9/Paratext/Marble/MarbleDataAccess.cs (GetDictionaryProject)
    // Maps to: EXT-053, EXT-055, BHV-364

    // Returned when a dictionary package (SDBH/SDBG/DCLEX) isn't loaded. Lets
    // LoadResources / GetDictionaryEntry produce an empty result + EmptyStateMessage
    // rather than throwing KeyNotFoundException. Production loaders may legitimately
    // omit a package (e.g. DCLEX missing from a partial install).
    private static readonly DictionaryPerPackage s_emptyPackage =
        new(
            EntriesById: new Dictionary<string, DictionaryEntryRecord>(
                StringComparer.OrdinalIgnoreCase
            ),
            Lexicon: new Dictionary<
                string,
                (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
            >(StringComparer.OrdinalIgnoreCase)
        );

    /// <summary>
    /// Routes a book number to its governing dictionary ShortName.
    /// OT (Gen..Mal) -> SDBH ; NT (Mat..Rev) -> SDBG ; DC (apocrypha) -> DCLEX.
    /// Port of PT9 MarbleDataAccess.GetDictionaryProject; three-way replaces PT10's
    /// prior two-way split that mis-routed DC to SDBG.
    /// </summary>
    internal static string DictionaryForBook(int bookNum)
    {
        if (Canon.IsBookOT(bookNum))
            return "SDBH";
        if (Canon.IsBookNT(bookNum))
            return "SDBG";
        return "DCLEX";
    }

    private DictionaryPerPackage PackageFor(string shortName) =>
        data.ByDictionary.TryGetValue(shortName, out var p) ? p : s_emptyPackage;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:GetDefinitionHtml
    // Maps to: EXT-055, Section 4.8 M-008, BHV-364
    /// <summary>
    /// Get structured dictionary entry data for a single entry.
    /// Looks up the entry in the dictionary that governs the caller's book, falling
    /// back across every loaded dictionary so cross-book lookups still resolve.
    /// </summary>
    public DictionaryEntryData GetDictionaryEntry(DictionaryEntryInput input)
    {
        if (string.IsNullOrEmpty(input.EntryId))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Lexicon entry '{input.EntryId}' not found"
            );

        // EntryId is treated as a lemma; NFD-normalize to match the loader's
        // canonical key (PT9 MarbleDataAccess.cs:1444). Accept both NFC and NFD
        // input - clients that echo back our DictionaryDisplayItem.EntryId pass
        // NFD already; clients that hand-construct a lemma may pass NFC.
        var entryKey = input.EntryId.Normalize(System.Text.NormalizationForm.FormD);
        DictionaryEntryRecord? entry = null;
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (pkg.EntriesById.TryGetValue(entryKey, out var found))
            {
                entry = found;
                break;
            }
        }
        if (entry is null)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Lexicon entry '{input.EntryId}' not found"
            );

        if (
            input.SubItemId != null
            && !entry.SubItemIds.Contains(input.SubItemId, StringComparer.Ordinal)
        )
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Dictionary sub-item '{input.SubItemId}' not found in entry '{input.EntryId}'"
            );
        }

        return new DictionaryEntryData(
            EntryId: input.EntryId,
            Lemma: entry.Lemma,
            Senses: BuildSenses(entry.Senses, input.GlossLanguage),
            SemanticDomains: entry.SemanticDomains,
            RelatedLexemes: BuildRelatedLexemes(entry.Lemma),
            Morphology: entry.Morphology
        );
    }

    private static List<DictionarySense> BuildSenses(List<SenseRecord> senses, string glossLanguage)
    {
        return senses
            .Select(s =>
            {
                var filteredGlosses = s
                    .Glosses.Where(g =>
                        string.Equals(g.Language, glossLanguage, StringComparison.OrdinalIgnoreCase)
                    )
                    .ToList();
                return new DictionarySense(s.SenseId, filteredGlosses, s.Definition)
                {
                    OccurrenceCount = s.OccurrenceCount,
                };
            })
            .ToList();
    }

    private List<RelatedLexemeData> BuildRelatedLexemes(string sourceLemma)
    {
        // Walk every loaded dictionary, deduping across packages so the same
        // lemma in multiple slices isn't reported repeatedly.
        // Lexicon is keyed by NFD-normalized lemma (PT9 MarbleDataAccess.cs:1444);
        // normalize the source so the lookup hits.
        var sourceKey = sourceLemma.Normalize(System.Text.NormalizationForm.FormD);
        var results = new List<RelatedLexemeData>();
        // Dedup across packages (fixture may share the same lexicon under multiple
        // dictionary ShortNames, and in production DCLEX may overlap SDBG/SDBH).
        // First package containing sourceLemma produces the full result set; later
        // packages are no-ops via this set.
        var seen = new HashSet<(string Lemma, string Relationship)>();
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (!pkg.Lexicon.TryGetValue(sourceKey, out var sourceInfo))
                continue;

            foreach (var (lemma, otherInfo) in pkg.Lexicon)
            {
                if (lemma == sourceKey)
                    continue;

                var sharedGlosses = sourceInfo.Glosses.Intersect(otherInfo.Glosses).ToList();
                if (sharedGlosses.Count > 0 && seen.Add((lemma, "Gloss")))
                {
                    results.Add(
                        new RelatedLexemeData(
                            Lemma: lemma,
                            EntryId: FindEntryIdForLemma(lemma) ?? lemma,
                            Relationship: "Gloss",
                            Gloss: sharedGlosses[0]
                        )
                    );
                }

                var sharedDomains = sourceInfo.Domains.Intersect(otherInfo.Domains).ToList();
                if (sharedDomains.Count > 0 && seen.Add((lemma, "SemanticDomain")))
                {
                    results.Add(
                        new RelatedLexemeData(
                            Lemma: lemma,
                            EntryId: FindEntryIdForLemma(lemma) ?? lemma,
                            Relationship: "SemanticDomain",
                            Gloss: otherInfo.Glosses.Count > 0 ? otherInfo.Glosses[0] : ""
                        )
                    );
                }
            }
        }
        return results;
    }

    private string? FindEntryIdForLemma(string lemma)
    {
        // EntryId is the NFD-normalized lemma; the dict key already matches
        // that. Direct lookup beats the previous full-table scan.
        var lemmaKey = lemma.Normalize(System.Text.NormalizationForm.FormD);
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (pkg.EntriesById.ContainsKey(lemmaKey))
                return lemmaKey;
        }
        return null;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:LoadResources
    //         PT9/Paratext/Marble/MarbleDataAccess.cs:GetDictionaryProject
    // Maps to: EXT-053, BHV-364
    /// <summary>
    /// Load dictionary entries for the current scope. Three-way routing: OT -> SDBH,
    /// NT -> SDBG, DC -> DCLEX.
    /// </summary>
    public DictionaryLoadResult LoadResources(DictionaryLoadInput input)
    {
        if (
            !data.KnownResourceIds.Contains(input.ResourceId)
            && !data.UninitializedResourceIds.Contains(input.ResourceId)
        )
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        if (data.UninitializedResourceIds.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "Lexicon data not loaded for this resource"
            );
        }

        string activeDictionary = DictionaryForBook(input.CurrentReference.BookNum);
        var pkg = PackageFor(activeDictionary);

        var bookTokensList = bookTokens.GetTokens(input.ResourceId, input.CurrentReference.BookNum);
        var scopeInput = new ScopeFilterInput(
            CurrentRef: input.CurrentReference,
            Scope: input.Scope,
            LinkType: MarbleLinkType.Lexical,
            FilterText: input.Filter?.Lemma ?? "",
            FilterSenses: input.Filter?.Senses ?? "",
            FilterClickOrigin: input.Filter?.ClickOrigin ?? FilterClickOrigin.ScripturePane,
            ResourceId: input.ResourceId
        );
        var scopedTokens = ScopeFilterService.GetScopedTokens(scopeInput, bookTokensList.ToArray());

        var items = new List<DictionaryDisplayItem>();
        foreach (var token in scopedTokens)
        {
            var firstLink = token.LexicalLinks?.FirstOrDefault();
            if (string.IsNullOrEmpty(firstLink))
                continue;
            var (lemma, _, _) = ParseLinkEntry(firstLink);

            // PT9 keys lexicon entries by NFD-normalized lemma
            // (MarbleDataAccess.cs:1444). Lemmas in lexical_links carry
            // whatever normalization the package author chose, so we NFD
            // here to land on the same key the lexicon loader writes.
            var lemmaKey = lemma.Normalize(System.Text.NormalizationForm.FormD);
            pkg.EntriesById.TryGetValue(lemmaKey, out var entry);

            var relevantSenseIndices = ComputeRelevantSenseIndices(entry, token.LexicalLinks);
            var firstRelevantSensePreview = ComputeFirstRelevantSensePreview(
                entry,
                relevantSenseIndices,
                input.GlossLanguage
            );

            items.Add(
                new DictionaryDisplayItem(
                    TokenId: token.Index.ToString(),
                    EntryId: lemmaKey,
                    Term: lemma,
                    SourceText: token.Text ?? "",
                    Translit: "",
                    Glosses: BuildGlossesForLanguage(entry, input.GlossLanguage),
                    PartOfSpeech: entry?.Morphology ?? "",
                    OccurrenceCount: 1,
                    RelevantSenseIndices: relevantSenseIndices,
                    FirstRelevantSensePreview: firstRelevantSensePreview
                )
            );
        }

        items = DeduplicateItems(items);
        if (!string.IsNullOrEmpty(input.GlossLanguage))
            items = PopulateRelatedLexemes(items, input.GlossLanguage);

        var emptyStateMessage = items.Count == 0 ? GetEmptyStateMessage(input) : null;
        return new DictionaryLoadResult(items, activeDictionary, emptyStateMessage);
    }

    private static (string Lemma, string SenseId, string EntryRef) ParseLinkEntry(string entry)
    {
        var parts = entry.Split(':');
        var lemma = parts.Length >= 2 ? parts[1] : "";
        var senseId = parts.Length >= 3 ? parts[2] : "";
        return (lemma, senseId, entry);
    }

    /// <summary>
    /// For a token's lexical_links (semicolon-delimited "lemma:senseId:..." entries), find which
    /// senses in the resolved DictionaryEntryRecord apply at this position. Returns the indices into
    /// entry.Senses for matching SenseIds (preserving entry-order so callers can stably pick "first").
    /// PT9 reference: DictionaryTab.cs:485-517 SelectedSense + DictionaryTab.cs:1482 Senses.Add(sense.SenseIndex).
    /// </summary>
    private static IList<int> ComputeRelevantSenseIndices(
        DictionaryEntryRecord? entry,
        IList<string>? lexicalLinks
    )
    {
        if (entry is null || lexicalLinks is null || lexicalLinks.Count == 0)
            return Array.Empty<int>();

        // Collect the unique SenseIds claimed by this token's lexical links.
        var claimedSenseIds = new HashSet<string>();
        foreach (var link in lexicalLinks)
        {
            if (string.IsNullOrEmpty(link))
                continue;
            var (_, senseId, _) = ParseLinkEntry(link);
            if (!string.IsNullOrEmpty(senseId))
                claimedSenseIds.Add(senseId);
        }
        if (claimedSenseIds.Count == 0)
            return Array.Empty<int>();

        var indices = new List<int>();
        for (int i = 0; i < entry.Senses.Count; i++)
        {
            if (claimedSenseIds.Contains(entry.Senses[i].SenseId))
                indices.Add(i);
        }
        return indices;
    }

    /// <summary>
    /// Pick the preview text for the first relevant sense. Mirrors PT9 DictionaryTab.cs:554-555:
    /// use Definition (DefinitionShort in PT9) when non-empty; otherwise fall back to the first localized gloss.
    /// Empty string when no preview is available (no relevant senses, no definition, no glosses).
    /// </summary>
    private static string ComputeFirstRelevantSensePreview(
        DictionaryEntryRecord? entry,
        IList<int> relevantSenseIndices,
        string glossLanguage
    )
    {
        if (entry is null || relevantSenseIndices.Count == 0)
            return "";
        var sense = entry.Senses[relevantSenseIndices[0]];
        if (!string.IsNullOrEmpty(sense.Definition))
            return sense.Definition;
        var firstLocalizedGloss = sense
            .Glosses.FirstOrDefault(g => g.Language == glossLanguage)
            ?.Text;
        if (!string.IsNullOrEmpty(firstLocalizedGloss))
            return firstLocalizedGloss;
        return sense.Glosses.FirstOrDefault()?.Text ?? "";
    }

    private static IList<string> BuildGlossesForLanguage(
        DictionaryEntryRecord? entry,
        string glossLanguage
    )
    {
        if (entry == null)
            return [];
        return entry
            .Senses.SelectMany(s => s.Glosses)
            .Where(g =>
                string.Equals(g.Language, glossLanguage, StringComparison.OrdinalIgnoreCase)
            )
            .Select(g => g.Text)
            .Distinct()
            .ToList();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs via LexiconExtensions.GetRelatedLexemes
    // Maps to: BHV-110, INV-C07
    /// <summary>
    /// Find related lexemes for a source lexeme by shared glosses and semantic domains,
    /// walking every loaded dictionary.
    /// </summary>
    public IList<RelatedLexemeRef> FindRelatedLexemes(string sourceLexeme, string glossLanguage)
    {
        if (string.IsNullOrEmpty(glossLanguage))
            return [];

        // Walk every loaded dictionary, but dedupe across packages: if the same
        // lemma appears in SDBG and DCLEX (or any combination), report each
        // (lemma, RelationType) at most once. Lexicon is NFD-keyed.
        var sourceKey = sourceLexeme.Normalize(System.Text.NormalizationForm.FormD);
        var results = new List<RelatedLexemeRef>();
        // Same dedup rationale as BuildRelatedLexemes above.
        var seen = new HashSet<(string Lemma, string RelationType)>();
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (!pkg.Lexicon.TryGetValue(sourceKey, out var sourceEntry))
                continue;

            foreach (var (lemma, entry) in pkg.Lexicon)
            {
                if (lemma == sourceKey)
                    continue;

                var sharedGlosses = sourceEntry.Glosses.Intersect(entry.Glosses).ToList();
                if (sharedGlosses.Count > 0 && seen.Add((lemma, "Gloss")))
                {
                    results.Add(
                        new RelatedLexemeRef(
                            Lemma: lemma,
                            Translit: lemma,
                            Gloss: sharedGlosses[0],
                            RelationType: "Gloss"
                        )
                    );
                }

                var sharedDomains = sourceEntry.Domains.Intersect(entry.Domains).ToList();
                if (sharedDomains.Count > 0 && seen.Add((lemma, "SemanticDomain")))
                {
                    results.Add(
                        new RelatedLexemeRef(
                            Lemma: lemma,
                            Translit: lemma,
                            Gloss: entry.Glosses.Count > 0 ? entry.Glosses[0] : "",
                            RelationType: "SemanticDomain"
                        )
                    );
                }
            }
        }
        return results;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs via LexiconExtensions.GetInterlinearDisplayString
    // Maps to: spec-007, BHV-112
    /// <summary>
    /// Pure function - stays static. Format interlinear display string based on
    /// morphological type: Stem: /form/, Suffix: -form, Prefix: form-.
    /// </summary>
    public static string FormatInterlinearDisplay(string morphType, string lexicalForm) =>
        morphType switch
        {
            "Stem" => $"/{lexicalForm}/",
            "Suffix" => $"-{lexicalForm}",
            "Prefix" => $"{lexicalForm}-",
            _ => lexicalForm,
        };

    // BHV-353: Deduplicate items by TokenId, aggregate occurrence counts
    private static List<DictionaryDisplayItem> DeduplicateItems(
        List<DictionaryDisplayItem> items
    ) =>
        items
            .GroupBy(i => i.TokenId)
            .Select(g => g.First() with { OccurrenceCount = g.Sum(i => i.OccurrenceCount) })
            .ToList();

    // BHV-110: Populate related lexemes for each display item
    private List<DictionaryDisplayItem> PopulateRelatedLexemes(
        List<DictionaryDisplayItem> items,
        string glossLanguage
    ) =>
        items
            .Select(item =>
                item with
                {
                    RelatedLexemes = FindRelatedLexemes(item.Term, glossLanguage),
                }
            )
            .ToList();

    // BHV-352: Generate empty state message based on input context
    private static string GetEmptyStateMessage(DictionaryLoadInput input)
    {
        if (input.Filter != null)
        {
            return $"The word '{input.Filter.Lemma}' does not occur in this range.";
        }
        return "No dictionary data available for the current scope.";
    }
}
