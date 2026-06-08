using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.NetworkObjects;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-001 (BackupRestoreDataProvider wire facade / NetworkObject registration).
    // Outside-In TDD: this fixture is the OUTER acceptance test that drives the
    // facade scaffolding — the `internal sealed partial class BackupRestoreDataProvider`
    // declaration must grow:
    //   * a base type — `: NetworkObjects.DataProvider("platformBackupRestore.backupRestore", ...)`
    //   * a primary constructor accepting `(PapiClient, LocalParatextProjects)`
    //   * a `GetFunctions()` override returning the 8 imperative methods + 3
    //     data-type get handlers (11 entries total)
    //   * a `StartDataProviderAsync()` override (no-op default — services lazy-init)
    //
    // Strategic plan reference:
    //   .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-001
    //
    // Wire contract reference:
    //   .context/features/project-backup-and-restore/implementation/backend-alignment.md
    //     §JSON-RPC Wire Contract (lines 324-432) — canonical GetFunctions registration shape.
    //
    // Precedent fixtures:
    //   * c-sharp-tests/ManageBooks/ManageBooksServiceRegistrationTests.cs — closest pattern
    //     (the manage-books wire surface is a plain NetworkObject — `object:` prefix only,
    //     no `-data` suffix). For B/R the wire surface is a DataProvider, so the base
    //     class appends `-data` to the name (NetworkObjects/DataProvider.cs:15).
    //   * c-sharp/Checks/InventoryDataProvider.cs:16 — closest production precedent
    //     (DataProvider hosting 11 functions = 2 subscribable types + 9 imperative).
    //
    // RED-state expectation: every test in this fixture FAILS at compile or
    // runtime because:
    //   (a) BackupRestoreDataProvider does not yet inherit NetworkObjects.DataProvider
    //       (so the cast in the ctor and the `RegisterDataProviderAsync` call fail to compile),
    //   (b) the primary ctor `(PapiClient, LocalParatextProjects)` does not exist yet,
    //   (c) `GetFunctions()` is not yet overridden so the 11 registered request types
    //       cannot appear in `Client.RegisteredRequestTypes`,
    //   (d) `StartDataProviderAsync()` is not yet overridden so the no-op-await assertion
    //       has no implementation to await.
    //
    // GREEN-state plan (CAP-001 GREEN, BE-7): land the facade scaffolding in
    // c-sharp/BackupRestore/BackupRestoreDataProvider.Facade.cs (sibling partial fragment
    // — keeps CAP-002's main file focused on M-001 ownership). The 4 still-pending
    // wire methods (CAP-006/008/010/024) are registered today as inline lambdas that
    // throw NotImplementedException; their owning capabilities replace the lambda
    // with `new Func<...>(Method)` when their partial fragments land.

    /// <summary>
    /// CAP-001 wire-registration tests for the <see cref="BackupRestoreDataProvider"/>
    /// facade. Asserts the 8 imperative method names + 3 data-type get handlers appear
    /// in the registered <c>GetFunctions()</c> set; the DataProvider registers under
    /// <c>object:platformBackupRestore.backupRestore-data</c> (note the <c>-data</c>
    /// suffix the base class applies — see <see cref="NetworkObjects.DataProvider"/>);
    /// and the <c>object:onDidCreateNetworkObject</c> event fires with the 11-name
    /// FunctionNames payload.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal sealed class BackupRestoreDataProviderRegistrationTests : PapiTestBase
    {
        // The user-supplied DataProvider name (what we pass to the base constructor).
        // The base class APPENDS "-data" to derive the wire identifier — see
        // `NetworkObjects/DataProvider.cs:15`. Both forms are constants here so the
        // test assertions read naturally.
        private const string DataProviderUserName = "platformBackupRestore.backupRestore";
        private const string DataProviderWireName = DataProviderUserName + "-data";
        private const string DataProviderRequestPrefix = $"object:{DataProviderWireName}";

        /// <summary>
        /// The complete set of <c>GetFunctions()</c> entry names the facade must
        /// expose. Order-independent. Sourced from:
        ///   * `data-contracts.md §4.0` (8 imperative methods: M-001..M-005, M-006/M-009/M-010, M-011 — note that M-007/M-008 were promoted to subscribable data types per DEC-332 and M-006 may be promoted to DT-003 per DEC-333; the imperative wire methods that remain are listed here)
        ///   * `data-contracts.md §5.1/§5.2/§5.3` (3 data-type get handlers: getBackupableProjects, getRestoreDestinationProjects, getBackupLogInfo)
        ///   * `backend-alignment.md §JSON-RPC Wire Contract` (canonical registration shape — lines 371-389)
        /// </summary>
        private static readonly string[] ExpectedFunctionNames =
        [
            // ---- Imperative methods (8) ------------------------------------
            "createBackup", // M-001 (CAP-002 — implemented)
            "openRestoreSession", // M-002 (CAP-003 — implemented)
            "performRestore", // M-003 (CAP-004 — implemented)
            "compareBackupFile", // M-004 (CAP-005 — implemented)
            "enumerateUsbDevices", // M-005 (CAP-006 — pending; registered as throw-stub lambda)
            "revealBackupLog", // M-006 (CAP-007 — implemented; per DEC-333 this is being moved to DT-003 BackupLogInfo, but the imperative entry stays per strategic-plan §CAP-007 and backend-alignment.md JSON-RPC Wire Contract line 347 — the imperative entry's body still works)
            "validateBackup", // M-009 (CAP-010 — implemented; wraps CAP-014's pure rule chains into the {canSubmit, errors:{…}} wire shape per strategic-plan-backend.md §CAP-010 — the user's Test Writer task spec carries the pre-round-4 wire name forward over the post-round-4 isDestinationPathWritable rename)
            "closeRestoreSession", // M-010 (CAP-011 — implemented)
            "getCompareSourceContent", // M-011 (CAP-024 RED — partial fragment registered with real Func<GetCompareSourceContentRequest, Task<GetCompareSourceContentResult>> delegate shape; body throws NotImplementedException until GREEN)
            // ---- Subscribable data type get handlers (3) -------------------
            "getBackupableProjects", // DT-001 (CAP-008 — pending; registered as throw-stub lambda)
            "getRestoreDestinationProjects", // DT-002 (CAP-009 — implemented)
            "getBackupLogInfo", // DT-003 (DEC-333 — pending; registered as throw-stub lambda)
        ];

        // Strategic plan §CAP-001 Success Criteria literally says "8 imperative
        // method names and 3 data-type get handlers ... appear in the registered
        // `GetFunctions()` set". 8 + 3 = 11. Pinning the total guards against an
        // accidental drop (e.g., a future refactor that forgets one entry).
        private const int ExpectedImperativeMethodCount = 9; // 8 in strategic plan, but the canonical wire-contract shape (backend-alignment.md lines 374-381) lists 8 distinct imperative entries: createBackup, openRestoreSession, performRestore, compareBackupFile, enumerateUsbDevices, isDestinationPathWritable, closeRestoreSession, getCompareSourceContent — plus revealBackupLog stays as a 9th per the strategic plan §CAP-007 (revealBackupLog is on the imperative-method list even though DEC-333 wants to promote it to BackupLogInfo). Reconciling: the active backend ships both — revealBackupLog as imperative (legacy) AND getBackupLogInfo as data-type-get (DT-003). See plan §CAP-007 footnote and DEC-333. The strategic-plan number of "8 imperative" is the post-DEC-333 future-state count; today the actively-implemented count is 9.
        private const int ExpectedDataTypeGetterCount = 3;
        private const int ExpectedTotalFunctionCount =
            ExpectedImperativeMethodCount + ExpectedDataTypeGetterCount;

        private BackupRestoreDataProvider _provider = null!;

        public override Task TestSetupAsync()
        {
            base.TestSetupAsync();

            // Construct the facade with the test fixture's PapiClient + ParatextProjects.
            // RED: this ctor signature does NOT yet exist (CAP-002's main file declares
            // the class without a primary ctor). CAP-001 GREEN adds the
            // `(PapiClient, LocalParatextProjects)` primary ctor.
            _provider = new BackupRestoreDataProvider(Client, ParatextProjects);

            return Task.CompletedTask;
        }

        public override void TestTearDown()
        {
            // CAP-002/003/004/009 test seams — reset so they don't leak across fixtures.
            BackupOrchestrator.PersistChangesOverride = null;
            BackupLogService.LogFilePathOverride = null;
            BackupRestoreDataProvider.RestorerFactoryOverride = null;
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = null;
            BackupRestoreDataProvider.SendFullProjectUpdateEventOverride = null;
            BackupRestoreDataProvider.PersistCurrentChangesOverride = null;
            RestoreOrchestrator.WriteLockObtainerOverride = null;
            BackupRestoreDataProvider.DestinationProjectLookupOverride = null;
            base.TestTearDown();
        }

        // =====================================================================
        // GROUP A — Constructor + lifecycle
        // =====================================================================

        [Test]
        [Category("Integration")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-001")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "CAP-001 OUTER acceptance: the BackupRestoreDataProvider primary constructor accepts (PapiClient, LocalParatextProjects) — see backend-alignment.md §JSON-RPC Wire Contract lines 356-364 — and constructs a non-null instance that inherits NetworkObjects.DataProvider."
        )]
        public void Constructor_WithPapiClientAndProjects_ProducesDataProviderInstance()
        {
            // The TestSetupAsync already ran `new BackupRestoreDataProvider(Client, ParatextProjects)`
            // — the assertion is that the resulting instance is a NetworkObjects.DataProvider,
            // proving the base-class wiring landed.
            Assert.That(
                _provider,
                Is.InstanceOf<Paranext.DataProvider.NetworkObjects.DataProvider>(),
                "BackupRestoreDataProvider must inherit NetworkObjects.DataProvider "
                    + "(see backend-alignment.md §JSON-RPC Wire Contract, line 360 "
                    + ": NetworkObjects.DataProvider(...))."
            );

            // The base class exposes the wire-stable name and type via public properties.
            // Pin these here so a future refactor that accidentally drops the suffix
            // or changes the type breaks this test.
            Assert.That(
                _provider.DataProviderName,
                Is.EqualTo(DataProviderWireName),
                "DataProvider name must be the user-supplied name + '-data' suffix "
                    + "(NetworkObjects/DataProvider.cs:15). The wire identifier the "
                    + "React side receives is `platformBackupRestore.backupRestore-data`."
            );
            Assert.That(
                _provider.DataProviderType,
                Is.EqualTo(NetworkObjectType.DATA_PROVIDER),
                "ObjectType must be DATA_PROVIDER per DEC-303/304/332 — single DataProvider "
                    + "wire facade, NOT a plain NetworkObject."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001: calling RegisterDataProviderAsync twice on the same instance throws — enforces the single-registration contract from NetworkObject base (line 30)."
        )]
        public async Task RegisterDataProviderAsync_CalledTwice_Throws()
        {
            // Arrange: first registration must succeed.
            await _provider.RegisterDataProviderAsync();

            // Act + Assert: second call throws with the base-class message.
            // Mirrors ManageBooksServiceRegistrationTests.RegisterNetworkObjectAsync_CalledTwice_Throws
            // (line 126-146). Tightening to message contents guards against the
            // failure-mode-drift trap that line 132-138 calls out.
            var caught = Assert.ThrowsAsync<Exception>(
                async () => await _provider.RegisterDataProviderAsync()
            );
            Assert.That(
                caught!.Message,
                Does.Contain("already been registered"),
                "Double-registration must throw the NetworkObject-base 'already been "
                    + "registered' message — see NetworkObjects/NetworkObject.cs:30. A "
                    + "different failure mode (NRE, different message) means the base-"
                    + "class wiring is wrong."
            );
        }

        // =====================================================================
        // GROUP B — GetFunctions() registration completeness (the core acceptance)
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "CAP-001 OUTER acceptance (Strategic Plan §CAP-001 Success Criteria): "
                + "RegisterDataProviderAsync registers all 11 wire entries (8 imperative "
                + "methods + 3 data-type get handlers) as `object:platformBackupRestore."
                + "backupRestore-data.{name}` request handlers. The 4 still-pending "
                + "capabilities (CAP-006/008/010/024) register stub lambdas so the "
                + "wire surface is COMPLETE the moment CAP-001 lands."
        )]
        public async Task RegisterDataProviderAsync_RegistersAllExpectedFunctionEntries()
        {
            // Act
            await _provider.RegisterDataProviderAsync();

            // Assert: every expected function name is registered under the DataProvider prefix.
            IReadOnlyCollection<string> registered = Client.RegisteredRequestTypes;

            foreach (string functionName in ExpectedFunctionNames)
            {
                string expectedRequestType = $"{DataProviderRequestPrefix}.{functionName}";
                Assert.That(
                    registered,
                    Contains.Item(expectedRequestType),
                    $"Expected wire entry '{expectedRequestType}' to be registered but it was not. "
                        + $"Registered types: [{string.Join(", ", registered)}]"
                );
            }
        }

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001 OUTER acceptance: the DataProvider sentinel itself (the bare "
                + "`object:platformBackupRestore.backupRestore-data` request type) is "
                + "registered as part of the NetworkObject lifecycle — see "
                + "NetworkObjects/NetworkObject.cs:34-35."
        )]
        public async Task RegisterDataProviderAsync_RegistersDataProviderSentinel()
        {
            // Act
            await _provider.RegisterDataProviderAsync();

            // Assert: the bare prefix is registered (the NetworkObject base does this
            // unconditionally so PAPI sees the network object exists even with zero
            // methods).
            Assert.That(
                Client.RegisteredRequestTypes,
                Contains.Item(DataProviderRequestPrefix),
                $"Expected bare `{DataProviderRequestPrefix}` sentinel to be registered."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001: NO individual `command:platformBackupRestore.backupRestore.*` "
                + "request handlers are registered — every backup/restore method "
                + "dispatches via the DataProvider function-tuple list (per "
                + "alignment-decisions.md DEC-303/304 round-2). Theme-1 equivalent: a "
                + "stray `command:` handler would mean someone bypassed the wire facade."
        )]
        public async Task RegisterDataProviderAsync_DoesNotRegisterStrayCommandHandlers()
        {
            // Act
            await _provider.RegisterDataProviderAsync();

            // Assert: no request type starts with `command:platformBackupRestore.backupRestore`.
            string[] strayCommands = Client
                .RegisteredRequestTypes.Where(req =>
                    req.StartsWith(
                        "command:platformBackupRestore.backupRestore",
                        StringComparison.Ordinal
                    )
                )
                .ToArray();

            Assert.That(
                strayCommands,
                Is.Empty,
                "DEC-303/304 violation: found individual `command:` handlers for "
                    + $"backup-restore: [{string.Join(", ", strayCommands)}]. All backup-"
                    + "restore methods must dispatch via the DataProvider function-tuple list."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001 success-criterion-pin: the total count of registered handlers under "
                + "the DataProvider prefix equals 12 — 8 imperative methods + 3 data-type "
                + "get handlers (per strategic-plan §CAP-001 + the +1 revealBackupLog "
                + "imperative that stays alongside getBackupLogInfo per DEC-333 — "
                + "total = 9 imperative + 3 data-type-getters) + 1 sentinel = 13. A "
                + "miscount means someone added or dropped a wire entry."
        )]
        public async Task RegisterDataProviderAsync_RegistersExactlyExpectedHandlerCount()
        {
            // Act
            await _provider.RegisterDataProviderAsync();

            // Assert: exactly (ExpectedTotalFunctionCount + 1 sentinel) registered under prefix.
            string[] backupRestoreHandlers = Client
                .RegisteredRequestTypes.Where(req =>
                    req.StartsWith(DataProviderRequestPrefix, StringComparison.Ordinal)
                )
                .ToArray();

            Assert.That(
                backupRestoreHandlers,
                Has.Length.EqualTo(ExpectedTotalFunctionCount + 1),
                $"Expected exactly {ExpectedTotalFunctionCount} function handlers + 1 "
                    + $"sentinel = {ExpectedTotalFunctionCount + 1}. Got: "
                    + $"[{string.Join(", ", backupRestoreHandlers)}]"
            );
        }

        // =====================================================================
        // GROUP C — onDidCreateNetworkObject event details
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001 OUTER acceptance: RegisterDataProviderAsync fires exactly one "
                + "`object:onDidCreateNetworkObject` event whose payload Id matches the "
                + "DataProvider wire name (with `-data` suffix) — proves the React "
                + "side will discover the provider via PAPI's onDidCreateNetworkObject "
                + "broadcast (see NetworkObject.cs:46)."
        )]
        public async Task RegisterDataProviderAsync_EmitsOnDidCreateNetworkObjectEvent()
        {
            int eventsBefore = Client.SentEventCount;

            // Act
            await _provider.RegisterDataProviderAsync();

            // Assert: at least one event sent.
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "Expected RegisterDataProviderAsync to fire an `object:onDidCreateNetworkObject` event."
            );

            (string eventType, object? eventParameters) creationEvent = FindCreationEvent();
            Assert.That(creationEvent.eventType, Is.EqualTo("object:onDidCreateNetworkObject"));
            Assert.That(creationEvent.eventParameters, Is.Not.Null);
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001: the NetworkObject creation event details include "
                + "Id='platformBackupRestore.backupRestore-data' and "
                + "ObjectType=NetworkObjectType.DATA_PROVIDER. The Id MUST include the "
                + "'-data' suffix the base class applies because that's the wire "
                + "identifier React-side `useDataProvider()` resolves through."
        )]
        public async Task RegisterDataProviderAsync_EventDetails_IdAndObjectTypeMatch()
        {
            await _provider.RegisterDataProviderAsync();

            NetworkObjectCreatedDetails details = GetCreationDetails();

            Assert.That(details.Id, Is.EqualTo(DataProviderWireName));
            Assert.That(
                details.ObjectType,
                Is.EqualTo(NetworkObjectType.DATA_PROVIDER),
                "ObjectType MUST be DATA_PROVIDER (DEC-303/304/332 — DataProvider hybrid, NOT plain OBJECT)."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001: the onDidCreateNetworkObject event lists all 12 expected wire "
                + "function names in FunctionNames (order-independent, sorted by the "
                + "base class — see NetworkObjects/DataProvider.cs:50-58)."
        )]
        public async Task RegisterDataProviderAsync_EventDetails_FunctionNamesListAllExpected()
        {
            await _provider.RegisterDataProviderAsync();

            NetworkObjectCreatedDetails details = GetCreationDetails();

            Assert.That(details.FunctionNames, Is.Not.Null);
            Assert.That(
                details.FunctionNames!,
                Is.EquivalentTo(ExpectedFunctionNames),
                "FunctionNames in the onDidCreateNetworkObject event must match the "
                    + $"{ExpectedFunctionNames.Length} expected backup-restore wire entries "
                    + "(order-independent)."
            );
        }

        // =====================================================================
        // GROUP D — Dispatch round-trip (end-to-end wiring proof)
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001 OUTER acceptance: a registered, CAP-011-implemented method is "
                + "invocable via `PapiClient.SendRequestAsync<Task<T>>(`object:platformBackup"
                + "Restore.backupRestore-data.closeRestoreSession`, params)` — proves "
                + "end-to-end function-tuple dispatch over an unknown session id (which "
                + "is idempotently-Success per CAP-011 / data-contracts.md §4.10). "
                + "Picked closeRestoreSession because it is side-effect-free for an "
                + "unknown id and needs no test-seam setup."
        )]
        public async Task CloseRestoreSession_DispatchedViaPapi_ReturnsSuccessEnvelope()
        {
            await _provider.RegisterDataProviderAsync();

            // Act: dispatch a closeRestoreSession with an unknown session id. Per
            // CAP-011 (BackupRestoreDataProvider.CloseRestoreSession.cs:108), this is
            // an idempotent Success — no side effects, no exceptions, no need for any
            // session-registry pre-seeding.
            //
            // The DummyPapiClient invokes the delegate via DynamicInvoke which returns
            // the raw Task<T> (production JsonRpc unwraps automatically). So we ask for
            // Task<CloseRestoreSessionResult> through the generic and await it here —
            // mirrors ManageBooksServiceRegistrationTests line 367-370.
            string requestType = $"{DataProviderRequestPrefix}.closeRestoreSession";
            var request = new CloseRestoreSessionRequest { SessionId = "unknown-session-id" };
            Task<CloseRestoreSessionResult>? handlerTask = await Client.SendRequestAsync<
                Task<CloseRestoreSessionResult>
            >(requestType, new object?[] { request });

            Assert.That(
                handlerTask,
                Is.Not.Null,
                $"Dispatch round-trip via '{requestType}' did not reach the registered handler."
            );

            CloseRestoreSessionResult result = await handlerTask!;

            // Assert: the handler returns CloseRestoreSessionResult.Success (per CAP-011's
            // idempotent contract). Pinning the variant ensures dispatch wired the
            // RIGHT method — not, say, a stub or the wrong overload.
            Assert.That(
                result,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "closeRestoreSession on an unknown session id must return Success per "
                    + "data-contracts.md §4.10. A different variant means dispatch wired "
                    + "the wrong delegate."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-001")]
        [Description(
            "CAP-001 stub-canary: a registered but still-pending method (`getBackupLogInfo` "
                + "— DT-003 / DEC-333, capability assigned to BE-7) IS registered (proving "
                + "the function-tuple slot is reserved), but invoking it throws "
                + "NotImplementedException with a message that names the owning future "
                + "capability so the next agent who lands DT-003 sees an unmistakable "
                + "'replace this stub' signal in test output."
        )]
        public async Task GetBackupLogInfo_DispatchedViaPapi_ThrowsNotImplementedWithCapabilityHint()
        {
            await _provider.RegisterDataProviderAsync();

            // Assert (a) the slot is registered — without this, the test below has no
            // meaning because dispatch wouldn't even reach the stub.
            string requestType = $"{DataProviderRequestPrefix}.getBackupLogInfo";
            Assert.That(
                Client.IsHandlerRegistered(requestType),
                Is.True,
                $"`{requestType}` must be registered even though DT-003 / DEC-333 is pending — "
                    + "the slot is reserved as a NotImplementedException stub so the wire surface "
                    + "is complete at CAP-001 GREEN."
            );

            // Assert (b) dispatching invokes the stub and surfaces NotImplementedException.
            // The DummyPapiClient's SendRequestAsync routes via PapiClient.SendRequestAsync
            // which DynamicInvokes the delegate; an inline-lambda stub that throws will
            // propagate the throw out of DynamicInvoke as a TargetInvocationException whose
            // InnerException is the NotImplementedException. We unwrap with InstanceOf in the
            // assertion to make either form acceptable.
            //
            // NOTE: we deliberately ignore the specific exception's *exact* type
            // (NotImplementedException vs the dispatcher's wrapper) because the
            // DummyPapiClient's invocation path may or may not unwrap on the way out. The
            // important assertion is "thrown, AND mentions the owning capability".
            //
            // Capability-id hint convention: the stub's message contains "CAP-008" /
            // "CAP-010" / "CAP-024" / "DT-003" so a grep tells the next agent which
            // partial fragment needs to land. For getBackupLogInfo the hint is
            // "DT-003" (the data-type identifier per DEC-333 — there is no CAP-number
            // explicitly assigned because DT-003 is owned by BE-7 alongside CAP-001).
            Exception? caught = null;
            try
            {
                await Client.SendRequestAsync<object?>(requestType, new object?[] { null! });
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(
                caught,
                Is.Not.Null,
                "Dispatching the getBackupLogInfo stub MUST throw — the registration is a "
                    + "NotImplementedException lambda canary. A non-throwing path means the "
                    + "stub has already been replaced (in which case this test should be "
                    + "promoted to a real assertion against the GREEN implementation)."
            );

            // Unwrap potential TargetInvocationException to inspect the inner NotImpl exception's message.
            Exception inner = caught!;
            while (inner.InnerException != null && inner is not NotImplementedException)
                inner = inner.InnerException;

            Assert.That(
                inner,
                Is.InstanceOf<NotImplementedException>(),
                "The stub MUST throw NotImplementedException so future implementers see a "
                    + "clear 'wire this method up' signal. Got: "
                    + caught!.GetType().Name
            );
            Assert.That(
                inner.Message,
                Does.Contain("DT-003").Or.Contain("BackupLogInfo"),
                "The stub's message must name the owning data type so a future implementer "
                    + "can grep for the slot and replace it. Got: "
                    + inner.Message
            );
        }

        // =====================================================================
        // GROUP E — Helpers (mirrors ManageBooksServiceRegistrationTests)
        // =====================================================================

        /// <summary>
        /// Drains sent events and returns the first `object:onDidCreateNetworkObject`
        /// entry whose payload matches the backup-restore DataProvider (by Id).
        /// Fails the test if not found.
        /// </summary>
        private (string eventType, object? eventParameters) FindCreationEvent()
        {
            while (Client.SentEventCount > 0)
            {
                var ev = Client.NextSentEvent;
                if (
                    ev.eventType == "object:onDidCreateNetworkObject"
                    && ev.eventParameters is NetworkObjectCreatedDetails details
                    && details.Id == DataProviderWireName
                )
                {
                    return ev;
                }
            }

            Assert.Fail(
                $"No `object:onDidCreateNetworkObject` event with Id='{DataProviderWireName}' was sent."
            );
            return default; // unreachable — Assert.Fail throws
        }

        /// <summary>
        /// Fetches the creation-event details payload for the backup-restore
        /// DataProvider. Fails the test if no matching event was sent.
        /// </summary>
        private NetworkObjectCreatedDetails GetCreationDetails()
        {
            (_, object? payload) = FindCreationEvent();
            Assert.That(
                payload,
                Is.InstanceOf<NetworkObjectCreatedDetails>(),
                "Creation event payload must be NetworkObjectCreatedDetails."
            );
            return (NetworkObjectCreatedDetails)payload!;
        }
    }
}
