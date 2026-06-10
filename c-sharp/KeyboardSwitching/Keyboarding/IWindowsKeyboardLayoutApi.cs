namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only test seam over the Windows user32.dll keyboard-layout surface —
// PT9 reaches this OS layer through SIL.Windows.Forms.Keyboarding instead (FN-002).
// Maps to: CAP-004
/// <summary>
/// Thin 1:1 seam over the Windows keyboard-layout API used by
/// <see cref="WindowsKeyboardingPrimitive"/>: enumerate installed layouts
/// (<c>GetKeyboardLayoutList</c>), read the active layout (<c>GetKeyboardLayout</c>),
/// activate a layout (<c>ActivateKeyboardLayout</c>), and look up a layout's display
/// name. The real implementation P/Invokes <c>user32.dll</c> and owns all Win32
/// details (buffer sizing, <c>KLF_*</c> activation flags, name lookup mechanism);
/// tests substitute a fake so the primitive's mapping and guard logic runs on any OS.
/// <br />
/// Internal by design: the only public contract of the Windows layer is
/// <see cref="IKeyboardingPrimitive"/>.
/// </summary>
internal interface IWindowsKeyboardLayoutApi
{
    /// <summary>
    /// Returns the HKLs (keyboard layout handles) of all installed keyboard layouts.
    /// Never null; empty when none are installed or the query fails.
    /// </summary>
    IReadOnlyList<nint> GetInstalledLayouts();

    /// <summary>
    /// Returns the HKL of the currently active keyboard layout, or <c>0</c> when there
    /// is none / it cannot be determined.
    /// </summary>
    nint GetCurrentLayout();

    /// <summary>
    /// Requests OS activation of the layout with the given HKL. Returns <c>true</c>
    /// when the OS accepted the activation, <c>false</c> when it rejected it.
    /// </summary>
    bool ActivateLayout(nint hkl);

    /// <summary>
    /// Returns a human-readable display name for the layout with the given HKL.
    /// Never null; implementations fall back to a generic name when no better one is
    /// available.
    /// </summary>
    string GetLayoutDisplayName(nint hkl);
}
