namespace Paranext.DataProvider.Checks;

/// <summary>
/// Status of an inventory item.
/// This class must match the structure of InventoryItemStatus defined in platform-scripture.d.ts.
/// </summary>
internal class InventoryItemStatus(string key, bool isValid)
{
    public string Key { get; set; } = key;
    public bool IsValid { get; set; } = isValid;
}
