using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.JsonUtils;

internal sealed class NotificationIdConverter : JsonConverter<NotificationId>
{
    public override NotificationId Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        return reader.TokenType switch
        {
            JsonTokenType.String => NotificationId.FromString(reader.GetString()!),
            JsonTokenType.Number => NotificationId.FromNumber(reader.GetInt64()),
            _ => throw new JsonException($"Cannot convert {reader.TokenType} to NotificationId"),
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        NotificationId value,
        JsonSerializerOptions options
    )
    {
        object serializable = value.ToSerializable();
        if (serializable is string s)
            writer.WriteStringValue(s);
        else
            writer.WriteNumberValue((long)serializable);
    }

    internal static NotificationId FromJsonElement(JsonElement element)
    {
        return element.ValueKind switch
        {
            JsonValueKind.String => NotificationId.FromString(element.GetString()!),
            JsonValueKind.Number => NotificationId.FromNumber(element.GetInt64()),
            _ => throw new JsonException($"Cannot convert {element.ValueKind} to NotificationId"),
        };
    }
}
