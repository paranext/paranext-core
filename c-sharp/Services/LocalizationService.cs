using System.Diagnostics;
using System.Text.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Services;

internal static class LocalizationService
{
    private const string LOC_SERVICE_NAME = "platform.localizationDataServiceDataProvider";
    private const string LOC_SERVICE_REQUEST = $"object:{LOC_SERVICE_NAME}-data.getLocalizedString";

    /// <summary>
    /// Get a localized string value
    /// </summary>
    /// <param name="papiClient"></param>
    /// <param name="key">localized string key `%something%`</param>
    /// <param name="defaultValue">Default value if the key comes back as the value or the request fails</param>
    /// <param name="shouldThrowErrors">if set to `true`, will throw errors instead of ignoring and returning default value. Defaults to `false`</param>
    /// <returns></returns>
    public static string GetLocalizedString(
        PapiClient papiClient,
        string key,
        string? defaultValue = null,
        bool shouldThrowErrors = false
    )
    {
        string value = defaultValue ?? key;
        Exception? thrownException = null;
        var requestTask = papiClient.SendRequestAsync(
            LOC_SERVICE_REQUEST,
            [new LocalizationSelector(key)],
            (bool success, object? returnValue) =>
            {
                try
                {
                    if (!success)
                        return;

                    var result = (JsonElement?)returnValue;
                    if (result.HasValue)
                    {
                        var resultString = result.Value.Deserialize<string>();
                        if (resultString != null && resultString != key)
                            value = resultString;
                    }
                }
                catch (Exception ex)
                {
                    if (shouldThrowErrors)
                        thrownException = ex;
                    else
                        Trace.TraceError(ex.Message);
                }
            }
        );

        string description = $"getLocalizedString for {key}";
        if (!ThreadingUtils.RunTask(requestTask, description, TimeSpan.FromSeconds(1)))
            throw new TimeoutException(description);

        if (thrownException != null)
            throw thrownException;

        return value;
    }
}

public class LocalizationSelector(string localizeKey)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    public string LocalizeKey { get; } = localizeKey;
}
