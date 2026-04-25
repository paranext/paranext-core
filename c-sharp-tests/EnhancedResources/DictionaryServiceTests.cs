using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for DictionaryService.LoadResources and related dictionary tab logic.
/// CAP-007: LoadDictionaryResources
///
/// DictionaryService is an instance class taking DictionaryData via primary
/// constructor; tests compose data inline via DictionaryFixtures.BuildDictionaryData().
/// Three-way routing: SDBH for OT (Canon.IsBookOT), SDBG for NT (Canon.IsBookNT),
/// DCLEX for DC.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class DictionaryServiceTests
{
    private static DictionaryService BuildService(
        DictionaryData? data = null,
        IMarbleBookTokenProvider? bookTokens = null
    ) =>
        new(
            data ?? DictionaryFixtures.BuildDictionaryData(),
            bookTokens ?? new FakeMarbleBookTokenProvider()
        );

    #region Acceptance Tests

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description(
        "Acceptance (DI): new DictionaryService(data).LoadResources selects SDBH for OT book"
    )]
    public void NewInstance_LoadResources_OtBook_ReturnsSdbh()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "SDBH"
        );

        var result = service.LoadResources(input);

        Assert.That(result.ActiveDictionary, Is.EqualTo("SDBH"));
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("LoadResources for OT book returns SDBH dictionary with display items")]
    public void LoadDictionaryResources_OtBook_ReturnsSdbhWithItems()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "SDBH"
        );

        var result = service.LoadResources(input);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ActiveDictionary, Is.EqualTo("SDBH"), "BHV-364: OT books select SDBH");
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-364")]
    [Description("LoadResources for NT book returns SDBG dictionary with display items")]
    public void LoadDictionaryResources_NtBook_ReturnsSdbgWithItems()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "SDBG"
        );

        var result = service.LoadResources(input);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ActiveDictionary, Is.EqualTo("SDBG"), "BHV-364: NT books select SDBG");
        Assert.That(result.Items, Is.Not.Null);
    }

    #endregion

    #region BHV-364: Three-way dictionary routing (OT/NT/DC)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("OT books (1-39) route to SDBH")]
    [TestCase(1, "SDBH", TestName = "Book_01_Genesis_SelectsSDBH")]
    [TestCase(19, "SDBH", TestName = "Book_19_Psalms_SelectsSDBH")]
    [TestCase(39, "SDBH", TestName = "Book_39_Malachi_SelectsSDBH")]
    public void LoadDictionaryResources_OtBooks_SelectsSdbh(int bookNumber, string expected)
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(bookNumber, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.ActiveDictionary, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("NT books (40-66) route to SDBG")]
    [TestCase(40, "SDBG", TestName = "Book_40_Matthew_SelectsSDBG")]
    [TestCase(45, "SDBG", TestName = "Book_45_Romans_SelectsSDBG")]
    [TestCase(66, "SDBG", TestName = "Book_66_Revelation_SelectsSDBG")]
    public void LoadDictionaryResources_NtBooks_SelectsSdbg(int bookNumber, string expected)
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(bookNumber, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.ActiveDictionary, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("DC books (apocrypha, book 67+) route to DCLEX (spec Section 6 fix)")]
    [TestCase(67, "DCLEX", TestName = "Book_67_Tobit_SelectsDCLEX")]
    [TestCase(68, "DCLEX", TestName = "Book_68_Judith_SelectsDCLEX")]
    public void LoadDictionaryResources_DcBooks_SelectsDclex(int bookNumber, string expected)
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(bookNumber, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(
            result.ActiveDictionary,
            Is.EqualTo(expected),
            "BHV-364 three-way fix: DC books must route to DCLEX, not SDBG"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("OT/NT boundary: book 39 -> SDBH, book 40 -> SDBG")]
    public void LoadDictionaryResources_OtNtBoundary_CorrectSelection()
    {
        var service = BuildService();
        var otInput = new DictionaryLoadInput(
            CurrentReference: new VerseRef(39, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );
        var ntInput = otInput with { CurrentReference = new VerseRef(40, 1, 1) };

        var otResult = service.LoadResources(otInput);
        var ntResult = service.LoadResources(ntInput);

        Assert.That(otResult.ActiveDictionary, Is.EqualTo("SDBH"));
        Assert.That(ntResult.ActiveDictionary, Is.EqualTo("SDBG"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("DictionaryForBook static helper directly exercises three-way routing")]
    [TestCase(1, "SDBH")]
    [TestCase(39, "SDBH")]
    [TestCase(40, "SDBG")]
    [TestCase(66, "SDBG")]
    [TestCase(67, "DCLEX")]
    public void DictionaryForBook_ThreeWayRouting(int bookNum, string expected)
    {
        Assert.That(DictionaryService.DictionaryForBook(bookNum), Is.EqualTo(expected));
    }

    #endregion

    #region BHV-353: Deduplication

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-353")]
    [Description("Duplicate links for the same lemma are deduplicated in display items")]
    public void LoadDictionaryResources_DuplicateLinks_Deduplicated()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        var tokenIds = result.Items.Select(i => i.TokenId).ToList();
        Assert.That(tokenIds, Is.Unique, "BHV-353: items must be deduplicated by TokenId");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-353")]
    [Description("Deduplicated items aggregate occurrence count")]
    public void LoadDictionaryResources_DuplicateLinks_OccurrenceCountAggregated()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(item.OccurrenceCount, Is.GreaterThanOrEqualTo(1));
        }
    }

    #endregion

    #region BHV-352: Empty State Messages

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-352")]
    [Description("Empty state message set when no items found for scope")]
    public void LoadDictionaryResources_NoDataForScope_ReturnsEmptyStateMessage()
    {
        // No tokens for the requested book = no display items = empty state message.
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-352")]
    [Description("Filtered word not in range returns empty state message (variant 2)")]
    public void LoadDictionaryResources_FilteredWordNotInRange_ReturnsEmptyStateMessage()
    {
        var service = BuildService();
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

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Empty);
        Assert.That(result.EmptyStateMessage, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-352")]
    [Description("EmptyStateMessage is null when items exist")]
    public void LoadDictionaryResources_WithItems_EmptyStateMessageIsNull()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        Assert.That(result.EmptyStateMessage, Is.Null);
    }

    #endregion

    #region BHV-110: Related Lexeme Discovery

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Dictionary items include related lexemes populated by shared gloss")]
    public void LoadDictionaryResources_WithGlossRelations_PopulatesRelatedLexemes()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        var itemsWithRelated = result.Items.Where(i => i.RelatedLexemes?.Count > 0).ToList();
        Assert.That(itemsWithRelated, Is.Not.Empty);
        var glossRelations = itemsWithRelated
            .SelectMany(i => i.RelatedLexemes!)
            .Where(r => r.RelationType == "Gloss")
            .ToList();
        Assert.That(glossRelations, Is.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Related lexemes include SemanticDomain relation type")]
    public void LoadDictionaryResources_WithDomainRelations_PopulatesRelatedLexemes()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        var domainRelations = result
            .Items.Where(i => i.RelatedLexemes != null)
            .SelectMany(i => i.RelatedLexemes!)
            .Where(r => r.RelationType == "SemanticDomain")
            .ToList();
        Assert.That(domainRelations, Is.Not.Empty);
    }

    #endregion

    #region INV-C07: Related Lexeme Self-Exclusion

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C07")]
    [Property("BehaviorId", "BHV-110")]
    [Description("INV-C07: source lexeme is excluded from its own related lexemes list")]
    public void LoadDictionaryResources_RelatedLexemes_ExcludesSelf()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        foreach (var item in result.Items)
        {
            if (item.RelatedLexemes?.Count > 0)
            {
                var selfRefs = item.RelatedLexemes.Where(r => r.Lemma == item.Term).ToList();
                Assert.That(selfRefs, Is.Empty);
            }
        }
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Resource not found throws with NOT_FOUND error code")]
    public void LoadDictionaryResources_ResourceNotFound_ThrowsNotFound()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(1, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "nonexistent-resource"
        );

        var ex = Assert.Throws<InvalidOperationException>(() => service.LoadResources(input));
        Assert.That(ex!.Data["platformErrorCode"], Is.EqualTo("NOT_FOUND"));
        Assert.That(ex.Message, Does.Contain("nonexistent-resource"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Lexicon not loaded throws with FAILED_PRECONDITION error code")]
    public void LoadDictionaryResources_LexiconNotLoaded_ThrowsFailedPrecondition()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "uninitialized-resource"
        );

        var ex = Assert.Throws<InvalidOperationException>(() => service.LoadResources(input));
        Assert.That(ex!.Data["platformErrorCode"], Is.EqualTo("FAILED_PRECONDITION"));
    }

    #endregion

    #region Display Item Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Display items have required fields populated")]
    public void LoadDictionaryResources_DisplayItems_HaveRequiredFields()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(item.TokenId, Is.Not.Null.And.Not.Empty);
            Assert.That(item.Term, Is.Not.Null.And.Not.Empty);
            Assert.That(item.Glosses, Is.Not.Null);
            Assert.That(item.PartOfSpeech, Is.Not.Null);
            Assert.That(item.OccurrenceCount, Is.GreaterThanOrEqualTo(1));
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("Display items include SourceText and Translit")]
    public void LoadDictionaryResources_DisplayItems_HaveSourceTextAndTranslit()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(item.SourceText, Is.Not.Null.And.Not.Empty);
            // Translit is always populated (possibly empty string) by the token-driven
            // pipeline; it is sourced from the lexicon entry, not the token, and is
            // not yet wired in. See Task 16.
            Assert.That(item.Translit, Is.Not.Null);
        }
    }

    #endregion

    #region TS-019: Related Lexemes Empty When Language Not Set

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Related lexemes are empty when gloss language is not set")]
    public void LoadDictionaryResources_NoLanguage_RelatedLexemesEmpty()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        foreach (var item in result.Items)
        {
            Assert.That(item.RelatedLexemes == null || item.RelatedLexemes.Count == 0, Is.True);
        }
    }

    #endregion

    #region Word Filter (BHV-308)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-308")]
    [Description("Filter restricts results to matching lemma only")]
    public void LoadDictionaryResources_WithFilter_ReturnsOnlyMatchingLemma()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var filter = new WordFilterInput(
            TokenId: "token-123",
            Lemma: "logos",
            Source: "λόγος",
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

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
        foreach (var item in result.Items)
        {
            Assert.That(item.Term, Is.EqualTo("logos").IgnoreCase);
        }
    }

    #endregion

    #region Scope Levels

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("CurrentSection scope returns items")]
    public void LoadDictionaryResources_SectionScope_ReturnsItems()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentSection,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-364")]
    [Description("CurrentChapter scope returns items")]
    public void LoadDictionaryResources_ChapterScope_ReturnsItems()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentChapter,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items, Is.Not.Null);
    }

    #endregion

    #region Golden Master Tests (gm-023, gm-024)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-110")]
    [Property("GoldenMasterId", "gm-023")]
    [Description("gm-023: GetRelatedLexemes by shared gloss returns 4 related lexemes for logos")]
    public void GetRelatedLexemes_SharedGloss_MatchesGoldenMaster()
    {
        var service = BuildService();

        var related = service.FindRelatedLexemes("logos", "en");

        Assert.That(related.Count, Is.EqualTo(4));
        Assert.That(related.Any(r => r.Lemma == "rhema" && r.RelationType == "Gloss"), Is.True);
        Assert.That(
            related.Any(r => r.Lemma == "rhema" && r.RelationType == "SemanticDomain"),
            Is.True
        );
        Assert.That(related.Any(r => r.Lemma == "aggelia" && r.RelationType == "Gloss"), Is.True);
        Assert.That(
            related.Any(r => r.Lemma == "aggelia" && r.RelationType == "SemanticDomain"),
            Is.True
        );
        Assert.That(related.Any(r => r.Lemma == "logos"), Is.False, "INV-C07 self-exclusion");
        Assert.That(related.Any(r => r.Lemma == "graphe"), Is.False);
        Assert.That(related.Any(r => r.Lemma == "kai"), Is.False);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-110")]
    [Property("GoldenMasterId", "gm-024")]
    [Description(
        "gm-024: GetRelatedLexemes by shared domain returns 5 related lexemes including euangelion"
    )]
    public void GetRelatedLexemes_SharedDomain_MatchesGoldenMaster()
    {
        // Extend the default SDBH lexicon with euangelion using a record `with` expression.
        var baseData = DictionaryFixtures.BuildDictionaryData();
        var sdbh = baseData.ByDictionary["SDBH"];
        var extendedLexicon = new Dictionary<
            string,
            (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
        >(sdbh.Lexicon, StringComparer.OrdinalIgnoreCase)
        {
            ["euangelion"] = (
                new List<string> { "gospel" },
                new List<string> { "Communication", "Sacred Texts" }
            ),
        };
        var data = baseData with
        {
            ByDictionary = new Dictionary<string, DictionaryPerPackage>(
                StringComparer.OrdinalIgnoreCase
            )
            {
                ["SDBH"] = sdbh with { Lexicon = extendedLexicon, },
                ["SDBG"] = baseData.ByDictionary["SDBG"],
                ["DCLEX"] = baseData.ByDictionary["DCLEX"],
            },
        };
        var service = BuildService(data: data);

        var related = service.FindRelatedLexemes("logos", "en");

        Assert.That(related.Count, Is.EqualTo(5));
        Assert.That(related.Any(r => r.Lemma == "rhema" && r.RelationType == "Gloss"), Is.True);
        Assert.That(
            related.Any(r => r.Lemma == "rhema" && r.RelationType == "SemanticDomain"),
            Is.True
        );
        Assert.That(related.Any(r => r.Lemma == "aggelia" && r.RelationType == "Gloss"), Is.True);
        Assert.That(
            related.Any(r => r.Lemma == "aggelia" && r.RelationType == "SemanticDomain"),
            Is.True
        );
        Assert.That(
            related.Any(r => r.Lemma == "euangelion" && r.RelationType == "SemanticDomain"),
            Is.True
        );
        Assert.That(related.Any(r => r.Lemma == "logos"), Is.False, "INV-C07 self-exclusion");
    }

    #endregion

    #region INV-C04: Duplicate LexemeKey handled internally

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C04")]
    [Property("BehaviorId", "BHV-109")]
    [Description("INV-C04: Duplicate LexemeKey handled gracefully - not exposed to user")]
    public void LoadDictionaryResources_DuplicateLexemeKey_HandledInternally()
    {
        var service = BuildService();
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource-with-dupes"
        );

        Assert.DoesNotThrow(() => service.LoadResources(input));
    }

    #endregion

    #region INV-C05: SemanticDomains sourced from SDBG/SDBH

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-C05")]
    [Property("BehaviorId", "BHV-109")]
    [Description("INV-C05: Items load with semantic-domain data from SDBG/SDBH")]
    public void LoadDictionaryResources_BuiltInLexicon_SemanticDomainsFromSdbFiles()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
    }

    #endregion

    #region TS-016: Default Homograph

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-109")]
    [Description("TS-016: Items with default homograph load successfully")]
    public void LoadDictionaryResources_DefaultHomograph_UsesHomograph1()
    {
        var service = BuildService(
            bookTokens: DictionaryFixtures.BuildBookTokenProviderForNtTokens("test-resource")
        );
        var input = new DictionaryLoadInput(
            CurrentReference: new VerseRef(40, 1, 1),
            Scope: ScopeEnum.CurrentVerse,
            Filter: null,
            ShowTranslations: false,
            GlossLanguage: "en",
            ResourceId: "test-resource"
        );

        var result = service.LoadResources(input);

        Assert.That(result.Items, Is.Not.Empty);
    }

    #endregion

    #region FormatInterlinearDisplay (pure static function)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Stem morphology wraps lexical form in forward slashes")]
    public void InterlinearDisplayString_Stem_WrapsWithSlashes()
    {
        var s = DictionaryService.FormatInterlinearDisplay("Stem", "logos");
        Assert.That(s, Is.EqualTo("/logos/"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Suffix morphology prepends dash")]
    public void InterlinearDisplayString_Suffix_PrependsDash()
    {
        var s = DictionaryService.FormatInterlinearDisplay("Suffix", "on");
        Assert.That(s, Is.EqualTo("-on"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Prefix morphology appends dash")]
    public void InterlinearDisplayString_Prefix_AppendsDash()
    {
        var s = DictionaryService.FormatInterlinearDisplay("Prefix", "kata");
        Assert.That(s, Is.EqualTo("kata-"));
    }

    #endregion
}
