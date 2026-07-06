namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10 abstraction over an OS keyboard option — replaces SIL.Keyboarding's
// IKeyboardDefinition; cross-platform (FN-002). Shape per data-contracts.md §2.3.
// Maps to: CAP-002
/// <summary>
/// A single OS-installed keyboard option as enumerated by the OS-keyboard layer
/// (<see cref="IKeyboardingPrimitive.EnumerateAvailable"/>).
/// </summary>
/// <param name="Id">
/// Opaque OS-supplied ID (normalized <c>KeyboardId</c> string, CAP-001) — equality
/// target for selection logic. Required and non-empty.
/// </param>
/// <param name="Name">
/// Display name as enumerated by the OS. May contain RTL script (e.g., "العربية",
/// "עברית"); PT10 does NOT translate this string (FN-012).
/// </param>
/// <param name="IsRtlScript">
/// Optional hint that <paramref name="Name"/> is in an RTL script; <c>null</c> means
/// "unknown".
/// </param>
public sealed record KeyboardOption(string Id, string Name, bool? IsRtlScript = null);
