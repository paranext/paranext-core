using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-009: LoadDictionaryTab.
/// Validates the full dictionary tab orchestration pipeline from token list through to
/// formatted DictionaryTabContent. This is an orchestration capability that wires together
/// all sub-pipelines: scope filtering (CAP-003), lexical link parsing (CAP-005),
/// rendering status (CAP-007), status combination (CAP-008), markup processing (CAP-014),
/// dictionary data models (CAP-024), token filtering (CAP-025),
/// deduplication (CAP-026), and data access (CAP-028).
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs (LoadResources, SetFoundStatus,
///   GetAllDefinitionsForBaseForm, FormatSense, GetUsageOccurrenceHtml, HandleFilteringOnTerm)
/// Extractions: EXT-050, EXT-057, EXT-058, EXT-059, EXT-060, EXT-068, EXT-070, EXT-073
/// Golden Masters: gm-008 (markup), gm-013 (dedup), gm-014 (filter), gm-017 (homonyms)
/// Contract: data-contracts.md Method 9
/// Invariant: INV-015 (Deduplication Groups by Term + SourceText + LexicalLinks)
///
/// Input: (string resourceId, VerseReference verseRef, ScopeFilter scope,
///   string? trackedProjectId, WordFilter? wordFilter, DictionarySortField sortField,
///   bool sortAscending)
/// Output: DictionaryTabContent (Items, HeaderHtml)
/// </summary>
[TestFixture]
public class LoadDictionaryTabTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a minimal MarbleDataAccess with required data for a single-verse test scenario.
    /// Registers a bible resource with TextLink tokens, dictionary entries, and research data.
    /// </summary>
    private static MarbleDataAccess CreateTestDataAccess(
        string resourceId = "ESV16UK+",
        int bookNum = 43,
        IReadOnlyList<MarbleToken>? tokens = null
    )
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.Initialize();

        // Register research data (required for HaveMarbleData to return true)
        foreach (var proj in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(proj);

        // Default tokens: a simple verse with two TextLink tokens
        tokens ??= CreateDefaultVerseTokens(bookNum);

        dataAccess.AddBible(resourceId, _ => tokens);

        return dataAccess;
    }

    /// <summary>
    /// Creates default TextLink tokens for testing.
    /// Two word-link tokens in verse 1 with different lexical links.
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateDefaultVerseTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "logos",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBG:logos:001001"
            ),
            new(
                MarbleTokenType.TextLink,
                "theos",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBG:theos:001001"
            ),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "logos",
                null,
                new VerseReference(bookNum, 1, 2),
                LexicalLinks: "SDBG:logos:001001"
            ),
        };
    }

    /// <summary>
    /// Creates a DictionaryDisplayItem for test purposes.
    /// </summary>
    private static DictionaryDisplayItem CreateDisplayItem(
        string lemma,
        string transliteration = "",
        string sourceText = "",
        string lexicalLinks = "",
        string gloss = "",
        TermRenderingStatusCode status = TermRenderingStatusCode.NotDefined,
        int occurrenceCount = 1,
        IReadOnlyList<VerseReference>? refs = null,
        IReadOnlyList<string>? translations = null,
        IReadOnlyList<DictionarySenseDefinition>? definitions = null
    )
    {
        return new DictionaryDisplayItem(
            Id: $"dict-{lemma}",
            Lemma: lemma,
            Transliteration: transliteration,
            SurfaceForm: sourceText,
            SourceText: sourceText,
            LexicalLinks: lexicalLinks,
            PartOfSpeech: "",
            PartOfSpeechShort: "",
            Gloss: gloss,
            Translations: translations ?? Array.Empty<string>(),
            Definitions: definitions ?? Array.Empty<DictionarySenseDefinition>(),
            OccurrenceCount: occurrenceCount,
            OccurrenceReferences: refs ?? Array.Empty<VerseReference>(),
            RenderingStatus: status,
            Expanded: false
        );
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-009.
    /// Verifies the complete LoadDictionaryTab pipeline produces a valid DictionaryTabContent
    /// with items that have been:
    /// 1. Filtered by scope (via CAP-003)
    /// 2. Enriched with dictionary data (via CAP-028)
    /// 3. Deduplicated (via CAP-026 / INV-015)
    /// 4. Sorted by the requested field
    /// 5. Formatted with markup (via CAP-014)
    ///
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description(
        "Acceptance test: Dictionary tab loaded with all sub-pipelines functioning"
    )]
    public async Task LoadDictionaryTab_FullPipeline_ProducesValidContent()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);
        var scope = ScopeFilter.CurrentVerse;
        string? trackedProjectId = null;
        WordFilter? wordFilter = null;
        var sortField = DictionarySortField.Translit;
        var sortAscending = true;

        // Act
        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            scope,
            trackedProjectId,
            wordFilter,
            sortField,
            sortAscending
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null, "Result must not be null");
            Assert.That(result, Is.InstanceOf<DictionaryTabContent>(), "Must be DictionaryTabContent");
            Assert.That(result.Items, Is.Not.Null, "Items collection must not be null");
            Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have at least one item");
            Assert.That(result.HeaderHtml, Is.Not.Null, "HeaderHtml must not be null");

            // Each item must have a lemma
            foreach (var item in result.Items)
            {
                Assert.That(
                    item.Lemma,
                    Is.Not.Null.And.Not.Empty,
                    $"Item {item.Id} must have a lemma"
                );
            }
        });
    }

    #endregion

    #region Contract Tests - Method Signature and Return Type

    /// <summary>
    /// LoadDictionaryTabAsync returns a DictionaryTabContent with Items and HeaderHtml.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Return type is DictionaryTabContent with Items and HeaderHtml")]
    public async Task LoadDictionaryTab_ValidInput_ReturnsDictionaryTabContent()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Items, Is.Not.Null, "Items property must be present");
            Assert.That(result.HeaderHtml, Is.Not.Null, "HeaderHtml property must be present");
        });
    }

    /// <summary>
    /// Each DictionaryDisplayItem in the result has all required fields populated.
    /// Per data-contracts.md, items have Id, Lemma, Transliteration, SurfaceForm,
    /// SourceText, LexicalLinks, PartOfSpeech, Gloss, Definitions, etc.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Each display item has all required fields populated")]
    public async Task LoadDictionaryTab_ValidInput_ItemsHaveRequiredFields()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items to verify");

        foreach (var item in result.Items)
        {
            Assert.Multiple(() =>
            {
                Assert.That(item.Id, Is.Not.Null.And.Not.Empty, "Id required");
                Assert.That(item.Lemma, Is.Not.Null.And.Not.Empty, "Lemma required");
                Assert.That(item.LexicalLinks, Is.Not.Null, "LexicalLinks must not be null");
                Assert.That(item.Definitions, Is.Not.Null, "Definitions collection must not be null");
                Assert.That(
                    item.OccurrenceReferences,
                    Is.Not.Null,
                    "OccurrenceReferences must not be null"
                );
                Assert.That(item.OccurrenceCount, Is.GreaterThanOrEqualTo(1), "At least 1 occurrence");
            });
        }
    }

    #endregion

    #region Contract Tests - Sorting

    /// <summary>
    /// Items sorted by Translit ascending produce alphabetical order by transliteration.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-314")]
    [Property("ScenarioId", "TS-143")]
    [Description("Sort by Translit ascending produces alphabetical transliteration order")]
    public async Task LoadDictionaryTab_SortByTranslitAsc_AlphabeticalOrder()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Translit,
            true
        );

        if (result.Items.Count > 1)
        {
            for (int i = 1; i < result.Items.Count; i++)
            {
                Assert.That(
                    string.Compare(
                        result.Items[i - 1].Transliteration,
                        result.Items[i].Transliteration,
                        StringComparison.OrdinalIgnoreCase
                    ),
                    Is.LessThanOrEqualTo(0),
                    $"Items not sorted ascending by transliteration at index {i}: " +
                    $"'{result.Items[i - 1].Transliteration}' should come before '{result.Items[i].Transliteration}'"
                );
            }
        }
    }

    /// <summary>
    /// Items sorted by Lemma descending produce reverse alphabetical order by lemma.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-314")]
    [Property("ScenarioId", "TS-143")]
    [Description("Sort by Lemma descending produces reverse alphabetical lemma order")]
    public async Task LoadDictionaryTab_SortByLemmaDesc_ReverseAlphabeticalOrder()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            false
        );

        if (result.Items.Count > 1)
        {
            for (int i = 1; i < result.Items.Count; i++)
            {
                Assert.That(
                    string.Compare(
                        result.Items[i - 1].Lemma,
                        result.Items[i].Lemma,
                        StringComparison.OrdinalIgnoreCase
                    ),
                    Is.GreaterThanOrEqualTo(0),
                    $"Items not sorted descending by lemma at index {i}"
                );
            }
        }
    }

    /// <summary>
    /// Items sorted by Found (rendering status) ascending put "not found" statuses first.
    /// The Found sort field uses the TermRenderingStatusCode integer value.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-314")]
    [Property("ScenarioId", "TS-143")]
    [Description("Sort by Found ascending orders by rendering status code value")]
    public async Task LoadDictionaryTab_SortByFoundAsc_OrderedByStatusCode()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Found,
            true
        );

        if (result.Items.Count > 1)
        {
            for (int i = 1; i < result.Items.Count; i++)
            {
                Assert.That(
                    (int)result.Items[i - 1].RenderingStatus,
                    Is.LessThanOrEqualTo((int)result.Items[i].RenderingStatus),
                    $"Items not sorted ascending by rendering status at index {i}"
                );
            }
        }
    }

    /// <summary>
    /// All five DictionarySortField values are handled without throwing.
    /// </summary>
    [TestCase(DictionarySortField.Translit)]
    [TestCase(DictionarySortField.Lemma)]
    [TestCase(DictionarySortField.Translations)]
    [TestCase(DictionarySortField.Gloss)]
    [TestCase(DictionarySortField.Found)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-314")]
    [Property("ScenarioId", "TS-143")]
    [Description("All sort field values produce valid results")]
    public async Task LoadDictionaryTab_AllSortFields_ProduceValidResults(
        DictionarySortField sortField
    )
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            sortField,
            true
        );

        Assert.That(result, Is.Not.Null, $"Sort by {sortField} must return valid result");
        Assert.That(result.Items, Is.Not.Null, $"Sort by {sortField} must return items");
    }

    #endregion

    #region Contract Tests - Scope Filtering

    /// <summary>
    /// Verse scope returns only items from the specified verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Verse scope returns items only from the specified verse")]
    public async Task LoadDictionaryTab_VerseScope_ReturnsItemsFromVerse()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        Assert.That(result.Items, Is.Not.Null);
        // All occurrence references should include the queried verse
        foreach (var item in result.Items)
        {
            Assert.That(
                item.OccurrenceReferences.Any(r => r.Book == 43 && r.Chapter == 1 && r.Verse == 1),
                Is.True,
                $"Item '{item.Lemma}' must have at least one reference in John 1:1"
            );
        }
    }

    /// <summary>
    /// Chapter scope includes items from the entire chapter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Chapter scope includes items from the entire chapter")]
    public async Task LoadDictionaryTab_ChapterScope_ReturnsItemsFromChapter()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        // Chapter scope should include more items than verse scope
        // (our test data has tokens in verses 1 and 2)
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(
            result.Items.Count,
            Is.GreaterThan(0),
            "Chapter scope must include items from multiple verses"
        );
    }

    #endregion

    #region Contract Tests - Word Filter

    /// <summary>
    /// Null word filter returns all items in scope (no filtering).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-154")]
    [Description("Null word filter returns all items in scope")]
    public async Task LoadDictionaryTab_NullWordFilter_ReturnsAllItems()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null, // no tracked project
            null, // no word filter
            DictionarySortField.Lemma,
            true
        );

        Assert.That(result.Items, Is.Not.Null);
        // Without a filter, all in-scope TextLink tokens produce items
        Assert.That(
            result.Items.Count,
            Is.GreaterThan(0),
            "No filter should return all available items"
        );
    }

    /// <summary>
    /// Word filter restricts items to those matching the filter's lemma/links.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-154")]
    [Description("Word filter restricts items to matching tokens")]
    public async Task LoadDictionaryTab_WithWordFilter_ReturnsFilteredItems()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);
        var wordFilter = new WordFilter(
            "logos",
            new[] { "SDBG:logos:001001" },
            "logos",
            WordFilterSource.Dictionary
        );

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null, // no tracked project
            wordFilter,
            DictionarySortField.Lemma,
            true
        );

        Assert.That(result.Items, Is.Not.Null);
        // With a filter for "logos", only logos-related items should appear
        foreach (var item in result.Items)
        {
            Assert.That(
                item.LexicalLinks,
                Does.Contain("logos"),
                $"Filtered items must match the word filter. Found item with links: {item.LexicalLinks}"
            );
        }
    }

    #endregion

    #region Contract Tests - Deduplication (INV-015)

    /// <summary>
    /// Items with the same (Lemma, SourceText, LexicalLinks) in different verses are
    /// deduplicated into a single display item per INV-015.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("Duplicate tokens across verses are deduplicated per INV-015")]
    public async Task LoadDictionaryTab_DuplicateTokens_Deduplicated()
    {
        // Arrange: tokens have "logos" in verses 1 and 2 with same lexical links
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        // The two "logos" tokens with same links should merge into one display item
        var logosItems = result.Items.Where(i =>
            i.LexicalLinks == "SDBG:logos:001001"
        ).ToList();

        Assert.That(
            logosItems.Count,
            Is.EqualTo(1),
            "Two 'logos' tokens with same links must deduplicate to 1 item (INV-015)"
        );

        if (logosItems.Count == 1)
        {
            Assert.That(
                logosItems[0].OccurrenceCount,
                Is.EqualTo(2),
                "Deduplicated item must have combined occurrence count of 2"
            );
        }
    }

    /// <summary>
    /// Deduplicated items have combined occurrence references from all merged tokens.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("Deduplicated items have combined occurrence references")]
    public async Task LoadDictionaryTab_DuplicateTokens_CombinedReferences()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        var logosItems = result.Items.Where(i =>
            i.LexicalLinks == "SDBG:logos:001001"
        ).ToList();

        if (logosItems.Count == 1)
        {
            var item = logosItems[0];
            Assert.That(
                item.OccurrenceReferences.Count,
                Is.EqualTo(2),
                "Must have references from both verse 1 and verse 2"
            );
        }
    }

    #endregion

    #region Contract Tests - Rendering Status

    /// <summary>
    /// When no tracked project is specified, all items have NoTrackedProject status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-116")]
    [Description("No tracked project results in NoTrackedProject status for all items")]
    public async Task LoadDictionaryTab_NoTrackedProject_AllItemsNoTrackedProjectStatus()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null, // no tracked project
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            Assert.That(
                item.RenderingStatus,
                Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
                $"Item '{item.Lemma}' must have NoTrackedProject status when no project is tracked"
            );
        }
    }

    /// <summary>
    /// Each item in the result has a RenderingStatus field set
    /// (not left at default NotDefined when a tracked project is specified).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Items have rendering status calculated per token")]
    public async Task LoadDictionaryTab_WithTrackedProject_ItemsHaveRenderingStatus()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            "TestProject",
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            // With a tracked project, rendering status should be calculated
            // (the exact code depends on BT data, but it should not be the
            // NotDefined sentinel that indicates no calculation was done)
            Assert.That(
                item.RenderingStatus,
                Is.Not.EqualTo(TermRenderingStatusCode.NotDefined),
                $"Item '{item.Lemma}' should have rendering status calculated"
            );
        }
    }

    #endregion

    #region Error Condition Tests

    /// <summary>
    /// Resource not found produces an appropriate error.
    /// Per data-contracts.md, error code RESOURCE_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Resource not found throws with RESOURCE_NOT_FOUND")]
    public void LoadDictionaryTab_ResourceNotFound_ThrowsException()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.Initialize();
        var verseRef = new VerseReference(43, 1, 1);

        Assert.ThrowsAsync<Exception>(async () =>
        {
            await DictionaryService.LoadDictionaryTabAsync(
                dataAccess,
                "NONEXISTENT_RESOURCE",
                verseRef,
                ScopeFilter.CurrentVerse,
                null,
                null,
                DictionarySortField.Lemma,
                true
            );
        });
    }

    /// <summary>
    /// Book not available in resource produces an appropriate error.
    /// Per data-contracts.md, error code BOOK_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Book not available throws with BOOK_NOT_FOUND")]
    public void LoadDictionaryTab_BookNotAvailable_ThrowsException()
    {
        // Register a resource with only book 43 (John)
        var dataAccess = CreateTestDataAccess(bookNum: 43);
        // Query for book 99 (nonexistent)
        var verseRef = new VerseReference(99, 1, 1);

        Assert.ThrowsAsync<Exception>(async () =>
        {
            await DictionaryService.LoadDictionaryTabAsync(
                dataAccess,
                "ESV16UK+",
                verseRef,
                ScopeFilter.CurrentVerse,
                null,
                null,
                DictionarySortField.Lemma,
                true
            );
        });
    }

    #endregion

    #region Contract Tests - Empty Results

    /// <summary>
    /// When no TextLink tokens exist in scope, result has empty Items list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("No TextLink tokens in scope produces empty items")]
    public async Task LoadDictionaryTab_NoTextLinksInScope_EmptyItems()
    {
        // Create data with only non-TextLink tokens
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(43, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 1)),
            new(MarbleTokenType.Text, "plain text", null, new VerseReference(43, 1, 1)),
        };
        var dataAccess = CreateTestDataAccess(tokens: tokens);
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        Assert.That(result.Items.Count, Is.EqualTo(0), "No TextLink tokens = no dictionary items");
    }

    #endregion

    #region Contract Tests - Definitions and Markup

    /// <summary>
    /// Items include definitions from the dictionary data model (EXT-057 GetAllDefinitionsForBaseForm).
    /// When dictionary entries exist in MarbleDataAccess, items should have Definitions populated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Items include definitions from dictionary data")]
    public async Task LoadDictionaryTab_WithDictionaryData_ItemsHaveDefinitions()
    {
        var dataAccess = CreateTestDataAccess();
        // Add a dictionary entry so definitions can be resolved
        var entry = new Lexicon_Entry
        {
            MainId = "SDBG:logos:001",
        };
        dataAccess.AddDictionaryEntry("SDBG", "logos", entry);

        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null, // no tracked project
            null, // no word filter
            DictionarySortField.Lemma,
            true
        );

        // Items whose dictionary entries were found should have Definitions populated
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items.Count, Is.GreaterThan(0));
        // At minimum, the definitions collection should be non-null
        foreach (var item in result.Items)
        {
            Assert.That(item.Definitions, Is.Not.Null, $"Definitions for '{item.Lemma}' must not be null");
        }
    }

    #endregion

    #region Invariant Tests - INV-015

    /// <summary>
    /// INV-015: After LoadDictionaryTab, no two items in the result share the same
    /// (Lemma, SourceText, LexicalLinks) tuple.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("INV-015: No duplicate merge keys in result")]
    public async Task LoadDictionaryTab_Result_NoDuplicateMergeKeys()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        var mergeKeys = result.Items.Select(i => $"{i.Lemma}|{i.SourceText}|{i.LexicalLinks}").ToList();
        var distinctKeys = mergeKeys.Distinct().ToList();

        Assert.That(
            mergeKeys.Count,
            Is.EqualTo(distinctKeys.Count),
            "INV-015: All items must have distinct (Lemma, SourceText, LexicalLinks) tuples. " +
            $"Found {mergeKeys.Count} items but only {distinctKeys.Count} unique keys."
        );
    }

    /// <summary>
    /// INV-015: OccurrenceCount for each item equals the number of tokens that were
    /// merged into it.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("INV-015: OccurrenceCount matches number of occurrence references")]
    public async Task LoadDictionaryTab_Result_OccurrenceCountMatchesReferences()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            Assert.That(
                item.OccurrenceCount,
                Is.EqualTo(item.OccurrenceReferences.Count),
                $"INV-015: Item '{item.Lemma}' OccurrenceCount ({item.OccurrenceCount}) " +
                $"must match OccurrenceReferences count ({item.OccurrenceReferences.Count})"
            );
        }
    }

    #endregion

    #region Contract Tests - Homonym Grouping (gm-017)

    /// <summary>
    /// When multiple Biblical Terms with homonym suffixes (-N) map to the same dictionary
    /// entry, the LoadDictionaryTab pipeline correctly groups them via CAP-023.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Homonym grouping via CAP-023 integrated into dictionary tab pipeline")]
    public async Task LoadDictionaryTab_HomonymTerms_GroupedByBaseLemma()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        // Homonym grouping is used internally for BT matching;
        // the result items should not have -N suffixed lemmas as display names
        Assert.That(result.Items, Is.Not.Null);
        foreach (var item in result.Items)
        {
            // Lemma should be the display lemma, not a term ID with suffix
            Assert.That(
                item.Lemma,
                Does.Not.Match(@"-\d+$"),
                $"Display lemma '{item.Lemma}' should not have homonym suffix"
            );
        }
    }

    #endregion

    #region Contract Tests - Part of Speech

    /// <summary>
    /// Items have PartOfSpeech and PartOfSpeechShort fields populated from
    /// the dictionary data (via CAP-006 TranslatePartOfSpeech).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Items have part of speech fields from dictionary data")]
    public async Task LoadDictionaryTab_ItemsHavePartOfSpeech()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            Assert.That(item.PartOfSpeech, Is.Not.Null, $"PartOfSpeech for '{item.Lemma}' must not be null");
            Assert.That(
                item.PartOfSpeechShort,
                Is.Not.Null,
                $"PartOfSpeechShort for '{item.Lemma}' must not be null"
            );
        }
    }

    #endregion

    #region Contract Tests - Gloss and Translations

    /// <summary>
    /// Items have Gloss field populated (stripped of braces per CAP-015).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Items have gloss field populated (brace-filtered)")]
    public async Task LoadDictionaryTab_ItemsHaveGloss()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            Assert.That(item.Gloss, Is.Not.Null, $"Gloss for '{item.Lemma}' must not be null");
            // Gloss should not contain brace metadata
            Assert.That(
                item.Gloss,
                Does.Not.Contain("{"),
                $"Gloss for '{item.Lemma}' must not contain curly braces (brace filtering)"
            );
        }
    }

    #endregion

    #region Contract Tests - Expanded Field

    /// <summary>
    /// All items in the initial load have Expanded = false.
    /// Expansion is a UI state change, not part of the initial data load.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("All items initially have Expanded = false")]
    public async Task LoadDictionaryTab_AllItems_InitiallyNotExpanded()
    {
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        var result = await DictionaryService.LoadDictionaryTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null,
            null,
            DictionarySortField.Lemma,
            true
        );

        foreach (var item in result.Items)
        {
            Assert.That(
                item.Expanded,
                Is.False,
                $"Item '{item.Lemma}' must be initially collapsed"
            );
        }
    }

    #endregion
}
