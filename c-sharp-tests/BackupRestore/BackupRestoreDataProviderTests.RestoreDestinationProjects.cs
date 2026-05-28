using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-009 OUTER acceptance tests for `GetRestoreDestinationProjectsAsync` (M-008)
    // on the wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER
    // happy-path test pins the wire envelope contract (strategic-plan-backend.md
    // §CAP-009); the INNER tests pin
    //   * the FN-010 cascade preservation (onlyAllowNewProjects:true → ArgumentException
    //     with message "INVALID_SESSION"),
    //   * the INV-B05 carrier (CurrentUserIsAdmin flips between snapshots when
    //     scrText.Permissions.AmAdministrator changes),
    //   * the §5.2 trigger condition that admin-permission changes fire E-002
    //     through CAP-021's RestoreDestinationProjectsService.NotifyProjectsChanged,
    //   * the defensive-copy invariant (caller mutation must not affect the
    //     service's cached snapshot),
    //   * the record-shape contract (data-contracts.md §3.11 field surface).
    //
    // Test seam:
    //   `BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride` —
    //   tests inject a service built against the PapiTestBase's `DummyPapiClient` +
    //   `DummyLocalParatextProjects`. Mirrors `RestorerFactoryOverride` precedent
    //   from CAP-003.
    //
    // Consumes CAP-021 (COMPLETE):
    //   `RestoreDestinationProjectsService` ships GetSnapshot(), Subscribe(),
    //   NotifyProjectsChanged(). CAP-009 wire method DELEGATES to GetSnapshot;
    //   the admin-flip event is emitted by CAP-021's SubscribableSnapshotService.
    //
    // Trace:
    //   * Behavior: BHV-315 (cmbScrTextDest populated with editable, non-resource
    //     projects — Scope Note: PT10 narrow to existing-only post-FN-010).
    //   * Scenario: TS-068.
    //   * Invariant: INV-B05 (Restoring over an existing project requires admin
    //     permission — surfaced as `CurrentUserIsAdmin` on each list element).
    //
    // RED-state expectation: every test fails because
    // `BackupRestoreDataProvider.GetRestoreDestinationProjectsAsync` throws
    // NotImplementedException.

    internal partial class BackupRestoreDataProviderTests
    {
        // Default event-type string emitted by CAP-021's SubscribableSnapshotService
        // base class. Mirrors the DataProvider base-class convention
        // `{name}-data:onDidUpdate` (per
        // `SubscribableSnapshotService.DefaultUpdateEventType`).
        private const string CAP009_ExpectedUpdateEventType =
            "platformBackupRestore.backupRestore-data:onDidUpdate";

        // Data-type name carried in the event payload. Mirrors §5.2 DT-002.
        private const string CAP009_ExpectedDataTypeName = "RestoreDestinationProjects";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-009 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Property("ScenarioId", "TS-068")]
        [Property("InvariantId", "INV-B05")]
        public async Task GetRestoreDestinationProjects_HappyPath_ReturnsSnapshotFromUnderlyingService()
        {
            // Arrange — register two projects (one admin, one non-admin) so the
            // returned list reflects what CAP-021 projects from
            // LocalParatextProjects.GetAllProjectDetails. Mirrors TS-068's
            // happy-path expectation: list contains the editable, non-resource
            // projects with admin flag surfaced from each project's PermissionManager.
            var adminProject = new CAP009_DummyScrTextWithFakePermissions(
                new CAP009_FakePermissionManager(isAdmin: true)
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(adminProject), adminProject);

            var nonAdminProject = new CAP009_DummyScrTextWithFakePermissions(
                new CAP009_FakePermissionManager(isAdmin: false)
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(nonAdminProject), nonAdminProject);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            // Populate CAP-021's cache so GetSnapshot returns the seeded projects.
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest
            {
                SessionId = null,
                OnlyAllowNewProjects = false,
            };

            // Act
            List<RestoreDestinationProject> result =
                await _provider.GetRestoreDestinationProjectsAsync(request);

            // Assert — wire layer returns the CAP-021 snapshot projected as a fresh
            // List<RestoreDestinationProject>.
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result,
                Has.Count.EqualTo(2),
                "Wire layer surfaces every editable non-resource project from CAP-021's snapshot"
            );
            Assert.That(
                result,
                Has.One.Matches<RestoreDestinationProject>(p => p.CurrentUserIsAdmin == true),
                "Admin project surfaces CurrentUserIsAdmin == true (INV-B05 carrier)"
            );
            Assert.That(
                result,
                Has.One.Matches<RestoreDestinationProject>(p => p.CurrentUserIsAdmin == false),
                "Non-admin project surfaces CurrentUserIsAdmin == false"
            );
        }

        // =====================================================================
        // Edge case — empty projects → empty list
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Description(
            "Wire layer behavior: no installed projects → empty list (never null). Mirrors data-contracts.md §5.2 cold-start semantics."
        )]
        public async Task GetRestoreDestinationProjects_NoInstalledProjects_ReturnsEmptyList()
        {
            // Arrange — no FakeAddProject calls; service has nothing to project.
            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest();

            // Act
            List<RestoreDestinationProject> result =
                await _provider.GetRestoreDestinationProjectsAsync(request);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.Empty, "Empty project source → empty list (not null)");
        }

        // =====================================================================
        // FN-010 cascade preservation — onlyAllowNewProjects:true → INVALID_SESSION
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Description(
            "FN-010 cascade preservation (scope-cascade-pattern.md): "
                + "GetRestoreDestinationProjectsRequest.OnlyAllowNewProjects == true → throws "
                + "ArgumentException with wire-stable message 'INVALID_SESSION'. The field is preserved in the "
                + "schema for re-add traceability even though the only-new-projects code path is unreachable "
                + "post-FN-010 (no cmdNewProject sub-flow in PT10)."
        )]
        public void GetRestoreDestinationProjects_OnlyAllowNewProjectsTrue_ThrowsInvalidSession()
        {
            // Arrange — register one project so the snapshot is non-empty (the
            // guard must fire BEFORE the snapshot read, not after).
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest { OnlyAllowNewProjects = true };

            // Act + Assert
            ArgumentException? ex = Assert.ThrowsAsync<ArgumentException>(
                () => _provider.GetRestoreDestinationProjectsAsync(request)
            );
            Assert.That(
                ex!.Message,
                Does.Contain("INVALID_SESSION"),
                "Wire-stable error message (preserves M-008 wire contract per scope-cascade-pattern.md)"
            );
        }

        // =====================================================================
        // INV-B05 + §5.2 trigger — admin flip propagates AND fires E-002
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Property("InvariantId", "INV-B05")]
        [Description(
            "INV-B05 + §5.2 trigger: when a project's admin permission flips between two wire calls, "
                + "the second response surfaces the updated CurrentUserIsAdmin flag AND CAP-021's "
                + "RestoreDestinationProjectsService fires the E-002 onDidUpdateRestoreDestinationProjects "
                + "event through its SubscribableSnapshotService base. CAP-009's wire method does NOT itself "
                + "emit events — this test pins the integration where the wire surface reflects CAP-021's "
                + "event-emit machinery."
        )]
        public async Task GetRestoreDestinationProjects_AfterAdminFlipAndRescan_FlagFlipsAndE002Fires()
        {
            // Arrange — mutable permission manager so we can flip mid-test.
            var mutablePerms = new CAP009_MutableFakePermissionManager(initialIsAdmin: false);
            var scrText = new CAP009_DummyScrTextWithFakePermissions(mutablePerms);
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            // Prime the cache so the first wire call returns the seeded project
            // (without this, the very first GetSnapshot returns an empty list per
            // CAP-021's documented cold-start semantics).
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest();

            // First wire call — non-admin
            List<RestoreDestinationProject> firstResult =
                await _provider.GetRestoreDestinationProjectsAsync(request);
            Assert.That(firstResult, Has.Count.EqualTo(1));
            Assert.That(
                firstResult[0].CurrentUserIsAdmin,
                Is.False,
                "Pre-flip: CurrentUserIsAdmin reflects the non-admin permission state"
            );

            int eventsBeforeFlip = Client.SentEventCount;

            // Act — flip the permission AND call CAP-021's rescan (mirrors how the
            // production path would react to a permission-change observer).
            mutablePerms.IsAdmin = true;
            service.NotifyProjectsChanged();

            // Second wire call — admin
            List<RestoreDestinationProject> secondResult =
                await _provider.GetRestoreDestinationProjectsAsync(request);

            // Assert — wire layer surfaces the flipped flag
            Assert.That(secondResult, Has.Count.EqualTo(1));
            Assert.That(
                secondResult[0].CurrentUserIsAdmin,
                Is.True,
                "Post-flip: CurrentUserIsAdmin reflects the admin permission state (INV-B05)"
            );

            // Assert — §5.2 trigger fired via CAP-021's SubscribableSnapshotService
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBeforeFlip),
                "§5.2 trigger condition: admin-permission flip fires E-002"
            );
            (string eventType, object? payload) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(CAP009_ExpectedUpdateEventType),
                "E-002 emits on the standard DataProvider data-update wire event type"
            );
            Assert.That(payload, Is.InstanceOf<List<string>>());
            Assert.That(
                ((List<string>)payload!),
                Has.Member(CAP009_ExpectedDataTypeName),
                "E-002 payload carries the §5.2 data-type name 'RestoreDestinationProjects'"
            );
        }

        // =====================================================================
        // SessionId selector — null returns all eligible projects
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Description(
            "Selector semantics per data-contracts.md §5.2: null SessionId returns all editable "
                + "non-resource projects (BHV-315 base behavior, no session filter)."
        )]
        public async Task GetRestoreDestinationProjects_NullSessionId_ReturnsAllEligibleProjects()
        {
            // Arrange — two projects; null SessionId means no filter applied.
            DummyScrText projectA = (DummyScrText)CreateDummyProject();
            DummyScrText projectB = new();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectA), projectA);
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectB), projectB);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest { SessionId = null };

            // Act
            List<RestoreDestinationProject> result =
                await _provider.GetRestoreDestinationProjectsAsync(request);

            // Assert
            Assert.That(
                result,
                Has.Count.EqualTo(2),
                "Null SessionId → no session filter → all eligible projects returned"
            );
        }

        // =====================================================================
        // Defensive copy — caller mutation must not affect internal snapshot
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Description(
            "Wire layer invariant: the returned List<RestoreDestinationProject> is a fresh copy. "
                + "Caller-side mutations (Clear, Add, Remove) MUST NOT affect the service's cached "
                + "snapshot — the next call returns the original projection."
        )]
        public async Task GetRestoreDestinationProjects_DefensiveCopy_CallerMutationDoesNotAffectSnapshot()
        {
            // Arrange — one project; first call mutates the result; second call
            // verifies the internal snapshot is unchanged.
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            var request = new GetRestoreDestinationProjectsRequest();

            // Act — first call returns a list with one entry; mutate it.
            List<RestoreDestinationProject> firstResult =
                await _provider.GetRestoreDestinationProjectsAsync(request);
            Assert.That(firstResult, Has.Count.EqualTo(1));
            firstResult.Clear();

            // Second call should still see the original snapshot.
            List<RestoreDestinationProject> secondResult =
                await _provider.GetRestoreDestinationProjectsAsync(request);

            // Assert
            Assert.That(
                secondResult,
                Has.Count.EqualTo(1),
                "Second call returns the original snapshot — caller mutation of the first result did NOT mutate the service's cached snapshot"
            );
        }

        // =====================================================================
        // Record shape — data-contracts.md §3.11 field surface
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-315")]
        [Description(
            "Record shape pin per data-contracts.md §3.11: each returned element exposes "
                + "{Id, ShortName, FullName, CurrentUserIsAdmin} non-null/init-only fields. "
                + "Locks the wire surface independently of the snapshot semantics — protects against "
                + "field-rename refactors that would silently break the JSON-RPC contract."
        )]
        public async Task GetRestoreDestinationProjects_RecordShape_ExposesContractFields()
        {
            // Arrange — register an admin project so all four fields are populated
            // with non-default values we can assert on individually.
            var adminProject = new CAP009_DummyScrTextWithFakePermissions(
                new CAP009_FakePermissionManager(isAdmin: true)
            );
            ProjectDetails details = CreateProjectDetails(adminProject);
            ParatextProjects.FakeAddProject(details, adminProject);

            var service = new RestoreDestinationProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = service;

            // Act
            List<RestoreDestinationProject> result =
                await _provider.GetRestoreDestinationProjectsAsync(
                    new GetRestoreDestinationProjectsRequest()
                );

            // Assert — every contract field is reachable and populated.
            Assert.That(result, Has.Count.EqualTo(1));
            RestoreDestinationProject element = result[0];
            Assert.That(
                element.Id,
                Is.EqualTo(details.Metadata.Id),
                "Id field surfaces ProjectDetails.Metadata.Id"
            );
            Assert.That(
                element.ShortName,
                Is.EqualTo(adminProject.Name),
                "ShortName field surfaces ScrText.Name"
            );
            // FullName may be empty for a fresh DummyScrText; we only assert it's
            // non-null so the contract field is reachable.
            Assert.That(
                element.FullName,
                Is.Not.Null,
                "FullName field is non-null (may be empty string for DummyScrText defaults)"
            );
            Assert.That(
                element.CurrentUserIsAdmin,
                Is.True,
                "CurrentUserIsAdmin field surfaces scrText.Permissions.AmAdministrator (INV-B05)"
            );
        }

        // =====================================================================
        // Private nested test types — duplicated from
        // RestoreDestinationProjectsServiceTests with `CAP009_` prefix to avoid
        // name collision in the test binary. See that file's "Private nested test
        // types" header for the rationale on per-fixture duplication.
        // =====================================================================

        /// <summary>
        /// A <see cref="PermissionManager"/> subclass that overrides
        /// <see cref="PermissionManager.AmAdministrator"/> to return a fixed value.
        /// </summary>
        private class CAP009_FakePermissionManager : PermissionManager
        {
            private readonly bool _isAdmin;

            public CAP009_FakePermissionManager(bool isAdmin)
                : base()
            {
                _isAdmin = isAdmin;
            }

            public override bool AmAdministrator => _isAdmin;
        }

        /// <summary>
        /// A <see cref="PermissionManager"/> subclass whose <c>IsAdmin</c> can flip
        /// at runtime — used to test the §5.2 trigger "A user's admin permission on
        /// any project changes".
        /// </summary>
        private sealed class CAP009_MutableFakePermissionManager : PermissionManager
        {
            public CAP009_MutableFakePermissionManager(bool initialIsAdmin)
                : base()
            {
                IsAdmin = initialIsAdmin;
            }

            public bool IsAdmin { get; set; }

            public override bool AmAdministrator => IsAdmin;
        }

        /// <summary>
        /// A <see cref="DummyScrText"/> subclass whose
        /// <see cref="ScrText.Permissions"/> returns a caller-supplied
        /// <see cref="PermissionManager"/>.
        /// </summary>
        private sealed class CAP009_DummyScrTextWithFakePermissions : DummyScrText
        {
            private readonly PermissionManager _permissions;

            public CAP009_DummyScrTextWithFakePermissions(PermissionManager permissions)
                : base()
            {
                _permissions = permissions;
            }

            public override PermissionManager Permissions => _permissions;
        }
    }
}
