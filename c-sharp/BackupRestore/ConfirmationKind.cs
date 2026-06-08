using System.Runtime.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.7 — the wire-stable confirmation-kind enum for
//   M-003 performRestore's ConfirmationRequired branch. Each member carries
//   an [EnumMember] decorator pinning the kebab-case wire spelling the React
//   UI matches against.
//
// PT9 origin: RestoreForm interleaves these gates in cmdOK_Click (shared-
// project warning at RestoreForm.cs:365-390) / cmbScrTextDest_SelectedIndexChanged
// (persist-current-changes at RestoreForm.cs:175) / dgvFiles_CellClick
// (downgrade-decline at RestoreForm.cs OkToToggleOn). PT10 hoists them all to
// the wire layer as a single ConfirmationRequired discriminated branch — the
// React UI runs the dialogs, then re-invokes performRestore with the
// acknowledgement flags flipped.
//
// Maps to: data-contracts.md §3.7 (C# block — public enum ConfirmationKind);
//   strategic-plan-backend.md §CAP-004 confirmation kinds bullet
//   ("shared-project-warning, downgrade-files, persist-current-changes").

/// <summary>
/// Wire-stable confirmation kind emitted by
/// <see cref="BackupRestoreDataProvider.PerformRestoreAsync"/> when a user
/// acknowledgement is required before the restore can proceed.
/// </summary>
internal enum ConfirmationKind
{
    /// <summary>
    /// Backup contains shared-project permission files
    /// (<c>BHV-323</c> / <c>INV-B06</c>). React UI shows
    /// <c>%restoreForm_sharedProjectWarning%</c>; on Yes the caller re-invokes
    /// with <c>AcknowledgedSharedProjectWarning=true</c>; on No the caller
    /// closes the session and reports cancellation.
    /// </summary>
    [EnumMember(Value = "shared-project-warning")]
    SharedProjectWarning,

    /// <summary>
    /// One or more selected files have
    /// <see cref="ComparisonResult.DestIsHigherVersion"/> and the caller has
    /// not yet acknowledged the downgrade (<c>VAL-B07</c> / <c>BHV-319</c>).
    /// The response carries the file ids needing acknowledgement in
    /// <c>RequiresDowngradeConfirmation</c>; the caller adds them to
    /// <c>AcknowledgedDowngradeFileIds</c> and re-invokes.
    /// </summary>
    [EnumMember(Value = "downgrade-files")]
    DowngradeFiles,

    /// <summary>
    /// Destination project has unsaved in-memory changes (<c>BHV-317</c> /
    /// <c>TS-072</c>). React UI shows the persist prompt; on Yes the caller
    /// re-invokes with <c>AcknowledgedPersistCurrentChanges=true</c> (the
    /// backend then persists), on No the caller closes the session.
    /// </summary>
    [EnumMember(Value = "persist-current-changes")]
    PersistCurrentChanges,
}
