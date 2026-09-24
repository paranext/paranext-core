using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Concurrency and failure-semantics tests for the per-project Lazy creation/locking in
    /// <see cref="ParatextProjectDataProviderFactoryBase.GetProjectDataProviderID"/>. Uses
    /// <see cref="TestableParatextProjectDataProviderFactory"/> so these tests exercise the base
    /// class's locking/caching behavior directly, independent of any concrete PDPF's
    /// project-interface or rejection logic.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderFactoryBaseTests : PapiTestBase
    {
        [Test]
        public void GetProjectDataProviderID_ConcurrentDistinctProjects_CreatesEachExactlyOnceWithoutSerializing()
        {
            const int projectCount = 4;
            // Generous so a core-starved CI box that's slow to schedule the last thread onto the
            // barrier doesn't read as serialization. The barrier only needs to prove threads run
            // concurrently, so waiting longer is safe - under real serialization the blocked
            // threads never reach the checkpoint no matter how long we wait.
            var perThreadBarrierTimeout = TimeSpan.FromSeconds(10);

            var projectIds = Enumerable
                .Range(0, projectCount)
                .Select(_ => HexId.CreateNew().ToString())
                .ToList();
            foreach (var id in projectIds)
                ParatextProjects.FakeAddProject(CreateProjectDetails(id, "Project" + id));

            var factory = new TestableParatextProjectDataProviderFactory(Client, ParatextProjects);

            // All `projectCount` callers (one per distinct project) must reach this checkpoint while
            // still inside PDP creation before any of them can proceed. If creation were still
            // serialized behind a single global lock, only one thread could ever be inside the
            // critical section at a time - the other threads would still be blocked trying to
            // acquire that lock and could never reach the checkpoint, so it would time out. True
            // per-project concurrency lets every thread arrive together.
            using var allArrived = new CountdownEvent(projectCount);
            var timedOut = new bool[projectCount];
            factory.OnCreating = id =>
            {
                allArrived.Signal();
                var index = projectIds.IndexOf(id);
                if (!allArrived.Wait(perThreadBarrierTimeout))
                    timedOut[index] = true;
            };

            var results = new string?[projectCount];
            var errors = new Exception?[projectCount];
            var threads = new Thread[projectCount];
            for (var i = 0; i < projectCount; i++)
            {
                var index = i;
                threads[index] = new Thread(() =>
                {
                    try
                    {
                        results[index] = factory.GetProjectDataProviderID(projectIds[index]);
                    }
                    catch (Exception ex)
                    {
                        errors[index] = ex;
                    }
                })
                {
                    // Background so a worker left blocked on the barrier on a failure path can't
                    // outlive the test run.
                    IsBackground = true,
                };
            }

            foreach (var thread in threads)
                thread.Start();
            // Bound the whole test so a regression to global serialization fails fast instead of
            // hanging the test run (worst case under serialization is (projectCount - 1) *
            // perThreadBarrierTimeout before every thread gives up on the checkpoint).
            foreach (var thread in threads)
                Assert.That(
                    thread.Join(TimeSpan.FromSeconds(30)),
                    Is.True,
                    "A thread never completed"
                );

            Assert.That(
                errors,
                Has.All.Null,
                "No creation should throw for a valid, distinct project"
            );
            Assert.That(
                timedOut,
                Has.All.False,
                "Distinct-project creations were serialized instead of running concurrently"
            );
            Assert.That(results, Has.All.Not.Null);

            // Each distinct project's creation critical section ran exactly once.
            Assert.That(factory.CreationInvocationCount, Is.EqualTo(projectCount));
            Assert.That(factory.CreationInvocations.Distinct().Count(), Is.EqualTo(projectCount));
        }

        [Test]
        public void GetProjectDataProviderID_ConcurrentSameProject_CreatesExactlyOnePdp()
        {
            const int callerCount = 10;
            var projectId = HexId.CreateNew().ToString();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectId, "SharedProject"));

            var factory = new TestableParatextProjectDataProviderFactory(Client, ParatextProjects);

            // Hold the (single) winning creation open briefly so the other concurrent callers'
            // GetProjectDataProviderID calls genuinely overlap with it (contend on the same
            // Lazy<ParatextProjectDataProvider>) instead of happening to run one after another.
            factory.OnCreating = _ => Thread.Sleep(300);

            var results = new string?[callerCount];
            var threads = new Thread[callerCount];
            using var allThreadsReady = new CountdownEvent(callerCount);
            using var proceed = new ManualResetEventSlim(false);
            for (var i = 0; i < callerCount; i++)
            {
                var index = i;
                threads[index] = new Thread(() =>
                {
                    try
                    {
                        allThreadsReady.Signal();
                        // Bounded so a worker abandoned on a failure path doesn't block forever.
                        proceed.Wait(TimeSpan.FromSeconds(30));
                        results[index] = factory.GetProjectDataProviderID(projectId);
                    }
                    catch
                    {
                        // On a failure path the test may dispose these sync primitives while this
                        // leaked worker is still running; swallow the resulting
                        // ObjectDisposedException so it can't crash the test host and mask the real
                        // Join-timeout assertion. A genuine happy-path failure still surfaces via
                        // the null results[index] asserted below.
                    }
                })
                {
                    IsBackground = true,
                };
                threads[index].Start();
            }

            // Release every caller together to maximize the race window onto the shared Lazy. Assert
            // the barrier was actually reached: on a starved CI box that scheduled workers late,
            // proceed.Set() must not fire before all callers are parked on it, or the test would
            // pass with reduced/zero contention on the shared Lazy - the exact race it exists to
            // prove. 10s matches the sibling test's timeout.
            Assert.That(
                allThreadsReady.Wait(TimeSpan.FromSeconds(10)),
                Is.True,
                "All caller threads must reach the start line before they are released"
            );
            proceed.Set();

            foreach (var thread in threads)
                Assert.That(
                    thread.Join(TimeSpan.FromSeconds(10)),
                    Is.True,
                    "A thread never completed"
                );

            Assert.That(
                factory.CreationInvocationCount,
                Is.EqualTo(1),
                "Concurrent calls for the same project must create exactly one PDP"
            );
            Assert.That(
                results.Distinct().Count(),
                Is.EqualTo(1),
                "All callers must observe the same PDP name"
            );
            Assert.That(results, Has.All.Not.Null);
        }

        [Test]
        public void GetExistingProjectDataProvider_AfterCreationThrows_ReturnsNullWithoutThrowing()
        {
            var projectId = HexId.CreateNew().ToString();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectId, "SiblingProject"));

            // Simulates a project that belongs to a sibling factory (ShouldServeProject == false),
            // a deterministic failure path GetProjectDataProviderID can hit.
            var factory = new TestableParatextProjectDataProviderFactory(Client, ParatextProjects)
            {
                ShouldServe = false,
            };

            Assert.Throws<KeyNotFoundException>(() => factory.GetProjectDataProviderID(projectId));

            // GetExistingProjectDataProvider is a "does one exist yet?" query: after a creation that
            // threw, it must return null without re-throwing the failure and without forcing
            // creation. (Both guards cover this: the faulted entry is evicted on throw, and even a
            // present-but-still-creating Lazy is skipped via IsValueCreated rather than blocking on
            // or re-throwing from .Value.)
            ParatextProjectDataProvider? existing = null;
            Assert.DoesNotThrow(() => existing = factory.GetExistingProjectDataProvider(projectId));
            Assert.That(existing, Is.Null);
        }

        [Test]
        public void GetProjectDataProviderID_AfterTransientFailure_RetrySelfHeals()
        {
            var projectId = HexId.CreateNew().ToString();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectId, "FlakyProject"));

            var factory = new TestableParatextProjectDataProviderFactory(Client, ParatextProjects);

            // Fail the first creation attempt with a transient (recoverable) error - the kind
            // GetParatextProject throws when a resource is requested before Paratext registration
            // completes (RegistrationRequiredException) or a project is requested mid-clone
            // (ProjectNotFoundException) - then let later attempts succeed. Calls here are
            // sequential, so a plain counter is sufficient.
            var attempts = 0;
            factory.OnCreating = _ =>
            {
                if (attempts++ == 0)
                    throw new InvalidOperationException("transient creation failure");
            };

            // First call faults. A faulted Lazy caches its exception forever, so it must be evicted
            // from the map rather than left to poison every future lookup until process restart.
            Assert.Throws<InvalidOperationException>(
                () => factory.GetProjectDataProviderID(projectId)
            );

            // Second call (condition cleared) must retry creation and return a real PDP name rather
            // than re-throwing the previously-cached exception. This is the falsifiable guard for
            // the eviction fix: without eviction, this call re-throws InvalidOperationException.
            string? pdpName = null;
            Assert.DoesNotThrow(() => pdpName = factory.GetProjectDataProviderID(projectId));
            Assert.That(pdpName, Is.Not.Null.And.Not.Empty);
            Assert.That(
                factory.CreationInvocationCount,
                Is.EqualTo(2),
                "The faulted entry must be evicted so the second call retries creation"
            );

            // The now-successful PDP is cached: a third call reuses it without a third creation, so
            // eviction on failure does not weaken success-path dedup.
            var pdpNameAgain = factory.GetProjectDataProviderID(projectId);
            Assert.That(pdpNameAgain, Is.EqualTo(pdpName));
            Assert.That(
                factory.CreationInvocationCount,
                Is.EqualTo(2),
                "Success-path dedup: no re-creation once a PDP exists"
            );
        }
    }
}
