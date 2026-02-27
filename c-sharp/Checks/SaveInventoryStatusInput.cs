namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for saving inventory status to project settings.
/// Maps to EXT-003 (InventoryForm.SaveInventoryStatus).
/// </summary>
public record SaveInventoryStatusInput(string ProjectId, bool IsSba, bool IsSeparated);
