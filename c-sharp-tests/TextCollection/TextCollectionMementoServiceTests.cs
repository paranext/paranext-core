// === TEST FILE: CAP-008 MementoSerializationAndRestore ===
// TDD Phase: RED (tests should fail -- implementation stubs throw NotImplementedException)
// Capability: CAP-008 (MementoSerializationAndRestore)
// Micro-Phase: BE-4 (Domain: State Persistence)
// Sources: EXT-001 (PT9/Paratext/TextCollectionForm.cs:166-278, 588-624)
// Golden Master: gm-005 (memento round-trip)
// Test Specs: spec-001 (project enumeration), spec-002 (project lookup)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for TextCollectionMementoService:
///   CAP-008: MementoSerializationAndRestore
///     - CreateMemento: Serialize complete TC window state to a memento (M-008)
///     - RestoreFromMemento: Restore TC state, detecting missing projects (M-009)
///
/// CreateMemento takes all TC window state parameters and returns a TextCollectionMemento.
/// If setupComplete is false, returns an empty memento (BHV-600: crash recovery safety).
/// If setupComplete is true, returns fully populated memento with all fields.
///
/// RestoreFromMemento takes a TextCollectionMemento and resolves each item via
/// ScrTextCollection.FindById(scrTextId) with fallback to ScrTextCollection.Find(scrTextName)
/// (BHV-103). Missing projects are reported in missingProjectNames (BHV-516).
///
/// Source: EXT-001 (PT9/Paratext/TextCollectionForm.cs:166-278, 588-624)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class TextCollectionMementoServiceTests : PapiTestBase
{
    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Memento round-trip -- create a memento with full state,
    /// then restore it, verifying all fields are preserved and projects resolved.
    ///
    /// This is the "done signal" for CAP-008. When this passes, the capability is complete.
    /// Golden master: gm-005 (memento serialization and restoration lifecycle)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-048,TS-049,TS-050,TS-051")]
    [Property("BehaviorId", "BHV-600,BHV-502,BHV-503,BHV-516,BHV-103")]
    [Description("Acceptance test: Full memento round-trip with missing project detection")]
    public void MementoRoundTrip_CreateThenRestore_PreservesAllFieldsAndDetectsMissing()
    {
        // Arrange: Create two projects that will be present
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string project1Id = project1.Guid.ToString();
        string project1Name = project1.Name;

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string project2Id = project2.Guid.ToString();
        string project2Name = project2.Name;

        var items = new List<TextCollectionItem>
        {
            new(project1Name, project1Id, 1.0),
            new(project2Name, project2Id, 1.2),
        };

        // Act: Create memento with full state
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: Memento captures all state
        Assert.That(memento.Items, Has.Count.EqualTo(2));
        Assert.That(memento.CurItem, Is.EqualTo(0));
        Assert.That(memento.SingleShown, Is.True);
        Assert.That(memento.MultiShown, Is.True);
        Assert.That(memento.ViewName, Is.EqualTo("Preview"));
        Assert.That(memento.SingleZoom, Is.EqualTo(100));
        Assert.That(memento.MultiZoom, Is.EqualTo(100));
        Assert.That(memento.SplitterProportion, Is.EqualTo(0.5).Within(0.01));
        Assert.That(memento.Reference, Is.EqualTo("MAT 1:1"));
        Assert.That(memento.ScrollGroup, Is.EqualTo(ScrollGroup.A));

        // Act: Restore from the same memento (all projects present)
        TextCollectionRestoreResult restoreResult =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: All projects restored, none missing
        Assert.That(restoreResult.RestoredItems, Has.Count.EqualTo(2));
        Assert.That(restoreResult.HasMissingProjects, Is.False);
        Assert.That(restoreResult.MissingProjectNames, Is.Empty);

        // Assert: Restored items preserve zoom and order
        Assert.That(restoreResult.RestoredItems[0].ScrTextId, Is.EqualTo(project1Id));
        Assert.That(restoreResult.RestoredItems[0].Zoom, Is.EqualTo(1.0));
        Assert.That(restoreResult.RestoredItems[1].ScrTextId, Is.EqualTo(project2Id));
        Assert.That(restoreResult.RestoredItems[1].Zoom, Is.EqualTo(1.2));
    }

    #endregion

    #region CreateMemento Tests -- BHV-600: Empty Memento Before Setup

    /// <summary>
    /// BHV-600: When setupComplete is false (e.g., crash recovery timer fires before
    /// TextCollectionControl is initialized), CreateMemento returns an empty memento
    /// without throwing any exception. Regression fix for FB30137.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BHV-600: Empty memento before setup complete prevents crash recovery exception")]
    public void CreateMemento_BeforeSetupComplete_ReturnsEmptyMemento()
    {
        // Arrange: setupComplete is false (crash recovery scenario)
        var items = new List<TextCollectionItem>
        {
            new("zzz3", "abc123", 1.0),
        };

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: false,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: Memento is empty (no items, default values)
        Assert.That(memento.Items, Is.Empty, "Items should be empty when setup not complete");
    }

    /// <summary>
    /// BHV-600 secondary: No exception is thrown when setupComplete is false,
    /// even when items and other parameters have valid values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BHV-600: No exception thrown when setup not complete")]
    public void CreateMemento_BeforeSetupComplete_DoesNotThrow()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("zzz3", "abc123", 1.0),
            new("NIV84", "def456", 1.2),
        };

        // Act & Assert: No exception
        Assert.DoesNotThrow(() =>
        {
            TextCollectionMementoService.CreateMemento(
                setupComplete: false,
                items: items,
                curItem: 0,
                singleShown: true,
                multiShown: true,
                viewName: "Preview",
                singleZoom: 100,
                multiZoom: 100,
                splitterProportion: 0.5,
                reference: "MAT 1:1",
                scrollGroup: ScrollGroup.A
            );
        });
    }

    #endregion

    #region CreateMemento Tests -- Full State Capture (TS-049)

    /// <summary>
    /// TS-049: When setupComplete is true, CreateMemento returns a fully populated
    /// memento containing all TC window state fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-502,BHV-503")]
    [Description("Full state capture: all fields present in memento")]
    public void CreateMemento_FullyInitialized_CapturesAllFields()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var items = new List<TextCollectionItem>
        {
            new(project1.Name, id1, 1.0),
            new(project2.Name, id2, 1.3),
        };

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 1,
            singleShown: false,
            multiShown: true,
            viewName: "Unformatted",
            singleZoom: 110,
            multiZoom: 80,
            splitterProportion: 0.7,
            reference: "GEN 3:15",
            scrollGroup: ScrollGroup.B
        );

        // Assert: All fields captured
        Assert.That(memento.Items, Has.Count.EqualTo(2), "Items count");
        Assert.That(memento.CurItem, Is.EqualTo(1), "CurItem");
        Assert.That(memento.SingleShown, Is.False, "SingleShown");
        Assert.That(memento.MultiShown, Is.True, "MultiShown");
        Assert.That(memento.ViewName, Is.EqualTo("Unformatted"), "ViewName");
        Assert.That(memento.SingleZoom, Is.EqualTo(110), "SingleZoom");
        Assert.That(memento.MultiZoom, Is.EqualTo(80), "MultiZoom");
        Assert.That(memento.SplitterProportion, Is.EqualTo(0.7).Within(0.01), "SplitterProportion");
        Assert.That(memento.Reference, Is.EqualTo("GEN 3:15"), "Reference");
        Assert.That(memento.ScrollGroup, Is.EqualTo(ScrollGroup.B), "ScrollGroup");
    }

    /// <summary>
    /// CreateMemento captures per-item state including name, ID, and zoom.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-503")]
    [Description("Item state preserved: name, ID, zoom for each item")]
    public void CreateMemento_WithItems_PreservesItemNameIdAndZoom()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        var items = new List<TextCollectionItem>
        {
            new(project1.Name, id1, 1.5),
        };

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: Item state captured
        Assert.That(memento.Items[0].ScrTextName, Is.EqualTo(project1.Name));
        Assert.That(memento.Items[0].ScrTextId, Is.EqualTo(id1));
        Assert.That(memento.Items[0].Zoom, Is.EqualTo(1.5));
    }

    /// <summary>
    /// CreateMemento with empty items list and setupComplete=true returns memento with empty items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-502")]
    [Description("Empty items list with setup complete produces valid memento")]
    public void CreateMemento_EmptyItemsAndSetupComplete_ReturnsValidMementoWithEmptyItems()
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: Valid memento with empty items
        Assert.That(memento.Items, Is.Empty);
        Assert.That(memento.Reference, Is.EqualTo("MAT 1:1"));
        Assert.That(memento.ScrollGroup, Is.EqualTo(ScrollGroup.A));
    }

    /// <summary>
    /// CreateMemento preserves the exact order of items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-503")]
    [Description("Item ordering preserved in memento")]
    public void CreateMemento_MultipleItems_PreservesItemOrder()
    {
        // Arrange
        DummyScrText proj1 = CreateDummyProject();
        ScrTextCollection.Add(proj1, true);
        DummyScrText proj2 = CreateDummyProject();
        ScrTextCollection.Add(proj2, true);
        DummyScrText proj3 = CreateDummyProject();
        ScrTextCollection.Add(proj3, true);

        var items = new List<TextCollectionItem>
        {
            new(proj1.Name, proj1.Guid.ToString(), 1.0),
            new(proj2.Name, proj2.Guid.ToString(), 1.1),
            new(proj3.Name, proj3.Guid.ToString(), 1.2),
        };

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: Order preserved
        Assert.That(memento.Items[0].ScrTextId, Is.EqualTo(proj1.Guid.ToString()));
        Assert.That(memento.Items[1].ScrTextId, Is.EqualTo(proj2.Guid.ToString()));
        Assert.That(memento.Items[2].ScrTextId, Is.EqualTo(proj3.Guid.ToString()));
    }

    /// <summary>
    /// CreateMemento works correctly with each ScrollGroup value.
    /// </summary>
    [TestCase(ScrollGroup.A)]
    [TestCase(ScrollGroup.B)]
    [TestCase(ScrollGroup.C)]
    [TestCase(ScrollGroup.D)]
    [TestCase(ScrollGroup.E)]
    [TestCase(ScrollGroup.None)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-503")]
    [Description("Each ScrollGroup value correctly captured in memento")]
    public void CreateMemento_EachScrollGroup_CapturedCorrectly(ScrollGroup group)
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: group
        );

        // Assert
        Assert.That(memento.ScrollGroup, Is.EqualTo(group));
    }

    /// <summary>
    /// CreateMemento works with each ViewMode string.
    /// </summary>
    [TestCase("Preview")]
    [TestCase("Unformatted")]
    [TestCase("Standard")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-503")]
    [Description("Each ViewMode correctly captured in memento")]
    public void CreateMemento_EachViewMode_CapturedCorrectly(string viewName)
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: viewName,
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert
        Assert.That(memento.ViewName, Is.EqualTo(viewName));
    }

    #endregion

    #region RestoreFromMemento Tests -- Happy Path (TS-050)

    /// <summary>
    /// TS-050: When all referenced projects exist, RestoreFromMemento resolves
    /// all items via FindById and returns them with no missing projects.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-103")]
    [Description("All projects present: full restoration with no missing")]
    public void RestoreFromMemento_AllProjectsPresent_RestoresSuccessfully()
    {
        // Arrange: Create projects that match the memento
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(project1.Name, id1, 1.0),
                new(project2.Name, id2, 1.5),
            },
            CurItem = 1,
            SingleShown = true,
            MultiShown = true,
            ViewName = "Preview",
            Reference = "JHN 3:16",
            ScrollGroup = ScrollGroup.A,
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert
        Assert.That(result.RestoredItems, Has.Count.EqualTo(2));
        Assert.That(result.HasMissingProjects, Is.False);
        Assert.That(result.MissingProjectNames, Is.Empty);
    }

    /// <summary>
    /// RestoreFromMemento preserves zoom values from the memento for each item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-103")]
    [Description("Zoom values preserved during restoration")]
    public void RestoreFromMemento_WithZoomValues_PreservesZoom()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(project1.Name, id1, 1.7),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert
        Assert.That(result.RestoredItems[0].Zoom, Is.EqualTo(1.7));
    }

    /// <summary>
    /// RestoreFromMemento maintains the original item order from the memento.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-503")]
    [Description("Item order from memento preserved in restored items")]
    public void RestoreFromMemento_MultipleItems_PreservesOriginalOrder()
    {
        // Arrange
        DummyScrText proj1 = CreateDummyProject();
        ScrTextCollection.Add(proj1, true);
        DummyScrText proj2 = CreateDummyProject();
        ScrTextCollection.Add(proj2, true);
        DummyScrText proj3 = CreateDummyProject();
        ScrTextCollection.Add(proj3, true);

        // Memento order: proj3, proj1, proj2 (intentionally different from add order)
        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(proj3.Name, proj3.Guid.ToString(), 1.0),
                new(proj1.Name, proj1.Guid.ToString(), 1.1),
                new(proj2.Name, proj2.Guid.ToString(), 1.2),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: Order matches memento, not add order
        Assert.That(result.RestoredItems[0].ScrTextId, Is.EqualTo(proj3.Guid.ToString()));
        Assert.That(result.RestoredItems[1].ScrTextId, Is.EqualTo(proj1.Guid.ToString()));
        Assert.That(result.RestoredItems[2].ScrTextId, Is.EqualTo(proj2.Guid.ToString()));
    }

    /// <summary>
    /// RestoreFromMemento includes the original memento in the result for state restoration.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-502")]
    [Description("Memento reference preserved in restore result")]
    public void RestoreFromMemento_IncludesMementoInResult()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(project1.Name, project1.Guid.ToString(), 1.0),
            },
            CurItem = 0,
            Reference = "REV 22:21",
            ScrollGroup = ScrollGroup.C,
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: Result contains the memento for state restoration
        Assert.That(result.Memento, Is.Not.Null);
        Assert.That(result.Memento!.Reference, Is.EqualTo("REV 22:21"));
        Assert.That(result.Memento.ScrollGroup, Is.EqualTo(ScrollGroup.C));
    }

    #endregion

    #region RestoreFromMemento Tests -- Missing Project Detection (TS-051)

    /// <summary>
    /// TS-051: When a memento references a project not in ScrTextCollection,
    /// the project is listed in missingProjectNames and hasMissingProjects is true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-516")]
    [Description("Missing project detected and reported in missingProjectNames")]
    public void RestoreFromMemento_MissingProject_ReportsMissingNames()
    {
        // Arrange: One project present, one missing
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        // "MissingProject" with a nonexistent GUID
        string missingId = "0000000000000000000000000000000000000000";

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(project1.Name, id1, 1.0),
                new("MissingProject", missingId, 1.0),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: Missing project detected
        Assert.That(result.HasMissingProjects, Is.True);
        Assert.That(result.MissingProjectNames, Does.Contain("MissingProject"));
        Assert.That(result.RestoredItems, Has.Count.EqualTo(1), "Only present project restored");
        Assert.That(result.RestoredItems[0].ScrTextId, Is.EqualTo(id1));
    }

    /// <summary>
    /// Multiple missing projects are all reported.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-516")]
    [Description("Multiple missing projects all listed in missingProjectNames")]
    public void RestoreFromMemento_MultipleMissingProjects_AllReported()
    {
        // Arrange: All projects missing
        string missingId1 = "0000000000000000000000000000000000000001";
        string missingId2 = "0000000000000000000000000000000000000002";
        string missingId3 = "0000000000000000000000000000000000000003";

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new("Missing1", missingId1, 1.0),
                new("Missing2", missingId2, 1.0),
                new("Missing3", missingId3, 1.0),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert
        Assert.That(result.HasMissingProjects, Is.True);
        Assert.That(result.MissingProjectNames, Has.Count.EqualTo(3));
        Assert.That(result.MissingProjectNames, Does.Contain("Missing1"));
        Assert.That(result.MissingProjectNames, Does.Contain("Missing2"));
        Assert.That(result.MissingProjectNames, Does.Contain("Missing3"));
        Assert.That(result.RestoredItems, Is.Empty);
    }

    /// <summary>
    /// RestoreFromMemento uses FindById(scrTextId) as primary lookup (BHV-103).
    /// When the project is found by ID, the resolved ScrText name is used
    /// (which may differ from the memento name if the project was renamed).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-103")]
    [Description("FindById is primary lookup; name from ScrText used in restored item")]
    public void RestoreFromMemento_ProjectFoundById_UsesResolvedName()
    {
        // Arrange: Project exists with a GUID; memento has a different name
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();
        string actualName = project.Name;

        // Memento has "OldName" but the same GUID
        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new("OldName", projectId, 1.0),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: Resolved via GUID; restored item uses actual ScrText name
        Assert.That(result.RestoredItems, Has.Count.EqualTo(1));
        Assert.That(result.RestoredItems[0].ScrTextName, Is.EqualTo(actualName));
        Assert.That(result.HasMissingProjects, Is.False);
    }

    /// <summary>
    /// RestoreFromMemento falls back to Find(scrTextName) when FindById returns null
    /// (e.g., old mementos without GUID, or GUID format mismatch). BHV-103 fallback.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-103")]
    [Description("Name fallback when GUID lookup fails")]
    public void RestoreFromMemento_GuidLookupFails_FallsBackToNameLookup()
    {
        // Arrange: Project exists, but memento has invalid GUID
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectName = project.Name;

        // Invalid GUID that won't match, but name will match
        string invalidId = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(projectName, invalidId, 1.0),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: Found by name fallback
        Assert.That(result.RestoredItems, Has.Count.EqualTo(1));
        Assert.That(result.RestoredItems[0].ScrTextName, Is.EqualTo(projectName));
        Assert.That(result.HasMissingProjects, Is.False);
    }

    #endregion

    #region RestoreFromMemento Tests -- Error Cases

    /// <summary>
    /// RestoreFromMemento with null memento throws or returns error.
    /// Per data-contracts.md M-009: null memento yields INVALID_STATE error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-502")]
    [Description("Null memento throws ArgumentNullException")]
    public void RestoreFromMemento_NullMemento_ThrowsArgumentNullException()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(
            () => TextCollectionMementoService.RestoreFromMemento(null!)
        );
    }

    /// <summary>
    /// RestoreFromMemento with empty memento (no items) returns empty result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty memento (from BHV-600) restores to empty result")]
    public void RestoreFromMemento_EmptyMemento_ReturnsEmptyResult()
    {
        // Arrange: Empty memento (as produced by BHV-600)
        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>(),
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert
        Assert.That(result.RestoredItems, Is.Empty);
        Assert.That(result.HasMissingProjects, Is.False);
        Assert.That(result.MissingProjectNames, Is.Empty);
    }

    #endregion

    #region Golden Master Tests -- gm-005

    /// <summary>
    /// gm-005 test case "before-setup-complete": CreateMemento returns empty memento
    /// without exception when setupComplete is false.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-600")]
    [Description("gm-005: before-setup-complete returns empty memento")]
    public void GoldenMaster_BeforeSetupComplete_EmptyMemento()
    {
        // Arrange: gm-005 input "before-setup-complete"
        var items = new List<TextCollectionItem>();

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: false,
            items: items,
            curItem: 0,
            singleShown: false,
            multiShown: false,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "",
            scrollGroup: ScrollGroup.A
        );

        // Assert: gm-005 expected "beforeSetupComplete"
        Assert.That(memento.Items, Is.Empty, "gm-005: mementoEmpty should be true");
    }

    /// <summary>
    /// gm-005 test case "full-state-capture": CreateMemento captures all state fields
    /// matching the expected output structure.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-502,BHV-503")]
    [Description("gm-005: full-state-capture with all memento fields")]
    public void GoldenMaster_FullStateCapture_AllFieldsMatch()
    {
        // Arrange: gm-005 input "full-state-capture"
        DummyScrText zzz3 = CreateDummyProject();
        ScrTextCollection.Add(zzz3, true);
        DummyScrText niv84 = CreateDummyProject();
        ScrTextCollection.Add(niv84, true);

        var items = new List<TextCollectionItem>
        {
            new(zzz3.Name, zzz3.Guid.ToString(), 1.0),
            new(niv84.Name, niv84.Guid.ToString(), 1.2),
        };

        // Act
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Assert: gm-005 expected "fullStateCapture.mementoFields"
        Assert.That(memento.Items, Has.Count.EqualTo(2), "Items count matches");
        Assert.That(memento.CurItem, Is.EqualTo(0), "CurItem matches");
        Assert.That(memento.SingleShown, Is.True, "SingleShown matches");
        Assert.That(memento.MultiShown, Is.True, "MultiShown matches");
        Assert.That(memento.ViewName, Is.EqualTo("Preview"), "ViewName matches");
        Assert.That(memento.SingleZoom, Is.EqualTo(100), "SingleZoom matches");
        Assert.That(memento.MultiZoom, Is.EqualTo(100), "MultiZoom matches");
        Assert.That(
            memento.SplitterProportion,
            Is.EqualTo(0.5).Within(0.01),
            "SplitterProportion matches with tolerance"
        );
        Assert.That(memento.Reference, Is.EqualTo("MAT 1:1"), "Reference matches");
        Assert.That(memento.ScrollGroup, Is.EqualTo(ScrollGroup.A), "ScrollGroup matches");

        // Verify item zoom values
        Assert.That(memento.Items[0].Zoom, Is.EqualTo(1.0));
        Assert.That(memento.Items[1].Zoom, Is.EqualTo(1.2));
    }

    /// <summary>
    /// gm-005 test case "restore-with-missing-project": RestoreFromMemento detects
    /// the missing project and reports it, while restoring available ones.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-516")]
    [Description("gm-005: restore-with-missing-project detects missing and restores available")]
    public void GoldenMaster_RestoreWithMissingProject_DetectsMissingAndRestoresAvailable()
    {
        // Arrange: gm-005 input "restore-with-missing-project"
        DummyScrText zzz3 = CreateDummyProject();
        ScrTextCollection.Add(zzz3, true);
        DummyScrText niv84 = CreateDummyProject();
        ScrTextCollection.Add(niv84, true);

        // "MissingProject" is not in ScrTextCollection
        string missingId = "0000000000000000000000000000000000000000";

        var memento = new TextCollectionMemento
        {
            Items = new List<TextCollectionItemState>
            {
                new(zzz3.Name, zzz3.Guid.ToString(), 1.0),
                new("MissingProject", missingId, 1.0),
                new(niv84.Name, niv84.Guid.ToString(), 1.0),
            },
        };

        // Act
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: gm-005 expected "restoreWithMissingProject"
        Assert.That(
            result.MissingProjectNames,
            Does.Contain("MissingProject"),
            "Missing project detected"
        );
        Assert.That(result.HasMissingProjects, Is.True, "hasMissingProjects is true");
        Assert.That(result.RestoredItems, Has.Count.EqualTo(2), "Available texts restored");

        // Assert: Available texts restored in correct order (zzz3, niv84)
        Assert.That(result.RestoredItems[0].ScrTextId, Is.EqualTo(zzz3.Guid.ToString()));
        Assert.That(result.RestoredItems[1].ScrTextId, Is.EqualTo(niv84.Guid.ToString()));
    }

    #endregion

    #region Round-Trip Tests

    /// <summary>
    /// Full round-trip: create memento then restore, all fields preserved
    /// including per-item zoom and pane state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("ScenarioId", "TS-049,TS-050")]
    [Property("BehaviorId", "BHV-502,BHV-503")]
    [Description("Round-trip: create then restore preserves all state")]
    public void RoundTrip_CreateThenRestore_PreservesAllState()
    {
        // Arrange
        DummyScrText proj1 = CreateDummyProject();
        ScrTextCollection.Add(proj1, true);
        DummyScrText proj2 = CreateDummyProject();
        ScrTextCollection.Add(proj2, true);

        var items = new List<TextCollectionItem>
        {
            new(proj1.Name, proj1.Guid.ToString(), 1.3),
            new(proj2.Name, proj2.Guid.ToString(), 0.8),
        };

        // Act: Create memento
        TextCollectionMemento memento = TextCollectionMementoService.CreateMemento(
            setupComplete: true,
            items: items,
            curItem: 1,
            singleShown: false,
            multiShown: true,
            viewName: "Standard",
            singleZoom: 150,
            multiZoom: 80,
            splitterProportion: 0.3,
            reference: "PSA 119:105",
            scrollGroup: ScrollGroup.D
        );

        // Act: Restore from memento
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(memento);

        // Assert: All items restored with correct zoom
        Assert.That(result.RestoredItems, Has.Count.EqualTo(2));
        Assert.That(result.RestoredItems[0].Zoom, Is.EqualTo(1.3));
        Assert.That(result.RestoredItems[1].Zoom, Is.EqualTo(0.8));

        // Assert: Memento in result preserves pane state
        Assert.That(result.Memento, Is.Not.Null);
        Assert.That(result.Memento!.CurItem, Is.EqualTo(1));
        Assert.That(result.Memento.SingleShown, Is.False);
        Assert.That(result.Memento.MultiShown, Is.True);
        Assert.That(result.Memento.ViewName, Is.EqualTo("Standard"));
        Assert.That(result.Memento.SingleZoom, Is.EqualTo(150));
        Assert.That(result.Memento.MultiZoom, Is.EqualTo(80));
        Assert.That(result.Memento.SplitterProportion, Is.EqualTo(0.3).Within(0.01));
        Assert.That(result.Memento.Reference, Is.EqualTo("PSA 119:105"));
        Assert.That(result.Memento.ScrollGroup, Is.EqualTo(ScrollGroup.D));
    }

    /// <summary>
    /// Round-trip with empty memento (BHV-600): create with setupComplete=false,
    /// then restore, yields empty result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-048,TS-050")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Round-trip: BHV-600 empty memento restores to empty")]
    public void RoundTrip_EmptyMementoFromBhv600_RestoresToEmpty()
    {
        // Arrange
        DummyScrText proj = CreateDummyProject();
        ScrTextCollection.Add(proj, true);

        var items = new List<TextCollectionItem>
        {
            new(proj.Name, proj.Guid.ToString(), 1.0),
        };

        // Act: Create empty memento (BHV-600)
        TextCollectionMemento emptyMemento = TextCollectionMementoService.CreateMemento(
            setupComplete: false,
            items: items,
            curItem: 0,
            singleShown: true,
            multiShown: true,
            viewName: "Preview",
            singleZoom: 100,
            multiZoom: 100,
            splitterProportion: 0.5,
            reference: "MAT 1:1",
            scrollGroup: ScrollGroup.A
        );

        // Act: Restore from empty memento
        TextCollectionRestoreResult result =
            TextCollectionMementoService.RestoreFromMemento(emptyMemento);

        // Assert: Empty result
        Assert.That(result.RestoredItems, Is.Empty);
        Assert.That(result.HasMissingProjects, Is.False);
    }

    #endregion
}
