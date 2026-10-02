// The registration, baseline-emit and forwarding mechanics of
// SendReceiveSnapshotNotifierService<TSnapshot> are covered once, in
// SendReceiveBlockNotifierServiceTests. This suite covers only what is specific to unsynced
// changes: its wire names, its OpenRPC docs, its payload shape, the forwarding from the tracker's
// and the remote poller's Changed events, and the merged snapshot its command reports.
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesNotifierService"/>: it forwards
    /// <see cref="UnsyncedChangesTracker.Changed"/> and <see cref="RemoteChangesPoller.Changed"/> to
    /// the PAPI as the <c>paratextBibleSendReceive.onUnsyncedChangesChanged</c> event and answers the
    /// <c>command:paratextBibleSendReceive.getUnsyncedChanges</c> pull command with the live merged
    /// state of both. Uses <see cref="DummyPapiClient"/>, so no live PAPI connection is needed.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnsyncedChangesNotifierServiceTests : PapiTestBase
    {
        private const string UnsyncedChangesChangedEvent =
            "paratextBibleSendReceive.onUnsyncedChangesChanged";
        private const string GetUnsyncedChangesCommand =
            "command:paratextBibleSendReceive.getUnsyncedChanges";

        private UnsyncedChangesTracker _tracker = null!;
        private RemoteChangesPoller _poller = null!;
        private UnsyncedChangesNotifierService _notifier = null!;
        private IReadOnlyCollection<string>? _remote = Array.Empty<string>();

        private static UnsyncedChangesTracker CreateTracker() =>
            new(id => id == "A", () => false, () => new[] { "A" }, TimeSpan.Zero);

        private RemoteChangesPoller CreatePoller() =>
            new(
                () => _remote,
                () => false,
                () => true,
                Timeout.InfiniteTimeSpan,
                Timeout.InfiniteTimeSpan
            );

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _tracker = CreateTracker();
            _poller = CreatePoller();
            _notifier = new UnsyncedChangesNotifierService(Client, _tracker, _poller);
            await _notifier.InitializeAsync();
            // InitializeAsync emits the current snapshot once; drain it so each test's event
            // assertions see only the transitions that test drives.
            _ = Client.NextSentEvent;
        }

        [TearDown]
        public void TrackerTearDown()
        {
            _tracker.Dispose();
            _poller.Dispose();
        }

        [Test]
        public void InitializeAsync_RegistersTheGetUnsyncedChangesCommand()
        {
            Assert.That(
                Client.IsHandlerRegistered(GetUnsyncedChangesCommand),
                Is.True,
                "InitializeAsync must register the getUnsyncedChanges command handler"
            );
        }

        [Test]
        public void InitializeAsync_RegistersGetUnsyncedChangesWithExperimentalDocs()
        {
            var docs = Client.GetDocumentationFor(GetUnsyncedChangesCommand);
            Assert.That(docs, Is.Not.Null, "command registered with OpenRPC documentation");
            Assert.That(docs!.Method.Experimental, Is.True, "command marked experimental");
        }

        [Test]
        public async Task InitializeAsync_RegistersBothWireSurfaces()
        {
            using var client = new DummyPapiClient();
            using var tracker = CreateTracker();
            using var poller = CreatePoller();
            var notifier = new UnsyncedChangesNotifierService(client, tracker, poller);

            await notifier.InitializeAsync();

            Assert.That(
                client.IsHandlerRegistered(GetUnsyncedChangesCommand),
                Is.True,
                "InitializeAsync must register the getUnsyncedChanges command handler"
            );
            var (requestType, requestContents) = client.NextSentRequest;
            Assert.Multiple(() =>
            {
                Assert.That(requestType, Is.EqualTo("network:registerEvent"));
                Assert.That(
                    requestContents![0],
                    Is.EqualTo(UnsyncedChangesChangedEvent),
                    "the registration must name the onUnsyncedChangesChanged event"
                );
            });
        }

        [Test]
        public async Task TrackerChanged_ForwardsTheSnapshotToThePapi()
        {
            using var client = new DummyPapiClient();
            using var tracker = CreateTracker();
            using var poller = CreatePoller();
            var notifier = new UnsyncedChangesNotifierService(client, tracker, poller);
            await notifier.InitializeAsync();
            _ = client.NextSentEvent; // drop the baseline emit

            tracker.OnWriteScopeExited("A");
            await tracker.FlushAsync();

            Assert.That(client.SentEventCount, Is.EqualTo(1));
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(UnsyncedChangesChangedEvent));
            var state = (UnsyncedChangesState)payload!;
            Assert.That(state.ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task GetUnsyncedChangesCommand_ReturnsTheLiveTrackerState()
        {
            var before = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;
            Assert.That(before.ToSend, Is.Empty);

            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            var after = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;
            Assert.That(after, Is.EqualTo(_tracker.GetState()));
            Assert.That(after.ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task PollerChange_ForwardsMergedSnapshot()
        {
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _ = Client.NextSentEvent; // drop the tracker's event
            _remote = new[] { "B" };

            _poller.Tick();
            await _poller.FlushAsync();

            Assert.That(Client.SentEventCount, Is.EqualTo(1));
            var (eventType, payload) = Client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(UnsyncedChangesChangedEvent));
            var state = (UnsyncedChangesState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.ToSend, Is.EquivalentTo(new[] { "A" }));
                Assert.That(state.ToReceive, Is.EquivalentTo(new[] { "B" }));
            });
        }

        [Test]
        public async Task TrackerChange_KeepsToReceive()
        {
            _remote = new[] { "B" };
            _poller.Tick();
            await _poller.FlushAsync();
            _ = Client.NextSentEvent; // drop the poller's event

            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            Assert.That(Client.SentEventCount, Is.EqualTo(1));
            var (_, payload) = Client.NextSentEvent;
            var state = (UnsyncedChangesState)payload!;
            Assert.Multiple(() =>
            {
                Assert.That(state.ToSend, Is.EquivalentTo(new[] { "A" }));
                Assert.That(state.ToReceive, Is.EquivalentTo(new[] { "B" }));
            });
        }

        [Test]
        public async Task Command_ReturnsMergedLiveState()
        {
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _remote = new[] { "B" };
            _poller.Tick();
            await _poller.FlushAsync();

            var state = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;

            Assert.Multiple(() =>
            {
                Assert.That(state.ToSend, Is.EquivalentTo(new[] { "A" }));
                Assert.That(state.ToReceive, Is.EquivalentTo(new[] { "B" }));
            });

            // The command answers with present state, not with the last event's payload.
            _remote = new[] { "B", "C" };
            _poller.Tick();
            await _poller.FlushAsync();
            var later = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;
            Assert.That(later.ToReceive, Is.EquivalentTo(new[] { "B", "C" }));
        }
    }
}
