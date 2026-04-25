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
        new(StringComparer.OrdinalIgnoreCase) { "uninitialized-resource", };

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
    /// lexical-link token resolves to entry "logos-001" in the default entry data.
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
                LexicalLinks: ["logos-001:logos:logos-001-s1"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 1, tokens);
    }

    /// <summary>
    /// Builds a token provider with an NT (Matthew 1:1) book scenario whose
    /// lexical-link tokens resolve to "logos-001" and "kai-001" in the default
    /// entry data. Includes a deliberate duplicate Index for BHV-353 dedup tests.
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
                LexicalLinks: ["logos-001:logos:logos-001-s1"]
            ),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "kai",
                4,
                LexicalLinks: ["kai-001:kai:kai-001-s1"]
            ),
            // Duplicate of logos token (same Index = 3) for BHV-353 dedup testing.
            new MarbleToken(
                MarbleTokenType.TextLink,
                "logos",
                3,
                LexicalLinks: ["logos-001:logos:logos-001-s1"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum: 40, tokens);
    }

    internal static Dictionary<string, DictionaryEntryRecord> BuildDefaultEntryData() =>
        new()
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
