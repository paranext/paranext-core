using System.Runtime.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.7 — the wire-stable error code enum for M-003
//   performRestore. Each member carries an [EnumMember] decorator pinning the
//   SCREAMING_SNAKE_CASE wire spelling so the JSON-RPC serializer emits the
//   string form the React UI expects.
//
// FN-010 / Decision 24 scope cut: CASE_CONFLICT and DUPLICATE_PROJECT_ID are
// reachable only on the new-project restore path and are unused on the active
// overlay-only path. Enum members are preserved for re-add traceability per
// scope-cascade-pattern.md.
//
// Maps to: data-contracts.md §3.7 (C# block — public enum
//   RestoreOperationErrorCode); strategic-plan-backend.md §CAP-004 error codes
//   bullet ("INVALID_SESSION, INVALID_DESTINATION, PERMISSION_DENIED,
//   LOCK_NOT_OBTAINED, MIGRATION_FAILED").

/// <summary>
/// Wire-stable error codes emitted by <c>performRestore</c>
/// (<see cref="BackupRestoreDataProvider.PerformRestoreAsync"/>). Each member's
/// <see cref="EnumMemberAttribute.Value"/> pins the JSON spelling sent over
/// the wire to the React UI.
/// </summary>
internal enum RestoreOperationErrorCode
{
    /// <summary>Session id is unknown / expired / never issued.</summary>
    [EnumMember(Value = "INVALID_SESSION")]
    InvalidSession,

    /// <summary>
    /// Current user is not Administrator of the overlay destination project
    /// (<c>BHV-325</c> / <c>VAL-B05</c> / CAP-019).
    /// </summary>
    [EnumMember(Value = "PERMISSION_DENIED")]
    PermissionDenied,

    /// <summary>
    /// New-project restore tried to install a project whose name collides with
    /// an existing project under different case.
    /// FN-010: unreachable on the active overlay-only path; preserved for
    /// re-add traceability.
    /// </summary>
    [EnumMember(Value = "CASE_CONFLICT")]
    CaseConflict,

    /// <summary>
    /// New-project restore tried to install a project whose Guid matches an
    /// existing project (PTX-22821). FN-010: unreachable on the active
    /// overlay-only path; preserved for re-add traceability.
    /// </summary>
    [EnumMember(Value = "DUPLICATE_PROJECT_ID")]
    DuplicateProjectId,

    /// <summary>
    /// <see cref="Paratext.Data.Repository.WriteLockManager.Default.ObtainLock"/>
    /// returned null (another process holds the project lock). Mirrors PT9
    /// <see cref="Paratext.Data.Repository.LockNotObtainedException"/>.
    /// </summary>
    [EnumMember(Value = "LOCK_NOT_OBTAINED")]
    LockNotObtained,

    /// <summary>
    /// <c>PTMigration.MigrateWithErrorHandling</c> reported failure (BHV-509).
    /// PT9 deletes the partial project directory (<c>deleteProjectIfFailed=true</c>);
    /// PT10 surfaces the classified failure to the caller.
    /// </summary>
    [EnumMember(Value = "MIGRATION_FAILED")]
    MigrationFailed,

    /// <summary>
    /// Destination folder is unreachable / not writable. Per
    /// <c>DEC-CAP-004-A</c> this also covers the
    /// <c>destinationProjectId</c>-unresolvable case (unknown id, non-editable,
    /// resource project) since data-contracts.md §3.7's enum has no dedicated
    /// <c>INVALID_DESTINATION</c> member.
    /// </summary>
    [EnumMember(Value = "DESTINATION_NOT_WRITABLE")]
    DestinationNotWritable,

    /// <summary>Generic IO failure during file copy / save.</summary>
    [EnumMember(Value = "IO_ERROR")]
    IoError,

    /// <summary>User canceled the operation (reserved — wire surface).</summary>
    [EnumMember(Value = "CANCELED")]
    Canceled,
}
