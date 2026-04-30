# C# Notification Service Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a C# `NotificationService` static class that lets backend code call `send` and `dismiss` on the TypeScript `NotificationService` PAPI network object.

**Architecture:** One new file `c-sharp/Services/NotificationService.cs` contains four types: `NotificationSeverity` (enum), `NotificationId` (struct preserving the original string/number JSON type for round-tripping), `NotificationIdConverter` (JsonConverter + static helper), `PlatformNotification` (record), and `NotificationService` (static class). Follows the existing pattern of `LocalizationService`/`AppService` — takes a `PapiClient`, blocks synchronously with `ThreadingUtils`.

**Tech Stack:** .NET 8, C#, NUnit, `System.Text.Json`, StreamJsonRpc, `PapiClient.SendRequestAsync`

---

## File Map

| Action | Path                                                 | Responsibility                                            |
| ------ | ---------------------------------------------------- | --------------------------------------------------------- |
| Create | `c-sharp/Services/NotificationService.cs`            | All four types (enum, struct, converter, record, service) |
| Create | `c-sharp-tests/Services/NotificationServiceTests.cs` | All unit tests                                            |

---

## Task 1: `NotificationSeverity` enum

**Files:**

- Create: `c-sharp/Services/NotificationService.cs`
- Create: `c-sharp-tests/Services/NotificationServiceTests.cs`

- [ ] **Step 1: Create the test file with `NotificationSeverity` tests**

Create `c-sharp-tests/Services/NotificationServiceTests.cs`:

```csharp
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
[TestFixture]
public class NotificationServiceTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void Setup()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void NotificationSeverity_Info_SerializesToInfoString()
    {
        string json = JsonSerializer.Serialize(NotificationSeverity.Info, _options);
        Assert.That(json, Is.EqualTo(@"""info"""));
    }

    [Test]
    public void NotificationSeverity_Warning_SerializesToWarningString()
    {
        string json = JsonSerializer.Serialize(NotificationSeverity.Warning, _options);
        Assert.That(json, Is.EqualTo(@"""warning"""));
    }

    [Test]
    public void NotificationSeverity_Error_SerializesToErrorString()
    {
        string json = JsonSerializer.Serialize(NotificationSeverity.Error, _options);
        Assert.That(json, Is.EqualTo(@"""error"""));
    }
}
```

- [ ] **Step 2: Run the tests — expect RED (type does not exist yet)**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: compilation error mentioning `NotificationSeverity` not found.

- [ ] **Step 3: Create `c-sharp/Services/NotificationService.cs` with the enum**

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(JsonStringEnumConverter<NotificationSeverity>))]
public enum NotificationSeverity
{
    Info,
    Warning,
    Error,
}
```

- [ ] **Step 4: Run the tests — expect GREEN**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: all 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Services/NotificationService.cs c-sharp-tests/Services/NotificationServiceTests.cs
git commit -m "feat: add NotificationSeverity enum for C# notification service"
```

---

## Task 2: `NotificationId` struct and `NotificationIdConverter`

**Files:**

- Modify: `c-sharp/Services/NotificationService.cs`
- Modify: `c-sharp-tests/Services/NotificationServiceTests.cs`

- [ ] **Step 1: Add `NotificationId` tests to the test file**

Append these test methods inside the `NotificationServiceTests` class (after the existing severity tests):

