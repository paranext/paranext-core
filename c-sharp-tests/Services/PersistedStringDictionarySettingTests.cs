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

    private static void WaitUntilLoaded(PersistedStringDictionarySetting setting)
    {
        var stopwatch = Stopwatch.StartNew();
        while (!setting.IsLoaded)
        {
            if (stopwatch.Elapsed > TimeSpan.FromSeconds(5))
                Assert.Fail("The background read never delivered the stored value");
            Thread.Sleep(s_retryDelay);
        }
    }

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
}
