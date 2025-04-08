using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

// This should be kept in sync with the LegacyComment TypeScript type in
// extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
public class CommentConverter : JsonConverter<Comment>
{
    private const string ASSIGNED_USER = "assignedUser";
    private const string BIBLICAL_TERM_ID = "biblicalTermId";
    private const string CONFLICT_TYPE = "conflictType";
    private const string CONTENTS = "contents";
    private const string CONTEXT_AFTER = "contextAfter";
    private const string CONTEXT_BEFORE = "contextBefore";
    private const string DATE = "date";
    private const string DELETED = "deleted";
    private const string EXTRA_HEADING_INFO = "extraHeadingInfo";
    private const string HIDE_IN_TEXT_WINDOW = "hideInTextWindow";
    private const string ID = "id";
    private const string LANGUAGE = "language";
    private const string REPLY_TO_USER = "replyToUser";
    private const string SELECTED_TEXT = "selectedText";
    private const string SHARED = "shared";
    private const string START_POSITION = "startPosition";
    private const string STATUS = "status";
    private const string TAG_ADDED = "tagAdded";
    private const string TAG_REMOVED = "tagRemoved";
    private const string THREAD = "thread";
    private const string TYPE = "type";
    private const string USER = "user";
    private const string VERSE = "verse";
    private const string VERSE_REF = "verseRef";

