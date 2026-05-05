using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test fixtures for DictionaryService. Holds canned lexicon, display items, entry data,
/// and known-resource sets. Exposes BuildDictionaryData() returning an immutable record
/// consumed by DictionaryService's primary constructor.
///
/// Prior ApplyDefaults/Clear pattern was retired alongside DictionaryService's static
/// *Override seams. See ADR serviceComposition.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class DictionaryFixtures
{
    internal static readonly HashSet<string> KnownResources =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "test-resource",
            "SDBH",
            "SDBG",
            "test-resource-with-dupes",
        };

    internal static readonly HashSet<string> UninitializedResources =
        new(StringComparer.OrdinalIgnoreCase) { "uninitialized-resource" };

    /// <summary>
    /// Builds a fresh copy of the default lexicon so tests can mutate without polluting
    /// other tests. Uses gm-023 / gm-024 baseline: 5 entries with overlapping glosses and
    /// semantic domains for related-lexeme discovery.
    /// </summary>
    internal static Dictionary<
        string,
        (List<string> Glosses, List<string> Domains)
    > BuildDefaultLexicon() =>
        new()
        {
            ["logos"] = (["word", "message"], ["Communication"]),
            ["rhema"] = (["word"], ["Communication"]),
            ["aggelia"] = (["message"], ["Communication"]),
            ["graphe"] = (["scripture"], ["Sacred Texts"]),
            ["kai"] = (["and"], []),
        };

    /// <summary>
    /// Builds the full DictionaryData record used by the DI'd DictionaryService.
    /// Display items are now produced from tokens via IMarbleBookTokenProvider, not
    /// pre-baked into DictionaryPerPackage. DCLEX has no entries so three-way routing
    /// tests can target it; SDBH/SDBG share the default entry+lexicon data.
    /// </summary>
    internal static DictionaryData BuildDictionaryData()
    {
        var defaultLexicon = BuildDefaultLexicon();
        var lexiconAsReadOnly = defaultLexicon.ToDictionary(
            kv => kv.Key,
            kv =>
                ((IReadOnlyList<string>)kv.Value.Glosses, (IReadOnlyList<string>)kv.Value.Domains),
            StringComparer.OrdinalIgnoreCase
        );

        var entries = BuildDefaultEntryData();

        var sdbh = new DictionaryPerPackage(EntriesById: entries, Lexicon: lexiconAsReadOnly);
        var sdbg = new DictionaryPerPackage(EntriesById: entries, Lexicon: lexiconAsReadOnly);
        var dclex = new DictionaryPerPackage(
            EntriesById: new Dictionary<string, DictionaryEntryRecord>(
                StringComparer.OrdinalIgnoreCase
            ),
            Lexicon: new Dictionary<
                string,
                (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
            >(StringComparer.OrdinalIgnoreCase)
        );

        return new DictionaryData(
            ByDictionary: new Dictionary<string, DictionaryPerPackage>(
                StringComparer.OrdinalIgnoreCase
            )
            {
                ["SDBH"] = sdbh,
                ["SDBG"] = sdbg,
                ["DCLEX"] = dclex,
            },
            KnownResourceIds: new HashSet<string>(KnownResources, StringComparer.OrdinalIgnoreCase),
            UninitializedResourceIds: new HashSet<string>(
                UninitializedResources,
                StringComparer.OrdinalIgnoreCase
            )
        );
    }

    /// <summary>
    /// Builds a token provider with a single OT (Genesis 1:1) book scenario whose
    /// lexical-link token resolves to entry "logos" in the default entry data.
    /// LexicalLinks shape mirrors real PT9 marble bibles
    /// (PT9 MarbleLexicalLink.cs:37-47 - "{Dict}:{Lemma}:{BaseFormIdx}{MeaningIdx}").
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderForOtTokens(string resourceId)
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "logos",
                3,
                LexicalLinks: ["SDBH:logos:000000"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 1, tokens);
    }

    /// <summary>
    /// Builds a token provider with an NT (Matthew 1:1) book scenario whose
    /// lexical-link tokens resolve to "logos" and "kai" in the default entry
    /// data. Includes a deliberate duplicate Index for BHV-353 dedup tests.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderForNtTokens(string resourceId)
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "logos",
                3,
                LexicalLinks: ["SDBG:logos:000000"]
            ),
            new MarbleToken(MarbleTokenType.TextLink, "kai", 4, LexicalLinks: ["SDBG:kai:000000"]),
            // Duplicate of logos token (same Index = 3) for BHV-353 dedup testing.
            new MarbleToken(
                MarbleTokenType.TextLink,
                "logos",
                3,
                LexicalLinks: ["SDBG:logos:000000"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 40, tokens);
    }

    /// <summary>
    /// Default entry data keyed by NFD-normalized lemma to match production
    /// (PT9 MarbleDataAccess.cs:1444 keys cachedLemmaToEntry on the FormD lemma;
    /// MarbleLexiconLoader does the same). Sense ids retain their PT9 form
    /// ("logos-001-s1") because senses are still identified by EntryCode
    /// inside the entry, not by the entry-level numeric Id.
    /// </summary>
    internal static Dictionary<string, DictionaryEntryRecord> BuildDefaultEntryData() =>
        new()
        {
            ["logos"] = new DictionaryEntryRecord(
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
            ["kai"] = new DictionaryEntryRecord(
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

    /// <summary>
    /// A multi-sense Hebrew entry exercising RelevantSenseIndices selection.
    /// Three senses with distinct SenseIds; tokens that point at a subset of senses
    /// drive the assertions in DictionaryServiceTests' RelevantSense*** tests.
    /// SenseId shape mirrors PT9 (entry-local code) - here a stable "sense-NNN" form.
    /// PT9 reference: DictionaryTab.cs:485-517 SelectedSense.
    /// </summary>
    internal static DictionaryEntryRecord MultiSenseHebrewEntry() =>
        new(
            Lemma: "אֱלֹהִים",
            Senses:
            [
                new SenseRecord(
                    SenseId: "sense-001",
                    Glosses: [new GlossEntry(Language: "en", Text: "God")],
                    Definition: "The supreme deity."
                ),
                new SenseRecord(
                    SenseId: "sense-002",
                    Glosses: [new GlossEntry(Language: "en", Text: "gods")],
                    Definition: "Lesser divine beings."
                ),
                new SenseRecord(
                    SenseId: "sense-003",
                    Glosses: [new GlossEntry(Language: "en", Text: "judges")],
                    Definition: "Human authorities acting for God."
                ),
            ],
            SemanticDomains: [],
            Morphology: "noun",
            SubItemIds: ["sense-001", "sense-002", "sense-003"]
        );

    /// <summary>
    /// Builds a DictionaryData whose SDBH/SDBG/DCLEX packages all carry only the
    /// supplied entry, keyed by its NFD-normalized lemma (matching production -
    /// PT9 MarbleDataAccess.cs:1444). Used by tests that need a single entry under
    /// test (RelevantSenseIndices / FirstRelevantSensePreview behavior) without
    /// noise from the default fixture's logos/kai data.
    /// </summary>
    internal static DictionaryData BuildDictionaryDataWithSingleEntry(DictionaryEntryRecord entry)
    {
        var key = entry.Lemma.Normalize(System.Text.NormalizationForm.FormD);
        var entries = new Dictionary<string, DictionaryEntryRecord>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            [key] = entry,
        };
        var emptyLexicon = new Dictionary<
            string,
            (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
        >(StringComparer.OrdinalIgnoreCase);
        var pkg = new DictionaryPerPackage(EntriesById: entries, Lexicon: emptyLexicon);
        return new DictionaryData(
            ByDictionary: new Dictionary<string, DictionaryPerPackage>(
                StringComparer.OrdinalIgnoreCase
            )
            {
                ["SDBH"] = pkg,
                ["SDBG"] = pkg,
                ["DCLEX"] = pkg,
            },
            KnownResourceIds: new HashSet<string>(KnownResources, StringComparer.OrdinalIgnoreCase),
            UninitializedResourceIds: new HashSet<string>(
                UninitializedResources,
                StringComparer.OrdinalIgnoreCase
            )
        );
    }

    /// <summary>
    /// Builds an OT (Genesis 1:1) token whose lexical_links reference two of the
    /// three senses on MultiSenseHebrewEntry (sense-001 and sense-003). LexicalLinks
    /// follow PT9's "EntryRef:Lemma:SenseId" shape; only the third segment matters
    /// for sense matching.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderForMultiSenseHebrewToken(
        string resourceId
    )
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "אֱלֹהִים",
                3,
                LexicalLinks: ["SDBH:אֱלֹהִים:sense-001", "SDBH:אֱלֹהִים:sense-003"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 1, tokens);
    }

    /// <summary>
    /// Builds an OT (Genesis 1:1) token whose lexical_links list is null - simulates a
    /// token that has no lexical link information (e.g. raw word with no marble link).
    /// Drives the "no lexical links yields empty relevance" path.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderForUnlinkedToken(
        string resourceId
    )
    {
        // The token still needs *some* lexical link for LoadResources to consider
        // it (firstLink null/empty short-circuits the loop). Use a link that
        // resolves the lemma but carries no senseId - mirrors PT9 packages
        // where a token may name an entry without claiming a specific sense.
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "אֱלֹהִים",
                3,
                LexicalLinks: ["SDBH:אֱלֹהִים:"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 1, tokens);
    }

    /// <summary>
    /// A single-sense entry whose Definition is empty. Drives the
    /// "fallback to first localized gloss" branch of FirstRelevantSensePreview.
    /// PT9 reference: DictionaryTab.cs:554-555.
    /// </summary>
    internal static DictionaryEntryRecord DefinitionlessSenseEntry() =>
        new(
            Lemma: "אֱלֹהִים",
            Senses:
            [
                new SenseRecord(
                    SenseId: "sense-001",
                    Glosses: [new GlossEntry(Language: "en", Text: "God-fallback-gloss")],
                    Definition: ""
                ),
            ],
            SemanticDomains: [],
            Morphology: "noun",
            SubItemIds: ["sense-001"]
        );

    /// <summary>
    /// Builds an OT (Genesis 1:1) token whose lexical_links reference the single
    /// sense on DefinitionlessSenseEntry. Drives the gloss-fallback assertion.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderForDefinitionlessToken(
        string resourceId
    )
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "אֱלֹהִים",
                3,
                LexicalLinks: ["SDBH:אֱלֹהִים:sense-001"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 1, tokens);
    }
}
