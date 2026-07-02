using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using TestParanextDataProvider.KeyboardSwitching.TestDoubles;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-004: WindowsKeyboardingPrimitive — cross-platform LOGIC tests via the
/// <c>IWindowsKeyboardLayoutApi</c> seam (fake user32 layer), runnable on any OS.
/// The genuinely OS-bound surface is verified by the CI-gated
/// <see cref="WindowsKeyboardingPrimitiveSmokeTests"/> (the CAP-004 acceptance test).
/// <br />
/// PT9 behavior anchors: BHV-305 (dropdown population from OS keyboard enumeration),
/// BHV-450/BHV-451 (lifecycle restore-default depends on OS-layer activate +
/// get-current). No PT9 TS-XXX scenarios — the OS primitive is PT10-only design
/// (strategic-plan-backend.md CAP-004).
/// </summary>
[TestFixture]
public class WindowsKeyboardingPrimitiveTests
{
    // Realistic HKL values: low word = LANGID, high word = device/layout.
    // 0x04090409 = en-US default layout; 0x04110411 = ja-JP default layout.
    private const nint EN_US_HKL = 0x04090409;
    private const nint JA_JP_HKL = 0x04110411;

    // 64-bit sign-extended IME HKL (high byte 0xE0 marks an IME device handle on
    // Win32; user32 returns it sign-extended on 64-bit) — strategic-plan edge case
    // "HKL with high-byte device handle".
    private static readonly nint JapaneseImeHkl = unchecked((nint)0xFFFFFFFFE0010411);

    private FakeWindowsKeyboardLayoutApi _fakeApi = default!;
    private WindowsKeyboardingPrimitive _primitive = default!;

    [SetUp]
    public void SetUp()
    {
        _fakeApi = new FakeWindowsKeyboardLayoutApi();
        _primitive = new WindowsKeyboardingPrimitive(_fakeApi);
    }

