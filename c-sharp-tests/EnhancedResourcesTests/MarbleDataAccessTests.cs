using System.Collections.Concurrent;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-028: MarbleDataAccess.
/// Validates the central data access layer for Enhanced Resources. This service provides:
///
/// 1. Resource enumeration: AvailableBibles, HaveMarbleData, resource discovery
/// 2. Token caching: Book-level token caching using ConcurrentDictionary for thread-safe access
/// 3. Dictionary data access: Lexicon entry retrieval by key (Dictionary:Lemma:Index)
/// 4. Encyclopedia data access: Thematic lexicon entries for encyclopedia articles
/// 5. Image metadata access: Image data for verse range matching
/// 6. Gloss access: FindLocalizedGlossesForTerm (BHV-109 IMarbleDataAccess contract)
/// 7. Language enumeration: AvailableGlossLanguages with sorted language list
/// 8. Cache invalidation: UpdateResource clears caches on project change
/// 9. Resource constants: File extensions, required data projects, dictionary name mapping
///
/// PT9 Source: Paratext/Marble/MarbleDataAccess.cs:1-1998
/// Contract: extraction-plan.md EXT-014, EXT-069
///
/// MarbleDataAccess is a stateful service (Classic TDD).
/// No golden master -- tested via unit tests for file access, caching, and resource enumeration.
/// </summary>
[TestFixture]
public class MarbleDataAccessTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-028.
    /// Verifies the full data access lifecycle: initialize resources, access cached tokens,
    /// retrieve dictionary entries, enumerate languages, and invalidate cache on update.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028-01")]
    [Property("ExtractionId", "EXT-014")]
    [Description(
        "Acceptance test: Full data access lifecycle (enumerate, access, cache, invalidate)"
    )]
    public void DataAccessLifecycle_EnumerateAccessAndInvalidate_Success()
    {
        // Arrange: Create a MarbleDataAccess with test resource data
        var dataAccess = new MarbleDataAccess();

        // Act 1: Before initialization, HaveMarbleData should be false
        var haveDataBefore = dataAccess.HaveMarbleData;

        // Assert 1: No data before initialization
        Assert.That(haveDataBefore, Is.False, "Should not have marble data before initialization");

        // Act 2: Initialize with a test resource directory (no actual files -- tests in-memory)
        dataAccess.Initialize();

        // Act 3: Access book tokens (should be cached after first access)
        var tokens1 = dataAccess.GetBookTokens("ESV16UK+", 40);
        var tokens2 = dataAccess.GetBookTokens("ESV16UK+", 40);

        // Assert 3: Same reference returned from cache (identity equality)
        Assert.That(
            tokens1,
            Is.SameAs(tokens2),
            "Second call must return cached tokens (same reference)"
        );

        // Act 4: Enumerate available gloss languages
        var languages = dataAccess.AvailableGlossLanguages;

        // Assert 4: Languages list is not null
        Assert.That(languages, Is.Not.Null, "AvailableGlossLanguages must never return null");

        // Act 5: Invalidate cache on resource update
        dataAccess.UpdateResource("ESV16UK+");
        var tokensAfterUpdate = dataAccess.GetBookTokens("ESV16UK+", 40);

        // Assert 5: After cache invalidation, tokens are re-fetched (not same reference)
        Assert.That(
            tokensAfterUpdate,
            Is.Not.SameAs(tokens1),
            "After UpdateResource, cached tokens must be invalidated"
        );
    }

    #endregion

    #region Resource Constants and File Extensions

    /// <summary>
    /// Verifies that MarbleDataAccess defines the correct file extension constants
    /// matching the PT9 resource file types.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-27")]
    [Property("ExtractionId", "EXT-014")]
    [Description("Resource file extension constants match PT9 domain constraints")]
    public void ResourceConstants_FileExtensions_MatchPT9()
    {
        // Assert: Verify all resource file extension constants are defined
        Assert.Multiple(() =>
        {
            Assert.That(
                MarbleDataAccess.MarbleBibleExtensionV1,
                Is.EqualTo(".mbv1z"),
                "Bible V1 extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleBibleExtensionV2,
                Is.EqualTo(".mbv2z"),
                "Bible V2 extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleDictionaryExtension,
                Is.EqualTo(".mdv1z"),
                "Dictionary extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleSourceLanguageExtension,
                Is.EqualTo(".msv1z"),
                "Source language extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleImagesExtensionV1,
                Is.EqualTo(".miv1z"),
                "Images V1 extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleImagesExtensionV2,
                Is.EqualTo(".miv2z"),
                "Images V2 extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleImageIndexExtension,
                Is.EqualTo(".mxv1z"),
                "Image index extension"
            );
            Assert.That(
                MarbleDataAccess.MarbleEncyclopediaExtension,
                Is.EqualTo(".mev1z"),
                "Encyclopedia extension"
            );
        });
    }

    /// <summary>
    /// Verifies that dictionary name constants are correctly defined (SDBG, SDBH, DCLEX).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-28")]
    [Property("ExtractionId", "EXT-014")]
    [Description("Dictionary and source text name constants match PT9")]
    public void ResourceConstants_DictionaryNames_MatchPT9()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                MarbleDataAccess.GreekDictionary,
                Is.EqualTo("SDBG"),
                "Greek dictionary name"
            );
            Assert.That(
                MarbleDataAccess.HebrewDictionary,
                Is.EqualTo("SDBH"),
                "Hebrew dictionary name"
            );
            Assert.That(
                MarbleDataAccess.DeuteroDictionary,
                Is.EqualTo("DCLEX"),
                "Deuterocanonical dictionary name"
            );
            Assert.That(
                MarbleDataAccess.GreekSourceText,
                Is.EqualTo("GNT"),
                "Greek source text name"
            );
            Assert.That(
                MarbleDataAccess.HebrewSourceText,
                Is.EqualTo("BHS"),
                "Hebrew source text name"
            );
            Assert.That(
                MarbleDataAccess.EncyclopediaName,
                Is.EqualTo("MBL_ENC"),
                "Encyclopedia project name"
            );
            Assert.That(
                MarbleDataAccess.ImageIndexName,
                Is.EqualTo("IMG_INDX"),
                "Image index project name"
            );
        });
    }

    #endregion

    #region HaveMarbleData Property

    /// <summary>
    /// HaveMarbleData returns false when no resources are loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-03")]
    [Property("ExtractionId", "EXT-014")]
    [Description("HaveMarbleData is false when no resources are loaded")]
    public void HaveMarbleData_NoResources_ReturnsFalse()
    {
        var dataAccess = new MarbleDataAccess();

        Assert.That(
            dataAccess.HaveMarbleData,
            Is.False,
            "HaveMarbleData should be false when no resources are loaded"
        );
    }

    /// <summary>
    /// HaveMarbleData returns true when both bibles and all required research data are present.
    /// In PT9, HaveMarbleData = AvailableBibles.Any() AND all required data projects present.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-04")]
    [Property("ExtractionId", "EXT-014")]
    [Description("HaveMarbleData is true when bibles AND all required research data are present")]
    public void HaveMarbleData_AllRequiredPresent_ReturnsTrue()
    {
        var dataAccess = new MarbleDataAccess();
        // Add all required resources (bible + all required research data projects)
        dataAccess.AddBible("ESV16UK+", CreateDummyTokenProvider());
        dataAccess.AddResearchData("MBL_ENC");
        dataAccess.AddResearchData("IMG_INDX");
        dataAccess.AddResearchData("IMG_THMB");
        dataAccess.AddResearchData("SDBG");
        dataAccess.AddResearchData("SDBH");
        dataAccess.AddResearchData("GNT");
        dataAccess.AddResearchData("BHS");

        Assert.That(
            dataAccess.HaveMarbleData,
            Is.True,
            "HaveMarbleData should be true when bible and all required research data are present"
        );
    }

    /// <summary>
    /// HaveMarbleData returns false when bibles are present but required research data is missing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-29")]
    [Property("ExtractionId", "EXT-014")]
    [Description("HaveMarbleData is false when bibles present but research data missing")]
    public void HaveMarbleData_BiblesPresentResearchMissing_ReturnsFalse()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible("ESV16UK+", CreateDummyTokenProvider());
        // Only add some required projects, not all
        dataAccess.AddResearchData("SDBG");

        Assert.That(
            dataAccess.HaveMarbleData,
            Is.False,
            "HaveMarbleData should be false when not all required research data is present"
        );
    }

    #endregion

    #region AvailableBibles

    /// <summary>
    /// AvailableBibles returns empty collection when no bibles are registered.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-05")]
    [Property("ExtractionId", "EXT-014")]
    [Description("AvailableBibles is empty when no bibles registered")]
    public void AvailableBibles_NoBibles_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();

        var bibles = dataAccess.AvailableBibles;

        Assert.That(bibles, Is.Empty, "AvailableBibles must be empty when no bibles registered");
    }

    /// <summary>
    /// AvailableBibles returns registered bible resource IDs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-06")]
    [Property("ExtractionId", "EXT-014")]
    [Description("AvailableBibles returns registered bible resource IDs")]
    public void AvailableBibles_WithBibles_ReturnsRegisteredIds()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible("ESV16UK+", CreateDummyTokenProvider());
        dataAccess.AddBible("NIV11+", CreateDummyTokenProvider());

        var bibles = dataAccess.AvailableBibles.ToList();

        Assert.That(bibles, Has.Count.EqualTo(2));
        Assert.That(bibles, Does.Contain("ESV16UK+"));
        Assert.That(bibles, Does.Contain("NIV11+"));
    }

    #endregion

    #region GetBookTokens - Token Caching

    /// <summary>
    /// GetBookTokens returns parsed token list for a valid resource and book.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-07")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetBookTokens returns parsed tokens for a valid resource and book")]
    public void GetBookTokens_ValidResourceAndBook_ReturnsTokens()
    {
        var dataAccess = new MarbleDataAccess();
        var expectedTokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
            new MarbleToken(
                MarbleTokenType.Chapter,
                "1",
                null,
                new VerseReference(40, 1, 1)
            ),
        };
        dataAccess.AddBible("ESV16UK+", CreateTokenProvider(expectedTokens));

        var tokens = dataAccess.GetBookTokens("ESV16UK+", 40);

        Assert.That(tokens, Is.Not.Null);
        Assert.That(tokens, Has.Count.EqualTo(2));
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book));
    }

    /// <summary>
    /// GetBookTokens returns null (or empty) for a nonexistent resource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-08")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetBookTokens returns null/empty for nonexistent resource")]
    public void GetBookTokens_NonexistentResource_ReturnsNullOrEmpty()
    {
        var dataAccess = new MarbleDataAccess();

        var tokens = dataAccess.GetBookTokens("NONEXISTENT", 40);

        Assert.That(
            tokens,
            Is.Null.Or.Empty,
            "GetBookTokens for nonexistent resource must return null or empty"
        );
    }

    /// <summary>
    /// GetBookTokens caches results: second call returns same reference (identity equality).
    /// This verifies the ConcurrentDictionary-based caching described in the strategic plan.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-24")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetBookTokens caches: second call returns same reference")]
    public void GetBookTokens_CalledTwice_ReturnsCachedResult()
    {
        var counter = new CallCounter();
        var dataAccess = new MarbleDataAccess();
        var tokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        dataAccess.AddBible(
            "ESV16UK+",
            CreateCountingTokenProvider(tokens, counter)
        );

        var result1 = dataAccess.GetBookTokens("ESV16UK+", 40);
        var result2 = dataAccess.GetBookTokens("ESV16UK+", 40);

        Assert.Multiple(() =>
        {
            Assert.That(result1, Is.SameAs(result2), "Cached tokens must be the same reference");
            Assert.That(
                counter.Count,
                Is.EqualTo(1),
                "Token provider must only be called once (caching)"
            );
        });
    }

    /// <summary>
    /// GetBookTokens caches per (resourceId, bookNum) key: different books get separate cache entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-25")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetBookTokens caches per (resourceId, bookNum) key")]
    public void GetBookTokens_DifferentBooks_CachedSeparately()
    {
        var dataAccess = new MarbleDataAccess();
        var matTokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        var mrkTokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MRK", null, null),
        };
        dataAccess.AddBible(
            "ESV16UK+",
            CreateBookSpecificTokenProvider(
                new Dictionary<int, IReadOnlyList<MarbleToken>>
                {
                    { 40, matTokens },
                    { 41, mrkTokens },
                }
            )
        );

        var mat = dataAccess.GetBookTokens("ESV16UK+", 40);
        var mrk = dataAccess.GetBookTokens("ESV16UK+", 41);

        Assert.That(mat, Is.Not.SameAs(mrk), "Different books must have separate cache entries");
        Assert.That(mat![0].Text, Is.EqualTo("MAT"));
        Assert.That(mrk![0].Text, Is.EqualTo("MRK"));
    }

    #endregion

    #region GetDictionaryForBook

    /// <summary>
    /// GetDictionaryForBook returns SDBH for OT books (book 1-39 = GEN-MAL).
    /// PT9: Canon.IsBookOT(bookNum) ? hebrewDictionary : greekDictionary
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-23")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetDictionaryForBook returns SDBH for OT, SDBG for NT")]
    [TestCase(1, "SDBH", Description = "Genesis (OT) -> Hebrew")]
    [TestCase(39, "SDBH", Description = "Malachi (OT) -> Hebrew")]
    [TestCase(40, "SDBG", Description = "Matthew (NT) -> Greek")]
    [TestCase(66, "SDBG", Description = "Revelation (NT) -> Greek")]
    public void GetDictionaryForBook_OtAndNt_ReturnsCorrectDictionary(
        int bookNum,
        string expectedDictionary
    )
    {
        var result = MarbleDataAccess.GetDictionaryNameForBook(bookNum);

        Assert.That(
            result,
            Is.EqualTo(expectedDictionary),
            $"Book {bookNum} must map to dictionary {expectedDictionary}"
        );
    }

    #endregion

    #region GetDictionaryEntry

    /// <summary>
    /// GetDictionaryEntry retrieves a lexicon entry by its full key (Dictionary:Lemma:Index).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-10")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetDictionaryEntry retrieves lexicon entry by key")]
    public void GetDictionaryEntry_ValidKey_ReturnsEntry()
    {
        var dataAccess = new MarbleDataAccess();
        var entry = new Lexicon_Entry { MainId = "SDBG:logos:001", Lemma = "logos" };
        dataAccess.AddDictionaryEntry("SDBG", "logos", entry);

        var result = dataAccess.GetDictionaryEntry("SDBG:logos:001");

        Assert.That(result, Is.Not.Null, "Must return entry for valid key");
        Assert.That(result!.Lemma, Is.EqualTo("logos"));
    }

    /// <summary>
    /// GetDictionaryEntry returns null for empty or null entry ID (matches PT9 null guard).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-11")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetDictionaryEntry returns null for empty/null key")]
    [TestCase(null)]
    [TestCase("")]
    public void GetDictionaryEntry_NullOrEmpty_ReturnsNull(string? entryId)
    {
        var dataAccess = new MarbleDataAccess();

        var result = dataAccess.GetDictionaryEntry(entryId!);

        Assert.That(result, Is.Null, "Must return null for null/empty entry ID");
    }

    /// <summary>
    /// GetDictionaryEntry returns null for a dictionary that has no matching entry.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-30")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetDictionaryEntry returns null for nonexistent entry")]
    public void GetDictionaryEntry_NonexistentEntry_ReturnsNull()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddResearchData("SDBG");

        var result = dataAccess.GetDictionaryEntry("SDBG:nonexistent:001");

        Assert.That(result, Is.Null, "Must return null for nonexistent entry");
    }

    #endregion

    #region GetEncyclopediaEntries

    /// <summary>
    /// GetEncyclopediaEntries returns entries matching the type:key pattern.
    /// PT9: entryId format is "type:key" (e.g., "Flora:olive").
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-12")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetEncyclopediaEntries returns entries for valid type:key")]
    public void GetEncyclopediaEntries_ValidTypeAndKey_ReturnsEntries()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddEncyclopediaData(
            "Flora",
            "olive",
            new Thematic_Lexicon
            {
                ThemLex_Entry = new[]
                {
                    new Thematic_LexiconThemLex_Entry { Key = "olive", Title = "Olive" },
                },
            }
        );

        var entries = dataAccess.GetEncyclopediaEntries("Flora:olive", "en");

        Assert.That(entries, Is.Not.Null);
        Assert.That(entries, Is.Not.Empty, "Must return entries for valid Flora:olive key");
    }

    /// <summary>
    /// GetEncyclopediaEntries returns empty for entry ID without colon separator.
    /// PT9: typeSeparatorIndex <= 0 returns empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-13")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetEncyclopediaEntries returns empty for invalid entry ID")]
    [TestCase("nocolon")]
    [TestCase("")]
    [TestCase(":startsWithColon")]
    public void GetEncyclopediaEntries_InvalidFormat_ReturnsEmpty(string entryId)
    {
        var dataAccess = new MarbleDataAccess();

        var entries = dataAccess.GetEncyclopediaEntries(entryId, "en");

        Assert.That(entries, Is.Empty, "Must return empty for invalid entry ID format");
    }

    #endregion

    #region Image Metadata Access

    /// <summary>
    /// GetImageMetadata returns image data matching a verse reference range.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-14")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetImageMetadata returns images matching verse range")]
    public void GetImageMetadata_ValidVerseRange_ReturnsMatchingImages()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.LoadImageIndex(
            new List<ImageMetadataEntry>
            {
                new ImageMetadataEntry(
                    "img001",
                    "040001001",
                    "040001005",
                    "Bible Art",
                    "images/img001.jpg"
                ),
            }
        );

        var images = dataAccess.GetImageMetadata(
            new VerseReference(40, 1, 1),
            new VerseReference(40, 1, 5)
        );

        Assert.That(images, Is.Not.Empty, "Must return images matching verse range");
    }

    /// <summary>
    /// GetImageMetadata returns empty when no image index is loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-15")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetImageMetadata returns empty when no image index loaded")]
    public void GetImageMetadata_NoImageIndex_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();

        var images = dataAccess.GetImageMetadata(
            new VerseReference(40, 1, 1),
            new VerseReference(40, 1, 5)
        );

        Assert.That(images, Is.Empty, "Must return empty when no image index loaded");
    }

    #endregion

    #region FindLocalizedGlossesForTerm (BHV-109)

    /// <summary>
    /// FindLocalizedGlossesForTerm returns glosses for a term in the specified language.
    /// This tests the IMarbleDataAccess interface contract (BHV-109).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028-16")]
    [Property("ExtractionId", "EXT-014")]
    [Description("FindLocalizedGlossesForTerm returns glosses for valid term")]
    public void FindLocalizedGlossesForTerm_ValidTerm_ReturnsGlosses()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word", "speech", "reason" });

        var glosses = dataAccess.FindLocalizedGlossesForTerm("logos", "en");

        Assert.That(glosses, Is.Not.Null);
        Assert.That(glosses, Is.Not.Empty, "Must return glosses for valid term");
        Assert.That(glosses, Does.Contain("word"));
    }

    /// <summary>
    /// FindLocalizedGlossesForTerm returns empty when no matching term exists.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028-17")]
    [Property("ExtractionId", "EXT-014")]
    [Description("FindLocalizedGlossesForTerm returns empty for nonexistent term")]
    public void FindLocalizedGlossesForTerm_NonexistentTerm_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();

        var glosses = dataAccess.FindLocalizedGlossesForTerm("nonexistent", "en");

        Assert.That(glosses, Is.Empty, "Must return empty for nonexistent term");
    }

    /// <summary>
    /// FindLocalizedGlossesForTerm returns empty when language has no glosses available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028-31")]
    [Property("ExtractionId", "EXT-014")]
    [Description("FindLocalizedGlossesForTerm returns empty for unsupported language")]
    public void FindLocalizedGlossesForTerm_UnsupportedLanguage_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });

        var glosses = dataAccess.FindLocalizedGlossesForTerm("logos", "zh");

        Assert.That(glosses, Is.Empty, "Must return empty for unsupported language");
    }

    #endregion

    #region AvailableGlossLanguages (BHV-109, BHV-115)

    /// <summary>
    /// AvailableGlossLanguages returns empty list when no dictionaries are loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028-18")]
    [Property("ExtractionId", "EXT-014")]
    [Description("AvailableGlossLanguages returns empty when no dictionaries loaded")]
    public void AvailableGlossLanguages_NoDictionaries_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();

        var languages = dataAccess.AvailableGlossLanguages;

        Assert.That(languages, Is.Not.Null, "Must never return null");
        Assert.That(languages, Is.Empty);
    }

    /// <summary>
    /// AvailableGlossLanguages returns sorted language codes when dictionaries are loaded.
    /// PT9: supportedGlossLanguages is a SortedDictionary.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("BehaviorId", "BHV-115")]
    [Property("ScenarioId", "TS-028-19")]
    [Property("ExtractionId", "EXT-014")]
    [Description("AvailableGlossLanguages returns sorted language codes")]
    public void AvailableGlossLanguages_WithDictionaries_ReturnsSorted()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddGlossData("logos", "fr", new List<string> { "mot" });
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });
        dataAccess.AddGlossData("logos", "es", new List<string> { "palabra" });

        var languages = dataAccess.AvailableGlossLanguages;

        Assert.That(languages, Has.Count.EqualTo(3));
        // Verify sorted order (alphabetical by key)
        Assert.That(languages, Is.Ordered, "Languages must be sorted");
    }

    #endregion

    #region UpdateResource - Cache Invalidation

    /// <summary>
    /// UpdateResource clears cached tokens for the specified resource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-20")]
    [Property("ExtractionId", "EXT-014")]
    [Description("UpdateResource clears cached tokens for the resource")]
    public void UpdateResource_ValidResource_ClearsTokenCache()
    {
        var counter = new CallCounter();
        var dataAccess = new MarbleDataAccess();
        var tokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        dataAccess.AddBible(
            "ESV16UK+",
            CreateCountingTokenProvider(tokens, counter)
        );

        // First access caches
        dataAccess.GetBookTokens("ESV16UK+", 40);
        Assert.That(counter.Count, Is.EqualTo(1));

        // Invalidate cache
        dataAccess.UpdateResource("ESV16UK+");

        // Second access should re-invoke provider
        dataAccess.GetBookTokens("ESV16UK+", 40);
        Assert.That(
            counter.Count,
            Is.EqualTo(2),
            "After UpdateResource, token provider must be called again"
        );
    }

    /// <summary>
    /// UpdateResource for one resource does not invalidate cache for other resources.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-32")]
    [Property("ExtractionId", "EXT-014")]
    [Description("UpdateResource only invalidates cache for specified resource")]
    public void UpdateResource_OneResource_DoesNotAffectOtherCaches()
    {
        var nivCounter = new CallCounter();
        var dataAccess = new MarbleDataAccess();

        var esvTokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        var nivTokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        dataAccess.AddBible(
            "ESV16UK+",
            CreateTokenProvider(esvTokens)
        );
        dataAccess.AddBible(
            "NIV11+",
            CreateCountingTokenProvider(nivTokens, nivCounter)
        );

        // Cache both
        dataAccess.GetBookTokens("ESV16UK+", 40);
        dataAccess.GetBookTokens("NIV11+", 40);

        // Invalidate only ESV
        dataAccess.UpdateResource("ESV16UK+");

        // NIV should still be cached
        dataAccess.GetBookTokens("NIV11+", 40);
        Assert.That(
            nivCounter.Count,
            Is.EqualTo(1),
            "NIV cache must not be affected by ESV UpdateResource"
        );
    }

    #endregion

    #region GetResearchProject

    /// <summary>
    /// GetResearchProject returns the research data project for a known name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-21")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetResearchProject returns registered project by name")]
    public void GetResearchProject_ValidName_ReturnsProject()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddResearchData("SDBG");

        var result = dataAccess.HasResearchData("SDBG");

        Assert.That(result, Is.True, "Must find registered research data project");
    }

    /// <summary>
    /// GetResearchProject returns null for an unknown project name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-22")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetResearchProject returns null for unknown name")]
    public void GetResearchProject_UnknownName_ReturnsFalse()
    {
        var dataAccess = new MarbleDataAccess();

        var result = dataAccess.HasResearchData("NONEXISTENT");

        Assert.That(result, Is.False, "Must return false for unknown research project name");
    }

    #endregion

    #region Thread Safety

    /// <summary>
    /// GetBookTokens is thread-safe when accessed from multiple threads concurrently.
    /// The ConcurrentDictionary cache prevents data races.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-26")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetBookTokens is thread-safe with concurrent access")]
    public void GetBookTokens_ConcurrentAccess_ThreadSafe()
    {
        var dataAccess = new MarbleDataAccess();
        var tokens = new List<MarbleToken>
        {
            new MarbleToken(MarbleTokenType.Book, "MAT", null, null),
        };
        dataAccess.AddBible("ESV16UK+", CreateTokenProvider(tokens));

        var results = new ConcurrentBag<IReadOnlyList<MarbleToken>?>();
        var tasks = Enumerable
            .Range(0, 10)
            .Select(_ =>
                Task.Run(() =>
                {
                    var result = dataAccess.GetBookTokens("ESV16UK+", 40);
                    results.Add(result);
                })
            )
            .ToArray();

        Assert.DoesNotThrowAsync(
            async () => await Task.WhenAll(tasks),
            "Concurrent GetBookTokens must not throw"
        );

        // All results should be the same cached reference
        var allResults = results.ToList();
        Assert.That(allResults, Has.Count.EqualTo(10));
        Assert.That(
            allResults.Distinct().Count(),
            Is.EqualTo(1),
            "All concurrent results must return the same cached reference"
        );
    }

    /// <summary>
    /// AvailableGlossLanguages can be accessed from multiple threads without exception.
    /// PT9 uses lock(supportedGlossLanguages) for thread safety.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-33")]
    [Property("ExtractionId", "EXT-014")]
    [Description("AvailableGlossLanguages is thread-safe")]
    public void AvailableGlossLanguages_ConcurrentAccess_ThreadSafe()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddGlossData("logos", "en", new List<string> { "word" });

        var tasks = Enumerable
            .Range(0, 10)
            .Select(_ => Task.Run(() => dataAccess.AvailableGlossLanguages))
            .ToArray();

        Assert.DoesNotThrowAsync(
            async () => await Task.WhenAll(tasks),
            "Concurrent AvailableGlossLanguages access must not throw"
        );
    }

    #endregion

    #region Required Data Projects

    /// <summary>
    /// RequiredDataProjects returns the list of project names that must be present
    /// for HaveMarbleData to be true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-34")]
    [Property("ExtractionId", "EXT-014")]
    [Description("RequiredDataProjects matches PT9 required project list")]
    public void RequiredDataProjects_MatchesPT9List()
    {
        var required = MarbleDataAccess.RequiredDataProjects;

        Assert.Multiple(() =>
        {
            Assert.That(required, Does.Contain("MBL_ENC"), "Must include encyclopedia");
            Assert.That(required, Does.Contain("IMG_INDX"), "Must include image index");
            Assert.That(required, Does.Contain("IMG_THMB"), "Must include thumbnails");
            Assert.That(required, Does.Contain("SDBG"), "Must include Greek dictionary");
            Assert.That(required, Does.Contain("SDBH"), "Must include Hebrew dictionary");
            Assert.That(required, Does.Contain("GNT"), "Must include Greek source text");
            Assert.That(required, Does.Contain("BHS"), "Must include Hebrew source text");
        });
    }

    /// <summary>
    /// OptionalDataProjects includes deuterocanonical resources that are not required
    /// but should be downloaded when available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-35")]
    [Property("ExtractionId", "EXT-014")]
    [Description("OptionalDataProjects includes DC resources")]
    public void OptionalDataProjects_IncludesDeuterocanonical()
    {
        var optional = MarbleDataAccess.OptionalDataProjects;

        Assert.Multiple(() =>
        {
            Assert.That(optional, Does.Contain("DCLEX"), "Must include DC dictionary");
            Assert.That(optional, Does.Contain("LXXDC"), "Must include DC source text");
        });
    }

    /// <summary>
    /// IsRequiredOrOptionalProject returns true for both required and optional project names.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-36")]
    [Property("ExtractionId", "EXT-014")]
    [Description("IsRequiredOrOptionalProject identifies known projects")]
    [TestCase("MBL_ENC", true)]
    [TestCase("SDBG", true)]
    [TestCase("DCLEX", true)]
    [TestCase("UNKNOWN", false)]
    public void IsRequiredOrOptionalProject_KnownAndUnknown_CorrectResult(
        string projectName,
        bool expected
    )
    {
        var dataAccess = new MarbleDataAccess();

        var result = dataAccess.IsRequiredOrOptionalProject(projectName);

        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region Name-to-Extension Mapping

    /// <summary>
    /// GetResourceFileName returns the correct filename with extension for known project names.
    /// PT9 has a nameToExtension mapping dictionary.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-37")]
    [Property("ExtractionId", "EXT-014")]
    [Description("GetResourceFileName maps project names to correct file extensions")]
    [TestCase("MBL_ENC", ".mev1z")]
    [TestCase("IMG_INDX", ".mxv1z")]
    [TestCase("SDBG", ".mdv1z")]
    [TestCase("SDBH", ".mdv1z")]
    [TestCase("DCLEX", ".mdv1z")]
    [TestCase("GNT", ".msv1z")]
    [TestCase("BHS", ".msv1z")]
    public void GetResourceFileName_KnownProjects_ReturnsCorrectExtension(
        string projectName,
        string expectedExtension
    )
    {
        var fileName = MarbleDataAccess.GetResourceFileName(projectName);

        Assert.That(
            fileName,
            Does.EndWith(expectedExtension),
            $"{projectName} must map to {expectedExtension}"
        );
        Assert.That(fileName, Does.StartWith(projectName));
    }

    #endregion

    #region LN Alias for SDBG

    /// <summary>
    /// PT9 aliases "LN" to "SDBG" in research data: marbleResearchData["LN"] = marbleResearchData["SDBG"].
    /// Some legacy code still references "LN" as the Greek dictionary name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-38")]
    [Property("ExtractionId", "EXT-014")]
    [Description("LN is aliased to SDBG for backward compatibility")]
    public void ResearchData_LNAlias_PointsToSDBG()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddResearchData("SDBG");

        // LN should resolve to the same project as SDBG
        Assert.That(
            dataAccess.HasResearchData("LN"),
            Is.True,
            "LN must be aliased to SDBG for backward compatibility"
        );
    }

    #endregion

    #region MissingRequiredProjects

    /// <summary>
    /// MissingRequiredProjects returns names of required projects that are not present
    /// when bibles exist but research data is incomplete.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-39")]
    [Property("ExtractionId", "EXT-014")]
    [Description("MissingRequiredProjects enumerates absent required projects")]
    public void MissingRequiredProjects_PartialData_ReturnsMissingNames()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible("ESV16UK+", CreateDummyTokenProvider());
        dataAccess.AddResearchData("SDBG");
        dataAccess.AddResearchData("SDBH");

        var missing = dataAccess.MissingRequiredProjects.ToList();

        // Should include the missing ones: MBL_ENC, IMG_INDX, IMG_THMB, GNT, BHS
        Assert.That(missing, Does.Contain("MBL_ENC"));
        Assert.That(missing, Does.Contain("IMG_INDX"));
        Assert.That(missing, Does.Contain("GNT"));
        Assert.That(missing, Does.Contain("BHS"));
        // Should NOT include what we added
        Assert.That(missing, Does.Not.Contain("SDBG"));
        Assert.That(missing, Does.Not.Contain("SDBH"));
    }

    /// <summary>
    /// MissingRequiredProjects returns empty when all required data is present.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-40")]
    [Property("ExtractionId", "EXT-014")]
    [Description("MissingRequiredProjects returns empty when all present")]
    public void MissingRequiredProjects_AllPresent_ReturnsEmpty()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddBible("ESV16UK+", CreateDummyTokenProvider());
        foreach (var name in MarbleDataAccess.RequiredDataProjects)
            dataAccess.AddResearchData(name);

        var missing = dataAccess.MissingRequiredProjects.ToList();

        Assert.That(missing, Is.Empty, "No projects should be missing when all are present");
    }

    #endregion

    #region WantResourceProject

    /// <summary>
    /// WantResourceProject returns true when the resource is new (not already installed).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-41")]
    [Property("ExtractionId", "EXT-014")]
    [Description("WantResourceProject returns true for new resource")]
    public void WantResourceProject_NewResource_ReturnsTrue()
    {
        var dataAccess = new MarbleDataAccess();

        var result = dataAccess.WantResourceProject("SDBG", new Version(1, 0));

        Assert.That(result, Is.True, "Must want new resource that is not installed");
    }

    /// <summary>
    /// WantResourceProject returns true when offered version is newer than existing.
    /// PT9: resource.ResourceVersion > existingText.Settings.Version
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-42")]
    [Property("ExtractionId", "EXT-014")]
    [Description("WantResourceProject returns true when offered version is newer")]
    public void WantResourceProject_NewerVersion_ReturnsTrue()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddResearchDataWithVersion("SDBG", new Version(1, 0));

        var result = dataAccess.WantResourceProject("SDBG", new Version(2, 0));

        Assert.That(result, Is.True, "Must want resource when offered version is newer");
    }

    /// <summary>
    /// WantResourceProject returns false when offered version is same or older.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-028")]
    [Property("ScenarioId", "TS-028-43")]
    [Property("ExtractionId", "EXT-014")]
    [Description("WantResourceProject returns false when offered version is not newer")]
    public void WantResourceProject_SameOrOlderVersion_ReturnsFalse()
    {
        var dataAccess = new MarbleDataAccess();
        dataAccess.AddResearchDataWithVersion("SDBG", new Version(2, 0));

        var resultSame = dataAccess.WantResourceProject("SDBG", new Version(2, 0));
        var resultOlder = dataAccess.WantResourceProject("SDBG", new Version(1, 0));

        Assert.Multiple(() =>
        {
            Assert.That(resultSame, Is.False, "Must not want resource at same version");
            Assert.That(resultOlder, Is.False, "Must not want resource at older version");
        });
    }

    #endregion

    #region Test Helpers

    /// <summary>
    /// Creates a dummy token provider that returns an empty list for any book.
    /// </summary>
    private static Func<int, IReadOnlyList<MarbleToken>> CreateDummyTokenProvider()
    {
        return _ => Array.Empty<MarbleToken>();
    }

    /// <summary>
    /// Creates a token provider that returns the same token list for any book.
    /// </summary>
    private static Func<int, IReadOnlyList<MarbleToken>> CreateTokenProvider(
        IReadOnlyList<MarbleToken> tokens
    )
    {
        return _ => tokens;
    }

    /// <summary>
    /// Creates a token provider that counts invocations and returns the given tokens.
    /// The counter tracks how many times the provider has been called.
    /// </summary>
    private static Func<int, IReadOnlyList<MarbleToken>> CreateCountingTokenProvider(
        IReadOnlyList<MarbleToken> tokens,
        CallCounter counter
    )
    {
        return _ =>
        {
            Interlocked.Increment(ref counter.Count);
            return tokens;
        };
    }

    /// <summary>
    /// Creates a token provider that returns different tokens per book number.
    /// </summary>
    private static Func<int, IReadOnlyList<MarbleToken>> CreateBookSpecificTokenProvider(
        Dictionary<int, IReadOnlyList<MarbleToken>> bookTokens
    )
    {
        return bookNum =>
            bookTokens.TryGetValue(bookNum, out var tokens)
                ? tokens
                : Array.Empty<MarbleToken>();
    }

    /// <summary>
    /// Helper class to track call counts in closures.
    /// </summary>
    private class CallCounter
    {
        public int Count;
    }

    #endregion
}

/// <summary>
/// Data class for image metadata entries used in testing.
/// This is a simplified version of the PT9 BibleImages.BibleImage structure.
/// </summary>
public record ImageMetadataEntry(
    string ImageId,
    string StartRef,
    string EndRef,
    string CollectionName,
    string FilePath
);
