using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Serializes the getCommentThreads response as an object <c>{ threads, hiddenCount }</c>. Each
/// thread is serialized into its own buffer so a single thread that cannot be serialized does not
/// abort the whole response — it is dropped and logged, and counted in <c>hiddenCount</c> so the UI
/// can tell the user some notes couldn't be shown.
/// </summary>
public class PlatformCommentThreadListConverter : JsonConverter<List<PlatformCommentThreadWrapper>>
{
    private const string THREADS = "threads";
    private const string HIDDEN_COUNT = "hiddenCount";

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
        writer.WriteStartObject();
        writer.WritePropertyName(THREADS);
        int hiddenCount = JsonConverterUtils.WriteIsolatedArray(
            writer,
            value,
            options,
            thread => $"comment thread {thread.Id}"
        );
        writer.WriteNumber(HIDDEN_COUNT, hiddenCount);
        writer.WriteEndObject();
    }
}
