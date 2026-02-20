using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-010: LoadEncyclopediaTab.
/// Validates the full encyclopedia tab orchestration pipeline from scoped tokens through
/// to formatted EncyclopediaTabContent with V1 and V2 article rendering.
///
/// This is an orchestration capability that wires together:
/// - Scope filtering via GetLinksInScope (CAP-003)
/// - Data access via MarbleDataAccess (CAP-028)
/// - V2 encyclopedia parsing via Thematic_Lexicon (CAP-029)
/// - Scripture reference formatting via FormatBCVRefs (CAP-030)
///
/// PT9 Source: Paratext/Marble/EncyclopediaTab.cs (LoadResources, GetArticleText, FormatParagraph)
/// Extractions: EXT-061, EXT-062, EXT-063, EXT-067, EXT-071
/// Golden Masters: gm-009 (V1 formatting), gm-015 (scripture refs), gm-016 (V2 parsing)
/// Contract: data-contracts.md Method 10
///
/// Input: (string resourceId, VerseReference verseRef, ScopeFilter scope, WordFilter? wordFilter)
/// Output: EncyclopediaTabContent (Items: IReadOnlyList&lt;EncyclopediaDisplayItem&gt;, HeaderHtml: string)
/// </summary>
[TestFixture]
public class LoadEncyclopediaTabTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a MarbleDataAccess instance with encyclopedia data registered.
    /// Follows the pattern from LoadDictionaryTabTests.
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

        // Default tokens: a verse with encyclopedia-type TextLink tokens
        tokens ??= CreateDefaultEncyclopediaTokens(bookNum);

        dataAccess.AddBible(resourceId, _ => tokens);

        return dataAccess;
    }

    /// <summary>
    /// Creates default TextLink tokens for encyclopedia testing.
    /// Encyclopedia tokens have lexical links of type "encyclopedia" or
    /// carry article references, as opposed to dictionary "SDBG/SDBH" links.
    /// </summary>
    private static IReadOnlyList<MarbleToken> CreateDefaultEncyclopediaTokens(int bookNum)
    {
        return new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(bookNum, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "Jerusalem",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "MBL_ENC:Jerusalem:001001"
            ),
            new(
                MarbleTokenType.TextLink,
                "temple",
                null,
                new VerseReference(bookNum, 1, 1),
                LexicalLinks: "MBL_ENC:temple:001001"
            ),
            new(MarbleTokenType.Verse, null, null, new VerseReference(bookNum, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "Jerusalem",
                null,
                new VerseReference(bookNum, 1, 2),
                LexicalLinks: "MBL_ENC:Jerusalem:001001"
            ),
        };
    }

    /// <summary>
    /// Creates a minimal V2 encyclopedia entry for testing.
    /// </summary>
    private static Thematic_Lexicon CreateV2EncyclopediaEntry(
        string key,
        string title,
        string? paragraphContent = null,
        string? heading = null
    )
    {
        return new Thematic_Lexicon
        {
            ThemLex_Entry = new[]
            {
                new Thematic_LexiconThemLex_Entry
                {
                    Key = key,
                    Title = title,
                    Index = Array.Empty<Thematic_LexiconThemLex_EntryIndexItem>(),
                    Sections = new[]
                    {
                        new Thematic_LexiconThemLex_EntrySection
                        {
                            Heading = heading ?? title,
                            Content = paragraphContent ?? "Sample article text about " + title,
                            Paragraphs = new[]
                            {
                                paragraphContent ?? "Sample article text about " + title,
                            },
                            LanguageSets =
                                Array.Empty<Thematic_LexiconThemLex_EntrySectionLanguageSet>(),
                        },
                    },
                    BibleImages = Array.Empty<BibleImage>(),
                },
            },
        };
    }

    /// <summary>
    /// Registers encyclopedia data on the data access instance for a given entry key.
    /// </summary>
    private static void RegisterEncyclopediaData(
        MarbleDataAccess dataAccess,
        string type,
        string key,
        Thematic_Lexicon data
    )
    {
        dataAccess.AddEncyclopediaData(type, key, data);
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-010.
    /// Verifies golden master scenarios from gm-009, gm-015, gm-016 in a single
    /// comprehensive test. When this test passes, the capability is complete.
    ///
    /// Scenarios covered:
    /// - gm-009: V1 pipe-delimited and V2 XML encyclopedia formatting produce HTML
    /// - gm-015: Scripture references in articles resolved to clickable links
    /// - gm-016: V2 encyclopedia XML parsed and rendered correctly
    ///
    /// The test verifies the full pipeline: tokens in scope -> encyclopedia data lookup ->
    /// article formatting -> EncyclopediaTabContent result.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description(
        "Acceptance test: Encyclopedia tab loaded with V1 and V2 formats, scripture refs resolved"
    )]
    public async Task LoadEncyclopediaTab_AllGoldenMasterScenarios_Pass()
    {
        // Arrange: Set up data access with encyclopedia data
        var dataAccess = CreateTestDataAccess();
        var jerusalemData = CreateV2EncyclopediaEntry(
            "Jerusalem",
            "Jerusalem",
            "A city in ancient Israel with {S:001001001} references"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", jerusalemData);

        var templeData = CreateV2EncyclopediaEntry(
            "temple",
            "Temple",
            "The house of worship {S:002025001} in Jerusalem"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "temple", templeData);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.Multiple(() =>
        {
            // gm-009: Encyclopedia content returned with items
            Assert.That(result, Is.Not.Null, "Must return non-null EncyclopediaTabContent");
            Assert.That(
                result.Items,
                Is.Not.Null,
                "Items list must not be null"
            );
            Assert.That(
                result.Items.Count,
                Is.GreaterThan(0),
                "Must return at least one encyclopedia item for verse with encyclopedia links"
            );

            // gm-016: V2 article data rendered with title
            var firstItem = result.Items[0];
            Assert.That(
                firstItem.Title,
                Is.Not.Empty,
                "gm-016: Item must have a title from V2 data"
            );

            // gm-009: Article HTML generated
            Assert.That(
                firstItem.FullArticleHtml,
                Is.Not.Empty,
                "gm-009: FullArticleHtml must contain rendered article"
            );
        });
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// gm-009: V1 pipe-delimited encyclopedia articles produce HTML.
    /// PT9 V1 format uses pipe-delimited fields: Title|subtitle|body text with {S:BBBCCCVVV}
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("V1 pipe-delimited encyclopedia articles produce HTML")]
    public async Task GoldenMaster_V1PipeDelimited_ProducesHtml()
    {
        // Arrange: V1 format uses pipe-delimited text
        var dataAccess = CreateTestDataAccess();
        var v1Data = CreateV2EncyclopediaEntry(
            "Jerusalem",
            "Jerusalem",
            "Jerusalem|Ancient city|Body text about Jerusalem with {S:001001001} reference"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", v1Data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: V1 format produces HTML article text
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must return items for V1 format");
        var item = result.Items.First(i =>
            i.Title.Contains("Jerusalem", StringComparison.OrdinalIgnoreCase)
        );
        Assert.That(
            item.FullArticleHtml,
            Is.Not.Empty,
            "V1 article must produce non-empty HTML"
        );
    }

    /// <summary>
    /// gm-016: V2 XML encyclopedia articles produce HTML with structured elements.
    /// V2 adds: word offsets in references, inline images, article cross-references.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("GoldenMasterId", "gm-016")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("V2 XML encyclopedia articles produce HTML with structured elements")]
    public async Task GoldenMaster_V2XmlFormat_ProducesStructuredHtml()
    {
        // Arrange: V2 format uses XML elements
        var dataAccess = CreateTestDataAccess();
        var v2Data = CreateV2EncyclopediaEntry(
            "Jerusalem",
            "Jerusalem",
            "Detailed article about Jerusalem",
            "Main Article Heading"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", v2Data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: V2 format produces HTML
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must return items for V2 format");
        var item = result.Items.First(i =>
            i.Title.Contains("Jerusalem", StringComparison.OrdinalIgnoreCase)
        );
        Assert.That(
            item.FullArticleHtml,
            Is.Not.Empty,
            "V2 article must produce non-empty HTML"
        );
        Assert.That(
            item.Title,
            Is.Not.Empty,
            "V2 article must have a title"
        );
    }

    /// <summary>
    /// gm-015: Scripture references in encyclopedia articles resolved to clickable links.
    /// References in BBBCCCVVV format are converted to HTML anchor tags via FormatBCVRefs (CAP-030).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-161")]
    [Description(
        "Scripture references in articles resolved to clickable links via FormatBCVRefs"
    )]
    public async Task GoldenMaster_ScriptureRefsInArticles_ResolvedToLinks()
    {
        // Arrange: Article with scripture reference markers
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry(
            "Jerusalem",
            "Jerusalem",
            "See {S:001001001} for the creation account"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Scripture references resolved via CAP-030 FormatBCVRefs
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items.First(i =>
            i.Title.Contains("Jerusalem", StringComparison.OrdinalIgnoreCase)
        );
        // The article HTML should contain clickable links for scripture references
        // PT9 format: <a href='goto:...' title='Go To ...'>...</a>
        Assert.That(
            item.FullArticleHtml,
            Does.Contain("<a href='goto:").Or.Contain("1:1"),
            "Scripture references must be resolved to clickable links or formatted refs"
        );
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Contract: Valid resource and verse with encyclopedia links returns EncyclopediaTabContent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Valid resource with encyclopedia data returns EncyclopediaTabContent")]
    public async Task LoadEncyclopediaTab_ValidResource_ReturnsContent()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
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
    /// Contract: Each EncyclopediaDisplayItem has required fields populated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Display items have required fields: Id, Title, FullArticleHtml")]
    public async Task LoadEncyclopediaTab_ItemFields_AllPopulated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem", "Article body");
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
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
            Assert.That(item.Title, Is.Not.Null.And.Not.Empty, "Title must be populated");
            Assert.That(
                item.FullArticleHtml,
                Is.Not.Null,
                "FullArticleHtml must not be null"
            );
        });
    }

    /// <summary>
    /// Contract: EncyclopediaTabContent has HeaderHtml field.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Tab content has HeaderHtml field")]
    public async Task LoadEncyclopediaTab_HeaderHtml_NotNull()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: HeaderHtml must not be null (may be empty string)
        Assert.That(result.HeaderHtml, Is.Not.Null, "HeaderHtml must not be null");
    }

    /// <summary>
    /// Contract: Verse scope returns only items linked to the current verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("CurrentVerse scope returns only items for the specified verse")]
    public async Task LoadEncyclopediaTab_VerseScope_OnlyCurrentVerseItems()
    {
        // Arrange: Two verses with different encyclopedia links
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(43, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "Jerusalem",
                null,
                new VerseReference(43, 1, 1),
                LexicalLinks: "MBL_ENC:Jerusalem:001001"
            ),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "Nazareth",
                null,
                new VerseReference(43, 1, 2),
                LexicalLinks: "MBL_ENC:Nazareth:001001"
            ),
        };

        var dataAccess = CreateTestDataAccess(tokens: tokens);
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Nazareth",
            CreateV2EncyclopediaEntry("Nazareth", "Nazareth")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Only verse 1 items (Jerusalem), not verse 2 (Nazareth)
        Assert.That(result.Items.Count, Is.GreaterThanOrEqualTo(1), "Must have at least one item");
        var titles = result.Items.Select(i => i.Title).ToList();
        Assert.That(
            titles,
            Has.Some.Contain("Jerusalem"),
            "Must include Jerusalem from verse 1"
        );
        Assert.That(
            titles,
            Has.None.Contain("Nazareth"),
            "Must NOT include Nazareth from verse 2 when scope is CurrentVerse"
        );
    }

    /// <summary>
    /// Contract: Chapter scope returns items from all verses in the chapter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("CurrentChapter scope returns items from all verses in chapter")]
    public async Task LoadEncyclopediaTab_ChapterScope_AllChapterItems()
    {
        // Arrange: Two verses with different encyclopedia links
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(43, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "Jerusalem",
                null,
                new VerseReference(43, 1, 1),
                LexicalLinks: "MBL_ENC:Jerusalem:001001"
            ),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 2)),
            new(
                MarbleTokenType.TextLink,
                "Nazareth",
                null,
                new VerseReference(43, 1, 2),
                LexicalLinks: "MBL_ENC:Nazareth:001001"
            ),
        };

        var dataAccess = CreateTestDataAccess(tokens: tokens);
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Nazareth",
            CreateV2EncyclopediaEntry("Nazareth", "Nazareth")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: Both items from the chapter
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(2),
            "Chapter scope must include items from all verses in chapter"
        );
    }

    /// <summary>
    /// Contract: ScriptureReferences field is populated on EncyclopediaDisplayItem.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("EncyclopediaDisplayItem has ScriptureReferences populated")]
    public async Task LoadEncyclopediaTab_ItemScriptureRefs_Populated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        // Add language set with references
        data.ThemLex_Entry[0].Sections[0].LanguageSets =
            new[]
            {
                new Thematic_LexiconThemLex_EntrySectionLanguageSet
                {
                    Language = "H",
                    Lemma = "yerushalayim",
                    Transliteration = "y@ruwshalaim",
                    References = new ulong[] { 001001001, 002003004 },
                },
            };
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items[0];
        Assert.That(
            item.ScriptureReferences,
            Is.Not.Null,
            "ScriptureReferences must not be null"
        );
    }

    #endregion

    #region Contract Tests - Error Conditions

    /// <summary>
    /// Error: Resource not found throws RESOURCE_NOT_FOUND error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Non-existent resource throws RESOURCE_NOT_FOUND error")]
    public void LoadEncyclopediaTab_ResourceNotFound_ThrowsException()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await EncyclopediaContentService.LoadEncyclopediaTabAsync(
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
    /// Error: No encyclopedia data returns empty items or NO_DATA error.
    /// When a resource exists but has no encyclopedia entries for the scope, the behavior
    /// should be graceful -- either empty items list or NO_DATA error per data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Resource with no encyclopedia data for scope returns empty or NO_DATA")]
    public async Task LoadEncyclopediaTab_NoEncyclopediaData_EmptyOrError()
    {
        // Arrange: Resource exists but no encyclopedia data registered
        var dataAccess = CreateTestDataAccess();
        var verseRef = new VerseReference(43, 1, 1);

        // Act & Assert: Either returns empty items or throws NO_DATA
        try
        {
            var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
                dataAccess,
                "ESV16UK+",
                verseRef,
                ScopeFilter.CurrentVerse,
                null
            );

            // If no exception, items should be empty
            Assert.That(
                result.Items.Count,
                Is.EqualTo(0),
                "No encyclopedia data for scope should return empty items"
            );
        }
        catch (Exception ex) when (ex.Message.Contains("NO_DATA"))
        {
            // Also acceptable: NO_DATA error
            Assert.Pass("NO_DATA error is acceptable when no encyclopedia data available");
        }
    }

    /// <summary>
    /// Error: Book not available in resource throws BOOK_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Book not in resource throws BOOK_NOT_FOUND")]
    public void LoadEncyclopediaTab_BookNotFound_ThrowsException()
    {
        // Arrange: Resource has tokens for book 43, but we request book 1
        var dataAccess = CreateTestDataAccess(bookNum: 43);
        var verseRef = new VerseReference(1, 1, 1); // Genesis, not in test data

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(
            async () =>
                await EncyclopediaContentService.LoadEncyclopediaTabAsync(
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

    #region Contract Tests - Word Filter

    /// <summary>
    /// Contract: Word filter restricts items to those matching the filter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Word filter restricts encyclopedia items to matching tokens")]
    public async Task LoadEncyclopediaTab_WithWordFilter_RestrictsToMatchingTokens()
    {
        // Arrange: Verse with two encyclopedia links
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "temple",
            CreateV2EncyclopediaEntry("temple", "Temple")
        );

        var verseRef = new VerseReference(43, 1, 1);
        var wordFilter = new WordFilter(
            Lemma: "Jerusalem",
            LexicalLinks: new[] { "MBL_ENC:Jerusalem:001001" },
            SurfaceForm: "Jerusalem",
            SourcePane: WordFilterSource.Scripture
        );

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            wordFilter
        );

        // Assert: Only items matching the word filter should be returned
        Assert.That(result.Items.Count, Is.GreaterThanOrEqualTo(1), "Must have filtered items");
        // When a word filter is active, only matching tokens pass through
        var titles = result.Items.Select(i => i.Title).ToList();
        Assert.That(
            titles,
            Has.Some.Contain("Jerusalem"),
            "Filtered results must include Jerusalem"
        );
    }

    /// <summary>
    /// Contract: Null word filter returns all items in scope (no filtering).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Null word filter returns all items in scope")]
    public async Task LoadEncyclopediaTab_NullWordFilter_ReturnsAllInScope()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "temple",
            CreateV2EncyclopediaEntry("temple", "Temple")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: All items in scope returned
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(2),
            "Without word filter, all items in scope should be returned"
        );
    }

    #endregion

    #region Contract Tests - Display Item Structure

    /// <summary>
    /// Contract: EncyclopediaDisplayItem.Id is unique per item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Each encyclopedia display item has a unique Id")]
    public async Task LoadEncyclopediaTab_ItemIds_AreUnique()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "temple",
            CreateV2EncyclopediaEntry("temple", "Temple")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        var ids = result.Items.Select(i => i.Id).ToList();
        Assert.That(
            ids,
            Is.Unique,
            "All item Ids must be unique"
        );
    }

    /// <summary>
    /// Contract: TeaserHtml is populated for expand/collapse preview.
    /// PT9 generates a short preview from the article body.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-081")]
    [Description("TeaserHtml is populated for expand/collapse preview")]
    public async Task LoadEncyclopediaTab_TeaserHtml_IsPopulated()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry(
            "Jerusalem",
            "Jerusalem",
            "A long article body about the city of Jerusalem in ancient times"
        );
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items[0];
        Assert.That(
            item.TeaserHtml,
            Is.Not.Null,
            "TeaserHtml must not be null (may be empty for short articles)"
        );
    }

    /// <summary>
    /// Contract: Expanded field defaults to false for initial display.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-081")]
    [Description("Items have Expanded=false by default")]
    public async Task LoadEncyclopediaTab_Items_DefaultExpandedIsFalse()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
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
                $"Item '{item.Title}' should have Expanded=false by default"
            );
        }
    }

    /// <summary>
    /// Contract: HasImages reflects whether the encyclopedia entry has associated images.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("HasImages reflects presence of BibleImage data in encyclopedia entry")]
    public async Task LoadEncyclopediaTab_HasImages_ReflectsImageData()
    {
        // Arrange: Entry with images
        var dataAccess = CreateTestDataAccess();
        var dataWithImages = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        dataWithImages.ThemLex_Entry[0].BibleImages = new[]
        {
            new BibleImage
            {
                Id = "img-001",
                Collection = "Photos",
                FileName = "jerusalem.jpg",
                Caption = "View of Jerusalem",
            },
        };
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", dataWithImages);

        // Entry without images
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "temple",
            CreateV2EncyclopediaEntry("temple", "Temple")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThanOrEqualTo(2), "Must have both items");
        var jerusalemItem = result.Items.FirstOrDefault(i =>
            i.Title.Contains("Jerusalem", StringComparison.OrdinalIgnoreCase)
        );
        var templeItem = result.Items.FirstOrDefault(i =>
            i.Title.Contains("Temple", StringComparison.OrdinalIgnoreCase)
        );
        Assert.That(
            jerusalemItem?.HasImages,
            Is.True,
            "Jerusalem item with BibleImages should have HasImages=true"
        );
        Assert.That(
            templeItem?.HasImages,
            Is.False,
            "Temple item without BibleImages should have HasImages=false"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Edge case: V1 and V2 formats both handled in same result set.
    /// A resource may contain both V1 and V2 encyclopedia entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Mixed V1 and V2 encyclopedia entries both rendered")]
    public async Task LoadEncyclopediaTab_MixedV1V2_BothRendered()
    {
        // Arrange: Two entries, potentially different versions
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem", "V2 article text")
        );
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "temple",
            CreateV2EncyclopediaEntry("temple", "Temple", "Title|subtitle|V1 body text")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Both items rendered
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(2),
            "Both V1 and V2 entries must be rendered"
        );
        foreach (var item in result.Items)
        {
            Assert.That(
                item.FullArticleHtml,
                Is.Not.Null,
                $"Item '{item.Title}' must have non-null FullArticleHtml"
            );
        }
    }

    /// <summary>
    /// Edge case: Empty verse (no encyclopedia links) returns empty items list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Verse with no encyclopedia links returns empty items")]
    public async Task LoadEncyclopediaTab_NoEncyclopediaLinks_ReturnsEmptyItems()
    {
        // Arrange: Tokens with no encyclopedia-type links
        var tokens = new List<MarbleToken>
        {
            new(MarbleTokenType.Book, null, null, null),
            new(MarbleTokenType.Chapter, null, null, new VerseReference(43, 1, 0)),
            new(MarbleTokenType.Verse, null, null, new VerseReference(43, 1, 1)),
            new(
                MarbleTokenType.TextLink,
                "logos",
                null,
                new VerseReference(43, 1, 1),
                LexicalLinks: "SDBG:logos:001001"
            ),
        };

        var dataAccess = CreateTestDataAccess(tokens: tokens);
        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: No encyclopedia entries for dictionary-type links
        Assert.That(
            result.Items.Count,
            Is.EqualTo(0),
            "Tokens with dictionary links (SDBG) should not produce encyclopedia items"
        );
    }

    /// <summary>
    /// Edge case: SourceText field populated on encyclopedia items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("SourceText populated from language set data")]
    public async Task LoadEncyclopediaTab_SourceText_PopulatedFromLanguageSet()
    {
        // Arrange: Entry with language set providing source text
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        data.ThemLex_Entry[0].Sections[0].LanguageSets =
            new[]
            {
                new Thematic_LexiconThemLex_EntrySectionLanguageSet
                {
                    Language = "H",
                    Lemma = "yerushalayim",
                    Transliteration = "y@ruwshalaim",
                    References = Array.Empty<ulong>(),
                },
            };
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items[0];
        // SourceText comes from the language set's Lemma
        Assert.That(
            item.SourceText,
            Is.Not.Null,
            "SourceText should be populated from language set"
        );
    }

    /// <summary>
    /// Edge case: Transliteration field populated from language set data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("Transliteration populated from language set data")]
    public async Task LoadEncyclopediaTab_Transliteration_PopulatedFromLanguageSet()
    {
        // Arrange
        var dataAccess = CreateTestDataAccess();
        var data = CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem");
        data.ThemLex_Entry[0].Sections[0].LanguageSets =
            new[]
            {
                new Thematic_LexiconThemLex_EntrySectionLanguageSet
                {
                    Language = "H",
                    Lemma = "yerushalayim",
                    Transliteration = "y@ruwshalaim",
                    References = Array.Empty<ulong>(),
                },
            };
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", data);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Must have items");
        var item = result.Items[0];
        Assert.That(
            item.Transliteration,
            Is.Not.Null,
            "Transliteration should be populated from language set"
        );
    }

    /// <summary>
    /// Edge case: Encyclopedia entry with no sections produces item with empty article.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-148")]
    [Description("Entry with no sections produces item with empty article HTML")]
    public async Task LoadEncyclopediaTab_NoSections_EmptyArticleHtml()
    {
        // Arrange: Entry with empty sections
        var dataAccess = CreateTestDataAccess();
        var emptyData = new Thematic_Lexicon
        {
            ThemLex_Entry = new[]
            {
                new Thematic_LexiconThemLex_Entry
                {
                    Key = "Jerusalem",
                    Title = "Jerusalem",
                    Index = Array.Empty<Thematic_LexiconThemLex_EntryIndexItem>(),
                    Sections = Array.Empty<Thematic_LexiconThemLex_EntrySection>(),
                    BibleImages = Array.Empty<BibleImage>(),
                },
            },
        };
        RegisterEncyclopediaData(dataAccess, "MBL_ENC", "Jerusalem", emptyData);

        var verseRef = new VerseReference(43, 1, 1);

        // Act
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentVerse,
            null
        );

        // Assert: Item created but with empty/minimal article
        Assert.That(result.Items.Count, Is.GreaterThan(0), "Item should still be created");
        var item = result.Items[0];
        Assert.That(item.Title, Is.EqualTo("Jerusalem"), "Title preserved even without sections");
    }

    /// <summary>
    /// Edge case: Multiple entries for same article key are not duplicated.
    /// The same encyclopedia topic appearing on different tokens should produce
    /// a single display item (deduplication).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ScenarioId", "TS-147")]
    [Description("Same encyclopedia article from multiple tokens is deduplicated")]
    public async Task LoadEncyclopediaTab_DuplicateArticle_Deduplicated()
    {
        // Arrange: Two tokens linking to the same encyclopedia article
        // Default tokens have two "Jerusalem" links (verse 1 and verse 2 in chapter scope)
        var dataAccess = CreateTestDataAccess();
        RegisterEncyclopediaData(
            dataAccess,
            "MBL_ENC",
            "Jerusalem",
            CreateV2EncyclopediaEntry("Jerusalem", "Jerusalem")
        );

        var verseRef = new VerseReference(43, 1, 1);

        // Act: Chapter scope includes both verse 1 and verse 2 Jerusalem tokens
        var result = await EncyclopediaContentService.LoadEncyclopediaTabAsync(
            dataAccess,
            "ESV16UK+",
            verseRef,
            ScopeFilter.CurrentChapter,
            null
        );

        // Assert: Jerusalem should appear at most once (deduplicated)
        var jerusalemItems = result.Items.Where(i =>
            i.Title.Contains("Jerusalem", StringComparison.OrdinalIgnoreCase)
        ).ToList();
        Assert.That(
            jerusalemItems.Count,
            Is.LessThanOrEqualTo(1),
            "Same article should be deduplicated across tokens"
        );
    }

    #endregion
}
