using System.Text.Json;
using System.Text.Json.Serialization;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

public class VerseRefConverter : JsonConverter<VerseRef>
{
    private const string BOOK_NUM = "bookNum";
    private const string UNDERSCORE_BOOK_NUM = "_bookNum";
    private const string CHAPTER_NUM = "chapterNum";
    private const string UNDERSCORE_CHAPTER_NUM = "_chapterNum";
    private const string VERSE_NUM = "verseNum";
    private const string UNDERSCORE_VERSE_NUM = "_verseNum";

    private const string BOOK = "book";
    private const string VERSE = "verse";
    private const string VERSIFICATION = "versification";
    private const string VERSIFICATION_STR = "versificationStr";

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
        string? verse = null;
        string? versification = null;
        string? lastPropertyName = null;
        // The starting token is consumed before we get the reader
        int onObjectLevel = 1;
        while (onObjectLevel > 0 && reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.StartObject:
                case JsonTokenType.StartArray:
                    onObjectLevel++;
                    break;
                case JsonTokenType.EndObject:
                case JsonTokenType.EndArray:
                    onObjectLevel--;
                    break;
                case JsonTokenType.PropertyName:
                    lastPropertyName = reader.GetString();
                    break;
                case JsonTokenType.True:
                case JsonTokenType.False:
                    lastPropertyName = null;
                    break;
                case JsonTokenType.Number:
                    switch (lastPropertyName)
                    {
                        case BOOK_NUM:
                        case UNDERSCORE_BOOK_NUM:
                            bookNum = reader.GetInt32();
                            break;
                        case CHAPTER_NUM:
                        case UNDERSCORE_CHAPTER_NUM:
                            chapterNum = reader.GetInt32();
                            break;
                        case VERSE_NUM:
                        case UNDERSCORE_VERSE_NUM:
                            verseNum = reader.GetInt32();
                            break;
                    }
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case BOOK:
                            bookName = reader.GetString();
                            break;
                        case VERSE:
                            verse = reader.GetString();
                            break;
                        case VERSIFICATION:
                        case VERSIFICATION_STR:
                            versification = reader.GetString();
                            break;
                    }
                    lastPropertyName = null;
                    break;
            }
        }

        if (!chapterNum.HasValue)
            throw new JsonException("VerseRef missing chapterNum");

        if (!verseNum.HasValue && string.IsNullOrEmpty(verse))
            throw new JsonException("VerseRef missing verseNum and verse");

        if (!bookNum.HasValue && string.IsNullOrEmpty(bookName))
            throw new JsonException("VerseRef missing bookNum and bookName");

        return string.IsNullOrEmpty(bookName)
            ? new VerseRef(bookNum!.Value, chapterNum.Value, verseNum ?? 0)
            : new VerseRef(
                bookName,
                chapterNum.Value.ToString(),
                verse ?? verseNum!.Value.ToString(),
                new ScrVers(versification)
            );
    }

    public override void Write(Utf8JsonWriter writer, VerseRef value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteString(BOOK, value.Book);
        writer.WriteNumber(CHAPTER_NUM, value.ChapterNum);
        writer.WriteNumber(VERSE_NUM, value.VerseNum);
        if (!string.IsNullOrEmpty(value.Verse))
            writer.WriteString(VERSE, value.Verse);
        if (value.Versification.Type != ScrVersType.Unknown)
            writer.WriteString(VERSIFICATION_STR, value.VersificationStr);
        writer.WriteEndObject();
    }
}
