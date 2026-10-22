using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users;

[TestFixture]
public class InternetSettingsDataProviderTests
{
    // ----- MigrateVpnRequiredToDisabled -----

    [Test]
    public void MigrateVpnRequiredToDisabled_SavedVpnRequired_SavesDisabled()
    {
        var saved = new List<InternetUse>();

        InternetSettingsDataProvider.MigrateVpnRequiredToDisabled(
            () => InternetUse.VpnRequired,
            saved.Add
        );

        Assert.That(saved, Is.EqualTo(new[] { InternetUse.Disabled }));
    }

    [TestCase(InternetUse.Enabled)]
    [TestCase(InternetUse.Disabled)]
    [TestCase(InternetUse.ProxyOnly)]
    public void MigrateVpnRequiredToDisabled_AnyOtherSavedValue_SavesNothing(
        InternetUse savedInternetUse
    )
    {
        var saved = new List<InternetUse>();

        InternetSettingsDataProvider.MigrateVpnRequiredToDisabled(
            () => savedInternetUse,
            saved.Add
        );

        Assert.That(saved, Is.Empty);
    }

    // Startup calls it before most services are up, so a failure must not stop the process.
    [Test]
    public void MigrateVpnRequiredToDisabled_ReadFails_DoesNotThrow()
    {
        var saved = new List<InternetUse>();

        Assert.DoesNotThrow(
            () =>
                InternetSettingsDataProvider.MigrateVpnRequiredToDisabled(
                    () => throw new IOException("settings file locked"),
                    saved.Add
                )
        );
        Assert.That(saved, Is.Empty);
    }

    [Test]
    public void MigrateVpnRequiredToDisabled_SaveFails_DoesNotThrow()
    {
        var attemptedSaves = 0;

        Assert.DoesNotThrow(
            () =>
                InternetSettingsDataProvider.MigrateVpnRequiredToDisabled(
                    () => InternetUse.VpnRequired,
                    _ =>
                    {
                        attemptedSaves++;
                        throw new IOException("settings file locked");
                    }
                )
        );
        Assert.That(attemptedSaves, Is.EqualTo(1));
    }
}
