namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only test seam over the macOS Text Input Services surface — PT9 is
// Windows-only and has no macOS keyboard layer (FN-002).
// Maps to: CAP-006
/// <summary>
/// Thin 1:1 seam over the macOS <c>HIToolbox.framework</c> Text Input Services
/// surface used by <see cref="MacKeyboardingPrimitive"/>: enumerate selectable
/// keyboard input sources (<c>TISCreateInputSourceList</c>), read the active input
/// source (<c>TISCopyCurrentKeyboardInputSource</c>), and activate an input source
/// (<c>TISSelectInputSource</c>). The real implementation owns all interop details
/// (the <c>[DllImport]</c> declarations, CFString/CFArray/CFDictionary marshaling,
/// the Copy/Create-rule <c>CFTypeRef</c> retain/release lifecycle, and the TIS
/// filter dictionary mechanics); tests substitute a fake so the primitive's mapping
/// and guard logic runs on any OS.
/// <br />
/// A TIS-layer failure (framework interop fault, CF marshaling error, concurrent
/// input-source mutation surfacing as an exception) surfaces as member THROWS —
/// exactly how P/Invoke interop failures surface. The primitive contains every seam
/// exception (VAL-B-04): empty enumeration / null current / false activate, never a
/// propagated exception.
/// <br />
/// Internal by design: the only public contract of the macOS layer is
/// <see cref="IKeyboardingPrimitive"/>.
/// </summary>
internal interface IMacInputSourceApi
{
    /// <summary>
    /// Returns the selectable keyboard input sources Text Input Services lists.
    /// Never null; empty when none are available. Throws when the TIS layer fails.
    /// </summary>
    IReadOnlyList<MacInputSourceDescriptor> ListInputSources();

    /// <summary>
    /// Returns the input source ID (<c>kTISPropertyInputSourceID</c>) of the
    /// currently active keyboard input source, or <c>null</c> when it cannot be
    /// determined. Throws when the TIS layer fails.
    /// </summary>
    string? GetCurrentInputSourceId();

    /// <summary>
    /// Requests activation of the input source with the given input source ID.
    /// Returns <c>true</c> when TIS accepted the selection (<c>noErr</c>),
    /// <c>false</c> when it rejected it (nonzero <c>OSStatus</c>, ID not found, or
    /// the source is not selectable — e.g. it vanished between enumeration and
    /// selection). Throws when the TIS layer fails.
    /// </summary>
    bool SelectInputSource(string inputSourceId);
}
