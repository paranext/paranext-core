namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for inventory text type filter
// Maps to: CAP-013 (shared types)

/// <summary>
/// Inventory text type for content type filtering.
/// Mirrors Paratext.Checks.InventoryTextType values for PAPI wire format.
/// Serializes to camelCase strings via converter registered in SerializationOptions.
/// </summary>
public enum InventoryTextType
{
    AllText,
    VerseText,
    NonVerseText,
    RegularContent,
    StudyBibleContent,
}
