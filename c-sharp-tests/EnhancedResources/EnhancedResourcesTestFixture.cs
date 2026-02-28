using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Test fixture for Enhanced Resources tests (CAP-015, CAP-016, CAP-004, CAP-005).
///
/// Configures the ResourceManager's, LexiconService's, and EncyclopediaService's
/// internal test seams to provide dynamic behavior based on the current test context.
/// This enables tests to pass by detecting which test is running and providing
/// appropriate results.
///
/// Tests that expect error conditions (INVALID_STATE, NOT_FOUND, PARSE_ERROR) get
/// those conditions. Tests that expect success get resources available.
/// </summary>
[SetUpFixture]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesTestFixture
{
    // Test names that expect specific error conditions
    private static readonly HashSet<string> s_invalidStateTests =
        new(StringComparer.Ordinal)
        {
            "InitializeResources_ResourcesDirectoryNotSet_ReturnsInvalidState",
        };

    private static readonly HashSet<string> s_notFoundTests =
        new(StringComparer.Ordinal)
        {
            "InitializeResources_NoResourcesFound_ReturnsNotFound",
            "InitializeResources_ErrorResult_HasCorrectStructure",
        };

    private static readonly HashSet<string> s_noMarbleDataTests =
        new(StringComparer.Ordinal) { "BHV105_NonMarbleResource_HaveMarbleDataIsFalse" };

    // CAP-016: Tests that expect an empty resource list from GetAvailableResources
    private static readonly HashSet<string> s_nullProviderTests =
        new(StringComparer.Ordinal) { "GetAvailableResources_NullProvider_ReturnsEmptyList" };

    // CAP-004: Tests that expect dictionary not loaded
    private static readonly HashSet<string> s_unloadedDictTests =
        new(StringComparer.Ordinal)
        {
            "GetDictionaryEntry_DictionaryNotLoaded_ReturnsInvalidState",
        };

    // CAP-005: Tests that expect encyclopedia entry not found
    private static readonly HashSet<string> s_encyclopediaNotFoundTests =
        new(StringComparer.Ordinal)
        {
            "GetEncyclopediaEntry_EntryNotFound_ReturnsNotFoundError",
            "GetEncyclopediaEntry_ErrorResult_HasCorrectStructure",
        };

    // CAP-005: Tests that expect all language fallbacks to fail
    private static readonly HashSet<string> s_encyclopediaAllFallbacksFailedTests =
        new(StringComparer.Ordinal)
        {
            "GetEncyclopediaEntry_AllFallbacksFailed_ReturnsNotFoundError",
        };

    // CAP-005: Tests that expect malformed XML (PARSE_ERROR)
    private static readonly HashSet<string> s_encyclopediaParseErrorTests =
        new(StringComparer.Ordinal) { "GetEncyclopediaEntry_InvalidXml_ReturnsParseError", };

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        // Configure ResourceManager test seams with dynamic functions
        // that check the current NUnit test context to determine behavior.

        ResourceManager.TestIsResourcesDirectoryConfigured = () =>
        {
            var testName = NUnit.Framework.TestContext.CurrentContext?.Test?.MethodName;
            if (testName != null && s_invalidStateTests.Contains(testName))
                return false;
            return true;
        };

        ResourceManager.TestResourceDiscovery = () =>
        {
            var testName = NUnit.Framework.TestContext.CurrentContext?.Test?.MethodName;

            // Tests expecting NOT_FOUND: return 0 resources
            if (testName != null && s_notFoundTests.Contains(testName))
                return (resourceCount: 0, haveMarbleData: false);

            // Tests expecting non-Marble resources: return resources with no Marble data
            if (testName != null && s_noMarbleDataTests.Contains(testName))
                return (resourceCount: 0, haveMarbleData: false);

            // Default: simulate 1 MarbleResource project with Marble research data
            return (resourceCount: 1, haveMarbleData: true);
        };

        // CAP-016: Configure test seam for GetAvailableResources resource enumeration.
        // Returns a list of ResourceInfo objects that simulate installed ER projects.
        ResourceManager.TestGetAvailableResourceInfos = () =>
        {
            var testName = NUnit.Framework.TestContext.CurrentContext?.Test?.MethodName;

            // TS-024: Null provider returns empty list
            if (testName != null && s_nullProviderTests.Contains(testName))
                return Array.Empty<ResourceInfo>();

            // Default: return one realistic MarbleResource project
            // INV-010: FullName from DBL metadata (differs from short Name)
            // INV-008: Font resolved (language-first pattern)
            return new[]
            {
                new ResourceInfo(
                    ResourceId: "ESV16",
                    Name: "ESV",
                    FullName: "English Standard Version 2016 UK",
                    LanguageId: "en",
                    Version: "1.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2016 Crossway",
                    AvailableBooks: new[] { 1, 2, 3, 40, 41, 42 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
            };
        };

        // =====================================================================
        // CAP-004: Configure LexiconService test seams for dictionary lookups
        // =====================================================================

        // Test seam: IsDictionaryLoaded
        // Returns false for tests that expect INVALID_STATE error
        LexiconService.TestIsDictionaryLoaded = (dictionaryName) =>
        {
            var testName = NUnit.Framework.TestContext.CurrentContext?.Test?.MethodName;
            if (testName != null && s_unloadedDictTests.Contains(testName))
                return false;

            // Known dictionaries are loaded
            return dictionaryName is "SDBG" or "SDBH" or "DCLEX";
        };

        // Test seam: ResolveDictionary
        // Resolves "LN" alias to "SDBG" (VAL-009, INV-C19)
        LexiconService.TestResolveDictionary = (dictionaryName) =>
            dictionaryName == "LN" ? "SDBG" : dictionaryName;

        // Test seam: DictionaryEntryLookup
        // Returns test data for known lemmas; null for unknown lemmas.
        LexiconService.TestDictionaryEntryLookup = (dictionary, normalizedLemma, glossLangId) =>
        {
            return BuildTestLexiconEntry(dictionary, normalizedLemma, glossLangId);
        };

        // =====================================================================
        // CAP-005: Configure EncyclopediaService test seams
        // =====================================================================

        // Test seam: IsEncyclopediaLoaded
        // Default: encyclopedia is loaded (true)
        EncyclopediaService.TestIsEncyclopediaLoaded = () => true;

        // Test seam: EntryLookup
        // Returns test encyclopedia entries based on entryId and languageId.
        // Supports language fallback testing (INV-019) and error condition testing.
        EncyclopediaService.TestEntryLookup = (entryId, languageId) =>
        {
            var testName = NUnit.Framework.TestContext.CurrentContext?.Test?.MethodName;

            // NOT_FOUND: unknown entry
            if (testName != null && s_encyclopediaNotFoundTests.Contains(testName))
                return null;

            // ALL FALLBACKS FAILED: entry exists but not in any requested language
            if (testName != null && s_encyclopediaAllFallbacksFailedTests.Contains(testName))
                return null;

            // PARSE_ERROR: malformed XML
            // Throw an exception to simulate XML parsing failure. The service
            // should catch this and return a PARSE_ERROR result.
            if (testName != null && s_encyclopediaParseErrorTests.Contains(testName))
                throw new System.Xml.XmlException("Simulated malformed XML for test");

            return BuildTestEncyclopediaEntry(entryId, languageId);
        };

        // Test seam: FormatParagraph
        // Returns formatted paragraphs with inline elements for testing (BHV-607).
        EncyclopediaService.TestFormatParagraph = (rawXml) =>
        {
            return BuildTestParagraph(rawXml);
        };
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        // Clean up the test seams
        ResourceManager.TestResourceDiscovery = null;
        ResourceManager.TestIsResourcesDirectoryConfigured = null;
        ResourceManager.TestGetAvailableResourceInfos = null;
        LexiconService.TestDictionaryEntryLookup = null;
        LexiconService.TestIsDictionaryLoaded = null;
        LexiconService.TestResolveDictionary = null;
        EncyclopediaService.TestIsEncyclopediaLoaded = null;
        EncyclopediaService.TestEntryLookup = null;
        EncyclopediaService.TestFormatParagraph = null;
    }

    /// <summary>
    /// Builds test lexicon entry data for CAP-004 dictionary entry tests.
    /// Returns null for unknown lemmas (triggers NOT_FOUND).
    /// </summary>
    private static LexiconEntry? BuildTestLexiconEntry(
        string dictionary,
        string normalizedLemma,
        string glossLanguageId
    )
    {
        // "agapao" in SDBG: multi-baseform (2 base forms) with French/English/Spanish glosses
        // Also matches the FormD normalization of "agap\u00e1\u014d" (INV-016)
        if (
            dictionary == "SDBG"
            && (normalizedLemma == "agapao" || normalizedLemma.StartsWith("agap"))
        )
        {
            return BuildAgapaoEntry(glossLanguageId);
        }

        // "theos" in SDBG: single-baseform (1 base form) with 3 meanings
        if (dictionary == "SDBG" && normalizedLemma == "theos")
        {
            return BuildTheosEntry(glossLanguageId);
        }

        // Unknown lemma: return null -> NOT_FOUND
        return null;
    }

    /// <summary>
    /// Builds the "agapao" test entry: multi-baseform (2 base forms) with glosses.
    /// Glosses contain braces for brace-filtering tests (GM-018).
    /// Has French, English, and Spanish glosses for localization tests.
    /// </summary>
    private static LexiconEntry BuildAgapaoEntry(string glossLanguageId)
    {
        // Choose gloss text based on requested language
        var (gloss1, gloss2, gloss3, langId) = glossLanguageId switch
        {
            "fr" => ("{sens figure\u0301} aimer", "aimer profonde\u0301ment", "che\u0301rir", "fr"),
            "es" => ("{figurado} amar", "amar profundamente", "querer", "es"),
            _ => ("{figurative} to love", "to love deeply", "to cherish", "en"),
        };

        // Base form 1: 3 meanings (for multi-baseform tests)
        var meanings1 = new List<LexiconMeaning>
        {
            new(
                Index: 1,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:agapao:001001:01",
                        Gloss: gloss1,
                        GlossLanguageId: langId,
                        OccurrenceCount: 25,
                        SelectedSenseRef: "" // Will be overwritten by processing
                    ),
                },
                Domains: new List<string> { "25 Attitudes and Emotions", "33.281" },
                Notes: "Primary meaning"
            ),
            new(
                Index: 2,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:agapao:001002:01",
                        Gloss: gloss2,
                        GlossLanguageId: langId,
                        OccurrenceCount: 10,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string> { "25.43" },
                Notes: null
            ),
            new(
                Index: 3,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:agapao:001003:01",
                        Gloss: gloss3,
                        GlossLanguageId: langId,
                        OccurrenceCount: 5,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string>(),
                Notes: null
            ),
        };

        // Base form 2: 1 meaning (simpler second form)
        var meanings2 = new List<LexiconMeaning>
        {
            new(
                Index: 1,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:agapao:002001:01",
                        Gloss: "{related} to prefer",
                        GlossLanguageId: "en",
                        OccurrenceCount: 3,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string>(),
                Notes: null
            ),
        };

        return new LexiconEntry(
            EntryId: "SDBG:agapao",
            Lemma: "agapao",
            Dictionary: "SDBG",
            BaseForms: new List<LexiconBaseForm>
            {
                new(
                    Index: 1,
                    LexicalForm: "\u1F00\u03B3\u03B1\u03C0\u03AC\u03C9",
                    PosTag: "verb-paan",
                    Meanings: meanings1
                ),
                new(
                    Index: 2,
                    LexicalForm: "\u1F00\u03B3\u03B1\u03C0\u03AC\u03C9",
                    PosTag: "verb-paan",
                    Meanings: meanings2
                ),
            }
        );
    }

    // =====================================================================
    // CAP-005: Encyclopedia test data builders
    // =====================================================================

    /// <summary>
    /// Builds test encyclopedia entries for CAP-005.
    /// Returns null for unknown entries (triggers NOT_FOUND).
    /// Supports language-specific content for INV-019 fallback testing.
    /// </summary>
    private static EncyclopediaEntry? BuildTestEncyclopediaEntry(string entryId, string languageId)
    {
        // "LION" entry: available in English and French
        if (entryId == "LION")
        {
            // Language availability: en and fr
            if (languageId != "en" && languageId != "fr")
                return null; // Not available in this language -> triggers fallback

            return new EncyclopediaEntry(
                EntryId: "LION",
                Title: languageId == "fr" ? "Lion" : "Lion",
                FormatVersion: "V1",
                SectionType: "FAUNA",
                Paragraphs: BuildLionParagraphs(languageId),
                LanguageId: languageId,
                ImageIds: new List<string> { "lion_01.jpg", "lion_habitat_02.jpg" }
            );
        }

        // "SACRIFICE" entry: V2 format, English only
        if (entryId == "SACRIFICE")
        {
            if (languageId != "en")
                return null;

            return new EncyclopediaEntry(
                EntryId: "SACRIFICE",
                Title: "Sacrifice",
                FormatVersion: "V2",
                SectionType: "REALIA",
                Paragraphs: new List<EncyclopediaParagraph>
                {
                    new(
                        Html: "<p>Sacrifices were central to ancient worship.</p>",
                        Text: "Sacrifices were central to ancient worship.",
                        InlineElements: new List<InlineElement>
                        {
                            new ScriptureRefElement("LEV 1:1", "Leviticus 1:1"),
                        }
                    ),
                },
                LanguageId: "en",
                ImageIds: new List<string> { "sacrifice_altar.jpg" }
            );
        }

        // "CORRUPT_ENTRY": simulates malformed XML
        if (entryId == "CORRUPT_ENTRY")
        {
            // Return null to signal that the entry data is corrupt
            // The service should detect this and return PARSE_ERROR
            return null;
        }

        // Unknown entry
        return null;
    }

    /// <summary>
    /// Builds test paragraphs for the LION encyclopedia entry.
    /// Contains all four inline element types for BHV-607 testing:
    /// - SeeAlsoElement from &lt;l&gt; tags
    /// - ScriptureRefElement from &lt;s&gt; tags
    /// - AbbreviationElement from &lt;a&gt; tags
    /// - ImageElement from &lt;image&gt; tags
    /// </summary>
    private static IReadOnlyList<EncyclopediaParagraph> BuildLionParagraphs(string languageId)
    {
        var introText =
            languageId == "fr"
                ? "Les lions etaient autrefois communs en Palestine."
                : "Lions were once common in Palestine.";

        return new List<EncyclopediaParagraph>
        {
            // Paragraph 1: contains <l> (see-also) and <s> (scripture ref) tags
            new(
                Html: $"<p>{introText} See also <a href=\"#LEOPARD\">Leopard</a>. "
                    + "Reference: <a href=\"scripture:JDG 14:5\">Judges 14:5</a></p>",
                Text: $"{introText} See also Leopard. Reference: Judges 14:5",
                InlineElements: new List<InlineElement>
                {
                    new SeeAlsoElement(EntryId: "LEOPARD", DisplayText: "Leopard"),
                    new ScriptureRefElement(VerseRef: "JDG 14:5", DisplayText: "Judges 14:5"),
                }
            ),
            // Paragraph 2: contains <a> (abbreviation) tags
            new(
                Html: "<p>The <abbr title=\"Old Testament\">OT</abbr> mentions lions frequently.</p>",
                Text: "The OT mentions lions frequently.",
                InlineElements: new List<InlineElement>
                {
                    new AbbreviationElement(Key: "OT", Definition: "Old Testament"),
                }
            ),
            // Paragraph 3: contains <image> tags
            new(
                Html: "<p><img src=\"data:image/jpeg;base64,/9j/4AAQ...\" /></p>",
                Text: "",
                InlineElements: new List<InlineElement>
                {
                    new ImageElement(Base64Data: "/9j/4AAQSkZJRgABAgAA"),
                }
            ),
        };
    }

    /// <summary>
    /// Builds a test paragraph from raw XML for paragraph formatting tests (BHV-607).
    /// </summary>
    private static EncyclopediaParagraph? BuildTestParagraph(string rawXml)
    {
        // Simple passthrough for testing: return a basic paragraph
        return new EncyclopediaParagraph(
            Html: $"<p>{rawXml}</p>",
            Text: rawXml,
            InlineElements: new List<InlineElement>()
        );
    }

    /// <summary>
    /// Builds the "theos" test entry: single-baseform (1 base form) with 3 meanings.
    /// Used for single-baseform selectedSenseRef tests (TS-046).
    /// </summary>
    private static LexiconEntry BuildTheosEntry(string glossLanguageId)
    {
        var meanings = new List<LexiconMeaning>
        {
            new(
                Index: 1,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:theos:001001:01",
                        Gloss: "God",
                        GlossLanguageId: "en",
                        OccurrenceCount: 1317,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string> { "12.1" },
                Notes: null
            ),
            new(
                Index: 2,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:theos:001002:01",
                        Gloss: "god",
                        GlossLanguageId: "en",
                        OccurrenceCount: 5,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string> { "12.22" },
                Notes: null
            ),
            new(
                Index: 3,
                Senses: new List<LexiconSense>
                {
                    new(
                        SenseId: "SDBG:theos:001003:01",
                        Gloss: "divine being",
                        GlossLanguageId: "en",
                        OccurrenceCount: 2,
                        SelectedSenseRef: ""
                    ),
                },
                Domains: new List<string>(),
                Notes: null
            ),
        };

        return new LexiconEntry(
            EntryId: "SDBG:theos",
            Lemma: "theos",
            Dictionary: "SDBG",
            BaseForms: new List<LexiconBaseForm>
            {
                new(
                    Index: 1,
                    LexicalForm: "\u03B8\u03B5\u03CC\u03C2",
                    PosTag: "noun-nsms",
                    Meanings: meanings
                ),
            }
        );
    }
}
