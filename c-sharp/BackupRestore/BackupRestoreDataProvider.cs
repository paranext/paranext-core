using System;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.Repository;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: backend-alignment.md §JSON-RPC Wire Contract — the single
//   `BackupRestoreDataProvider` wire facade hosting all 8 imperative methods (M-001..M-011)
//   plus the 3 subscribable data types (DT-001..DT-003). Replaces PT9's in-process
//   `BackupForm.cmdOK_Click` → `Backup.BackupScrText` direct call. PT9 had NO wire surface
//   for backup/restore because the operations ran inline in the WinForms dialog code-behind;
//   PT10's React UI lives in a separate process so all backup/restore actions must cross
//   the JSON-RPC boundary through this DataProvider.
//
// Class organization (split across CAP-001 / CAP-002 / CAP-003 etc.):
//   * This file (CAP-002) — declares the class as `partial` and lands the FIRST method
//     (`CreateBackupAsync` / M-001).
//   * CAP-001 (BE-7) — will land a sibling `BackupRestoreDataProvider.Facade.cs` (or
//     similar) supplying the `: NetworkObjects.DataProvider(...)` base, the `GetFunctions()`
//     override, and the ctor accepting `PapiClient` + `LocalParatextProjects` + collaborator
//     services.
//   * CAP-003..CAP-011 — each lands its M-### method here as additional `partial` fragments.
//   * CAP-007/008/009 (DT-001..DT-003) — each lands its `Get<DataTypeName>` handler likewise.
//
// The class is declared `internal sealed partial class` (not yet inheriting
// `NetworkObjects.DataProvider`) so CAP-002 can land + test the M-001 wire method without
// taking on the full DataProvider scaffolding. CAP-001 in BE-7 supplies the base class +
// ctor signature. Until CAP-001 lands, callers (and tests) instantiate the class via its
// parameterless ctor.
//
// Maps to: backend-alignment.md §JSON-RPC Wire Contract M-001; data-contracts.md §4.1
//          (M-001 createBackup); strategic-plan-backend.md §CAP-002.
// PT9 anchor: none (NEW IN PT10 — PT9 BackupForm.cmdOK_Click calls Backup.BackupScrText
//   inline; the wire boundary is the PT10-only delta).

/// <summary>
/// The Backup/Restore wire facade: a single DataProvider hosting M-001 createBackup
/// (this file), M-002..M-011 (sibling capabilities), and three subscribable data types
/// (DT-001 BackupableProjects, DT-002 RestoreDestinationProjects, DT-003 BackupLogInfo).
/// </summary>
/// <remarks>
/// <para>
/// CAP-002 partial fragment: lands <see cref="CreateBackupAsync"/> (M-001) only. CAP-001
/// (BE-7) will land the DataProvider base class registration + ctor. CAP-003..CAP-011 will
/// land their respective methods as additional partial fragments.
/// </para>
/// </remarks>
internal sealed partial class BackupRestoreDataProvider
{
    // === NEW IN PT10 ===
    // Reason: PT9 had no wire surface for backup — `BackupForm.cmdOK_Click` called
    //   `Backup.BackupScrText` directly in-process. PT10's React UI lives in a
    //   separate process, so the wire layer here:
    //     (1) resolves `request.ProjectId` → `ScrText` via
    //         `LocalParatextProjects.GetParatextProject`;
    //     (2) enforces the data-contracts.md §4.1 error matrix precondition guards
    //         (InvalidProject → ResourceNotBackupable → UserNameRequired → NoBooksSelected);
    //     (3) converts `selectedBookIds: string[]` → `BookSet` via
    //         `Canon.BookIdToNumber` (null → project's `BooksPresentSet`);
    //     (4) delegates to `BackupOrchestrator.ExecuteBackup` (CAP-022) and
    //         returns the envelope unmodified.
    // Maps to: CAP-002 / data-contracts.md §4.1 (M-001 createBackup) +
    //          backend-alignment.md §JSON-RPC Wire Contract M-001.

    /// <summary>
    /// Wire entry point for M-001 createBackup (data-contracts.md §4.1). Resolves the
    /// project, validates wire-layer preconditions, and delegates to
    /// <see cref="BackupOrchestrator.ExecuteBackup"/> for the actual ZIP-creation pipeline.
    /// </summary>
    /// <param name="request">Backup request payload. See <see cref="BackupRequest"/>.</param>
    /// <param name="cancellationToken">
    /// Cancellation token from the JSON-RPC dispatcher. Currently unused at the wire layer
    /// — the orchestrator pipeline is synchronous. Reserved for future asynchronicity.
    /// </param>
    /// <returns>
    /// One of <see cref="BackupResult.Success"/>, <see cref="BackupResult.OverwriteRequired"/>,
    /// or <see cref="BackupResult.Error"/>. Errors are returned in the envelope (NOT thrown)
    /// per the wire contract — see data-contracts.md §3.1.
    /// </returns>
    public Task<BackupResult> CreateBackupAsync(
        BackupRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // EXPLANATION:
        // Guard chain mirrors the data-contracts.md §4.1 error-matrix precedence:
        //   (1) project resolution    → InvalidProject
        //   (2) resource-project gate → ResourceNotBackupable (errorField=projectId)
        //   (3) userName non-empty    → UserNameRequired      (errorField=userName)
        //   (4) empty book list + not Notes-type → NoBooksSelected
        // Step (5) builds the BookSet (null → BooksPresentSet; otherwise iterate
        // and Canon.BookIdToNumber). Step (6) delegates to the orchestrator and
        // returns its envelope unmodified — CAP-022 owns the rest (PersistChanges,
        // overwrite gate, ZIP write, log entry).

        // (1) Resolve project — see ManageBooksService.ResolveProjectOrThrow for the
        // analogous PT10 pattern (narrow catch on the two expected lookup-failure
        // exception types). We return Error instead of throwing because the wire
        // contract carries failures in the envelope (data-contracts.md §3.1).
        // RegistrationRequiredException is a special case: GetParatextProject throws
        // it only when the resolved project IS a resource AND the user is unregistered
        // (LocalParatextProjects.cs:114-115). For the wire-layer contract the right
        // answer is the same ResourceNotBackupable envelope step (2) would emit — so
        // we short-circuit here rather than try to fish out the underlying ScrText
        // (we never got a reference to it).
        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(request.ProjectId);
        }
        catch (Exception ex) when (ex is ProjectNotFoundException or ArgumentException)
        {
            return Task.FromResult<BackupResult>(
                new BackupResult.Error(BackupErrorCode.InvalidProject, "%backup_invalidProject%")
            );
        }
        catch (RegistrationRequiredException)
        {
            return Task.FromResult<BackupResult>(
                new BackupResult.Error(
                    BackupErrorCode.ResourceNotBackupable,
                    "%backup_resourceProjectNotBackupable%",
                    ErrorField: "projectId"
                )
            );
        }

