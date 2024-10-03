using System.Diagnostics.CodeAnalysis;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class SettingsServiceTests
{
    #region Member variables
    private DummyPapiClient _client = null!; // Will be non-null when the test runs
    private DummySettingsService _settingsService = null!; // Will be non-null when the test runs
    #endregion

    #region Test setup/teardown
    [SetUp]
    public virtual async Task TestSetup()
    {
        _client = new DummyPapiClient();
        _settingsService = new DummySettingsService(_client);
        await _settingsService.RegisterDataProvider();
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

        var retrievedSettingValue = SettingsService.GetSettingValue<bool>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }

    [TestCase()]
    public void GetSettingValue_Integer_ReturnsValue()
    {
        var settingKey = "testNum";
        var settingValue = 15;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsService.GetSettingValue<int>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }
}
