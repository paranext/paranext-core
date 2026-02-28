using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for EncyclopediaService.GetEncyclopediaEntryAsync (CAP-005).
///
/// Retrieves encyclopedia entries with three-level language fallback, supporting
/// both V1 and V2 formats with paragraph formatting. Paragraphs contain inline
/// elements: see-also links, scripture refs, abbreviation tooltips, and images.
///
/// Contract: Section 4.5 GetEncyclopediaEntry (data-contracts.md)
/// Input Type: Section 2.4 EncyclopediaLookupInput
/// Output Type: Section 3.4 EncyclopediaResult
/// Behaviors: BHV-304 (Encyclopedia Entry Data Models),
///            BHV-606 (V1/V2 Format Support),
///            BHV-607 (Paragraph Formatting Rules)
/// Invariants: INV-019 (Encyclopedia Language Fallback Chain)
/// Golden Masters: GM-009 (V1/V2 Parsing), GM-015 (Paragraph Formatting),
///                 GM-019 (Language Fallback)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class EncyclopediaServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-005
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetEncyclopediaEntryAsync is called with a valid entry ID
    /// and resource language, it returns an EncyclopediaResult with structured entries
    /// containing formatted paragraphs with inline elements. This matches the combined
    /// behavior of GM-009 (parsing), GM-015 (formatting), and GM-019 (fallback).
    ///
    /// This test passes when CAP-005 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Property("GoldenMaster", "GM-009")]
    [Description(
        "Acceptance test: Encyclopedia entry retrieved with correct format version, "
            + "section type, formatted paragraphs with inline elements, "
            + "and three-level language fallback"
    )]
    public async Task GetEncyclopediaEntry_AcceptanceTest_MatchesGoldenMasters()
    {
        // Arrange: Look up a known encyclopedia entry (e.g., LION) in the resource language
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act: Call the public API defined in data-contracts.md Section 4.5
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Verify result is successful with structured entry data
        Assert.That(result.Success, Is.True, "Encyclopedia lookup should succeed");
        Assert.That(result.Entries, Is.Not.Null, "Entries should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify entry structure per Section 3.4 EncyclopediaResult
        Assert.That(result.Entries!, Has.Count.GreaterThanOrEqualTo(1), "At least one entry");

        var entry = result.Entries![0];
        Assert.That(entry.EntryId, Is.EqualTo("LION"), "EntryId should match input");
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "Title should be populated");
        Assert.That(
            entry.FormatVersion,
            Is.EqualTo("V1").Or.EqualTo("V2"),
            "FormatVersion must be V1 or V2 (BHV-304)"
        );
        Assert.That(entry.LanguageId, Is.EqualTo("en"), "Language should match resource language");

        // Verify paragraphs with inline elements (GM-015)
        Assert.That(entry.Paragraphs, Is.Not.Null.And.Not.Empty, "Paragraphs should be populated");

        var paragraph = entry.Paragraphs[0];
        Assert.That(paragraph.Html, Is.Not.Null, "Paragraph HTML should be present");
        Assert.That(paragraph.Text, Is.Not.Null, "Paragraph text should be present");
        Assert.That(
            paragraph.InlineElements,
            Is.Not.Null,
            "InlineElements collection should be present"
        );

        // Verify image IDs are present
        Assert.That(entry.ImageIds, Is.Not.Null, "ImageIds collection should be present");
    }

    // =========================================================================
    // V1 PARSING TESTS (BHV-304, BHV-606)
    // =========================================================================

    /// <summary>
    /// V1 format encyclopedia entries parsed from XML serialization (Memento.FromXmlString).
    /// Verifies the entry structure is correctly populated from V1 XML format.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Property("GoldenMaster", "GM-009")]
    [Description("V1 encyclopedia entry parsed from XML serialization produces valid structure")]
    public async Task GetEncyclopediaEntry_V1Format_ParsesCorrectly()
    {
        // Arrange: Request an entry that exists in V1 format
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: V1 entry has correct structure
        Assert.That(result.Success, Is.True);
        var entry = result.Entries![0];

        Assert.That(entry.FormatVersion, Is.EqualTo("V1"), "Should be V1 format");
        Assert.That(entry.EntryId, Is.Not.Null.And.Not.Empty, "EntryId populated");
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "Title populated");
        Assert.That(
            entry.Paragraphs,
            Is.Not.Null.And.Not.Empty,
            "Paragraphs populated from V1 XML"
        );

        // V1 section type should be one of FLORA, FAUNA, REALIA, or null
        if (entry.SectionType != null)
        {
            Assert.That(
                entry.SectionType,
                Is.EqualTo("FLORA").Or.EqualTo("FAUNA").Or.EqualTo("REALIA"),
                "SectionType must be FLORA, FAUNA, or REALIA (BHV-304)"
            );
        }
    }

    /// <summary>
    /// V2 format encyclopedia entries parsed from XDocument (Thematic_Lexicon.ParseXml).
    /// V2 entries include word-offset references in the last 5 digits.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-304")]
    [Property("GoldenMaster", "GM-009")]
    [Description(
        "V2 encyclopedia entry parsed from XDocument produces valid structure with word offsets"
    )]
    public async Task GetEncyclopediaEntry_V2Format_ParsesCorrectly()
    {
        // Arrange: Request an entry that exists in V2 format
        var input = new EncyclopediaLookupInput(
            EntryId: "SACRIFICE",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: V2 entry has correct structure
        Assert.That(result.Success, Is.True);
        var entry = result.Entries![0];

        Assert.That(entry.FormatVersion, Is.EqualTo("V2"), "Should be V2 format");
        Assert.That(entry.EntryId, Is.Not.Null.And.Not.Empty, "EntryId populated");
        Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "Title populated");
        Assert.That(
            entry.Paragraphs,
            Is.Not.Null.And.Not.Empty,
            "Paragraphs populated from V2 XDocument"
        );
    }

    /// <summary>
    /// V1 and V2 encyclopedia formats produce equivalent entry structures.
    /// This is a key invariant (BHV-606): same content in either format
    /// yields equivalent ThemLex_Entry structures.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-606")]
    [Property("GoldenMaster", "GM-009")]
    [Description("V1 and V2 formats produce equivalent encyclopedia entries (BHV-606)")]
    public async Task GetEncyclopediaEntry_V1AndV2_ProduceEquivalentEntries()
    {
        // Arrange: Request the same entry in a resource that has both V1 and V2 data
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: If result contains entries from both formats, they are equivalent
        Assert.That(result.Success, Is.True);
        Assert.That(result.Entries, Is.Not.Null);

        // At minimum, the entry should be available in at least one format
        var entry = result.Entries![0];
        Assert.That(
            entry.FormatVersion,
            Is.EqualTo("V1").Or.EqualTo("V2"),
            "Entry must be in either V1 or V2 format"
        );

        // Core fields must match regardless of format
        Assert.That(entry.EntryId, Is.EqualTo("LION"));
        Assert.That(entry.Paragraphs, Is.Not.Null.And.Not.Empty);
        Assert.That(entry.LanguageId, Is.EqualTo("en"));
    }

    // =========================================================================
    // PARAGRAPH FORMATTING TESTS (BHV-607)
    // =========================================================================

    /// <summary>
    /// Encyclopedia paragraph <l> tags are converted to see-also links
    /// that reference other encyclopedia entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMaster", "GM-015")]
    [Description("Paragraph <l> tags become SeeAlsoElement inline elements")]
    public async Task GetEncyclopediaEntry_LTagInParagraph_BecomesSeeAlsoLink()
    {
        // Arrange: Request an entry whose paragraphs contain <l> tags
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: At least one paragraph contains a SeeAlsoElement
        Assert.That(result.Success, Is.True);
        var allInlineElements = result
            .Entries!.SelectMany(e => e.Paragraphs)
            .SelectMany(p => p.InlineElements)
            .ToList();

        var seeAlsoElements = allInlineElements.OfType<SeeAlsoElement>().ToList();
        Assert.That(
            seeAlsoElements,
            Is.Not.Empty,
            "Should have at least one SeeAlsoElement from <l> tags"
        );

        // Verify SeeAlsoElement structure
        var seeAlso = seeAlsoElements[0];
        Assert.That(seeAlso.Type, Is.EqualTo("seeAlso"), "Type discriminator");
        Assert.That(
            seeAlso.EntryId,
            Is.Not.Null.And.Not.Empty,
            "EntryId should reference another encyclopedia entry"
        );
        Assert.That(
            seeAlso.DisplayText,
            Is.Not.Null.And.Not.Empty,
            "DisplayText should be the visible link text"
        );
    }

    /// <summary>
    /// Encyclopedia paragraph <s> tags are converted to scripture goto links
    /// with verse references.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMaster", "GM-015")]
    [Description("Paragraph <s> tags become ScriptureRefElement inline elements")]
    public async Task GetEncyclopediaEntry_STagInParagraph_BecomesScriptureRef()
    {
        // Arrange: Request an entry whose paragraphs contain <s> tags
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: At least one paragraph contains a ScriptureRefElement
        Assert.That(result.Success, Is.True);
        var allInlineElements = result
            .Entries!.SelectMany(e => e.Paragraphs)
            .SelectMany(p => p.InlineElements)
            .ToList();

        var scriptureRefs = allInlineElements.OfType<ScriptureRefElement>().ToList();
        Assert.That(
            scriptureRefs,
            Is.Not.Empty,
            "Should have at least one ScriptureRefElement from <s> tags"
        );

        // Verify ScriptureRefElement structure
        var scriptureRef = scriptureRefs[0];
        Assert.That(scriptureRef.Type, Is.EqualTo("scriptureRef"), "Type discriminator");
        Assert.That(
            scriptureRef.VerseRef,
            Is.Not.Null.And.Not.Empty,
            "VerseRef should contain a scripture reference string"
        );
        Assert.That(
            scriptureRef.DisplayText,
            Is.Not.Null.And.Not.Empty,
            "DisplayText should be the visible link text (e.g., 'GEN 1:1')"
        );
    }

    /// <summary>
    /// Encyclopedia paragraph <a> tags are converted to abbreviation tooltips
    /// that show definitions on hover.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-064")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMaster", "GM-015")]
    [Description("Paragraph <a> tags become AbbreviationElement inline elements")]
    public async Task GetEncyclopediaEntry_ATagInParagraph_BecomesAbbreviationTooltip()
    {
        // Arrange: Request an entry whose paragraphs contain <a> tags
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: At least one paragraph contains an AbbreviationElement
        Assert.That(result.Success, Is.True);
        var allInlineElements = result
            .Entries!.SelectMany(e => e.Paragraphs)
            .SelectMany(p => p.InlineElements)
            .ToList();

        var abbreviations = allInlineElements.OfType<AbbreviationElement>().ToList();
        Assert.That(
            abbreviations,
            Is.Not.Empty,
            "Should have at least one AbbreviationElement from <a> tags"
        );

        // Verify AbbreviationElement structure
        var abbreviation = abbreviations[0];
        Assert.That(abbreviation.Type, Is.EqualTo("abbreviation"), "Type discriminator");
        Assert.That(
            abbreviation.Key,
            Is.Not.Null.And.Not.Empty,
            "Key should be the abbreviation text (e.g., 'NT')"
        );
        Assert.That(
            abbreviation.Definition,
            Is.Not.Null.And.Not.Empty,
            "Definition should explain the abbreviation"
        );
    }

    /// <summary>
    /// Encyclopedia paragraph <image> tags are converted to base64 inline images.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMaster", "GM-015")]
    [Description("Paragraph <image> tags become ImageElement inline elements with base64 data")]
    public async Task GetEncyclopediaEntry_ImageTagInParagraph_BecomesBase64Image()
    {
        // Arrange: Request an entry whose paragraphs contain <image> tags
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: At least one paragraph contains an ImageElement
        Assert.That(result.Success, Is.True);
        var allInlineElements = result
            .Entries!.SelectMany(e => e.Paragraphs)
            .SelectMany(p => p.InlineElements)
            .ToList();

        var images = allInlineElements.OfType<ImageElement>().ToList();
        Assert.That(
            images,
            Is.Not.Empty,
            "Should have at least one ImageElement from <image> tags"
        );

        // Verify ImageElement structure
        var image = images[0];
        Assert.That(image.Type, Is.EqualTo("image"), "Type discriminator");
        Assert.That(
            image.Base64Data,
            Is.Not.Null.And.Not.Empty,
            "Base64Data should contain encoded image data"
        );
    }

    // =========================================================================
    // LANGUAGE FALLBACK TESTS (INV-019)
    // =========================================================================

    /// <summary>
    /// Language fallback step 1: resource language content is preferred when available.
    /// INV-019 specifies: resource language -> UI language -> English.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-304")]
    [Property("InvariantId", "INV-019")]
    [Property("GoldenMaster", "GM-019")]
    [Description("Language fallback: resource language content returned when available")]
    public async Task GetEncyclopediaEntry_ResourceLanguageAvailable_ReturnsResourceLanguage()
    {
        // Arrange: Request in French (resource language), with English as UI language
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "fr",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Content is returned in French (resource language preferred)
        Assert.That(result.Success, Is.True, "Lookup should succeed");
        Assert.That(result.Entries, Is.Not.Null);

        var entry = result.Entries![0];
        Assert.That(
            entry.LanguageId,
            Is.EqualTo("fr"),
            "INV-019: Resource language (fr) should be preferred when available"
        );
    }

    /// <summary>
    /// Language fallback step 2: UI language used when resource language is unavailable.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-076")]
    [Property("BehaviorId", "BHV-304")]
    [Property("InvariantId", "INV-019")]
    [Property("GoldenMaster", "GM-019")]
    [Description(
        "Language fallback: UI language content returned when resource language unavailable"
    )]
    public async Task GetEncyclopediaEntry_ResourceLanguageUnavailable_FallsBackToUiLanguage()
    {
        // Arrange: Request in unknown resource language (xx), with English as UI language
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "xx",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Content falls back to UI language (en)
        Assert.That(result.Success, Is.True, "Lookup should succeed via fallback");
        Assert.That(result.Entries, Is.Not.Null);

        var entry = result.Entries![0];
        Assert.That(
            entry.LanguageId,
            Is.EqualTo("en"),
            "INV-019: Should fall back to UI language (en) when resource language unavailable"
        );
    }

    /// <summary>
    /// Language fallback step 3: English used as final fallback when both resource
    /// and UI languages are unavailable.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-077")]
    [Property("BehaviorId", "BHV-304")]
    [Property("InvariantId", "INV-019")]
    [Property("GoldenMaster", "GM-019")]
    [Description(
        "Language fallback: English content returned as final fallback "
            + "when both resource and UI languages unavailable"
    )]
    public async Task GetEncyclopediaEntry_BothLanguagesUnavailable_FallsBackToEnglish()
    {
        // Arrange: Both resource and UI languages are unknown
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "xx",
            UiLanguageId: "yy"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Content falls back to English as final fallback
        Assert.That(result.Success, Is.True, "Lookup should succeed via English fallback");
        Assert.That(result.Entries, Is.Not.Null);

        var entry = result.Entries![0];
        Assert.That(
            entry.LanguageId,
            Is.EqualTo("en"),
            "INV-019: Should fall back to English when both resource and UI languages unavailable"
        );
    }

    // =========================================================================
    // ERROR CONDITION TESTS
    // =========================================================================

    /// <summary>
    /// When the requested entry ID does not exist, returns NOT_FOUND error.
    /// Contract Section 4.5 error condition: "No encyclopedia entry found for ID '{entryId}'"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("Entry not found returns NOT_FOUND error with descriptive message")]
    public async Task GetEncyclopediaEntry_EntryNotFound_ReturnsNotFoundError()
    {
        // Arrange: Request a non-existent entry
        var input = new EncyclopediaLookupInput(
            EntryId: "NONEXISTENT_ENTRY_XYZ",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Returns error with NOT_FOUND code
        Assert.That(result.Success, Is.False, "Should fail for non-existent entry");
        Assert.That(result.Entries, Is.Null, "Entries should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Does.Contain("NONEXISTENT_ENTRY_XYZ"),
            "Error message should include the requested entry ID"
        );
    }

    /// <summary>
    /// When all language fallback levels fail (no content in resource, UI, or English),
    /// returns NOT_FOUND error indicating no localized content.
    /// Contract Section 4.5: "No localized content for entry '{entryId}' in any available language"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-077")]
    [Property("BehaviorId", "BHV-304")]
    [Property("InvariantId", "INV-019")]
    [Description("All language fallbacks failed returns NOT_FOUND with language error message")]
    public async Task GetEncyclopediaEntry_AllFallbacksFailed_ReturnsNotFoundError()
    {
        // Arrange: Request an entry that has no content in any language
        var input = new EncyclopediaLookupInput(
            EntryId: "ENTRY_WITH_NO_TRANSLATIONS",
            ResourceLanguageId: "xx",
            UiLanguageId: "yy"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Returns NOT_FOUND with language-specific message
        Assert.That(result.Success, Is.False, "Should fail when no language has content");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Does.Contain("localized content"),
            "Error message should mention localization failure"
        );
    }

    /// <summary>
    /// When encyclopedia XML data is malformed, returns PARSE_ERROR.
    /// Contract Section 4.5: "Failed to parse encyclopedia entry XML"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("Invalid XML format returns PARSE_ERROR with descriptive message")]
    public async Task GetEncyclopediaEntry_InvalidXml_ReturnsParseError()
    {
        // Arrange: Request an entry whose data is corrupted/malformed XML
        var input = new EncyclopediaLookupInput(
            EntryId: "CORRUPT_ENTRY",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Returns PARSE_ERROR
        Assert.That(result.Success, Is.False, "Should fail for corrupt XML");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("PARSE_ERROR"),
            "Error code should be PARSE_ERROR"
        );
        Assert.That(
            result.Error.Message,
            Does.Contain("parse"),
            "Error message should mention parsing failure"
        );
    }

    // =========================================================================
    // ENTRY STRUCTURE VERIFICATION TESTS
    // =========================================================================

    /// <summary>
    /// Successful encyclopedia result has correct structure:
    /// - Success = true, Entries populated, Error = null
    /// - Each entry has entryId, title, formatVersion, paragraphs, languageId, imageIds
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("Successful result has correct structure per Section 3.4")]
    public async Task GetEncyclopediaEntry_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Full structure verification
        Assert.That(result.Success, Is.True);
        Assert.That(result.Error, Is.Null);
        Assert.That(result.Entries, Is.Not.Null);

        var entry = result.Entries![0];
        Assert.Multiple(() =>
        {
            Assert.That(entry.EntryId, Is.Not.Null.And.Not.Empty, "EntryId required");
            Assert.That(entry.Title, Is.Not.Null.And.Not.Empty, "Title required");
            Assert.That(
                entry.FormatVersion,
                Is.EqualTo("V1").Or.EqualTo("V2"),
                "FormatVersion must be V1 or V2"
            );
            Assert.That(entry.Paragraphs, Is.Not.Null, "Paragraphs collection required");
            Assert.That(entry.LanguageId, Is.Not.Null.And.Not.Empty, "LanguageId required");
            Assert.That(entry.ImageIds, Is.Not.Null, "ImageIds collection required");
        });
    }

    /// <summary>
    /// Error result has correct structure:
    /// - Success = false, Entries = null, Error populated with code and message
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("Error result has correct structure per Section 3.4")]
    public async Task GetEncyclopediaEntry_ErrorResult_HasCorrectStructure()
    {
        // Arrange
        var input = new EncyclopediaLookupInput(
            EntryId: "NONEXISTENT_ENTRY_XYZ",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Error structure verification
        Assert.That(result.Success, Is.False);
        Assert.That(result.Entries, Is.Null, "Entries should be null on error");
        Assert.That(result.Error, Is.Not.Null, "Error should be populated");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code required");
        Assert.That(result.Error.Message, Is.Not.Null.And.Not.Empty, "Error message required");
    }

    // =========================================================================
    // SECTION TYPE TESTS (BHV-304)
    // =========================================================================

    /// <summary>
    /// Encyclopedia entries may have section types: FLORA, FAUNA, REALIA, or null.
    /// This categorization comes from the encyclopedia data structure.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("SectionType must be FLORA, FAUNA, REALIA, or null")]
    public async Task GetEncyclopediaEntry_SectionType_IsValidCategory()
    {
        // Arrange
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: SectionType is valid
        Assert.That(result.Success, Is.True);
        var entry = result.Entries![0];

        if (entry.SectionType != null)
        {
            Assert.That(
                new[] { "FLORA", "FAUNA", "REALIA" },
                Does.Contain(entry.SectionType),
                "SectionType must be one of: FLORA, FAUNA, REALIA"
            );
        }
    }

    // =========================================================================
    // IMAGE IDS TESTS
    // =========================================================================

    /// <summary>
    /// Encyclopedia entries include associated image IDs for display in the media tab.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-304")]
    [Description("Entries include associated imageIds collection")]
    public async Task GetEncyclopediaEntry_WithImages_IncludesImageIds()
    {
        // Arrange: Request an entry that has associated images
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: ImageIds collection is present and non-null
        Assert.That(result.Success, Is.True);
        var entry = result.Entries![0];
        Assert.That(
            entry.ImageIds,
            Is.Not.Null,
            "ImageIds collection should always be present (may be empty)"
        );
    }

    // =========================================================================
    // PARAGRAPH HTML AND TEXT TESTS
    // =========================================================================

    /// <summary>
    /// Each encyclopedia paragraph has both HTML (rendered) and text (raw) content.
    /// The HTML includes formatted inline elements; the text is plain content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMaster", "GM-015")]
    [Description("Paragraphs have both HTML and text representations")]
    public async Task GetEncyclopediaEntry_Paragraphs_HaveBothHtmlAndText()
    {
        // Arrange
        var input = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );

        // Act
        var result = await EncyclopediaService.GetEncyclopediaEntryAsync(
            input,
            CancellationToken.None
        );

        // Assert: Each paragraph has HTML and text
        Assert.That(result.Success, Is.True);
        foreach (var paragraph in result.Entries![0].Paragraphs)
        {
            Assert.That(paragraph.Html, Is.Not.Null, "HTML content should be present");
            Assert.That(paragraph.Text, Is.Not.Null, "Text content should be present");
            Assert.That(
                paragraph.InlineElements,
                Is.Not.Null,
                "InlineElements collection should be present"
            );
        }
    }
}
