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
}
