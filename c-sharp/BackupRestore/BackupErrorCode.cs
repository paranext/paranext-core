using System.Runtime.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.1 (BackupErrorResult.errorCode field) — the wire-stable
//   error-code enum returned by `M-001 createBackup` (Section 4.1). Surfaces every
//   precondition / runtime failure of the backup pipeline as a SCREAMING_SNAKE wire
//   string (per data-contracts.md §7.3 Wire Naming Policy for Enum-Style String Codes).
//   PT9 did not need this enum — its errors were either thrown exceptions or
//   ErrorProvider.SetError side-effects on the WinForms BackupForm. PT10 returns them
//   as a structured envelope so the React UI can render localized messages without
//   string-parsing exceptions.
// Maps to: data-contracts.md §3.1 (C# block) + §7.3 (wire-serialization policy)
//
// Wire-serialization contract: each member carries an [EnumMember(Value = "...")]
// attribute mapping the C# PascalCase identifier to the SCREAMING_SNAKE wire form
// declared in data-contracts.md §3.1 TypeScript union. Without these attributes,
// JsonSerializer falls back to the global camelCase policy which would produce
// "invalidDestPath" — diverging from the wire contract's "INVALID_DEST_PATH".

/// <summary>
/// Wire-stable error-code identifiers for <see cref="BackupResult.Error"/> outcomes of
/// the <see cref="BackupOrchestrator.ExecuteBackup"/> pipeline (data-contracts.md §3.1).
/// </summary>
public enum BackupErrorCode
{
    /// <summary>Destination file spec contains illegal characters or is otherwise malformed.</summary>
    [EnumMember(Value = "INVALID_DEST_PATH")]
    InvalidDestPath,

    /// <summary>Destination folder cannot be written (read-only or missing).</summary>
    [EnumMember(Value = "DEST_FOLDER_NOT_WRITABLE")]
    DestFolderNotWritable,

    /// <summary>Project id does not resolve to a known project.</summary>
    [EnumMember(Value = "INVALID_PROJECT")]
    InvalidProject,

    /// <summary>Project is a resource (read-only); cannot be backed up.</summary>
    [EnumMember(Value = "RESOURCE_NOT_BACKUPABLE")]
    ResourceNotBackupable,

    /// <summary>User-name field is empty.</summary>
    [EnumMember(Value = "USER_NAME_REQUIRED")]
    UserNameRequired,

    /// <summary>BookSet is empty and project is not Notes-type.</summary>
    [EnumMember(Value = "NO_BOOKS_SELECTED")]
    NoBooksSelected,

    /// <summary><see cref="Paratext.Data.ScrText.PersistChanges"/> returned false (pending changes not flushed).</summary>
    [EnumMember(Value = "PERSIST_CHANGES_FAILED")]
    PersistChangesFailed,

    /// <summary>Generic file-system IO error during ZIP write or temp-file delete.</summary>
    [EnumMember(Value = "IO_ERROR")]
    IoError,
}
