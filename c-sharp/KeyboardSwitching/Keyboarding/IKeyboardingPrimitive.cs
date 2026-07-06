namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only cross-platform OS-keyboard abstraction — PT9 delegates this to
// SIL.Windows.Forms.Keyboarding (Windows-only host); PT10 owns the primitive directly
// so Windows/Linux/macOS share one contract (FN-002).
// Maps to: CAP-002
/// <summary>
/// Thin cross-platform contract over the operating system's keyboard layer:
/// enumerate the installed keyboards, activate one, and report which one is active.
/// <br />
/// Implementations are selected at construction by <c>KeyboardingPrimitiveFactory</c>
/// (CAP-003): Windows (user32 P/Invoke), Linux (IBus over D-Bus), macOS (Text Input
/// Services P/Invoke), with <see cref="NoOpKeyboardingPrimitive"/> as the fallback.
/// Wrapped by <c>OsKeyboardDataProvider</c> (CAP-007) — the only C# wire surface.
/// <br />
/// All keyboard IDs at this boundary are normalized <c>KeyboardId</c> strings
/// (CAP-001: <c>"win:*"</c> / <c>"ibus:*"</c> / <c>"mac:*"</c>), opaque to every
/// consumer per INV-C07.
/// </summary>
public interface IKeyboardingPrimitive
{
    /// <summary>
    /// Enumerates the OS-installed keyboard options. Never returns null; an empty
    /// list is a valid steady state (FN-008).
    /// </summary>
    IReadOnlyList<KeyboardOption> EnumerateAvailable();

    /// <summary>
    /// Requests OS-level activation of the keyboard with the given normalized ID.
    /// Returns <c>true</c> when the OS-level activation was invoked, <c>false</c> for
    /// a no-op (e.g., degraded primitive, unusable input). Implementations MUST NOT
    /// propagate OS-layer exceptions to the caller (VAL-B-04: errors are logged, not
    /// thrown — keyboard activation failures must never block typing).
    /// </summary>
    /// <param name="keyboardId">Normalized keyboard ID to activate.</param>
    Task<bool> ActivateAsync(string keyboardId);

    /// <summary>
    /// Returns the normalized ID of the currently active OS keyboard, or <c>null</c>
    /// when there is none / it cannot be determined (maps to <c>undefined</c> on the
    /// wire for the <c>CurrentOsKeyboard</c> data type).
    /// </summary>
    string? GetCurrentlyActiveKeyboardId();
}
