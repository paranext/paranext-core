using Paranext.DataProvider.KeyboardSwitching;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using TestParanextDataProvider.KeyboardSwitching.TestDoubles;

namespace TestParanextDataProvider.KeyboardSwitching;

/// <summary>
/// Micro-phase BE-1 Pass-2 INTEGRATION tests: capability CALL CHAINS wired with REAL
/// implementations — not unit re-tests. The only test doubles here are the OS seam
/// fakes (<see cref="FakeWindowsKeyboardLayoutApi"/>, <see cref="FakeIbusKeyboardApi"/>,
/// <see cref="FakeMacInputSourceApi"/>) standing in for the external OS boundary;
/// every PT10 class in each chain (KeyboardId, the platform primitives, the factory,
/// OsKeyboardDataProvider) is the production implementation.
///
/// <para><b>Chains under test</b> (strategic-plan-backend.md §Cross-Capability
/// Interfaces, BE-1 rows):</para>
/// <list type="bullet">
/// <item>CAP-003 factory → real host primitive (CAP-004/005/006 product or CAP-002
///   NoOp) → CAP-007 provider, end-to-end through the registered wire surface on the
///   ACTUAL host OS (graceful-fallback branch included — e.g., Linux without IBus).</item>
/// <item>CAP-001 KeyboardId round-trip: ids MINTED by a platform primitive's
///   enumeration flow out the CAP-007 wire, parse back through the matching
///   <c>KeyboardId.TryGet*</c> helper, and — fed into <c>setCurrentOsKeyboard</c> —
///   reach the OS seam carrying the original raw payload.</item>
/// <item>CAP-001 ownership guard across the chain: foreign-prefix ids are refused by
///   every platform primitive WITHOUT touching the OS seam and without broadcast.</item>
/// <item>CAP-003 all-false predicate → CAP-002 NoOp → CAP-007: the degraded chain
///   serves empty/null/false safely end-to-end.</item>
/// </list>
///
/// <para><b>Real-host safety</b>: the real-host chain never mutates machine keyboard
/// state — reads are inherently safe and the only set issued uses a malformed id,
/// which every primitive rejects via <c>KeyboardId.TryGet*</c> BEFORE touching the OS
/// layer (plan decision ID-3).</para>
///
/// Traceability:
///   - Micro-phase: BE-1 (CAP-001..CAP-007) — Pass 2 integration
///   - Behaviors: BHV-305 (OS keyboard enumeration), BHV-450/BHV-451 (OS-layer
///     activate + get-current the TS restore flows rely on)
///   - Validation: VAL-B-04 (failures contained, never propagated, no broadcast)
///   - Plan: implementation/plans/test-writer-integration-BE1.md
/// </summary>
[TestFixture]
internal class KeyboardSwitchingIntegrationTests : PapiTestBase
{
    private const string DataProviderName = "platform.osKeyboard-data";
    private const string ObjectPrefix = "object:" + DataProviderName;
    private const string OnDidUpdateEventType = DataProviderName + ":onDidUpdate";

    private const string GetAvailableWire = ObjectPrefix + ".getAvailableOsKeyboards";
    private const string GetCurrentWire = ObjectPrefix + ".getCurrentOsKeyboard";
    private const string SetCurrentWire = ObjectPrefix + ".setCurrentOsKeyboard";

    private const string CurrentOsKeyboardDataType = "CurrentOsKeyboard";

