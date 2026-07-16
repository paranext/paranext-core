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
