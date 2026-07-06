using System.Runtime.Versioning;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only Linux OS-keyboard primitive — PT9 is Windows-only and has no Linux
// keyboard layer; PT10 owns IBus over D-Bus directly behind IIbusKeyboardApi (FN-002;
// library decision BA-RF-005: Tmds.DBus.Protocol, referenced unconditionally — documented
// in implementation/decisions/keyboarding-linux.md §1). PT9 behavior anchors: BHV-305 (OS
// keyboard enumeration), BHV-450/BHV-451 (lifecycle restore-default relies on activate +
// get-current working at the OS layer).
// Maps to: CAP-005
/// <summary>
/// Linux implementation of <see cref="IKeyboardingPrimitive"/> over the IBus daemon
/// (via <see cref="IIbusKeyboardApi"/>): enumerates IBus input engines as normalized
/// <c>"ibus:&lt;engine&gt;"</c> keyboard IDs (CAP-001), activates an engine by
/// normalized ID, and reports the active engine. On XKB-only systems (no IBus daemon)
/// and on any D-Bus failure the primitive degrades gracefully — empty enumeration,
/// null current, false activate — and never propagates OS-layer exceptions (VAL-B-04:
/// keyboard failures must never block typing).
/// </summary>
public sealed class LinuxKeyboardingPrimitive : IKeyboardingPrimitive
{
    private readonly IIbusKeyboardApi _api;

    /// <summary>
    /// Production constructor: wires the real IBus D-Bus adapter. Never throws — the
    /// adapter touches the daemon per call, so an absent IBus (XKB-only system)
    /// surfaces later as contained per-call fallbacks, not as a construction failure.
    /// </summary>
    [SupportedOSPlatform("linux")]
    public LinuxKeyboardingPrimitive()
        : this(new IbusKeyboardApi()) { }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs against
    /// any <see cref="IIbusKeyboardApi"/> on any OS.
    /// </summary>
    internal LinuxKeyboardingPrimitive(IIbusKeyboardApi api)
    {
        _api = api;
    }

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        try
        {
            // ToList() materializes eagerly, so any seam/mapping throw surfaces here,
            // inside the containment catch below — IBus order preserved. An engine
            // without a long name still needs a non-empty display name for the
            // dropdown (BHV-305): fall back to the engine name itself.
            return _api.ListEngines()
                .Select(engine => new KeyboardOption(
                    KeyboardId.FromIbusEngine(engine.Name),
                    string.IsNullOrEmpty(engine.LongName) ? engine.Name : engine.LongName
                ))
                .ToList();
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: an unreachable IBus daemon
            // (XKB-only system, dropped connection) degrades to the empty steady
            // state (FN-008) — logged, never propagated.
            Console.Error.WriteLine($"LinuxKeyboardingPrimitive: keyboard enumeration failed: {e}");
            return [];
        }
    }

    public async Task<bool> ActivateAsync(string keyboardId)
    {
        // Ids this primitive cannot own (foreign prefix, missing prefix, null/empty,
        // empty "ibus:" payload) degrade to "nothing activated" WITHOUT touching the
        // daemon. TryGetIbusEngine splits on the FIRST colon only, so engine names
        // with embedded colons ("xkb:us::eng") reach IBus verbatim (CAP-001).
        if (!KeyboardId.TryGetIbusEngine(keyboardId, out string engineName))
            return false;

        try
        {
            return await _api.SetGlobalEngineAsync(engineName);
        }
        catch (Exception e)
        {
            // VAL-B-04 verbatim contract from IKeyboardingPrimitive: errors are logged,
            // not thrown — keyboard activation failures must never block typing. The
            // await contains sync seam throws and faulted activations (timeouts) alike.
            Console.Error.WriteLine(
                $"LinuxKeyboardingPrimitive: activation of '{keyboardId}' failed: {e}"
            );
            return false;
        }
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        try
        {
            string? engineName = _api.GetGlobalEngine();
            // "No global engine" (null — and a blank name, defensively) maps to null
            // ("undefined" on the wire for CurrentOsKeyboard), never to "ibus:" —
            // FromIbusEngine rejects empty engine names, so guard before minting.
            return string.IsNullOrEmpty(engineName) ? null : KeyboardId.FromIbusEngine(engineName);
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: fault degrades to "unknown".
            Console.Error.WriteLine(
                $"LinuxKeyboardingPrimitive: reading the active keyboard failed: {e}"
            );
            return null;
        }
    }
}
