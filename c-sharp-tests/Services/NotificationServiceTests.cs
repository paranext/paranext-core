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
}
