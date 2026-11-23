using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="SyncRunResourceGuard.RegisterRunSkippingOpenWrites"/>: a starting
    /// run registers every resource except those a user is writing right now, and never waits.
    /// The guard is process-wide state, so every test resets it (TearDown).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SyncRunResourceGuardSkippingTests
    {
        private const string UidA = "97196133a859179b";
        private const string UidB = "6c21e835eb8ca3b2";
        private const string UidC = "0123456789abcdef";

        private static readonly TimeSpan s_stillBlockedWindow = TimeSpan.FromMilliseconds(200);
        private static readonly TimeSpan s_shouldReturnBound = TimeSpan.FromSeconds(10);

        [TearDown]
        public void TearDown() => SyncRunResourceGuard.ResetForTests();

        private static async Task<bool> FinishesWithin(Task task, TimeSpan bound) =>
            await Task.WhenAny(task, Task.Delay(bound)) == task;

        [Test]
        public void SkipsAnIdWithAnOpenWriteAndRegistersTheRest()
        {
            using var write = SyncRunResourceGuard.EnterResourceWrite(UidA);

            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites(
                [UidA, UidB, UidC]
            );
            using var run = registration.Run;

            Assert.That(registration.SkippedIds, Is.EquivalentTo(new[] { UidA }));
            Assert.That(registration.RegisteredIds, Is.EquivalentTo(new[] { UidB, UidC }));
            Assert.That(registration.Run.ResourceIds, Is.EquivalentTo(new[] { UidB, UidC }));
            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.EquivalentTo(new[] { UidB, UidC }));
        }

        [Test]
        public void SkipsRegardlessOfOrderAndCase()
        {
            using var write = SyncRunResourceGuard.EnterResourceWrite(UidB);

            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites(
                [UidC, UidB.ToUpperInvariant(), UidA, UidB]
            );
            using var run = registration.Run;

            Assert.That(registration.SkippedIds, Has.Count.EqualTo(1));
            Assert.That(
                registration.SkippedIds.Single(),
                Is.EqualTo(UidB.ToUpperInvariant()),
                "the first spelling is kept"
            );
            Assert.That(registration.RegisteredIds, Is.EquivalentTo(new[] { UidC, UidA }));
        }

        [Test]
        public void IgnoresBlankIdsAndDeduplicatesKeepingTheFirstSpelling()
        {
            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites(
                [UidA.ToUpperInvariant(), "", "  ", UidA, UidB]
            );
            using var run = registration.Run;

            Assert.That(
                registration.RegisteredIds,
                Is.EquivalentTo(new[] { UidA.ToUpperInvariant(), UidB })
            );
            Assert.That(registration.SkippedIds, Is.Empty);
        }

        [Test]
        public async Task SkippedId_LaterEnterResourceWriteReturnsAtOnce_RegisteredIdWaitsUntilRunDisposed()
        {
            using var openWrite = SyncRunResourceGuard.EnterResourceWrite(UidA);
            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA, UidB]);

            var skippedWrite = Task.Run(() => SyncRunResourceGuard.EnterResourceWrite(UidA).Dispose());
            Assert.That(await FinishesWithin(skippedWrite, s_shouldReturnBound), Is.True);

            var registeredWrite = Task.Run(
                () => SyncRunResourceGuard.EnterResourceWrite(UidB).Dispose()
            );
            Assert.That(
                await FinishesWithin(registeredWrite, s_stillBlockedWindow),
                Is.False,
                "a write of a registered id waits for the run"
            );

            registration.Run.Dispose();
            Assert.That(await FinishesWithin(registeredWrite, s_shouldReturnBound), Is.True);
        }

        [Test]
        public void TwoOpenScopesOnOneId_SkipUntilBothClose()
        {
            var first = SyncRunResourceGuard.EnterResourceWrite(UidA);
            var second = SyncRunResourceGuard.EnterResourceWrite(UidA);

            first.Dispose();
            var whileOneOpen = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);
            using (whileOneOpen.Run)
                Assert.That(whileOneOpen.SkippedIds, Is.EquivalentTo(new[] { UidA }));

            second.Dispose();
            var afterBoth = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);
            using var afterBothRun = afterBoth.Run;
            Assert.That(afterBoth.SkippedIds, Is.Empty);
            Assert.That(afterBoth.RegisteredIds, Is.EquivalentTo(new[] { UidA }));
        }

        [Test]
        public void AWriteThatClosesAfterRegistration_DoesNotUnSkip()
        {
            var write = SyncRunResourceGuard.EnterResourceWrite(UidA);
            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);
            using var run = registration.Run;

            write.Dispose();

            Assert.That(registration.SkippedIds, Is.EquivalentTo(new[] { UidA }));
            Assert.That(registration.Run.ResourceIds, Is.Empty);
            Assert.That(SyncRunResourceGuard.CurrentResourceIds, Is.Empty);
        }

        [Test]
        public void AllIdsSkipped_RunIsEmptyAndDisposable()
        {
            using var write = SyncRunResourceGuard.EnterResourceWrite(UidA);

            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);

            Assert.That(registration.RegisteredIds, Is.Empty);
            Assert.That(registration.Run.ResourceIds, Is.Empty);
            Assert.DoesNotThrow(() => registration.Run.Dispose());
            Assert.DoesNotThrow(
                () => SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidB]).Run.Dispose()
            );
        }

        [Test]
        public void EmptyInput_GivesAnEmptyRun()
        {
            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([]);
            using var run = registration.Run;

            Assert.That(registration.RegisteredIds, Is.Empty);
            Assert.That(registration.SkippedIds, Is.Empty);
            Assert.That(registration.Run.ResourceIds, Is.Empty);
        }

        [Test]
        public void ThrowsWhenARunIsOpen()
        {
            using var first = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]).Run;

            Assert.Throws<InvalidOperationException>(
                () => SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidB])
            );
        }

        [Test]
        public async Task NeverWaits()
        {
            using var write = SyncRunResourceGuard.EnterResourceWrite(UidA);

            var registering = Task.Run(() =>
                SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA, UidB]).Run.Dispose()
            );

            Assert.That(await FinishesWithin(registering, s_shouldReturnBound), Is.True);
        }

        /// <summary>
        /// A write that arrives between the partition and the run's installation cannot slip in
        /// unnoticed: the test starts it from the guard's after-partition hook, which runs inside
        /// the registration's lock hold. The write thread must block on that lock, then see the
        /// registered run and wait for it — never open a scope while the run holds its id.
        /// </summary>
        [Test]
        public async Task PartitionIsAtomic()
        {
            Thread? writeThread = null;
            var scopeReady = new TaskCompletionSource<IDisposable>();
            SyncRunResourceGuard.AfterPartitionForTests = () =>
            {
                writeThread = new Thread(() =>
                {
                    try
                    {
                        scopeReady.SetResult(SyncRunResourceGuard.EnterResourceWrite(UidA));
                    }
                    catch (Exception ex)
                    {
                        scopeReady.SetException(ex);
                    }
                })
                {
                    IsBackground = true,
                };
                writeThread.Start();
                // Atomic registration: the write thread blocks on the lock this hook runs inside.
                // A split registration lets it finish (or sit waiting) before the hook returns.
                var elapsed = Stopwatch.StartNew();
                while (
                    !scopeReady.Task.IsCompleted
                    && !writeThread.ThreadState.HasFlag(System.Threading.ThreadState.WaitSleepJoin)
                    && elapsed.Elapsed < s_shouldReturnBound
                )
                    Thread.Yield();
            };

            var registration = SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);
            SyncRunResourceGuard.AfterPartitionForTests = null;

            Assert.That(registration.RegisteredIds, Is.EquivalentTo(new[] { UidA }));
            Assert.That(
                await FinishesWithin(scopeReady.Task, s_stillBlockedWindow),
                Is.False,
                "a write that arrived during registration must wait for the registered run"
            );

            registration.Run.Dispose();
            Assert.That(await FinishesWithin(scopeReady.Task, s_shouldReturnBound), Is.True);
            (await scopeReady.Task).Dispose();
        }
    }
}
