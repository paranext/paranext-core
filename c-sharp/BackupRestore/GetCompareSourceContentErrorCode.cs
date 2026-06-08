using System.Runtime.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.12 line 976-982 — the wire-stable error codes
//   for M-011 getCompareSourceContent. Four discrete cases corresponding to
//   the §4.7 error matrix:
//     InvalidSession   → "%restore_invalidSession%"
//     InvalidToken     → "%compare_invalidSourceToken%"
//     InvalidVerseRef  → "%compare_invalidVerseRef%"
//     IoError          → "%compare_sourceIoError%"
//
// PT10 deltas:
//   * `[EnumMember(Value="…")]` decorator pattern (DEC-323) — the wire
//     serializer emits the SCREAMING_SNAKE_CASE form (`INVALID_SESSION` etc.)
//     over JSON-RPC matching the TypeScript discriminated-union shape in §3.12.
//
// Maps to: data-contracts.md §3.12 (C# enum block).

/// <summary>
/// Discrete error codes for
/// <see cref="BackupRestoreDataProvider.GetCompareSourceContentAsync"/>
/// (<see cref="GetCompareSourceContentResult.Error"/>). Per
/// data-contracts.md §3.12 line 976-982.
/// </summary>
internal enum GetCompareSourceContentErrorCode
{
    /// <summary>
    /// The session id is unknown — never issued, already closed, or expired.
    /// Wire-stable localize key: <c>%restore_invalidSession%</c>.
    /// </summary>
    [EnumMember(Value = "INVALID_SESSION")]
    InvalidSession,

    /// <summary>
    /// The source token does not parse, or it embeds a session id that does
    /// not match this request's <c>sessionId</c>. Wire-stable localize key:
    /// <c>%compare_invalidSourceToken%</c>.
    /// </summary>
    [EnumMember(Value = "INVALID_TOKEN")]
    InvalidToken,

    /// <summary>
    /// The verse reference is malformed — typically an unrecognized book id
    /// resolves to <c>BookNum == 0</c>. Wire-stable localize key:
    /// <c>%compare_invalidVerseRef%</c>.
    /// </summary>
    [EnumMember(Value = "INVALID_VERSE_REF")]
    InvalidVerseRef,

    /// <summary>
    /// The underlying read failed — backup-side ZIP corrupted mid-session,
    /// destination ScrText read threw, destination project could not be
    /// resolved. Wire-stable localize key: <c>%compare_sourceIoError%</c>.
    /// </summary>
    [EnumMember(Value = "IO_ERROR")]
    IoError,
}
