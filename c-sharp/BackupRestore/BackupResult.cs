using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.1 — the wire-stable return envelope for M-001 createBackup
//   (Section 4.1). Replaces PT9's `void`-returning `Backup.BackupScrText` + side-effect
//   error-reporting through `ErrorProvider` and thrown exceptions.
//
// PT9 anchor: Backup.BackupScrText returns `void`. Errors surface as:
//   * thrown Exception with localized text (Backup_1, Backup_4)
//   * silent return on user-cancel of overwrite or PersistChanges() failure
//   * unconditional log entry append when at least one file was added
//
// PT10 deltas vs PT9:
//   * Discriminated-union return value (Success / OverwriteRequired / Error) — caller
//     can branch on the status rather than try/catch.
//   * OverwriteRequired surfaces what PT9 handled inline via Alert.Show — the UI/IPC
//     layer now owns the user-confirmation prompt and re-invokes ExecuteBackup with
//     confirmOverwrite=true (per data-contracts.md §3.1 BackupOverwriteRequiredResult).
//   * Error carries localize-key placeholders ("%backup_*%") rather than pre-localized
//     English; the wire boundary in BackupRestoreDataProvider resolves them via the
//     `Loc` helper before sending to the React UI.
//
// Maps to: data-contracts.md §3.1 (C# block) + §4.1 (M-001 createBackup return type)

/// <summary>
/// Return envelope for <see cref="BackupOrchestrator.ExecuteBackup"/>. One of
/// <see cref="Success"/>, <see cref="OverwriteRequired"/>, or <see cref="Error"/>.
/// Serializes/deserializes via the <c>status</c> discriminator wired by the
/// <c>[JsonPolymorphic]</c> / <c>[JsonDerivedType]</c> attributes below, matching the
/// TypeScript discriminated union in data-contracts.md §3.1.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "status")]
[JsonDerivedType(typeof(Success), "success")]
[JsonDerivedType(typeof(OverwriteRequired), "overwrite-required")]
[JsonDerivedType(typeof(Error), "error")]
public abstract record BackupResult
{
    /// <summary>
    /// The backup ZIP was written successfully to disk.
    /// </summary>
    /// <param name="DestinationPath">
    /// Absolute path of the created ZIP. May differ from the caller-supplied
    /// <c>destFileSpec</c> if the orchestrator auto-appended <c>.zip</c> (INV-A01).
    /// </param>
    /// <param name="FileSizeBytes">
    /// Size of the created ZIP file in bytes.
    /// </param>
    /// <param name="BackupLogEntryWritten">
    /// <c>true</c> iff at least one project file was added to the ZIP and a log
    /// entry was appended (INV-A04 / INV-A19). For resource projects this is
    /// <c>false</c> even when the ZIP was created.
    /// </param>
    public sealed record Success(
        string DestinationPath,
        long FileSizeBytes,
        bool BackupLogEntryWritten
    ) : BackupResult;

    /// <summary>
    /// The destination file already exists and the caller did NOT set
    /// <c>confirmOverwrite=true</c>. The caller (UI) is expected to show an
    /// overwrite-confirmation prompt and re-invoke
    /// <see cref="BackupOrchestrator.ExecuteBackup"/> with
    /// <c>confirmOverwrite=true</c> on user OK.
    /// </summary>
    /// <param name="ExistingPath">Path of the pre-existing file.</param>
    public sealed record OverwriteRequired(string ExistingPath) : BackupResult;

    /// <summary>
    /// The backup failed before any file was written. Carries a wire-stable
    /// <see cref="BackupErrorCode"/> plus a localize-key placeholder.
    /// </summary>
    /// <param name="ErrorCode">Wire-stable enum identifier.</param>
    /// <param name="ErrorKey">
    /// <c>%backup_*%</c> localize-key placeholder; resolved at the wire boundary.
    /// </param>
    /// <param name="ErrorField">
    /// Optional input-field hint for ErrorProvider-style UI binding. Values:
    /// <c>"destinationPath"</c>, <c>"projectId"</c>, <c>"userName"</c>.
    /// </param>
    /// <param name="ErrorArgs">
    /// Optional placeholder values for substitution into the localized template
    /// (e.g., the offending path for <c>%backup_invalidDestPath%</c>).
    /// </param>
    public sealed record Error(
        BackupErrorCode ErrorCode,
        string ErrorKey,
        string? ErrorField = null,
        IReadOnlyList<string>? ErrorArgs = null
    ) : BackupResult;
}
