using System.Runtime.Versioning;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only Windows OS-keyboard primitive — PT9 delegates Windows keyboard
// activation to SIL.Windows.Forms.Keyboarding; PT10 owns the user32.dll layer directly
// behind IWindowsKeyboardLayoutApi (FN-002; reuse decision BA-RF-006 documented in
// implementation/decisions/keyboarding-windows.md). PT9 behavior anchors: BHV-305 (OS
// keyboard enumeration), BHV-450/BHV-451 (lifecycle restore-default relies on activate +
// get-current working at the OS layer).
// Maps to: CAP-004
/// <summary>
/// Windows implementation of <see cref="IKeyboardingPrimitive"/> over the
/// <c>user32.dll</c> keyboard-layout API (via <see cref="IWindowsKeyboardLayoutApi"/>):
/// enumerates installed layouts as normalized <c>"win:&lt;hkl-hex&gt;"</c> keyboard IDs
/// (CAP-001), activates a layout by normalized ID, and reports the active layout.
/// OS-layer failures are contained, never propagated (VAL-B-04: keyboard failures must
/// never block typing).
/// </summary>
public sealed class WindowsKeyboardingPrimitive : IKeyboardingPrimitive
{
    private readonly IWindowsKeyboardLayoutApi _api;

    /// <summary>
    /// Production constructor: wires the real <c>user32.dll</c> P/Invoke adapter.
    /// </summary>
    [SupportedOSPlatform("windows")]
    public WindowsKeyboardingPrimitive()
        : this(new User32KeyboardLayoutApi()) { }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs against
    /// any <see cref="IWindowsKeyboardLayoutApi"/> on any OS.
    /// </summary>
    internal WindowsKeyboardingPrimitive(IWindowsKeyboardLayoutApi api)
    {
        _api = api;
    }

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        try
        {
            List<KeyboardOption> options = [];
            foreach (nint hkl in _api.GetInstalledLayouts())
            {
                options.Add(
                    new KeyboardOption(
                        KeyboardId.FromWindowsHkl(hkl),
                        _api.GetLayoutDisplayName(hkl)
                    )
                );
            }
            return options;
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: OS-layer faults degrade to the
            // empty steady state (FN-008) — logged, never propagated.
            Console.Error.WriteLine(
                $"WindowsKeyboardingPrimitive: keyboard enumeration failed: {e}"
            );
            return [];
        }
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        // Ids this primitive cannot own (foreign prefix, malformed, null/empty) and the
        // "win:0" NULL-handle payload (TryGetWindowsHkl's documented Try-pattern
        // asymmetry, CAP-001 decision I4) degrade to "nothing activated" WITHOUT
        // touching the OS layer.
        if (!KeyboardId.TryGetWindowsHkl(keyboardId, out nint hkl) || hkl == 0)
            return Task.FromResult(false);

        try
        {
            return Task.FromResult(_api.ActivateLayout(hkl));
        }
        catch (Exception e)
        {
            // VAL-B-04 verbatim contract from IKeyboardingPrimitive: errors are logged,
            // not thrown — keyboard activation failures must never block typing.
            Console.Error.WriteLine(
                $"WindowsKeyboardingPrimitive: activation of '{keyboardId}' failed: {e}"
            );
            return Task.FromResult(false);
        }
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        try
        {
            nint hkl = _api.GetCurrentLayout();
            // HKL 0 is the Win32 "no layout / unknown" signal — maps to null
            // ("undefined" on the wire for CurrentOsKeyboard), never to "win:0".
            return hkl == 0 ? null : KeyboardId.FromWindowsHkl(hkl);
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: fault degrades to "unknown".
            Console.Error.WriteLine(
                $"WindowsKeyboardingPrimitive: reading the active keyboard failed: {e}"
            );
            return null;
        }
    }
}
