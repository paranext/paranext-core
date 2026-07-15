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

            scope.Dispose();

            // Re-entering proves the in-flight write was released on dispose.
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

            // Second dispose must be a no-op (never decrement the in-flight count twice).
            Assert.DoesNotThrow(scope.Dispose);

            // The scope is fully released — a fresh scope still works.
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
            // A gated method that (directly or via refactor) calls another gated method must not
            // crash: the gate is re-entrant, because the outer scope already provides the
            // sync-exclusion guarantee the inner one would.
            using var outer = SendReceiveWriteLock.EnterWrite("projectA");

            Assert.DoesNotThrow(() =>
            {
                using var inner = SendReceiveWriteLock.EnterWrite("projectB");
            });
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
            Assert.DoesNotThrow(
                () => disposeTask.Wait(TimeSpan.FromSeconds(10)),
                "disposing on another thread must release cleanly"
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
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked(""), Is.False);
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
        /// Arms this fixture's project as syncing, invokes <paramref name="write"/>, and asserts it
        /// is rejected with the sentinel-suffixed exception (before any mutation can happen). The
        /// TearDown Clear disarms afterward.
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
