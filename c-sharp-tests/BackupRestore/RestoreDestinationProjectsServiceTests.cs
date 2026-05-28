using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="RestoreDestinationProjectsService"/> (CAP-021 — internal collaborator of
    /// the future <c>BackupRestoreDataProvider</c>; carries the snapshot + subscriber-set +
    /// event-emit machinery for the <c>RestoreDestinationProjects</c> subscribable data type).
    ///
    /// <para>
    /// Service contract (per strategic-plan-backend.md §CAP-021 + data-contracts.md §3.11 / §5.2):
    /// </para>
    /// <list type="bullet">
    ///   <item><c>IReadOnlyList&lt;RestoreDestinationProject&gt; GetSnapshot()</c></item>
    ///   <item><c>IDisposable Subscribe(Action&lt;IReadOnlyList&lt;RestoreDestinationProject&gt;&gt; handler)</c></item>
    ///   <item><c>void NotifyProjectsChanged()</c> — rescans, recomputes (including
    ///         <c>CurrentUserIsAdmin</c> from <c>Permissions.AmAdministrator</c>), emits PAPI event,
    ///         invokes all in-process subscribers</item>
    /// </list>
    ///
    /// <para>
    /// Specification sources:
    /// </para>
    /// <list type="bullet">
    ///   <item>data-contracts.md §3.11 — <c>RestoreDestinationProject</c> shape</item>
    ///   <item>data-contracts.md §5.2 — <c>RestoreDestinationProjects</c> trigger conditions / event payload</item>
    ///   <item>implementation/backend-alignment.md line 105 — "service carries onDidUpdate* event-emit machinery"</item>
    ///   <item>implementation/strategic-plan-backend.md §CAP-021 — acceptance + admin-flip edge case</item>
    ///   <item>business-rules.md INV-B05 — "Restoring over an existing project requires admin permission"</item>
    /// </list>
    ///
    /// <para>
    /// PT9 source: <c>Paratext/BackupRestore/RestoreForm.cs:101-107</c> (admin-only-can-overwrite gate)
    /// — the PT9 gate runs at cmdOK time using <c>scrText.Permissions.AmAdministrator</c>; PT10
    /// surfaces the same flag UPSTREAM on the list element so the UI can render the destination's
    /// admin state. The downstream PT10 gate (CAP-019 RestorePermissionGate) re-validates at
    /// commit time.
    /// </para>
    ///
    /// <para>
    /// PT10 deltas vs PT9:
    /// </para>
    /// <list type="bullet">
    ///   <item>PT9 read the destination list inline inside the WinForms <c>RestoreForm</c>; PT10
    ///         owns it as a standalone service so the future <c>BackupRestoreDataProvider</c> can
    ///         expose it as a subscribable data type (per DEC-303/304/332 round-2 restructure).</item>
    ///   <item>PT9 had no networked subscription model; PT10 emits
    ///         <c>PapiClient.SendEventAsync("…-data:onDidUpdate", ["RestoreDestinationProjects"])</c>
    ///         per <c>DataProvider.cs:71-105</c> + <c>data-contracts.md §5.2</c>.</item>
    /// </list>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RestoreDestinationProjectsServiceTests : PapiTestBase
    {
        // Default event-type string used by the future BackupRestoreDataProvider —
        // mirrors the DataProvider base-class convention `{name}-data:onDidUpdate`.
        private const string ExpectedUpdateEventType =
            "platformBackupRestore.backupRestore-data:onDidUpdate";

        // Data-type name carried in the event payload. Mirrors §5.2 DT-002.
        private const string ExpectedDataTypeName = "RestoreDestinationProjects";

        // ====================================================================
        // OUTER acceptance — the full subscribe → notify → snapshot+event-fire round trip.
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-021")]
        [Property("ScenarioId", "TS-107")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "OUTER acceptance: a subscriber receives the new snapshot AND PapiClient.SendEventAsync "
                + "is fired (with the §5.2 scope-list shape) when NotifyProjectsChanged runs after a "
                + "FakeAddProject. End-to-end proof that the service plumbs snapshot + in-process + "
                + "wire-side notifications together."
        )]
        public async Task NotifyProjectsChanged_AfterFakeAddProject_PublishesSnapshotAndEventToSubscribersAndWire()
        {
            // Arrange
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ProjectDetails details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            IReadOnlyList<RestoreDestinationProject>? received = null;
            using IDisposable _ = service.Subscribe(snapshot => received = snapshot);

            int eventsBefore = Client.SentEventCount;

            // Act
            service.NotifyProjectsChanged();

            // Assert — in-process handler invoked with new snapshot
            Assert.That(received, Is.Not.Null);
            Assert.That(received, Has.Count.EqualTo(1));
            Assert.That(received![0].ShortName, Is.EqualTo(scrText.Name));

            // Assert — wire-side event fired in §5.2 scope-list shape
            Assert.That(Client.SentEventCount, Is.GreaterThan(eventsBefore));
            (string eventType, object? payload) = Client.NextSentEvent;
            Assert.That(eventType, Is.EqualTo(ExpectedUpdateEventType));
            Assert.That(payload, Is.InstanceOf<List<string>>());
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
            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            IReadOnlyList<RestoreDestinationProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Is.Not.Null);
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

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();

            IReadOnlyList<RestoreDestinationProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Has.Count.EqualTo(1));
            Assert.That(snapshot[0].ShortName, Is.EqualTo(scrText.Name));
        }

        // ====================================================================
        // INV-B05 — admin permission surfaced on the destination entry
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-021")]
        [Property("InvariantId", "INV-B05")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "INV-B05: CurrentUserIsAdmin == true when scrText.Permissions.AmAdministrator == true. "
                + "PT9 reads this at cmdOK time (RestoreForm.cs:101-107); PT10 surfaces it upstream "
                + "on the list element so the UI can render the destination's admin state."
        )]
        public void NotifyProjectsChanged_WithAdminUser_SetsCurrentUserIsAdminTrue()
        {
            var adminScrText = new DummyScrTextWithFakePermissions(
                new FakePermissionManager(isAdmin: true)
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(adminScrText), adminScrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();

            IReadOnlyList<RestoreDestinationProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Has.Count.EqualTo(1));
            Assert.That(
                snapshot[0].CurrentUserIsAdmin,
                Is.True,
                "INV-B05: admin user must have CurrentUserIsAdmin == true"
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-021")]
        [Property("InvariantId", "INV-B05")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "INV-B05: CurrentUserIsAdmin == false when scrText.Permissions.AmAdministrator == false. "
                + "Mirrors the affirmative test but with a non-admin permission manager."
        )]
        public void NotifyProjectsChanged_WithNonAdminUser_SetsCurrentUserIsAdminFalse()
        {
            var nonAdminScrText = new DummyScrTextWithFakePermissions(
                new FakePermissionManager(isAdmin: false)
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(nonAdminScrText), nonAdminScrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();

            IReadOnlyList<RestoreDestinationProject> snapshot = service.GetSnapshot();

            Assert.That(snapshot, Has.Count.EqualTo(1));
            Assert.That(
                snapshot[0].CurrentUserIsAdmin,
                Is.False,
                "INV-B05: non-admin user must have CurrentUserIsAdmin == false"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Property("InvariantId", "INV-B05")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "Edge case (strategic-plan §CAP-021 — admin permission flip): when the same project's "
                + "admin permission flips between two Notify calls, the second snapshot reflects the "
                + "new admin state and a fresh event is fired (per §5.2 trigger condition: "
                + "'A user's admin permission on any project changes')."
        )]
        public void NotifyProjectsChanged_AdminPermissionFlips_EmitsFreshSnapshotAndEvent()
        {
            // Arrange — set up a mutable permission manager
            var mutablePerms = new MutableFakePermissionManager(initialIsAdmin: false);
            var scrText = new DummyScrTextWithFakePermissions(mutablePerms);
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            IReadOnlyList<RestoreDestinationProject>? latest = null;
            using IDisposable _ = service.Subscribe(snapshot => latest = snapshot);

            // First notify — non-admin
            service.NotifyProjectsChanged();
            Assert.That(latest, Is.Not.Null);
            Assert.That(latest![0].CurrentUserIsAdmin, Is.False);

            int eventsAfterFirst = Client.SentEventCount;

            // Act — flip the permission
            mutablePerms.IsAdmin = true;
            service.NotifyProjectsChanged();

            // Assert — snapshot reflects the flip, fresh event fired
            Assert.That(
                latest![0].CurrentUserIsAdmin,
                Is.True,
                "Admin flip must propagate to the subscriber's snapshot"
            );
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsAfterFirst),
                "§5.2 trigger condition: admin-permission change must fire a fresh event"
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

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            int callsA = 0;
            int callsB = 0;
            using IDisposable subA = service.Subscribe(_ => callsA++);
            using IDisposable subB = service.Subscribe(_ => callsB++);

            service.NotifyProjectsChanged();

            Assert.That(callsA, Is.EqualTo(1));
            Assert.That(callsB, Is.EqualTo(1));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description("Subscribing the same handler reference twice is a no-op (idempotent).")]
        public void Subscribe_SameHandlerTwice_IsIdempotent()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            int calls = 0;
            void handler(IReadOnlyList<RestoreDestinationProject> _) => calls++;
            using IDisposable subFirst = service.Subscribe(handler);
            using IDisposable subSecond = service.Subscribe(handler);

            service.NotifyProjectsChanged();

            Assert.That(calls, Is.EqualTo(1));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description("Disposing the subscription stops handler invocation on subsequent notifies.")]
        public void Subscribe_AfterDispose_HandlerIsNotInvoked()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            int calls = 0;
            IDisposable sub = service.Subscribe(_ => calls++);

            sub.Dispose();
            service.NotifyProjectsChanged();

            Assert.That(calls, Is.EqualTo(0));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description("Calling Dispose twice on a subscription is a no-op.")]
        public void Subscribe_DisposeTwice_DoesNotThrow()
        {
            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            IDisposable sub = service.Subscribe(_ => { });

            Assert.DoesNotThrow(() =>
            {
                sub.Dispose();
                sub.Dispose();
            });
        }

        // ====================================================================
        // Debounce / no-op on no-change
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-021")]
        [Description(
            "Edge case (strategic-plan §CAP-021): two consecutive Notify calls with no underlying "
                + "change emit exactly ONE event."
        )]
        public void NotifyProjectsChanged_TwiceWithNoChange_FiresEventOnce()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);

            service.NotifyProjectsChanged();
            int eventsAfterFirstNotify = Client.SentEventCount;

            service.NotifyProjectsChanged();
            int eventsAfterSecondNotify = Client.SentEventCount;

            Assert.That(eventsAfterFirstNotify, Is.GreaterThan(0));
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
            "Smoke test: concurrent Subscribe + NotifyProjectsChanged calls do not throw."
        )]
        public void Subscribe_ConcurrentWithNotify_DoesNotThrow()
        {
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
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
        //
        // These test seams are duplicated from
        // c-sharp-tests/BackupRestore/RestorePermissionGateTests.cs (FakePermissionManager +
        // DummyScrTextWithFakePermissions). Both fixtures need the same seam — overriding
        // `PermissionManager.AmAdministrator` via a virtual property — but they exercise different
        // production classes (RestorePermissionGate vs RestoreDestinationProjectsService). Keeping
        // each fixture's seam private avoids cross-test coupling at the cost of a small amount of
        // duplication. If a third fixture grows the same need, hoist these into a shared internal
        // test helper.

        /// <summary>
        /// A <see cref="PermissionManager"/> subclass that overrides
        /// <see cref="PermissionManager.AmAdministrator"/> to return a fixed value.
        /// </summary>
        private class FakePermissionManager : PermissionManager
        {
            private readonly bool _isAdmin;

            public FakePermissionManager(bool isAdmin)
                : base()
            {
                _isAdmin = isAdmin;
            }

            public override bool AmAdministrator => _isAdmin;
        }

        /// <summary>
        /// A <see cref="FakePermissionManager"/> subclass whose <c>IsAdmin</c> can flip at runtime
        /// — used to test the §5.2 trigger "A user's admin permission on any project changes".
        /// </summary>
        private sealed class MutableFakePermissionManager : PermissionManager
        {
            public MutableFakePermissionManager(bool initialIsAdmin)
                : base()
            {
                IsAdmin = initialIsAdmin;
            }

            public bool IsAdmin { get; set; }

            public override bool AmAdministrator => IsAdmin;
        }

        /// <summary>
        /// A <see cref="DummyScrText"/> subclass whose <see cref="ScrText.Permissions"/> returns a
        /// caller-supplied <see cref="PermissionManager"/>.
        /// </summary>
        private sealed class DummyScrTextWithFakePermissions : DummyScrText
        {
            private readonly PermissionManager _permissions;

            public DummyScrTextWithFakePermissions(PermissionManager permissions)
                : base()
            {
                _permissions = permissions;
            }

            public override PermissionManager Permissions => _permissions;
        }
    }
}
