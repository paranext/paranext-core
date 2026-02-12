using System.Text.Json;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Utility methods for custom JSON converters
/// </summary>
public static class JsonConverterUtils
{
    /// <summary>
    /// Frontend constants for Comments in Platform. These are used in TypeScript code and passed
    /// back in JSON.
    /// </summary>
    /// <remarks>
    /// In Paratext 9, Comments are called "Notes".
    /// </remarks>
    internal static class PlatformComment
    {
        internal class Status
        {
            public const string RESOLVED = "Resolved";
            public const string TO_DO = "Todo";
            public const string DONE = "Done";
            public const string UNSPECIFIED = "Unspecified";
        }

        internal class Type
        {
            public const string NORMAL = "Normal";
            public const string CONFLICT = "Conflict";
            public const string UNSPECIFIED = "Unspecified";
        }
    }

    /// <summary>
    /// Backend constants for Notes in ParatextData. These are typically represented as string-based
    /// quasi-"enums" in Paratext, for backward compatibility and easy serialization.
    /// </summary>
    /// <remarks>
    /// In Platform, Notes are called "Comments".
    /// </remarks>
    internal static class ParatextNote
    {
        internal class Status
        {
            public const string RESOLVED = "deleted";
            public const string TO_DO = "todo";
            public const string DONE = "done";
            public const string UNSPECIFIED = "";
        }

        internal class Type
        {
            public const string NORMAL = "normal";
            public const string CONFLICT = "conflict";
            public const string UNSPECIFIED = "";
        }
    }

    /// <summary>
    /// Maps frontend CommentStatus to backend NoteStatus.
    /// </summary>
    public static string ConvertCommentStatusToNoteStatus(string commentStatus)
    {
        return commentStatus switch
        {
            PlatformComment.Status.RESOLVED => ParatextNote.Status.RESOLVED,
            PlatformComment.Status.TO_DO => ParatextNote.Status.TO_DO,
            PlatformComment.Status.DONE => ParatextNote.Status.DONE,
            PlatformComment.Status.UNSPECIFIED => ParatextNote.Status.UNSPECIFIED,
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
            ParatextNote.Status.RESOLVED => PlatformComment.Status.RESOLVED,
            ParatextNote.Status.TO_DO => PlatformComment.Status.TO_DO,
            ParatextNote.Status.DONE => PlatformComment.Status.DONE,
            ParatextNote.Status.UNSPECIFIED => PlatformComment.Status.UNSPECIFIED,
            _ => noteStatus.Length > 0
                ? char.ToUpperInvariant(noteStatus[0]) + noteStatus[1..]
                : PlatformComment.Status.UNSPECIFIED,
        };
    }

    /// <summary>
    /// Maps frontend CommentType to backend NoteType.
    /// </summary>
    public static string ConvertCommentTypeToNoteType(string commentType)
    {
        return commentType switch
        {
            PlatformComment.Type.UNSPECIFIED => ParatextNote.Type.UNSPECIFIED,
            PlatformComment.Type.NORMAL => ParatextNote.Type.NORMAL,
            PlatformComment.Type.CONFLICT => ParatextNote.Type.CONFLICT,
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
            ParatextNote.Type.UNSPECIFIED => PlatformComment.Type.UNSPECIFIED,
            ParatextNote.Type.NORMAL => PlatformComment.Type.NORMAL,
            ParatextNote.Type.CONFLICT => PlatformComment.Type.CONFLICT,
            _ => noteType.Length > 0
                ? char.ToUpperInvariant(noteType[0]) + noteType[1..]
                : PlatformComment.Type.UNSPECIFIED,
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
