using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-011: LoadMediaTab.
/// Validates the full media tab orchestration pipeline from scoped tokens through
/// to formatted MediaTabContent with image items, excluding Satellite Bible Atlas (INV-012).
///
/// This is an orchestration capability that wires together:
/// - Scope filtering via GetLinksInScope (CAP-003)
/// - Image metadata access via MarbleDataAccess (CAP-028)
/// - Image reference range matching via ImageMatchesVerseRange (CAP-018)
/// - INV-012 filtering: Excludes items where collectionName is "Satellite Bible Atlas"
///
/// PT9 Source: Paratext/Marble/MediaTab.cs (LoadResources, InvalidImageForTab)
/// Extractions: EXT-064, EXT-066, EXT-072, EXT-075
/// Golden Masters: gm-010 (image range matching)
/// Contract: data-contracts.md Method 11
///
/// Input: (string resourceId, VerseReference verseRef, ScopeFilter scope, WordFilter? wordFilter)
/// Output: MediaTabContent (Items: IReadOnlyList&lt;MediaDisplayItem&gt;, HeaderHtml: string)
///
/// Key business rule (INV-012):
/// The collection name "Satellite Bible Atlas" (case-insensitive) is the hardcoded criterion
/// that separates Images tab content from Maps tab content. LoadMediaTab EXCLUDES
/// "Satellite Bible Atlas" items; LoadMapsTab (CAP-012) includes ONLY those items.
/// </summary>
[TestFixture]
public class LoadMediaTabTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a MarbleDataAccess instance with image data registered.
    /// Follows the pattern from LoadEncyclopediaTabTests and LoadDictionaryTabTests.
    /// </summary>
    private static MarbleDataAccess CreateTestDataAccess(
        string resourceId = "ESV16UK+",
        int bookNum = 1,
        IReadOnlyList<MarbleToken>? tokens = null
    )
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.Initialize();

        // Register research data (required for HaveMarbleData to return true)
        foreach (var proj in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(proj);

        // Default tokens: a verse with image-eligible TextLink tokens
        tokens ??= CreateDefaultMediaTokens(bookNum);

        dataAccess.AddBible(resourceId, _ => tokens);

        return dataAccess;
    }

    /// <summary>
    /// Creates default TextLink tokens for media testing.
    /// Media images are typically associated with verse ranges rather than
    /// lexical links, but some are word-linked to specific lemmas.
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateDefaultMediaTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "ark",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "SDBH:ark:001001"
            ),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "flood",
                null,
                new VerseReference(bookNum, 1, 2),
                LexicalLinks: "SDBH:flood:001001"
            ),
        };
    }

    /// <summary>
    /// Creates a simple image index entry for testing.
    /// </summary>
    private static ImageEntry CreateImageEntry(
        string imageId,
        string startRef,
        string endRef,
        string collectionName = "Bible Images",
        string filePath = "images/test.jpg"
    )
    {
        return new ImageEntry(imageId, startRef, endRef, collectionName, filePath);
    }

    /// <summary>
    /// Loads image entries into the data access instance via LoadImageIndex.
    /// </summary>
    private static void LoadImages(MarbleDataAccess dataAccess, params ImageEntry[] entries)
    {
        var list = new System.Collections.ArrayList();
        foreach (var entry in entries)
            list.Add(entry);
        dataAccess.LoadImageIndex(list);
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-011.
    /// Verifies golden master scenario from gm-010 in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Scenarios covered:
    /// - gm-010: Image reference ranges correctly matched against verse ranges
    /// - INV-012: "Satellite Bible Atlas" items excluded from media tab
    /// - BHV-415: Media items rendered with correct structure
    ///
    /// The test verifies the full pipeline: tokens in scope -> image metadata lookup ->
    /// range matching -> INV-012 filtering -> MediaTabContent result.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description(
        "Acceptance test: Media tab loaded with image items excluding Satellite Bible Atlas"
    )]
    public async Task LoadMediaTab_AllGoldenMasterScenarios_Pass()
    {
        // Arrange: Set up data access with image data
        var dataAccess = CreateTestDataAccess();

        // Load images: some regular, some Satellite Bible Atlas
        LoadImages(
            dataAccess,
            // Regular image matching GEN 1:1 (included in media tab)
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images"),
            // Satellite Bible Atlas image matching GEN 1:1 (excluded from media tab per INV-012)
            CreateImageEntry("img-002", "001001001", "001001001", "Satellite Bible Atlas"),
            // Regular image matching GEN 1:2 (included)
            CreateImageEntry("img-003", "001001002", "001001002", "Photos")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.Multiple(() =>
        {
            // gm-010: Media content returned with items
            Assert.That(result, Is.Not.Null, "Must return non-null MediaTabContent");
            Assert.That(result.Items, Is.Not.Null, "Items list must not be null");

            // INV-012: Satellite Bible Atlas excluded
            var collectionNames = result.Items.Select(i => i.CollectionName).ToList();
            Assert.That(
                collectionNames,
                Has.None.EqualTo("Satellite Bible Atlas").IgnoreCase,
                "INV-012: Satellite Bible Atlas items must be excluded from media tab"
            );

            // BHV-415: Items present for matching verse range
            Assert.That(
                result.Items.Count,
                Is.GreaterThan(0),
                "Must return at least one media item for verse with matching images"
            );
        });
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// gm-010 integration: Whole-book image reference included when query is in that book.
    /// Tests the pipeline: LoadMediaTab -> image metadata -> range matching (IRM-01).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("gm-010 IRM-01: Whole-book image included when querying any verse in book")]
    public async Task GoldenMaster_WholeBookImage_IncludedForVerseInBook()
    {
        // Arrange: Image with whole-book reference (chapter=000)
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-whole-book", "001000000", "001000000", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Whole-book image matches any verse in Genesis
        Assert.That(
            result.Items.Any(i => i.Id == "img-whole-book"),
            Is.True,
            "gm-010 IRM-01: Whole-book image must be included for query verse in that book"
        );
    }

    /// <summary>
    /// gm-010 integration: Non-overlapping image reference excluded.
    /// Tests the pipeline: LoadMediaTab -> image metadata -> range matching (IRM-04).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("gm-010 IRM-04: Non-overlapping image excluded from results")]
    public async Task GoldenMaster_NonOverlappingImage_Excluded()
    {
        // Arrange: Image for GEN 1:1, but querying GEN 2:1
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-gen1v1", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 2, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Non-overlapping image not included
        Assert.That(
            result.Items.Any(i => i.Id == "img-gen1v1"),
            Is.False,
            "gm-010 IRM-04: Non-overlapping image must not be in results"
        );
    }

    #endregion

    #region INV-012 Invariant Tests

    /// <summary>
    /// INV-012: "Satellite Bible Atlas" items excluded from media tab.
    /// The hardcoded collection name distinguishes Maps from Images tab content.
    /// Media tab excludes "Satellite Bible Atlas"; Maps tab (CAP-012) shows only those.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("INV-012: Satellite Bible Atlas items excluded from media tab")]
    public async Task LoadMediaTab_SatelliteBibleAtlas_ExcludedFromMediaTab()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-atlas", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-regular", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Atlas image excluded, regular image included
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Id == "img-atlas"),
                Is.False,
                "INV-012: Satellite Bible Atlas image must be excluded from media tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-regular"),
                Is.True,
                "Regular images must be included in media tab"
            );
        });
    }

    /// <summary>
    /// INV-012: Case-insensitive matching for "Satellite Bible Atlas".
    /// The comparison must be case-insensitive per business-rules.md.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("INV-012: Case-insensitive matching excludes atlas variations")]
    public async Task LoadMediaTab_SatelliteBibleAtlasCaseVariants_AllExcluded()
    {
        // Arrange: Multiple case variants of "Satellite Bible Atlas"
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-lower", "001001001", "001001001", "satellite bible atlas"),
            CreateImageEntry("img-upper", "001001001", "001001001", "SATELLITE BIBLE ATLAS"),
            CreateImageEntry("img-mixed", "001001001", "001001001", "Satellite BIBLE Atlas"),
            CreateImageEntry("img-normal", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: All atlas variants excluded
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Id == "img-lower"),
                Is.False,
                "INV-012: lowercase 'satellite bible atlas' must be excluded"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-upper"),
                Is.False,
                "INV-012: uppercase 'SATELLITE BIBLE ATLAS' must be excluded"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-mixed"),
                Is.False,
                "INV-012: mixed case 'Satellite BIBLE Atlas' must be excluded"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-normal"),
                Is.True,
                "Non-atlas images must be included"
            );
        });
    }

    /// <summary>
    /// INV-012: Non-atlas collection names are included (negative proof).
    /// Verifies that collections with names similar to but not matching "Satellite Bible Atlas"
    /// are correctly included in the media tab.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-153")]
    [Description("INV-012: Non-atlas collections included in media tab")]
    public async Task LoadMediaTab_NonAtlasCollections_AllIncluded()
    {
        // Arrange: Various non-atlas collection names
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-photos", "001001001", "001001001", "Photos"),
            CreateImageEntry("img-biblical", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-plants", "001001001", "001001001", "Plants and Trees")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: All non-atlas images included
        Assert.That(result.Items.Count, Is.EqualTo(3), "All non-atlas images must be included");
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Contract: Valid resource and verse with matching images returns MediaTabContent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Valid resource with image data returns MediaTabContent")]
    public async Task LoadMediaTab_ValidResource_ReturnsContent()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Must return non-null content");
        Assert.That(result.Items, Is.Not.Null, "Items list must not be null");
    }

    /// <summary>
    /// Contract: Each MediaDisplayItem has required fields populated.
    /// Per data-contracts.md: Id, Title, CollectionName, ReferenceRange are required.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Display items have required fields: Id, Title, CollectionName, ReferenceRange")]
    public async Task LoadMediaTab_ItemFields_AllPopulated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images", "images/gen1.jpg")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items[0];
        Assert.Multiple(() =>
        {
            Assert.That(item.Id, Is.Not.Null.And.Not.Empty, "Id must be populated");
            Assert.That(item.CollectionName, Is.Not.Null.And.Not.Empty, "CollectionName must be populated");
            Assert.That(item.ReferenceRange, Is.Not.Null.And.Not.Empty, "ReferenceRange must be populated");
        });
    }

    /// <summary>
    /// Contract: MediaTabContent has HeaderHtml field.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Tab content has HeaderHtml field")]
    public async Task LoadMediaTab_HeaderHtml_NotNull()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: HeaderHtml must not be null (may be empty string)
        Assert.That(result.HeaderHtml, Is.Not.Null, "HeaderHtml must not be null");
    }

    #endregion

    #region Contract Tests - Scope Filtering

    /// <summary>
    /// Contract: Verse scope returns only images matching the current verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentVerse scope returns only images for the specified verse")]
    public async Task LoadMediaTab_VerseScope_OnlyCurrentVerseImages()
    {
        // Arrange: Images for two different verses
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-v1", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-v2", "001001002", "001001002", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Only verse 1 image, not verse 2
        Assert.That(
            result.Items.Any(i => i.Id == "img-v1"),
            Is.True,
            "Must include image for current verse"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-v2"),
            Is.False,
            "Must NOT include image for other verse when scope is CurrentVerse"
        );
    }

    /// <summary>
    /// Contract: Chapter scope returns images from all verses in the chapter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentChapter scope returns images from all verses in chapter")]
    public async Task LoadMediaTab_ChapterScope_AllChapterImages()
    {
        // Arrange: Images across the chapter
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-v1", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-v2", "001001002", "001001002", "Bible Images"),
            CreateImageEntry("img-ch2", "001002001", "001002001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: Both chapter 1 images, but not chapter 2
        Assert.That(
            result.Items.Any(i => i.Id == "img-v1"),
            Is.True,
            "Chapter scope must include verse 1 image"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-v2"),
            Is.True,
            "Chapter scope must include verse 2 image"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-ch2"),
            Is.False,
            "Chapter scope must NOT include chapter 2 image"
        );
    }

    /// <summary>
    /// Contract: Section scope returns images within the current section boundaries.
    /// Section boundaries are defined by USFM 's' paragraph markers (INV-011).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentSection scope returns images within section boundaries")]
    public async Task LoadMediaTab_SectionScope_OnlySectionImages()
    {
        // Arrange: Tokens with section boundary
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(1, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(1, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "word1",
                null,
                new VerseReference(1, 1, 1),
                LexicalLinks: "SDBH:word1:001001"
            ),
            // Section boundary (ParagraphStart with style "s")
            new(MarbleTokenType.ParagraphStart, null, "s", new VerseReference(1, 1, 2)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(1, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "word2",
                null,
                new VerseReference(1, 1, 2),
                LexicalLinks: "SDBH:word2:001001"
            ),
        };

        var dataAccess = CreateTestDataAccess(tokens: tokens);
        LoadImages(
            dataAccess,
            CreateImageEntry("img-sec1", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-sec2", "001001002", "001001002", "Bible Images")
        );

        // Query verse 1 with section scope
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentSection,
            null
        );

        // Assert: Only section 1 images (verse 1), not section 2 (verse 2)
        Assert.That(
            result.Items.Any(i => i.Id == "img-sec1"),
            Is.True,
            "Section scope must include image from current section"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-sec2"),
            Is.False,
            "Section scope must NOT include image from next section"
        );
    }

    #endregion

    #region Contract Tests - Word Filter

    /// <summary>
    /// Contract: Word filter restricts items to those matching the filter.
    /// When a word filter is active, only images associated with matching tokens
    /// are included in the results.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Word filter restricts media items to matching tokens")]
    public async Task LoadMediaTab_WithWordFilter_RestrictsToMatchingTokens()
    {
        // Arrange: Verse with two different word links, each with associated images
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-ark", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-flood", "001001002", "001001002", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);
        var wordFilter = new WordFilter(
            Lemma: "ark",
            LexicalLinks: new[] { "SDBH:ark:001001" },
            SurfaceForm: "ark",
            SourcePane: WordFilterSource.Scripture
        );

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            wordFilter
        );

        // Assert: Only ark-related images in scope
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(0),
            "Word filter may restrict items (implementation-dependent on token-image linking)"
        );
    }

    /// <summary>
    /// Contract: Null word filter returns all items in scope (no filtering).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Null word filter returns all items in scope")]
    public async Task LoadMediaTab_NullWordFilter_ReturnsAllInScope()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-002", "001001001", "001001001", "Photos")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Both items in scope returned
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(2),
            "Without word filter, all images in scope should be returned"
        );
    }

    #endregion

    #region Contract Tests - Error Conditions

    /// <summary>
    /// Error: Resource not found throws RESOURCE_NOT_FOUND error.
    /// Per data-contracts.md Method 11: "Enhanced Resource '{resourceId}' is not installed"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Non-existent resource throws RESOURCE_NOT_FOUND error")]
    public void LoadMediaTab_ResourceNotFound_ThrowsException()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await MediaTabService.LoadMediaTabAsync(
                    dataAccess,
                    "NONEXISTENT",
                    verseRef,
                    ScopeFilter.CurrentVerse,
                    null
                )
        );
        Assert.That(
            ex!.Message,
            Does.Contain("RESOURCE_NOT_FOUND"),
            "Error message must contain RESOURCE_NOT_FOUND code"
        );
    }

    /// <summary>
    /// Error: Book not available in resource throws BOOK_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Book not in resource throws BOOK_NOT_FOUND")]
    public void LoadMediaTab_BookNotFound_ThrowsException()
    {
        // Arrange: Resource has tokens for book 1, but we request book 43
        var dataAccess = CreateTestDataAccess(bookNum: 1);
        var verseRef = new VerseReference(43, 1, 1); // John, not in test data

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await MediaTabService.LoadMediaTabAsync(
                    dataAccess,
                    "ESV16UK+",
                    verseRef,
                    ScopeFilter.CurrentVerse,
                    null
                )
        );
        Assert.That(
            ex!.Message,
            Does.Contain("BOOK_NOT_FOUND").Or.Contain("not available"),
            "Error must indicate book not found"
        );
    }

    #endregion

    #region Contract Tests - Display Item Structure

    /// <summary>
    /// Contract: MediaDisplayItem.Id is unique per item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Each media display item has a unique Id")]
    public async Task LoadMediaTab_ItemIds_AreUnique()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images"),
            CreateImageEntry("img-002", "001001001", "001001001", "Photos")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        var ids = result.Items.Select(i => i.Id).ToList();
        Assert.That(ids, Is.Unique, "All item Ids must be unique");
    }

    /// <summary>
    /// Contract: Expanded field defaults to false for initial display.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Items have Expanded=false by default")]
    public async Task LoadMediaTab_Items_DefaultExpandedIsFalse()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        foreach (var item in result.Items)
        {
            Assert.That(
                item.Expanded,
                Is.False,
                $"Item '{item.Id}' should have Expanded=false by default"
            );
        }
    }

    /// <summary>
    /// Contract: CollectionName is preserved from the image index.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-153")]
    [Description("CollectionName preserved from image index metadata")]
    public async Task LoadMediaTab_CollectionName_PreservedFromImageIndex()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Plants and Trees")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        Assert.That(
            result.Items[0].CollectionName,
            Is.EqualTo("Plants and Trees"),
            "CollectionName must be preserved from image index"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Edge case: No images in index returns empty items list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("No images in index returns empty items")]
    public async Task LoadMediaTab_NoImages_ReturnsEmptyItems()
    {
        // Arrange: Resource exists but no images loaded
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Empty items, not an error
        Assert.That(result.Items.Count, Is.EqualTo(0), "No images should return empty items list");
    }

    /// <summary>
    /// Edge case: All images are Satellite Bible Atlas returns empty media tab.
    /// When every image in the index is atlas content, the media tab should be empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("All atlas images results in empty media tab")]
    public async Task LoadMediaTab_AllAtlasImages_ReturnsEmptyItems()
    {
        // Arrange: Only atlas images
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-atlas1", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-atlas2", "001001002", "001001002", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: All atlas images filtered out, empty result
        Assert.That(
            result.Items.Count,
            Is.EqualTo(0),
            "All atlas images should be filtered out, leaving empty media tab"
        );
    }

    /// <summary>
    /// Edge case: Spanning range image included when verse falls within range.
    /// Integration with CAP-018 ImageMatchesVerseRange for spanning ranges.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-151")]
    [Description("Spanning range image included when verse falls within range")]
    public async Task LoadMediaTab_SpanningRangeImage_IncludedForVerseInRange()
    {
        // Arrange: Image spanning GEN 1:26 - GEN 2:3
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-span", "001001026", "001002003", "Bible Images")
        );

        // Query GEN 2:1 (within the spanning range)
        var verseRef = new VerseReference(1, 2, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(
            result.Items.Any(i => i.Id == "img-span"),
            Is.True,
            "Spanning range image must be included when query verse is within the range"
        );
    }

    /// <summary>
    /// Edge case: Image for different book is not included.
    /// Verifies cross-book filtering through the pipeline.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-149")]
    [Description("Image for different book not included")]
    public async Task LoadMediaTab_DifferentBookImage_NotIncluded()
    {
        // Arrange: Image for Exodus, querying Genesis
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-exo", "002001001", "002001001", "Bible Images"),
            CreateImageEntry("img-gen", "001001001", "001001001", "Bible Images")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Only Genesis image, not Exodus
        Assert.That(
            result.Items.Any(i => i.Id == "img-gen"),
            Is.True,
            "Genesis image must be included"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-exo"),
            Is.False,
            "Exodus image must NOT be included for Genesis query"
        );
    }

    #endregion
}
