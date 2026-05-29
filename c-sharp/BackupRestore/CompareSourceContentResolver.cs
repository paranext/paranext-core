using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-024 service backing the M-011 getCompareSourceContent wire
//   method. Added per DEC-319 to close the wire gap between CAP-005 (which
//   emits opaque sourceTokens in the FileCompareConfig) and the
//   DifferencesToolView React component (CAP-UI-009) which must resolve
//   those tokens to chapter or whole-book text on demand.
//
// Pattern: stateless static service (Decision Registry
//   `patterns.csharp.staticServiceForPureLogic`) — pure mapping from
//   (RestoreSession, ScrText?, sourceToken, VerseRef, singleChapter) to
//   GetCompareSourceContentResult. No state, no I/O of its own — delegates
//   reads to IRestorerHandle.ReadFileText (backup side) or ScrText.GetText
//   (destination side).
//
// PT9 anchor: PT9 had no equivalent — DifferencesToolForm received in-process
//   IGetText instances directly via ForGetPutTexts. PT10's React UI is
//   process-separate; the wire surface needs an opaque-token resolver.
//   Resolver's signature mirrors PT9 IGetText.GetText(VerseRef, bool, bool)
//   chapter-or-book granularity (Paratext/ParatextData/IGetText.cs:10) and
//   the call pattern at Paratext/EditMenu/FindInRevision.cs:18
//   (versionGetter.GetText(vref, vref.ChapterNum != 0, false)).
//
// Token format (CAP-020):
//   * tok-src-{sessionId}-{fileName} — backup-side (reads through IRestorerHandle)
//   * tok-dst-{sessionId}-{fileName} — destination-side (reads through ScrText)
//
// Error matrix (data-contracts.md §4.7):
//   * INVALID_TOKEN     — token doesn't parse, or sessionId portion mismatches
//   * INVALID_VERSE_REF — verseRef.BookNum == 0 (unknown book id)
//   * IO_ERROR          — backup-side IRestorerHandle.ReadFileText throws IOException;
//                         destination-side ScrText.GetText throws IOException;
//                         tok-dst-* with null destinationProject
//   Note: INVALID_SESSION is the wire layer's responsibility (rejects the
//         request before invoking the resolver) — the resolver only sees live
//         sessions.
//
// Invariants:
//   * INV-C01 — read-only (the resolver never invokes ScrText.PutText /
//     IRestorerHandle write methods; structurally enforced by signature).
//
// Maps to: data-contracts.md §4.7 (M-011 getCompareSourceContent);
//          strategic-plan-backend.md §CAP-024; backend-alignment.md
//          §CompareSourceContentResolver.

/// <summary>
/// CAP-024 service: resolves an opaque <c>sourceToken</c> issued by
/// <see cref="CompareToBackupBridgeService.BuildCompareConfig"/> (CAP-020) to
/// either a chapter of text (<paramref name="singleChapter"/> = <c>true</c>)
/// or a whole book (<paramref name="singleChapter"/> = <c>false</c>). Mirrors
/// PT9's <c>IGetText.GetText(VerseRef, bool, bool)</c> at
/// <c>Paratext/ParatextData/IGetText.cs:10</c> — never per-verse.
/// </summary>
/// <remarks>
/// <para>
/// SIMPLE BODY (despite cross-feature complexity at the requirements layer):
/// the resolver is a token-parse + branch-by-side dispatch. The complexity
/// lives in the wire-layer plumbing (destination-project lookup) and in the
/// IRestorerHandle / ScrText collaborators — both of which are documented in
/// their own files.
/// </para>
/// <para>
/// Stateless static — no constructor, no instance state. Tests instantiate
/// inputs (RestoreSession + ScrText? + token + VerseRef + bool) and assert
/// on the return envelope. INV-C01 (read-only) is structurally enforced:
/// no overload of <see cref="Resolve"/> accepts a writer, and the body never
/// invokes a writer on either collaborator.
/// </para>
/// </remarks>
internal static class CompareSourceContentResolver
{
    /// <summary>
    /// Resolves <paramref name="sourceToken"/> against the indicated source
    /// (backup ZIP for <c>tok-src-*</c> via
    /// <see cref="IRestorerHandle.ReadFileText"/>; destination project for
    /// <c>tok-dst-*</c> via <see cref="ScrText.GetText(VerseRef, bool, bool)"/>)
    /// at the requested granularity.
    /// </summary>
    /// <param name="session">The live restore session. Wire layer guarantees
    /// this is non-null and registered (INVALID_SESSION is the wire layer's
    /// responsibility).</param>
    /// <param name="destinationProject">The destination <see cref="ScrText"/>
    /// for <c>tok-dst-*</c> tokens. May be <c>null</c> when the wire layer
    /// could not resolve the destination — <c>tok-dst-*</c> tokens with null
    /// destination return <see cref="GetCompareSourceContentErrorCode.IoError"/>.
    /// Unused for <c>tok-src-*</c> tokens.</param>
    /// <param name="sourceToken">Opaque token from
    /// <see cref="FileCompareConfig.LeftSourceToken"/> /
    /// <see cref="FileCompareConfig.RightSourceToken"/>. Format per CAP-020:
    /// <c>tok-src-{sessionId}-{fileName}</c> /
    /// <c>tok-dst-{sessionId}-{fileName}</c>.</param>
    /// <param name="verseRef">The verse reference identifying chapter (when
    /// <paramref name="singleChapter"/> = <c>true</c>) or book (when
    /// <c>false</c>). <c>BookNum == 0</c> returns INVALID_VERSE_REF.</param>
    /// <param name="singleChapter">Mirrors PT9
    /// <c>IGetText.GetText</c>'s <c>singleChapter</c> param. <c>true</c> →
    /// chapter; <c>false</c> → whole book.</param>
    public static GetCompareSourceContentResult Resolve(
        RestoreSession session,
        ScrText? destinationProject,
        string sourceToken,
        VerseRef verseRef,
        bool singleChapter
    )
    {
        _ = session;
        _ = destinationProject;
        _ = sourceToken;
        _ = verseRef;
        _ = singleChapter;
        throw new System.NotImplementedException(
            "CompareSourceContentResolver.Resolve not implemented yet — CAP-024 RED."
                + " See test-writer-CAP-024.md for the parse + dispatch algorithm."
        );
    }
}
