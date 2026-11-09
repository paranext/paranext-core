using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;

namespace ParanextDataProviderTests.JsonUtils;

[TestFixture]
public class InternetSettingsMementoConverterTests
{
    // Platform.Bible does not implement VpnRequired, so a settings write that leaves the field out
    // must not save it.
    [Test]
    public void Read_NoPermittedInternetUse_DefaultsToDisabled()
    {
        const string incoming = "{\"selectedServer\":\"Production\",\"proxyPort\":0}";

        var memento = JsonSerializer.Deserialize<InternetAccess.InternetSettingsMemento>(
            incoming,
            SerializationOptions.CreateSerializationOptions()
        );

        Assert.That(memento?.PermittedInternetUse, Is.EqualTo(InternetUse.Disabled));
    }
}
