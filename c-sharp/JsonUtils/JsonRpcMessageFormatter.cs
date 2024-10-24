using System.Buffers;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using StreamJsonRpc;
using StreamJsonRpc.Protocol;

public class JsonRpcMessageFormatter : IJsonRpcMessageFormatter
{
    private JsonSerializerOptions _serializationOptions =
        SerializationOptions.CreateSerializationOptions();

    public JsonRpcMessage Deserialize(ReadOnlySequence<byte> contentBuffer)
    {
        var reader = new Utf8JsonReader(contentBuffer);
        return JsonSerializer.Deserialize<JsonRpcMessage>(ref reader, _serializationOptions)
            ?? throw new JsonException("Deserialization returned null.");
    }

    public object GetJsonText(JsonRpcMessage message)
    {
        using var stream = new MemoryStream();
        using (var writer = new Utf8JsonWriter(stream))
        {
            JsonSerializer.Serialize(writer, message, _serializationOptions);
        }
        return Encoding.UTF8.GetString(stream.ToArray());
    }

    public void Serialize(IBufferWriter<byte> bufferWriter, JsonRpcMessage message)
    {
        using var writer = new Utf8JsonWriter(bufferWriter);
        JsonSerializer.Serialize(writer, message, _serializationOptions);
    }
}
