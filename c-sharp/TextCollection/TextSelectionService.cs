// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:74-142, 318-438
// Method: ScrTextListSelectionForm handlers (add, remove, reorder)
// Maps to: EXT-009, BHV-T003, BHV-T004, BHV-T011

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Manages two-pane text selection state for the "Modify text collection" dialog.
/// Left pane: available (unselected) texts. Right pane: selected texts.
/// Operations: Add, Remove, MoveUp, MoveDown with required-item constraints.
/// Required items cannot be removed. IsSecondaryText items excluded from available list.
/// </summary>
internal class TextSelectionService
{
    private readonly List<string> _available;
    private readonly List<string> _selected;
    private readonly HashSet<string> _required;

    /// <summary>
    /// Creates a new TextSelectionService with the given available texts,
    /// initial selections, and required items.
    /// </summary>
    /// <param name="availableNames">All available project short names (before filtering).</param>
    /// <param name="selectedNames">Initially selected project short names (in order).</param>
    /// <param name="requiredNames">Required project short names that cannot be removed.</param>
    /// <param name="secondaryNames">Secondary text names to exclude from available list (e.g., "GRK" when "HEB" exists).</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:74-142
    // Method: ScrTextListSelectionForm constructor + PopulateListBoxes
    // Maps to: EXT-009
    public TextSelectionService(
        IList<string> availableNames,
        IList<string> selectedNames,
        IList<string> requiredNames,
        IList<string>? secondaryNames = null
    )
    {
        _required = new HashSet<string>(requiredNames, StringComparer.Ordinal);
        _selected = new List<string>(selectedNames);

        HashSet<string> selectedSet = new(selectedNames, StringComparer.Ordinal);
        HashSet<string> secondarySet =
            secondaryNames != null
                ? new HashSet<string>(secondaryNames, StringComparer.Ordinal)
                : new HashSet<string>(StringComparer.Ordinal);

        _available = new List<string>();
        foreach (string name in availableNames)
        {
            if (!selectedSet.Contains(name) && !secondarySet.Contains(name))
            {
                _available.Add(name);
            }
        }

        _available.Sort(StringComparer.Ordinal);
    }

    /// <summary>
    /// Gets the current list of available (unselected) texts, sorted alphabetically.
    /// Excludes IsSecondaryText items (INV-005).
    /// </summary>
    public IList<string> AvailableTexts => _available;

    /// <summary>
    /// Gets the current ordered list of selected texts.
    /// </summary>
    public IList<string> SelectedTexts => _selected;

    /// <summary>
    /// Gets the list of required text names.
    /// </summary>
    public IList<string> RequiredTexts => _required.ToList();

    /// <summary>
    /// Adds a text from the available list to the selected list.
    /// The text is removed from available and appended to selected.
    /// </summary>
    /// <param name="textName">Project short name to add.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:318-350
    // Method: ScrTextListSelectionForm.btnRight_Click (add text handler)
    // Maps to: EXT-009
    public void AddText(string textName)
    {
        if (!_available.Remove(textName))
        {
            throw new ArgumentException(
                $"Text '{textName}' is not in the available list.",
                nameof(textName)
            );
        }

        _selected.Add(textName);
    }

    /// <summary>
    /// Returns true if the text can be removed (i.e., it is not in the required list).
    /// </summary>
    /// <param name="textName">Project short name to check.</param>
    /// <returns>True if removable; false if required.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:351-360
    // Method: ScrTextListSelectionForm remove validation
    // Maps to: EXT-009
    public bool CanRemove(string textName)
    {
        return !_required.Contains(textName);
    }

    /// <summary>
    /// Removes a text from the selected list and returns it to the available list.
    /// Throws if the text is required.
    /// </summary>
    /// <param name="textName">Project short name to remove.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:361-395
    // Method: ScrTextListSelectionForm.btnLeft_Click (remove text handler)
    // Maps to: EXT-009
    public void RemoveText(string textName)
    {
        if (_required.Contains(textName))
        {
            throw new InvalidOperationException($"Cannot remove required text '{textName}'.");
        }

        if (!_selected.Remove(textName))
        {
            throw new ArgumentException(
                $"Text '{textName}' is not in the selected list.",
                nameof(textName)
            );
        }

        // Insert into available list in sorted order
        int insertIndex = _available.BinarySearch(textName, StringComparer.Ordinal);
        if (insertIndex < 0)
        {
            insertIndex = ~insertIndex;
        }

        _available.Insert(insertIndex, textName);
    }

    /// <summary>
    /// Returns true if the item at the given index can be moved up.
    /// False if at index 0 or blocked by a required item above.
    /// </summary>
    /// <param name="index">Zero-based index in the selected list.</param>
    /// <returns>True if move up is allowed.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:396-420
    // Method: ScrTextListSelectionForm.btnUp_Click validation
    // Maps to: EXT-009
    public bool CanMoveUp(int index)
    {
        if (index <= 0 || index >= _selected.Count)
        {
            return false;
        }

        // Required items cannot be moved
        if (_required.Contains(_selected[index]))
        {
            return false;
        }

        // Cannot move past a required item above
        if (_required.Contains(_selected[index - 1]))
        {
            return false;
        }

        return true;
    }

    /// <summary>
    /// Returns true if the item at the given index can be moved down.
    /// False if at last index or blocked by a required item below.
    /// </summary>
    /// <param name="index">Zero-based index in the selected list.</param>
    /// <returns>True if move down is allowed.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:396-420
    // Method: ScrTextListSelectionForm.btnDown_Click validation
    // Maps to: EXT-009
    public bool CanMoveDown(int index)
    {
        if (index < 0 || index >= _selected.Count - 1)
        {
            return false;
        }

        // Required items cannot be moved
        if (_required.Contains(_selected[index]))
        {
            return false;
        }

        // Cannot move past a required item below
        if (_required.Contains(_selected[index + 1]))
        {
            return false;
        }

        return true;
    }

    /// <summary>
    /// Moves the item at the given index one position up in the selected list.
    /// </summary>
    /// <param name="index">Zero-based index of the item to move up.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:421-438
    // Method: ScrTextListSelectionForm.btnUp_Click
    // Maps to: EXT-009
    public void MoveUp(int index)
    {
        if (!CanMoveUp(index))
        {
            throw new InvalidOperationException($"Cannot move item at index {index} up.");
        }

        (_selected[index], _selected[index - 1]) = (_selected[index - 1], _selected[index]);
    }

    /// <summary>
    /// Moves the item at the given index one position down in the selected list.
    /// </summary>
    /// <param name="index">Zero-based index of the item to move down.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:421-438
    // Method: ScrTextListSelectionForm.btnDown_Click
    // Maps to: EXT-009
    public void MoveDown(int index)
    {
        if (!CanMoveDown(index))
        {
            throw new InvalidOperationException($"Cannot move item at index {index} down.");
        }

        (_selected[index], _selected[index + 1]) = (_selected[index + 1], _selected[index]);
    }
}
