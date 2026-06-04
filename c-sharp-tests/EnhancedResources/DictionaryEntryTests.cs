using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for DictionaryService.GetDictionaryEntry - returns structured DictionaryEntryData DTO.
/// CAP-008: GetDictionaryEntry
///
/// Behaviors: BHV-364 (Dictionary display context)
/// Contract: Section 4.8 M-008, DictionaryEntryInput -> DictionaryEntryData
/// Sources: EXT-055 (Dictionary Definition HTML -> Structured DTO)
///
/// DictionaryService.GetDictionaryEntry takes a DictionaryEntryInput (entryId, glossLanguage,
/// optional subItemId) and returns a DictionaryEntryData structured DTO with:
///   - entryId, lemma
///   - senses (with glosses and definitions)
///   - semanticDomains
///   - relatedLexemes (with lemma, entryId, relationship, gloss)
///   - morphology
///
/// Error conditions:
///   - Entry not found: NOT_FOUND PlatformError ("Lexicon entry '{entryId}' not found")
///   - Sub-item not found: NOT_FOUND PlatformError ("Dictionary sub-item '{subItemId}' not found in entry '{entryId}'")
///
/// No HTML generation on backend (Theme 2 revision).
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class DictionaryEntryTests
{
    private static DictionaryService BuildService() =>
        new(DictionaryFixtures.BuildDictionaryData(), new FakeMarbleBookTokenProvider());

    #region Acceptance Tests

    // =========================================================================
    // Acceptance test: GetDictionaryEntry returns DictionaryEntryData with
    // senses, glosses, semantic domain links, related lexemes, and morphology.
    // Entry not found returns NOT_FOUND PlatformError.
    // Sub-item not found returns NOT_FOUND PlatformError with descriptive message.
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance: GetDictionaryEntry returns structured DTO with senses, glosses, semantic domains, related lexemes, and morphology"
    )]
    public void GetDictionaryEntry_ValidEntry_ReturnsStructuredDto()
    {
        // Arrange: Request a known dictionary entry
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: All required fields populated in the structured DTO
        Assert.That(result, Is.Not.Null);
        Assert.That(result.EntryId, Is.Not.Null.And.Not.Empty, "EntryId must be populated");
        Assert.That(result.Lemma, Is.Not.Null.And.Not.Empty, "Lemma must be populated");
        Assert.That(
            result.Senses,
            Is.Not.Null.And.Not.Empty,
            "Senses must be populated for a valid entry"
        );
        Assert.That(result.SemanticDomains, Is.Not.Null, "SemanticDomains must not be null");
        Assert.That(result.RelatedLexemes, Is.Not.Null, "RelatedLexemes must not be null");
        Assert.That(result.Morphology, Is.Not.Null, "Morphology must not be null");
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance: GetDictionaryEntry for missing entry returns NOT_FOUND PlatformError"
    )]
    public void GetDictionaryEntry_EntryNotFound_ReturnsNotFoundError()
    {
        // Arrange: Non-existent entry
        var input = new DictionaryEntryInput(EntryId: "nonexistent-entry-xyz", GlossLanguage: "en");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Entry not found must return NOT_FOUND error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("nonexistent-entry-xyz"),
            "Error message must contain the missing entryId"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance: GetDictionaryEntry for missing sub-item returns NOT_FOUND with descriptive message"
    )]
    public void GetDictionaryEntry_SubItemNotFound_ReturnsNotFoundWithDescriptiveMessage()
    {
        // Arrange: Valid entry but non-existent sub-item
        var input = new DictionaryEntryInput(
            EntryId: "logos",
            GlossLanguage: "en",
            SubItemId: "nonexistent-sub-item"
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Sub-item not found must return NOT_FOUND error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("nonexistent-sub-item"),
            "Error message must contain the missing subItemId"
        );
        Assert.That(
            ex.Message,
            Does.Contain("logos"),
            "Error message must contain the parent entryId for context"
        );
    }

    #endregion

    #region Senses Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Each sense has a senseId, glosses with language/text pairs, and definition")]
    public void GetDictionaryEntry_Senses_HaveRequiredFields()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Each sense has required structure
        Assert.That(result.Senses, Is.Not.Empty, "Expected at least one sense");
        foreach (var sense in result.Senses)
        {
            Assert.That(sense.SenseId, Is.Not.Null.And.Not.Empty, "Each sense must have a SenseId");
            Assert.That(
                sense.Glosses,
                Is.Not.Null.And.Not.Empty,
                $"Sense '{sense.SenseId}' must have at least one gloss"
            );
            Assert.That(
                sense.Definition,
                Is.Not.Null,
                $"Sense '{sense.SenseId}' must have a Definition (may be empty string)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Glosses contain language and text fields")]
    public void GetDictionaryEntry_Glosses_HaveLanguageAndText()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Glosses have language and text
        var allGlosses = result.Senses.SelectMany(s => s.Glosses).ToList();
        Assert.That(allGlosses, Is.Not.Empty, "Expected glosses across senses");
        foreach (var gloss in allGlosses)
        {
            Assert.That(
                gloss.Language,
                Is.Not.Null.And.Not.Empty,
                "Gloss must have a Language code"
            );
            Assert.That(gloss.Text, Is.Not.Null.And.Not.Empty, "Gloss must have Text content");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Entry with multiple senses returns all senses")]
    public void GetDictionaryEntry_MultipleSenses_AllReturned()
    {
        // Arrange: Request an entry known to have multiple senses
        // (logos has senses: "word" and "message" per the test lexicon)
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Multiple senses
        Assert.That(
            result.Senses.Count,
            Is.GreaterThanOrEqualTo(2),
            "Entry with multiple meanings must return all senses"
        );
    }

    #endregion

    #region Semantic Domains

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Semantic domains list populated from SDBG/SDBH files")]
    public void GetDictionaryEntry_SemanticDomains_Populated()
    {
        // Arrange: Entry with known semantic domain associations
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: SemanticDomains populated
        Assert.That(
            result.SemanticDomains,
            Is.Not.Empty,
            "SemanticDomains must be populated for entries with domain associations"
        );
        foreach (var domain in result.SemanticDomains)
        {
            Assert.That(
                domain,
                Is.Not.Null.And.Not.Empty,
                "Each semantic domain string must be non-empty"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Entry with no semantic domains returns empty list, not null")]
    public void GetDictionaryEntry_NoSemanticDomains_ReturnsEmptyList()
    {
        // Arrange: Entry without semantic domain associations (e.g., a conjunction)
        var input = new DictionaryEntryInput(EntryId: "kai", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Empty list, not null
        Assert.That(result.SemanticDomains, Is.Not.Null, "SemanticDomains must not be null");
        Assert.That(
            result.SemanticDomains,
            Is.Empty,
            "Entry without domains should have empty SemanticDomains list"
        );
    }

    #endregion

    #region Related Lexemes

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Related lexemes populated with lemma, entryId, relationship, and gloss")]
    public void GetDictionaryEntry_RelatedLexemes_HaveRequiredFields()
    {
        // Arrange: Entry with known related lexemes
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Related lexemes have all required fields
        Assert.That(
            result.RelatedLexemes,
            Is.Not.Empty,
            "Expected related lexemes for entry with shared glosses/domains"
        );
        foreach (var related in result.RelatedLexemes)
        {
            Assert.That(
                related.Lemma,
                Is.Not.Null.And.Not.Empty,
                "Related lexeme must have a Lemma"
            );
            Assert.That(
                related.EntryId,
                Is.Not.Null.And.Not.Empty,
                "Related lexeme must have an EntryId"
            );
            Assert.That(
                related.Relationship,
                Is.Not.Null.And.Not.Empty,
                "Related lexeme must have a Relationship type"
            );
            Assert.That(
                related.Gloss,
                Is.Not.Null,
                "Related lexeme must have a Gloss (may be empty string)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Related lexemes do not include the source entry itself")]
    public void GetDictionaryEntry_RelatedLexemes_ExcludesSelf()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Source entry's own lemma must not appear in related lexemes
        Assert.That(result.RelatedLexemes, Is.Not.Empty);
        var selfRefs = result.RelatedLexemes.Where(r => r.Lemma == result.Lemma).ToList();
        Assert.That(
            selfRefs,
            Is.Empty,
            "Source entry must not appear in its own RelatedLexemes (self-exclusion)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Entry with no related lexemes returns empty list, not null")]
    public void GetDictionaryEntry_NoRelatedLexemes_ReturnsEmptyList()
    {
        // Arrange: Entry with no shared glosses or semantic domains
        // (kai has unique gloss "and" and no domains)
        var input = new DictionaryEntryInput(EntryId: "kai", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert
        Assert.That(result.RelatedLexemes, Is.Not.Null, "RelatedLexemes must not be null");
        Assert.That(
            result.RelatedLexemes,
            Is.Empty,
            "Entry with no related terms should have empty RelatedLexemes list"
        );
    }

    #endregion

    #region Morphology

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Morphology string populated for the entry")]
    public void GetDictionaryEntry_Morphology_IsPopulated()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: Morphology is populated (e.g., "Noun" or POS abbreviation)
        Assert.That(
            result.Morphology,
            Is.Not.Null.And.Not.Empty,
            "Morphology must be populated for dictionary entries"
        );
    }

    #endregion

    #region No HTML Output (Theme 2)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Theme 2: No HTML tags in any DictionaryEntryData fields - structured DTO only")]
    public void GetDictionaryEntry_NoHtmlInOutput()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: No HTML tags in any field
        Assert.That(result.Lemma, Does.Not.Match(@"<[^>]+>"), "Lemma must not contain HTML tags");
        Assert.That(
            result.Morphology,
            Does.Not.Match(@"<[^>]+>"),
            "Morphology must not contain HTML tags"
        );
        foreach (var sense in result.Senses)
        {
            Assert.That(
                sense.Definition,
                Does.Not.Match(@"<[^>]+>"),
                $"Sense '{sense.SenseId}' definition must not contain HTML tags"
            );
            foreach (var gloss in sense.Glosses)
            {
                Assert.That(
                    gloss.Text,
                    Does.Not.Match(@"<[^>]+>"),
                    $"Gloss text must not contain HTML tags"
                );
            }
        }
    }

    #endregion

    #region Error Cases - Entry Not Found

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Entry not found error message follows format: Lexicon entry '{entryId}' not found"
    )]
    public void GetDictionaryEntry_EntryNotFound_ErrorMessageFormat()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "missing-entry-abc", GlossLanguage: "en");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Must use NOT_FOUND error code"
        );
        Assert.That(
            ex.Message,
            Is.EqualTo("Lexicon entry 'missing-entry-abc' not found"),
            "Error message must match the specified format exactly"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Entry not found with empty entryId")]
    public void GetDictionaryEntry_EmptyEntryId_ThrowsNotFound()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "", GlossLanguage: "en");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Empty entryId must return NOT_FOUND error code"
        );
    }

    #endregion

    #region Error Cases - Sub-Item Not Found

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Sub-item not found error message follows format: Dictionary sub-item '{subItemId}' not found in entry '{entryId}'"
    )]
    public void GetDictionaryEntry_SubItemNotFound_ErrorMessageFormat()
    {
        // Arrange: Valid entry, invalid sub-item
        var input = new DictionaryEntryInput(
            EntryId: "logos",
            GlossLanguage: "en",
            SubItemId: "bad-sub-item"
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Must use NOT_FOUND error code for sub-item not found"
        );
        Assert.That(
            ex.Message,
            Is.EqualTo("Dictionary sub-item 'bad-sub-item' not found in entry 'logos'"),
            "Error message must match the specified format exactly"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Sub-item not found is distinct from entry not found - entry must exist for sub-item error"
    )]
    public void GetDictionaryEntry_SubItemNotFound_EntryMustExist()
    {
        // Arrange: Non-existent entry with sub-item specified
        // Should get "entry not found" error, not "sub-item not found"
        var input = new DictionaryEntryInput(
            EntryId: "nonexistent-entry",
            GlossLanguage: "en",
            SubItemId: "some-sub-item"
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => BuildService().GetDictionaryEntry(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Must return NOT_FOUND for missing entry"
        );
        // The error should reference the entry, not the sub-item, since the entry itself is missing
        Assert.That(
            ex.Message,
            Does.Contain("nonexistent-entry"),
            "Error for missing entry must reference the entryId"
        );
        Assert.That(
            ex.Message,
            Does.Not.Contain("sub-item"),
            "Error for missing entry should not reference sub-item terminology"
        );
    }

    #endregion

    #region EntryId Returned Matches Input

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Returned entryId matches the requested entryId")]
    public void GetDictionaryEntry_ReturnedEntryId_MatchesInput()
    {
        // Arrange
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert
        Assert.That(
            result.EntryId,
            Is.EqualTo("logos"),
            "Returned EntryId must match the requested EntryId"
        );
    }

    #endregion

    #region Gloss Language Affects Output

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Glosses returned in the requested language")]
    public void GetDictionaryEntry_GlossLanguage_AffectsGlossContent()
    {
        // Arrange: Request with English glosses
        var input = new DictionaryEntryInput(EntryId: "logos", GlossLanguage: "en");

        // Act
        var result = BuildService().GetDictionaryEntry(input);

        // Assert: At least one gloss in the requested language
        var glossLanguages = result
            .Senses.SelectMany(s => s.Glosses)
            .Select(g => g.Language)
            .Distinct()
            .ToList();
        Assert.That(
            glossLanguages,
            Does.Contain("en"),
            "Glosses must include entries in the requested language"
        );
    }

    #endregion
}
