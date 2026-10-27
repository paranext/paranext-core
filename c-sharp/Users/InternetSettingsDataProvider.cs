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
    private const string DATA_TYPE_INTERNET_SETTINGS = "InternetSettings";

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getInternetSettings", (JsonElement _selector) => GetInternetSettings()),
            (
                "setInternetSettings",
                (
                    JsonElement _selector,
                    InternetAccess.InternetSettingsMemento newInternetSettings
                ) => SetInternetSettings(newInternetSettings)
            ),
        ];
    }

    protected override Task StartDataProviderAsync() => Task.CompletedTask;

    /// <summary>
    /// Saves <see cref="InternetUse.Disabled"/> in place of a saved
    /// <see cref="InternetUse.VpnRequired"/> (see <see cref="InternetSettingsLogic.MigratedRawStatus"/>).
    /// Call on every startup, after <see cref="ParatextUtils.PlatformParatextInfo"/> is installed
    /// and before anything reads the internet settings: ParatextData geolocates the machine whenever
    /// something reads the effective status of a saved <see cref="InternetUse.VpnRequired"/>, and
    /// the UI should never show the old value. Every startup, because ParatextData saves
    /// <see cref="InternetUse.VpnRequired"/> when nothing is stored and a re-seed from Paratext 9
    /// can bring it back.
    /// </summary>
    /// <remarks>
    /// Writes the <c>InternetSettings.xml</c> in Platform.Bible's folder, which every Platform.Bible
    /// build on this account shares, never Paratext 9's. Never throws. If the save fails,
    /// ParatextData may already hold <see cref="InternetUse.Disabled"/> in memory while the file
    /// keeps <see cref="InternetUse.VpnRequired"/>; <see cref="InternetServicesGate"/> blocks on
    /// both.
    /// </remarks>
    public static void MigrateVpnRequiredToDisabled() =>
        MigrateVpnRequiredToDisabled(
            () => InternetAccess.RawStatus,
            rawStatus => InternetAccess.RawStatus = rawStatus
        );

    /// <summary>
    /// <see cref="MigrateVpnRequiredToDisabled()"/> with the saved value read and saved through
    /// <paramref name="readRawStatus"/> and <paramref name="saveRawStatus"/>, so tests need not
    /// write a real <c>InternetSettings.xml</c>. Never throws.
    /// </summary>
    public static void MigrateVpnRequiredToDisabled(
        Func<InternetUse> readRawStatus,
        Action<InternetUse> saveRawStatus
    )
    {
        try
        {
            var migratedRawStatus = InternetSettingsLogic.MigratedRawStatus(readRawStatus());
            if (!migratedRawStatus.HasValue)
                return;
            saveRawStatus(migratedRawStatus.Value);
            Console.WriteLine(
                $"Replaced the saved internet use VpnRequired with {migratedRawStatus.Value}"
            );
        }
        catch (Exception e)
        {
            Console.Error.WriteLine($"Migrating the saved internet use failed! {e}");
        }
    }

    /// <summary>
    /// Returns information about the user's current ParatextData.dll internet settings. Also backs
    /// the deprecated <c>paratextRegistration.getParatextDataInternetSettings</c> command.
    /// </summary>
    public InternetAccess.InternetSettingsMemento GetInternetSettings()
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
                ProxyPassword = InternetSettingsLogic.MaskSecret(InternetAccess.ProxyPassword),
                ProxyMode = InternetAccess.ProxyMode,
                OverrideDBLServer = InternetAccess.OverrideDBLServer,
                OverrideDBLApiServer = InternetAccess.OverrideDBLApiServer,
                OverrideGbcServer = InternetAccess.OverrideGbcServer,
                DBLEmail = InternetAccess.DBLEmail,
                DBLPassword = InternetSettingsLogic.MaskSecret(InternetAccess.DBLPassword),
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
    /// Sets the user's ParatextData.dll internet settings, then notifies subscribers. Also backs
    /// the deprecated <c>paratextRegistration.setParatextDataInternetSettings</c> command.
    /// </summary>
    /// <param name="newInternetSettings">Internet settings to persist.</param>
    public bool SetInternetSettings(InternetAccess.InternetSettingsMemento newInternetSettings)
    {
        try
        {
            // Set empty strings to null (except proxy-related settings since they are handled by
            // SetProxy) so they are removed from `InternetSettings.xml` as it happens in PT9
            newInternetSettings.OverrideDBLServer = InternetSettingsLogic.EmptyToNull(
                newInternetSettings.OverrideDBLServer
            );
            newInternetSettings.OverrideDBLApiServer = InternetSettingsLogic.EmptyToNull(
                newInternetSettings.OverrideDBLApiServer
            );
            newInternetSettings.OverrideGbcServer = InternetSettingsLogic.EmptyToNull(
                newInternetSettings.OverrideGbcServer
            );
            newInternetSettings.DBLEmail = InternetSettingsLogic.EmptyToNull(
                newInternetSettings.DBLEmail
            );
            newInternetSettings.DBLPassword = InternetSettingsLogic.EmptyToNull(
                newInternetSettings.DBLPassword
            );

            // Unfortunately, `InternetAccess.SetProxy` is the only way to set proxy properties, and
            // it does some weird stuff. Make sure `ProxyHost` is `null` if not using a proxy. Then
            // `InternetAccess.SetProxy` will set the proxy properties to `null`. But it will also
            // set `RawStatus` to `InternetUse.Disabled`, so set that back to whatever the user
            // selected if they selected something that is not `InternetUse.ProxyOnly`. But we want
            // to leave it disabled if they selected `InternetUse.ProxyOnly` but provided no host
            if (
                InternetSettingsLogic.ShouldClearProxyHost(newInternetSettings.PermittedInternetUse)
            )
                newInternetSettings.ProxyHost = null;
            InternetAccess.SetProxy(
                newInternetSettings.ProxyHost,
                newInternetSettings.ProxyPort,
                newInternetSettings.ProxyUsername,
                InternetSettingsLogic.ResolveSecret(
                    newInternetSettings.ProxyPassword,
                    InternetAccess.ProxyPassword
                ),
                newInternetSettings.ProxyMode
            );
            var reassertedRawStatus = InternetSettingsLogic.ReassertedRawStatus(
                InternetAccess.RawStatus,
                newInternetSettings.PermittedInternetUse
            );
            if (reassertedRawStatus.HasValue)
                InternetAccess.RawStatus = reassertedRawStatus.Value;

            InternetAccess.SelectedServers = newInternetSettings.SelectedServer;

            InternetAccess.OverrideDBLServer = newInternetSettings.OverrideDBLServer;
            InternetAccess.OverrideDBLApiServer = newInternetSettings.OverrideDBLApiServer;
            InternetAccess.OverrideGbcServer = newInternetSettings.OverrideGbcServer;
            InternetAccess.DBLEmail = newInternetSettings.DBLEmail;
            if (InternetSettingsLogic.IsSecretChanged(newInternetSettings.DBLPassword))
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
