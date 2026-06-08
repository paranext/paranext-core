namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.8 line 842 — the wire-stable error codes for
//   M-004 compareBackupFile (`public enum CompareBackupFileErrorCode {
//   InvalidSession, FileNotFound, CannotCompare }`). PT9 had no wire-side
//   compareBackupFile shape — RestoreForm gated the UI surface in-process
//   (the right-click handler simply skipped the "View differences" item for
//   DestDoesNotExist rows; there was no enum-shaped error).
//
// PT10 deltas:
//   * Wire-side discrete enum: three explicit error codes mapped to localize
//     keys (data-contracts.md §4.4 error matrix):
//       InvalidSession → "%restore_invalidSession%"
//       FileNotFound   → "%restore_fileNotFoundInBackup%"
//       CannotCompare  → "%restore_cannotCompareFiles%"
//   * `public enum` (not `internal`) — matches data-contracts.md §3.8 C# block
//     declaration. The wire serializer needs public visibility to emit the
//     string-form code (`'INVALID_SESSION'` / `'FILE_NOT_FOUND'` /
//     `'CANNOT_COMPARE'`) over JSON-RPC.
//
// Maps to: data-contracts.md §3.8 line 842 (C# enum block).
// Behaviors: BHV-320 (DestDoesNotExist gate → CannotCompare).

/// <summary>
/// Discrete error codes for
/// <see cref="BackupRestoreDataProvider.CompareBackupFileAsync"/>
/// (<see cref="CompareBackupFileResult.Error"/>). Per data-contracts.md §3.8
/// line 842.
/// </summary>
public enum CompareBackupFileErrorCode
{
    /// <summary>
    /// The session id is unknown — never issued, already closed, or expired.
    /// Wire-stable localize key: <c>%restore_invalidSession%</c>.
    /// </summary>
    InvalidSession,

    /// <summary>
    /// The file id is not present in the session's
    /// <see cref="RestorerMetadata.AllFiles"/> list. Wire-stable localize key:
    /// <c>%restore_fileNotFoundInBackup%</c>.
    /// </summary>
    FileNotFound,

    /// <summary>
    /// The file cannot be compared — either its
    /// <see cref="ComparisonResult"/> is
    /// <see cref="ComparisonResult.DestDoesNotExist"/> (no on-disk
    /// counterpart) OR its source side reports
    /// <see cref="RestoreFileEntry.CanViewDifferences"/> == false (BHV-320
    /// source-property gate). Wire-stable localize key:
    /// <c>%restore_cannotCompareFiles%</c>.
    /// </summary>
    CannotCompare,
}
