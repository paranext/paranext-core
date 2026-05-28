using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupableProjectsService"/> (CAP-021 — internal collaborator of the
    /// future <c>BackupRestoreDataProvider</c>; carries the snapshot + subscriber-set + event-emit
    /// machinery for the <c>BackupableProjects</c> subscribable data type).
    ///
    /// <para>
    /// Service contract (per strategic-plan-backend.md §CAP-021 + data-contracts.md §3.10 / §5.1):
    /// </para>
    /// <list type="bullet">
    ///   <item><c>IReadOnlyList&lt;BackupableProject&gt; GetSnapshot()</c></item>
    ///   <item><c>IDisposable Subscribe(Action&lt;IReadOnlyList&lt;BackupableProject&gt;&gt; handler)</c></item>
    ///   <item><c>void NotifyProjectsChanged()</c> — rescans, recomputes, emits PAPI event,
    ///         invokes all in-process subscribers</item>
    /// </list>
    ///
    /// <para>
    /// Specification sources:
    /// </para>
    /// <list type="bullet">
    ///   <item>data-contracts.md §3.10 — <c>BackupableProject</c> shape</item>
    ///   <item>data-contracts.md §5.1 — <c>BackupableProjects</c> trigger conditions / event payload</item>
    ///   <item>implementation/backend-alignment.md line 105 — "service carries onDidUpdate* event-emit machinery"</item>
    ///   <item>implementation/strategic-plan-backend.md §CAP-021 — acceptance + edge cases</item>
    ///   <item>business-rules.md INV-B01 — "Resource projects cannot be backed up"</item>
    /// </list>
    ///
    /// <para>
    /// PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:225-230</c> (<c>ValidateData</c>
    /// resource-project gate) — the PT9 check happens at dialog OK time; PT10 enforces it earlier
    /// at the list-source level so resource projects never appear in the dropdown.
    /// </para>
    ///
    /// <para>
    /// PT10 deltas vs PT9:
    /// </para>
    /// <list type="bullet">
    ///   <item>PT9 read the project list inline inside the WinForms dialog; PT10 owns it as a
    ///         standalone service so the future <c>BackupRestoreDataProvider</c> can expose it as
    ///         a subscribable data type (per DEC-303/304/332 round-2 restructure).</item>
    ///   <item>PT9's resource-project gate happened at dialog OK time; PT10's same gate
    ///         (INV-B01) happens at list-projection time so the resource project never
    ///         reaches the UI dropdown.</item>
    ///   <item>PT9 had no networked subscription model; PT10 emits
    ///         <c>PapiClient.SendEventAsync("…-data:onDidUpdate", ["BackupableProjects"])</c>
    ///         per <c>DataProvider.cs:71-105</c> + <c>data-contracts.md §5.1</c>.</item>
    /// </list>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupableProjectsServiceTests : PapiTestBase
    {
        // Default event-type string used by the future BackupRestoreDataProvider —
        // mirrors the DataProvider base-class convention `{name}-data:onDidUpdate`
        // (see c-sharp/NetworkObjects/DataProvider.cs:14-20). Tests assert this exact
        // event-type is fired so we lock the wire contract here.
        private const string ExpectedUpdateEventType =
            "platformBackupRestore.backupRestore-data:onDidUpdate";

        // Data-type name carried in the event payload. Mirrors §5.1 DT-001.
        private const string ExpectedDataTypeName = "BackupableProjects";

        // ====================================================================
        // OUTER acceptance — the full subscribe → notify → snapshot+event-fire round trip.
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-021")]
        [Property("ScenarioId", "TS-106")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "OUTER acceptance: a subscriber receives the new snapshot AND PapiClient.SendEventAsync "
                + "is fired (with the §5.1 scope-list shape) when NotifyProjectsChanged runs after a "
                + "FakeAddProject. End-to-end proof that the service plumbs snapshot + in-process + "
                + "wire-side notifications together."
        )]
        public async Task NotifyProjectsChanged_AfterFakeAddProject_PublishesSnapshotAndEventToSubscribersAndWire()
        {
            // Arrange — seed a project, then construct the service so the test fully controls timing.
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ProjectDetails details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);

            IReadOnlyList<BackupableProject>? received = null;
            using IDisposable _ = service.Subscribe(snapshot => received = snapshot);

            int eventsBefore = Client.SentEventCount;

            // Act
            service.NotifyProjectsChanged();

            // Assert — in-process handler was invoked with the new snapshot
            Assert.That(received, Is.Not.Null, "Subscriber handler must be invoked on notify");
            Assert.That(
                received,
                Has.Count.EqualTo(1),
                "Snapshot must contain the one added project"
            );
            Assert.That(received![0].ShortName, Is.EqualTo(scrText.Name));

            // Assert — wire-side event was fired in the §5.1 scope-list shape
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "NotifyProjectsChanged must fire a PapiClient.SendEventAsync"
            );
            (string eventType, object? payload) = Client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(ExpectedUpdateEventType));
            Assert.That(
                payload,
                Is.InstanceOf<List<string>>(),
                "§5.1 / DataProvider.cs:71-105: scope payload must be a List<string>"
            );
            Assert.That(((List<string>)payload!), Has.Member(ExpectedDataTypeName));

            await Task.CompletedTask;
        }

        // ====================================================================
        // GetSnapshot
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Property("BehaviorId", "BHV-650")]
        [Description("GetSnapshot returns an empty list before any NotifyProjectsChanged call.")]
        public void GetSnapshot_BeforeAnyNotify_ReturnsEmptyList()
        {
            var service = new BackupableProjectsService(Client, ParatextProjects);

            IReadOnlyList<BackupableProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Is.Not.Null, "Snapshot must always be non-null");
            Assert.That(snapshot, Is.Empty);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "GetSnapshot returns the projected list after NotifyProjectsChanged has populated the cache."
        )]
        public void GetSnapshot_AfterNotifyWithSeededProject_ReturnsProjection()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ProjectDetails details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();

            IReadOnlyList<BackupableProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Has.Count.EqualTo(1));
            BackupableProject project = snapshot[0];
            Assert.That(project.ShortName, Is.EqualTo(scrText.Name));
            Assert.That(project.HasFiguresFolder, Is.False, "DummyScrText has no figures/ folder");
            Assert.That(
                project.IsNoteType,
                Is.False,
                "DummyScrText has no Notes-type project interfaces"
            );
            Assert.That(
                project.DefaultBookIds,
                Is.Empty,
                "DummyScrText has no books present by default"
            );
        }

        // ====================================================================
        // INV-B01 — Resource projects are filtered out
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-021")]
        [Property("InvariantId", "INV-B01")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "INV-B01: Resource projects (scrText.IsProtectedText == true) are filtered from the "
                + "BackupableProjects snapshot. PT9 enforces this in BackupForm.ValidateData (BackupForm.cs:225-230); "
                + "PT10 enforces it at the list-source level so resource projects never reach the UI."
        )]
        public void NotifyProjectsChanged_WithResourceProject_FiltersResourceFromSnapshot()
        {
            // Arrange — one normal project + one resource project
            DummyScrText normalScrText = (DummyScrText)CreateDummyProject();
            ProjectDetails normalDetails = CreateProjectDetails(normalScrText);
            ParatextProjects.FakeAddProject(normalDetails, normalScrText);

            var resourceScrText = new DummyResourceScrText();
            ProjectDetails resourceDetails = CreateProjectDetails(resourceScrText);
            ParatextProjects.FakeAddProject(resourceDetails, resourceScrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);

            // Act
            service.NotifyProjectsChanged();
            IReadOnlyList<BackupableProject> snapshot = service.GetSnapshot();

            // Assert — only the non-resource project is present
            Assert.That(
                snapshot,
                Has.Count.EqualTo(1),
                "INV-B01: only the non-resource project must be in the snapshot"
            );
            Assert.That(
                snapshot[0].ShortName,
                Is.EqualTo(normalScrText.Name),
                "INV-B01: the surviving entry must be the non-resource project, not the resource"
            );
        }

        // ====================================================================
        // Subscribe + Dispose semantics
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description("Multiple subscribers all receive the new snapshot on Notify.")]
        public void NotifyProjectsChanged_WithMultipleSubscribers_InvokesEveryHandler()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);

            int callsA = 0;
            int callsB = 0;
            using IDisposable subA = service.Subscribe(_ => callsA++);
            using IDisposable subB = service.Subscribe(_ => callsB++);

            service.NotifyProjectsChanged();

            Assert.That(callsA, Is.EqualTo(1), "Subscriber A must be invoked exactly once");
            Assert.That(callsB, Is.EqualTo(1), "Subscriber B must be invoked exactly once");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description(
            "Subscribing the same handler reference twice is a no-op (idempotent — only one entry "
                + "per handler in the subscriber set). Per strategic-plan §CAP-021 success criteria."
        )]
        public void Subscribe_SameHandlerTwice_IsIdempotent()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);

            int calls = 0;
            void handler(IReadOnlyList<BackupableProject> _) => calls++;
            using IDisposable subFirst = service.Subscribe(handler);
            using IDisposable subSecond = service.Subscribe(handler);

            service.NotifyProjectsChanged();

            Assert.That(
                calls,
                Is.EqualTo(1),
                "Subscribing the same handler twice must invoke it exactly once per notify (idempotent)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description("Disposing the subscription stops handler invocation on subsequent notifies.")]
        public void Subscribe_AfterDispose_HandlerIsNotInvoked()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            int calls = 0;
            IDisposable sub = service.Subscribe(_ => calls++);

            sub.Dispose();
            service.NotifyProjectsChanged();

            Assert.That(
                calls,
                Is.EqualTo(0),
                "Disposed subscription must not receive any notifications"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description(
            "Calling Dispose twice on a subscription is a no-op (does not throw, does not remove "
                + "anything that does not exist). Standard IDisposable idempotence."
        )]
        public void Subscribe_DisposeTwice_DoesNotThrow()
        {
            var service = new BackupableProjectsService(Client, ParatextProjects);
            IDisposable sub = service.Subscribe(_ => { });

            Assert.DoesNotThrow(() =>
            {
                sub.Dispose();
                sub.Dispose();
            });
        }

        // ====================================================================
        // Debounce / no-op on no-change (Theme 6 — strategic-plan §CAP-021 edge case)
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description(
            "Edge case (strategic-plan §CAP-021 — rapid lifecycle events): two consecutive Notify "
                + "calls with no underlying project-list change emit exactly ONE event. The simplest "
                + "implementation is a snapshot-equality short-circuit; a 50ms debounce timer is also "
                + "valid per data-contracts §5.1. This test asserts the loosest acceptable behavior."
        )]
        public void NotifyProjectsChanged_TwiceWithNoChange_FiresEventOnce()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);

            service.NotifyProjectsChanged();
            int eventsAfterFirstNotify = Client.SentEventCount;

            service.NotifyProjectsChanged();
            int eventsAfterSecondNotify = Client.SentEventCount;

            // First notify must fire (we went from no snapshot to having a snapshot).
            Assert.That(
                eventsAfterFirstNotify,
                Is.GreaterThan(0),
                "First Notify must fire — snapshot transitioned from empty to populated"
            );
            // Second notify with no underlying change must not fire (debounce/de-dup).
            Assert.That(
                eventsAfterSecondNotify,
                Is.EqualTo(eventsAfterFirstNotify),
                "Second Notify with no underlying change must not fire a duplicate event"
            );
        }

        // ====================================================================
        // Thread-safety smoke test
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description(
            "Smoke test (strategic-plan §CAP-021 success criteria — 'subscriber-set is thread-safe'): "
                + "concurrent Subscribe + NotifyProjectsChanged calls do not throw."
        )]
        public void Subscribe_ConcurrentWithNotify_DoesNotThrow()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            var subscriptions = new List<IDisposable>();
            var lockObj = new object();

            Assert.DoesNotThrow(() =>
            {
                Parallel.For(
                    0,
                    50,
                    i =>
                    {
                        if (i % 2 == 0)
                        {
                            IDisposable sub = service.Subscribe(_ => { });
                            lock (lockObj)
                                subscriptions.Add(sub);
                        }
                        else
                        {
                            service.NotifyProjectsChanged();
                        }
                    }
                );
            });

            foreach (IDisposable sub in subscriptions)
                sub.Dispose();
        }

        // ====================================================================
        // Private nested test types
        // ====================================================================

        /// <summary>
        /// A <see cref="DummyScrText"/> that reports <c>IsProtectedText == true</c> so it
        /// represents a "resource project" for INV-B01 tests. PT9 distinguishes resources by
        /// <c>Settings.TranslationInfo.Type == ProjectType.AuxiliaryResource</c>
        /// (<c>ScrText.cs:374</c>); the simplest test seam is to override the virtual property
        /// directly rather than coerce the TranslationInfo state.
        /// </summary>
        private sealed class DummyResourceScrText : DummyScrText
        {
            public override bool IsProtectedText => true;
        }
    }
}
