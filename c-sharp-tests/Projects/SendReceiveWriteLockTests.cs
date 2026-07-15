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
    /// Test helper that simulates an automatic Send/Receive holding the write-gate. It runs
    /// <see cref="SendReceiveWriteLock.SetSyncing"/> on a dedicated background thread (matching
    /// production, where the sync worker — not a PAPI write thread — arms and later clears the gate),
    /// waits until it has armed and acquired the write lock, and on <see cref="Dispose"/> runs
    /// <see cref="SendReceiveWriteLock.Clear"/> on that SAME thread (the RWLS is thread-affine) and
    /// joins.
    ///
    /// <para>A separate thread is REQUIRED: because the read lock is thread-affine, a gated write run
    /// on the test thread must see the write lock held by ANOTHER thread to be rejected with the
    /// sentinel. A same-thread hold would instead raise <see cref="LockRecursionException"/> under the
    /// gate's <c>NoRecursion</c> policy.</para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal sealed class FakeSync : IDisposable
    {
        private readonly Thread _thread;
        private readonly ManualResetEventSlim _armed = new(false);
        private readonly ManualResetEventSlim _release = new(false);
        private Exception? _armException;

        public FakeSync(params string[] projectIds)
        {
            _thread = new Thread(() =>
            {
                try
                {
                    SendReceiveWriteLock.SetSyncing(projectIds);
                }
                catch (Exception ex)
                {
                    _armException = ex;
                    _armed.Set();
                    return;
                }
                _armed.Set();
                _release.Wait();
                SendReceiveWriteLock.Clear();
            })
            {
                IsBackground = true,
                Name = "FakeSyncWorker",
            };
            _thread.Start();
            if (!_armed.Wait(TimeSpan.FromSeconds(10)))
                throw new TimeoutException("FakeSync did not arm within 10 seconds");
            if (_armException is not null)
                throw new InvalidOperationException("FakeSync arming threw", _armException);
        }

        public void Dispose()
        {
            _release.Set();
            _thread.Join(TimeSpan.FromSeconds(10));
            _armed.Dispose();
            _release.Dispose();
        }
    }

    /// <summary>
    /// Unit tests for the process-wide <see cref="SendReceiveWriteLock"/> write-gate. Every test
    /// clears the (static) gate before and after so state never leaks between tests or to other
    /// fixtures. The fixture runs single-threaded (no NUnit parallelism), so the shared static lock is
    /// never touched concurrently across tests.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockTests
    {
        [SetUp]
        public void SetUp() => SendReceiveWriteLock.Clear();

        [TearDown]
        public void TearDown() => SendReceiveWriteLock.Clear();

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
            // Re-arming on the same thread must not re-acquire the (already held) write lock — the
            // NoRecursion guard in SetSyncing handles this — it just swaps the armed set.
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

        // ---- EnterWrite scope (the RWLS "reader" side) ----

        [Test]
        public void EnterWrite_NotArmed_ReturnsScope_AndReleasesOnDispose()
        {
            var scope = SendReceiveWriteLock.EnterWrite("projectA");
            Assert.That(scope, Is.Not.Null);

            scope.Dispose();

            // Re-entering proves the read lock was released on dispose.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void EnterWrite_DoubleDispose_IsSafe()
        {
            var scope = SendReceiveWriteLock.EnterWrite("projectA");
            scope.Dispose();

            // Second dispose must be a no-op (never call ExitReadLock twice).
            Assert.DoesNotThrow(scope.Dispose);

            // The lock is fully released — a fresh scope still works.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void EnterWrite_NullProjectId_Throws()
        {
            Assert.Throws<ArgumentNullException>(() => SendReceiveWriteLock.EnterWrite(null!));
        }

        [Test]
        public void EnterWrite_Armed_ThrowsWithSentinel()
        {
            // A sync is armed and holds the write lock on another thread.
            using var sync = new FakeSync("projectA");

            var ex = Assert.Throws<InvalidOperationException>(
                () => SendReceiveWriteLock.EnterWrite("projectA")
            );
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        [Test]
        public void EnterWrite_WhileAnotherProjectSyncs_RejectsAllProjects_GlobalGate()
        {
            // The write gate is GLOBAL (a single process-wide lock): while a sync holds the write
            // lock, writes to EVERY project fail fast, not just the syncing one. This is the intended
            // coarse exclusion (a sync is globally exclusive). IsBlocked stays per-project pure data,
            // so it is deliberately narrower than the gate.
            using var sync = new FakeSync("projectA");

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

        [Test]
        public void EnterWrite_NestedOnSameThread_ThrowsLockRecursion_DocumentingNoRecursionPolicy()
        {
            // Documents the NoRecursion policy. No gated write path re-enters the gate on one thread
            // (a delegating method calls an un-gated core inside its single outer scope), so an
            // accidental nested EnterWrite is a loud LockRecursionException, not a silent deadlock.
            using var outer = SendReceiveWriteLock.EnterWrite("projectA");

            Assert.Throws<LockRecursionException>(
                () => SendReceiveWriteLock.EnterWrite("projectB")
            );
        }

        // ---- SetSyncing drains in-flight writes (the RWLS "writer" side) ----

        [Test]
        public void SetSyncing_WaitsForInFlightWriteOnAnotherThread_ToDrain()
        {
            var opened = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            const int holdMs = 500;

            // An in-flight write held on ANOTHER thread. The RWLS read lock is thread-affine, so
            // SetSyncing (on the test thread) must WAIT for this thread's scope to dispose.
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
                    SendReceiveWriteLock.WriteLockHeld,
                    Is.True,
                    "after draining, SetSyncing holds the write lock"
                );
            });

            SendReceiveWriteLock.Clear(); // release the write lock now held by THIS (test) thread
        }

        [Test]
        public void SetSyncing_DrainTimesOut_ProceedsUnheld_AndBeltCheckStillRejects()
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
                        Is.LessThan(TimeSpan.FromSeconds(5)),
                        "SetSyncing must not hang past its bounded DrainTimeout"
                    );
                    Assert.That(
                        SendReceiveWriteLock.WriteLockHeld,
                        Is.False,
                        "on drain timeout the sync proceeds WITHOUT holding the write lock"
                    );

                    // Belt check: writes stay rejected while armed, even though no write lock is held.
                    var ex = Assert.Throws<InvalidOperationException>(
                        () => SendReceiveWriteLock.EnterWrite("projectA")
                    );
                    Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
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

        // ---- Clear / round-trip ----

        [Test]
        public void Clear_WhenWriteLockNeverHeld_IsSafeNoOp()
        {
            // No SetSyncing → the write lock was never taken. Clear must not throw (it only disarms).
            Assert.DoesNotThrow(SendReceiveWriteLock.Clear);
            Assert.That(SendReceiveWriteLock.WriteLockHeld, Is.False);

            // And a subsequent write still works.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void SetSyncing_ThenClear_SameThread_RoundTrips()
        {
            // Both on the test thread (RWLS thread affinity). No in-flight writes → acquires at once.
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            Assert.Multiple(() =>
            {
                Assert.That(
                    SendReceiveWriteLock.WriteLockHeld,
                    Is.True,
                    "SetSyncing should hold the write lock when there is nothing to drain"
                );
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
            });

            SendReceiveWriteLock.Clear();
            Assert.Multiple(() =>
            {
                Assert.That(
                    SendReceiveWriteLock.WriteLockHeld,
                    Is.False,
                    "Clear should release the write lock"
                );
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
            });

            // The lock is reusable after a clean same-thread round-trip.
            Assert.DoesNotThrow(() =>
            {
                using var _ = SendReceiveWriteLock.EnterWrite("projectA");
            });
        }

        [Test]
        public void Clear_OnDifferentThreadThanSetSyncing_ThrowsAndLeavesStateIntact()
        {
            // Defends the single-thread contract: a sync armed on one thread must be cleared on THAT
            // thread. A cross-thread Clear must fail fast (InvalidOperationException) and — crucially —
            // NOT touch the armed set or the still-held write lock, so the owning thread can still
            // clean up correctly. Without the owner-thread guard the degraded path would slip through
            // silently (nothing is held for the RWLS to reject).
            var armed = new ManualResetEventSlim(false);
            var release = new ManualResetEventSlim(false);
            var worker = new Thread(() =>
            {
                SendReceiveWriteLock.SetSyncing(["projectA"]);
                armed.Set();
                release.Wait(TimeSpan.FromSeconds(10));
                SendReceiveWriteLock.Clear(); // proper cleanup on the OWNING thread
            })
            {
                IsBackground = true,
                Name = "CrossThreadClearWorker",
            };
            worker.Start();
            Assert.That(armed.Wait(TimeSpan.FromSeconds(10)), Is.True, "worker should have armed");

            // Clear on the TEST thread (not the arming thread) is rejected...
            Assert.Throws<InvalidOperationException>(SendReceiveWriteLock.Clear);
            // ...and left the sync intact for the owner to clean up.
            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);

            release.Set();
            Assert.That(
                worker.Join(TimeSpan.FromSeconds(10)),
                Is.True,
                "worker should have cleared"
            );
            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);

            armed.Dispose();
            release.Dispose();
        }

        // ---- Concurrency stress: the core safety invariant ----

        /// <summary>
        /// Hammers <see cref="SendReceiveWriteLock.EnterWrite"/> from several threads while a "sync"
        /// repeatedly arms (draining in-flight writes), simulates a file-replacement window, and
        /// clears. Asserts the invariant the whole mechanism exists to guarantee: a project write
        /// NEVER executes inside its scope while the sync holds the write lock (its file-replacement
        /// window). A broken gate — one that granted the read lock while the writer held it, or failed
        /// to drain before returning — would let a write slip in and violate this.
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
                                // Fail-fast rejection while a sync is armed — expected; keep trying.
                            }
                        }
                    })
                )
                .ToArray();

            for (var i = 0; i < iterations; i++)
            {
                Thread.SpinWait(300); // unarmed window so writers make progress
                SendReceiveWriteLock.SetSyncing([project]); // arm + drain in-flight writes
                Volatile.Write(ref syncReplacing, 1);
                Thread.SpinWait(300); // "file replacement" window
                Volatile.Write(ref syncReplacing, 0);
                SendReceiveWriteLock.Clear();
            }

            Volatile.Write(ref stop, true);
            Task.WaitAll(writers, TimeSpan.FromSeconds(30));

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
    /// <para>Each test arms the sync via <see cref="FakeSync"/> (on a background thread) rather than
    /// calling <see cref="SendReceiveWriteLock.SetSyncing"/> on the test thread: the RWLS read lock is
    /// thread-affine, so a gated write on the test thread must see the write lock held by ANOTHER
    /// thread to be rejected with the sentinel.</para>
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
            SendReceiveWriteLock.Clear();

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
            SendReceiveWriteLock.Clear();
            _scrText?.Dispose();
        }

        /// <summary>
        /// Arms this fixture's project as syncing (on a background thread, via <see cref="FakeSync"/>),
        /// invokes <paramref name="write"/> on the test thread, and asserts it is rejected with the
        /// sentinel-suffixed exception (before any mutation can happen).
        /// </summary>
        private void AssertWriteBlocked(TestDelegate write)
        {
            using var sync = new FakeSync(ProjectId);

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

            using (new FakeSync(ProjectId))
            {
                var ex = Assert.Throws<InvalidOperationException>(
                    () => _provider.SetChapterUsfm(verseRef, @"\c 2 \p \v 2 New chapter text.")
                );
                Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
            }

            // Sync ended (FakeSync disposed → Clear ran on its thread → write lock released).
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

            using var sync = new FakeSync(ProjectId);

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
