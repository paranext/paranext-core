using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-007 partial-class fragment for M-006 revealBackupLog (per
//   strategic-plan-backend.md §CAP-007). This file SUPPLIES the
//   RevealBackupLogAsync method onto the `BackupRestoreDataProvider`
//   partial-class declared in BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors the CAP-002 / CAP-003 / CAP-005 / CAP-009 / CAP-011 file-split
// convention: each capability owns its own partial-class fragment (one method
// per file) to avoid edit-collision with parallel agents.
//
// Wire-layer responsibilities (per strategic-plan-backend.md §CAP-007):
//   (1) Resolve the canonical Backup.txt path via
//       `BackupLogService.GetLogFilePath()` (CAP-023). This routing keeps
//       INV-C14 (writer and reader share the path) true by construction —
//       there is no parallel path-derivation code in this method.
//   (2) Probe `File.Exists(logFilePath)` live (no caching). The TS host needs
//       to react to first-backup transitions; caching would defeat that.
//   (3) Return `RevealBackupLogResult { Revealed: false, LogFileExists,
//       LogFilePath }`. `Revealed` is HARD-CODED `false` per DEC-315 — the C#
//       process never invokes `shell.showItemInFolder`; the TS host flips the
//       flag client-side after a successful reveal.
//   (4) No error envelope. The contract has no preconditions and no failure
//       mode at the wire boundary — `File.Exists` returns `false` on any I/O
//       error (per .NET docs) and the TS host owns the OS-reveal failure
//       surface (OS_REVEAL_FAILED per data-contracts.md §7.2.8).
//
// PT9 anchors:
//   * MainForm.cs:1048-1064 — viewBackupLogToolStripMenuItem_Click:
//       Process.Start(Backup.BackupLogFile) inside a try/catch; on exception,
//       Alert with MainForm_15 fallback + MainForm_16 title.
//   * Backup.cs:46-49 — BackupLogFile property (path resolver).
//
// PT10 deltas vs PT9:
//   * Wire layer NEVER invokes the OS shell (DEC-315). PT9 ran
//     `Process.Start` inline; PT10 ships the path + existence flag to the TS
//     host which handles the OS reveal via Electron `shell.showItemInFolder`.
//   * `File.Exists` precheck added (PT9 had none — REVIEW-FLAG-D2A-001). The
//     TS host can branch on `LogFileExists` to show a clear "no backups yet"
//     message instead of PT9's misleading MainForm_15 fallback for a
//     non-existent path.
//   * Async-shaped wire entry: the contract is async-shaped
//     (`Task<RevealBackupLogResult>`) for wire-stability with the other
//     M-### methods. The actual work — path resolution + a single `File.Exists`
//     probe — is synchronous; we wrap with `Task.FromResult`.
//
// Contract divergence note: data-contracts.md §5.3 / DEC-333 replaces M-006
//   with the `BackupLogInfo` subscribable data type. The active contract for
//   CAP-007 — per strategic-plan-backend.md §CAP-007 + Test Writer task spec
//   — keeps the imperative `Func<RevealBackupLogRequest,
//   Task<RevealBackupLogResult>>` shape. See RevealBackupLogRequest.cs
//   header.
//
// Maps to: strategic-plan-backend.md §CAP-007 (M-006 revealBackupLog);
//   alignment-decisions.md DEC-315; behavior-catalog.md §BHV-654.
// Invariants: INV-C14 (Backup log is backup-only — Backup.txt lives in
//   <SettingsDirectory>; writer + reader share the same path resolver).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Wire entry point for M-006 revealBackupLog (strategic-plan-backend.md
    /// §CAP-007). Returns the canonical <c>Backup.txt</c> path + an
    /// existence flag so the TS host can call Electron
    /// <c>shell.showItemInFolder</c> from the renderer (DEC-315).
    /// </summary>
    /// <remarks>
    /// <para>
    /// Preconditions: <c>None</c> — the contract is parameterless and the
    /// path resolver is pure (no I/O for path construction; only the
    /// existence probe touches the file system).
    /// </para>
    /// <para>
    /// Postconditions:
    /// </para>
    /// <list type="bullet">
    ///   <item><see cref="RevealBackupLogResult.LogFilePath"/> is the value
    ///     returned by <see cref="BackupLogService.GetLogFilePath"/> — the
    ///     SAME resolver used by <see cref="BackupLogService.AppendEntry"/>,
    ///     so INV-C14 (writer + reader share the path) holds by
    ///     construction.</item>
    ///   <item><see cref="RevealBackupLogResult.LogFileExists"/> reflects
    ///     <c>File.Exists(LogFilePath)</c> at call time — no caching, so the
    ///     TS host can re-poll after a first backup writes the file and see
    ///     the transition.</item>
    ///   <item><see cref="RevealBackupLogResult.Revealed"/> is always
    ///     <see langword="false"/> in the C# response. The TS host sets it
    ///     to <see langword="true"/> client-side after a successful
    ///     <c>shell.showItemInFolder</c> call (DEC-315).</item>
    ///   <item>No side effects — the wire layer performs no OS-shell call.</item>
    /// </list>
    /// <para>
    /// Error conditions: <c>None</c> at the wire layer.
    /// <see cref="System.IO.File.Exists"/> returns <see langword="false"/> on
    /// any I/O error per .NET docs; OS-reveal failures surface as the
    /// TS-side <c>OS_REVEAL_FAILED</c> envelope (data-contracts.md §7.2.8),
    /// not from this method.
    /// </para>
    /// </remarks>
    /// <param name="request">Reveal-log request payload. See
    /// <see cref="RevealBackupLogRequest"/>. Carries no fields; the wire
    /// surface is parameterless.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — the path resolver + existence probe
    /// are synchronous. Reserved for future asynchronicity (e.g., a
    /// tail-N-lines extension).</param>
    /// <returns>A populated <see cref="RevealBackupLogResult"/> with
    /// <see cref="RevealBackupLogResult.Revealed"/> always
    /// <see langword="false"/>.</returns>
    public Task<RevealBackupLogResult> RevealBackupLogAsync(
        RevealBackupLogRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Parameters are part of the wire contract but not consumed by the
        // body: `request` is the parameterless envelope (CAP-007 §contract);
        // `cancellationToken` is reserved for future asynchronicity. Suppress
        // unused-parameter analyzers.
        _ = request;
        _ = cancellationToken;

        // (1) Resolve the canonical Backup.txt path via the SAME resolver the
        //     writer uses (CAP-023). Routing through `BackupLogService.GetLogFilePath()`
        //     — rather than a parallel inline derivation — makes INV-C14
        //     (writer + reader share the path) hold by construction.
        string logFilePath = BackupLogService.GetLogFilePath();

        // (2) Probe File.Exists live (no caching) so the TS host can observe
        //     first-backup transitions on a re-poll. .NET's File.Exists returns
        //     false on any I/O error, so no try/catch is required at this layer.
        bool logFileExists = File.Exists(logFilePath);

        // (3) Envelope `Revealed` is HARD-CODED false — the C# process never
        //     invokes shell.showItemInFolder (DEC-315). The TS host flips it
        //     client-side after a successful OS reveal.
        return Task.FromResult(
            new RevealBackupLogResult(
                Revealed: false,
                LogFileExists: logFileExists,
                LogFilePath: logFilePath
            )
        );
    }
}
