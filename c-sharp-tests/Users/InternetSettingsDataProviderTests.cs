using Paranext.DataProvider;
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

    // Which values migrate is covered by InternetSettingsLogicTests.MigratedRawStatus_*; this only
    // checks that a value that does not migrate is not saved.
    [Test]
    public void MigrateVpnRequiredToDisabled_OtherSavedValue_SavesNothing()
    {
        var saved = new List<InternetUse>();

        InternetSettingsDataProvider.MigrateVpnRequiredToDisabled(
            () => InternetUse.Enabled,
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

    // ----- SetInternetSettings: a host change must come with the password -----

    private const string PLACEHOLDER = InternetSettingsLogic.PLACEHOLDER_PASSWORD;

    /// <summary>What the getter reports for a user with a proxy and DBL credentials saved</summary>
    private static InternetAccess.InternetSettingsMemento Saved() =>
        new()
        {
            SelectedServer = ServerType.Production,
            PermittedInternetUse = InternetUse.ProxyOnly,
            ProxyHost = "proxy.example.org",
            ProxyPort = 8080,
            ProxyUsername = "proxy-user",
            ProxyPassword = PLACEHOLDER,
            OverrideDBLServer = "dbl.example.org",
            OverrideDBLApiServer = "api.dbl.example.org",
            OverrideGbcServer = "gbc.example.org",
            DBLEmail = "user@example.org",
            DBLPassword = PLACEHOLDER,
        };

    /// <summary>
    /// Runs the setter against <see cref="Saved"/>, recording what it would save instead of writing
    /// a real <c>InternetSettings.xml</c>
    /// </summary>
    private static List<InternetAccess.InternetSettingsMemento> Set(
        InternetAccess.InternetSettingsMemento newSettings
    )
    {
        var saved = new List<InternetAccess.InternetSettingsMemento>();
        using var client = new DummyPapiClient();
        new InternetSettingsDataProvider(client).SetInternetSettings(
            newSettings,
            Saved(),
            saved.Add
        );
        return saved;
    }

    [Test]
    public void SetInternetSettings_HostChangedWithPlaceholder_IsRefusedAndNothingIsSaved()
    {
        var saved = new List<InternetAccess.InternetSettingsMemento>();
        var changed = Saved();
        changed.ProxyHost = "attacker.example.net";
        using var client = new DummyPapiClient();
        var provider = new InternetSettingsDataProvider(client);

        var refusal = Assert.Throws<InvalidOperationException>(
            () => provider.SetInternetSettings(changed, Saved(), saved.Add)
        );

        Assert.That(PlatformErrorCodes.TryGetCode(refusal!, out var code), Is.True);
        Assert.That(code, Is.EqualTo(PlatformErrorCodes.InvalidArgument));
        Assert.That(refusal!.Message, Does.Contain(InternetSettingsLogic.PROXY_PASSWORD));
        Assert.That(saved, Is.Empty);
    }

    [Test]
    public void SetInternetSettings_DblServerChangedWithPlaceholder_IsRefused()
    {
        var changed = Saved();
        changed.OverrideDBLServer = "attacker.example.net";

        var refusal = Assert.Throws<InvalidOperationException>(() => Set(changed));

        Assert.That(refusal!.Message, Does.Contain(InternetSettingsLogic.DBL_PASSWORD));
    }

    [Test]
    public void SetInternetSettings_HostChangedWithRealPassword_IsSaved()
    {
        var changed = Saved();
        changed.ProxyHost = "new-proxy.example.org";
        changed.ProxyPassword = "typed-again";

        Assert.That(Set(changed), Has.Count.EqualTo(1));
    }

    [Test]
    public void SetInternetSettings_SelectedServerChangedWithPlaceholders_IsSaved()
    {
        var changed = Saved();
        changed.SelectedServer = ServerType.Development;

        Assert.That(Set(changed), Has.Count.EqualTo(1));
    }

    [Test]
    public void SetInternetSettings_ProxyUsernameOrDblEmailOrGbcServerChangedWithPlaceholders_IsSaved()
    {
        var changed = Saved();
        changed.ProxyUsername = "someone-else";
        changed.DBLEmail = "someone-else@example.org";
        changed.OverrideGbcServer = "other-gbc.example.org";

        Assert.That(Set(changed), Has.Count.EqualTo(1));
    }

    [Test]
    public void SetInternetSettings_ModeThatClearsTheProxy_IsSavedWhateverHostItCarries()
    {
        var changed = Saved();
        changed.PermittedInternetUse = InternetUse.Enabled;
        changed.ProxyHost = "attacker.example.net";

        Assert.That(Set(changed), Has.Count.EqualTo(1));
    }

    [Test]
    public void SetInternetSettings_EmptyServerOverride_IsSaved()
    {
        var changed = Saved();
        changed.OverrideDBLServer = "";

        Assert.That(Set(changed), Has.Count.EqualTo(1));
    }
}
