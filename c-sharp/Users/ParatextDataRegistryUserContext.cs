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
    // Serializes this class's own reads only. InternetAccess.Status is process-wide and not safe to
    // read concurrently: while one thread's once-a-minute location lookup is running, any other
    // thread's read, including readers outside this class such as
    // ParatextProjectSendReceiveService and PlatformScrTextCollection, treats the location as
    // unknown, and so as restricted.
    private static readonly SemaphoreSlim s_readGate = new(1, 1);

    public ParatextDataRegistryUserContext()
        : this(ReadSnapshot) { }

    public async Task<RegistryUserSnapshot> GetSnapshotAsync()
    {
        await s_readGate.WaitAsync();
        try
        {
            // Off the calling thread, since ParatextData's reads may block (see ReadStatusFor for the
            // network location lookup it avoids).
            return await Task.Run(readSnapshot);
        }
        finally
        {
            s_readGate.Release();
        }
    }

    private static RegistryUserSnapshot ReadSnapshot()
    {
        var rawStatus = InternetAccess.RawStatus;
        return CreateSnapshot(
            RegistrationInfo.DefaultUser,
            InternetAccess.RegistryServer,
            ReadStatusFor(rawStatus, () => InternetAccess.Status),
            rawStatus,
            InternetConnection.InternetConnectionActive()
        );
    }

    /// <summary>
    /// <see cref="InternetAccess.Status"/>, read through <paramref name="readStatus"/>, except for a
    /// saved <see cref="InternetUse.VpnRequired"/>: tokens are refused for that whatever the
    /// location (<see cref="RegistryAccessTokenService"/>), so the network location lookup reading
    /// Status would start is skipped, and a value that is not Disabled stands in for it.
    /// </summary>
    internal static InternetUse ReadStatusFor(
        InternetUse rawStatus,
        Func<InternetUse> readStatus
    ) => rawStatus == InternetUse.VpnRequired ? InternetUse.Enabled : readStatus();

    /// <param name="status">
    /// <see cref="InternetAccess.Status"/>: a VpnRequired setting reads as Disabled in a restricted
    /// location without a VPN, and as Enabled anywhere else. Not read for a saved VpnRequired (see
    /// <see cref="ReadStatusFor"/>), so in that case it does not reflect the location.
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
