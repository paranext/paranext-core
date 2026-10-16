using Paratext.Data;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.Users;

/// <summary>Reads the registration and internet state from ParatextData.</summary>
/// <param name="readSnapshot">
/// Reads the state. The parameterless constructor reads it from ParatextData.
/// </param>
internal sealed class ParatextDataRegistryUserContext(Func<RegistryUserSnapshot> readSnapshot)
    : IRegistryUserContext
{
    // InternetAccess.Status is process-wide and not safe to read concurrently: while one thread's
    // once-a-minute location lookup is running, another thread's read treats the location as
    // unknown, and so as restricted.
    private static readonly SemaphoreSlim s_readGate = new(1, 1);

    public ParatextDataRegistryUserContext()
        : this(ReadSnapshot) { }

    public async Task<RegistryUserSnapshot> GetSnapshotAsync()
    {
        await s_readGate.WaitAsync();
        try
        {
            // Off the calling thread: when the internet setting is VpnRequired, InternetAccess.Status
            // looks up the user's country over the network before answering.
            return await Task.Run(readSnapshot);
        }
        finally
        {
            s_readGate.Release();
        }
    }

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
