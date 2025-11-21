namespace Paranext.DataProvider.Checks;

/// <summary>
/// Selector for an inventory option.
/// This class corresponds to the InventoryOptionsSelector type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal sealed class InventoryOptionsSelector
{
    public string ProjectId { get; set; } = string.Empty;
    public string InventoryId { get; set; } = string.Empty;
    public string? OptionName { get; set; }
};
