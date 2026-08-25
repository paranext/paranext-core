using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SyncActivityNotifierService"/>: it forwards
    /// <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> transitions to the PAPI as
    /// the <c>paratextBibleSendReceive.onSyncActivityChanged</c> event and answers the
    /// <c>command:paratextBibleSendReceive.getSyncActivity</c> pull command with the current snapshot.
    /// Uses <see cref="DummyPapiClient"/>, which captures sent events and locally-registered handlers,
    /// so no live PAPI connection is needed.
    /// <para>
    /// Transitions are driven through the service's own <c>RaiseSyncActivityChanged</c> — the
    /// scaffolding entry point the Paratext 10 Studio patch's run bracket calls — so these tests pin
    /// the forwarding contract without depending on a sync implementation that does not exist in
    /// public core.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SyncActivityNotifierServiceTests : PapiTestBase
    {
        private const string SyncActivityChangedEvent =
            "paratextBibleSendReceive.onSyncActivityChanged";
        private const string GetSyncActivityCommand =
            "command:paratextBibleSendReceive.getSyncActivity";

        private ParatextProjectSendReceiveService _sendReceiveService = null!;
        private SyncActivityNotifierService _notifier = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _sendReceiveService = CreateSendReceiveService();
            _notifier = new SyncActivityNotifierService(Client, _sendReceiveService);
            await _notifier.InitializeAsync();
            // InitializeAsync emits the current snapshot once (the restart re-baseline emit — see
            // the dedicated tests below); drain it so each test's event assertions see only the
            // transitions that test drives.
            _ = Client.NextSentEvent;
        }

        [Test]
        public void InitializeAsync_RegistersTheGetSyncActivityCommand()
        {
            Assert.That(
                Client.IsHandlerRegistered(GetSyncActivityCommand),
                Is.True,
                "InitializeAsync must register the getSyncActivity command handler"
            );
        }

        [Test]
        public void InitializeAsync_RegistersTheEventWithTheCentralRegistry()
        {
            Assert.That(
                Client.SentRequestCount,
                Is.EqualTo(1),
                "InitializeAsync must register the event with main's central event registry"
            );
            var (requestType, requestContents) = Client.NextSentRequest;
            Assert.Multiple(() =>
            {
                Assert.That(requestType, Is.EqualTo("network:registerEvent"));
                Assert.That(
                    requestContents![0],
                    Is.EqualTo(SyncActivityChangedEvent),
                    "the registration must name the onSyncActivityChanged event"
                );
                var documentation = (OpenRpcSingleNotificationDocumentation)requestContents[1]!;
                Assert.That(
                    documentation.Notification.Experimental,
                    Is.True,
                    "the event is @experimental at the TS seam, so it carries x-experimental"
                );
            });
        }

        [Test]
        public void InitializeAsync_RegistersGetSyncActivityWithExperimentalDocs()
        {
            var docs = Client.GetDocumentationFor(GetSyncActivityCommand);
            Assert.That(docs, Is.Not.Null, "command registered with OpenRPC documentation");
            Assert.That(docs!.Method.Experimental, Is.True, "command marked experimental");
        }

        [Test]
        public async Task InitializeAsync_RegistersBothWireSurfaces()
        {
            // One client for both the service and the notifier: a service wired to a DIFFERENT client
            // than the notifier under test would silently send its traffic somewhere no assertion can
            // see, so any later assertion on service-side traffic would read the wrong client.
            using var client = new DummyPapiClient();
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);

            await notifier.InitializeAsync();

            Assert.That(
                client.IsHandlerRegistered(GetSyncActivityCommand),
                Is.True,
                "InitializeAsync must register the getSyncActivity command handler"
            );
            var (requestType, requestContents) = client.NextSentRequest;
            Assert.Multiple(() =>
            {
                Assert.That(requestType, Is.EqualTo("network:registerEvent"));
                Assert.That(
                    requestContents![0],
                    Is.EqualTo(SyncActivityChangedEvent),
                    "the registration must name the onSyncActivityChanged event"
                );
            });
        }

        [Test]
        public async Task InitializeAsync_RegistryRejectsEventRegistration_LogsAndStillEmits()
        {
            // Best-effort contract: if main's central registry rejects the event registration
            // (returns false), InitializeAsync must warn and continue — the service still registers
            // its command handler and still pushes sync-activity transitions. Build a fresh
            // client + service so only the notifier under test here is subscribed (the base SetUp
            // already initialized on the happy path).
            using var client = new DummyPapiClient { RegisterEventResponse = () => false };
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);

            using var consoleError = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(consoleError);
            try
            {
                await notifier.InitializeAsync();
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
                    Does.Contain(SyncActivityChangedEvent),
                    "a rejected registration must be logged, naming the event"
                );
                Assert.That(
                    client.IsHandlerRegistered(GetSyncActivityCommand),
                    Is.True,
                    "a rejected registration must not stop the command handler from registering"
                );
            });
        }

        [Test]
        public async Task InitializeAsync_EventRegistrationThrows_IsCaughtAndStillEmits()
        {
            // Best-effort contract: if the registration request itself fails (throws), InitializeAsync
            // must catch it, log it, and continue — a registry hiccup must never break backend
            // startup. Fresh client + service, as above.
            using var client = new DummyPapiClient
            {
                RegisterEventResponse = () =>
                    throw new InvalidOperationException("registry offline"),
            };
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);

            using var consoleError = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(consoleError);
            try
            {
                // Must not throw: the registration failure is caught internally.
                await notifier.InitializeAsync();
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
                    Does.Contain(SyncActivityChangedEvent),
                    "a thrown registration must be caught and logged, naming the event"
                );
                Assert.That(
                    log,
                    Does.Contain("registry offline"),
                    "the caught exception detail must be logged"
                );
                Assert.That(
                    client.IsHandlerRegistered(GetSyncActivityCommand),
                    Is.True,
                    "a thrown registration must not stop the command handler from registering"
                );
            });
        }

        [Test]
        public async Task InitializeAsync_EmitsTheCurrentSnapshotOnce()
        {
            // Restart re-baseline emit: after initialization the service pushes the current
            // sync-activity snapshot once, so a subscriber that was already listening across a
            // backend restart converges on the fresh process's state instead of keeping its stale
            // last-seen state. Fresh client + service so only the notifier under test here is
            // subscribed (the base SetUp already initialized and drained its own init emit).
            using var client = new DummyPapiClient();
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);

            await notifier.InitializeAsync();

            Assert.That(
                client.SentEventCount,
                Is.EqualTo(1),
                "InitializeAsync must emit the current snapshot exactly once"
            );
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(SyncActivityChangedEvent));
            var state = (SyncActivityState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(
                    state.IsSyncing,
                    Is.False,
                    "an idle service re-baselines as not syncing"
                );
                Assert.That(state.ProjectIds, Is.Empty);
            });
        }

        [Test]
        public async Task SyncActivityChanged_ForwardsTheSnapshotToThePapi()
        {
            using var client = new DummyPapiClient();
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);
            await notifier.InitializeAsync();
            _ = client.NextSentEvent; // drop the baseline emit

            RaiseSyncActivity(service, new SyncActivityState(true, new[] { "PROJ1" }));

            Assert.That(client.SentEventCount, Is.EqualTo(1));
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(SyncActivityChangedEvent));
            var state = (SyncActivityState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsSyncing, Is.True);
                Assert.That(state.ProjectIds, Is.EquivalentTo(new[] { "PROJ1" }));
            });
        }

        [Test]
        public void SyncActivityChanged_SubscriberThrows_DoesNotEscapeIntoTheRaise()
        {
            // The patch raises this from inside the sync worker's `finally` blocks, where an escaping
            // subscriber exception would REPLACE the in-flight sync failure and lose the real
            // diagnosis.
            _sendReceiveService.SyncActivityChanged += _ =>
                throw new InvalidOperationException("bad subscriber");

            Assert.That(
                () =>
                    RaiseSyncActivity(
                        _sendReceiveService,
                        new SyncActivityState(true, new[] { "PROJ1" })
                    ),
                Throws.Nothing
            );
        }

        [Test]
        public void GetSyncActivityCommand_ReturnsTheCurrentSnapshot()
        {
            // The handler is bound directly to GetSyncActivity (a live read), not to a cached copy of
            // the last-pushed event. In public core no sync can run, so the live read is always idle;
            // the patch's own activity tests cover the active shape.
            var snapshot = Client.InvokeRequestHandler(GetSyncActivityCommand);

            Assert.That(snapshot, Is.InstanceOf<SyncActivityState>());
            var state = (SyncActivityState)snapshot!;
            Assert.Multiple(() =>
            {
                Assert.That(state.IsSyncing, Is.False);
                Assert.That(state.ProjectIds, Is.Empty);
            });
        }

        [Test]
        public void SyncActivityState_SerializesToTheCamelCaseWireShape()
        {
            // The renderer consumes exactly { isSyncing, projectIds }. Serialize with the same
            // options the PAPI JSON-RPC formatter uses (PropertyNamingPolicy = CamelCase) to pin that
            // contract at the C# boundary.
            var options = SerializationOptions.CreateSerializationOptions();

            var json = JsonSerializer.Serialize(
                new SyncActivityState(true, new[] { "PROJ1" }),
                options
            );

            Assert.Multiple(() =>
            {
                Assert.That(json, Does.Contain("\"isSyncing\":true"));
                Assert.That(json, Does.Contain("\"projectIds\":[\"PROJ1\"]"));
                Assert.That(
                    json,
                    Does.Not.Contain("IsSyncing"),
                    "keys must be camelCase on the wire"
                );
                Assert.That(
                    json,
                    Does.Not.Contain("ProjectIds"),
                    "keys must be camelCase on the wire"
                );
            });
        }

        /// <summary>
        /// Raises <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> with
        /// <paramref name="state"/> through the service's own protected
        /// <c>RaiseSyncActivityChanged</c> — the scaffolding entry point the Paratext 10 Studio
        /// patch's run bracket calls at every transition. Reflection because that member is
        /// deliberately protected: only the service's own run bracket may announce activity.
        /// </summary>
        private static void RaiseSyncActivity(
            ParatextProjectSendReceiveService service,
            SyncActivityState state
        )
        {
            // Matched by parameter type, not by name alone: the Paratext 10 Studio patch adds a
            // parameterless overload for its own call sites, which makes a name-only lookup
            // ambiguous once the patch is applied.
            var info = typeof(ParatextProjectSendReceiveService).GetMethod(
                "RaiseSyncActivityChanged",
                BindingFlags.NonPublic | BindingFlags.Instance,
                null,
                [typeof(SyncActivityState)],
                null
            );
            Assert.That(
                info,
                Is.Not.Null,
                "expected ParatextProjectSendReceiveService.RaiseSyncActivityChanged"
            );
            info!.Invoke(service, [state]);
        }
    }
}
