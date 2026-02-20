// === TEST FILE: CAP-017 TextSelectionDialogLogic ===
// TDD Phase: RED (tests should fail -- implementation does not exist yet)
// Capability: CAP-017 (TextSelectionDialogLogic)
// Micro-Phase: BE-5 (Domain: Saved Collections)
// Sources: EXT-009 (PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:74-142, 318-438)
// Acceptance Test: gm-014 (required-item positional index preservation), TS-086..TS-090

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for TextSelectionService (CAP-017):
///   - AddText: Move a text from available (left pane) to selected (right pane)
///   - RemoveText: Move a text from selected back to available
///   - CanRemove: Check if a text can be removed (not required)
///   - MoveUp: Reorder a text one position up in the selected list
///   - MoveDown: Reorder a text one position down in the selected list
///   - CanMoveUp: Check if a text can be moved up
///   - CanMoveDown: Check if a text can be moved down
///   - Constructor: Initialize with available, selected, required, secondary texts
///
/// TextSelectionDialogLogic manages the two-pane text selection state for
/// the "Modify text collection" dialog. The left pane shows available (unselected)
/// texts and the right pane shows selected texts in user-defined order.
///
/// Key constraints:
///   - Required items cannot be removed from the selected list (TS-088)
///   - IsSecondaryText items are excluded from the available list (TS-090, INV-005)
///   - Available list is maintained in sorted order (TS-087)
///   - Selected list preserves user-defined order (TS-086, TS-089)
///
/// Source: EXT-009 (PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:74-438)
/// Behaviors: BHV-T003 (add/remove), BHV-T004 (reorder), BHV-T011 (selection dialog)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class TextSelectionServiceTests
{
    // Standard test data: project short names
    private static readonly List<string> s_standardAvailable =
    [
        "ESV",
        "HEB/GRK",
        "KJV",
        "NASB",
        "NIV84",
        "NLT",
    ];
    private static readonly List<string> s_standardSelected = ["NIV84", "ESV"];
    private static readonly List<string> s_emptyRequired = [];
    private static readonly List<string> s_emptySecondary = [];

    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Full two-pane dialog workflow.
    /// Starting with available texts and initial selections:
    ///   1. Add a text from available to selected
    ///   2. Verify it moves from left to right pane
    ///   3. Reorder a text up
    ///   4. Verify the new order
    ///   5. Attempt to remove a required text (should be blocked)
    ///   6. Remove a non-required text
    ///   7. Verify it returns to the available list
    ///
    /// This is the "done signal" for CAP-017. When this passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-017")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-086,TS-087,TS-088,TS-089,TS-090")]
    [Property("BehaviorId", "BHV-T003,BHV-T004,BHV-T011")]
    public void TextSelectionDialog_FullWorkflow_AddRemoveReorderWithConstraints()
    {
        // Arrange: 6 available texts, 2 initially selected, 1 required, 1 secondary
        var allNames = new List<string>
        {
            "ESV",
            "GRK",
            "HEB/GRK",
            "KJV",
            "NASB",
            "NIV84",
            "NLT",
        };
        var selectedNames = new List<string> { "NIV84", "ESV" };
        var requiredNames = new List<string> { "NIV84" };
        var secondaryNames = new List<string> { "GRK" };

        var service = new TextSelectionService(
            allNames,
            selectedNames,
            requiredNames,
            secondaryNames
        );

        // Assert initial state: Available excludes selected and secondary texts
        Assert.That(service.AvailableTexts, Does.Not.Contain("NIV84"), "Selected texts not in available");
        Assert.That(service.AvailableTexts, Does.Not.Contain("ESV"), "Selected texts not in available");
        Assert.That(
            service.AvailableTexts,
            Does.Not.Contain("GRK"),
            "Secondary texts excluded from available (INV-005)"
        );
        Assert.That(service.AvailableTexts, Does.Contain("KJV"), "Unselected texts in available");
        Assert.That(service.SelectedTexts, Is.EqualTo(new List<string> { "NIV84", "ESV" }));

        // Step 1 (TS-086): Add KJV from available to selected
        service.AddText("KJV");
        Assert.That(service.SelectedTexts, Does.Contain("KJV"), "Added text appears in selected");
        Assert.That(service.AvailableTexts, Does.Not.Contain("KJV"), "Added text removed from available");

        // Step 2 (TS-089): Move KJV up (from index 2 to index 1)
        Assert.That(service.CanMoveUp(2), Is.True, "KJV at index 2 can move up");
        service.MoveUp(2);
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV", "ESV" }),
            "KJV moved up to index 1"
        );

        // Step 3 (TS-088): Required item cannot be removed
        Assert.That(service.CanRemove("NIV84"), Is.False, "Required item NIV84 cannot be removed");

        // Step 4 (TS-087): Remove ESV (non-required)
        Assert.That(service.CanRemove("ESV"), Is.True, "Non-required item ESV can be removed");
        service.RemoveText("ESV");
        Assert.That(service.SelectedTexts, Does.Not.Contain("ESV"), "Removed text no longer in selected");
        Assert.That(
            service.AvailableTexts,
            Does.Contain("ESV"),
            "Removed text returns to available list"
        );

        // Final state verification
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV" }),
            "Final selected list is correct"
        );
    }

    #endregion

    #region Constructor Tests

    /// <summary>
    /// Constructor initializes available list excluding selected and secondary texts.
    /// Available list should be sorted alphabetically.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "EXT-009")]
    public void Constructor_WithSelectedAndSecondary_InitializesAvailableCorrectly()
    {
        // Arrange
        var allNames = new List<string> { "NIV84", "ESV", "KJV", "GRK", "HEB/GRK" };
        var selectedNames = new List<string> { "NIV84" };
        var requiredNames = new List<string> { "NIV84" };
        var secondaryNames = new List<string> { "GRK" };

        // Act
        var service = new TextSelectionService(
            allNames,
            selectedNames,
            requiredNames,
            secondaryNames
        );

        // Assert: Available excludes selected (NIV84) and secondary (GRK)
        Assert.That(service.AvailableTexts, Does.Not.Contain("NIV84"));
        Assert.That(service.AvailableTexts, Does.Not.Contain("GRK"));
        Assert.That(service.AvailableTexts, Does.Contain("ESV"));
        Assert.That(service.AvailableTexts, Does.Contain("KJV"));
        Assert.That(service.AvailableTexts, Does.Contain("HEB/GRK"));
    }

    /// <summary>
    /// Constructor with empty selections initializes all texts as available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "EXT-009")]
    public void Constructor_EmptySelections_AllTextsAvailable()
    {
        // Arrange
        var allNames = new List<string> { "NIV84", "ESV", "KJV" };

        // Act
        var service = new TextSelectionService(allNames, [], [], null);

        // Assert
        Assert.That(service.AvailableTexts, Has.Count.EqualTo(3));
        Assert.That(service.SelectedTexts, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// Constructor preserves the order of initially selected texts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "BHV-T011")]
    public void Constructor_WithSelectedTexts_PreservesSelectionOrder()
    {
        // Arrange: Selected in a specific order different from alphabetical
        var allNames = new List<string> { "ESV", "KJV", "NASB", "NIV84" };
        var selectedNames = new List<string> { "KJV", "NIV84", "ESV" };

        // Act
        var service = new TextSelectionService(allNames, selectedNames, [], null);

        // Assert: Selected order is exactly as provided
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "KJV", "NIV84", "ESV" })
        );
        // Available should be only NASB (the unselected text)
        Assert.That(service.AvailableTexts, Is.EqualTo(new List<string> { "NASB" }));
    }

    /// <summary>
    /// Constructor with no secondary texts does not exclude any available texts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "INV-005")]
    public void Constructor_NullSecondaryNames_NoExclusions()
    {
        // Arrange
        var allNames = new List<string> { "NIV84", "GRK", "HEB/GRK" };

        // Act
        var service = new TextSelectionService(allNames, [], [], null);

        // Assert: All texts are available including GRK
        Assert.That(service.AvailableTexts, Has.Count.EqualTo(3));
        Assert.That(service.AvailableTexts, Does.Contain("GRK"));
    }

    /// <summary>
    /// Available list is sorted alphabetically after initialization.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "EXT-009")]
    public void Constructor_AvailableTexts_SortedAlphabetically()
    {
        // Arrange: Unsorted input
        var allNames = new List<string> { "NLT", "ESV", "KJV", "NASB", "NIV84" };

        // Act
        var service = new TextSelectionService(allNames, [], [], null);

        // Assert: Available list is sorted
        List<string> sorted = service.AvailableTexts.OrderBy(n => n).ToList();
        Assert.That(service.AvailableTexts.ToList(), Is.EqualTo(sorted));
    }

    /// <summary>
    /// Constructor stores required texts for CanRemove checks.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T011")]
    public void Constructor_RequiredTexts_StoredCorrectly()
    {
        // Arrange
        var allNames = new List<string> { "NIV84", "ESV", "KJV" };
        var selectedNames = new List<string> { "NIV84", "ESV" };
        var requiredNames = new List<string> { "NIV84" };

        // Act
        var service = new TextSelectionService(allNames, selectedNames, requiredNames, null);

        // Assert
        Assert.That(service.RequiredTexts, Does.Contain("NIV84"));
        Assert.That(service.RequiredTexts, Has.Count.EqualTo(1));
    }

    #endregion

    #region Contract Tests - AddText (TS-086)

    /// <summary>
    /// AddText moves a text from available to the end of the selected list.
    /// Source: EXT-009 (ScrTextListSelectionForm: double-click or right-arrow adds text)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "BHV-T003")]
    public void AddText_FromAvailable_MovesToSelected()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );
        Assert.That(service.AvailableTexts, Does.Contain("KJV"));

        // Act
        service.AddText("KJV");

        // Assert
        Assert.That(service.SelectedTexts, Does.Contain("KJV"), "KJV is now in selected list");
        Assert.That(service.AvailableTexts, Does.Not.Contain("KJV"), "KJV removed from available");
    }

    /// <summary>
    /// AddText appends the new text to the end of the selected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "BHV-T003")]
    public void AddText_AppendsToEnd_PreservesExistingOrder()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.AddText("KJV");

        // Assert: KJV is at the end
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "ESV", "KJV" })
        );
    }

    /// <summary>
    /// Adding multiple texts in sequence appends each to the end.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "BHV-T003")]
    public void AddText_MultipleTimes_AppendsInSequence()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.AddText("KJV");
        service.AddText("NASB");

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV", "NASB" })
        );
    }

    /// <summary>
    /// After adding a text, the available list remains sorted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "EXT-009")]
    public void AddText_AvailableListRemainsSorted_AfterRemoval()
    {
        // Arrange
        var service = new TextSelectionService(
            new List<string> { "ESV", "KJV", "NASB", "NIV84" },
            [],
            s_emptyRequired,
            s_emptySecondary
        );

        // Act: Add middle item
        service.AddText("KJV");

        // Assert: Remaining available still sorted
        List<string> available = service.AvailableTexts.ToList();
        List<string> sorted = available.OrderBy(n => n).ToList();
        Assert.That(available, Is.EqualTo(sorted));
    }

    #endregion

    #region Contract Tests - RemoveText (TS-087)

    /// <summary>
    /// RemoveText moves a non-required text from selected back to available.
    /// Source: EXT-009 (ScrTextListSelectionForm: double-click or left-arrow removes text)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-T003")]
    public void RemoveText_NonRequired_MovesBackToAvailable()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.RemoveText("ESV");

        // Assert
        Assert.That(service.SelectedTexts, Does.Not.Contain("ESV"));
        Assert.That(service.AvailableTexts, Does.Contain("ESV"), "ESV returns to available");
    }

    /// <summary>
    /// After removal, the available list maintains sorted order.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-T003")]
    public void RemoveText_AvailableListReSorted_AfterReturn()
    {
        // Arrange: Available is sorted, add NIV84 back
        var service = new TextSelectionService(
            new List<string> { "ESV", "KJV", "NASB", "NIV84" },
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.RemoveText("NIV84");

        // Assert: Available list is re-sorted
        List<string> available = service.AvailableTexts.ToList();
        List<string> sorted = available.OrderBy(n => n).ToList();
        Assert.That(available, Is.EqualTo(sorted));
    }

    /// <summary>
    /// Removing a text from the middle of the selected list shifts subsequent items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-T003")]
    public void RemoveText_MiddleItem_ShiftsRemainingItems()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act: Remove middle item
        service.RemoveText("ESV");

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV" })
        );
    }

    #endregion

    #region Contract Tests - Required Item Constraints (TS-088)

    /// <summary>
    /// CanRemove returns false for required items.
    /// Required items cannot be removed from the selected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T003")]
    public void CanRemove_RequiredItem_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanRemove("NIV84"), Is.False, "Required item cannot be removed");
    }

    /// <summary>
    /// CanRemove returns true for non-required items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T003")]
    public void CanRemove_NonRequiredItem_ReturnsTrue()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanRemove("ESV"), Is.True, "Non-required item can be removed");
    }

    /// <summary>
    /// Attempting to RemoveText on a required item throws InvalidOperationException.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T003")]
    public void RemoveText_RequiredItem_ThrowsInvalidOperationException()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(
            () => service.RemoveText("NIV84"),
            Throws.TypeOf<InvalidOperationException>(),
            "Removing a required item should throw"
        );
    }

    /// <summary>
    /// With multiple required items, all are protected from removal.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T011")]
    public void CanRemove_MultipleRequiredItems_AllProtected()
    {
        // Arrange: Two required items
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            new List<string> { "NIV84", "ESV" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanRemove("NIV84"), Is.False);
        Assert.That(service.CanRemove("ESV"), Is.False);
        Assert.That(service.CanRemove("KJV"), Is.True, "KJV is not required and can be removed");
    }

    #endregion

    #region Contract Tests - MoveUp / MoveDown (TS-089)

    /// <summary>
    /// MoveUp moves an item one position up in the selected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveUp_MiddleItem_SwapsWithPrevious()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act: Move KJV (index 2) up
        service.MoveUp(2);

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV", "ESV" })
        );
    }

    /// <summary>
    /// MoveDown moves an item one position down in the selected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveDown_MiddleItem_SwapsWithNext()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act: Move ESV (index 1) down
        service.MoveDown(1);

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NIV84", "KJV", "ESV" })
        );
    }

    /// <summary>
    /// CanMoveUp returns false for index 0 (first item).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveUp_FirstItem_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveUp(0), Is.False, "First item cannot move up");
    }

    /// <summary>
    /// CanMoveDown returns false for the last item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveDown_LastItem_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveDown(1), Is.False, "Last item cannot move down");
    }

    /// <summary>
    /// CanMoveUp returns true for items not at index 0 (no required constraint).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveUp_MiddleItem_ReturnsTrue()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveUp(1), Is.True);
        Assert.That(service.CanMoveUp(2), Is.True);
    }

    /// <summary>
    /// CanMoveDown returns true for items not at the last index (no required constraint).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveDown_MiddleItem_ReturnsTrue()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveDown(0), Is.True);
        Assert.That(service.CanMoveDown(1), Is.True);
    }

    /// <summary>
    /// Moving an item up from index 1 to index 0 works correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveUp_SecondItem_BecomesFirst()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.MoveUp(1);

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "ESV", "NIV84" })
        );
    }

    /// <summary>
    /// Moving the first item down swaps it with the second.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveDown_FirstItem_SwapsWithSecond()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act
        service.MoveDown(0);

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "ESV", "NIV84" })
        );
    }

    #endregion

    #region Contract Tests - Required Item Movement Constraints (TS-088 + TS-089)

    /// <summary>
    /// A non-required item cannot move up past a required item at the position above.
    /// In PT9, required items act as barriers for reordering.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088,TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveUp_BlockedByRequiredItemAbove_ReturnsFalse()
    {
        // Arrange: Required NIV84 at index 0, non-required ESV at index 1
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert: ESV cannot move past required NIV84
        Assert.That(
            service.CanMoveUp(1),
            Is.False,
            "Non-required item cannot move past required item above"
        );
    }

    /// <summary>
    /// A non-required item cannot move down past a required item at the position below.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088,TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveDown_BlockedByRequiredItemBelow_ReturnsFalse()
    {
        // Arrange: Non-required ESV at index 0, required NIV84 at index 1
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "ESV", "NIV84" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert: ESV cannot move past required NIV84
        Assert.That(
            service.CanMoveDown(0),
            Is.False,
            "Non-required item cannot move past required item below"
        );
    }

    /// <summary>
    /// Required items themselves cannot be moved (they stay in their fixed positions).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveUp_RequiredItem_ReturnsFalse()
    {
        // Arrange: Required NIV84 at index 1
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "ESV", "NIV84", "KJV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(
            service.CanMoveUp(1),
            Is.False,
            "Required items cannot be moved"
        );
    }

    /// <summary>
    /// Required items themselves cannot be moved down.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveDown_RequiredItem_ReturnsFalse()
    {
        // Arrange: Required NIV84 at index 1
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "ESV", "NIV84", "KJV" },
            new List<string> { "NIV84" },
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(
            service.CanMoveDown(1),
            Is.False,
            "Required items cannot be moved"
        );
    }

    /// <summary>
    /// Non-required items between two non-required items can move freely
    /// when no required items are adjacent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMove_BetweenNonRequiredItems_ReturnsTrue()
    {
        // Arrange: All non-required
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert: All moves are allowed
        Assert.That(service.CanMoveUp(1), Is.True);
        Assert.That(service.CanMoveDown(1), Is.True);
        Assert.That(service.CanMoveUp(2), Is.True);
        Assert.That(service.CanMoveDown(0), Is.True);
    }

    #endregion

    #region Contract Tests - IsSecondaryText Exclusion (TS-090)

    /// <summary>
    /// Secondary texts (e.g., GRK when HEB exists) are excluded from the available list.
    /// This ensures joined text pairs (HEB/GRK) appear correctly (INV-005).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "INV-005")]
    public void Constructor_SecondaryText_ExcludedFromAvailable()
    {
        // Arrange: GRK is secondary when HEB exists
        var allNames = new List<string> { "ESV", "GRK", "HEB/GRK", "KJV", "NIV84" };
        var secondaryNames = new List<string> { "GRK" };

        // Act
        var service = new TextSelectionService(allNames, [], [], secondaryNames);

        // Assert: GRK excluded, HEB/GRK available
        Assert.That(service.AvailableTexts, Does.Not.Contain("GRK"));
        Assert.That(service.AvailableTexts, Does.Contain("HEB/GRK"));
    }

    /// <summary>
    /// Multiple secondary texts can be excluded (e.g., both GRK and OGRK).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "INV-005")]
    public void Constructor_MultipleSecondaryTexts_AllExcluded()
    {
        // Arrange: Both GRK and OGRK are secondary
        var allNames = new List<string>
        {
            "ESV",
            "GRK",
            "HEB/GRK",
            "OGRK",
            "OHEB/OGRK",
        };
        var secondaryNames = new List<string> { "GRK", "OGRK" };

        // Act
        var service = new TextSelectionService(allNames, [], [], secondaryNames);

        // Assert
        Assert.That(service.AvailableTexts, Does.Not.Contain("GRK"));
        Assert.That(service.AvailableTexts, Does.Not.Contain("OGRK"));
        Assert.That(service.AvailableTexts, Does.Contain("HEB/GRK"));
        Assert.That(service.AvailableTexts, Does.Contain("OHEB/OGRK"));
        Assert.That(service.AvailableTexts, Does.Contain("ESV"));
    }

    /// <summary>
    /// A secondary text that is already in the selected list remains in selected
    /// but does not appear in available when removed.
    /// Actually, secondary texts should never be in the selected list normally,
    /// but the constructor should handle this edge case gracefully by keeping
    /// selected items as-is and only filtering the available list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-090")]
    [Property("BehaviorId", "INV-005")]
    public void Constructor_SecondaryTextInSelected_RemainsInSelected()
    {
        // Arrange: GRK is secondary but was already selected (unusual state)
        var allNames = new List<string> { "ESV", "GRK", "HEB/GRK" };
        var selectedNames = new List<string> { "GRK" };
        var secondaryNames = new List<string> { "GRK" };

        // Act
        var service = new TextSelectionService(allNames, selectedNames, [], secondaryNames);

        // Assert: GRK stays in selected, excluded from available
        Assert.That(service.SelectedTexts, Does.Contain("GRK"));
        Assert.That(service.AvailableTexts, Does.Not.Contain("GRK"));
    }

    #endregion

    #region Edge Cases

    /// <summary>
    /// Adding a text that is not in the available list has no effect
    /// or throws an appropriate exception.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "EXT-009")]
    public void AddText_NotInAvailable_ThrowsArgumentException()
    {
        // Arrange
        var service = new TextSelectionService(
            new List<string> { "ESV", "KJV" },
            new List<string> { "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert: Adding a text not in available should throw
        Assert.That(
            () => service.AddText("UNKNOWN"),
            Throws.TypeOf<ArgumentException>(),
            "Cannot add a text that is not in the available list"
        );
    }

    /// <summary>
    /// Removing a text that is not in the selected list throws.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "EXT-009")]
    public void RemoveText_NotInSelected_ThrowsArgumentException()
    {
        // Arrange
        var service = new TextSelectionService(
            new List<string> { "ESV", "KJV" },
            new List<string> { "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(
            () => service.RemoveText("KJV"),
            Throws.TypeOf<ArgumentException>(),
            "Cannot remove a text that is not in the selected list"
        );
    }

    /// <summary>
    /// MoveUp at index 0 throws ArgumentOutOfRangeException or is blocked by CanMoveUp.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveUp_AtIndexZero_ThrowsOrNoOp()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert: Moving up at index 0 should throw
        Assert.That(
            () => service.MoveUp(0),
            Throws.TypeOf<InvalidOperationException>(),
            "Cannot move the first item up"
        );
    }

    /// <summary>
    /// MoveDown at last index throws InvalidOperationException.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveDown_AtLastIndex_ThrowsOrNoOp()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert: Moving down at last index should throw
        Assert.That(
            () => service.MoveDown(1),
            Throws.TypeOf<InvalidOperationException>(),
            "Cannot move the last item down"
        );
    }

    /// <summary>
    /// CanMoveUp with negative index returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveUp_NegativeIndex_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveUp(-1), Is.False);
    }

    /// <summary>
    /// CanMoveDown with out-of-range index returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMoveDown_OutOfRangeIndex_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveDown(5), Is.False);
    }

    /// <summary>
    /// Single item in selected list: cannot move up or down.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void CanMove_SingleItem_BothReturnFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveUp(0), Is.False, "Single item cannot move up");
        Assert.That(service.CanMoveDown(0), Is.False, "Single item cannot move down");
    }

    /// <summary>
    /// Empty selected list: CanMoveUp and CanMoveDown return false for any index.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "EXT-009")]
    public void CanMove_EmptySelectedList_ReturnsFalse()
    {
        // Arrange
        var service = new TextSelectionService(
            s_standardAvailable,
            [],
            s_emptyRequired,
            s_emptySecondary
        );

        // Act & Assert
        Assert.That(service.CanMoveUp(0), Is.False);
        Assert.That(service.CanMoveDown(0), Is.False);
    }

    /// <summary>
    /// Add-then-remove round trip: text returns to available list in sorted order.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-086,TS-087")]
    [Property("BehaviorId", "BHV-T003")]
    public void AddThenRemove_RoundTrip_TextReturnsToAvailable()
    {
        // Arrange
        var service = new TextSelectionService(
            new List<string> { "ESV", "KJV", "NIV84" },
            [],
            s_emptyRequired,
            s_emptySecondary
        );
        int initialAvailableCount = service.AvailableTexts.Count;

        // Act: Add then remove
        service.AddText("ESV");
        Assert.That(service.AvailableTexts, Has.Count.EqualTo(initialAvailableCount - 1));

        service.RemoveText("ESV");
        Assert.That(service.AvailableTexts, Has.Count.EqualTo(initialAvailableCount));

        // Assert: Available list is back to its original sorted state
        Assert.That(service.AvailableTexts, Does.Contain("ESV"));
        List<string> available = service.AvailableTexts.ToList();
        Assert.That(available, Is.EqualTo(available.OrderBy(n => n).ToList()));
    }

    /// <summary>
    /// Multiple move operations in sequence produce the expected final order.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void MoveOperations_MultipleSequential_CorrectFinalOrder()
    {
        // Arrange: NIV84, ESV, KJV, NASB
        var service = new TextSelectionService(
            s_standardAvailable,
            new List<string> { "NIV84", "ESV", "KJV", "NASB" },
            s_emptyRequired,
            s_emptySecondary
        );

        // Act: Move NASB (index 3) to the top via 3 move-ups
        service.MoveUp(3); // NIV84, ESV, NASB, KJV
        service.MoveUp(2); // NIV84, NASB, ESV, KJV
        service.MoveUp(1); // NASB, NIV84, ESV, KJV

        // Assert
        Assert.That(
            service.SelectedTexts,
            Is.EqualTo(new List<string> { "NASB", "NIV84", "ESV", "KJV" })
        );
    }

    #endregion

    #region Golden Master - Required Item Positional Index Preservation (gm-014)

    /// <summary>
    /// When a saved collection has required items (HEB/GRK at a specific index,
    /// scripture project at another), the selection service preserves these positions.
    /// This tests that the positional semantics align with gm-014.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-017")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-T011")]
    public void RequiredItemPositions_Preserved_MatchesGm014()
    {
        // Arrange: Saved collection with HEB/GRK at index 2 and NIV84 (scripture project) at index 0
        var allNames = new List<string>
        {
            "ESV",
            "HEB/GRK",
            "KJV",
            "NASB",
            "NIV84",
            "NLT",
        };
        var selectedNames = new List<string> { "NIV84", "ESV", "HEB/GRK", "KJV" };
        var requiredNames = new List<string> { "NIV84", "HEB/GRK" };

        var service = new TextSelectionService(allNames, selectedNames, requiredNames, null);

        // Assert: Required items are at their specified positions
        Assert.That(service.SelectedTexts[0], Is.EqualTo("NIV84"), "Scripture project at index 0");
        Assert.That(
            service.SelectedTexts[2],
            Is.EqualTo("HEB/GRK"),
            "HEB/GRK at index 2"
        );

        // Verify required items cannot be removed
        Assert.That(service.CanRemove("NIV84"), Is.False);
        Assert.That(service.CanRemove("HEB/GRK"), Is.False);

        // Verify non-required items can be removed
        Assert.That(service.CanRemove("ESV"), Is.True);
        Assert.That(service.CanRemove("KJV"), Is.True);
    }

    /// <summary>
    /// Adding and reordering does not displace required items from their positions.
    /// Required items act as anchors in the list.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-017")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ScenarioId", "TS-088,TS-089")]
    [Property("BehaviorId", "BHV-T004")]
    public void ReorderAroundRequiredItems_RequiredStayFixed()
    {
        // Arrange: Required NIV84 at 0, required HEB/GRK at 2
        var allNames = new List<string> { "ESV", "HEB/GRK", "KJV", "NASB", "NIV84" };
        var selectedNames = new List<string> { "NIV84", "ESV", "HEB/GRK", "KJV" };
        var requiredNames = new List<string> { "NIV84", "HEB/GRK" };

        var service = new TextSelectionService(allNames, selectedNames, requiredNames, null);

        // Verify that ESV (index 1) cannot move up past required NIV84 (index 0)
        Assert.That(service.CanMoveUp(1), Is.False, "ESV blocked by required NIV84 above");

        // Verify that ESV (index 1) cannot move down past required HEB/GRK (index 2)
        Assert.That(
            service.CanMoveDown(1),
            Is.False,
            "ESV blocked by required HEB/GRK below"
        );

        // Verify that KJV (index 3) cannot move up past required HEB/GRK (index 2)
        Assert.That(
            service.CanMoveUp(3),
            Is.False,
            "KJV blocked by required HEB/GRK above"
        );
    }

    #endregion
}
