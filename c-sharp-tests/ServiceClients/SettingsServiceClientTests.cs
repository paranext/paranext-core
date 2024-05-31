using System.Diagnostics.CodeAnalysis;
using TestParanextDataProvider;

namespace Paranext.DataProvider.ServiceClients.Tests;

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
    public void GetSetting_Boolean_ReturnsValue()
    {
        var settingKey = "isTest";
        var settingValue = true;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsServiceClient.GetSetting(_client, settingKey);
        Assert.That(retrievedSettingValue!.Value.GetBoolean(), Is.EqualTo(settingValue));
    }

    [TestCase()]
    public void GetSetting_Integer_ReturnsValue()
    {
        var settingKey = "testNum";
        var settingValue = 15;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsServiceClient.GetSetting(_client, settingKey);
        Assert.That(retrievedSettingValue!.Value.GetInt32(), Is.EqualTo(settingValue));
    }
}
