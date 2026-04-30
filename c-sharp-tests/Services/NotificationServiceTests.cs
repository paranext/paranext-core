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

    // --- PlatformNotification ---

    [Test]
    public void PlatformNotification_RequiredFields_SerializesCorrectly()
    {
        PlatformNotification notification = new("Hello world", NotificationSeverity.Warning);
        string json = JsonSerializer.Serialize(notification, _options);

        using JsonDocument doc = JsonDocument.Parse(json);
        JsonElement root = doc.RootElement;
        Assert.That(root.GetProperty("message").GetString(), Is.EqualTo("Hello world"));
        Assert.That(root.GetProperty("severity").GetString(), Is.EqualTo("warning"));
        Assert.That(root.TryGetProperty("clickCommandLabel", out _), Is.False);
        Assert.That(root.TryGetProperty("notificationId", out _), Is.False);
        Assert.That(root.TryGetProperty("duration", out _), Is.False);
    }

    [Test]
    public void PlatformNotification_WithStringNotificationId_SerializesIdAsString()
    {
        NotificationId existingId = NotificationId.FromString("existing-toast");
        PlatformNotification notification = new("Updated message", NotificationSeverity.Info)
        {
            NotificationId = existingId,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using JsonDocument doc = JsonDocument.Parse(json);
        JsonElement root = doc.RootElement;
        Assert.That(root.GetProperty("notificationId").ValueKind, Is.EqualTo(JsonValueKind.String));
        Assert.That(root.GetProperty("notificationId").GetString(), Is.EqualTo("existing-toast"));
    }

    [Test]
    public void PlatformNotification_WithNumericNotificationId_SerializesIdAsNumber()
    {
        NotificationId existingId = NotificationId.FromNumber(7L);
        PlatformNotification notification = new("Updated message", NotificationSeverity.Error)
        {
            NotificationId = existingId,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using JsonDocument doc = JsonDocument.Parse(json);
        JsonElement root = doc.RootElement;
        Assert.That(root.GetProperty("notificationId").ValueKind, Is.EqualTo(JsonValueKind.Number));
        Assert.That(root.GetProperty("notificationId").GetInt64(), Is.EqualTo(7L));
    }

    [Test]
    public void PlatformNotification_WithOptionalFields_SerializesAllFields()
    {
        PlatformNotification notification = new("Test", NotificationSeverity.Info)
        {
            ClickCommandLabel = "View details",
            ClickCommand = "myExtension.viewDetails",
            Duration = 5000,
        };
        string json = JsonSerializer.Serialize(notification, _options);

        using JsonDocument doc = JsonDocument.Parse(json);
        JsonElement root = doc.RootElement;
        Assert.That(root.GetProperty("clickCommandLabel").GetString(), Is.EqualTo("View details"));
        Assert.That(root.GetProperty("clickCommand").GetString(), Is.EqualTo("myExtension.viewDetails"));
        Assert.That(root.GetProperty("duration").GetInt32(), Is.EqualTo(5000));
    }
}
