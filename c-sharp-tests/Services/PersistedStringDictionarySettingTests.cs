using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using PtxUtils;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class PersistedStringDictionarySettingTests
{
    private const string Key = "testDictionary";
    private static readonly TimeSpan s_retryDelay = TimeSpan.FromMilliseconds(10);

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

    private PersistedStringDictionarySetting CreateSetting() => new(_client, Key, s_retryDelay);

    private static void WaitUntil(Func<bool> condition, string failureMessage)
    {
        var stopwatch = Stopwatch.StartNew();
        while (!condition())
        {
            if (stopwatch.Elapsed > TimeSpan.FromSeconds(5))
                Assert.Fail(failureMessage);
            Thread.Sleep(s_retryDelay);
        }
    }

    private static void WaitUntilLoaded(PersistedStringDictionarySetting setting) =>
        WaitUntil(() => setting.IsLoaded, "The background read never delivered the stored value");

    [Test]
    public void FirstReadSucceeds_ValueIsTheStoredValue()
    {
        var stored = new SerializableStringDictionary { ["someKey"] = "stored" };
        _settingsService.AddSettingValue(Key, stored);

        var setting = CreateSetting();

        Assert.That(setting.IsLoaded, Is.True);
        Assert.That(setting.Value, Is.EqualTo(stored));
    }

    [Test]
    public void FirstReadSucceeds_SafeSave_WritesValue()
    {
        _settingsService.AddSettingValue(Key, new SerializableStringDictionary());
        var setting = CreateSetting();
        setting.Value["someKey"] = "changed";

        setting.SafeSave();

        var saved = (SerializableStringDictionary)_settingsService.GetSettingValue(Key)!;
        Assert.That(saved["someKey"], Is.EqualTo("changed"));
    }

    [Test]
    public void FirstReadFails_SafeSaveWhileStillUnreadable_WritesNothing()
    {
        // No stored value, so DummySettingsService's "get" throws, as the real read does when the
        // settings service is not up yet.
        var setting = CreateSetting();
        setting.Value["someKey"] = "changed";

        setting.SafeSave();

        Assert.That(setting.IsLoaded, Is.False);
        Assert.That(_settingsService.GetSettingValue(Key), Is.Null);
    }

    [Test]
    public void FirstReadFails_StoredValueBecomesReadable_MergedIntoValueWithoutASave()
    {
        var setting = CreateSetting();
        Assert.That(setting.Value, Is.Empty);

        _settingsService.AddSettingValue(
            Key,
            new SerializableStringDictionary { ["storedKey"] = "stored" }
        );
        WaitUntilLoaded(setting);

        Assert.That(setting.Value["storedKey"], Is.EqualTo("stored"));
    }

    [Test]
    public void FirstReadFails_StoredValueBecomesReadable_EntriesChangedThisSessionWin()
    {
        var setting = CreateSetting();
        setting.Value["sharedKey"] = "changed this session";
        setting.Value["newKey"] = "added this session";

        _settingsService.AddSettingValue(
            Key,
            new SerializableStringDictionary { ["sharedKey"] = "stored", ["storedKey"] = "stored" }
        );
        WaitUntilLoaded(setting);

        Assert.That(
            setting.Value,
            Is.EqualTo(
                new SerializableStringDictionary
                {
                    ["sharedKey"] = "changed this session",
                    ["newKey"] = "added this session",
                    ["storedKey"] = "stored",
                }
            )
        );
    }

    [Test]
    public void FirstReadFails_SafeSaveAfterStoredValueBecomesReadable_WritesMergedValue()
    {
        var setting = CreateSetting();
        setting.Value["newKey"] = "added this session";
        setting.SafeSave(); // still unreadable, so skipped

        _settingsService.AddSettingValue(
            Key,
            new SerializableStringDictionary { ["storedKey"] = "stored" }
        );
        WaitUntilLoaded(setting);
        setting.SafeSave();

        var saved = (SerializableStringDictionary)_settingsService.GetSettingValue(Key)!;
        Assert.That(saved["newKey"], Is.EqualTo("added this session"));
        Assert.That(saved["storedKey"], Is.EqualTo("stored"));
    }

    [Test]
    public void FirstReadReturnsNull_StaysUnloadedUntilAValueIsStored()
    {
        // Null means the service had no answer, so treating it as the stored value would let a
        // save wipe whatever is really stored.
        _settingsService.AddSettingValue(Key, null!);
        var setting = CreateSetting();
        Thread.Sleep(s_retryDelay * 10);

        setting.SafeSave();

        Assert.That(setting.IsLoaded, Is.False);
        Assert.That(_settingsService.GetSettingValue(Key), Is.Null);

        SettingsService.SetSetting(
            _client,
            Key,
            new SerializableStringDictionary { ["storedKey"] = "stored" }
        );
        WaitUntilLoaded(setting);

        Assert.That(setting.Value["storedKey"], Is.EqualTo("stored"));
    }

    [Test]
    public void FirstReadFails_SafeSaveSkipped_SavesMergedValueOnceStoredValueArrives()
    {
        var setting = CreateSetting();
        setting.Value["newKey"] = "added this session";
        setting.SafeSave(); // still unreadable, so deferred

        _settingsService.AddSettingValue(
            Key,
            new SerializableStringDictionary { ["storedKey"] = "stored" }
        );

        // No further access to the setting: the deferred save must happen without one.
        WaitUntil(
            () =>
                _settingsService.GetSettingValue(Key) is SerializableStringDictionary saved
                && saved.ContainsKey("newKey"),
            "The deferred save never happened"
        );
        var saved = (SerializableStringDictionary)_settingsService.GetSettingValue(Key)!;
        Assert.That(saved["storedKey"], Is.EqualTo("stored"));
    }
}
