using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-004 acceptance: Windows-only smoke tests against the REAL user32.dll layer
/// (the production constructor — no seam fake). CI-gated to Windows runners via
/// <see cref="PlatformAttribute"/>; reported as Skipped everywhere else.
/// <br />
/// Strategic-plan acceptance criterion: "EnumerateAvailable returns ≥1 entry;
/// GetCurrentlyActiveKeyboardId returns non-null on a developer workstation"; success
/// criterion "all 3 interface methods round-trip". The round-trip re-activates the
/// ALREADY-active layout so the test never changes the machine's keyboard state.
/// </summary>
[TestFixture]
[Platform(Include = "Win")]
public class WindowsKeyboardingPrimitiveSmokeTests
{
    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "Acceptance test (CAP-004 done signal on Windows): the real user32-backed "
            + "primitive enumerates at least one installed keyboard as a normalized "
            + "'win:' id and reports a non-null, parseable active keyboard id"
    )]
    public void WindowsPrimitive_OnDeveloperWorkstation_EnumeratesKeyboardsAndReportsActiveOne()
    {
        IKeyboardingPrimitive primitive = new WindowsKeyboardingPrimitive();

        // Any Windows workstation has at least one installed keyboard layout.
        IReadOnlyList<KeyboardOption> available = primitive.EnumerateAvailable();
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Not.Empty);
        Assert.That(
            available,
            Has.All.Matches<KeyboardOption>(option =>
                KeyboardId.TryGetWindowsHkl(option.Id, out nint hkl)
                && hkl != 0
                && option.Name.Length > 0
            ),
            "every enumerated option must carry a parseable non-zero 'win:' id and a name"
        );

        // A keyboard is always active on an interactive Windows session.
        string? currentId = primitive.GetCurrentlyActiveKeyboardId();
        Assert.That(currentId, Is.Not.Null);
        Assert.That(
            KeyboardId.TryGetWindowsHkl(currentId, out nint currentHkl) && currentHkl != 0,
            Is.True,
            $"active keyboard id '{currentId}' must be a parseable non-zero 'win:' id"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Category("Smoke")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    [Description(
        "All 3 interface methods round-trip (CAP-004 success criterion): re-activating "
            + "the currently active keyboard succeeds and leaves it active — the same "
            + "OS mechanics the BHV-450/451 restore-default lifecycle relies on"
    )]
    public async Task WindowsPrimitive_ReactivatingCurrentKeyboard_SucceedsAndRemainsActive()
    {
        IKeyboardingPrimitive primitive = new WindowsKeyboardingPrimitive();

        string? currentId = primitive.GetCurrentlyActiveKeyboardId();
        Assert.That(currentId, Is.Not.Null, "precondition: an active keyboard exists");

        // Side-effect-free activate: targeting the already-active layout exercises the
        // full ActivateKeyboardLayout path without changing workstation state.
        bool activated = await primitive.ActivateAsync(currentId!);
        Assert.That(activated, Is.True);

        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo(currentId));
    }
}
