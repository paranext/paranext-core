namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for setting inventory item status.
/// Maps to EXT-002 (InventoryForm.SetSelectedStatus).
/// </summary>
public record SetStatusInput(
    ItemStatus DesiredStatus,
    string Category,
    string[] SelectedItems,
    string ProjectId,
    bool IsSeparated,
    bool IsSba
);
