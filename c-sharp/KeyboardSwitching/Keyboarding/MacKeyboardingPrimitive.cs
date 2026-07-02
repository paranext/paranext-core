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
    private readonly IMacInputSourceApi _api;

    /// <summary>
    /// Production constructor: wires the real HIToolbox Text Input Services adapter.
    /// Never throws — the adapter resolves its interop lazily per call, so a TIS-layer
    /// failure surfaces later as contained per-call fallbacks, not as a construction
    /// failure.
    /// </summary>
    [SupportedOSPlatform("macos")]
    public MacKeyboardingPrimitive()
        : this(new MacInputSourceApi()) { }

    /// <summary>
    /// Seam constructor for tests: the primitive's mapping and guard logic runs
    /// against any <see cref="IMacInputSourceApi"/> on any OS.
    /// </summary>
    internal MacKeyboardingPrimitive(IMacInputSourceApi api)
    {
        _api = api;
    }

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        try
        {
            // ToList() materializes eagerly, so any seam/mapping throw surfaces here,
            // inside the containment catch below — TIS order preserved. An input
            // source without a localized name still needs a non-empty display name
            // for the dropdown (BHV-305): fall back to the input source id itself.
            return _api.ListInputSources()
                .Select(source => new KeyboardOption(
                    KeyboardId.FromMacInputSource(source.Id),
                    source.LocalizedName.Length > 0 ? source.LocalizedName : source.Id
                ))
                .ToList();
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: a TIS interop fault degrades to
            // the empty steady state (FN-008) — logged, never propagated.
            Console.Error.WriteLine($"MacKeyboardingPrimitive: keyboard enumeration failed: {e}");
            return [];
        }
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        // Ids this primitive cannot own (foreign prefix, missing prefix, null/empty,
        // empty "mac:" payload) degrade to "nothing activated" WITHOUT touching the
        // TIS layer. TryGetMacInputSource splits on the FIRST colon only, so the long
        // dotted input-method ids reach TIS verbatim, case preserved (CAP-001).
        if (!KeyboardId.TryGetMacInputSource(keyboardId, out string inputSourceId))
            return Task.FromResult(false);

        try
        {
            return Task.FromResult(_api.SelectInputSource(inputSourceId));
        }
        catch (Exception e)
        {
            // VAL-B-04 verbatim contract from IKeyboardingPrimitive: errors are
            // logged, not thrown — keyboard activation failures must never block
            // typing.
            Console.Error.WriteLine(
                $"MacKeyboardingPrimitive: activation of '{keyboardId}' failed: {e}"
            );
            return Task.FromResult(false);
        }
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        try
        {
            string? inputSourceId = _api.GetCurrentInputSourceId();
            // "Cannot determine" (null — and a blank id, defensively) maps to null
            // ("undefined" on the wire for CurrentOsKeyboard), never to "mac:" —
            // FromMacInputSource rejects empty ids, so guard before minting.
            return string.IsNullOrEmpty(inputSourceId)
                ? null
                : KeyboardId.FromMacInputSource(inputSourceId);
        }
        catch (Exception e)
        {
            // VAL-B-04 containment on the read path: fault degrades to "unknown".
            Console.Error.WriteLine(
                $"MacKeyboardingPrimitive: reading the active keyboard failed: {e}"
            );
            return null;
        }
    }
}
