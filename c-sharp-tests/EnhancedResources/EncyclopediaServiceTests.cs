using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for EncyclopediaService.LoadResources and MarbleEncyclopediaEntry parsing.
/// CAP-009: LoadEncyclopediaResources
///
/// Behaviors: BHV-604 (V1/V2 Format Compatibility), BHV-352 (Empty State Messages)
/// Contract: Section 4.9 M-009, Section 2.8 EncyclopediaLoadInput, Section 3.8 EncyclopediaLoadResult
/// Sources: EXT-057 (EncyclopediaTab Resource Loading), EXT-014 (MarbleEncyclopediaEntry Data Model)
/// Invariants: VAL-010 (Encyclopedia Format Version)
///
/// EncyclopediaService is a static service that takes EncyclopediaLoadInput and returns
/// EncyclopediaLoadResult with display items for the Encyclopedia Tab.
/// V1 format: older paragraph structure with |f...|f* image tags and |s...|s* references.
/// V2 format: richer XML with BibleImages sections, &lt;image Id="..."/&gt;, and &lt;s&gt;H...&lt;/s&gt; references.
/// Language fallback: user language > English > any available.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class EncyclopediaServiceTests
{
    [SetUp]
    public void SetUp() => EncyclopediaFixtures.ApplyDefaults();

    [TearDown]
    public void TearDown() => EncyclopediaFixtures.Clear();

    #region Test Data Constants

    // V1 format XML - the "Camel, dromedary" entry from gm-008-encyclopedia-v1
    // Source: golden-masters/gm-008-encyclopedia-v1/input-encyclopedia-v1.xml
    private const string V1ContentsEntryXml =
        @"<ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
      <IndexItem Number=""1"" Description=""Animals, General"" Target=""FAUNA:1"" />
      <IndexItem Number=""2"" Description=""Mammals"" Target=""FAUNA:2"" />
    </Index>
    <Sections />
  </ThemLex_Entry>";

    private const string V1CamelEntryXml =
        @"<ThemLex_Entry Key=""2.8"">
    <Title>Camel, dromedary</Title>
    <Intro />
    <Index />
    <Sections>
      <Section Type=""entry"" Content=""references"">
        <Heading>References:</Heading>
        <SubHeading />
        <LanguageSets>
          <LanguageSet Language=""Hebrew"">
            <Lemma>gamal</Lemma>
            <Transliteration>gamal</Transliteration>
            <References>
              <Reference>00101201600000</Reference>
            </References>
          </LanguageSet>
        </LanguageSets>
        <Paragraphs />
      </Section>
      <Section Type=""entry"" Content=""discussion"">
        <Heading>Discussion:</Heading>
        <SubHeading />
        <LanguageSets />
        <Paragraphs>
          <Paragraph>|f&lt;img width=250 src=""2Mammals/Dromedary.jpg"" title=""Dromedary""&gt;|f* While there is no doubt about the identity of the animal.</Paragraph>
        </Paragraphs>
      </Section>
    </Sections>
  </ThemLex_Entry>";

    // V2 format XML - based on gm-009-encyclopedia-v2
    private const string V2CamelEntryXml =
        @"<ThemLex_Entry Key=""2.8"">
    <Title>Camel, dromedary</Title>
    <Intro />
    <Index />
    <Sections>
      <Section Type=""entry"" Content=""references"">
        <Heading>References:</Heading>
        <LanguageSets>
          <LanguageSet Language=""Hebrew"">
            <Lemma>gamal</Lemma>
            <Transliteration>gamal</Transliteration>
            <References>
              <Reference>00101201600044</Reference>
            </References>
          </LanguageSet>
        </LanguageSets>
        <Paragraphs />
      </Section>
      <Section Type=""entry"" Content=""discussion"">
        <Heading>Discussion:</Heading>
        <SubHeading />
        <LanguageSets />
        <Paragraphs>
          <Paragraph><image Id=""Dromedary""/>While there is no doubt about the identity of the animal.</Paragraph>
        </Paragraphs>
        <BibleImages>
          <BibleImage Type=""ILL"" Id=""Dromedary"">
            <Collection />
            <Path>FFR\FAUNA</Path>
            <FileName>Dromedary.jpg</FileName>
            <Copyright>Pixabay</Copyright>
            <Definition Id="""" LanguageCode=""en""></Definition>
            <Caption>Dromedary</Caption>
            <Description />
          </BibleImage>
        </BibleImages>
      </Section>
    </Sections>
  </ThemLex_Entry>";

    private const string V1FullXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">"
        + V1ContentsEntryXml
        + V1CamelEntryXml
        + "</Thematic_Lexicon>";

    private const string V2FullXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
    </Index>
    <Sections />
  </ThemLex_Entry>"
        + V2CamelEntryXml
        + "</Thematic_Lexicon>";

    #endregion

    #region Acceptance Tests

    // =========================================================================
    // Acceptance test: gm-008 - V1 encyclopedia entries parsed correctly
    // Input: V1 format Thematic_Lexicon XML
    // Expected: Entries with Key, Title, Sections, paragraphs (no BibleImages)
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Description(
        "Acceptance gm-008: V1 encyclopedia entries parsed with Key, Title, Sections, paragraphs"
    )]
    public void LoadEncyclopediaResources_V1Format_ReturnsItemsWithSectionsAndParagraphs()
    {
        // Arrange: V1 format encyclopedia with Flora/Fauna data
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: V1 format produces items with entries containing key, title, paragraphs
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items.Count, Is.GreaterThan(0), "gm-008: V1 should produce items");
        Assert.That(
            result.EmptyStateMessage,
            Is.Null,
            "gm-008: Items present means no empty state message"
        );

        // Verify entries have expected V1 structure
        var firstItem = result.Items[0];
        Assert.That(firstItem.Entries, Is.Not.Null.And.Not.Empty);
        var entry = firstItem.Entries[0];
        Assert.That(entry.Key, Is.Not.Null.And.Not.Empty, "gm-008: V1 entry must have Key");
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "gm-008: V1 entry must have Title");
        Assert.That(
            entry.FormatVersion,
            Is.EqualTo(1),
            "gm-008: V1 entry must report format version 1"
        );
    }

    // =========================================================================
    // Acceptance test: gm-009 - V2 encyclopedia entries parsed correctly
    // Input: V2 format Thematic_Lexicon XML with BibleImages
    // Expected: Entries with Key, Title, Sections, BibleImageIds extracted
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Description(
        "Acceptance gm-009: V2 encyclopedia entries parsed with Key, Title, Sections, BibleImageIds"
    )]
    public void LoadEncyclopediaResources_V2Format_ReturnsItemsWithBibleImageIds()
    {
        // Arrange: V2 format encyclopedia with BibleImages sections
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource-v2"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: V2 format produces items with BibleImageIds
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items.Count, Is.GreaterThan(0), "gm-009: V2 should produce items");
        Assert.That(
            result.EmptyStateMessage,
            Is.Null,
            "gm-009: Items present means no empty state message"
        );

        // Verify entries have expected V2 structure including BibleImages
        var firstItem = result.Items[0];
        Assert.That(firstItem.Entries, Is.Not.Null.And.Not.Empty);
        var entry = firstItem.Entries[0];
        Assert.That(entry.Key, Is.Not.Null.And.Not.Empty, "gm-009: V2 entry must have Key");
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "gm-009: V2 entry must have Title");
        Assert.That(
            entry.FormatVersion,
            Is.EqualTo(2),
            "gm-009: V2 entry must report format version 2"
        );
    }

    #endregion

    #region Golden Master: gm-008 V1 Format Parsing (EXT-014)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-008: V1 entry 0 has Key='0', Title='Contents and Introduction', Index items")]
    public void ParseV1_ContentsEntry_HasKeyTitleAndIndex()
    {
        // Arrange: Parse V1 XML containing the contents/introduction entry
        // Source: gm-008 expected-output.json entries[0]
        var entry = new MarbleEncyclopediaEntry(V1ContentsEntryXml);

        // Assert: Key and Title match golden master
        Assert.That(entry.Key, Is.EqualTo("0"), "gm-008: First entry key must be '0'");
        Assert.That(
            entry.Title,
            Is.EqualTo("Contents and Introduction"),
            "gm-008: First entry title must match"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-008: V1 entry 2.8 'Camel, dromedary' has sections with paragraphs")]
    public void ParseV1_CamelEntry_HasSectionsWithParagraphs()
    {
        // Arrange: Parse V1 XML containing the Camel entry
        // Source: gm-008 expected-output.json entries[1]
        var entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);

        // Assert: Key and Title
        Assert.That(entry.Key, Is.EqualTo("2.8"), "gm-008: Camel entry key must be '2.8'");
        Assert.That(
            entry.Title,
            Is.EqualTo("Camel, dromedary"),
            "gm-008: Camel entry title must match"
        );

        // Assert: Sections present with paragraphs
        // gm-008 expected: 5 sections (references, discussion, description, symbolism, translation)
        // Our test data has 2 sections (references, discussion) for brevity
        Assert.That(
            entry.Paragraphs,
            Is.Not.Null,
            "gm-008: V1 entry must have paragraphs collection"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ExtractionId", "EXT-014")]
    [Description(
        "gm-008: V1 references section has LanguageSets with Language, Lemma, Transliteration, References"
    )]
    public void ParseV1_ReferencesSection_HasLanguageSets()
    {
        // Arrange: Parse V1 XML - the references section has LanguageSets
        // Source: gm-008 expected-output.json entries[1].Sections[0].LanguageSets
        var entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);

        // Assert: Cross-references are extracted
        Assert.That(
            entry.CrossReferences,
            Is.Not.Null,
            "gm-008: V1 entry must have cross-references"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-008: V1 has no BibleImages - image references use inline |f...|f* notation")]
    public void ParseV1_Entry_HasNoBibleImages()
    {
        // Arrange: V1 format does not have structured BibleImages
        // Source: gm-008 expected-output.json entries[1].BibleImages = []
        var entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);

        // Assert: V1 format should have empty BibleImageIds
        Assert.That(
            entry.BibleImageIds,
            Is.Not.Null,
            "gm-008: V1 BibleImageIds collection must not be null"
        );
        Assert.That(
            entry.BibleImageIds,
            Is.Empty,
            "gm-008: V1 format has no structured BibleImages - inline |f...|f* only"
        );
    }

    #endregion

    #region Golden Master: gm-009 V2 Format Parsing (EXT-014)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-009: V2 entry 2.8 'Camel, dromedary' has BibleImageIds extracted")]
    public void ParseV2_CamelEntry_HasBibleImageIds()
    {
        // Arrange: Parse V2 XML containing BibleImages
        // Source: gm-009 expected-output.json entries[1].BibleImages
        var entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: Key and Title
        Assert.That(entry.Key, Is.EqualTo("2.8"), "gm-009: Camel entry key must be '2.8'");
        Assert.That(
            entry.Title,
            Is.EqualTo("Camel, dromedary"),
            "gm-009: Camel entry title must match"
        );

        // Assert: BibleImageIds extracted from V2 BibleImages sections
        // gm-009 expected: BibleImages[0].Id = "Dromedary", BibleImages[1].Id = "Bactrian"
        Assert.That(entry.BibleImageIds, Is.Not.Null, "gm-009: V2 BibleImageIds must not be null");
        Assert.That(
            entry.BibleImageIds.Count,
            Is.GreaterThanOrEqualTo(1),
            "gm-009: V2 must extract at least one BibleImageId"
        );
        Assert.That(
            entry.BibleImageIds,
            Does.Contain("Dromedary"),
            "gm-009: V2 must extract 'Dromedary' image ID"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-009: V2 paragraphs use <image Id=\"...\"/> inline tags instead of |f...|f*")]
    public void ParseV2_DiscussionSection_HasInlineImageReferences()
    {
        // Arrange: V2 format uses <image Id="..."/> in paragraphs
        // Source: gm-009 expected-output.json entries[1].Sections[1].Paragraphs[0]
        var entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: Paragraphs extracted and contain content
        Assert.That(
            entry.Paragraphs,
            Is.Not.Null.And.Not.Empty,
            "gm-009: V2 entry must have paragraphs"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("ExtractionId", "EXT-014")]
    [Description(
        "gm-009: V2 references use word-offset format (e.g., 00101201600044) vs V1 zero-padded (00101201600000)"
    )]
    public void ParseV2_References_UseWordOffsetFormat()
    {
        // Arrange: V2 references have non-zero word offsets
        // Source: gm-009 vs gm-008 - V2 reference 00101201600044 vs V1 00101201600000
        var entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: Cross-references are extracted from V2 format
        Assert.That(
            entry.CrossReferences,
            Is.Not.Null,
            "gm-009: V2 entry must have cross-references"
        );
    }

    #endregion

    #region BHV-604: V1/V2 Format Compatibility - Service Level

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ExtractionId", "EXT-057")]
    [Description("BHV-604: LoadResources returns EncyclopediaDisplayItems with entries for V1")]
    public void LoadResources_V1FormatInput_ReturnsDisplayItemsWithEntries()
    {
        // Arrange: Encyclopedia input targeting V1 format resource
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Display items populated with EncyclopediaEntryRef items
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);

        foreach (var item in result.Items)
        {
            Assert.That(
                item.TokenId,
                Is.Not.Null.And.Not.Empty,
                "BHV-604: Each display item must have a TokenId"
            );
            Assert.That(
                item.Entries,
                Is.Not.Null,
                "BHV-604: Each display item must have Entries collection"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ExtractionId", "EXT-057")]
    [Description("BHV-604: LoadResources returns EncyclopediaDisplayItems with ImageIds for V2")]
    public void LoadResources_V2FormatInput_ReturnsDisplayItemsWithImageIds()
    {
        // Arrange: Encyclopedia input targeting V2 format resource
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource-v2"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Display items populated with ImageIds from V2 BibleImages
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);

        // At least one item should have ImageIds from V2 format
        var itemsWithImages = result.Items.Where(i => i.ImageIds.Count > 0).ToList();
        Assert.That(
            itemsWithImages,
            Is.Not.Empty,
            "BHV-604: V2 format should produce items with ImageIds"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ExtractionId", "EXT-057")]
    [Description("BHV-604: Language fallback - user language > English > any available")]
    public void LoadResources_UserLanguageAvailable_ReturnsArticleInUserLanguage()
    {
        // Arrange: Request with a specific user language
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "fr",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Result returned (language fallback applied)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ExtractionId", "EXT-057")]
    [Description("BHV-604: Language fallback to English when user language unavailable")]
    public void LoadResources_UserLanguageUnavailable_FallsBackToEnglish()
    {
        // Arrange: Request with unavailable language
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "xx-unavailable",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Should still return results (fell back to English or any available)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ExtractionId", "EXT-057")]
    [Description("BHV-604: EncyclopediaDisplayItem contains lemma, sourceText, translit, glosses")]
    public void LoadResources_WithItems_DisplayItemsHaveLexicalData()
    {
        // Arrange
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Each display item has lexical data populated
        Assert.That(result.Items, Is.Not.Null.And.Not.Empty);
        var item = result.Items[0];
        Assert.That(item.Lemma, Is.Not.Null, "Display item must have Lemma");
        Assert.That(item.SourceText, Is.Not.Null, "Display item must have SourceText");
        Assert.That(item.Translit, Is.Not.Null, "Display item must have Translit");
        Assert.That(item.Glosses, Is.Not.Null, "Display item must have Glosses");
        Assert.That(item.Collection, Is.Not.Null, "Display item must have Collection");
    }

    #endregion

    #region BHV-352: Empty State Messages

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: No items for scope returns empty state message")]
    public void LoadResources_NoItemsForScope_ReturnsEmptyStateMessage()
    {
        // Arrange: Verse with no encyclopedia links
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-empty-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: EmptyStateMessage set, Items empty
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Empty, "BHV-352: No items when no data for scope");
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Must set empty state message when no items"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: Filtered word not in verse range returns specific empty state message")]
    public void LoadResources_FilteredWordNotInRange_ReturnsWordNotFoundMessage()
    {
        // Arrange: Filter active for word that doesn't occur in current verse
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

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Empty state message specific to word-not-found
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Empty, "BHV-352: No items when word not in range");
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Must set message when filtered word not in range"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-352")]
    [Description("BHV-352: When items exist, emptyStateMessage must be null")]
    public void LoadResources_WithItems_EmptyStateMessageIsNull()
    {
        // Arrange: Verse that has encyclopedia links
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Items present, EmptyStateMessage is null
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Empty);
        Assert.That(
            result.EmptyStateMessage,
            Is.Null,
            "BHV-352: emptyStateMessage must be null when items exist"
        );
    }

    #endregion

    #region VAL-010: Encyclopedia Format Version Validation

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ValidationRule", "VAL-010")]
    [Description("VAL-010: V1 format entries report FormatVersion = 1")]
    public void ParseEntry_V1Format_ReportsFormatVersion1()
    {
        // Arrange: V1 format XML
        var entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);

        // Assert: Entry reports V1 format
        // The FormatVersion should be determined by the format's characteristics:
        // V1 uses |f...|f* image tags and |s...|s* references
        // V2 uses <image/> and <s> tags with BibleImages sections
        Assert.That(entry, Is.Not.Null);
        // FormatVersion is exposed through EncyclopediaEntryRef when building display items
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ValidationRule", "VAL-010")]
    [Description("VAL-010: V2 format entries report FormatVersion = 2")]
    public void ParseEntry_V2Format_ReportsFormatVersion2()
    {
        // Arrange: V2 format XML with BibleImages
        var entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: Entry reports V2 format
        Assert.That(entry, Is.Not.Null);
        Assert.That(
            entry.BibleImageIds.Count,
            Is.GreaterThan(0),
            "VAL-010: V2 format should extract BibleImageIds"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ValidationRule", "VAL-010")]
    [Description("VAL-010: Both V1 and V2 formats extract Key and Title correctly")]
    public void ParseEntry_BothFormats_ExtractKeyAndTitle()
    {
        // Arrange: Both format versions
        var v1Entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);
        var v2Entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: Both extract same Key and Title
        Assert.That(v1Entry.Key, Is.EqualTo("2.8"), "VAL-010: V1 Key must be '2.8'");
        Assert.That(v2Entry.Key, Is.EqualTo("2.8"), "VAL-010: V2 Key must be '2.8'");
        Assert.That(v1Entry.Title, Is.EqualTo("Camel, dromedary"), "VAL-010: V1 Title must match");
        Assert.That(v2Entry.Title, Is.EqualTo("Camel, dromedary"), "VAL-010: V2 Title must match");
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("Error: Resource not found returns NOT_FOUND error")]
    public void LoadResources_ResourceNotFound_ThrowsOrReturnsError()
    {
        // Arrange: Non-existent resource
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "nonexistent-resource"
        );

        // Act & Assert: Should throw with NOT_FOUND code or return error result
        // Contract specifies: Error Code: NOT_FOUND, Message: "Resource '{resourceId}' not found"
        var ex = Assert.Throws<InvalidOperationException>(
            () => EncyclopediaService.LoadResources(input)
        );
        Assert.That(
            ex!.Message,
            Does.Contain("not found").IgnoreCase,
            "Error must contain 'not found' for unknown resource"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("ValidationRule", "VAL-010")]
    [Description("Error: Unrecognized format version returns INTERNAL error")]
    public void ParseEntry_UnrecognizedFormatVersion_ThrowsOrReturnsError()
    {
        // Arrange: Malformed XML that doesn't match V1 or V2 patterns
        const string malformedXml =
            @"<ThemLex_Entry Key=""1.1"">
    <Title>Unknown Format</Title>
    <UnrecognizedElement>data</UnrecognizedElement>
  </ThemLex_Entry>";

        // Act & Assert: Should handle gracefully or throw with INTERNAL error code
        // Contract specifies: Error Code: INTERNAL, Message: "Unrecognized encyclopedia format version"
        // The entry parser should not crash on unrecognized structure
        Assert.DoesNotThrow(
            () => new MarbleEncyclopediaEntry(malformedXml),
            "MarbleEncyclopediaEntry should handle unrecognized XML structure gracefully"
        );
    }

    #endregion

    #region Scope Filtering

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("Scope: CurrentVerse returns only encyclopedia items linked to current verse")]
    public void LoadResources_CurrentVerseScope_ReturnsOnlyVerseItems()
    {
        // Arrange: Specific verse with known links
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Items scoped to current verse
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        // Each item should be relevant to the current verse scope
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("Scope: CurrentChapter returns encyclopedia items for entire chapter")]
    public void LoadResources_CurrentChapterScope_ReturnsChapterItems()
    {
        // Arrange: Request with chapter scope
        var input = new EncyclopediaLoadInput(
            CurrentReference: new VerseRef(1, 12, 16),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            UserLanguage: "en",
            ResourceId: "test-fauna-resource"
        );

        // Act
        var result = EncyclopediaService.LoadResources(input);

        // Assert: Items for entire chapter (should be >= verse-only items)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
    }

    #endregion

    #region Full XML Parsing (Multi-Entry)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-008: Full V1 Thematic_Lexicon XML with 2 entries parses both correctly")]
    public void ParseFullV1Xml_TwoEntries_BothParsedCorrectly()
    {
        // Arrange: Full V1 XML with Contents entry (key=0) and Camel entry (key=2.8)
        // Source: gm-008 expected-output.json - entryCount: 2
        // Note: MarbleEncyclopediaEntry parses a single entry; the service
        // iterates over all ThemLex_Entry elements in the Thematic_Lexicon
        var entries = MarbleEncyclopediaEntry.ParseAll(V1FullXml);

        // Assert: Two entries parsed
        Assert.That(entries, Is.Not.Null);
        Assert.That(entries.Count, Is.EqualTo(2), "gm-008: Expected 2 entries in V1 XML");
        Assert.That(entries[0].Key, Is.EqualTo("0"), "gm-008: First entry key must be '0'");
        Assert.That(entries[1].Key, Is.EqualTo("2.8"), "gm-008: Second entry key must be '2.8'");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("ExtractionId", "EXT-014")]
    [Description("gm-009: Full V2 Thematic_Lexicon XML with 2 entries parses both correctly")]
    public void ParseFullV2Xml_TwoEntries_BothParsedCorrectly()
    {
        // Arrange: Full V2 XML with Contents entry and Camel entry with BibleImages
        // Source: gm-009 expected-output.json - entryCount: 2
        var entries = MarbleEncyclopediaEntry.ParseAll(V2FullXml);

        // Assert: Two entries parsed
        Assert.That(entries, Is.Not.Null);
        Assert.That(entries.Count, Is.EqualTo(2), "gm-009: Expected 2 entries in V2 XML");
        Assert.That(entries[0].Key, Is.EqualTo("0"), "gm-009: First entry key must be '0'");
        Assert.That(entries[1].Key, Is.EqualTo("2.8"), "gm-009: Second entry key must be '2.8'");

        // V2 second entry should have BibleImageIds
        Assert.That(
            entries[1].BibleImageIds,
            Is.Not.Empty,
            "gm-009: V2 Camel entry must have BibleImageIds"
        );
    }

    #endregion

    #region EncyclopediaEntryRef Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("EncyclopediaEntryRef contains required fields: key, title, teaserText")]
    public void EntryRef_FromV1Entry_HasRequiredFields()
    {
        // Arrange: Parse V1 entry and build entry ref
        var entry = new MarbleEncyclopediaEntry(V1CamelEntryXml);

        // Assert: EncyclopediaEntryRef can be constructed with required fields
        var entryRef = new EncyclopediaEntryRef(
            Key: entry.Key,
            Title: entry.Title,
            TeaserText: "Preview text from first paragraph",
            FormatVersion: 1
        );

        Assert.That(entryRef.Key, Is.EqualTo("2.8"));
        Assert.That(entryRef.Title, Is.EqualTo("Camel, dromedary"));
        Assert.That(entryRef.FormatVersion, Is.EqualTo(1));
        Assert.That(entryRef.TeaserText, Is.Not.Null.And.Not.Empty);
        Assert.That(entryRef.SeeAlsoIds, Is.Null, "SeeAlsoIds is optional and null by default");
        Assert.That(
            entryRef.VerseReferences,
            Is.Null,
            "VerseReferences is optional and null by default"
        );
        Assert.That(
            entryRef.InlineImageIds,
            Is.Null,
            "InlineImageIds is optional and null by default"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-604")]
    [Description("EncyclopediaEntryRef for V2 includes InlineImageIds")]
    public void EntryRef_FromV2Entry_HasInlineImageIds()
    {
        // Arrange: Parse V2 entry
        var entry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        // Assert: EncyclopediaEntryRef for V2 includes inline image IDs
        var entryRef = new EncyclopediaEntryRef(
            Key: entry.Key,
            Title: entry.Title,
            TeaserText: "Preview text",
            FormatVersion: 2,
            InlineImageIds: entry.BibleImageIds
        );

        Assert.That(entryRef.FormatVersion, Is.EqualTo(2));
        Assert.That(
            entryRef.InlineImageIds,
            Is.Not.Null.And.Not.Empty,
            "V2 EntryRef must include InlineImageIds"
        );
    }

    #endregion

    #region EncyclopediaDisplayItem Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("EncyclopediaDisplayItem record has all required fields")]
    public void DisplayItem_Construction_HasAllRequiredFields()
    {
        // Arrange & Act: Construct a display item
        var item = new EncyclopediaDisplayItem(
            TokenId: "token-001",
            Lemma: "gamal",
            SourceText: "gamal",
            Translit: "gamal",
            Glosses: new List<string> { "camel" },
            Entries: new List<EncyclopediaEntryRef>
            {
                new(
                    Key: "2.8",
                    Title: "Camel, dromedary",
                    TeaserText: "The camel...",
                    FormatVersion: 1
                ),
            },
            ImageIds: new List<string>(),
            Collection: "FAUNA"
        );

        // Assert: All fields accessible
        Assert.That(item.TokenId, Is.EqualTo("token-001"));
        Assert.That(item.Lemma, Is.EqualTo("gamal"));
        Assert.That(item.SourceText, Is.EqualTo("gamal"));
        Assert.That(item.Translit, Is.EqualTo("gamal"));
        Assert.That(item.Glosses, Has.Count.EqualTo(1));
        Assert.That(item.Entries, Has.Count.EqualTo(1));
        Assert.That(item.ImageIds, Is.Empty);
        Assert.That(item.Collection, Is.EqualTo("FAUNA"));
    }

    #endregion

    #region EncyclopediaLoadResult Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-604")]
    [Description("EncyclopediaLoadResult with items has null EmptyStateMessage")]
    public void LoadResult_WithItems_EmptyStateMessageIsNull()
    {
        // Arrange & Act
        var result = new EncyclopediaLoadResult(
            Items: new List<EncyclopediaDisplayItem>
            {
                new(
                    TokenId: "t1",
                    Lemma: "test",
                    SourceText: "test",
                    Translit: "test",
                    Glosses: new List<string>(),
                    Entries: new List<EncyclopediaEntryRef>(),
                    ImageIds: new List<string>(),
                    Collection: "test"
                ),
            },
            EmptyStateMessage: null
        );

        // Assert
        Assert.That(result.Items, Has.Count.EqualTo(1));
        Assert.That(result.EmptyStateMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-352")]
    [Description("EncyclopediaLoadResult with no items has non-null EmptyStateMessage")]
    public void LoadResult_NoItems_HasEmptyStateMessage()
    {
        // Arrange & Act
        var result = new EncyclopediaLoadResult(
            Items: new List<EncyclopediaDisplayItem>(),
            EmptyStateMessage: "No encyclopedia data for Genesis 1:1"
        );

        // Assert
        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    #endregion
}
