// The registration, baseline-emit and forwarding mechanics of
// SendReceiveSnapshotNotifierService<TSnapshot> are covered once, in
// SendReceiveBlockNotifierServiceTests. This suite covers only what is specific to unsynced
// changes: its wire names, its OpenRPC docs, its payload shape, the forwarding from the tracker's
// Changed event, and the snapshot its command reports.
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesNotifierService"/>: it forwards
    /// <see cref="UnsyncedChangesTracker.Changed"/> to the PAPI as the
    /// <c>paratextBibleSendReceive.onUnsyncedChangesChanged</c> event and answers the
    /// <c>command:paratextBibleSendReceive.getUnsyncedChanges</c> pull command with the tracker's
    /// live state. Uses <see cref="DummyPapiClient"/>, so no live PAPI connection is needed.
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
        private UnsyncedChangesNotifierService _notifier = null!;

        private static UnsyncedChangesTracker CreateTracker() =>
            new(id => id == "A", () => false, () => new[] { "A" }, TimeSpan.Zero);

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _tracker = CreateTracker();
            _notifier = new UnsyncedChangesNotifierService(Client, _tracker);
            await _notifier.InitializeAsync();
            // InitializeAsync emits the current snapshot once; drain it so each test's event
            // assertions see only the transitions that test drives.
            _ = Client.NextSentEvent;
        }

        [TearDown]
        public void TrackerTearDown() => _tracker.Dispose();

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
            var notifier = new UnsyncedChangesNotifierService(client, tracker);

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
            var notifier = new UnsyncedChangesNotifierService(client, tracker);
            await notifier.InitializeAsync();
            _ = client.NextSentEvent; // drop the baseline emit

            tracker.OnWriteScopeExited("A");
            await tracker.FlushAsync();

            Assert.That(client.SentEventCount, Is.EqualTo(1));
            var (eventType, payload) = client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(UnsyncedChangesChangedEvent));
            var state = (UnsyncedChangesState)payload!;
            Assert.That(state.ProjectIds, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task GetUnsyncedChangesCommand_ReturnsTheLiveTrackerState()
        {
            var before = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;
            Assert.That(before.ProjectIds, Is.Empty);

            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            var after = (UnsyncedChangesState)
                Client.InvokeRequestHandler(GetUnsyncedChangesCommand)!;
            Assert.That(after, Is.EqualTo(_tracker.GetState()));
            Assert.That(after.ProjectIds, Is.EquivalentTo(new[] { "A" }));
        }
    }
}
