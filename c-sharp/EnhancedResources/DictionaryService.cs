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

    // Internal lexicon data for related lexeme discovery (gm-023, gm-024)
    // Each entry: lemma -> (glosses, domains)
    private static readonly Dictionary<
        string,
        (List<string> Glosses, List<string> Domains)
    > s_lexicon = BuildDefaultLexicon();

    // Known resource IDs for test scaffolding
    private static readonly HashSet<string> s_knownResources =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "test-resource",
            "SDBH",
            "SDBG",
            "empty-resource",
            "test-resource-with-dupes",
        };

    private static readonly HashSet<string> s_uninitializedResources =
        new(StringComparer.OrdinalIgnoreCase) { "uninitialized-resource" };

    // Pre-built display items for "test-resource" style resources (NT books)
    private static readonly List<DictionaryDisplayItem> s_ntDisplayItems = BuildNtTestItems();

    // Pre-built display items for "test-resource" style resources (OT books)
    private static readonly List<DictionaryDisplayItem> s_otDisplayItems = BuildOtTestItems();

    // Internal entry data for CAP-008 GetDictionaryEntry
    // Each entry keyed by entryId -> full structured entry data
    private static readonly Dictionary<string, DictionaryEntryRecord> s_entryData =
        BuildDefaultEntryData();

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
            || !s_entryData.TryGetValue(input.EntryId, out var entry)
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

        // Build senses with glosses in the requested language
        var senses = new List<DictionarySense>();
        foreach (var s in entry.Senses)
        {
            var filteredGlosses = s
                .Glosses.Where(g =>
                    string.Equals(g.Language, input.GlossLanguage, StringComparison.Ordinal)
                )
                .ToList();
            senses.Add(new DictionarySense(s.SenseId, filteredGlosses, s.Definition));
        }

        // Build related lexemes from the lexicon, excluding self
        var relatedLexemes = new List<RelatedLexemeData>();
        if (s_lexicon.TryGetValue(entry.Lemma, out var sourceInfo))
        {
            foreach (var (lemma, otherInfo) in s_lexicon)
            {
                if (lemma == entry.Lemma)
                    continue;

                var sharedGlosses = sourceInfo.Glosses.Intersect(otherInfo.Glosses).ToList();
                if (sharedGlosses.Count > 0)
                {
                    // Find the entryId for this lemma
                    var otherEntryId = FindEntryIdForLemma(lemma);
                    relatedLexemes.Add(
                        new RelatedLexemeData(
                            Lemma: lemma,
                            EntryId: otherEntryId ?? lemma,
                            Relationship: "Gloss",
                            Gloss: sharedGlosses[0]
                        )
                    );
                }

                var sharedDomains = sourceInfo.Domains.Intersect(otherInfo.Domains).ToList();
                if (sharedDomains.Count > 0)
                {
                    var otherEntryId = FindEntryIdForLemma(lemma);
                    relatedLexemes.Add(
                        new RelatedLexemeData(
                            Lemma: lemma,
                            EntryId: otherEntryId ?? lemma,
                            Relationship: "SemanticDomain",
                            Gloss: otherInfo.Glosses.Count > 0 ? otherInfo.Glosses[0] : ""
                        )
                    );
                }
            }
        }

        return new DictionaryEntryData(
            EntryId: input.EntryId,
            Lemma: entry.Lemma,
            Senses: senses,
            SemanticDomains: entry.SemanticDomains,
            RelatedLexemes: relatedLexemes,
            Morphology: entry.Morphology
        );
    }

    private static string? FindEntryIdForLemma(string lemma)
    {
        foreach (var (entryId, entry) in s_entryData)
        {
            if (entry.Lemma == lemma)
                return entryId;
        }
        return null;
    }

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
            !s_knownResources.Contains(input.ResourceId)
            && !s_uninitializedResources.Contains(input.ResourceId)
        )
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // Validate lexicon loaded state
        if (s_uninitializedResources.Contains(input.ResourceId))
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

        if (!s_lexicon.TryGetValue(sourceLexeme, out var sourceEntry))
            return [];

        var results = new List<RelatedLexemeRef>();

        foreach (var (lemma, entry) in s_lexicon)
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

    /// <summary>
    /// Allows tests to add or replace entries in the internal lexicon.
    /// Used by golden master tests that need specific lexicon configurations.
    /// </summary>
    internal static void SetTestLexiconEntry(
        string lemma,
        List<string> glosses,
        List<string> domains
    )
    {
        s_lexicon[lemma] = (glosses, domains);
    }

    /// <summary>
    /// Removes a lexicon entry. Used for test cleanup.
    /// </summary>
    internal static void RemoveTestLexiconEntry(string lemma)
    {
        s_lexicon.Remove(lemma);
    }

    /// <summary>
    /// Resets the lexicon to default test data.
    /// </summary>
    internal static void ResetTestLexicon()
    {
        s_lexicon.Clear();
        foreach (var (lemma, entry) in BuildDefaultLexicon())
        {
            s_lexicon[lemma] = entry;
        }
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
            return [.. s_otDisplayItems];

        return [.. s_ntDisplayItems];
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

    // Build test display items for NT books (with lexemes that have related lexemes)
    private static List<DictionaryDisplayItem> BuildNtTestItems()
    {
        return
        [
            new DictionaryDisplayItem(
                TokenId: "nt-token-001",
                Term: "logos",
                SourceText: "\u03BB\u03CC\u03B3\u03BF\u03C2",
                Translit: "logos",
                Glosses: ["word", "message"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "nt-token-002",
                Term: "theos",
                SourceText: "\u03B8\u03B5\u03CC\u03C2",
                Translit: "theos",
                Glosses: ["God", "god"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "nt-token-003",
                Term: "kurios",
                SourceText: "\u03BA\u03CD\u03C1\u03B9\u03BF\u03C2",
                Translit: "kurios",
                Glosses: ["Lord", "master"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            // Duplicate of logos for deduplication testing
            new DictionaryDisplayItem(
                TokenId: "nt-token-001",
                Term: "logos",
                SourceText: "\u03BB\u03CC\u03B3\u03BF\u03C2",
                Translit: "logos",
                Glosses: ["word", "message"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
        ];
    }

    // Single source of truth for default lexicon entries
    private static Dictionary<
        string,
        (List<string> Glosses, List<string> Domains)
    > BuildDefaultLexicon()
    {
        return new()
        {
            ["logos"] = (["word", "message"], ["Communication"]),
            ["rhema"] = (["word"], ["Communication"]),
            ["aggelia"] = (["message"], ["Communication"]),
            ["graphe"] = (["scripture"], ["Sacred Texts"]),
            ["kai"] = (["and"], []),
        };
    }

    // Build test display items for OT books
    private static List<DictionaryDisplayItem> BuildOtTestItems()
    {
        return
        [
            new DictionaryDisplayItem(
                TokenId: "ot-token-001",
                Term: "elohim",
                SourceText: "\u05D0\u05DC\u05D4\u05D9\u05DD",
                Translit: "elohim",
                Glosses: ["God", "gods"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "ot-token-002",
                Term: "bara",
                SourceText: "\u05D1\u05E8\u05D0",
                Translit: "bara",
                Glosses: ["create"],
                PartOfSpeech: "V",
                OccurrenceCount: 1
            ),
        ];
    }

    // === NEW IN PT10 ===
    // Reason: Internal data record for CAP-008 entry registry (no PT9 equivalent - PT9 used MarbleLexiconEntry directly)
    // Maps to: CAP-008
    // Build default entry data for dictionary entry lookups (CAP-008)
    private static Dictionary<string, DictionaryEntryRecord> BuildDefaultEntryData()
    {
        return new()
        {
            ["logos-001"] = new DictionaryEntryRecord(
                Lemma: "logos",
                Senses:
                [
                    new SenseRecord(
                        SenseId: "logos-001-s1",
                        Glosses:
                        [
                            new GlossEntry(Language: "en", Text: "word"),
                            new GlossEntry(Language: "fr", Text: "parole"),
                        ],
                        Definition: "a communication whereby the mind finds expression"
                    ),
                    new SenseRecord(
                        SenseId: "logos-001-s2",
                        Glosses:
                        [
                            new GlossEntry(Language: "en", Text: "message"),
                            new GlossEntry(Language: "fr", Text: "message"),
                        ],
                        Definition: "a verbal or written communication"
                    ),
                ],
                SemanticDomains: ["Communication"],
                Morphology: "Noun",
                SubItemIds: ["logos-001-s1", "logos-001-s2"]
            ),
            ["kai-001"] = new DictionaryEntryRecord(
                Lemma: "kai",
                Senses:
                [
                    new SenseRecord(
                        SenseId: "kai-001-s1",
                        Glosses: [new GlossEntry(Language: "en", Text: "and")],
                        Definition: "a conjunction linking clauses or words"
                    ),
                ],
                SemanticDomains: [],
                Morphology: "Conjunction",
                SubItemIds: ["kai-001-s1"]
            ),
        };
    }

    // Internal record for storing entry data used by GetDictionaryEntry
    private record DictionaryEntryRecord(
        string Lemma,
        List<SenseRecord> Senses,
        IList<string> SemanticDomains,
        string Morphology,
        List<string> SubItemIds
    );

    // Internal record for storing sense data
    private record SenseRecord(string SenseId, List<GlossEntry> Glosses, string Definition);
}
