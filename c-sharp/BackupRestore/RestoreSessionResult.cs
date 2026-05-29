using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.2 — the wire-stable discriminated-union return
//   envelope for M-002 openRestoreSession. Replaces PT9's `Restorer ctor
//   throws / Form sets DialogResult.Cancel / Form shows Alert` flow with a
//   typed envelope the caller can branch on.
//
// PT9 anchors (pre-flow):
//   * Success path     — Restorer ctor succeeds; RestoreForm body shows
//                        (gm-024 second stage); caller proceeds to
//                        cmdOK_Click. PT10: Success carries a sessionId +
//                        RestorerMetadata.
//   * Corrupt ZIP path — Restorer ctor throws inside RestoreForm.OpenZip
//                        (Paratext/BackupRestore/RestoreForm.cs:728-751,
//                        gm-025); caller sees Alert RestoreForm_31 +
//                        DialogResult.Cancel. PT10: Error carries
//                        InvalidBackupFile + "%restore_invalidBackupFile%".
//   * Missing file path — RestoreForm shows RestoreForm_29 alert (TS-067).
//                        PT10: Error carries MissingBackupFile +
//                        "%restore_missingBackupFile%".
//
// PT10 deltas vs PT9:
//   * Discriminated-union return value (Success / Error) — caller branches on
//     `result.Status` (TS) or `is Success/Error` (C#) rather than try/catch +
//     DialogResult inspection.
//   * Error carries localize-key placeholders ("%restore_*%") rather than
//     pre-localized English; the React UI's localize hook resolves them. The
//     PT9 "RestoreForm_31" key is folded into "%restore_invalidBackupFile%" per
//     backend-alignment.md §584-592.
//
// Maps to: data-contracts.md §3.2 (C# block).

/// <summary>
/// Return envelope for
/// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/>. One of
/// <see cref="Success"/> (session registered, metadata included) or
/// <see cref="Error"/> (no session created).
/// Serializes/deserializes via the <c>status</c> discriminator wired by the
/// <c>[JsonPolymorphic]</c> / <c>[JsonDerivedType]</c> attributes below, matching the
/// TypeScript discriminated union in data-contracts.md §3.2.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "status")]
[JsonDerivedType(typeof(Success), "success")]
[JsonDerivedType(typeof(Error), "error")]
internal abstract record RestoreSessionResult
{
    /// <summary>
    /// The backup ZIP was opened successfully and a session has been
    /// registered in the
    /// <see cref="RestoreSessionRegistry"/>.
    /// </summary>
    /// <param name="SessionId">
    /// Opaque 12-char hex session id (see
    /// <see cref="RestoreSessionRegistry"/>). Caller passes this back to
    /// <c>performRestore</c>, <c>compareBackupFile</c>, and
    /// <c>closeRestoreSession</c>.
    /// </param>
    /// <param name="Metadata">
    /// Per-session view of the backup ZIP contents (BHV-104).
    /// </param>
    public sealed record Success(string SessionId, RestorerMetadata Metadata)
        : RestoreSessionResult;

    /// <summary>
    /// The backup ZIP could not be opened. No session is registered; any
    /// transient resources allocated during the attempted open are fully
    /// released.
    /// </summary>
    /// <param name="ErrorCode">Wire-stable enum identifier.</param>
    /// <param name="ErrorKey">
    /// <c>%restore_*%</c> localize-key placeholder; the React UI's localize
    /// hook resolves it to the user-facing localized string.
    /// </param>
    /// <param name="ErrorArgs">
    /// Optional placeholder values for substitution into the localized
    /// template — typically the offending path for
    /// <c>%restore_missingBackupFile%</c> / <c>%restore_invalidBackupFile%</c>.
    /// </param>
    public sealed record Error(
        RestoreSessionErrorCode ErrorCode,
        string ErrorKey,
        IReadOnlyList<string>? ErrorArgs = null
    ) : RestoreSessionResult;
}
