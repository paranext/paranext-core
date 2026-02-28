using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Integration tests for Micro-Phase 3 (BE-3: Lexicon) capability chains.
///
/// These tests verify cross-capability interactions between:
/// - CAP-004 (GetDictionaryEntry): Looks up structured lexicon entries
/// - CAP-014 (GetGloss): Thin wrapper extracting gloss with brace filtering
/// - CAP-017 (GetAvailableGlossLanguages): Lists languages above 50% coverage threshold
/// - CAP-018 (FindLocalizedGlossesForTerm): Finds glosses for Biblical Terms with ref matching
/// - CAP-019 (GetAbbreviationDefinition): Looks up abbreviation key-definition pairs
///
/// Integration Touchpoints:
/// 1. CAP-004 -> CAP-014: Shared ResolveAndLookupEntry pipeline (alias, lang code, normalization)
/// 2. CAP-004 -> CAP-017: Shared dictionary infrastructure (dictionary loaded, sp->es correction)
/// 3. CAP-014 -> CAP-018: Gloss retrieval pipeline feeds localized gloss lookup
/// 4. CAP-017 -> CAP-018: Language selection informs localized gloss lookup
/// 5. CAP-019: Standalone but shares error factory patterns and test seam infrastructure
///
/// These tests use REAL LexiconService method calls. The static test seams simulate the
/// external data layer (ParatextData dictionaries) but the actual capability logic --
/// alias resolution, language code correction, Unicode normalization, brace filtering,
/// threshold comparisons, and error handling -- is exercised end-to-end.
/// </summary>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesMP3IntegrationTests
{
    // =========================================================================
    // TEST SETUP - Configure shared test seams for cross-capability data flow
    // =========================================================================

    /// <summary>
    /// Creates a LexiconEntry with the specified gloss, supporting brace filtering
    /// verification across CAP-004 and CAP-014.
    /// </summary>
    private static LexiconEntry CreateTestEntry(
        string lemma,
        string gloss,
        string glossLanguageId,
        int baseFormCount = 1,
        string dictionary = "SDBG"
    )
    {
        var senses = new List<LexiconSense>
        {
            new(
                SenseId: $"{dictionary}-{lemma}-001",
                Gloss: gloss,
                GlossLanguageId: glossLanguageId,
                OccurrenceCount: 5,
                SelectedSenseRef: "1"
            ),
        };
        var meanings = new List<LexiconMeaning>
        {
            new(Index: 1, Senses: senses, Domains: new List<string> { "25.43" }, Notes: null),
        };
        var baseForms = new List<LexiconBaseForm>();
        for (int i = 0; i < baseFormCount; i++)
        {
            baseForms.Add(
                new LexiconBaseForm(
                    Index: i + 1,
                    LexicalForm: lemma,
                    PosTag: "V",
                    Meanings: meanings
                )
            );
        }
        return new LexiconEntry(
            EntryId: $"{dictionary}-{lemma}",
            Lemma: lemma,
            Dictionary: dictionary,
            BaseForms: baseForms
        );
    }

    // Save/restore test seams so unit tests in other fixtures are not disrupted
    private Func<string, string, string, LexiconEntry?>? _savedDictEntryLookup;
    private Func<string, bool>? _savedIsDictLoaded;
    private Func<string, string>? _savedResolveDictionary;
    private Func<string, Dictionary<string, (double, string)>?>? _savedGetLangCoverage;
    private Func<bool>? _savedHaveMarbleData;
    private Func<string, string, IEnumerable<string>?>? _savedFindGlossesForTerm;
    private Func<string, string, string?>? _savedAbbreviationLookup;

    [SetUp]
    public void SetUp()
    {
        // Save existing seams
        _savedDictEntryLookup = LexiconService.TestDictionaryEntryLookup;
        _savedIsDictLoaded = LexiconService.TestIsDictionaryLoaded;
        _savedResolveDictionary = LexiconService.TestResolveDictionary;
        _savedGetLangCoverage = LexiconService.TestGetLanguageCoverage;
        _savedHaveMarbleData = LexiconService.TestHaveMarbleData;
        _savedFindGlossesForTerm = LexiconService.TestFindGlossesForTerm;
        _savedAbbreviationLookup = LexiconService.TestAbbreviationLookup;

        // Configure shared test seams for integration context:
        // All capabilities share the same data layer configuration

        // Dictionary entry lookup - supports CAP-004 and CAP-014
        LexiconService.TestDictionaryEntryLookup = (dictionary, lemma, langId) =>
        {
            // Greek dictionary entries
            if (dictionary == "SDBG" && lemma == "agapao")
                return CreateTestEntry(
                    "agapao",
                    "{figurative} to love",
                    langId == "es"
                        ? "es"
                        : langId == "fr"
                            ? "fr"
                            : "en",
                    baseFormCount: 1,
                    dictionary: "SDBG"
                );

            if (dictionary == "SDBG" && lemma == "theos")
                return CreateTestEntry("theos", "God, god", "en", dictionary: "SDBG");

            // Hebrew dictionary entries
            if (dictionary == "SDBH" && lemma == "elohim")
                return CreateTestEntry("elohim", "God, gods", "en", dictionary: "SDBH");

            return null; // NOT_FOUND
        };

        // Dictionary loaded check - shared across all lexicon capabilities
        LexiconService.TestIsDictionaryLoaded = dictionary =>
            dictionary is "SDBG" or "SDBH" or "DCLEX";

        // Dictionary alias resolution - shared by CAP-004 and CAP-014
        LexiconService.TestResolveDictionary = name => name == "LN" ? "SDBG" : name;

        // Language coverage - supports CAP-017
        LexiconService.TestGetLanguageCoverage = resourceId =>
        {
            if (resourceId == "NONEXISTENT")
                return null;
            return new Dictionary<string, (double, string)>
            {
                ["en"] = (0.9, "English"),
                ["fr"] = (0.6, "French"),
                ["de"] = (0.3, "German"),
                ["sp"] = (0.7, "Spanish"), // Legacy code, should be corrected to "es"
            };
        };

        // Marble data availability - supports CAP-018
        LexiconService.TestHaveMarbleData = () => true;

        // Term gloss lookup with reference matching - supports CAP-018
        LexiconService.TestFindGlossesForTerm = (term, langId) =>
        {
            // Simulate reference matching (>25% overlap threshold)
            if (term == "agapao" && langId == "en")
                return new[] { "to love" };
            if (term == "agapao" && langId == "fr")
                return new[] { "aimer" };
            if (term == "agapao" && langId == "es")
                return new[] { "amar" };
            if (term == "theos" && langId == "en")
                return new[] { "God", "god" };
            return null; // NOT_FOUND
        };

        // Abbreviation lookup - supports CAP-019
        LexiconService.TestAbbreviationLookup = (key, resourceId) =>
        {
            return key switch
            {
                "NT" => "New Testament",
                "OT" => "Old Testament",
                "LXX" => "Septuagint",
                _ => null,
            };
        };
    }

    [TearDown]
    public void TearDown()
    {
        // Restore all seams to their pre-test state
        LexiconService.TestDictionaryEntryLookup = _savedDictEntryLookup;
        LexiconService.TestIsDictionaryLoaded = _savedIsDictLoaded;
        LexiconService.TestResolveDictionary = _savedResolveDictionary;
        LexiconService.TestGetLanguageCoverage = _savedGetLangCoverage;
        LexiconService.TestHaveMarbleData = _savedHaveMarbleData;
        LexiconService.TestFindGlossesForTerm = _savedFindGlossesForTerm;
        LexiconService.TestAbbreviationLookup = _savedAbbreviationLookup;
    }

    // =========================================================================
    // CHAIN 1: CAP-004 -> CAP-014 (Dictionary Entry -> Gloss Extraction)
    // Shared ResolveAndLookupEntry pipeline
    // =========================================================================

    /// <summary>
    /// Integration: GetDictionaryEntry (CAP-004) and GetGloss (CAP-014) share the
    /// ResolveAndLookupEntry pipeline. When both are called with the same input,
    /// the gloss from GetGloss should match the first sense gloss from
    /// GetDictionaryEntry (after brace filtering).
    ///
    /// This verifies the shared pipeline produces consistent results across both
    /// capability entry points.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 -> CAP-014")]
    [Property("CapabilityId", "CAP-004,CAP-014")]
    [Property("ScenarioId", "TS-037,TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description(
        "Dictionary entry and gloss extraction share ResolveAndLookupEntry pipeline; "
            + "brace-filtered gloss is consistent"
    )]
    public async Task DictionaryEntryThenGloss_SameInput_GlossMatchesFirstSense()
    {
        // Arrange: Same input for both capabilities
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act: CAP-004 - Get full dictionary entry
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            input,
            CancellationToken.None
        );

        // Act: CAP-014 - Get gloss (thin wrapper)
        var glossResult = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Both succeed
        Assert.That(dictResult.Success, Is.True, "CAP-004: Dictionary entry lookup should succeed");
        Assert.That(glossResult.Success, Is.True, "CAP-014: Gloss retrieval should succeed");

        // Assert: The gloss from CAP-014 matches the first sense gloss from CAP-004
        // Both go through brace filtering: "{figurative} to love" -> "to love"
        var dictSenseGloss = dictResult.Entry!.BaseForms[0].Meanings[0].Senses[0].Gloss;
        Assert.That(
            glossResult.Gloss,
            Is.EqualTo(dictSenseGloss),
            "CAP-004 -> CAP-014: Gloss from GetGloss should match first sense gloss "
                + "from GetDictionaryEntry after brace filtering"
        );

        // Both should have braces removed (GM-018)
        Assert.That(
            dictSenseGloss,
            Does.Not.Contain("{"),
            "CAP-004: Dictionary entry gloss should have braces filtered"
        );
        Assert.That(
            glossResult.Gloss,
            Does.Not.Contain("{"),
            "CAP-014: Gloss result should have braces filtered"
        );
    }

    /// <summary>
    /// Integration: GetDictionaryEntry (CAP-004) and GetGloss (CAP-014) share the
    /// LN alias resolution (VAL-009: "LN" -> "SDBG"). When called with dictionary="LN",
    /// both should resolve to SDBG and return valid results.
    ///
    /// This verifies dictionary alias resolution is consistent across both entry points.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 -> CAP-014")]
    [Property("CapabilityId", "CAP-004,CAP-014")]
    [Property("ScenarioId", "TS-071,TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description(
        "LN alias resolution (VAL-009) is consistent between GetDictionaryEntry and GetGloss"
    )]
    public async Task DictionaryEntryAndGloss_LnAlias_BothResolveToSdbg()
    {
        // Arrange: Both use "LN" as dictionary (VAL-009: alias for SDBG)
        var input = new DictionaryLookupInput(
            Dictionary: "LN",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act: CAP-004 - Dictionary entry with LN alias
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            input,
            CancellationToken.None
        );

        // Act: CAP-014 - Gloss with LN alias
        var glossResult = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Both succeed (LN resolved to SDBG in both paths)
        Assert.That(
            dictResult.Success,
            Is.True,
            "CAP-004: LN alias should resolve to SDBG and succeed"
        );
        Assert.That(
            glossResult.Success,
            Is.True,
            "CAP-014: LN alias should resolve to SDBG and succeed"
        );

        // Assert: Dictionary entry reports resolved dictionary as SDBG
        Assert.That(
            dictResult.Entry!.Dictionary,
            Is.EqualTo("SDBG"),
            "CAP-004: LN alias should be resolved to SDBG in entry"
        );

        // Assert: Gloss is available (consistent with dictionary entry)
        Assert.That(
            glossResult.Gloss,
            Is.Not.Null.And.Not.Empty,
            "CAP-014: Gloss should be returned for LN-aliased lookup"
        );
    }

    // =========================================================================
    // CHAIN 2: CAP-017 -> CAP-018 (Available Languages -> Localized Glosses)
    // =========================================================================

    /// <summary>
    /// Integration: GetAvailableGlossLanguages (CAP-017) returns languages above
    /// 50% threshold. FindLocalizedGlossesForTerm (CAP-018) uses one of those
    /// languages to look up glosses. This tests the workflow where a user first
    /// sees available languages, then requests glosses in a selected language.
    ///
    /// The integration verifies that languages reported as available by CAP-017
    /// produce valid gloss results when used with CAP-018.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-017 -> CAP-018")]
    [Property("CapabilityId", "CAP-017,CAP-018")]
    [Property("ScenarioId", "TS-069,TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-014")]
    [Description(
        "Languages from GetAvailableGlossLanguages produce valid glosses "
            + "via FindLocalizedGlossesForTerm"
    )]
    public async Task AvailableLanguagesThenGlossLookup_AvailableLanguage_ReturnsGlosses()
    {
        // Step 1: CAP-017 - Get available languages
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "ESV16",
            CancellationToken.None
        );

        // Verify CAP-017 produced results (integration precondition)
        Assert.That(langResult.Success, Is.True, "CAP-017: Language enumeration should succeed");
        Assert.That(
            langResult.Languages,
            Is.Not.Null.And.Not.Empty,
            "CAP-017: Should have available languages"
        );

        // Step 2: CAP-018 - Use the first available language to find glosses
        var firstLanguage = langResult.Languages![0];
        var glossResult = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            firstLanguage.Id,
            CancellationToken.None
        );

        // Assert: Gloss lookup succeeds with an available language
        Assert.That(
            glossResult.Success,
            Is.True,
            $"CAP-018: Gloss lookup with available language '{firstLanguage.Id}' should succeed"
        );
        Assert.That(
            glossResult.Glosses,
            Is.Not.Null.And.Not.Empty,
            $"CAP-018: Should have glosses in language '{firstLanguage.Id}'"
        );
    }

    /// <summary>
    /// Integration: GetAvailableGlossLanguages (CAP-017) corrects Spanish "sp" to "es"
    /// (VAL-008/INV-C18). FindLocalizedGlossesForTerm (CAP-018) should be able to find
    /// glosses using the corrected "es" code returned by CAP-017.
    ///
    /// This tests the cross-capability contract: CAP-017 outputs corrected codes that
    /// CAP-018 can consume.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-017 -> CAP-018")]
    [Property("CapabilityId", "CAP-017,CAP-018")]
    [Property("ScenarioId", "TS-070,TS-026")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-C18")]
    [Description(
        "Spanish code correction (sp->es) from CAP-017 is usable by CAP-018 for gloss lookup"
    )]
    public async Task AvailableLanguagesThenGlossLookup_SpanishCorrected_GlossLookupSucceeds()
    {
        // Step 1: CAP-017 - Get available languages (should correct "sp" to "es")
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "ESV16",
            CancellationToken.None
        );

        Assert.That(langResult.Success, Is.True);

        // Verify Spanish was corrected to "es" (INV-C18)
        var spanishLang = langResult.Languages!.FirstOrDefault(l => l.Id == "es");
        Assert.That(
            spanishLang,
            Is.Not.Null,
            "CAP-017: Spanish 'sp' should be corrected to 'es' in available languages"
        );
        Assert.That(
            langResult.Languages!.All(l => l.Id != "sp"),
            Is.True,
            "CAP-017: Legacy 'sp' code should not appear in results"
        );

        // Step 2: CAP-018 - Use the corrected "es" code from CAP-017 to find glosses
        var glossResult = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            spanishLang!.Id, // "es" (corrected from "sp")
            CancellationToken.None
        );

        // Assert: Gloss lookup with corrected Spanish code succeeds
        Assert.That(
            glossResult.Success,
            Is.True,
            "CAP-018: Gloss lookup with corrected 'es' code from CAP-017 should succeed"
        );
        Assert.That(
            glossResult.Glosses,
            Is.Not.Null.And.Not.Empty,
            "CAP-018: Should have Spanish glosses when using corrected code"
        );
    }

    // =========================================================================
    // CHAIN 3: Full Lexicon Pipeline
    // CAP-004 -> CAP-014 -> CAP-017 -> CAP-018
    // =========================================================================

    /// <summary>
    /// Integration: Full lexicon pipeline test - Dictionary entry (CAP-004) provides
    /// structured entry data. Gloss (CAP-014) extracts the best gloss. Available
    /// languages (CAP-017) confirms the language is valid. Localized glosses (CAP-018)
    /// finds the same gloss through the Biblical Terms interface.
    ///
    /// This tests the complete data flow for lexicon lookup:
    /// 1. CAP-004: Full dictionary entry with brace-filtered glosses
    /// 2. CAP-014: Thin wrapper extracts just the gloss
    /// 3. CAP-017: Confirms the gloss language is available (above 50% threshold)
    /// 4. CAP-018: Finds the same gloss through the BiblicalTerms interface
    ///
    /// Verifies data consistency across all four capability boundaries.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 -> CAP-014 -> CAP-017 -> CAP-018")]
    [Property("CapabilityId", "CAP-004,CAP-014,CAP-017,CAP-018")]
    [Property("ScenarioId", "TS-037,TS-130,TS-069,TS-026")]
    [Property("BehaviorId", "BHV-303,BHV-111")]
    [Property("GoldenMaster", "GM-017,GM-018")]
    [Description(
        "Full lexicon pipeline: dictionary entry -> gloss -> language check -> localized glosses"
    )]
    public async Task FullLexiconPipeline_DictionaryToLocalizedGlosses_DataConsistent()
    {
        // Step 1: CAP-004 - Get dictionary entry for "agapao"
        var dictInput = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            dictInput,
            CancellationToken.None
        );

        Assert.That(
            dictResult.Success,
            Is.True,
            "Step 1 (CAP-004): Dictionary entry lookup should succeed"
        );
        var dictGloss = dictResult.Entry!.BaseForms[0].Meanings[0].Senses[0].Gloss;
        Assert.That(
            dictGloss,
            Is.EqualTo("to love"),
            "Step 1 (CAP-004): Brace-filtered gloss should be 'to love'"
        );

        // Step 2: CAP-014 - Get just the gloss (thin wrapper)
        var glossResult = await LexiconService.GetGlossAsync(dictInput, CancellationToken.None);

        Assert.That(
            glossResult.Success,
            Is.True,
            "Step 2 (CAP-014): Gloss retrieval should succeed"
        );
        Assert.That(
            glossResult.Gloss,
            Is.EqualTo(dictGloss),
            "Step 2 (CAP-014): Gloss should match dictionary entry gloss"
        );

        // Step 3: CAP-017 - Confirm English is an available language
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "ESV16",
            CancellationToken.None
        );

        Assert.That(
            langResult.Success,
            Is.True,
            "Step 3 (CAP-017): Language enumeration should succeed"
        );
        var englishAvailable = langResult.Languages!.Any(l => l.Id == "en");
        Assert.That(
            englishAvailable,
            Is.True,
            "Step 3 (CAP-017): English (90% coverage) should be available"
        );

        // Step 4: CAP-018 - Find localized glosses for the same term
        var termResult = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "en",
            CancellationToken.None
        );

        Assert.That(
            termResult.Success,
            Is.True,
            "Step 4 (CAP-018): Localized gloss lookup should succeed"
        );
        Assert.That(
            termResult.Glosses!.First(),
            Is.EqualTo("to love"),
            "Step 4 (CAP-018): Localized gloss should match dictionary/gloss pipeline output"
        );

        // Cross-capability consistency: All four produce the same "to love" gloss
        Assert.That(
            dictGloss,
            Is.EqualTo(glossResult.Gloss),
            "Cross-check: CAP-004 gloss == CAP-014 gloss"
        );
        Assert.That(
            glossResult.Gloss,
            Is.EqualTo(termResult.Glosses!.First()),
            "Cross-check: CAP-014 gloss == CAP-018 gloss"
        );
    }

    /// <summary>
    /// Integration: Full pipeline with French language - verifies that the language
    /// pipeline works end-to-end for non-English languages.
    ///
    /// 1. CAP-017 confirms French is available (60% > 50% threshold)
    /// 2. CAP-004 retrieves French gloss from dictionary entry
    /// 3. CAP-014 extracts French gloss
    /// 4. CAP-018 finds French glosses for the term
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 -> CAP-014 -> CAP-017 -> CAP-018")]
    [Property("CapabilityId", "CAP-004,CAP-014,CAP-017,CAP-018")]
    [Property("ScenarioId", "TS-037,TS-130,TS-069,TS-026")]
    [Property("BehaviorId", "BHV-303,BHV-111")]
    [Description(
        "Full lexicon pipeline with French language: "
            + "language available -> dictionary -> gloss -> localized glosses"
    )]
    public async Task FullLexiconPipeline_FrenchLanguage_ConsistentAcrossCapabilities()
    {
        // Step 1: CAP-017 - Verify French is available
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "ESV16",
            CancellationToken.None
        );
        Assert.That(langResult.Success, Is.True);
        Assert.That(
            langResult.Languages!.Any(l => l.Id == "fr"),
            Is.True,
            "Step 1 (CAP-017): French (60%) should be available (above 50% threshold)"
        );

        // Step 2: CAP-004 - Get dictionary entry with French glosses
        var dictInput = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "fr",
            BookNumber: 40
        );
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            dictInput,
            CancellationToken.None
        );
        Assert.That(dictResult.Success, Is.True, "Step 2 (CAP-004): French lookup should succeed");

        // Step 3: CAP-014 - Get French gloss
        var glossResult = await LexiconService.GetGlossAsync(dictInput, CancellationToken.None);
        Assert.That(glossResult.Success, Is.True, "Step 3 (CAP-014): French gloss should succeed");
        Assert.That(
            glossResult.LanguageId,
            Is.EqualTo("fr"),
            "Step 3 (CAP-014): Language should be French"
        );

        // Step 4: CAP-018 - Find French localized glosses
        var termResult = await LexiconService.FindLocalizedGlossesForTermAsync(
            "agapao",
            "fr",
            CancellationToken.None
        );
        Assert.That(
            termResult.Success,
            Is.True,
            "Step 4 (CAP-018): French localized glosses should succeed"
        );
        Assert.That(
            termResult.Glosses,
            Is.Not.Null.And.Not.Empty,
            "Step 4 (CAP-018): Should have French glosses"
        );
    }

    // =========================================================================
    // CHAIN 4: CAP-019 alongside CAP-004 (Abbreviation + Dictionary)
    // =========================================================================

    /// <summary>
    /// Integration: Abbreviation lookup (CAP-019) works alongside dictionary entry
    /// lookup (CAP-004). Both capabilities access resource data independently but
    /// share the same LexiconService static class and error factory patterns.
    ///
    /// This simulates the real workflow where a user views an encyclopedia entry
    /// that contains both lexical links (requiring dictionary lookup) and
    /// abbreviation tooltips (requiring abbreviation lookup).
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-019 + CAP-004")]
    [Property("CapabilityId", "CAP-019,CAP-004")]
    [Property("ScenarioId", "TS-034,TS-037")]
    [Property("BehaviorId", "BHV-300,BHV-303")]
    [Property("GoldenMaster", "GM-007,GM-018")]
    [Description(
        "Abbreviation lookup and dictionary entry lookup work alongside each other "
            + "in the same LexiconService"
    )]
    public async Task AbbreviationAndDictionary_ParallelLookups_BothSucceed()
    {
        // Act: CAP-019 - Look up abbreviation
        var abbrResult = await LexiconService.GetAbbreviationDefinitionAsync(
            "NT",
            "test-resource",
            CancellationToken.None
        );

        // Act: CAP-004 - Look up dictionary entry
        var dictInput = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            dictInput,
            CancellationToken.None
        );

        // Assert: Both lookups succeed independently
        Assert.That(abbrResult.Success, Is.True, "CAP-019: Abbreviation lookup should succeed");
        Assert.That(abbrResult.Key, Is.EqualTo("NT"), "CAP-019: Key should be 'NT'");
        Assert.That(
            abbrResult.Definition,
            Is.EqualTo("New Testament"),
            "CAP-019: Definition should be 'New Testament'"
        );

        Assert.That(dictResult.Success, Is.True, "CAP-004: Dictionary lookup should succeed");
        Assert.That(dictResult.Entry, Is.Not.Null, "CAP-004: Entry should be present");

        // Verify they do not interfere with each other
        Assert.That(abbrResult.Error, Is.Null, "CAP-019: No error on success");
        Assert.That(dictResult.Error, Is.Null, "CAP-004: No error on success");
    }

    // =========================================================================
    // CHAIN 5: Shared Infrastructure Consistency
    // =========================================================================

    /// <summary>
    /// Integration: Error code patterns are consistent across all MP3 capabilities.
    /// When an item is not found, all capabilities return "NOT_FOUND" with messages
    /// that follow the contract pattern: "{Entity} '{identifier}' not found".
    ///
    /// This verifies the shared error factory infrastructure produces consistent
    /// error structures across capability boundaries.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 + CAP-014 + CAP-017 + CAP-019")]
    [Property("CapabilityId", "CAP-004,CAP-014,CAP-017,CAP-019")]
    [Property("ScenarioId", "TS-037,TS-130,TS-069,TS-034")]
    [Property("BehaviorId", "BHV-303,BHV-111,BHV-300")]
    [Description("NOT_FOUND error codes are consistent across all MP3 capabilities")]
    public async Task SharedErrorPatterns_NotFoundErrors_ConsistentAcrossCapabilities()
    {
        // CAP-004: Lemma not found
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            new DictionaryLookupInput("SDBG", "nonexistent", 1, 1, "en", 40),
            CancellationToken.None
        );

        // CAP-014: Gloss not found
        var glossResult = await LexiconService.GetGlossAsync(
            new DictionaryLookupInput("SDBG", "nonexistent", 1, 1, "en", 40),
            CancellationToken.None
        );

        // CAP-017: Resource not found
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "NONEXISTENT",
            CancellationToken.None
        );

        // CAP-019: Abbreviation not found
        var abbrResult = await LexiconService.GetAbbreviationDefinitionAsync(
            "NONEXISTENT",
            "test-resource",
            CancellationToken.None
        );

        // Assert: All return NOT_FOUND with consistent error structure
        Assert.That(dictResult.Error!.Code, Is.EqualTo("NOT_FOUND"), "CAP-004: NOT_FOUND code");
        Assert.That(glossResult.Error!.Code, Is.EqualTo("NOT_FOUND"), "CAP-014: NOT_FOUND code");
        Assert.That(langResult.Error!.Code, Is.EqualTo("NOT_FOUND"), "CAP-017: NOT_FOUND code");
        Assert.That(abbrResult.Error!.Code, Is.EqualTo("NOT_FOUND"), "CAP-019: NOT_FOUND code");

        // All error messages should be non-empty and follow contract patterns
        Assert.That(
            dictResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-004: Error message should be present"
        );
        Assert.That(
            glossResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-014: Error message should be present"
        );
        Assert.That(
            langResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-017: Error message should be present"
        );
        Assert.That(
            abbrResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-019: Error message should be present"
        );

        // All failures should have Success=false
        Assert.That(dictResult.Success, Is.False, "CAP-004: NOT_FOUND means Success=false");
        Assert.That(glossResult.Success, Is.False, "CAP-014: NOT_FOUND means Success=false");
        Assert.That(langResult.Success, Is.False, "CAP-017: NOT_FOUND means Success=false");
        Assert.That(abbrResult.Success, Is.False, "CAP-019: NOT_FOUND means Success=false");
    }

    /// <summary>
    /// Integration: Spanish language code correction (VAL-008: "sp" -> "es") is
    /// applied consistently by GetDictionaryEntry (CAP-004), GetGloss (CAP-014),
    /// and GetAvailableGlossLanguages (CAP-017).
    ///
    /// All three capabilities that accept or produce language codes should apply
    /// the same correction logic. This verifies the shared CorrectLanguageCode
    /// helper is used consistently.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-004 + CAP-014 + CAP-017")]
    [Property("CapabilityId", "CAP-004,CAP-014,CAP-017")]
    [Property("ScenarioId", "TS-070,TS-130,TS-069")]
    [Property("BehaviorId", "BHV-303,BHV-111")]
    [Property("InvariantId", "INV-C18")]
    [Description(
        "Spanish code correction (sp->es) applied consistently across "
            + "dictionary entry, gloss, and language listing"
    )]
    public async Task SpanishCodeCorrection_ConsistentAcrossCapabilities()
    {
        // CAP-004: Get dictionary entry with "sp" language code
        var dictResult = await LexiconService.GetDictionaryEntryAsync(
            new DictionaryLookupInput("SDBG", "agapao", 1, 1, "sp", 40),
            CancellationToken.None
        );

        // CAP-014: Get gloss with "sp" language code
        var glossResult = await LexiconService.GetGlossAsync(
            new DictionaryLookupInput("SDBG", "agapao", 1, 1, "sp", 40),
            CancellationToken.None
        );

        // CAP-017: Get available languages (includes "sp" that should be corrected)
        var langResult = await LexiconService.GetAvailableGlossLanguagesAsync(
            "ESV16",
            CancellationToken.None
        );

        // Assert: All succeed
        Assert.That(dictResult.Success, Is.True, "CAP-004: Spanish lookup should succeed");
        Assert.That(glossResult.Success, Is.True, "CAP-014: Spanish gloss should succeed");
        Assert.That(langResult.Success, Is.True, "CAP-017: Language listing should succeed");

        // Assert: "sp" is corrected to "es" in all outputs
        var dictGlossLangs = dictResult
            .Entry!.BaseForms.SelectMany(bf =>
                bf.Meanings.SelectMany(m => m.Senses.Select(s => s.GlossLanguageId))
            )
            .Distinct()
            .ToList();
        Assert.That(
            dictGlossLangs,
            Does.Not.Contain("sp"),
            "CAP-004: 'sp' should be corrected to 'es' in dictionary entry senses"
        );

        Assert.That(
            glossResult.LanguageId,
            Is.Not.EqualTo("sp"),
            "CAP-014: 'sp' should be corrected to 'es' in gloss result"
        );

        Assert.That(
            langResult.Languages!.All(l => l.Id != "sp"),
            Is.True,
            "CAP-017: 'sp' should be corrected to 'es' in language list"
        );
        Assert.That(
            langResult.Languages!.Any(l => l.Id == "es"),
            Is.True,
            "CAP-017: Corrected 'es' should appear in language list"
        );
    }
}
