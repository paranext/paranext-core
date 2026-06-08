using System;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.Repository;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-024 partial-class fragment for M-011 getCompareSourceContent
//   (per data-contracts.md §4.7 + strategic-plan-backend.md §CAP-024 +
//   backend-alignment.md §JSON-RPC Wire Contract). Added per DEC-319 to close
//   the wire gap between CAP-005 (M-004 compareBackupFile — emits opaque
//   sourceTokens in FileCompareConfig) and the DifferencesToolView React
//   component (CAP-UI-009 — needs text-on-demand resolution). This file
//   SUPPLIES the GetCompareSourceContentAsync method onto the
//   `BackupRestoreDataProvider` partial-class declared in
//   BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors the CAP-003 / CAP-005 / CAP-009 / CAP-011 file-split convention:
// each capability owns its own partial-class fragment (one method per file)
// to avoid edit-collision with parallel agents.
//
// Wire-layer responsibilities (per data-contracts.md §4.7):
//   (1) Session lookup — SessionRegistry.Get(request.SessionId) → null →
//       Error(InvalidSession, "%restore_invalidSession%").
//   (2) Destination lookup — for tok-dst-* tokens the resolver needs the
//       destination ScrText. The wire layer obtains it via
//       LocalParatextProjects.GetParatextProject(session.Metadata.ProjectGuid)
//       inside a try/catch (returns null on ProjectNotFoundException /
//       RegistrationRequiredException). Tests inject a fake lookup via the
//       DestinationProjectLookupOverride seam.
//   (3) Delegate to CompareSourceContentResolver.Resolve(session,
//       destinationProject, request.SourceToken, request.VerseRef,
//       request.SingleChapter).
//   (4) Return the resolver's result (no post-processing).
//
// PT9 anchors:
//   * Paratext/ParatextData/IGetText.cs:10 — IGetText.GetText(VerseRef,
//     bool singleChapter, bool doMapIn). M-011 mirrors this granularity:
//     chapter or whole book, never per-verse.
//   * Paratext/EditMenu/FindInRevision.cs:18 — call pattern
//     versionGetter.GetText(vref, vref.ChapterNum != 0, false). The
//     DifferencesToolView TS-side translates to
//     onFetchSourceContent(token, ref, ref.chapter !== 0).
//
// Implementation (CAP-024 RED):
//   * Async entry point wraps a synchronous chain in Task.FromResult, matching
//     CAP-003 / CAP-005 / CAP-011 precedent.
//   * Body currently throws NotImplementedException so the OUTER tests
//     fail at runtime — implementer fills in the (1) → (4) chain.
//
// Maps to: data-contracts.md §4.7 (M-011 getCompareSourceContent);
//   strategic-plan-backend.md §CAP-024; backend-alignment.md §JSON-RPC Wire
//   Contract M-011.
// Behaviors: BHV-500 / BHV-501 / BHV-502 (closes the chain transitively).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Test seam — replace the default
    /// <see cref="LocalParatextProjects.GetParatextProject(string)"/>-based
    /// destination resolution with a canned lookup. Mirrors
    /// <see cref="RestorerFactoryOverride"/> (CAP-003) and
    /// <see cref="RestoreDestinationProjectsServiceOverride"/> (CAP-009).
    /// Tests set this in <c>[SetUp]</c> and reset to <c>null</c> in
    /// <c>[TearDown]</c>. Production code MUST NOT touch this.
    /// </summary>
    /// <remarks>
    /// The lookup receives the resolved session's
    /// <see cref="RestorerMetadata.ProjectGuid"/> (may be <c>null</c>) and
    /// returns the destination <see cref="ScrText"/> the resolver should use
    /// for <c>tok-dst-*</c> tokens (or <c>null</c> when no destination
    /// project matches — the resolver maps that to IO_ERROR per
    /// data-contracts.md §4.7).
    /// </remarks>
    internal static Func<string?, ScrText?>? DestinationProjectLookupOverride { get; set; }

    /// <summary>
    /// Wire entry point for M-011 getCompareSourceContent (data-contracts.md
    /// §4.7). Looks up the session in <see cref="SessionRegistry"/>, resolves
    /// the destination <see cref="ScrText"/> (when present) via the
    /// <see cref="DestinationProjectLookupOverride"/> seam or
    /// <see cref="LocalParatextProjects.GetParatextProject(string)"/>, and
    /// delegates to <see cref="CompareSourceContentResolver.Resolve"/>. On any
    /// wire-layer failure (unknown session) returns the corresponding
    /// <see cref="GetCompareSourceContentResult.Error"/> envelope — no
    /// exceptions cross the wire boundary per data-contracts.md §3.12 / §4.7.
    /// </summary>
    /// <param name="request">Get-compare-source-content request payload. See
    /// <see cref="GetCompareSourceContentRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — read is synchronous and short. Reserved
    /// for future asynchronicity (e.g., streaming large-book reads).</param>
    /// <returns>One of
    /// <see cref="GetCompareSourceContentResult.Success"/> (text returned;
    /// empty string is valid per §4.7 "absent chapter" semantics) or
    /// <see cref="GetCompareSourceContentResult.Error"/> (wire-layer or
    /// resolver failure envelope).</returns>
    public Task<GetCompareSourceContentResult> GetCompareSourceContentAsync(
        GetCompareSourceContentRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = cancellationToken;
        return Task.FromResult(ExecuteGetCompareSourceContent(request));
    }

    /// <summary>
    /// Synchronous body of <see cref="GetCompareSourceContentAsync"/>. Mirrors
    /// CAP-005's <c>ExecuteCompareBackupFile</c> pattern — the public method
    /// wraps the synchronous chain in <c>Task.FromResult</c> so the body can
    /// stay linear and readable.
    /// </summary>
    private GetCompareSourceContentResult ExecuteGetCompareSourceContent(
        GetCompareSourceContentRequest request
    )
    {
        // EXPLANATION:
        // 3-step wire-layer chain per data-contracts.md §4.7:
        //   (1) Session lookup — null → INVALID_SESSION envelope.
        //   (2) Destination lookup — for tok-dst-* tokens the resolver needs a
        //       ScrText. Use DestinationProjectLookupOverride first (tests);
        //       otherwise call LocalParatextProjects.GetParatextProject with the
        //       backup's ProjectGuid (production). Narrow catch on the same
        //       three exception types CAP-002 catches (ProjectNotFoundException
        //       / ArgumentException / RegistrationRequiredException) — failure
        //       returns null; the resolver then maps tok-dst-* + null
        //       destination to IO_ERROR. For tok-src-* tokens the destination
        //       lookup is wasted work but harmless; keeping the control flow
        //       linear is the right tradeoff (we'd otherwise need to parse the
        //       token here and again inside the resolver).
        //   (3) Delegate to CompareSourceContentResolver.Resolve and return its
        //       envelope unmodified.

        // (1) Session lookup.
        RestoreSession? session = SessionRegistry.Get(request.SessionId);
        if (session == null)
        {
            return new GetCompareSourceContentResult.Error(
                GetCompareSourceContentErrorCode.InvalidSession,
                "%restore_invalidSession%"
            );
        }

        // (2) Destination ScrText lookup. The resolver tolerates null
        //     (returns IO_ERROR for tok-dst-* + null destination).
        ScrText? destination = ResolveDestinationProject(session.Metadata.ProjectGuid);

        // (3) Delegate.
        return CompareSourceContentResolver.Resolve(
            session,
            destinationProject: destination,
            sourceToken: request.SourceToken,
            verseRef: request.VerseRef,
            singleChapter: request.SingleChapter
        );
    }

    /// <summary>
    /// Resolve the destination <see cref="ScrText"/> for the current restore
    /// session. Honors the <see cref="DestinationProjectLookupOverride"/> test
    /// seam first; otherwise calls
    /// <see cref="LocalParatextProjects.GetParatextProject(string)"/> with the
    /// backup's <c>ProjectGuid</c>. Catches the same lookup exceptions
    /// <see cref="ExecuteCreateBackup"/> handles (CAP-002 wire pattern) and
    /// returns <c>null</c> on any failure — the resolver maps null to IO_ERROR
    /// for <c>tok-dst-*</c> tokens.
    /// </summary>
    /// <param name="projectGuid">The backup's project GUID
    /// (<see cref="RestorerMetadata.ProjectGuid"/>). May be <c>null</c> when
    /// the backup carries no project id (legacy / corrupt manifest).</param>
    /// <returns>The destination <see cref="ScrText"/>, or <c>null</c> when the
    /// override or lookup returns null / throws.</returns>
    private static ScrText? ResolveDestinationProject(string? projectGuid)
    {
        Func<string?, ScrText?>? overrideFn = DestinationProjectLookupOverride;
        if (overrideFn != null)
        {
            return overrideFn(projectGuid);
        }

        if (projectGuid == null)
        {
            return null;
        }

        try
        {
            return LocalParatextProjects.GetParatextProject(projectGuid);
        }
        catch (Exception ex)
            when (ex
                    is ProjectNotFoundException
                        or ArgumentException
                        or RegistrationRequiredException
            )
        {
            return null;
        }
    }
}
