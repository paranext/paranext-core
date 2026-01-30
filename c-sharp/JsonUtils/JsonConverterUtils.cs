using System.Text.Json;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Utility methods for custom JSON converters
/// </summary>
public static class JsonConverterUtils
{
    /// <summary>
    /// Maps TypeScript CommentStatus values to C# NoteStatus internal string representations.
    /// TypeScript: 'Unspecified' | 'Todo' | 'Done' | 'Resolved'
    /// C# NoteStatus: "" | "todo" | "done" | "deleted"
    /// </summary>
    public static string ConvertCommentStatusToNoteStatus(string commentStatus)
    {
        return commentStatus switch
        {
            "Resolved" => "deleted",
            "Todo" => "todo",
            "Done" => "done",
            "Unspecified" => "",
            "" => "",
            _ => commentStatus.ToLowerInvariant(),
        };
    }

    /// <summary>
    /// Maps C# NoteStatus internal string representations to TypeScript CommentStatus values.
    /// C# NoteStatus: "" | "todo" | "done" | "deleted"
    /// TypeScript: 'Unspecified' | 'Todo' | 'Done' | 'Resolved'
    /// </summary>
    public static string ConvertNoteStatusToCommentStatus(string noteStatus)
    {
        return noteStatus switch
        {
            "deleted" => "Resolved",
            "todo" => "Todo",
            "done" => "Done",
            "" => "Unspecified",
            _ => noteStatus.Length > 0
                ? char.ToUpperInvariant(noteStatus[0]) + noteStatus.Substring(1)
                : "Unspecified",
        };
    }

    /// <summary>
    /// Maps TypeScript CommentType values to C# NoteType internal string representations.
    /// TypeScript: 'Unspecified' | 'Normal' | 'Conflict'
    /// C# NoteType: "" | "normal" | "conflict"
    /// </summary>
    public static string ConvertCommentTypeToNoteType(string commentType)
    {
        return commentType switch
        {
            "Unspecified" => "",
            "Normal" => "normal",
            "Conflict" => "conflict",
            "" => "",
            _ => commentType.ToLowerInvariant(),
        };
    }

    /// <summary>
    /// Maps C# NoteType internal string representations to TypeScript CommentType values.
    /// C# NoteType: "" | "normal" | "conflict"
    /// TypeScript: 'Unspecified' | 'Normal' | 'Conflict'
    /// </summary>
    public static string ConvertNoteTypeToCommentType(string noteType)
    {
        return noteType switch
        {
            "" => "Unspecified",
            "normal" => "Normal",
            "conflict" => "Conflict",
            _ => noteType.Length > 0
                ? char.ToUpperInvariant(noteType[0]) + noteType.Substring(1)
                : "Unspecified",
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
