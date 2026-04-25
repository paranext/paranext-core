using Paranext.DataProvider.Errors;
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

        DictionaryEntryRecord? entry = null;
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (pkg.EntriesById.TryGetValue(input.EntryId, out var found))
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
                        string.Equals(g.Language, glossLanguage, StringComparison.Ordinal)
                    )
                    .ToList();
                return new DictionarySense(s.SenseId, filteredGlosses, s.Definition);
            })
            .ToList();
    }

    private List<RelatedLexemeData> BuildRelatedLexemes(string sourceLemma)
    {
        // Walk every loaded dictionary, deduping across packages so the same
        // lemma in multiple slices isn't reported repeatedly.
        var results = new List<RelatedLexemeData>();
        // Dedup across packages (fixture may share the same lexicon under multiple
        // dictionary ShortNames, and in production DCLEX may overlap SDBG/SDBH).
        // First package containing sourceLemma produces the full result set; later
        // packages are no-ops via this set.
        var seen = new HashSet<(string Lemma, string Relationship)>();
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (!pkg.Lexicon.TryGetValue(sourceLemma, out var sourceInfo))
                continue;

            foreach (var (lemma, otherInfo) in pkg.Lexicon)
            {
                if (lemma == sourceLemma)
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
        foreach (var pkg in data.ByDictionary.Values)
        {
            var match = pkg.EntriesById.FirstOrDefault(kvp => kvp.Value.Lemma == lemma);
            if (match.Key != null)
                return match.Key;
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
            var (lemma, _, entryRef) = ParseLinkEntry(firstLink);

            pkg.EntriesById.TryGetValue(entryRef, out var entry);

            items.Add(
                new DictionaryDisplayItem(
                    TokenId: token.Index.ToString(),
                    Term: lemma,
                    SourceText: token.Text ?? "",
                    Translit: "",
                    Glosses: BuildGlossesForLanguage(entry, input.GlossLanguage),
                    PartOfSpeech: entry?.Morphology ?? "",
                    OccurrenceCount: 1
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
        // (lemma, RelationType) at most once.
        var results = new List<RelatedLexemeRef>();
        // Same dedup rationale as BuildRelatedLexemes above.
        var seen = new HashSet<(string Lemma, string RelationType)>();
        foreach (var pkg in data.ByDictionary.Values)
        {
            if (!pkg.Lexicon.TryGetValue(sourceLexeme, out var sourceEntry))
                continue;

            foreach (var (lemma, entry) in pkg.Lexicon)
            {
                if (lemma == sourceLexeme)
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
