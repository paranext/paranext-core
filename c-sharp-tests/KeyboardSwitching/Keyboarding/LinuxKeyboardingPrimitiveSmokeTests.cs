using System.Runtime.Versioning;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-005 acceptance: Linux-only smoke tests against the REAL IBus D-Bus layer
/// (the production constructor — no seam fake). CI-gated to Linux runners via
/// <see cref="PlatformAttribute"/>; reported as Skipped everywhere else.
/// <br />
/// Strategic-plan acceptance criterion: "EnumerateAvailable returns ≥1 entry when IBus
/// is running; falls back gracefully when IBus is absent" — BOTH branches are
/// acceptance scenarios, so a host without an IBus daemon (XKB-only system, headless
/// CI runner, WSL2) PASSES by verifying the graceful-fallback shape rather than being
/// skipped. The activation round-trip re-activates the ALREADY-active engine so the
/// test never changes the machine's keyboard state.
/// </summary>
[TestFixture]
[Platform(Include = "Linux")]
// The NUnit Platform gate above guarantees this fixture only RUNS on Linux; the
// attribute below tells the platform-compatibility analyzer the same thing so
// constructing the [SupportedOSPlatform("linux")] production primitive is clean.
[SupportedOSPlatform("linux")]
public class LinuxKeyboardingPrimitiveSmokeTests
{
    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Acceptance test (CAP-005 done signal on Linux): the real IBus-backed primitive "
            + "either enumerates installed engines as normalized 'ibus:' ids (IBus "
            + "running) or falls back gracefully to empty/null/false (IBus absent) — "
            + "both branches are acceptance scenarios per the strategic plan"
    )]
    public void LinuxPrimitive_OnLinuxHost_EnumeratesIbusKeyboardsOrFallsBackGracefully()
    {
        // Construction must never throw — even on an XKB-only system with no IBus.
        LinuxKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new LinuxKeyboardingPrimitive());

        IReadOnlyList<KeyboardOption> available = default!;
        Assert.DoesNotThrow(() => available = primitive.EnumerateAvailable());
        Assert.That(available, Is.Not.Null);

        if (available.Count > 0)
        {
            // IBus-running branch: every enumerated option carries a parseable
            // 'ibus:' id and a non-empty display name (BHV-305 dropdown contract).
            Assert.That(
                available,
                Has.All.Matches<KeyboardOption>(option =>
                    KeyboardId.TryGetIbusEngine(option.Id, out string engine)
                    && engine.Length > 0
                    && option.Name.Length > 0
                ),
                "every enumerated option must carry a parseable 'ibus:' id and a name"
            );

            // The current engine is either unset (null — IBus allows no global
            // engine) or a parseable 'ibus:' id; never an exception.
            string? currentId = null;
            Assert.DoesNotThrow(() => currentId = primitive.GetCurrentlyActiveKeyboardId());
            if (currentId != null)
            {
                Assert.That(
                    KeyboardId.TryGetIbusEngine(currentId, out string currentEngine)
                        && currentEngine.Length > 0,
                    Is.True,
                    $"active keyboard id '{currentId}' must be a parseable 'ibus:' id"
                );
            }
        }
        else
        {
            // No-IBus fallback branch (itself an acceptance scenario): the primitive
            // degrades to the documented graceful shape — null current, false
            // activate — without ever throwing (VAL-B-04 / FN-008).
            string? currentId = "sentinel";
            Assert.DoesNotThrow(() => currentId = primitive.GetCurrentlyActiveKeyboardId());
            Assert.That(currentId, Is.Null, "no IBus daemon: current keyboard must be null");

            bool activated = true;
            Assert.DoesNotThrowAsync(
                async () => activated = await primitive.ActivateAsync("ibus:xkb:us::eng")
            );
            Assert.That(activated, Is.False, "no IBus daemon: activate must report false");
        }
    }

    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    [Description(
        "All 3 interface methods round-trip when IBus is available: re-activating the "
            + "currently active engine succeeds and leaves it active — the same OS "
            + "mechanics the BHV-450/451 restore-default lifecycle relies on. Reports "
            + "Inconclusive when IBus is absent or no global engine is set (nothing to "
            + "round-trip; the fallback shape is covered by the first smoke test)."
    )]
    public async Task LinuxPrimitive_ReactivatingCurrentEngine_SucceedsAndRemainsActive()
    {
        LinuxKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new LinuxKeyboardingPrimitive());

        string? currentId = primitive.GetCurrentlyActiveKeyboardId();
        if (currentId == null)
        {
            Assert.Inconclusive(
                "IBus daemon not running or no global engine set on this host — "
                    + "activation round-trip not exercisable (fallback shape is "
                    + "verified by the enumerate-or-fallback smoke test)"
            );
            return;
        }

        // Side-effect-free activate: targeting the already-active engine exercises
        // the full SetGlobalEngine path without changing workstation state.
        bool activated = await primitive.ActivateAsync(currentId);
        Assert.That(activated, Is.True);

        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo(currentId));
    }
}
