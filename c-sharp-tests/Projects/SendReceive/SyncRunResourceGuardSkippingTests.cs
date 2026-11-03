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
        /// A write racing the registration is either skipped by it or waits on the registered run,
        /// never both unregistered and unwaited. The race is forced into both orders by holding the
        /// guard's lock so the two operations queue up behind it, then releasing them together.
        /// </summary>
        [TestCase(true)]
        [TestCase(false)]
        public async Task PartitionIsAtomic(bool writeQueuesFirst)
        {
            Task<IDisposable>? writeTask = null;
            Task<RunRegistration>? registerTask = null;
            using var writeStarted = new ManualResetEventSlim(false);
            using var registerStarted = new ManualResetEventSlim(false);

            Task<IDisposable> StartWrite() =>
                Task.Run(() =>
                {
                    writeStarted.Set();
                    return SyncRunResourceGuard.EnterResourceWrite(UidA);
                });
            Task<RunRegistration> StartRegister() =>
                Task.Run(() =>
                {
                    registerStarted.Set();
                    return SyncRunResourceGuard.RegisterRunSkippingOpenWrites([UidA]);
                });

            // Both operations are started while the lock is held, in the chosen order, so each
            // blocks on the lock and runs after it is released.
            SyncRunResourceGuard.InsideGuardLockForTests(() =>
            {
                if (writeQueuesFirst)
                {
                    writeTask = StartWrite();
                    writeStarted.Wait(s_shouldReturnBound);
                    Thread.Sleep(50);
                    registerTask = StartRegister();
                    registerStarted.Wait(s_shouldReturnBound);
                }
                else
                {
                    registerTask = StartRegister();
                    registerStarted.Wait(s_shouldReturnBound);
                    Thread.Sleep(50);
                    writeTask = StartWrite();
                    writeStarted.Wait(s_shouldReturnBound);
                }
                Thread.Sleep(50);
            });

            var registration = await registerTask!;
            var registered = registration.RegisteredIds.Contains(UidA);
            var skipped = registration.SkippedIds.Contains(UidA);
            Assert.That(registered ^ skipped, Is.True, "an id is exactly one of registered or skipped");

            if (skipped)
            {
                // The write got in first: it holds a scope, and the run must not hold the id.
                Assert.That(await FinishesWithin(writeTask!, s_shouldReturnBound), Is.True);
                Assert.That(registration.Run.ResourceIds, Does.Not.Contain(UidA));
                (await writeTask!).Dispose();
            }
            else
            {
                // The run got in first: the write must be waiting on it, not unwaited.
                Assert.That(
                    await FinishesWithin(writeTask!, s_stillBlockedWindow),
                    Is.False,
                    "a write of a registered id waits for the run"
                );
                registration.Run.Dispose();
                Assert.That(await FinishesWithin(writeTask!, s_shouldReturnBound), Is.True);
                (await writeTask!).Dispose();
            }
            registration.Run.Dispose();
        }
    }
}
