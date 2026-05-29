using System;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-004 — signal that `PTMigration.MigrateWithErrorHandling` reported
//   failure during a restore (BHV-509 / TS-023 / TS-103). PT9's Restorer.PerformRestore
//   returns `false` in this case (Restorer.cs:187-189); PT10's
//   `IRestorerHandle.PerformOverlayRestore` throws this exception instead so the
//   orchestrator can catch it cleanly and translate to
//   `RestoreOperationErrorCode.MigrationFailed`. See DEC-CAP-004-E in the
//   test-writer plan.
//
// PT9 behavior parity:
//   * MigrateWithErrorHandling(deleteProjectIfFailed: true) deletes the partial
//     project directory before returning false. PT10 preserves that side-effect
//     inside `DefaultRestorerHandle.PerformOverlayRestore` — the exception is
//     thrown AFTER the directory has been cleaned, mirroring PT9 semantics.
//
// Maps to: data-contracts.md §3.7 (RestoreOperationErrorCode.MigrationFailed);
//   strategic-plan-backend.md §CAP-004 ("migration failure → MIGRATION_FAILED").

/// <summary>
/// Thrown by <see cref="IRestorerHandle.PerformOverlayRestore"/> when
/// <c>PTMigration.MigrateWithErrorHandling</c> reports failure during restore.
/// Replaces PT9's return-false-on-failure idiom with an exception that the
/// <see cref="RestoreOrchestrator"/> catches and translates to a wire-stable
/// <see cref="RestoreOperationErrorCode.MigrationFailed"/> envelope.
/// </summary>
internal sealed class MigrationFailedException : Exception
{
    public MigrationFailedException(string message)
        : base(message) { }

    public MigrationFailedException(string message, Exception innerException)
        : base(message, innerException) { }
}
