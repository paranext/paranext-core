using System.Text.Json;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SERVICE_UPDATE_EVENT = $"{SETTINGS_SERVICE_NAME}-data:onDidUpdate";
    private const string SERVICE_OBJECT = $"object:{SETTINGS_SERVICE_NAME}-data";
    private const string SERVICE_GET = $"{SERVICE_OBJECT}.get";
    private const string SERVICE_SET = $"{SERVICE_OBJECT}.set";

    public static void Initialize(PapiClient papiClient)
    {
        papiClient.RegisterEventHandler(
            SERVICE_UPDATE_EVENT,
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
                    Console.WriteLine($"Error updating request timeout: {ex}");
                }
            }
        );

        _ = Task.Run(() =>
        {
            try
            {
                int requestTimeoutSeconds = GetSetting<int>(papiClient, Settings.REQUEST_TIMEOUT);
                papiClient.SetRequestTimeout(new TimeSpan(0, 0, requestTimeoutSeconds));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting request timeout: {ex}");
            }
        });
    }

    public static T? GetSetting<T>(PapiClient papiClient, string key)
    {
        return ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<T?>(SERVICE_GET, [key]),
            $"SettingService.GetSetting for {key}",
            ThreadingUtils.DefaultTimeout
        );
    }

    /// <summary>
    /// Like <see cref="GetSetting{T}"/>, but returns false instead of throwing if the lookup
    /// fails. A legitimate null result (e.g. no value stored and no default declared) still
    /// counts as success; only an exception (e.g. a timeout) counts as failure.
    /// </summary>
    public static bool TryGetSetting<T>(PapiClient papiClient, string key, out T? value)
    {
        try
        {
            value = GetSetting<T>(papiClient, key);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting {key}: {ex}");
            value = default;
            return false;
        }
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
