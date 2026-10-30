using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SyncRunResourceGuard"/>: a running sync declares the DBL resources
    /// it will update, and a DBL install of one of them waits for that run to end.
    /// <para>
    /// The guard is process-wide state, so every test ends any run it left open (TearDown). That is
    /// safe because no fixture in c-sharp-tests is <c>[Parallelizable]</c>.
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

        [Test]
        public void WaitIfHeld_ReturnsAtOnceWhenNoRunIsActive()
        {
            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(HeldUid, TimeSpan.FromSeconds(30)),
                Is.True
            );
        }

        [Test]
        public void WaitIfHeld_ReturnsAtOnceForAnIdTheRunDoesNotHold()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            // The timeout is the alarm: if the other id were treated as held, this would block for
            // the full 30 seconds and then return false.
            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(OtherUid, TimeSpan.FromSeconds(30)),
                Is.True
            );
        }

        [Test]
        public async Task WaitIfHeld_BlocksUntilTheRunIsDisposed()
        {
            var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            var waiter = Task.Run(
                () => SyncRunResourceGuard.WaitIfHeld(HeldUid, s_shouldReturnBound)
            );

            Assert.That(
                await Task.WhenAny(waiter, Task.Delay(s_stillBlockedWindow)),
                Is.Not.SameAs(waiter),
                "the wait must block while the run holds the id"
            );

            run.Dispose();

            Assert.That(
                await Task.WhenAny(waiter, Task.Delay(s_shouldReturnBound)),
                Is.SameAs(waiter),
                "the wait must end once the run is disposed"
            );
            Assert.That(await waiter, Is.True, "a wait that ended with the run is not a timeout");
        }

        [Test]
        public void WaitIfHeld_ReturnsWhenTheRunIsDisposedFromAnotherThread()
        {
            var run = SyncRunResourceGuard.BeginRun([HeldUid]);
            var disposer = Task.Run(async () =>
            {
                await Task.Delay(s_stillBlockedWindow);
                run.Dispose();
            });

            // Waits on this thread; the run ends on a pool thread.
            Assert.That(SyncRunResourceGuard.WaitIfHeld(HeldUid, s_shouldReturnBound), Is.True);
            Assert.That(disposer.Wait(s_shouldReturnBound), Is.True);
        }

        [Test]
        public void WaitIfHeld_MatchesIdsIgnoringCase()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid.ToUpperInvariant()]);

            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(HeldUid, TimeSpan.FromMilliseconds(50)),
                Is.False,
                "the same id in another case is the same resource, so it is held"
            );
        }

        [Test]
        public void WaitIfHeld_TimesOutAndReturnsFalse()
        {
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(HeldUid, TimeSpan.FromMilliseconds(50)),
                Is.False
            );
        }

        [Test]
        public void WaitIfHeld_WithoutATimeoutUsesWaitTimeout()
        {
            SyncRunResourceGuard.WaitTimeout = TimeSpan.FromMilliseconds(50);
            using var run = SyncRunResourceGuard.BeginRun([HeldUid]);

            Assert.That(SyncRunResourceGuard.WaitIfHeld(HeldUid), Is.False);
        }

        [Test]
        public void WaitTimeout_DefaultsToABoundedWait()
        {
            Assert.That(SyncRunResourceGuard.WaitTimeout, Is.GreaterThan(TimeSpan.Zero));
            Assert.That(SyncRunResourceGuard.WaitTimeout, Is.Not.EqualTo(Timeout.InfiniteTimeSpan));
        }

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
        public void Dispose_OfAnEndedRun_DoesNotEndALaterRun()
        {
            var first = SyncRunResourceGuard.BeginRun([HeldUid]);
            first.Dispose();
            using var second = SyncRunResourceGuard.BeginRun([OtherUid]);

            first.Dispose();

            Assert.That(
                SyncRunResourceGuard.CurrentResourceIds,
                Is.EquivalentTo(new[] { OtherUid }),
                "a stale Dispose must leave the newer run in place"
            );
            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(OtherUid, TimeSpan.FromMilliseconds(50)),
                Is.False,
                "the newer run must still hold its ids"
            );
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
        public void BeginRun_WithNoIds_HoldsNothing()
        {
            using var run = SyncRunResourceGuard.BeginRun([]);

            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty);
            Assert.That(
                SyncRunResourceGuard.WaitIfHeld(HeldUid, TimeSpan.FromSeconds(30)),
                Is.True
            );
        }

        [Test]
        public async Task ResetForTests_ReleasesAWaiter()
        {
            _ = SyncRunResourceGuard.BeginRun([HeldUid]);
            var waiter = Task.Run(
                () => SyncRunResourceGuard.WaitIfHeld(HeldUid, s_shouldReturnBound)
            );
            await Task.Delay(s_stillBlockedWindow);

            SyncRunResourceGuard.ResetForTests();

            Assert.That(
                await Task.WhenAny(waiter, Task.Delay(s_shouldReturnBound)),
                Is.SameAs(waiter)
            );
        }
    }
}
