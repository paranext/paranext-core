namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §2.2 — the wire-stable request payload for M-002
//   openRestoreSession (Section 4.2). Replaces PT9's UI-direct call into the
//   `RestoreForm` two-stage modality (BHV-313 / BHV-652): PT9 opened an OpenFileDialog
//   inside the form constructor, then constructed a `Restorer(filePath)` whose ctor
//   read the ZIP synchronously. PT10 splits this into:
//     (1) UI side opens the file picker (TS-064 / gm-024), and on a valid pick
//     (2) emits a JSON-RPC call to `openRestoreSession({ zipPath })` whose result
//         carries a session id used by subsequent calls (performRestore,
//         compareBackupFile, closeRestoreSession).
//
// PT10 deltas vs PT9 call site:
//   * Wire boundary: OpenRestoreSessionRequest is the JSON-RPC `params` envelope for
//     `dataProvider:platformBackupRestore.backupRestore.openRestoreSession` (per
//     backend-alignment.md §JSON-RPC Wire Contract M-002).
//   * ZIP path-as-string: PT9 received the path via `OpenFileDialog.FileName`; PT10
//     receives it as a wire-stable `string` (`zipPath`). The wire layer's first guard
//     is `File.Exists(zipPath)` → `Error(MissingBackupFile)` (TS-017).
//   * preferredDestinationProjectId added: PT9's RestoreForm had a separate
//     `cmbScrTextDest` combo (BHV-315) whose selected project drove the comparison
//     pre-compute. PT10 surfaces an OPTIONAL pre-selection here so the backend can
//     precompute `RestoreFileEntry.comparisonResult` for the preferred destination
//     before returning (BHV-317). Null → backend picks the first editable
//     non-resource project.
//
// Maps to: data-contracts.md §2.2 (C# block) + §4.2 (M-002 openRestoreSession
//   parameter type)

/// <summary>
/// Request payload for <c>M-002 openRestoreSession</c>
/// (<see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/>).
/// Encapsulates the file path the user picked plus an optional preferred-destination
/// project hint used for comparison precomputation (BHV-315 / BHV-317).
/// </summary>
/// <remarks>
/// Validation rules (per data-contracts.md §2.2):
/// <list type="bullet">
///   <item><see cref="ZipPath"/> non-empty AND <c>File.Exists(zipPath)</c> — failure
///     returns <c>Error(MissingBackupFile, %restore_missingBackupFile%)</c>.</item>
///   <item>The file must parse as a valid ZIP per the underlying Restorer ctor —
///     failure returns
///     <c>Error(InvalidBackupFile, %restore_invalidBackupFile%)</c>.</item>
/// </list>
/// </remarks>
internal sealed record OpenRestoreSessionRequest
{
    /// <summary>
    /// Absolute path to the <c>.zip</c> file the user picked. Wire layer first checks
    /// <see cref="System.IO.File.Exists"/> before attempting to open it.
    /// </summary>
    public string ZipPath { get; init; } = string.Empty;

    /// <summary>
    /// Optional preferred destination project id. If provided, comparison vs that
    /// project's current files is precomputed on open (BHV-315 / BHV-317). If null
    /// or omitted, the backend picks the first editable, non-resource project (or
    /// none if <c>isLegacyBackup</c> filters out all candidates).
    /// </summary>
    public string? PreferredDestinationProjectId { get; init; }
}
