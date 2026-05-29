using System;
using System.Threading;
using System.Threading.Tasks;
using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-004 partial-class fragment for M-003 performRestore (per
//   data-contracts.md §4.3 + backend-alignment.md §JSON-RPC Wire Contract
//   M-003). This file SUPPLIES the PerformRestoreAsync method onto the
//   `BackupRestoreDataProvider` partial-class declared in
//   BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors CAP-002 / CAP-003 / CAP-009 / CAP-011's file-split convention: each
// capability owns its own partial-class fragment (one method per file) to
// avoid edit-collision with parallel agents.
//
// Wire-layer responsibilities (per data-contracts.md §4.3):
//   (1) Lookup session via SessionRegistry.Get(request.SessionId) — null →
//       Error(InvalidSession).
//   (2) Resolve destination ScrText via LocalParatextProjects.GetParatextProject —
//       throws/unknown → Error(DestinationNotWritable) per DEC-CAP-004-A.
//   (3) Admin gate via RestorePermissionGate.CheckAdminGate (CAP-019) →
//       false → Error(PermissionDenied).
//   (4) Persist-current-changes gate (BHV-317 / TS-072) — when destination
//       has pending edits AND request did NOT acknowledge persist →
//       ConfirmationRequired(PersistCurrentChanges).
//   (5) Shared-project gate (BHV-323 / CAP-018) — when metadata.SharedProjectMarkers
//       AND request did NOT acknowledge → ConfirmationRequired(SharedProjectWarning).
//   (6) Downgrade gate (VAL-B07) — selected files with ComparisonResult.DestIsHigherVersion
//       not in AcknowledgedDowngradeFileIds → ConfirmationRequired(DowngradeFiles, ...).
//   (7) Build RestoreOverlayRequest (selected ids — minus stripped permission
//       files if shared-project was acknowledged — plus IsLegacyBackup from
//       metadata + AcknowledgedDowngradeFileIds).
//   (8) Delegate to RestoreOrchestrator.ExecuteOverlay.
//   (9) On Success → fire Theme-6 SendFullProjectUpdateEvent exactly once for
//       the destination project id; return Success envelope.
//  (10) On Error → return Error envelope unmodified (no Theme-6 fire).
//
// Test seams:
//   * SendFullProjectUpdateEventOverride (Action<string>?) — captures the
//     projectId arg so tests can assert "fires exactly once". DEC-CAP-004-B.
//   * PersistCurrentChangesOverride (Func<ScrText, bool>?) — gates step (4).
//     Returns whether the destination has pending changes that need persisting
//     (true = clean, no confirmation needed; false = dirty, confirmation
//     needed). DEC-CAP-004-D.
//
// Maps to: data-contracts.md §4.3 (M-003 performRestore); strategic-plan-backend.md
//   §CAP-004; backend-alignment.md JSON-RPC #3.

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Test seam — replaces the production Theme-6 emission
    /// (<c>_pdpFactory.GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()</c>)
    /// with a captured-args delegate. Mirrors
    /// <see cref="RestorerFactoryOverride"/> precedent. Tests set this in
    /// <c>[SetUp]</c> and reset to <c>null</c> in <c>[TearDown]</c>.
    /// Production code MUST NOT touch this.
    /// </summary>
    /// <remarks>
    /// CAP-001 BE-7 will inject the real
    /// <c>ParatextProjectDataProviderFactory</c> via the facade's
    /// constructor; until then this seam is the only emission path. See
    /// DEC-CAP-004-B in <c>test-writer-CAP-004.md</c>.
    /// </remarks>
    internal static Action<string>? SendFullProjectUpdateEventOverride { get; set; }

    /// <summary>
    /// Test seam — overrides the persist-current-changes gate for TS-072.
    /// Returns whether the destination project is "clean" (no pending
    /// in-memory edits):
    /// <list type="bullet">
    ///   <item><c>true</c> → no confirmation needed; restore proceeds.</item>
    ///   <item><c>false</c> → confirmation needed unless the request
    ///     acknowledged persist-current-changes.</item>
    /// </list>
    /// Default = <c>true</c> in tests (most tests don't need to exercise
    /// the gate). See DEC-CAP-004-D in the test-writer plan.
    /// </summary>
    internal static Func<ScrText, bool>? PersistCurrentChangesOverride { get; set; }

    /// <summary>
    /// Wire entry point for M-003 performRestore (data-contracts.md §4.3).
    /// Validates the request (session, destination, admin gate),
    /// computes any required confirmation (shared-project warning,
    /// downgrade files, persist-current-changes), delegates to
    /// <see cref="RestoreOrchestrator.ExecuteOverlay"/>, and on success fires
    /// the Theme-6 <c>SendFullProjectUpdateEvent</c> exactly once.
    /// </summary>
    /// <param name="request">Restore request payload. See
    /// <see cref="RestoreRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — overlay is synchronous. Reserved for
    /// future asynchronicity.</param>
    /// <returns>One of
    /// <see cref="RestoreOperationResult.Success"/>,
    /// <see cref="RestoreOperationResult.ConfirmationRequired"/>, or
    /// <see cref="RestoreOperationResult.Error"/>.</returns>
    public Task<RestoreOperationResult> PerformRestoreAsync(
        RestoreRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = cancellationToken;
        _ = request;
        throw new NotImplementedException(
            "PerformRestoreAsync not implemented yet — CAP-004 GREEN."
        );
    }
}
