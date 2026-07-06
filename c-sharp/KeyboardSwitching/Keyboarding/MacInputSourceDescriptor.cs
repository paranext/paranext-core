namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only test seam over the macOS Text Input Services surface — PT9 is
// Windows-only and has no macOS keyboard layer (FN-002). Deliberately free of Core
// Foundation types (CFTypeRef et al.) so the seam and the cross-platform logic tests
// stay independent of the HIToolbox interop, which is confined to the real adapter
// (test-writer plan decision D2).
// Maps to: CAP-006
/// <summary>
/// One selectable macOS keyboard input source as Text Input Services describes it
/// (one entry of <c>ListInputSources</c>).
/// </summary>
/// <param name="Id">
/// The input source ID TIS selects by (<c>kTISPropertyInputSourceID</c>,
/// bundle-style, e.g. <c>"com.apple.keylayout.US"</c>) — the payload of the
/// normalized <c>"mac:&lt;bundle&gt;"</c> keyboard ID (CAP-001). Case-sensitive;
/// carried verbatim.
/// </param>
/// <param name="LocalizedName">
/// Human-readable display name (<c>kTISPropertyLocalizedName</c>, e.g. <c>"U.S."</c>,
/// <c>"Hiragana"</c>). May be empty when the input source provides none.
/// </param>
internal sealed record MacInputSourceDescriptor(string Id, string LocalizedName);
