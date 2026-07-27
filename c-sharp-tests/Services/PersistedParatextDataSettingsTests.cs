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
    public void Constructor_SettingLookupFails_FallsBackToEmptyInsteadOfThrowing()
    {
        // No AddSettingValue call, so DummySettingsService's "get" handler throws, mirroring how
        // a real timeout surfaces as a thrown exception from SettingsService.GetSetting. If
        // construction throws, this test fails with that exception.
        var settings = new PersistedParatextDataSettings(_client);

        Assert.That(settings.LastRegistryDataCachedTimes, Is.Empty);
    }

    [Test]
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

    [Test]
    public void SafeSave_WhileStillUnreachable_DoesNotOverwritePersistedValue()
    {
        // Load fails (missing setting) and falls back to empty; SafeSave must skip the write so
        // it can't clobber whatever is actually persisted, as long as it's still unreachable.
        var settings = new PersistedParatextDataSettings(_client);
        settings.LastRegistryDataCachedTimes["someProject"] = "mutated";

        settings.SafeSave();

        Assert.That(
            _settingsService.GetSettingValue(
                Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
            ),
            Is.Null
        );
    }

    [Test]
    public void SafeSave_OnceReachableAfterAFailedLoad_PersistsAccumulatedChanges()
    {
        // Initial load fails; changes accumulate in memory while the service is unreachable.
        var settings = new PersistedParatextDataSettings(_client);
        settings.LastRegistryDataCachedTimes["someProject"] = "queued-before-service-available";
        settings.SafeSave(); // still unreachable; skipped

        // The service becomes reachable.
        _settingsService.AddSettingValue(
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            new SerializableStringDictionary()
        );

        settings.SafeSave(); // must retry, notice it's reachable now, and persist

        var saved = (SerializableStringDictionary)
            _settingsService.GetSettingValue(
                Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
            )!;
        Assert.That(saved["someProject"], Is.EqualTo("queued-before-service-available"));
    }

    [Test]
    public void SafeSave_AfterSuccessfulLoad_PersistsValue()
    {
        _settingsService.AddSettingValue(
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            new SerializableStringDictionary()
        );
        var settings = new PersistedParatextDataSettings(_client);
        settings.LastRegistryDataCachedTimes["someProject"] = "2026-01-01";

        settings.SafeSave();

        var saved = (SerializableStringDictionary)
            _settingsService.GetSettingValue(
                Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
            )!;
        Assert.That(saved["someProject"], Is.EqualTo("2026-01-01"));
    }
}
