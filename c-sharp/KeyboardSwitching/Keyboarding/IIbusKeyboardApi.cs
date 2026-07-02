namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only test seam over the Linux IBus D-Bus surface — PT9 reaches this OS
// layer through SIL.Windows.Forms.Keyboarding instead (FN-002).
// Maps to: CAP-005
/// <summary>
/// Thin 1:1 seam over the IBus daemon surface used by
/// <see cref="LinuxKeyboardingPrimitive"/>: enumerate input engines
/// (<c>ListEngines</c>), read the active engine (<c>GetGlobalEngine</c>), and activate
/// an engine (<c>SetGlobalEngine</c>) on the <c>org.freedesktop.IBus</c> D-Bus name.
/// The real implementation owns all D-Bus details (Tmds.DBus.Protocol client, IBus
/// socket address discovery, connection lifecycle, sync-over-async strategy for the
/// read methods); tests substitute a fake so the primitive's mapping and guard logic
/// runs on any OS.
/// <br />
/// An unreachable IBus daemon (not installed / not running / connection lost / call
/// timed out) surfaces as member THROWS — exactly how real D-Bus client calls fail.
/// The primitive contains every seam exception (VAL-B-04), which is what makes the
/// XKB-only fallback graceful: empty enumeration / null current / false activate.
/// <br />
/// Internal by design: the only public contract of the Linux layer is
/// <see cref="IKeyboardingPrimitive"/>.
/// </summary>
internal interface IIbusKeyboardApi
{
    /// <summary>
    /// Returns the input engines the IBus daemon lists. Never null; empty when no
    /// engines are configured. Throws when the daemon is unreachable.
    /// </summary>
    IReadOnlyList<IbusEngineDescriptor> ListEngines();

    /// <summary>
    /// Returns the engine name of the currently active global engine, or <c>null</c>
    /// when no global engine is set. Throws when the daemon is unreachable.
    /// </summary>
    string? GetGlobalEngine();

    /// <summary>
    /// Requests activation of the engine with the given IBus engine name. Returns
    /// <c>true</c> when IBus accepted the activation, <c>false</c> when it rejected
    /// it. Throws (or faults the task) when the daemon is unreachable or the call
    /// times out.
    /// </summary>
    Task<bool> SetGlobalEngineAsync(string engineName);
}
