using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-002: IKeyboardingPrimitive interface + NoOpKeyboardingPrimitive fallback.
/// PT10-only design (no PT9 TS-XXX / BHV-XXX) — these tests ARE the null-shape
/// specification for the fallback primitive.
/// <br />
/// The NoOp is selected by KeyboardingPrimitiveFactory (CAP-003) when no platform
/// implementation matches (unknown OS / construction fallback) and doubles as a safe
/// test stand-in. Its contract is the deterministic null shape (backend-alignment.md
/// §Recommended File Structure): empty enumeration, activate is a no-op returning
/// false, no current keyboard — and it NEVER throws (CAP-002 success criterion:
/// consumers can construct a working primitive on any platform without crashing;
/// VAL-B-04 silent-failure spirit at the OS layer).
/// </summary>
[TestFixture]
public class NoOpKeyboardingPrimitiveTests
{
    // ===================================================================================
    // Outer acceptance test (Outside-In TDD done signal for CAP-002)
    // ===================================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Description(
        "Acceptance test: NoOp presents the full deterministic null shape through the "
            + "IKeyboardingPrimitive contract — empty enumeration, no-op activate returning "
            + "false, null current keyboard, no state mutation"
    )]
    public async Task NoOpKeyboardingPrimitive_AcceptanceTest_PresentsDeterministicNullShapeThroughInterface()
    {
        // Exercised THROUGH the interface — exactly how factory consumers (CAP-003) and
        // OsKeyboardDataProvider (CAP-007) hold it. This also pins the interface shape:
        // EnumerateAvailable / ActivateAsync / GetCurrentlyActiveKeyboardId.
        IKeyboardingPrimitive primitive = new NoOpKeyboardingPrimitive();

        // Null shape: nothing to enumerate, nothing active.
        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);

        // Activation is a no-op that reports false (degraded-primitive contract,
        // backend-alignment.md "Potential Pitfalls") — and never throws.
        bool activated = await primitive.ActivateAsync("win:4090409");
        Assert.That(activated, Is.False);

        // The no-op really did nothing: the null shape is unchanged.
        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
    }

    // ===================================================================================
    // EnumerateAvailable: empty list, never null, deterministic
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    public void EnumerateAvailable_Always_ReturnsEmptyListNeverNull()
    {
        // Empty list (not null) — FN-008: an empty keyboard list is a valid steady
        // state, so the NoOp's enumeration flows through consumers untouched.
        var primitive = new NoOpKeyboardingPrimitive();

        IReadOnlyList<KeyboardOption> available = primitive.EnumerateAvailable();

        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    public void EnumerateAvailable_CalledRepeatedly_StaysEmpty()
    {
        // "Deterministic null-shape values" (CAP-002 success criterion): repeated calls
        // observe the same empty enumeration — no lazy initialization surprises.
        var primitive = new NoOpKeyboardingPrimitive();

        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
    }

    // ===================================================================================
    // ActivateAsync: no-op returning false; never throws for ANY input
    // ===================================================================================

    [TestCase("win:4090409")] // valid-shaped Windows id (CAP-001 format)
    [TestCase("ibus:anthy")] // valid-shaped Linux id
    [TestCase("mac:com.apple.keylayout.US")] // valid-shaped macOS id
    [TestCase("fcitx:pinyin")] // unknown platform prefix — opaque per INV-C07
    [TestCase("")] // empty — wire boundary rejects this; the NoOp must still not throw
    [TestCase(null)] // null — the NoOp is the safety net; it swallows everything (plan D2)
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    public async Task ActivateAsync_WithAnyKeyboardId_ReturnsFalseWithoutThrowing(
        string? keyboardId
    )
    {
        // The NoOp exists so that "no platform implementation" never becomes a crash.
        // Input validation is a wire-boundary concern (data-contracts §2.1), not the
        // null object's — it reports "nothing activated" (false) for every input.
        var primitive = new NoOpKeyboardingPrimitive();

        bool activated = await primitive.ActivateAsync(keyboardId!);

        Assert.That(activated, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    public async Task ActivateAsync_AfterCall_DoesNotChangeNullShape()
    {
        // A TRUE no-op: activation must not invent a "current" keyboard or an
        // enumeration entry. Guards against a fake-double-style implementation that
        // records the last activated id and reports it back as current.
        var primitive = new NoOpKeyboardingPrimitive();

        await primitive.ActivateAsync("ibus:anthy");

        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
    }

    // ===================================================================================
    // GetCurrentlyActiveKeyboardId: null, deterministic
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    public void GetCurrentlyActiveKeyboardId_Always_ReturnsNull()
    {
        // No OS keyboard exists to report; null is the documented "unknown/none"
        // signal that maps to `undefined` at the wire (CurrentOsKeyboard, CAP-007).
        var primitive = new NoOpKeyboardingPrimitive();

        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
    }
}
