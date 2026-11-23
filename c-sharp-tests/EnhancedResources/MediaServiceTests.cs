using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for <see cref="MediaService.LoadResources"/> and
/// <see cref="MediaService.InvalidImageForTab"/>. CAP-011 (LoadMediaResources).
/// Behaviors: BHV-359 (SBA filter), BHV-352 (empty-state messages).
/// Golden Master: gm-018 (SBA filter routing).
///
/// Post-refactor: MediaService is an instance class taking MediaData via primary
/// constructor. Each test constructs its own service. InvalidImageForTab stays
/// static. See ADR patterns.csharp.serviceComposition.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MediaServiceTests
{
    private const string SatelliteBibleAtlas = "Satellite Bible Atlas";
    private const string GeneralCollection = "General";
    private const string TestResourceId = "SDBG";

    private static MediaService NewService() => new(MediaFixtures.BuildMediaData());

    private static MediaLoadInput CreateInput(
        MediaTabType tabType,
        int bookNum = 40,
        int chapterNum = 1,
        int verseNum = 1
    ) =>
        new(
            CurrentReference: new VerseRef(bookNum, chapterNum, verseNum),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: tabType,
            UserLanguage: "en",
            ResourceId: TestResourceId
        );

    [Test]
    public void Constructor_AcceptsMediaData_CanInvokeLoadResources()
    {
        var data = MediaData.Empty with
        {
            KnownResourceIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "probe" },
        };

        var service = new MediaService(data);

        var result = service.LoadResources(
            new MediaLoadInput(
                CurrentReference: new VerseRef(1, 1, 1),
                Scope: ScopeEnum.CurrentVerse,
                Filter: null,
                TabType: MediaTabType.Images,
                UserLanguage: "en",
                ResourceId: "probe"
            )
        );

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    #region InvalidImageForTab (gm-018, EXT-067)

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-359")]
    [Property("GoldenMasterId", "gm-018")]
    [Description("gm-018: InvalidImageForTab routes SBA to Maps, excludes from Images")]
    public void InvalidImageForTab_GoldenMaster_AllFourCasesMatch()
    {
        Assert.That(
            MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Images),
            Is.False
        );
        Assert.That(
            MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Images),
            Is.True
        );
        Assert.That(MediaService.InvalidImageForTab(GeneralCollection, MediaTabType.Maps), Is.True);
        Assert.That(
            MediaService.InvalidImageForTab(SatelliteBibleAtlas, MediaTabType.Maps),
            Is.False
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Filter is case-sensitive string comparison")]
    public void InvalidImageForTab_CaseSensitive_SbaVariant_TreatedAsNonSba()
    {
        Assert.That(
            MediaService.InvalidImageForTab("satellite bible atlas", MediaTabType.Images),
            Is.False
        );
        Assert.That(
            MediaService.InvalidImageForTab("satellite bible atlas", MediaTabType.Maps),
            Is.True
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-067")]
    [Description("EXT-067: Other named collections behave like General")]
    public void InvalidImageForTab_OtherCollection_ImagesValid_MapsInvalid()
    {
        Assert.That(
            MediaService.InvalidImageForTab("Bible Illustrations", MediaTabType.Images),
            Is.False
        );
        Assert.That(
            MediaService.InvalidImageForTab("Bible Illustrations", MediaTabType.Maps),
            Is.True
        );
    }

    #endregion

    #region LoadResources - Acceptance

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Description("LoadMediaResources for Images tab excludes Satellite Bible Atlas items")]
    public void LoadMediaResources_ImagesTab_ExcludesSatelliteBibleAtlas()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        Assert.That(result.Items, Is.Not.Empty);
        Assert.That(result.Items.All(item => item.Collection != SatelliteBibleAtlas), Is.True);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Description("LoadMediaResources for Maps tab includes only Satellite Bible Atlas items")]
    public void LoadMediaResources_MapsTab_IncludesOnlySatelliteBibleAtlas()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Maps));

        if (result.Items.Count > 0)
        {
            Assert.That(result.Items.All(item => item.Collection == SatelliteBibleAtlas), Is.True);
        }
    }

    #endregion

    #region LoadResources - Contract (EXT-060)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: Images tab returns items with correct count label")]
    public void LoadResources_ImagesTab_ReturnsItemsWithCountLabel()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        Assert.That(result.CountLabel, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: DisplayIndex assigned sequentially from 0")]
    public void LoadResources_ImagesTab_DisplayIndexAssignedSequentially()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        for (int i = 0; i < result.Items.Count; i++)
        {
            Assert.That(result.Items[i].DisplayIndex, Is.EqualTo(i));
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Property("ExtractionId", "EXT-060")]
    [Description("EXT-060: Each MediaDisplayItem has required fields")]
    public void LoadResources_ImagesTab_ItemsHaveRequiredFields()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        foreach (var item in result.Items)
        {
            Assert.That(item.ImageId, Is.Not.Null.And.Not.Empty);
            Assert.That(item.ImageSource, Is.Not.Null.And.Not.Empty);
            Assert.That(item.Title, Is.Not.Null.And.Not.Empty);
            Assert.That(item.ThumbnailSource, Is.Not.Null.And.Not.Empty);
            Assert.That(item.Collection, Is.Not.Null.And.Not.Empty);
            Assert.That(item.LanguageCode, Is.Not.Null.And.Not.Empty);
        }
    }

    #endregion

    #region Empty State (BHV-352)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: No items for scope returns empty-state message")]
    public void LoadResources_NoItemsForScope_ReturnsEmptyStateMessage()
    {
        var service = NewService();
        var input = new MediaLoadInput(
            CurrentReference: new VerseRef(66, 22, 21),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: MediaTabType.Images,
            UserLanguage: "en",
            ResourceId: TestResourceId
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: Items exist => EmptyStateMessage is null")]
    public void LoadResources_WithItems_EmptyStateMessageIsNull()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        if (result.Items.Count > 0)
        {
            Assert.That(result.EmptyStateMessage, Is.Null);
        }
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Description("Error: Resource not found returns NOT_FOUND")]
    public void LoadResources_ResourceNotFound_ThrowsNotFoundError()
    {
        var service = NewService();
        var input = new MediaLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            TabType: MediaTabType.Images,
            UserLanguage: "en",
            ResourceId: "NONEXISTENT_RESOURCE"
        );

        var ex = Assert.Throws<InvalidOperationException>(() => service.LoadResources(input));
        Assert.That(ex!.Data["platformErrorCode"], Is.EqualTo("NOT_FOUND"));
        Assert.That(ex.Message, Does.Contain("NONEXISTENT_RESOURCE"));
    }

    #endregion

    #region Count Label

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Description("Count label uses singular form for 1 item")]
    public void LoadResources_SingleItem_CountLabelSingular()
    {
        var data = MediaFixtures.BuildMediaData() with
        {
            Images = new List<MediaDisplayItem>
            {
                new(
                    ImageId: "one",
                    ImageSource: "a",
                    Title: "a",
                    ThumbnailSource: "a",
                    StartRef: new VerseRef(40, 1, 1),
                    EndRef: new VerseRef(40, 1, 25),
                    Collection: "General",
                    LanguageCode: "en",
                    DisplayIndex: 0
                ),
            },
        };
        var service = new MediaService(data);

        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        Assert.That(result.Items.Count, Is.EqualTo(1));
        Assert.That(result.CountLabel, Does.Not.Contain("files").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-359")]
    [Description("Count label uses plural form for multiple items")]
    public void LoadResources_MultipleItems_CountLabelPlural()
    {
        var service = NewService();
        var result = service.LoadResources(CreateInput(MediaTabType.Images));

        if (result.Items.Count > 1)
        {
            Assert.That(result.CountLabel, Does.Contain("files"));
        }
    }

    #endregion
}
