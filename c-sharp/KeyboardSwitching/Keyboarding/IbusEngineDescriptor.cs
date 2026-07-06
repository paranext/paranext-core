namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only test seam over the Linux IBus D-Bus surface — PT9 reaches this OS
// layer through SIL.Windows.Forms.Keyboarding instead (FN-002). Deliberately free of
// Tmds.DBus.Protocol types so the seam and the cross-platform logic tests stay
// independent of the D-Bus client library, which is confined to IbusKeyboardApi
// (test-writer plan decision D2).
// Maps to: CAP-005
/// <summary>
/// One IBus input engine as the daemon describes it (one entry of <c>ListEngines</c>).
/// </summary>
/// <param name="Name">
/// The engine id IBus activates by (e.g. <c>"xkb:us::eng"</c>, <c>"anthy"</c>) — the
/// payload of the normalized <c>"ibus:&lt;engine&gt;"</c> keyboard ID (CAP-001). May
/// contain embedded colons; carried verbatim.
/// </param>
/// <param name="LongName">
/// Human-readable display name (e.g. <c>"English (US)"</c>, <c>"Anthy"</c>). May be
/// empty when the engine provides none.
/// </param>
internal sealed record IbusEngineDescriptor(string Name, string LongName);
