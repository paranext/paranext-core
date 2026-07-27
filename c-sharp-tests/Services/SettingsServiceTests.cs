using System.Diagnostics.CodeAnalysis;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class SettingsServiceTests
{
    #region Member variables
    // Both of these will be non-null when the test runs
    private DummyPapiClient _client = null!;
    private DummySettingsService _settingsService = null!;
    #endregion

    #region Test setup/teardown
    [SetUp]
    public virtual async Task TestSetupAsync()
    {
        _client = new DummyPapiClient();
        _settingsService = new DummySettingsService(_client);
        await _settingsService.RegisterDataProviderAsync();
    }

    [TearDown]
    public virtual void TestTearDown()
    {
        _client.Dispose();
    }
    #endregion

    [TestCase()]
    public void GetSettingValue_Boolean_ReturnsValue()
    {
        var settingKey = "isTest";
        var settingValue = true;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsService.GetSetting<bool>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }

    [TestCase()]
    public void GetSettingValue_Integer_ReturnsValue()
    {
        var settingKey = "testNum";
        var settingValue = 15;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsService.GetSetting<int>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }

    [TestCase()]
    public void TryGetSetting_LegitimateNullValue_ReturnsTrue()
    {
        // A stored-but-null value is not a failure; only an exception (e.g. a timeout) is.
        _settingsService.AddSettingValue("nullableSetting", null!);

        bool succeeded = SettingsService.TryGetSetting<string>(
            _client,
            "nullableSetting",
            out var value
        );

        Assert.That(succeeded, Is.True);
        Assert.That(value, Is.Null);
    }

    [TestCase()]
    public void TryGetSetting_LookupThrows_ReturnsFalse()
    {
        bool succeeded = SettingsService.TryGetSetting<string>(
            _client,
            "missingSetting",
            out var value
        );

        Assert.That(succeeded, Is.False);
        Assert.That(value, Is.Null);
    }
}
