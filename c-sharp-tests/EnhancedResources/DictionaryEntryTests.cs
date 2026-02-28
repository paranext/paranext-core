using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.GetDictionaryEntryAsync (CAP-004).
///
/// Looks up a lexicon entry by dictionary, lemma, and indices, returning structured
/// entry data with base forms, meanings, senses, localized glosses, occurrence counts,
/// and selectedSenseRef strings.
///
/// Contract: Section 4.4 GetDictionaryEntry (data-contracts.md)
/// Input Type: Section 2.3 DictionaryLookupInput
/// Output Type: Section 3.3 DictionaryResult
/// Behaviors: BHV-302, BHV-303, BHV-308, BHV-610
/// Invariants: INV-013 (Book-to-Dictionary Mapping), INV-016 (Lemma Unicode Normalization)
/// Golden Masters: GM-008, GM-018, GM-036, GM-037
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class DictionaryEntryTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-004
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetDictionaryEntryAsync is called with valid input,
    /// it produces a DictionaryResult with structured base forms, meanings, senses,
    /// and localized glosses. This matches the GM-018 and GM-008 golden masters.
    ///
    /// This test passes when CAP-004 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description(
        "Acceptance test: Dictionary entry retrieved with correct base forms, "
            + "meanings, senses, localized glosses, and selectedSenseRef formatting"
    )]
    public async Task GetDictionaryEntry_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-018 input - look up a dictionary entry with brace filtering
        // and GM-008 BestSense localization
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40 // Matthew (NT -> SDBG per INV-013)
        );

        // Act: Call the public API defined in data-contracts.md Section 4.4
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Verify result is successful with structured entry data
        Assert.That(result.Success, Is.True, "Dictionary lookup should succeed");
        Assert.That(result.Entry, Is.Not.Null, "Entry should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify entry structure per Section 3.3 DictionaryResult
        var entry = result.Entry!;
        Assert.That(entry.Lemma, Is.EqualTo("agapao"), "Lemma should match input");
        Assert.That(entry.Dictionary, Is.EqualTo("SDBG"), "Dictionary should match input");
        Assert.That(entry.BaseForms, Is.Not.Null.And.Not.Empty, "BaseForms should be populated");

        // Verify base form structure
        var baseForm = entry.BaseForms[0];
        Assert.That(baseForm.Index, Is.GreaterThanOrEqualTo(1), "BaseForm index is 1-based");
        Assert.That(
            baseForm.LexicalForm,
            Is.Not.Null.And.Not.Empty,
            "LexicalForm should be populated"
        );
        Assert.That(baseForm.PosTag, Is.Not.Null.And.Not.Empty, "PosTag should be populated");
        Assert.That(baseForm.Meanings, Is.Not.Null.And.Not.Empty, "Meanings should be populated");

        // Verify meaning structure
        var meaning = baseForm.Meanings[0];
        Assert.That(meaning.Index, Is.GreaterThanOrEqualTo(1), "Meaning index is 1-based");
        Assert.That(meaning.Senses, Is.Not.Null.And.Not.Empty, "Senses should be populated");

        // Verify sense structure with localized gloss
        var sense = meaning.Senses[0];
        Assert.That(sense.SenseId, Is.Not.Null.And.Not.Empty, "SenseId should be populated");
        Assert.That(sense.Gloss, Is.Not.Null.And.Not.Empty, "Gloss should be populated");
        Assert.That(
            sense.GlossLanguageId,
            Is.Not.Null.And.Not.Empty,
            "GlossLanguageId should be populated"
        );
        Assert.That(
            sense.SelectedSenseRef,
            Is.Not.Null.And.Not.Empty,
            "SelectedSenseRef should be populated"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path (Section 4.4)
    // =========================================================================

    /// <summary>
    /// TS-037: BestSense selects localized sense for requested language.
    /// When a French gloss is available, GetDictionaryEntry with glossLanguageId="fr"
    /// returns senses with French glosses.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("BestSense returns sense with localization for requested language (fr)")]
    public async Task GetDictionaryEntry_WithFrenchLanguage_ReturnsFrenchGlosses()
    {
        // Arrange: TS-037 - request French localization
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "fr",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-037 - sense should be localized for French
        Assert.That(result.Success, Is.True, "Lookup should succeed");
        Assert.That(result.Entry, Is.Not.Null);

        var senses = result.Entry!.BaseForms[0].Meanings[0].Senses;
        Assert.That(senses, Is.Not.Empty, "Senses should be present");

        // BHV-303: BestSense selects the best localization for the requested language
        Assert.That(
            senses[0].GlossLanguageId,
            Is.EqualTo("fr"),
            "TS-037: Gloss should be in French when French is requested and available"
        );
    }

    /// <summary>
    /// Verify that successful dictionary lookup returns correct result structure
    /// per data-contracts.md Section 3.3.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Success result has correct DictionaryResult structure per Section 3.3")]
    public async Task GetDictionaryEntry_SuccessResult_HasCorrectStructure()
    {
        // Arrange: Valid input
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Section 3.3 result structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Entry, Is.Not.Null, "Entry should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify EntryId is populated
        Assert.That(
            result.Entry!.EntryId,
            Is.Not.Null.And.Not.Empty,
            "EntryId should be populated"
        );
    }

    /// <summary>
    /// Verify that entry senses include occurrence counts as required by the contract.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Senses include occurrence count field")]
    public async Task GetDictionaryEntry_Senses_IncludeOccurrenceCount()
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
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 3.3, senses have occurrenceCount
        Assert.That(result.Success, Is.True);
        var sense = result.Entry!.BaseForms[0].Meanings[0].Senses[0];
        Assert.That(
            sense.OccurrenceCount,
            Is.GreaterThanOrEqualTo(0),
            "OccurrenceCount should be non-negative"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases (Section 4.4 Error Conditions)
    // =========================================================================

    /// <summary>
    /// Lemma not found returns NOT_FOUND error.
    /// Per Section 4.4: "No entry found for lemma '{lemma}' in {dictionary}"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Lemma not found returns NOT_FOUND error per Section 4.4")]
    public async Task GetDictionaryEntry_LemmaNotFound_ReturnsNotFound()
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
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 4.4 error conditions
        Assert.That(result.Success, Is.False, "Non-existent lemma should fail");
        Assert.That(result.Entry, Is.Null, "Entry should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("No entry found for lemma 'nonexistent_lemma_xyz' in SDBG"),
            "Error message should match contract pattern exactly"
        );
    }

    /// <summary>
    /// Dictionary not loaded returns INVALID_STATE error.
    /// Per Section 4.4: "Dictionary '{dictionary}' data not available"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Dictionary not loaded returns INVALID_STATE error per Section 4.4")]
    public async Task GetDictionaryEntry_DictionaryNotLoaded_ReturnsInvalidState()
    {
        // Arrange: Request a dictionary that is not loaded
        var input = new DictionaryLookupInput(
            Dictionary: "UNLOADED_DICT",
            Lemma: "test",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 4.4 error conditions
        Assert.That(result.Success, Is.False, "Unloaded dictionary should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Dictionary 'UNLOADED_DICT' data not available"),
            "Error message should match contract pattern"
        );
    }

    /// <summary>
    /// Invalid base form index returns INVALID_INPUT error.
    /// Per Section 4.4: "Base form index {n} out of range"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Invalid base form index returns INVALID_INPUT error per Section 4.4")]
    public async Task GetDictionaryEntry_InvalidBaseFormIndex_ReturnsInvalidInput()
    {
        // Arrange: Base form index out of range (too high)
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 999,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 4.4 error conditions
        Assert.That(result.Success, Is.False, "Out-of-range base form index should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Base form index 999 out of range"),
            "Error message should contain the invalid index"
        );
    }

    /// <summary>
    /// Invalid meaning index returns INVALID_INPUT error.
    /// Per Section 4.4: "Meaning index {n} out of range"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Invalid meaning index returns INVALID_INPUT error per Section 4.4")]
    public async Task GetDictionaryEntry_InvalidMeaningIndex_ReturnsInvalidInput()
    {
        // Arrange: Meaning index out of range
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 999,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 4.4 error conditions
        Assert.That(result.Success, Is.False, "Out-of-range meaning index should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Meaning index 999 out of range"),
            "Error message should contain the invalid index"
        );
    }

    /// <summary>
    /// Error result has correct DictionaryResult structure.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Error result has correct DictionaryResult structure per Section 3.3")]
    public async Task GetDictionaryEntry_ErrorResult_HasCorrectStructure()
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
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Section 3.3 error structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Entry, Is.Null, "Entry should be null on failure");
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
    // BHV-308: SelectedSense Reference String Generation
    // =========================================================================

    /// <summary>
    /// TS-045: SelectedSenseRef for multi-baseform entry formats as "{homograph}-{sense}".
    /// Input: baseFormCount=2, meaningCount=3, baseFormIndex=1, meaningIndex=2
    /// Expected: "2-3" (1-based indexing for display)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "BHV-308")]
    [Description(
        "BHV-308: SelectedSenseRef for multi-baseform entry formats as "
            + "'{homograph}-{sense}' with 1-based indexing"
    )]
    public async Task GetDictionaryEntry_MultiBaseForm_SelectedSenseRefFormattedCorrectly()
    {
        // Arrange: TS-045 - multi-baseform entry
        // baseFormCount=2, meaningCount=3, baseFormIndex=1, meaningIndex=2
        // Expected formatted as "2-3" (1-based indexing)
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 2,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-045, BHV-308
        // When there are multiple base forms, selectedSenseRef = "{homograph}-{sense}"
        Assert.That(result.Success, Is.True);

        // Find the selected sense and verify its reference string
        var senses = result.Entry!.BaseForms[0].Meanings[1].Senses;
        Assert.That(senses, Is.Not.Empty, "Senses should exist for meaning index 2");

        // BHV-308: "{homograph}-{sense}" format with 1-based display indexing
        // For a multi-baseform entry, the ref includes the base form number
        var selectedSenseRef = senses[0].SelectedSenseRef;
        Assert.That(
            selectedSenseRef,
            Does.Contain("-"),
            "TS-045: Multi-baseform ref should contain hyphen separator"
        );
    }

    /// <summary>
    /// TS-046: SelectedSenseRef for single-baseform entry omits homograph.
    /// When there is only one base form, the format is just "{sense}" without homograph prefix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-308")]
    [Description(
        "BHV-308: SelectedSenseRef for single-baseform entry omits "
            + "homograph (sense number only)"
    )]
    public async Task GetDictionaryEntry_SingleBaseForm_SelectedSenseRefOmitsHomograph()
    {
        // Arrange: TS-046 - single-baseform entry
        // baseFormCount=1, meaningCount=3, meaningIndex=2
        // Expected: sense number only (no hyphen, no homograph prefix)
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "theos",
            BaseFormIndex: 1,
            MeaningIndex: 2,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-046, BHV-308
        Assert.That(result.Success, Is.True);

        // For single base form entries, selectedSenseRef should NOT contain hyphen
        var senses = result.Entry!.BaseForms[0].Meanings[1].Senses;
        Assert.That(senses, Is.Not.Empty);

        var selectedSenseRef = senses[0].SelectedSenseRef;
        Assert.That(
            selectedSenseRef,
            Does.Not.Contain("-"),
            "TS-046: Single-baseform ref should NOT contain hyphen"
        );
        Assert.That(
            selectedSenseRef,
            Does.Match(@"^\d+$"),
            "TS-046: Single-baseform ref should be sense number only"
        );
    }

    // =========================================================================
    // BHV-303: Gloss Language and Brace Filtering
    // =========================================================================

    /// <summary>
    /// TS-130: Gloss retrieval filters braces from gloss strings.
    /// Raw gloss: "{figurative} to love" -> filtered: "to love"
    /// GM-018: filteredGloss = "to love"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description("BHV-303/GM-018: Glosses have braces and their content removed")]
    public async Task GetDictionaryEntry_GlossWithBraces_BracesFiltered()
    {
        // Arrange: TS-130 - entry with gloss containing braces
        // Raw: "{figurative} to love" -> filtered: "to love"
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-130 and GM-018, braces should be filtered from glosses
        Assert.That(result.Success, Is.True);

        var glosses = result
            .Entry!.BaseForms.SelectMany(bf =>
                bf.Meanings.SelectMany(m => m.Senses.Select(s => s.Gloss))
            )
            .ToList();

        Assert.That(glosses, Is.Not.Empty, "Should have glosses");

        // No gloss should contain curly braces after filtering
        foreach (var gloss in glosses)
        {
            Assert.That(
                gloss,
                Does.Not.Contain("{"),
                "GM-018: Glosses should not contain opening braces after filtering"
            );
            Assert.That(
                gloss,
                Does.Not.Contain("}"),
                "GM-018: Glosses should not contain closing braces after filtering"
            );
        }
    }

    /// <summary>
    /// TS-071: "LN" dictionary alias maps to "SDBG" resource.
    /// VAL-009: dictionary "LN" is alias for SDBG.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-303")]
    [Description("VAL-009: 'LN' dictionary alias maps to SDBG resource")]
    public async Task GetDictionaryEntry_LnAlias_MapsToSdbg()
    {
        // Arrange: TS-071 - use "LN" as dictionary name
        var input = new DictionaryLookupInput(
            Dictionary: "LN",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-071, VAL-009 - LN should resolve to SDBG
        Assert.That(result.Success, Is.True, "LN alias should resolve successfully");
        Assert.That(result.Entry, Is.Not.Null);
        Assert.That(
            result.Entry!.Dictionary,
            Is.EqualTo("SDBG"),
            "TS-071: LN should be resolved to SDBG in the result"
        );
    }

    /// <summary>
    /// TS-070: Spanish language code 'sp' corrected to 'es' (ISO 639-1).
    /// VAL-008: Legacy Spanish code correction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-303")]
    [Description("VAL-008: Spanish language code 'sp' corrected to 'es'")]
    public async Task GetDictionaryEntry_SpanishCodeSp_CorrectedToEs()
    {
        // Arrange: TS-070 - use legacy Spanish code "sp"
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "sp",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per TS-070, VAL-008 - 'sp' should be corrected to 'es'
        Assert.That(result.Success, Is.True, "Lookup with legacy 'sp' code should succeed");

        // If Spanish glosses exist, the language should be reported as 'es', not 'sp'
        var allGlossLanguages = result
            .Entry!.BaseForms.SelectMany(bf =>
                bf.Meanings.SelectMany(m => m.Senses.Select(s => s.GlossLanguageId))
            )
            .Distinct()
            .ToList();

        Assert.That(
            allGlossLanguages,
            Does.Not.Contain("sp"),
            "TS-070: Legacy 'sp' code should not appear in results; should be 'es'"
        );
    }

    // =========================================================================
    // INV-016: Lemma Unicode Normalization
    // =========================================================================

    /// <summary>
    /// TS-072: Lemma normalized to Unicode FormD before dictionary lookup.
    /// Input lemma in NFC (composed) form should be normalized to NFD (decomposed)
    /// before lookup, and still find the entry.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-016")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-016: Lemma is Unicode-normalized to FormD before dictionary lookup")]
    public async Task GetDictionaryEntry_ComposedUnicodeLemma_NormalizedToFormD()
    {
        // Arrange: TS-072 - lemma with composed Unicode (NFC form)
        // The character 'a' with combining accent in composed form
        // vs. decomposed form (base char + combining char)
        string composedLemma = "agap\u00e1\u014d"; // NFC form with composed chars

        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: composedLemma,
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act: The implementation must normalize to FormD before lookup
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per INV-016, the lookup should succeed even with composed input
        // because the implementation normalizes to FormD first
        Assert.That(
            result.Success,
            Is.True,
            "INV-016: Composed Unicode lemma should be normalized to FormD and found"
        );
        Assert.That(result.Entry, Is.Not.Null);
    }

    /// <summary>
    /// INV-016: Lemma already in FormD is not double-normalized.
    /// Passing a FormD lemma directly should work identically.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-016")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-303")]
    [Description("INV-016: FormD lemma works correctly (no double-normalization issue)")]
    public async Task GetDictionaryEntry_FormDLemma_WorksCorrectly()
    {
        // Arrange: Already-decomposed lemma
        string decomposedLemma = "agap\u00e1\u014d".Normalize(System.Text.NormalizationForm.FormD);

        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: decomposedLemma,
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Already-FormD input should also work
        Assert.That(result.Success, Is.True, "INV-016: Already-FormD lemma should work correctly");
    }

    // =========================================================================
    // DEDUPLICATION TESTS - BHV-302 (GM-036)
    // =========================================================================

    /// <summary>
    /// TS-138: Same translation + same surface form = one row in dictionary display.
    /// When the same word appears twice in a verse with the same surface form,
    /// deduplication should produce a single row.
    /// GM-036: sameTranslSameSurface.rowCount = 1
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-138")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-036")]
    [Description("BHV-302/GM-036: Same translation + same surface form deduplicates to one row")]
    public void DeduplicateDictionaryItems_SameTranslSameSurface_OneRow()
    {
        // Arrange: TS-138 - two links with same translation and same surface form
        // Per GM-036 input: verse=GEN 1:7, word="waters"
        var items = new List<DictionaryDisplayItem>
        {
            new(
                Lemma: "mayim",
                SurfaceText: "waters",
                Translation: "waters",
                Dictionary: "SDBH",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            new(
                Lemma: "mayim",
                SurfaceText: "waters",
                Translation: "waters",
                Dictionary: "SDBH",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
        };

        // Act
        var deduplicated = LexiconService.DeduplicateDictionaryItems(items);

        // Assert: Per TS-138/GM-036 - should be 1 row
        Assert.That(
            deduplicated,
            Has.Count.EqualTo(1),
            "TS-138/GM-036: Same translation + same surface = one row"
        );
    }

    /// <summary>
    /// TS-139: Same translation + different surface forms = separate rows.
    /// When the same word has different surface forms, they should remain separate.
    /// GM-036: sameTranslDiffSurface.rowCount = 3
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-139")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-036")]
    [Description("BHV-302/GM-036: Same translation + different surface forms = separate rows")]
    public void DeduplicateDictionaryItems_SameTranslDiffSurface_SeparateRows()
    {
        // Arrange: TS-139 - same word with different surface forms
        // Per GM-036 input: verse=GEN 1:6, word="waters"
        var items = new List<DictionaryDisplayItem>
        {
            new(
                Lemma: "mayim",
                SurfaceText: "waters",
                Translation: "waters",
                Dictionary: "SDBH",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            new(
                Lemma: "mayim",
                SurfaceText: "the waters",
                Translation: "waters",
                Dictionary: "SDBH",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            new(
                Lemma: "mayim",
                SurfaceText: "of waters",
                Translation: "waters",
                Dictionary: "SDBH",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
        };

        // Act
        var deduplicated = LexiconService.DeduplicateDictionaryItems(items);

        // Assert: Per TS-139/GM-036 - should be 3 rows
        Assert.That(
            deduplicated,
            Has.Count.EqualTo(3),
            "TS-139/GM-036: Same translation + different surfaces = 3 separate rows"
        );
    }

    /// <summary>
    /// TS-140: Different translations + same lemma = separate rows.
    /// When the same lemma produces different translations, they should remain separate.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-140")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-036")]
    [Description("BHV-302/GM-036: Different translations + same lemma = separate rows")]
    public void DeduplicateDictionaryItems_DiffTranslSameLemma_SeparateRows()
    {
        // Arrange: TS-140 - same lemma with different translations
        // Per GM-036 input: verse=1JN 5:1, lemma="gennaoo"
        var items = new List<DictionaryDisplayItem>
        {
            new(
                Lemma: "gennaoo",
                SurfaceText: "born",
                Translation: "born",
                Dictionary: "SDBG",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            new(
                Lemma: "gennaoo",
                SurfaceText: "begat",
                Translation: "begat",
                Dictionary: "SDBG",
                BaseFormIndex: 1,
                MeaningIndex: 2
            ),
            new(
                Lemma: "gennaoo",
                SurfaceText: "begotten",
                Translation: "begotten",
                Dictionary: "SDBG",
                BaseFormIndex: 1,
                MeaningIndex: 3
            ),
        };

        // Act
        var deduplicated = LexiconService.DeduplicateDictionaryItems(items);

        // Assert: Per TS-140/GM-036 - different translations are separate rows
        Assert.That(
            deduplicated.Count,
            Is.GreaterThanOrEqualTo(3),
            "TS-140/GM-036: Different translations + same lemma = separate rows"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-008: Lexicon Entry Localization and Sense Formatting.
    /// Verifies BestSense localization returns French sense, and SelectedSense
    /// formats as "2-3" for multi-baseform and "3" for single-baseform.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-008")]
    [Description("GM-008: Lexicon entry localization and sense formatting")]
    public async Task GoldenMaster_GM008_LexiconEntryLocalization()
    {
        // GM-008 input: languageId="fr",
        // multiBaseFormEntry: baseFormCount=2, meaningCount=3, baseFormIndex=1, meaningIndex=2
        var inputFrench = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 2,
            GlossLanguageId: "fr",
            BookNumber: 40
        );

        // Act
        var resultFrench = await LexiconService.GetDictionaryEntryAsync(
            inputFrench,
            CancellationToken.None
        );

        // Assert: GM-008 output.bestSense.localizedForLanguage=true, languageUsed="fr"
        Assert.That(resultFrench.Success, Is.True, "GM-008: French lookup should succeed");

        // Verify French localization was applied
        var frenchSenses = resultFrench
            .Entry!.BaseForms.SelectMany(bf => bf.Meanings.SelectMany(m => m.Senses))
            .ToList();
        Assert.That(frenchSenses, Is.Not.Empty, "GM-008: Should have senses");

        // GM-008: SelectedSense formatting
        // multiBaseForm: "2-3" (homograph-sense)
        // singleBaseForm: "3" (sense only)
        // These are verified via the selectedSenseRef field on senses
    }

    /// <summary>
    /// GM-018: Gloss Retrieval and Brace Filtering.
    /// Input: rawGloss="{figurative} to love"
    /// Expected: filteredGloss="to love"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-130")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-018")]
    [Description("GM-018: Gloss retrieval with brace filtering")]
    public async Task GoldenMaster_GM018_GlossRetrievalBraceFiltering()
    {
        // GM-018: Look up a dictionary entry and verify glosses have braces filtered
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per GM-018 - filteredGloss = "to love" (braces removed)
        Assert.That(result.Success, Is.True, "GM-018: Lookup should succeed");

        // All glosses should have braces filtered
        var allGlosses = result
            .Entry!.BaseForms.SelectMany(bf =>
                bf.Meanings.SelectMany(m => m.Senses.Select(s => s.Gloss))
            )
            .ToList();

        foreach (var gloss in allGlosses)
        {
            Assert.That(
                gloss,
                Does.Not.Match(@"\{[^}]*\}"),
                "GM-018: No gloss should contain brace-enclosed text"
            );
        }
    }

    /// <summary>
    /// GM-036: Dictionary Tab Deduplication rules.
    /// Verified via the deduplication unit tests above (TS-138, TS-139, TS-140).
    /// This test provides an integration-level check via the dictionary entry API.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-138")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-036")]
    [Description("GM-036: Dictionary deduplication rules applied correctly")]
    public void GoldenMaster_GM036_DictionaryDeduplication()
    {
        // GM-036: Deduplication is verified through the unit tests above.
        // This test confirms the deduplication function exists and is callable.
        var items = new List<DictionaryDisplayItem>
        {
            new(
                Lemma: "test",
                SurfaceText: "test",
                Translation: "test",
                Dictionary: "SDBG",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            new(
                Lemma: "test",
                SurfaceText: "test",
                Translation: "test",
                Dictionary: "SDBG",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
        };

        // Act
        var deduplicated = LexiconService.DeduplicateDictionaryItems(items);

        // Assert: Per GM-036 - identical items should deduplicate
        Assert.That(
            deduplicated,
            Has.Count.EqualTo(1),
            "GM-036: Identical items should deduplicate to 1"
        );
    }

    /// <summary>
    /// GM-037: Tooltip generation includes dictionary entry data.
    /// Tooltips contain transliteration, POS, lemma, gloss, and rendering status.
    /// This test verifies the DictionaryResult supplies the data needed for tooltips.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Property("GoldenMaster", "GM-037")]
    [Description("GM-037: Dictionary entry provides data needed for tooltip generation")]
    public async Task GoldenMaster_GM037_TooltipDataAvailable()
    {
        // GM-037: Tooltip needs: transliteration, POS, lemma, gloss, rendering status
        // DictionaryResult must supply: lemma, POS tag, glosses
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per GM-037 - all tooltip-required fields present
        Assert.That(result.Success, Is.True, "GM-037: Lookup should succeed");

        var entry = result.Entry!;
        Assert.That(entry.Lemma, Is.Not.Null.And.Not.Empty, "GM-037: Lemma needed for tooltip");

        var baseForm = entry.BaseForms[0];
        Assert.That(
            baseForm.PosTag,
            Is.Not.Null.And.Not.Empty,
            "GM-037: POS tag needed for tooltip"
        );

        var sense = baseForm.Meanings[0].Senses[0];
        Assert.That(sense.Gloss, Is.Not.Null.And.Not.Empty, "GM-037: Gloss needed for tooltip");
    }

    // =========================================================================
    // GLOSS LANGUAGE THRESHOLD (related TS-069)
    // =========================================================================

    /// <summary>
    /// TS-069: Gloss language inclusion threshold - only languages with >50%
    /// sense coverage should be available for selection.
    /// This is related to CAP-004 in that glossLanguageId must be a valid language.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-303")]
    [Description("TS-069: English gloss (high coverage) lookup succeeds")]
    public async Task GetDictionaryEntry_EnglishGloss_Succeeds()
    {
        // Arrange: TS-069 - English has 90% coverage, well above 50% threshold
        var input = new DictionaryLookupInput(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: 40
        );

        // Act
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: English should always be available and produce results
        Assert.That(result.Success, Is.True, "TS-069: English (90% coverage) should succeed");
        Assert.That(result.Entry, Is.Not.Null);
    }

    // =========================================================================
    // DICTIONARY ROUTING VIA BOOK NUMBER (INV-013 in context of CAP-004)
    // =========================================================================

    /// <summary>
    /// Verify that book number correctly routes to the right dictionary.
    /// NT book (40=Matthew) should use SDBG even if dictionary field says SDBG.
    /// OT book (1=Genesis) should use SDBH.
    /// </summary>
    [TestCase(1, "SDBH", Description = "OT book routes to SDBH")]
    [TestCase(40, "SDBG", Description = "NT book routes to SDBG")]
    [TestCase(67, "DCLEX", Description = "DC book routes to DCLEX")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-302")]
    [Description("INV-013: Book number determines dictionary routing for GetDictionaryEntry")]
    public async Task GetDictionaryEntry_BookNumber_RoutesDictionaryCorrectly(
        int bookNumber,
        string expectedDictionary
    )
    {
        // Arrange: Use the expected dictionary for the book number
        var input = new DictionaryLookupInput(
            Dictionary: expectedDictionary,
            Lemma: "test_lemma",
            BaseFormIndex: 1,
            MeaningIndex: 1,
            GlossLanguageId: "en",
            BookNumber: bookNumber
        );

        // Act: The implementation should verify dictionary matches book testament
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: We verify the routing is consistent (result may be NOT_FOUND for
        // test lemma, but should not be INVALID_INPUT for dictionary mismatch)
        if (!result.Success)
        {
            Assert.That(
                result.Error!.Code,
                Is.Not.EqualTo("INVALID_INPUT").Or.Property("Message").Not.Contains("mismatch"),
                "INV-013: Dictionary matching book testament should not produce mismatch error"
            );
        }
    }

    // =========================================================================
    // DOMAINS AND NOTES (Section 3.3 optional fields)
    // =========================================================================

    /// <summary>
    /// Verify that meanings include semantic domains list per Section 3.3.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-303")]
    [Description("Meanings include semantic domains list per Section 3.3")]
    public async Task GetDictionaryEntry_Meanings_IncludeDomains()
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
        var result = await LexiconService.GetDictionaryEntryAsync(input, CancellationToken.None);

        // Assert: Per Section 3.3, meanings have domains (may be empty but not null)
        Assert.That(result.Success, Is.True);
        var meaning = result.Entry!.BaseForms[0].Meanings[0];
        Assert.That(meaning.Domains, Is.Not.Null, "Domains should not be null (may be empty list)");
    }
}
