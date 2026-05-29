using System;
using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: Test-seam abstraction over PT9's `Restorer` class (which lives in
//   `Paratext.exe`, not `ParatextData.dll` — verified via
//   `strings ParatextData.dll | grep Restorer` → 0 hits). CAP-003's wire
//   layer (BackupRestoreDataProvider.RestoreSession.cs) calls a factory
//   `Func<string, IRestorerHandle>` so:
//     * Production: the default factory wraps a real Restorer port over
//       SharpZipLib's ZipFile.
//     * Tests: the test fixture supplies a fake IRestorerHandle via
//       BackupRestoreDataProvider.RestorerFactoryOverride.
//
//   This decouples CAP-003's RED-state tests from any specific Restorer port
//   strategy. The implementer can choose to (a) port the full PT9 Restorer,
//   (b) implement a minimum-surface SharpZipLib wrapper, or (c) something
//   else — as long as the default factory produces an IRestorerHandle, the
//   wire contract holds.
//
// Surface (deliberately minimal — CAP-003 only):
//   * IDisposable             → CAP-003 owns the dispose lifecycle (registry
//                                Close → session Dispose → handle Dispose)
//   * BuildMetadata(...)      → wire-layer projects the open ZIP into the
//                                wire-stable RestorerMetadata snapshot
//                                (BHV-104)
// Later CAPs will extend this interface (e.g., CAP-004 needs a way to invoke
// PerformRestore; CAP-005 / CAP-024 need stream access to individual ZIP
// entries).
//
// Maps to: data-contracts.md §4.2 (M-002 openRestoreSession contract);
//          strategic-plan-backend.md §CAP-003 testing-strategy note ("Mock
//          or stub the Restorer — its constructor reads the actual ZIP.
//          Tests may need a fake Restorer or a real test ZIP file fixture").

/// <summary>
/// Abstraction over the underlying backup-ZIP open / projection logic.
/// </summary>
/// <remarks>
/// <para>
/// Production implementations wrap PT10's Restorer port over SharpZipLib's
/// ZipFile.
/// </para>
/// <para>
/// Test implementations are supplied via
/// <see cref="BackupRestoreDataProvider.RestorerFactoryOverride"/> and avoid
/// the SharpZipLib dependency entirely — they return canned
/// <see cref="RestorerMetadata"/> + dispose-tracking semantics for assertions.
/// </para>
/// <para>
/// Declared <c>internal</c> so test-assembly fake implementations are
/// reachable via the existing
/// <see cref="System.Runtime.CompilerServices.InternalsVisibleToAttribute"/>
/// in <c>c-sharp/AssemblyInfo.cs</c>.
/// </para>
/// </remarks>
internal interface IRestorerHandle : IDisposable
{
    /// <summary>
    /// Project the open ZIP into a wire-stable
    /// <see cref="RestorerMetadata"/> snapshot (BHV-104). Called once by
    /// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/>
    /// immediately after the handle is allocated; the snapshot is held on the
    /// <see cref="RestoreSession"/> for the lifetime of the session.
    /// </summary>
    /// <param name="preferredDestinationProjectId">When non-null, the
    /// implementation precomputes per-file <c>ComparisonResult</c> values
    /// against that project's current on-disk files (BHV-315 / BHV-317).
    /// When null, the implementation picks the first editable, non-resource
    /// project (or none if the backup is legacy-format).</param>
    /// <returns>An immutable per-session view of the ZIP contents.</returns>
    RestorerMetadata BuildMetadata(string? preferredDestinationProjectId);

    /// <summary>
    /// Execute the overlay-restore body for <paramref name="destination"/>:
    /// extract <paramref name="request"/>'s <c>SelectedFileIds</c> from the
    /// open ZIP and copy them onto the destination project, honoring the
    /// PTX-20538 legacy-skip-list augmentation
    /// (<see cref="RestoreOverlayRequest.IsLegacyBackup"/>) for the
    /// Settings.xml copy and persisting the destination ScrText. Called by
    /// <see cref="RestoreOrchestrator.ExecuteOverlay"/> AFTER the orchestrator
    /// has obtained the project write-lock (INV-A18) and BEFORE the lock is
    /// released — so this method must not itself acquire the project lock.
    /// </summary>
    /// <param name="destination">The resolved destination <see cref="ScrText"/>
    /// the orchestrator obtained via <c>LocalParatextProjects.GetParatextProject</c>.</param>
    /// <param name="request">Per-call overlay payload — see
    /// <see cref="RestoreOverlayRequest"/>.</param>
    /// <returns>
    /// <see cref="RestoreOverlayOutcome.Success"/> on successful overlay.
    /// Failures are signalled via thrown exceptions per DEC-CAP-004-F:
    /// <see cref="MigrationFailedException"/> for BHV-509 migration failure;
    /// <see cref="Paratext.Data.Repository.LockNotObtainedException"/> if a
    /// follow-up lock acquisition (post-overlay) fails. Any other unhandled
    /// exception propagates as <see cref="System.IO.IOException"/>-classed
    /// failure that the orchestrator maps to
    /// <see cref="RestoreOperationErrorCode.IoError"/>.
    /// </returns>
    RestoreOverlayOutcome PerformOverlayRestore(ScrText destination, RestoreOverlayRequest request);
}
