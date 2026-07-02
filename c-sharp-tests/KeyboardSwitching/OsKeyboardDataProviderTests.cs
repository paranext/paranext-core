using Paranext.DataProvider.KeyboardSwitching;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;
using Paranext.DataProvider.NetworkObjects;
using TestParanextDataProvider.KeyboardSwitching.TestDoubles;

namespace TestParanextDataProvider.KeyboardSwitching;

/// <summary>
/// CAP-007: <c>OsKeyboardDataProvider</c> — the thin C# DataProvider registered as
/// <c>platform.osKeyboard</c> (network-object id <c>platform.osKeyboard-data</c>),
/// wrapping the injected <see cref="IKeyboardingPrimitive"/> (CAP-002/CAP-003). This
/// is the ONLY C# wire surface of the keyboard-switching feature; the TypeScript
/// <c>KeyboardActivationService</c> consumes it via
/// <c>papi.dataProviders.get('platform.osKeyboard')</c> (alignment-decisions #21/#25).
///
/// <para>
/// <b>Contract under test</b> (strategic-plan-backend.md §CAP-007; data-contracts.md
/// §9 "New Top-Level Wire Surface" OS-primitive rows; backend-alignment.md
/// §"`OsKeyboardDataProvider` PAPI surface"):
/// </para>
/// <list type="bullet">
/// <item><c>getAvailableOsKeyboards(undefined)</c> → the primitive enumeration
///   (read-only; <c>AvailableOsKeyboards</c> data type) — OS-layer part of BHV-305</item>
/// <item><c>getCurrentOsKeyboard(undefined)</c> → currently-active id or null
///   (JSON <c>null</c> → TS <c>undefined</c>; <c>CurrentOsKeyboard</c> data type)</item>
/// <item><c>setCurrentOsKeyboard(undefined, id)</c> → activates via
///   <see cref="IKeyboardingPrimitive.ActivateAsync"/> and broadcasts
///   <c>platform.osKeyboard-data:onDidUpdate</c> scoped to <c>CurrentOsKeyboard</c>
///   ONLY on success; VAL-B-04: failures (false return OR primitive throw) are
///   swallowed — never propagated to the caller — and do NOT broadcast. This set
///   path is the OS-activation primitive consumed by the BHV-450 (deactivate-on-blur
///   restore) and BHV-451 (shutdown restore) flows in TypeScript.</item>
/// </list>
///
/// <para>
/// <b>"Subscribe" at the C# level</b> (plan decision D4): PAPI data-provider
/// subscription = listen to the provider's <c>onDidUpdate</c> event + re-get. There
/// is no C#-side <c>subscribe</c> function to register; the observable subscribers
/// consume is the <c>platform.osKeyboard-data:onDidUpdate</c> event the base class
/// sends through <c>PapiClient.SendEventAsync</c> — captured here by
/// <see cref="DummyPapiClient"/>'s sent-event queue.
/// </para>
///
/// <para>
/// <b>Determinism note for the implementer</b> (plan decision D5): these tests assert
/// the broadcast is observable immediately after the awaited set call returns. Use
/// <c>await SendDataUpdateEventAsync("CurrentOsKeyboard")</c> inside the async set
/// handler — NOT the fire-and-forget <c>SendDataUpdateEvent</c> overload, which would
/// make the update racy for every consumer.
/// </para>
///
/// Traceability:
///   - Capability: CAP-007 (TDD, Outside-In)
///   - Behaviors: BHV-305, BHV-450, BHV-451 (OS-layer parts only)
///   - Validation: VAL-B-04 (business-rules.md — non-blocking activation failure)
///   - Scenarios / golden masters: None exist for this capability (strategic plan)
///   - Pattern precedent: c-sharp/Checks/InventoryDataProvider.cs;
///     c-sharp-tests/ManageBooks/ManageBooksServiceRegistrationTests.cs;
///     c-sharp-tests/Checklists/ChecklistNetworkObjectTests.cs
/// </summary>
[TestFixture]
internal class OsKeyboardDataProviderTests : PapiTestBase
{
    // Canonical wire values: provider is constructed with the name
    // "platform.osKeyboard"; the DataProvider base appends "-data"
    // (DataProvider.cs:15) yielding the network-object id below
    // (CAP-007 success criterion / BA-RF-010).
    private const string DataProviderName = "platform.osKeyboard-data";
    private const string ObjectPrefix = "object:" + DataProviderName;
    private const string OnDidUpdateEventType = DataProviderName + ":onDidUpdate";

