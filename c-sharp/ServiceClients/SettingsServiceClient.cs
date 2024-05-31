using System.Text.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.ServiceClients;

internal static class SettingsServiceClient
{
    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SETTINGS_SERVICE_REQUEST = $"object:{SETTINGS_SERVICE_NAME}-data.function";

    public static JsonElement? GetSetting(PapiClient papiClient, string key)
    {
        JsonElement? value = null;
        TaskCompletionSource taskSource = new();
        using var getSettingTask = taskSource.Task;

        papiClient.SendRequest(
            SETTINGS_SERVICE_REQUEST,
            new object[] { "get", key },
            (bool success, object? returnValue) =>
            {
                try
                {
                    if (success)
                    {
                        var result = (JsonElement?)returnValue;
                        if (result.HasValue)
                            value = result.Value;
                    }

                    taskSource.TrySetResult();
                }
                catch (Exception ex)
                {
                    taskSource.TrySetException(ex);
                }
            }
        );

        using var cts = new CancellationTokenSource();
        getSettingTask.Wait(cts.Token);
        return value;
    }
}
