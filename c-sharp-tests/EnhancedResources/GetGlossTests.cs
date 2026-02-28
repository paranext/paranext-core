using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.GetGlossAsync (CAP-014).
///
/// Retrieves and formats a gloss string for a lexical link, with brace-filtering
/// applied. This is a thin wrapper (EXT-038) over dictionary entry retrieval that
/// extracts the best available gloss and removes curly-brace content.
///
/// Contract: Section 4.14 GetGloss (data-contracts.md)
/// Input Type: Section 2.3 DictionaryLookupInput
/// Output Type: Section 3.12 GlossResult
/// Behavior: BHV-303 (Lexicon Entry Data Models - brace filtering)
/// Extraction: EXT-038 (Gloss Retrieval and Brace Filtering)
/// Golden Master: GM-018 (Dictionary Lookup - Gloss Brace Filtering)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class GetGlossTests
{
    // =========================================================================
    // TEST SETUP - Configure test seams for dictionary entry lookup
    // =========================================================================

    /// <summary>
    /// Creates a minimal LexiconEntry for test seam injection, with a single
    /// base form, meaning, and sense containing the specified gloss.
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
                SenseId: "sense-001",
                Gloss: gloss,
                GlossLanguageId: glossLanguageId,
                OccurrenceCount: 5,
                SelectedSenseRef: "1"
            ),
        };
        var meanings = new List<LexiconMeaning>
        {
            new(Index: 1, Senses: senses, Domains: new List<string>(), Notes: null),
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

    [SetUp]
    public void SetUp()
    {
        // Configure test seam: dictionary lookup returns a test entry with brace content
        LexiconService.TestDictionaryEntryLookup = (dictionary, lemma, langId) =>
        {
            if (lemma == "agapao" || lemma == "agapa\u0301o\u0304")
                return CreateTestEntry(
                    "agapao",
                    "{figurative} to love",
                    langId == "es"
                        ? "es"
                        : langId == "fr"
                            ? "fr"
                            : "en"
                );

            if (lemma == "theos")
                return CreateTestEntry("theos", "God, god", "en");

            if (lemma == "multibraceword")
                return CreateTestEntry(
                    "multibraceword",
                    "{domain1} {domain2} actual meaning",
                    "en"
                );

            if (lemma == "onlybraces")
                return CreateTestEntry("onlybraces", "{only braces here}", "en");

            if (lemma == "nobraces")
                return CreateTestEntry("nobraces", "clean gloss text", "en");

            if (lemma == "braces_at_end")
                return CreateTestEntry("braces_at_end", "to run {literal}", "en");

            return null; // NOT_FOUND
        };

        LexiconService.TestIsDictionaryLoaded = dictionary =>
            dictionary is "SDBG" or "SDBH" or "DCLEX";

        LexiconService.TestResolveDictionary = name => name == "LN" ? "SDBG" : name;
    }

    [TearDown]
    public void TearDown()
    {
        // Reset test seams
        LexiconService.TestDictionaryEntryLookup = null;
        LexiconService.TestIsDictionaryLoaded = null;
        LexiconService.TestResolveDictionary = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-014
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetGlossAsync is called with valid input containing
    /// a gloss with braces, it returns a GlossResult with the braces removed.
    /// This matches the GM-018 golden master: "{figurative} to love" -> "to love".
    ///
    /// This test passes when CAP-014 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description(
        "Acceptance test: Gloss string retrieved and formatted with curly braces removed, "
            + "matching GM-018 expected output"
    )]
    public async Task GetGloss_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-018 input - dictionary entry with raw gloss "{figurative} to love"
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40 // Matthew (NT -> SDBG per INV-013)
        );

        // Act: Call the public API defined in data-contracts.md Section 4.14
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: GM-018 exact match - filteredGloss = "to love"
        Assert.That(result.Success, Is.True, "Gloss retrieval should succeed");
        Assert.That(result.Gloss, Is.Not.Null, "Gloss should be present on success");
        Assert.That(
            result.Gloss,
            Is.EqualTo("to love"),
            "GM-018: filteredGloss should be 'to love' with braces removed"
        );
        Assert.That(
            result.LanguageId,
            Is.EqualTo("en"),
            "GM-018: Language should be 'en' for English gloss"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path (Section 4.14)
    // =========================================================================

    /// <summary>
    /// TS-130: Gloss retrieval filters braces from gloss strings.
    /// Raw gloss: "{figurative} to love" -> filtered: "to love"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-038")]
    [Description("BHV-303: Gloss with braces has brace content removed")]
    public async Task GetGloss_WithBracedGloss_ReturnsBracesFiltered()
    {
        // Arrange: TS-130 - entry with gloss containing braces
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Per TS-130, braces and their content are removed
        Assert.That(result.Success, Is.True, "Gloss retrieval should succeed");
        Assert.That(
            result.Gloss,
            Does.Not.Contain("{"),
            "Filtered gloss should not contain opening brace"
        );
        Assert.That(
            result.Gloss,
            Does.Not.Contain("}"),
            "Filtered gloss should not contain closing brace"
        );
        Assert.That(
            result.Gloss,
            Is.EqualTo("to love"),
            "TS-130: '{figurative} to love' -> 'to love'"
        );
    }

    /// <summary>
    /// Gloss without braces is returned unchanged.
    /// A clean gloss string should pass through without modification.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-038")]
    [Description("Gloss without braces is returned unchanged")]
    public async Task GetGloss_WithCleanGloss_ReturnsUnchanged()
    {
        // Arrange: Entry with no braces in gloss
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "nobraces",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Clean gloss passes through unchanged
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Gloss,
            Is.EqualTo("clean gloss text"),
            "Gloss without braces should be returned unchanged"
        );
    }

    /// <summary>
    /// Verify that GetGloss returns the language ID used for the gloss.
    /// Per Section 4.14: Returns the best available language for the gloss.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("GlossResult includes the language ID of the gloss")]
    public async Task GetGloss_SuccessResult_IncludesLanguageId()
    {
        // Arrange
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Per Section 3.12, GlossResult includes languageId
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.LanguageId,
            Is.Not.Null.And.Not.Empty,
            "LanguageId should be populated on success"
        );
        Assert.That(
            result.LanguageId,
            Is.EqualTo("en"),
            "Language should match requested language"
        );
    }

    /// <summary>
    /// Verify that GetGloss uses the best available language.
    /// When French is requested and available, the gloss should be in French.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("GetGloss uses best available language for the gloss")]
    public async Task GetGloss_WithFrenchLanguage_ReturnsFrenchGloss()
    {
        // Arrange: Request French gloss
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "fr",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Per Section 4.14 postconditions - uses best available language
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.LanguageId,
            Is.EqualTo("fr"),
            "When French is available, language should be 'fr'"
        );
    }

    /// <summary>
    /// Verify that the GlossResult success structure matches Section 3.12.
    /// Success: { Success: true, Gloss: string, LanguageId: string, Error: null }
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Success result has correct GlossResult structure per Section 3.12")]
    public async Task GetGloss_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "theos",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Section 3.12 success structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Gloss, Is.Not.Null.And.Not.Empty, "Gloss should be present on success");
        Assert.That(
            result.LanguageId,
            Is.Not.Null.And.Not.Empty,
            "LanguageId should be present on success"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases (Section 4.14 Error Conditions)
    // =========================================================================

    /// <summary>
    /// No gloss available returns NOT_FOUND error.
    /// Per Section 4.14: "No gloss found for lemma '{lemma}'"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("No gloss available returns NOT_FOUND error per Section 4.14")]
    public async Task GetGloss_LemmaNotFound_ReturnsNotFound()
    {
        // Arrange: Non-existent lemma
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "nonexistent_lemma_xyz",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Per Section 4.14 error conditions
        Assert.That(result.Success, Is.False, "Non-existent lemma should fail");
        Assert.That(result.Gloss, Is.Null, "Gloss should be null on failure");
        Assert.That(result.LanguageId, Is.Null, "LanguageId should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("No gloss found for lemma 'nonexistent_lemma_xyz'"),
            "Error message should match contract pattern"
        );
    }

    /// <summary>
    /// Dictionary not loaded returns INVALID_STATE error.
    /// GetGloss depends on dictionary data being loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Dictionary not loaded returns INVALID_STATE error")]
    public async Task GetGloss_DictionaryNotLoaded_ReturnsInvalidState()
    {
        // Arrange: Unloaded dictionary
        var input = new DictionaryLookupInput(
            Dictionary: "UNLOADED_DICT",
            Lemma: "test",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Precondition failure per Section 4.14
        Assert.That(result.Success, Is.False, "Unloaded dictionary should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
    }

    /// <summary>
    /// Error result has correct GlossResult structure.
    /// Error: { Success: false, Gloss: null, LanguageId: null, Error: { Code, Message } }
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Error result has correct GlossResult structure per Section 3.12")]
    public async Task GetGloss_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger an error
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "nonexistent_lemma_xyz",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Section 3.12 error structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Gloss, Is.Null, "Gloss should be null on failure");
        Assert.That(result.LanguageId, Is.Null, "LanguageId should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.Not.Null.And.Not.Empty,
            "Error code should be non-empty"
        );
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message should be non-empty"
        );
    }

    // =========================================================================
    // BRACE FILTERING EDGE CASES (GM-018 notes: multiple brace sections)
    // =========================================================================

    /// <summary>
    /// Multiple brace sections in a single gloss are all removed.
    /// GM-018 notes: "Multiple brace sections in a single gloss"
    /// Input: "{domain1} {domain2} actual meaning" -> "actual meaning"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description("GM-018: Multiple brace sections in gloss are all removed")]
    public async Task GetGloss_MultipleBraceSections_AllRemoved()
    {
        // Arrange: GM-018 edge case - multiple brace sections
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "multibraceword",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Both brace sections removed
        Assert.That(result.Success, Is.True);
        Assert.That(result.Gloss, Does.Not.Contain("{"), "No opening braces should remain");
        Assert.That(result.Gloss, Does.Not.Contain("}"), "No closing braces should remain");
        Assert.That(
            result.Gloss,
            Is.EqualTo("actual meaning"),
            "Multiple brace sections should all be removed"
        );
    }

    /// <summary>
    /// Gloss that is entirely brace-enclosed results in empty string.
    /// Input: "{only braces here}" -> ""
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Gloss consisting entirely of brace content results in empty string")]
    public async Task GetGloss_EntirelyBraceEnclosed_ReturnsEmptyOrStripped()
    {
        // Arrange: Gloss is entirely within braces
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "onlybraces",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: After brace filtering, gloss should be empty string
        Assert.That(result.Success, Is.True, "Lookup should succeed even if gloss becomes empty");
        Assert.That(result.Gloss, Does.Not.Contain("{"), "No braces should remain");
    }

    /// <summary>
    /// Braces at end of gloss string: "to run {literal}" -> "to run"
    /// GM-018 notes: "Braces at different positions in string"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description("GM-018: Braces at end of gloss are removed with trailing whitespace")]
    public async Task GetGloss_BracesAtEnd_RemovedWithWhitespace()
    {
        // Arrange: GM-018 edge case - braces at end of string
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "braces_at_end",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Braces and trailing space removed
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Gloss,
            Is.EqualTo("to run"),
            "Brace content at end should be removed along with trailing whitespace"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-018
    // =========================================================================

    /// <summary>
    /// GM-018: Gloss Retrieval and Brace Filtering - exact match.
    /// Input: rawGloss = "{figurative} to love"
    /// Expected: filteredGloss = "to love"
    /// Comparison strategy: exact
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description("GM-018: Gloss retrieval with brace filtering - exact match")]
    public async Task GoldenMaster_GM018_GlossRetrievalBraceFiltering()
    {
        // GM-018 input: rawGloss = "{figurative} to love"
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: GM-018 expected output - exact comparison
        Assert.That(result.Success, Is.True, "GM-018: Lookup should succeed");
        Assert.That(
            result.Gloss,
            Is.EqualTo("to love"),
            "GM-018: filteredGloss must be exactly 'to love'"
        );
        Assert.That(result.LanguageId, Is.EqualTo("en"), "GM-018: Language should be English");
    }

    // =========================================================================
    // EXTRACTION TESTS - EXT-038
    // =========================================================================

    /// <summary>
    /// EXT-038: GetGloss is a thin wrapper over dictionary entry retrieval.
    /// It delegates to the dictionary lookup and extracts the gloss.
    /// Verify it works end-to-end for a simple case.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-038")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("EXT-038: GetGloss is a thin wrapper that delegates to dictionary lookup")]
    public async Task GetGloss_ThinWrapper_DelegatesToDictionaryLookup()
    {
        // EXT-038: "Retrieves best localized gloss for a lexical link.
        // Filters braces and their contents from gloss strings."
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "theos",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act: Call GetGloss (thin wrapper)
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Returns the gloss from the dictionary entry
        Assert.That(result.Success, Is.True, "EXT-038: Thin wrapper should succeed");
        Assert.That(
            result.Gloss,
            Is.EqualTo("God, god"),
            "EXT-038: Should return the gloss from the dictionary entry"
        );
        Assert.That(result.LanguageId, Is.EqualTo("en"));
    }

    /// <summary>
    /// EXT-038: GetGloss uses corrected language code (VAL-008: "sp" -> "es").
    /// Same language correction as GetDictionaryEntry since it delegates to it.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-038")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("EXT-038: GetGloss applies language code correction (sp -> es)")]
    public async Task GetGloss_SpanishCodeSp_CorrectedToEs()
    {
        // Arrange: Use legacy Spanish code "sp"
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "sp",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: Per VAL-008 - 'sp' should be corrected to 'es'
        Assert.That(result.Success, Is.True, "Lookup with legacy 'sp' code should succeed");
        Assert.That(
            result.LanguageId,
            Is.Not.EqualTo("sp"),
            "Legacy 'sp' code should not appear in result"
        );
    }

    /// <summary>
    /// EXT-038: GetGloss resolves LN alias to SDBG (VAL-009).
    /// Same alias resolution as GetDictionaryEntry since it delegates to it.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-038")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Description("EXT-038: GetGloss resolves LN dictionary alias to SDBG")]
    public async Task GetGloss_LnAlias_ResolvesToSdbg()
    {
        // Arrange: Use "LN" as dictionary name (alias for SDBG per VAL-009)
        var input = new DictionaryLookupInput(
            Dictionary: "LN",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetGlossAsync(input, CancellationToken.None);

        // Assert: LN should resolve successfully
        Assert.That(result.Success, Is.True, "VAL-009: LN alias should resolve to SDBG");
        Assert.That(result.Gloss, Is.Not.Null.And.Not.Empty);
    }
}
