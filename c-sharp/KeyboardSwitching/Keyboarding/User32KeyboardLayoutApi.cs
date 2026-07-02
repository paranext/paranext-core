using System.Globalization;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only standalone user32.dll P/Invoke adapter — PT9 reaches this OS layer
// through SIL.Windows.Forms.Keyboarding (WinForms-coupled, .NET Framework 4.6.x), which
// is unsuitable for PT10's headless net8.0 data-provider process. Reuse decision
// BA-RF-006 + KLF flag choice documented in
// .context/features/keyboard-switching/implementation/decisions/keyboarding-windows.md.
// Maps to: CAP-004
/// <summary>
/// Real Windows implementation of <see cref="IWindowsKeyboardLayoutApi"/>: P/Invokes
/// <c>user32.dll</c> (<c>GetKeyboardLayoutList</c>, <c>GetKeyboardLayout</c>,
/// <c>ActivateKeyboardLayout</c>) per data-contracts.md §9 "Cross-Platform OS
/// Keyboarding → Windows". Display names are derived from the HKL's LANGID via
/// <see cref="CultureInfo"/> with a hex fallback, so the seam's "never null" promise
/// holds even for custom/transient locales.
/// <br />
/// <c>[DllImport]</c> (runtime marshalling) is used instead of source-generated
/// <c>[LibraryImport]</c> because the generator emits <c>unsafe</c> code for the HKL
/// array marshalling and this project does not enable <c>AllowUnsafeBlocks</c>; the
/// process is not AOT-compiled, so runtime marshalling is fully supported.
/// </summary>
[SupportedOSPlatform("windows")]
internal sealed class User32KeyboardLayoutApi : IWindowsKeyboardLayoutApi
{
    // KLF_SETFORPROCESS: activate the layout for the ENTIRE process, not just the
    // calling thread. The data-provider process is a multi-threaded async server —
    // per-thread activation (flags = 0) would be invisible to GetKeyboardLayout(0)
    // calls running on other thread-pool threads, breaking read-after-write coherence
    // (and the smoke round-trip). KLF_REORDER is deliberately NOT used: PT10 must not
    // mutate the user's layout rotation order. Rationale recorded in
    // decisions/keyboarding-windows.md.
    private const uint KLF_SETFORPROCESS = 0x00000100;

    public IReadOnlyList<nint> GetInstalledLayouts()
    {
        // Standard two-call Win32 pattern: first call with a null buffer returns the
        // number of installed layouts, second call fills the sized buffer.
        int count = GetKeyboardLayoutList(0, null);
        if (count <= 0)
            return [];

        var layouts = new nint[count];
        int filled = GetKeyboardLayoutList(layouts.Length, layouts);
        if (filled <= 0)
            return [];

        // Defensive: if fewer entries were filled than first reported (layout list
        // changed between the two calls), only return the filled prefix.
        return filled == layouts.Length ? layouts : layouts[..filled];
    }

    public nint GetCurrentLayout()
    {
        // idThread = 0: the current thread. With KLF_SETFORPROCESS activations the
        // layout is process-wide, so any thread observes it. Returns 0 when there is
        // no layout (e.g., non-interactive session) — the seam's "none/unknown" value.
        return GetKeyboardLayout(0);
    }

    public bool ActivateLayout(nint hkl)
    {
        // Returns the previously active HKL on success, 0 on failure.
        return ActivateKeyboardLayout(hkl, KLF_SETFORPROCESS) != 0;
    }

    public string GetLayoutDisplayName(nint hkl)
    {
        // EXPLANATION:
        // An HKL packs a LANGID (language identifier) in its low 16 bits and a device
        // handle in the high bits. The language's localized display name is the best
        // cheap human-readable name for a layout: the registry "Layout Text" lookup
        // requires deriving a KLID from the HKL, which is ambiguous for IME/custom
        // layouts, and GetKeyboardLayoutNameW only names the ACTIVE layout (naming all
        // layouts would require activating each one — a visible side effect).
        // Custom/transient LCIDs (e.g. LOCALE_CUSTOM_UNSPECIFIED) and a zero LANGID
        // have no culture — fall back to the layout's hex handle so the seam's
        // "never null" promise holds.
        int langId = (int)(hkl & 0xFFFF);
        if (langId != 0)
        {
            try
            {
                return CultureInfo.GetCultureInfo(langId).DisplayName;
            }
            catch (CultureNotFoundException)
            {
                // fall through to the hex fallback
            }
        }
        return $"Keyboard layout 0x{(nuint)hkl:x}";
    }

    [DllImport("user32.dll")]
    private static extern int GetKeyboardLayoutList(int nBuff, [Out] nint[]? lpList);

    [DllImport("user32.dll")]
    private static extern nint GetKeyboardLayout(uint idThread);

    [DllImport("user32.dll")]
    private static extern nint ActivateKeyboardLayout(nint hkl, uint flags);
}
