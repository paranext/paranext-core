using System.Diagnostics.CodeAnalysis;
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
        return Create(RuntimeInformation.IsOSPlatform);
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
    // CA1416: the three production ctors are [SupportedOSPlatform]-attributed and the
    // analyzer cannot see the injected predicate as a platform guard. A
    // [SupportedOSPlatformGuard] helper was considered and rejected — it would assert
    // "predicate true ⇒ running on that OS", which is deliberately false under test
    // (the factory tests construct all four products on one host). The actual safety
    // invariant is different and weaker than what CA1416 checks: construction never
    // touches OS interop (all three platform primitives bind their adapters lazily per
    // call — pinned by CAP-004/005/006 tests and by
    // Create_OnActualHostOs_NeverThrowsAndReturnsNonNull), so constructing a
    // non-matching primitive is safe; only CALLING its members requires the matching
    // OS, and production only ever receives the primitive matching the real host.
    [SuppressMessage(
        "Interoperability",
        "CA1416:Validate platform compatibility",
        Justification = "Construction of the platform primitives never touches OS "
            + "interop (lazy adapters); the [SupportedOSPlatform] requirement applies "
            + "to their members, and production dispatch hands out only the primitive "
            + "matching the real host OS."
    )]
    internal static IKeyboardingPrimitive Create(Func<OSPlatform, bool> isOsPlatform)
    {
        // Fresh instance per call (no caching): primitive lifetime stays per-consumer.
        // Branch order is not a contract — the real RuntimeInformation.IsOSPlatform is
        // mutually exclusive across desktop OSes.
        if (isOsPlatform(OSPlatform.Windows))
            return new WindowsKeyboardingPrimitive();
        if (isOsPlatform(OSPlatform.Linux))
            return new LinuxKeyboardingPrimitive();
        if (isOsPlatform(OSPlatform.OSX))
            return new MacKeyboardingPrimitive();
        return new NoOpKeyboardingPrimitive();
    }
}
