using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider;

[ExcludeFromCodeCoverage]
internal class DummySettingsService : DataProvider
{
    private readonly Dictionary<string, object> _settingValues = [];

    public DummySettingsService(PapiClient papiClient)
        : base(SettingsService.SETTINGS_SERVICE_NAME, papiClient) { }

    public void AddSettingValue(string key, object value)
    {
        _settingValues.Add(key, value);
    }

    public void ClearSettingValues()
    {
        _settingValues.Clear();
    }

    /// <summary>Test-only accessor for what a "set" call actually persisted, if any.</summary>
    public object? GetSettingValue(string key) => _settingValues.GetValueOrDefault(key);

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            (
                "get",
                (string settingName) =>
                {
                    return _settingValues.ContainsKey(settingName)
                        ? _settingValues[settingName]
                        : throw new Exception($"Could not find value for setting {settingName}");
                }
            ),
            (
                "set",
                (string settingName, object settingValue) =>
                {
                    _settingValues[settingName] = settingValue;
                    // SettingsService.SetSetting expects a JsonElement wire response (as a real
                    // PAPI round trip would produce), not a raw bool.
                    return JsonSerializer.SerializeToElement(true);
                }
            ),
            (
                "isValid",
                (string key, string newValueJson, string currentValueJson, string allChangesJson) =>
                {
                    return true;
                }
            ),
        ];
    }
}