```csharp
    // --- NotificationId ---

    [Test]
    public void NotificationId_FromString_ToStringReturnsValue()
    {
        var id = NotificationId.FromString("abc-123");
        Assert.That(id.ToString(), Is.EqualTo("abc-123"));
    }

    [Test]
    public void NotificationId_FromNumber_ToStringReturnsStringRepresentation()
    {
        var id = NotificationId.FromNumber(42L);
        Assert.That(id.ToString(), Is.EqualTo("42"));
    }

    [Test]
    public void NotificationId_FromString_ToSerializableReturnsString()
    {
        var id = NotificationId.FromString("abc-123");
        Assert.That(id.ToSerializable(), Is.InstanceOf<string>());
        Assert.That((string)id.ToSerializable(), Is.EqualTo("abc-123"));
    }

    [Test]
    public void NotificationId_FromNumber_ToSerializableReturnsLong()
    {
        var id = NotificationId.FromNumber(42L);
        Assert.That(id.ToSerializable(), Is.InstanceOf<long>());
        Assert.That((long)id.ToSerializable(), Is.EqualTo(42L));
    }

    [Test]
    public void NotificationIdConverter_DeserializesStringToken()
    {
        var id = JsonSerializer.Deserialize<NotificationId>(@"""my-id""");
        Assert.That(id.ToString(), Is.EqualTo("my-id"));
        Assert.That(id.ToSerializable(), Is.InstanceOf<string>());
    }

    [Test]
    public void NotificationIdConverter_DeserializesNumberToken()
    {
        var id = JsonSerializer.Deserialize<NotificationId>("99");
        Assert.That(id.ToString(), Is.EqualTo("99"));
        Assert.That(id.ToSerializable(), Is.InstanceOf<long>());
        Assert.That((long)id.ToSerializable(), Is.EqualTo(99L));
    }

    [Test]
    public void NotificationIdConverter_FromJsonElement_StringElement()
    {
        var element = JsonDocument.Parse(@"""hello""").RootElement;
        var id = NotificationIdConverter.FromJsonElement(element);
        Assert.That(id.ToString(), Is.EqualTo("hello"));
        Assert.That(id.ToSerializable(), Is.InstanceOf<string>());
    }

    [Test]
    public void NotificationIdConverter_FromJsonElement_NumberElement()
    {
        var element = JsonDocument.Parse("77").RootElement;
        var id = NotificationIdConverter.FromJsonElement(element);
        Assert.That(id.ToString(), Is.EqualTo("77"));
        Assert.That((long)id.ToSerializable(), Is.EqualTo(77L));
    }
```

- [ ] **Step 2: Run the tests — expect RED (types do not exist yet)**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: compilation errors for `NotificationId`, `NotificationIdConverter`.

- [ ] **Step 3: Add `NotificationId` struct and `NotificationIdConverter` to `NotificationService.cs`**

