# C# Notification Service Design

**Date**: 2026-04-30  
**Branch**: pt-3816-auto-sync-on-startup

## Goal

Expose the TypeScript `NotificationService` network object to C# backend code so data providers and other C# components can call `send` and `dismiss`.

## Context

The TypeScript `NotificationService` is a PAPI network object (registered as `"NotificationService"`) with two methods:

- `send(notification: PlatformNotification): Promise<string | number>` — displays a toast and returns its ID
- `dismiss(notificationId: string | number): Promise<void>` — removes a toast by ID

The C# backend communicates with TypeScript network objects via `PapiClient.SendRequestAsync`, using the request format `"object:{NetworkObjectName}.{methodName}"`. Existing C# services (`LocalizationService`, `AppService`, `SettingsService`) follow a consistent pattern: static internal classes in `c-sharp/Services/` that take a `PapiClient` and block synchronously with `ThreadingUtils.GetTaskResult`.

## Decision: Approach A — `NotificationId` struct

The `send` return type is `string | number` in TypeScript. The `dismiss` method needs the original type back because JavaScript `Map.get()` is type-sensitive (`42` and `"42"` are different keys). We handle this with a `NotificationId` readonly struct that preserves the original JSON type internally and exposes `ToSerializable()` for round-tripping.

Rejected alternatives:

- **`string` everywhere**: `GetString()` on a number JSON token returns null — silently broken if sonner returns a numeric ID.
- **`JsonElement` passthrough**: Pushes JSON complexity onto every caller.

## Files

One new file: `c-sharp/Services/NotificationService.cs`

Contains four types (co-located, matching the `LocalizationService.cs` precedent):

1. `NotificationSeverity` — enum
2. `PlatformNotification` — C# record
3. `NotificationId` — readonly struct
4. `NotificationService` — static service class

## Type Designs

### `NotificationSeverity`

```csharp
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum NotificationSeverity
{
    [JsonPropertyName("info")] Info,
    [JsonPropertyName("warning")] Warning,
    [JsonPropertyName("error")] Error
}
```

### `NotificationId`

Preserves the original JSON type (string or number) so `Dismiss` can send back the correct type.

```csharp
public readonly struct NotificationId
{
    private readonly string _value;  // string representation for logging
    private readonly bool _isNumber; // whether the original JSON token was a number

    private NotificationId(string value, bool isNumber) { ... }

    internal static NotificationId FromString(string value) => new(value, false);
    internal static NotificationId FromNumber(long value) => new(value.ToString(), true);
    // Note: assumes numeric IDs are integers (which sonner produces). If the JSON token
    // is a floating-point number, the converter reads it with GetInt64() — safe in practice.

    // Returns string or long — StreamJsonRpc serializes the correct JSON type
    internal object ToSerializable() => _isNumber ? long.Parse(_value) : _value;

    public override string ToString() => _value;
}
```

A `JsonConverter<NotificationId>` in the same file reads the `send` response and calls the appropriate factory based on whether the JSON token is a `String` or `Number`.

### `PlatformNotification`

```csharp
public record PlatformNotification(string Message, NotificationSeverity Severity)
{
    public string? ClickCommandLabel { get; init; }
    public string? ClickCommand { get; init; }
    public int? Duration { get; init; }

    [JsonIgnore]
    public NotificationId? NotificationId { get; init; }

    // Serialized as the original JSON type (string or number)
    [JsonPropertyName("notificationId")]
    public object? NotificationIdSerializable => NotificationId?.ToSerializable();
}
```

`NotificationId` is typed for C# callers and `[JsonIgnore]`d; `NotificationIdSerializable` is the computed property that STJ serializes as the correct JSON type.

### `NotificationService`

```csharp
internal static class NotificationService
{
    private const string SERVICE_OBJECT = "object:NotificationService";
    private const string SERVICE_SEND    = SERVICE_OBJECT + ".send";
    private const string SERVICE_DISMISS = SERVICE_OBJECT + ".dismiss";

    public static NotificationId Send(PapiClient papiClient, PlatformNotification notification)
    {
        var result = ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<JsonElement>(SERVICE_SEND, [notification]),
            "NotificationService.Send",
            ThreadingUtils.DefaultTimeout
        );
        return NotificationIdConverter.FromJsonElement(result);
    }

    public static void Dismiss(PapiClient papiClient, NotificationId notificationId)
    {
        ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync(SERVICE_DISMISS, [notificationId.ToSerializable()]),
            "NotificationService.Dismiss",
            ThreadingUtils.DefaultTimeout
        );
    }
}
```

## PAPI Request Names

| Method  | Request string                       |
| ------- | ------------------------------------ |
| send    | `object:NotificationService.send`    |
| dismiss | `object:NotificationService.dismiss` |

## Error Handling

Follows the existing pattern: `ThreadingUtils.GetTaskResult` throws on timeout or PAPI error. Callers are responsible for catching exceptions if they want graceful degradation (same as `LocalizationService` with `shouldThrowErrors`).

## Testing

- Unit test the `NotificationId` converter with both string and number JSON tokens
- Unit test `ToSerializable()` round-trips correctly for both types
- Integration smoke test: call `Send` against a running app and verify a toast appears; call `Dismiss` with the returned ID and verify it disappears
