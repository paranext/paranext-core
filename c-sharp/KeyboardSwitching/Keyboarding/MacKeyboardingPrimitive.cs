using System.Runtime.Versioning;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only macOS OS-keyboard primitive — PT9 is Windows-only and has no macOS
// keyboard layer; PT10 owns HIToolbox Text Input Services P/Invoke directly behind
// IMacInputSourceApi (FN-002; entitlements resolved as NOT REQUIRED and CI matrix
// resolved to the existing macos-latest leg in
// implementation/decisions/keyboarding-macos.md §1/§2). PT9 behavior anchors: BHV-305
// (OS keyboard enumeration), BHV-450/BHV-451 (lifecycle restore-default relies on
// activate + get-current working at the OS layer).
// Maps to: CAP-006
/// <summary>
/// macOS implementation of <see cref="IKeyboardingPrimitive"/> over HIToolbox Text
/// Input Services (via <see cref="IMacInputSourceApi"/>): enumerates selectable
/// keyboard input sources as normalized <c>"mac:&lt;bundle&gt;"</c> keyboard IDs
/// (CAP-001), activates an input source by normalized ID, and reports the active
/// input source. On any TIS-layer failure the primitive degrades gracefully — empty
/// enumeration, null current, false activate — and never propagates OS-layer
/// exceptions (VAL-B-04: keyboard failures must never block typing).
/// </summary>
public sealed class MacKeyboardingPrimitive : IKeyboardingPrimitive
{
    /// <summary>
    /// Production constructor: wires the real HIToolbox Text Input Services adapter.
    /// </summary>
    [SupportedOSPlatform("macos")]
    public MacKeyboardingPrimitive()
    {
        throw new NotImplementedException(
            "CAP-006 RED: production TIS adapter not implemented yet"
        );
    }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs
    /// against any <see cref="IMacInputSourceApi"/> on any OS.
    /// </summary>
    internal MacKeyboardingPrimitive(IMacInputSourceApi api)
    {
        // RED-phase stub: the seam is intentionally unused until GREEN so each
        // failing test points at the interface method under test, and construction
        // never throws.
        _ = api;
    }

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        throw new NotImplementedException("CAP-006 RED: EnumerateAvailable not implemented yet");
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        throw new NotImplementedException("CAP-006 RED: ActivateAsync not implemented yet");
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        throw new NotImplementedException(
            "CAP-006 RED: GetCurrentlyActiveKeyboardId not implemented yet"
        );
    }
}
