using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider;

[ExcludeFromCodeCoverage]
internal class DummySettingsService : DataProvider
{
    private readonly Dictionary<string, object> _settingValues = [];
    private readonly List<string> _supportedFunctions = ["get"];

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
            )
        ];
    }
}
