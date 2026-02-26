namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for inventory item status
// Maps to: CAP-013 (shared types)

/// <summary>
/// Item status values matching TextInventory.ItemStatus.
/// Serializes to camelCase strings via converter registered in SerializationOptions.
/// </summary>
public enum ItemStatus
{
    Valid, // "good" in PT9
    Invalid, // "bad" in PT9
    Unknown, // "unknown" in PT9
}
