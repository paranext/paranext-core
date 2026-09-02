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
    public void Constructor_SettingLookupFails_FallsBackToEmptyInsteadOfThrowing()
    {
        // No AddSettingValue call, so DummySettingsService's "get" handler throws, mirroring how
        // a real timeout surfaces as a thrown exception from SettingsService.GetSetting.
        var settings = new PersistedPtxUtilsSettings(_client);

        Assert.That(settings.MementoData, Is.Empty);
    }

    [Test]
    public void Constructor_SettingPresent_ReturnsStoredValue()
    {
        var stored = new SerializableStringDictionary { ["someKey"] = "someValue" };
        _settingsService.AddSettingValue(Settings.PTX_UTILS_MEMENTO_DATA, stored);

        var settings = new PersistedPtxUtilsSettings(_client);

        Assert.That(settings.MementoData, Is.EqualTo(stored));
    }

    [Test]
    public void SafeSave_WhileStillUnreachable_DoesNotOverwritePersistedValue()
    {
        // Load fails (missing setting) and falls back to empty; SafeSave must skip the write so
        // it can't reset the user's actual stored mementos, as long as it's still unreachable.
        var settings = new PersistedPtxUtilsSettings(_client);
        settings.MementoData["someKey"] = "mutated";

        settings.SafeSave();

        Assert.That(_settingsService.GetSettingValue(Settings.PTX_UTILS_MEMENTO_DATA), Is.Null);
    }

    [Test]
    public void SafeSave_OnceReachableAfterAFailedLoad_MergesPersistedEntriesWithAccumulatedChanges()
    {
        // Initial load fails; changes accumulate in memory while the service is unreachable.
        var settings = new PersistedPtxUtilsSettings(_client);
        settings.MementoData["newKey"] = "queued-before-service-available";
        settings.SafeSave(); // still unreachable; skipped

        // The service becomes reachable, and it turns out it already had an entry from before
        // this session that the failed initial load never got to see.
        _settingsService.AddSettingValue(
            Settings.PTX_UTILS_MEMENTO_DATA,
            new SerializableStringDictionary { ["existingKey"] = "existingValue" }
        );

        settings.SafeSave(); // must retry, notice it's reachable now, merge, and persist

        var saved = (SerializableStringDictionary)
            _settingsService.GetSettingValue(Settings.PTX_UTILS_MEMENTO_DATA)!;
        Assert.That(saved["newKey"], Is.EqualTo("queued-before-service-available"));
        Assert.That(saved["existingKey"], Is.EqualTo("existingValue"));
    }

    [Test]
    public void SafeSave_OnceReachableAfterAFailedLoad_InMemoryValueWinsOnConflict()
    {
        var settings = new PersistedPtxUtilsSettings(_client);
        settings.MementoData["someKey"] = "in-memory-value";
        settings.SafeSave(); // still unreachable; skipped

        // The persisted value for the same key differs from the in-memory one.
        _settingsService.AddSettingValue(
            Settings.PTX_UTILS_MEMENTO_DATA,
            new SerializableStringDictionary { ["someKey"] = "stale-persisted-value" }
        );

        settings.SafeSave();

        var saved = (SerializableStringDictionary)
            _settingsService.GetSettingValue(Settings.PTX_UTILS_MEMENTO_DATA)!;
        Assert.That(saved["someKey"], Is.EqualTo("in-memory-value"));
    }

    [Test]
    public void SafeSave_AfterSuccessfulLoad_PersistsValue()
    {
        _settingsService.AddSettingValue(
            Settings.PTX_UTILS_MEMENTO_DATA,
            new SerializableStringDictionary()
        );
        var settings = new PersistedPtxUtilsSettings(_client);
        settings.MementoData["someKey"] = "someValue";

        settings.SafeSave();

        var saved = (SerializableStringDictionary)
            _settingsService.GetSettingValue(Settings.PTX_UTILS_MEMENTO_DATA)!;
        Assert.That(saved["someKey"], Is.EqualTo("someValue"));
    }
}
