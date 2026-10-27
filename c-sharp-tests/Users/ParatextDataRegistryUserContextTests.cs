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

    // Reading InternetAccess.Status for a saved VpnRequired looks up the computer's location over the
    // network, and the token refusal does not depend on it, so a slow lookup must not delay it.
    [Test]
    public void ReadStatusFor_VpnRequired_DoesNotReadTheStatus()
    {
        var status = ParatextDataRegistryUserContext.ReadStatusFor(
            InternetUse.VpnRequired,
            () => throw new AssertionException("InternetAccess.Status was read")
        );

        Assert.That(status, Is.Not.EqualTo(InternetUse.Disabled));
    }

    [TestCase(InternetUse.Enabled)]
    [TestCase(InternetUse.Disabled)]
    [TestCase(InternetUse.ProxyOnly)]
    public void ReadStatusFor_AnyOtherRawStatus_ReadsTheStatus(InternetUse rawStatus)
    {
        int reads = 0;

        var status = ParatextDataRegistryUserContext.ReadStatusFor(
            rawStatus,
            () =>
            {
                reads++;
                return InternetUse.Disabled;
            }
        );

        Assert.That(status, Is.EqualTo(InternetUse.Disabled));
        Assert.That(reads, Is.EqualTo(1));
    }

    [Test]
    public async Task GetSnapshotAsync_WaitsForAReadInProgressBeforeStartingAnother()
    {
        using var firstStarted = new ManualResetEventSlim();
        using var secondStarted = new ManualResetEventSlim();
        using var finishFirst = new ManualResetEventSlim();
        int reads = 0;
        var context = new ParatextDataRegistryUserContext(() =>
        {
            if (Interlocked.Increment(ref reads) == 1)
            {
                firstStarted.Set();
                finishFirst.Wait(TimeSpan.FromSeconds(5));
            }
            else
                secondStarted.Set();
            return ParatextDataRegistryUserContext.CreateSnapshot(
                new ParatextUser("Test User", MADE_UP_CODE),
                REGISTRY_URL,
                InternetUse.Enabled,
                InternetUse.Enabled,
                isConnected: true
            );
        });

        Task<RegistryUserSnapshot> first = context.GetSnapshotAsync();
        Assert.That(firstStarted.Wait(TimeSpan.FromSeconds(5)), Is.True);
        Task<RegistryUserSnapshot> second = context.GetSnapshotAsync();

        Assert.That(secondStarted.Wait(TimeSpan.FromMilliseconds(500)), Is.False);
        finishFirst.Set();
        await Task.WhenAll(first, second);
        // Positive control: the second read does run once the first finishes.
        Assert.That(secondStarted.IsSet, Is.True);
    }
}
