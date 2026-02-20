// === TEST FILE: CAP-016 GetSavedCollectionsResolved ===
// TDD Phase: RED (tests should fail -- GetSavedCollections not yet implemented)
// Capability: CAP-016 (GetSavedCollectionsResolved)
// Micro-Phase: BE-5 (Domain: Saved Collections)
// Sources: EXT-004 (PT9/Paratext/TextCollectionForm.cs:525-549)
// Golden Master: gm-008 (resolved saved collections with unresolved names)
// Contract: M-018 (GetSavedCollections)
// Dependencies: CAP-014 (SavedCollectionsCRUD -- reads raw saved lists)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for SavedCollectionService.GetSavedCollections (CAP-016):
///   - Resolves saved text collection names to ScrText project references
///   - Names resolved via ScrTextCollection.Get produce TextCollectionItems
///   - Names that cannot be resolved (IsPresent returns false) go to unresolvedNames
///   - Non-present projects are skipped from items list
///
/// This capability is a resolution layer over CAP-014's GetSavedLists. It reads
/// the raw saved lists (SavedScrTextList) and resolves each text name to an actual
/// project reference, producing SavedTextCollection records.
///
/// Source: EXT-004 (PT9/Paratext/TextCollectionForm.cs:525-549)
/// Behavior: BHV-T012 (saved collection preserves texts and order)
/// Contract: M-018 (GetSavedCollections)
/// Precondition: INV-001 (ScrTextCollection initialized)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SavedCollectionResolvedTests : PapiTestBase
{
    private SavedCollectionService _service = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _service = new SavedCollectionService();
    }

    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Full resolution round-trip for saved text collections.
    ///
    /// 1. Register several projects in ScrTextCollection (simulating installed projects)
    /// 2. Save a named collection via SaveList with project names + a missing project name
    /// 3. Call GetSavedCollections to resolve names
    /// 4. Verify resolved Items contain TextCollectionItems for present projects
    /// 5. Verify unresolvedNames contains the missing project name
    ///
    /// This is the "done signal" for CAP-016. When this passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_FullResolutionRoundTrip_ResolvesAndReportsUnresolved()
    {
        // Arrange: Create and register two projects in ScrTextCollection
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string name1 = project1.Name;
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string name2 = project2.Name;
        string id2 = project2.Guid.ToString();

        // Save a collection with two present projects and one missing
        string missingName = "MISSING_PROJECT_XYZ";
        _service.SaveList(
            "My Study Collection",
            new List<string> { name1, missingName, name2 },
            -1,
            -1
        );

        // Act: Resolve the saved collections
        IList<SavedTextCollection> resolved = _service.GetSavedCollections();

        // Assert 1: One resolved collection returned
        Assert.That(resolved, Has.Count.EqualTo(1));
        Assert.That(resolved[0].Name, Is.EqualTo("My Study Collection"));

        // Assert 2: Items contains only the two present projects as TextCollectionItems
        Assert.That(resolved[0].Items, Has.Count.EqualTo(2));
        Assert.That(
            resolved[0].Items.Select(i => i.ScrTextName).ToList(),
            Is.EquivalentTo(new List<string> { name1, name2 })
        );

        // Assert 3: Each resolved item has a valid ScrTextId (GUID)
        Assert.That(
            resolved[0].Items.Any(i => i.ScrTextId == id1),
            Is.True,
            "First project should be resolved with its GUID"
        );
        Assert.That(
            resolved[0].Items.Any(i => i.ScrTextId == id2),
            Is.True,
            "Second project should be resolved with its GUID"
        );

        // Assert 4: Missing project is listed in unresolvedNames
        Assert.That(resolved[0].UnresolvedNames, Has.Count.EqualTo(1));
        Assert.That(resolved[0].UnresolvedNames[0], Is.EqualTo(missingName));
    }

    #endregion

    #region Contract Tests - GetSavedCollections (M-018)

    /// <summary>
    /// GetSavedCollections returns empty list when no saved lists exist.
    /// No saved lists means no resolution to perform.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_NoSavedLists_ReturnsEmptyList()
    {
        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// GetSavedCollections resolves all names when all projects are present.
    /// Every text name in the saved list maps to a TextCollectionItem; unresolvedNames is empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_AllNamesPresent_ReturnsAllItemsNoUnresolved()
    {
        // Arrange: Register projects
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);

        // Save a collection with all present names
        _service.SaveList(
            "All Present",
            new List<string> { projectA.Name, projectB.Name, projectC.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Name, Is.EqualTo("All Present"));
        Assert.That(result[0].Items, Has.Count.EqualTo(3));
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(0));

        // Verify each item has correct ScrTextName
        var resolvedNames = result[0].Items.Select(i => i.ScrTextName).ToList();
        Assert.That(resolvedNames, Does.Contain(projectA.Name));
        Assert.That(resolvedNames, Does.Contain(projectB.Name));
        Assert.That(resolvedNames, Does.Contain(projectC.Name));
    }

    /// <summary>
    /// GetSavedCollections reports all names as unresolved when no projects are present.
    /// Items list is empty; all names go to unresolvedNames.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_NoNamesPresent_ReturnsEmptyItemsAllUnresolved()
    {
        // Arrange: Save a collection with names that don't match any registered project
        _service.SaveList(
            "All Missing",
            new List<string> { "NONEXISTENT_A", "NONEXISTENT_B", "NONEXISTENT_C" },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Name, Is.EqualTo("All Missing"));
        Assert.That(result[0].Items, Has.Count.EqualTo(0));
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(3));
        Assert.That(
            result[0].UnresolvedNames,
            Is.EquivalentTo(
                new List<string> { "NONEXISTENT_A", "NONEXISTENT_B", "NONEXISTENT_C" }
            )
        );
    }

    /// <summary>
    /// GetSavedCollections partially resolves: some names present, some missing.
    /// Present names become Items; missing names go to unresolvedNames.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_MixedPresence_ResolvesPresent_ReportsUnresolved()
    {
        // Arrange: One present, one missing
        DummyScrText present = CreateDummyProject();
        ScrTextCollection.Add(present, true);

        _service.SaveList(
            "Mixed Collection",
            new List<string> { present.Name, "DOES_NOT_EXIST" },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(result[0].Items[0].ScrTextName, Is.EqualTo(present.Name));
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(1));
        Assert.That(result[0].UnresolvedNames[0], Is.EqualTo("DOES_NOT_EXIST"));
    }

    /// <summary>
    /// GetSavedCollections resolves multiple saved lists independently.
    /// Each saved list produces its own SavedTextCollection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_MultipleSavedLists_EachResolvedIndependently()
    {
        // Arrange: Register projects
        DummyScrText projectX = CreateDummyProject();
        ScrTextCollection.Add(projectX, true);
        DummyScrText projectY = CreateDummyProject();
        ScrTextCollection.Add(projectY, true);

        // Save two collections with different content
        _service.SaveList(
            "Collection A",
            new List<string> { projectX.Name, "MISSING_1" },
            -1,
            -1
        );
        _service.SaveList(
            "Collection B",
            new List<string> { projectY.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert: Two resolved collections
        Assert.That(result, Has.Count.EqualTo(2));

        var collectionA = result.FirstOrDefault(c => c.Name == "Collection A");
        var collectionB = result.FirstOrDefault(c => c.Name == "Collection B");

        Assert.That(collectionA, Is.Not.Null, "Collection A should be in results");
        Assert.That(collectionB, Is.Not.Null, "Collection B should be in results");

        // Collection A: one resolved, one unresolved
        Assert.That(collectionA!.Items, Has.Count.EqualTo(1));
        Assert.That(collectionA.Items[0].ScrTextName, Is.EqualTo(projectX.Name));
        Assert.That(collectionA.UnresolvedNames, Has.Count.EqualTo(1));
        Assert.That(collectionA.UnresolvedNames[0], Is.EqualTo("MISSING_1"));

        // Collection B: fully resolved
        Assert.That(collectionB!.Items, Has.Count.EqualTo(1));
        Assert.That(collectionB.Items[0].ScrTextName, Is.EqualTo(projectY.Name));
        Assert.That(collectionB.UnresolvedNames, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// GetSavedCollections preserves the Name from the original SavedScrTextList.
    /// The resolved collection's Name matches the saved list's Name exactly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_PreservesCollectionName()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        _service.SaveList(
            "Study Resources 2025",
            new List<string> { project.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Name,
            Is.EqualTo("Study Resources 2025"),
            "Resolved collection name must match saved list name"
        );
    }

    /// <summary>
    /// GetSavedCollections produces TextCollectionItems with correct ScrTextId (GUID).
    /// The ScrTextId must match the Guid of the resolved ScrText.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_ResolvedItems_HaveCorrectScrTextId()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string expectedGuid = project.Guid.ToString();

        _service.SaveList(
            "GUID Check",
            new List<string> { project.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Items[0].ScrTextId,
            Is.EqualTo(expectedGuid),
            "Resolved item ScrTextId must match the project's Guid"
        );
    }

    /// <summary>
    /// GetSavedCollections produces TextCollectionItems with correct ScrTextName.
    /// The ScrTextName must match the Name of the resolved ScrText.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_ResolvedItems_HaveCorrectScrTextName()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        _service.SaveList(
            "Name Check",
            new List<string> { project.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Items[0].ScrTextName,
            Is.EqualTo(project.Name),
            "Resolved item ScrTextName must match the project's Name"
        );
    }

    /// <summary>
    /// GetSavedCollections produces TextCollectionItems with default zoom 1.0.
    /// Saved lists do not store zoom; resolved items should default to 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_ResolvedItems_HaveDefaultZoom()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        _service.SaveList(
            "Zoom Check",
            new List<string> { project.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Items[0].Zoom,
            Is.EqualTo(1.0),
            "Resolved items should have default zoom of 1.0"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// GetSavedCollections with a saved list containing a single text name that resolves.
    /// Minimum viable resolution: one name, one resolved item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_SingleTextName_ResolvesCorrectly()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        _service.SaveList(
            "Single Item",
            new List<string> { project.Name },
            -1,
            0
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// GetSavedCollections with a saved list containing only unresolvable names.
    /// Items should be empty; all names in unresolvedNames.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_AllUnresolvable_ItemsEmpty()
    {
        // Arrange: Save with names that cannot possibly resolve
        _service.SaveList(
            "Ghost Collection",
            new List<string> { "PHANTOM_A", "PHANTOM_B" },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(0));
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// GetSavedCollections reflects dynamic changes: after saving, adding, and re-resolving,
    /// previously unresolved names can become resolved if the project appears.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_AfterProjectAdded_PreviouslyUnresolvedBecomeResolved()
    {
        // Arrange: Create but don't register project yet
        DummyScrText project = CreateDummyProject();
        string projectName = project.Name;

        _service.SaveList(
            "Deferred Resolution",
            new List<string> { projectName },
            -1,
            -1
        );

        // Act 1: Resolve before project is registered
        IList<SavedTextCollection> before = _service.GetSavedCollections();
        Assert.That(before[0].Items, Has.Count.EqualTo(0), "Should have no resolved items yet");
        Assert.That(
            before[0].UnresolvedNames,
            Has.Count.EqualTo(1),
            "Project name should be unresolved"
        );

        // Now register the project
        ScrTextCollection.Add(project, true);

        // Act 2: Resolve again -- now the name should resolve
        IList<SavedTextCollection> after = _service.GetSavedCollections();
        Assert.That(
            after[0].Items,
            Has.Count.EqualTo(1),
            "After registration, the project should resolve"
        );
        Assert.That(after[0].Items[0].ScrTextName, Is.EqualTo(projectName));
        Assert.That(
            after[0].UnresolvedNames,
            Has.Count.EqualTo(0),
            "No unresolved names after project is available"
        );
    }

    /// <summary>
    /// GetSavedCollections maintains resolved item order matching the saved list order.
    /// Resolved items appear in the same order as the saved text names.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_ResolvedOrder_MatchesSavedListOrder()
    {
        // Arrange: Register three projects
        DummyScrText first = CreateDummyProject();
        ScrTextCollection.Add(first, true);
        DummyScrText second = CreateDummyProject();
        ScrTextCollection.Add(second, true);
        DummyScrText third = CreateDummyProject();
        ScrTextCollection.Add(third, true);

        // Save in a specific order
        _service.SaveList(
            "Ordered",
            new List<string> { third.Name, first.Name, second.Name },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert: Order of resolved items matches saved list order
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(3));
        Assert.That(result[0].Items[0].ScrTextName, Is.EqualTo(third.Name));
        Assert.That(result[0].Items[1].ScrTextName, Is.EqualTo(first.Name));
        Assert.That(result[0].Items[2].ScrTextName, Is.EqualTo(second.Name));
    }

    /// <summary>
    /// GetSavedCollections with mixed present and missing names preserves order
    /// of resolved items relative to their position in the saved list.
    /// Unresolved names are skipped (not included in Items).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void GetSavedCollections_MixedPresence_ResolvedItemsPreserveRelativeOrder()
    {
        // Arrange: Register two projects
        DummyScrText projA = CreateDummyProject();
        ScrTextCollection.Add(projA, true);
        DummyScrText projB = CreateDummyProject();
        ScrTextCollection.Add(projB, true);

        // Save with missing names interspersed
        _service.SaveList(
            "Sparse",
            new List<string>
            {
                projA.Name,
                "MISSING_1",
                projB.Name,
                "MISSING_2",
            },
            -1,
            -1
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert: Only present projects in items, in saved-list order
        Assert.That(result[0].Items, Has.Count.EqualTo(2));
        Assert.That(result[0].Items[0].ScrTextName, Is.EqualTo(projA.Name));
        Assert.That(result[0].Items[1].ScrTextName, Is.EqualTo(projB.Name));

        // Unresolved names collected
        Assert.That(result[0].UnresolvedNames, Has.Count.EqualTo(2));
        Assert.That(result[0].UnresolvedNames, Does.Contain("MISSING_1"));
        Assert.That(result[0].UnresolvedNames, Does.Contain("MISSING_2"));
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-001: ScrTextCollection must be initialized before GetSavedCollections works.
    /// When projects are registered (via PapiTestBase setup), the service can resolve them.
    /// This test verifies the positive case: resolution succeeds when ScrTextCollection
    /// is initialized (which PapiTestBase handles).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-016")]
    [Property("InvariantId", "INV-001")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    public void INV001_WithInitializedScrTextCollection_ResolutionSucceeds()
    {
        // Arrange: PapiTestBase ensures ScrTextCollection is initialized
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        _service.SaveList(
            "Init Verify",
            new List<string> { project.Name },
            -1,
            -1
        );

        // Act: Should succeed because ScrTextCollection is initialized
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert: Resolution works
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Items, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Items[0].ScrTextName,
            Is.EqualTo(project.Name),
            "INV-001: Resolution requires initialized ScrTextCollection"
        );
    }

    /// <summary>
    /// Save-resolve round-trip: the resolved collection Name, Items (ScrTextName + ScrTextId),
    /// and UnresolvedNames are all consistent with the original saved list.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-016")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-T012")]
    [Property("ExtractionId", "EXT-004")]
    public void SaveAndResolve_RoundTrip_AllFieldsConsistent()
    {
        // Arrange: Register two projects
        DummyScrText p1 = CreateDummyProject();
        ScrTextCollection.Add(p1, true);
        DummyScrText p2 = CreateDummyProject();
        ScrTextCollection.Add(p2, true);

        string missing = "ROUND_TRIP_MISSING";

        _service.SaveList(
            "Round Trip",
            new List<string> { p1.Name, missing, p2.Name },
            1,
            0
        );

        // Act
        IList<SavedTextCollection> result = _service.GetSavedCollections();

        // Assert: Full field consistency
        Assert.That(result, Has.Count.EqualTo(1));
        SavedTextCollection resolved = result[0];

        // Name preserved
        Assert.That(resolved.Name, Is.EqualTo("Round Trip"));

        // Items contain only present projects
        Assert.That(resolved.Items, Has.Count.EqualTo(2));
        Assert.That(resolved.Items[0].ScrTextName, Is.EqualTo(p1.Name));
        Assert.That(resolved.Items[0].ScrTextId, Is.EqualTo(p1.Guid.ToString()));
        Assert.That(resolved.Items[1].ScrTextName, Is.EqualTo(p2.Name));
        Assert.That(resolved.Items[1].ScrTextId, Is.EqualTo(p2.Guid.ToString()));

        // Unresolved contains only the missing name
        Assert.That(resolved.UnresolvedNames, Has.Count.EqualTo(1));
        Assert.That(resolved.UnresolvedNames[0], Is.EqualTo(missing));

        // Total coverage: items + unresolved equals original text names count
        Assert.That(
            resolved.Items.Count + resolved.UnresolvedNames.Count,
            Is.EqualTo(3),
            "Total of resolved + unresolved must equal the original saved list size"
        );
    }

    #endregion
}
