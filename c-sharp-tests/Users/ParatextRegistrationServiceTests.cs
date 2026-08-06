using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users;

[TestFixture]
internal class ParatextRegistrationServiceTests
{
    [Test]
    public void GetRegistryUrl_Development_ReturnsDevSite() =>
        Assert.That(
            ParatextRegistrationService.GetRegistryUrl(ServerType.Development),
            Is.EqualTo("https://registry-dev.paratext.org/")
        );

    [Test]
    public void GetRegistryUrl_Test_ReturnsTestSite() =>
        Assert.That(
            ParatextRegistrationService.GetRegistryUrl(ServerType.Test),
            Is.EqualTo("https://registry-test.paratext.org/")
        );

    [Test]
    public void GetRegistryUrl_QualityAssurance_ReturnsQaSite() =>
        Assert.That(
            ParatextRegistrationService.GetRegistryUrl(ServerType.QualityAssurance),
            Is.EqualTo("https://registry-qa.paratext.org/")
        );

    [Test]
    public void GetRegistryUrl_Production_ReturnsProductionSite() =>
        Assert.That(
            ParatextRegistrationService.GetRegistryUrl(ServerType.Production),
            Is.EqualTo("https://registry.paratext.org/")
        );
}
