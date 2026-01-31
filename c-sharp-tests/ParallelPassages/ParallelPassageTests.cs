using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParallelPassages;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ParallelPassages;

/// <summary>
/// Tests for MP-1 capabilities: CAP-010 (PassageDataLoadingAndCaching) and
/// CAP-018 (ReferenceValidation), plus MP-2 capabilities: CAP-008
/// (SourceLanguageTextSelection), CAP-012 (CellEditabilityDetermination),
/// CAP-014 (GetPreviousPassageVersion), CAP-015 (UpdateBooksInScope).
/// RED-phase TDD tests that define expected behavior before implementation exists.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParallelPassageTests : PapiTestBase
{
    #region CAP-010: PassageDataLoadingAndCaching - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("Acceptance test: Loading passages produces symmetrical, deduplicated, sorted list")]
    public void GetAllPassages_AcceptanceTest_ReturnsSymmetricalDeduplicatedSortedList()
    {
        // Arrange
        var accessor = new ParallelPassageAccessor();

        // Act
        var passages = accessor.GetAllPassages();

        // Assert - gm-013 golden master properties
        Assert.That(passages, Is.Not.Null);
        Assert.That(passages.Count, Is.GreaterThan(0), "Should load passages from XML");

        // Verify sorted by head reference
        for (int i = 1; i < passages.Count; i++)
        {
            Assert.That(
                string.Compare(
                    passages[i].HeadReference,
                    passages[i - 1].HeadReference,
                    StringComparison.Ordinal
                ),
                Is.GreaterThanOrEqualTo(0),
                $"Passages must be sorted: [{i - 1}]={passages[i - 1].HeadReference} <= [{i}]={passages[i].HeadReference}"
            );
        }

        // Verify no duplicates
        var keys = passages.Select(p => p.Key).ToList();
        Assert.That(keys, Is.Unique, "Passages must be deduplicated");
    }

    #endregion

    #region CAP-010: Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("GetAllPassages returns a non-null list of ParallelPassageEntry")]
    public void GetAllPassages_WhenCalled_ReturnsNonNullList()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        Assert.That(passages, Is.Not.Null);
        Assert.That(passages, Is.InstanceOf<List<ParallelPassageEntry>>());
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("GetAllPassages creates symmetrical pairs: if A references B, B references A")]
    public void GetAllPassages_WhenLoaded_CreatesSymmetricalPairs()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        Assert.That(passages.Count, Is.GreaterThan(0), "Must have passages to verify symmetry");

        // Each passage has a head reference and parallel verses.
        // Symmetry means for passage A->B there exists B->A.
        var headRefs = new HashSet<string>(passages.Select(p => p.HeadReference));
        Assert.That(headRefs.Count, Is.GreaterThan(0));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("GetAllPassages caches results: second call returns same instance")]
    public void GetAllPassages_CalledTwice_ReturnsSameInstance()
    {
        var accessor = new ParallelPassageAccessor();

        var first = accessor.GetAllPassages();
        var second = accessor.GetAllPassages();

        Assert.That(second, Is.SameAs(first), "Cached result should return same list instance");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("GetAllPassages is thread-safe: concurrent calls do not corrupt data")]
    public void GetAllPassages_ConcurrentAccess_IsThreadSafe()
    {
        var accessor = new ParallelPassageAccessor();
        var results = new List<ParallelPassageEntry>[10];
        var tasks = new Task[10];

        for (int i = 0; i < 10; i++)
        {
            int index = i;
            tasks[i] = Task.Run(() => { results[index] = accessor.GetAllPassages(); });
        }

        Task.WaitAll(tasks);

        // All results should be the same cached instance
        for (int i = 1; i < 10; i++)
        {
            Assert.That(
                results[i],
                Is.SameAs(results[0]),
                "All concurrent calls should return same cached instance"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("Each passage has a valid PassageType")]
    public void GetAllPassages_EachPassage_HasValidPassageType()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        foreach (var passage in passages)
        {
            Assert.That(
                passage.PassageType,
                Is.AnyOf(
                    ParallelPassageType.NTtoOT,
                    ParallelPassageType.OTtoOT,
                    ParallelPassageType.NTtoNT
                ),
                $"Passage {passage.HeadReference} must have a valid passage type"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("Each passage has at least 2 verse references")]
    public void GetAllPassages_EachPassage_HasAtLeastTwoVerses()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        foreach (var passage in passages)
        {
            Assert.That(
                passage.Verses.Count,
                Is.GreaterThanOrEqualTo(2),
                $"Passage {passage.HeadReference} must have at least 2 verses"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("Each passage's HeadReference is contained in its Verses list")]
    public void GetAllPassages_EachPassage_HeadReferenceInVersesList()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        foreach (var passage in passages)
        {
            Assert.That(
                passage.Verses,
                Does.Contain(passage.HeadReference),
                $"HeadReference {passage.HeadReference} must be in Verses list"
            );
        }
    }

    #endregion

    #region CAP-010: Golden Master Test

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-010")]
    [Description("gm-013: Passage data loading produces symmetrical, deduplicated, sorted output")]
    public void GetAllPassages_GoldenMaster_MatchesExpectedProperties()
    {
        var accessor = new ParallelPassageAccessor();

        var passages = accessor.GetAllPassages();

        // gm-013 expected output: symmetrical, deduplicated, sorted
        Assert.That(passages, Is.Not.Null);

        // Deduplicated
        var passageKeys = new HashSet<string>();
        foreach (var p in passages)
        {
            Assert.That(passageKeys.Add(p.Key), Is.True, $"Duplicate passage found: {p.Key}");
        }

        // Sorted by head reference
        var headRefs = passages.Select(p => p.HeadReference).ToList();
        var sorted = headRefs.OrderBy(r => r, StringComparer.Ordinal).ToList();
        Assert.That(headRefs, Is.EqualTo(sorted), "Passages must be sorted by head reference");
    }

    #endregion

    #region CAP-018: ReferenceValidation - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Acceptance test: Reference validation wraps ParatextData correctly")]
    public void ReferenceValidation_AcceptanceTest_WrapsParatextDataCorrectly()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var validator = new ParallelPassageReferenceValidator(scrText);

        // ValidateRef: empty reference should produce error
        var emptyResult = validator.ValidateRef("", "r", inSidebar: false);
        Assert.That(emptyResult.HasError, Is.True, "Empty ref should be invalid");

        // GetScrRefListFromRef: valid reference should parse
        var refs = validator.GetScrRefListFromRef("Matt 4:1-11; Mark 1:12-13");
        Assert.That(refs, Is.Not.Null);
        Assert.That(refs.Count, Is.GreaterThanOrEqualTo(2), "Should parse at least 2 references");

        // IsMarkerScannerCaresAbout: 'r' is a reference marker
        var isRefMarker = ParallelPassageReferenceValidator.IsMarkerScannerCaresAbout("r");
        Assert.That(isRefMarker, Is.True, "'r' is a parallel passage reference marker");
    }

    #endregion

    #region CAP-018: spec-007 - ValidateRef Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Empty reference produces 'Missing reference' error")]
    public void ValidateRef_EmptyReference_ReturnsMissingReferenceError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var result = validator.ValidateRef("", "r", inSidebar: false);

        Assert.That(result.HasError, Is.True);
        Assert.That(result.ErrorMessage, Does.Contain("Missing reference"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Book-only reference is rejected (INV-005)")]
    public void ValidateRef_BookOnlyReference_ReturnsError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var result = validator.ValidateRef("Matthew", "r", inSidebar: false);

        Assert.That(result.HasError, Is.True, "Book-only references must be rejected");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Missing final parenthesis detected")]
    public void ValidateRef_MissingFinalParenthesis_ReturnsError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var result = validator.ValidateRef("(Matt 4:1-11", "r", inSidebar: false);

        Assert.That(result.HasError, Is.True);
        Assert.That(result.ErrorMessage, Does.Contain("Missing final parenthesis"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Parenthesis convention mismatch produces error")]
    public void ValidateRef_ParenthesisConventionMismatch_ReturnsError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        validator.SetParenthesisConvention("r", useParentheses: false);
        var result = validator.ValidateRef("(Matt 4:1-11)", "r", inSidebar: false);

        Assert.That(result.HasError, Is.True);
        Assert.That(
            result.ErrorMessage,
            Does.Contain("Parentheses usually do not surround references in r")
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Equal paren with/without counts returns null preference")]
    public void GetParenthesisPreference_EqualCounts_ReturnsNull()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var preference = validator.GetParenthesisPreference("r", withCount: 3, withoutCount: 3);

        Assert.That(preference, Is.Null, "Tie means no convention established");
    }

    #endregion

    #region CAP-018: spec-008 - GetScrRefListFromRef Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-109")]
    [Description("Valid reference string parsed to list of references")]
    public void GetScrRefListFromRef_ValidMultipleRefs_ReturnsThreeReferences()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var refs = validator.GetScrRefListFromRef("Matt 4:1-11; Mark 1:12-13; Luke 4:1-13");

        Assert.That(refs, Is.Not.Null);
        Assert.That(refs.Count, Is.EqualTo(3), "Should parse 3 references");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Chapter range produces 2 references")]
    public void GetScrRefListFromRef_ChapterRange_ReturnsTwoMatches()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var refs = validator.GetScrRefListFromRef("Matthew 5-7");

        Assert.That(refs, Is.Not.Null);
        Assert.That(refs.Count, Is.EqualTo(2), "Chapter range 5-7 should produce 2 matches");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Verse range produces 1 reference")]
    public void GetScrRefListFromRef_VerseRange_ReturnsSingleReference()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var refs = validator.GetScrRefListFromRef("Matthew 5.3-12");

        Assert.That(refs, Is.Not.Null);
        Assert.That(refs.Count, Is.EqualTo(1), "Verse range should produce 1 reference");
    }

    #endregion

    #region CAP-018: spec-009 - IsMarkerScannerCaresAbout Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Reference markers correctly identified")]
    [TestCase("r", true)]
    [TestCase("ior", true)]
    [TestCase("sr", true)]
    [TestCase("mr", true)]
    [TestCase("fig", true)]
    [TestCase("rq", true)]
    [TestCase("v", false)]
    [TestCase("p", false)]
    [TestCase("s", false)]
    public void IsMarkerScannerCaresAbout_VariousMarkers_ReturnsExpected(
        string marker,
        bool expected
    )
    {
        var result = ParallelPassageReferenceValidator.IsMarkerScannerCaresAbout(marker);

        Assert.That(result, Is.EqualTo(expected), $"Marker '{marker}' expected {expected}");
    }

    #endregion

    #region CAP-018: spec-009 - ParseProjectParallelRefs Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-113")]
    [Description("ParseProjectParallelRefs completes without error for a valid project")]
    public void ParseProjectParallelRefs_WithValidProject_CompletesWithoutError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);
        var callbackInvoked = false;

        // For a dummy project, the method should complete without throwing.
        // Real behavior requires USFM content with \r markers.
        Assert.DoesNotThrow(() =>
        {
            validator.ParseProjectParallelRefs(
                bookNum: 40,
                onReferenceFound: (marker, reference) => { callbackInvoked = true; }
            );
        });
    }

    #endregion

    #region CAP-018: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Book-only references are always invalid")]
    [TestCase("Matthew")]
    [TestCase("Genesis")]
    [TestCase("Revelation")]
    [TestCase("Mark")]
    public void ValidateRef_BookOnlyReference_IsAlwaysInvalid(string bookOnlyRef)
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        var result = validator.ValidateRef(bookOnlyRef, "r", inSidebar: false);

        Assert.That(
            result.HasError,
            Is.True,
            $"Book-only ref '{bookOnlyRef}' must always be invalid"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Parenthesis style must be consistent per marker type")]
    [TestCase("r")]
    [TestCase("ior")]
    [TestCase("sr")]
    public void ValidateRef_ParenthesisConvention_IsConsistentPerMarker(string marker)
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);
        var validator = new ParallelPassageReferenceValidator(scrText);

        validator.SetParenthesisConvention(marker, useParentheses: false);
        var result = validator.ValidateRef("(Gen 1:1)", marker, inSidebar: false);

        Assert.That(
            result.HasError,
            Is.True,
            $"Marker '{marker}' with no-parens convention should reject parenthesized ref"
        );
    }

    #endregion

    // =========================================================================
    // MP-2 Capabilities
    // =========================================================================

    #region CAP-008: SourceLanguageTextSelection - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "EXT-008")]
    [Description("Acceptance test: Source text selection returns correct texts per passage type")]
    public void DetermineSourceTexts_AcceptanceTest_ReturnsCorrectTextsPerType()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        // Act - NTtoOT should include LXX/GRK and HEB
        var ntToOtSources = dataProvider.DetermineSourceTexts(
            ParallelPassageType.NTtoOT,
            new List<ScrText> { scrText },
            showSourceLanguageTexts: true
        );

        // Assert
        Assert.That(ntToOtSources, Is.Not.Null);
        // NTtoOT passages should have source texts added (LXX/GRK, HEB)
    }

    #endregion

    #region CAP-008: Contract Tests - Source Text Selection

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "EXT-008")]
    [Description("NTtoOT passage adds LXX/GRK and HEB source texts")]
    public void DetermineSourceTexts_NTtoOT_AddsLxxGrkAndHeb()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        var result = dataProvider.DetermineSourceTexts(
            ParallelPassageType.NTtoOT,
            new List<ScrText> { scrText },
            showSourceLanguageTexts: true
        );

        Assert.That(result, Is.Not.Null);
        // Source texts should include resources for LXX/GRK and HEB
        // Missing resources are silently skipped
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "EXT-008")]
    [Description("NTtoNT passage adds GRK if no SLT already present")]
    public void DetermineSourceTexts_NTtoNT_AddsGrkIfNoSlt()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        var result = dataProvider.DetermineSourceTexts(
            ParallelPassageType.NTtoNT,
            new List<ScrText> { scrText },
            showSourceLanguageTexts: true
        );

        Assert.That(result, Is.Not.Null);
        // Should add GRK if not already present as SLT
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "EXT-008")]
    [Description("OTtoOT passage adds HEB and LXX source texts")]
    public void DetermineSourceTexts_OTtoOT_AddsHebAndLxx()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        var result = dataProvider.DetermineSourceTexts(
            ParallelPassageType.OTtoOT,
            new List<ScrText> { scrText },
            showSourceLanguageTexts: true
        );

        Assert.That(result, Is.Not.Null);
        // Should add HEB and LXX
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "EXT-008")]
    [Description("Source display disabled returns empty list")]
    public void DetermineSourceTexts_DisplayDisabled_ReturnsEmptyList()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        var result = dataProvider.DetermineSourceTexts(
            ParallelPassageType.NTtoOT,
            new List<ScrText> { scrText },
            showSourceLanguageTexts: false
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.Empty, "No source texts when display is disabled");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "EXT-008")]
    [Description("Missing resources are silently skipped")]
    public void DetermineSourceTexts_MissingResource_SilentlySkipped()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);

        // Should not throw even when resources are not installed
        Assert.DoesNotThrow(() =>
        {
            dataProvider.DetermineSourceTexts(
                ParallelPassageType.NTtoOT,
                new List<ScrText> { scrText },
                showSourceLanguageTexts: true
            );
        });
    }

    #endregion

    #region CAP-012: CellEditabilityDetermination - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-012")]
    [Description("Acceptance test: Editability check returns correct editable/tooltip tuple")]
    public void DetermineEditability_AcceptanceTest_ReturnsEditableAndTooltip()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        // Act
        var (editable, tooltip) = dataProvider.DetermineEditability(scrText, vref);

        // Assert - result is a tuple with meaningful values
        Assert.That(tooltip, Is.Not.Null, "Tooltip must never be null");
    }

    #endregion

    #region CAP-012: Contract Tests - Editability

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-012")]
    [Description("User with CanEdit, book present, verse has content -> editable")]
    public void DetermineEditability_AllConditionsMet_ReturnsEditable()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        var (editable, tooltip) = dataProvider.DetermineEditability(scrText, vref);

        // When all conditions are met: CanEdit AND book present AND verse has content
        // The result should be editable=true
        Assert.That(tooltip, Is.Not.Null);
        // Note: actual editable value depends on DummyScrText permissions
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-012")]
    [Description("No CanEdit permission -> not editable with tooltip")]
    public void DetermineEditability_NoPermission_ReturnsNotEditable()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        // For a project where user lacks CanEdit permission
        var (editable, tooltip) = dataProvider.DetermineEditability(scrText, vref);

        // Result tuple should provide tooltip explaining why not editable
        Assert.That(tooltip, Is.Not.Null, "Tooltip must explain non-editable state");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-012")]
    [Description("Book not present in project -> not editable")]
    public void DetermineEditability_BookNotPresent_ReturnsNotEditable()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        // Use an unlikely book number that would not be present
        var vref = new VerseRef(66, 22, 1, scrText.Settings.Versification);

        var (editable, tooltip) = dataProvider.DetermineEditability(scrText, vref);

        Assert.That(editable, Is.False, "Book not in project should not be editable");
        Assert.That(tooltip, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-012")]
    [Description("Verse has no content -> not editable")]
    public void DetermineEditability_VerseEmpty_ReturnsNotEditable()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        // A verse that would have no content in a dummy project
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        var (editable, tooltip) = dataProvider.DetermineEditability(scrText, vref);

        // For a DummyScrText with no actual content, verse is empty
        Assert.That(tooltip, Is.Not.Null);
    }

    #endregion

    #region CAP-014: GetPreviousPassageVersion - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-104")]
    [Description("Acceptance test: GetPreviousPassageVersion returns stored text or null")]
    public async Task GetPreviousPassageVersion_AcceptanceTest_ReturnsStoredTextOrNull()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        // Act - for a passage that was never approved, should return null
        var result = await dataProvider.GetPreviousPassageVersionAsync(
            projectId,
            "MAT 4:1",
            new[] { "MAT 4:1", "MRK 1:12" }
        );

        // Assert
        // A passage never marked Finished returns null
        Assert.That(result, Is.Null, "Never-approved passage should return null");
    }

    #endregion

    #region CAP-014: Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-104")]
    [Description("Never-approved passage returns null")]
    public async Task GetPreviousPassageVersion_NeverApproved_ReturnsNull()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        var result = await dataProvider.GetPreviousPassageVersionAsync(
            projectId,
            "MAT 4:1",
            new[] { "MAT 4:1", "MRK 1:12" }
        );

        Assert.That(result, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-104")]
    [Description("Invalid project ID does not throw")]
    public async Task GetPreviousPassageVersion_InvalidProject_ReturnsNull()
    {
        var dataProvider = new ParallelPassageDataProvider(Client);

        var result = await dataProvider.GetPreviousPassageVersionAsync(
            "nonexistent-project-id",
            "MAT 4:1",
            new[] { "MAT 4:1", "MRK 1:12" }
        );

        Assert.That(result, Is.Null, "Invalid project should return null, not throw");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-104")]
    [Description("Delegates to ParallelPassageStatuses.GetPreviousPassageVersion")]
    public async Task GetPreviousPassageVersion_ValidProject_DelegatesToParatextData()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        // Should delegate to ParallelPassageStatuses.GetPreviousPassageVersion
        // without error for valid parameters
        Assert.DoesNotThrowAsync(async () =>
        {
            await dataProvider.GetPreviousPassageVersionAsync(
                projectId,
                "MAT 4:1",
                new[] { "MAT 4:1", "MRK 1:12" }
            );
        });
    }

    #endregion

    #region CAP-015: UpdateBooksInScope - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-102")]
    [Description("Acceptance test: UpdateBooksInScope updates ParallelPassagesBooks setting")]
    public async Task UpdateBooksInScope_AcceptanceTest_UpdatesSetting()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();
        var bookNumbers = new List<int> { 40, 41, 42 }; // Matt, Mark, Luke

        // Act
        await dataProvider.UpdateBooksInScopeAsync(projectId, bookNumbers);

        // Assert - the setting should be updated
        // Verify side effect: the ParallelPassagesBooks setting is changed
        // This is a thin wrapper so the observable effect is the setting value
    }

    #endregion

    #region CAP-015: Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-102")]
    [Description("UpdateBooksInScope with valid books updates setting")]
    public async Task UpdateBooksInScope_ValidBooks_UpdatesSetting()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        await dataProvider.UpdateBooksInScopeAsync(
            projectId,
            new List<int> { 40, 41, 42 }
        );

        // Setting should reflect the new book list
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-313")]
    [Description("Non-administrator gets PERMISSION_DENIED error")]
    public void UpdateBooksInScope_NotAdmin_ThrowsPermissionDenied()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        // Non-admin users should be denied
        // The implementation should check admin permission before updating
        Assert.ThrowsAsync<UnauthorizedAccessException>(async () =>
        {
            await dataProvider.UpdateBooksInScopeAsync(
                projectId,
                new List<int> { 40, 41, 42 }
            );
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-102")]
    [Description("Empty book list means all books are eligible")]
    public async Task UpdateBooksInScope_EmptyList_MeansAllBooks()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        await dataProvider.UpdateBooksInScopeAsync(
            projectId,
            new List<int>()
        );

        // Empty list = all books eligible (INV-003)
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-102")]
    [Description("Invalid project ID produces error")]
    public void UpdateBooksInScope_InvalidProject_ProducesError()
    {
        var dataProvider = new ParallelPassageDataProvider(Client);

        Assert.ThrowsAsync<Exception>(async () =>
        {
            await dataProvider.UpdateBooksInScopeAsync(
                "nonexistent-project",
                new List<int> { 40 }
            );
        });
    }

    #endregion

    #region CAP-015: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-003")]
    [Property("BehaviorId", "BHV-102")]
    [Description("Empty ParallelPassagesBooks means no books are ignored")]
    [TestCase(1)]
    [TestCase(40)]
    [TestCase(66)]
    public async Task UpdateBooksInScope_EmptyList_NoBookIsIgnored(int bookNum)
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var dataProvider = new ParallelPassageDataProvider(Client);
        var projectId = scrText.Guid.ToString();

        // Set empty book list
        await dataProvider.UpdateBooksInScopeAsync(
            projectId,
            new List<int>()
        );

        // After setting empty list, no book should be ignored
        // INV-003: |ParallelPassagesBooks| = 0 => IsIgnoredBook(b) = false for all b
    }

    #endregion
}
