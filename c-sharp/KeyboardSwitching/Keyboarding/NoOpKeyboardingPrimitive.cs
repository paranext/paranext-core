namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only null-object fallback for the cross-platform OS-keyboard layer —
// PT9 has no equivalent (Windows-only). Maps to: CAP-002
/// <summary>
/// Null-shape <see cref="IKeyboardingPrimitive"/>: empty enumeration, no-op activate
/// returning <c>false</c>, <c>null</c> current keyboard. Selected by
/// <c>KeyboardingPrimitiveFactory</c> (CAP-003) when no platform implementation
/// matches, used as a degraded fallback when a platform layer is unavailable, and
/// usable as a safe test double. Never throws, for any input.
/// </summary>
public sealed class NoOpKeyboardingPrimitive : IKeyboardingPrimitive
{
    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        // Empty list (never null) — FN-008: an empty keyboard list is a valid steady
        // state, so consumers handle the NoOp's enumeration without special-casing.
        return [];
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        // Deliberately ignores keyboardId WITHOUT validating it: the NoOp is the
        // safety net for "no platform implementation", so it must never throw — even
        // for null/empty input. Input validation is a wire-boundary concern
        // (data-contracts §2.1). "false" = nothing was activated (degraded-primitive
        // contract, VAL-B-04 spirit at the OS layer).
        return Task.FromResult(false);
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        // No OS keyboard exists to report; null maps to `undefined` on the wire.
        return null;
    }
}
