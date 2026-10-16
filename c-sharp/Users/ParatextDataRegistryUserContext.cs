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

    private static RegistryUserSnapshot ReadSnapshot()
    {
        ParatextUser user = RegistrationInfo.DefaultUser;
        return new RegistryUserSnapshot
        {
            IsRegistered = user.IsValid,
            UserName = user.Name ?? "",
            RegistrationCode = user.RegistrationCode ?? "",
            RegistryUrl = InternetAccess.RegistryServer,
            IsInternetDisabled = InternetAccess.Status == InternetUse.Disabled,
            IsConnected = InternetConnection.InternetConnectionActive(),
        };
    }
}
