// The registration, baseline-emit and forwarding mechanics of
// SendReceiveSnapshotNotifierService<TSnapshot> are covered once, in
// SendReceiveBlockNotifierServiceTests — the first service built on it. This suite covers only what
// is specific to sync activity: its wire names, its OpenRPC docs, its payload shape, and the
// snapshot its own service reports.
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
            // The renderer consumes exactly { isSyncing, projectIds }. Serialized with the options
            // the PAPI JSON-RPC formatter really uses, so this pins the wire shape rather than one
            // only the shared options produce (see PapiTestBase.WireSerializerOptions).
            var json = JsonSerializer.Serialize(
                new SyncActivityState(true, new[] { "PROJ1" }),
                WireSerializerOptions()
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

        [Test]
        public void SyncActivityState_SerializesTheOutcomeAsACamelCaseString()
        {
            // The TS seam declares `outcome` as the string union `'succeeded' | 'failed'`, so it must
            // not reach the wire as the enum's integer.
            var json = JsonSerializer.Serialize(
                new SyncActivityState(false, []) { Outcome = SyncOutcome.Succeeded },
                WireSerializerOptions()
            );

            Assert.That(json, Does.Contain("\"outcome\":\"succeeded\""));
        }

        [Test]
        public void SyncActivityState_OmitsTheOutcomeWhenAbsent()
        {
            // Absent means "this build cannot say", so the key is left off rather than sent as `null`.
            // Checked against both option sets because they are not interchangeable (see
            // WireSerializerOptions): an omission configured only on the shared options would pass
            // against those while the real wire still carried `"outcome":null`.
            var idle = new SyncActivityState(false, []);

            Assert.Multiple(() =>
            {
                Assert.That(
                    JsonSerializer.Serialize(
                        idle,
                        SerializationOptions.CreateSerializationOptions()
                    ),
                    Does.Not.Contain("outcome")
                );
                Assert.That(
                    JsonSerializer.Serialize(idle, WireSerializerOptions()),
                    Does.Not.Contain("outcome")
                );
            });
        }

        [Test]
        public void SyncActivityState_SerializesTheOutcomeTimeAsADateString()
        {
            var json = JsonSerializer.Serialize(
                new SyncActivityState(false, [])
                {
                    Outcome = SyncOutcome.Succeeded,
                    CompletedAt = new DateTimeOffset(2026, 9, 18, 10, 0, 0, TimeSpan.Zero),
                },
                WireSerializerOptions()
            );

            // The renderer parses this with Date.parse and orders the verdict by it, so it has to
            // reach the wire as a date string rather than as a tick count.
            Assert.That(json, Does.Contain("\"completedAt\":\"2026-09-18T10:00:00+00:00\""));
        }

        [Test]
        public void SyncActivityState_OmitsTheOutcomeTimeWhenAbsent()
        {
            var json = JsonSerializer.Serialize(
                new SyncActivityState(false, []),
                WireSerializerOptions()
            );

            Assert.That(json, Does.Not.Contain("completedAt"));
        }

        [Test]
        public void SyncActivityState_EqualityIncludesTheOutcome()
        {
            // Publishers dedupe on this equality (`if (snapshot == _last) return;`), so a closing
            // snapshot that differs from the one before it only in its outcome must not be dropped as
            // a repeat.
            var succeeded = new SyncActivityState(false, []) { Outcome = SyncOutcome.Succeeded };
            var succeededAgain = new SyncActivityState(false, [])
            {
                Outcome = SyncOutcome.Succeeded,
            };
            var failed = new SyncActivityState(false, []) { Outcome = SyncOutcome.Failed };
            var noOutcome = new SyncActivityState(false, []);

            Assert.Multiple(() =>
            {
                Assert.That(succeeded == failed, Is.False, "different outcomes");
                Assert.That(succeeded == noOutcome, Is.False, "an outcome versus none");
                Assert.That(
                    succeeded == succeeded with { CompletedAt = DateTimeOffset.UnixEpoch },
                    Is.False,
                    "the same outcome at different times"
                );
                Assert.That(succeeded == succeededAgain, Is.True, "the same outcome");
                Assert.That(succeeded.GetHashCode(), Is.EqualTo(succeededAgain.GetHashCode()));
            });
        }

        [Test]
        public async Task SyncActivityChanged_ForwardsTheOutcome()
        {
            using var client = new DummyPapiClient();
            var service = CreateSendReceiveService(client);
            var notifier = new SyncActivityNotifierService(client, service);
            await notifier.InitializeAsync();
            _ = client.NextSentEvent; // drop the baseline emit

            RaiseSyncActivity(
                service,
                new SyncActivityState(false, []) { Outcome = SyncOutcome.Failed }
            );

            var (_, payload) = client.NextSentEvent;
            Assert.That(((SyncActivityState)payload!).Outcome, Is.EqualTo(SyncOutcome.Failed));
        }

        [Test]
        public void GetSyncActivityCommand_ReportsNoOutcome()
        {
            // No sync runs in public core, so there is no completed run to describe. An idle snapshot
            // carrying a verdict would tell a consumer that a sync had happened.
            var state = (SyncActivityState)Client.InvokeRequestHandler(GetSyncActivityCommand)!;

            Assert.That(state.Outcome, Is.Null);
        }

        [Test]
        public void SyncActivityState_KeepsItsTwoValueConstructionAndDeconstruction()
        {
            // The Paratext 10 Studio patch builds and reads these from outside this repository, so
            // promoting a property to a positional parameter would break a build this repo cannot
            // see. Both halves below stop compiling if that ever happens, which is the alarm.
            var state = new SyncActivityState(true, new[] { "PROJ1" })
            {
                Outcome = SyncOutcome.Failed,
            };

            var (isSyncing, projectIds) = state;

            Assert.Multiple(() =>
            {
                Assert.That(isSyncing, Is.True);
                Assert.That(projectIds, Is.EquivalentTo(new[] { "PROJ1" }));
            });
        }

        [Test]
        public void SyncActivityState_DefaultValueComparesAndHashesWithoutThrowing()
        {
            // A publisher's dedupe field (`if (snapshot == _last) return;`) starts at `default`,
            // whose ProjectIds is null, so the first snapshot it ever compares lands here.
            var idle = new SyncActivityState(false, []);

            Assert.Multiple(() =>
            {
                Assert.That(() => default(SyncActivityState) == idle, Throws.Nothing);
                Assert.That(() => idle == default(SyncActivityState), Throws.Nothing);
                Assert.That(() => default(SyncActivityState).GetHashCode(), Throws.Nothing);
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
