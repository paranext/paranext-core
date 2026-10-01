using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesTracker"/> through its test constructor: a
    /// dictionary-backed detector the test mutates, a zero debounce, and
    /// <see cref="UnsyncedChangesTracker.FlushAsync"/> to await all scheduled work.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnsyncedChangesTrackerTests
    {
        private Dictionary<string, bool?> _repo = null!;
        private bool _syncing;
        private List<UnsyncedChangesState> _events = null!;
        private UnsyncedChangesTracker _tracker = null!;
        private int _detectCalls;

        [SetUp]
        public void SetUp()
        {
            _repo = new(StringComparer.OrdinalIgnoreCase) { ["A"] = false, ["B"] = false };
            _syncing = false;
            _events = [];
            _detectCalls = 0;
            _tracker = new UnsyncedChangesTracker(
                id =>
                {
                    Interlocked.Increment(ref _detectCalls);
                    lock (_repo)
                        return _repo.TryGetValue(id, out var v) ? v : null;
                },
                () => _syncing,
                () =>
                {
                    lock (_repo)
                        return _repo.Keys.ToList();
                },
                TimeSpan.Zero
            );
            _tracker.Changed += state =>
            {
                lock (_events)
                    _events.Add(state);
            };
        }

        [TearDown]
        public void TearDown() => _tracker.Dispose();

        [Test]
        public async Task WriteExit_MarksProjectUnsynced_AndRaisesOnce()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("a");
            _tracker.OnWriteScopeExited("a");
            await _tracker.FlushAsync();
            Assert.That(_events, Has.Count.EqualTo(1));
            Assert.That(_events[0].ProjectIds, Is.EquivalentTo(new[] { "A" }));
            Assert.That(_tracker.GetState().ProjectIds, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task UnchangedResult_DoesNotRaise()
        {
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            Assert.That(_events, Is.Empty);
        }

        [Test]
        public async Task WhileSyncing_DefersChecks()
        {
            _syncing = true;
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            Assert.That(_detectCalls, Is.Zero);
        }

        [Test]
        public async Task WhileSyncing_DeferredWrite_IsCheckedAtSyncEnd()
        {
            _syncing = true;
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            _syncing = false;
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_detectCalls, Is.EqualTo(1));
            Assert.That(_tracker.GetState().ProjectIds, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task SyncEnd_RechecksAllTracked()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _repo["A"] = false;
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ProjectIds, Is.Empty);
            Assert.That(_events.Last().ProjectIds, Is.Empty);
        }

        [Test]
        public async Task UnknownProject_IsDroppedFromSet()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _repo.Remove("A");
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ProjectIds, Is.Empty);
        }

        [Test]
        public async Task BaselineScan_ChecksEveryProject()
        {
            _repo["B"] = true;
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ProjectIds, Is.EquivalentTo(new[] { "B" }));
            Assert.That(_detectCalls, Is.EqualTo(2));
        }

        [Test]
        public async Task WriteDuringCheck_RequeuesOneMoreRun()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            int calls = 0;
            using var tracker = new UnsyncedChangesTracker(
                _ =>
                {
                    if (Interlocked.Increment(ref calls) == 1)
                    {
                        started.Set();
                        gate.Wait();
                    }
                    return true;
                },
                () => false,
                () => new[] { "A" },
                TimeSpan.Zero
            );
            tracker.OnWriteScopeExited("A");
            Assert.That(started.Wait(TimeSpan.FromSeconds(5)), Is.True, "first check started");
            tracker.OnWriteScopeExited("A");
            tracker.OnWriteScopeExited("A");
            gate.Set();
            await tracker.FlushAsync();
            Assert.That(calls, Is.EqualTo(2), "one check in flight + exactly one re-run");
        }
    }
}
