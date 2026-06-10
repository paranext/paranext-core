using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using TestParanextDataProvider.KeyboardSwitching.TestDoubles;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-005: LinuxKeyboardingPrimitive — cross-platform LOGIC tests via the
/// <c>IIbusKeyboardApi</c> seam (fake IBus D-Bus layer), runnable on any OS.
/// The genuinely OS-bound surface is verified by the CI-gated
/// <see cref="LinuxKeyboardingPrimitiveSmokeTests"/> (the CAP-005 acceptance test).
/// <br />
/// PT9 behavior anchors: BHV-305 (dropdown population from OS keyboard enumeration),
/// BHV-450/BHV-451 (lifecycle restore-default depends on OS-layer activate +
/// get-current). No PT9 TS-XXX scenarios — the OS primitive is PT10-only design
/// (strategic-plan-backend.md CAP-005).
/// </summary>
[TestFixture]
public class LinuxKeyboardingPrimitiveTests
{
    // Realistic IBus engine descriptors: an XKB layout engine (engine name contains
    // embedded colons — the CAP-001 first-colon-split edge case) and an IME engine.
    private static readonly IbusEngineDescriptor UsEngine = new("xkb:us::eng", "English (US)");
    private static readonly IbusEngineDescriptor AnthyEngine = new("anthy", "Anthy");

    private FakeIbusKeyboardApi _fakeApi = default!;
    private LinuxKeyboardingPrimitive _primitive = default!;

    [SetUp]
    public void SetUp()
    {
        _fakeApi = new FakeIbusKeyboardApi();
        _primitive = new LinuxKeyboardingPrimitive(_fakeApi);
    }

