using System.Runtime.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.2 — the wire-stable error-code enum for M-002
//   openRestoreSession. Replaces PT9's UI-only Alert text (RestoreForm_29 for
//   missing file, RestoreForm_31 for corrupt ZIP) with a typed code that the
//   React UI translates into the user-facing localized string.
//
// Wire surface (SCREAMING_SNAKE_CASE per data-contracts.md §7.3):
//   * MISSING_BACKUP_FILE       — file does not exist on disk (TS-017)
//   * INVALID_BACKUP_FILE       — file is not a valid ZIP / read error
//                                 (TS-016, gm-014, gm-025 backend half)
//   * UNSUPPORTED_LEGACY_FORMAT — backup is in a legacy format PT10 does NOT
//                                 support (post-FN-010 scope cut path; PT9 used
//                                 PTMigration here — left in the contract for
//                                 future expansion)
//   * IO_ERROR                  — generic IO failure (out-of-disk, permission
//                                 denied, network drive disconnect)
//
// JSON serialization: per backend-alignment.md §Additional Patterns, the global
// JsonStringEnumConverter is registered with camelCase policy
// (c-sharp/JsonUtils/SerializationOptions.cs:43). Plain PascalCase members
// would serialize as `"missingBackupFile"` — wrong. Each member MUST carry an
// [EnumMember(Value = "…")] decorator to force the SCREAMING_SNAKE_CASE wire
// form. data-contracts.md §3.2 RestoreSessionErrorCode lists the four wire
// values verbatim.
//
// Maps to: data-contracts.md §3.2 (C# enum block).

/// <summary>
/// Wire-stable enum identifier for <see cref="RestoreSessionResult.Error"/>.
/// Each member carries an explicit
/// <see cref="EnumMemberAttribute.Value"/> override so JSON serialization emits
/// the SCREAMING_SNAKE_CASE wire form (data-contracts.md §3.2) regardless of
/// the global camelCase policy.
/// </summary>
internal enum RestoreSessionErrorCode
{
    /// <summary>The file at <c>zipPath</c> does not exist on disk (TS-017).</summary>
    [EnumMember(Value = "MISSING_BACKUP_FILE")]
    MissingBackupFile,

    /// <summary>
    /// The file at <c>zipPath</c> is not a valid ZIP, or could not be parsed
    /// (TS-016 / gm-014 — `ICSharpCode.SharpZipLib.Zip.ZipException`).
    /// </summary>
    [EnumMember(Value = "INVALID_BACKUP_FILE")]
    InvalidBackupFile,

    /// <summary>
    /// The backup is in a legacy format PT10 does not currently support. Future
    /// expansion path; not produced by the current Restorer port.
    /// </summary>
    [EnumMember(Value = "UNSUPPORTED_LEGACY_FORMAT")]
    UnsupportedLegacyFormat,

    /// <summary>
    /// Generic IO failure during open — out-of-disk, permission denied, network
    /// drive disconnect, etc. Catches the residue not classified above.
    /// </summary>
    [EnumMember(Value = "IO_ERROR")]
    IoError,
}
