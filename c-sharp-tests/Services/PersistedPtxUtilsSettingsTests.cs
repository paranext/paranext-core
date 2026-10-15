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

    [Test]
    public void Constructor_SettingStored_ReturnsStoredValue()
    {
        var stored = new SerializableStringDictionary { ["someKey"] = "someValue" };
        _settingsService.AddSettingValue(Settings.PTX_UTILS_MEMENTO_DATA, stored);

        var settings = new PersistedPtxUtilsSettings(_client);

        Assert.That(settings.MementoData, Is.EqualTo(stored));
    }

    [Test]
    public void SafeSave_WritesPropertyToSettingKey()
    {
        _settingsService.AddSettingValue(
            Settings.PTX_UTILS_MEMENTO_DATA,
            new SerializableStringDictionary()
        );
        var settings = new PersistedPtxUtilsSettings(_client);
        var changed = new SerializableStringDictionary { ["someKey"] = "changed" };
        settings.MementoData = changed;

        settings.SafeSave();

        Assert.That(
            _settingsService.GetSettingValue(Settings.PTX_UTILS_MEMENTO_DATA),
            Is.EqualTo(changed)
        );
    }
}
