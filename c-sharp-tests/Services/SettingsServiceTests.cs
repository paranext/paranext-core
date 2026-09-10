using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
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
        // SettingsChanged is static, so a subscriber this fixture leaves attached would keep firing
        // into — and leaking captured state across — every fixture that runs after it.
        SettingsService.ResetForTests();
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

    #region SettingsChanged fan-out

    /// <summary>
    /// The wire name of the settings data provider's update announcement. Spelled out here rather
    /// than reached for through reflection so the test breaks loudly if the constant is renamed.
    /// </summary>
    private const string SettingsUpdateEvent =
        "platform.settingsServiceDataProvider-data:onDidUpdate";

    /// <summary>Stands in for the announcement main pushes; its contents are irrelevant.</summary>
    private static JsonElement AnnouncementPayload => JsonDocument.Parse("[\"*\"]").RootElement;

    [TestCase()]
    public void RegisterEventHandler_SecondHandlerForTheSettingsUpdateEvent_Throws()
    {
        // The reason SettingsChanged exists. JSON-RPC allows one local method per name and
        // parameter list, and Initialize claims this event for the whole process, so a component
        // that registers its own handler here faults whatever startup path it runs on. Pinning the
        // throw keeps that from being rediscovered at launch.
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.RegisterEventHandler(SettingsUpdateEvent, (JsonElement _) => { }),
            Throws.InvalidOperationException,
            "a second handler for one event name must be rejected, as StreamJsonRpc rejects it"
        );
    }

    [TestCase()]
    public void SettingsChanged_SettingsServiceAnnouncesAnUpdate_RaisesEverySubscriber()
    {
        var raises = new List<string>();
        SettingsService.SettingsChanged += () => raises.Add("first");
        SettingsService.SettingsChanged += () => raises.Add("second");
        SettingsService.Initialize(_client);

        _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload);

        Assert.That(raises, Is.EqualTo(new[] { "first", "second" }));
    }

    [TestCase()]
    public void SettingsChanged_OneSubscriberThrows_TheRestStillRun()
    {
        // Subscribers are raised on the JSON-RPC dispatch thread, so an escaping exception would
        // fault the dispatch and silently drop the announcement for everyone registered after the
        // thrower.
        var reached = false;
        SettingsService.SettingsChanged += () => throw new InvalidOperationException("boom");
        SettingsService.SettingsChanged += () => reached = true;
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload),
            Throws.Nothing,
            "a throwing subscriber must not escape into the JSON-RPC dispatch"
        );
        Assert.That(reached, Is.True, "subscribers after the thrower must still be raised");
    }

    [TestCase()]
    public void SettingsChanged_NoSubscribers_AnnouncementIsStillHandled()
    {
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload),
            Throws.Nothing
        );
    }

    #endregion
}
