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
    ) =>
        JsonConverterUtils.WriteIsolatedArray(
            writer,
            value,
            options,
            thread => $"comment thread {thread.Id}"
        );
}
