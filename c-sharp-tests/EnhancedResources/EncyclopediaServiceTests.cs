using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for EncyclopediaService.LoadResources and MarbleEncyclopediaEntry parsing.
/// CAP-009 (LoadEncyclopediaResources), behaviors BHV-604, BHV-352, validation VAL-010.
///
/// Post-refactor: EncyclopediaService is an instance class taking EncyclopediaData
/// via primary constructor. Each test constructs its own service. See ADR
/// patterns.csharp.serviceComposition.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class EncyclopediaServiceTests
{
    /// <summary>
    /// Default service builder for the existing acceptance/contract suite. Uses the
    /// default fixture's EncyclopediaData (FAUNA: camel_001 V1 + camel_002 V2), the
    /// default book token provider (registers tokens at GEN 12:16 for both fauna
    /// resources), and the default marble data access service (gamal -> ["camel"]).
    /// </summary>
    private static EncyclopediaService NewService() =>
        BuildService(
            data: EncyclopediaFixtures.BuildEncyclopediaData(),
            bookTokens: EncyclopediaFixtures.BuildDefaultEncyclopediaBookTokens(),
            marbleData: EncyclopediaFixtures.BuildMarbleDataAccessService()
        );

    private static EncyclopediaService BuildService(
        EncyclopediaData? data = null,
        IMarbleBookTokenProvider? bookTokens = null,
        MarbleDataAccessService? marbleData = null
    ) =>
        new(
            data ?? EncyclopediaFixtures.BuildEncyclopediaData(),
            bookTokens ?? new FakeMarbleBookTokenProvider(),
            marbleData ?? EncyclopediaFixtures.BuildMarbleDataAccessService()
        );

    [Test]
    public void Constructor_AcceptsEncyclopediaData_CanInvokeLoadResources()
    {
        var data = EncyclopediaData.Empty with
        {
            KnownResourceIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "probe" },
        };

        var service = BuildService(data: data);

        // With no entries for "probe", LoadResources should return an empty result with
        // an empty-state message (not throw NOT_FOUND).
        var result = service.LoadResources(
            new EncyclopediaLoadInput(
                CurrentReference: new VerseRef(1, 1, 1),
                Scope: ScopeEnum.CurrentVerse,
                Filter: null,
                UserLanguage: "en",
                ResourceId: "probe"
            )
        );

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Description(
        "FU-CR2 regression: token with FAUNA thematic link drives Lemma/SourceText/Collection from token, not hardcoded values"
    )]
    public void LoadResources_TokenWithFaunaThematicLink_BuildsDisplayItemFromTokenAndEntryType()
    {
        var data = EncyclopediaFixtures.BuildEncyclopediaData();
        var tokens = EncyclopediaFixtures.BuildBookTokenProviderWithFaunaCamel(
            "test-fauna-resource",
            bookNum: 1
        );
        var marbleData = EncyclopediaFixtures.BuildMarbleDataAccessService();
        var service = new EncyclopediaService(data, tokens, marbleData);
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Has.Count.EqualTo(1));
        var item = result.Items[0];
        Assert.That(item.Lemma, Is.EqualTo("gamal"), "Lemma must come from token's LexicalLinks");
        Assert.That(item.SourceText, Is.EqualTo("gamal"));
        Assert.That(
            item.Collection,
            Is.EqualTo("FAUNA"),
            "Collection must come from thematic_links prefix"
        );
        Assert.That(item.Glosses, Has.Member("camel"));
        Assert.That(item.Entries, Has.Count.EqualTo(1));
        Assert.That(item.Entries[0].Key, Is.EqualTo("camel_001"));
        // ArticleId is the typed lookup key the caller passes back to readArticle.
        Assert.That(
            item.Entries[0].ArticleId,
            Is.EqualTo("FAUNA:camel_001"),
            "EntryRef.ArticleId must combine the encyclopedia type with the entry key"
        );
    }

    [Test]
    [Description(
        "Unknown thematic ID emits a stub EncyclopediaEntryRef with 'does not exist' title"
    )]
    public void LoadResources_TokenWithUnknownThematicId_EmitsStubEntryRef()
    {
        var data = EncyclopediaFixtures.BuildEncyclopediaData();
        var tokens = new FakeMarbleBookTokenProvider().With(
            "test-fauna-resource",
            1,
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "x",
                3,
                LexicalLinks: ["SDBH:x:001"],
                ThematicLinks: ["REALIA:unknown_999"]
            )
        );
        var marbleData = EncyclopediaFixtures.BuildMarbleDataAccessService();
        var service = new EncyclopediaService(data, tokens, marbleData);
        var input = new EncyclopediaLoadInput(
            new VerseRef(1, 1, 1),
            ScopeEnum.CurrentVerse,
            null,
            "en",
            "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Has.Count.EqualTo(1));
        Assert.That(result.Items[0].Entries[0].Title, Does.Contain("does not exist"));
    }

    #region Acceptance Tests

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Description("Acceptance gm-008: V1 encyclopedia entries parsed with Key/Title/paragraphs")]
    public void LoadEncyclopediaResources_V1Format_ReturnsItemsWithSectionsAndParagraphs()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items.Count, Is.GreaterThan(0), "gm-008: V1 should produce items");
        Assert.That(result.EmptyStateMessage, Is.Null);

        var firstItem = result.Items[0];
        Assert.That(firstItem.Entries, Is.Not.Null.And.Not.Empty);
        var entry = firstItem.Entries[0];
        Assert.That(entry.Key, Is.Not.Null.And.Not.Empty);
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Description("Acceptance gm-009: V2 encyclopedia entries parsed with Key/Title/BibleImageIds")]
    public void LoadEncyclopediaResources_V2Format_ReturnsItemsWithBibleImageIds()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource-v2"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items.Count, Is.GreaterThan(0));
        var itemsWithImages = result.Items.Where(i => i.ImageIds.Count > 0).ToList();
        Assert.That(
            itemsWithImages,
            Is.Not.Empty,
            "gm-009: V2 format should produce items with ImageIds"
        );
    }

    #endregion

    #region BHV-604 Service Contract

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-604")]
    [Description("BHV-604: LoadResources returns EncyclopediaDisplayItems with entries")]
    public void LoadResources_ReturnsDisplayItemsWithEntries()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(item.TokenId, Is.Not.Null.And.Not.Empty);
            Assert.That(item.Entries, Is.Not.Null);
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-604")]
    [Description("BHV-604: Language fallback to English when user language unavailable")]
    public void LoadResources_UserLanguageUnavailable_FallsBackToEnglish()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "xx-unavailable",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(
            result.Items,
            Is.Not.Empty,
            "Unknown user language should fall through to English slice"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-604")]
    [Description("BHV-604: DisplayItems carry Lemma/SourceText/Translit/Glosses")]
    public void LoadResources_DisplayItems_HaveLexicalData()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);
        var item = result.Items[0];

        Assert.That(item.Lemma, Is.Not.Null);
        Assert.That(item.SourceText, Is.Not.Null);
        Assert.That(item.Translit, Is.Not.Null);
        Assert.That(item.Glosses, Is.Not.Null);
        Assert.That(item.Collection, Is.Not.Null);
    }

    #endregion

    #region BHV-352 Empty State

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: Known resource with no entries returns empty state message")]
    public void LoadResources_NoEntriesForKnownResource_ReturnsEmptyStateMessage()
    {
        // test-empty-resource is in KnownResourceIds but has no entries in any type.
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-empty-resource"
        );

        // Force the "no entries" path: build a service whose only known-resource is
        // test-empty-resource but whose EntriesByTypeAndLanguage is empty.
        var emptyData = EncyclopediaFixtures.BuildEncyclopediaData() with
        {
            EntriesByTypeAndLanguage =
                new Dictionary<
                    EncyclopediaEntryType,
                    IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>
                >(),
        };
        var emptyService = BuildService(data: emptyData);

        var result = emptyService.LoadResources(input);

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: Filtered word not in results returns word-not-found message")]
    public void LoadResources_FilteredWordNotInRange_ReturnsWordNotFoundMessage()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: new WordFilterInput(
                TokenId: "token-123",
                Lemma: "nonexistent-lemma",
                Source: "test",
                Translit: "test",
                Senses: "",
                TargetLinks: "",
                ClickOrigin: FilterClickOrigin.ScripturePane
            ),
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Does.Contain("nonexistent-lemma"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: Items exist => EmptyStateMessage is null")]
    public void LoadResources_WithItems_EmptyStateMessageIsNull()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        Assert.That(result.EmptyStateMessage, Is.Null);
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Description("Error: Resource not found returns NOT_FOUND error")]
    public void LoadResources_ResourceNotFound_ThrowsNotFoundError()
    {
        var service = NewService();
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "nonexistent-resource"
        );

        var ex = Assert.Throws<InvalidOperationException>(() => service.LoadResources(input));
        Assert.That(ex!.Message, Does.Contain("not found").IgnoreCase);
    }

    #endregion

    #region Entry-Parser Golden Master Tests (EXT-014)

    // These tests use MarbleEncyclopediaEntry directly — no service needed.

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-008")]
    [Description("gm-008: V1 Camel entry 2.8 parsed with sections")]
    public void ParseV1_CamelEntry_HasSectionsWithParagraphs()
    {
        var entry = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V1CamelEntryXml);

        Assert.That(entry.Key, Is.EqualTo("2.8"));
        Assert.That(entry.Title, Is.EqualTo("Camel, dromedary"));
        Assert.That(entry.Paragraphs, Is.Not.Null);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-008")]
    [Description("gm-008: V1 entry has no BibleImageIds (inline |f...|f* only)")]
    public void ParseV1_Entry_HasNoBibleImages()
    {
        var entry = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V1CamelEntryXml);

        Assert.That(entry.BibleImageIds, Is.Empty);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-009")]
    [Description("gm-009: V2 Camel entry 2.8 extracts BibleImageIds")]
    public void ParseV2_CamelEntry_HasBibleImageIds()
    {
        var entry = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V2CamelEntryXml);

        Assert.That(entry.Key, Is.EqualTo("2.8"));
        Assert.That(entry.BibleImageIds, Does.Contain("Dromedary"));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-008")]
    [Description("gm-008: Full V1 XML parses two entries")]
    public void ParseFullV1Xml_TwoEntries_BothParsedCorrectly()
    {
        var entries = MarbleEncyclopediaEntry.ParseAll(EncyclopediaFixtures.V1FaunaXml);

        Assert.That(entries.Count, Is.EqualTo(2));
        Assert.That(entries[0].Key, Is.EqualTo("0"));
        Assert.That(entries[1].Key, Is.EqualTo("2.8"));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-009")]
    [Description("gm-009: Full V2 XML parses two entries, Camel has BibleImageIds")]
    public void ParseFullV2Xml_TwoEntries_BothParsedCorrectly()
    {
        var entries = MarbleEncyclopediaEntry.ParseAll(EncyclopediaFixtures.V2FaunaXml);

        Assert.That(entries.Count, Is.EqualTo(2));
        Assert.That(entries[0].Key, Is.EqualTo("0"));
        Assert.That(entries[1].Key, Is.EqualTo("2.8"));
        Assert.That(entries[1].BibleImageIds, Is.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ValidationRule", "VAL-010")]
    [Description("VAL-010: Both V1 and V2 formats extract Key and Title correctly")]
    public void ParseEntry_BothFormats_ExtractKeyAndTitle()
    {
        var v1 = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V1CamelEntryXml);
        var v2 = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V2CamelEntryXml);

        Assert.That(v1.Key, Is.EqualTo("2.8"));
        Assert.That(v2.Key, Is.EqualTo("2.8"));
        Assert.That(v1.Title, Is.EqualTo("Camel, dromedary"));
        Assert.That(v2.Title, Is.EqualTo("Camel, dromedary"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ValidationRule", "VAL-010")]
    [Description("VAL-010: Unrecognized format structure does not throw")]
    public void ParseEntry_UnrecognizedFormatVersion_DoesNotThrow()
    {
        const string malformedXml =
            @"<ThemLex_Entry Key=""1.1"">
    <Title>Unknown Format</Title>
    <UnrecognizedElement>data</UnrecognizedElement>
  </ThemLex_Entry>";

        Assert.DoesNotThrow(() => new MarbleEncyclopediaEntry(malformedXml));
    }

    #endregion

    #region Record Structure Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Description("EncyclopediaEntryRef carries required fields")]
    public void EntryRef_FromV1Entry_HasRequiredFields()
    {
        var entry = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V1CamelEntryXml);

        var entryRef = new EncyclopediaEntryRef(
            ArticleId: $"FAUNA:{entry.Key}",
            Key: entry.Key,
            Title: entry.Title,
            TeaserText: "Preview text",
            FormatVersion: 1
        );

        Assert.That(entryRef.Key, Is.EqualTo("2.8"));
        Assert.That(entryRef.Title, Is.EqualTo("Camel, dromedary"));
        Assert.That(entryRef.FormatVersion, Is.EqualTo(1));
        Assert.That(entryRef.InlineImageIds, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Description("EncyclopediaEntryRef for V2 includes InlineImageIds")]
    public void EntryRef_FromV2Entry_HasInlineImageIds()
    {
        var entry = new MarbleEncyclopediaEntry(EncyclopediaFixtures.V2CamelEntryXml);

        var entryRef = new EncyclopediaEntryRef(
            ArticleId: $"FAUNA:{entry.Key}",
            Key: entry.Key,
            Title: entry.Title,
            TeaserText: "Preview text",
            FormatVersion: 2,
            InlineImageIds: entry.BibleImageIds
        );

        Assert.That(entryRef.FormatVersion, Is.EqualTo(2));
        Assert.That(entryRef.InlineImageIds, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Description("EncyclopediaDisplayItem carries all required fields")]
    public void DisplayItem_Construction_HasAllRequiredFields()
    {
        var item = new EncyclopediaDisplayItem(
            TokenId: "token-001",
            Lemma: "gamal",
            SourceText: "gamal",
            Translit: "gamal",
            Glosses: new List<string> { "camel" },
            Entries: new List<EncyclopediaEntryRef>
            {
                new(
                    ArticleId: "FAUNA:2.8",
                    Key: "2.8",
                    Title: "Camel, dromedary",
                    TeaserText: "The camel...",
                    FormatVersion: 1
                ),
            },
            ImageIds: new List<string>(),
            Collection: "FAUNA"
        );

        Assert.That(item.TokenId, Is.EqualTo("token-001"));
        Assert.That(item.Lemma, Is.EqualTo("gamal"));
        Assert.That(item.Glosses, Has.Count.EqualTo(1));
        Assert.That(item.Entries, Has.Count.EqualTo(1));
        Assert.That(item.Collection, Is.EqualTo("FAUNA"));
    }

    #endregion
}
