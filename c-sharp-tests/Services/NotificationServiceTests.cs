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
