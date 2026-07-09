using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Serializes the getCommentThreads response so a single thread that cannot be serialized does not
/// abort the whole response. Each thread is serialized into its own buffer; only threads
/// that serialize successfully are written to the output. A thread that throws is dropped and logged.
/// </summary>
public class PlatformCommentThreadListConverter : JsonConverter<List<PlatformCommentThreadWrapper>>
{
    public override List<PlatformCommentThreadWrapper> Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    ) =>
        throw new NotSupportedException(
            "Reading List<PlatformCommentThreadWrapper> from JSON is not supported."
        );

    public override void Write(
        Utf8JsonWriter writer,
        List<PlatformCommentThreadWrapper> value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartArray();
        foreach (var thread in value)
        {
            byte[] bytes;
            try
            {
                // Serialize into a separate buffer first: Utf8JsonWriter is forward-only and cannot
                // roll back a partial write, so a thread that throws mid-serialization must never
                // reach the output stream.
                bytes = JsonSerializer.SerializeToUtf8Bytes(thread, options);
            }
            catch (Exception e)
            {
                Console.WriteLine(
                    $"WARNING: dropping comment thread {SafeId(thread)} from getCommentThreads; "
                        + $"it could not be serialized. {e}"
                );
                continue;
            }
            // The bytes came straight from JsonSerializer.SerializeToUtf8Bytes above (already valid
            // JSON), so skip WriteRawValue's redundant re-parse/validation on this hot path.
            writer.WriteRawValue(bytes, skipInputValidation: true);
        }
        writer.WriteEndArray();
    }

    /// <summary>Reads the thread id without throwing, so logging a failed thread can't itself throw.</summary>
    private static string SafeId(PlatformCommentThreadWrapper thread)
    {
        try
        {
            return thread.Id;
        }
        catch
        {
            return "<unknown>";
        }
    }
}
