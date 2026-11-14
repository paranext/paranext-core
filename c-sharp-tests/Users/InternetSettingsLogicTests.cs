using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users;

[TestFixture]
public class InternetSettingsLogicTests
{
    // ----- MaskSecret -----

    [Test]
    public void MaskSecret_NonEmptyValue_ReturnsPlaceholder()
    {
        var result = InternetSettingsLogic.MaskSecret("s3cr3t");
        Assert.That(result, Is.EqualTo(InternetSettingsLogic.PLACEHOLDER_PASSWORD));
    }

    [Test]
    public void MaskSecret_EmptyString_ReturnsNull()
    {
        var result = InternetSettingsLogic.MaskSecret("");
        Assert.That(result, Is.Null);
    }

    [Test]
    public void MaskSecret_NullValue_ReturnsNull()
    {
        var result = InternetSettingsLogic.MaskSecret(null);
        Assert.That(result, Is.Null);
    }

    // ----- EmptyToNull -----

    [Test]
    public void EmptyToNull_EmptyString_ReturnsNull()
    {
        var result = InternetSettingsLogic.EmptyToNull("");
        Assert.That(result, Is.Null);
    }

    [Test]
    public void EmptyToNull_NonEmptyString_ReturnsSameValue()
    {
        var result = InternetSettingsLogic.EmptyToNull("hello");
        Assert.That(result, Is.EqualTo("hello"));
    }

    [Test]
    public void EmptyToNull_NullValue_ReturnsNull()
    {
        var result = InternetSettingsLogic.EmptyToNull(null);
        Assert.That(result, Is.Null);
    }

    // ----- ResolveSecret -----

    [Test]
    public void ResolveSecret_PlaceholderSubmitted_ReturnsCurrentValue()
    {
        var result = InternetSettingsLogic.ResolveSecret(
            InternetSettingsLogic.PLACEHOLDER_PASSWORD,
            "storedSecret"
        );
        Assert.That(result, Is.EqualTo("storedSecret"));
    }

    [Test]
    public void ResolveSecret_RealValueSubmitted_ReturnsSubmitted()
    {
        var result = InternetSettingsLogic.ResolveSecret("newSecret", "storedSecret");
        Assert.That(result, Is.EqualTo("newSecret"));
    }

    [Test]
    public void ResolveSecret_NullSubmitted_ReturnsNull()
    {
        var result = InternetSettingsLogic.ResolveSecret(null, "storedSecret");
        Assert.That(result, Is.Null);
    }

    // ----- IsSecretChanged -----

    [Test]
    public void IsSecretChanged_PlaceholderSubmitted_ReturnsFalse()
    {
        var result = InternetSettingsLogic.IsSecretChanged(
            InternetSettingsLogic.PLACEHOLDER_PASSWORD
        );
        Assert.That(result, Is.False);
    }

    [Test]
    public void IsSecretChanged_RealValueSubmitted_ReturnsTrue()
    {
        var result = InternetSettingsLogic.IsSecretChanged("actualPassword");
        Assert.That(result, Is.True);
    }

    [Test]
    public void IsSecretChanged_NullSubmitted_ReturnsTrue()
    {
        var result = InternetSettingsLogic.IsSecretChanged(null);
        Assert.That(result, Is.True);
    }

    // ----- ShouldClearProxyHost -----

    [Test]
    public void ShouldClearProxyHost_ProxyOnly_ReturnsFalse()
    {
        var result = InternetSettingsLogic.ShouldClearProxyHost(InternetUse.ProxyOnly);
        Assert.That(result, Is.False);
    }

    [Test]
    public void ShouldClearProxyHost_Enabled_ReturnsTrue()
    {
        var result = InternetSettingsLogic.ShouldClearProxyHost(InternetUse.Enabled);
        Assert.That(result, Is.True);
    }

    [Test]
    public void ShouldClearProxyHost_VpnRequired_ReturnsTrue()
    {
        var result = InternetSettingsLogic.ShouldClearProxyHost(InternetUse.VpnRequired);
        Assert.That(result, Is.True);
    }

    [Test]
    public void ShouldClearProxyHost_Disabled_ReturnsTrue()
    {
        var result = InternetSettingsLogic.ShouldClearProxyHost(InternetUse.Disabled);
        Assert.That(result, Is.True);
    }

