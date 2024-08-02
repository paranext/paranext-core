using System.Text.Json;
using System.Text.Json.Serialization;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

public class VerseRefConverterBetter : JsonConverter<VerseRef>
{
    public override VerseRef Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        int? bookNum = null;
        int? chapterNum = null;
        int? verseNum = null;
        string? bookName = null;
        string? lastPropertyName = null;
        while (reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.StartObject:
                case JsonTokenType.EndObject:
                case JsonTokenType.StartArray:
                case JsonTokenType.EndArray:
                    break;
                case JsonTokenType.PropertyName:
                    lastPropertyName = reader.GetString();
                    break;
                case JsonTokenType.Number:
                    switch (lastPropertyName)
                    {
                        case "_bookNum":
                            bookNum = reader.GetInt32();
                            break;
                        case "_chapterNum":
                            chapterNum = reader.GetInt32();
                            break;
                        case "_verseNum":
                            verseNum = reader.GetInt32();
                            break;
                    }
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    if (lastPropertyName == "book")
                        bookName = reader.GetString();
                    lastPropertyName = null;
                    break;
            }
        }

        if (
            chapterNum == null
            || verseNum == null
            || (bookNum == null && string.IsNullOrEmpty(bookName))
        )
            throw new JsonException("Incomplete VerseRef data");

        return (bookNum != null)
            ? new VerseRef(bookNum.Value, chapterNum.Value, verseNum.Value)
            : new VerseRef($"{bookName} {chapterNum}:{verseNum}");
    }

    public override void Write(Utf8JsonWriter writer, VerseRef value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteNumber("_bookNum", value.BookNum);
        writer.WriteNumber("chapterNum", value.ChapterNum);
        writer.WriteNumber("verseNum", value.VerseNum);
        writer.WriteString("versification", value.VersificationStr);
        writer.WriteEndObject();
    }
}
