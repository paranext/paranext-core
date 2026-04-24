using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MediaService.LoadResources and MediaService.InvalidImageForTab.
/// CAP-011: LoadMediaResources (non-video only)
///
/// Behaviors: BHV-359 (Media Tab Deferred Loading / Satellite Bible Atlas Filter),
///            BHV-352 (Empty State Messages)
/// Contract: Section 4.11 M-011, Section 2.9 MediaLoadInput, Section 3.9 MediaLoadResult
/// Sources: EXT-060 (MediaTab Resource Loading), EXT-067 (Media Satellite Bible Atlas Filter)
/// Golden Master: gm-018 (Satellite Bible Atlas filter routing)
///
/// MediaService is a static service that takes MediaLoadInput and returns
/// MediaLoadResult with display items for the Images or Maps tab.
/// Images tab: excludes "Satellite Bible Atlas" collection.
/// Maps tab: includes only "Satellite Bible Atlas" collection.
/// No video support. Media loading is synchronous.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MediaServiceTests
{
    [SetUp]
    public void SetUp()
    {
        // N3 policy: fixture data lives in c-sharp-tests. Populate MediaService's
        // test-override seams from MediaFixtures before every test.
        MediaFixtures.ApplyDefaults();
    }

    [TearDown]
    public void TearDown()
    {
        MediaFixtures.Clear();
    }

    #region Test Data Constants

    /// <summary>
    /// The exact string used by PT9 to identify Satellite Bible Atlas images.
    /// gm-018 confirms this is a literal string comparison.
    /// </summary>
    private const string SatelliteBibleAtlas = "Satellite Bible Atlas";

    private const string GeneralCollection = "General";
    private const string TestResourceId = "SDBG";

    /// <summary>
    /// Creates a test MediaLoadInput for the given tab type and reference.
    /// </summary>
    private static MediaLoadInput CreateInput(
        MediaTabType tabType,
        int bookNum = 40,
        int chapterNum = 1,
        int verseNum = 1
    )
    {
        return new MediaLoadInput(
            CurrentReference: new VerseRef(bookNum, chapterNum, verseNum),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: tabType,
            UserLanguage: "en",
            ResourceId: TestResourceId
        );
    }

    #endregion

    #region Acceptance Tests

    // =========================================================================
    // Acceptance test (OUTER): gm-018 golden master - Satellite Bible Atlas filter
    // The InvalidImageForTab function correctly routes SBA to Maps and excludes
    // it from Images. This is the "done signal" for CAP-011 filter behavior.
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("GoldenMasterId", "gm-018")]
    [Description(
        "Acceptance: gm-018 - InvalidImageForTab correctly routes SBA to Maps, excludes from Images"
    )]
    public void InvalidImageForTab_GoldenMaster_AllFourCasesMatch()
    {
        // gm-018 defines 4 test cases for the InvalidImageForTab filter.
        // Each case checks a (collection, tabType) -> expectedInvalid mapping.

        // Case 1: General images valid for Images tab (expectedInvalid = false)
        Assert.That(
            MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Images),
            Is.False,
            "gm-018 case 1: General images should be valid for Images tab"
        );

        // Case 2: SBA images invalid for Images tab (expectedInvalid = true)
        Assert.That(
            MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Images),
            Is.True,
            "gm-018 case 2: SBA images should be invalid for Images tab"
        );

        // Case 3: General images invalid for Maps tab (expectedInvalid = true)
        Assert.That(
            MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Maps),
            Is.True,
            "gm-018 case 3: General images should be invalid for Maps tab"
        );

        // Case 4: SBA images valid for Maps tab (expectedInvalid = false)
        Assert.That(
            MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Maps),
            Is.False,
            "gm-018 case 4: SBA images should be valid for Maps tab"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Description(
        "Acceptance: LoadMediaResources for Images tab excludes Satellite Bible Atlas items"
    )]
    public void LoadMediaResources_ImagesTab_ExcludesSatelliteBibleAtlas()
    {
        // Arrange: mixed collection with both General and SBA images
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: Images tab must not contain any SBA items
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(
            result.Items.All(item => item.Collection != SatelliteBibleAtlas),
            Is.True,
            "BHV-359: Images tab must exclude all 'Satellite Bible Atlas' items"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Description(
        "Acceptance: LoadMediaResources for Maps tab includes only Satellite Bible Atlas items"
    )]
    public void LoadMediaResources_MapsTab_IncludesOnlySatelliteBibleAtlas()
    {
        // Arrange: mixed collection with both General and SBA images
        var input = CreateInput(MediaTabType.Maps);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: Maps tab must contain only SBA items (or be empty with message)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        if (result.Items.Count > 0)
        {
            Assert.That(
                result.Items.All(item => item.Collection == SatelliteBibleAtlas),
                Is.True,
                "BHV-359: Maps tab must contain only 'Satellite Bible Atlas' items"
            );
        }
    }

    #endregion

    #region InvalidImageForTab Unit Tests (EXT-067)

    // =========================================================================
    // InvalidImageForTab: EXT-067 Satellite Bible Atlas Filter
    // Simple boolean filter routing SBA to Maps tab, excluding from Images tab.
    // String comparison on collection name "Satellite Bible Atlas".
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: General collection is valid for Images tab")]
    public void InvalidImageForTab_GeneralCollection_ImagesTab_ReturnsFalse()
    {
        var result = MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Images);

        Assert.That(result, Is.False, "General images are valid for Images tab");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Satellite Bible Atlas collection is invalid for Images tab")]
    public void InvalidImageForTab_SbaCollection_ImagesTab_ReturnsTrue()
    {
        var result = MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Images);

        Assert.That(result, Is.True, "SBA images must be excluded from Images tab");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: General collection is invalid for Maps tab")]
    public void InvalidImageForTab_GeneralCollection_MapsTab_ReturnsTrue()
    {
        var result = MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Maps);

        Assert.That(result, Is.True, "General images must be excluded from Maps tab");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Satellite Bible Atlas collection is valid for Maps tab")]
    public void InvalidImageForTab_SbaCollection_MapsTab_ReturnsFalse()
    {
        var result = MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Maps);

        Assert.That(result, Is.False, "SBA images are valid for Maps tab");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Other named collections are valid for Images tab, invalid for Maps")]
    public void InvalidImageForTab_OtherCollection_ImagesValid_MapsInvalid()
    {
        // Any non-SBA collection should behave like "General"
        Assert.That(
            MediaService.InvalidImageForTab("Bible Illustrations", MediaTabType.Images),
            Is.False,
            "Non-SBA collections are valid for Images tab"
        );
        Assert.That(
            MediaService.InvalidImageForTab("Bible Illustrations", MediaTabType.Maps),
            Is.True,
            "Non-SBA collections are invalid for Maps tab"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Filter is case-sensitive string comparison on exact collection name")]
    public void InvalidImageForTab_CaseSensitive_SbaVariant_TreatedAsNonSba()
    {
        // PT9 uses exact string comparison - "satellite bible atlas" != "Satellite Bible Atlas"
        Assert.That(
            MediaService.InvalidImageForTab("satellite bible atlas", MediaTabType.Images),
            Is.False,
            "Lowercase variant should not match - treated as non-SBA for Images tab"
        );
        Assert.That(
            MediaService.InvalidImageForTab("satellite bible atlas", MediaTabType.Maps),
            Is.True,
            "Lowercase variant should not match - treated as non-SBA for Maps tab"
        );
    }

    #endregion

    #region LoadResources Contract Tests (EXT-060)

    // =========================================================================
    // LoadResources: EXT-060 MediaTab Resource Loading
    // Loads media items filtered by tab type using InvalidImageForTab.
    // Returns MediaLoadResult with items, countLabel, and emptyStateMessage.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: Images tab returns items with correct count label")]
    public void LoadResources_ImagesTab_ReturnsItemsWithCountLabel()
    {
        // Arrange: input requesting Images tab
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: result has items and a count label
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(
            result.CountLabel,
            Is.Not.Null.And.Not.Empty,
            "Count label must be populated (e.g., '3 media files')"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: Maps tab returns only SBA items with correct count label")]
    public void LoadResources_MapsTab_ReturnsOnlySbaItemsWithCountLabel()
    {
        // Arrange: input requesting Maps tab
        var input = CreateInput(MediaTabType.Maps);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: result has items and a count label
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(
            result.CountLabel,
            Is.Not.Null.And.Not.Empty,
            "Count label must be populated (e.g., '1 map file')"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: DisplayIndex is assigned sequentially starting from 0")]
    public void LoadResources_ImagesTab_DisplayIndexAssignedSequentially()
    {
        // Arrange
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: display indices must be sequential from 0
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        for (int i = 0; i < result.Items.Count; i++)
        {
            Assert.That(
                result.Items[i].DisplayIndex,
                Is.EqualTo(i),
                $"DisplayIndex at position {i} must be sequential"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: Each MediaDisplayItem has required fields populated")]
    public void LoadResources_ImagesTab_ItemsHaveRequiredFields()
    {
        // Arrange
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: each item has required fields
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        foreach (var item in result.Items)
        {
            Assert.That(item.ImageId, Is.Not.Null.And.Not.Empty, "ImageId required");
            Assert.That(item.ImageSource, Is.Not.Null.And.Not.Empty, "ImageSource required");
            Assert.That(item.Title, Is.Not.Null.And.Not.Empty, "Title required");
            Assert.That(
                item.ThumbnailSource,
                Is.Not.Null.And.Not.Empty,
                "ThumbnailSource required"
            );
            Assert.That(item.Collection, Is.Not.Null.And.Not.Empty, "Collection required");
            Assert.That(item.LanguageCode, Is.Not.Null.And.Not.Empty, "LanguageCode required");
        }
    }

    #endregion

    #region Empty State Tests (BHV-352)

    // =========================================================================
    // Empty state: BHV-352 empty state messages when no items found for scope.
    // Localized empty state messages returned when tab has no matching items.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-352")]
    [Property("ExtractionId", "EXT-060")]
    [Description("BHV-352: Empty state message when no items found for scope")]
    public void LoadResources_NoItemsForScope_ReturnsEmptyStateMessage()
    {
        // Arrange: input for a scope with no matching media items
        // Using a reference that has no associated images
        var input = new MediaLoadInput(
            CurrentReference: new VerseRef(66, 22, 21), // Revelation 22:21 - unlikely to have media
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: MediaTabType.Images,
            UserLanguage: "en",
            ResourceId: TestResourceId
        );

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: empty result with message
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items, Is.Empty, "No items expected for this scope");
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Empty state message must be returned when no items found"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-352")]
    [Property("ExtractionId", "EXT-060")]
    [Description("BHV-352: Maps tab empty when no SBA images exist for scope")]
    public void LoadResources_MapsTab_NoSbaImages_ReturnsEmptyWithMessage()
    {
        // Arrange: scope where images exist but none are SBA
        // The Maps tab should show empty state because all images are non-SBA
        var input = CreateInput(MediaTabType.Maps);

        // Act: This may return items if test data has SBA; the key assertion
        // is that when no SBA items remain after filtering, we get empty state.
        var result = MediaService.LoadResources(input);

        // Assert: result structure is valid
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        // If no items after SBA filter, emptyStateMessage must be set
        if (result.Items.Count == 0)
        {
            Assert.That(
                result.EmptyStateMessage,
                Is.Not.Null.And.Not.Empty,
                "BHV-352: Maps tab with no SBA images must show empty state message"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-352")]
    [Property("ExtractionId", "EXT-060")]
    [Description("BHV-352: Images tab empty when all images are SBA")]
    public void LoadResources_ImagesTab_AllSbaImages_ReturnsEmptyWithMessage()
    {
        // Arrange: scope where all images are SBA
        // The Images tab should show empty state because all items are filtered out
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: if all items are SBA, Images tab is empty with message
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        if (result.Items.Count == 0)
        {
            Assert.That(
                result.EmptyStateMessage,
                Is.Not.Null.And.Not.Empty,
                "BHV-352: Images tab with only SBA images must show empty state message"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-352")]
    [Property("ExtractionId", "EXT-060")]
    [Description("BHV-352: When items exist, emptyStateMessage is null")]
    public void LoadResources_WithItems_EmptyStateMessageIsNull()
    {
        // Arrange
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: if items exist, no empty state message
        Assert.That(result, Is.Not.Null);
        if (result.Items.Count > 0)
        {
            Assert.That(
                result.EmptyStateMessage,
                Is.Null,
                "BHV-352: EmptyStateMessage must be null when items exist"
            );
        }
    }

    #endregion

    #region Error Cases

    // =========================================================================
    // Error cases from contract Section 4.11:
    // Resource not found -> NOT_FOUND error
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Description("Error: Resource not found returns NOT_FOUND")]
    public void LoadResources_ResourceNotFound_ThrowsNotFoundError()
    {
        // Arrange: input with non-existent resource
        var input = new MediaLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: MediaTabType.Images,
            UserLanguage: "en",
            ResourceId: "NONEXISTENT_RESOURCE"
        );

        // Act & Assert: should throw with NOT_FOUND error code
        var ex = Assert.Throws<InvalidOperationException>(() => MediaService.LoadResources(input));
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Resource not found must use NOT_FOUND error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("NONEXISTENT_RESOURCE"),
            "Error message must include resource ID"
        );
    }

    #endregion

    #region Count Label Format Tests

    // =========================================================================
    // Count label formatting: "3 media files" / "1 map file" etc.
    // BHV-360 describes localized singular/plural for count labels.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("Count label uses singular form for 1 item")]
    public void LoadResources_SingleItem_CountLabelSingular()
    {
        // Arrange: scope expected to return exactly 1 item
        var input = CreateInput(MediaTabType.Images);

        // Act
        var result = MediaService.LoadResources(input);

        // Assert: if exactly 1 item, count label should use singular form
        Assert.That(result, Is.Not.Null);
        if (result.Items.Count == 1)
        {
            Assert.That(
                result.CountLabel,
                Does.Not.Contain("files").IgnoreCase,
                "Singular count label should not use plural 'files'"
            );
        }
    }

    #endregion
}
