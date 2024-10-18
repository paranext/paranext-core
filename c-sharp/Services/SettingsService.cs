using System.Text.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    private static readonly TimeSpan s_timeout = TimeSpan.FromSeconds(10);

    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SETTINGS_SERVICE_REQUEST = $"object:{SETTINGS_SERVICE_NAME}-data.function";

    public static JsonElement? GetSettingRaw(PapiClient papiClient, string key)
    {
        JsonElement? value = null;
        var task = papiClient.SendRequestAsync(
            SETTINGS_SERVICE_REQUEST,
            ["get", key],
            (bool success, object? returnValue) =>
            {
                if (!success)
                    return;

                var result = (JsonElement?)returnValue;
                if (result.HasValue)
                    value = result.Value;
            }
        );

        string description = $"SettingService.GetSetting for {key}";
        if (!ThreadingUtils.RunTask(task, description, s_timeout))
            throw new TimeoutException(description);

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

    public static bool SetSetting(PapiClient papiClient, string key, object? settingData)
    {
        var didChangeData = false;
        var task = papiClient.SendRequestAsync(
            SETTINGS_SERVICE_REQUEST,
            ["set", key, settingData],
            (bool success, object? returnValue) =>
            {
                if (!success)
                    return;

                var result = (JsonElement?)returnValue;
                if (!result.HasValue)
                    return;

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
                    // because pretty much anything but `false` means the data changed.
                    // See `DataProviderUpdateInstructions` for more info
                    didChangeData = true;
                }
            }
        );

        string description = $"SettingService.SetSetting for {key}";
        if (!ThreadingUtils.RunTask(task, description, s_timeout))
            throw new TimeoutException(description);

        return didChangeData;
    }
}
