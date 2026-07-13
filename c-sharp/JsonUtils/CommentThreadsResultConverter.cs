using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Serializes the getCommentThreads response (<see cref="CommentThreadsResult"/>) as an object
/// <c>{ threads, hiddenCount }</c>. Each thread — and each comment within a thread — is serialized in
/// isolation, so a single thread or comment that cannot be serialized is dropped and logged rather
/// than aborting the whole response. Every drop, at EITHER level, is counted in <c>hiddenCount</c> so
/// the UI can tell the user that some notes couldn't be shown.
/// </summary>
public class CommentThreadsResultConverter : JsonConverter<CommentThreadsResult>
{
    private const string THREADS = "threads";
    private const string HIDDEN_COUNT = "hiddenCount";

    public override CommentThreadsResult Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    ) =>
        throw new NotSupportedException("Reading CommentThreadsResult from JSON is not supported.");

    public override void Write(
        Utf8JsonWriter writer,
        CommentThreadsResult value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();
        writer.WritePropertyName(THREADS);
        // WriteIsolatedArray counts whole dropped threads; WriteThread reports how many comments it
        // dropped inside a surviving thread, and WriteIsolatedArray rolls those into the same total.
        // So hiddenCount covers BOTH a whole unserializable thread AND a single unserializable comment
        // in an otherwise-healthy thread.
        int hiddenCount = JsonConverterUtils.WriteIsolatedArray(
            writer,
            value.Threads,
            options,
            thread => $"comment thread {thread.Id}",
            PlatformCommentThreadConverter.WriteThread
        );
        writer.WriteNumber(HIDDEN_COUNT, hiddenCount);
        writer.WriteEndObject();
    }
}
