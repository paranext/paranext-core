using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Data.ProjectComments;

namespace Paranext.DataProvider.JsonUtils;

// This should be kept in sync with the CommentThread TypeScript type in
// extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
public class CommentThreadConverter : JsonConverter<CommentThread>
{
    private const string ID = "id";
    private const string COMMENTS = "comments";
    private const string ACTIVE_COMMENTS = "activeComments";
    private const string STATUS = "status";
    private const string TYPE = "type";
    private const string ASSIGNED_USER = "assignedUser";
    private const string REPLY_TO_USER = "replyToUser";
    private const string MODIFIED_DATE = "modifiedDate";
    private const string VERSE_REF = "verseRef";
    private const string ORIGINAL_VERSE_TEXT = "originalVerseText";
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

        // Active (non-deleted) comments
        writer.WritePropertyName(ACTIVE_COMMENTS);
        JsonSerializer.Serialize(writer, value.ActiveComments.ToList(), options);

        // Status and Type
        writer.WriteString(STATUS, value.Status.ToString());
        writer.WriteString(TYPE, value.Type.ToString());

        // User assignments
        writer.WriteString(ASSIGNED_USER, value.AssignedUser ?? "");
        writer.WriteString(REPLY_TO_USER, value.ReplyToUser ?? "");

        // Modified date - convert to Unix timestamp (milliseconds)
        writer.WriteNumber(MODIFIED_DATE, value.ModifiedDate.ToUnixTimeMilliseconds());

        // Scripture reference
        writer.WriteString(VERSE_REF, value.VerseRef.ToString());
        writer.WriteString(ORIGINAL_VERSE_TEXT, value.OriginalVerseText ?? "");

        // Context and metadata
        if (!string.IsNullOrEmpty(value.ContextScrTextName))
            writer.WriteString(CONTEXT_SCR_TEXT_NAME, value.ContextScrTextName);

        // Boolean flags
        writer.WriteBoolean(IS_SPELLING_NOTE, value.IsSpellingNote);
        writer.WriteBoolean(IS_BT_NOTE, value.IsBTNote);
        writer.WriteBoolean(IS_CONSULTANT_NOTE, value.IsConsultantNote);

        // Biblical term ID (if present)
        if (!string.IsNullOrEmpty(value.BiblicalTermId))
            writer.WriteString(BIBLICAL_TERM_ID, value.BiblicalTermId);

        writer.WriteEndObject();
    }
}
