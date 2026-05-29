namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §4.10 — the wire-stable return envelope for M-010
//   closeRestoreSession. Unlike M-001 (BackupResult) and M-002
//   (RestoreSessionResult), M-010 has NO error case — the contract says
//   "Error conditions: None — idempotent." So the discriminated union has
//   exactly one branch: Success.
//
// PT10 deltas vs PT9:
//   * PT9 had no "close session" wire shape at all — RestoreForm's dispose was
//     implicit. PT10's wire-stable single-Success-case envelope keeps the
//     room-for-growth shape (a future TTL/auto-close case could be added as
//     additional records) without breaking callers today.
//   * The single-case envelope mirrors `{ status: 'success' }` in the
//     TypeScript contract (data-contracts.md §4.10 TS block). The C# discriminated-
//     union form (vs a bare `bool`) makes the wire shape extensible.
//
// Maps to: data-contracts.md §4.10 (C# block) — `public abstract record
//   CloseRestoreSessionResult { public sealed record Success() :
//   CloseRestoreSessionResult; }`.

/// <summary>
/// Return envelope for
/// <see cref="BackupRestoreDataProvider.CloseRestoreSessionAsync"/>. Exactly
/// one case — <see cref="Success"/> — because M-010 is idempotent and has no
/// error path per data-contracts.md §4.10.
/// </summary>
internal abstract record CloseRestoreSessionResult
{
    /// <summary>
    /// The session — if it existed — was closed and its resources released.
    /// Also the result for unknown / already-closed / never-issued session
    /// ids (idempotent no-op).
    /// </summary>
    public sealed record Success() : CloseRestoreSessionResult;
}
