using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Checks;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Converts InventoryTextType to and from its serialized string representation.
/// All string values must be kept in sync with InventoryTextType defined in platform-scripture.d.ts.
/// </summary>
public class InventoryTextTypeConverter : JsonConverter<InventoryTextType>
{
    public const string AllText = "allText";
    public const string VerseText = "verseText";
    public const string NonVerseText = "nonVerseText";

    // Includes both verse and non-verse text, but not SBA text
    public const string RegularContent = "regularContent";
    public const string StudyBibleContent = "studyBibleContent";

    public override InventoryTextType Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        string serialized =
            reader.GetString()
            ?? throw new JsonException("Expected string value for InventoryTextType");
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

    public override void Write(
        Utf8JsonWriter writer,
        InventoryTextType value,
        JsonSerializerOptions options
    )
    {
        string serialized = value switch
        {
            InventoryTextType.AllText => AllText,
            InventoryTextType.VerseText => VerseText,
            InventoryTextType.NonVerseText => NonVerseText,
            InventoryTextType.RegularContent => RegularContent,
            InventoryTextType.StudyBibleContent => StudyBibleContent,
            _ => throw new InvalidDataException("Invalid InventoryTextType: " + value),
        };
        writer.WriteStringValue(serialized);
    }
}
