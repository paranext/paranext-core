using System.Text.Json;
using Paratext.Data.ProjectComments;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Utility methods for custom JSON converters
/// </summary>
public static class JsonConverterUtils
{
    /// <summary>
    /// Maps frontend comment status string to backend <see cref="Enum{NoteStatus}"/>.
    /// </summary>
    public static Enum<NoteStatus> ConvertCommentStatusToNoteStatus(string commentStatus)
    {
        var noteStatus = commentStatus switch
        {
            PlatformCommentWrapper.Json.Status.RESOLVED => NoteStatus.Resolved,
            PlatformCommentWrapper.Json.Status.TO_DO => NoteStatus.Todo,
            PlatformCommentWrapper.Json.Status.DONE => NoteStatus.Done,
            PlatformCommentWrapper.Json.Status.UNSPECIFIED => NoteStatus.Unspecified,
            _ => new Enum<NoteStatus>(commentStatus.ToLowerInvariant()),
        };
        return noteStatus;
    }

    /// <summary>
    /// Maps backend <see cref="Enum{NoteStatus}"/> to frontend comment status string.
    /// </summary>
    public static string ConvertNoteStatusToCommentStatus(Enum<NoteStatus> noteStatusEnum)
    {
        if (noteStatusEnum == NoteStatus.Resolved)
            return PlatformCommentWrapper.Json.Status.RESOLVED;
        if (noteStatusEnum == NoteStatus.Todo)
            return PlatformCommentWrapper.Json.Status.TO_DO;
        if (noteStatusEnum == NoteStatus.Done)
            return PlatformCommentWrapper.Json.Status.DONE;
        if (noteStatusEnum == NoteStatus.Unspecified)
            return PlatformCommentWrapper.Json.Status.UNSPECIFIED;

        return noteStatusEnum.InternalValue.Length > 0
            ? char.ToUpperInvariant(noteStatusEnum.InternalValue[0])
                + noteStatusEnum.InternalValue[1..]
            : PlatformCommentWrapper.Json.Status.UNSPECIFIED;
    }

    /// <summary>
    /// Maps frontend comment type string to backend <see cref="Enum{NoteType}"/>.
    /// </summary>
    public static Enum<NoteType> ConvertCommentTypeToNoteType(string commentType)
    {
        var noteType = commentType switch
        {
            PlatformCommentWrapper.Json.Type.NORMAL => NoteType.Normal,
            PlatformCommentWrapper.Json.Type.CONFLICT => NoteType.Conflict,
            _ => new Enum<NoteType>(commentType.ToLowerInvariant()),
        };
        return noteType;
    }

    /// <summary>
    /// Maps backend <see cref="Enum{NoteType}"/> to frontend comment type string.
    /// </summary>
    public static string ConvertNoteTypeToCommentType(Enum<NoteType> noteTypeEnum)
    {
        if (noteTypeEnum == NoteType.Normal)
            return PlatformCommentWrapper.Json.Type.NORMAL;
        if (noteTypeEnum == NoteType.Conflict)
            return PlatformCommentWrapper.Json.Type.CONFLICT;

        return char.ToUpperInvariant(noteTypeEnum.InternalValue[0])
            + noteTypeEnum.InternalValue[1..];
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
