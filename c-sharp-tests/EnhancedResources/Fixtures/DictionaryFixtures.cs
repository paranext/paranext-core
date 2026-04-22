using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test fixtures for DictionaryService. Holds canned lexicon, display items, and entry data
/// previously embedded in DictionaryService.cs. Tests populate DictionaryService overrides
/// from these fixtures in [SetUp] and clear them in [TearDown].
///
/// Precedent: MarbleTestHelper. Enforced by N3 policy
/// (patterns.csharp.testScaffoldingLocation).
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
            "empty-resource",
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

    /// <summary>
    /// Populates the DictionaryService overrides with a fresh copy of every default fixture.
    /// Call this from [SetUp]. Use <see cref="Clear"/> from [TearDown].
    /// </summary>
    internal static void ApplyDefaults()
    {
        DictionaryService.LexiconOverride = BuildDefaultLexicon();
        DictionaryService.KnownResourcesOverride = new HashSet<string>(
            KnownResources,
            StringComparer.OrdinalIgnoreCase
        );
        DictionaryService.UninitializedResourcesOverride = new HashSet<string>(
            UninitializedResources,
            StringComparer.OrdinalIgnoreCase
        );
        DictionaryService.NtDisplayItemsOverride = BuildNtDisplayItems();
        DictionaryService.OtDisplayItemsOverride = BuildOtDisplayItems();
        DictionaryService.EntryDataOverride = BuildDefaultEntryData();
    }

    /// <summary>Clears all DictionaryService overrides. Call from [TearDown].</summary>
    internal static void Clear()
    {
        DictionaryService.LexiconOverride = null;
        DictionaryService.KnownResourcesOverride = null;
        DictionaryService.UninitializedResourcesOverride = null;
        DictionaryService.NtDisplayItemsOverride = null;
        DictionaryService.OtDisplayItemsOverride = null;
        DictionaryService.EntryDataOverride = null;
    }
}
