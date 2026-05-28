using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using Paratext.Data;
using Paratext.Data.Repository;
using PtxUtils;
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
//   (1) scrText.PersistChanges()              [Error on false — TS-004]
//   (2) auto-append ".zip"                    [INV-A01]
//   (3) validate dest file/folder             [TS-005/TS-006 Error envelope]
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

    // PT9 file-blacklist (Backup.cs:33-37). The lowercase invariant comparison
    // mirrors PT9's `filesToIgnore.Contains(lowerRelFilePath)` check. The two
    // constants are PT9-exported via VersionedText.forceChangeFileName and
    // ProjectLicense.licenseFileName — see CAP-022 plan §"Risks". We hard-code
    // the literal values here so the orchestrator does not couple to optional
    // ParatextData internal APIs.
    private static readonly HashSet<string> FilesToIgnore =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "unique.id", // VersionedText.forceChangeFileName
            "license.json", // ProjectLicense.licenseFileName
        };

    /// <summary>
    /// Unit-test seam — when non-null, overrides the inline
    /// <see cref="ScrText.PersistChanges(bool)"/> call (which is non-virtual on
    /// the SDK signature). Production code never sets or relies on this — it
    /// stays <see langword="null"/> in production. Tests set it in <c>[SetUp]</c>
    /// and clear it in <c>[TearDown]</c> to simulate the
    /// <c>PersistChanges()==false</c> scenario without subclassing.
    /// </summary>
    /// <remarks>
    /// Mirrors the proven <see cref="BackupLogService.LogFilePathOverride"/>
    /// pattern. Documented in <c>implementer-CAP-022.md</c>
    /// §"PersistChanges Test Seam".
    /// </remarks>
    internal static Func<ScrText, bool>? PersistChangesOverride { get; set; }

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
    /// ZIP (BHV-100 transliteration branch). The PT10 happy-path tests do not exercise
    /// this branch; included for PT9 parity.
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
        // EXPLANATION:
        // Pipeline mirrors PT9 Backup.cs:64-97 step-for-step. PT10 swaps:
        //   * `throw new Exception` for `BackupResult.Error` (validation errors).
        //   * `Alert.Show + return false` for `BackupResult.OverwriteRequired`
        //     (overwrite gate — UI-coupled in PT9, externalised to the caller in PT10).
        //   * `void` return for the discriminated `BackupResult` envelope.
        //   * SharpZipLib `ZipFile` for BCL `System.IO.Compression.ZipArchive`.
        // The per-file include logic in step 6 is byte-identical to
        // PT9 AddProjectFiles (Backup.cs:101-135).

        // Step 1 — PersistChanges gate (Backup.cs:68-70).
        // PT9 silently `return`s on false. PT10 returns Error envelope (TS-004
        // — data-contracts.md §4.1).
        bool persisted = PersistChangesOverride is not null
            ? PersistChangesOverride(scrText)
            : scrText.PersistChanges();
        if (!persisted)
        {
            return new BackupResult.Error(
                BackupErrorCode.PersistChangesFailed,
                "%backup_persistChangesFailed%"
            );
        }

        // Step 2 — auto-append ".zip" (Backup.cs:72-73 / INV-A01).
        if (!destFileSpec.EndsWith(".zip", StringComparison.OrdinalIgnoreCase))
            destFileSpec += ".zip";

        // Step 3 — file-spec character validation (Backup.cs:150-151 / TS-005 /
        // VAL-B03). Delegate to CAP-014's BackupValidationService. The
        // (false, ".") prefix neutralises rules 1+2 so only rule 3 (file-spec
        // character check) can fire.
        var validation = BackupValidationService.ValidateData(false, ".", destFileSpec);
        if (!validation.IsValid)
        {
            return new BackupResult.Error(
                BackupErrorCode.InvalidDestPath,
                validation.ErrorKey,
                "destinationPath",
                new[] { destFileSpec }
            );
        }

        // Step 4 — folder-writable check (Backup.cs:165-166 / TS-006).
        string destFolder = Path.GetDirectoryName(destFileSpec) ?? string.Empty;
        if (!IsFolderWritable(destFolder))
        {
            return new BackupResult.Error(
                BackupErrorCode.DestFolderNotWritable,
                "%backup_destFolderNotWritable%",
                "destinationPath",
                new[] { destFolder }
            );
        }

        // Step 5 — overwrite gate (Backup.cs:153-163 / TS-007 / TS-008 / INV-A02).
        // PT9 inline-prompts via Alert.Show; PT10 externalises the prompt.
        if (File.Exists(destFileSpec))
        {
            if (!confirmOverwrite)
                return new BackupResult.OverwriteRequired(destFileSpec);

            try
            {
                File.Delete(destFileSpec);
            }
            catch (IOException)
            {
                return new BackupResult.Error(
                    BackupErrorCode.IoError,
                    "%backup_ioError%",
                    "destinationPath",
                    new[] { destFileSpec }
                );
            }
        }

        // Step 6-9 — build the ZIP. Wrap in try/catch so any unexpected I/O fault
        // surfaces as Error(IoError) rather than escaping the orchestrator.
        try
        {
            bool foundFile = BuildBackupZip(
                scrText,
                destFileSpec,
                selectedBooks,
                figuresFlags,
                description,
                includeEncodingInfo
            );

            // Step 8 — append log entry only when at least one project file was
            // added (Backup.cs:92-93 / INV-A19). PT10 delegates to CAP-023.
            if (foundFile)
            {
                BackupLogService.AppendEntry(
                    DateTime.Now,
                    description,
                    scrText.Name,
                    selectedBooks.Summary(),
                    destFileSpec
                );
            }

            long fileSize = new FileInfo(destFileSpec).Length;
            return new BackupResult.Success(destFileSpec, fileSize, foundFile);
        }
        catch (IOException)
        {
            return new BackupResult.Error(
                BackupErrorCode.IoError,
                "%backup_ioError%",
                "destinationPath",
                new[] { destFileSpec }
            );
        }
        catch (UnauthorizedAccessException)
        {
            return new BackupResult.Error(
                BackupErrorCode.IoError,
                "%backup_ioError%",
                "destinationPath",
                new[] { destFileSpec }
            );
        }
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:78-96 + AddProjectFiles (lines 101-135)
    // Maps to: CAP-022 BHV-100 step (5)-(7) — ZIP creation + per-file include filter
    /// <summary>
    /// Opens the destination ZIP for writing, sets the archive comment, runs the
    /// per-file include filter, and (when applicable) adds the encoding-converter file.
    /// </summary>
    /// <returns>
    /// <c>true</c> iff at least one project file was added (foundFile gate per
    /// Backup.cs:82 / INV-A19). For resource projects this is always <c>false</c>
    /// even when the ZIP itself was created on disk.
    /// </returns>
    private static bool BuildBackupZip(
        ScrText scrText,
        string destFileSpec,
        BookSet selectedBooks,
        IncludeFiguresFlags figuresFlags,
        string description,
        bool includeEncodingInfo
    )
    {
        bool foundFile = false;
        using (var zipStream = new FileStream(destFileSpec, FileMode.Create, FileAccess.Write))
        using (var archive = new ZipArchive(zipStream, ZipArchiveMode.Create))
        {
            // Step 5 — backup description as ZIP archive comment (BHV-604).
            // .NET 8+ exposes ZipArchive.Comment as a settable property; the
            // value is written to the central directory by ZipArchive.Dispose.
            archive.Comment = description;

            // Step 6 — per-file include filter. PT9 gates via
            // `!scrText.IsResourceProject && AddProjectFiles(...)` (Backup.cs:82).
            // For resource projects PT9 still creates + commits the ZIP but
            // foundFile stays false — INV-A04 / INV-A19 in PT10.
            if (!scrText.IsResourceProject)
            {
                foundFile = AddProjectFiles(scrText, selectedBooks, figuresFlags, archive);
            }

            // Step 7 — encoding-converter inclusion (Backup.cs:84-90). Only fires
            // for TransliterationWithEncoder projects when the caller asked for
            // it. The PT10 happy-path test does not exercise this branch;
            // included for PT9 parity.
            if (
                includeEncodingInfo
                && IsTransliterationWithEncoder(scrText)
                && TryGetEncodingConverterFile(scrText, out string converterFile)
                && File.Exists(converterFile)
            )
            {
                string entryName = Path.GetFileName(converterFile);
                if (archive.GetEntry(entryName) == null)
                {
                    archive.CreateEntryFromFile(converterFile, entryName, CompressionLevel.Optimal);
                }
            }
        }
        return foundFile;
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:101-135 (AddProjectFiles)
    // Maps to: CAP-022 BHV-101 — per-file include filter / INV-A03/A05/A06
    /// <summary>
    /// Iterates every file under <see cref="ScrText.Directory"/>, applies the PT9
    /// classifier / book / figures / blacklist filters, and writes each matching
    /// file into <paramref name="archive"/> at its relative path.
    /// </summary>
    /// <returns><c>true</c> iff at least one file passed the filter.</returns>
    private static bool AddProjectFiles(
        ScrText scrText,
        BookSet selectedBooks,
        IncludeFiguresFlags figuresFlags,
        ZipArchive archive
    )
    {
        // EXPLANATION:
        // Mirrors PT9 AddProjectFiles (Backup.cs:101-135). For each file under
        // scrText.Directory:
        //   (a) skip if relative path matches the lowercase blacklist
        //       (force-change marker / DBL license file) — INV-A03.
        //   (b) classify via ProjectFileClassifier.Get; skip if !IsProjectFile.
        //   (c) include non-Books files when the project-file whitelist passes
        //       (PT9 takes an optional Func — PT10 omits it from the public
        //       signature; effectively "always pass" here).
        //   (d) include Books files when selectedBooks.IsSelected(BookNum) — INV-A05.
        //   (e) Figures-flag override (Backup.cs:119-126) — INV-A06.
        // Then archive.CreateEntryFromFile preserves the relative path inside the ZIP.
        bool foundFile = false;
        string baseDir = scrText.Directory;
        if (string.IsNullOrEmpty(baseDir) || !Directory.Exists(baseDir))
            return false;

        foreach (
            string filePath in Directory.EnumerateFiles(baseDir, "*.*", SearchOption.AllDirectories)
        )
        {
            string relFilePath = FileUtils.RelativeFileName(baseDir, filePath);
            string lowerRelFilePath = relFilePath.ToLowerInvariant();

            // (a) blacklist (INV-A03 / Backup.cs:109).
            if (FilesToIgnore.Contains(lowerRelFilePath))
                continue;

            // (b)-(d) classifier + per-book gate (Backup.cs:112-117).
            ProjectFileClassifier fileClassifier;
            try
            {
                fileClassifier = ProjectFileClassifier.Get(relFilePath, scrText);
            }
            catch
            {
                // Defensive: an unclassifiable file is treated as non-project.
                continue;
            }

            bool includeFile =
                fileClassifier.IsProjectFile
                && (
                    fileClassifier.FileType != ProjectFileType.Books
                    || selectedBooks.IsSelected(fileClassifier.BookNum)
                );

            // (e) Figures-flag override (Backup.cs:119-126 / INV-A06). The
            // None bit is exclusionary; the Figures and LocalFigures bits are
            // inclusionary (and override prior exclusion if both are set).
            if (
                figuresFlags.HasFlag(IncludeFiguresFlags.None)
                && fileClassifier.FileType == ProjectFileType.Figures
            )
                includeFile = false;
            if (
                (
                    figuresFlags.HasFlag(IncludeFiguresFlags.Figures)
                    && fileClassifier.FileType == ProjectFileType.Figures
                )
                || (
                    figuresFlags.HasFlag(IncludeFiguresFlags.LocalFigures)
                    && PathContainsLocalFiguresDirectory(lowerRelFilePath)
                )
            )
            {
                includeFile = true;
            }

            if (includeFile)
            {
                // Normalise path separators to forward slashes (ZIP standard).
                string entryName = relFilePath.Replace('\\', '/');
                archive.CreateEntryFromFile(filePath, entryName, CompressionLevel.Optimal);
                foundFile = true;
            }
        }
        return foundFile;
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:137-142 (PathContainsLocalFiguresDirectory)
    /// <summary>
    /// Returns whether <paramref name="relFilePath"/>'s immediate parent directory is
    /// <c>local/figures</c> (case-insensitive). Mirrors PT9's helper byte-for-byte.
    /// </summary>
    private static bool PathContainsLocalFiguresDirectory(string relFilePath)
    {
        string lower = relFilePath.ToLowerInvariant();
        string? dir = Path.GetDirectoryName(lower);
        if (dir is null)
            return false;

        string normalised = dir.Replace('\\', Path.DirectorySeparatorChar)
            .Replace('/', Path.DirectorySeparatorChar);
        return normalised.Equals(
            Path.Combine("local", "figures"),
            StringComparison.OrdinalIgnoreCase
        );
    }

    // === NEW IN PT10 ===
    // Reason: PT9's FileUtils.FolderIsWritable lives in ParatextData.dll but uses
    //   side-effect probing (writes / deletes a "testwrite.tmp" file in the target
    //   folder). We replicate the same probe locally here so the orchestrator
    //   surfaces a clean Error(DestFolderNotWritable) instead of an exception
    //   when the folder is missing or read-only. Maps to: CAP-022 step (4).
    /// <summary>
    /// Returns <c>true</c> iff <paramref name="folder"/> exists and a probe file
    /// can be created and deleted inside it.
    /// </summary>
    private static bool IsFolderWritable(string folder)
    {
        if (string.IsNullOrEmpty(folder) || !Directory.Exists(folder))
            return false;

        string probe = Path.Combine(folder, "_paranext_backup_writeprobe.tmp");
        try
        {
            using (var fs = new FileStream(probe, FileMode.Create, FileAccess.Write))
            {
                // Empty write is enough — just confirm we can create + open.
            }
            File.Delete(probe);
            return true;
        }
        catch
        {
            try
            {
                if (File.Exists(probe))
                    File.Delete(probe);
            }
            catch
            {
                // Best-effort cleanup.
            }
            return false;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:84 (TranslationInfo.Type ==
    //         ProjectType.TransliterationWithEncoder)
    /// <summary>
    /// Returns whether <paramref name="scrText"/>'s translation type is
    /// <c>TransliterationWithEncoder</c> — the PT9 gate for the encoding-converter
    /// branch.
    /// </summary>
    private static bool IsTransliterationWithEncoder(ScrText scrText)
    {
        try
        {
            return scrText.Settings.TranslationInfo?.Type == ProjectType.TransliterationWithEncoder;
        }
        catch
        {
            return false;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:86-87 (EncodingConverter.ConverterFile)
    /// <summary>
    /// Looks up the encoding-converter file associated with
    /// <paramref name="scrText"/>'s configured EncodingConverter. Returns the
    /// path via <paramref name="filePath"/> when found.
    /// </summary>
    /// <remarks>
    /// PT9 references <c>Paratext.Base.Encodings.EncodingConverter</c>, which is in
    /// Paratext.exe and not in ParatextData.dll. PT10 currently has no stable
    /// equivalent; the resolver returns <c>false</c> until the
    /// transliteration-projects feature lands. The encoding-converter branch is
    /// not exercised by CAP-022's test set — included for PT9 parity.
    /// </remarks>
    private static bool TryGetEncodingConverterFile(ScrText scrText, out string filePath)
    {
        filePath = string.Empty;
        // No PT10-stable EncodingConverter port yet — return false defensively.
        return false;
    }
}
