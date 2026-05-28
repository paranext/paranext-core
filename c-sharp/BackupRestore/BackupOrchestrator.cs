using System;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/Backup.cs:64-97 (Backup.BackupScrText)
// Maps to: CAP-022 (M-001 implementation) — data-contracts.md §4.1
//
// IMPORTANT — PT9 source LOCATION:
//   The PT9 `Backup` class lives in `Paratext/Paratext.exe` (the WinForms project),
//   NOT in `ParatextData.dll`. ParatextData has NO equivalent — see Paratext9-Overview.md
//   and a `find Paratext/ParatextData -name "Backup.cs"` returns nothing. As a result
//   the strategic-plan-backend.md description ("thin wrapper around Backup.BackupScrText")
//   is misleading — PT10 must reimplement the full pipeline from scratch using the
//   underlying primitives that ARE in ParatextData (ScrText, ProjectFileClassifier,
//   BookSet) plus BCL System.IO.Compression.
//
// Pipeline (mirrors Backup.cs:64-97 exactly):
//   (1) scrText.PersistChanges()              [silent abort on false — TS-004]
//   (2) auto-append ".zip"                    [INV-A01]
//   (3) validate dest file/folder             [TS-005/TS-006 throw / Error envelope]
//   (4) overwrite gate (UI-coupled in PT9;
//       PT10 returns OverwriteRequired status
//       and lets the caller re-invoke with
//       confirmOverwrite=true)                [TS-007/TS-008 — INV-A02]
//   (5) create ZIP + set comment              [BHV-100 / BHV-604]
//   (6) AddProjectFiles per-file include
//       filter                                [BHV-101 / INV-A03/A05/A06]
//   (7) optional encoding-converter file      [BHV-100 transliteration branch]
//   (8) if foundFile: WriteBackupLogEntry     [INV-A04 / INV-A19 — BHV-103]
//   (9) commit ZIP + close
//
// Dependencies (all complete):
//   * CAP-014 BackupValidationService — file-spec validation (step 3)
//   * CAP-016 IncludeFiguresFlags enum — figures-flag type (step 6)
//   * CAP-023 BackupLogService — log entry append (step 8)
//
// Test seam: this stub returns NotImplementedException so the TDD tests fail with
// a runtime exception (RED state). The Implementer agent fills in the pipeline.

/// <summary>
/// Orchestrates the backup pipeline (M-001 / BHV-100). Writes a ZIP containing the
/// project's whitelist files, appends a log entry on non-empty backups, and returns
/// a discriminated <see cref="BackupResult"/> envelope (success / overwrite-required /
/// error).
/// </summary>
/// <remarks>
/// Static class — stateless. Pipeline implementation ported from PT9
/// <c>Paratext.BackupRestore.Backup.BackupScrText</c> (<c>Backup.cs:64-97</c>).
/// </remarks>
internal static class BackupOrchestrator
{
    // VISIBILITY NOTE: declared `internal` (not `public` per the
    // backend-alignment.md "Base Classes" table) because the parameter type
    // `IncludeFiguresFlags` (CAP-016) is itself `internal` (declared as such
    // when CAP-016 landed). Promoting `IncludeFiguresFlags` to public would be
    // a cross-capability change owned by CAP-016; for CAP-022 we keep the
    // orchestrator at the same accessibility as the rest of the
    // `Paranext.DataProvider.BackupRestore` services (all `internal`). The
    // BackupRestoreDataProvider wire facade lives in the same assembly so it
    // can call this method directly. Tests are granted access via
    // [InternalsVisibleTo("c-sharp-tests")] in c-sharp/AssemblyInfo.cs.
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:64-97 (BackupScrText)
    // Maps to: CAP-022 / M-001 / data-contracts.md §4.1
    /// <summary>
    /// Executes the backup pipeline for <paramref name="scrText"/>. Pre-flight validation,
    /// ZIP creation, per-file include filter, optional encoding-converter inclusion, and
    /// (when at least one file was added) backup-log entry append.
    /// </summary>
    /// <param name="scrText">Project to back up.</param>
    /// <param name="destFileSpec">
    /// Caller-supplied destination ZIP path. Auto-appends <c>.zip</c> if missing
    /// (INV-A01). Validated against the file-spec character set (VAL-A01 / INV-B04).
    /// </param>
    /// <param name="selectedBooks">
    /// Books to include. Per-book gating per INV-A05; figures are independent (INV-A06).
    /// </param>
    /// <param name="figuresFlags">
    /// Figures-folder inclusion flags. <see cref="IncludeFiguresFlags.None"/> excludes
    /// all figure folders; <see cref="IncludeFiguresFlags.Figures"/> includes
    /// <c>figures/</c>; combining with <see cref="IncludeFiguresFlags.LocalFigures"/>
    /// also includes <c>local/figures/</c> (full-size).
    /// </param>
    /// <param name="description">
    /// Free-form description written into the ZIP comment (BHV-604) and the log entry
    /// (BHV-103). Caller-formatted via
    /// <see cref="BackupDescriptionFormatter.ComputeDescription"/>.
    /// </param>
    /// <param name="includeEncodingInfo">
    /// When <c>true</c> AND the project's translation type is
    /// <c>TransliterationWithEncoder</c>, the encoding-converter file is added to the
    /// ZIP (BHV-100 transliteration branch).
    /// </param>
    /// <param name="confirmOverwrite">
    /// When <c>true</c>, the orchestrator deletes the existing file and writes the new
    /// one. When <c>false</c> AND the destination already exists, the orchestrator
    /// returns <see cref="BackupResult.OverwriteRequired"/> so the caller (UI) can
    /// prompt the user and re-invoke with <c>confirmOverwrite=true</c> on OK
    /// (INV-A02 — no silent overwrite).
    /// </param>
    /// <returns>
    /// A <see cref="BackupResult"/> — one of <see cref="BackupResult.Success"/>,
    /// <see cref="BackupResult.OverwriteRequired"/>, or <see cref="BackupResult.Error"/>.
    /// </returns>
    public static BackupResult ExecuteBackup(
        ScrText scrText,
        string destFileSpec,
        BookSet selectedBooks,
        IncludeFiguresFlags figuresFlags,
        string description,
        bool includeEncodingInfo,
        bool confirmOverwrite
    )
    {
        // RED-STATE STUB: tests for CAP-022 are written first (Outside-In TDD). The
        // Implementer agent replaces this body with the full PT9-ported pipeline.
        throw new NotImplementedException(
            "CAP-022 BackupOrchestrator.ExecuteBackup — pipeline not yet implemented. "
                + "See test-writer-CAP-022.md for the pipeline shape (PT9 source: Backup.cs:64-97)."
        );
    }
}