    // ===================================================================================
    // EnumerateAvailable: IBus engine -> KeyboardOption mapping (BHV-305 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithEngines_MapsToNormalizedIbusKeyboardOptions()
    {
        // Each IBus engine becomes one KeyboardOption whose Id is the normalized
        // CAP-001 "ibus:<engine>" form (engine name verbatim, embedded colons intact)
        // and whose Name is the IBus long name carried verbatim — IBus order preserved.
        _fakeApi.Engines.AddRange([UsEngine, AnthyEngine]);

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(2));
        Assert.That(available[0].Id, Is.EqualTo("ibus:xkb:us::eng"));
        Assert.That(available[0].Name, Is.EqualTo("English (US)"));
        Assert.That(available[1].Id, Is.EqualTo("ibus:anthy"));
        Assert.That(available[1].Name, Is.EqualTo("Anthy"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithZeroEngines_ReturnsEmptyListNeverNull()
    {
        // FN-008: an empty keyboard list is a valid steady state, not an error —
        // e.g. an IBus daemon running with no engines configured.
        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithEmptyLongName_FallsBackToEngineName()
    {
        // BHV-305 feeds a dropdown — every option needs a non-empty display name.
        // When IBus provides no long name, the engine name is the display name
        // (plan decision D4; mirrors the CAP-004 seam's never-empty-name promise).
        _fakeApi.Engines.Add(new IbusEngineDescriptor("hangul", ""));

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(1));
        Assert.That(available[0].Id, Is.EqualTo("ibus:hangul"));
        Assert.That(available[0].Name, Is.EqualTo("hangul"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WhenIbusUnreachable_ReturnsEmptyListWithoutPropagating()
    {
        // The XKB-only fallback (strategic-plan critical edge case "IBus daemon NOT
        // running"): VAL-B-04 containment on the read path degrades D-Bus faults to
        // the empty steady state (FN-008) — never a crash of the data provider.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("D-Bus connect failed");

        IReadOnlyList<KeyboardOption> available = default!;
        Assert.DoesNotThrow(() => available = _primitive.EnumerateAvailable());
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    // ===================================================================================
    // GetCurrentlyActiveKeyboardId: global engine -> normalized id (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public void GetCurrentlyActiveKeyboardId_WithGlobalEngine_ReturnsNormalizedIbusId()
    {
        // The restore-default lifecycle (BHV-450 app blur / BHV-451 shutdown) reads
        // the active keyboard through this method; it must be the normalized form —
        // embedded colons in the engine name carried verbatim (CAP-001 first-colon split).
        _fakeApi.GlobalEngine = "xkb:us::eng";

        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo("ibus:xkb:us::eng"));
    }

    [TestCase(null)] // IBus reports no global engine set
    [TestCase("")] // defensive: blank engine name is "no engine", never "ibus:"
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenIbusReportsNoGlobalEngine_ReturnsNull(
        string? globalEngine
    )
    {
        // "No global engine" maps to the interface's null ("undefined" on the wire for
        // CurrentOsKeyboard) — the primitive must guard before minting, because
        // KeyboardId.FromIbusEngine rejects empty engine names (plan decision D5).
        _fakeApi.GlobalEngine = globalEngine;

        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenIbusUnreachable_ReturnsNullWithoutPropagating()
    {
        // VAL-B-04 containment on the read path: fault degrades to "unknown" (null).
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("D-Bus connect failed");

        string? currentId = "sentinel";
        Assert.DoesNotThrow(() => currentId = _primitive.GetCurrentlyActiveKeyboardId());
        Assert.That(currentId, Is.Null);
    }

    // ===================================================================================
    // ActivateAsync: normalized id -> IBus SetGlobalEngine request (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public async Task ActivateAsync_WithValidIbusId_SetsGlobalEngineAndReturnsTrue()
    {
        // Happy path: the "ibus:<engine>" payload is handed to IBus verbatim;
        // IBus acceptance surfaces as true.
        bool activated = await _primitive.ActivateAsync("ibus:anthy");

        Assert.That(activated, Is.True);
        Assert.That(_fakeApi.SetGlobalEngineCalls, Is.EqualTo(new[] { "anthy" }));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithEmbeddedColonEngineId_PassesFullEngineNameVerbatim()
    {
        // The CAP-001 first-colon-split contract on the activation side: the payload
        // of "ibus:xkb:us::eng" is the FULL engine name "xkb:us::eng", not "xkb".
        bool activated = await _primitive.ActivateAsync("ibus:xkb:us::eng");

        Assert.That(activated, Is.True);
        Assert.That(_fakeApi.SetGlobalEngineCalls, Is.EqualTo(new[] { "xkb:us::eng" }));
    }

    [TestCase("win:4090409")] // foreign platform prefix — not this primitive's id space
    [TestCase("mac:com.apple.keylayout.US")] // foreign platform prefix
    [TestCase("anthy")] // missing prefix entirely
    [TestCase("ibus:")] // empty payload — TryGetIbusEngine rejects
    [TestCase("")] // empty
    [TestCase(null)] // null — primitive must contain it, not throw (VAL-B-04)
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithUnusableKeyboardId_ReturnsFalseWithoutCallingIbus(
        string? keyboardId
    )
    {
        // Ids this primitive cannot own degrade to "nothing activated" (false) and
        // MUST NOT reach the IBus daemon — no exception for any input (VAL-B-04).
        bool activated = await _primitive.ActivateAsync(keyboardId!);

        Assert.That(activated, Is.False);
        Assert.That(_fakeApi.SetGlobalEngineCalls, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenIbusRejectsActivation_ReturnsFalse()
    {
        // IBus can refuse SetGlobalEngine (e.g. engine uninstalled between enumeration
        // and activation) — surfaces as false, never as an exception.
        _fakeApi.SetGlobalEngineResult = false;

        bool activated = await _primitive.ActivateAsync("ibus:anthy");

        Assert.That(activated, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenIbusThrowsSynchronously_ReturnsFalseWithoutPropagating()
    {
        // VAL-B-04 verbatim contract from IKeyboardingPrimitive: implementations MUST
        // NOT propagate OS-layer exceptions — errors are logged, not thrown, because
        // keyboard activation failures must never block typing.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("D-Bus connect failed");

        bool activated = false;
        Assert.DoesNotThrowAsync(
            async () => activated = await _primitive.ActivateAsync("ibus:anthy")
        );
        Assert.That(activated, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenActivationFaultsWithTimeout_ReturnsFalseWithoutPropagating()
    {
        // Strategic-plan critical edge case "engine activation timing out": the D-Bus
        // call dispatches but the task faults (TimeoutException). The await-side fault
        // must be contained exactly like a sync throw (VAL-B-04) — plan decision D8.
        _fakeApi.FaultActivationWith = new TimeoutException("IBus SetGlobalEngine timed out");

        bool activated = false;
        Assert.DoesNotThrowAsync(
            async () => activated = await _primitive.ActivateAsync("ibus:anthy")
        );
        Assert.That(activated, Is.False);
    }

    // ===================================================================================
    // Cross-cutting fallback shapes (strategic-plan critical edge cases)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId2", "BHV-450")]
    public async Task LinuxPrimitive_WhenIbusUnreachableFromConstruction_AllMethodsDegradeGracefully()
    {
        // The XKB-only system shape end-to-end: IBus is unreachable from the very
        // first call. Construction must not throw, and every interface method must
        // degrade to its documented fallback — empty / null / false — without ever
        // propagating (the "falls back gracefully when IBus is absent" acceptance
        // scenario, exercised at the logic level).
        var unreachableApi = new FakeIbusKeyboardApi
        {
            ThrowOnAnyCall = new InvalidOperationException("no IBus daemon on this system"),
        };

        LinuxKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new LinuxKeyboardingPrimitive(unreachableApi));

        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(await primitive.ActivateAsync("ibus:anthy"), Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId2", "BHV-450")]
    public async Task LinuxPrimitive_WhenConnectionLostMidSession_SubsequentCallsDegradeGracefully()
    {
        // Strategic-plan critical edge case "D-Bus connection lost mid-session":
        // after a healthy start, every later call degrades to the same graceful
        // fallback shape instead of surfacing connection faults to callers.
        _fakeApi.Engines.Add(UsEngine);
        _fakeApi.GlobalEngine = "xkb:us::eng";
        Assert.That(_primitive.EnumerateAvailable(), Has.Count.EqualTo(1));
        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.EqualTo("ibus:xkb:us::eng"));

        _fakeApi.ThrowOnAnyCall = new IOException("D-Bus connection closed by peer");

        Assert.That(_primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(await _primitive.ActivateAsync("ibus:xkb:us::eng"), Is.False);
    }
}
