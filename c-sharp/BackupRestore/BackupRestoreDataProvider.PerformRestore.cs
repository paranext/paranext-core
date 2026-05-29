using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

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
        return Task.FromResult(ExecutePerformRestore(request));
    }

    /// <summary>
    /// Synchronous guard chain + orchestrator delegate for
    /// <see cref="PerformRestoreAsync"/>. Mirrors the
    /// <see cref="CreateBackupAsync"/> / <c>ExecuteCreateBackup</c> pattern
    /// (CAP-002) — wraps once at the entry point so the body can stay
    /// readable.
    /// </summary>
    private RestoreOperationResult ExecutePerformRestore(RestoreRequest request)
    {
        // EXPLANATION:
        // Guard chain mirrors the data-contracts.md §4.3 error matrix:
        //   (1) session lookup            → InvalidSession
        //   (2) destination resolution    → DestinationNotWritable (DEC-CAP-004-A)
        //   (3) admin gate                → PermissionDenied
        //   (4) persist-current-changes   → ConfirmationRequired(PersistCurrentChanges)
        //   (5) shared-project gate       → ConfirmationRequired(SharedProjectWarning)
        //   (6) downgrade gate (VAL-B07)  → ConfirmationRequired(DowngradeFiles, missing)
        //   (7) build RestoreOverlayRequest (strip permission files when shared
        //       ack && markers; plumb IsLegacyBackup)
        //   (8) delegate to RestoreOrchestrator.ExecuteOverlay
        //   (9) on Success → fire Theme-6 SendFullProjectUpdateEvent exactly once

        // (1) Session lookup
        RestoreSession? session = SessionRegistry.Get(request.SessionId);
        if (session == null)
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.InvalidSession,
                "%restore_invalidSession%"
            );
        }

        // (2) Destination resolution — empty short-circuit + GetParatextProject
        //     catch-all. Per DEC-CAP-004-A: no INVALID_DESTINATION enum
        //     member; DestinationNotWritable is the closest semantic match.
        if (string.IsNullOrEmpty(request.DestinationProjectId))
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.DestinationNotWritable,
                "%restore_destinationNotWritable%"
            );
        }

        ScrText destination;
        try
        {
            destination = LocalParatextProjects.GetParatextProject(request.DestinationProjectId);
        }
        catch (Exception)
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.DestinationNotWritable,
                "%restore_destinationNotWritable%"
            );
        }

        // (3) Admin gate — CAP-019 RestorePermissionGate
        if (!RestorePermissionGate.CheckAdminGate(destination))
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.PermissionDenied,
                "%restore_adminRequired%"
            );
        }

        // (4) Persist-current-changes gate (BHV-317 / TS-072). Default
        //     (no override) = true → no confirmation needed. Override
        //     returning false + caller did NOT acknowledge → confirmation.
        bool persistClean = PersistCurrentChangesOverride?.Invoke(destination) ?? true;
        if (!persistClean && !request.AcknowledgedPersistCurrentChanges)
        {
            return new RestoreOperationResult.ConfirmationRequired(
                ConfirmationKind.PersistCurrentChanges,
                "%restoreForm_persistCurrentChanges%"
            );
        }

        // (5) Shared-project gate (BHV-323 / CAP-018). Markers present in
        //     session metadata AND caller did NOT acknowledge → confirmation.
        if (session.Metadata.SharedProjectMarkers && !request.AcknowledgedSharedProjectWarning)
        {
            return new RestoreOperationResult.ConfirmationRequired(
                ConfirmationKind.SharedProjectWarning,
                "%restoreForm_sharedProjectWarning%"
            );
        }

        // (6) Downgrade gate (VAL-B07). Build an id-keyed lookup of the
        //     session's known files, then for each selected file id check
        //     if its comparison result is DestIsHigherVersion AND the id is
        //     missing from the acknowledged list. Missing ids → confirmation.
        IReadOnlyList<string> missingDowngradeIds = ComputeMissingDowngradeIds(
            session.Metadata.AllFiles,
            request.SelectedFileIds,
            request.AcknowledgedDowngradeFileIds
        );
        if (missingDowngradeIds.Count > 0)
        {
            return new RestoreOperationResult.ConfirmationRequired(
                ConfirmationKind.DowngradeFiles,
                "%restoreForm_downgradeFileWarning%",
                missingDowngradeIds
            );
        }

        // (7) Build the overlay file id list — strip the 3 PT9 permission
        //     files when the caller acknowledged the shared-project warning
        //     AND markers were present (the strip only fires on the
        //     acknowledged-Yes path per INV-B06 / CAP-018 parity).
        IReadOnlyList<string> overlayFileIds =
            session.Metadata.SharedProjectMarkers && request.AcknowledgedSharedProjectWarning
                ? StripPermissionFileIds(session.Metadata.AllFiles, request.SelectedFileIds)
                : request.SelectedFileIds;

        var overlayRequest = new RestoreOverlayRequest
        {
            SelectedFileIds = overlayFileIds,
            IsLegacyBackup = session.Metadata.IsLegacyBackup,
            AcknowledgedDowngradeFileIds = request.AcknowledgedDowngradeFileIds,
        };

        // (8) Delegate to the orchestrator.
        RestoreOperationResult result = RestoreOrchestrator.ExecuteOverlay(
            destination,
            session,
            overlayRequest
        );

        // (9) Theme-6 emission — fires ONLY on Success and exactly once.
        if (result is RestoreOperationResult.Success success)
        {
            SendFullProjectUpdateEventOverride?.Invoke(success.RestoredProjectId);
        }

        return result;
    }

    /// <summary>
    /// Returns the subset of <paramref name="selectedFileIds"/> that point to
    /// a <see cref="ComparisonResult.DestIsHigherVersion"/> entry in
    /// <paramref name="allFiles"/> and are NOT present in
    /// <paramref name="acknowledgedDowngradeFileIds"/>. Non-empty result →
    /// the wire layer returns
    /// <see cref="RestoreOperationResult.ConfirmationRequired"/>
    /// with <see cref="ConfirmationKind.DowngradeFiles"/>.
    /// </summary>
    private static IReadOnlyList<string> ComputeMissingDowngradeIds(
        IReadOnlyList<RestoreFileEntry> allFiles,
        IReadOnlyList<string> selectedFileIds,
        IReadOnlyList<string> acknowledgedDowngradeFileIds
    )
    {
        if (selectedFileIds.Count == 0)
            return Array.Empty<string>();

        // EXPLANATION:
        // Build a hash of acknowledged ids (O(1) lookup) and a dictionary of
        // RestoreFileEntry keyed by id so per-selected-id work stays O(1).
        var acknowledged = new HashSet<string>(
            acknowledgedDowngradeFileIds,
            StringComparer.Ordinal
        );
        var allFilesById = new Dictionary<string, RestoreFileEntry>(
            allFiles.Count,
            StringComparer.Ordinal
        );
        foreach (var entry in allFiles)
        {
            allFilesById[entry.Id] = entry;
        }

        List<string>? missing = null;
        foreach (string id in selectedFileIds)
        {
            if (
                allFilesById.TryGetValue(id, out var entry)
                && entry.ComparisonResult == ComparisonResult.DestIsHigherVersion
                && !acknowledged.Contains(id)
            )
            {
                missing ??= new List<string>();
                missing.Add(id);
            }
        }

        return (IReadOnlyList<string>?)missing ?? Array.Empty<string>();
    }

    /// <summary>
    /// Removes shared-project permission file ids from
    /// <paramref name="selectedFileIds"/> per INV-B06 / CAP-018 parity.
    /// Matches the 3-file removal set (PT9
    /// <see cref="ProjectPermissionManager.fileName"/>,
    /// <see cref="ProjectPermissionManager.legacyProjectUsersFileName"/>,
    /// <see cref="ProjectPermissionManager.legacyProjectUserFieldsFileName"/>)
    /// by case-insensitive comparison against
    /// <see cref="RestoreFileEntry.SourceDisplayName"/>.
    /// </summary>
    private static IReadOnlyList<string> StripPermissionFileIds(
        IReadOnlyList<RestoreFileEntry> allFiles,
        IReadOnlyList<string> selectedFileIds
    )
    {
        // EXPLANATION:
        // Collect ids whose RestoreFileEntry.SourceDisplayName matches the PT9
        // 3-name removal set, then return selectedFileIds minus that set. Done
        // at the wire layer (rather than reusing SharedProjectFilterService,
        // which operates on RestoreFileInfo) to keep the contract narrow at
        // the boundary. See DEC-CAP-004-IMPL-C.
        var permissionIds = new HashSet<string>(StringComparer.Ordinal);
        foreach (var entry in allFiles)
        {
            if (IsPermissionFileName(entry.SourceDisplayName))
                permissionIds.Add(entry.Id);
        }

        if (permissionIds.Count == 0)
            return selectedFileIds;

        return selectedFileIds.Where(id => !permissionIds.Contains(id)).ToList();
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/RestoreForm.cs:365-390
    //   (WarnUserAboutUsingRestoreWithSharedProjects removal set)
    // Maps to: INV-B06 / CAP-018 SharedProjectFilterService parity at the
    //   wire-layer projection.
    private static bool IsPermissionFileName(string sourceDisplayName)
    {
        return sourceDisplayName.Equals(
                ProjectPermissionManager.fileName,
                StringComparison.OrdinalIgnoreCase
            )
            || sourceDisplayName.Equals(
                ProjectPermissionManager.legacyProjectUsersFileName,
                StringComparison.OrdinalIgnoreCase
            )
            || sourceDisplayName.Equals(
                ProjectPermissionManager.legacyProjectUserFieldsFileName,
                StringComparison.OrdinalIgnoreCase
            );
    }
}
