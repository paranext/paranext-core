using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Data.ProjectComments;

namespace Paranext.DataProvider.JsonUtils;

// This should be kept in sync with the CommentThread TypeScript type in
// extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
public class PlatformCommentThreadConverter : JsonConverter<PlatformCommentThreadWrapper>
{
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
    private const string IS_READ = "isRead";
    private const string BIBLICAL_TERM_ID = "biblicalTermId";

    public override PlatformCommentThreadWrapper Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        throw new NotSupportedException(
            "Reading PlatformCommentThreadWrapper from JSON is not yet supported."
        );
    }

    public override void Write(
        Utf8JsonWriter writer,
        PlatformCommentThreadWrapper value,
        JsonSerializerOptions options
    ) => WriteThread(writer, value, options);

    /// <summary>
    /// Writes a comment thread object and returns how many of its comments were dropped because they
    /// could not be serialized (each is logged). A dropped comment leaves the rest of the thread
    /// intact; returning the count — rather than discarding it as a void <see cref="Write"/> would —
    /// lets the getCommentThreads response fold comment-level drops into its <c>hiddenCount</c>, so a
    /// comment lost inside an otherwise-healthy thread is still surfaced to the user. The signature
    /// matches the <c>serializeItem</c> delegate of
    /// <see cref="JsonConverterUtils.WriteIsolatedArray{T}"/>.
    /// </summary>
    internal static int WriteThread(
        Utf8JsonWriter writer,
        PlatformCommentThreadWrapper value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();

        // Thread ID
        writer.WriteString(ID, value.Id);

        // All comments in the thread. Isolated per-comment: a single comment that can't be
        // serialized is dropped (and logged) rather than taking down the whole thread of otherwise
        // healthy comments. The drop count is returned (not discarded) so it reaches hiddenCount.
        writer.WritePropertyName(COMMENTS);
        int droppedComments = JsonConverterUtils.WriteIsolatedArray(
            writer,
            value.Comments,
            options,
            comment => $"comment {comment.Id}"
        );

        // Status and Type - convert NoteStatus to CommentStatus for frontend
        string threadStatus = JsonConverterUtils.ConvertNoteStatusToCommentStatus(value.Status);
        writer.WriteString(STATUS, threadStatus);

        string commentTypeValue = JsonConverterUtils.ConvertNoteTypeToCommentType(value.Type);
        writer.WriteString(TYPE, commentTypeValue);

        writer.WriteBoolean(IS_SPELLING_NOTE, value.IsSpellingNote);
        writer.WriteBoolean(IS_BT_NOTE, value.IsBTNote);
        writer.WriteBoolean(IS_CONSULTANT_NOTE, value.IsConsultantNote);

        // Modified date
        writer.WriteString(MODIFIED_DATE, value.ModifiedDate);

        // Scripture reference
        writer.WriteString(VERSE_REF, value.VerseRef.ToString());

        // User assignments
        // AssignedUser: null means no assignment info, empty string means explicitly unassigned
        // We need to write empty string to distinguish from undefined
        if (value.AssignedUser != null)
            writer.WriteString(ASSIGNED_USER, value.AssignedUser);
        JsonConverterUtils.TryWriteString(writer, REPLY_TO_USER, value.ReplyToUser);

        // Context and metadata (optional)
        JsonConverterUtils.TryWriteString(writer, CONTEXT_SCR_TEXT_NAME, value.ContextScrTextName);

        // Biblical term ID (optional)
        JsonConverterUtils.TryWriteString(writer, BIBLICAL_TERM_ID, value.BiblicalTermId);

        writer.WriteBoolean(IS_READ, value.IsRead);
        writer.WriteEndObject();
        return droppedComments;
    }
}
