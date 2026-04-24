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

    /// <summary>NT display items with a deliberate duplicate TokenId to exercise BHV-353.</summary>
    internal static List<DictionaryDisplayItem> BuildNtDisplayItems() =>
        [
            new DictionaryDisplayItem(
                TokenId: "nt-token-001",
                Term: "logos",
                SourceText: "λόγος",
                Translit: "logos",
                Glosses: ["word", "message"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "nt-token-002",
                Term: "theos",
                SourceText: "θεός",
                Translit: "theos",
                Glosses: ["God", "god"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "nt-token-003",
                Term: "kurios",
                SourceText: "κύριος",
                Translit: "kurios",
                Glosses: ["Lord", "master"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            // Duplicate of logos for deduplication testing (BHV-353)
            new DictionaryDisplayItem(
                TokenId: "nt-token-001",
                Term: "logos",
                SourceText: "λόγος",
                Translit: "logos",
                Glosses: ["word", "message"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
        ];

    internal static List<DictionaryDisplayItem> BuildOtDisplayItems() =>
        [
            new DictionaryDisplayItem(
                TokenId: "ot-token-001",
                Term: "elohim",
                SourceText: "אלהים",
                Translit: "elohim",
                Glosses: ["God", "gods"],
                PartOfSpeech: "N",
                OccurrenceCount: 1
            ),
            new DictionaryDisplayItem(
                TokenId: "ot-token-002",
                Term: "bara",
                SourceText: "ברא",
                Translit: "bara",
                Glosses: ["create"],
                PartOfSpeech: "V",
                OccurrenceCount: 1
            ),
        ];

    /// <summary>
    /// Builds the full DictionaryData record used by the DI'd DictionaryService.
    /// Routes the OT display items under SDBH, NT display items under SDBG, and
    /// (for now) an empty slice under DCLEX so three-way routing tests can target it.
    /// Entry data is duplicated across packages so GetDictionaryEntry works
    /// regardless of which dictionary the caller's book number routes to.
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

        var sdbh = new DictionaryPerPackage(
            EntriesById: entries,
            Lexicon: lexiconAsReadOnly,
            DisplayItems: BuildOtDisplayItems()
        );
        var sdbg = new DictionaryPerPackage(
            EntriesById: entries,
            Lexicon: lexiconAsReadOnly,
            DisplayItems: BuildNtDisplayItems()
        );
        var dclex = new DictionaryPerPackage(
            EntriesById: entries,
            Lexicon: lexiconAsReadOnly,
            DisplayItems: []
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
