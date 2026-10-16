using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Users;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextDataRegistryUserContextTests
{
    private const string REGISTRY_URL = "https://registry-dev.paratext.org";
    private const string MADE_UP_CODE = "NOT-A-REAL-REGISTRATION-CODE";

    [TestCase(true)]
    [TestCase(false)]
    public void CreateSnapshot_CopiesTheUserRegistryAndConnection(bool isConnected)
    {
        RegistryUserSnapshot snapshot = ParatextDataRegistryUserContext.CreateSnapshot(
            new ParatextUser("Test User", MADE_UP_CODE),
            REGISTRY_URL,
            InternetUse.Enabled,
            InternetUse.Enabled,
            isConnected
        );

        // A made-up code never validates; a valid one needs a real registration.
        Assert.That(snapshot.IsRegistered, Is.False);
        Assert.That(snapshot.UserName, Is.EqualTo("Test User"));
        Assert.That(snapshot.RegistrationCode, Is.EqualTo(MADE_UP_CODE));
        Assert.That(snapshot.RegistryUrl, Is.EqualTo(REGISTRY_URL));
        Assert.That(snapshot.IsConnected, Is.EqualTo(isConnected));
    }

    // `status` is InternetAccess.Status, which reports VpnRequired as Disabled in a restricted
    // location without a VPN and as Enabled elsewhere; `rawStatus` is the user's choice.
    [TestCase(InternetUse.Enabled, InternetUse.Enabled, false, false)]
    [TestCase(InternetUse.Disabled, InternetUse.Disabled, true, false)]
    [TestCase(InternetUse.Disabled, InternetUse.VpnRequired, true, true)]
    [TestCase(InternetUse.Enabled, InternetUse.VpnRequired, false, true)]
    [TestCase(InternetUse.ProxyOnly, InternetUse.ProxyOnly, false, false)]
    public void CreateSnapshot_MapsTheInternetSetting(
        InternetUse status,
        InternetUse rawStatus,
        bool expectedInternetDisabled,
        bool expectedVpnRequired
    )
    {
        RegistryUserSnapshot snapshot = ParatextDataRegistryUserContext.CreateSnapshot(
            new ParatextUser("Test User", MADE_UP_CODE),
            REGISTRY_URL,
            status,
            rawStatus,
            isConnected: true
        );

        Assert.That(snapshot.IsInternetDisabled, Is.EqualTo(expectedInternetDisabled));
        Assert.That(snapshot.IsVpnRequired, Is.EqualTo(expectedVpnRequired));
    }
}
