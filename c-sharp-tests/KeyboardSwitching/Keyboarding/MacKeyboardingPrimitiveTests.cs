using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using TestParanextDataProvider.KeyboardSwitching.TestDoubles;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-006: MacKeyboardingPrimitive — cross-platform LOGIC tests via the
/// <c>IMacInputSourceApi</c> seam (fake Text Input Services layer), runnable on any
/// OS. The genuinely OS-bound surface (real HIToolbox interop, CFTypeRef lifecycle)
/// is verified by the CI-gated <see cref="MacKeyboardingPrimitiveSmokeTests"/> (the
/// CAP-006 acceptance test).
/// <br />
/// PT9 behavior anchors: BHV-305 (dropdown population from OS keyboard enumeration),
/// BHV-450/BHV-451 (lifecycle restore-default depends on OS-layer activate +
/// get-current). No PT9 TS-XXX scenarios — the OS primitive is PT10-only design
/// (strategic-plan-backend.md CAP-006).
/// </summary>
[TestFixture]
public class MacKeyboardingPrimitiveTests
{
    // Realistic TIS input source descriptors: a keyboard layout (bundle-style id with
    // case that MUST survive verbatim — input source IDs are case-sensitive) and an
    // input-method mode (the long dotted id shape Japanese IMs use).
    private static readonly MacInputSourceDescriptor UsLayout =
        new("com.apple.keylayout.US", "U.S.");
    private static readonly MacInputSourceDescriptor KotoeriHiragana =
        new("com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese", "Hiragana");

    private FakeMacInputSourceApi _fakeApi = default!;
    private MacKeyboardingPrimitive _primitive = default!;

    [SetUp]
    public void SetUp()
    {
        _fakeApi = new FakeMacInputSourceApi();
        _primitive = new MacKeyboardingPrimitive(_fakeApi);
    }