    // =====================================================================
    // Chain 1 — CAP-003 factory → real host primitive → CAP-007 provider
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Category("Acceptance")]
    [Category("Critical")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-003 → CAP-004/005/006/002 → CAP-007 → CAP-001")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "BE-1 integration done-signal: OsKeyboardDataProvider constructed with the "
            + "REAL KeyboardingPrimitiveFactory.Create() product for THIS host OS "
            + "registers and serves both read data types through the wire with "
            + "contained results — no throw, non-null enumeration (empty is the valid "
            + "no-IBus/NoOp steady state, FN-008), every enumerated id parses through "
            + "a KeyboardId.TryGet* helper, and the current id is null or parseable."
    )]
    public async Task RealHostFactoryChain_ProviderServesContainedResultsEndToEnd()
    {
        // Arrange — the REAL production chain: factory dispatches on the actual host
        // OS (Linux dev host → LinuxKeyboardingPrimitive with real IBus or graceful
        // no-IBus fallback; CI on other OSes → that OS's primitive).
        var provider = new OsKeyboardDataProvider(Client, KeyboardingPrimitiveFactory.Create());
        await provider.RegisterDataProviderAsync();
        DrainSentEvents();

        // Act 1 — enumeration through the wire against the real OS layer.
        IReadOnlyList<KeyboardOption>? available = null;
        Assert.That(
            async () => available = await InvokeGetAvailableOsKeyboardsAsync(),
            Throws.Nothing,
            "getAvailableOsKeyboards must be contained on the real host (VAL-B-04)"
        );

        // Assert 1 — contained shape: never null; empty is valid (no-IBus / NoOp).
        Assert.That(available, Is.Not.Null);
        Assert.That(
            available,
            Has.All.Matches<KeyboardOption>(option =>
                IsWellFormedPlatformId(option.Id) && option.Name.Length > 0
            ),
            "every id minted by the real host primitive must round-trip through a "
                + "KeyboardId.TryGet* helper and carry a non-empty display name (CAP-001/BHV-305)"
        );

        // Act 2 — current keyboard through the wire against the real OS layer.
        string? currentId = null;
        Assert.That(
            async () => currentId = await InvokeGetCurrentOsKeyboardAsync(),
            Throws.Nothing,
            "getCurrentOsKeyboard must be contained on the real host (VAL-B-04)"
        );

        // Assert 2 — null (none / cannot determine / NoOp) or a parseable id.
        if (currentId != null)
        {
            Assert.That(
                IsWellFormedPlatformId(currentId),
                Is.True,
                $"active keyboard id '{currentId}' must parse through a KeyboardId.TryGet* helper"
            );
        }
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-003 → CAP-004/005/006/002 → CAP-007 → CAP-001")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "Real-host set guard chain: setCurrentOsKeyboard with a malformed id flows "
            + "wire → provider → REAL factory-created primitive → KeyboardId guard, "
            + "returns false without throwing and without broadcasting onDidUpdate. "
            + "Safe on any host: every primitive rejects the id BEFORE touching the "
            + "OS layer, so machine keyboard state never changes."
    )]
    public async Task RealHostFactoryChain_SetWithMalformedId_ReturnsFalseWithoutBroadcast()
    {
        // Arrange
        var provider = new OsKeyboardDataProvider(Client, KeyboardingPrimitiveFactory.Create());
        await provider.RegisterDataProviderAsync();
        DrainSentEvents();

        // Act — a prefixless id no platform primitive owns (and NoOp ignores).
        var updated = false;
        Assert.That(
            async () => updated = await InvokeSetCurrentOsKeyboardAsync("not-a-keyboard-id"),
            Throws.Nothing,
            "a malformed-id set must be contained end-to-end (VAL-B-04)"
        );

        // Assert — refused, and no subscriber was woken.
        Assert.That(updated, Is.False, "a refused activation must report no update");
        Assert.That(
            GetSentOnDidUpdateEvents(),
            Is.Empty,
            "onDidUpdate must NOT be broadcast when nothing was activated"
        );
    }

    // =====================================================================
    // Chain 2 — CAP-001 ids minted by each platform primitive round-trip
    // through the CAP-007 wire and back into OS-seam activation
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-004 → CAP-001 → CAP-007 → CAP-004")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId", "BHV-450")]
    [Description(
        "Windows id round-trip chain: HKLs enumerated by the REAL Windows primitive "
            + "(user32 seam faked) are minted as 'win:' ids by KeyboardId, flow out "
            + "the provider wire, parse back to the original HKL — including a "
            + "sign-extended negative IME HKL — and, fed into setCurrentOsKeyboard, "
            + "reach the OS seam carrying the original raw HKL with a broadcast."
    )]
    public async Task WindowsPrimitiveChain_MintedIdsRoundTripThroughWireToActivation()
    {
        // Arrange — two realistic HKLs: a plain layout and a sign-extended IME HKL
        // (negative as nint — pins the CAP-001 (nuint) lossless-mint contract
        // through the WHOLE chain, plan decision ID-4).
        nint usHkl = 0x04090409;
        nint imeHkl = unchecked((nint)0xFFFFFFFFE0010411);
        var api = new FakeWindowsKeyboardLayoutApi();
        api.InstalledLayouts.AddRange([usHkl, imeHkl]);
        await RegisterProviderAsync(new WindowsKeyboardingPrimitive(api));

        // Act 1 — minted ids flow out the wire.
        var available = await InvokeGetAvailableOsKeyboardsAsync();

        // Assert 1 — each id parses back to the exact HKL it was minted from.
        Assert.That(available, Is.Not.Null);
        Assert.That(available!.Select(option => option.Id), Is.All.StartsWith("win:"));
        nint[] roundTripped = available
            .Select(option =>
            {
                Assert.That(
                    KeyboardId.TryGetWindowsHkl(option.Id, out nint hkl),
                    Is.True,
                    $"minted id '{option.Id}' must parse back through TryGetWindowsHkl"
                );
                return hkl;
            })
            .ToArray();
        Assert.That(roundTripped, Is.EqualTo(new[] { usHkl, imeHkl }));

        // Act 2 — feed a minted id straight back through the wire set path.
        var updated = await InvokeSetCurrentOsKeyboardAsync(available[1].Id);

        // Assert 2 — the OS seam received the ORIGINAL raw HKL and the chain
        // broadcast the update subscribers rely on.
        Assert.That(updated, Is.True);
        Assert.That(api.ActivateCalls, Is.EqualTo(new[] { imeHkl }));
        AssertSingleCurrentOsKeyboardUpdateBroadcast();
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-005 → CAP-001 → CAP-007 → CAP-005")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId", "BHV-450")]
    [Description(
        "Linux id round-trip chain: engines enumerated by the REAL Linux primitive "
            + "(IBus seam faked) are minted as 'ibus:' ids, flow out the provider "
            + "wire, parse back to the original engine name — embedded colons "
            + "('xkb:us::eng') carried verbatim — and, fed into setCurrentOsKeyboard, "
            + "reach the IBus seam carrying the original engine name with a broadcast."
    )]
    public async Task LinuxPrimitiveChain_MintedIdsRoundTripThroughWireToActivation()
    {
        // Arrange — an XKB engine with embedded colons (the CAP-001 first-colon-only
        // split case) and a plain IME engine.
        var api = new FakeIbusKeyboardApi();
        api.Engines.AddRange(
            [
                new IbusEngineDescriptor("xkb:us::eng", "English (US)"),
                new IbusEngineDescriptor("anthy", "Anthy"),
            ]
        );
        await RegisterProviderAsync(new LinuxKeyboardingPrimitive(api));

        // Act 1 — minted ids flow out the wire.
        var available = await InvokeGetAvailableOsKeyboardsAsync();

        // Assert 1 — each id parses back to the exact engine name it was minted from.
        Assert.That(available, Is.Not.Null);
        string[] roundTripped = available!
            .Select(option =>
            {
                Assert.That(
                    KeyboardId.TryGetIbusEngine(option.Id, out string engine),
                    Is.True,
                    $"minted id '{option.Id}' must parse back through TryGetIbusEngine"
                );
                return engine;
            })
            .ToArray();
        Assert.That(roundTripped, Is.EqualTo(new[] { "xkb:us::eng", "anthy" }));

        // Act 2 — feed the embedded-colon id straight back through the wire set path.
        var updated = await InvokeSetCurrentOsKeyboardAsync(available[0].Id);

        // Assert 2 — the IBus seam received the engine name VERBATIM (colons intact)
        // and the chain broadcast the update.
        Assert.That(updated, Is.True);
        Assert.That(api.SetGlobalEngineCalls, Is.EqualTo(new[] { "xkb:us::eng" }));
        AssertSingleCurrentOsKeyboardUpdateBroadcast();
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-006 → CAP-001 → CAP-007 → CAP-006")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId", "BHV-450")]
    [Description(
        "macOS id round-trip chain: input sources enumerated by the REAL Mac "
            + "primitive (TIS seam faked) are minted as 'mac:' ids, flow out the "
            + "provider wire, parse back to the original bundle-style id with case "
            + "preserved, and, fed into setCurrentOsKeyboard, reach the TIS seam "
            + "carrying the original input source id with a broadcast."
    )]
    public async Task MacPrimitiveChain_MintedIdsRoundTripThroughWireToActivation()
    {
        // Arrange — a key layout and an input method (case-sensitive bundle ids).
        var api = new FakeMacInputSourceApi();
        api.InputSources.AddRange(
            [
                new MacInputSourceDescriptor("com.apple.keylayout.US", "U.S."),
                new MacInputSourceDescriptor(
                    "com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese",
                    "Hiragana"
                ),
            ]
        );
        await RegisterProviderAsync(new MacKeyboardingPrimitive(api));

        // Act 1 — minted ids flow out the wire.
        var available = await InvokeGetAvailableOsKeyboardsAsync();

        // Assert 1 — each id parses back to the exact input source id it was minted
        // from, case preserved.
        Assert.That(available, Is.Not.Null);
        string[] roundTripped = available!
            .Select(option =>
            {
                Assert.That(
                    KeyboardId.TryGetMacInputSource(option.Id, out string sourceId),
                    Is.True,
                    $"minted id '{option.Id}' must parse back through TryGetMacInputSource"
                );
                return sourceId;
            })
            .ToArray();
        Assert.That(
            roundTripped,
            Is.EqualTo(
                new[]
                {
                    "com.apple.keylayout.US",
                    "com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese",
                }
            )
        );

        // Act 2 — feed a minted id straight back through the wire set path.
        var updated = await InvokeSetCurrentOsKeyboardAsync(available[1].Id);

        // Assert 2 — the TIS seam received the ORIGINAL input source id and the
        // chain broadcast the update.
        Assert.That(updated, Is.True);
        Assert.That(
            api.SelectInputSourceCalls,
            Is.EqualTo(new[] { "com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese" })
        );
        AssertSingleCurrentOsKeyboardUpdateBroadcast();
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-001 → CAP-004 → CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "Cross-platform id-ownership chain (Windows): a 'mac:' id sent through the "
            + "Windows-primitive-backed provider via the wire is refused (false) by "
            + "the CAP-001 ownership guard WITHOUT touching the user32 seam and "
            + "without broadcasting — the integration contract that lets all three "
            + "id namespaces coexist in shared settings."
    )]
    public async Task ForeignPlatformId_OnWindowsPrimitiveChain_RefusedWithoutOsTouchOrBroadcast()
    {
        // Arrange
        var api = new FakeWindowsKeyboardLayoutApi();
        await RegisterProviderAsync(new WindowsKeyboardingPrimitive(api));

        // Act / Assert
        Assert.That(await InvokeSetCurrentOsKeyboardAsync("mac:com.apple.keylayout.US"), Is.False);
        Assert.That(api.ActivateCalls, Is.Empty, "the user32 seam must not be touched");
        Assert.That(GetSentOnDidUpdateEvents(), Is.Empty);
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-001 → CAP-005 → CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "Cross-platform id-ownership chain (Linux): a 'win:' id sent through the "
            + "Linux-primitive-backed provider via the wire is refused (false) by the "
            + "CAP-001 ownership guard WITHOUT touching the IBus seam and without "
            + "broadcasting."
    )]
    public async Task ForeignPlatformId_OnLinuxPrimitiveChain_RefusedWithoutOsTouchOrBroadcast()
    {
        // Arrange
        var api = new FakeIbusKeyboardApi();
        await RegisterProviderAsync(new LinuxKeyboardingPrimitive(api));

        // Act / Assert
        Assert.That(await InvokeSetCurrentOsKeyboardAsync("win:4090409"), Is.False);
        Assert.That(api.SetGlobalEngineCalls, Is.Empty, "the IBus seam must not be touched");
        Assert.That(GetSentOnDidUpdateEvents(), Is.Empty);
    }

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-001 → CAP-006 → CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "Cross-platform id-ownership chain (macOS): an 'ibus:' id sent through the "
            + "Mac-primitive-backed provider via the wire is refused (false) by the "
            + "CAP-001 ownership guard WITHOUT touching the TIS seam and without "
            + "broadcasting."
    )]
    public async Task ForeignPlatformId_OnMacPrimitiveChain_RefusedWithoutOsTouchOrBroadcast()
    {
        // Arrange
        var api = new FakeMacInputSourceApi();
        await RegisterProviderAsync(new MacKeyboardingPrimitive(api));

        // Act / Assert
        Assert.That(await InvokeSetCurrentOsKeyboardAsync("ibus:anthy"), Is.False);
        Assert.That(api.SelectInputSourceCalls, Is.Empty, "the TIS seam must not be touched");
        Assert.That(GetSentOnDidUpdateEvents(), Is.Empty);
    }

    // =====================================================================
    // Chain 3 — CAP-003 all-false predicate → CAP-002 NoOp → CAP-007
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Property("MicroPhase", "BE-1")]
    [Property("IntegrationChain", "CAP-003 → CAP-002 (NoOp) → CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "NoOp fallback chain: on an unrecognized OS the factory's safe fallback "
            + "(all-false predicate → NoOpKeyboardingPrimitive) behind the provider "
            + "serves the degraded steady state end-to-end through the wire — empty "
            + "enumeration (FN-008), null current, false set with NO broadcast — so "
            + "the keyboard layer never crashes the host for lack of a platform layer."
    )]
    public async Task NoOpFallbackChain_ServesEmptyNullFalseEndToEnd()
    {
        // Arrange — the factory's fallback branch, exactly as an unknown OS hits it.
        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create(_ => false);
        Assert.That(primitive, Is.InstanceOf<NoOpKeyboardingPrimitive>());
        await RegisterProviderAsync(primitive);

        // Guard against the DummyPapiClient unregistered-handler false-positive
        // before asserting on default-ish results (null / empty).
        Assert.That(Client.IsHandlerRegistered(GetAvailableWire), Is.True);
        Assert.That(Client.IsHandlerRegistered(GetCurrentWire), Is.True);

        // Act / Assert — empty enumeration, never null.
        var available = await InvokeGetAvailableOsKeyboardsAsync();
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);

        // No current keyboard (null → JSON null → TS undefined).
        Assert.That(await InvokeGetCurrentOsKeyboardAsync(), Is.Null);

        // Set degrades to false — even for a WELL-FORMED id — with no broadcast.
        Assert.That(await InvokeSetCurrentOsKeyboardAsync("win:4090409"), Is.False);
        Assert.That(
            GetSentOnDidUpdateEvents(),
            Is.Empty,
            "the NoOp chain must never broadcast an update"
        );
    }

    // =====================================================================
    // Helpers (wire-invocation patterns shared with OsKeyboardDataProviderTests)
    // =====================================================================

    /// <summary>
    /// True when the id parses through at least one <see cref="KeyboardId"/>
    /// <c>TryGet*</c> helper with a non-empty payload — the host-agnostic
    /// "well-formed normalized id" check for real-OS enumerations.
    /// </summary>
    private static bool IsWellFormedPlatformId(string id)
    {
        return (KeyboardId.TryGetWindowsHkl(id, out nint hkl) && hkl != 0)
            || (KeyboardId.TryGetIbusEngine(id, out string engine) && engine.Length > 0)
            || (KeyboardId.TryGetMacInputSource(id, out string source) && source.Length > 0);
    }

    /// <summary>
    /// Wraps the given REAL primitive in an <see cref="OsKeyboardDataProvider"/>,
    /// registers it, and drains registration-time events so later event assertions
    /// see only post-registration traffic.
    /// </summary>
    private async Task<OsKeyboardDataProvider> RegisterProviderAsync(
        IKeyboardingPrimitive primitive
    )
    {
        var provider = new OsKeyboardDataProvider(Client, primitive);
        await provider.RegisterDataProviderAsync();
        DrainSentEvents();
        return provider;
    }

    /// <summary>
    /// Invokes <c>getAvailableOsKeyboards</c> through the wire with the
    /// <c>undefined</c> selector (arrives as <c>null</c> → <c>default(JsonElement)</c>).
    /// </summary>
    private async Task<IReadOnlyList<KeyboardOption>?> InvokeGetAvailableOsKeyboardsAsync()
    {
        return await Client.SendRequestAsync<IReadOnlyList<KeyboardOption>>(
            GetAvailableWire,
            [null]
        );
    }

    /// <summary>
    /// Invokes <c>getCurrentOsKeyboard</c> through the wire with the
    /// <c>undefined</c> selector.
    /// </summary>
    private async Task<string?> InvokeGetCurrentOsKeyboardAsync()
    {
        return await Client.SendRequestAsync<string>(GetCurrentWire, [null]);
    }

    /// <summary>
    /// Invokes <c>setCurrentOsKeyboard(undefined, keyboardId)</c> through the wire.
    /// The local <see cref="PapiClient.SendRequestAsync{T}"/> path does not await
    /// handler-returned Tasks, so the helper requests the <c>Task&lt;bool&gt;</c>
    /// itself and awaits it.
    /// </summary>
    private async Task<bool> InvokeSetCurrentOsKeyboardAsync(string keyboardId)
    {
        var pendingSet = await Client.SendRequestAsync<Task<bool>>(
            SetCurrentWire,
            [null, keyboardId]
        );
        Assert.That(
            pendingSet,
            Is.Not.Null,
            $"'{SetCurrentWire}' must be registered and return a Task<bool>"
        );
        return await pendingSet!;
    }

    /// <summary>
    /// Drains the <see cref="DummyPapiClient"/> sent-event queue and returns the
    /// <c>platform.osKeyboard-data:onDidUpdate</c> broadcasts.
    /// </summary>
    private List<(string eventType, object? eventParameters)> GetSentOnDidUpdateEvents()
    {
        var updates = new List<(string eventType, object? eventParameters)>();
        while (Client.SentEventCount > 0)
        {
            var sentEvent = Client.NextSentEvent;
            if (sentEvent.eventType == OnDidUpdateEventType)
                updates.Add(sentEvent);
        }
        return updates;
    }

    /// <summary>
    /// Asserts exactly one <c>onDidUpdate</c> broadcast was sent, scoped to the
    /// <c>CurrentOsKeyboard</c> data type only.
    /// </summary>
    private void AssertSingleCurrentOsKeyboardUpdateBroadcast()
    {
        var updates = GetSentOnDidUpdateEvents();
        Assert.That(
            updates,
            Has.Count.EqualTo(1),
            "exactly one onDidUpdate broadcast must follow a successful set"
        );
        Assert.That(
            updates[0].eventParameters,
            Is.EqualTo(new List<string> { CurrentOsKeyboardDataType }),
            "the update scope must be exactly ['CurrentOsKeyboard']"
        );
    }

    /// <summary>
    /// Pops every queued sent event (e.g., registration-time
    /// <c>object:onDidCreateNetworkObject</c>) so later assertions start clean.
    /// </summary>
    private void DrainSentEvents()
    {
        while (Client.SentEventCount > 0)
            _ = Client.NextSentEvent;
    }
}
