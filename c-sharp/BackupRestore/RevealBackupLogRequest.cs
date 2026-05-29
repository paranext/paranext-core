namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: strategic-plan-backend.md §CAP-007 — the wire-stable request payload
//   for M-006 revealBackupLog. PT9 had no wire surface — `MainForm.cs:1048-1064`
//   called `Process.Start(Backup.BackupLogFile)` in-process. PT10's React UI
//   lives in a separate process, so the wire layer here is the side that
//   resolves `Backup.txt`'s canonical path + checks existence; the TS host calls
//   Electron `shell.showItemInFolder(logFilePath)` on the result (DEC-315).
//
// PT10 deltas vs PT9 call site:
//   * Wire boundary: RevealBackupLogRequest is the JSON-RPC `params` envelope
//     for `dataProvider:platformBackupRestore.backupRestore.revealBackupLog`.
//   * Parameterless contract: M-006's preconditions are empty per
//     strategic-plan-backend.md §CAP-007. The wire layer is a pure read of
//     CAP-023's `BackupLogService.GetLogFilePath()` + a `File.Exists` probe.
//     The empty record preserves wire-stable extensibility (a future "force
//     refresh" / "tail-N-lines" parameter could be added without breaking
//     callers).
//
// Contract divergence note: data-contracts.md §5.3 (post-round-2 round-4
//   cleanup) replaces M-006 with the `BackupLogInfo` subscribable data type per
//   DEC-333. The active contract for CAP-007 — per strategic-plan-backend.md
//   §CAP-007 + Test Writer task spec — keeps the imperative
//   `Func<RevealBackupLogRequest, Task<RevealBackupLogResult>>` shape. Future
//   re-alignment (if any) is a separate CAP.
//
// Maps to: strategic-plan-backend.md §CAP-007 (M-006 revealBackupLog);
//   alignment-decisions.md DEC-315 (TS-side OS reveal); behavior-catalog.md
//   §BHV-654.

/// <summary>
/// Request payload for <c>M-006 revealBackupLog</c>
/// (<see cref="BackupRestoreDataProvider.RevealBackupLogAsync"/>). Carries no
/// fields — the wire surface is parameterless per strategic-plan-backend.md
/// §CAP-007. Defined as a sealed record so future extensions (e.g., a "tail-N-
/// lines" parameter) can be added without breaking the wire shape.
/// </summary>
internal sealed record RevealBackupLogRequest;