    // ===================================================================================
    // EnumerateAvailable: TIS input source -> KeyboardOption mapping (BHV-305 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithInputSources_MapsToNormalizedMacKeyboardOptions()
    {
        // Each TIS input source becomes one KeyboardOption whose Id is the normalized
        // CAP-001 "mac:<bundle>" form (input source id verbatim, case preserved) and
        // whose Name is the TIS localized name carried verbatim — TIS order preserved.
        _fakeApi.InputSources.AddRange([UsLayout, KotoeriHiragana]);

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(2));
        Assert.That(available[0].Id, Is.EqualTo("mac:com.apple.keylayout.US"));
        Assert.That(available[0].Name, Is.EqualTo("U.S."));
        Assert.That(
            available[1].Id,
            Is.EqualTo("mac:com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese")
        );
        Assert.That(available[1].Name, Is.EqualTo("Hiragana"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithZeroInputSources_ReturnsEmptyListNeverNull()
    {
        // FN-008: an empty keyboard list is a valid steady state, not an error.
        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WithEmptyLocalizedName_FallsBackToInputSourceId()
    {
        // BHV-305 feeds a dropdown — every option needs a non-empty display name.
        // When TIS provides no localized name, the input source id is the display
        // name (plan decision D4; mirrors the CAP-004/CAP-005 never-empty-name promise).
        _fakeApi.InputSources.Add(new MacInputSourceDescriptor("com.apple.keylayout.Dvorak", ""));

        IReadOnlyList<KeyboardOption> available = _primitive.EnumerateAvailable();

        Assert.That(available, Has.Count.EqualTo(1));
        Assert.That(available[0].Id, Is.EqualTo("mac:com.apple.keylayout.Dvorak"));
        Assert.That(available[0].Name, Is.EqualTo("com.apple.keylayout.Dvorak"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    public void EnumerateAvailable_WhenTisFails_ReturnsEmptyListWithoutPropagating()
    {
        // VAL-B-04 containment on the read path: a TIS interop fault degrades to the
        // empty steady state (FN-008) — never a crash of the data provider.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("TISCreateInputSourceList failed");

        IReadOnlyList<KeyboardOption> available = default!;
        Assert.DoesNotThrow(() => available = _primitive.EnumerateAvailable());
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    // ===================================================================================
    // GetCurrentlyActiveKeyboardId: current input source -> normalized id
    // (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public void GetCurrentlyActiveKeyboardId_WithCurrentInputSource_ReturnsNormalizedMacId()
    {
        // The restore-default lifecycle (BHV-450 app blur / BHV-451 shutdown) reads
        // the active keyboard through this method; it must be the normalized form —
        // the bundle-style input source id carried verbatim, case preserved (CAP-001).
        _fakeApi.CurrentInputSourceId = "com.apple.keylayout.US";

        Assert.That(
            _primitive.GetCurrentlyActiveKeyboardId(),
            Is.EqualTo("mac:com.apple.keylayout.US")
        );
    }

    [TestCase(null)] // TIS cannot determine the current keyboard input source
    [TestCase("")] // defensive: blank input source id is "no keyboard", never "mac:"
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenTisReportsNoCurrentInputSource_ReturnsNull(
        string? currentInputSourceId
    )
    {
        // "Cannot determine" maps to the interface's null ("undefined" on the wire
        // for CurrentOsKeyboard) — the primitive must guard before minting, because
        // KeyboardId.FromMacInputSource rejects empty ids (plan decision D5).
        _fakeApi.CurrentInputSourceId = currentInputSourceId;

        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public void GetCurrentlyActiveKeyboardId_WhenTisFails_ReturnsNullWithoutPropagating()
    {
        // VAL-B-04 containment on the read path: fault degrades to "unknown" (null).
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException(
            "TISCopyCurrentKeyboardInputSource failed"
        );

        string? currentId = "sentinel";
        Assert.DoesNotThrow(() => currentId = _primitive.GetCurrentlyActiveKeyboardId());
        Assert.That(currentId, Is.Null);
    }

    // ===================================================================================
    // ActivateAsync: normalized id -> TIS SelectInputSource request (BHV-450/451 anchor)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId2", "BHV-451")]
    public async Task ActivateAsync_WithValidMacId_SelectsInputSourceAndReturnsTrue()
    {
        // Happy path: the "mac:<bundle>" payload is handed to TIS verbatim — case
        // preserved, because input source IDs are case-sensitive bundle-style
        // strings. TIS acceptance (noErr) surfaces as true.
        bool activated = await _primitive.ActivateAsync("mac:com.apple.keylayout.US");

        Assert.That(activated, Is.True);
        Assert.That(
            _fakeApi.SelectInputSourceCalls,
            Is.EqualTo(new[] { "com.apple.keylayout.US" })
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithDottedInputMethodId_PassesFullInputSourceIdVerbatim()
    {
        // Input-method mode ids are long dotted paths — the payload after the FIRST
        // colon is the FULL input source id, carried verbatim (CAP-001 first-colon
        // split, same contract the embedded-colon IBus ids exercise on Linux).
        bool activated = await _primitive.ActivateAsync(
            "mac:com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese"
        );

        Assert.That(activated, Is.True);
        Assert.That(
            _fakeApi.SelectInputSourceCalls,
            Is.EqualTo(new[] { "com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese" })
        );
    }

    [TestCase("win:4090409")] // foreign platform prefix — not this primitive's id space
    [TestCase("ibus:xkb:us::eng")] // foreign platform prefix
    [TestCase("com.apple.keylayout.US")] // missing prefix entirely
    [TestCase("mac:")] // empty payload — TryGetMacInputSource rejects
    [TestCase("")] // empty
    [TestCase(null)] // null — primitive must contain it, not throw (VAL-B-04)
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WithUnusableKeyboardId_ReturnsFalseWithoutCallingTis(
        string? keyboardId
    )
    {
        // Ids this primitive cannot own degrade to "nothing activated" (false) and
        // MUST NOT reach the TIS layer — no exception for any input (VAL-B-04).
        bool activated = await _primitive.ActivateAsync(keyboardId!);

        Assert.That(activated, Is.False);
        Assert.That(_fakeApi.SelectInputSourceCalls, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenTisRejectsSelection_ReturnsFalse()
    {
        // TIS can refuse a selection with a nonzero OSStatus — e.g. the input source
        // vanished between enumeration and selection (the concurrent-TIS-state-
        // mutation edge case) or is not select-capable. Surfaces as false, never as
        // an exception (plan decision D8: rejection is distinct from a fault).
        _fakeApi.SelectInputSourceResult = false;

        bool activated = await _primitive.ActivateAsync("mac:com.apple.keylayout.US");

        Assert.That(activated, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-450")]
    public async Task ActivateAsync_WhenTisThrows_ReturnsFalseWithoutPropagating()
    {
        // VAL-B-04 verbatim contract from IKeyboardingPrimitive: implementations MUST
        // NOT propagate OS-layer exceptions — errors are logged, not thrown, because
        // keyboard activation failures must never block typing.
        _fakeApi.ThrowOnAnyCall = new InvalidOperationException("TISSelectInputSource faulted");

        bool activated = false;
        Assert.DoesNotThrowAsync(
            async () => activated = await _primitive.ActivateAsync("mac:com.apple.keylayout.US")
        );
        Assert.That(activated, Is.False);
    }

    // ===================================================================================
    // Cross-cutting fallback shapes (strategic-plan critical edge cases)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId2", "BHV-450")]
    public async Task MacPrimitive_WhenTisUnavailableFromConstruction_AllMethodsDegradeGracefully()
    {
        // TIS unusable from the very first call (interop/framework failure shape).
        // Construction must not throw, and every interface method must degrade to
        // its documented fallback — empty / null / false — without ever propagating.
        var unreachableApi = new FakeMacInputSourceApi
        {
            ThrowOnAnyCall = new InvalidOperationException("HIToolbox interop unavailable"),
        };

        MacKeyboardingPrimitive primitive = default!;
        Assert.DoesNotThrow(() => primitive = new MacKeyboardingPrimitive(unreachableApi));

        Assert.That(primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(await primitive.ActivateAsync("mac:com.apple.keylayout.US"), Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId2", "BHV-450")]
    public async Task MacPrimitive_WhenTisFailsMidSession_SubsequentCallsDegradeGracefully()
    {
        // The concurrent-TIS-state-mutation edge case surfacing as faults: after a
        // healthy start, every later call degrades to the same graceful fallback
        // shape instead of surfacing TIS faults to callers.
        _fakeApi.InputSources.Add(UsLayout);
        _fakeApi.CurrentInputSourceId = "com.apple.keylayout.US";
        Assert.That(_primitive.EnumerateAvailable(), Has.Count.EqualTo(1));
        Assert.That(
            _primitive.GetCurrentlyActiveKeyboardId(),
            Is.EqualTo("mac:com.apple.keylayout.US")
        );

        _fakeApi.ThrowOnAnyCall = new InvalidOperationException(
            "TIS state mutated concurrently; interop call faulted"
        );

        Assert.That(_primitive.EnumerateAvailable(), Is.Empty);
        Assert.That(_primitive.GetCurrentlyActiveKeyboardId(), Is.Null);
        Assert.That(await _primitive.ActivateAsync("mac:com.apple.keylayout.US"), Is.False);
    }
}
