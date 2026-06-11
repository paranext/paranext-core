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
    private readonly IKeyboardingPrimitive _keyboardingPrimitive = keyboardingPrimitive;

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        // RED-phase stub (CAP-007 TDD): the tdd-implementer replaces this with the
        // function-tuple list for getAvailableOsKeyboards / getCurrentOsKeyboard /
        // setCurrentOsKeyboard delegating to _keyboardingPrimitive.
        throw new NotImplementedException(
            $"OsKeyboardDataProvider is not implemented yet (CAP-007 RED phase); "
                + $"wrapping {_keyboardingPrimitive.GetType().Name}"
        );
    }

    protected override Task StartDataProviderAsync()
    {
        // RED-phase stub (CAP-007 TDD).
        throw new NotImplementedException();
    }
}
