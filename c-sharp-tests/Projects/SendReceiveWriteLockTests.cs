using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for the process-wide <see cref="SendReceiveWriteLock"/> write-gate. Every test
    /// fully resets the (static) gate before and after — including the in-flight count, which a
    /// production <c>Clear</c> deliberately leaves alone — so a test that leaks a scope cannot
    /// poison later tests with full-DrainTimeout drains. The fixture runs single-threaded (no
    /// NUnit parallelism), so the shared static gate is never touched concurrently across tests.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockTests
    {
        [SetUp]
        public void SetUp() => SendReceiveWriteLock.ResetForTests();

        [TearDown]
        public void TearDown() => SendReceiveWriteLock.ResetForTests();

        // ---- IsBlocked (pure per-project data) ----

        [Test]
        public void IsBlocked_NothingSyncing_ReturnsFalse()
        {
            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
        }

        [Test]
        public void IsBlocked_ProjectSyncing_ReturnsTrueForThatProjectOnly()
        {
            SendReceiveWriteLock.SetSyncing(["projectA", "projectB"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectC"), Is.False);
            });
        }

        [Test]
        public void IsBlocked_ProjectIdCasingDiffers_StillBlocked()
        {
            SendReceiveWriteLock.SetSyncing(["AbCdEf123"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("abcdef123"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("ABCDEF123"), Is.True);
            });
        }

        [Test]
        public void IsBlocked_NullOrEmptyProjectId_ReturnsFalse()
        {
            SendReceiveWriteLock.SetSyncing(["projectA"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked(null), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked(string.Empty), Is.False);
            });
        }

        [Test]
        public void SetSyncing_CalledAgain_ReplacesPreviousSet()
        {
            // Re-arming while already armed just swaps the armed set (one global sync slot).
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            SendReceiveWriteLock.SetSyncing(["projectB"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.True);
            });
        }

        [Test]
        public void Clear_AfterSetSyncing_UnblocksEverything()
        {
            SendReceiveWriteLock.SetSyncing(["projectA", "projectB"]);
            SendReceiveWriteLock.Clear();

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.False);
            });
        }

        // ---- EnterWrite scope (the in-flight write side) ----

        [Test]
        public void EnterWrite_NotArmed_ReturnsScope_AndReleasesOnDispose()
        {
            var scope = SendReceiveWriteLock.EnterWrite("projectA");
            Assert.That(scope, Is.Not.Null);
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(1));

            scope.Dispose();

            // The count — the exact value a sync's drain waits on — proves the release.
            // (Re-entering would prove nothing: EnterWrite only consults the armed flag.)
            Assert.That(
                SendReceiveWriteLock.InFlightWriteCount,
                Is.Zero,
                "dispose must release the in-flight write"
            );
        }

        [Test]
        public void EnterWrite_DoubleDispose_IsSafe()
        {
            // Hold a SECOND scope open so a broken double-dispose (decrementing twice) shows up in
            // the count instead of being absorbed by the underflow guard at count zero.
            var scope = SendReceiveWriteLock.EnterWrite("projectA");
            using var otherScope = SendReceiveWriteLock.EnterWrite("projectB");
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(2));

            scope.Dispose();

            // Second dispose must be a no-op (never decrement the in-flight count twice).
            Assert.DoesNotThrow(scope.Dispose);
            Assert.That(
                SendReceiveWriteLock.InFlightWriteCount,
                Is.EqualTo(1),
                "the second dispose must not release the OTHER scope's in-flight count"
            );
        }

        [Test]
        public void EnterWrite_NullProjectId_Throws()
        {
            Assert.Throws<ArgumentNullException>(() => SendReceiveWriteLock.EnterWrite(null!));
        }

        [Test]
        public void EnterWrite_Armed_ThrowsWithSentinel()
        {
            // A sync is armed (the gate has no thread affinity, so arming on the test thread is
            // exactly what production writes would observe from any thread).
            SendReceiveWriteLock.SetSyncing(["projectA"]);

            var ex = Assert.Throws<InvalidOperationException>(
                () => SendReceiveWriteLock.EnterWrite("projectA")
            );
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        [Test]
        public void EnterWrite_WhileAnotherProjectSyncs_RejectsAllProjects_GlobalGate()
        {
            // The write gate is GLOBAL (a single process-wide gate): while a sync is armed, writes
            // to EVERY project fail fast, not just the syncing one. This is the intended coarse
            // exclusion (a sync is globally exclusive). IsBlocked stays per-project pure data, so it
            // is deliberately narrower than the gate.
            SendReceiveWriteLock.SetSyncing(["projectA"]);

            Assert.Multiple(() =>
            {
                Assert.That(
                    SendReceiveWriteLock.IsBlocked("projectB"),
                    Is.False,
                    "IsBlocked is per-project pure data — projectB is not in the armed set"
                );
                var ex = Assert.Throws<InvalidOperationException>(
                    () => SendReceiveWriteLock.EnterWrite("projectB")
                );
                Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
            });
        }

        // ---- Forgiving lifecycle contract (no thread affinity, no recursion policy) ----

        [Test]
        public void EnterWrite_NestedOnSameThread_BothScopesSucceed()
        {
            // While nothing is armed, a nested EnterWrite must not crash or deadlock (there is no
            // recursion policy) — the inner scope just counts as one more in-flight write. See
            // EnterWrite_NestedWhileSyncArmed_InnerThrowsSentinel for why nesting is still NOT a
            // safe pattern around a live sync.
            using var outer = SendReceiveWriteLock.EnterWrite("projectA");

            Assert.DoesNotThrow(() =>
            {
                using var inner = SendReceiveWriteLock.EnterWrite("projectB");
            });
        }

        [Test]
        public void EnterWrite_NestedWhileSyncArmed_InnerThrowsSentinel()
        {
            // Pins the nesting hazard the docs warn about: the gate tracks no ownership, so once a
            // sync arms — here on the degraded path, since the outer scope on this thread can
            // never drain — a nested EnterWrite inside an open outer scope is rejected
            // MID-mutation. This is why delegating methods must call an un-gated core inside one
            // scope (see SetBookUsfmInScope) instead of nesting gated entry points.
            var previousTimeout = SendReceiveWriteLock.DrainTimeout;
            SendReceiveWriteLock.DrainTimeout = TimeSpan.FromMilliseconds(50);
            try
            {
                using var outer = SendReceiveWriteLock.EnterWrite("projectA");
                SendReceiveWriteLock.SetSyncing(["projectA"]); // degrades: outer cannot drain

                var ex = Assert.Throws<InvalidOperationException>(
                    () => SendReceiveWriteLock.EnterWrite("projectB")
                );
                Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
            }
            finally
            {
                SendReceiveWriteLock.DrainTimeout = previousTimeout;
            }
        }

        [Test]
        public void Clear_FromDifferentThreadThanSetSyncing_DisarmsAndUnblocks()
        {
            // Arm on a worker thread that then goes away (as an async sync worker's pool thread
            // might). Clear from ANY other thread must fully disarm — recovery must never depend on
            // the arming thread still existing.
            var worker = new Thread(() => SendReceiveWriteLock.SetSyncing(["projectA"]))
            {
                IsBackground = true,
                Name = "ArmingWorker",
            };
            worker.Start();
            Assert.That(
                worker.Join(TimeSpan.FromSeconds(10)),
                Is.True,
                "worker should finish arming"
            );

            // Assert the premise before acting on it: the worker's arm must be observable from
            // this thread, or the disarm assertions below would pass vacuously.
            Assert.That(SendReceiveWriteLock.IsArmed, Is.True, "the worker's arm must be visible");
            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);

            Assert.DoesNotThrow(SendReceiveWriteLock.Clear);

            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void WriteScope_DisposedOnDifferentThread_ReleasesTheInFlightWrite()
        {
            // A write scope that crosses an await can resume — and dispose — on a different pool
            // thread. The release must work from any thread, and a subsequent sync must then see
            // zero in-flight writes (drain immediately rather than wait for the DrainTimeout).
            var scope = SendReceiveWriteLock.EnterWrite("projectA");

            var disposeTask = Task.Run(scope.Dispose);
            Assert.That(
                disposeTask.Wait(TimeSpan.FromSeconds(10)),
                Is.True,
                "disposing on another thread must complete promptly"
            );
            Assert.That(
                SendReceiveWriteLock.InFlightWriteCount,
                Is.Zero,
                "the cross-thread dispose must have released the in-flight write"
            );

            var stopwatch = Stopwatch.StartNew();
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            stopwatch.Stop();
            Assert.That(
                stopwatch.Elapsed,
                Is.LessThan(TimeSpan.FromSeconds(2)),
                "the released write must not count as in-flight during the sync's drain"
            );

            SendReceiveWriteLock.Clear();
        }

        [Test]
        public void SetSyncing_NullOrEmptyIdsInBatch_AreIgnored()
        {
            // A defective batch must not crash the arming thread or leave a torn arm state; the
            // valid ids must still be armed.
            Assert.DoesNotThrow(() => SendReceiveWriteLock.SetSyncing(["projectA", null!, ""]));

            Assert.Multiple(() =>
            {
                // Assert on the stored set itself: IsBlocked("") could never return true (its own
                // null/empty guard short-circuits), so it cannot falsify the ignore-filter.
                Assert.That(
                    SendReceiveWriteLock.ArmedProjectIds,
                    Is.EquivalentTo(new[] { "projectA" }),
                    "only the valid id may enter the armed set"
                );
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
            });

            SendReceiveWriteLock.Clear();
        }

        // ---- SetSyncing drains in-flight writes ----

        [Test]
        public void SetSyncing_WaitsForInFlightWriteOnAnotherThread_ToDrain()
        {
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            const int holdMs = 500;

            // An in-flight write held on another thread. SetSyncing (on the test thread) must WAIT
            // for the scope to dispose before returning.
            var writer = Task.Run(() =>
            {
                using var scope = SendReceiveWriteLock.EnterWrite("projectA");
                opened.Set();
                release.Wait(TimeSpan.FromSeconds(15));
            });

            Assert.That(
                opened.Wait(TimeSpan.FromSeconds(5)),
                Is.True,
                "the in-flight write should have opened its scope"
            );

            // Release the in-flight write ~holdMs from now, then time how long SetSyncing blocks.
            var releaser = Task.Run(() =>
            {
                Thread.Sleep(holdMs);
                release.Set();
            });

            var stopwatch = Stopwatch.StartNew();
            SendReceiveWriteLock.SetSyncing(["projectA"]); // blocks until the other thread disposes
            stopwatch.Stop();

            Task.WaitAll([writer, releaser], TimeSpan.FromSeconds(20));

            Assert.Multiple(() =>
            {
                Assert.That(
                    stopwatch.ElapsedMilliseconds,
                    Is.GreaterThanOrEqualTo(holdMs - 200),
                    "SetSyncing should have blocked until the in-flight write on the other thread drained"
                );
                Assert.That(
                    SendReceiveWriteLock.InFlightWriteCount,
                    Is.Zero,
                    "after draining, no write scopes remain open"
                );
                Assert.That(
                    SendReceiveWriteLock.IsArmed,
                    Is.True,
                    "after draining, the sync is armed"
                );
            });

            SendReceiveWriteLock.Clear();
        }

        [Test]
        public void SetSyncing_DrainTimesOut_ProceedsDegraded_AndNewWritesStayRejected()
        {
            var previousTimeout = SendReceiveWriteLock.DrainTimeout;
            SendReceiveWriteLock.DrainTimeout = TimeSpan.FromMilliseconds(300);
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            Task? stuck = null;
            try
            {
                // An in-flight write on another thread that will NOT drain within the (shortened)
                // timeout.
                stuck = Task.Run(() =>
                {
                    using var scope = SendReceiveWriteLock.EnterWrite("projectA");
                    opened.Set();
                    release.Wait(TimeSpan.FromSeconds(15));
                });
                Assert.That(opened.Wait(TimeSpan.FromSeconds(5)), Is.True);

                var stopwatch = Stopwatch.StartNew();
                Assert.DoesNotThrow(
                    () => SendReceiveWriteLock.SetSyncing(["projectA"]),
                    "a bounded drain must proceed (log + continue) on timeout, not hang or throw"
                );
                stopwatch.Stop();

                Assert.Multiple(() =>
                {
                    Assert.That(
                        stopwatch.Elapsed,
                        Is.GreaterThanOrEqualTo(TimeSpan.FromMilliseconds(250)),
                        "the degraded path must actually wait out the DrainTimeout, not skip the drain"
                    );
                    Assert.That(
                        stopwatch.Elapsed,
                        Is.LessThan(TimeSpan.FromSeconds(5)),
                        "SetSyncing must not hang past its bounded DrainTimeout"
                    );
                    Assert.That(
                        SendReceiveWriteLock.InFlightWriteCount,
                        Is.EqualTo(1),
                        "the stuck write is still in flight on the degraded path"
                    );

                    // New writes stay rejected while armed, even though the drain timed out.
                    var ex = Assert.Throws<InvalidOperationException>(
                        () => SendReceiveWriteLock.EnterWrite("projectA")
                    );
                    Assert.That(
                        ex!.Message,
                        Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel)
                    );
                });
            }
            finally
            {
                release.Set();
                stuck?.Wait(TimeSpan.FromSeconds(10));
                SendReceiveWriteLock.DrainTimeout = previousTimeout;
                SendReceiveWriteLock.Clear();
            }
        }

        [Test]
        public void SetSyncing_DrainTimesOut_WithThrowOption_RollsBackArmAndThrows()
        {
            var previousTimeout = SendReceiveWriteLock.DrainTimeout;
            SendReceiveWriteLock.DrainTimeout = TimeSpan.FromMilliseconds(300);
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            Task? stuck = null;
            try
            {
                stuck = Task.Run(() =>
                {
                    using var scope = SendReceiveWriteLock.EnterWrite("projectA");
                    opened.Set();
                    release.Wait(TimeSpan.FromSeconds(15));
                });
                Assert.That(opened.Wait(TimeSpan.FromSeconds(5)), Is.True);

                // Opting into throw-on-timeout aborts the sync start instead of degrading...
                Assert.Throws<TimeoutException>(
                    () => SendReceiveWriteLock.SetSyncing(["projectA"], throwOnDrainTimeout: true)
                );

                // ...and the throw means "arm rolled back, no cleanup owed": nothing stays armed,
                // writes flow again, and the stuck write's own count is untouched.
                Assert.Multiple(() =>
                {
                    Assert.That(SendReceiveWriteLock.IsArmed, Is.False, "the arm must roll back");
                    Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
                    Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(1));
                    Assert.DoesNotThrow(() =>
                    {
                        using var _ = SendReceiveWriteLock.EnterWrite("projectA");
                    });
                });
            }
            finally
            {
                release.Set();
                stuck?.Wait(TimeSpan.FromSeconds(10));
                SendReceiveWriteLock.DrainTimeout = previousTimeout;
            }
        }

        [Test]
        public void SetSyncing_CleanDrain_WithThrowOption_ArmsNormally()
        {
            // The throw option changes ONLY the drain-timeout outcome: with nothing in flight the
            // call must arm and return a usable token exactly like the default path.
            long token = 0;
            Assert.DoesNotThrow(
                () =>
                    token = SendReceiveWriteLock.SetSyncing(["projectA"], throwOnDrainTimeout: true)
            );

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsArmed, Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
            });

            SendReceiveWriteLock.Clear(token);
            Assert.That(SendReceiveWriteLock.IsArmed, Is.False);
        }

        [Test]
        public void Clear_WhileAWriteIsStillStuck_RecoversNewWritesImmediately()
        {
            // Recovery must not depend on the stuck write ever completing: Clear disarms the gate,
            // new writes flow again, and the straggler's eventual dispose is a harmless decrement.
            var previousTimeout = SendReceiveWriteLock.DrainTimeout;
            SendReceiveWriteLock.DrainTimeout = TimeSpan.FromMilliseconds(300);
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            Task? stuck = null;
            try
            {
                stuck = Task.Run(() =>
                {
                    using var scope = SendReceiveWriteLock.EnterWrite("projectA");
                    opened.Set();
                    release.Wait(TimeSpan.FromSeconds(15));
                });
                Assert.That(opened.Wait(TimeSpan.FromSeconds(5)), Is.True);

                SendReceiveWriteLock.SetSyncing(["projectA"]); // degraded (stuck write never drains)
                SendReceiveWriteLock.Clear();

                Assert.DoesNotThrow(() =>
                {
                    using var _ = SendReceiveWriteLock.EnterWrite("projectA");
                });

                // The third clause of the recovery contract: the straggler's eventual dispose must
                // land as its own harmless decrement (not vanish, not eat another scope's count).
                release.Set();
                Assert.That(
                    stuck.Wait(TimeSpan.FromSeconds(10)),
                    Is.True,
                    "the straggler should finish once released"
                );
                Assert.That(
                    SendReceiveWriteLock.InFlightWriteCount,
                    Is.Zero,
                    "the straggler's dispose after Clear must release its own in-flight count"
                );
            }
            finally
            {
                release.Set();
                stuck?.Wait(TimeSpan.FromSeconds(10));
                SendReceiveWriteLock.DrainTimeout = previousTimeout;
                SendReceiveWriteLock.Clear();
            }
        }

        // ---- Clear(token): stale-bracket protection ----

        [Test]
        public void ClearWithToken_CurrentBracket_Disarms()
        {
            var token = SendReceiveWriteLock.SetSyncing(["projectA"]);

            SendReceiveWriteLock.Clear(token);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsArmed, Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
            });
        }

        [Test]
        public void ClearWithToken_StaleAfterNewerSetSyncing_DoesNotDisarmTheNewerSync()
        {
            // Sync A ends late: its Clear(tokenA) must be a logged no-op once sync B owns the
            // slot, instead of silently disarming the gate in the middle of B's run.
            var tokenA = SendReceiveWriteLock.SetSyncing(["projectA"]);
            var tokenB = SendReceiveWriteLock.SetSyncing(["projectB"]);

            SendReceiveWriteLock.Clear(tokenA);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsArmed, Is.True, "sync B must stay armed");
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.True);
            });

            SendReceiveWriteLock.Clear(tokenB);
            Assert.That(SendReceiveWriteLock.IsArmed, Is.False);
        }

        [Test]
        public void ClearWithToken_WhenAlreadyCleared_IsSafeNoOp()
        {
            var token = SendReceiveWriteLock.SetSyncing(["projectA"]);
            SendReceiveWriteLock.Clear(token);

            // A duplicate bracket-end (e.g. a finally after an explicit Clear) must stay a no-op.
            Assert.DoesNotThrow(() => SendReceiveWriteLock.Clear(token));
            Assert.That(SendReceiveWriteLock.IsArmed, Is.False);
        }

        [Test]
        public void SetSyncing_GenerationWrap_SkipsTokenZero()
        {
            // Token 0 is reserved as a natural "no arm" default for callers (e.g.
            // `long token = 0; ... if (token != 0) Clear(token);`), so the arm at the wrap
            // boundary must skip it — and its bracket must still round-trip.
            SendReceiveWriteLock.ResetForTests(generation: SendReceiveWriteLock.MaxGeneration);

            var wrappedToken = SendReceiveWriteLock.SetSyncing(["projectA"]);

            Assert.Multiple(() =>
            {
                Assert.That(wrappedToken, Is.Not.Zero, "token 0 must never be issued");
                Assert.That(SendReceiveWriteLock.IsArmed, Is.True);
            });

            SendReceiveWriteLock.Clear(wrappedToken);
            Assert.That(
                SendReceiveWriteLock.IsArmed,
                Is.False,
                "the wrapped token must still end its own bracket"
            );
        }

        [Test]
        public void SetSyncing_ClearedMidDrain_ReturnsPromptlyInsteadOfBurningTheTimeout()
        {
            // A Clear that lands while SetSyncing is still draining removes the drain's premise
            // (the gate is disarmed, so writes may enter again and the count may never settle).
            // The drain must notice the disarm and return promptly instead of spinning out its
            // full DrainTimeout — here the DEFAULT 10s timeout, so a prompt return is clearly
            // distinguishable from a burned timeout.
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            Task? stuck = null;
            Task? sync = null;
            try
            {
                // A stuck write pins the count so the drain cannot finish on its own.
                stuck = Task.Run(() =>
                {
                    using var scope = SendReceiveWriteLock.EnterWrite("projectA");
                    opened.Set();
                    release.Wait(TimeSpan.FromSeconds(15));
                });
                Assert.That(opened.Wait(TimeSpan.FromSeconds(5)), Is.True);

                sync = Task.Run(() => SendReceiveWriteLock.SetSyncing(["projectA"]));
                Assert.That(
                    SpinWait.SpinUntil(() => SendReceiveWriteLock.IsArmed, TimeSpan.FromSeconds(5)),
                    Is.True,
                    "SetSyncing should arm before draining"
                );

                SendReceiveWriteLock.Clear();

                Assert.That(
                    sync.Wait(TimeSpan.FromSeconds(3)),
                    Is.True,
                    "a Clear during the drain must end the wait promptly, not burn the full DrainTimeout"
                );
                Assert.That(SendReceiveWriteLock.IsArmed, Is.False);
            }
            finally
            {
                release.Set();
                stuck?.Wait(TimeSpan.FromSeconds(10));
                sync?.Wait(TimeSpan.FromSeconds(15));
            }
        }

        // ---- Clear / round-trip ----

        [Test]
        public void Clear_WhenNeverArmed_IsSafeNoOp()
        {
            // No SetSyncing → nothing armed. Clear must not throw (it only disarms).
            Assert.DoesNotThrow(SendReceiveWriteLock.Clear);
            Assert.That(SendReceiveWriteLock.IsArmed, Is.False);

            // And a subsequent write still works.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void SetSyncing_ThenClear_RoundTrips()
        {
            // No in-flight writes → SetSyncing returns at once, armed.
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            Assert.Multiple(() =>
            {
                Assert.That(
                    SendReceiveWriteLock.IsArmed,
                    Is.True,
                    "SetSyncing should arm the gate when there is nothing to drain"
                );
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
            });

            SendReceiveWriteLock.Clear();
            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsArmed, Is.False, "Clear should disarm the gate");
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
            });

            // The gate is reusable after a clean round-trip.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        // ---- Concurrency stress: the core safety invariant ----

        /// <summary>
        /// Hammers <see cref="SendReceiveWriteLock.EnterWrite"/> from several threads while a "sync"
        /// repeatedly arms (draining in-flight writes), simulates a file-replacement window, and
        /// clears. Asserts the invariant the whole mechanism exists to guarantee: a project write
        /// NEVER executes inside its scope during the sync's file-replacement window. A broken gate —
        /// one that let <c>EnterWrite</c> open a scope while armed, or that let <c>SetSyncing</c>
        /// return with in-flight writes still open (a broken drain) — would let a write slip in and
        /// violate this.
        /// </summary>
        [Test]
        public void ConcurrentWrites_NeverExecuteDuringSyncFileReplacement()
        {
            const string project = "raceProject";
            const int iterations = 300;
            const int writerCount = 4;

            var stop = false;
            var syncReplacing = 0; // 1 while the "sync" is in its file-replacement window
            var violations = 0; // a write ran while syncReplacing == 1
            var writesObserved = 0; // sanity: writers actually got through
            var rejectionsDuringReplacement = 0; // sanity: writers CONTENDED during the windows

            var writers = Enumerable
                .Range(0, writerCount)
                .Select(_ =>
                    Task.Run(() =>
                    {
                        while (!Volatile.Read(ref stop))
                        {
                            try
                            {
                                using var scope = SendReceiveWriteLock.EnterWrite(project);
                                Interlocked.Increment(ref writesObserved);
                                if (Volatile.Read(ref syncReplacing) == 1)
                                    Interlocked.Increment(ref violations);
                            }
                            catch (InvalidOperationException)
                            {
                                // Fail-fast rejection while a sync is armed — expected; keep
                                // trying. Rejections inside the replacement window prove writers
                                // were actively contending exactly when it matters (see the
                                // vacuity assert below).
                                if (Volatile.Read(ref syncReplacing) == 1)
                                    Interlocked.Increment(ref rejectionsDuringReplacement);
                            }
                        }
                    })
                )
                .ToArray();

            for (var i = 0; i < iterations; i++)
            {
                // Yielding sleeps (NOT Thread.SpinWait, which monopolizes the core on a 1-2 vCPU
                // CI runner so writers never get scheduled inside the windows that matter).
                Thread.Sleep(1); // unarmed window so writers make progress
                SendReceiveWriteLock.SetSyncing([project]); // arm + drain in-flight writes
                Volatile.Write(ref syncReplacing, 1);
                Thread.Sleep(1); // "file replacement" window
                Volatile.Write(ref syncReplacing, 0);
                SendReceiveWriteLock.Clear();
            }

            Volatile.Write(ref stop, true);
            Assert.That(
                Task.WaitAll(writers, TimeSpan.FromSeconds(30)),
                Is.True,
                "writer tasks must finish before the counters are inspected"
            );

            Assert.Multiple(() =>
            {
                Assert.That(
                    violations,
                    Is.Zero,
                    "a project write executed while the sync was replacing files"
                );
                Assert.That(
                    writesObserved,
                    Is.GreaterThan(0),
                    "writers never succeeded; the test would be vacuous"
                );
                Assert.That(
                    rejectionsDuringReplacement,
                    Is.GreaterThan(0),
                    "no writer ever attempted a write during a replacement window; violations == 0 "
                        + "would be vacuous"
                );
            });
        }
    }

    /// <summary>
    /// Verifies the write-gate is actually wired into every gated project-write entry point: each
    /// method opens a <see cref="SendReceiveWriteLock.EnterWrite"/> scope as its first statement, so
    /// it is rejected (with the sentinel) while the project is registered as syncing. One round-trip
    /// test additionally proves a write succeeds again after the sync ends.
    ///
    /// Covered here: all 11 <see cref="ParatextProjectDataProvider"/> write methods, the 5 mutating
    /// <see cref="ManageBooksService"/> wire methods, and the two <c>CheckRunner</c> denial writers
    /// (<c>DenyCheckResult</c>/<c>AllowCheckResult</c>, invoked via reflection since they are private
    /// and <c>CheckRunner</c> is sealed). The two <c>InventoryDataProvider</c> setters are gated
    /// identically but are private (only reachable through the PAPI wire dispatch), so they have no
    /// direct wiring test; the gate call itself is the same one-line <c>EnterWrite</c> scope covered
    /// by <see cref="SendReceiveWriteLockTests"/>.
    ///
    /// <para>Each test arms the sync with <see cref="SendReceiveWriteLock.SetSyncing"/> directly on
    /// the test thread — the gate has no thread affinity, so a gated write observes the armed state
    /// identically from any thread.</para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockGateTests : PapiTestBase
    {
        private const string PdpName = "sendReceiveWriteLockGateTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;
        private ManageBooksService _manageBooksService = null!;

        private string ProjectId => _projectDetails.Metadata.Id;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.ResetForTests();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            // Seed a book so the round-trip write has something valid to modify once the gate is
            // cleared. The entry-gate tests don't need it (they throw before touching the project).
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \c 3 \p \v 1 bla",
                null
            );

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );

            var pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await pdpFactory.InitializeAsync();
            _manageBooksService = new ManageBooksService(Client, ParatextProjects, pdpFactory);
        }

        [TearDown]
        public void TearDown()
        {
            SendReceiveWriteLock.ResetForTests();
            _scrText?.Dispose();
        }

        /// <summary>
        /// Arms this fixture's project as syncing, invokes <paramref name="write"/>, and asserts it
        /// is rejected with the sentinel-suffixed exception (before any mutation can happen). The
        /// TearDown gate reset disarms afterward.
        /// </summary>
        private void AssertWriteBlocked(TestDelegate write)
        {
            SendReceiveWriteLock.SetSyncing([ProjectId]);

            var ex = Assert.Throws<InvalidOperationException>(write);
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        /// <summary>Minimal comment for the comment-mutation gate tests (never dereferenced —
        /// the gate throws first).</summary>
        private PlatformCommentWrapper CreateMinimalCommentWrapper() =>
            new(new Comment(_scrText.User));

        [Test]
        public void SetChapterUsfm_ProjectSyncing_ThrowsWithSentinel_ThenSucceedsAfterClear()
        {
            var verseRef = new VerseRef(1, 2, 0);

            SendReceiveWriteLock.SetSyncing([ProjectId]);
            var ex = Assert.Throws<InvalidOperationException>(
                () => _provider.SetChapterUsfm(verseRef, @"\c 2 \p \v 2 New chapter text.")
            );
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));

            // Sync ended (Clear disarms the gate).
            SendReceiveWriteLock.Clear();
            Assert.That(
                _provider.SetChapterUsfm(verseRef, @"\c 2 \p \v 2 New chapter text."),
                Is.True,
                "Write should succeed once the project is no longer syncing"
            );
        }

        [Test]
        public void SetBookUsfm_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () => _provider.SetBookUsfm(new VerseRef(1, 1, 0), @"\id GEN \c 1 \p \v 1 text")
            );

        [Test]
        public void SetBookUsx_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetBookUsx(new VerseRef(1, 1, 0), "<usx/>"));

        [Test]
        public void SetChapterUsx_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetChapterUsx(new VerseRef(1, 2, 0), "<usx/>"));

        [Test]
        public void SetProjectSetting_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetProjectSetting("platform.fullName", "New Name"));

        [Test]
        public void SetExtensionData_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _provider.SetExtensionData(
                        new ProjectDataScope
                        {
                            ProjectID = ProjectId,
                            ExtensionName = "myExtension",
                            DataQualifier = "myFile.txt",
                        },
                        "data"
                    )
            );

        [Test]
        public void CreateComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.CreateComment(CreateMinimalCommentWrapper()));

        [Test]
        public void AddCommentToThread_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.AddCommentToThread(CreateMinimalCommentWrapper()));

        [Test]
        public void UpdateComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.UpdateComment("someCommentId", "<p>updated</p>"));

        [Test]
        public void DeleteComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.DeleteComment("someCommentId"));

        [Test]
        public void ResolveConflict_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.ResolveConflict("someThreadId", "accept"));

        // ManageBooksService wire methods (the gate is the first statement, so none of these need the
        // request contents to be otherwise valid). The methods are non-async Task methods, so the
        // gate's throw propagates synchronously at call time.

        [Test]
        public void DeleteBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () => _manageBooksService.DeleteBooksAsync(new DeleteBooksRequest(ProjectId, [1]))
            );

        [Test]
        public void CreateBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CreateBooksAsync(
                        new CreateBooksRequest(ProjectId, [1], CreationMethod.Empty, null)
                    )
            );

        [Test]
        public void CopyBooks_DestinationProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CopyBooksAsync(
                        new CopyBooksRequest("someOtherProjectId", ProjectId, [1])
                    )
            );

        [Test]
        public void CopyCustomVersification_DestinationProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CopyCustomVersificationAsync(
                        "someOtherProjectId",
                        ProjectId
                    )
            );

        [Test]
        public void ImportBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.ImportBooksAsync(new ImportBooksInput(ProjectId, [], false))
            );

        // CheckRunner denial writers (DenyCheckResult/AllowCheckResult persist ErrorMessageDenials
        // into the project folder via denials.Save()). They are private and CheckRunner is sealed, so
        // they can neither be called nor overridden directly; invoke them through reflection. The gate
        // is their first statement, so it throws before the check cache or project is touched — the
        // arguments only need to satisfy the signature. MethodInfo.Invoke wraps the throw in a
        // TargetInvocationException, so assert on its InnerException.

        private void AssertCheckRunnerDenialBlocked(string methodName)
        {
            var checkRunner = new CheckRunner(
                Client,
                new InventoryDataProvider(Client, ParatextProjects)
            );
            var method =
                typeof(CheckRunner).GetMethod(
                    methodName,
                    BindingFlags.NonPublic | BindingFlags.Instance
                ) ?? throw new MissingMethodException(nameof(CheckRunner), methodName);

            SendReceiveWriteLock.SetSyncing([ProjectId]);

            var tie = Assert.Throws<TargetInvocationException>(
                () =>
                    method.Invoke(
                        checkRunner,
                        [
                            "checkId",
                            "checkResultType",
                            ProjectId,
                            new VerseRef(1, 1, 0),
                            "itemText",
                            null,
                        ]
                    )
            );
            Assert.That(tie!.InnerException, Is.InstanceOf<InvalidOperationException>());
            Assert.That(
                tie.InnerException!.Message,
                Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel)
            );
        }

        [Test]
        public void DenyCheckResult_ProjectSyncing_ThrowsWithSentinel() =>
            AssertCheckRunnerDenialBlocked("DenyCheckResult");

        [Test]
        public void AllowCheckResult_ProjectSyncing_ThrowsWithSentinel() =>
            AssertCheckRunnerDenialBlocked("AllowCheckResult");
    }
}
