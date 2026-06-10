using System.Runtime.Versioning;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only Linux OS-keyboard primitive — PT9 is Windows-only and has no Linux
// keyboard layer; PT10 owns IBus over D-Bus directly behind IIbusKeyboardApi (FN-002;
// library decision BA-RF-005: Tmds.DBus.Protocol, Linux-conditional — to be documented
// in implementation/decisions/keyboarding-linux.md). PT9 behavior anchors: BHV-305 (OS
// keyboard enumeration), BHV-450/BHV-451 (lifecycle restore-default relies on activate +
// get-current working at the OS layer).
// Maps to: CAP-005
/// <summary>
/// Linux implementation of <see cref="IKeyboardingPrimitive"/> over the IBus daemon
/// (via <see cref="IIbusKeyboardApi"/>): enumerates IBus input engines as normalized
/// <c>"ibus:&lt;engine&gt;"</c> keyboard IDs (CAP-001), activates an engine by
/// normalized ID, and reports the active engine. On XKB-only systems (no IBus daemon)
/// and on any D-Bus failure the primitive degrades gracefully — empty enumeration,
/// null current, false activate — and never propagates OS-layer exceptions (VAL-B-04:
/// keyboard failures must never block typing).
/// </summary>
public sealed class LinuxKeyboardingPrimitive : IKeyboardingPrimitive
{
    /// <summary>
    /// Production constructor: wires the real IBus D-Bus adapter.
    /// </summary>
    [SupportedOSPlatform("linux")]
    public LinuxKeyboardingPrimitive()
    {
        // RED stub: the implementer wires the real Tmds.DBus.Protocol-backed adapter
        // (and makes the Linux-conditional csproj dependency decision) in GREEN.
        throw new NotImplementedException();
    }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs against
    /// any <see cref="IIbusKeyboardApi"/> on any OS.
    /// </summary>
    internal LinuxKeyboardingPrimitive(IIbusKeyboardApi api)
    {
        // RED stub: intentionally does not touch the seam so each failing test points
        // at the method under test, and so construction never throws even when IBus is
        // unreachable (the no-IBus fallback contract).
        _ = api;
    }

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        throw new NotImplementedException();
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        throw new NotImplementedException();
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        throw new NotImplementedException();
    }
}
