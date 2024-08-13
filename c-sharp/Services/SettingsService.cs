using System.Text.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SETTINGS_SERVICE_REQUEST = $"object:{SETTINGS_SERVICE_NAME}-data.function";

    public static JsonElement? GetSettingRaw(PapiClient papiClient, string key)
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

    public static T? GetSettingObject<T>(PapiClient papiClient, string key)
        where T : class
    {
        return GetSettingRaw(papiClient, key)?.Deserialize<T>();
    }

    public static T? GetSettingValue<T>(PapiClient papiClient, string key)
        where T : struct
    {
        return GetSettingRaw(papiClient, key)?.Deserialize<T>();
    }

    public static bool SetSetting(PapiClient papiClient, string key, object? value)
    {
        TaskCompletionSource taskSource = new();
        using var getSettingTask = taskSource.Task;

        var didChangeData = false;

        papiClient.SendRequest(
            SETTINGS_SERVICE_REQUEST,
            new object?[] { "set", key, value },
            (bool success, object? returnValue) =>
            {
                try
                {
                    if (success)
                    {
                        var result = (JsonElement?)returnValue;
                        if (result.HasValue)
                        {
                            try
                            {
                                if (result.Value.Deserialize<bool>())
                                    didChangeData = true;
                                else
                                    didChangeData = false;
                            }
                            catch (JsonException)
                            {
                                // If they sent a string data type name or an array of them, it will
                                // fail to deserialize. Interpret that as `didChangeData` true
                                didChangeData = true;
                            }
                        }
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
        return didChangeData;
    }
}
