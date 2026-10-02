using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="RemoteChangesPoller"/> through its test constructor: a fake fetch
    /// backed by fields the test mutates, timers that never fire on their own, and
    /// <see cref="RemoteChangesPoller.FlushAsync"/> to await the poll(s) a test triggered.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RemoteChangesPollerTests
    {
        // Bounds every wait, so a regression fails the test instead of hanging the run.
        private static readonly TimeSpan s_bound = TimeSpan.FromSeconds(10);

        private volatile IReadOnlyCollection<string>? _next;
        private volatile bool _syncing;
        private volatile bool _internet;
        private int _fetchCalls;
        private int _events;
        private RemoteChangesPoller _poller = null!;

        [SetUp]
        public void SetUp()
        {
            _next = [];
            _syncing = false;
            _internet = true;
            _fetchCalls = 0;
            _events = 0;
            _poller = CreatePoller(() =>
            {
                Interlocked.Increment(ref _fetchCalls);
                return _next;
            });
        }

        [TearDown]
        public void TearDown() => _poller.Dispose();

        [Test]
        public async Task Tick_PublishesServerSet()
        {
            _next = ["a"];
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_poller.GetState(), Is.EquivalentTo(new[] { "A" }), "ids are upper-cased");
            Assert.That(_events, Is.EqualTo(1));
        }

        [Test]
        public async Task Tick_UnchangedSet_DoesNotRaise()
        {
            _next = ["A"];
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            _next = ["a"]; // same set by value
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.EqualTo(2));
            Assert.That(_events, Is.EqualTo(1));
        }

        [Test]
        public async Task FailedFetch_KeepsPreviousSet()
        {
            _next = ["A"];
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            _next = null;
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.EqualTo(2));
            Assert.That(_poller.GetState(), Is.EquivalentTo(new[] { "A" }));
            Assert.That(_events, Is.EqualTo(1));
        }

        [Test]
        public async Task ThrowingFetch_KeepsPreviousSet()
        {
            bool fail = false;
            using var poller = CreatePoller(
                () =>
                    fail ? throw new InvalidOperationException("server unreachable") : new[] { "A" }
            );
            poller.Tick();
            await poller.FlushAsync().WaitAsync(s_bound);
            fail = true;
            poller.Tick();
            await poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(poller.GetState(), Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task WhileSyncing_TickIsSkipped()
        {
            _syncing = true;
            _next = ["A"];
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.Zero);
            Assert.That(_poller.GetState(), Is.Empty);
        }

        [Test]
        public async Task InternetDisabled_SkipsAndKeepsSet()
        {
            _next = ["A"];
            _poller.Tick();
            await _poller.FlushAsync().WaitAsync(s_bound);
            _internet = false;
            _next = [];
            _poller.Tick();
            _poller.OnSyncEnded();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.EqualTo(1));
            Assert.That(_poller.GetState(), Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task SyncEnd_Polls()
        {
            _next = ["B"];
            _poller.OnSyncEnded();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.EqualTo(1));
            Assert.That(_poller.GetState(), Is.EquivalentTo(new[] { "B" }));
        }

        [Test]
        public async Task Start_PollsAfterFirstDelay()
        {
            using var poller = new RemoteChangesPoller(
                () =>
                {
                    Interlocked.Increment(ref _fetchCalls);
                    return ["A"];
                },
                () => false,
                () => true,
                TimeSpan.FromMilliseconds(10),
                Timeout.InfiniteTimeSpan
            );
            poller.Start();
            Assert.That(
                SpinWait.SpinUntil(
                    () => Volatile.Read(ref _fetchCalls) == 1,
                    TimeSpan.FromSeconds(5)
                ),
                Is.True,
                "the timer ran the first poll"
            );
            await poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(poller.GetState(), Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task TickWhilePolling_IsDropped()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            int calls = 0;
            using var poller = CreatePoller(() =>
            {
                Interlocked.Increment(ref calls);
                started.Set();
                gate.Wait(s_bound);
                return ["A"];
            });
            try
            {
                poller.Tick();
                Assert.That(started.Wait(s_bound), Is.True, "first poll started");
                poller.Tick();
                poller.Tick();
            }
            finally
            {
                gate.Set();
            }
            await poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(calls, Is.EqualTo(1), "ticks during a poll are dropped, not queued");
        }

        [Test]
        public async Task SyncEndDuringPoll_DiscardsStaleResult()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            int calls = 0;
            var raisedStates = new List<string[]>();
            using var poller = CreatePoller(() =>
            {
                if (Interlocked.Increment(ref calls) == 1)
                {
                    started.Set();
                    gate.Wait(s_bound);
                    return ["OLD"];
                }
                return ["NEW"];
            });
            poller.Changed += () =>
            {
                lock (raisedStates)
                    raisedStates.Add([.. poller.GetState()]);
            };
            try
            {
                poller.Tick();
                Assert.That(started.Wait(s_bound), Is.True, "first poll started");
                poller.OnSyncEnded();
            }
            finally
            {
                gate.Set();
            }
            await poller.FlushAsync().WaitAsync(s_bound);

            Assert.That(calls, Is.EqualTo(2), "one follow-up poll after the stale one");
            Assert.That(poller.GetState(), Is.EquivalentTo(new[] { "NEW" }));
            Assert.That(
                raisedStates.SelectMany(state => state),
                Has.No.Member("OLD"),
                "the stale result was never published"
            );
            Assert.That(raisedStates, Has.Count.EqualTo(1));
        }

        [Test]
        public void Dispose_Unsubscribes()
        {
            using var client = new DummyPapiClient();
            using var projects = new DummyLocalParatextProjects();
            var service = new ParatextProjectSendReceiveService(
                client,
                new ParatextProjectDataProviderFactory(client, projects),
                new AppInfo("test", "1.0.0", "test"),
                projects
            );
            var poller = new RemoteChangesPoller(service, projects);
            try
            {
                poller.Start();
                poller.Start(); // idempotent: still one subscription per event
                Assert.That(SubscriptionsOf(poller, service), Is.EqualTo((1, 1)));
                poller.Dispose();
                Assert.That(SubscriptionsOf(poller, service), Is.EqualTo((0, 0)));
            }
            finally
            {
                poller.Dispose();
            }
        }

        [Test]
        public async Task Dispose_StopsPolling()
        {
            _next = ["A"];
            _poller.Dispose();
            _poller.Start();
            _poller.Tick();
            _poller.OnSyncEnded();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.Zero);
            Assert.That(_poller.GetState(), Is.Empty);
        }

        [Test]
        public async Task Start_PollsAgainAfterInterval()
        {
            using var secondPoll = new ManualResetEventSlim(false);
            int calls = 0;
            using var poller = new RemoteChangesPoller(
                () =>
                {
                    if (Interlocked.Increment(ref calls) >= 2)
                        secondPoll.Set();
                    return ["A"];
                },
                () => false,
                () => true,
                TimeSpan.FromMilliseconds(20),
                TimeSpan.FromMilliseconds(20)
            );
            poller.Start();
            Assert.That(
                secondPoll.Wait(TimeSpan.FromSeconds(5)),
                Is.True,
                "the timer polled twice"
            );
            poller.Dispose();
            await poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(Volatile.Read(ref calls), Is.GreaterThanOrEqualTo(2));
        }

        [Test]
        public async Task SyncEnd_WhileOtherSignalStillSyncing_IsSkipped()
        {
            _next = ["A"];
            _syncing = true;
            _poller.OnSyncEnded();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.Zero);
            Assert.That(_poller.GetState(), Is.Empty);

            // The other source's own end signal arrives once it reads idle.
            _syncing = false;
            _poller.OnSyncEnded();
            await _poller.FlushAsync().WaitAsync(s_bound);
            Assert.That(_fetchCalls, Is.EqualTo(1));
            Assert.That(_poller.GetState(), Is.EquivalentTo(new[] { "A" }));
        }

        private RemoteChangesPoller CreatePoller(Func<IReadOnlyCollection<string>?> fetch)
        {
            var poller = new RemoteChangesPoller(
                fetch,
                () => _syncing,
                () => _internet,
                Timeout.InfiniteTimeSpan,
                Timeout.InfiniteTimeSpan
            );
            poller.Changed += () => Interlocked.Increment(ref _events);
            return poller;
        }

        // Counts the poller's handlers on each event's backing field: the events cannot be read
        // from outside their declaring types.
        private static (int GateChanges, int SyncActivity) SubscriptionsOf(
            RemoteChangesPoller poller,
            ParatextProjectSendReceiveService service
        ) =>
            (
                CountHandlers(typeof(SendReceiveWriteLock), null, "BlockStateChanged", poller),
                CountHandlers(service.GetType(), service, "SyncActivityChanged", poller)
            );

        private static int CountHandlers(Type type, object? owner, string eventName, object target)
        {
            var field = type.GetField(
                eventName,
                BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance
            );
            Assert.That(field, Is.Not.Null, $"backing field for {eventName}");
            var handlers = (Delegate?)field!.GetValue(owner);
            return handlers?.GetInvocationList().Count(handler => handler.Target == target) ?? 0;
        }
    }
}
