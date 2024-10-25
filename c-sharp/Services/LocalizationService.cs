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
        string defaultValue = "",
        bool shouldThrowErrors = false
    )
    {
        try
        {
            var retVal = ThreadingUtils.GetTaskResult(
                papiClient.SendRequestAsync<string?>(
                    LOC_SERVICE_REQUEST,
                    [new LocalizationSelector(key)]
                ),
                $"getLocalizedString for {key}",
                TimeSpan.FromSeconds(1)
            );
            if (retVal == null)
                return shouldThrowErrors
                    ? throw new InvalidDataException($"Localized string for {key} was null")
                    : defaultValue;
            return retVal;
        }
        catch (Exception)
        {
            if (shouldThrowErrors)
                throw;
            return defaultValue;
        }
    }
}

public class LocalizationSelector(string localizeKey)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    public string LocalizeKey { get; } = localizeKey;
}
