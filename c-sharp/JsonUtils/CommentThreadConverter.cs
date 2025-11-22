using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Data.ProjectComments;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

// This should be kept in sync with the CommentThread TypeScript type in
// extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
public class CommentThreadConverter : JsonConverter<CommentThread>
{
    /// <summary>
    /// Maps C# NoteStatus to TypeScript CommentStatus values.
    /// C# NoteStatus: Enum with internal strings "" | "todo" | "done" | "deleted"
    /// TypeScript: 'Unspecified' | 'Todo' | 'Done' | 'Resolved'
    /// </summary>
    private static string ConvertNoteStatusToCommentStatus(Enum<NoteStatus> noteStatus)
    {
        string noteStatusValue = noteStatus.ToString();
        return noteStatusValue switch
        {
            "deleted" => "Resolved",
            "todo" => "Todo",
            "done" => "Done",
            "" => "Unspecified",
            _ => char.ToUpperInvariant(noteStatusValue[0]) + noteStatusValue.Substring(1),
        };
    }

    private const string ID = "id";
    private const string COMMENTS = "comments";
    private const string STATUS = "status";
    private const string TYPE = "type";
    private const string ASSIGNED_USER = "assignedUser";
    private const string REPLY_TO_USER = "replyToUser";
    private const string MODIFIED_DATE = "modifiedDate";
    private const string VERSE_REF = "verseRef";
    private const string CONTEXT_SCR_TEXT_NAME = "contextScrTextName";
    private const string IS_SPELLING_NOTE = "isSpellingNote";
    private const string IS_BT_NOTE = "isBTNote";
    private const string IS_CONSULTANT_NOTE = "isConsultantNote";
    private const string BIBLICAL_TERM_ID = "biblicalTermId";

    public override CommentThread Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        throw new NotSupportedException("Reading CommentThread from JSON is not yet supported.");
    }

    public override void Write(
        Utf8JsonWriter writer,
        CommentThread value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();

        // Thread ID
        writer.WriteString(ID, value.Id);

        // All comments in the thread
        writer.WritePropertyName(COMMENTS);
        JsonSerializer.Serialize(writer, value.Comments, options);

        // Status and Type - convert NoteStatus to CommentStatus for frontend
        string threadStatus = ConvertNoteStatusToCommentStatus(value.Status);
        writer.WriteString(STATUS, threadStatus);
        writer.WriteString(TYPE, value.Type.ToString());
        writer.WriteBoolean(IS_SPELLING_NOTE, value.IsSpellingNote);
        writer.WriteBoolean(IS_BT_NOTE, value.IsBTNote);
        writer.WriteBoolean(IS_CONSULTANT_NOTE, value.IsConsultantNote);

        // Modified date
        writer.WriteString(MODIFIED_DATE, value.ModifiedDate);

        // Scripture reference
        writer.WriteString(VERSE_REF, value.VerseRef.ToString());

        // User assignments (optional)
        JsonConverterUtils.TryWriteString(writer, ASSIGNED_USER, value.AssignedUser);
        JsonConverterUtils.TryWriteString(writer, REPLY_TO_USER, value.ReplyToUser);

        // Context and metadata (optional)
        JsonConverterUtils.TryWriteString(writer, CONTEXT_SCR_TEXT_NAME, value.ContextScrTextName);

        // Biblical term ID (optional)
        JsonConverterUtils.TryWriteString(writer, BIBLICAL_TERM_ID, value.BiblicalTermId);

        writer.WriteEndObject();
    }
}
