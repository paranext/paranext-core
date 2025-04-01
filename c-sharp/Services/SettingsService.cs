using System.Text.Json;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SERVICE_OBJECT = $"object:{SETTINGS_SERVICE_NAME}-data";
    private const string SERVICE_GET = $"{SERVICE_OBJECT}.get";
    private const string SERVICE_SET = $"{SERVICE_OBJECT}.set";

    public static void Initialize(PapiClient papiClient)
    {
        papiClient.RegisterEventHandler(
            "platform.settingsServiceDataProvider-data:onDidUpdate",
            (JsonElement _eventParams) =>
            {
                try
                {
                    int requestTimeoutSeconds = GetSetting<int>(
                        papiClient,
                        Settings.REQUEST_TIMEOUT
                    );
                    papiClient.SetRequestTimeout(new TimeSpan(0, 0, requestTimeoutSeconds));
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error in SettingsService.Initialize: {ex}");
                }
            }
        );
    }

    public static T? GetSetting<T>(PapiClient papiClient, string key)
    {
        return ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<T?>(SERVICE_GET, [key]),
            $"SettingService.GetSetting for {key}",
            ThreadingUtils.DefaultTimeout
        );
    }

    public static bool SetSetting(PapiClient papiClient, string key, object? settingData)
    {
        string description = $"SettingService.SetSetting for {key}";
        var result = ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<JsonElement?>(SERVICE_SET, [key, settingData]),
            description,
            ThreadingUtils.DefaultTimeout
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
