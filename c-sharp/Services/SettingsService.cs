using System.Text.Json;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    private static readonly TimeSpan s_timeout = TimeSpan.FromSeconds(10);

    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SERVICE_OBJECT = $"object:{SETTINGS_SERVICE_NAME}-data";
    private const string SERVICE_GET = $"{SERVICE_OBJECT}.get";
    private const string SERVICE_SET = $"{SERVICE_OBJECT}.set";

    public static T? GetSetting<T>(PapiClient papiClient, string key)
    {
        return ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<T?>(SERVICE_GET, [key]),
            $"SettingService.GetSetting for {key}",
            s_timeout
        );
    }

    public static bool SetSetting(PapiClient papiClient, string key, object? settingData)
    {
        string description = $"SettingService.SetSetting for {key}";
        var result = ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<JsonElement?>(SERVICE_SET, [key, settingData]),
            description,
            s_timeout
        );
        if (!result.HasValue)
            throw new InvalidDataException($"{description} returned null");

        try
        {
            if (result.Value.Deserialize<bool>())
                return true;
            else
                return false;
        }
        catch (JsonException)
        {
            // If they sent a string data type name or an array of them, it will fail to
            // deserialize. Interpret that as `true`because pretty much anything but `false` means
            // the data changed. See `DataProviderUpdateInstructions` for more info
            return true;
        }
    }
}
