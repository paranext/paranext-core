// === EXTRACTION: EXT-009 TextSelectionService ===
// Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:74-142, 318-438
// Method: ScrTextListSelectionForm handlers (add, remove, reorder)
// Maps to: EXT-009, BHV-T003, BHV-T004, BHV-T011
// Complexity: Complex

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Manages two-pane text selection state for the "Modify text collection" dialog.
/// Left pane: available (unselected) texts. Right pane: selected texts.
/// Operations: Add, Remove, MoveUp, MoveDown with required-item constraints.
/// Required items cannot be removed. IsSecondaryText items excluded from available list.
/// </summary>
internal class TextSelectionService
{
    /// <summary>
    /// Creates a new TextSelectionService with the given available texts,
    /// initial selections, and required items.
    /// </summary>
    /// <param name="availableNames">All available project short names (before filtering).</param>
    /// <param name="selectedNames">Initially selected project short names (in order).</param>
    /// <param name="requiredNames">Required project short names that cannot be removed.</param>
    /// <param name="secondaryNames">Secondary text names to exclude from available list (e.g., "GRK" when "HEB" exists).</param>
    public TextSelectionService(
        IList<string> availableNames,
        IList<string> selectedNames,
        IList<string> requiredNames,
        IList<string>? secondaryNames = null
    )
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Gets the current list of available (unselected) texts, sorted alphabetically.
    /// Excludes IsSecondaryText items (INV-005).
    /// </summary>
    public IList<string> AvailableTexts
    {
        get => throw new NotImplementedException();
    }

    /// <summary>
    /// Gets the current ordered list of selected texts.
    /// </summary>
    public IList<string> SelectedTexts
    {
        get => throw new NotImplementedException();
    }

    /// <summary>
    /// Gets the list of required text names.
    /// </summary>
    public IList<string> RequiredTexts
    {
        get => throw new NotImplementedException();
    }

    /// <summary>
    /// Adds a text from the available list to the selected list.
    /// The text is removed from available and appended to selected.
    /// </summary>
    /// <param name="textName">Project short name to add.</param>
    public void AddText(string textName)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Returns true if the text can be removed (i.e., it is not in the required list).
    /// </summary>
    /// <param name="textName">Project short name to check.</param>
    /// <returns>True if removable; false if required.</returns>
    public bool CanRemove(string textName)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Removes a text from the selected list and returns it to the available list.
    /// Throws if the text is required.
    /// </summary>
    /// <param name="textName">Project short name to remove.</param>
    public void RemoveText(string textName)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Returns true if the item at the given index can be moved up.
    /// False if at index 0 or blocked by a required item above.
    /// </summary>
    /// <param name="index">Zero-based index in the selected list.</param>
    /// <returns>True if move up is allowed.</returns>
    public bool CanMoveUp(int index)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Returns true if the item at the given index can be moved down.
    /// False if at last index or blocked by a required item below.
    /// </summary>
    /// <param name="index">Zero-based index in the selected list.</param>
    /// <returns>True if move down is allowed.</returns>
    public bool CanMoveDown(int index)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Moves the item at the given index one position up in the selected list.
    /// </summary>
    /// <param name="index">Zero-based index of the item to move up.</param>
    public void MoveUp(int index)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Moves the item at the given index one position down in the selected list.
    /// </summary>
    /// <param name="index">Zero-based index of the item to move down.</param>
    public void MoveDown(int index)
    {
        throw new NotImplementedException();
    }
}
