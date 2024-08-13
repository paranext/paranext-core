using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Services;

internal static class LocalizationService
{
    public const string SETTINGS_SERVICE_NAME = "platform.localizationDataServiceDataProvider";
    private const string SETTINGS_SERVICE_REQUEST = $"object:{SETTINGS_SERVICE_NAME}-data.function";

    /// <summary>
    /// Get a localized string value
    /// </summary>
    /// <param name="papiClient"></param>
    /// <param name="key">localized string key `%something%`</param>
    /// <param name="defaultValue">Default value if the key comes back as the value or the request fails</param>
    /// <param name="shouldThrowErrors">if set to `true`, will throw errors instead of ignoring and returning default value. Defaults to `false`</param>
    /// <returns></returns>
    public static string GetLocalizedString(PapiClient papiClient, string key, string? defaultValue = null, bool shouldThrowErrors = false)
    {
        string value = defaultValue ?? key;
        TaskCompletionSource taskSource = new();
        using var getSettingTask = taskSource.Task;

        papiClient.SendRequest(
            SETTINGS_SERVICE_REQUEST,
            new object[] { "getLocalizedString", new LocalizationSelector(key) },
            (bool success, object? returnValue) =>
            {
                try
                {
                    if (success)
                    {
                        var result = (JsonElement?)returnValue;
                        if (result.HasValue)
                        {
                            var resultString = result.Value.Deserialize<string>();
                            if (resultString != null && resultString != key)
                                value = resultString;
                        }
                    }

                    taskSource.TrySetResult();
                }
                catch (Exception ex)
                {
                    if (shouldThrowErrors)
                        taskSource.TrySetException(ex);
                    else {
                        Trace.TraceError(ex.Message);
                        taskSource.TrySetResult();
                    }
                }
            }
        );

        using var cts = new CancellationTokenSource();
        getSettingTask.Wait(cts.Token);
        return value;
    }
}

public class LocalizationSelector(string localizeKey)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    [JsonProperty("localizeKey")]
    [JsonPropertyName("localizeKey")]
    public string LocalizeKey { get; } = localizeKey;
}
