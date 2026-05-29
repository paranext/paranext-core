using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.7 — the wire-stable discriminated-union return
//   envelope for M-003 performRestore. Replaces PT9's mix of
//   `restorer.PerformRestore` returning bool / `Form.DialogResult` / inline
//   alerts with a single typed envelope the caller branches on.
//
// Three variants:
//   * Success                 — overlay completed; project updated in place;
//                                Theme-6 SendFullProjectUpdateEvent fires.
//   * ConfirmationRequired    — caller must show a dialog and re-invoke with
//                                the relevant acknowledgement flag.
//   * Error                   — restore aborted; project state unchanged
//                                (BHV-509 may have already deleted partial
//                                state on PTMigration failure).
//
// FN-010 / Decision 24: removed `bool IsNewProject` from Success — PT10 only
// supports overlay; original signature preserved inline in the changelog
// (data-contracts.md §3.7).
//
// Maps to: data-contracts.md §3.7 (C# block — public abstract record
//   RestoreOperationResult).

/// <summary>
/// Wire-stable return envelope for
/// <see cref="BackupRestoreDataProvider.PerformRestoreAsync"/> (M-003). One of
/// <see cref="Success"/>, <see cref="ConfirmationRequired"/>, or
/// <see cref="Error"/>.
/// </summary>
internal abstract record RestoreOperationResult
{
    /// <summary>
    /// Overlay completed successfully. <paramref name="RestoredProjectId"/>
    /// matches the request's <c>DestinationProjectId</c>.
    /// </summary>
    /// <param name="RestoredProjectId">PT10 project id of the restored
    /// project (the existing destination per FN-010 narrowing).</param>
    /// <param name="IsNoteType">Whether the restored project is a Notes-type
    /// project (drives the window dispatch in the React UI per BHV-653).</param>
    /// <remarks>
    /// [Updated 2026-05-19 — Decision 24 / FN-010: removed
    /// <c>bool IsNewProject</c>. Original signature preserved for re-add:
    /// <c>Success(string RestoredProjectId, bool IsNoteType, bool IsNewProject)</c>.]
    /// </remarks>
    public sealed record Success(string RestoredProjectId, bool IsNoteType)
        : RestoreOperationResult;

    /// <summary>
    /// A user acknowledgement is required before the restore can proceed.
    /// Caller shows the dialog corresponding to <paramref name="Kind"/>, then
    /// re-invokes <c>performRestore</c> with the relevant acknowledgement
    /// flag set on the request.
    /// </summary>
    /// <param name="Kind">Which acknowledgement is required.</param>
    /// <param name="MessageKey">Localize key for the dialog message.</param>
    /// <param name="RequiresDowngradeConfirmation">File ids needing explicit
    /// downgrade acknowledgement; non-null only when
    /// <paramref name="Kind"/> is
    /// <see cref="ConfirmationKind.DowngradeFiles"/>.</param>
    public sealed record ConfirmationRequired(
        ConfirmationKind Kind,
        string MessageKey,
        IReadOnlyList<string>? RequiresDowngradeConfirmation = null
    ) : RestoreOperationResult;

    /// <summary>
    /// Restore aborted. Project state is unchanged for precondition errors;
    /// BHV-509 migration failure may have deleted partial state.
    /// </summary>
    /// <param name="ErrorCode">Wire-stable enum identifier.</param>
    /// <param name="ErrorKey"><c>%restore_*%</c> localize-key placeholder.</param>
    /// <param name="ErrorArgs">Optional placeholder values for substitution
    /// into the localized template (e.g., the offending session id).</param>
    public sealed record Error(
        RestoreOperationErrorCode ErrorCode,
        string ErrorKey,
        IReadOnlyList<string>? ErrorArgs = null
    ) : RestoreOperationResult;
}
