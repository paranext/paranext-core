using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §2.6 — the wire-stable request payload for M-011
//   getCompareSourceContent. Added per DEC-319 to close the wire gap between
//   CAP-005 (M-004 compareBackupFile, which emits opaque sourceTokens) and the
//   DifferencesToolView React component (CAP-UI-009), which must resolve those
//   tokens to chapter or whole-book text on demand.
//
// PT9 anchor: signature mirrors PT9's IGetText.GetText(VerseRef vref,
//   bool singleChapter, bool doMapIn) at Paratext/ParatextData/IGetText.cs:10
//   — chapter or whole book, never per-verse. The PT9 doMapIn parameter is NOT
//   surfaced at the wire layer: backup-side reads do not perform versification
//   mapping (the backup's own settings carry the backup-time versification;
//   the caller's verseRef is interpreted in that versification).
//
// PT10 deltas:
//   * VerseRef is carried as a structured SIL.Scripture.VerseRef on the C#
//     side. The TypeScript wire surface (§2.6) is the flat
//     `{ bookId, chapter, verse }` triplet — the deserializer projects between
//     the two shapes.
//   * SessionId + SourceToken are the two ids needed to route the resolve to
//     the right side (backup ZIP vs destination ScrText). The session must be
//     live (else INVALID_SESSION); the token must match this session (else
//     INVALID_TOKEN).
//
// Maps to: data-contracts.md §2.6 (C# block).
// Behaviors: BHV-500 / BHV-501 / BHV-502 (closes the chain transitively).

/// <summary>
/// Request payload for
/// <see cref="BackupRestoreDataProvider.GetCompareSourceContentAsync"/>
/// (M-011, data-contracts.md §2.6). Carries the session handle, the opaque
/// source token from <see cref="FileCompareConfig"/>, the verse-reference at
/// which to extract content, and the chapter-or-book granularity flag.
/// </summary>
internal sealed record GetCompareSourceContentRequest
{
    /// <summary>
    /// Session handle returned by <c>openRestoreSession</c>. Must reference a
    /// live session (else <see cref="GetCompareSourceContentErrorCode.InvalidSession"/>).
    /// </summary>
    public string SessionId { get; init; } = string.Empty;

    /// <summary>
    /// Opaque token from
    /// <see cref="FileCompareConfig.LeftSourceToken"/> (backup-side) or
    /// <see cref="FileCompareConfig.RightSourceToken"/> (destination-side).
    /// Format per CAP-020:
    /// <c>tok-src-{sessionId}-{fileName}</c> /
    /// <c>tok-dst-{sessionId}-{fileName}</c>. Tokens that do not parse, or do
    /// not embed this session's id, return
    /// <see cref="GetCompareSourceContentErrorCode.InvalidToken"/>.
    /// </summary>
    public string SourceToken { get; init; } = string.Empty;

    /// <summary>
    /// Verse reference the caller wants displayed. When
    /// <see cref="SingleChapter"/> is <c>true</c>, the chapter the
    /// <see cref="VerseRef"/> points at is returned (the verse number is
    /// otherwise ignored). When <c>false</c>, the whole book is returned.
    /// </summary>
    /// <remarks>
    /// VerseRef.BookNum == 0 (unknown book id) returns
    /// <see cref="GetCompareSourceContentErrorCode.InvalidVerseRef"/>.
    /// </remarks>
    public VerseRef VerseRef { get; init; } = new();

    /// <summary>
    /// <c>true</c> to return the chapter <see cref="VerseRef"/> points at;
    /// <c>false</c> to return the whole book. Mirrors PT9's
    /// <c>IGetText.GetText(vref, singleChapter, doMapIn)</c> at
    /// <c>Paratext/ParatextData/IGetText.cs:10</c>.
    /// </summary>
    public bool SingleChapter { get; init; }
}
