namespace Paranext.DataProvider.Checks;

/// <summary>
/// Selector for an inventory option.
/// This class must match the structure of InventoryOptionsSelector defined in platform-scripture.d.ts
/// </summary>
public class InventoryOptionsSelector
{
    public string ProjectId { get; set; } = string.Empty;
    public string InventoryId { get; set; } = string.Empty;
    public string? OptionName { get; set; }
};
