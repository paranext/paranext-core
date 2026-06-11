using System.Runtime.Versioning;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-006 acceptance: macOS-only smoke tests against the REAL HIToolbox Text Input
/// Services layer (the production constructor — no seam fake). CI-gated to the
/// macos-latest leg of the existing test.yml matrix via <see cref="PlatformAttribute"/>
/// (RM-003 / implementation/decisions/keyboarding-macos.md §2); reported as Skipped
/// everywhere else.
/// <br />
/// Strategic-plan acceptance criterion: "EnumerateAvailable returns ≥1 entry;
/// GetCurrentlyActiveKeyboardId returns a non-null bundle id". Unlike the Linux
/// smoke tests (IBus is optional), Text Input Services is an always-present system
/// framework with at least one enabled keyboard input source, so this asserts the
/// criterion STRICTLY — no pass-with-fallback branch (plan decision D7). The
/// activation round-trip re-activates the ALREADY-active input source so the test
/// never changes the machine's keyboard state. This is the first macOS [DllImport]
/// interop in c-sharp/ — exercise on both osx-x64 and osx-arm64 per
/// keyboarding-macos.md §1.
/// </summary>
[TestFixture]
[Platform(Include = "MacOsX")]
// The NUnit Platform gate above guarantees this fixture only RUNS on macOS; the
// attribute below tells the CA1416 platform-compatibility analyzer the same thing so
// constructing the [SupportedOSPlatform("macos")] production primitive is clean.
[SupportedOSPlatform("macos")]
public class MacKeyboardingPrimitiveSmokeTests
{
    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Acceptance test (CAP-006 done signal on macOS): the real TIS-backed primitive "
            + "enumerates at least one selectable keyboard input source as a normalized "
            + "'mac:' id and reports a non-null, parseable active keyboard id"
    )]
    public void MacPrimitive_OnMacHost_EnumeratesInputSourcesAndReportsActiveOne()
    {
        // Construction must never throw — TIS is a public system framework that
        // needs no entitlements (keyboarding-macos.md §1).
        MacKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new MacKeyboardingPrimitive());

        // Any macOS host has at least one enabled keyboard input source.
        IReadOnlyList<KeyboardOption> available = primitive.EnumerateAvailable();
        Assert.That(available, Is.Not.Null);
        Assert.That(
            available,
            Is.Not.Empty,
            "EnumerateAvailable must return at least one input source on a macOS host"
        );

        // Every enumerated option carries a parseable 'mac:' id and a non-empty
        // display name (BHV-305 dropdown contract).
        Assert.That(
            available,
            Has.All.Matches<KeyboardOption>(option =>
                KeyboardId.TryGetMacInputSource(option.Id, out string inputSourceId)
                && inputSourceId.Length > 0
                && option.Name.Length > 0
            ),
            "every enumerated option must carry a parseable 'mac:' id and a name"
        );

        // The current keyboard input source is non-null and parseable — the second
        // half of the strategic-plan acceptance criterion.
        string? currentId = primitive.GetCurrentlyActiveKeyboardId();
        Assert.That(
            currentId,
            Is.Not.Null,
            "GetCurrentlyActiveKeyboardId must return a non-null bundle id on a macOS host"
        );
        Assert.That(
            KeyboardId.TryGetMacInputSource(currentId, out string currentInputSourceId)
                && currentInputSourceId.Length > 0,
            Is.True,
            $"active keyboard id '{currentId}' must be a parseable 'mac:' id"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    [Description(
        "All 3 interface methods round-trip against the real TIS layer: re-activating "
            + "the currently active input source succeeds and leaves it active — the "
            + "same OS mechanics the BHV-450/451 restore-default lifecycle relies on. "
            + "Reports Inconclusive in the defensive case where no current input source "
            + "id can be determined (nothing to round-trip)."
    )]
    public async Task MacPrimitive_ReactivatingCurrentInputSource_SucceedsAndRemainsActive()
    {
        MacKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new MacKeyboardingPrimitive());

        string? currentId = primitive.GetCurrentlyActiveKeyboardId();
        if (currentId == null)
        {
            Assert.Inconclusive(
                "current keyboard input source could not be determined on this host — "
                    + "activation round-trip not exercisable (the strict non-null "
                    + "assertion lives in the enumerate-and-report smoke test)"
            );
            return;
        }

        // Side-effect-free activate: targeting the already-active input source
        // exercises the full TISSelectInputSource path without changing the
        // machine's keyboard state.
        bool activated = await primitive.ActivateAsync(currentId);
        Assert.That(activated, Is.True);

        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo(currentId));
    }
}
