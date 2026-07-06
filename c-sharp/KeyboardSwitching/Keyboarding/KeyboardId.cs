using System.Globalization;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only normalized keyboard ID format — PT9 has no cross-platform keyboard ID
// scheme (PT9 anchor only for opacity semantics: IKeyboardDefinition.Id is opaque).
// Maps to: CAP-001
/// <summary>
/// Mints and parses the normalized, platform-prefixed keyboard ID format used across PT10:
/// <c>"win:&lt;hkl-hex&gt;"</c> (Windows), <c>"ibus:&lt;engine&gt;"</c> (Linux),
/// <c>"mac:&lt;bundle&gt;"</c> (macOS).
/// <br />
/// This class is the ONLY place in PT10 that is allowed to parse or mint this format.
/// Everywhere else — the wire, the TypeScript layer, settings storage — a keyboard ID is an
/// opaque string compared only by equality (INV-C07, data-contracts.md §2.1).
/// <br />
/// Unknown platform prefixes are tolerated without data loss: the <c>TryGet*</c> helpers
/// return <c>false</c> for IDs they do not own and never modify or throw on them
/// (CAP-001 edge case: "unknown platform prefix preserved as-is").
/// </summary>
/// <remarks>
/// CAP-001 (keyboard-switching, PT10-only design — no PT9 anchor for the format itself;
/// PT9 anchor for opacity: IKeyboardDefinition.Id).
/// </remarks>
public static class KeyboardId
{
    private const string WINDOWS_MARKER = "win:";
    private const string IBUS_MARKER = "ibus:";
    private const string MAC_MARKER = "mac:";

    /// <summary>
    /// Translates a Windows keyboard layout handle (HKL) into a normalized keyboard ID of the
    /// form <c>"win:&lt;hkl-hex&gt;"</c> (lowercase hex, no leading-zero padding).
    /// </summary>
    /// <param name="hkl">The HKL. Must not be zero (a NULL handle is not a keyboard).</param>
    /// <exception cref="ArgumentException">Thrown when <paramref name="hkl"/> is zero.</exception>
    public static string FromWindowsHkl(nint hkl)
    {
        if (hkl == 0)
            throw new ArgumentException("HKL must not be zero (NULL handle)", nameof(hkl));

        // Format from the full unsigned native value so negative (sign-extended) HKLs
        // round-trip losslessly without baking pointer width into the string format.
        return WINDOWS_MARKER + ((nuint)hkl).ToString("x", CultureInfo.InvariantCulture);
    }

    /// <summary>
    /// Attempts to translate a normalized keyboard ID back into a Windows HKL.
    /// Returns <c>false</c> (without throwing) for null/empty input, IDs not bearing the
    /// <c>"win:"</c> prefix, or malformed/overflowing hex payloads. Hex digits are parsed
    /// case-insensitively.
    /// </summary>
    public static bool TryGetWindowsHkl(string? keyboardId, out nint hkl)
    {
        hkl = 0;

        if (!TryGetPayload(keyboardId, WINDOWS_MARKER, out string payload))
            return false;

        // AllowHexSpecifier alone (NOT NumberStyles.HexNumber, which would also tolerate
        // leading/trailing whitespace): hex digits parse case-insensitively, everything
        // else stays strict-canonical. Parsing as ulong rejects payloads over 64 bits.
        if (
            !ulong.TryParse(
                payload,
                NumberStyles.AllowHexSpecifier,
                CultureInfo.InvariantCulture,
                out ulong value
            )
        )
            return false;

        // Permissive Try-pattern asymmetry, by design: "win:0" parses to hkl = 0 even though
        // FromWindowsHkl rejects 0, so a canonically minted id can never carry that payload
        // (implementer decision I4). On a hypothetical 32-bit runtime this cast would
        // truncate >32-bit payloads; PT10 ships 64-bit only, so the path is unreachable.
        hkl = unchecked((nint)value);
        return true;
    }

    /// <summary>
    /// Translates an IBus engine name (e.g. <c>"xkb:us::eng"</c>, <c>"anthy"</c>) into a
    /// normalized keyboard ID of the form <c>"ibus:&lt;engine&gt;"</c>. The engine name is
    /// carried verbatim — embedded colons and non-ASCII characters are preserved.
    /// </summary>
    /// <exception cref="ArgumentNullException">Thrown when <paramref name="engineName"/> is null.</exception>
    /// <exception cref="ArgumentException">Thrown when <paramref name="engineName"/> is empty.</exception>
    public static string FromIbusEngine(string engineName)
    {
        ArgumentException.ThrowIfNullOrEmpty(engineName);
        return IBUS_MARKER + engineName;
    }

    /// <summary>
    /// Attempts to extract the IBus engine name from a normalized keyboard ID. The prefix is
    /// split on the FIRST colon only; the payload is returned verbatim. Returns <c>false</c>
    /// (without throwing) for null/empty input or IDs not bearing the <c>"ibus:"</c> prefix.
    /// </summary>
    public static bool TryGetIbusEngine(string? keyboardId, out string engineName)
    {
        return TryGetPayload(keyboardId, IBUS_MARKER, out engineName);
    }

    /// <summary>
    /// Translates a macOS Text Input Services input source ID (bundle-style, e.g.
    /// <c>"com.apple.keylayout.US"</c>) into a normalized keyboard ID of the form
    /// <c>"mac:&lt;bundle&gt;"</c>. The input source ID is carried verbatim (case preserved).
    /// </summary>
    /// <exception cref="ArgumentNullException">Thrown when <paramref name="inputSourceId"/> is null.</exception>
    /// <exception cref="ArgumentException">Thrown when <paramref name="inputSourceId"/> is empty.</exception>
    public static string FromMacInputSource(string inputSourceId)
    {
        ArgumentException.ThrowIfNullOrEmpty(inputSourceId);
        return MAC_MARKER + inputSourceId;
    }

    /// <summary>
    /// Attempts to extract the macOS input source ID from a normalized keyboard ID.
    /// Returns <c>false</c> (without throwing) for null/empty input or IDs not bearing the
    /// <c>"mac:"</c> prefix.
    /// </summary>
    public static bool TryGetMacInputSource(string? keyboardId, out string inputSourceId)
    {
        return TryGetPayload(keyboardId, MAC_MARKER, out inputSourceId);
    }

    /// <summary>
    /// Shared string-payload extraction: the marker is matched exactly (lowercase, ordinal),
    /// splitting on the FIRST colon only so payloads with embedded colons (e.g. IBus
    /// <c>"xkb:us::eng"</c>) are returned verbatim. Null/empty IDs, foreign-prefix IDs, and
    /// empty payloads all return <c>false</c> without throwing (INV-C07).
    /// </summary>
    private static bool TryGetPayload(string? keyboardId, string marker, out string payload)
    {
        payload = "";

        if (string.IsNullOrEmpty(keyboardId))
            return false;
        if (!keyboardId.StartsWith(marker, StringComparison.Ordinal))
            return false;
        if (keyboardId.Length == marker.Length)
            return false; // empty payload — an empty platform id is not a keyboard

        payload = keyboardId[marker.Length..];
        return true;
    }
}
