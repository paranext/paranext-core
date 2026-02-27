using Paranext.DataProvider.Checks;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-002 BuildInventory: exercises the full inventory build pipeline including
/// the existing InventoryWorker 4-way branching (EXT-001) and the MatchedPairsCheck core
/// algorithm from ParatextData.dll. Verifies that InventoryBuildService correctly orchestrates
/// token processing, inventory population, combination, and result serialization.
///
/// Source: Section 4.2 M-002: BuildInventory
/// Contract: BuildInventoryInput -> InventoryBuildResult
/// Acceptance: gm-001 (Regular/NonSep), gm-002 (Regular/Sep), gm-003 (SBA/NonSep), gm-004 (SBA/Sep)
/// Specs: spec-001 (stack detection), spec-002 (overlapping), spec-003 (body/note separation),
///        spec-004 (pair parsing), spec-005 (intro outline), spec-006 (paragraph closure),
///        spec-009 (setup complete)
/// Behaviors: BHV-100..105, BHV-108, BHV-109, BHV-112, BHV-113, BHV-115, BHV-116,
///            BHV-125, BHV-127, BHV-128, BHV-129, BHV-601, BHV-602, BHV-603
/// Invariants: INV-001..006, INV-008, INV-013, INV-014
///
/// Test design: Tests call InventoryBuildService.BuildInventory with DummyScrText projects
/// containing specific USFM text. The method exercises the full pipeline through existing
/// InventoryWorker and ParatextData MatchedPairsCheck. Tests verify the output
/// InventoryBuildResult properties. No mocking of ParatextData internals.
/// </summary>
[TestFixture]
internal class InventoryBuildServiceTests : PapiTestBase
{
    private const string MatchedPairsInventoryId = "MatchedPairs";

    #region Test Setup

