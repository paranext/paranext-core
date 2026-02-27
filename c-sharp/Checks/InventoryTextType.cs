namespace Paranext.DataProvider.Checks;

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
