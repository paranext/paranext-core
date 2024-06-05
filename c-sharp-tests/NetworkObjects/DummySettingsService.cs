using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Nodes;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
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

    protected override Task StartDataProvider()
    {
        return Task.CompletedTask;
    }

    protected override List<string> GetFunctionNames()
    {
        return _supportedFunctions;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        return functionName switch
        {
            "get"
                => _settingValues.ContainsKey(args[0]!.ToString())
                    ? ResponseToRequest.Succeeded(_settingValues[args[0]!.ToString()])
                    : ResponseToRequest.Failed($"Could not find value for setting {args[0]}"),
            _ => ResponseToRequest.Failed($"Unexpected function: {functionName}")
        };
    }
}
