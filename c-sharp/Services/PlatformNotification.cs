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

    /// <summary>
    /// Command the renderer runs when the USER removes the notification without choosing an
    /// action: the close button, a swipe-away, or the auto-close timeout. Receives the notification
    /// id as its single argument. Not run when the notification is dismissed programmatically via
    /// <see cref="NotificationService.Dismiss"/>, nor when the user clicks
    /// <see cref="ClickCommand"/>. Mirrors the renderer's <c>dismissClickCommand</c>
    /// (<c>src/shared/models/notification.service-model.ts</c>), which is experimental.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DismissClickCommand { get; init; }

    // Typed for C# callers — excluded from serialization to avoid the wrong property name/type.
    [JsonIgnore]
    public NotificationId? NotificationId { get; init; }

    // Serialized as the original JSON type (string or number). Omitted when null.
    [JsonPropertyName("notificationId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? NotificationIdSerializable => NotificationId?.ToSerializable();
}
