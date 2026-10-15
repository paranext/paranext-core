using System.Diagnostics.CodeAnalysis;
using PtxUtils;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class PersistedParatextDataSettingsTests
{
    private DummyPapiClient _client = null!;
    private DummySettingsService _settingsService = null!;

    [SetUp]
    public async Task TestSetupAsync()
    {
        _client = new DummyPapiClient();
        _settingsService = new DummySettingsService(_client);
        await _settingsService.RegisterDataProviderAsync();
    }

    [TearDown]
    public void TestTearDown()
    {
        _client.Dispose();
    }

    [Test]
    public void Constructor_SettingReadFails_StartsEmptyInsteadOfThrowing()
    {
        // No stored value, so DummySettingsService's "get" throws, as the real read does when the
        // settings service is not up yet.
        var settings = new PersistedParatextDataSettings(_client);

        Assert.That(settings.LastRegistryDataCachedTimes, Is.Empty);
    }

    [Test]
    public void Constructor_SettingStored_ReturnsStoredValue()
    {
        var stored = new SerializableStringDictionary { ["someProject"] = "2026-01-01" };
        _settingsService.AddSettingValue(
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            stored
        );

        var settings = new PersistedParatextDataSettings(_client);

        Assert.That(settings.LastRegistryDataCachedTimes, Is.EqualTo(stored));
    }
}
