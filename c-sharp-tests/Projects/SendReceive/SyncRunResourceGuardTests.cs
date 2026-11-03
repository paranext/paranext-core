using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SyncRunResourceGuard"/>: a running sync and a user-started DBL
    /// resource write (install, uninstall) never write the same resource at once: a user write waits
    /// for a run that holds its resource.
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
            using var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);

            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(OtherUid).Dispose());

            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task EnterResourceWrite_WaitsForASyncRunThatHoldsItsResource()
        {
            var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);

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
            var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
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
            var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid.ToUpperInvariant()]);

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
            //   2 s  A ends and B begins on the same uid, with no moment between them
            //   4 s  a single budget spanning both runs would expire here
            //   5 s  checked: the write must still be waiting, now on B
            //   6 s  B's own budget would expire; B ends at 5 s, before that
            // Every step has a full second of slack, so a slow machine (a late swap, a late check, a
            // write that starts waiting late) cannot make it fail.
            var budget = TimeSpan.FromSeconds(4);
            SyncRunResourceGuard.WaitTimeout = budget;
            var runA = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
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

                await Task.Delay(budget / 2);
                // Under the guard's lock, so the write cannot slip in between the two runs.
                SyncRunResourceGuard.InsideGuardLockForTests(() =>
                {
                    runA.Dispose();
                    runB = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
                });

                var untilCheck = budget + TimeSpan.FromSeconds(1) - started.Elapsed;
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
            using var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);

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

        #region Run lifecycle

        [Test]
        public void RegisterRun_WhileARunIsActive_Throws()
        {
            using var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);

            Assert.That(
                () => SyncRunResourceGuardTestHelpers.StartRun([OtherUid]),
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
            var first = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
            first.Dispose();

            Assert.That(() => first.Dispose(), Throws.Nothing);
        }

        [Test]
        public async Task Dispose_OfAnEndedRun_DoesNotEndALaterRun()
        {
            var first = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
            first.Dispose();
            var second = SyncRunResourceGuardTestHelpers.StartRun([OtherUid]);

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

            var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid, OtherUid, HeldUid]);
            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid, OtherUid }),
                "while the run is active, each id once"
            );

            run.Dispose();
            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty, "after the run ends");
        }

        [Test]
        public void RegisterRun_IgnoresBlankIds()
        {
            using var run = SyncRunResourceGuardTestHelpers.StartRun([HeldUid, "", "  ", null!]);

            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { HeldUid })
            );
        }

        [Test]
        public async Task RegisterRun_WithNoIds_HoldsNothing()
        {
            using var run = SyncRunResourceGuardTestHelpers.StartRun([]);

            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty);
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid).Dispose());
            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
        }

        [Test]
        public async Task ResetForTests_ReleasesAWaitingWriteAndForgetsOpenWrites()
        {
            _ = SyncRunResourceGuardTestHelpers.StartRun([HeldUid]);
            var write = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(HeldUid));
            Assert.That(await FinishesWithin(write, s_stillBlockedWindow), Is.False);

            SyncRunResourceGuard.ResetForTests();

            Assert.That(await FinishesWithin(write, s_shouldReturnBound), Is.True);
            var openWrite = await write;
            SyncRunResourceGuard.ResetForTests();

            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([HeldUid]);
            Assert.That(
                registration.SkippedIds,
                Is.Empty,
                "a reset forgets the write scope that was open before it"
            );
            registration.Run.Dispose();
            openWrite.Dispose();
        }

        #endregion
    }
}
