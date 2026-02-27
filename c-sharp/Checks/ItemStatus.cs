namespace Paranext.DataProvider.Checks;

/// <summary>
/// Item status values matching TextInventory.ItemStatus.
/// Serializes to camelCase strings via converter registered in SerializationOptions.
/// </summary>
public enum ItemStatus
{
    Valid,
    Invalid,
    Unknown,
}
