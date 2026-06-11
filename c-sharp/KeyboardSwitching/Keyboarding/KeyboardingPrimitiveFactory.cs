using System.Runtime.InteropServices;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only construction-time dispatch for the cross-platform OS-keyboard
// layer — PT9 is Windows-only (SIL.Windows.Forms.Keyboarding host) and has no
// per-platform selection; PT10 picks the matching IKeyboardingPrimitive via
// RuntimeInformation.IsOSPlatform (FN-002; backend-alignment.md §Architecture).
// Maps to: CAP-003
/// <summary>
/// Selects the <see cref="IKeyboardingPrimitive"/> implementation matching the
/// current operating system: Windows → <see cref="WindowsKeyboardingPrimitive"/>,
/// Linux → <see cref="LinuxKeyboardingPrimitive"/>, macOS →
/// <see cref="MacKeyboardingPrimitive"/>, anything else →
/// <see cref="NoOpKeyboardingPrimitive"/> (safe fallback — never crash for lack of a
/// platform layer, CAP-002). Every call constructs a fresh instance; construction
/// never touches OS interop (all three platform primitives bind their adapters
/// lazily per call), so the factory is safe on any host.
/// Consumed by <c>OsKeyboardDataProvider</c> (CAP-007).
/// </summary>
public static class KeyboardingPrimitiveFactory
{
    /// <summary>
    /// Creates the keyboard primitive for the OS this process is running on,
    /// dispatching on <see cref="RuntimeInformation.IsOSPlatform"/>.
    /// </summary>
    public static IKeyboardingPrimitive Create()
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Seam overload for tests: same dispatch, against an injected platform
    /// predicate instead of the real <see cref="RuntimeInformation"/> (CAP-003
    /// success criterion: "seam allows test injection of platform predicate").
    /// The production <see cref="Create()"/> delegates here so the dispatch logic
    /// is single-sourced.
    /// </summary>
    /// <param name="isOsPlatform">
    /// Platform predicate; production passes <see cref="RuntimeInformation.IsOSPlatform"/>.
    /// </param>
    internal static IKeyboardingPrimitive Create(Func<OSPlatform, bool> isOsPlatform)
    {
        throw new NotImplementedException();
    }
}
