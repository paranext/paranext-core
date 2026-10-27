using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Refuses Send/Receive and Digital Bible Library network access, including the Registry calls
/// those services make, when the user's internet setting says those services are off.
/// </summary>
/// <remarks>
/// ParatextData only blocks these calls itself when its effective <c>InternetAccess.Status</c> is
/// <see cref="InternetUse.Disabled"/>. It resolves <see cref="InternetUse.VpnRequired"/> by the
/// machine's location: <see cref="InternetUse.Disabled"/> where the location is flagged as
/// sensitive or cannot be determined, <see cref="InternetUse.Enabled"/> everywhere else. So this
/// gate checks the saved value (<c>InternetAccess.RawStatus</c>) instead, and every entry point that
/// reaches one of these services calls <see cref="ThrowIfBlocked"/> before doing so. In core that is
/// the DBL catalog fetch and install; the Send/Receive entry points are implemented only in the
/// Paratext 10 Studio patch, which calls the gate itself.
/// <para>
/// <see cref="InternetUse.VpnRequired"/> ("Block internet when in sensitive locations") is blocked
/// because Platform.Bible does not implement that option yet (PT-4900), so it fails closed rather
/// than turning these services on outside sensitive locations. Startup replaces it with
/// <see cref="InternetUse.Disabled"/> (<see cref="InternetSettingsDataProvider.MigrateVpnRequiredToDisabled"/>),
/// so this matters only if that fails or something saves <see cref="InternetUse.VpnRequired"/>
/// later in the session. Registry access tokens fail closed on it too
/// (<see cref="RegistryAccessTokenService"/>); other ParatextData internet use still resolves it by
/// location. <see cref="InternetUse.ProxyOnly"/> is not blocked: ParatextData sends its requests through the
/// proxy carried over from Paratext 9, even though Platform.Bible cannot configure one yet.
/// </para>
/// </remarks>
internal static class InternetServicesGate
{
    /// <summary>
    /// The exact suffix on every rejection message. TypeScript matches it
    /// (platform-bible-utils <c>isErrorMessageAboutParatextBlockingInternetAccess</c>) to show the
    /// "internet access is disabled" message with a link to the setting. Changing it requires a
    /// matching change there.
    /// </summary>
    public const string BlockedSentinel = "(INTERNET_SERVICES_BLOCKED)";

    private const string BLOCKED_MESSAGE_KEY = "%data_loading_error_internetAccess_disabled_2%";

    private const string BLOCKED_MESSAGE_FALLBACK =
        "Internet access is disabled in “Internet & connectivity”. Please enable it and try again.";

    /// <summary>Whether the saved internet setting turns off Send/Receive and the DBL.</summary>
    public static bool IsBlocked(InternetUse savedInternetUse) =>
        savedInternetUse is InternetUse.VpnRequired or InternetUse.Disabled;

    /// <summary>The exception every blocked call throws: the given message plus the sentinel.</summary>
    public static InvalidOperationException CreateBlockedException(string message) =>
        new($"{message} {BlockedSentinel}");

    /// <summary>
    /// Throw if the saved internet setting turns off Send/Receive and the DBL. Call before any work
    /// that reaches one of those services.
    /// <para>
    /// When blocked, this BLOCKS the calling thread on a papi round trip (up to
    /// <see cref="ThreadingUtils.DefaultTimeout"/>) to localize the message. Never call it from the
    /// JSON-RPC dispatch thread — a request handler that has not moved off it, or an event handler —
    /// because that stalls every request in the process until the timeout. Call it from inside the
    /// handler's <c>Task.Run</c> worker instead.
    /// </para>
    /// </summary>
    public static void ThrowIfBlocked(PapiClient papiClient)
    {
        if (!IsBlocked(InternetAccess.RawStatus))
            return;

        throw CreateBlockedException(
            LocalizationService.GetLocalizedString(
                papiClient,
                BLOCKED_MESSAGE_KEY,
                BLOCKED_MESSAGE_FALLBACK
            )
        );
    }
}
