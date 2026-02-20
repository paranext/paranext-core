// === TEST FILE: CAP-014 SavedCollectionsCRUD ===
// TDD Phase: RED (tests should fail -- implementation does not exist yet)
// Capability: CAP-014 (SavedCollectionsCRUD)
// Micro-Phase: BE-5 (Domain: Saved Collections)
// Sources: EXT-010 (PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:440-561)
// Golden Masters: gm-008 (CRUD operations), gm-014 (required-item positional index preservation)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for SavedCollectionService (CAP-014):
///   - GetSavedLists: Read all persisted saved text collection lists
///   - SaveList: Save or overwrite a named collection with ordered texts and indices
///   - DeleteList: Remove a named collection from persistence
///   - Exists: Check if a collection name is already used
///
/// SavedCollectionsCRUD provides CRUD operations for saved text collections used
/// by the "Open text collection" dialog. Collections are ordered lists of project
/// short names with positional tracking of HEB/GRK (HebGrkIndex) and the associated
/// scripture project (ScrProjectIndex).
///
/// Source: EXT-010 (PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:440-561)
/// Behavior: BHV-T012 (saved collection preserves texts and order)
/// Invariant boundary: INV-012 (asymmetric sharing -- GetSavedLists returns only TC lists)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SavedCollectionServiceTests
{
    private SavedCollectionService _service = null!;

    [SetUp]
    public void SetUp()
    {
        // Create a fresh service instance for each test.
        // The implementer will determine persistence mechanism (JSON file, in-memory, etc.)
        _service = new SavedCollectionService();
    }

    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Full CRUD round-trip for saved text collections.
    /// Save a named collection, retrieve it, verify contents including order and
    /// positional indices, then delete it and verify removal.
    ///
    /// This is the "done signal" for CAP-014. When this passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008,gm-014")]
    [Property(
        "ScenarioId",
        "TS-063,TS-064,TS-065,TS-066"
    )]
    [Property("BehaviorId", "BHV-T012")]
    public void SavedCollections_FullCrudRoundTrip_SaveRetrieveDeleteSucceeds()
    {
        // Arrange: Define a named collection with ordered texts and positional indices
        string collectionName = "My Study Collection";
        var textNames = new List<string> { "NIV84", "ESV", "HEB/GRK", "KJV" };
        int hebGrkIndex = 2; // HEB/GRK is at position 2
        int scrProjectIndex = 0; // NIV84 is the associated scripture project

        // Act 1: Save the collection
        _service.SaveList(collectionName, textNames, hebGrkIndex, scrProjectIndex);

        // Assert 1: Collection is retrievable
        IList<SavedScrTextList> savedLists = _service.GetSavedLists();
        Assert.That(savedLists, Has.Count.EqualTo(1));
        Assert.That(savedLists[0].Name, Is.EqualTo(collectionName));

        // Assert 2: Texts are in the exact saved order (BHV-T012)
        Assert.That(savedLists[0].TextNames, Is.EqualTo(textNames));

        // Assert 3: Positional indices are preserved (gm-014)
        Assert.That(savedLists[0].HebGrkIndex, Is.EqualTo(hebGrkIndex));
        Assert.That(savedLists[0].ScrProjectIndex, Is.EqualTo(scrProjectIndex));

        // Act 2: Delete the collection
        _service.DeleteList(collectionName);

        // Assert 4: Collection is removed
        IList<SavedScrTextList> afterDelete = _service.GetSavedLists();
        Assert.That(afterDelete, Has.Count.EqualTo(0));
    }

    #endregion

    #region Contract Tests - GetSavedLists (M-015)

    /// <summary>
    /// GetSavedLists returns an empty list when no collections have been saved.
    /// This is the initial state before any SaveList calls.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-064")]
    [Property("BehaviorId", "BHV-T012")]
    public void GetSavedLists_WhenNoCollectionsSaved_ReturnsEmptyList()
    {
        // Act
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// GetSavedLists returns all persisted collections after multiple saves.
    /// Each collection should retain its name, texts, and indices.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-063,TS-064")]
    [Property("BehaviorId", "BHV-T012")]
    public void GetSavedLists_AfterMultipleSaves_ReturnsAllCollections()
    {
        // Arrange: Save two different collections
        _service.SaveList(
            "Collection A",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );
        _service.SaveList(
            "Collection B",
            new List<string> { "KJV", "NASB", "NRSV" },
            -1,
            0
        );

        // Act
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert: Both collections are present
        Assert.That(result, Has.Count.EqualTo(2));

        var names = result.Select(r => r.Name).ToList();
        Assert.That(names, Does.Contain("Collection A"));
        Assert.That(names, Does.Contain("Collection B"));
    }

    /// <summary>
    /// GetSavedLists returns collections with correct text order preserved.
    /// Order is critical for TC display (BHV-T012: saved collection preserves texts and order).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-064")]
    [Property("BehaviorId", "BHV-T012")]
    public void GetSavedLists_TextOrder_IsPreservedExactly()
    {
        // Arrange: Save with specific order
        var orderedTexts = new List<string> { "KJV", "NIV84", "ESV", "NASB" };
        _service.SaveList("Ordered Collection", orderedTexts, -1, -1);

        // Act
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert: Order matches exactly
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].TextNames, Is.EqualTo(orderedTexts));
    }

    /// <summary>
    /// GetSavedLists preserves HebGrkIndex and ScrProjectIndex (gm-014).
    /// These positional indices track required items for the selection dialog.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void GetSavedLists_PositionalIndices_ArePreserved()
    {
        // Arrange: Save with specific positional indices
        _service.SaveList(
            "With Indices",
            new List<string> { "NIV84", "HEB/GRK", "ESV" },
            1, // HEB/GRK at index 1
            0 // NIV84 is associated scripture project
        );

        // Act
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].HebGrkIndex,
            Is.EqualTo(1),
            "HebGrkIndex should be preserved"
        );
        Assert.That(
            result[0].ScrProjectIndex,
            Is.EqualTo(0),
            "ScrProjectIndex should be preserved"
        );
    }

    /// <summary>
    /// GetSavedLists returns -1 for HebGrkIndex and ScrProjectIndex when
    /// no required items are present in the collection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void GetSavedLists_NoRequiredItems_IndicesAreNegativeOne()
    {
        // Arrange: Save without required items (both indices -1)
        _service.SaveList(
            "No Required",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );

        // Act
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].HebGrkIndex, Is.EqualTo(-1));
        Assert.That(result[0].ScrProjectIndex, Is.EqualTo(-1));
    }

    #endregion

    #region Contract Tests - SaveList (M-016)

    /// <summary>
    /// SaveList persists a new named collection that is retrievable by GetSavedLists.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_NewCollection_IsPersisted()
    {
        // Arrange
        string name = "Fresh Collection";
        var texts = new List<string> { "NIV84", "ESV", "KJV" };

        // Act
        _service.SaveList(name, texts, -1, -1);

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Name, Is.EqualTo(name));
        Assert.That(result[0].TextNames, Is.EqualTo(texts));
    }

    /// <summary>
    /// SaveList with an existing name overwrites the previous collection.
    /// TS-066: Save duplicate name replaces existing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_ExistingName_OverwritesPreviousCollection()
    {
        // Arrange: Save initial collection
        string name = "My Collection";
        _service.SaveList(
            name,
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );

        // Act: Overwrite with new texts
        var newTexts = new List<string> { "KJV", "NASB", "NRSV" };
        _service.SaveList(name, newTexts, -1, 0);

        // Assert: Only one collection with updated texts
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Name, Is.EqualTo(name));
        Assert.That(result[0].TextNames, Is.EqualTo(newTexts));
        Assert.That(result[0].ScrProjectIndex, Is.EqualTo(0));
    }

    /// <summary>
    /// SaveList with empty name should throw or reject.
    /// Precondition: name must be non-empty (M-016).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_EmptyName_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () =>
                _service.SaveList(
                    "",
                    new List<string> { "NIV84" },
                    -1,
                    -1
                ),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// SaveList with null name should throw.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_NullName_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () =>
                _service.SaveList(
                    null!,
                    new List<string> { "NIV84" },
                    -1,
                    -1
                ),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// SaveList with empty textNames should throw or reject.
    /// Precondition: textNames must be non-empty (M-016).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_EmptyTextNames_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () =>
                _service.SaveList(
                    "Valid Name",
                    new List<string>(),
                    -1,
                    -1
                ),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// SaveList with null textNames should throw.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_NullTextNames_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () => _service.SaveList("Valid Name", null!, -1, -1),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// SaveList preserves text names including joined text entries like "HEB/GRK".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_WithJoinedTextName_PreservesNameExactly()
    {
        // Arrange
        var texts = new List<string> { "NIV84", "HEB/GRK", "ESV" };

        // Act
        _service.SaveList("With Joined", texts, 1, 0);

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].TextNames[1], Is.EqualTo("HEB/GRK"));
    }

    /// <summary>
    /// Multiple distinct saves produce distinct retrievable collections.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_MultipleDifferentNames_AllPersisted()
    {
        // Arrange & Act: Save three collections
        _service.SaveList(
            "Alpha",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );
        _service.SaveList(
            "Beta",
            new List<string> { "KJV", "NASB" },
            -1,
            -1
        );
        _service.SaveList(
            "Gamma",
            new List<string> { "NRSV", "NIV84", "KJV" },
            -1,
            0
        );

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(3));
    }

    #endregion

    #region Contract Tests - DeleteList (M-016)

    /// <summary>
    /// DeleteList removes a specific named collection while preserving others.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-T012")]
    public void DeleteList_ExistingCollection_RemovesOnlyThatCollection()
    {
        // Arrange: Save two collections
        _service.SaveList(
            "Keep Me",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );
        _service.SaveList(
            "Delete Me",
            new List<string> { "KJV", "NASB" },
            -1,
            -1
        );

        // Act
        _service.DeleteList("Delete Me");

        // Assert: Only "Keep Me" remains
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Name, Is.EqualTo("Keep Me"));
    }

    /// <summary>
    /// DeleteList with a name that does not exist should throw.
    /// Error code: COLLECTION_NOT_FOUND per data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-T012")]
    public void DeleteList_NonExistentName_ThrowsInvalidOperationException()
    {
        // Act & Assert
        Assert.That(
            () => _service.DeleteList("Does Not Exist"),
            Throws.TypeOf<InvalidOperationException>()
        );
    }

    /// <summary>
    /// DeleteList with empty name should throw.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void DeleteList_EmptyName_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () => _service.DeleteList(""),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// DeleteList with null name should throw.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-125")]
    [Property("BehaviorId", "BHV-T012")]
    public void DeleteList_NullName_ThrowsArgumentException()
    {
        // Act & Assert
        Assert.That(
            () => _service.DeleteList(null!),
            Throws.TypeOf<ArgumentException>()
        );
    }

    /// <summary>
    /// Deleting the last remaining collection leaves GetSavedLists returning empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-T012")]
    public void DeleteList_LastCollection_ResultsInEmptyList()
    {
        // Arrange: Save one collection
        _service.SaveList(
            "Only One",
            new List<string> { "NIV84" },
            -1,
            -1
        );

        // Act
        _service.DeleteList("Only One");

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(0));
    }

    #endregion

    #region Contract Tests - Exists

    /// <summary>
    /// Exists returns true for a previously saved collection name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-T012")]
    public void Exists_SavedCollectionName_ReturnsTrue()
    {
        // Arrange
        _service.SaveList(
            "Test Collection",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );

        // Act & Assert
        Assert.That(_service.Exists("Test Collection"), Is.True);
    }

    /// <summary>
    /// Exists returns false for a name that has never been saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-T012")]
    public void Exists_UnsavedName_ReturnsFalse()
    {
        // Act & Assert
        Assert.That(_service.Exists("Nonexistent"), Is.False);
    }

    /// <summary>
    /// Exists returns false after a collection has been deleted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-065,TS-066")]
    [Property("BehaviorId", "BHV-T012")]
    public void Exists_AfterDelete_ReturnsFalse()
    {
        // Arrange
        _service.SaveList(
            "Temporary",
            new List<string> { "NIV84" },
            -1,
            -1
        );

        // Act
        _service.DeleteList("Temporary");

        // Assert
        Assert.That(_service.Exists("Temporary"), Is.False);
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Save-overwrite-retrieve round-trip: saving a collection with a name
    /// that already exists replaces the previous data completely.
    /// TS-066: Save duplicate name replaces existing selection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_Overwrite_ReplacesIndicesCompletely()
    {
        // Arrange: Save with specific indices
        _service.SaveList(
            "Overwrite Me",
            new List<string> { "NIV84", "HEB/GRK", "ESV" },
            1,
            0
        );

        // Act: Overwrite with different texts and indices
        _service.SaveList(
            "Overwrite Me",
            new List<string> { "KJV", "NASB" },
            -1,
            -1
        );

        // Assert: Indices are from the new save, not the old one
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].HebGrkIndex, Is.EqualTo(-1));
        Assert.That(result[0].ScrProjectIndex, Is.EqualTo(-1));
        Assert.That(result[0].TextNames, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// Save a collection with a single text name (minimum viable collection).
    /// The M-016 contract requires textNames to be non-empty; a single item is valid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_SingleTextName_IsPersisted()
    {
        // Act
        _service.SaveList(
            "Single Text",
            new List<string> { "NIV84" },
            -1,
            0
        );

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].TextNames, Has.Count.EqualTo(1));
        Assert.That(result[0].TextNames[0], Is.EqualTo("NIV84"));
        Assert.That(result[0].ScrProjectIndex, Is.EqualTo(0));
    }

    /// <summary>
    /// Collections with different names but overlapping text lists are stored independently.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_OverlappingTexts_DifferentNames_BothPersisted()
    {
        // Arrange & Act
        var sharedTexts = new List<string> { "NIV84", "ESV" };
        _service.SaveList("Collection 1", sharedTexts, -1, -1);
        _service.SaveList(
            "Collection 2",
            new List<string> { "NIV84", "ESV", "KJV" },
            -1,
            -1
        );

        // Assert: Both exist
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// Save and delete multiple times in sequence to verify state consistency.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-063,TS-065")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveDeleteSequence_StateRemainsConsistent()
    {
        // Save three
        _service.SaveList(
            "A",
            new List<string> { "NIV84" },
            -1,
            -1
        );
        _service.SaveList(
            "B",
            new List<string> { "ESV" },
            -1,
            -1
        );
        _service.SaveList(
            "C",
            new List<string> { "KJV" },
            -1,
            -1
        );

        Assert.That(_service.GetSavedLists(), Has.Count.EqualTo(3));

        // Delete middle
        _service.DeleteList("B");
        Assert.That(_service.GetSavedLists(), Has.Count.EqualTo(2));

        // Save new with same name as deleted
        _service.SaveList(
            "B",
            new List<string> { "NASB", "NRSV" },
            -1,
            -1
        );
        Assert.That(_service.GetSavedLists(), Has.Count.EqualTo(3));

        // Verify "B" has the new data
        SavedScrTextList? bList = _service
            .GetSavedLists()
            .FirstOrDefault(l => l.Name == "B");
        Assert.That(bList, Is.Not.Null);
        Assert.That(bList!.TextNames, Is.EqualTo(new List<string> { "NASB", "NRSV" }));
    }

    /// <summary>
    /// HebGrkIndex boundary: when the index points to the last text in the list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_HebGrkIndexAtEnd_IsPreserved()
    {
        // Arrange: HEB/GRK is last in the list
        var texts = new List<string> { "NIV84", "ESV", "HEB/GRK" };

        // Act
        _service.SaveList("Indices At End", texts, 2, 0);

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result[0].HebGrkIndex, Is.EqualTo(2));
    }

    /// <summary>
    /// ScrProjectIndex boundary: when the scripture project is the last text in the list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-063")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveList_ScrProjectIndexAtEnd_IsPreserved()
    {
        // Arrange: Scripture project is last
        var texts = new List<string> { "HEB/GRK", "ESV", "NIV84" };

        // Act
        _service.SaveList("Scr At End", texts, 0, 2);

        // Assert
        IList<SavedScrTextList> result = _service.GetSavedLists();
        Assert.That(result[0].ScrProjectIndex, Is.EqualTo(2));
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-012 boundary: GetSavedLists only returns TC dialog saved lists.
    /// It does NOT return Open dialog saved sets (SavedScrTextSet).
    /// This is the CAP-014 side of the asymmetric sharing invariant.
    /// The full INV-012 test (TC lists visible in Open dialog) is in CAP-015.
    ///
    /// For CAP-014, we verify that GetSavedLists returns ONLY the lists
    /// that were saved via SaveList (TC dialog), confirming the boundary
    /// of the asymmetric sharing rule at the data source level.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-014")]
    [Property("InvariantId", "INV-012")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-T012,BHV-T013")]
    public void GetSavedLists_OnlyReturnsTcDialogLists_NotOpenDialogSets()
    {
        // Arrange: Save two TC dialog lists
        _service.SaveList(
            "TC List 1",
            new List<string> { "NIV84", "ESV" },
            -1,
            -1
        );
        _service.SaveList(
            "TC List 2",
            new List<string> { "KJV" },
            -1,
            -1
        );

        // Act: GetSavedLists returns only SavedScrTextList objects
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert: Exactly the lists we saved (no contamination from other sources)
        Assert.That(result, Has.Count.EqualTo(2));
        var names = result.Select(r => r.Name).ToList();
        Assert.That(names, Does.Contain("TC List 1"));
        Assert.That(names, Does.Contain("TC List 2"));
    }

    /// <summary>
    /// Save-then-retrieve round-trip must preserve all fields identically.
    /// This is a structural invariant: the service must not corrupt or lose data.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008,gm-014")]
    [Property("ScenarioId", "TS-063,TS-064")]
    [Property("BehaviorId", "BHV-T012")]
    public void SaveAndRetrieve_RoundTrip_PreservesAllFields()
    {
        // Arrange: Full field specification
        string name = "Round Trip Test";
        var textNames = new List<string>
        {
            "zzz3",
            "NIV84",
            "HEB/GRK",
            "ESV",
            "CEVUK",
        };
        int hebGrkIndex = 2;
        int scrProjectIndex = 1;

        // Act
        _service.SaveList(name, textNames, hebGrkIndex, scrProjectIndex);
        IList<SavedScrTextList> result = _service.GetSavedLists();

        // Assert: Every field matches
        Assert.That(result, Has.Count.EqualTo(1));
        SavedScrTextList retrieved = result[0];
        Assert.That(retrieved.Name, Is.EqualTo(name));
        Assert.That(retrieved.TextNames, Is.EqualTo(textNames));
        Assert.That(retrieved.HebGrkIndex, Is.EqualTo(hebGrkIndex));
        Assert.That(retrieved.ScrProjectIndex, Is.EqualTo(scrProjectIndex));
    }

    #endregion
}
