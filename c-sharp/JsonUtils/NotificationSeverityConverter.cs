using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.JsonUtils;

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
