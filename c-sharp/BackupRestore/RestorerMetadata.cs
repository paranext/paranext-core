using System;
using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.3 — the wire-stable per-session view of the
//   backup ZIP contents (BHV-104). Replaces PT9's implicit "RestoreForm reads
//   `restorer.SourceSettings.Name`/`restorer.IsLegacyProjectBackup`/
//   `restorer.AllFiles` etc." with a single typed record the JSON-RPC layer
//   can serialize.
//
// PT9 anchor (per-property):
//   * FilePath              → Restorer.FilePath (Restorer.cs:101-104; backed
//                              by ZipFile.Name)
//   * Description           → Restorer.Comment (Restorer.cs:106-109; backed by
//                              ZipFile.ZipFileComment — BHV-604)
//   * ProjectName           → Restorer.ProjectName (Restorer.cs:96-99; backed
//                              by settings.Name)
//   * ProjectGuid           → Restorer.ProjectGuid.ToString() (Restorer.cs:91-94;
//                              null when the backup's Settings.xml is missing
//                              the Guid element — covers post-FN-010 LOOKUP-
//                              only path)
//   * IsLegacyBackup        → Restorer.IsLegacyProjectBackup (Restorer.cs:86-89)
//   * SharedProjectMarkers  → derived by scanning Restorer.AllFiles for
//                              ProjectPermissionManager.fileName /
//                              legacyProjectUsersFileName (EXT-201 / CAP-018
//                              SharedProjectFilterService — already complete)
//   * AllFiles              → projection of Restorer.AllFiles via
//                              RestoreFilePlanService.Build (CAP-017 — already
//                              complete), augmented with session-scoped Ids and
//                              source/destination CRCs.
//   * HasFigures            → derived by scanning Restorer.AllFiles for
//                              "figures/" or "local/figures/" path prefix.
//
// Maps to: data-contracts.md §3.3 (C# block).

/// <summary>
/// Per-session view of the backup ZIP contents (BHV-104). The shape that
/// drives RestoreForm rendering on the React side. Composed by
/// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> from a
/// real (or test-seam) <c>Restorer</c> instance.
/// </summary>
/// <remarks>
/// All properties are <c>init</c>-only; the record is immutable post-
/// construction so it can be safely held by a long-lived
/// <see cref="RestoreSession"/> and re-served on every subsequent
/// <c>compareBackupFile</c> / <c>performRestore</c> call without recompute.
/// </remarks>
internal sealed record RestorerMetadata
{
    /// <summary>
    /// Resolved absolute path of the backup ZIP. Mirrors <c>Restorer.FilePath</c>.
    /// </summary>
    public string FilePath { get; init; } = string.Empty;

    /// <summary>
    /// ZIP-level comment (BHV-604). Free-form metadata written by the backup
    /// pipeline (CAP-002) — typically the BackupDescriptionFormatter output.
    /// </summary>
    public string Description { get; init; } = string.Empty;

    /// <summary>Project short name inferred from the backup's <c>Settings.xml</c>.</summary>
    public string ProjectName { get; init; } = string.Empty;

    /// <summary>
    /// Project Guid from the backup's <c>Settings.xml</c>
    /// (<c>/ScriptureText/Guid</c>). PT10 reads via
    /// <c>LocalParatextProjects.LoadProjectDetails</c> (FN-003 LOOKUP only;
    /// CREATION post-FN-010 cut). Null when the backup ZIP is missing the
    /// Settings.xml entry.
    /// </summary>
    public string? ProjectGuid { get; init; }

    /// <summary>
    /// True if the backup is in a legacy format requiring <c>PTMigration</c>
    /// (BHV-509). Mirrors <c>Restorer.IsLegacyProjectBackup</c>.
    /// </summary>
    public bool IsLegacyBackup { get; init; }

    /// <summary>
    /// True if the backup contains <c>ProjectPermissionManager.fileName</c> or
    /// <c>legacyProjectUsersFileName</c> (BHV-323 / INV-B06). UI must show the
    /// shared-project warning before allowing restore.
    /// </summary>
    public bool SharedProjectMarkers { get; init; }

    /// <summary>
    /// All files in the ZIP that classify as project files. Sorted per PT9
    /// <c>RestoreFileInfo.CompareTo</c> (identical files last; INV-A10).
    /// </summary>
    public IReadOnlyList<RestoreFileEntry> AllFiles { get; init; } =
        Array.Empty<RestoreFileEntry>();

    /// <summary>
    /// Whether the backup contains any <c>figures/*</c> or
    /// <c>local/figures/*</c> entries. UI display hint (the React UI uses this
    /// to render an "includes images" badge per PT9 RestoreForm parity).
    /// </summary>
    public bool HasFigures { get; init; }
}
