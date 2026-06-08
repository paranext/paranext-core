using System.Collections.Generic;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-008 OUTER acceptance tests for `GetBackupableProjectsAsync` (M-007)
    // on the wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER
    // happy-path test pins the wire envelope contract (strategic-plan-backend.md
    // §CAP-008); the INNER tests pin
    //   * the INV-B01 propagation (resource projects filtered upstream by CAP-021
    //     never reach the wire response),
    //   * the §5.1 trigger condition that project-list changes fire E-001
    //     through CAP-021's BackupableProjectsService.NotifyProjectsChanged,
    //   * the defensive-copy invariant (caller mutation must not affect the
    //     service's cached snapshot),
    //   * the record-shape contract (data-contracts.md §3.10 field surface —
    //     including INV-B03's `IsNoteType` carrier),
    //   * the TS-107 cold-start semantics (no projects → empty list, not error).
    //
    // Test seam:
    //   `BackupRestoreDataProvider.BackupableProjectsServiceOverride` —
    //   tests inject a service built against the PapiTestBase's `DummyPapiClient` +
    //   `DummyLocalParatextProjects`. Mirrors `RestoreDestinationProjectsServiceOverride`
    //   precedent from CAP-009.
    //
    // Consumes CAP-021 (COMPLETE):
    //   `BackupableProjectsService` ships GetSnapshot(), Subscribe(),
    //   NotifyProjectsChanged(). CAP-008 wire method DELEGATES to GetSnapshot;
    //   the project-list change event is emitted by CAP-021's
    //   SubscribableSnapshotService.
    //
    // Trace:
    //   * Behavior: BHV-650 (Main-menu Backup entry — consumes this list).
    //   * Scenarios: TS-106 (happy path — backend surface of the UI scenario),
    //     TS-107 (no active project → empty list, NOT error).
    //   * Invariants: INV-B01 (resource projects filtered out — upstream by CAP-021;
    //     verified here at the wire surface), INV-B03 (Notes-type flagged via
    //     `IsNoteType`).
    //
    // RED-state expectation: every test fails because
    // `BackupRestoreDataProvider.GetBackupableProjectsAsync` throws
    // NotImplementedException.

    internal partial class BackupRestoreDataProviderTests
    {
        // Default event-type string emitted by CAP-021's SubscribableSnapshotService
        // base class. Mirrors the DataProvider base-class convention
        // `{name}-data:onDidUpdate` (per
        // `SubscribableSnapshotService.DefaultUpdateEventType`).
        private const string CAP008_ExpectedUpdateEventType =
            "platformBackupRestore.backupRestore-data:onDidUpdate";

        // Data-type name carried in the event payload. Mirrors §5.1 DT-001.
        private const string CAP008_ExpectedDataTypeName = "BackupableProjects";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-008 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Property("ScenarioId", "TS-106")]
        public async Task GetBackupableProjects_HappyPath_ReturnsSnapshotFromUnderlyingService()
        {
            // Arrange — register two editable projects so the returned list
            // reflects what CAP-021 projects from
            // LocalParatextProjects.GetAllProjectDetails. Mirrors TS-106's
            // happy-path expectation (the backend translation of "an active
            // project tab exists" — backend's job is to surface the list of
            // backupable projects regardless of UI active-project state).
            DummyScrText projectA = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectA), projectA);

            DummyScrText projectB = new();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectB), projectB);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            // Populate CAP-021's cache so GetSnapshot returns the seeded projects.
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            var request = new GetBackupableProjectsRequest();

            // Act
            List<BackupableProject> result = await _provider.GetBackupableProjectsAsync(request);

            // Assert — wire layer returns the CAP-021 snapshot projected as a
            // fresh List<BackupableProject>.
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result,
                Has.Count.EqualTo(2),
                "Wire layer surfaces every editable non-resource project from CAP-021's snapshot"
            );
            Assert.That(
                result,
                Has.One.Matches<BackupableProject>(p => p.ShortName == projectA.Name),
                "First registered project surfaces in the wire response"
            );
            Assert.That(
                result,
                Has.One.Matches<BackupableProject>(p => p.ShortName == projectB.Name),
                "Second registered project surfaces in the wire response"
            );
        }

        // =====================================================================
        // TS-107 — no projects → empty list (NOT error)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Property("ScenarioId", "TS-107")]
        [Description(
            "TS-107: no active project → empty list, NOT error. The UI scenario "
                + "label is 'silent no-op when no active project'; the backend translation is "
                + "'when the project source is empty, return an empty list, never throw'. The "
                + "wire layer must surface this as Has.Count.EqualTo(0) — not null, not an "
                + "exception envelope, not a NetworkObject error."
        )]
        public async Task GetBackupableProjects_NoActiveProjects_ReturnsEmptyList()
        {
            // Arrange — no FakeAddProject calls; service has nothing to project.
            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            var request = new GetBackupableProjectsRequest();

            // Act
            List<BackupableProject> result = await _provider.GetBackupableProjectsAsync(request);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result,
                Is.Empty,
                "TS-107: empty project source → empty list (not null, not error)"
            );
        }

        // =====================================================================
        // INV-B01 — Resource projects filtered out (upstream by CAP-021)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Property("InvariantId", "INV-B01")]
        [Description(
            "INV-B01: resource projects (IsProtectedText == true) MUST NOT appear in the "
                + "wire response. CAP-021's BackupableProjectsService.BuildSnapshot performs the "
                + "filter at projection time; this test asserts the wire surface honors that — "
                + "even when the LocalParatextProjects source contains a mix of editable and "
                + "resource projects."
        )]
        public async Task GetBackupableProjects_ResourceProjectsFilteredOut_ReturnsOnlyEditableProjects()
        {
            // Arrange — one editable project + one resource project.
            DummyScrText editableProject = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(editableProject), editableProject);

            var resourceProject = new CAP008_DummyResourceScrText();
            ParatextProjects.FakeAddProject(CreateProjectDetails(resourceProject), resourceProject);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            var request = new GetBackupableProjectsRequest();

            // Act
            List<BackupableProject> result = await _provider.GetBackupableProjectsAsync(request);

            // Assert
            Assert.That(
                result,
                Has.Count.EqualTo(1),
                "INV-B01: resource projects are filtered upstream — only the editable project surfaces"
            );
            Assert.That(
                result[0].ShortName,
                Is.EqualTo(editableProject.Name),
                "INV-B01: the surviving entry must be the editable project, not the resource"
            );
        }

        // =====================================================================
        // §5.1 trigger — project list change fires E-001
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "§5.1 trigger condition: when a project is added between two wire calls, the "
                + "second response includes the new entry AND CAP-021's "
                + "BackupableProjectsService fires the E-001 onDidUpdateBackupableProjects event "
                + "through its SubscribableSnapshotService base. CAP-008's wire method does NOT "
                + "itself emit events — this test pins the integration where the wire surface "
                + "reflects CAP-021's event-emit machinery."
        )]
        public async Task GetBackupableProjects_AfterProjectAddedAndRescan_ListGrowsAndE001Fires()
        {
            // Arrange — start with one project, prime the cache.
            DummyScrText projectA = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectA), projectA);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            var request = new GetBackupableProjectsRequest();

            // First wire call — one project
            List<BackupableProject> firstResult = await _provider.GetBackupableProjectsAsync(
                request
            );
            Assert.That(firstResult, Has.Count.EqualTo(1));

            int eventsBeforeAdd = Client.SentEventCount;

            // Act — add a second project AND call CAP-021's rescan.
            DummyScrText projectB = new();
            ParatextProjects.FakeAddProject(CreateProjectDetails(projectB), projectB);
            service.NotifyProjectsChanged();

            // Second wire call — two projects
            List<BackupableProject> secondResult = await _provider.GetBackupableProjectsAsync(
                request
            );

            // Assert — wire layer surfaces the grown list
            Assert.That(secondResult, Has.Count.EqualTo(2));

            // Assert — §5.1 trigger fired via CAP-021's SubscribableSnapshotService
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBeforeAdd),
                "§5.1 trigger condition: project added fires E-001"
            );
            (string eventType, object? payload) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(CAP008_ExpectedUpdateEventType),
                "E-001 emits on the standard DataProvider data-update wire event type"
            );
            Assert.That(payload, Is.InstanceOf<List<string>>());
            Assert.That(
                ((List<string>)payload!),
                Has.Member(CAP008_ExpectedDataTypeName),
                "E-001 payload carries the §5.1 data-type name 'BackupableProjects'"
            );
        }

        // =====================================================================
        // Defensive copy — caller mutation must not affect internal snapshot
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "Wire layer invariant: the returned List<BackupableProject> is a fresh copy. "
                + "Caller-side mutations (Clear, Add, Remove) MUST NOT affect the service's "
                + "cached snapshot — the next call returns the original projection."
        )]
        public async Task GetBackupableProjects_DefensiveCopy_CallerMutationDoesNotAffectSnapshot()
        {
            // Arrange — one project; first call mutates the result; second call
            // verifies the internal snapshot is unchanged.
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            var request = new GetBackupableProjectsRequest();

            // Act — first call returns a list with one entry; mutate it.
            List<BackupableProject> firstResult = await _provider.GetBackupableProjectsAsync(
                request
            );
            Assert.That(firstResult, Has.Count.EqualTo(1));
            firstResult.Clear();

            // Second call should still see the original snapshot.
            List<BackupableProject> secondResult = await _provider.GetBackupableProjectsAsync(
                request
            );

            // Assert
            Assert.That(
                secondResult,
                Has.Count.EqualTo(1),
                "Second call returns the original snapshot — caller mutation of the first result did NOT mutate the service's cached snapshot"
            );
        }

        // =====================================================================
        // Record shape — data-contracts.md §3.10 field surface (incl. INV-B03)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-650")]
        [Property("InvariantId", "INV-B03")]
        [Description(
            "Record shape pin per data-contracts.md §3.10: each returned element exposes "
                + "{Id, ShortName, FullName, HasFiguresFolder, IsNoteType, DefaultBookIds} "
                + "non-null/init-only fields. Locks the wire surface independently of snapshot "
                + "semantics — protects against field-rename refactors that would silently break "
                + "the JSON-RPC contract. INV-B03 is carried by the `IsNoteType` field: a "
                + "non-Notes-type DummyScrText surfaces IsNoteType == false (the value flips when "
                + "Settings.TranslationInfo.Type.IsNoteType() returns true upstream)."
        )]
        public async Task GetBackupableProjects_RecordShape_ExposesContractFields()
        {
            // Arrange — register a plain editable project so all six fields are
            // reachable on the returned record.
            DummyScrText scrText = (DummyScrText)CreateDummyProject();
            ProjectDetails details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            var service = new BackupableProjectsService(Client, ParatextProjects);
            service.NotifyProjectsChanged();
            BackupRestoreDataProvider.BackupableProjectsServiceOverride = service;

            // Act
            List<BackupableProject> result = await _provider.GetBackupableProjectsAsync(
                new GetBackupableProjectsRequest()
            );

            // Assert — every contract field is reachable and populated.
            Assert.That(result, Has.Count.EqualTo(1));
            BackupableProject element = result[0];
            Assert.That(
                element.Id,
                Is.EqualTo(details.Metadata.Id),
                "Id field surfaces ProjectDetails.Metadata.Id"
            );
            Assert.That(
                element.ShortName,
                Is.EqualTo(scrText.Name),
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
                element.HasFiguresFolder,
                Is.False,
                "HasFiguresFolder is false for DummyScrText (no real on-disk figures/ folder)"
            );
            Assert.That(
                element.IsNoteType,
                Is.False,
                "INV-B03: IsNoteType is false for a plain DummyScrText (no Notes-type TranslationInfo)"
            );
            Assert.That(
                element.DefaultBookIds,
                Is.Not.Null,
                "DefaultBookIds is non-null (empty list for DummyScrText defaults)"
            );
        }

        // =====================================================================
        // Private nested test types — mirrors CAP-021's
        // BackupableProjectsServiceTests.DummyResourceScrText with `CAP008_`
        // prefix to avoid name collision in the test binary.
        // =====================================================================

        /// <summary>
        /// A <see cref="DummyScrText"/> that reports <c>IsProtectedText == true</c>
        /// so it represents a "resource project" for INV-B01 tests. PT9
        /// distinguishes resources by
        /// <c>Settings.TranslationInfo.Type == ProjectType.AuxiliaryResource</c>
        /// (<c>ScrText.cs:374</c>); the simplest test seam is to override the
        /// virtual property directly rather than coerce the TranslationInfo state.
        /// Mirrors the analogous private nested type in
        /// <c>BackupableProjectsServiceTests</c>.
        /// </summary>
        private sealed class CAP008_DummyResourceScrText : DummyScrText
        {
            public override bool IsProtectedText => true;
        }
    }
}
