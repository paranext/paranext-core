using System.Collections.Concurrent;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider;

[ExcludeFromCodeCoverage]
internal class DummySettingsService : DataProvider
{
    // Concurrent because code under test can read settings from a background thread while the
    // test adds values.
    private readonly ConcurrentDictionary<string, object> _settingValues = [];

    public DummySettingsService(PapiClient papiClient)
        : base(SettingsService.SETTINGS_SERVICE_NAME, papiClient) { }

    public void AddSettingValue(string key, object value)
    {
        if (!_settingValues.TryAdd(key, value))
            throw new ArgumentException($"Setting {key} already has a value");
    }

    /// <summary>What a "set" call stored for the setting, if anything.</summary>
    public object? GetSettingValue(string key) => _settingValues.GetValueOrDefault(key);

    public void ClearSettingValues()
    {
        _settingValues.Clear();
    }

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
                    return _settingValues.TryGetValue(settingName, out var value)
                        ? value
                        : throw new Exception($"Could not find value for setting {settingName}");
                }
            ),
            (
                "set",
                (string settingName, object settingValue) =>
                {
                    _settingValues[settingName] = settingValue;
                    // SettingsService.SetSetting reads the response as the JsonElement a real
                    // papi round trip produces.
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