    private const string GetAvailableWire = ObjectPrefix + ".getAvailableOsKeyboards";
    private const string GetCurrentWire = ObjectPrefix + ".getCurrentOsKeyboard";
    private const string SetCurrentWire = ObjectPrefix + ".setCurrentOsKeyboard";

    // Data-type name broadcast in update scopes (backend-alignment.md §"PAPI surface").
    private const string CurrentOsKeyboardDataType = "CurrentOsKeyboard";

    // Alphabetical — NetworkObjectCreatedDetails.FunctionNames is sorted by the base
    // class (DataProvider.GetDataProviderCreatedDetails).
    private static readonly string[] ExpectedWireMethodNames =
    [
        "getAvailableOsKeyboards",
        "getCurrentOsKeyboard",
        "setCurrentOsKeyboard",
    ];

    private FakeKeyboardingPrimitive _primitive = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _primitive = new FakeKeyboardingPrimitive();
    }

    // =====================================================================
    // Group A — Registration / wire shape + OUTER ACCEPTANCE
    // =====================================================================

    [Test]
    [Category("Acceptance")]
    [Category("Integration")]
    [Category("Critical")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-305")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId", "BHV-451")]
    [Description(
        "OUTER acceptance (Outside-In done signal for CAP-007): the provider registers "
            + "as platform.osKeyboard-data with the three wire methods, then each "
            + "data-type triple works end-to-end through the wire — getAvailableOsKeyboards "
            + "returns the primitive enumeration, setCurrentOsKeyboard activates via the "
            + "primitive and broadcasts onDidUpdate('CurrentOsKeyboard'), and "
            + "getCurrentOsKeyboard reflects the newly-activated keyboard."
    )]
    public async Task OsKeyboardDataProvider_AcceptanceTest_RegistersAndServesBothDataTypesEndToEnd()
    {
        // Arrange — a fake OS with two keyboards, US English currently active.
        var usKeyboard = new KeyboardOption("win:4090409", "English (United States)");
        var arabicKeyboard = new KeyboardOption("win:4010401", "العربية (Arabic)", true);
        _primitive.AvailableKeyboards.AddRange([usKeyboard, arabicKeyboard]);
        _primitive.CurrentKeyboardId = usKeyboard.Id;

        var provider = new OsKeyboardDataProvider(Client, _primitive);

        // Act 1 — registration.
        await provider.RegisterDataProviderAsync();

        // Assert 1 — name + wire shape (CAP-007 success criterion: registered with
        // name platform.osKeyboard → network-object id platform.osKeyboard-data).
        Assert.That(provider.DataProviderName, Is.EqualTo(DataProviderName));
        Assert.That(
            Client.RegisteredRequestTypes,
            Contains.Item(ObjectPrefix),
            "the NetworkObject sentinel must be registered at the object prefix"
        );
        foreach (var methodName in ExpectedWireMethodNames)
        {
            Assert.That(
                Client.RegisteredRequestTypes,
                Contains.Item($"{ObjectPrefix}.{methodName}"),
                $"wire method '{methodName}' must be registered under {ObjectPrefix}"
            );
        }

        // Assert 1b — the onDidCreateNetworkObject details advertise the data
        // provider correctly to the network.
        NetworkObjectCreatedDetails details = GetCreatedNetworkObjectDetails();
        Assert.That(details.Id, Is.EqualTo(DataProviderName));
        Assert.That(details.ObjectType, Is.EqualTo(NetworkObjectType.DATA_PROVIDER));
        Assert.That(details.FunctionNames, Is.EqualTo(ExpectedWireMethodNames));

        // Act/Assert 2 — AvailableOsKeyboards triple (get; read-only) — BHV-305.
        var available = await InvokeGetAvailableOsKeyboardsAsync();
        Assert.That(available, Is.EqualTo(new[] { usKeyboard, arabicKeyboard }));

        // Act/Assert 3 — CurrentOsKeyboard get returns the active id.
        Assert.That(await InvokeGetCurrentOsKeyboardAsync(), Is.EqualTo(usKeyboard.Id));

        // Act 4 — CurrentOsKeyboard set: activate the Arabic keyboard via the wire.
        await InvokeSetCurrentOsKeyboardAsync(arabicKeyboard.Id);

        // Assert 4 — the primitive performed the activation...
        Assert.That(_primitive.ActivateCalls, Is.EqualTo(new[] { arabicKeyboard.Id }));

        // ...the engine broadcast onDidUpdate scoped to CurrentOsKeyboard (the
        // subscription mechanism TS consumers rely on)...
        AssertSingleCurrentOsKeyboardUpdateBroadcast();

        // ...and a subscriber-style re-get observes the new state.
        Assert.That(await InvokeGetCurrentOsKeyboardAsync(), Is.EqualTo(arabicKeyboard.Id));
    }

    [Test]
    [Category("Contract")]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-007")]
    [Description(
        "DataProvider envelope constraint: exactly 3 wire methods + 1 sentinel are "
            + "registered under object:platform.osKeyboard-data, and no individual "
            + "command: handlers exist for the OS-keyboard surface — every entry "
            + "dispatches via the single DataProvider function-tuple list."
    )]
    public async Task RegisterDataProviderAsync_RegistersExactlyThreeWireMethodsAndNoCommands()
    {
        // Arrange
        var provider = new OsKeyboardDataProvider(Client, _primitive);

        // Act
        await provider.RegisterDataProviderAsync();

        // Assert — exactly (3 methods + 1 sentinel) under the object prefix.
        var providerHandlers = Client
            .RegisteredRequestTypes.Where(req =>
                req.StartsWith(ObjectPrefix, StringComparison.Ordinal)
            )
            .ToArray();
        Assert.That(
            providerHandlers,
            Has.Length.EqualTo(ExpectedWireMethodNames.Length + 1),
            $"expected {ExpectedWireMethodNames.Length} wire methods + 1 sentinel. "
                + $"Got: [{string.Join(", ", providerHandlers)}]"
        );

        // No stray command: handlers — the DataProvider envelope is the whole surface.
        var strayCommands = Client
            .RegisteredRequestTypes.Where(req =>
                req.StartsWith("command:platform.osKeyboard", StringComparison.Ordinal)
            )
            .ToArray();
        Assert.That(
            strayCommands,
            Is.Empty,
            "no individual command: handlers may be registered for the OS-keyboard surface"
        );
    }

    // =====================================================================
    // Group B — AvailableOsKeyboards (get; read-only) — BHV-305 OS layer
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "getAvailableOsKeyboards returns the primitive enumeration with full "
            + "KeyboardOption fidelity — ids, OS display names (including RTL script, "
            + "untranslated per FN-012), and the IsRtlScript hint."
    )]
    public async Task GetAvailableOsKeyboards_WithInstalledKeyboards_ReturnsPrimitiveEnumeration()
    {
        // Arrange — names stay exactly as the OS enumerated them (FN-012: PT10 does
        // not translate display names; IsRtlScript null = unknown).
        var options = new[]
        {
            new KeyboardOption("ibus:xkb:us::eng", "English (US)", false),
            new KeyboardOption("ibus:m17n:ar:kbd", "العربية", true),
            new KeyboardOption("ibus:anthy", "Anthy", null),
        };
        _primitive.AvailableKeyboards.AddRange(options);
        await CreateAndRegisterProviderAsync();

        // Act
        var available = await InvokeGetAvailableOsKeyboardsAsync();

        // Assert — record equality covers Id + Name + IsRtlScript per element.
        Assert.That(available, Is.EqualTo(options));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-305")]
    [Description(
        "getAvailableOsKeyboards with nothing installed returns an empty list, never "
            + "null — FN-008: an empty keyboard list is a valid steady state that must "
            + "flow through to TS consumers untouched."
    )]
    public async Task GetAvailableOsKeyboards_WithNoKeyboards_ReturnsEmptyList()
    {
        // Arrange — fake OS enumerates nothing.
        await CreateAndRegisterProviderAsync();

        // Act
        var available = await InvokeGetAvailableOsKeyboardsAsync();

        // Assert
        Assert.That(available, Is.Not.Null);
        Assert.That(available, Is.Empty);
    }

    // =====================================================================
    // Group C — CurrentOsKeyboard (get)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Description("getCurrentOsKeyboard returns the primitive's currently-active keyboard id.")]
    public async Task GetCurrentOsKeyboard_WithActiveKeyboard_ReturnsPrimitiveCurrentId()
    {
        // Arrange
        _primitive.CurrentKeyboardId = "mac:com.apple.keylayout.US";
        await CreateAndRegisterProviderAsync();

        // Act
        var currentId = await InvokeGetCurrentOsKeyboardAsync();

        // Assert
        Assert.That(currentId, Is.EqualTo("mac:com.apple.keylayout.US"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Description(
        "getCurrentOsKeyboard with no current keyboard returns null — serialized as "
            + "JSON null on the wire and read as `undefined` by the TS consumer "
            + "(backend-alignment.md noNull constraint; IKeyboardingPrimitive null = "
            + "none/cannot-determine)."
    )]
    public async Task GetCurrentOsKeyboard_WithNoCurrentKeyboard_ReturnsNull()
    {
        // Arrange — primitive reports no current keyboard (e.g., degraded NoOp or
        // OS-query failure already contained inside the primitive).
        _primitive.CurrentKeyboardId = null;
        await CreateAndRegisterProviderAsync();

        // Guard against the DummyPapiClient false-positive: an UNregistered wire name
        // also yields default(null), so first prove the handler exists (plan risk #1).
        Assert.That(
            Client.IsHandlerRegistered(GetCurrentWire),
            Is.True,
            $"'{GetCurrentWire}' must be registered before the null result is meaningful"
        );

        // Act
        var currentId = await InvokeGetCurrentOsKeyboardAsync();

        // Assert
        Assert.That(currentId, Is.Null);
    }

    // =====================================================================
    // Group D — CurrentOsKeyboard (set) — activation path consumed by the
    // BHV-450 / BHV-451 restore flows; VAL-B-04 failure containment
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-450")]
    [Property("BehaviorId", "BHV-451")]
    [Description(
        "setCurrentOsKeyboard delegates OS activation to IKeyboardingPrimitive."
            + "ActivateAsync with the exact keyboard id, exactly once, and reports the "
            + "update (true) so TS update-instruction semantics see 'data changed'."
    )]
    public async Task SetCurrentOsKeyboard_WithValidId_ActivatesViaPrimitiveExactlyOnce()
    {
        // Arrange
        await CreateAndRegisterProviderAsync();

        // Act
        var updated = await InvokeSetCurrentOsKeyboardAsync("win:4090409");

        // Assert — the id flows through opaque and untouched (INV-C07).
        Assert.That(_primitive.ActivateCalls, Is.EqualTo(new[] { "win:4090409" }));
        Assert.That(
            updated,
            Is.True,
            "a successful activation must report true (data changed) per "
                + "DataProvider update-instruction semantics (plan decision D1)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-450")]
    [Description(
        "On successful activation the engine broadcasts platform.osKeyboard-data:"
            + "onDidUpdate scoped to ['CurrentOsKeyboard'] — the notifyUpdate "
            + "('CurrentOsKeyboard') contract that drives every PAPI subscription."
    )]
    public async Task SetCurrentOsKeyboard_OnSuccessfulActivation_BroadcastsCurrentOsKeyboardUpdate()
    {
        // Arrange
        await CreateAndRegisterProviderAsync();

        // Act
        await InvokeSetCurrentOsKeyboardAsync("ibus:anthy");

        // Assert — exactly one onDidUpdate, scoped to the CurrentOsKeyboard data type
        // (NOT '*': AvailableOsKeyboards subscribers must not be re-triggered by a
        // current-keyboard change).
        AssertSingleCurrentOsKeyboardUpdateBroadcast();
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "VAL-B-04 no-op path: when the primitive reports activation did not happen "
            + "(returns false — e.g., degraded NoOp primitive), the set call completes "
            + "without throwing, reports no update (false), and does NOT broadcast "
            + "onDidUpdate — notifyUpdate fires ONLY on success."
    )]
    public async Task SetCurrentOsKeyboard_WhenActivationReturnsFalse_DoesNotBroadcastUpdate()
    {
        // Arrange
        _primitive.ActivateResult = false;
        await CreateAndRegisterProviderAsync();

        // Act — must not throw (non-blocking failure contract).
        var updated = await InvokeSetCurrentOsKeyboardAsync("win:4090409");

        // Assert
        Assert.That(updated, Is.False, "a failed activation must report no update");
        Assert.That(
            GetSentOnDidUpdateEvents(),
            Is.Empty,
            "onDidUpdate must NOT be broadcast when activation did not succeed"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ValidationRule", "VAL-B-04")]
    [Description(
        "VAL-B-04 containment: even if the primitive throws on activate (real "
            + "primitives promise not to, but the wire boundary must be defensive — "
            + "strategic plan CAP-007 edge case), the error is swallowed (logged, never "
            + "propagated to the caller: keyboard activation failures must never block "
            + "typing) and onDidUpdate is NOT broadcast."
    )]
    public async Task SetCurrentOsKeyboard_WhenPrimitiveThrows_SwallowsErrorAndDoesNotBroadcast()
    {
        // Arrange — arm the fake to blow up mid-activation.
        _primitive.ActivateException = new InvalidOperationException(
            "simulated OS IME service hiccup"
        );
        await CreateAndRegisterProviderAsync();

        // Act + Assert — the awaited set completes with NO exception of any kind
        // (wrapper-agnostic: DynamicInvoke TargetInvocationException would also fail
        // this assertion).
        bool updated = false;
        Assert.That(
            async () =>
                updated = await InvokeSetCurrentOsKeyboardAsync(
                    "mac:com.apple.inputmethod.Kotoeri"
                ),
            Throws.Nothing,
            "VAL-B-04: OS-layer activation errors are swallowed and logged, never propagated"
        );

        Assert.That(updated, Is.False, "a swallowed failure must report no update");
        Assert.That(
            GetSentOnDidUpdateEvents(),
            Is.Empty,
            "onDidUpdate must NOT be broadcast when activation threw"
        );
    }

    [Test]
    [Category("Integration")]
    [Category("Critical")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-450")]
    [Description(
        "Visibility-gap fix (alignment-decision #25, the reason CAP-007 is a "
            + "DataProvider and not a NetworkObject): a setCurrentOsKeyboard arriving "
            + "through the registered wire handler — i.e., from ANY external PAPI "
            + "caller, not a private code path — still broadcasts onDidUpdate to the "
            + "network AND a subscriber-style re-get returns the new keyboard, so the "
            + "TS activation service's subscription observes external mutations."
    )]
    public async Task SetCurrentOsKeyboard_FromExternalWireCaller_NotifiesSubscribersAndUpdatesState()
    {
        // Arrange
        _primitive.CurrentKeyboardId = "win:4090409";
        await CreateAndRegisterProviderAsync();

        // Act — simulate an unrelated PAPI consumer: resolve the handler purely by
        // its wire name (exactly what the JSON-RPC layer does for a remote caller)
        // and invoke it. No reference to the provider instance is used.
        await InvokeWireHandlerSetAsync(SetCurrentWire, "win:4010401");

        // Assert — the subscription loop closes: the broadcast reached the network...
        AssertSingleCurrentOsKeyboardUpdateBroadcast();

        // ...and a subscriber re-getting CurrentOsKeyboard sees the external change.
        Assert.That(await InvokeGetCurrentOsKeyboardAsync(), Is.EqualTo("win:4010401"));
    }

    // =====================================================================
    // Helpers
    // =====================================================================

    /// <summary>
    /// Creates an <see cref="OsKeyboardDataProvider"/> around the test's
    /// <see cref="_primitive"/>, registers it, and drains the registration-time
    /// <c>onDidCreateNetworkObject</c> event so subsequent event assertions see only
    /// post-registration traffic.
    /// </summary>
    private async Task<OsKeyboardDataProvider> CreateAndRegisterProviderAsync()
    {
        var provider = new OsKeyboardDataProvider(Client, _primitive);
        await provider.RegisterDataProviderAsync();
        DrainSentEvents();
        return provider;
    }

    /// <summary>
    /// Invokes <c>getAvailableOsKeyboards</c> through the wire with the
    /// <c>undefined</c> selector. The selector arrives as <c>null</c>;
    /// <c>DynamicInvoke</c> materializes it as <c>default(JsonElement)</c> for the
    /// handler's leading selector parameter (plan decision D2).
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
    /// </summary>
    private Task<bool> InvokeSetCurrentOsKeyboardAsync(string keyboardId)
    {
        return InvokeWireHandlerSetAsync(SetCurrentWire, keyboardId);
    }

    /// <summary>
    /// Raw wire-name invocation of an async set handler. The local
    /// <see cref="PapiClient.SendRequestAsync{T}"/> path does not await Tasks returned
    /// by handlers, so the helper requests the <c>Task&lt;bool&gt;</c> itself and
    /// awaits it (the set engine function is <c>async Task&lt;bool&gt;</c> per plan
    /// decision D1).
    /// </summary>
    private async Task<bool> InvokeWireHandlerSetAsync(string wireName, string keyboardId)
    {
        var pendingSet = await Client.SendRequestAsync<Task<bool>>(wireName, [null, keyboardId]);
        Assert.That(
            pendingSet,
            Is.Not.Null,
            $"'{wireName}' must be registered and return a Task<bool>"
        );
        return await pendingSet!;
    }

    /// <summary>
    /// Drains the <see cref="DummyPapiClient"/> sent-event queue and returns the
    /// <c>platform.osKeyboard-data:onDidUpdate</c> broadcasts (the observable PAPI
    /// subscribers consume).
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
    /// <c>CurrentOsKeyboard</c> data type only. <c>DataProvider.SendDataUpdateEventAsync</c>
    /// shapes a single non-"*" data-type string into <c>List&lt;string&gt;</c>
    /// (DataProvider.cs:83), so that is the wire payload subscribers receive.
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
            "the update scope must be exactly ['CurrentOsKeyboard'] — not '*' and not "
                + "AvailableOsKeyboards"
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

    /// <summary>
    /// Returns the <see cref="NetworkObjectCreatedDetails"/> payload of the
    /// registration-time <c>object:onDidCreateNetworkObject</c> event.
    /// </summary>
    private NetworkObjectCreatedDetails GetCreatedNetworkObjectDetails()
    {
        while (Client.SentEventCount > 0)
        {
            var sentEvent = Client.NextSentEvent;
            if (
                sentEvent.eventType == "object:onDidCreateNetworkObject"
                && sentEvent.eventParameters is NetworkObjectCreatedDetails details
            )
                return details;
        }

        Assert.Fail("no object:onDidCreateNetworkObject event with details was sent");
        throw new InvalidOperationException("unreachable");
    }
}
