namespace Paranext.DataProvider.Checks;

/// <summary>
/// Status of an inventory item.
/// This class corresponds to the InventoryItemStatus type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal sealed class InventoryItemStatus(string key, bool isValid)
{
    public string Key { get; set; } = key;
    public bool IsValid { get; set; } = isValid;
}
