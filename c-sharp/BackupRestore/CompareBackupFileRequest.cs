namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §2.4 — the wire-stable request payload for M-004
//   compareBackupFile. Carries the opaque session id returned by
//   `openRestoreSession` plus the file id (an entry from
//   `RestorerMetadata.AllFiles[].Id`) the user right-clicked in the React
//   dgvFiles equivalent. The wire layer looks up the session via
//   `RestoreSessionRegistry.Get` and the file via the session's
//   `Metadata.AllFiles` projection, then delegates to
//   `CompareToBackupBridgeService.BuildCompareConfig` (CAP-020 DONE) to build
//   the resulting `FileCompareConfig`.
//
// PT9 deltas:
//   * PT9 had no wire-side compareBackupFile shape — RestoreForm called
//     `CompareFiles(sdfi)` directly on a `RestoreFileInfo` reference (an
//     in-process pointer into `dgvFiles`'s underlying list). PT10's React UI
//     lives in a separate process; the user clicks emit a fileId string that
//     the C# layer must resolve back to a `RestoreFileInfo` analogue (the
//     wire-side `RestoreFileEntry`).
//   * SessionId-as-string: the wire layer accepts any string — empty,
//     unknown, expired, or live. Unknown/expired → INVALID_SESSION error.
//
// Maps to: data-contracts.md §2.4 (C# block — `public sealed record
//   CompareBackupFileRequest { string SessionId; string FileId; }`).

/// <summary>
/// Request payload for <c>M-004 compareBackupFile</c>
/// (<see cref="BackupRestoreDataProvider.CompareBackupFileAsync"/>). Carries
/// the opaque session id (from an earlier
/// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> call) plus
/// the file id (from
/// <see cref="RestorerMetadata.AllFiles"/>) the user wants to compare against
/// its on-disk counterpart.
/// </summary>
/// <remarks>
/// Validation rules (per data-contracts.md §2.4):
/// <list type="bullet">
///   <item><see cref="SessionId"/>: must reference a live session →
///     <see cref="CompareBackupFileErrorCode.InvalidSession"/> if unknown.</item>
///   <item><see cref="FileId"/>: must exist in the session's file list →
///     <see cref="CompareBackupFileErrorCode.FileNotFound"/> otherwise.</item>
///   <item>The matched file's <see cref="RestoreFileEntry.ComparisonResult"/>
///     must NOT be <see cref="ComparisonResult.DestDoesNotExist"/>
///     (BHV-320 — context menu shows "Cannot compare" instead) →
///     <see cref="CompareBackupFileErrorCode.CannotCompare"/>.</item>
///   <item>The matched file's
///     <see cref="RestoreFileEntry.CanViewDifferences"/> must be
///     <c>true</c> (BHV-320 source-property gate) →
///     <see cref="CompareBackupFileErrorCode.CannotCompare"/>.</item>
/// </list>
/// </remarks>
internal sealed record CompareBackupFileRequest
{
    /// <summary>
    /// Opaque session id returned by an earlier
    /// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> call.
    /// </summary>
    public string SessionId { get; init; } = string.Empty;

    /// <summary>
    /// File id from <see cref="RestorerMetadata.AllFiles"/> — the
    /// <see cref="RestoreFileEntry.Id"/> the user wants to compare. Stable
    /// within the session.
    /// </summary>
    public string FileId { get; init; } = string.Empty;
}
