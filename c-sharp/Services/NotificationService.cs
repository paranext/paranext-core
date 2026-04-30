using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(NotificationSeverityConverter))]
public enum NotificationSeverity
{
    Info,
    Warning,
    Error,
}

internal sealed class NotificationSeverityConverter : JsonConverter<NotificationSeverity>
{
    public override NotificationSeverity Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        return reader.GetString() switch
        {
            "info" => NotificationSeverity.Info,
            "warning" => NotificationSeverity.Warning,
            "error" => NotificationSeverity.Error,
            var s => throw new JsonException($"Unknown notification severity: {s}"),
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        NotificationSeverity value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStringValue(
            value switch
            {
                NotificationSeverity.Info => "info",
                NotificationSeverity.Warning => "warning",
                NotificationSeverity.Error => "error",
                _ => throw new JsonException($"Unknown notification severity: {value}"),
            }
        );
    }
}

[JsonConverter(typeof(NotificationIdConverter))]
public readonly struct NotificationId
{
    private readonly string _value;
    private readonly bool _isNumber;

    private NotificationId(string value, bool isNumber)
    {
        _value = value;
        _isNumber = isNumber;
    }

    internal static NotificationId FromString(string value) => new(value, false);

    // Assumes numeric IDs are integers (which sonner produces).
    // GetInt64() will throw for decimal-point numbers — acceptable per spec.
    internal static NotificationId FromNumber(long value) => new(value.ToString(), true);

    // Returns string or long so StreamJsonRpc serializes the correct JSON type back to TypeScript.
    // JavaScript Map.get() is type-sensitive: 42 !== "42".
    internal object ToSerializable() => _isNumber ? long.Parse(_value) : _value;

    public override string ToString() => _value;
}

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

public record PlatformNotification(string Message, NotificationSeverity Severity)
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ClickCommandLabel { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ClickCommand { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Duration { get; init; }

    // Typed for C# callers — excluded from serialization to avoid the wrong property name/type.
    [JsonIgnore]
    public NotificationId? NotificationId { get; init; }

    // Serialized as the original JSON type (string or number). Omitted when null.
    [JsonPropertyName("notificationId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? NotificationIdSerializable => NotificationId?.ToSerializable();
}