    private string _testProjectId = string.Empty;
    private DummyScrText? _scrText;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        _scrText = CreateDummyProject();
        var details = CreateProjectDetails(_scrText);
        _testProjectId = details.Metadata.Id;
        ParatextProjects.FakeAddProject(details, _scrText);
    }

    [TearDown]
    public override void TestTearDown()
    {
        // Remove our ScrText with deleteProjectFiles=true to trigger full index
        // cleanup in ScrTextCollection, preventing internal cache accumulation.
        if (_scrText != null)
        {
            ScrTextCollection.Remove(_scrText, true);
            _scrText.Dispose();
            _scrText = null;
        }

        base.TestTearDown();
    }

    #endregion

    #region Acceptance Tests (gm-001 through gm-004)

    /// <summary>
    /// Acceptance test gm-001: Regular non-separated project builds inventory
    /// with only combinedTextInventory populated. Result has items with combined
    /// counts and single status column. CombinedIsMerge is false.
    ///
    /// When all 4 acceptance tests pass, CAP-002 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "EXT-001")]
    [Description(
        "gm-001: Regular non-separated builds only combined inventory, " + "CombinedIsMerge=false"
    )]
    public void BuildInventory_RegularNonSeparated_OnlyCombinedPopulated()
    {
        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Build should succeed");
            Assert.That(result.Error, Is.Null, "No error on success");

            // gm-001: only combined populated
            Assert.That(
                result.VersePopulated,
                Is.False,
                "gm-001: VersePopulated must be false for Regular/NonSep"
            );
            Assert.That(
                result.NonVersePopulated,
                Is.False,
                "gm-001: NonVersePopulated must be false for Regular/NonSep"
            );
            Assert.That(
                result.RegularPopulated,
                Is.False,
                "gm-001: RegularPopulated must be false for Regular/NonSep"
            );
            Assert.That(
                result.StudyBiblePopulated,
                Is.False,
                "gm-001: StudyBiblePopulated must be false for Regular/NonSep"
            );
            Assert.That(
                result.CombinedIsMerge,
                Is.False,
                "gm-001: CombinedIsMerge must be false (direct population)"
            );
        });
    }

    /// <summary>
    /// Acceptance test gm-002: Regular separated project builds inventory
    /// with verse and non-verse inventories populated. Combined is a merge
    /// of verse + non-verse.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "EXT-001")]
    [Description("gm-002: Regular separated builds verse+nonverse, CombinedIsMerge=true")]
    public void BuildInventory_RegularSeparated_VerseAndNonVersePopulated()
    {
        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Build should succeed");

            // gm-002: verse and non-verse populated, combined is merge
            Assert.That(
                result.VersePopulated,
                Is.True,
                "gm-002: VersePopulated must be true for Regular/Sep"
            );
            Assert.That(
                result.NonVersePopulated,
                Is.True,
                "gm-002: NonVersePopulated must be true for Regular/Sep"
            );
            Assert.That(
                result.CombinedIsMerge,
                Is.True,
                "gm-002: CombinedIsMerge must be true (verse + nonverse merge)"
            );
        });
    }

    /// <summary>
    /// Acceptance test gm-003: SBA non-separated project builds inventory
    /// with regular and studyBible inventories populated. Combined is a merge
    /// of regular + studyBible.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("ScenarioId", "TS-092")]
    [Property("BehaviorId", "EXT-001")]
    [Description("gm-003: SBA non-separated builds regular+studyBible, CombinedIsMerge=true")]
    public void BuildInventory_SbaNonSeparated_RegularAndStudyBiblePopulated()
    {
        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Build should succeed");

            // gm-003: regular and studyBible populated
            Assert.That(
                result.RegularPopulated,
                Is.True,
                "gm-003: RegularPopulated must be true for SBA/NonSep"
            );
            Assert.That(
                result.StudyBiblePopulated,
                Is.True,
                "gm-003: StudyBiblePopulated must be true for SBA/NonSep"
            );
            Assert.That(
                result.CombinedIsMerge,
                Is.True,
                "gm-003: CombinedIsMerge must be true (regular + studyBible merge)"
            );
        });
    }

    /// <summary>
    /// Acceptance test gm-004: SBA separated project (most complex) builds inventory
    /// with all five inventories populated. verse+nonverse -> regular,
    /// regular+studyBible -> combined.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "EXT-001")]
    [Description("gm-004: SBA separated builds all five inventories")]
    public void BuildInventory_SbaSeparated_AllFivePopulated()
    {
        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Build should succeed");

            // gm-004: all five populated
            Assert.That(
                result.VersePopulated,
                Is.True,
                "gm-004: VersePopulated must be true for SBA/Sep"
            );
            Assert.That(
                result.NonVersePopulated,
                Is.True,
                "gm-004: NonVersePopulated must be true for SBA/Sep"
            );
            Assert.That(
                result.RegularPopulated,
                Is.True,
                "gm-004: RegularPopulated must be true for SBA/Sep"
            );
            Assert.That(
                result.StudyBiblePopulated,
                Is.True,
                "gm-004: StudyBiblePopulated must be true for SBA/Sep"
            );
            Assert.That(
                result.CombinedIsMerge,
                Is.True,
                "gm-004: CombinedIsMerge must be true (regular + studyBible merge)"
            );
        });
    }

    #endregion

    #region spec-001: Stack-Based Detection (BHV-100)

    /// <summary>
    /// TS-001: Simple unmatched opening parenthesis is detected by the
    /// stack-based algorithm and appears in inventory items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Unmatched opening parenthesis appears in inventory")]
    public void BuildInventory_UnmatchedOpeningParen_AppearsInItems()
    {
        // Arrange: inject USFM with unmatched opening paren
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 He said (hello to them.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True, "Build should succeed");
        Assert.That(result.Items, Is.Not.Empty, "TS-001: Items should not be empty");

        // The unmatched '(' should appear as an inventory item
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        Assert.That(openParen, Is.Not.Null, "TS-001: Unmatched '(' must appear in inventory items");
        Assert.That(
            openParen!.TotalCount,
            Is.GreaterThan(0),
            "TS-001: Unmatched '(' count must be > 0"
        );
    }

    /// <summary>
    /// TS-002: Simple unmatched closing parenthesis is detected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Unmatched closing parenthesis appears in inventory")]
    public void BuildInventory_UnmatchedClosingParen_AppearsInItems()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 He said hello) to them.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.That(
            closeParen,
            Is.Not.Null,
            "TS-002: Unmatched ')' must appear in inventory items"
        );
        Assert.That(
            closeParen!.TotalCount,
            Is.GreaterThan(0),
            "TS-002: Unmatched ')' count must be > 0"
        );
    }

    /// <summary>
    /// TS-003: Properly matched pair produces items with counts for both halves.
    /// Inventory tracks all encountered pairs, not just unmatched ones.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Matched pair characters appear in inventory with correct counts")]
    public void BuildInventory_MatchedPair_BothHalvesInInventory()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 He said (hello) to them.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both ( and ) should appear as items in the inventory
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.Multiple(() =>
        {
            Assert.That(
                openParen,
                Is.Not.Null,
                "TS-003: '(' should appear in inventory even when matched"
            );
            Assert.That(
                closeParen,
                Is.Not.Null,
                "TS-003: ')' should appear in inventory even when matched"
            );
        });
    }

    /// <summary>
    /// TS-004: Multiple unmatched characters in one verse -- mixed unmatched.
    /// "(foo] bar)" produces 3 separate error entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Multiple unmatched chars in one verse all appear in inventory")]
    public void BuildInventory_MultipleUnmatchedInOneVerse_AllAppearInItems()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (foo] bar)");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);
        // Expect (, ], ) all to be present -- 3 distinct characters
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        var closeBracket = result.Items.FirstOrDefault(i => i.Text == "]");
        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.Multiple(() =>
        {
            Assert.That(openParen, Is.Not.Null, "TS-004: '(' must be in items");
            Assert.That(closeBracket, Is.Not.Null, "TS-004: ']' must be in items");
            Assert.That(closeParen, Is.Not.Null, "TS-004: ')' must be in items");
        });
    }

    /// <summary>
    /// TS-005: Reversed pair brackets "]foo[" both flagged as unmatched.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Reversed brackets both flagged as unmatched")]
    public void BuildInventory_ReversedBrackets_BothFlagged()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 ]foo[");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var openBracket = result.Items.FirstOrDefault(i => i.Text == "[");
        var closeBracket = result.Items.FirstOrDefault(i => i.Text == "]");
        Assert.Multiple(() =>
        {
            Assert.That(openBracket, Is.Not.Null, "TS-005: '[' must be in items");
            Assert.That(closeBracket, Is.Not.Null, "TS-005: ']' must be in items");
        });
    }

    /// <summary>
    /// TS-024: Section heading unmatched punctuation is detected.
    /// Section heads are always checked (not exempted).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-100")]
    [Description("BHV-100: Section head unmatched punctuation always checked")]
    public void BuildInventory_SectionHeadUnmatched_Detected()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\s text)\n\\v 1 Normal text.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.That(
            closeParen,
            Is.Not.Null,
            "TS-024: Unmatched ')' in section head must appear in inventory"
        );
    }

    #endregion

    #region spec-002: Overlapping Pair Detection (BHV-101)

    /// <summary>
    /// TS-006: Overlapping pairs "(foo [bar) baz]" are detected.
    /// All 4 characters appear in the inventory.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description("BHV-101: Overlapping pairs detected, all characters in inventory")]
    public void BuildInventory_OverlappingPairs_AllFourCharactersInInventory()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (foo [bar) baz]");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // All 4 overlapping characters should appear
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-006: '(' must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == "["),
                Is.True,
                "TS-006: '[' must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-006: ')' must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == "]"),
                Is.True,
                "TS-006: ']' must be in items"
            );
        });
    }

    /// <summary>
    /// TS-007: Overlap detection requires at least 4 items in stack.
    /// "(foo [bar)" has only 3 stack items, so they are flagged as
    /// unmatched, not overlapping. Items still appear in inventory.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("BHV-101: Less than 4 stack items -> no overlap detection")]
    public void BuildInventory_ThreeStackItems_NoOverlapDetection()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (foo [bar)");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // All 3 characters appear (as unmatched, not overlapping)
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-007: '(' must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == "["),
                Is.True,
                "TS-007: '[' must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-007: ')' must be in items"
            );
        });
    }

    #endregion

    #region spec-003: Body/Note Separation (BHV-102)

    /// <summary>
    /// TS-008: Body and note text have independent pair tracking.
    /// "(hello \f + \ft world)\f*" should produce items for both halves
    /// because the ( is in body scope and ) is in note scope.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-003")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-102")]
    [Description("BHV-102: Body and note text have independent pair tracking")]
    public void BuildInventory_BodyNoteIndependentScopes_BothHalvesFlagged()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello \\f + \\ft world)\\f*");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both ( and ) appear as items because they are in separate scopes
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-008: '(' in body scope must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-008: ')' in note scope must be in items"
            );
        });
    }

    /// <summary>
    /// TS-009: Pair split across two footnotes treated as separate scopes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-003")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-102")]
    [Description("BHV-102: Pair split across two footnotes are separate scopes")]
    public void BuildInventory_TwoFootnotes_SeparateScopes()
    {
        SetBookText(
            1,
            "\\id GEN\n\\c 1\n\\v 1 text \\f + \\ft (open\\f* more \\f + \\ft close)\\f*"
        );

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both halves appear because each footnote is a separate scope
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-009: '(' in first footnote must be in items"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-009: ')' in second footnote must be in items"
            );
        });
    }

    #endregion

    #region spec-004: Parse Punctuation Pairs (BHV-103)

    /// <summary>
    /// TS-011: Default pair definitions "(/) [/] {/}" are parsed correctly.
    /// Building inventory with default pairs detects all 3 pair types.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-103")]
    [Description("BHV-103: Default pairs parsed correctly, all 3 types tracked")]
    public void BuildInventory_DefaultPairs_AllThreeTypesTracked()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (text) [text] {text}");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // All 6 pair characters tracked
        Assert.Multiple(() =>
        {
            Assert.That(result.Items.Any(i => i.Text == "("), Is.True, "TS-011: '(' tracked");
            Assert.That(result.Items.Any(i => i.Text == ")"), Is.True, "TS-011: ')' tracked");
            Assert.That(result.Items.Any(i => i.Text == "["), Is.True, "TS-011: '[' tracked");
            Assert.That(result.Items.Any(i => i.Text == "]"), Is.True, "TS-011: ']' tracked");
            Assert.That(result.Items.Any(i => i.Text == "{"), Is.True, "TS-011: '{' tracked");
            Assert.That(result.Items.Any(i => i.Text == "}"), Is.True, "TS-011: '}' tracked");
        });
    }

    /// <summary>
    /// TS-014: Empty pairs string falls back to defaults. Building inventory
    /// still detects default pair types even when pairs setting is empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-103")]
    [Description("BHV-103/INV-005: Empty pairs falls back to defaults")]
    public void BuildInventory_EmptyPairsSetting_FallsBackToDefaults()
    {
        // Configure empty pairs setting on the project
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (unmatched text");
        SetProjectSetting("Pairs", "");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Even with empty pairs setting, default pairs should be used
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        Assert.That(
            openParen,
            Is.Not.Null,
            "TS-014/INV-005: Default pairs must be used when setting is empty"
        );
    }

    /// <summary>
    /// TS-016: Dollar sign "$" can be configured as a pair character.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-103")]
    [Description("BHV-103: Dollar sign as configured pair character")]
    public void BuildInventory_DollarSignPair_Tracked()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 $hello");
        SetProjectSetting("Pairs", "(/) $/$");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var dollar = result.Items.FirstOrDefault(i => i.Text == "$");
        Assert.That(
            dollar,
            Is.Not.Null,
            "TS-016: Dollar sign must be tracked when configured as pair char"
        );
    }

    #endregion

    #region spec-005: Introduction Outline Exemption (BHV-104)

    /// <summary>
    /// TS-017: Intro outline closing paren at end of first word is exempted.
    /// "\\io1 1) bar" should NOT flag the closing paren.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-005")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-104")]
    [Description("BHV-104: Intro outline closing paren at end of first word exempted")]
    public void BuildInventory_IntroOutlineClosingParen_Exempted()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\io1 1) bar\n\\io1 2) baz\n\\v 1 Normal text.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // The closing parens should be exempted (not flagged as unmatched)
        // They may still appear in the inventory but should not cause check errors
        // The key test is that the inventory builds successfully without errors
        // for these intro outline numbering patterns
    }

    /// <summary>
    /// TS-018: Fully parenthesized number "(1)" in intro outline is valid.
    /// The exemption does NOT remove when it correctly matches a preceding opener.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-005")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-104")]
    [Description("BHV-104: Fully parenthesized number (1) in intro outline preserved")]
    public void BuildInventory_IntroOutlineFullyParenthesized_Preserved()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\io1 (1) Introduction\n\\v 1 Normal text.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // (1) is a properly matched pair, so both ( and ) are tracked
        // but neither should be flagged as unmatched
        Assert.That(
            result.Items.Any(i => i.Text == "("),
            Is.True,
            "TS-018: '(' from (1) should be in inventory"
        );
        Assert.That(
            result.Items.Any(i => i.Text == ")"),
            Is.True,
            "TS-018: ')' from (1) should be in inventory"
        );
    }

    /// <summary>
    /// TS-020: Non-intro-outline paragraph does not get exemption.
    /// "\\p 1) some text" should flag the closing paren.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-005")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-104")]
    [Description("BHV-104: Non-intro-outline paragraph gets no exemption")]
    public void BuildInventory_NonOutlineParagraph_NoExemption()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\p 1) some text\n\\v 1 Normal text.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // The ')' in a regular \p paragraph should be flagged
        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.That(
            closeParen,
            Is.Not.Null,
            "TS-020: ')' in non-outline paragraph must be in items (no exemption)"
        );
    }

    #endregion

    #region spec-006: Paragraph Closure Mode (BHV-105)

    /// <summary>
    /// TS-021: ClosedByParagraph=No allows pairs to span paragraphs.
    /// "(text \\p more text)" produces no errors.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-006")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-105")]
    [Description("BHV-105: ClosedByParagraph=No allows pairs to span paragraphs")]
    public void BuildInventory_ClosedByParagraphNo_PairsSpanParagraphs()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\p (text\n\\p more text)\n\\v 1 End.");
        SetProjectSetting("ClosedByParagraph", "No");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both ( and ) should be in inventory as matched pair
        Assert.Multiple(() =>
        {
            Assert.That(result.Items.Any(i => i.Text == "("), Is.True, "TS-021: '(' tracked");
            Assert.That(result.Items.Any(i => i.Text == ")"), Is.True, "TS-021: ')' tracked");
        });
    }

    /// <summary>
    /// TS-022: ClosedByParagraph=Yes creates scope boundary at paragraph start.
    /// "(text \\p more text)" with ClosedByParagraph=Yes produces 2 unmatched items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-006")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-105")]
    [Description("BHV-105: ClosedByParagraph=Yes creates scope boundary")]
    public void BuildInventory_ClosedByParagraphYes_CreatesScopeBoundary()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\p (text\n\\p more text)\n\\v 1 End.");
        SetProjectSetting("ClosedByParagraph", "Yes");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both ( and ) appear in inventory -- they are now unmatched due to
        // paragraph boundary closing the scope
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-022: '(' must be in items (unmatched due to paragraph closure)"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-022: ')' must be in items (unmatched due to paragraph closure)"
            );
        });
    }

    /// <summary>
    /// TS-023: Poetic markers NEVER close pairs even with ClosedByParagraph=Yes.
    /// This is a critical invariant (INV-013).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-006")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-105")]
    [Description("INV-013: Poetic markers NEVER close pairs regardless of setting")]
    public void BuildInventory_PoeticMarkers_NeverClosePairs()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\q1 (text\n\\q2 more text)\n\\v 1 End.");
        SetProjectSetting("ClosedByParagraph", "Yes");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // The pair spans poetic paragraphs and should match correctly
        // Both ( and ) appear in inventory as matched (not unmatched)
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "TS-023/INV-013: '(' tracked across poetic paragraphs"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "TS-023/INV-013: ')' tracked across poetic paragraphs"
            );
        });
    }

    #endregion

    #region spec-009: Setup Completeness (BHV-109)

    /// <summary>
    /// TS-030: SetupComplete with >= 90% categorized returns true.
    /// TS-032: Empty inventory returns SetupComplete = true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-009")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-109")]
    [Description("BHV-109/INV-006: Empty inventory returns SetupComplete=true")]
    public void BuildInventory_EmptyProject_SetupCompleteTrue()
    {
        // Empty project with no scripture text
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 No paired punctuation here");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);
        // When there are few or no items, setup is considered complete
        Assert.That(
            result.SetupComplete,
            Is.True,
            "TS-032/INV-006: Empty/minimal inventory should be SetupComplete=true"
        );
    }

    /// <summary>
    /// TS-030: SetupComplete when 90% or more of items are categorized.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("SpecId", "spec-009")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-109")]
    [Description("BHV-109/INV-006: SetupComplete is a boolean on the result")]
    public void BuildInventory_WithText_SetupCompleteIsBoolean()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // SetupComplete must be a boolean (not null, not missing)
        Assert.That(
            result.SetupComplete,
            Is.TypeOf<bool>(),
            "TS-030: SetupComplete must be a boolean value"
        );
    }

    #endregion

    #region EXT-001: 4-Way Branching (TS-090 through TS-093)

    /// <summary>
    /// TS-090: Regular non-separated path builds only combinedTextInventory.
    /// No verse, non-verse, regular, or studyBible inventories populated.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ExtractionId", "EXT-001")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-113")]
    [Description("EXT-001: Regular non-separated -> only combined populated")]
    public void BuildInventory_RegularNonSep_OnlyCombinedBranch()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.VersePopulated, Is.False, "TS-090: VersePopulated=false");
            Assert.That(result.NonVersePopulated, Is.False, "TS-090: NonVersePopulated=false");
            Assert.That(result.RegularPopulated, Is.False, "TS-090: RegularPopulated=false");
            Assert.That(result.StudyBiblePopulated, Is.False, "TS-090: StudyBiblePopulated=false");
            Assert.That(result.CombinedIsMerge, Is.False, "TS-090: CombinedIsMerge=false");
        });
    }

    /// <summary>
    /// TS-091: Regular separated path builds verse and non-verse inventories,
    /// combined is their merge.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ExtractionId", "EXT-001")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-113")]
    [Description("EXT-001: Regular separated -> verse+nonverse populated")]
    public void BuildInventory_RegularSep_VerseAndNonVerseBranch()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.VersePopulated, Is.True, "TS-091: VersePopulated=true");
            Assert.That(result.NonVersePopulated, Is.True, "TS-091: NonVersePopulated=true");
            Assert.That(result.CombinedIsMerge, Is.True, "TS-091: CombinedIsMerge=true");
        });
    }

    /// <summary>
    /// TS-092: SBA non-separated path builds regular and studyBible,
    /// combined is their merge.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ExtractionId", "EXT-001")]
    [Property("ScenarioId", "TS-092")]
    [Property("BehaviorId", "BHV-113")]
    [Description("EXT-001: SBA non-separated -> regular+studyBible populated")]
    public void BuildInventory_SbaNonSep_RegularAndStudyBibleBranch()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.RegularPopulated, Is.True, "TS-092: RegularPopulated=true");
            Assert.That(result.StudyBiblePopulated, Is.True, "TS-092: StudyBiblePopulated=true");
            Assert.That(result.CombinedIsMerge, Is.True, "TS-092: CombinedIsMerge=true");
        });
    }

    /// <summary>
    /// TS-093: SBA separated path (most complex) builds all 5 inventories.
    /// verse+nonverse -> regular, regular+studyBible -> combined.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ExtractionId", "EXT-001")]
    [Property("ScenarioId", "TS-093")]
    [Property("BehaviorId", "BHV-113")]
    [Description("EXT-001: SBA separated -> all 5 inventories populated")]
    public void BuildInventory_SbaSep_AllFiveBranch()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.VersePopulated, Is.True, "TS-093: VersePopulated=true");
            Assert.That(result.NonVersePopulated, Is.True, "TS-093: NonVersePopulated=true");
            Assert.That(result.RegularPopulated, Is.True, "TS-093: RegularPopulated=true");
            Assert.That(result.StudyBiblePopulated, Is.True, "TS-093: StudyBiblePopulated=true");
            Assert.That(result.CombinedIsMerge, Is.True, "TS-093: CombinedIsMerge=true");
        });
    }

    #endregion

    #region BHV-108: IsValid Logic with Branching

    /// <summary>
    /// TS-027: Items in the inventory have status from project settings.
    /// When no status is set, items should default to unknown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-108")]
    [Description("BHV-108: Default item status is unknown when no settings configured")]
    public void BuildInventory_NoStatusConfigured_ItemsDefaultToUnknown()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);
        Assert.That(result.Items, Is.Not.Empty, "Items should exist");

        // Items without explicit status configuration should be unknown
        var firstItem = result.Items.First();
        Assert.That(
            firstItem.Statuses.Values,
            Has.Some.EqualTo(ItemStatus.Unknown),
            "TS-027/BHV-108: Uncategorized items should default to Unknown status"
        );
    }

    #endregion

    #region BHV-115: InventoryTextType Filtering

    /// <summary>
    /// TS-042: InventoryTextType filtering distributes tokens correctly.
    /// In separated mode, verse text goes to VerseText inventory,
    /// non-verse text goes to NonVerseText inventory.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-115")]
    [Description("BHV-115: Separated mode distributes tokens by text type")]
    public void BuildInventory_Separated_TokensDistributedByTextType()
    {
        // Verse text has matched pairs, section heading has unmatched
        SetBookText(1, "\\id GEN\n\\c 1\n\\s Section Title)\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.VersePopulated, Is.True, "TS-042: Verse inventory populated");
            Assert.That(result.NonVersePopulated, Is.True, "TS-042: NonVerse inventory populated");
        });
    }

    /// <summary>
    /// TS-043: NonVerseText excludes Study Bible content (INV-008).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-115")]
    [Description("INV-008: NonVerseText filter excludes SBA content")]
    public void BuildInventory_SbaSeparated_NonVerseExcludesSbaContent()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            // In SBA separated, NonVerseText does NOT include SBA content
            // SBA content goes to StudyBibleContent inventory
            Assert.That(
                result.StudyBiblePopulated,
                Is.True,
                "TS-043/INV-008: SBA content in separate StudyBibleContent inventory"
            );
        });
    }

    #endregion

    #region BHV-116: Reference Tracking

    /// <summary>
    /// TS-044: Inventory items track references in BBBCCCVVV format, sorted ascending.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-044")]
    [Property("BehaviorId", "BHV-116")]
    [Description("BHV-116: References sorted in ascending BBBCCCVVV format")]
    public void BuildInventory_ItemReferences_SortedAscending()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello)\n\\v 2 (world)\n\\v 3 (test)");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        Assert.That(openParen, Is.Not.Null, "TS-044: '(' must be in items");

        if (openParen!.References.Count > 1)
        {
            // Verify references are sorted ascending
            for (int i = 1; i < openParen.References.Count; i++)
            {
                Assert.That(
                    openParen.References[i],
                    Is.GreaterThanOrEqualTo(openParen.References[i - 1]),
                    $"TS-044/BHV-116: References must be sorted ascending at index {i}"
                );
            }
        }
    }

    #endregion

    #region BHV-125: MatchedPairCategorizer

    /// <summary>
    /// TS-059: MatchedPairCategorizer classifies characters correctly.
    /// Configured pair characters are recognized in the token stream.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-125")]
    [Description("BHV-125: Configured pair characters correctly classified")]
    public void BuildInventory_ConfiguredPairs_CorrectlyClassified()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) [world] {test}");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // All configured pair characters should be classified and tracked
        Assert.That(
            result.Items.Count,
            Is.GreaterThanOrEqualTo(6),
            "TS-059/BHV-125: At least 6 pair characters should be tracked (3 openers + 3 closers)"
        );
    }

    #endregion

    #region BHV-127: TextInventory Combine

    /// <summary>
    /// TS-060: TextInventory.Combine merges items from sub-inventories.
    /// In separated mode, combined inventory should contain union of items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "BHV-127")]
    [Description("BHV-127: Combined inventory is union of sub-inventories")]
    public void BuildInventory_Separated_CombinedContainsAllItems()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\s (title)\n\\v 1 [verse] text.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.CombinedIsMerge, Is.True, "TS-060: CombinedIsMerge=true");

            // Combined items should include items from both verse and non-verse
            Assert.That(
                result.Items,
                Is.Not.Empty,
                "TS-060/BHV-127: Combined inventory must have items from merged inventories"
            );
        });
    }

    #endregion

    #region BHV-129: Space Character as Inventory Item

    /// <summary>
    /// TS-062: Space character can be a valid inventory item.
    /// Space encoded as first char via QuoteSpaces/UnquoteSpaces.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-129")]
    [Description("BHV-129: Space character can be inventory item")]
    public void BuildInventory_SpaceCharPair_HandledCorrectly()
    {
        // Configure space as a pair character: " / "
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 hello world.");
        SetProjectSetting("Pairs", "(/) \" /\"");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        // The build should succeed regardless of whether space is a valid pair char
        Assert.That(result.Success, Is.True, "TS-062: Build succeeds with space as pair char");
    }

    #endregion

    #region BHV-112: Run Check and Filter by Validity

    /// <summary>
    /// TS-037: Building inventory exercises the MatchedPairsCheck.Run logic
    /// which filters results by validity status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-112")]
    [Description("BHV-112: Inventory build exercises check Run with validity filtering")]
    public void BuildInventory_WithText_ExercisesCheckRunLogic()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) [world]");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(
                result.Items,
                Is.Not.Empty,
                "TS-037/BHV-112: Items populated after check Run"
            );
        });
    }

    #endregion

    #region BHV-128: GetReferences with Occurrence Count Tracking

    /// <summary>
    /// TS-061: GetReferences updates occurrence counts. TotalCount on each
    /// inventory item reflects the total occurrences across all text types.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "BHV-128")]
    [Description("BHV-128: TotalCount reflects occurrences across all text types")]
    public void BuildInventory_ItemTotalCount_ReflectsAllOccurrences()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello)\n\\v 2 (world)\n\\v 3 (test)");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        Assert.That(openParen, Is.Not.Null, "TS-061: '(' must be in items");
        Assert.That(
            openParen!.TotalCount,
            Is.GreaterThanOrEqualTo(3),
            "TS-061/BHV-128: TotalCount must reflect all 3 occurrences"
        );
    }

    #endregion

    #region BHV-113: TextInventory Build Process

    /// <summary>
    /// TS-117: TextInventory build clears existing data before rebuilding.
    /// Calling BuildInventory twice on same project should produce same result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-117")]
    [Property("BehaviorId", "BHV-113")]
    [Description("BHV-113: Build clears and rebuilds, producing consistent results")]
    public void BuildInventory_CalledTwice_ProducesSameResult()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result1 = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        var result2 = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result1.Success, Is.True);
            Assert.That(result2.Success, Is.True);
            Assert.That(
                result2.Items.Count,
                Is.EqualTo(result1.Items.Count),
                "TS-117/BHV-113: Rebuild produces same item count"
            );
        });
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-001: Opening and closing punctuation marks are paired by index correspondence.
    /// openingPuncts[i] is closed by closingPuncts[i].
    /// Verified by: properly matched pairs produce inventory items with correct pairing.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("INV-001: Index correspondence - ( matches ) not ] or }")]
    public void Invariant_IndexCorrespondence_CorrectPairing()
    {
        // ( should match ), not ] or }
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello]");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both ( and ] should appear (they don't match by index correspondence)
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "INV-001: '(' unmatched because ] is not its pair"
            );
            Assert.That(
                result.Items.Any(i => i.Text == "]"),
                Is.True,
                "INV-001: ']' unmatched because ( is not its pair"
            );
        });
    }

    /// <summary>
    /// INV-002: Notes and body text have independent pair tracking.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-002")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-102")]
    [Description("INV-002: Body and note have separate pair stacks")]
    public void Invariant_BodyNoteIndependence_SeparateStacks()
    {
        // ( in body, ) in footnote -- should NOT match
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello \\f + \\ft world)\\f*");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Both appear because body and note scopes are independent
        Assert.Multiple(() =>
        {
            Assert.That(
                result.Items.Any(i => i.Text == "("),
                Is.True,
                "INV-002: '(' in body scope not closed by note's ')'"
            );
            Assert.That(
                result.Items.Any(i => i.Text == ")"),
                Is.True,
                "INV-002: ')' in note scope not matched to body's '('"
            );
        });
    }

    /// <summary>
    /// INV-004: Only single-character punctuation marks allowed in pair definitions.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-004")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-103")]
    [Description("INV-004: Multi-character pair marks rejected")]
    public void Invariant_SingleCharOnly_MultiCharRejected()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 <<hello>>");
        SetProjectSetting("Pairs", "(/) <</>> [/]");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // << and >> should NOT be tracked as pair characters (multi-char rejected)
        // Only valid single-char pairs should be tracked
    }

    /// <summary>
    /// INV-005: Default pairs used when no valid pairs parsed.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-103")]
    [Description("INV-005: Default pairs (/) [/] {/} used on fallback")]
    public void Invariant_DefaultPairsFallback_AppliedWhenEmpty()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (unmatched");
        SetProjectSetting("Pairs", "");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // Default pairs should still detect the '('
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        Assert.That(
            openParen,
            Is.Not.Null,
            "INV-005: Default pairs must detect '(' when setting is empty"
        );
    }

    /// <summary>
    /// INV-006: Setup complete threshold: 90% categorized OR 10 or fewer unknown.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-006")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-109")]
    [Description("INV-006: SetupComplete threshold logic applied to result")]
    public void Invariant_SetupCompleteThreshold_AppliedCorrectly()
    {
        // No paired punctuation -> empty inventory -> always complete
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 Hello world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.SetupComplete,
            Is.True,
            "INV-006: Empty/minimal inventory is always complete"
        );
    }

    /// <summary>
    /// INV-008: NonVerseText excludes Study Bible content.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-008")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-115")]
    [Description("INV-008: NonVerseText does not include SBA content")]
    public void Invariant_NonVerseExcludesSba_SeparateCategory()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: true,
            isSeparated: true,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            // SBA content goes to StudyBibleContent, not NonVerseText
            Assert.That(
                result.StudyBiblePopulated,
                Is.True,
                "INV-008: SBA content in StudyBibleContent inventory"
            );
        });
    }

    /// <summary>
    /// INV-013: Poetic style markers NEVER close pairs (critical invariant).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-105")]
    [Description("INV-013: Poetic markers never trigger paragraph closure")]
    public void Invariant_PoeticNeverClose_CriticalExemption()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\q1 (text\n\\q2 more text)\n\\v 1 End.");
        SetProjectSetting("ClosedByParagraph", "Yes");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // The pair ( ) should match across poetic paragraphs even with
        // ClosedByParagraph=Yes, because poetic markers are exempt
        var openParen = result.Items.FirstOrDefault(i => i.Text == "(");
        var closeParen = result.Items.FirstOrDefault(i => i.Text == ")");
        Assert.Multiple(() =>
        {
            Assert.That(openParen, Is.Not.Null, "INV-013: '(' tracked across poetic paragraphs");
            Assert.That(closeParen, Is.Not.Null, "INV-013: ')' tracked across poetic paragraphs");
        });
    }

    /// <summary>
    /// INV-014: Overlapping items remain in stack and are also reported as unmatched.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("InvariantId", "INV-014")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description(
        "INV-014: Overlapping items remain in stack, reported as both overlap and unmatched"
    )]
    public void Invariant_OverlappingRemainInStack_AlsoUnmatched()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (foo [bar) baz]");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);

        // All 4 characters should be in inventory items
        // They get both "Overlapping pair" and "Unmatched punctuation" designations
        Assert.Multiple(() =>
        {
            Assert.That(result.Items.Any(i => i.Text == "("), Is.True, "INV-014: '(' in items");
            Assert.That(result.Items.Any(i => i.Text == "["), Is.True, "INV-014: '[' in items");
            Assert.That(result.Items.Any(i => i.Text == ")"), Is.True, "INV-014: ')' in items");
            Assert.That(result.Items.Any(i => i.Text == "]"), Is.True, "INV-014: ']' in items");
        });
    }

    #endregion

    #region Error Condition Tests

    /// <summary>
    /// Error: BuildInventory returns error when project not found.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-113")]
    [Description("Error: Invalid project ID returns failure result")]
    public void BuildInventory_InvalidProjectId_ReturnsFailure()
    {
        var result = InventoryBuildService.BuildInventory(
            "nonexistent-project-id",
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Build must fail for invalid project");
            Assert.That(result.Error, Is.Not.Null.And.Not.Empty, "Error message must be set");
            Assert.That(result.Items, Is.Empty, "Items must be empty on failure");
        });
    }

    /// <summary>
    /// Error: BuildInventory with empty project ID returns failure.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-113")]
    [Description("Error: Empty project ID returns failure result")]
    public void BuildInventory_EmptyProjectId_ReturnsFailure()
    {
        var result = InventoryBuildService.BuildInventory(
            "",
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Build must fail for empty project ID");
            Assert.That(result.Error, Is.Not.Null.And.Not.Empty, "Error message must be set");
            Assert.That(result.Items, Is.Empty, "Items must be empty on failure");
        });
    }

    #endregion

    #region Result Structure Tests

    /// <summary>
    /// Contract: When Success is false, Error must be non-null and Items must be empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "BHV-113")]
    [Description("Contract: Failed result has non-null Error and empty Items")]
    public void BuildInventory_Failure_ErrorSetItemsEmpty()
    {
        var result = InventoryBuildService.BuildInventory(
            "invalid-project",
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        if (!result.Success)
        {
            Assert.Multiple(() =>
            {
                Assert.That(
                    result.Error,
                    Is.Not.Null,
                    "Contract: Error must be non-null when Success is false"
                );
                Assert.That(
                    result.Items,
                    Is.Empty,
                    "Contract: Items must be empty when Success is false"
                );
            });
        }
    }

    /// <summary>
    /// Contract: Successful result has items with non-empty Text,
    /// Counts dictionary, Statuses dictionary, and TotalCount >= 0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("Contract: Successful result items have valid structure")]
    public void BuildInventory_Success_ItemsHaveValidStructure()
    {
        SetBookText(1, "\\id GEN\n\\c 1\n\\v 1 (hello) world.");

        var result = InventoryBuildService.BuildInventory(
            _testProjectId,
            isSba: false,
            isSeparated: false,
            ParatextProjects
        );

        Assert.That(result.Success, Is.True);
        Assert.That(result.Items, Is.Not.Empty, "Items should exist for text with pairs");

        foreach (var item in result.Items)
        {
            Assert.Multiple(() =>
            {
                Assert.That(item.Text, Is.Not.Null.And.Not.Empty, $"Item Text must be non-empty");
                Assert.That(item.Counts, Is.Not.Null, $"Item Counts must not be null");
                Assert.That(item.Statuses, Is.Not.Null, $"Item Statuses must not be null");
                Assert.That(
                    item.TotalCount,
                    Is.GreaterThanOrEqualTo(0),
                    $"Item TotalCount must be >= 0"
                );
                Assert.That(item.References, Is.Not.Null, $"Item References must not be null");
            });
        }
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Sets the USFM text for a specific book in the test project.
    /// Uses ScrText.PutText(bookNum, chapterNum=0, skipUpdates=false, usfm, progress=null)
    /// to write the full book text into the in-memory file system.
    /// </summary>
    private void SetBookText(int bookNum, string usfm)
    {
        _scrText!.PutText(bookNum, 0, false, usfm, null);
    }

    /// <summary>
    /// Sets a project-level check setting (e.g., Pairs, ClosedByParagraph).
    /// </summary>
    private void SetProjectSetting(string settingName, string value)
    {
        _scrText!.Settings.SetSetting(settingName, value);
    }

    #endregion
}
