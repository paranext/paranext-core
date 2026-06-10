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
