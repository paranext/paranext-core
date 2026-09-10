using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Pure, side-effect-free helpers for the InternetSettings get/set transformations, extracted from
/// InternetSettingsDataProvider so the non-obvious rules (proxy-host clearing, the RawStatus
/// re-assertion after SetProxy, secret masking/resolution) can be unit-tested without the static
/// ParatextData InternetAccess dependency.
/// </summary>
internal static class InternetSettingsLogic
{
    /// <summary>Placeholder shown in place of a real secret so we never hand out real passwords.</summary>
    public const string PLACEHOLDER_PASSWORD = "********";

    /// <summary>Mask a secret for display: the placeholder when a value is present, otherwise null.</summary>
    public static string? MaskSecret(string? value) =>
        !string.IsNullOrEmpty(value) ? PLACEHOLDER_PASSWORD : null;

    /// <summary>Normalize an empty string to null so the setting is removed from InternetSettings.xml (as in PT9).</summary>
    public static string? EmptyToNull(string? value) => value == "" ? null : value;

    /// <summary>
    /// Resolve a submitted secret against the stored one: if the caller echoed back the placeholder
    /// (i.e. "unchanged"), keep the current stored value; otherwise use what was submitted.
    /// </summary>
    public static string? ResolveSecret(string? submitted, string? current) =>
        submitted != PLACEHOLDER_PASSWORD ? submitted : current;

    /// <summary>Whether a submitted secret is an actual change (not the unchanged-placeholder).</summary>
    public static bool IsSecretChanged(string? submitted) => submitted != PLACEHOLDER_PASSWORD;

    /// <summary>The proxy host is only meaningful for ProxyOnly; every other mode clears it.</summary>
    public static bool ShouldClearProxyHost(InternetUse requested) =>
        requested != InternetUse.ProxyOnly;

    /// <summary>
    /// Compute the RawStatus to apply after InternetAccess.SetProxy (which forces Disabled). Returns
    /// the requested status to re-assert it only when SetProxy disabled it and the user asked for
    /// something that is neither Disabled nor ProxyOnly; otherwise null (leave as-is).
    /// </summary>
    public static InternetUse? ReassertedRawStatus(
        InternetUse currentRawStatus,
        InternetUse requested
    ) =>
        currentRawStatus == InternetUse.Disabled
        && requested != InternetUse.Disabled
        && requested != InternetUse.ProxyOnly
            ? requested
            : null;
}