    public override Comment Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        string? assignedUser = null;
        string? biblicalTermId = null;
        string? conflictType = null;
        string? contents = null;
        string? contextAfter = null;
        string? contextBefore = null;
        string? date = null;
        bool? deleted = null;
        string? extraHeadingInfo = null;
        bool? hideInTextWindow = null;
        string? id = null;
        string? language = null;
        string? replyToUser = null;
        string? selectedText = null;
        string? shared = null;
        int? startPosition = null;
        string? status = null;
        string? tagAdded = null;
        string? tagRemoved = null;
        string? thread = null;
        string? type = null;
        string? user = null;
        string? verse = null;
        string? verseRef = null;
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
                    switch (lastPropertyName)
                    {
                        case DELETED:
                            deleted = reader.GetBoolean();
                            break;
                        case HIDE_IN_TEXT_WINDOW:
                            hideInTextWindow = reader.GetBoolean();
                            break;
                    }
                    lastPropertyName = null;
                    break;
                case JsonTokenType.Number:
                    switch (lastPropertyName)
                    {
                        case START_POSITION:
                            startPosition = reader.GetInt32();
                            break;
                    }
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case ASSIGNED_USER:
                            assignedUser = reader.GetString();
                            break;
                        case BIBLICAL_TERM_ID:
                            biblicalTermId = reader.GetString();
                            break;
                        case CONFLICT_TYPE:
                            conflictType = reader.GetString();
                            break;
                        case CONTENTS:
                            contents = reader.GetString();
                            break;
                        case CONTEXT_AFTER:
                            contextAfter = reader.GetString();
                            break;
                        case CONTEXT_BEFORE:
                            contextBefore = reader.GetString();
                            break;
                        case DATE:
                            date = reader.GetString();
                            break;
                        case EXTRA_HEADING_INFO:
                            extraHeadingInfo = reader.GetString();
                            break;
                        case ID:
                            id = reader.GetString();
                            break;
                        case LANGUAGE:
                            language = reader.GetString();
                            break;
                        case REPLY_TO_USER:
                            replyToUser = reader.GetString();
                            break;
                        case SELECTED_TEXT:
                            selectedText = reader.GetString();
                            break;
                        case SHARED:
                            shared = reader.GetString();
                            break;
                        case STATUS:
                            status = reader.GetString();
                            break;
                        case TAG_ADDED:
                            tagAdded = reader.GetString();
                            break;
                        case TAG_REMOVED:
                            tagRemoved = reader.GetString();
                            break;
                        case THREAD:
                            thread = reader.GetString();
                            break;
                        case TYPE:
                            type = reader.GetString();
                            break;
                        case USER:
                            user = reader.GetString();
                            break;
                        case VERSE:
                            verse = reader.GetString();
                            break;
                        case VERSE_REF:
                            verseRef = reader.GetString();
                            break;
                    }
                    lastPropertyName = null;
                    break;
            }
        }

        VerifyDataProvided(CONTENTS, contents);
        VerifyDataProvided(DATE, date);
        VerifyDataProvided(DELETED, deleted);
        VerifyDataProvided(HIDE_IN_TEXT_WINDOW, hideInTextWindow);
        VerifyDataProvided(ID, id);
        VerifyDataProvided(LANGUAGE, language);
        VerifyDataProvided(START_POSITION, startPosition);
        VerifyDataProvided(THREAD, thread);
        VerifyDataProvided(USER, user);
        VerifyDataProvided(VERSE_REF, verseRef);

        XmlElement? contentsXml;
        try
        {
            XmlDocument xmlDocument = new() { PreserveWhitespace = true };
            xmlDocument.LoadXml($"<Contents>{contents}</Contents>");
            contentsXml = xmlDocument.DocumentElement;
        }
        catch (Exception)
        {
            throw new InvalidDataException($"Contents are not valid XML: {contents}");
        }

        var conflictTypeEnum =
            ConvertToEnum<NoteConflictType>(CONFLICT_TYPE, conflictType) ?? NoteConflictType.None;
        var statusEnum = ConvertToEnum<NoteStatus>(STATUS, status) ?? NoteStatus.Todo;
        var typeEnum = ConvertToEnum<NoteType>(TYPE, type) ?? NoteType.Normal;

        Comment comment =
            new(new ParatextUser(user, null))
            {
                AssignedUser = assignedUser,
                BiblicalTermId = biblicalTermId,
                ConflictType = conflictTypeEnum,
                Contents = contentsXml,
                ContextAfter = contextAfter,
                ContextBefore = contextBefore,
                Date = date,
                Deleted = deleted!.Value,
                ExtraHeadingInfoInternal = extraHeadingInfo,
                HideInTextWindow = hideInTextWindow!.Value,
                Language = language,
                ReplyToUser = replyToUser,
                SelectedText = selectedText,
                Shared = shared,
                StartPosition = startPosition!.Value,
                Status = statusEnum,
                TagsAdded = tagAdded?.Split(","),
                TagsRemoved = tagRemoved?.Split(","),
                Thread = thread,
                Type = typeEnum,
                Verse = verse,
                VerseRefStr = verseRef,
            };

        if (comment.Id != id)
            Console.WriteLine(
                $"WARNING: Actual comment ID ({comment.Id}) doesn't match the provided ID ({id})"
            );

        return comment;
    }

    public override void Write(Utf8JsonWriter writer, Comment value, JsonSerializerOptions options)
    {
        // Writing in the order things seem to appear in the Comment XML files from PT9
        writer.WriteStartObject();
        writer.WriteString(ID, value.Id);
        writer.WriteString(THREAD, value.Thread);
        writer.WriteString(USER, value.User);
        writer.WriteString(VERSE_REF, value.VerseRefStr);
        writer.WriteString(LANGUAGE, value.Language);
        writer.WriteString(DATE, value.Date);
        writer.WriteBoolean(DELETED, value.Deleted);
        TryWrite(writer, SELECTED_TEXT, value.SelectedText);
        writer.WriteNumber(START_POSITION, value.StartPosition);
        TryWrite(writer, CONTEXT_BEFORE, value.ContextBefore);
        TryWrite(writer, CONTEXT_AFTER, value.ContextAfter);
        if (value.Status != NoteStatus.Unspecified)
            writer.WriteString(STATUS, value.Status.ToString());
        if (value.Type != NoteType.Unspecified && value.Type != NoteType.Normal)
            writer.WriteString(TYPE, value.Type.ToString());
        if (value.ConflictType != NoteConflictType.None)
            writer.WriteString(CONFLICT_TYPE, value.ConflictType.ToString());
        TryWrite(writer, VERSE, value.Verse);
        TryWrite(writer, SHARED, value.Shared);
        TryWrite(writer, ASSIGNED_USER, value.AssignedUser);
        TryWrite(writer, REPLY_TO_USER, value.ReplyToUser);
        TryWrite(writer, EXTRA_HEADING_INFO, value.ExtraHeadingInfo.ToString());
        writer.WriteBoolean(HIDE_IN_TEXT_WINDOW, value.HideInTextWindow);
        writer.WriteString(CONTENTS, value.Contents?.InnerXml ?? "");
        TryWrite(writer, BIBLICAL_TERM_ID, value.BiblicalTermId);
        TryWrite(writer, TAG_ADDED, TryJoin(",", value.TagsAdded));
        TryWrite(writer, TAG_REMOVED, TryJoin(",", value.TagsRemoved));
        writer.WriteEndObject();
    }

    /// <summary>
    /// Write a value if it is not null or empty
    /// </summary>
    private static void TryWrite(Utf8JsonWriter writer, string propertyName, string? value)
    {
        if (!string.IsNullOrEmpty(value))
            writer.WriteString(propertyName, value);
    }

    private static string? TryJoin(string? separator, string[] stringArray)
    {
        return (stringArray != null && stringArray.Length > 0)
            ? string.Join(separator, stringArray)
            : null;
    }

    /// <summary>
    /// Verify a mandatory value is present
    /// </summary>
    private static void VerifyDataProvided(string name, string? data)
    {
        if (string.IsNullOrEmpty(data))
            throw new InvalidDataException($"Missing comment data field: \"{name}\"");
    }

    /// <summary>
    /// Verify a mandatory value is present
    /// </summary>
    private static void VerifyDataProvided<T>(string name, Nullable<T> data)
        where T : struct
    {
        if (!data.HasValue)
            throw new InvalidDataException($"Missing comment data field: \"{name}\"");
    }

    /// <summary>
    /// Convert a string into a PtxUtils enum value (and ensure it is one of the known enum values)
    /// </summary>
    private static Enum<T>? ConvertToEnum<T>(string name, string? data)
        where T : class, EnumType
    {
        if (string.IsNullOrEmpty(data))
            return null;

        var retVal = new Enum<T>(data);
        if (!Enum<T>.IsKnownValue(retVal))
            throw new InvalidDataException(
                $"Invalid {typeof(T).Name} enum value from data field \"{name}\": {data}"
            );
        return retVal;
    }
}
