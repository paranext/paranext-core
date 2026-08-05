using System.Text.Json;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Users;

/// <summary>
/// PAPI data provider for the ParatextData.dll internet settings. Replaces the former
/// `getParatextDataInternetSettings` / `setParatextDataInternetSettings` PAPI commands so consumers
/// can gate on `useDataProvider` availability (no cold-start race) and receive live updates.
/// </summary>
internal sealed class InternetSettingsDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider("paratextRegistration.internetSettingsDataProvider", papiClient)
{
    /// <summary>
    /// Placeholder to show instead of real passwords so we aren't giving out real passwords
    /// </summary>
    private const string PLACEHOLDER_PASSWORD = "********";

    private const string DATA_TYPE_INTERNET_SETTINGS = "InternetSettings";

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getInternetSettings", GetInternetSettings),
            ("setInternetSettings", SetInternetSettings),
        ];
    }

    protected override Task StartDataProviderAsync() => Task.CompletedTask;

    /// <summary>
    /// Returns information about the user's current ParatextData.dll internet settings.
    /// </summary>
    /// <param name="_selector">Data provider selector; unused (there is a single settings object).</param>
    private InternetAccess.InternetSettingsMemento GetInternetSettings(JsonElement _selector)
    {
        try
        {
            var internetSettings = new InternetAccess.InternetSettingsMemento
            {
                SelectedServer = InternetAccess.SelectedServers,
                PermittedInternetUse = InternetAccess.RawStatus,
                ProxyHost = InternetAccess.ProxyHost,
                ProxyPort = InternetAccess.ProxyPort,
                ProxyUsername = InternetAccess.ProxyUsername,
                ProxyPassword = !string.IsNullOrEmpty(InternetAccess.ProxyPassword)
                    ? PLACEHOLDER_PASSWORD
                    : null,
                ProxyMode = InternetAccess.ProxyMode,
                OverrideDBLServer = InternetAccess.OverrideDBLServer,
                OverrideDBLApiServer = InternetAccess.OverrideDBLApiServer,
                OverrideGbcServer = InternetAccess.OverrideGbcServer,
                DBLEmail = InternetAccess.DBLEmail,
                DBLPassword = !string.IsNullOrEmpty(InternetAccess.DBLPassword)
                    ? PLACEHOLDER_PASSWORD
                    : null,
            };
            return internetSettings;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Getting ParatextData InternetSettings failed! {e}");
            throw new Exception($"Getting ParatextData InternetSettings failed! {e.Message}");
        }
    }

    /// <summary>
    /// Sets the user's ParatextData.dll internet settings, then notifies subscribers.
    /// </summary>
    /// <param name="_selector">Data provider selector; unused (there is a single settings object).</param>
    /// <param name="newInternetSettings">Internet settings to persist.</param>
    private bool SetInternetSettings(
        JsonElement _selector,
        InternetAccess.InternetSettingsMemento newInternetSettings
    )
    {
        try
        {
            // Set empty strings to null (except proxy-related settings since they are handled by
            // SetProxy) so they are removed from `InternetSettings.xml` as it happens in PT9
            if (newInternetSettings.OverrideDBLServer == "")
                newInternetSettings.OverrideDBLServer = null;
            if (newInternetSettings.OverrideDBLApiServer == "")
                newInternetSettings.OverrideDBLApiServer = null;
            if (newInternetSettings.OverrideGbcServer == "")
                newInternetSettings.OverrideGbcServer = null;
            if (newInternetSettings.DBLEmail == "")
                newInternetSettings.DBLEmail = null;
            if (newInternetSettings.DBLPassword == "")
                newInternetSettings.DBLPassword = null;

            // Unfortunately, `InternetAccess.SetProxy` is the only way to set proxy properties, and
            // it does some weird stuff. Make sure `ProxyHost` is `null` if not using a proxy. Then
            // `InternetAccess.SetProxy` will set the proxy properties to `null`. But it will also
            // set `RawStatus` to `InternetUse.Disabled`, so set that back to whatever the user
            // selected if they selected something that is not `InternetUse.ProxyOnly`. But we want
            // to leave it disabled if they selected `InternetUse.ProxyOnly` but provided no host
            if (newInternetSettings.PermittedInternetUse != InternetUse.ProxyOnly)
                newInternetSettings.ProxyHost = null;
            InternetAccess.SetProxy(
                newInternetSettings.ProxyHost,
                newInternetSettings.ProxyPort,
                newInternetSettings.ProxyUsername,
                newInternetSettings.ProxyPassword != PLACEHOLDER_PASSWORD
                    ? newInternetSettings.ProxyPassword
                    : InternetAccess.ProxyPassword,
                newInternetSettings.ProxyMode
            );
            if (
                InternetAccess.RawStatus == InternetUse.Disabled
                && newInternetSettings.PermittedInternetUse != InternetUse.Disabled
                && newInternetSettings.PermittedInternetUse != InternetUse.ProxyOnly
            )
                InternetAccess.RawStatus = newInternetSettings.PermittedInternetUse;

            InternetAccess.SelectedServers = newInternetSettings.SelectedServer;

            InternetAccess.OverrideDBLServer = newInternetSettings.OverrideDBLServer;
            InternetAccess.OverrideDBLApiServer = newInternetSettings.OverrideDBLApiServer;
            InternetAccess.OverrideGbcServer = newInternetSettings.OverrideGbcServer;
            InternetAccess.DBLEmail = newInternetSettings.DBLEmail;
            if (newInternetSettings.DBLPassword != PLACEHOLDER_PASSWORD)
                InternetAccess.DBLPassword = newInternetSettings.DBLPassword;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Setting ParatextData InternetSettings failed! {e}");
            throw new Exception($"Setting ParatextData InternetSettings failed! {e.Message}");
        }

        SendDataUpdateEvent(DATA_TYPE_INTERNET_SETTINGS, "updated internet settings");
        return true;
    }
}