    // ===================================================================================
    // EnumerateAvailable: HKL -> KeyboardOption mapping (BHV-305 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithInstalledLayouts_MapsHklsToNormalizedKeyboardOptions()
    {
        // Each installed HKL becomes one KeyboardOption whose Id is the normalized
        // CAP-001 "win:<hkl-hex>" form (lowercase hex, no padding) and whose Name is
        // the OS display name carried verbatim — OS order preserved.
        _fakeApi.InstalledLayouts.AddRange([EN_US_HKL, JA_JP_HKL]);
        _fakeApi.DisplayNameFor = hkl => hkl == EN_US_HKL ? "English (United States)" : "Japanese";

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(2));
        Assert.That(available[0].Id, Is.EqualTo("win:4090409"));
        Assert.That(available[0].Name, Is.EqualTo("English (United States)"));
        Assert.That(available[1].Id, Is.EqualTo("win:4110411"));
        Assert.That(available[1].Name, Is.EqualTo("Japanese"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithZeroInstalledLayouts_ReturnsEmptyListNeverNull()
    {
        // Strategic-plan edge case "zero installed layouts (theoretically possible)" —
        // FN-008: an empty keyboard list is a valid steady state, not an error.
        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithHighByteDeviceHandleHkl_RoundTripsThroughKeyboardId()
    {
        // Strategic-plan edge case "HKL with high-byte device handle": a sign-extended
        // 64-bit IME HKL must mint an Id that parses back to the exact original HKL
        // (lossless round-trip is what lets ActivateAsync target this keyboard later).
        _fakeApi.InstalledLayouts.Add(JapaneseImeHkl);

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(1));
        Assert.That(available[0].Id, Is.EqualTo("win:ffffffffe0010411"));
        Assert.That(KeyboardId.TryGetWindowsHkl(available[0].Id, out nint roundTripped), Is.True);
        Assert.That(roundTripped, Is.EqualTo(JapaneseImeHkl));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WhenOsLayerThrows_ReturnsEmptyListWithoutPropagating()
    {
        // VAL-B-04 containment extended to the read path: OS-layer faults degrade to
        // the empty steady state (FN-008), they never crash the data provider.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("user32 fault");

        IReadOnlyList<KeyboardOption> available = default!;
        Assert.DoesNotThrow(() => available = _primitive.EnumerateAvailable());
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    // ===================================================================================
    // GetCurrentlyActiveKeyboardId: active HKL -> normalized id (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public void GetCurrentlyActiveKeyboardId_WithActiveLayout_ReturnsNormalizedWinId()
    {
        // The restore-default lifecycle (BHV-450 app blur / BHV-451 shutdown) reads
        // the active keyboard through this method; it must be the normalized form.
        _fakeApi.CurrentLayout = EN_US_HKL;

        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo("win:4090409"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenOsReportsNoLayout_ReturnsNull()
    {
        // HKL 0 is the Win32 "no layout / unknown" signal — maps to the interface's
        // null ("undefined" on the wire for CurrentOsKeyboard), NOT to "win:0".
        _fakeApi.CurrentLayout = 0;

        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenOsLayerThrows_ReturnsNullWithoutPropagating()
    {
        // VAL-B-04 containment on the read path: fault degrades to "unknown" (null).
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("user32 fault");

        string? currentId = "sentinel";
        Assert.DoesNotThrow(() => currentId = _primitive.GetCurrentlyActiveKeyboardId());
        Assert.That(currentId, Is.Null);
    }

    // ===================================================================================
    // ActivateAsync: normalized id -> OS activation request (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public async Task ActivateAsync_WithValidWinId_RequestsOsActivationOfParsedHklAndReturnsTrue()
    {
        // Happy path: the "win:<hex>" payload is parsed back to the exact HKL and
        // handed to the OS; OS acceptance surfaces as true.
        bool activated = await _primitive.ActivateAsync("win:4110411");

        Assert.That(activated, Is.True);
        Assert.That(_fakeApi.ActivateCalls, Is.EqualTo(new[] { JA_JP_HKL }));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithHighByteDeviceHandleId_ActivatesExactSignExtendedHkl()
    {
        // The strategic-plan device-handle edge case, on the activation side: the
        // sign-extended 64-bit IME HKL must reach the OS bit-for-bit.
        bool activated = await _primitive.ActivateAsync("win:ffffffffe0010411");

        Assert.That(activated, Is.True);
        Assert.That(_fakeApi.ActivateCalls, Is.EqualTo(new[] { JapaneseImeHkl }));
    }

    [TestCase("ibus:anthy")] // foreign platform prefix — not this primitive's id space
    [TestCase("mac:com.apple.keylayout.US")] // foreign platform prefix
    [TestCase("win:nothex")] // malformed payload — TryGetWindowsHkl rejects
    [TestCase("4090409")] // missing prefix entirely
    [TestCase("")] // empty
    [TestCase(null)] // null — primitive must contain it, not throw (VAL-B-04)
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithUnusableKeyboardId_ReturnsFalseWithoutCallingOs(
        string? keyboardId
    )
    {
        // Ids this primitive cannot own degrade to "nothing activated" (false) and
        // MUST NOT reach the OS layer — no exception for any input (VAL-B-04).
        bool activated = await _primitive.ActivateAsync(keyboardId!);

        Assert.That(activated, Is.False);
        Assert.That(_fakeApi.ActivateCalls, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithZeroHklPayload_ReturnsFalseWithoutCallingOs()
    {
        // "win:0" parses to HKL 0 via the documented TryGetWindowsHkl asymmetry
        // (CAP-001 decision I4: canonical mint never produces it), but HKL 0 is a NULL
        // handle — never a keyboard. The primitive owns this guard so user32 never
        // sees ActivateKeyboardLayout(0).
        bool activated = await _primitive.ActivateAsync("win:0");

        Assert.That(activated, Is.False);
        Assert.That(_fakeApi.ActivateCalls, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenOsRejectsActivation_ReturnsFalse()
    {
        // ActivateKeyboardLayout can refuse (e.g. layout unloaded between enumeration
        // and activation) — surfaces as false, never as an exception.
        _fakeApi.ActivateResult = false;

        bool activated = await _primitive.ActivateAsync("win:4090409");

        Assert.That(activated, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenOsLayerThrows_ReturnsFalseWithoutPropagating()
    {
        // VAL-B-04 verbatim contract from IKeyboardingPrimitive: implementations MUST
        // NOT propagate OS-layer exceptions — errors are logged, not thrown, because
        // keyboard activation failures must never block typing.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("user32 fault");

        bool activated = false;
        Assert.DoesNotThrowAsync(
            async () => activated = await _primitive.ActivateAsync("win:4090409")
        );
        Assert.That(activated, Is.False);
    }
}
