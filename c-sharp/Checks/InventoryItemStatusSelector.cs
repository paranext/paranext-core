namespace Paranext.DataProvider.Checks;

/// <summary>
/// Selector for an inventory item status.
/// This class must match the structure of InventoryItemStatusSelector defined in platform-scripture.d.ts
/// </summary>
public class InventoryItemStatusSelector
{
    public string ProjectId { get; set; } = string.Empty;
    public string InventoryId { get; set; } = string.Empty;
    public string? TextType { get; set; }
    public string? Key { get; set; }
};