        // (2) Resource-project gate (VAL-B01 / INV-B01). Even though CAP-021 filters
        // resource projects out of the BackupableProjects snapshot, the wire layer
        // is the contract enforcer per §4.1. For the registered-user case
        // GetParatextProject above returns a ScrText for a resource project without
        // throwing — this gate catches that path.
        if (scrText.IsProtectedText)
        {
            return Task.FromResult<BackupResult>(
                new BackupResult.Error(
                    BackupErrorCode.ResourceNotBackupable,
                    "%backup_resourceProjectNotBackupable%",
                    ErrorField: "projectId"
                )
            );
        }

        // (3) userName non-empty (VAL-B02).
        if (string.IsNullOrEmpty(request.UserName))
        {
            return Task.FromResult<BackupResult>(
                new BackupResult.Error(
                    BackupErrorCode.UserNameRequired,
                    "%backup_userNameRequired%",
                    ErrorField: "userName"
                )
            );
        }

        // (4) Empty book list + non-Notes-type (VAL-B04 / INV-A05). Empty `[]` means
        // the user explicitly selected zero books; Notes-type projects bypass per
        // INV-B03. NULL selectedBookIds falls through to (5) where it substitutes
        // the project's BooksPresentSet — that is the documented default per
        // data-contracts.md §2.1, NOT an error.
        if (request.SelectedBookIds is { Count: 0 } && !IsNoteType(scrText))
        {
            return Task.FromResult<BackupResult>(
                new BackupResult.Error(
                    BackupErrorCode.NoBooksSelected,
                    "%backup_atLeastOneBookRequired%"
                )
            );
        }

        // (5) Build the BookSet. Null → project's full BooksPresentSet (the
        // documented default). Otherwise convert each id via Canon.BookIdToNumber
        // — returning 0 for an unknown code, which we silently skip (per Test
        // Writer handoff note: wire layer doesn't surface "unknown book id" as
        // an error because the UI populates this list from the project's own
        // books). Mirrors ImportBooksOrchestrator's "abort-on-invalid-code"
        // family of helpers, but with skip semantics.
        BookSet selectedBooks;
        if (request.SelectedBookIds is null)
        {
            selectedBooks = scrText.BooksPresentSet;
        }
        else
        {
            selectedBooks = new BookSet();
            foreach (string bookId in request.SelectedBookIds)
            {
                int bookNum = Canon.BookIdToNumber(bookId);
                if (bookNum > 0)
                    selectedBooks.Add(bookNum);
            }
        }

        // (6) Delegate to the orchestrator (CAP-022 GREEN). The orchestrator owns
        // PersistChanges, file-spec validation, the overwrite gate, ZIP write, and
        // log-entry append. `includeEncodingInfo: false` because BackupRequest does
        // not surface the PT9-internal transliteration branch — BHV-100's
        // transliteration branch is not reachable from the wire surface per
        // data-contracts.md.
        BackupResult result = BackupOrchestrator.ExecuteBackup(
            scrText,
            request.DestinationPath,
            selectedBooks,
            request.IncludeFiguresFlags,
            request.Description,
            includeEncodingInfo: false,
            request.ConfirmOverwrite
        );

        return Task.FromResult(result);
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/CommentThread.cs:261 (TranslationInfo.Type.IsNoteType())
    // Maps to: CAP-002 wire-layer step (4) Notes-type bypass per INV-B03
    /// <summary>
    /// Returns whether <paramref name="scrText"/>'s translation type is a Notes-type
    /// project (e.g., StudyBibleAdditions, Auxiliary, Daughter — anything for which
    /// PT9's <c>TranslationInfo.IsNoteType</c> extension returns <c>true</c>). Notes-
    /// type projects bypass the "non-empty book list" wire-layer guard per INV-B03.
    /// </summary>
    /// <remarks>
    /// Mirrors <c>BackupableProjectsService.IsNoteType</c> byte-for-byte. Defensive
    /// null + try/catch matches that helper because <c>DummyScrText</c> in tests may
    /// have an unpopulated <c>Settings.TranslationInfo</c>.
    /// </remarks>
    private static bool IsNoteType(ScrText scrText)
    {
        try
        {
            return scrText.Settings?.TranslationInfo?.Type.IsNoteType() ?? false;
        }
        catch
        {
            return false;
        }
    }
}
