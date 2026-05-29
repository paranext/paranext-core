using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Repository;
using Paratext.Data.Users;
using PtxUtils;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-004 OUTER acceptance tests for `PerformRestoreAsync` (M-003) on the
    // wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER tests
    // pin the wire envelope contract (data-contracts.md §4.3); INNER tests in
    // RestoreOrchestratorTests.cs pin the orchestrator; golden masters
    // (gm-016, gm-017, gm-029) live in BackupRestoreGoldenMasterTests.cs.
    //
    // Wire-layer responsibilities (per data-contracts.md §4.3):
    //   (1) Lookup session via SessionRegistry.Get(sessionId) —
    //       null → Error(InvalidSession)
    //   (2) Resolve destination ScrText via LocalParatextProjects.GetParatextProject —
    //       unknown/throws → Error(DestinationNotWritable) (DEC-CAP-004-A)
    //   (3) Admin gate via RestorePermissionGate.CheckAdminGate (CAP-019) —
    //       false → Error(PermissionDenied)
    //   (4) Persist-current-changes gate (TS-072) — dirty AND not acknowledged
    //       → ConfirmationRequired(PersistCurrentChanges)
    //   (5) Shared-project gate (BHV-323) — markers present AND not acknowledged
    //       → ConfirmationRequired(SharedProjectWarning)
    //   (6) Downgrade gate (VAL-B07) — DestIsHigherVersion file selected but
    //       missing from AcknowledgedDowngradeFileIds → ConfirmationRequired(DowngradeFiles)
    //   (7) Build RestoreOverlayRequest + delegate to RestoreOrchestrator.ExecuteOverlay
    //   (8) On success → fire SendFullProjectUpdateEventOverride exactly once;
    //       return Success(destProjectId, isNoteType)
    //   (9) On Error → return as-is, NO Theme-6 fire
    //
    // Test seams (all reset in TearDown — see BackupRestoreDataProviderTests.cs):
    //   * BackupRestoreDataProvider.RestorerFactoryOverride (CAP-003) — seeds session
    //   * RestoreOrchestrator.WriteLockObtainerOverride — control WriteLock outcome
    //   * BackupRestoreDataProvider.SendFullProjectUpdateEventOverride — capture Theme-6
    //   * BackupRestoreDataProvider.PersistCurrentChangesOverride — gate TS-072
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.PerformRestoreAsync throws NotImplementedException.

    internal partial class BackupRestoreDataProviderTests
    {
        // Constants used across CAP-004 tests
        private const string CAP004_DefaultMessageKey_SharedProjectWarning =
            "%restoreForm_sharedProjectWarning%";
        private const string CAP004_DefaultMessageKey_PersistCurrentChanges =
            "%restoreForm_persistCurrentChanges%";
        private const string CAP004_DefaultMessageKey_DowngradeFiles =
            "%restoreForm_downgradeFileWarning%";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-004 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("BehaviorId", "BHV-326")]
        [Property("ScenarioId", "TS-019")]
        [Property("InvariantId", "INV-A12")]
        [Property("InvariantId", "INV-A18")]
        public async Task PerformRestore_OverlayHappyPath_ReturnsSuccessAndFiresFullProjectUpdateEvent()
        {
            // Arrange — register destination project (admin), seed restore session,
            // wire WriteLock override (success), and capture Theme-6 emissions.
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);
            string destProjectId = dest.Guid.ToString();

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();
            var fullProjectUpdateProjectIds = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = destProjectId,
                SelectedFileIds = new[] { "F-GEN" },
                AcknowledgedSharedProjectWarning = false, // markers=false so unused
                AcknowledgedDowngradeFileIds = Array.Empty<string>(),
                AcknowledgedPersistCurrentChanges = false, // override returns clean
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert — Success envelope
            Assert.That(
                result,
                Is.InstanceOf<RestoreOperationResult.Success>(),
                "Overlay happy path returns Success envelope"
            );
            var success = (RestoreOperationResult.Success)result;
            Assert.That(
                success.RestoredProjectId,
                Is.EqualTo(destProjectId),
                "Success.RestoredProjectId echoes the destination project id (FN-010: overlay-only)"
            );

            // Theme-6: SendFullProjectUpdateEvent fires exactly once for the dest
            Assert.That(
                fullProjectUpdateProjectIds,
                Has.Count.EqualTo(1),
                "Theme-6 SendFullProjectUpdateEvent fires exactly once after a successful overlay"
            );
            Assert.That(
                fullProjectUpdateProjectIds[0],
                Is.EqualTo(destProjectId),
                "Theme-6 fires for the destination project id"
            );

            // Orchestrator delegated to the handle's PerformOverlayRestore
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(1),
                "Handle.PerformOverlayRestore invoked exactly once on the happy path"
            );
        }

        // =====================================================================
        // (1) Invalid session — Error(InvalidSession)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Unknown sessionId → Error(InvalidSession, %restore_invalidSession%). No destination resolution attempted; no Theme-6 fire (data-contracts.md §4.3 error matrix)"
        )]
        public async Task PerformRestore_UnknownSessionId_ReturnsInvalidSessionError()
        {
            // Arrange — no session opened
            var captured = ArmCAP004FullProjectUpdateCapture();
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = "ffffffffffff",
                DestinationProjectId = "ignored-since-session-fails",
                SelectedFileIds = Array.Empty<string>(),
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.InvalidSession));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_invalidSession%"));
            Assert.That(
                captured,
                Is.Empty,
                "No Theme-6 fire when invalid session aborts the restore"
            );
        }

        // =====================================================================
        // (2) Destination resolution — DestinationNotWritable (DEC-CAP-004-A)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Empty destinationProjectId → Error(DestinationNotWritable, %restore_destinationNotWritable%) per DEC-CAP-004-A (no INVALID_DESTINATION enum member; closest semantic match)"
        )]
        public async Task PerformRestore_EmptyDestinationProjectId_ReturnsDestinationNotWritableError()
        {
            // Arrange — session exists, but no destination id
            string sessionId = SeedCAP004Session(
                out _,
                isLegacyBackup: false,
                sharedProjectMarkers: false
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = string.Empty,
                SelectedFileIds = Array.Empty<string>(),
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(RestoreOperationErrorCode.DestinationNotWritable)
            );
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_destinationNotWritable%"));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Unresolvable destinationProjectId (not in collection) → Error(DestinationNotWritable). LocalParatextProjects.GetParatextProject throws; wire layer classifies."
        )]
        public async Task PerformRestore_UnresolvableDestination_ReturnsDestinationNotWritableError()
        {
            // Arrange — session exists; destination id is a valid HexId form but no project
            // registered. Wire layer catches the GetParatextProject failure.
            string sessionId = SeedCAP004Session(
                out _,
                isLegacyBackup: false,
                sharedProjectMarkers: false
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = HexId.CreateNew().ToString(),
                SelectedFileIds = Array.Empty<string>(),
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(RestoreOperationErrorCode.DestinationNotWritable),
                "Unresolvable destination classifies as DestinationNotWritable per DEC-CAP-004-A"
            );
        }

        // =====================================================================
        // (3) Admin gate — CAP-019 RestorePermissionGate → PermissionDenied
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-325")]
        [Property("ScenarioId", "TS-093")]
        [Property("InvariantId", "INV-B05")]
        [Description(
            "Non-admin user → Error(PermissionDenied, %restore_adminRequired%). RestorePermissionGate.CheckAdminGate (CAP-019) returns false; wire layer aborts BEFORE write-lock per TS-093 / data-contracts.md §4.3 error matrix"
        )]
        public async Task PerformRestore_NonAdminDestination_ReturnsPermissionDeniedError()
        {
            // Arrange — destination project where current user is NOT admin
            ScrText dest = NewCAP004ScrText(isAdmin: false);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false
            );
            ArmCAP004WriteLockSuccess();
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = Array.Empty<string>(),
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.PermissionDenied));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_adminRequired%"));
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(0),
                "Admin gate fires BEFORE the orchestrator — handle.PerformOverlayRestore not invoked"
            );
            Assert.That(
                captured,
                Is.Empty,
                "No Theme-6 fire when permission denied aborts the restore"
            );
        }

        // =====================================================================
        // (4) Persist-current-changes gate (TS-072)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-317")]
        [Property("ScenarioId", "TS-072")]
        [Description(
            "Destination has pending edits AND request did NOT acknowledge persist → ConfirmationRequired(PersistCurrentChanges). Mirrors PT9 RestoreForm.cs:175 cmbScrTextDest_SelectedIndexChanged persist-prompt; PT10 surfaces as wire-level confirmation gate per data-contracts.md §3.7"
        )]
        public async Task PerformRestore_PendingChangesNotPersisted_ReturnsConfirmationRequiredPersistCurrentChanges()
        {
            // Arrange — destination is admin, no shared markers, but dirty
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out _,
                isLegacyBackup: false,
                sharedProjectMarkers: false
            );
            ArmCAP004WriteLockSuccess();
            // Override returns FALSE → destination is dirty (not persisted)
            BackupRestoreDataProvider.PersistCurrentChangesOverride = _ => false;

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = Array.Empty<string>(),
                AcknowledgedPersistCurrentChanges = false,
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.ConfirmationRequired>());
            var confirmation = (RestoreOperationResult.ConfirmationRequired)result;
            Assert.That(confirmation.Kind, Is.EqualTo(ConfirmationKind.PersistCurrentChanges));
            Assert.That(
                confirmation.MessageKey,
                Is.EqualTo(CAP004_DefaultMessageKey_PersistCurrentChanges)
            );
            Assert.That(
                confirmation.RequiresDowngradeConfirmation,
                Is.Null,
                "RequiresDowngradeConfirmation populated only for ConfirmationKind.DowngradeFiles"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-317")]
        [Property("ScenarioId", "TS-072")]
        [Description(
            "Destination has pending edits but request acknowledged persist → restore proceeds (no ConfirmationRequired). TS-072 second leg."
        )]
        public async Task PerformRestore_PendingChangesAcknowledged_Proceeds()
        {
            // Arrange — dirty dest, but caller acknowledged persist
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();
            BackupRestoreDataProvider.PersistCurrentChangesOverride = _ => false;
            ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
                AcknowledgedPersistCurrentChanges = true,
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<RestoreOperationResult.Success>(),
                "Persist-acknowledged dirty destination proceeds to overlay"
            );
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(1),
                "Handle.PerformOverlayRestore invoked when caller acknowledged persist"
            );
        }

        // =====================================================================
        // (5) Shared-project gate (BHV-323 / TS-090 / TS-091)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-323")]
        [Property("ScenarioId", "TS-090")]
        [Property("InvariantId", "INV-B06")]
        [Description(
            "Shared markers present AND not acknowledged → ConfirmationRequired(SharedProjectWarning, %restoreForm_sharedProjectWarning%). React UI shows the warning then re-invokes with AcknowledgedSharedProjectWarning=true (TS-090 No path → caller closes session)"
        )]
        public async Task PerformRestore_SharedProjectNotAcknowledged_ReturnsConfirmationRequiredSharedProjectWarning()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: true, // markers present
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
                AcknowledgedSharedProjectWarning = false, // NOT acknowledged
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.ConfirmationRequired>());
            var confirmation = (RestoreOperationResult.ConfirmationRequired)result;
            Assert.That(confirmation.Kind, Is.EqualTo(ConfirmationKind.SharedProjectWarning));
            Assert.That(
                confirmation.MessageKey,
                Is.EqualTo(CAP004_DefaultMessageKey_SharedProjectWarning)
            );
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(0),
                "Shared-project gate short-circuits BEFORE write-lock + overlay"
            );
            Assert.That(captured, Is.Empty, "No Theme-6 fire when confirmation required");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-323")]
        [Property("ScenarioId", "TS-091")]
        [Property("InvariantId", "INV-B06")]
        [Description(
            "Shared markers acknowledged → 3-file permission set stripped from SelectedFileIds before delegation (INV-B06 asymmetric detection vs removal sets — CAP-018). The handle sees the post-filter list."
        )]
        public async Task PerformRestore_SharedProjectAcknowledged_StripsPermissionFilesAndProceeds()
        {
            // Arrange — backup includes the 3 permission files + a normal file.
            // The shared-project filter (CAP-018) strips the permission files from the
            // overlay request's SelectedFileIds when the user acknowledges.
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: true,
                fileEntries: new[]
                {
                    CAP004_File("F-GEN", ComparisonResult.SourceIsNewer),
                    // PT9 ProjectPermissionManager const filenames
                    CAP004_File("F-USERS-ACCESS", ComparisonResult.SourceIsNewer) with
                    {
                        SourceDisplayName = "ProjectUserAccess.xml",
                    },
                    CAP004_File("F-USERS-LEGACY", ComparisonResult.SourceIsNewer) with
                    {
                        SourceDisplayName = "ProjectUsers.xml",
                    },
                    CAP004_File("F-USER-FIELDS", ComparisonResult.SourceIsNewer) with
                    {
                        SourceDisplayName = "ProjectUserFields.xml",
                    },
                }
            );
            ArmCAP004WriteLockSuccess();
            ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[]
                {
                    "F-GEN",
                    "F-USERS-ACCESS",
                    "F-USERS-LEGACY",
                    "F-USER-FIELDS",
                },
                AcknowledgedSharedProjectWarning = true, // acknowledged
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<RestoreOperationResult.Success>(),
                "Acknowledged shared-project warning proceeds to overlay"
            );

            // The overlay request the handle received does NOT contain the 3 permission files
            Assert.That(
                fakeRestorer.LastOverlayRequest,
                Is.Not.Null,
                "Handle received an overlay request"
            );
            Assert.That(
                fakeRestorer.LastOverlayRequest!.SelectedFileIds,
                Does.Contain("F-GEN"),
                "Normal files survive the strip"
            );
            Assert.That(
                fakeRestorer.LastOverlayRequest!.SelectedFileIds,
                Does.Not.Contain("F-USERS-ACCESS"),
                "INV-B06: ProjectUserAccess.xml stripped (detection-set file)"
            );
            Assert.That(
                fakeRestorer.LastOverlayRequest!.SelectedFileIds,
                Does.Not.Contain("F-USERS-LEGACY"),
                "INV-B06: ProjectUsers.xml stripped (detection-set file)"
            );
            Assert.That(
                fakeRestorer.LastOverlayRequest!.SelectedFileIds,
                Does.Not.Contain("F-USER-FIELDS"),
                "INV-B06: ProjectUserFields.xml stripped (removal-only file — asymmetric set)"
            );
        }

        // =====================================================================
        // (6) Downgrade gate (VAL-B07)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-319")]
        [Property("ValidationRule", "VAL-B07")]
        [Description(
            "Selected file with ComparisonResult.DestIsHigherVersion not in AcknowledgedDowngradeFileIds → ConfirmationRequired(DowngradeFiles, ...) with the missing file ids in RequiresDowngradeConfirmation"
        )]
        public async Task PerformRestore_DowngradeFileWithoutAcknowledgment_ReturnsConfirmationRequiredDowngradeFiles()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[]
                {
                    CAP004_File("F-STYLE-OLD", ComparisonResult.DestIsHigherVersion),
                    CAP004_File("F-GEN", ComparisonResult.SourceIsNewer),
                }
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-STYLE-OLD", "F-GEN" },
                AcknowledgedDowngradeFileIds = Array.Empty<string>(), // missing F-STYLE-OLD
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.ConfirmationRequired>());
            var confirmation = (RestoreOperationResult.ConfirmationRequired)result;
            Assert.That(confirmation.Kind, Is.EqualTo(ConfirmationKind.DowngradeFiles));
            Assert.That(
                confirmation.RequiresDowngradeConfirmation,
                Is.Not.Null,
                "RequiresDowngradeConfirmation is populated for DowngradeFiles kind"
            );
            Assert.That(
                confirmation.RequiresDowngradeConfirmation!,
                Has.Member("F-STYLE-OLD"),
                "Missing downgrade ids surfaced for the React UI"
            );
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(0),
                "Downgrade gate short-circuits BEFORE overlay"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-319")]
        [Property("ValidationRule", "VAL-B07")]
        [Description("All downgrade files acknowledged → restore proceeds. VAL-B07 second leg.")]
        public async Task PerformRestore_AllDowngradeFilesAcknowledged_Proceeds()
        {
            // Arrange — same setup but caller acknowledged the downgrade
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[]
                {
                    CAP004_File("F-STYLE-OLD", ComparisonResult.DestIsHigherVersion),
                }
            );
            ArmCAP004WriteLockSuccess();
            ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-STYLE-OLD" },
                AcknowledgedDowngradeFileIds = new[] { "F-STYLE-OLD" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(1),
                "Acknowledged downgrade → overlay proceeds"
            );
        }

        // =====================================================================
        // (8) Lock contention — Error(LockNotObtained) — TS-022 / INV-A18
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-022")]
        [Property("InvariantId", "INV-A18")]
        [Description(
            "WriteLockManager.ObtainLock returns null → Error(LockNotObtained, %restore_lockNotObtained%). PT9 throws LockNotObtainedException (Restorer.cs:162); PT10 catches in the orchestrator and translates to wire envelope."
        )]
        public async Task PerformRestore_LockNotObtained_ReturnsLockNotObtainedError()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockFailure(); // override returns null → lock contention
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.LockNotObtained));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_lockNotObtained%"));
            Assert.That(
                fakeRestorer.OverlayInvocations,
                Is.EqualTo(0),
                "INV-A18: Lock failure prevents the overlay from running"
            );
            Assert.That(captured, Is.Empty, "No Theme-6 fire when restore aborted on lock failure");
        }

        // =====================================================================
        // (9) Migration failure — Error(MigrationFailed) — TS-023 / TS-103 / BHV-509
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-509")]
        [Property("ScenarioId", "TS-023")]
        [Property("InvariantId", "INV-C06")]
        [Description(
            "Handle throws MigrationFailedException → Error(MigrationFailed, %restore_migrationFailed%). Mirrors PT9 Restorer.cs:187-189 returns-false-on-PTMigration-failure (BHV-509). PT10 surfaces via exception per DEC-CAP-004-E."
        )]
        public async Task PerformRestore_MigrationFails_ReturnsMigrationFailedError()
        {
            // Arrange — destination admin; handle throws MigrationFailedException on overlay
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: true, // legacy backup so PTMigration would run
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            fakeRestorer.MigrationException = new MigrationFailedException(
                "Test: PTMigration step 5 failed."
            );
            ArmCAP004WriteLockSuccess();
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.MigrationFailed));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_migrationFailed%"));
            Assert.That(captured, Is.Empty, "No Theme-6 fire when migration failed mid-restore");
        }

        // =====================================================================
        // (10) Theme-6 — fires exactly once on success; not at all on failure
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-326")]
        [Property("ScenarioId", "TS-094")]
        [Description(
            "Theme-6: after a successful overlay, SendFullProjectUpdateEvent fires EXACTLY ONCE for the destination project id. Maps to ManageBooksService.cs:279 precedent."
        )]
        public async Task PerformRestore_OverlaySuccess_FiresFullProjectUpdateEventExactlyOnce()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out _,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                captured,
                Has.Count.EqualTo(1),
                "Theme-6 fires EXACTLY ONCE per successful overlay (no duplicates, no zeros)"
            );
            Assert.That(captured[0], Is.EqualTo(dest.Guid.ToString()));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-326")]
        [Description(
            "Theme-6 negative: failed overlay (migration error) MUST NOT fire SendFullProjectUpdateEvent. Wire-stability — subscribers must not see a fake update."
        )]
        public async Task PerformRestore_OverlayFailure_DoesNotFireFullProjectUpdateEvent()
        {
            // Arrange — same as migration-failure test but assert focus is on Theme-6
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: true,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            fakeRestorer.MigrationException = new MigrationFailedException("Test");
            ArmCAP004WriteLockSuccess();
            var captured = ArmCAP004FullProjectUpdateCapture();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            Assert.That(captured, Is.Empty, "Theme-6 MUST NOT fire when the overlay itself failed");
        }

        // =====================================================================
        // Output envelope shape — Success.IsNoteType for standard project
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Success envelope: IsNoteType reflects the destination project's TranslationInfo. For a Standard-type DummyScrText, IsNoteType is false."
        )]
        public async Task PerformRestore_SuccessResult_HasIsNoteTypeFalseForStandardProject()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out _,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            var success = (RestoreOperationResult.Success)result;
            Assert.That(
                success.IsNoteType,
                Is.False,
                "Standard-type DummyScrText → IsNoteType=false. BHV-653 dispatch hint for the React UI."
            );
        }

        // =====================================================================
        // PTX-20538 (INV-A13) — legacy flag plumbed through to handle (TS-020)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-020")]
        [Property("InvariantId", "INV-A13")]
        [Description(
            "PTX-20538 / INV-A13: when metadata.IsLegacyBackup=true, the orchestrator passes IsLegacyBackup=true to the handle's PerformOverlayRestore — so the handle augments its skip-list with Language/IsoCode/TranslationInfo (preserving destination's CN-type)."
        )]
        public async Task PerformRestore_LegacyBackup_PlumbsIsLegacyBackupTrueToHandle()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: true, // <-- the key input
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                fakeRestorer.LastOverlayRequest,
                Is.Not.Null,
                "Handle received an overlay request"
            );
            Assert.That(
                fakeRestorer.LastOverlayRequest!.IsLegacyBackup,
                Is.True,
                "INV-A13 / PTX-20538: IsLegacyBackup=true plumbed through so the handle augments its fields-to-skip with Language/LanguageIsoCode/TranslationInfo"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("InvariantId", "INV-A13")]
        [Description(
            "Non-legacy backup → IsLegacyBackup=false plumbed (negative case for INV-A13). Only legacy backups trigger the augmented skip list."
        )]
        public async Task PerformRestore_NonLegacyBackup_PlumbsIsLegacyBackupFalseToHandle()
        {
            // Arrange
            ScrText dest = NewCAP004ScrText(isAdmin: true);
            ParatextProjects.FakeAddProject(CreateProjectDetails(dest), dest);

            string sessionId = SeedCAP004Session(
                out var fakeRestorer,
                isLegacyBackup: false,
                sharedProjectMarkers: false,
                fileEntries: new[] { CAP004_File("F-GEN", ComparisonResult.SourceIsNewer) }
            );
            ArmCAP004WriteLockSuccess();

            var request = new RestoreRequest
            {
                SessionId = sessionId,
                DestinationProjectId = dest.Guid.ToString(),
                SelectedFileIds = new[] { "F-GEN" },
            };

            // Act
            RestoreOperationResult result = await _provider.PerformRestoreAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                fakeRestorer.LastOverlayRequest!.IsLegacyBackup,
                Is.False,
                "INV-A13 negative: non-legacy backups do NOT trigger skip-list augmentation"
            );
        }

        // =====================================================================
        // CAP-004 helpers (test-only)
        // =====================================================================

        /// <summary>
        /// Seed a restore session via CAP-003's existing
        /// <see cref="BackupRestoreDataProvider.RestorerFactoryOverride"/> seam.
        /// Returns the minted session id and (via out parameter) the fake handle
        /// so tests can assert against its recorded interactions.
        /// </summary>
        private string SeedCAP004Session(
            out CAP004_FakeRestorerHandle fakeHandle,
            bool isLegacyBackup,
            bool sharedProjectMarkers,
            IReadOnlyList<RestoreFileEntry>? fileEntries = null
        )
        {
            string zipPath = Path.Combine(_testTempDir, $"cap004-{Guid.NewGuid():N}.zip");
            using (var fs = File.Create(zipPath))
            using (
                var archive = new System.IO.Compression.ZipArchive(
                    fs,
                    System.IO.Compression.ZipArchiveMode.Create
                )
            )
            {
                var entry = archive.CreateEntry("placeholder.txt");
                using var sw = new StreamWriter(entry.Open());
                sw.Write("x");
            }

            var metadata = new RestorerMetadata
            {
                FilePath = zipPath,
                Description = "CAP-004 fake backup",
                ProjectName = "CAP004",
                ProjectGuid = "abcdef0123456789",
                IsLegacyBackup = isLegacyBackup,
                SharedProjectMarkers = sharedProjectMarkers,
                AllFiles = fileEntries ?? Array.Empty<RestoreFileEntry>(),
                HasFigures = false,
            };

            var handle = new CAP004_FakeRestorerHandle(metadata);
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => handle;

            // Open session via wire layer to register in the registry
            var openTask = _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            openTask.Wait();
            var openResult = openTask.Result;
            if (openResult is not RestoreSessionResult.Success openSuccess)
            {
                throw new InvalidOperationException(
                    "CAP-004 test setup: SeedCAP004Session expected Success but got "
                        + openResult.GetType().Name
                );
            }

            fakeHandle = handle;
            return openSuccess.SessionId;
        }

        /// <summary>
        /// Build a minimal <see cref="RestoreFileEntry"/> for tests.
        /// </summary>
        private static RestoreFileEntry CAP004_File(string id, ComparisonResult state) =>
            new()
            {
                Id = id,
                SourceDisplayName = id,
                DestinationDisplayName = state == ComparisonResult.DestDoesNotExist ? null : id,
                ComparisonResult = state,
                IsNormallyRestored = true,
                CanViewDifferences = false,
                TooltipKey = string.Empty,
                SourceCrc = 0u,
                DestinationCrc = null,
            };

        /// <summary>
        /// Build a destination ScrText whose <c>Permissions.AmAdministrator</c>
        /// is controllable. Mirrors the
        /// <c>BackupRestoreDataProviderTests.RestoreDestinationProjects.cs</c>
        /// helper pattern.
        /// </summary>
        private static ScrText NewCAP004ScrText(bool isAdmin) =>
            new CAP004_DummyScrTextWithFakePermissions(new CAP004_FakePermissionManager(isAdmin));

        /// <summary>
        /// Wire the
        /// <see cref="RestoreOrchestrator.WriteLockObtainerOverride"/> seam to
        /// return a no-op disposable (lock acquired successfully).
        /// </summary>
        private static void ArmCAP004WriteLockSuccess()
        {
            RestoreOrchestrator.WriteLockObtainerOverride = _ => new CAP004_NoOpDisposable();
        }

        /// <summary>
        /// Wire the
        /// <see cref="RestoreOrchestrator.WriteLockObtainerOverride"/> seam to
        /// return <c>null</c> (lock contention).
        /// </summary>
        private static void ArmCAP004WriteLockFailure()
        {
            RestoreOrchestrator.WriteLockObtainerOverride = _ => null;
        }

        /// <summary>
        /// Wire the
        /// <see cref="BackupRestoreDataProvider.SendFullProjectUpdateEventOverride"/>
        /// seam to capture every projectId the wire layer fires for; returns
        /// the captured list so the test can assert against it.
        /// </summary>
        private static List<string> ArmCAP004FullProjectUpdateCapture()
        {
            var captured = new List<string>();
            BackupRestoreDataProvider.SendFullProjectUpdateEventOverride = projectId =>
                captured.Add(projectId);
            return captured;
        }

        // =====================================================================
        // Private nested test types (CAP-004) — namespaced with CAP004_ prefix
        // to avoid name collisions with sibling fixture fragments
        // =====================================================================

        /// <summary>
        /// Fake handle for CAP-004 wire-layer tests. Records the overlay
        /// invocation count, the last <see cref="RestoreOverlayRequest"/>
        /// received, and throws <see cref="MigrationException"/> when set so
        /// the orchestrator's BHV-509 path can be exercised.
        /// </summary>
        private sealed class CAP004_FakeRestorerHandle : IRestorerHandle
        {
            private readonly RestorerMetadata _metadata;
            private int _overlayInvocations;
            private bool _disposed;

            public CAP004_FakeRestorerHandle(RestorerMetadata metadata)
            {
                _metadata = metadata;
            }

            public int OverlayInvocations => _overlayInvocations;
            public RestoreOverlayRequest? LastOverlayRequest { get; private set; }
            public ScrText? LastOverlayDestination { get; private set; }

            /// <summary>When set, the next overlay invocation throws this exception.</summary>
            public Exception? MigrationException { get; set; }

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                _metadata;

            public RestoreOverlayOutcome PerformOverlayRestore(
                ScrText destination,
                RestoreOverlayRequest request
            )
            {
                _overlayInvocations++;
                LastOverlayDestination = destination;
                LastOverlayRequest = request;
                if (MigrationException is not null)
                    throw MigrationException;
                return RestoreOverlayOutcome.Success;
            }

            public void Dispose()
            {
                if (_disposed)
                    return;
                _disposed = true;
            }
        }

        /// <summary>
        /// <see cref="PermissionManager"/> subclass with caller-controlled
        /// <see cref="PermissionManager.AmAdministrator"/>. Per-fixture
        /// duplication is intentional (see
        /// <c>BackupRestoreDataProviderTests.RestoreDestinationProjects.cs</c>
        /// rationale).
        /// </summary>
        private sealed class CAP004_FakePermissionManager : PermissionManager
        {
            private readonly bool _isAdmin;

            public CAP004_FakePermissionManager(bool isAdmin)
                : base()
            {
                _isAdmin = isAdmin;
            }

            public override bool AmAdministrator => _isAdmin;
        }

        /// <summary>
        /// <see cref="DummyScrText"/> whose <see cref="ScrText.Permissions"/>
        /// returns a caller-supplied <see cref="PermissionManager"/>.
        /// </summary>
        private sealed class CAP004_DummyScrTextWithFakePermissions : DummyScrText
        {
            private readonly PermissionManager _permissions;

            public CAP004_DummyScrTextWithFakePermissions(PermissionManager permissions)
                : base()
            {
                _permissions = permissions;
            }

            public override PermissionManager Permissions => _permissions;
        }

        /// <summary>
        /// IDisposable that does nothing on dispose. Stands in for the
        /// <see cref="WriteLock"/> handle in CAP-004 wire-layer tests.
        /// </summary>
        private sealed class CAP004_NoOpDisposable : IDisposable
        {
            public bool Disposed { get; private set; }

            public void Dispose() => Disposed = true;
        }
    }
}
