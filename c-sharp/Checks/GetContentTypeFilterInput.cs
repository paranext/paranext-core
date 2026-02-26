namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for determining content type filter options.
/// Maps to EXT-006 (InventoryForm.SetupTextTypeDropdown).
/// </summary>
public record GetContentTypeFilterInput(bool IsSba, bool IsSeparated);
