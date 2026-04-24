using Paranext.DataProvider.Errors;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Dictionary entry loading, deduplication, gloss formatting.
/// Selects SDBH for OT (books 1-39), SDBG for NT/DC (books 40-66+).
/// Source: CAP-007, EXT-053, EXT-055, EXT-056, BHV-364
/// </summary>
internal static class DictionaryService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs
    // Method: DictionaryTab.LoadResources
    // Maps to: EXT-053, BHV-364
    private const int OtNtBoundary = 40;

    // Test-fixture injection seams (N3: patterns.csharp.testScaffoldingLocation).
    // Production code treats a null override as "no data". Tests populate these
    // from DictionaryFixtures in [SetUp] and clear them in [TearDown].
    internal static Dictionary<
        string,
        (List<string> Glosses, List<string> Domains)
    >? LexiconOverride { get; set; }

    internal static HashSet<string>? KnownResourcesOverride { get; set; }
    internal static HashSet<string>? UninitializedResourcesOverride { get; set; }
    internal static List<DictionaryDisplayItem>? NtDisplayItemsOverride { get; set; }
    internal static List<DictionaryDisplayItem>? OtDisplayItemsOverride { get; set; }
    internal static Dictionary<string, DictionaryEntryRecord>? EntryDataOverride { get; set; }

    private static Dictionary<string, (List<string> Glosses, List<string> Domains)> Lexicon =>
        LexiconOverride ?? s_emptyLexicon;

    private static HashSet<string> KnownResources =>
        KnownResourcesOverride ?? s_emptyKnownResources;

    private static HashSet<string> UninitializedResources =>
        UninitializedResourcesOverride ?? s_emptyKnownResources;

    private static List<DictionaryDisplayItem> NtDisplayItems =>
        NtDisplayItemsOverride ?? s_emptyDisplayItems;

    private static List<DictionaryDisplayItem> OtDisplayItems =>
        OtDisplayItemsOverride ?? s_emptyDisplayItems;

    private static Dictionary<string, DictionaryEntryRecord> EntryData =>
        EntryDataOverride ?? s_emptyEntryData;

    // Empty fallbacks so accessors never return null.
    private static readonly Dictionary<
        string,
        (List<string> Glosses, List<string> Domains)
    > s_emptyLexicon = new();

    private static readonly HashSet<string> s_emptyKnownResources =
        new(StringComparer.OrdinalIgnoreCase);
    private static readonly List<DictionaryDisplayItem> s_emptyDisplayItems = new();
    private static readonly Dictionary<string, DictionaryEntryRecord> s_emptyEntryData = new();

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:GetDefinitionHtml
    // Method: DictionaryTab.GetDefinitionHtml -> Structured DTO
    // Maps to: EXT-055, Section 4.8 M-008, BHV-364
    /// <summary>
    /// Get structured dictionary entry data for a single entry.
    /// Returns DictionaryEntryData with senses, glosses, semantic domains,
    /// related lexemes, and morphology. No HTML generation (Theme 2).
    /// Source: EXT-055, Section 4.8 M-008
    /// </summary>
    public static DictionaryEntryData GetDictionaryEntry(DictionaryEntryInput input)
    {
        // Look up entry by entryId
        if (
            string.IsNullOrEmpty(input.EntryId)
            || !EntryData.TryGetValue(input.EntryId, out var entry)
        )
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Lexicon entry '{input.EntryId}' not found"
            );
        }

        // If sub-item requested, validate it exists (entry must exist for sub-item error)
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

    // Build senses with glosses filtered to the requested language
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

    // Build related lexemes from the shared lexicon, excluding self
    private static List<RelatedLexemeData> BuildRelatedLexemes(string sourceLemma)
    {
        if (!Lexicon.TryGetValue(sourceLemma, out var sourceInfo))
            return [];

        var results = new List<RelatedLexemeData>();
        foreach (var (lemma, otherInfo) in Lexicon)
        {
            if (lemma == sourceLemma)
                continue;

            var sharedGlosses = sourceInfo.Glosses.Intersect(otherInfo.Glosses).ToList();
            if (sharedGlosses.Count > 0)
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
            if (sharedDomains.Count > 0)
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

        return results;
    }

    private static string? FindEntryIdForLemma(string lemma) =>
        EntryData.FirstOrDefault(kvp => kvp.Value.Lemma == lemma).Key;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs
    // Method: DictionaryTab.LoadResources (main entry point)
    // Maps to: EXT-053, BHV-364
    /// <summary>
    /// Load dictionary entries with deduplication. SDBH for OT, SDBG for NT/DC.
    /// Source: EXT-053, BHV-364
    /// </summary>
    public static DictionaryLoadResult LoadResources(DictionaryLoadInput input)
    {
        // Validate resource existence
        if (
            !KnownResources.Contains(input.ResourceId)
            && !UninitializedResources.Contains(input.ResourceId)
        )
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // Validate lexicon loaded state
        if (UninitializedResources.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "Lexicon data not loaded for this resource"
            );
        }

        // BHV-364: Select dictionary by book number
        string activeDictionary = input.CurrentReference.BookNum < OtNtBoundary ? "SDBH" : "SDBG";

        // Get base items for scope
        var items = GetItemsForScope(input, activeDictionary);

        // Apply word filter (BHV-308)
        if (input.Filter != null)
        {
            items = items
                .Where(i =>
                    string.Equals(i.Term, input.Filter.Lemma, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();
        }

        // BHV-353: Deduplicate by TokenId, aggregate occurrence counts
        items = DeduplicateItems(items);

        // Populate related lexemes (BHV-110) if language is set
        if (!string.IsNullOrEmpty(input.GlossLanguage))
        {
            items = PopulateRelatedLexemes(items, input.GlossLanguage);
        }

        // BHV-352: Set empty state message when no items
        string? emptyStateMessage = null;
        if (items.Count == 0)
        {
            emptyStateMessage = GetEmptyStateMessage(input);
        }

        return new DictionaryLoadResult(
            Items: items,
            ActiveDictionary: activeDictionary,
            EmptyStateMessage: emptyStateMessage
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs
    // Method: DictionaryTab related lexeme logic via LexiconExtensions.GetRelatedLexemes
    // Maps to: BHV-110, INV-C07
    /// <summary>
    /// Find related lexemes for a source lexeme by shared glosses and semantic domains.
    /// Source: BHV-110, INV-C07
    /// </summary>
    public static IList<RelatedLexemeRef> FindRelatedLexemes(
        string sourceLexeme,
        string glossLanguage
    )
    {
        if (string.IsNullOrEmpty(glossLanguage))
            return [];

        if (!Lexicon.TryGetValue(sourceLexeme, out var sourceEntry))
            return [];

        var results = new List<RelatedLexemeRef>();

        foreach (var (lemma, entry) in Lexicon)
        {
            // INV-C07: Self-exclusion
            if (lemma == sourceLexeme)
                continue;

            // Check for shared glosses
            var sharedGlosses = sourceEntry.Glosses.Intersect(entry.Glosses).ToList();
            if (sharedGlosses.Count > 0)
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

            // Check for shared semantic domains
            var sharedDomains = sourceEntry.Domains.Intersect(entry.Domains).ToList();
            if (sharedDomains.Count > 0)
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

        return results;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs
    // Method: LexiconExtensions.GetInterlinearDisplayString
    // Maps to: spec-007, BHV-112
    /// <summary>
    /// Format interlinear display string based on morphological type.
    /// Stem: /form/, Suffix: -form, Prefix: form-
    /// Source: spec-007, BHV-112
    /// </summary>
    public static string FormatInterlinearDisplay(string morphType, string lexicalForm)
    {
        return morphType switch
        {
            "Stem" => $"/{lexicalForm}/",
            "Suffix" => $"-{lexicalForm}",
            "Prefix" => $"{lexicalForm}-",
            _ => lexicalForm,
        };
    }

    private static List<DictionaryDisplayItem> GetItemsForScope(
        DictionaryLoadInput input,
        string activeDictionary
    )
    {
        if (string.Equals(input.ResourceId, "empty-resource", StringComparison.OrdinalIgnoreCase))
            return [];

        // Return appropriate items based on book number
        if (input.CurrentReference.BookNum < OtNtBoundary)
            return [.. OtDisplayItems];

        return [.. NtDisplayItems];
    }

    // BHV-353: Deduplicate items by TokenId, aggregate occurrence counts
    private static List<DictionaryDisplayItem> DeduplicateItems(
        List<DictionaryDisplayItem> items
    ) =>
        items
            .GroupBy(i => i.TokenId)
            .Select(g => g.First() with { OccurrenceCount = g.Sum(i => i.OccurrenceCount) })
            .ToList();

    // BHV-110: Populate related lexemes for each display item
    private static List<DictionaryDisplayItem> PopulateRelatedLexemes(
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
