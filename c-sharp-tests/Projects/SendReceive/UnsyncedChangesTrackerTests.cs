using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;

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
        // A null value is a check that cannot reach an answer; a missing key is a project that no
        // longer exists (ProjectNotFoundException).
        private Dictionary<string, bool?> _repo = null!;
        private Exception? _detectFailure;
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
            _detectFailure = null;
            _tracker = new UnsyncedChangesTracker(
                id =>
                {
                    Interlocked.Increment(ref _detectCalls);
                    if (_detectFailure is not null)
                        throw _detectFailure;
                    lock (_repo)
                        return _repo.TryGetValue(id, out var v)
                            ? v
                            : throw new ProjectNotFoundException(id);
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
            Assert.That(_events[0].ToSend, Is.EquivalentTo(new[] { "A" }));
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
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
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task SyncEnd_WithoutAnnouncedIds_RechecksAllTracked()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            _tracker.OnWriteScopeExited("B");
            await _tracker.FlushAsync();
            _repo["A"] = false;
            _repo["B"] = true;
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, Array.Empty<string>()));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "B" }));
        }

        [Test]
        public async Task SyncEnd_RechecksOnlyCoveredProjects()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            _repo["A"] = true;
            _repo["B"] = true;

            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "a" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task SyncEnd_ArmWithNoIds_FallsBackToAllTracked()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            _repo["A"] = true;
            _repo["B"] = true;

            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, Array.Empty<string>()));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A", "B" }));
        }

        [Test]
        public async Task SyncEnd_AlwaysRechecksMarkedProjects()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _repo["A"] = false;

            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "B" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.Empty);
        }

        [Test]
        public async Task SyncEnd_ScheduledArmGrowingItsSet_RechecksEveryAnnouncedProject()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            _repo["A"] = true;
            _repo["B"] = true;

            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, new[] { "A" }));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, new[] { "A", "B" }));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A", "B" }));
        }

        [Test]
        public async Task CoveredIds_ResetWhenTheNextSyncBegins()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            _repo["A"] = true;
            _repo["B"] = true;

            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "B" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "B" }));
        }

        [Test]
        public async Task BothSignalsEndingOneSync_RecheckTheSameCoveredSet()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, new[] { "A" }));

            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            _repo["A"] = true;
            _repo["B"] = true;
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(
                _tracker.GetState().ToSend,
                Is.EquivalentTo(new[] { "A" }),
                "the second pass rechecks the covered project and nothing else"
            );
        }

        [Test]
        public async Task SyncEnd_ChecksUnsyncedProjectsFirst()
        {
            // B is enumerated last by the all-projects function, so it is tracked last.
            _repo["B"] = true;
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "B" }));
            int eventsBefore = _events.Count;

            // The sync sends B. A gains changes too, so checking A before B would raise a state
            // that still lists B.
            _repo["B"] = false;
            _repo["A"] = true;
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_events.Count, Is.GreaterThan(eventsBefore));
            Assert.That(_events[eventsBefore].ToSend, Is.Empty, "B is cleared first");
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task RemovedProject_IsDroppedFromSet()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _repo.Remove("A");
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ToSend, Is.Empty);
            Assert.That(_events.Last().ToSend, Is.Empty);
        }

        [Test]
        public async Task FailedCheck_KeepsMarkedProjectMarked()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            int eventsBefore = _events.Count;

            _repo["A"] = null;
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
            Assert.That(_events, Has.Count.EqualTo(eventsBefore), "no state change is raised");
        }

        [Test]
        public async Task DetectThrows_KeepsMarkedProjectMarked()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            _detectFailure = new InvalidOperationException("hg is gone");
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task FailedCheck_LeavesUnmarkedProjectUnmarked()
        {
            _repo["A"] = null;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().ToSend, Is.Empty);
            Assert.That(_events, Is.Empty);
        }

        [Test]
        public async Task BaselineScan_ChecksEveryProject()
        {
            _repo["B"] = true;
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ToSend, Is.EquivalentTo(new[] { "B" }));
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
            // Release the check only once neither trigger's debounce is still pending, so both
            // have landed while the check runs. Otherwise a debounce that fires after the re-run
            // has finished makes a legitimate third check, and the count depends on the schedule.
            Assert.That(
                SpinWait.SpinUntil(() => !tracker.HasPendingDebounce("A"), TimeSpan.FromSeconds(5)),
                Is.True,
                "both triggers landed during the check"
            );
            gate.Set();
            await tracker.FlushAsync();
            Assert.That(calls, Is.EqualTo(2), "one check in flight + exactly one re-run");
        }

        [Test]
        public async Task WriteExit_ForMarkedIdleProject_StartsNoCheck()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            int callsBefore = _detectCalls;

            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();

            Assert.That(_detectCalls, Is.EqualTo(callsBefore));
            Assert.That(_tracker.HasPendingDebounce("A"), Is.False);
        }

        [Test]
        public async Task WriteExit_ForMarkedProjectWithRunningCheck_RequestsRerun()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            int calls = 0;
            using var tracker = new UnsyncedChangesTracker(
                _ =>
                {
                    if (Interlocked.Increment(ref calls) == 2)
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
            await tracker.FlushAsync();
            Assert.That(tracker.GetState().ToSend, Is.EquivalentTo(new[] { "A" }), "A is marked");

            // A sync end starts a second check; it blocks while A is marked.
            tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            Assert.That(started.Wait(TimeSpan.FromSeconds(5)), Is.True, "second check started");
            tracker.OnWriteScopeExited("A");
            Assert.That(
                SpinWait.SpinUntil(() => !tracker.HasPendingDebounce("A"), TimeSpan.FromSeconds(5)),
                Is.True,
                "the write's trigger landed during the check"
            );
            gate.Set();
            await tracker.FlushAsync();

            Assert.That(calls, Is.EqualTo(3), "first check + running check + one re-run");
        }

        [Test]
        public async Task GateDisarm_RechecksMarkedProject()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            _repo["A"] = false;
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().ToSend, Is.Empty);
            Assert.That(_events.Last().ToSend, Is.Empty);
        }

        [Test]
        public async Task GateArm_ChecksNothing()
        {
            _repo["A"] = true;
            _tracker.OnWriteScopeExited("A");
            await _tracker.FlushAsync();
            int callsBefore = _detectCalls;
            int eventsBefore = _events.Count;
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, new[] { "A" }));
            await _tracker.FlushAsync();
            Assert.That(_detectCalls, Is.EqualTo(callsBefore));
            Assert.That(_events, Has.Count.EqualTo(eventsBefore + 1), "only the flag is announced");
            Assert.That(_events.Last().IsRechecking, Is.True);
            Assert.That(_events.Last().ToSend, Is.EquivalentTo(new[] { "A" }));
        }

        [Test]
        public async Task PostSyncPass_ReportsRecheckingWhileItRuns()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            var events = new List<UnsyncedChangesState>();
            using var tracker = new UnsyncedChangesTracker(
                _ =>
                {
                    started.Set();
                    gate.Wait(TimeSpan.FromSeconds(10));
                    return false;
                },
                () => false,
                () => new[] { "A" },
                TimeSpan.Zero
            );
            tracker.Changed += state =>
            {
                lock (events)
                    events.Add(state);
            };
            tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            Assert.That(tracker.GetState().IsRechecking, Is.True, "true from the sync's start");

            tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            Assert.That(started.Wait(TimeSpan.FromSeconds(5)), Is.True, "the recheck started");
            Assert.That(tracker.GetState().IsRechecking, Is.True, "still true mid-pass");

            gate.Set();
            await tracker.FlushAsync();
            Assert.That(tracker.GetState().IsRechecking, Is.False);
            Assert.That(events.Last().IsRechecking, Is.False, "the clearing state was pushed");
        }

        [Test]
        public async Task PostSyncPass_RaisesWhenOnlyTheFlagChanges()
        {
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            Assert.That(_events, Has.Count.EqualTo(1));
            Assert.That(_events[0].IsRechecking, Is.True);

            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_events, Has.Count.EqualTo(2));
            Assert.That(_events[1].IsRechecking, Is.False);
            Assert.That(_events[1].ToSend, Is.Empty, "nothing changed but the flag");
        }

        [Test]
        public async Task BothSignals_RecheckingStaysTrueUntilBothEnd()
        {
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(true, new[] { "A" }));

            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(
                _tracker.GetState().IsRechecking,
                Is.True,
                "the run marker still reports a sync"
            );

            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();
            Assert.That(_tracker.GetState().IsRechecking, Is.False);
            Assert.That(_events.Last().IsRechecking, Is.False);
        }

        [Test]
        public async Task PostSyncRecheck_OfProjectChecked_ElsewhereKeepsRecheckingUntilItRuns()
        {
            using var gate = new ManualResetEventSlim(false);
            using var started = new ManualResetEventSlim(false);
            var events = new List<UnsyncedChangesState>();
            int calls = 0;
            using var tracker = new UnsyncedChangesTracker(
                _ =>
                {
                    if (Interlocked.Increment(ref calls) == 1)
                    {
                        started.Set();
                        gate.Wait(TimeSpan.FromSeconds(10));
                    }
                    return false;
                },
                () => false,
                () => new[] { "A" },
                TimeSpan.Zero
            );
            tracker.Changed += state =>
            {
                lock (events)
                    events.Add(state);
            };
            tracker.OnWriteScopeExited("A");
            Assert.That(started.Wait(TimeSpan.FromSeconds(5)), Is.True, "debounced check running");

            // The sync-end pass finds A's check already running, so its own recheck stays queued
            // behind that check.
            tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));

            Assert.That(
                SpinWait.SpinUntil(
                    () => !tracker.GetState().IsRechecking,
                    TimeSpan.FromMilliseconds(500)
                ),
                Is.False,
                "still rechecking while A's queued recheck has not run"
            );

            gate.Set();
            await tracker.FlushAsync();

            Assert.That(calls, Is.EqualTo(2), "running check + the queued re-run");
            Assert.That(tracker.GetState().IsRechecking, Is.False);
            lock (events)
                Assert.That(events.Last().IsRechecking, Is.False, "the clearing state was pushed");
        }

        [Test]
        public async Task FailedCheck_StillClearsRechecking()
        {
            _detectFailure = new InvalidOperationException("hg is gone");
            _tracker.OnSyncActivityChanged(new SyncActivityState(true, new[] { "A" }));
            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            Assert.That(_tracker.GetState().IsRechecking, Is.False);
            Assert.That(_events.Last().IsRechecking, Is.False);
        }

        [Test]
        public async Task SyncEndFromBothSignals_ChecksEachProjectAtMostTwice()
        {
            _tracker.StartBaselineScan();
            await _tracker.FlushAsync();
            int callsBefore = _detectCalls;

            _tracker.OnSyncActivityChanged(new SyncActivityState(false, Array.Empty<string>()));
            _tracker.OnBlockStateChanged(new SendReceiveBlockState(false, Array.Empty<string>()));
            await _tracker.FlushAsync();

            int extraCalls = _detectCalls - callsBefore;
            Assert.That(extraCalls, Is.InRange(_repo.Count, 2 * _repo.Count));
        }

        [Test]
        public void IsAnySyncActive_ReadsTheWriteGate()
        {
            using var client = new DummyPapiClient();
            using var projects = new DummyLocalParatextProjects();
            var service = new ParatextProjectSendReceiveService(
                client,
                new ParatextProjectDataProviderFactory(client, projects),
                new AppInfo("test", "1.0.0", "test"),
                projects
            );
            try
            {
                Assert.That(UnsyncedChangesTracker.IsAnySyncActive(service), Is.False);
                long token = SendReceiveWriteLock.SetSyncing(["proj-a"]);
                Assert.That(UnsyncedChangesTracker.IsAnySyncActive(service), Is.True);
                SendReceiveWriteLock.Clear(token);
                Assert.That(UnsyncedChangesTracker.IsAnySyncActive(service), Is.False);
            }
            finally
            {
                SendReceiveWriteLock.Clear();
            }
        }

        [Test]
        public void StartAndDispose_SubscribeAndUnsubscribeAllThreeSignals()
        {
            using var client = new DummyPapiClient();
            using var projects = new DummyLocalParatextProjects();
            var service = new ParatextProjectSendReceiveService(
                client,
                new ParatextProjectDataProviderFactory(client, projects),
                new AppInfo("test", "1.0.0", "test"),
                projects
            );
            var tracker = new UnsyncedChangesTracker(service, projects);
            try
            {
                tracker.Start();
                tracker.Start(); // idempotent: still one subscription per event
                Assert.That(SubscriptionsOf(tracker, service), Is.EqualTo((1, 1, 1)));
                tracker.Dispose();
                Assert.That(SubscriptionsOf(tracker, service), Is.EqualTo((0, 0, 0)));
            }
            finally
            {
                tracker.Dispose();
            }
        }

        // Counts the tracker's handlers on each event's backing field: the events cannot be read
        // from outside their declaring types.
        private static (int WriteExits, int GateChanges, int SyncActivity) SubscriptionsOf(
            UnsyncedChangesTracker tracker,
            ParatextProjectSendReceiveService service
        ) =>
            (
                CountHandlers(typeof(SendReceiveWriteLock), null, "WriteScopeExited", tracker),
                CountHandlers(typeof(SendReceiveWriteLock), null, "BlockStateChanged", tracker),
                CountHandlers(service.GetType(), service, "SyncActivityChanged", tracker)
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
