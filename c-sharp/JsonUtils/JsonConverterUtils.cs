using System.Buffers;
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

        // Guard the index like the sibling ConvertNoteStatusToCommentStatus above: an unknown
        // NoteType with an empty InternalValue (corrupt/legacy XML) would otherwise throw
        // IndexOutOfRangeException here and, during getCommentThreads serialization, take down the
        // whole thread.
        return noteTypeEnum.InternalValue.Length > 0
            ? char.ToUpperInvariant(noteTypeEnum.InternalValue[0]) + noteTypeEnum.InternalValue[1..]
            : PlatformCommentWrapper.Json.Type.NORMAL;
    }

    /// <summary>
    /// Serializes <paramref name="items"/> as a JSON array in which a single element that fails to
    /// serialize is dropped (and logged) instead of aborting the whole array, and returns the number
    /// of elements dropped. Each element is serialized into a reused side buffer first — <see
    /// cref="Utf8JsonWriter"/> is forward-only and cannot roll back a partial write, so an element
    /// that throws mid-serialization must never reach <paramref name="writer"/> — and only elements
    /// that serialize cleanly are copied out.
    /// </summary>
    /// <param name="serializeItem">
    /// Optional custom per-element writer that returns how many NESTED elements it dropped (e.g. a
    /// comment thread that itself isolates its comments). Those nested drops are added to this array's
    /// returned count, so the caller gets a single total spanning both this level and one level down —
    /// this is how a comment dropped inside an otherwise-serializable thread still reaches
    /// <c>hiddenCount</c>. When null, each element is whole-object serialized via
    /// <see cref="JsonSerializer"/>, which drops nothing of its own.
    /// </param>
    /// <remarks>
    /// A <see cref="CommentThreadContextMissingException"/> is a wiring/programmer error, not corrupt
    /// data, so it is allowed to propagate rather than being swallowed as a dropped element — a
    /// wiring regression should surface loudly. The side buffer is allocated once and reused across
    /// all elements (one allocation per array, not per element).
    /// </remarks>
    internal static int WriteIsolatedArray<T>(
        Utf8JsonWriter writer,
        IEnumerable<T> items,
        JsonSerializerOptions options,
        Func<T, string> describe,
        Func<Utf8JsonWriter, T, JsonSerializerOptions, int>? serializeItem = null
    )
    {
        writer.WriteStartArray();
        int dropped = 0;
        var buffer = new ArrayBufferWriter<byte>();
        using var itemWriter = new Utf8JsonWriter(
            buffer,
            new JsonWriterOptions { Encoder = options.Encoder, SkipValidation = true }
        );
        foreach (T item in items)
        {
            buffer.Clear();
            itemWriter.Reset();
            int nestedDropped = 0;
            try
            {
                if (serializeItem is null)
                    JsonSerializer.Serialize(itemWriter, item, options);
                else
                    nestedDropped = serializeItem(itemWriter, item, options);
                itemWriter.Flush();
            }
            catch (CommentThreadContextMissingException)
            {
                throw;
            }
            catch (Exception e)
            {
                itemWriter.Reset();
                dropped++;
                Console.WriteLine(
                    $"WARNING: dropping {SafeDescribe(item, describe)} from serialization; "
                        + $"it could not be serialized. {e.Message}"
                );
                continue;
            }
            // The bytes came straight from Utf8JsonWriter above (already valid JSON), so skip
            // WriteRawValue's redundant re-parse/validation.
            writer.WriteRawValue(buffer.WrittenSpan, skipInputValidation: true);
            // A survivor may still have shed nested elements (e.g. a thread that dropped one of its
            // comments); count those too.
            dropped += nestedDropped;
        }
        writer.WriteEndArray();
        return dropped;
    }

    /// <summary>Describes an item for a log message without throwing, so logging a failed item can't
    /// itself throw.</summary>
    private static string SafeDescribe<T>(T item, Func<T, string> describe)
    {
        try
        {
            return describe(item);
        }
        catch
        {
            return "<unknown>";
        }
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
