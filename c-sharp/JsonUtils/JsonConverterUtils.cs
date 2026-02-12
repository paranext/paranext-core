using System.Text.Json;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Utility methods for custom JSON converters
/// </summary>
public static class JsonConverterUtils
{
    // Frontend CommentStatus values (TypeScript)
    internal const string COMMENT_STATUS_RESOLVED = "Resolved";
    internal const string COMMENT_STATUS_TODO = "Todo";
    internal const string COMMENT_STATUS_DONE = "Done";
    internal const string COMMENT_STATUS_UNSPECIFIED = "Unspecified";

    // Backend NoteStatus values (Paratext internal)
    internal const string NOTE_STATUS_DELETED = "deleted";
    internal const string NOTE_STATUS_TODO = "todo";
    internal const string NOTE_STATUS_DONE = "done";
    internal const string NOTE_STATUS_EMPTY = "";

    // Frontend CommentType values (TypeScript)
    internal const string COMMENT_TYPE_NORMAL = "Normal";
    internal const string COMMENT_TYPE_CONFLICT = "Conflict";
    internal const string COMMENT_TYPE_UNSPECIFIED = "Unspecified";

    // Backend NoteType values (Paratext internal)
    internal const string NOTE_TYPE_NORMAL = "normal";
    internal const string NOTE_TYPE_CONFLICT = "conflict";
    internal const string NOTE_TYPE_EMPTY = "";

    /// <summary>
    /// Maps frontend CommentStatus to backend NoteStatus.
    /// </summary>
    public static string ConvertCommentStatusToNoteStatus(string commentStatus)
    {
        return commentStatus switch
        {
            COMMENT_STATUS_RESOLVED => NOTE_STATUS_DELETED,
            COMMENT_STATUS_TODO => NOTE_STATUS_TODO,
            COMMENT_STATUS_DONE => NOTE_STATUS_DONE,
            COMMENT_STATUS_UNSPECIFIED => NOTE_STATUS_EMPTY,
            NOTE_STATUS_EMPTY => NOTE_STATUS_EMPTY,
            _ => commentStatus.ToLowerInvariant(),
        };
    }

    /// <summary>
    /// Maps backend NoteStatus to frontend CommentStatus.
    /// </summary>
    public static string ConvertNoteStatusToCommentStatus(string noteStatus)
    {
        return noteStatus switch
        {
            NOTE_STATUS_DELETED => COMMENT_STATUS_RESOLVED,
            NOTE_STATUS_TODO => COMMENT_STATUS_TODO,
            NOTE_STATUS_DONE => COMMENT_STATUS_DONE,
            NOTE_STATUS_EMPTY => COMMENT_STATUS_UNSPECIFIED,
            _ => noteStatus.Length > 0
                ? char.ToUpperInvariant(noteStatus[0]) + noteStatus[1..]
                : COMMENT_STATUS_UNSPECIFIED,
        };
    }

    /// <summary>
    /// Maps frontend CommentType to backend NoteType.
    /// </summary>
    public static string ConvertCommentTypeToNoteType(string commentType)
    {
        return commentType switch
        {
            COMMENT_TYPE_UNSPECIFIED => NOTE_TYPE_EMPTY,
            COMMENT_TYPE_NORMAL => NOTE_TYPE_NORMAL,
            COMMENT_TYPE_CONFLICT => NOTE_TYPE_CONFLICT,
            NOTE_TYPE_EMPTY => NOTE_TYPE_EMPTY,
            _ => commentType.ToLowerInvariant(),
        };
    }

    /// <summary>
    /// Maps backend NoteType to frontend CommentType.
    /// </summary>
    public static string ConvertNoteTypeToCommentType(string noteType)
    {
        return noteType switch
        {
            NOTE_TYPE_EMPTY => COMMENT_TYPE_UNSPECIFIED,
            NOTE_TYPE_NORMAL => COMMENT_TYPE_NORMAL,
            NOTE_TYPE_CONFLICT => COMMENT_TYPE_CONFLICT,
            _ => noteType.Length > 0
                ? char.ToUpperInvariant(noteType[0]) + noteType[1..]
                : COMMENT_TYPE_UNSPECIFIED,
        };
    }

    /// <summary>
    /// Write a string property to JSON only if the value is not null or empty.
    /// </summary>
    /// <param name="writer">The JSON writer</param>
    /// <param name="propertyName">The name of the property to write</param>
    /// <param name="value">The string value to write (if not null or empty)</param>
    public static void TryWriteString(Utf8JsonWriter writer, string propertyName, string? value)
    {
        if (!string.IsNullOrEmpty(value))
            writer.WriteString(propertyName, value);
    }
}
