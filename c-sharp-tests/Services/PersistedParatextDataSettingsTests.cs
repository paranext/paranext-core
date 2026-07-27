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

    [TestCase()]
    public void Constructor_SettingLookupFails_FallsBackToEmptyInsteadOfThrowing()
    {
        // No AddSettingValue call, so DummySettingsService's "get" handler throws, mirroring how
        // a real timeout surfaces as a thrown exception from SettingsService.GetSetting.
        PersistedParatextDataSettings? settings = null;
        Assert.DoesNotThrow(() => settings = new PersistedParatextDataSettings(_client));
        Assert.That(settings!.LastRegistryDataCachedTimes, Is.Empty);
    }

    [TestCase()]
    public void Constructor_SettingPresent_ReturnsStoredValue()
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
