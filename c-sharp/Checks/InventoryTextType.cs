using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Serialized representation of InventoryTextType.
/// This class must match the structure of InventoryTextType defined in platform-scripture.d.ts
///
/// Note this is not called InventoryTextType to avoid confusion with Paratext.Checks.InventoryTextType.
/// </summary>
public static class SerializedInventoryTextType
{
    public const string AllText = "allText";
    public const string VerseText = "verseText";
    public const string NonVerseText = "nonVerseText";

    // Includes both verse and non-verse text, but not SBA text
    public const string RegularContent = "regularContent";
    public const string StudyBibleContent = "studyBibleContent";

    public static bool IsValid(string textType)
    {
        return textType switch
        {
            AllText or VerseText or NonVerseText or RegularContent or StudyBibleContent => true,
            _ => false,
        };
    }

    public static bool IsValidOrNull(string? textType)
    {
        return textType == null || IsValid(textType);
    }

    public static InventoryTextType FromSerialized(string serialized)
    {
        return serialized switch
        {
            AllText => InventoryTextType.AllText,
            VerseText => InventoryTextType.VerseText,
            NonVerseText => InventoryTextType.NonVerseText,
            RegularContent => InventoryTextType.RegularContent,
            StudyBibleContent => InventoryTextType.StudyBibleContent,
            _ => throw new ArgumentException("Invalid textType: " + serialized),
        };
    }
}