    // ----- ReassertedRawStatus -----

    [Test]
    public void ReassertedRawStatus_DisabledCurrentAndEnabledRequested_ReturnsEnabled()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Disabled,
            InternetUse.Enabled
        );
        Assert.That(result, Is.EqualTo(InternetUse.Enabled));
    }

    [Test]
    public void ReassertedRawStatus_DisabledCurrentAndVpnRequiredRequested_ReturnsVpnRequired()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Disabled,
            InternetUse.VpnRequired
        );
        Assert.That(result, Is.EqualTo(InternetUse.VpnRequired));
    }

    [Test]
    public void ReassertedRawStatus_DisabledCurrentAndDisabledRequested_ReturnsNull()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Disabled,
            InternetUse.Disabled
        );
        Assert.That(result, Is.Null);
    }

    [Test]
    public void ReassertedRawStatus_DisabledCurrentAndProxyOnlyRequested_ReturnsNull()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Disabled,
            InternetUse.ProxyOnly
        );
        Assert.That(result, Is.Null);
    }

    [Test]
    public void ReassertedRawStatus_EnabledCurrentAndEnabledRequested_ReturnsNull()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Enabled,
            InternetUse.Enabled
        );
        Assert.That(result, Is.Null);
    }

    [Test]
    public void ReassertedRawStatus_EnabledCurrentAndDisabledRequested_ReturnsNull()
    {
        var result = InternetSettingsLogic.ReassertedRawStatus(
            InternetUse.Enabled,
            InternetUse.Disabled
        );
        Assert.That(result, Is.Null);
    }

    // ----- MigratedRawStatus -----

    // The app does not implement "Block internet when in sensitive locations" yet, so a saved
    // VpnRequired moves to the most restrictive option it does offer.
    [Test]
    public void MigratedRawStatus_VpnRequired_ReturnsDisabled()
    {
        var result = InternetSettingsLogic.MigratedRawStatus(InternetUse.VpnRequired);
        Assert.That(result, Is.EqualTo(InternetUse.Disabled));
    }

    [TestCase(InternetUse.Enabled)]
    [TestCase(InternetUse.Disabled)]
    [TestCase(InternetUse.ProxyOnly)]
    public void MigratedRawStatus_AnyOtherValue_ReturnsNull(InternetUse savedInternetUse)
    {
        var result = InternetSettingsLogic.MigratedRawStatus(savedInternetUse);
        Assert.That(result, Is.Null);
    }

    // ----- ParsePermittedInternetUse -----

    // As ParatextData writes InternetSettings.xml: UTF-8 with a byte order mark and a declaration.
    private static string InternetSettingsXml(string permittedInternetUseElement) =>
        "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
        + "<InternetSettingsMemento>\n"
        + "  <SelectedServer>Production</SelectedServer>\n"
        + $"  {permittedInternetUseElement}\n"
        + "  <ProxyPort>0</ProxyPort>\n"
        + "</InternetSettingsMemento>";

    [TestCase(InternetUse.Enabled)]
    [TestCase(InternetUse.VpnRequired)]
    [TestCase(InternetUse.Disabled)]
    [TestCase(InternetUse.ProxyOnly)]
    public void ParsePermittedInternetUse_ReadsTheSavedValue(InternetUse saved)
    {
        var result = InternetSettingsLogic.ParsePermittedInternetUse(
            InternetSettingsXml($"<PermittedInternetUse>{saved}</PermittedInternetUse>")
        );
        Assert.That(result, Is.EqualTo(saved));
    }

    [Test]
    public void ParsePermittedInternetUse_NoPermittedInternetUse_ReturnsNull()
    {
        var result = InternetSettingsLogic.ParsePermittedInternetUse(InternetSettingsXml(""));
        Assert.That(result, Is.Null);
    }

    // A number parses as an enum value of its own, so it must not slip through as one.
    [TestCase("Sometimes")]
    [TestCase("7")]
    [TestCase("")]
    public void ParsePermittedInternetUse_UnknownValue_ReturnsNull(string value)
    {
        var result = InternetSettingsLogic.ParsePermittedInternetUse(
            InternetSettingsXml($"<PermittedInternetUse>{value}</PermittedInternetUse>")
        );
        Assert.That(result, Is.Null);
    }

    [TestCase("")]
    [TestCase("<InternetSettingsMemento><PermittedInternetUse>Enabled")]
    [TestCase("not xml")]
    public void ParsePermittedInternetUse_MalformedXml_ReturnsNull(string xml)
    {
        Assert.That(InternetSettingsLogic.ParsePermittedInternetUse(xml), Is.Null);
    }

    // ----- PasswordRequiredForChange -----

    private const string PLACEHOLDER = InternetSettingsLogic.PLACEHOLDER_PASSWORD;

    /// <summary>
    /// Calls <see cref="InternetSettingsLogic.PasswordRequiredForChange"/> with nothing changed, both
    /// passwords saved and echoed back as the placeholder, unless an argument says otherwise.
    /// </summary>
    private static string? Required(
        string? newProxyHost = "proxy.example.org",
        int newProxyPort = 8080,
        string? submittedProxyPassword = PLACEHOLDER,
        bool hasSavedProxyPassword = true,
        string? newDblServer = "dbl.example.org",
        string? newDblApiServer = "api.dbl.example.org",
        string? submittedDblPassword = PLACEHOLDER,
        bool hasSavedDblPassword = true
    ) =>
        InternetSettingsLogic.PasswordRequiredForChange(
            currentProxyHost: "proxy.example.org",
            newProxyHost: newProxyHost,
            currentProxyPort: 8080,
            newProxyPort: newProxyPort,
            submittedProxyPassword: submittedProxyPassword,
            hasSavedProxyPassword: hasSavedProxyPassword,
            currentDblServer: "dbl.example.org",
            newDblServer: newDblServer,
            currentDblApiServer: "api.dbl.example.org",
            newDblApiServer: newDblApiServer,
            submittedDblPassword: submittedDblPassword,
            hasSavedDblPassword: hasSavedDblPassword
        );

    [Test]
    public void ProxyHostChanged_PlaceholderPassword_SavedPassword_RequiresProxyPassword()
    {
        Assert.That(
            Required(newProxyHost: "attacker.example.net"),
            Is.EqualTo(InternetSettingsLogic.PROXY_PASSWORD)
        );
    }

    [Test]
    public void ProxyPortChanged_PlaceholderPassword_SavedPassword_RequiresProxyPassword()
    {
        Assert.That(Required(newProxyPort: 3128), Is.EqualTo(InternetSettingsLogic.PROXY_PASSWORD));
    }

    [Test]
    public void ProxyHostChanged_RealPassword_Allowed()
    {
        Assert.That(
            Required(newProxyHost: "attacker.example.net", submittedProxyPassword: "typed-again"),
            Is.Null
        );
    }

    [Test]
    public void ProxyHostChanged_Placeholder_NoSavedPassword_Allowed()
    {
        Assert.That(
            Required(newProxyHost: "attacker.example.net", hasSavedProxyPassword: false),
            Is.Null
        );
    }

    [TestCase(null)]
    [TestCase("")]
    public void ProxyHostCleared_Placeholder_Allowed(string? newProxyHost)
    {
        Assert.That(Required(newProxyHost: newProxyHost, newProxyPort: 0), Is.Null);
    }

    [Test]
    public void DblServerChanged_PlaceholderPassword_RequiresDblPassword()
    {
        Assert.That(
            Required(newDblServer: "attacker.example.net"),
            Is.EqualTo(InternetSettingsLogic.DBL_PASSWORD)
        );
    }

    [Test]
    public void DblApiServerChanged_PlaceholderPassword_RequiresDblPassword()
    {
        Assert.That(
            Required(newDblApiServer: "attacker.example.net"),
            Is.EqualTo(InternetSettingsLogic.DBL_PASSWORD)
        );
    }

    [Test]
    public void DblServerChanged_RealPassword_Allowed()
    {
        Assert.That(
            Required(newDblServer: "attacker.example.net", submittedDblPassword: "typed-again"),
            Is.Null
        );
    }

    [Test]
    public void DblServerCleared_Placeholder_Allowed()
    {
        Assert.That(Required(newDblServer: null, newDblApiServer: null), Is.Null);
    }

    [Test]
    public void NothingChanged_Placeholders_Allowed()
    {
        Assert.That(Required(), Is.Null);
    }
}
