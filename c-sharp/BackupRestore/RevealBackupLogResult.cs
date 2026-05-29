namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: strategic-plan-backend.md §CAP-007 — the wire-stable return envelope
//   for M-006 revealBackupLog. PT9 had no wire shape — the in-process
//   `MainForm.cs:1048-1064` invoked `Process.Start(BackupLogFile)` and surfaced
//   any exception via an Alert (MainForm_15 fallback). PT10 splits that across
//   two layers (DEC-315):
//     * Backend (this record): returns `{Revealed: false, LogFileExists,
//       LogFilePath}` so the TS host can decide whether to call
//       Electron `shell.showItemInFolder(LogFilePath)`.
//     * TS host: on receipt, if `LogFileExists == true`, calls
//       `shell.showItemInFolder(LogFilePath)` and surfaces the reveal outcome
//       to the user; if `LogFileExists == false`, shows the MainForm_15 / _16
//       fallback Alert with `LogFilePath` interpolated.
//
// PT10 deltas vs PT9:
//   * No wire-side OS-shell call — `Revealed` is HARD-CODED `false` in every
//     C# response because the C# process never invokes
//     `shell.showItemInFolder`. The TS host flips it client-side after a
//     successful reveal (this field is preserved on the wire for symmetry +
//     downstream telemetry, not as a backend-driven flag).
//   * `File.Exists` precheck added (PT9 had none — REVIEW-FLAG-D2A-001 +
//     BHV-654 "Edge cases not handled"). The TS host can branch on
//     `LogFileExists` to show a different message when the log was never
//     written, fixing the misleading-fallback bug in PT9.
//
// Contract divergence note: data-contracts.md §5.3 / DEC-333 replaces this
//   record with the `BackupLogInfo` subscribable data type. The active
//   contract for CAP-007 — per strategic-plan-backend.md §CAP-007 + Test
//   Writer task spec — keeps THIS imperative envelope shape. See
//   RevealBackupLogRequest.cs header for the full divergence note.
//
// Maps to: strategic-plan-backend.md §CAP-007 (M-006 revealBackupLog);
//   alignment-decisions.md DEC-315; behavior-catalog.md §BHV-654.

/// <summary>
/// Return envelope for
/// <see cref="BackupRestoreDataProvider.RevealBackupLogAsync"/>. Communicates
/// the canonical backup-log path + its existence status to the TS host, which
/// performs the actual Electron <c>shell.showItemInFolder</c> reveal
/// (DEC-315).
/// </summary>
/// <param name="Revealed">
/// Always <see langword="false"/> in every C# response. The TS host sets this
/// to <see langword="true"/> client-side after a successful
/// <c>shell.showItemInFolder</c>. Preserved on the wire as a stable shape for
/// symmetry / downstream telemetry; the backend never reveals anything itself.
/// </param>
/// <param name="LogFileExists">
/// <see langword="true"/> if <c>File.Exists(LogFilePath)</c> at call time;
/// <see langword="false"/> otherwise. Probed live per call (no caching) so the
/// TS host can react to first-backup transitions without re-subscribing.
/// </param>
/// <param name="LogFilePath">
/// The canonical absolute path to <c>Backup.txt</c> resolved by
/// <see cref="BackupLogService.GetLogFilePath"/>. By INV-C14 this MUST match
/// the path used by <see cref="BackupLogService.AppendEntry"/> (the writer
/// side) — the wire layer routes through the same resolver so the invariant
/// holds by construction.
/// </param>
internal sealed record RevealBackupLogResult(bool Revealed, bool LogFileExists, string LogFilePath);
