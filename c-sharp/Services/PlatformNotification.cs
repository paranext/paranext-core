using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Services;

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
