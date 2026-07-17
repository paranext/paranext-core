using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
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
                    Is.EqualTo(new object?[] { BlockStateChangedEvent }),
                    "the registration must name the onSyncWriteLockChanged event"
                );
            });
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
        public void GateArm_PushesOnSyncWriteLockChangedEventWithBlockingSnapshot()
        {
            Assert.That(Client.SentEventCount, Is.Zero, "no events before any transition");

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