Add after the `NotificationSeverity` enum (the full file now):

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(JsonStringEnumConverter<NotificationSeverity>))]
public enum NotificationSeverity
{
    Info,
    Warning,
    Error,
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
        var serializable = value.ToSerializable();
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
```

- [ ] **Step 4: Run the tests — expect GREEN**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: all 11 tests pass (3 severity + 8 NotificationId).

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Services/NotificationService.cs c-sharp-tests/Services/NotificationServiceTests.cs
git commit -m "feat: add NotificationId struct and converter for C# notification service"
```

---

## Task 3: `PlatformNotification` record

**Files:**

- Modify: `c-sharp/Services/NotificationService.cs`
- Modify: `c-sharp-tests/Services/NotificationServiceTests.cs`

- [ ] **Step 1: Add `PlatformNotification` tests to the test file**

Append inside the `NotificationServiceTests` class:

```csharp
    // --- PlatformNotification ---

    [Test]
    public void PlatformNotification_RequiredFields_SerializesCorrectly()
    {
        var notification = new PlatformNotification("Hello world", NotificationSeverity.Warning);
        string json = JsonSerializer.Serialize(notification, _options);

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.That(root.GetProperty("message").GetString(), Is.EqualTo("Hello world"));
        Assert.That(root.GetProperty("severity").GetString(), Is.EqualTo("warning"));
        Assert.That(root.TryGetProperty("clickCommandLabel", out _), Is.False);
        Assert.That(root.TryGetProperty("notificationId", out _), Is.False);
        Assert.That(root.TryGetProperty("duration", out _), Is.False);
    }

    [Test]
    public void PlatformNotification_WithStringNotificationId_SerializesIdAsString()
    {
        var existingId = NotificationId.FromString("existing-toast");
        var notification = new PlatformNotification("Updated message", NotificationSeverity.Info)
        {
            NotificationId = existingId,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.That(root.GetProperty("notificationId").ValueKind, Is.EqualTo(JsonValueKind.String));
        Assert.That(root.GetProperty("notificationId").GetString(), Is.EqualTo("existing-toast"));
    }

    [Test]
    public void PlatformNotification_WithNumericNotificationId_SerializesIdAsNumber()
    {
        var existingId = NotificationId.FromNumber(7L);
        var notification = new PlatformNotification("Updated message", NotificationSeverity.Error)
        {
            NotificationId = existingId,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.That(root.GetProperty("notificationId").ValueKind, Is.EqualTo(JsonValueKind.Number));
        Assert.That(root.GetProperty("notificationId").GetInt64(), Is.EqualTo(7L));
    }

    [Test]
    public void PlatformNotification_WithOptionalFields_SerializesAllFields()
    {
        var notification = new PlatformNotification("Test", NotificationSeverity.Info)
        {
            ClickCommandLabel = "View details",
            ClickCommand = "myExtension.viewDetails",
            Duration = 5000,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.That(root.GetProperty("clickCommandLabel").GetString(), Is.EqualTo("View details"));
        Assert.That(root.GetProperty("clickCommand").GetString(), Is.EqualTo("myExtension.viewDetails"));
        Assert.That(root.GetProperty("duration").GetInt32(), Is.EqualTo(5000));
    }
```

- [ ] **Step 2: Run the tests — expect RED**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: compilation error for `PlatformNotification` not found.

- [ ] **Step 3: Add `PlatformNotification` record to `NotificationService.cs`**

Append after `NotificationIdConverter` (the full file now):

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(JsonStringEnumConverter<NotificationSeverity>))]
public enum NotificationSeverity
{
    Info,
    Warning,
    Error,
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
        var serializable = value.ToSerializable();
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
```

- [ ] **Step 4: Run the tests — expect GREEN**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: all 15 tests pass (3 severity + 8 NotificationId + 4 PlatformNotification).

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Services/NotificationService.cs c-sharp-tests/Services/NotificationServiceTests.cs
git commit -m "feat: add PlatformNotification record for C# notification service"
```

---

## Task 4: `NotificationService` static class

**Files:**

- Modify: `c-sharp/Services/NotificationService.cs`
- Modify: `c-sharp-tests/Services/NotificationServiceTests.cs`

- [ ] **Step 1: Add `NotificationService` tests to the test file**

The tests use `DummyPapiClient` (in `TestParanextDataProvider` namespace) which lets you register handlers for PAPI request types. Add `using TestParanextDataProvider;` at the top of the test file, then add these fields and methods to `NotificationServiceTests`:

Add at the top of the file:

```csharp
using TestParanextDataProvider;
```

Add these fields in the `NotificationServiceTests` class (alongside the existing `_options` field):

```csharp
    private DummyPapiClient _client = null!;

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
    }
```

Update `Setup()` to also initialize `_client`:

```csharp
    [SetUp]
    public void Setup()
    {
        _options = SerializationOptions.CreateSerializationOptions();
        _client = new DummyPapiClient();
    }
```

Append these test methods inside the class:

```csharp
    // --- NotificationService ---

    [Test]
    public async Task NotificationService_Send_ReturnsStringId_WhenServerRespondsWithString()
    {
        var expectedId = "toast-abc";
        Func<object?, JsonElement> handler = (_) =>
            JsonDocument.Parse($@"""{expectedId}""").RootElement;
        await _client.RegisterRequestHandlerAsync("object:NotificationService.send", handler);

        var notification = new PlatformNotification("Hello", NotificationSeverity.Info);
        var id = NotificationService.Send(_client, notification);

        Assert.That(id.ToString(), Is.EqualTo(expectedId));
        Assert.That(id.ToSerializable(), Is.InstanceOf<string>());
    }

    [Test]
    public async Task NotificationService_Send_ReturnsNumericId_WhenServerRespondsWithNumber()
    {
        Func<object?, JsonElement> handler = (_) => JsonDocument.Parse("55").RootElement;
        await _client.RegisterRequestHandlerAsync("object:NotificationService.send", handler);

        var notification = new PlatformNotification("Hello", NotificationSeverity.Warning);
        var id = NotificationService.Send(_client, notification);

        Assert.That(id.ToString(), Is.EqualTo("55"));
        Assert.That(id.ToSerializable(), Is.InstanceOf<long>());
        Assert.That((long)id.ToSerializable(), Is.EqualTo(55L));
    }

    [Test]
    public async Task NotificationService_Dismiss_WithStringId_PassesStringToServer()
    {
        object? receivedArg = null;
        Action<object?> handler = (arg) => { receivedArg = arg; };
        await _client.RegisterRequestHandlerAsync("object:NotificationService.dismiss", handler);

        var id = NotificationId.FromString("my-toast");
        NotificationService.Dismiss(_client, id);

        Assert.That(receivedArg, Is.EqualTo("my-toast"));
        Assert.That(receivedArg, Is.InstanceOf<string>());
    }

    [Test]
    public async Task NotificationService_Dismiss_WithNumericId_PassesLongToServer()
    {
        object? receivedArg = null;
        Action<object?> handler = (arg) => { receivedArg = arg; };
        await _client.RegisterRequestHandlerAsync("object:NotificationService.dismiss", handler);

        var id = NotificationId.FromNumber(42L);
        NotificationService.Dismiss(_client, id);

        Assert.That(receivedArg, Is.InstanceOf<long>());
        Assert.That((long)receivedArg!, Is.EqualTo(42L));
    }
```

- [ ] **Step 2: Run the tests — expect RED**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: compilation errors for `NotificationService.Send` / `NotificationService.Dismiss`.

- [ ] **Step 3: Add `NotificationService` class to `NotificationService.cs`**

Append at the end of the file (after `PlatformNotification`):

```csharp
internal static class NotificationService
{
    private const string SERVICE_OBJECT = "object:NotificationService";
    private const string SERVICE_SEND = SERVICE_OBJECT + ".send";
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
        ThreadingUtils.RunTask(
            papiClient.SendRequestAsync(SERVICE_DISMISS, [notificationId.ToSerializable()]),
            "NotificationService.Dismiss",
            ThreadingUtils.DefaultTimeout
        );
    }
}
```

Also add `using Paranext.DataProvider;` at the top of `NotificationService.cs` (needed for `PapiClient` and `ThreadingUtils`):

Full top-of-file `using` block:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider;
```

- [ ] **Step 4: Run all tests — expect GREEN**

```bash
cd c-sharp-tests && dotnet test --filter "Class=Paranext.DataProvider.Services.Tests.NotificationServiceTests"
```

Expected: all 19 tests pass.

- [ ] **Step 5: Run the full C# test suite to check for regressions**

```bash
cd c-sharp-tests && dotnet test
```

Expected: all tests pass (no regressions).

- [ ] **Step 6: Commit**

```bash
git add c-sharp/Services/NotificationService.cs c-sharp-tests/Services/NotificationServiceTests.cs
git commit -m "feat: add C# NotificationService with Send and Dismiss methods"
```

---

## Self-Review Notes

- **Spec coverage**: All four types from spec implemented. `NotificationId` struct preserves string/number type. `PlatformNotification` omits null optional fields. `NotificationService` uses synchronous blocking pattern matching existing services. PAPI request names match spec table.
- **No placeholders**: All steps contain complete code.
- **Type consistency**: `NotificationId.FromString`, `FromNumber`, `ToSerializable` used consistently across Tasks 2, 3, and 4. `NotificationIdConverter.FromJsonElement` used in `NotificationService.Send`. `ThreadingUtils.GetTaskResult` for `Send` (returns value), `ThreadingUtils.RunTask` for `Dismiss` (void).
- **Edge**: `Dismiss` uses `RunTask` (logs on failure, returns bool) rather than throwing — acceptable for a best-effort dismiss operation.
