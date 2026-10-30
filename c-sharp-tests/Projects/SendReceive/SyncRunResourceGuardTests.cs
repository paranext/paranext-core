using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SyncRunResourceGuard"/>: a running sync and a user-started DBL
    /// resource write (install, uninstall) never write the same resource at once — whichever comes
    /// second waits for the other.
    /// <para>
    /// The guard is process-wide state, so every test resets it (TearDown). That is safe because no
    /// fixture in c-sharp-tests is <c>[Parallelizable]</c>.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SyncRunResourceGuardTests
    {
        private const string HeldUid = "97196133a859179b";
        private const string OtherUid = "6c21e835eb8ca3b2";

        /// <summary>
        /// How long a waiter is given to show it is still blocked. Long enough that a waiter that
        /// was going to return at once has done so; the test passes only if it has not.
        /// </summary>
        private static readonly TimeSpan s_stillBlockedWindow = TimeSpan.FromMilliseconds(200);

        /// <summary>Upper bound for a waiter that should return; only reached on a failure.</summary>
        private static readonly TimeSpan s_shouldReturnBound = TimeSpan.FromSeconds(10);

        [TearDown]
        public void TearDown() => SyncRunResourceGuard.ResetForTests();

        private static async Task<bool> FinishesWithin(Task task, TimeSpan bound) =>
            await Task.WhenAny(task, Task.Delay(bound)) == task;

        /// <summary>
        /// Waits until a <see cref="SyncRunResourceGuard.BeginRun"/> on another thread has registered
        /// its run, so a test can act while that run is still waiting for writes to drain.
        /// </summary>
        private static void WaitUntilRunIsRegistered(string uid)
        {
            var elapsed = Stopwatch.StartNew();
            while (!SyncRunResourceGuard.CurrentResourceIds.Contains(uid))
            {
                Assert.That(
                    elapsed.Elapsed,
                    Is.LessThan(s_shouldReturnBound),
                    "run never registered"
                );
                Thread.Sleep(5);
            }
        }

        private static string CaptureConsole(Action action)
        {
            using var output = new StringWriter();
            TextWriter previousOut = Console.Out;
            Console.SetOut(output);
            try
            {
                action();
            }
            finally
            {
                Console.SetOut(previousOut);
            }
            return output.ToString();
        }

        #region A write waits for a run that holds its resource

        [Test]
        public async Task EnterResourceWrite_ReturnsAtOnceWhenNoRunIsActive()
        {
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose());

            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task EnterResourceWrite_IsNotBlockedByARunThatHoldsOtherResources()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(OtherUid).Dispose());

            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task EnterResourceWrite_WaitsForASyncRunThatHoldsItsResource()
        {
            var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose());

            Assert.That(
                await FinishesWithin(write, s_stillBlockedWindow),
                Is.False,
                "the write must wait while the run holds the resource"
            );

            run.Dispose();

            Assert.That(
                await FinishesWithin(write, s_shouldReturnBound),
                Is.True,
                "the write must proceed once the run ends"
            );
        }

        [Test]
        public void EnterResourceWrite_ReturnsWhenTheRunIsDisposedFromAnotherThread()
        {
            var run = SyncRunResourceGuard.BeginRun([HeldUid]);
            var disposer = Task.Run(async () =>
            {
                await Task.Delay(s_stillBlockedWindow);
                run.Dispose();
            });

            // Waits on this thread; the run ends on a pool thread. A timeout would log a warning.
            var log = CaptureConsole(
                () => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose()
            );

            Assert.That(disposer.Wait(s_shouldReturnBound), Is.True);
            Assert.That(log, Does.Contain("waiting").And.Not.Contain("gave up"));
        }

        [Test]
        public async Task EnterResourceWrite_MatchesIdsIgnoringCase()
        {
            var run = SyncRunResourceGuard.BeginRun([HeldUid.ToUpperInvariant()]);

            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose());

            Assert.That(
                await FinishesWithin(write, s_stillBlockedWindow),
                Is.False,
                "the same id in another case is the same resource, so it is held"
            );
            run.Dispose();
            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task EnterResourceWrite_RestartsItsTimeoutForEachRunThatHoldsItsResource()
        {
            // Timeline, from when the write starts waiting on run A:
            //   1.2 s  A ends and B begins on the same uid, with no moment between them
            //   2.0 s  a single budget spanning both runs would expire here
            //   2.6 s  checked: the write must still be waiting, now on B
            //   3.2 s  B's own budget would expire; B ends at 2.6 s, before that
            var budget = TimeSpan.FromSeconds(2);
            SyncRunResourceGuard.WaitTimeout = budget;
            var runA = SyncRunResourceGuard.BeginRun([HeldUid]);
            IDisposable? runB = null;

            using var output = new StringWriter();
            TextWriter previousOut = Console.Out;
            Console.SetOut(output);
            try
            {
                var started = Stopwatch.StartNew();
                var write = Task.Run(
                    () => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose()
                );

                await Task.Delay(TimeSpan.FromMilliseconds(1200));
                // Under the guard's lock, so the write cannot slip in between the two runs.
                SyncRunResourceGuard.InsideGuardLockForTests(() =>
                {
                    runA.Dispose();
                    runB = SyncRunResourceGuard.BeginRun([HeldUid]);
                });

                var untilCheck = budget + TimeSpan.FromMilliseconds(600) - started.Elapsed;
                if (untilCheck > TimeSpan.Zero)
                    await Task.Delay(untilCheck);
                Assert.That(
                    write.IsCompleted,
                    Is.False,
                    "past one budget in total, but B has held the uid for less than one budget"
                );

                runB!.Dispose();
                Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
                await write;
            }
            finally
            {
                Console.SetOut(previousOut);
            }

            Assert.That(
                output.ToString(),
                Does.Contain("waiting").And.Not.Contain("gave up"),
                "the write ended because the runs ended, not because it timed out"
            );
        }

        [Test]
        public void EnterResourceWrite_TimesOutLogsAndProceeds()
        {
            SyncRunResourceGuard.WaitTimeout = TimeSpan.FromMilliseconds(50);
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            var log = CaptureConsole(
                () => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose()
            );

            Assert.That(log, Does.Contain("Warning").And.Contain(HeldUid).And.Contain("anyway"));
        }

        [Test]
        public void WaitTimeout_DefaultsToABoundedWait()
        {
            Assert.That(SyncRunResourceGuard.WaitTimeout, Is.GreaterThan(TimeSpan.Zero));
            Assert.That(SyncRunResourceGuard.WaitTimeout, Is.Not.EqualTo(Timeout.InfiniteTimeSpan));
        }

        #endregion

        #region A starting run waits for writes of its resources

        [Test]
        public async Task BeginRun_WaitsForAWriteOfOneOfItsResourcesToFinish()
        {
            var write = SyncRunResourceGuard.EnterResourceWrite(HeldUid);

            var begin = Task.Run(() => SyncRunResourceGuard.BeginRun([OtherUid, HeldUid]));

            Assert.That(
                await FinishesWithin(begin, s_stillBlockedWindow),
                Is.False,
                "the run must wait while a write of one of its resources is open"
            );

            write.Dispose();

            Assert.That(
                await FinishesWithin(begin, s_shouldReturnBound),
                Is.True,
                "the run must start once the write ends"
            );
            (await begin).Dispose();
        }

        [Test]
        public async Task BeginRun_IsNotBlockedByWritesOfOtherResources()
        {
            using var write = SyncRunResourceGuard.EnterResourceWrite(OtherUid);

            var begin = Task.Run(() => SyncRunResourceGuard.BeginRun([HeldUid]));

            Assert.That(await FinishesWithin(begin, s_shouldReturnBound), Is.True);
            (await begin).Dispose();
        }

        [Test]
        public async Task BeginRun_WaitsForEveryOpenWriteOfTheSameResource()
        {
            var first = SyncRunResourceGuard.EnterResourceWrite(HeldUid);
            var second = SyncRunResourceGuard.EnterResourceWrite(HeldUid);

            var begin = Task.Run(() => SyncRunResourceGuard.BeginRun([HeldUid]));
            first.Dispose();
            first.Dispose(); // a repeat Dispose must not also release the second write

            Assert.That(
                await FinishesWithin(begin, s_stillBlockedWindow),
                Is.False,
                "the second write is still open"
            );

            second.Dispose();

            Assert.That(await FinishesWithin(begin, s_shouldReturnBound), Is.True);
            (await begin).Dispose();
        }

        [Test]
        public async Task BeginRun_MakesNewWritesOfItsResourcesWaitWhileItDrains()
        {
            // Registering before draining is what keeps a stream of installs from starving a sync.
            var inFlight = SyncRunResourceGuard.EnterResourceWrite(HeldUid);
            var begin = Task.Run(() => SyncRunResourceGuard.BeginRun([HeldUid]));
            WaitUntilRunIsRegistered(HeldUid);

            var arriving = Task.Run(
                () => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose()
            );
            Assert.That(
                await FinishesWithin(arriving, s_stillBlockedWindow),
                Is.False,
                "a write arriving after the run registered must wait for the run"
            );

            inFlight.Dispose();
            Assert.That(await FinishesWithin(begin, s_shouldReturnBound), Is.True);
            Assert.That(
                arriving.IsCompleted,
                Is.False,
                "the run is open now; the write still waits"
            );

            (await begin).Dispose();
            Assert.That(await FinishesWithin(arriving, s_shouldReturnBound), Is.True);
        }

        [Test]
        public void BeginRun_TimesOutOnAStuckWriteScopeLogsAndProceeds()
        {
            SyncRunResourceGuard.WaitTimeout = TimeSpan.FromMilliseconds(50);
            var stuck = SyncRunResourceGuard.EnterResourceWrite(HeldUid);
            IDisposable? run = null;

            var log = CaptureConsole(() => run = SyncRunResourceGuard.BeginRun([HeldUid]));

            Assert.That(log, Does.Contain("Warning").And.Contain(HeldUid).And.Contain("anyway"));
            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid }),
                "the run proceeds and holds its resources"
            );
            run!.Dispose();
            stuck.Dispose();
        }

        #endregion

        #region Run lifecycle

        [Test]
        public void BeginRun_WhileARunIsActive_Throws()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            Assert.That(
                () => SyncRunResourceGuard.BeginRun([OtherUid]),
                Throws.InstanceOf<InvalidOperationException>()
            );
            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid }),
                "the rejected run must not replace the active run's ids"
            );
        }

        [Test]
        public void Dispose_Twice_IsHarmless()
        {
            var first = SyncRunResourceGuard.BeginRun([HeldUid]);
            first.Dispose();

            Assert.That(() => first.Dispose(), Throws.Nothing);
        }

        [Test]
        public async Task Dispose_OfAnEndedRun_DoesNotEndALaterRun()
        {
            var first = SyncRunResourceGuard.BeginRun([HeldUid]);
            first.Dispose();
            var second = SyncRunResourceGuard.BeginRun([OtherUid]);

            first.Dispose();

            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { OtherUid }),
                "a stale Dispose must leave the newer run in place"
            );
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(OtherUid).Dispose());
            Assert.That(
                await FinishesWithin(write, s_stillBlockedWindow),
                Is.False,
                "the newer run must still hold its ids"
            );
            second.Dispose();
            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public void CurrentResourceIds_NamesTheActiveRunsIdsAndIsEmptyOtherwise()
        {
            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty, "before any run");

            var run = SyncRunResourceGuard.BeginRun([HeldUid, OtherUid, HeldUid]);
            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid, OtherUid }),
                "while the run is active, each id once"
            );

            run.Dispose();
            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty, "after the run ends");
        }

        [Test]
        public void BeginRun_IgnoresBlankIds()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid, "", "  ", null!]);

            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid })
            );
        }

        [Test]
        public async Task BeginRun_WithNoIds_HoldsNothing()
        {
            using var run = SyncRunResourceGuard.BeginRun([]);

            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty);
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose());
            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task ResetForTests_ReleasesWaitersOnBothSides()
        {
            _ = SyncRunResourceGuard.BeginRun([HeldUid]);
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid));
            Assert.That(await FinishesWithin(write, s_stillBlockedWindow), Is.False);

            SyncRunResourceGuard.ResetForTests();

            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
            var begin = Task.Run(() => SyncRunResourceGuard.BeginRun([HeldUid]));
            Assert.That(
                await FinishesWithin(begin, s_stillBlockedWindow),
                Is.False,
                "the write opened after the reset is still open"
            );

            SyncRunResourceGuard.ResetForTests();

            Assert.That(await FinishesWithin(begin, s_shouldReturnBound), Is.True);
            (await begin).Dispose();
            (await write).Dispose();
        }

        #endregion
    }
}
