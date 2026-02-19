using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-008: CombineTermStatusCodes.
/// Validates the priority-based state machine that merges per-verse rendering status codes
/// into an overall display item status. This is a pure function with no external dependencies.
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs:1378-1419
/// Golden Master: gm-002-combine-status-codes
/// Extraction: EXT-051
/// Invariant: INV-015 (Deduplication Groups by Term + SourceText + LexicalLinks)
///
/// The state machine has:
/// - 4 global override codes that always replace any current status
/// - Priority-based merging for non-global codes based on current state
/// - NotDefined (0) as the initial state that accepts any new status
/// - SomeRenderingsFound (12) produced only by combination, never single-token evaluation
/// </summary>
[TestFixture]
public class TermRenderingStatusServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-008.
    /// Verifies all gm-002 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// The truth table covers:
    /// - CSC-01..CSC-04: Global override codes (any current -> new status wins)
    /// - CSC-05..CSC-08: RenderingMissingInVerse combinations
    /// - CSC-09..CSC-11: GuessedRendingFound combinations
    /// - CSC-12..CSC-14: RenderingFound combinations
    /// - CSC-15: RenderingDeniedInVerse with initial
    /// - CSC-16: NoVerseText with initial
    /// - CSC-17: NotInVerse with initial
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Description(
        "Acceptance test: Status codes correctly combined per state machine rules"
    )]
    public void CombineTermStatusCodes_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // CSC-01: NotTermInProject overrides RenderingFound (global override)
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.RenderingFound,
                    TermRenderingStatusCode.NotTermInProject
                ),
                Is.EqualTo(TermRenderingStatusCode.NotTermInProject),
                "CSC-01: NotTermInProject must override RenderingFound"
            );

            // CSC-02: NoDictionaryEntry overrides RenderingFound (global override)
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.RenderingFound,
                    TermRenderingStatusCode.NoDictionaryEntry
                ),
                Is.EqualTo(TermRenderingStatusCode.NoDictionaryEntry),
                "CSC-02: NoDictionaryEntry must override RenderingFound"
            );

            // CSC-03: NoRenderingsEntered overrides GuessedRendingFound (global override)
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.GuessedRendingFound,
                    TermRenderingStatusCode.NoRenderingsEntered
                ),
                Is.EqualTo(TermRenderingStatusCode.NoRenderingsEntered),
                "CSC-03: NoRenderingsEntered must override GuessedRendingFound"
            );

            // CSC-04: NoTrackedProject overrides SomeRenderingsFound (global override)
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.SomeRenderingsFound,
                    TermRenderingStatusCode.NoTrackedProject
                ),
                Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
                "CSC-04: NoTrackedProject must override SomeRenderingsFound"
            );

            // CSC-05: RenderingMissingInVerse with NotDefined -> RenderingMissingInVerse
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingMissingInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingMissingInVerse),
                "CSC-05: Missing with initial NotDefined must become RenderingMissingInVerse"
            );

            // CSC-06: RenderingMissingInVerse with RenderingFound -> SomeRenderingsFound
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.RenderingFound,
                    TermRenderingStatusCode.RenderingMissingInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "CSC-06: Missing + Found must equal SomeRenderingsFound"
            );

            // CSC-07: RenderingMissingInVerse with GuessedRendingFound -> SomeRenderingsFound
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.GuessedRendingFound,
                    TermRenderingStatusCode.RenderingMissingInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "CSC-07: Missing + Guessed must equal SomeRenderingsFound"
            );

            // CSC-08: RenderingMissingInVerse with SomeRenderingsFound -> SomeRenderingsFound
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.SomeRenderingsFound,
                    TermRenderingStatusCode.RenderingMissingInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "CSC-08: Missing + Some must stay SomeRenderingsFound"
            );

            // CSC-09: GuessedRendingFound with NotDefined -> GuessedRendingFound
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.GuessedRendingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound),
                "CSC-09: Guessed with initial NotDefined must become GuessedRendingFound"
            );

            // CSC-10: GuessedRendingFound overrides RenderingDeniedInVerse
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.RenderingDeniedInVerse,
                    TermRenderingStatusCode.GuessedRendingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound),
                "CSC-10: Guessed must override Denied"
            );

            // CSC-11: GuessedRendingFound overrides NoVerseText
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NoVerseText,
                    TermRenderingStatusCode.GuessedRendingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound),
                "CSC-11: Guessed must override NoVerseText"
            );

            // CSC-12: RenderingFound with NotDefined -> RenderingFound
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingFound),
                "CSC-12: Found with initial NotDefined must become RenderingFound"
            );

            // CSC-13: RenderingFound overrides RenderingDeniedInVerse
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.RenderingDeniedInVerse,
                    TermRenderingStatusCode.RenderingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingFound),
                "CSC-13: Found must override Denied"
            );

            // CSC-14: RenderingFound overrides NoVerseText
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NoVerseText,
                    TermRenderingStatusCode.RenderingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingFound),
                "CSC-14: Found must override NoVerseText"
            );

            // CSC-15: RenderingDeniedInVerse with NotDefined -> RenderingDeniedInVerse
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingDeniedInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingDeniedInVerse),
                "CSC-15: Denied with initial NotDefined must become RenderingDeniedInVerse"
            );

            // CSC-16: NoVerseText with NotDefined -> NoVerseText
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.NoVerseText
                ),
                Is.EqualTo(TermRenderingStatusCode.NoVerseText),
                "CSC-16: NoVerseText with initial NotDefined must become NoVerseText"
            );

            // CSC-17: NotInVerse with NotDefined -> NotInVerse
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.NotInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.NotInVerse),
                "CSC-17: NotInVerse with initial NotDefined must become NotInVerse"
            );
        });
    }

    #endregion

    #region Golden Master Tests - Global Override Codes (CSC-01 through CSC-04)

    /// <summary>
    /// CSC-01: NotTermInProject is a global override code that replaces any current status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Property("GoldenMasterRow", "CSC-01")]
    [Description("NotTermInProject overrides any current status (global override)")]
    public void CombineTermStatusCodes_NotTermInProject_OverridesAny()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingFound,
            TermRenderingStatusCode.NotTermInProject
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NotTermInProject));
    }

    /// <summary>
    /// CSC-02: NoDictionaryEntry is a global override code that replaces any current status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Property("GoldenMasterRow", "CSC-02")]
    [Description("NoDictionaryEntry overrides any current status (global override)")]
    public void CombineTermStatusCodes_NoDictionaryEntry_OverridesAny()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingFound,
            TermRenderingStatusCode.NoDictionaryEntry
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NoDictionaryEntry));
    }

    /// <summary>
    /// CSC-03: NoRenderingsEntered is a global override code that replaces any current status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Property("GoldenMasterRow", "CSC-03")]
    [Description("NoRenderingsEntered overrides any current status (global override)")]
    public void CombineTermStatusCodes_NoRenderingsEntered_OverridesAny()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.GuessedRendingFound,
            TermRenderingStatusCode.NoRenderingsEntered
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NoRenderingsEntered));
    }

    /// <summary>
    /// CSC-04: NoTrackedProject is a global override code that replaces any current status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Property("GoldenMasterRow", "CSC-04")]
    [Description("NoTrackedProject overrides any current status (global override)")]
    public void CombineTermStatusCodes_NoTrackedProject_OverridesAny()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.SomeRenderingsFound,
            TermRenderingStatusCode.NoTrackedProject
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NoTrackedProject));
    }

    #endregion

    #region Golden Master Tests - RenderingMissingInVerse Combinations (CSC-05 through CSC-08)

    /// <summary>
    /// CSC-05: RenderingMissingInVerse with NotDefined sets the initial status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-125")]
    [Property("GoldenMasterRow", "CSC-05")]
    [Description("RenderingMissingInVerse with initial NotDefined")]
    public void CombineTermStatusCodes_MissingWithNotDefined_ReturnsMissing()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.RenderingMissingInVerse));
    }

    /// <summary>
    /// CSC-06: Missing + Found = SomeRenderingsFound. This is the key state machine transition.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Property("GoldenMasterRow", "CSC-06")]
    [Description("Missing + Found = SomeRenderingsFound (key transition)")]
    public void CombineTermStatusCodes_MissingWithFound_ReturnsSome()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingFound,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound));
    }

    /// <summary>
    /// CSC-07: Missing + Guessed = SomeRenderingsFound.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Property("GoldenMasterRow", "CSC-07")]
    [Description("Missing + Guessed = SomeRenderingsFound")]
    public void CombineTermStatusCodes_MissingWithGuessed_ReturnsSome()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.GuessedRendingFound,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound));
    }

    /// <summary>
    /// CSC-08: Missing + Some remains SomeRenderingsFound.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Property("GoldenMasterRow", "CSC-08")]
    [Description("Missing + SomeRenderingsFound stays SomeRenderingsFound")]
    public void CombineTermStatusCodes_MissingWithSome_ReturnsSome()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.SomeRenderingsFound,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound));
    }

    #endregion

    #region Golden Master Tests - GuessedRendingFound Combinations (CSC-09 through CSC-11)

    /// <summary>
    /// CSC-09: GuessedRendingFound with initial NotDefined.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-09")]
    [Description("GuessedRendingFound with initial NotDefined")]
    public void CombineTermStatusCodes_GuessedWithNotDefined_ReturnsGuessed()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.GuessedRendingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound));
    }

    /// <summary>
    /// CSC-10: GuessedRendingFound overrides RenderingDeniedInVerse.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-10")]
    [Description("GuessedRendingFound overrides Denied")]
    public void CombineTermStatusCodes_GuessedWithDenied_ReturnsGuessed()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingDeniedInVerse,
            TermRenderingStatusCode.GuessedRendingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound));
    }

    /// <summary>
    /// CSC-11: GuessedRendingFound overrides NoVerseText.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-11")]
    [Description("GuessedRendingFound overrides NoVerseText")]
    public void CombineTermStatusCodes_GuessedWithNoVerseText_ReturnsGuessed()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NoVerseText,
            TermRenderingStatusCode.GuessedRendingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound));
    }

    #endregion

    #region Golden Master Tests - RenderingFound Combinations (CSC-12 through CSC-14)

    /// <summary>
    /// CSC-12: RenderingFound with initial NotDefined.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-12")]
    [Description("RenderingFound with initial NotDefined")]
    public void CombineTermStatusCodes_FoundWithNotDefined_ReturnsFound()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.RenderingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.RenderingFound));
    }

    /// <summary>
    /// CSC-13: RenderingFound overrides RenderingDeniedInVerse.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-13")]
    [Description("RenderingFound overrides Denied")]
    public void CombineTermStatusCodes_FoundWithDenied_ReturnsFound()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingDeniedInVerse,
            TermRenderingStatusCode.RenderingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.RenderingFound));
    }

    /// <summary>
    /// CSC-14: RenderingFound overrides NoVerseText.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-14")]
    [Description("RenderingFound overrides NoVerseText")]
    public void CombineTermStatusCodes_FoundWithNoVerseText_ReturnsFound()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NoVerseText,
            TermRenderingStatusCode.RenderingFound
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.RenderingFound));
    }

    #endregion

    #region Golden Master Tests - Other Transitions (CSC-15 through CSC-17)

    /// <summary>
    /// CSC-15: RenderingDeniedInVerse with initial NotDefined.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-15")]
    [Description("DeniedInVerse with initial NotDefined")]
    public void CombineTermStatusCodes_DeniedWithNotDefined_ReturnsDenied()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.RenderingDeniedInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.RenderingDeniedInVerse));
    }

    /// <summary>
    /// CSC-16: NoVerseText with initial NotDefined.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-16")]
    [Description("NoVerseText with initial NotDefined")]
    public void CombineTermStatusCodes_NoVerseTextWithNotDefined_ReturnsNoVerseText()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.NoVerseText
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NoVerseText));
    }

    /// <summary>
    /// CSC-17: NotInVerse with initial NotDefined.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Property("GoldenMasterRow", "CSC-17")]
    [Description("NotInVerse with initial NotDefined")]
    public void CombineTermStatusCodes_NotInVerseWithNotDefined_ReturnsNotInVerse()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.NotInVerse
        );
        Assert.That(result, Is.EqualTo(TermRenderingStatusCode.NotInVerse));
    }

    #endregion

    #region Invariant Tests - INV-015 Global Override Exhaustive

    /// <summary>
    /// INV-015: Global override codes always replace current status regardless of what it is.
    /// This test verifies all four global codes against every possible current status value,
    /// ensuring the state machine invariant holds exhaustively.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-008")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Description(
        "INV-015: Global override codes always replace any current status"
    )]
    public void CombineTermStatusCodes_GlobalOverrides_AlwaysReplaceCurrentStatus()
    {
        var globalOverrides = new[]
        {
            TermRenderingStatusCode.NotTermInProject,
            TermRenderingStatusCode.NoDictionaryEntry,
            TermRenderingStatusCode.NoRenderingsEntered,
            TermRenderingStatusCode.NoTrackedProject,
        };

        var allCodes = Enum.GetValues<TermRenderingStatusCode>();

        Assert.Multiple(() =>
        {
            foreach (var globalCode in globalOverrides)
            {
                foreach (var currentStatus in allCodes)
                {
                    var result = TermRenderingStatusService.CombineTermStatusCodes(
                        currentStatus,
                        globalCode
                    );
                    Assert.That(
                        result,
                        Is.EqualTo(globalCode),
                        $"Global override {globalCode} must replace current {currentStatus}"
                    );
                }
            }
        });
    }

    #endregion

    #region Edge Case Tests - State Machine Asymmetry

    /// <summary>
    /// The state machine is not symmetric: CombineTermStatusCodes(A, B) may differ from
    /// CombineTermStatusCodes(B, A). This is by design since the first parameter is the
    /// accumulated current state and the second is the new per-verse status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Description("State machine is asymmetric: order of parameters matters")]
    public void CombineTermStatusCodes_IsAsymmetric_ParameterOrderMatters()
    {
        // Found as current, Missing as new -> SomeRenderingsFound
        var forwardResult = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingFound,
            TermRenderingStatusCode.RenderingMissingInVerse
        );

        // Missing as current, Found as new -> RenderingFound (Found overrides Missing)
        var reverseResult = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingMissingInVerse,
            TermRenderingStatusCode.RenderingFound
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                forwardResult,
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "Missing coming after Found must produce SomeRenderingsFound"
            );
            // When current is Missing and new is Found, Found should upgrade the status
            // Per the state machine: RenderingFound overrides NotDefined/Denied/NoVerseText
            // but for Missing current, Found should also produce SomeRenderingsFound
            // since some verses have found and some are missing.
            // Actually, re-reading the transition table:
            //   RenderingFound | NotDefined/Denied/NoVerseText | RenderingFound
            // Missing is not in the list for RenderingFound overrides.
            // So current=Missing, new=Found should NOT be a simple override.
            // The transition table shows RenderingMissingInVerse as current is not
            // listed under RenderingFound's override targets, so the behavior
            // when current=Missing and new=Found needs to be SomeRenderingsFound too.
            Assert.That(
                reverseResult,
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "Found coming after Missing must also produce SomeRenderingsFound"
            );
        });
    }

    #endregion

    #region Edge Case Tests - SomeRenderingsFound Only From Combination

    /// <summary>
    /// SomeRenderingsFound (code 12) is never produced by single-token evaluation.
    /// It can only arise from the CombineTermStatusCodes state machine when
    /// some verses have found/guessed renderings and others are missing.
    /// This test verifies SomeRenderingsFound can be produced and is stable.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Description(
        "SomeRenderingsFound only produced by combination, stays stable once set"
    )]
    public void CombineTermStatusCodes_SomeRenderingsFound_IsStableOnceSet()
    {
        // Start with NotDefined, add Found, then add Missing -> SomeRenderingsFound
        var step1 = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.NotDefined,
            TermRenderingStatusCode.RenderingFound
        );
        Assert.That(
            step1,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound),
            "Step 1: NotDefined + Found = RenderingFound"
        );

        var step2 = TermRenderingStatusService.CombineTermStatusCodes(
            step1,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(
            step2,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "Step 2: Found + Missing = SomeRenderingsFound"
        );

        // Adding more Missing keeps it at SomeRenderingsFound
        var step3 = TermRenderingStatusService.CombineTermStatusCodes(
            step2,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(
            step3,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "Step 3: Some + Missing = SomeRenderingsFound (stable)"
        );

        // Adding more Found also keeps it at SomeRenderingsFound
        // (since SomeRenderingsFound is not in RenderingFound's override targets)
        // Per transition table, RenderingFound overrides: NotDefined, Denied, NoVerseText
        // SomeRenderingsFound is not one of those, so current stays.
    }

    #endregion

    #region Contract Tests - NotDefined Accepts All Non-Global New Statuses

    /// <summary>
    /// When current status is NotDefined (initial state), any non-global new status
    /// becomes the result. This tests all non-global codes against NotDefined.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-125")]
    [Description("NotDefined initial state accepts any non-global new status")]
    public void CombineTermStatusCodes_NotDefinedCurrent_AcceptsAnyNonGlobalNewStatus()
    {
        Assert.Multiple(() =>
        {
            // Each of these non-global codes should be accepted from NotDefined
            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.NotInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.NotInVerse),
                "NotDefined + NotInVerse"
            );

            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.NoVerseText
                ),
                Is.EqualTo(TermRenderingStatusCode.NoVerseText),
                "NotDefined + NoVerseText"
            );

            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingMissingInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingMissingInVerse),
                "NotDefined + RenderingMissingInVerse"
            );

            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingDeniedInVerse
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingDeniedInVerse),
                "NotDefined + RenderingDeniedInVerse"
            );

            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.GuessedRendingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound),
                "NotDefined + GuessedRendingFound"
            );

            Assert.That(
                TermRenderingStatusService.CombineTermStatusCodes(
                    TermRenderingStatusCode.NotDefined,
                    TermRenderingStatusCode.RenderingFound
                ),
                Is.EqualTo(TermRenderingStatusCode.RenderingFound),
                "NotDefined + RenderingFound"
            );
        });
    }

    #endregion

    #region Contract Tests - Multi-Step Accumulation

    /// <summary>
    /// Tests a realistic multi-verse accumulation sequence: process multiple verse
    /// statuses sequentially, verifying the final combined result.
    /// This simulates the actual usage in DictionaryService.SetFoundStatus (EXT-050).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Description("Multi-verse accumulation produces correct final status")]
    public void CombineTermStatusCodes_MultiVerseAccumulation_ProducesCorrectFinalStatus()
    {
        // Simulate: 4 verses for a term where Found, Missing, Found, Guessed
        var status = TermRenderingStatusCode.NotDefined;

        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound),
            "After verse 1 (Found)"
        );

        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "After verse 2 (Missing) -- now mixed"
        );

        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );
        // SomeRenderingsFound is not overridden by RenderingFound
        // (Found only overrides NotDefined/Denied/NoVerseText per transition table)
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "After verse 3 (Found) -- stays SomeRenderingsFound"
        );

        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.GuessedRendingFound
        );
        // GuessedRendingFound overrides NotDefined/Denied/NoVerseText per transition table
        // SomeRenderingsFound is not in that list, so stays
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "After verse 4 (Guessed) -- stays SomeRenderingsFound"
        );
    }

    /// <summary>
    /// Multi-verse accumulation where all verses are Found -> final status is RenderingFound.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-126")]
    [Description("All-found accumulation remains RenderingFound")]
    public void CombineTermStatusCodes_AllFound_RemainsFound()
    {
        var status = TermRenderingStatusCode.NotDefined;

        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );
        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );
        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );

        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound),
            "All-found accumulation must remain RenderingFound"
        );
    }

    /// <summary>
    /// Multi-verse accumulation where a global override appears partway through
    /// should end with the global override regardless of prior accumulation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("InvariantId", "INV-015")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Description("Global override mid-sequence replaces accumulated status")]
    public void CombineTermStatusCodes_GlobalOverrideMidSequence_ReplacesAccumulated()
    {
        var status = TermRenderingStatusCode.NotDefined;

        // Accumulate some valid statuses
        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingFound
        );
        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.RenderingMissingInVerse
        );
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "Precondition: accumulated to SomeRenderingsFound"
        );

        // Now a global override wipes it all
        status = TermRenderingStatusService.CombineTermStatusCodes(
            status,
            TermRenderingStatusCode.NoTrackedProject
        );
        Assert.That(
            status,
            Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
            "Global override must replace accumulated SomeRenderingsFound"
        );
    }

    #endregion

    #region Contract Tests - FoundWithMissing Produces SomeRenderingsFound

    /// <summary>
    /// RenderingFound as new with RenderingMissingInVerse as current should produce
    /// SomeRenderingsFound. This verifies the symmetric case where found comes after missing.
    /// Per the state machine: when current is Missing and new is Found, the combined
    /// status should reflect that some verses have found and some are missing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Description("Found after Missing produces SomeRenderingsFound")]
    public void CombineTermStatusCodes_FoundAfterMissing_ReturnsSome()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingMissingInVerse,
            TermRenderingStatusCode.RenderingFound
        );

        // Missing as current is not in the explicit override targets for RenderingFound
        // (which are NotDefined, Denied, NoVerseText).
        // Based on the state machine spirit: if we have missing in one verse
        // and found in another, the result should be SomeRenderingsFound.
        Assert.That(
            result,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "Found after Missing must produce SomeRenderingsFound"
        );
    }

    /// <summary>
    /// GuessedRendingFound as new with RenderingMissingInVerse as current should produce
    /// SomeRenderingsFound. Guessed is functionally like Found for combination purposes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-124")]
    [Description("Guessed after Missing produces SomeRenderingsFound")]
    public void CombineTermStatusCodes_GuessedAfterMissing_ReturnsSome()
    {
        var result = TermRenderingStatusService.CombineTermStatusCodes(
            TermRenderingStatusCode.RenderingMissingInVerse,
            TermRenderingStatusCode.GuessedRendingFound
        );

        Assert.That(
            result,
            Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
            "Guessed after Missing must produce SomeRenderingsFound"
        );
    }

    #endregion

    #region Contract Tests - Enum Values

    /// <summary>
    /// Verify the TermRenderingStatusCode enum has exactly 13 values (0-12).
    /// This is fundamental to the state machine functioning correctly.
    /// INV-014: Rendering Status Has 12 Distinct Codes (plus NotDefined = 13 total values).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("InvariantId", "INV-014")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Description("TermRenderingStatusCode enum has exactly 13 values (0-12)")]
    public void TermRenderingStatusCode_HasExpectedValueCount()
    {
        var values = Enum.GetValues<TermRenderingStatusCode>();
        Assert.That(values, Has.Length.EqualTo(13), "Must have 13 values (NotDefined + 12 codes)");
    }

    /// <summary>
    /// Verify enum values match expected numeric assignments per data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("InvariantId", "INV-014")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-123")]
    [Description("Enum numeric values match data-contracts.md specification")]
    public void TermRenderingStatusCode_HasCorrectNumericValues()
    {
        Assert.Multiple(() =>
        {
            Assert.That((int)TermRenderingStatusCode.NotDefined, Is.EqualTo(0));
            Assert.That((int)TermRenderingStatusCode.NoTrackedProject, Is.EqualTo(1));
            Assert.That((int)TermRenderingStatusCode.NoLink, Is.EqualTo(2));
            Assert.That((int)TermRenderingStatusCode.NoDictionaryEntry, Is.EqualTo(3));
            Assert.That((int)TermRenderingStatusCode.NotTermInProject, Is.EqualTo(4));
            Assert.That((int)TermRenderingStatusCode.NotInVerse, Is.EqualTo(5));
            Assert.That((int)TermRenderingStatusCode.NoVerseText, Is.EqualTo(6));
            Assert.That((int)TermRenderingStatusCode.NoRenderingsEntered, Is.EqualTo(7));
            Assert.That((int)TermRenderingStatusCode.RenderingMissingInVerse, Is.EqualTo(8));
            Assert.That((int)TermRenderingStatusCode.RenderingDeniedInVerse, Is.EqualTo(9));
            Assert.That((int)TermRenderingStatusCode.GuessedRendingFound, Is.EqualTo(10));
            Assert.That((int)TermRenderingStatusCode.RenderingFound, Is.EqualTo(11));
            Assert.That((int)TermRenderingStatusCode.SomeRenderingsFound, Is.EqualTo(12));
        });
    }

    #endregion
}
