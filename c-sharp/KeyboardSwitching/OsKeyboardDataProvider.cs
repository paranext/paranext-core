using System.Text.Json;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using Paranext.DataProvider.NetworkObjects;

namespace Paranext.DataProvider.KeyboardSwitching;

// === NEW IN PT10 ===
// Reason: PT10-only thin DataProvider exposing the cross-platform OS-keyboard
// primitive on PAPI as `platform.osKeyboard` (network-object id
// `platform.osKeyboard-data`). PT9 has no wire surface here — it calls
// SIL.Windows.Forms.Keyboarding in-process; PT10's TypeScript
// KeyboardActivationService consumes this provider instead (alignment-decisions
// #21 Option B hybrid, #25 DataProvider reshape).
// Maps to: CAP-007
/// <summary>
/// Thin <see cref="NetworkObjects.DataProvider"/> wrapping the injected
/// <see cref="IKeyboardingPrimitive"/> — the ONLY C# wire surface of the
/// keyboard-switching feature. Two data types (selector <c>undefined</c>):
/// <list type="bullet">
/// <item><c>CurrentOsKeyboard</c> — get/set/subscribe. <c>set</c> activates the
///   keyboard via <see cref="IKeyboardingPrimitive.ActivateAsync"/> and broadcasts
///   <c>platform.osKeyboard-data:onDidUpdate</c> scoped to <c>CurrentOsKeyboard</c>
///   ONLY on success; failures are swallowed per VAL-B-04 (logged, never propagated —
///   keyboard activation failures must never block typing).</item>
/// <item><c>AvailableOsKeyboards</c> — get/subscribe; read-only OS enumeration
///   (BHV-305 OS layer).</item>
/// </list>
/// Contract pinned by <c>c-sharp-tests/KeyboardSwitching/OsKeyboardDataProviderTests.cs</c>.
/// </summary>
internal sealed class OsKeyboardDataProvider(
    PapiClient papiClient,
    IKeyboardingPrimitive keyboardingPrimitive
) : NetworkObjects.DataProvider("platform.osKeyboard", papiClient, NetworkObjectType.DATA_PROVIDER)
{
    private const string DATA_TYPE_CURRENT_OS_KEYBOARD = "CurrentOsKeyboard";

    private readonly IKeyboardingPrimitive _keyboardingPrimitive = keyboardingPrimitive;

    // Must provide all functions that are part of the platform.osKeyboard surface in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getAvailableOsKeyboards", GetAvailableOsKeyboards),
            ("getCurrentOsKeyboard", GetCurrentOsKeyboard),
            ("setCurrentOsKeyboard", SetCurrentOsKeyboardAsync),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        // No startup work: every get reads the primitive live so external OS
        // keyboard changes are always reflected (no enumeration caching).
        return Task.CompletedTask;
    }

    private IReadOnlyList<KeyboardOption> GetAvailableOsKeyboards(JsonElement _ignore)
    {
        return _keyboardingPrimitive.EnumerateAvailable();
    }

    private string? GetCurrentOsKeyboard(JsonElement _ignore)
    {
        return _keyboardingPrimitive.GetCurrentlyActiveKeyboardId();
    }

    private async Task<bool> SetCurrentOsKeyboardAsync(JsonElement _ignore, string keyboardId)
    {
        try
        {
            if (!await _keyboardingPrimitive.ActivateAsync(keyboardId))
                return false;
        }
        catch (Exception e)
        {
            // VAL-B-04: OS-layer activation errors are swallowed and logged, never
            // propagated — keyboard activation failures must never block typing.
            // (CAP-002 primitives promise not to throw; this is wire-boundary defense.)
            Console.Error.WriteLine(
                $"OsKeyboardDataProvider: activation of '{keyboardId}' failed: {e}"
            );
            return false;
        }

        // Broadcast ONLY on success, awaited so the update is observable as soon as
        // the set call resolves for every PAPI subscriber (deterministic, not
        // fire-and-forget).
        await SendDataUpdateEventAsync(DATA_TYPE_CURRENT_OS_KEYBOARD);
        return true;
    }
}
