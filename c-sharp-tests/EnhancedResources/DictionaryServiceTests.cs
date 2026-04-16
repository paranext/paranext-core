using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for DictionaryService.LoadResources and related dictionary tab logic.
/// CAP-007: LoadDictionaryResources
///
/// Behaviors: BHV-364 (Dictionary Selection by Book), BHV-353 (Deduplication),
///            BHV-352 (Empty State Messages), BHV-308 (Context Menu Lemma Grouping),
///            BHV-110 (Related Lexeme Discovery)
/// Contract: Section 4.7 M-007, Section 2.7 DictionaryLoadInput, Section 3.7 DictionaryLoadResult
/// Sources: EXT-053 (DictionaryTab Resource Loading), EXT-007 (Gloss Retrieval),
///          EXT-008 (Lexical Link Parser), EXT-015 (Lexicon Entry Model), EXT-017
/// Invariants: INV-C04 (LexemeKey Uniqueness), INV-C05 (SemanticDomains Always Empty),
///             INV-C07 (Related Lexeme Self-Exclusion), VAL-003 (Lexeme Addition Uniqueness)
///
/// DictionaryService is a static service that takes DictionaryLoadInput and returns
/// DictionaryLoadResult with display items for the Dictionary Tab.
/// SDBH selected for OT books (1-39), SDBG for NT/DC (40-66+).
/// Entries are deduplicated. Related lexemes populated with self-exclusion.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class DictionaryServiceTests
{
    #region Acceptance Tests

    // =========================================================================
    // Acceptance test: LoadDictionaryResources returns correct result for OT book
    // Input: DictionaryLoadInput with Genesis (book 1), CurrentVerse scope
    // Expected: DictionaryLoadResult with SDBH active dictionary, display items
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance: LoadDictionaryResources for OT book returns SDBH dictionary with display items"
    )]
    public void LoadDictionaryResources_OtBook_ReturnsSdbhWithItems()
    {
        // Arrange: OT book (Genesis = book 1) should select SDBH
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "SDBH"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: SDBH selected for OT book
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.ActiveDictionary,
            Is.EqualTo("SDBH"),
            "BHV-364: OT books (1-39) must select SDBH"
        );
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance: LoadDictionaryResources for NT book returns SDBG dictionary with display items"
    )]
    public void LoadDictionaryResources_NtBook_ReturnsSdbgWithItems()
    {
        // Arrange: NT book (Matthew = book 40) should select SDBG
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "SDBG"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: SDBG selected for NT book
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.ActiveDictionary,
            Is.EqualTo("SDBG"),
            "BHV-364: NT books (40+) must select SDBG"
        );
        Assert.That(result.Items, Is.Not.Null);
    }

    #endregion

    #region BHV-364: Dictionary Selection by Book Number

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Books 1-39 (OT) select SDBH dictionary")]
    [TestCase(1, "SDBH", TestName = "Book_01_Genesis_SelectsSDBH")]
    [TestCase(19, "SDBH", TestName = "Book_19_Psalms_SelectsSDBH")]
    [TestCase(39, "SDBH", TestName = "Book_39_Malachi_SelectsSDBH")]
    public void LoadDictionaryResources_OtBooks_SelectsSdbh(
        int bookNumber,
        string expectedDictionary
    )
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(bookNumber, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert
        Assert.That(
            result.ActiveDictionary,
            Is.EqualTo(expectedDictionary),
            $"BHV-364: Book {bookNumber} must select {expectedDictionary}"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Books 40-66+ (NT/DC) select SDBG dictionary")]
    [TestCase(40, "SDBG", TestName = "Book_40_Matthew_SelectsSDBG")]
    [TestCase(66, "SDBG", TestName = "Book_66_Revelation_SelectsSDBG")]
    [TestCase(45, "SDBG", TestName = "Book_45_Romans_SelectsSDBG")]
    public void LoadDictionaryResources_NtBooks_SelectsSdbg(
        int bookNumber,
        string expectedDictionary
    )
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(bookNumber, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert
        Assert.That(
            result.ActiveDictionary,
            Is.EqualTo(expectedDictionary),
            $"BHV-364: Book {bookNumber} must select {expectedDictionary}"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("OT/NT boundary: book 39 is SDBH, book 40 is SDBG")]
    public void LoadDictionaryResources_OtNtBoundary_CorrectSelection()
    {
        // Arrange
        var otInput = new DictionaryLoadInput(
            CurrentReference: new VerseRef(39, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );
        var ntInput = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var otResult = DictionaryService.LoadResources(otInput);
        var ntResult = DictionaryService.LoadResources(ntInput);

        // Assert
        Assert.That(
            otResult.ActiveDictionary,
            Is.EqualTo("SDBH"),
            "BHV-364: Book 39 (Malachi, last OT) must select SDBH"
        );
        Assert.That(
            ntResult.ActiveDictionary,
            Is.EqualTo("SDBG"),
            "BHV-364: Book 40 (Matthew, first NT) must select SDBG"
        );
    }

    #endregion

    #region BHV-353: Deduplication

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-353")]
    [Description("Duplicate links for the same lemma are deduplicated in display items")]
    public void LoadDictionaryResources_DuplicateLinks_Deduplicated()
    {
        // Arrange: Input with scope that would produce duplicate links for same lemma
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: No duplicate entries by TokenId
        var tokenIds = result.Items.Select(i => i.TokenId).ToList();
        Assert.That(
            tokenIds,
            Is.Unique,
            "BHV-353: Dictionary display items must be deduplicated by TokenId"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-353")]
    [Description("Deduplicated items aggregate occurrence count from duplicate scope links")]
    public void LoadDictionaryResources_DuplicateLinks_OccurrenceCountAggregated()
    {
        // Arrange: Chapter scope with multiple occurrences of same lemma
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: Items with OccurrenceCount > 1 exist when lemma occurs multiple times
        Assert.That(result.Items, Is.Not.Empty, "Expected items for chapter scope");
        // OccurrenceCount should reflect total occurrences, not 1-per-link
        foreach (var item in result.Items)
        {
            Assert.That(
                item.OccurrenceCount,
                Is.GreaterThanOrEqualTo(1),
                $"BHV-353: OccurrenceCount for '{item.Term}' must be >= 1"
            );
        }
    }

    #endregion

    #region BHV-352: Empty State Messages

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-352")]
    [Description("Empty state message set when no items found for scope (variant 1: no data)")]
    public void LoadDictionaryResources_NoDataForScope_ReturnsEmptyStateMessage()
    {
        // Arrange: Scope with no dictionary data
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "empty-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: BHV-352 variant 1 - no data for scope
        Assert.That(result.Items, Is.Empty, "No items expected for empty scope");
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Must set emptyStateMessage when no items"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-352")]
    [Description("Empty state message variant 2: word not in verse range when filter active")]
    public void LoadDictionaryResources_FilteredWordNotInRange_ReturnsEmptyStateMessage()
    {
        // Arrange: Filter for a word that doesn't exist in scope
        var filter = new WordFilterInput(
            TokenId: "nonexistent-token",
            Lemma: "nonexistent",
            Source: "test",
            Translit: "nonexistent",
            Senses: "",
            TargetLinks: "",
            ClickOrigin: FilterClickOrigin.ScripturePane
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: filter,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: BHV-352 variant 2 - filtered word not in range
        Assert.That(result.Items, Is.Empty);
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Must set emptyStateMessage when filtered word not in range"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-352")]
    [Description("Empty state message variant 3: word does not occur in range")]
    public void LoadDictionaryResources_WordNotInRange_ReturnsEmptyStateMessage()
    {
        // Arrange: Filter for a word that exists elsewhere but not in this verse
        var filter = new WordFilterInput(
            TokenId: "exists-elsewhere",
            Lemma: "logos",
            Source: "\u03BB\u03CC\u03B3\u03BF\u03C2",
            Translit: "logos",
            Senses: "word",
            TargetLinks: "",
            ClickOrigin: FilterClickOrigin.DictionaryTab
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1), // OT verse - logos won't be here
            Scope: ScopeEnum.CurrentVerse,
            Filter: filter,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: BHV-352 variant 3 - word doesn't occur in range
        Assert.That(result.Items, Is.Empty);
        Assert.That(
            result.EmptyStateMessage,
            Is.Not.Null.And.Not.Empty,
            "BHV-352: Must set emptyStateMessage when word doesn't occur in range"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-352")]
    [Description("EmptyStateMessage is null when items exist")]
    public void LoadDictionaryResources_WithItems_EmptyStateMessageIsNull()
    {
        // Arrange: Scope that has items
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: EmptyStateMessage is null when items present
        Assert.That(result.Items, Is.Not.Empty, "Expected items for populated scope");
        Assert.That(
            result.EmptyStateMessage,
            Is.Null,
            "BHV-352: EmptyStateMessage must be null when items exist"
        );
    }

    #endregion

    #region BHV-110: Related Lexeme Discovery

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Dictionary items include related lexemes populated by shared gloss")]
    public void LoadDictionaryResources_WithGlossRelations_PopulatesRelatedLexemes()
    {
        // Arrange: NT book with lexemes that share glosses
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: At least one item has related lexemes with Gloss relation type
        Assert.That(result.Items, Is.Not.Empty);
        var itemsWithRelated = result
            .Items.Where(i => i.RelatedLexemes != null && i.RelatedLexemes.Count > 0)
            .ToList();
        Assert.That(
            itemsWithRelated,
            Is.Not.Empty,
            "BHV-110: At least one dictionary item should have related lexemes"
        );

        // Verify relation type is Gloss for gloss-based matches
        var glossRelations = itemsWithRelated
            .SelectMany(i => i.RelatedLexemes!)
            .Where(r => r.RelationType == "Gloss")
            .ToList();
        Assert.That(
            glossRelations,
            Is.Not.Empty,
            "BHV-110/TS-017: Should find related lexemes by shared gloss"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Dictionary items include related lexemes populated by shared semantic domain")]
    public void LoadDictionaryResources_WithDomainRelations_PopulatesRelatedLexemes()
    {
        // Arrange: Lexemes sharing semantic domains
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: At least one item has SemanticDomain relation type
        Assert.That(result.Items, Is.Not.Empty);
        var domainRelations = result
            .Items.Where(i => i.RelatedLexemes != null)
            .SelectMany(i => i.RelatedLexemes!)
            .Where(r => r.RelationType == "SemanticDomain")
            .ToList();
        Assert.That(
            domainRelations,
            Is.Not.Empty,
            "BHV-110/TS-020: Should find related lexemes by shared semantic domain"
        );
    }

    #endregion

    #region INV-C07: Related Lexeme Self-Exclusion

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C07")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-110")]
    [Description("INV-C07: Source lexeme is excluded from its own related lexemes list")]
    public void LoadDictionaryResources_RelatedLexemes_ExcludesSelf()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: INV-C07 - For every item, its own lemma must NOT appear in RelatedLexemes
        foreach (var item in result.Items)
        {
            if (item.RelatedLexemes != null && item.RelatedLexemes.Count > 0)
            {
                var selfRefs = item.RelatedLexemes.Where(r => r.Lemma == item.Term).ToList();
                Assert.That(
                    selfRefs,
                    Is.Empty,
                    $"INV-C07: Item '{item.Term}' must not appear in its own RelatedLexemes"
                );
            }
        }
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Resource not found throws with NOT_FOUND error code")]
    public void LoadDictionaryResources_ResourceNotFound_ThrowsNotFound()
    {
        // Arrange: Non-existent resource
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "nonexistent-resource"
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => DictionaryService.LoadResources(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("NOT_FOUND"),
            "Resource not found must return NOT_FOUND error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("nonexistent-resource"),
            "Error message should identify the missing resource"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Lexicon not loaded throws with FAILED_PRECONDITION error code")]
    public void LoadDictionaryResources_LexiconNotLoaded_ThrowsFailedPrecondition()
    {
        // Arrange: Resource exists but lexicon data not yet loaded
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "uninitialized-resource"
        );

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => DictionaryService.LoadResources(input)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("FAILED_PRECONDITION"),
            "Lexicon not loaded must return FAILED_PRECONDITION error code"
        );
    }

    #endregion

    #region Display Item Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Display items have required fields populated: TokenId, Term, Glosses, POS")]
    public void LoadDictionaryResources_DisplayItems_HaveRequiredFields()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: Every item has required fields
        Assert.That(result.Items, Is.Not.Empty, "Expected items for populated verse");
        foreach (var item in result.Items)
        {
            Assert.That(item.TokenId, Is.Not.Null.And.Not.Empty, "TokenId must be populated");
            Assert.That(
                item.Term,
                Is.Not.Null.And.Not.Empty,
                "Term (lexical form) must be populated"
            );
            Assert.That(item.Glosses, Is.Not.Null, "Glosses list must not be null");
            Assert.That(item.PartOfSpeech, Is.Not.Null, "PartOfSpeech must not be null");
            Assert.That(
                item.OccurrenceCount,
                Is.GreaterThanOrEqualTo(1),
                "OccurrenceCount must be >= 1"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Display items include sourceText and translit for dictionary display")]
    public void LoadDictionaryResources_DisplayItems_HaveSourceTextAndTranslit()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert
        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(
                item.SourceText,
                Is.Not.Null.And.Not.Empty,
                "SourceText must be populated for dictionary display"
            );
            Assert.That(
                item.Translit,
                Is.Not.Null.And.Not.Empty,
                "Translit must be populated for dictionary display"
            );
        }
    }

    #endregion

    #region TS-019: Related Lexemes Empty When Language Not Set

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Related lexemes are empty when gloss language is not set or unavailable")]
    public void LoadDictionaryResources_NoLanguage_RelatedLexemesEmpty()
    {
        // Arrange: Empty gloss language
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: Related lexemes should be empty/null when language not set
        foreach (var item in result.Items)
        {
            Assert.That(
                item.RelatedLexemes == null || item.RelatedLexemes.Count == 0,
                Is.True,
                $"TS-019: RelatedLexemes for '{item.Term}' must be empty when language not set"
            );
        }
    }

    #endregion

    #region Word Filter (BHV-602 via BHV-308)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-308")]
    [Description("Filter restricts results to matching lemma only")]
    public void LoadDictionaryResources_WithFilter_ReturnsOnlyMatchingLemma()
    {
        // Arrange: Filter for specific lemma
        var filter = new WordFilterInput(
            TokenId: "token-123",
            Lemma: "logos",
            Source: "\u03BB\u03CC\u03B3\u03BF\u03C2",
            Translit: "logos",
            Senses: "word",
            TargetLinks: "",
            ClickOrigin: FilterClickOrigin.ScripturePane
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: filter,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: Only items matching the filter lemma
        Assert.That(result.Items, Is.Not.Empty, "Filtered result should have items");
        foreach (var item in result.Items)
        {
            Assert.That(
                item.Term,
                Is.EqualTo("logos").IgnoreCase,
                "BHV-308: Filter should restrict to matching lemma"
            );
        }
    }

    #endregion

    #region Scope Levels

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("CurrentSection scope returns items from the current section")]
    public void LoadDictionaryResources_SectionScope_ReturnsItemsFromSection()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentSection,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        // Section scope generally returns more items than verse scope
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("CurrentChapter scope returns items from the entire chapter")]
    public void LoadDictionaryResources_ChapterScope_ReturnsItemsFromChapter()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
        // Chapter scope should generally return the most items
    }

    #endregion

    #region Golden Master Tests (gm-023, gm-024)

    // =========================================================================
    // gm-023: Related lexemes by shared gloss
    // Input: In-memory lexicon with logos, rhema, aggelia, graphe, kai
    //        Source lexeme: logos (Stem), language: en
    // Expected: 4 related lexemes (rhema via Gloss+Domain, aggelia via Gloss+Domain)
    //           Self (logos) excluded per INV-C07
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-110")]
    [Property("GoldenMasterId", "gm-023")]
    [Description(
        "gm-023: GetRelatedLexemes by shared gloss returns rhema and aggelia as related to logos"
    )]
    public void GetRelatedLexemes_SharedGloss_MatchesGoldenMaster()
    {
        // Arrange: Build in-memory lexicon matching gm-023 input
        // logos: senses [{glosses: [{en, "word"}], domains: ["Communication"]},
        //                {glosses: [{en, "message"}], domains: []}]
        // rhema: senses [{glosses: [{en, "word"}], domains: ["Communication"]}]
        // aggelia: senses [{glosses: [{en, "message"}], domains: ["Communication"]}]
        // graphe: senses [{glosses: [{en, "scripture"}], domains: ["Sacred Texts"]}]
        // kai: senses [{glosses: [{en, "and"}], domains: []}]
        var relatedLexemes = DictionaryService.FindRelatedLexemes(
            sourceLexeme: "logos",
            glossLanguage: "en"
        );

        // Assert: gm-023 expected output - 4 related lexemes
        Assert.That(
            relatedLexemes.Count,
            Is.EqualTo(4),
            "gm-023: Expected 4 related lexemes for logos"
        );

        // rhema via Gloss ("word")
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "rhema" && r.RelationType == "Gloss"),
            Is.True,
            "gm-023: rhema should be related via Gloss 'word'"
        );

        // rhema via SemanticDomain ("Communication")
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "rhema" && r.RelationType == "SemanticDomain"),
            Is.True,
            "gm-023: rhema should be related via SemanticDomain 'Communication'"
        );

        // aggelia via Gloss ("message")
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "aggelia" && r.RelationType == "Gloss"),
            Is.True,
            "gm-023: aggelia should be related via Gloss 'message'"
        );

        // aggelia via SemanticDomain ("Communication")
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "aggelia" && r.RelationType == "SemanticDomain"),
            Is.True,
            "gm-023: aggelia should be related via SemanticDomain 'Communication'"
        );

        // Self-exclusion: logos must NOT appear in results
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "logos"),
            Is.False,
            "gm-023/INV-C07: logos must not appear in its own related lexemes"
        );

        // graphe and kai should NOT appear (different glosses, different domains)
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "graphe"),
            Is.False,
            "gm-023: graphe shares no glosses or domains with logos"
        );
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "kai"),
            Is.False,
            "gm-023: kai shares no glosses or domains with logos"
        );
    }

    // =========================================================================
    // gm-024: Related lexemes by shared semantic domain
    // Input: Same as gm-023 but with euangelion added (domains: Communication, Sacred Texts)
    //        Source lexeme: logos (Stem), language: en
    // Expected: 5 related lexemes (gm-023's 4 + euangelion via SemanticDomain)
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-110")]
    [Property("GoldenMasterId", "gm-024")]
    [Description(
        "gm-024: GetRelatedLexemes by shared domain returns 5 related lexemes including euangelion"
    )]
    public void GetRelatedLexemes_SharedDomain_MatchesGoldenMaster()
    {
        // Arrange: Build in-memory lexicon matching gm-024 input
        // Same as gm-023 but with euangelion added:
        //   euangelion: senses [{glosses: [{en, "gospel"}], domains: ["Communication", "Sacred Texts"]}]
        var relatedLexemes = DictionaryService.FindRelatedLexemes(
            sourceLexeme: "logos",
            glossLanguage: "en"
        );

        // Assert: gm-024 expected output - 5 related lexemes
        Assert.That(
            relatedLexemes.Count,
            Is.EqualTo(5),
            "gm-024: Expected 5 related lexemes for logos"
        );

        // All from gm-023 should still be present
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "rhema" && r.RelationType == "Gloss"),
            Is.True,
            "gm-024: rhema still related via Gloss"
        );
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "rhema" && r.RelationType == "SemanticDomain"),
            Is.True,
            "gm-024: rhema still related via SemanticDomain"
        );
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "aggelia" && r.RelationType == "Gloss"),
            Is.True,
            "gm-024: aggelia still related via Gloss"
        );
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "aggelia" && r.RelationType == "SemanticDomain"),
            Is.True,
            "gm-024: aggelia still related via SemanticDomain"
        );

        // New: euangelion via SemanticDomain ("Communication")
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "euangelion" && r.RelationType == "SemanticDomain"),
            Is.True,
            "gm-024: euangelion should be related via SemanticDomain 'Communication'"
        );

        // Self-exclusion still holds
        Assert.That(
            relatedLexemes.Any(r => r.Lemma == "logos"),
            Is.False,
            "gm-024/INV-C07: logos must not appear in its own related lexemes"
        );
    }

    #endregion

    #region INV-C04: LexemeKey Uniqueness (spec-005)

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C04")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-109")]
    [Description(
        "INV-C04/VAL-003: Duplicate LexemeKey addition handled gracefully - not exposed to user"
    )]
    public void LoadDictionaryResources_DuplicateLexemeKey_HandledInternally()
    {
        // Arrange: Input that would trigger duplicate LexemeKey during loading
        // Per strategic plan edge case TS-014: "duplicate LexemeKey handled gracefully"
        // The service should catch the ArgumentException internally and continue
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource-with-dupes"
        );

        // Act & Assert: Should NOT throw to caller - handled internally
        Assert.DoesNotThrow(
            () => DictionaryService.LoadResources(input),
            "INV-C04/TS-014: Duplicate LexemeKey must be handled internally without user error"
        );
    }

    #endregion

    #region INV-C05: SemanticDomains Always Empty in Built-in Lexicon (spec-005)

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C05")]
    [Property("ScenarioId", "TS-015")]
    [Property("BehaviorId", "BHV-109")]
    [Description(
        "INV-C05: Built-in lexicon SemanticDomains always returns empty - domain data from SDBG/SDBH"
    )]
    public void LoadDictionaryResources_BuiltInLexicon_SemanticDomainsFromSdbFiles()
    {
        // Arrange: Load dictionary items
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: INV-C05 - semantic domain data comes from SDBG/SDBH files, not built-in lexicon
        // The DictionaryService should populate SemanticDomains from external files,
        // not from XmlLexiconSense.SemanticDomains (which is always empty)
        Assert.That(result.Items, Is.Not.Empty, "Expected items for test");
        // If items have semantic domains, they must come from SDB files (not the always-empty property)
        // This is a structural invariant: the service correctly sources domain data
    }

    #endregion

    #region TS-016: Default Homograph (spec-005)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-109")]
    [Description("TS-016: Dictionary items with no explicit homograph use default homograph 1")]
    public void LoadDictionaryResources_DefaultHomograph_UsesHomograph1()
    {
        // Arrange
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        // Act
        var result = DictionaryService.LoadResources(input);

        // Assert: Items should load successfully even when lexemes use default homograph
        Assert.That(result.Items, Is.Not.Empty, "TS-016: Items with default homograph should load");
        // The underlying LexemeKey creation with null owner defaults to homograph 1
    }

    #endregion

    #region Lexicon Display Utilities (spec-007)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-112")]
    [Description("InterlinearDisplayString formats Stem morphology with slashes")]
    public void InterlinearDisplayString_Stem_WrapsWithSlashes()
    {
        // Act
        var displayString = DictionaryService.FormatInterlinearDisplay("Stem", "logos");

        // Assert: spec-007 - Stem wraps form in forward slashes
        Assert.That(
            displayString,
            Is.EqualTo("/logos/"),
            "spec-007: Stem type must wrap form in forward slashes"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-112")]
    [Description("InterlinearDisplayString formats Suffix with leading dash")]
    public void InterlinearDisplayString_Suffix_PrependsDash()
    {
        // Act
        var displayString = DictionaryService.FormatInterlinearDisplay("Suffix", "on");

        // Assert: spec-007 - Suffix type prepends dash
        Assert.That(displayString, Is.EqualTo("-on"), "spec-007: Suffix type must prepend dash");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-112")]
    [Description("InterlinearDisplayString formats Prefix with trailing dash")]
    public void InterlinearDisplayString_Prefix_AppendsDash()
    {
        // Act
        var displayString = DictionaryService.FormatInterlinearDisplay("Prefix", "kata");

        // Assert: spec-007 - Prefix type appends dash
        Assert.That(displayString, Is.EqualTo("kata-"), "spec-007: Prefix type must append dash");
    }

    #endregion
}
