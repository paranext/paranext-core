namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for determining inventory column configuration.
/// Maps to EXT-005 (InventoryForm.SetupDisplayedColumns).
/// </summary>
public record GetDisplayedColumnsInput(
    bool IsSba,
    bool IsSeparated,
    bool SupportsSeparateInventories
);
