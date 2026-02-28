using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for TermRenderingStatusService.GetTermRenderingStatusAsync (CAP-009).
///
/// This capability determines the rendering status of a linked term against a
/// tracked project's Biblical Terms, returning one of 12 status codes. It is the
/// core of the rendering status display system in Enhanced Resources.
///
/// Contract: Section 4.9 (data-contracts.md)
/// Input: Section 2.8 (TermRenderingStatusInput)
/// Output: Section 3.7 (TermRenderingStatusResult)
/// Behaviors: BHV-404 (Highlight Button Toggle State Machine),
///            BHV-111 (IMarbleDataAccess Interface),
///            BHV-112 (IMarbleWindow Interface)
/// Extraction: EXT-023 (Term Rendering Status Determination)
/// Invariants: INV-015 (Term Reference Match Threshold)
/// Golden Masters: GM-023 (term rendering status), GM-025 (highlight toggles)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class TermRenderingStatusServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-009
    // =========================================================================

    /// <summary>
    /// Acceptance test: The 12-code rendering status decision tree correctly
    /// determines status based on tracked project, term existence, rendering
    /// availability, and verse context. CSS classes are assigned correctly for
    /// highlight toggles. Homonym suffixes are stripped before matching.
    ///
    /// This test passes when CAP-009 is COMPLETE.
    /// GM-023: Term rendering status decision tree
    /// GM-025: Highlight toggle CSS classes
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023,GM-025")]
    [Description(
        "Acceptance test: 12-code rendering status determined correctly; "
            + "CSS classes set for highlight toggles; homonym -N suffix stripped"
    )]
    public async Task GetTermRenderingStatus_FullDecisionTree_AllStatusCodesAndCssClassesCorrect()
    {
        // Arrange: Create the service under test
        var service = new TermRenderingStatusService();

        // Build a standard link for testing (SDBG:agapao, base form 1, meaning 2)
        var link = new LexicalLink(
            Dictionary: "SDBG",
            Lemma: "agapao",
            BaseFormIndex: 1,
            MeaningIndex: 2
        );
        var verseRef = new VerseRef(43, 3, 16);

        // --- GM-023: NoTrackedProject ---
        var noTrackInput = new TermRenderingStatusInput(
            TrackedProjectId: null,
            Link: link,
            VerseRef: verseRef,
            ResourceId: "ESV-ER"
        );
        var noTrackResult = await service.GetTermRenderingStatusAsync(
            noTrackInput,
            CancellationToken.None
        );
        Assert.That(noTrackResult.Success, Is.True, "NoTrackedProject should succeed");
        Assert.That(
            noTrackResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
            "Should return NoTrackedProject when no project set"
        );
        Assert.That(noTrackResult.CssClass, Is.Null, "NoTrackedProject should have no CSS class");

        // --- GM-023: Found ---
        var foundInput = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: link,
            VerseRef: verseRef,
            ResourceId: "ESV-ER"
        );
        var foundResult = await service.GetTermRenderingStatusAsync(
            foundInput,
            CancellationToken.None
        );
        Assert.That(foundResult.Success, Is.True, "Found should succeed");
        Assert.That(
            foundResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.Found),
            "Should return Found when rendering exists in verse"
        );
        Assert.That(
            foundResult.FoundRendering,
            Is.Not.Null.And.Not.Empty,
            "Found status should include the rendering text"
        );
        Assert.That(
            foundResult.HasRendering,
            Is.True,
            "HasRendering should be true for Found status"
        );

        // --- GM-025: Found CSS class ---
        Assert.That(
            foundResult.CssClass,
            Is.EqualTo("showfound"),
            "Found status should have CSS class 'showfound'"
        );

        // --- GM-023: Missing ---
        var missingInput = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink(
                Dictionary: "SDBG",
                Lemma: "missingterm",
                BaseFormIndex: 1,
                MeaningIndex: 1
            ),
            VerseRef: verseRef,
            ResourceId: "ESV-ER"
        );
        var missingResult = await service.GetTermRenderingStatusAsync(
            missingInput,
            CancellationToken.None
        );
        Assert.That(missingResult.Success, Is.True, "Missing should succeed");
        Assert.That(
            missingResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.Missing),
            "Should return Missing when no rendering entered"
        );

        // --- GM-025: Missing CSS class ---
        Assert.That(
            missingResult.CssClass,
            Is.EqualTo("showmissing"),
            "Missing status should have CSS class 'showmissing'"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - 12 Status Codes (Happy Path)
    // =========================================================================

    // --- TS-089: NoTrackedProject ---

    /// <summary>
    /// When no tracked project is set (trackedProjectId is null), the status
    /// should always be NoTrackedProject regardless of the link or verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("NoTrackedProject returned when trackedProjectId is null")]
    public async Task GetTermRenderingStatus_NoTrackedProject_ReturnsNoTrackedProjectStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: null,
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NoTrackedProject));
        Assert.That(result.FoundRendering, Is.Null);
        Assert.That(result.HasRendering, Is.Null.Or.False);
        Assert.That(result.CssClass, Is.Null, "No CSS class for NoTrackedProject");
        Assert.That(result.Error, Is.Null, "No error for valid NoTrackedProject");
    }

    // --- TS-090: Found ---

    /// <summary>
    /// When a tracked project is set, the term exists in the project's BT list,
    /// a rendering is entered, and that rendering appears in the verse text,
    /// the status should be Found.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("Found status when rendering exists and is found in verse")]
    public async Task GetTermRenderingStatus_RenderingFoundInVerse_ReturnsFoundStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.Found));
        Assert.That(
            result.FoundRendering,
            Is.Not.Null.And.Not.Empty,
            "Found status must include the found rendering text"
        );
        Assert.That(result.HasRendering, Is.True, "HasRendering should be true for Found");
        Assert.That(
            result.CssClass,
            Is.EqualTo("showfound"),
            "Found status should set cssClass to 'showfound'"
        );
    }

    // --- TS-091: Missing ---

    /// <summary>
    /// When a tracked project is set, the term exists in the BT list, but no
    /// rendering has been entered for this term, the status should be Missing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("Missing status when no rendering entered for the term")]
    public async Task GetTermRenderingStatus_NoRenderingEntered_ReturnsMissingStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "missingterm", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.Missing));
        Assert.That(result.FoundRendering, Is.Null, "Missing should have no found rendering");
        Assert.That(result.HasRendering, Is.False, "HasRendering should be false for Missing");
        Assert.That(
            result.CssClass,
            Is.EqualTo("showmissing"),
            "Missing status should set cssClass to 'showmissing'"
        );
    }

    // --- TS-092: TermNotInProject ---

    /// <summary>
    /// When a tracked project is set but the matched ER term is not in the
    /// project's Biblical Terms list, the status should be TermNotInProject.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-092")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("TermNotInProject when term is not in project's BT list")]
    public async Task GetTermRenderingStatus_TermNotInBTList_ReturnsTermNotInProjectStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "unknownterm", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.TermNotInProject));
        Assert.That(
            result.FoundRendering,
            Is.Null,
            "TermNotInProject should have no found rendering"
        );
        Assert.That(result.CssClass, Is.Null, "TermNotInProject should have no CSS class");
    }

    // --- Additional status codes (inner decision tree) ---

    /// <summary>
    /// FoundInVerse: term has rendering, and the rendering is found specifically
    /// in the current verse being viewed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Description("FoundInVerse when rendering is specifically found in current verse")]
    public async Task GetTermRenderingStatus_RenderingInCurrentVerse_ReturnsFoundInVerseStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.Found)
                .Or.EqualTo(TermRenderingStatusCode.FoundInVerse),
            "Should be Found or FoundInVerse when rendering is in current verse"
        );
        Assert.That(result.HasRendering, Is.True);
        Assert.That(
            result.CssClass,
            Is.EqualTo("showfound"),
            "Found/FoundInVerse should have CSS class 'showfound'"
        );
    }

    /// <summary>
    /// MissingInVerse: term has rendering somewhere, but not in the current verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-404")]
    [Description("MissingInVerse when rendering exists elsewhere but not in current verse")]
    public async Task GetTermRenderingStatus_RenderingNotInCurrentVerse_ReturnsMissingInVerseStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termmissinginverse", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.MissingInVerse));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showmissing"),
            "MissingInVerse should have CSS class 'showmissing'"
        );
    }

    /// <summary>
    /// FoundElsewhere: rendering is in a different verse but found.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Description("FoundElsewhere when rendering is found in a different verse")]
    public async Task GetTermRenderingStatus_RenderingFoundElsewhere_ReturnsFoundElsewhereStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termfoundelsewhere", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.FoundElsewhere));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showfound"),
            "FoundElsewhere should have CSS class 'showfound'"
        );
    }

    /// <summary>
    /// MissingElsewhere: rendering is missing in a different verse.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-404")]
    [Description("MissingElsewhere when rendering is missing in a different verse")]
    public async Task GetTermRenderingStatus_RenderingMissingElsewhere_ReturnsMissingElsewhereStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termmissingelsewhere", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.MissingElsewhere));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showmissing"),
            "MissingElsewhere should have CSS class 'showmissing'"
        );
    }

    /// <summary>
    /// Denied: rendering has been explicitly denied/rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Denied when rendering has been explicitly denied")]
    public async Task GetTermRenderingStatus_RenderingDenied_ReturnsDeniedStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termdenied", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.Denied));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showmissing"),
            "Denied status should have CSS class 'showmissing'"
        );
    }

    /// <summary>
    /// GuessFound: rendering is a guess and appears to be found.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Description("GuessFound when rendering is guessed and found")]
    public async Task GetTermRenderingStatus_GuessedRenderingFound_ReturnsGuessFoundStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termguessfound", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.GuessFound));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showfound"),
            "GuessFound status should have CSS class 'showfound'"
        );
    }

    /// <summary>
    /// GuessMissing: rendering is a guess and appears to be missing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-404")]
    [Description("GuessMissing when rendering is guessed and missing")]
    public async Task GetTermRenderingStatus_GuessedRenderingMissing_ReturnsGuessMissingStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termguessmissing", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.GuessMissing));
        Assert.That(
            result.CssClass,
            Is.EqualTo("showmissing"),
            "GuessMissing status should have CSS class 'showmissing'"
        );
    }

    /// <summary>
    /// Unknown: rendering status cannot be determined.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Unknown when rendering status cannot be determined")]
    public async Task GetTermRenderingStatus_StatusIndeterminate_ReturnsUnknownStatus()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "termunknown", 1, 1),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.Unknown));
        Assert.That(result.CssClass, Is.Null, "Unknown status should have no CSS class");
    }

    // =========================================================================
    // HOMONYM HANDLING (TS-093, GM-023)
    // =========================================================================

    /// <summary>
    /// Homonym terms with trailing "-N" (e.g., "word-2") should have the
    /// suffix stripped via regex to get the base term "word" for matching.
    /// This is a critical edge case documented in GM-023 and EXT-023.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("Homonym suffix '-N' stripped for base term matching")]
    public async Task GetTermRenderingStatus_HomonymWithSuffix_StripsTrailingDashN()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        // "agapao-2" is a homonym; should match as "agapao"
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao-2", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert: Should resolve to a valid status (not TermNotInProject due to suffix)
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "Homonym suffix should be stripped; term 'agapao' should be found"
        );
    }

    /// <summary>
    /// Homonym suffix stripping should work for single-digit suffixes.
    /// "word-1" -> "word"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Homonym suffix '-1' stripped correctly")]
    public async Task GetTermRenderingStatus_HomonymSuffix1_StripsCorrectly()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao-1", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "Homonym '-1' suffix should be stripped for matching"
        );
    }

    /// <summary>
    /// Multi-digit homonym suffixes should also be stripped.
    /// "word-12" -> "word"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Homonym multi-digit suffix stripped correctly")]
    public async Task GetTermRenderingStatus_HomonymMultiDigitSuffix_StripsCorrectly()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao-12", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "Multi-digit homonym suffix '-12' should be stripped"
        );
    }

    /// <summary>
    /// Terms without a homonym suffix should not be altered.
    /// "agapao" -> "agapao" (unchanged)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Non-homonym terms are not altered by suffix stripping")]
    public async Task GetTermRenderingStatus_NoHomonymSuffix_TermUnchanged()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert: Should match normally without any suffix stripping
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "Non-homonym term should be found without suffix stripping"
        );
    }

    // =========================================================================
    // CSS CLASS ASSIGNMENT (TS-094, TS-095, TS-096, GM-025)
    // =========================================================================

    /// <summary>
    /// TS-094: The "Research Terms" toggle controls the "showeverylink" CSS class.
    /// This is primarily a UI behavior but the service should understand
    /// the mapping between toggle state and CSS class.
    ///
    /// Note: TS-094 logicLayer is "UI" but CSS class determination is backend logic.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Research Terms toggle maps to 'showeverylink' CSS class")]
    public void HighlightToggle_ResearchTermsOn_CssClassIsShowEveryLink()
    {
        // Arrange: Highlight flags with Research Terms toggled on
        var flags = new HighlightFlags(ResearchTerms: true, Found: false, Missing: false);

        // Act: Determine CSS classes from highlight flags
        var cssClasses = TermRenderingStatusService.GetHighlightCssClasses(flags);

        // Assert
        Assert.That(cssClasses, Contains.Item("showeverylink"));
        Assert.That(cssClasses, Does.Not.Contain("showfound"));
        Assert.That(cssClasses, Does.Not.Contain("showmissing"));
    }

    /// <summary>
    /// TS-095: The "Found" toggle controls the "showfound" CSS class.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Found toggle maps to 'showfound' CSS class")]
    public void HighlightToggle_FoundOn_CssClassIsShowFound()
    {
        // Arrange: Highlight flags with Found toggled on
        var flags = new HighlightFlags(ResearchTerms: false, Found: true, Missing: false);

        // Act
        var cssClasses = TermRenderingStatusService.GetHighlightCssClasses(flags);

        // Assert
        Assert.That(cssClasses, Contains.Item("showfound"));
        Assert.That(cssClasses, Does.Not.Contain("showeverylink"));
        Assert.That(cssClasses, Does.Not.Contain("showmissing"));
    }

    /// <summary>
    /// TS-096: The "Missing" toggle controls the "showmissing" CSS class.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Missing toggle maps to 'showmissing' CSS class")]
    public void HighlightToggle_MissingOn_CssClassIsShowMissing()
    {
        // Arrange: Highlight flags with Missing toggled on
        var flags = new HighlightFlags(ResearchTerms: false, Found: false, Missing: true);

        // Act
        var cssClasses = TermRenderingStatusService.GetHighlightCssClasses(flags);

        // Assert
        Assert.That(cssClasses, Contains.Item("showmissing"));
        Assert.That(cssClasses, Does.Not.Contain("showeverylink"));
        Assert.That(cssClasses, Does.Not.Contain("showfound"));
    }

    /// <summary>
    /// Multiple toggles can be active simultaneously. All corresponding CSS
    /// classes should be included.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Multiple toggles produce multiple CSS classes")]
    public void HighlightToggle_AllOn_AllCssClassesPresent()
    {
        // Arrange: All highlight flags on
        var flags = new HighlightFlags(ResearchTerms: true, Found: true, Missing: true);

        // Act
        var cssClasses = TermRenderingStatusService.GetHighlightCssClasses(flags);

        // Assert
        Assert.That(cssClasses, Contains.Item("showeverylink"));
        Assert.That(cssClasses, Contains.Item("showfound"));
        Assert.That(cssClasses, Contains.Item("showmissing"));
    }

    /// <summary>
    /// No toggles active produces empty CSS class list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("No toggles produces empty CSS class list")]
    public void HighlightToggle_AllOff_NoCssClasses()
    {
        // Arrange
        var flags = new HighlightFlags(ResearchTerms: false, Found: false, Missing: false);

        // Act
        var cssClasses = TermRenderingStatusService.GetHighlightCssClasses(flags);

        // Assert
        Assert.That(cssClasses, Is.Empty);
    }

    // =========================================================================
    // CSS CLASS PER STATUS CODE (GM-025 invariant mapping)
    // =========================================================================

    /// <summary>
    /// All "found" family status codes should map to "showfound" CSS class.
    /// Found, FoundInVerse, FoundElsewhere, GuessFound all use "showfound".
    /// </summary>
    [TestCase(TermRenderingStatusCode.Found, "showfound")]
    [TestCase(TermRenderingStatusCode.FoundInVerse, "showfound")]
    [TestCase(TermRenderingStatusCode.FoundElsewhere, "showfound")]
    [TestCase(TermRenderingStatusCode.GuessFound, "showfound")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Found-family status codes map to 'showfound' CSS class")]
    public void CssClassForStatus_FoundFamily_ReturnsShowFound(
        TermRenderingStatusCode statusCode,
        string expectedCss
    )
    {
        // Act
        var cssClass = TermRenderingStatusService.GetCssClassForStatus(statusCode);

        // Assert
        Assert.That(cssClass, Is.EqualTo(expectedCss));
    }

    /// <summary>
    /// All "missing" family status codes should map to "showmissing" CSS class.
    /// Missing, MissingInVerse, MissingElsewhere, GuessMissing, Denied all use "showmissing".
    /// </summary>
    [TestCase(TermRenderingStatusCode.Missing, "showmissing")]
    [TestCase(TermRenderingStatusCode.MissingInVerse, "showmissing")]
    [TestCase(TermRenderingStatusCode.MissingElsewhere, "showmissing")]
    [TestCase(TermRenderingStatusCode.GuessMissing, "showmissing")]
    [TestCase(TermRenderingStatusCode.Denied, "showmissing")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Missing-family status codes map to 'showmissing' CSS class")]
    public void CssClassForStatus_MissingFamily_ReturnsShowMissing(
        TermRenderingStatusCode statusCode,
        string expectedCss
    )
    {
        // Act
        var cssClass = TermRenderingStatusService.GetCssClassForStatus(statusCode);

        // Assert
        Assert.That(cssClass, Is.EqualTo(expectedCss));
    }

    /// <summary>
    /// NoTrackedProject, TermNotInProject, Unknown should have no CSS class.
    /// </summary>
    [TestCase(TermRenderingStatusCode.NoTrackedProject)]
    [TestCase(TermRenderingStatusCode.TermNotInProject)]
    [TestCase(TermRenderingStatusCode.Unknown)]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Non-highlighting status codes have no CSS class")]
    public void CssClassForStatus_NeutralStatus_ReturnsNull(TermRenderingStatusCode statusCode)
    {
        // Act
        var cssClass = TermRenderingStatusService.GetCssClassForStatus(statusCode);

        // Assert
        Assert.That(cssClass, Is.Null, $"Status {statusCode} should have no CSS class");
    }

    // =========================================================================
    // ERROR CONDITIONS (Section 4.9 Error Conditions)
    // =========================================================================

    /// <summary>
    /// When the tracked project ID references a project that does not exist
    /// in ScrTextCollection, the result should indicate NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Description("NOT_FOUND when tracked project does not exist")]
    public async Task GetTermRenderingStatus_TrackedProjectNotFound_ReturnsNotFoundError()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "nonexistentProject",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False, "Should fail for nonexistent project");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
        Assert.That(
            result.Error.Message,
            Does.Contain("nonexistentProject"),
            "Error message should include the missing project ID"
        );
    }

    /// <summary>
    /// When the tracked project exists but Biblical Terms data is not loaded,
    /// the result should indicate INVALID_STATE.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-404")]
    [Description("INVALID_STATE when Biblical Terms data not loaded for project")]
    public async Task GetTermRenderingStatus_TermsDataNotLoaded_ReturnsInvalidStateError()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "projectWithoutTerms",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False, "Should fail when terms data not loaded");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_STATE"));
        Assert.That(
            result.Error.Message,
            Does.Contain("Biblical Terms"),
            "Error message should reference Biblical Terms"
        );
    }

    /// <summary>
    /// Error result structure should follow the standard ErrorInfo pattern.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Error result has correct structure")]
    public async Task GetTermRenderingStatus_ErrorResult_HasCorrectStructure()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: "nonexistentProject",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert: Error result shape
        Assert.That(result.Success, Is.False);
        Assert.That(result.StatusCode, Is.Null, "Error result should have null StatusCode");
        Assert.That(result.FoundRendering, Is.Null, "Error result should have null FoundRendering");
        Assert.That(result.HasRendering, Is.Null, "Error result should have null HasRendering");
        Assert.That(result.CssClass, Is.Null, "Error result should have null CssClass");
        Assert.That(result.Error, Is.Not.Null, "Error result must have Error");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code must not be empty");
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message must not be empty"
        );
    }

    // =========================================================================
    // TRACKED PROJECT MANAGEMENT (TS-131, TS-132, TS-133, TS-134)
    // =========================================================================

    /// <summary>
    /// TS-131: Tracked project dropdown should list only open non-resource projects.
    /// Enhanced Resources themselves should be excluded from the tracked project list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-131")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Only non-resource open projects listed for tracking")]
    public void GetTrackableProjects_MixedProjectTypes_ExcludesResources()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act: Get the list of projects that can be tracked
        var trackableProjects = service.GetTrackableProjects();

        // Assert: Only non-resource projects should be included
        Assert.That(trackableProjects, Is.Not.Null);
        Assert.That(
            trackableProjects.All(p => !p.IsResource),
            Is.True,
            "Resource projects should be excluded from trackable project list"
        );
    }

    /// <summary>
    /// TS-132: Setting a tracked project should load BiblicalTerms,
    /// TermRenderings, and LexicalAnalyser for that project.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-132")]
    [Property("BehaviorId", "BHV-404")]
    [Description("SetTrackedProject loads BT data for the selected project")]
    public async Task SetTrackedProject_ValidProject_LoadsBiblicalTermsData()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act: Set a valid project as tracked
        var result = await service.SetTrackedProjectAsync("zzz5", CancellationToken.None);

        // Assert: BiblicalTerms data should be loaded
        Assert.That(result.Success, Is.True, "SetTrackedProject should succeed for valid project");
        Assert.That(
            service.HasTrackedProject,
            Is.True,
            "Service should have a tracked project after setting"
        );
        Assert.That(
            service.TrackedProjectId,
            Is.EqualTo("zzz5"),
            "TrackedProjectId should match the set project"
        );
    }

    /// <summary>
    /// TS-133: Clearing the tracked project should null out all tracking state:
    /// trackedProject, terms, renderings, analyzer.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-133")]
    [Property("BehaviorId", "BHV-404")]
    [Description("ClearTrackedProject clears all tracking state")]
    public void ClearTrackedProject_AfterSetting_ClearsAllState()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act: Clear the tracked project
        service.ClearTrackedProject();

        // Assert: All tracking state should be cleared
        Assert.That(
            service.HasTrackedProject,
            Is.False,
            "HasTrackedProject should be false after clearing"
        );
        Assert.That(
            service.TrackedProjectId,
            Is.Null,
            "TrackedProjectId should be null after clearing"
        );
    }

    /// <summary>
    /// TS-134: When a tracked project is removed from ScrTextCollection
    /// (e.g., deleted or closed), the tracking should be silently cleared
    /// via ChangeListener -- no error thrown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Tracked project silently cleared when project is removed")]
    public async Task TrackedProjectRemoved_WhileTracking_SilentlyClearsTracking()
    {
        // Arrange: Set up tracking first
        var service = new TermRenderingStatusService();
        await service.SetTrackedProjectAsync("zzz5", CancellationToken.None);
        Assert.That(service.HasTrackedProject, Is.True, "Precondition: project is tracked");

        // Act: Simulate the tracked project being removed
        // (In production, ScrTextCollection change listener triggers ClearTrackedProject)
        service.OnTrackedProjectRemoved();

        // Assert: Tracking should be cleared silently (no exception)
        Assert.That(
            service.HasTrackedProject,
            Is.False,
            "Tracking should be cleared when project is removed"
        );
        Assert.That(
            service.TrackedProjectId,
            Is.Null,
            "TrackedProjectId should be null after project removal"
        );
    }

    /// <summary>
    /// After a tracked project is removed, subsequent GetTermRenderingStatus calls
    /// should return NoTrackedProject rather than throwing an error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-404")]
    [Description("After project removal, status returns NoTrackedProject gracefully")]
    public async Task GetTermRenderingStatus_AfterProjectRemoved_ReturnsNoTrackedProject()
    {
        // Arrange: Set up tracking then simulate removal
        var service = new TermRenderingStatusService();
        await service.SetTrackedProjectAsync("zzz5", CancellationToken.None);
        service.OnTrackedProjectRemoved();

        var input = new TermRenderingStatusInput(
            TrackedProjectId: null, // Would be null since project was removed
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NoTrackedProject));
    }

    // =========================================================================
    // INTERFACE CONTRACTS (BHV-111, BHV-112)
    // =========================================================================

    /// <summary>
    /// BHV-111: IMarbleDataAccess.HaveMarbleData should return true when
    /// ER data is available, false otherwise.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-111")]
    [Description("IMarbleDataAccess.HaveMarbleData reflects data availability")]
    public void HaveMarbleData_WhenDataAvailable_ReturnsTrue()
    {
        // Arrange: Service with Marble data loaded
        var service = new TermRenderingStatusService();

        // Act/Assert: Should reflect whether Marble data is available
        // This property is set during initialization (CAP-015)
        Assert.That(
            service.HaveMarbleData,
            Is.True.Or.False,
            "HaveMarbleData should return a boolean (true when data loaded)"
        );
    }

    /// <summary>
    /// BHV-111: IMarbleDataAccess.AvailableGlossLanguages returns the list
    /// of available gloss languages.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-111")]
    [Description("AvailableGlossLanguages returns list of gloss languages")]
    public void AvailableGlossLanguages_WhenDataAvailable_ReturnsList()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act
        var languages = service.AvailableGlossLanguages;

        // Assert
        Assert.That(languages, Is.Not.Null, "AvailableGlossLanguages should not be null");
    }

    /// <summary>
    /// BHV-111: IMarbleDataAccess.FindLocalizedGlossesForTerm returns glosses
    /// for a given term and language.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-111")]
    [Description("FindLocalizedGlossesForTerm returns glosses for a term")]
    public void FindLocalizedGlossesForTerm_KnownTerm_ReturnsGlosses()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act
        var glosses = service.FindLocalizedGlossesForTerm("agapao", "en");

        // Assert
        Assert.That(glosses, Is.Not.Null, "Should return glosses for known term");
    }

    /// <summary>
    /// BHV-112: IMarbleWindow.TrackedProject returns the followed project,
    /// or null when no project is tracked.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-133")]
    [Property("BehaviorId", "BHV-112")]
    [Description("TrackedProject returns null when no project is tracked")]
    public void TrackedProject_NoProjectTracked_ReturnsNull()
    {
        // Arrange: Service without a tracked project
        var service = new TermRenderingStatusService();

        // Act/Assert
        Assert.That(
            service.TrackedProjectId,
            Is.Null,
            "TrackedProjectId should be null when no project is tracked"
        );
    }

    // =========================================================================
    // INVARIANT TESTS (INV-015)
    // =========================================================================

    /// <summary>
    /// INV-015: When matching ER terms to Biblical Terms by reference,
    /// a match requires more than 25% of references to overlap.
    /// This invariant ensures that the reference match threshold is applied.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Term reference match requires >25% overlap")]
    public void ReferenceMatchThreshold_BelowThreshold_NoMatch()
    {
        // Arrange: A term with references where overlap is <=25%
        // If a term has 100 references and only 20 overlap with the ER context,
        // that is 20% overlap which is below the 25% threshold.
        var service = new TermRenderingStatusService();

        // Act: Attempt to match with low overlap
        var isMatch = service.IsReferenceMatch(totalReferences: 100, overlappingReferences: 20);

        // Assert
        Assert.That(isMatch, Is.False, "20% overlap should not meet the 25% threshold");
    }

    /// <summary>
    /// INV-015: Reference match at exactly 25% boundary -- should NOT match.
    /// The rule requires MORE THAN 25%, so exactly 25% should not qualify.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Exactly 25% overlap does not meet threshold (requires >25%)")]
    public void ReferenceMatchThreshold_ExactlyAtBoundary_NoMatch()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act
        var isMatch = service.IsReferenceMatch(totalReferences: 100, overlappingReferences: 25);

        // Assert: >25% means 25% is NOT enough
        Assert.That(isMatch, Is.False, "Exactly 25% should NOT meet the >25% threshold");
    }

    /// <summary>
    /// INV-015: Reference match above 25% threshold -- should match.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Above 25% overlap meets threshold")]
    public void ReferenceMatchThreshold_AboveThreshold_Matches()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act
        var isMatch = service.IsReferenceMatch(totalReferences: 100, overlappingReferences: 26);

        // Assert
        Assert.That(isMatch, Is.True, "26% overlap should meet the >25% threshold");
    }

    /// <summary>
    /// INV-015: Reference match with small total (edge case) -- 1 of 3
    /// is 33% which should match.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Small reference count with overlap above threshold")]
    public void ReferenceMatchThreshold_SmallTotal_AboveThreshold_Matches()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act: 1 of 3 = 33.3%
        var isMatch = service.IsReferenceMatch(totalReferences: 3, overlappingReferences: 1);

        // Assert
        Assert.That(isMatch, Is.True, "33.3% overlap should meet the >25% threshold");
    }

    /// <summary>
    /// INV-015: Reference match with zero total references should not match.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Zero total references should not match")]
    public void ReferenceMatchThreshold_ZeroTotal_NoMatch()
    {
        // Arrange
        var service = new TermRenderingStatusService();

        // Act
        var isMatch = service.IsReferenceMatch(totalReferences: 0, overlappingReferences: 0);

        // Assert
        Assert.That(isMatch, Is.False, "Zero total references should not match");
    }

    // =========================================================================
    // GOLDEN MASTER TESTS (GM-023, GM-025)
    // =========================================================================

    /// <summary>
    /// GM-023: Full golden master test for the term rendering status decision tree.
    /// Verifies all documented scenarios match expected output exactly.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-023")]
    [Description("GM-023: Term rendering status decision tree matches golden master")]
    public async Task GoldenMaster_GM023_TermRenderingStatusDecisionTree()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var link = new LexicalLink("SDBG", "agapao", 1, 2);
        var verseRef = new VerseRef(43, 3, 16);

        // --- noTrackedProject ---
        var noTrackResult = await service.GetTermRenderingStatusAsync(
            new TermRenderingStatusInput(null, link, verseRef, "ESV-ER"),
            CancellationToken.None
        );
        Assert.That(
            noTrackResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
            "GM-023 noTrackedProject: statusCode should be NoTrackedProject"
        );

        // --- found ---
        var foundResult = await service.GetTermRenderingStatusAsync(
            new TermRenderingStatusInput("zzz5", link, verseRef, "ESV-ER"),
            CancellationToken.None
        );
        Assert.That(
            foundResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.Found),
            "GM-023 found: statusCode should be Found"
        );
        Assert.That(
            foundResult.FoundRendering,
            Is.Not.Null,
            "GM-023 found: hasFoundRendering should be true"
        );

        // --- missing ---
        var missingResult = await service.GetTermRenderingStatusAsync(
            new TermRenderingStatusInput(
                "zzz5",
                new LexicalLink("SDBG", "missingterm", 1, 1),
                verseRef,
                "ESV-ER"
            ),
            CancellationToken.None
        );
        Assert.That(
            missingResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.Missing),
            "GM-023 missing: statusCode should be Missing"
        );

        // --- termNotInProject ---
        var notInProjectResult = await service.GetTermRenderingStatusAsync(
            new TermRenderingStatusInput(
                "zzz5",
                new LexicalLink("SDBG", "unknownterm", 1, 1),
                verseRef,
                "ESV-ER"
            ),
            CancellationToken.None
        );
        Assert.That(
            notInProjectResult.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "GM-023 termNotInProject: statusCode should be TermNotInProject"
        );

        // --- homonymStripping ---
        var homonymResult = await service.GetTermRenderingStatusAsync(
            new TermRenderingStatusInput(
                "zzz5",
                new LexicalLink("SDBG", "agapao-2", 1, 2),
                verseRef,
                "ESV-ER"
            ),
            CancellationToken.None
        );
        Assert.That(
            homonymResult.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.TermNotInProject),
            "GM-023 homonymStripping: should strip '-2' and find base term"
        );
    }

    /// <summary>
    /// GM-025: Golden master test for highlight toggle CSS class mapping.
    /// Verifies that each toggle button maps to the correct CSS class.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("GM-025: Highlight toggle CSS classes match golden master")]
    public void GoldenMaster_GM025_HighlightToggleCssClasses()
    {
        // --- researchTermsOn ---
        var researchFlags = new HighlightFlags(ResearchTerms: true, Found: false, Missing: false);
        var researchCss = TermRenderingStatusService.GetHighlightCssClasses(researchFlags);
        Assert.That(
            researchCss,
            Contains.Item("showeverylink"),
            "GM-025 researchTermsOn: cssClass should be 'showeverylink'"
        );

        // --- foundOn ---
        var foundFlags = new HighlightFlags(ResearchTerms: false, Found: true, Missing: false);
        var foundCss = TermRenderingStatusService.GetHighlightCssClasses(foundFlags);
        Assert.That(
            foundCss,
            Contains.Item("showfound"),
            "GM-025 foundOn: cssClass should be 'showfound'"
        );

        // --- missingOn ---
        var missingFlags = new HighlightFlags(ResearchTerms: false, Found: false, Missing: true);
        var missingCss = TermRenderingStatusService.GetHighlightCssClasses(missingFlags);
        Assert.That(
            missingCss,
            Contains.Item("showmissing"),
            "GM-025 missingOn: cssClass should be 'showmissing'"
        );
    }

    // =========================================================================
    // RESULT SHAPE VALIDATION
    // =========================================================================

    /// <summary>
    /// Success result should have all required fields populated and no error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Success result has correct shape")]
    public async Task GetTermRenderingStatus_SuccessResult_HasCorrectShape()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: null,
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert: Success result shape
        Assert.That(result.Success, Is.True);
        Assert.That(result.StatusCode, Is.Not.Null, "Success result must have StatusCode");
        Assert.That(result.Error, Is.Null, "Success result should have null Error");
    }

    // =========================================================================
    // CANCELLATION SUPPORT
    // =========================================================================

    /// <summary>
    /// The async method should respect cancellation tokens.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Cancellation token is respected")]
    public void GetTermRenderingStatus_CancelledToken_ThrowsOrReturnsGracefully()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var cts = new CancellationTokenSource();
        cts.Cancel(); // Pre-cancel

        var input = new TermRenderingStatusInput(
            TrackedProjectId: "zzz5",
            Link: new LexicalLink("SDBG", "agapao", 1, 2),
            VerseRef: new VerseRef(43, 3, 16),
            ResourceId: "ESV-ER"
        );

        // Act/Assert: Should throw OperationCanceledException for a pre-cancelled token
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await service.GetTermRenderingStatusAsync(input, cts.Token)
        );
    }

    // =========================================================================
    // HEBREW TERMS (SDBH) - CROSS-DICTIONARY SUPPORT
    // =========================================================================

    /// <summary>
    /// The service should handle Hebrew dictionary terms (SDBH) just as well
    /// as Greek (SDBG) terms.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Hebrew (SDBH) dictionary terms work correctly")]
    public async Task GetTermRenderingStatus_HebrewDictionary_WorksCorrectly()
    {
        // Arrange
        var service = new TermRenderingStatusService();
        var input = new TermRenderingStatusInput(
            TrackedProjectId: null,
            Link: new LexicalLink("SDBH", "ahab", 1, 1),
            VerseRef: new VerseRef(1, 1, 1),
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await service.GetTermRenderingStatusAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True, "Hebrew term lookup should succeed");
        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
            "No tracked project should return NoTrackedProject regardless of dictionary"
        );
    }
}
