using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users;

[TestFixture]
public class InternetServicesGateTests
{
    // "Disable access to some Bible translation services" must block wherever the user is.
    // ParatextData only blocks VpnRequired where the location is flagged as sensitive, so the gate
    // keys off the saved value.
    [TestCase(InternetUse.VpnRequired, ExpectedResult = true)]
    [TestCase(InternetUse.Disabled, ExpectedResult = true)]
    [TestCase(InternetUse.Enabled, ExpectedResult = false)]
    [TestCase(InternetUse.ProxyOnly, ExpectedResult = false)]
    public bool IsBlocked_ReflectsSavedSetting(InternetUse savedInternetUse) =>
        InternetServicesGate.IsBlocked(savedInternetUse);

    // TypeScript recognizes the block by this suffix, so it must survive whatever the message says
    [Test]
    public void CreateBlockedException_EndsWithSentinel()
    {
        var exception = InternetServicesGate.CreateBlockedException("Internet access is disabled.");

        Assert.That(exception.Message, Does.StartWith("Internet access is disabled."));
        Assert.That(exception.Message, Does.EndWith(InternetServicesGate.BlockedSentinel));
    }

    // Pinned as a literal because platform-bible-utils matches this exact text and cannot import it
    [Test]
    public void BlockedSentinel_MatchesTheTextTypeScriptLooksFor()
    {
        Assert.That(
            InternetServicesGate.BlockedSentinel,
            Is.EqualTo("(INTERNET_SERVICES_BLOCKED)")
        );
    }
}
