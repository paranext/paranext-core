namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only Windows OS-keyboard primitive — PT9 delegates Windows keyboard
// activation to SIL.Windows.Forms.Keyboarding; PT10 owns the user32.dll layer directly
// behind IWindowsKeyboardLayoutApi (FN-002). PT9 behavior anchors: BHV-305 (OS keyboard
// enumeration), BHV-450/BHV-451 (lifecycle restore-default relies on activate +
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
    /// <summary>
    /// Production constructor: wires the real <c>user32.dll</c> P/Invoke adapter.
    /// </summary>
    public WindowsKeyboardingPrimitive()
    {
        // RED stub (CAP-004): the real user32 adapter does not exist yet
        throw new NotImplementedException();
    }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs against
    /// any <see cref="IWindowsKeyboardLayoutApi"/> on any OS.
    /// </summary>
    internal WindowsKeyboardingPrimitive(IWindowsKeyboardLayoutApi api)
    {
        // RED stub (CAP-004): seam not stored yet so each method below fails with
        // NotImplementedException at the call site under test, not at construction
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
