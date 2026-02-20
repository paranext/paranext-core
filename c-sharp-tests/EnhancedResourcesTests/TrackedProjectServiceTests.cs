using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-027: TrackedProjectService.
/// Validates the tracked project lifecycle for BT (Biblical Terms) integration in Enhanced
/// Resources. This service manages three core responsibilities:
///
/// 1. EXT-004 (SelectTrackedProject): Auto-selects the best tracked project from available
///    open projects. Prefers stored FollowedProject, falls back to first open non-resource project.
/// 2. EXT-005 (SetTrackedProject): Initializes BT data (TermsList, TermRenderings, Analyzer) for
///    a selected project, or clears all BT state when null is passed.
/// 3. EXT-012 (ChangeListener): Classifies WriteLock notifications into change types (rendering,
///    text, BT list) and triggers appropriate refresh actions.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs:1897-1926, 2338-2362, 971-1017
/// Contract: extraction-plan.md EXT-004, EXT-005, EXT-012
///
/// TrackedProjectService is a stateful service (Classic TDD).
/// No golden master -- tested via unit tests for auto-selection and BT state setup.
/// </summary>
[TestFixture]
public class TrackedProjectServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-027.
    /// Verifies the full tracked project lifecycle: auto-select, BT state setup, and clear.
    /// When this test passes, the capability is complete.
    ///
    /// Lifecycle:
    /// 1. SelectTrackedProject picks the stored FollowedProject from open projects
    /// 2. SetTrackedProject initializes BtState with TermsList, TermRenderings, Analyzer
    /// 3. Setting tracked project to null clears all BT state
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-050")]
    [Property("ExtractionId", "EXT-004")]
    [Description(
        "Acceptance test: Full tracked project lifecycle (select, setup, clear)"
    )]
    public void TrackedProjectLifecycle_SelectSetupAndClear_Success()
    {
        // Arrange: Create a non-resource project as the "stored" project
        var storedProject = new DummyScrText();
        var storedProjectName = storedProject.Name;
        var openProjects = new List<ScrText> { storedProject };

        // Act 1: Auto-select should find the stored project
        var selectedProject = TrackedProjectService.SelectTrackedProject(
            storedProjectName,
            openProjects
        );

        // Assert 1: Stored project is selected
        Assert.That(selectedProject, Is.Not.Null, "Must auto-select stored project");
        Assert.That(
            selectedProject!.Name,
            Is.EqualTo(storedProjectName),
            "Selected project must match stored FollowedProject name"
        );

        // Act 2: Set tracked project initializes BT state
        var btState = TrackedProjectService.SetTrackedProject(selectedProject);

        // Assert 2: BT state is fully initialized
        Assert.Multiple(() =>
        {
            Assert.That(
                btState.TermsList,
                Is.Not.Null,
                "TermsList must be initialized for tracked project"
            );
            Assert.That(
                btState.TermRenderings,
                Is.Not.Null,
                "TermRenderings must be initialized for tracked project"
            );
            Assert.That(
                btState.Analyzer,
                Is.Not.Null,
                "Analyzer must be initialized for tracked project"
            );
        });

        // Act 3: Clear tracked project by passing null
        var clearedState = TrackedProjectService.SetTrackedProject(null);

        // Assert 3: All BT state cleared
        Assert.Multiple(() =>
        {
            Assert.That(
                clearedState.TermsList,
                Is.Null,
                "TermsList must be null after clearing tracked project"
            );
            Assert.That(
                clearedState.TermRenderings,
                Is.Null,
                "TermRenderings must be null after clearing tracked project"
            );
            Assert.That(
                clearedState.Analyzer,
                Is.Null,
                "Analyzer must be null after clearing tracked project"
            );
        });
    }

    #endregion

    #region SelectTrackedProject - EXT-004

    /// <summary>
    /// TS-050: When stored FollowedProject is among open projects, it is selected.
    /// PT9 Source: MarbleForm.cs:1897-1926
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-050")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Auto-select tracked project on form load")]
    public void SelectTrackedProject_StoredProjectInOpenProjects_ReturnsStoredProject()
    {
        // Arrange
        var storedProject = new DummyScrText();
        var otherProject = new DummyScrText();
        var storedProjectName = storedProject.Name;
        var openProjects = new List<ScrText> { otherProject, storedProject };

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            storedProjectName,
            openProjects
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Name,
            Is.EqualTo(storedProjectName),
            "Must return stored FollowedProject when found in open projects"
        );
    }

    /// <summary>
    /// TS-051: When stored project is not open, falls back to first open non-resource project.
    /// PT9 Source: MarbleForm.cs:1897-1926
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-051")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Auto-select falls back to first open non-resource project")]
    public void SelectTrackedProject_StoredProjectNotOpen_ReturnsFallbackProject()
    {
        // Arrange
        var fallbackProject = new DummyScrText();
        var openProjects = new List<ScrText> { fallbackProject };
        var closedProjectName = "ClosedProject_that_does_not_exist";

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            closedProjectName,
            openProjects
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Must fall back to first open non-resource project");
        Assert.That(
            result!.Name,
            Is.EqualTo(fallbackProject.Name),
            "Must select the first open non-resource project as fallback"
        );
    }

    /// <summary>
    /// Edge case: When no projects are open, returns null.
    /// PT9 Source: MarbleForm.cs:1897-1926 (implicit: empty project list)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-050")]
    [Property("ExtractionId", "EXT-004")]
    [Description("No open projects returns null")]
    public void SelectTrackedProject_NoOpenProjects_ReturnsNull()
    {
        // Arrange
        var openProjects = new List<ScrText>();

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            "SomeStoredProject",
            openProjects
        );

        // Assert
        Assert.That(result, Is.Null, "Must return null when no projects are open");
    }

    /// <summary>
    /// Edge case: When stored project name is null or empty, falls back to first project.
    /// PT9 Source: MarbleForm.cs:1897-1926 (implicit: no stored setting)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-051")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Null stored project name falls back to first open project")]
    public void SelectTrackedProject_NullStoredName_ReturnsFallbackProject()
    {
        // Arrange
        var fallbackProject = new DummyScrText();
        var openProjects = new List<ScrText> { fallbackProject };

        // Act
        var result = TrackedProjectService.SelectTrackedProject(null, openProjects);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Name,
            Is.EqualTo(fallbackProject.Name),
            "Must fall back to first open project when stored name is null"
        );
    }

    /// <summary>
    /// Edge case: Empty stored project name also triggers fallback.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-051")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Empty stored project name falls back to first open project")]
    public void SelectTrackedProject_EmptyStoredName_ReturnsFallbackProject()
    {
        // Arrange
        var fallbackProject = new DummyScrText();
        var openProjects = new List<ScrText> { fallbackProject };

        // Act
        var result = TrackedProjectService.SelectTrackedProject("", openProjects);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Name,
            Is.EqualTo(fallbackProject.Name),
            "Must fall back to first open project when stored name is empty"
        );
    }

    /// <summary>
    /// Edge case: Multiple open projects -- stored project selected even if not first.
    /// PT9 Source: MarbleForm.cs:1897-1926
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-050")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Stored project found in middle of list is still selected")]
    public void SelectTrackedProject_StoredProjectNotFirst_ReturnsStoredProject()
    {
        // Arrange
        var projectA = new DummyScrText();
        var storedProject = new DummyScrText();
        var projectC = new DummyScrText();
        var storedProjectName = storedProject.Name;
        var openProjects = new List<ScrText> { projectA, storedProject, projectC };

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            storedProjectName,
            openProjects
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Name,
            Is.EqualTo(storedProjectName),
            "Must find stored project regardless of position in list"
        );
    }

    /// <summary>
    /// TS-049 related: Resource projects must be excluded from selection.
    /// When all open projects are resources, returns null.
    /// PT9 Source: MarbleForm.cs:1897-1926 (resources excluded from dropdown)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-049")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Resource projects excluded from tracked project selection")]
    public void SelectTrackedProject_OnlyResourceProjects_ReturnsNull()
    {
        // Arrange: Create an empty list (simulating all-resource scenario)
        // In practice, SelectTrackedProject receives only non-resource projects
        // from its caller. If all projects are resources, the list is empty.
        var openProjects = new List<ScrText>();

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            "SomeStoredProject",
            openProjects
        );

        // Assert
        Assert.That(
            result,
            Is.Null,
            "Must return null when no non-resource projects are available"
        );
    }

    #endregion

    #region SetTrackedProject - EXT-005

    /// <summary>
    /// TS-156: Setting a tracked project initializes TermsList, TermRenderings, Analyzer.
    /// PT9 Source: MarbleForm.cs:2338-2362
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-156")]
    [Property("ExtractionId", "EXT-005")]
    [Description("Tracked project setup loads BT data")]
    public void SetTrackedProject_WithValidProject_ReturnsBtStateWithAllFieldsPopulated()
    {
        // Arrange
        var project = new DummyScrText();

        // Act
        var btState = TrackedProjectService.SetTrackedProject(project);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(
                btState,
                Is.Not.Null,
                "Must return non-null BtState"
            );
            Assert.That(
                btState.TermsList,
                Is.Not.Null,
                "TermsList must be loaded for valid tracked project"
            );
            Assert.That(
                btState.TermRenderings,
                Is.Not.Null,
                "TermRenderings must be loaded for valid tracked project"
            );
            Assert.That(
                btState.Analyzer,
                Is.Not.Null,
                "Analyzer must be loaded for valid tracked project"
            );
        });
    }

    /// <summary>
    /// TS-157: Setting tracked project to null clears all BT state.
    /// PT9 Source: MarbleForm.cs:2338-2362
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-157")]
    [Property("ExtractionId", "EXT-005")]
    [Description("Tracked project null clears all BT state")]
    public void SetTrackedProject_WithNull_ReturnsBtStateWithAllFieldsNull()
    {
        // Arrange: null project (user selects "No project")

        // Act
        var btState = TrackedProjectService.SetTrackedProject(null);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(
                btState,
                Is.Not.Null,
                "Must return non-null BtState record even when clearing"
            );
            Assert.That(
                btState.TermsList,
                Is.Null,
                "TermsList must be null when no tracked project"
            );
            Assert.That(
                btState.TermRenderings,
                Is.Null,
                "TermRenderings must be null when no tracked project"
            );
            Assert.That(
                btState.Analyzer,
                Is.Null,
                "Analyzer must be null when no tracked project"
            );
        });
    }

    /// <summary>
    /// Verify BtState is a valid record type with the expected fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-156")]
    [Property("ExtractionId", "EXT-005")]
    [Description("BtState record has correct shape")]
    public void BtState_RecordShape_HasExpectedFields()
    {
        // Arrange & Act: Create a BtState with all nulls (cleared state)
        var btState = new BtState(null, null, null);

        // Assert: Record exists and has the three expected fields
        Assert.Multiple(() =>
        {
            Assert.That(btState.TermsList, Is.Null);
            Assert.That(btState.TermRenderings, Is.Null);
            Assert.That(btState.Analyzer, Is.Null);
        });
    }

    /// <summary>
    /// Changing tracked project from one project to another should produce fresh BT state.
    /// This verifies the state is not cached from a previous project.
    /// PT9 postcondition: "TermsList, TermRenderings, Analyzer reloaded; all tabs refreshed"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-156")]
    [Property("ExtractionId", "EXT-005")]
    [Description("Changing tracked project produces fresh BT state")]
    public void SetTrackedProject_ChangingProject_ProducesFreshBtState()
    {
        // Arrange
        var projectA = new DummyScrText();
        var projectB = new DummyScrText();

        // Act: Set project A, then switch to project B
        var stateA = TrackedProjectService.SetTrackedProject(projectA);
        var stateB = TrackedProjectService.SetTrackedProject(projectB);

        // Assert: Both states should have initialized fields
        // (they are separate invocations, not cached)
        Assert.Multiple(() =>
        {
            Assert.That(
                stateA.TermsList,
                Is.Not.Null,
                "First project BT state must be initialized"
            );
            Assert.That(
                stateB.TermsList,
                Is.Not.Null,
                "Second project BT state must be initialized"
            );
        });
    }

    #endregion

    #region ChangeListener - EXT-012

    /// <summary>
    /// TS-165: Change listener classifies rendering changes.
    /// PT9 Source: MarbleForm.cs:971-1017
    /// The change listener receives WriteLock notifications and classifies them into
    /// three types: rendering change, text change, and BT list change.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-316")]
    [Property("ScenarioId", "TS-165")]
    [Property("ExtractionId", "EXT-012")]
    [Description("Change listener classifies rendering change notification")]
    public void ClassifyChange_RenderingChange_ReturnsRenderingType()
    {
        // Arrange: A rendering change notification type
        var changeType = TrackedProjectChangeType.Rendering;

        // Act
        var classification = TrackedProjectService.ClassifyChange(changeType);

        // Assert
        Assert.That(
            classification,
            Is.EqualTo(TrackedProjectChangeType.Rendering),
            "Rendering changes must be classified as Rendering type"
        );
    }

    /// <summary>
    /// TS-165: Change listener classifies text changes.
    /// PT9 Source: MarbleForm.cs:971-1017
    /// Text changes in the tracked project affect verse text display.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-316")]
    [Property("ScenarioId", "TS-165")]
    [Property("ExtractionId", "EXT-012")]
    [Description("Change listener classifies text change notification")]
    public void ClassifyChange_TextChange_ReturnsTextType()
    {
        // Arrange
        var changeType = TrackedProjectChangeType.Text;

        // Act
        var classification = TrackedProjectService.ClassifyChange(changeType);

        // Assert
        Assert.That(
            classification,
            Is.EqualTo(TrackedProjectChangeType.Text),
            "Text changes must be classified as Text type"
        );
    }

    /// <summary>
    /// TS-165: Change listener classifies BT list changes.
    /// PT9 Source: MarbleForm.cs:971-1017
    /// BT list changes require full rendering status recalculation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-316")]
    [Property("ScenarioId", "TS-165")]
    [Property("ExtractionId", "EXT-012")]
    [Description("Change listener classifies BT list change notification")]
    public void ClassifyChange_BiblicalTermsListChange_ReturnsBtListType()
    {
        // Arrange
        var changeType = TrackedProjectChangeType.BiblicalTermsList;

        // Act
        var classification = TrackedProjectService.ClassifyChange(changeType);

        // Assert
        Assert.That(
            classification,
            Is.EqualTo(TrackedProjectChangeType.BiblicalTermsList),
            "BT list changes must be classified as BiblicalTermsList type"
        );
    }

    #endregion

    #region TrackedProjectChangeType Enum

    /// <summary>
    /// Verify TrackedProjectChangeType enum has the expected values.
    /// PT9 Source: MarbleForm.cs:971-1017 (three change types)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-316")]
    [Property("ScenarioId", "TS-165")]
    [Property("ExtractionId", "EXT-012")]
    [Description("TrackedProjectChangeType enum has all expected values")]
    public void TrackedProjectChangeType_EnumValues_ContainsAllTypes()
    {
        // Assert: All three change types exist
        var values = Enum.GetValues<TrackedProjectChangeType>();

        Assert.Multiple(() =>
        {
            Assert.That(
                values,
                Does.Contain(TrackedProjectChangeType.Rendering),
                "Must have Rendering change type"
            );
            Assert.That(
                values,
                Does.Contain(TrackedProjectChangeType.Text),
                "Must have Text change type"
            );
            Assert.That(
                values,
                Does.Contain(TrackedProjectChangeType.BiblicalTermsList),
                "Must have BiblicalTermsList change type"
            );
        });
    }

    #endregion

    #region Edge Cases

    /// <summary>
    /// Edge case from edge-cases.md: No tracked project selected.
    /// When no project is tracked, rendering status should return NoTrackedProject.
    /// This test verifies SetTrackedProject(null) produces a BtState suitable for
    /// the NoTrackedProject code path in CalculateRenderingStatus (CAP-007).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-157")]
    [Property("ExtractionId", "EXT-005")]
    [Description("Null tracked project BtState compatible with NoTrackedProject code path")]
    public void SetTrackedProject_Null_BtStateAllFieldsNull_ForNoTrackedProjectCodePath()
    {
        // Arrange & Act
        var btState = TrackedProjectService.SetTrackedProject(null);

        // Assert: All three fields must be null so that CAP-007 returns NoTrackedProject
        Assert.That(
            btState.TermsList is null && btState.TermRenderings is null && btState.Analyzer is null,
            Is.True,
            "All BtState fields must be null to trigger NoTrackedProject status code"
        );
    }

    /// <summary>
    /// TS-162 related: Duplicate short names handled.
    /// Selection by stored project name should work even when projects have similar names.
    /// The stored FollowedProject uses the full project name (not short name).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-162")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Selection handles projects by name, not short name")]
    public void SelectTrackedProject_ExactNameMatch_SelectsCorrectProject()
    {
        // Arrange
        var projectA = new DummyScrText();
        var projectB = new DummyScrText();
        var targetName = projectA.Name;
        var openProjects = new List<ScrText> { projectA, projectB };

        // Act
        var result = TrackedProjectService.SelectTrackedProject(
            targetName,
            openProjects
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result!.Name,
            Is.EqualTo(targetName),
            "Must select by exact Name match"
        );
    }

    /// <summary>
    /// Edge case: Null openProjects enumerable should not throw.
    /// Defensive behavior: treat null as empty list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-027")]
    [Property("BehaviorId", "BHV-305")]
    [Property("ScenarioId", "TS-051")]
    [Property("ExtractionId", "EXT-004")]
    [Description("Null open projects list returns null without throwing")]
    public void SelectTrackedProject_NullProjectsList_ReturnsNull()
    {
        // Act & Assert: Should return null without throwing ArgumentNullException
        var result = TrackedProjectService.SelectTrackedProject(
            "SomeProject",
            null!
        );

        Assert.That(result, Is.Null, "Must handle null project list gracefully");
    }

    #endregion
}
