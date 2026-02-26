namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for building the matched pairs inventory.
/// Maps to EXT-001 (InventoryForm.BuildInventory).
/// </summary>
public record BuildInventoryInput(
    string ProjectId,
    bool IsSba,
    bool IsSeparated,
    int[]? SelectedBooks = null
);
