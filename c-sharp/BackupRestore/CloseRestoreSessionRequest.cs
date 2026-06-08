namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §4.10 — the wire-stable request payload for M-010
//   closeRestoreSession. Replaces PT9's UI-side "form closed via Cancel / X /
//   Esc" lifecycle (BHV-652 two-stage modality) with an explicit JSON-RPC call
//   the React UI MUST make on every cancel surface (data-contracts.md §6.2 has
//   5 cancel paths) and on every successful performRestore-return for
//   symmetry. PT9 destroyed the in-process `Restorer` instance via WinForms
//   dispose semantics — PT10 has no implicit dispose, so the UI must close
//   sessions explicitly.
//
// PT10 deltas vs PT9 call site:
//   * Wire boundary: CloseRestoreSessionRequest is the JSON-RPC `params`
//     envelope for
//     `dataProvider:platformBackupRestore.backupRestore.closeRestoreSession`.
//   * SessionId-as-string: the wire layer accepts ANY string — empty,
//     unknown, expired, or live. The contract is idempotent (data-contracts.md
//     §4.10 "no preconditions"); the wire result is always Success.
//
// Maps to: data-contracts.md §4.10 (C# block) — `public sealed record
//   CloseRestoreSessionRequest { public string SessionId { get; init; } = ""; }`.

/// <summary>
/// Request payload for <c>M-010 closeRestoreSession</c>
/// (<see cref="BackupRestoreDataProvider.CloseRestoreSessionAsync"/>).
/// Carries the opaque session id returned by an earlier
/// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> call so the
/// wire layer can look it up in the
/// <see cref="RestoreSessionRegistry"/> and release the underlying resources.
/// </summary>
/// <remarks>
/// Validation rules (per data-contracts.md §4.10 "Preconditions: None"):
/// <list type="bullet">
///   <item>No preconditions — <see cref="SessionId"/> may be a stale, already-
///     closed, or never-issued handle. The result is always
///     <see cref="CloseRestoreSessionResult.Success"/>.</item>
/// </list>
/// </remarks>
internal sealed record CloseRestoreSessionRequest
{
    /// <summary>
    /// Opaque session id returned by an earlier
    /// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> call. The
    /// wire layer accepts any string — empty, unknown, expired, or live — and
    /// always returns <see cref="CloseRestoreSessionResult.Success"/>.
    /// </summary>
    public string SessionId { get; init; } = string.Empty;
}
