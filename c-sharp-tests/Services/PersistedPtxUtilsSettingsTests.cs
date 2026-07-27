using System.Diagnostics.CodeAnalysis;
using PtxUtils;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class PersistedPtxUtilsSettingsTests
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
        PersistedPtxUtilsSettings? settings = null;
        Assert.DoesNotThrow(() => settings = new PersistedPtxUtilsSettings(_client));
        Assert.That(settings!.MementoData, Is.Empty);
    }

    [TestCase()]
    public void Constructor_SettingPresent_ReturnsStoredValue()
    {
        var stored = new SerializableStringDictionary { ["someKey"] = "someValue" };
        _settingsService.AddSettingValue(Settings.PTX_UTILS_MEMENTO_DATA, stored);

        var settings = new PersistedPtxUtilsSettings(_client);

        Assert.That(settings.MementoData, Is.EqualTo(stored));
    }
}
