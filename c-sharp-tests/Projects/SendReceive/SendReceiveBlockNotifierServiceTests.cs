using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SendReceiveBlockNotifierService"/>: it forwards
    /// <see cref="SendReceiveWriteLock"/> transitions to the PAPI as the
    /// <c>paratextBibleSendReceive.onSyncWriteLockChanged</c> event and answers the
    /// <c>command:paratextBibleSendReceive.getAutoSyncBlocking</c> pull command with the current
    /// snapshot. Uses <see cref="DummyPapiClient"/> (the base fixture's <c>Client</c>), which captures
    /// sent events and locally-registered handlers, so no live PAPI connection is needed. Every test
    /// resets the static gate before and after so a subscription can never leak between tests.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SendReceiveBlockNotifierServiceTests : PapiTestBase
    {
        private const string BlockStateChangedEvent =
            "paratextBibleSendReceive.onSyncWriteLockChanged";
        private const string GetAutoSyncBlockingCommand =
            "command:paratextBibleSendReceive.getAutoSyncBlocking";

        private SendReceiveBlockNotifierService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.ResetForTests();
            _service = new SendReceiveBlockNotifierService(Client);
            await _service.InitializeAsync();
            // InitializeAsync emits the current gate snapshot once (the restart re-baseline emit —
            // see the dedicated tests below); drain it so each test's event assertions see only the
            // transitions that test drives.
            _ = Client.NextSentEvent;
        }

        [TearDown]
        public void ResetGate() => SendReceiveWriteLock.ResetForTests();

        [Test]
        public void InitializeAsync_RegistersTheGetAutoSyncBlockingCommand()
        {
            Assert.That(
                Client.IsHandlerRegistered(GetAutoSyncBlockingCommand),
                Is.True,
                "InitializeAsync must register the getAutoSyncBlocking command handler"
            );
        }

        [Test]
        public void InitializeAsync_RegistersTheEventWithTheCentralRegistry()
        {
            Assert.That(
                Client.SentRequestCount,
                Is.EqualTo(1),
                "InitializeAsync must send exactly one wire request: the event registration"
            );
            var (requestType, requestContents) = Client.NextSentRequest;
            Assert.Multiple(() =>
            {
                Assert.That(requestType, Is.EqualTo("network:registerEvent"));
                Assert.That(
                    requestContents,
                    Has.Count.EqualTo(2),
                    "the registration must carry the event name and its documentation"
                );
                Assert.That(
                    requestContents![0],
                    Is.EqualTo(BlockStateChangedEvent),
                    "the registration must name the onSyncWriteLockChanged event"
                );
                Assert.That(
                    requestContents[1],
                    Is.InstanceOf<OpenRpcSingleNotificationDocumentation>(),
                    "the second argument must be the notification documentation"
                );
            });
            // The event is @experimental (TS declaration), so its registration must carry the
            // x-experimental wire marker for rpc.discover.
            var documentation = (OpenRpcSingleNotificationDocumentation)requestContents![1]!;
            Assert.That(
                documentation.Notification.Experimental,
                Is.True,
                "the event documentation must carry the x-experimental wire marker"
            );
        }

        [Test]
        public void InitializeAsync_RegistersGetAutoSyncBlockingWithExperimentalDocs()
        {
            // The command is @experimental (TS declaration), so its registration must carry
            // experimental OpenRPC documentation for rpc.discover (the same doc-assertion pattern as
            // VersificationConversionServiceTests).
            var docs = Client.GetDocumentationFor(GetAutoSyncBlockingCommand);
            Assert.That(docs, Is.Not.Null, "command registered with OpenRPC documentation");
            Assert.That(docs!.Method.Experimental, Is.True, "command marked experimental");
        }

        [Test]
        public async Task InitializeAsync_RegistryRejectsEventRegistration_LogsAndStillEmits()
        {
            // Best-effort contract: if main's central registry rejects the event registration
            // (returns false), InitializeAsync must warn and continue — the service still registers
            // its command handler and still pushes gate transitions. Build a fresh gate + client so
            // only the service under test here is subscribed (the base SetUp already initialized on
            // the happy path).
            SendReceiveWriteLock.ResetForTests();
            using var client = new DummyPapiClient { RegisterEventResponse = () => false };
            var service = new SendReceiveBlockNotifierService(client);

            using var consoleError = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(consoleError);
            try
            {
                await service.InitializeAsync();
            }
            finally
            {
                Console.SetError(originalError);
            }
            // Drain the init-time current-snapshot emit so the assertions below see only the
            // transition push.
            _ = client.NextSentEvent;

            Assert.Multiple(() =>
            {
                Assert.That(
                    consoleError.ToString(),
                    Does.Contain(BlockStateChangedEvent),
                    "a rejected registration must be logged, naming the event"
                );
                Assert.That(
                    client.IsHandlerRegistered(GetAutoSyncBlockingCommand),
                    Is.True,
                    "a rejected registration must not stop the command handler from registering"
                );
            });

            // The service still forwards a gate transition despite the rejected registration.
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            Assert.That(
                client.SentEventCount,
                Is.EqualTo(1),
                "the service must still push the block-state event after a rejected registration"
            );
            var (eventType, _) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
        }

        [Test]
        public async Task InitializeAsync_EventRegistrationThrows_IsCaughtAndStillEmits()
        {
            // Best-effort contract: if the registration request itself fails (throws), InitializeAsync
            // must catch it, log it, and continue — a registry hiccup must never break backend
            // startup. Fresh gate + client, as above.
            SendReceiveWriteLock.ResetForTests();
            using var client = new DummyPapiClient
            {
                RegisterEventResponse = () =>
                    throw new InvalidOperationException("registry offline"),
            };
            var service = new SendReceiveBlockNotifierService(client);

            using var consoleError = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(consoleError);
            try
            {
                // Must not throw: the registration failure is caught internally.
                await service.InitializeAsync();
            }
            finally
            {
                Console.SetError(originalError);
            }
            // Drain the init-time current-snapshot emit so the assertions below see only the
            // transition push.
            _ = client.NextSentEvent;

            Assert.Multiple(() =>
            {
                var log = consoleError.ToString();
                Assert.That(
                    log,
                    Does.Contain(BlockStateChangedEvent),
                    "a thrown registration must be caught and logged, naming the event"
                );
                Assert.That(
                    log,
                    Does.Contain("registry offline"),
                    "the caught exception detail must be logged"
                );
                Assert.That(
                    client.IsHandlerRegistered(GetAutoSyncBlockingCommand),
                    Is.True,
                    "a thrown registration must not stop the command handler from registering"
                );
            });

            // The service still forwards a gate transition despite the thrown registration.
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            Assert.That(
                client.SentEventCount,
                Is.EqualTo(1),
                "the service must still push the block-state event after a thrown registration"
            );
            var (eventType, _) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
        }

        [Test]
        public async Task InitializeAsync_EmitsTheCurrentSnapshotOnce()
        {
            // Restart re-baseline emit: after initialization the service pushes the gate's CURRENT
            // snapshot once, so a subscriber that was already listening across a backend restart
            // converges on the fresh process's state instead of keeping its stale last-seen state.
            // Fresh gate + client so only the service under test here is subscribed (the base SetUp
            // already initialized and drained its own init emit).
            SendReceiveWriteLock.ResetForTests();
            using var client = new DummyPapiClient();
            var service = new SendReceiveBlockNotifierService(client);

            await service.InitializeAsync();

            Assert.That(
                client.SentEventCount,
                Is.EqualTo(1),
                "InitializeAsync must emit the current snapshot exactly once"
            );
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
            var state = (SendReceiveBlockState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(
                    state.IsBlocking,
                    Is.False,
                    "an idle gate re-baselines as not blocking"
                );
                Assert.That(state.ProjectIds, Is.Empty);
            });
        }

        [Test]
        public async Task InitializeAsync_GateAlreadyArmed_EmitsTheArmedSnapshot()
        {
            // The init emit is the gate's CURRENT snapshot, not a hard-coded not-blocking one: a
            // service initializing while the gate is already armed must report the armed state.
            SendReceiveWriteLock.ResetForTests();
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            using var client = new DummyPapiClient();
            var service = new SendReceiveBlockNotifierService(client);

            await service.InitializeAsync();

            Assert.That(client.SentEventCount, Is.EqualTo(1));
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
            var state = (SendReceiveBlockState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsBlocking, Is.True);
                Assert.That(state.ProjectIds, Is.EquivalentTo(new[] { "projectA" }));
            });
        }

        [Test]
        public void GateArm_PushesOnSyncWriteLockChangedEventWithBlockingSnapshot()
        {
            Assert.That(
                Client.SentEventCount,
                Is.Zero,
                "no events before any transition (SetUp drained the init emit)"
            );

            SendReceiveWriteLock.SetSyncing(["projectA", "projectB"]);

            Assert.That(Client.SentEventCount, Is.EqualTo(1), "an arm must push exactly one event");
            var (eventType, payload) = Client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
            Assert.That(payload, Is.InstanceOf<SendReceiveBlockState>());
            var state = (SendReceiveBlockState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsBlocking, Is.True);
                Assert.That(state.ProjectIds, Is.EquivalentTo(new[] { "projectA", "projectB" }));
            });
        }

        [Test]
        public void GateClear_PushesOnSyncWriteLockChangedEventWithNotBlockingSnapshot()
        {
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            Assert.That(Client.SentEventCount, Is.EqualTo(1), "the arm event");
            _ = Client.NextSentEvent; // discard the arm event

            SendReceiveWriteLock.Clear();

            Assert.That(Client.SentEventCount, Is.EqualTo(1), "the disarm pushes one more event");
            var (eventType, payload) = Client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(BlockStateChangedEvent));
            var state = (SendReceiveBlockState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsBlocking, Is.False);
                Assert.That(state.ProjectIds, Is.Empty);
            });
        }

        [Test]
        public void GetAutoSyncBlockingCommand_ReturnsTheCurrentSnapshot()
        {
            // Not blocking before any sync.
            var before = Client.InvokeRequestHandler(GetAutoSyncBlockingCommand);
            Assert.That(before, Is.InstanceOf<SendReceiveBlockState>());
            Assert.That(((SendReceiveBlockState)before!).IsBlocking, Is.False);

            SendReceiveWriteLock.SetSyncing(["projectA"]);

            // Blocking, with the armed ids, after arming.
            var after = Client.InvokeRequestHandler(GetAutoSyncBlockingCommand);
            var state = (SendReceiveBlockState)after!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsBlocking, Is.True);
                Assert.That(state.ProjectIds, Is.EquivalentTo(new[] { "projectA" }));
            });
        }

        [Test]
        public void SendReceiveBlockState_SerializesToTheCamelCaseWireShape()
        {
            // The renderer consumes exactly { isBlocking, projectIds }. Serialize with the same
            // options the PAPI JSON-RPC formatter uses (PropertyNamingPolicy = CamelCase) to pin that
            // contract at the C# boundary.
            var options = SerializationOptions.CreateSerializationOptions();

            var json = JsonSerializer.Serialize(
                new SendReceiveBlockState(true, new[] { "projectA" }),
                options
            );

            Assert.Multiple(() =>
            {
                Assert.That(json, Does.Contain("\"isBlocking\":true"));
                Assert.That(json, Does.Contain("\"projectIds\":[\"projectA\"]"));
                Assert.That(
                    json,
                    Does.Not.Contain("IsBlocking"),
                    "keys must be camelCase on the wire"
                );
                Assert.That(
                    json,
                    Does.Not.Contain("ProjectIds"),
                    "keys must be camelCase on the wire"
                );
            });
        }
    }
}
