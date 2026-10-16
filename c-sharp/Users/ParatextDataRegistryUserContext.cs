using Paratext.Data;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.Users;

/// <summary>Reads the registration and internet state from ParatextData.</summary>
internal sealed class ParatextDataRegistryUserContext : IRegistryUserContext
{
    // Off the calling thread: when the internet setting is VpnRequired, InternetAccess.Status looks up
    // the user's country over the network before answering.
    public Task<RegistryUserSnapshot> GetSnapshotAsync() => Task.Run(ReadSnapshot);

    private static RegistryUserSnapshot ReadSnapshot() =>
        CreateSnapshot(
            RegistrationInfo.DefaultUser,
            InternetAccess.RegistryServer,
            InternetAccess.Status,
            InternetAccess.RawStatus,
            InternetConnection.InternetConnectionActive()
        );

    /// <param name="status">
    /// <see cref="InternetAccess.Status"/>: a VpnRequired setting reads as Disabled in a restricted
    /// location without a VPN, and as Enabled anywhere else.
    /// </param>
    /// <param name="rawStatus"><see cref="InternetAccess.RawStatus"/>: the user's own choice.</param>
    internal static RegistryUserSnapshot CreateSnapshot(
        ParatextUser user,
        string registryUrl,
        InternetUse status,
        InternetUse rawStatus,
        bool isConnected
    ) =>
        new()
        {
            IsRegistered = user.IsValid,
            UserName = user.Name,
            RegistrationCode = user.RegistrationCode,
            RegistryUrl = registryUrl,
            IsInternetDisabled = status == InternetUse.Disabled,
            IsVpnRequired = rawStatus == InternetUse.VpnRequired,
            IsConnected = isConnected,
        };
}
