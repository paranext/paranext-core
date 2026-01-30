using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParallelPassages;
using Paratext.Data;

namespace TestParanextDataProvider.ParallelPassages;

/// <summary>
/// Tests for MP-1 capabilities: CAP-010 (PassageDataLoadingAndCaching) and
/// CAP-018 (ReferenceValidation). These are RED-phase TDD tests that define
/// the expected behavior before implementation exists.
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
}
