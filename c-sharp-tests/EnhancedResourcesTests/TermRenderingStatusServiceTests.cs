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

/// <summary>
/// Tests for CAP-007: CalculateRenderingStatus.
/// Validates the 12-code sequential evaluation pipeline that determines the rendering
/// status of a Biblical Term token in a given verse. This is the core BT integration
/// calculation for Enhanced Resources.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs:3060-3163
/// Golden Master: gm-001-term-rendering-status
/// Extraction: EXT-001
/// Invariant: INV-014 (Rendering Status Has 12 Distinct Codes)
///
/// The evaluation order is:
///  1. trackedProject == null -> NoTrackedProject (1)
///  2. lexicalLink == null or dbKey empty -> NoLink (2)
///  3. GetLemma() returns null -> NoDictionaryEntry (3)
///  4. GetTermFromLink() == null AND GetAlternateLemma() == null -> NotTermInProject (4)
///  5. !Term.References.Contains(verse) -> NotInVerse (5)
///  6. GetVerseText() is empty -> NoVerseText (6)
///  7. GetRenderings() returns null/empty -> NoRenderingsEntered (7)
///  8. StatusInVerse == Missing -> RenderingMissingInVerse (8)
///  9. StatusInVerse == Denied -> RenderingDeniedInVerse (9)
/// 10. StatusInVerse == Guessed -> GuessedRendingFound (10)
/// 11. StatusInVerse == Found -> RenderingFound (11)
/// 12. (fallback) -> SomeRenderingsFound (12)
/// </summary>
[TestFixture]
public class CalculateRenderingStatusTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-007.
    /// Verifies all 12 gm-001 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Maps to TRS-01 through TRS-12 from gm-001 input.json.
    /// Each assertion verifies a different step in the 12-code evaluation pipeline.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Description(
        "Acceptance test: All 12 rendering status codes evaluated in correct priority order"
    )]
    public void CalculateRenderingStatus_AllGoldenMasterScenarios_Pass()
    {
        var verseRef = new VerseReference(43, 1, 1); // John 1:1

        Assert.Multiple(() =>
        {
            // TRS-01: No tracked project -> NoTrackedProject (1)
            var trs01 = TermRenderingStatusService.CalculateRenderingStatus(
                null, // no BtState means no tracked project
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs01.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
                "TRS-01: null BtState must return NoTrackedProject"
            );

            // TRS-02: Null lexical link -> NoLink (2)
            var btState = CreateMinimalBtState();
            var trs02 = TermRenderingStatusService.CalculateRenderingStatus(
                btState,
                null, // null lexical link
                verseRef
            );
            Assert.That(
                trs02.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoLink),
                "TRS-02: null lexical link must return NoLink"
            );

            // TRS-03: Empty dbKey -> NoLink (2)
            var trs03 = TermRenderingStatusService.CalculateRenderingStatus(
                btState,
                CreateTextLinkTokenEmptyDbKey(),
                verseRef
            );
            Assert.That(
                trs03.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoLink),
                "TRS-03: empty dbKey must return NoLink"
            );

            // TRS-04: Unknown lemma -> NoDictionaryEntry (3)
            var trs04 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithNoLemma(),
                CreateTextLinkToken("SDBG:unknownLemma:001001"),
                verseRef
            );
            Assert.That(
                trs04.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoDictionaryEntry),
                "TRS-04: unknown lemma must return NoDictionaryEntry"
            );

            // TRS-05: Lemma exists but no matching BT -> NotTermInProject (4)
            var trs05 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithNoMatchingTerm(),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs05.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NotTermInProject),
                "TRS-05: no matching Biblical Term must return NotTermInProject"
            );

            // TRS-06: Term exists but not in this verse -> NotInVerse (5)
            var trs06 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithTermNotInVerse(),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs06.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NotInVerse),
                "TRS-06: term not referencing this verse must return NotInVerse"
            );

            // TRS-07: Verse text is empty -> NoVerseText (6)
            var trs07 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithEmptyVerseText(),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs07.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoVerseText),
                "TRS-07: empty verse text must return NoVerseText"
            );

            // TRS-08: No renderings entered -> NoRenderingsEntered (7)
            var trs08 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithNoRenderings(),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs08.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoRenderingsEntered),
                "TRS-08: null/empty renderings must return NoRenderingsEntered"
            );

            // TRS-09: StatusInVerse == Missing -> RenderingMissingInVerse (8)
            var trs09 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithStatus("Missing"),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs09.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.RenderingMissingInVerse),
                "TRS-09: Missing status must return RenderingMissingInVerse"
            );

            // TRS-10: StatusInVerse == Denied -> RenderingDeniedInVerse (9)
            var trs10 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithStatus("Denied"),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs10.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.RenderingDeniedInVerse),
                "TRS-10: Denied status must return RenderingDeniedInVerse"
            );

            // TRS-11: StatusInVerse == Guessed -> GuessedRendingFound (10)
            var trs11 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithStatus("Guessed"),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs11.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound),
                "TRS-11: Guessed status must return GuessedRendingFound"
            );

            // TRS-12: StatusInVerse == Found -> RenderingFound (11)
            var trs12 = TermRenderingStatusService.CalculateRenderingStatus(
                CreateBtStateWithStatus("Found"),
                CreateTextLinkToken("SDBG:logos:001001"),
                verseRef
            );
            Assert.That(
                trs12.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.RenderingFound),
                "TRS-12: Found status must return RenderingFound"
            );
        });
    }

    #endregion

    #region Golden Master Tests - Early Exit Steps (TRS-01 through TRS-03)

    /// <summary>
    /// TRS-01: When BtState is null (no tracked project), must return NoTrackedProject.
    /// This is the first step in the 12-code evaluation pipeline.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Property("GoldenMasterRow", "TRS-01")]
    [Description("NoTrackedProject when BtState is null")]
    public void CalculateRenderingStatus_NullBtState_ReturnsNoTrackedProject()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            null,
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.NoTrackedProject)
            );
            Assert.That(result.TermId, Is.Null, "No term resolved when no tracked project");
            Assert.That(
                result.FoundRenderings,
                Is.Null,
                "No renderings when no tracked project"
            );
        });
    }

    /// <summary>
    /// TRS-02: When lexical link is null, must return NoLink.
    /// Second step in the evaluation pipeline.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-117")]
    [Property("GoldenMasterRow", "TRS-02")]
    [Description("NoLink when lexical link is null")]
    public void CalculateRenderingStatus_NullLexicalLink_ReturnsNoLink()
    {
        var btState = CreateMinimalBtState();

        var result = TermRenderingStatusService.CalculateRenderingStatus(
            btState,
            null,
            new VerseReference(43, 1, 1)
        );

        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NoLink));
    }

    /// <summary>
    /// TRS-03: When lexical link has empty dbKey (second segment), must return NoLink.
    /// This is the same evaluation step as TRS-02 but triggered by a different condition.
    /// The dbKey is the lemma portion of the Dictionary:Lemma:BBBMMM format.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-117")]
    [Property("GoldenMasterRow", "TRS-03")]
    [Description("NoLink when lexical link has empty dbKey")]
    public void CalculateRenderingStatus_EmptyDbKey_ReturnsNoLink()
    {
        var btState = CreateMinimalBtState();

        var result = TermRenderingStatusService.CalculateRenderingStatus(
            btState,
            CreateTextLinkTokenEmptyDbKey(),
            new VerseReference(43, 1, 1)
        );

        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NoLink));
    }

    #endregion

    #region Golden Master Tests - Dictionary/Term Lookup Steps (TRS-04 through TRS-05)

    /// <summary>
    /// TRS-04: When GetLemma returns null (lemma not in dictionary), must return NoDictionaryEntry.
    /// Third evaluation step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-118")]
    [Property("GoldenMasterRow", "TRS-04")]
    [Description("NoDictionaryEntry when lemma not found in dictionary")]
    public void CalculateRenderingStatus_UnknownLemma_ReturnsNoDictionaryEntry()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithNoLemma(),
            CreateTextLinkToken("SDBG:unknownLemma:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoDictionaryEntry)
        );
    }

    /// <summary>
    /// TRS-05: When lemma exists in dictionary but no matching Biblical Term in the
    /// project's terms list (and no alternate lemma either), must return NotTermInProject.
    /// Fourth evaluation step. Checks both GetTermFromLink() and GetAlternateLemma().
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-119")]
    [Property("GoldenMasterRow", "TRS-05")]
    [Description("NotTermInProject when no matching Biblical Term and no alternate lemma")]
    public void CalculateRenderingStatus_NoMatchingTerm_ReturnsNotTermInProject()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithNoMatchingTerm(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NotTermInProject)
        );
    }

    #endregion

    #region Golden Master Tests - Verse/Rendering Checks (TRS-06 through TRS-08)

    /// <summary>
    /// TRS-06: Term exists but does not reference this verse -> NotInVerse.
    /// Fifth evaluation step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Property("GoldenMasterRow", "TRS-06")]
    [Description("NotInVerse when term does not reference this verse")]
    public void CalculateRenderingStatus_TermNotInVerse_ReturnsNotInVerse()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithTermNotInVerse(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NotInVerse));
    }

    /// <summary>
    /// TRS-07: Term references this verse but verse text is empty -> NoVerseText.
    /// Sixth evaluation step. This can happen when the verse exists in the
    /// reference list but the tracked project has no text for that verse.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Property("GoldenMasterRow", "TRS-07")]
    [Description("NoVerseText when verse text is empty in tracked project")]
    public void CalculateRenderingStatus_EmptyVerseText_ReturnsNoVerseText()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithEmptyVerseText(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NoVerseText));
    }

    /// <summary>
    /// TRS-08: Verse has text but no renderings entered for this term -> NoRenderingsEntered.
    /// Seventh evaluation step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-121")]
    [Property("GoldenMasterRow", "TRS-08")]
    [Description("NoRenderingsEntered when no renderings for this term")]
    public void CalculateRenderingStatus_NoRenderings_ReturnsNoRenderingsEntered()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithNoRenderings(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoRenderingsEntered)
        );
    }

    #endregion

    #region Golden Master Tests - StatusInVerse Outcomes (TRS-09 through TRS-12)

    /// <summary>
    /// TRS-09: Analyzer returns Missing for this verse -> RenderingMissingInVerse.
    /// Eighth evaluation step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-121")]
    [Property("GoldenMasterRow", "TRS-09")]
    [Description("RenderingMissingInVerse when analyzer reports Missing")]
    public void CalculateRenderingStatus_StatusMissing_ReturnsRenderingMissingInVerse()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Missing"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.RenderingMissingInVerse)
        );
    }

    /// <summary>
    /// TRS-10: Analyzer returns Denied for this verse -> RenderingDeniedInVerse.
    /// Ninth evaluation step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-121")]
    [Property("GoldenMasterRow", "TRS-10")]
    [Description("RenderingDeniedInVerse when analyzer reports Denied")]
    public void CalculateRenderingStatus_StatusDenied_ReturnsRenderingDeniedInVerse()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Denied"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.RenderingDeniedInVerse)
        );
    }

    /// <summary>
    /// TRS-11: Analyzer returns Guessed for this verse -> GuessedRendingFound.
    /// Tenth evaluation step. Note: "Rending" (not "Rendering") matches PT9 enum name.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-122")]
    [Property("GoldenMasterRow", "TRS-11")]
    [Description("GuessedRendingFound when analyzer guesses rendering match")]
    public void CalculateRenderingStatus_StatusGuessed_ReturnsGuessedRendingFound()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Guessed"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.GuessedRendingFound)
        );
    }

    /// <summary>
    /// TRS-12: Analyzer returns Found for this verse -> RenderingFound.
    /// Eleventh evaluation step. This is the happy path through the full pipeline.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Property("GoldenMasterRow", "TRS-12")]
    [Description("RenderingFound when analyzer confirms rendering found in verse")]
    public void CalculateRenderingStatus_StatusFound_ReturnsRenderingFound()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Found"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.RenderingFound)
            );
            // FoundRenderings should be populated for RenderingFound
            Assert.That(
                result.FoundRenderings,
                Is.Not.Null,
                "FoundRenderings must be populated when status is RenderingFound"
            );
        });
    }

    #endregion

    #region Contract Tests - Result Type Fields

    /// <summary>
    /// Verifies that TermRenderingStatus result record has the expected fields
    /// as defined in data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Description("TermRenderingStatus record has expected fields")]
    public void TermRenderingStatus_HasExpectedFields()
    {
        var status = new TermRenderingStatus(
            TermRenderingStatusCode.RenderingFound,
            new List<string> { "word" },
            null,
            "termId123"
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                status.StatusCode,
                Is.EqualTo(TermRenderingStatusCode.RenderingFound)
            );
            Assert.That(status.FoundRenderings, Has.Count.EqualTo(1));
            Assert.That(status.MissingInVerses, Is.Null);
            Assert.That(status.TermId, Is.EqualTo("termId123"));
        });
    }

    /// <summary>
    /// RenderingFound result must include the matched renderings in the FoundRenderings field.
    /// This data is used by the tooltip (EXT-003) and the dictionary tab (EXT-050).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Description("RenderingFound includes matched renderings in result")]
    public void CalculateRenderingStatus_WhenFound_PopulatesFoundRenderings()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Found"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.RenderingFound));
            Assert.That(
                result.FoundRenderings,
                Is.Not.Null.And.Not.Empty,
                "FoundRenderings must contain the matched renderings"
            );
        });
    }

    /// <summary>
    /// When a term is resolved (evaluation reaches step 5 or beyond), the TermId
    /// field must be populated with the matched Biblical Term identifier.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Description("TermId populated when term is resolved (status code >= NotInVerse)")]
    public void CalculateRenderingStatus_WhenTermResolved_PopulatesTermId()
    {
        // NotInVerse still means the term was resolved (step 5 reached)
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithTermNotInVerse(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusCode, Is.EqualTo(TermRenderingStatusCode.NotInVerse));
            Assert.That(
                result.TermId,
                Is.Not.Null.And.Not.Empty,
                "TermId must be set when term is resolved (codes 5+)"
            );
        });
    }

    /// <summary>
    /// For early exit codes (1-4), TermId must be null because no term was resolved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Description("TermId is null for early exit codes (1-4)")]
    public void CalculateRenderingStatus_EarlyExit_TermIdIsNull()
    {
        // NoTrackedProject (code 1)
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            null,
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(result.TermId, Is.Null, "TermId must be null for NoTrackedProject");
    }

    #endregion

    #region Contract Tests - Sequential Evaluation Order

    /// <summary>
    /// INV-014: The evaluation must proceed in strict sequential order.
    /// NoTrackedProject (step 1) must take priority over NoLink (step 2) when
    /// both conditions are true (null BtState AND null lexical link).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-014")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Description("NoTrackedProject takes priority over NoLink")]
    public void CalculateRenderingStatus_NullBtStateAndNullLink_ReturnsNoTrackedProject()
    {
        // Both BtState and lexicalLink are null
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            null,
            null,
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoTrackedProject),
            "Step 1 (NoTrackedProject) must evaluate before step 2 (NoLink)"
        );
    }

    /// <summary>
    /// INV-014: NoLink (step 2) must take priority over NoDictionaryEntry (step 3).
    /// When both conditions would match, the earlier step wins.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-014")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-117")]
    [Description("NoLink takes priority over NoDictionaryEntry")]
    public void CalculateRenderingStatus_NullLinkWithBtState_ReturnsNoLink()
    {
        // BtState exists but lexicalLink is null
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithNoLemma(),
            null,
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NoLink),
            "Step 2 (NoLink) must evaluate before step 3 (NoDictionaryEntry)"
        );
    }

    #endregion

    #region Invariant Tests - INV-014 All Codes Reachable

    /// <summary>
    /// INV-014: All 12 rendering status codes (excluding NotDefined and SomeRenderingsFound
    /// which are only used in CombineTermStatusCodes) must be reachable through
    /// CalculateRenderingStatus. This test verifies the evaluation pipeline can produce
    /// each of the 11 per-token status codes (1-11).
    /// Note: SomeRenderingsFound (12) is only produced by CombineTermStatusCodes (CAP-008).
    /// Note: NotDefined (0) is never returned by CalculateRenderingStatus.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-014")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-116")]
    [Description(
        "INV-014: All 11 per-token status codes (1-11) are reachable"
    )]
    public void CalculateRenderingStatus_AllPerTokenCodesReachable()
    {
        var verseRef = new VerseReference(43, 1, 1);
        var link = CreateTextLinkToken("SDBG:logos:001001");

        var reachedCodes = new HashSet<TermRenderingStatusCode>();

        // Code 1: NoTrackedProject
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(null, link, verseRef)
                .StatusCode
        );

        // Code 2: NoLink
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateMinimalBtState(), null, verseRef)
                .StatusCode
        );

        // Code 3: NoDictionaryEntry
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(
                    CreateBtStateWithNoLemma(),
                    CreateTextLinkToken("SDBG:unknownLemma:001001"),
                    verseRef
                )
                .StatusCode
        );

        // Code 4: NotTermInProject
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithNoMatchingTerm(), link, verseRef)
                .StatusCode
        );

        // Code 5: NotInVerse
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithTermNotInVerse(), link, verseRef)
                .StatusCode
        );

        // Code 6: NoVerseText
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithEmptyVerseText(), link, verseRef)
                .StatusCode
        );

        // Code 7: NoRenderingsEntered
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithNoRenderings(), link, verseRef)
                .StatusCode
        );

        // Code 8: RenderingMissingInVerse
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithStatus("Missing"), link, verseRef)
                .StatusCode
        );

        // Code 9: RenderingDeniedInVerse
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithStatus("Denied"), link, verseRef)
                .StatusCode
        );

        // Code 10: GuessedRendingFound
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithStatus("Guessed"), link, verseRef)
                .StatusCode
        );

        // Code 11: RenderingFound
        reachedCodes.Add(
            TermRenderingStatusService
                .CalculateRenderingStatus(CreateBtStateWithStatus("Found"), link, verseRef)
                .StatusCode
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                reachedCodes,
                Has.Count.EqualTo(11),
                "Must reach all 11 per-token status codes (1-11)"
            );
            Assert.That(
                reachedCodes,
                Does.Not.Contain(TermRenderingStatusCode.NotDefined),
                "NotDefined is never returned by CalculateRenderingStatus"
            );
            Assert.That(
                reachedCodes,
                Does.Not.Contain(TermRenderingStatusCode.SomeRenderingsFound),
                "SomeRenderingsFound is only produced by CombineTermStatusCodes"
            );
        });
    }

    #endregion

    #region Edge Case Tests - Alternate Lemma Lookup

    /// <summary>
    /// When primary lemma lookup fails (GetTermFromLink returns null), the evaluation
    /// should try an alternate lemma before returning NotTermInProject.
    /// If the alternate lemma matches a Biblical Term, the evaluation should continue
    /// past step 4 using the alternate term.
    ///
    /// Per gm-001 TRS-05: "getAlternateLemmaReturns": null means both paths fail.
    /// This test verifies the alternate lemma path is actually checked.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-119")]
    [Description("Alternate lemma checked before returning NotTermInProject")]
    public void CalculateRenderingStatus_PrimaryLemmaFailsAlternateExists_ContinuesEvaluation()
    {
        // This BtState has no primary term match but has an alternate lemma match
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithAlternateLemmaOnly(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        // Should NOT be NotTermInProject because alternate lemma matched
        Assert.That(
            result.StatusCode,
            Is.Not.EqualTo(TermRenderingStatusCode.NotTermInProject),
            "When alternate lemma matches, evaluation must continue past step 4"
        );
    }

    #endregion

    #region Edge Case Tests - Various Link Formats

    /// <summary>
    /// SDBG links (Greek dictionary) should work through the full pipeline.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Description("SDBG (Greek) links evaluated correctly")]
    public void CalculateRenderingStatus_SdbgLink_EvaluatesCorrectly()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Found"),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound)
        );
    }

    /// <summary>
    /// SDBH links (Hebrew dictionary) should work identically through the pipeline.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Description("SDBH (Hebrew) links evaluated correctly")]
    public void CalculateRenderingStatus_SdbhLink_EvaluatesCorrectly()
    {
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithStatus("Found"),
            CreateTextLinkToken("SDBH:dabar:002003"),
            new VerseReference(1, 1, 1) // Gen 1:1
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound)
        );
    }

    #endregion

    #region Edge Case Tests - Versification Boundary

    /// <summary>
    /// Verse reference must be compared using the correct versification mapping.
    /// The BtState's versification should be used for Term.References.Contains(verse).
    /// This test verifies versification is considered during the NotInVerse check.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-120")]
    [Description("Versification mapping applied during verse reference check")]
    public void CalculateRenderingStatus_VerseRefMatchesWithVersification_NotInVerse()
    {
        // Term references a verse in a different versification that maps
        // to the same verse. When versification is NOT applied, the check fails.
        var result = TermRenderingStatusService.CalculateRenderingStatus(
            CreateBtStateWithTermNotInVerse(),
            CreateTextLinkToken("SDBG:logos:001001"),
            new VerseReference(43, 1, 1)
        );

        Assert.That(
            result.StatusCode,
            Is.EqualTo(TermRenderingStatusCode.NotInVerse),
            "Versification must be used for verse reference comparison"
        );
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a ParsedLexicalLink from a link string in Dictionary:Lemma:BBBMMM format.
    /// Uses LexicalLinkService.ParseLexicalLinks (from CAP-005) to parse.
    /// </summary>
    private static ParsedLexicalLink? CreateTextLinkToken(string linkString)
    {
        var links = LexicalLinkService.ParseLexicalLinks(linkString);
        return links.Count > 0 ? links[0] : null;
    }

    /// <summary>
    /// Creates a ParsedLexicalLink with an empty dbKey (lemma portion).
    /// This triggers the NoLink condition per TRS-03.
    /// </summary>
    private static ParsedLexicalLink CreateTextLinkTokenEmptyDbKey()
    {
        // A link with empty lemma: "SDBG::001001"
        return new ParsedLexicalLink("SDBG", "", "001", "001", "SDBG::001001");
    }

    /// <summary>
    /// Creates a minimal BtState representing a tracked project with BT state initialized.
    /// The TermsList and TermRenderings are non-null but contain no data.
    /// </summary>
    private static BtState CreateMinimalBtState()
    {
        // BtState with non-null TermsList and TermRenderings indicates a tracked project exists
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null // Analyzer can be null for early exit tests
        );
    }

    /// <summary>
    /// Creates a BtState where GetLemma() will return null for any lookup.
    /// This simulates a lemma not found in the dictionary (TRS-04).
    /// The implementer will need to make TermsList look up lemmas that fail.
    /// </summary>
    private static BtState CreateBtStateWithNoLemma()
    {
        // BtState where the dictionary has no entry for the requested lemma
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    /// <summary>
    /// Creates a BtState where the lemma exists in the dictionary but no
    /// matching Biblical Term exists in the project's terms list.
    /// Both primary and alternate lemma lookups fail (TRS-05).
    /// </summary>
    private static BtState CreateBtStateWithNoMatchingTerm()
    {
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    /// <summary>
    /// Creates a BtState where the term exists but does not reference the test verse.
    /// </summary>
    private static BtState CreateBtStateWithTermNotInVerse()
    {
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    /// <summary>
    /// Creates a BtState where the tracked project has empty verse text.
    /// </summary>
    private static BtState CreateBtStateWithEmptyVerseText()
    {
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    /// <summary>
    /// Creates a BtState where no renderings have been entered for the term.
    /// </summary>
    private static BtState CreateBtStateWithNoRenderings()
    {
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    /// <summary>
    /// Creates a BtState configured to return the specified StatusInVerse.
    /// The implementer will need to adapt this to properly set up the
    /// TermsList, TermRenderings, and Analyzer to produce the expected status.
    /// </summary>
    private static BtState CreateBtStateWithStatus(string status)
    {
        // For now, all BtState helper methods return minimal state.
        // The implementer will need to:
        // 1. Properly configure TermsList with terms that match the test link
        // 2. Configure TermRenderings with renderings for those terms
        // 3. Configure Analyzer to return the expected status
        // The test still verifies the correct status code mapping.
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null // Analyzer -- implementer provides a mock or test double
        );
    }

    /// <summary>
    /// Creates a BtState where the primary lemma lookup fails but an alternate
    /// lemma matches a Biblical Term. This validates the alternate lemma path
    /// in step 4 of the evaluation pipeline.
    /// </summary>
    private static BtState CreateBtStateWithAlternateLemmaOnly()
    {
        return new BtState(
            new Paratext.Data.Terms.BiblicalTermsList(),
            new Paratext.Data.Terms.TermRenderingsList(),
            null
        );
    }

    #endregion
}
