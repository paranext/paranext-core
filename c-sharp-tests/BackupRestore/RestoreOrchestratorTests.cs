using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;
using Paratext.Data.Repository;
using Paratext.Data.Users;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-004 INNER tests for `RestoreOrchestrator.ExecuteOverlay` — the
    // mutating "overlay restore" step that mirrors PT9's
    // Restorer.PerformRestore (Restorer.cs:144-199). Pattern is the same as
    // c-sharp/ManageBooks/DeleteBooksOrchestrator (orchestrator +
    // WriteLockManager + LockNotObtainedException).
    //
    // Orchestrator responsibilities:
    //   (1) Acquire WriteLockManager.Default.ObtainLock(WriteScope.EntireProject(dest))
    //       — INV-A18 / TS-022.
    //   (2) Invoke handle.PerformOverlayRestore(dest, overlayRequest) inside
    //       a try/finally so the lock is released even on exception.
    //   (3) Catch LockNotObtainedException (orchestrator OR handle) →
    //       Error(LockNotObtained, %restore_lockNotObtained%).
    //   (4) Catch MigrationFailedException (BHV-509) →
    //       Error(MigrationFailed, %restore_migrationFailed%).
    //   (5) Success → Success(dest.Guid.ToString(), isNoteType).
    //
    // Seam:
    //   * RestoreOrchestrator.WriteLockObtainerOverride — controls
    //     WriteLockManager.ObtainLock outcome (success / null contention).
    //
    // RED-state expectation: every test fails because
    // RestoreOrchestrator.ExecuteOverlay throws NotImplementedException.

    /// <summary>
    /// CAP-004 INNER unit tests for
    /// <see cref="RestoreOrchestrator.ExecuteOverlay"/>. Verifies the
    /// orchestrator owns lock acquisition, lock release on every exit path,
    /// classification of LockNotObtainedException / MigrationFailedException
    /// to wire-stable error envelopes, and the PTX-20538 legacy-flag pass-through.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RestoreOrchestratorTests
    {
        [TearDown]
        public void TearDown()
        {
            RestoreOrchestrator.WriteLockObtainerOverride = null;
        }

        // =====================================================================
        // (1) Happy path — lock acquired, handle invoked, lock released
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("InvariantId", "INV-A18")]
        [Description(
            "INV-A18: orchestrator acquires WriteLock BEFORE invoking the handle (no destructive side effect can occur unlocked) AND releases on success."
        )]
        public void ExecuteOverlay_HappyPath_AcquiresWriteLockBeforeOverlayAndReleasesAfter()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: false);
            var lockHandle = new ObservableDisposable();
            int lockObtainedAtInvocation = -1;
            int overlayInvocations = 0;
            RestoreOrchestrator.WriteLockObtainerOverride = _ =>
            {
                lockObtainedAtInvocation = overlayInvocations; // 0 — handle not yet invoked
                return lockHandle;
            };
            handle.OnOverlay = () => overlayInvocations++;

            var overlayRequest = new RestoreOverlayRequest
            {
                SelectedFileIds = new[] { "F-GEN" },
                IsLegacyBackup = false,
            };

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                overlayRequest
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<RestoreOperationResult.Success>(),
                "Happy path returns Success"
            );
            Assert.That(
                lockObtainedAtInvocation,
                Is.EqualTo(0),
                "Lock acquired BEFORE handle invoked (overlayInvocations was 0 at acquisition)"
            );
            Assert.That(
                overlayInvocations,
                Is.EqualTo(1),
                "Handle invoked exactly once on the happy path"
            );
            Assert.That(
                lockHandle.DisposedCount,
                Is.EqualTo(1),
                "Lock released exactly once (handle.Dispose) on successful exit"
            );
        }

        // =====================================================================
        // (2) Lock not obtained — Error(LockNotObtained), handle NOT invoked
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-022")]
        [Property("InvariantId", "INV-A18")]
        [Description(
            "TS-022: WriteLockManager.ObtainLock returns null → Error(LockNotObtained). Handle MUST NOT be invoked (no destructive side effect on lock failure)."
        )]
        public void ExecuteOverlay_LockNotObtained_ReturnsLockNotObtainedError()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: false);
            RestoreOrchestrator.WriteLockObtainerOverride = _ => null; // contention

            var overlayRequest = new RestoreOverlayRequest
            {
                SelectedFileIds = new[] { "F-GEN" },
                IsLegacyBackup = false,
            };

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                overlayRequest
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.LockNotObtained));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_lockNotObtained%"));
            Assert.That(
                handle.OverlayInvocations,
                Is.EqualTo(0),
                "INV-A18: handle MUST NOT be invoked when lock acquisition failed"
            );
        }

        // =====================================================================
        // (3) Handle throws LockNotObtainedException defensively
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("InvariantId", "INV-A18")]
        [Description(
            "Defensive: even if the handle itself throws LockNotObtainedException (e.g., from a nested ScrText.Save), the orchestrator classifies to LockNotObtained — single wire-stable code."
        )]
        public void ExecuteOverlay_HandleThrowsLockNotObtainedException_ReturnsLockNotObtainedError()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: false);
            var lockHandle = new ObservableDisposable();
            RestoreOrchestrator.WriteLockObtainerOverride = _ => lockHandle;
            handle.OnOverlay = () =>
                throw new LockNotObtainedException("test: nested lock failure");

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                new RestoreOverlayRequest()
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.LockNotObtained));
            Assert.That(
                lockHandle.DisposedCount,
                Is.EqualTo(1),
                "Lock still released when the handle throws"
            );
        }

        // =====================================================================
        // (4) Migration failure — Error(MigrationFailed) via MigrationFailedException
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-509")]
        [Property("ScenarioId", "TS-023")]
        [Property("InvariantId", "INV-C06")]
        [Description(
            "BHV-509 / TS-023: handle throws MigrationFailedException → Error(MigrationFailed). PT9 returns false; PT10 surfaces via exception per DEC-CAP-004-E. Lock still released."
        )]
        public void ExecuteOverlay_HandleThrowsMigrationFailedException_ReturnsMigrationFailedError()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: true);
            var lockHandle = new ObservableDisposable();
            RestoreOrchestrator.WriteLockObtainerOverride = _ => lockHandle;
            handle.OnOverlay = () =>
                throw new MigrationFailedException("test: PTMigration step 5 failed");

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                new RestoreOverlayRequest { IsLegacyBackup = true }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Error>());
            var err = (RestoreOperationResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.MigrationFailed));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_migrationFailed%"));
            Assert.That(
                lockHandle.DisposedCount,
                Is.EqualTo(1),
                "Lock released on migration-failure exit"
            );
        }

        // =====================================================================
        // (5) Lock released even on unexpected exception
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("InvariantId", "INV-A18")]
        [Description(
            "Resource hygiene: even when handle throws an unexpected exception, the orchestrator's try/finally releases the lock. The exception is allowed to propagate OR classified to IoError (implementer choice — see contract note)."
        )]
        public void ExecuteOverlay_LockReleasedEvenWhenHandleThrows()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: false);
            var lockHandle = new ObservableDisposable();
            RestoreOrchestrator.WriteLockObtainerOverride = _ => lockHandle;
            handle.OnOverlay = () => throw new InvalidOperationException("test: unexpected");

            // Act + Assert — orchestrator either returns Error(IoError) or rethrows;
            // the LOCK RELEASE is the binding invariant we pin here.
            try
            {
                RestoreOrchestrator.ExecuteOverlay(dest, session, new RestoreOverlayRequest());
            }
            catch
            {
                // Implementer choice — rethrow is acceptable provided lock was released.
            }

            Assert.That(
                lockHandle.DisposedCount,
                Is.EqualTo(1),
                "INV-A18: Lock released even on unexpected exception path"
            );
        }

        // =====================================================================
        // (6) PTX-20538 / INV-A13 — legacy flag plumbed
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-020")]
        [Property("InvariantId", "INV-A13")]
        [Description(
            "TS-020 / PTX-20538: the orchestrator passes RestoreOverlayRequest.IsLegacyBackup=true to the handle when the input requests it — so the handle knows to augment the skip list."
        )]
        public void ExecuteOverlay_LegacyBackup_PassesIsLegacyBackupTrueToHandle()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: true);
            RestoreOrchestrator.WriteLockObtainerOverride = _ => new ObservableDisposable();

            var overlayRequest = new RestoreOverlayRequest
            {
                SelectedFileIds = new[] { "F-GEN" },
                IsLegacyBackup = true,
            };

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                overlayRequest
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                handle.LastOverlayRequest,
                Is.Not.Null,
                "Handle received an overlay request"
            );
            Assert.That(
                handle.LastOverlayRequest!.IsLegacyBackup,
                Is.True,
                "INV-A13 / PTX-20538: IsLegacyBackup plumbed through to the handle"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("InvariantId", "INV-A13")]
        [Description(
            "Non-legacy backup → IsLegacyBackup=false plumbed. Only legacy backups trigger the augmented skip list."
        )]
        public void ExecuteOverlay_NonLegacyBackup_PassesIsLegacyBackupFalseToHandle()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out var handle, isLegacyBackup: false);
            RestoreOrchestrator.WriteLockObtainerOverride = _ => new ObservableDisposable();

            var overlayRequest = new RestoreOverlayRequest
            {
                SelectedFileIds = new[] { "F-GEN" },
                IsLegacyBackup = false,
            };

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                overlayRequest
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            Assert.That(
                handle.LastOverlayRequest!.IsLegacyBackup,
                Is.False,
                "INV-A13 negative: non-legacy backups do NOT trigger the augmented skip list"
            );
        }

        // =====================================================================
        // (7) Success.RestoredProjectId matches dest.Guid
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Success envelope projects dest.Guid as RestoredProjectId — overlay scenario per FN-010 (no new-project path)."
        )]
        public void ExecuteOverlay_SuccessReturnsRestoredProjectIdMatchingDestinationGuid()
        {
            // Arrange
            ScrText dest = new RestoreOrchestratorTestScrText();
            var session = NewSession(out _, isLegacyBackup: false);
            RestoreOrchestrator.WriteLockObtainerOverride = _ => new ObservableDisposable();

            // Act
            RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
                dest,
                session,
                new RestoreOverlayRequest()
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreOperationResult.Success>());
            var success = (RestoreOperationResult.Success)result;
            Assert.That(
                success.RestoredProjectId,
                Is.EqualTo(dest.Guid.ToString()),
                "Success.RestoredProjectId = destination's HexId form (overlay-only per FN-010)"
            );
        }

        // =====================================================================
        // Helpers / fakes
        // =====================================================================

        private static RestoreSession NewSession(
            out OrchestratorFakeHandle handle,
            bool isLegacyBackup
        )
        {
            handle = new OrchestratorFakeHandle();
            var metadata = new RestorerMetadata
            {
                FilePath = "/tmp/orch-test.zip",
                ProjectName = "OrchTest",
                ProjectGuid = "abcdef0123456789",
                IsLegacyBackup = isLegacyBackup,
                SharedProjectMarkers = false,
                AllFiles = Array.Empty<RestoreFileEntry>(),
                HasFigures = false,
            };
            return new RestoreSession(sessionId: "orch-session-id", restorer: handle, metadata);
        }

        /// <summary>
        /// Fake IRestorerHandle for orchestrator unit tests.
        /// <see cref="OnOverlay"/> hook lets each test customise the handle's
        /// behavior — throw, count invocations, etc.
        /// </summary>
        private sealed class OrchestratorFakeHandle : IRestorerHandle
        {
            private int _overlayInvocations;

            public int OverlayInvocations => _overlayInvocations;
            public RestoreOverlayRequest? LastOverlayRequest { get; private set; }

            /// <summary>Optional hook. If it throws, the throw propagates.</summary>
            public Action? OnOverlay { get; set; }

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                new RestorerMetadata();

            public RestoreOverlayOutcome PerformOverlayRestore(
                ScrText destination,
                RestoreOverlayRequest request
            )
            {
                _overlayInvocations++;
                LastOverlayRequest = request;
                OnOverlay?.Invoke();
                return RestoreOverlayOutcome.Success;
            }

            public void Dispose() { }
        }

        /// <summary>
        /// Observable IDisposable that records dispose-call count. Stands in
        /// for the WriteLock handle.
        /// </summary>
        private sealed class ObservableDisposable : IDisposable
        {
            public int DisposedCount { get; private set; }

            public void Dispose() => DisposedCount++;
        }

        /// <summary>
        /// Test-local ScrText for orchestrator scenarios. Inherits
        /// <see cref="DummyScrText"/> so it has a valid HexId Guid.
        /// </summary>
        private sealed class RestoreOrchestratorTestScrText : DummyScrText { }
    }
}
