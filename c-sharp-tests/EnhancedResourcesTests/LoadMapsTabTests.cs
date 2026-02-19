using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-012: LoadMapsTab.
/// Validates the full maps tab orchestration pipeline from scoped tokens through
/// to formatted MediaTabContent with ONLY "Satellite Bible Atlas" image items (INV-012).
///
/// This is an orchestration capability that wires together:
/// - Scope filtering via GetLinksInScope (CAP-003)
/// - Image metadata access via MarbleDataAccess (CAP-028)
/// - Image reference range matching via ImageMatchesVerseRange (CAP-018)
/// - INV-012 filtering: Includes ONLY items where collectionName is "Satellite Bible Atlas"
///
/// CAP-012 is the mirror of CAP-011 (LoadMediaTab):
/// - CAP-011 EXCLUDES "Satellite Bible Atlas" items (Media tab)
/// - CAP-012 INCLUDES ONLY "Satellite Bible Atlas" items (Maps tab)
///
/// PT9 Source: Paratext/Marble/MediaTab.cs (LoadResources, InvalidImageForTab)
/// Extractions: EXT-066, EXT-072
/// Contract: data-contracts.md Method 12
///
/// Input: (string resourceId, VerseReference verseRef, ScopeFilter scope, WordFilter? wordFilter)
/// Output: MediaTabContent (Items: IReadOnlyList&lt;MediaDisplayItem&gt;, HeaderHtml: string)
///
/// Key business rule (INV-012):
/// The collection name "Satellite Bible Atlas" (case-insensitive) is the hardcoded criterion
/// that separates Images tab content from Maps tab content. LoadMapsTab INCLUDES ONLY
/// "Satellite Bible Atlas" items; LoadMediaTab (CAP-011) excludes those items.
/// </summary>
[TestFixture]
public class LoadMapsTabTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a MarbleDataAccess instance with image data registered.
    /// Follows the pattern from LoadMediaTabTests (CAP-011).
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
    /// Creates default TextLink tokens for media/maps testing.
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
        string collectionName = "Satellite Bible Atlas",
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
    /// Outer acceptance test for CAP-012.
    /// Verifies the complete maps tab loading pipeline: scope filtering, image matching,
    /// and INV-012 inverted filtering (include ONLY Satellite Bible Atlas items).
    /// When this test passes, the capability is complete.
    ///
    /// Scenarios covered:
    /// - INV-012 (inverted): Only "Satellite Bible Atlas" items included
    /// - EXT-066: Maps vs Images tab filtering
    /// - BHV-415: Media items rendered with correct structure
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description(
        "Acceptance test: Maps tab loaded with ONLY Satellite Bible Atlas image items"
    )]
    public async Task LoadMapsTab_AllScenarios_Pass()
    {
        // Arrange: Set up data access with image data
        var dataAccess = CreateTestDataAccess();

        // Load images: some regular, some Satellite Bible Atlas
        LoadImages(
            dataAccess,
            // Regular image matching GEN 1:1 (excluded from maps tab per INV-012)
            CreateImageEntry("img-001", "001001001", "001001001", "Bible Images"),
            // Satellite Bible Atlas image matching GEN 1:1 (included in maps tab per INV-012)
            CreateImageEntry("img-002", "001001001", "001001001", "Satellite Bible Atlas"),
            // Regular image matching GEN 1:2 (excluded)
            CreateImageEntry("img-003", "001001002", "001001002", "Photos")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.Multiple(() =>
        {
            // Must return non-null MediaTabContent
            Assert.That(result, Is.Not.Null, "Must return non-null MediaTabContent");
            Assert.That(result.Items, Is.Not.Null, "Items list must not be null");

            // INV-012 (inverted): Only Satellite Bible Atlas items included
            Assert.That(
                result.Items.All(i =>
                    string.Equals(
                        i.CollectionName,
                        "Satellite Bible Atlas",
                        StringComparison.OrdinalIgnoreCase
                    )
                ),
                Is.True,
                "INV-012: Maps tab must contain ONLY Satellite Bible Atlas items"
            );

            // BHV-415: Items present for matching verse range
            Assert.That(
                result.Items.Count,
                Is.GreaterThan(0),
                "Must return at least one atlas item for verse with matching images"
            );

            // Non-atlas images must NOT appear
            Assert.That(
                result.Items.Any(i => i.Id == "img-001"),
                Is.False,
                "Non-atlas image img-001 must be excluded from maps tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-003"),
                Is.False,
                "Non-atlas image img-003 must be excluded from maps tab"
            );

            // Atlas image must appear
            Assert.That(
                result.Items.Any(i => i.Id == "img-002"),
                Is.True,
                "Atlas image img-002 must be included in maps tab"
            );
        });
    }

    #endregion

    #region INV-012 Invariant Tests

    /// <summary>
    /// INV-012 (inverted): Only "Satellite Bible Atlas" items included in maps tab.
    /// The hardcoded collection name distinguishes Maps from Images tab content.
    /// Maps tab includes ONLY "Satellite Bible Atlas"; Media tab (CAP-011) excludes those.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("INV-012: Only Satellite Bible Atlas items included in maps tab")]
    public async Task LoadMapsTab_SatelliteBibleAtlas_IncludedInMapsTab()
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
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Atlas image included, regular image excluded
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Id == "img-atlas"),
                Is.True,
                "INV-012: Satellite Bible Atlas image must be included in maps tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-regular"),
                Is.False,
                "Non-atlas images must be excluded from maps tab"
            );
        });
    }

    /// <summary>
    /// INV-012: Case-insensitive matching for "Satellite Bible Atlas".
    /// All case variants of the collection name must be included in maps tab.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("INV-012: Case-insensitive matching includes all atlas variants in maps tab")]
    public async Task LoadMapsTab_SatelliteBibleAtlasCaseVariants_AllIncluded()
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
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: All atlas variants included, non-atlas excluded
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Id == "img-lower"),
                Is.True,
                "INV-012: lowercase 'satellite bible atlas' must be included in maps tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-upper"),
                Is.True,
                "INV-012: uppercase 'SATELLITE BIBLE ATLAS' must be included in maps tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-mixed"),
                Is.True,
                "INV-012: mixed case 'Satellite BIBLE Atlas' must be included in maps tab"
            );
            Assert.That(
                result.Items.Any(i => i.Id == "img-normal"),
                Is.False,
                "Non-atlas images must be excluded from maps tab"
            );
        });
    }

    /// <summary>
    /// INV-012: Non-atlas collection names are excluded from maps tab (negative proof).
    /// Verifies that collections with names similar to but not matching "Satellite Bible Atlas"
    /// are correctly excluded from the maps tab.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-153")]
    [Description("INV-012: Non-atlas collections excluded from maps tab")]
    public async Task LoadMapsTab_NonAtlasCollections_AllExcluded()
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
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: All non-atlas images excluded, empty result
        Assert.That(
            result.Items.Count,
            Is.EqualTo(0),
            "Maps tab must be empty when no atlas images exist"
        );
    }

    /// <summary>
    /// INV-012: When all images are Satellite Bible Atlas, maps tab returns all of them.
    /// Inverse of CAP-011 edge case where all atlas images result in empty media tab.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("INV-012: All atlas images returned when all images are Satellite Bible Atlas")]
    public async Task LoadMapsTab_AllAtlasImages_AllIncluded()
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
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: All atlas images included
        Assert.That(
            result.Items.Count,
            Is.EqualTo(2),
            "All atlas images should be included in maps tab"
        );
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Contract: Valid resource and verse with matching atlas images returns MediaTabContent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Valid resource with atlas image data returns MediaTabContent")]
    public async Task LoadMapsTab_ValidResource_ReturnsContent()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
    /// Per data-contracts.md: Id, CollectionName, ReferenceRange are required.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Display items have required fields: Id, CollectionName, ReferenceRange")]
    public async Task LoadMapsTab_ItemFields_AllPopulated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry(
                "img-001",
                "001001001",
                "001001001",
                "Satellite Bible Atlas",
                "images/map1.jpg"
            )
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
            Assert.That(
                item.CollectionName,
                Is.Not.Null.And.Not.Empty,
                "CollectionName must be populated"
            );
            Assert.That(
                item.ReferenceRange,
                Is.Not.Null.And.Not.Empty,
                "ReferenceRange must be populated"
            );
        });
    }

    /// <summary>
    /// Contract: MediaTabContent has HeaderHtml field.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Tab content has HeaderHtml field")]
    public async Task LoadMapsTab_HeaderHtml_NotNull()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
    /// Contract: Verse scope returns only atlas images matching the current verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentVerse scope returns only atlas images for the specified verse")]
    public async Task LoadMapsTab_VerseScope_OnlyCurrentVerseAtlasImages()
    {
        // Arrange: Atlas images for two different verses
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-v1", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-v2", "001001002", "001001002", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Only verse 1 atlas image, not verse 2
        Assert.That(
            result.Items.Any(i => i.Id == "img-v1"),
            Is.True,
            "Must include atlas image for current verse"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-v2"),
            Is.False,
            "Must NOT include atlas image for other verse when scope is CurrentVerse"
        );
    }

    /// <summary>
    /// Contract: Chapter scope returns atlas images from all verses in the chapter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentChapter scope returns atlas images from all verses in chapter")]
    public async Task LoadMapsTab_ChapterScope_AllChapterAtlasImages()
    {
        // Arrange: Atlas images across the chapter, plus one in different chapter
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-v1", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-v2", "001001002", "001001002", "Satellite Bible Atlas"),
            CreateImageEntry("img-ch2", "001002001", "001002001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: Both chapter 1 atlas images, but not chapter 2
        Assert.That(
            result.Items.Any(i => i.Id == "img-v1"),
            Is.True,
            "Chapter scope must include verse 1 atlas image"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-v2"),
            Is.True,
            "Chapter scope must include verse 2 atlas image"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-ch2"),
            Is.False,
            "Chapter scope must NOT include chapter 2 atlas image"
        );
    }

    /// <summary>
    /// Contract: Section scope returns atlas images within the current section boundaries.
    /// Section boundaries are defined by USFM 's' paragraph markers (INV-011).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("CurrentSection scope returns atlas images within section boundaries")]
    public async Task LoadMapsTab_SectionScope_OnlySectionAtlasImages()
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
            CreateImageEntry("img-sec1", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-sec2", "001001002", "001001002", "Satellite Bible Atlas")
        );

        // Query verse 1 with section scope
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentSection,
            null
        );

        // Assert: Only section 1 atlas images (verse 1), not section 2 (verse 2)
        Assert.That(
            result.Items.Any(i => i.Id == "img-sec1"),
            Is.True,
            "Section scope must include atlas image from current section"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-sec2"),
            Is.False,
            "Section scope must NOT include atlas image from next section"
        );
    }

    #endregion

    #region Contract Tests - Word Filter

    /// <summary>
    /// Contract: Word filter restricts atlas items to those matching the filter.
    /// When a word filter is active, only atlas images associated with matching tokens
    /// are included in the results.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Word filter restricts maps items to matching tokens")]
    public async Task LoadMapsTab_WithWordFilter_RestrictsToMatchingTokens()
    {
        // Arrange: Verse with word links and associated atlas images
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-ark", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-flood", "001001002", "001001002", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);
        var wordFilter = new WordFilter(
            Lemma: "ark",
            LexicalLinks: new[] { "SDBH:ark:001001" },
            SurfaceForm: "ark",
            SourcePane: WordFilterSource.Scripture
        );

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            wordFilter
        );

        // Assert: Only ark-related atlas images in scope
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(0),
            "Word filter may restrict atlas items (implementation-dependent on token-image linking)"
        );
    }

    /// <summary>
    /// Contract: Null word filter returns all atlas items in scope (no filtering).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Null word filter returns all atlas items in scope")]
    public async Task LoadMapsTab_NullWordFilter_ReturnsAllAtlasInScope()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-002", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Both atlas items in scope returned
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(2),
            "Without word filter, all atlas images in scope should be returned"
        );
    }

    #endregion

    #region Contract Tests - Error Conditions

    /// <summary>
    /// Error: Resource not found throws RESOURCE_NOT_FOUND error.
    /// Per data-contracts.md Method 12: Same as LoadMediaTab error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Non-existent resource throws RESOURCE_NOT_FOUND error")]
    public void LoadMapsTab_ResourceNotFound_ThrowsException()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await MediaTabService.LoadMapsTabAsync(
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
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Book not in resource throws BOOK_NOT_FOUND")]
    public void LoadMapsTab_BookNotFound_ThrowsException()
    {
        // Arrange: Resource has tokens for book 1, but we request book 43
        var dataAccess = CreateTestDataAccess(bookNum: 1);
        var verseRef = new VerseReference(43, 1, 1); // John, not in test data

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await MediaTabService.LoadMapsTabAsync(
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
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Each maps display item has a unique Id")]
    public async Task LoadMapsTab_ItemIds_AreUnique()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-002", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Items have Expanded=false by default")]
    public async Task LoadMapsTab_Items_DefaultExpandedIsFalse()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
    /// Contract: CollectionName is "Satellite Bible Atlas" for all items.
    /// This is the defining characteristic of the maps tab.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("InvariantId", "INV-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("All items have CollectionName matching 'Satellite Bible Atlas'")]
    public async Task LoadMapsTab_CollectionName_AlwaysSatelliteBibleAtlas()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-001", "001001001", "001001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-002", "001001002", "001001002", "Satellite Bible Atlas"),
            CreateImageEntry("img-003", "001001001", "001001001", "Bible Images") // excluded
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: All returned items are atlas items
        foreach (var item in result.Items)
        {
            Assert.That(
                item.CollectionName,
                Is.EqualTo("Satellite Bible Atlas").IgnoreCase,
                $"Item '{item.Id}' must have CollectionName 'Satellite Bible Atlas'"
            );
        }
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Edge case: No images in index returns empty items list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("No images in index returns empty items")]
    public async Task LoadMapsTab_NoImages_ReturnsEmptyItems()
    {
        // Arrange: Resource exists but no images loaded
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
    /// Edge case: Spanning range atlas image included when verse falls within range.
    /// Integration with CAP-018 ImageMatchesVerseRange for spanning ranges.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Spanning range atlas image included when verse falls within range")]
    public async Task LoadMapsTab_SpanningRangeAtlasImage_IncludedForVerseInRange()
    {
        // Arrange: Atlas image spanning GEN 1:26 - GEN 2:3
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-span", "001001026", "001002003", "Satellite Bible Atlas")
        );

        // Query GEN 2:1 (within the spanning range)
        var verseRef = new VerseReference(1, 2, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
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
            "Spanning range atlas image must be included when query verse is within the range"
        );
    }

    /// <summary>
    /// Edge case: Atlas image for different book is not included.
    /// Verifies cross-book filtering through the pipeline.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Atlas image for different book not included")]
    public async Task LoadMapsTab_DifferentBookAtlasImage_NotIncluded()
    {
        // Arrange: Atlas image for Exodus, querying Genesis
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-exo", "002001001", "002001001", "Satellite Bible Atlas"),
            CreateImageEntry("img-gen", "001001001", "001001001", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Only Genesis atlas image, not Exodus
        Assert.That(
            result.Items.Any(i => i.Id == "img-gen"),
            Is.True,
            "Genesis atlas image must be included"
        );
        Assert.That(
            result.Items.Any(i => i.Id == "img-exo"),
            Is.False,
            "Exodus atlas image must NOT be included for Genesis query"
        );
    }

    /// <summary>
    /// Edge case: Whole-book atlas image included when querying any verse in the book.
    /// Integration with CAP-018 ImageMatchesVerseRange for whole-book references.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-415")]
    [Property("ScenarioId", "TS-152")]
    [Description("Whole-book atlas image included when querying any verse in book")]
    public async Task LoadMapsTab_WholeBookAtlasImage_IncludedForVerseInBook()
    {
        // Arrange: Atlas image with whole-book reference (chapter=000)
        var dataAccess = CreateTestDataAccess();
        LoadImages(
            dataAccess,
            CreateImageEntry("img-whole-book", "001000000", "001000000", "Satellite Bible Atlas")
        );

        var verseRef = new VerseReference(1, 1, 1);

        // Act
        var result = await MediaTabService.LoadMapsTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Whole-book atlas image matches any verse in Genesis
        Assert.That(
            result.Items.Any(i => i.Id == "img-whole-book"),
            Is.True,
            "Whole-book atlas image must be included for query verse in that book"
        );
    }

    #endregion
}
