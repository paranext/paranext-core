using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.NetworkObjects;
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
//   * This file (CAP-002 + CAP-001 facade scaffolding) — declares the class as
//     `partial sealed class : NetworkObjects.DataProvider`, supplies the primary
//     constructor `(PapiClient, LocalParatextProjects)`, the `GetFunctions()`
//     registration, the `StartDataProviderAsync()` lifecycle hook, AND lands the
//     CAP-002 M-001 `CreateBackupAsync` method.
//   * CAP-003..CAP-011 + CAP-024 — each lands its M-### method here as additional
//     `partial` fragments.
//   * CAP-008 / CAP-009 / DT-003 — each lands its `Get<DataTypeName>` handler likewise.
//
// CAP-001 facade scaffolding lives in this file (rather than a sibling
// `BackupRestoreDataProvider.Facade.cs`) because the class is `sealed partial` and the
// primary constructor + base type declaration MUST be co-located with the canonical
// declaration the linker uses to pick up the rest of the partial-class topology. Putting
// the base + ctor here keeps each sibling fragment a thin "supplies one method" file
// without anyone having to remember which sibling holds the base.
//
// Maps to: backend-alignment.md §JSON-RPC Wire Contract M-001 + DataProvider registration
//          shape (lines 351-401); data-contracts.md §4.0/§4.1/§5.1/§5.2/§5.3;
//          strategic-plan-backend.md §CAP-001 + §CAP-002.
// PT9 anchor: none (NEW IN PT10 — PT9 BackupForm.cmdOK_Click calls Backup.BackupScrText
//   inline; the wire boundary is the PT10-only delta).

/// <summary>
/// The Backup/Restore wire facade: a single DataProvider hosting M-001 createBackup
/// (this file), M-002..M-011 (sibling capabilities), and three subscribable data types
/// (DT-001 BackupableProjects, DT-002 RestoreDestinationProjects, DT-003 BackupLogInfo).
/// </summary>
/// <remarks>
/// <para>
/// Primary constructor accepts <see cref="PapiClient"/> and
/// <see cref="LocalParatextProjects"/> — the minimum-viable seed for the facade.
/// Per-data-type service collaborators (e.g.,
/// <see cref="RestoreDestinationProjectsService"/>) plug in via static test seams
/// today (CAP-001 GREEN); CAP-008/009 GREEN may promote those to ctor parameters.
/// </para>
/// <para>
/// CAP-001 / CAP-002 partial fragment: this file lands the DataProvider base-class
/// wiring, the <see cref="GetFunctions"/> registration of all 11 wire entries
/// (8 imperative + 3 data-type get handlers), the no-op
/// <see cref="StartDataProviderAsync"/>, AND the M-001 <see cref="CreateBackupAsync"/>
/// implementation. CAP-003..CAP-011 + CAP-024 supply their M-### methods as additional
/// partial-class fragments in sibling files.
/// </para>
/// <para>
/// Still-pending methods (CAP-006 enumerateUsbDevices, CAP-008 getBackupableProjects,
/// CAP-024 getCompareSourceContent, and the DT-003 getBackupLogInfo data-type handler)
/// are registered today as inline
/// <see cref="NotImplementedException"/>-throwing lambdas — this keeps the
/// CAP-001 wire-registration assertion meaningful (the slot is reserved at GREEN time)
/// while leaving an obvious "replace this lambda with the real method" canary for the
/// future implementer. The exception message names the owning capability ID so a grep
/// finds the slot.
/// </para>
/// </remarks>
internal sealed partial class BackupRestoreDataProvider(
    PapiClient papiClient,
    LocalParatextProjects paratextProjects
) : NetworkObjects.DataProvider(WireFacadeName, papiClient, NetworkObjectType.DATA_PROVIDER)
{
    // === DataProvider name + data-type constants ===
    // The user-supplied DataProvider name. The base class APPENDS "-data" to derive the
    // wire identifier (`NetworkObjects/DataProvider.cs:15`), so the React side sees
    // `platformBackupRestore.backupRestore-data`. See backend-alignment.md
    // §JSON-RPC Wire Contract — the wire-stable identifier the strategic plan §CAP-001
    // calls out. Named `WireFacadeName` (not `DataProviderName`) to avoid clashing with
    // the inherited <see cref="NetworkObjects.DataProvider.DataProviderName"/> property.
    private const string WireFacadeName = "platformBackupRestore.backupRestore";

    // Data-type identifiers — match the TS-side `useData(...).Foo` selector keys per
    // data-contracts.md §5.1/§5.2/§5.3. Constants here avoid stringly-typed registration.
    private const string DataTypeBackupableProjects = "BackupableProjects";
    private const string DataTypeRestoreDestinationProjects = "RestoreDestinationProjects";
    private const string DataTypeBackupLogInfo = "BackupLogInfo";

    // Suppress unused-warning on the captured `paratextProjects` primary-ctor parameter
    // — CAP-008 GREEN reads it for the snapshot fetch; for CAP-001 RED we already need
    // the reference live for the test seam wiring even though no method dereferences it
    // yet outside the partial fragments that bring their own state.
    private readonly LocalParatextProjects _paratextProjects = paratextProjects;

    /// <summary>
    /// Builds a stub <see cref="GetFunctions"/> entry for a wire method whose owning
    /// capability has not yet landed. The returned delegate accepts <c>object?</c>
    /// (the most permissive parameter type — see <see cref="GetFunctions"/> remarks for
    /// why <c>JsonElement</c> won't do here) and throws a
    /// <see cref="NotImplementedException"/> carrying <paramref name="capabilityHint"/>.
    /// </summary>
    /// <param name="functionName">The wire-method name (e.g., <c>"enumerateUsbDevices"</c>).</param>
    /// <param name="capabilityHint">
    /// The grep anchor a future implementer uses to find this slot. Callers MUST include
    /// the owning <c>CAP-###</c> or <c>DT-###</c> identifier in this string so a
    /// repo-wide grep lands on the slot. Example: <c>"CAP-006 pending — enumerateUsbDevices
    /// wire fragment not yet landed"</c>.
    /// </param>
    /// <remarks>
    /// The lambda body is intentionally a direct synchronous throw rather than
    /// <c>Task.FromException</c>: the registration canary test (e.g.,
    /// <c>GetBackupLogInfo_DispatchedViaPapi_ThrowsNotImplementedWithCapabilityHint</c>)
    /// unwraps <see cref="System.Reflection.TargetInvocationException.InnerException"/>
    /// chains looking for the <see cref="NotImplementedException"/>. Direct-throw inside
    /// the lambda preserves that path; wrapping in <c>Task.FromException</c> would change it.
    /// </remarks>
    private static (string functionName, Delegate function) PendingStub(
        string functionName,
        string capabilityHint
    ) =>
        (
            functionName,
            new Func<object?, Task>(_ => throw new NotImplementedException(capabilityHint))
        );

    /// <summary>
    /// Registers the 12 wire entries this DataProvider exposes (9 imperative methods +
    /// 3 data-type get handlers). The base class projects each tuple into a
    /// <c>object:platformBackupRestore.backupRestore-data.{functionName}</c> request
    /// handler. The 4 still-pending entries (CAP-006/008/024 + DT-003) are registered
    /// via <see cref="PendingStub"/> — each call site documents the owning capability so
    /// the future implementer can grep to find the slot.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Registration list matches <c>data-contracts.md §4.0</c> and
    /// <c>backend-alignment.md §JSON-RPC Wire Contract</c> (lines 371-389):
    /// </para>
    /// <list type="number">
    ///   <item>createBackup (M-001, CAP-002 — implemented)</item>
    ///   <item>openRestoreSession (M-002, CAP-003 — implemented)</item>
    ///   <item>performRestore (M-003, CAP-004 — implemented)</item>
    ///   <item>compareBackupFile (M-004, CAP-005 — implemented)</item>
    ///   <item>enumerateUsbDevices (M-005, CAP-006 — pending; stub)</item>
    ///   <item>revealBackupLog (M-006, CAP-007 — implemented)</item>
    ///   <item>validateBackup (M-009, CAP-010 — implemented; wraps CAP-014's pure rule chains into the {canSubmit, errors:{…}} wire shape per strategic-plan-backend.md §CAP-010)</item>
    ///   <item>closeRestoreSession (M-010, CAP-011 — implemented)</item>
    ///   <item>getCompareSourceContent (M-011, CAP-024 — pending; stub)</item>
    ///   <item>getBackupableProjects (DT-001 get, CAP-008 — pending; stub)</item>
    ///   <item>getRestoreDestinationProjects (DT-002 get, CAP-009 — implemented)</item>
    ///   <item>getBackupLogInfo (DT-003 get, DEC-333 — pending; stub)</item>
    /// </list>
    /// <para>
    /// Lambda wrapper convention: each implemented method takes an optional
    /// <see cref="CancellationToken"/> second parameter, so the delegate creation uses an
    /// explicit lambda — <c>request =&gt; MyMethodAsync(request)</c> — rather than a
    /// method-group conversion (which won't bind across the optional param).
    /// </para>
    /// <para>
    /// Stub-lambda parameter type is <c>object?</c> rather than <see cref="JsonElement"/>
    /// because <c>JsonElement</c> is a non-nullable struct and the registration tests
    /// dispatch with a <c>null</c> positional arg — <see cref="Delegate.DynamicInvoke"/>
    /// cannot convert <c>null</c> to a value type. <c>object?</c> is the permissive form
    /// that accepts both <c>null</c> and any concrete JSON-deserialized request.
    /// </para>
    /// <para>
    /// Order is not load-bearing — the base class sorts function names before emitting the
    /// <c>object:onDidCreateNetworkObject</c> event and PAPI dispatches by name lookup.
    /// The list below follows the <c>data-contracts.md §4.0</c> table order for readability.
    /// </para>
    /// </remarks>
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            // ---- Imperative methods (9 — DEC-333 keeps revealBackupLog alongside the
            //      new DT-003 BackupLogInfo data type, so the imperative count is 8 from
            //      the post-DEC-333 contract + 1 legacy revealBackupLog = 9 today) ------
            (
                "createBackup",
                new Func<BackupRequest, Task<BackupResult>>(request => CreateBackupAsync(request))
            ),
            (
                "openRestoreSession",
                new Func<OpenRestoreSessionRequest, Task<RestoreSessionResult>>(request =>
                    OpenRestoreSessionAsync(request)
                )
            ),
            (
                "performRestore",
                new Func<RestoreRequest, Task<RestoreOperationResult>>(request =>
                    PerformRestoreAsync(request)
                )
            ),
            (
                "compareBackupFile",
                new Func<CompareBackupFileRequest, Task<CompareBackupFileResult>>(request =>
                    CompareBackupFileAsync(request)
                )
            ),
            // CAP-006 PENDING: replace this stub when the M-005 partial fragment
            // (EnumerateUsbDevicesAsync) lands. The UsbDeviceEnumerator service is
            // already GREEN but the wire-facade partial fragment is not.
            PendingStub(
                "enumerateUsbDevices",
                "CAP-006 pending — enumerateUsbDevices wire fragment not yet landed"
            ),
            (
                "revealBackupLog",
                new Func<RevealBackupLogRequest, Task<RevealBackupLogResult>>(request =>
                    RevealBackupLogAsync(request)
                )
            ),
            // CAP-010 IMPLEMENTED: M-009 validateBackup wire delegate. Per
            // strategic-plan-backend.md §CAP-010 (and the user's Test Writer task
            // spec), the wire-stable name is `validateBackup` — wrapping CAP-014's
            // pure rule chains in the {canSubmit, errors:{…}} response shape. This
            // replaces the post-round-4 `isDestinationPathWritable` PendingStub
            // because the strategic plan's CAP-010 contract is the active one.
            (
                "validateBackup",
                new Func<ValidateBackupRequest, Task<ValidateBackupResponse>>(request =>
                    ValidateBackupAsync(request)
                )
            ),
            (
                "closeRestoreSession",
                new Func<CloseRestoreSessionRequest, Task<CloseRestoreSessionResult>>(request =>
                    CloseRestoreSessionAsync(request)
                )
            ),
            // CAP-024 PENDING: replace this stub when M-011 lands.
            PendingStub(
                "getCompareSourceContent",
                "CAP-024 pending — getCompareSourceContent wire fragment not yet landed"
            ),
            // ---- Subscribable data type get handlers (3) -----------------------------
            // CAP-008 GREEN: M-007 getBackupableProjects (DT-001) wires through
            // BackupRestoreDataProvider.BackupableProjects.cs. The underlying
            // BackupableProjectsService (CAP-021) owns snapshot + subscriber-set logic.
            (
                "getBackupableProjects",
                new Func<GetBackupableProjectsRequest, Task<List<BackupableProject>>>(request =>
                    GetBackupableProjectsAsync(request)
                )
            ),
            (
                "getRestoreDestinationProjects",
                new Func<
                    GetRestoreDestinationProjectsRequest,
                    Task<List<RestoreDestinationProject>>
                >(request => GetRestoreDestinationProjectsAsync(request))
            ),
            // DT-003 / DEC-333 PENDING: replace this stub when the BackupLogInfo
            // subscribable data type get-handler lands (capability owned by BE-7
            // alongside CAP-001). The hint contains both "DT-003" AND "BackupLogInfo"
            // so the canary test (GetBackupLogInfo_DispatchedViaPapi_*) finds either
            // grep anchor; future implementers should likewise grep for "DT-003" to
            // locate this slot.
            PendingStub(
                "getBackupLogInfo",
                "DT-003 pending — BackupLogInfo (getBackupLogInfo) wire fragment not yet landed; see DEC-333"
            ),
        ];
    }

    /// <summary>
    /// DataProvider startup hook. No-op for backup/restore — the underlying services
    /// (<see cref="BackupableProjectsService"/>, <see cref="RestoreDestinationProjectsService"/>,
    /// <see cref="BackupLogService"/>, etc.) lazy-initialize on first call. Mirrors
    /// the <see cref="InventoryDataProvider"/> no-op branch (line 71-75).
    /// </summary>
    protected override Task StartDataProviderAsync()
    {
        // No warmup work required at registration time. Services that need initialization
        // (e.g., subscriber-snapshot caches) defer their first build to the first
        // get-handler invocation; their internal locks make that safe for concurrent
        // subscribers.
        return Task.CompletedTask;
    }

    // ============================================================================
    // M-001 createBackup wire method (CAP-002)
    // ============================================================================
    //
    // The rest of this file holds the CAP-002 M-001 implementation. See the original
    // CAP-002 header (above) for the per-method rationale.


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
        // The wire boundary is async-shaped but the orchestrator (CAP-022) and our
        // guard chain are synchronous. Keep this entry point as a one-line wrapper
        // and let `ExecuteCreateBackup` carry the guard-chain logic so each guard
        // can be a plain `return new BackupResult.Error(...)` instead of a verbose
        // `Task.FromResult<BackupResult>(new BackupResult.Error(...))` block.
        return Task.FromResult(ExecuteCreateBackup(request));
    }

    /// <summary>
    /// Synchronous guard chain + orchestrator delegate for
    /// <see cref="CreateBackupAsync"/>. Extracted purely for readability — wraps
    /// at the call site exactly once.
    /// </summary>
    private static BackupResult ExecuteCreateBackup(BackupRequest request)
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
            return new BackupResult.Error(
                BackupErrorCode.InvalidProject,
                "%backup_invalidProject%"
            );
        }
        catch (RegistrationRequiredException)
        {
            return new BackupResult.Error(
                BackupErrorCode.ResourceNotBackupable,
                "%backup_resourceProjectNotBackupable%",
                ErrorField: "projectId"
            );
        }

        // (2) Resource-project gate (VAL-B01 / INV-B01). Even though CAP-021 filters
        // resource projects out of the BackupableProjects snapshot, the wire layer
        // is the contract enforcer per §4.1. For the registered-user case
        // GetParatextProject above returns a ScrText for a resource project without
        // throwing — this gate catches that path.
        if (scrText.IsProtectedText)
        {
            return new BackupResult.Error(
                BackupErrorCode.ResourceNotBackupable,
                "%backup_resourceProjectNotBackupable%",
                ErrorField: "projectId"
            );
        }

        // (3) userName non-empty (VAL-B02).
        if (string.IsNullOrEmpty(request.UserName))
        {
            return new BackupResult.Error(
                BackupErrorCode.UserNameRequired,
                "%backup_userNameRequired%",
                ErrorField: "userName"
            );
        }

        // (4) Empty book list + non-Notes-type (VAL-B04 / INV-A05). Empty `[]` means
        // the user explicitly selected zero books; Notes-type projects bypass per
        // INV-B03. NULL selectedBookIds falls through to (5) where it substitutes
        // the project's BooksPresentSet — that is the documented default per
        // data-contracts.md §2.1, NOT an error.
        if (request.SelectedBookIds is { Count: 0 } && !IsNoteType(scrText))
        {
            return new BackupResult.Error(
                BackupErrorCode.NoBooksSelected,
                "%backup_atLeastOneBookRequired%"
            );
        }

        // (5) Build the BookSet (null → project's full BooksPresentSet; otherwise
        // convert + skip-unknown). See BuildBookSet for the skip-unknown rationale.
        BookSet selectedBooks = BuildBookSet(scrText, request.SelectedBookIds);

        // (6) Delegate to the orchestrator (CAP-022 GREEN). The orchestrator owns
        // PersistChanges, file-spec validation, the overwrite gate, ZIP write, and
        // log-entry append. `includeEncodingInfo: false` because BackupRequest does
        // not surface the PT9-internal transliteration branch — BHV-100's
        // transliteration branch is not reachable from the wire surface per
        // data-contracts.md.
        return BackupOrchestrator.ExecuteBackup(
            scrText,
            request.DestinationPath,
            selectedBooks,
            request.IncludeFiguresFlags,
            request.Description,
            includeEncodingInfo: false,
            request.ConfirmOverwrite
        );
    }

    /// <summary>
    /// Step (5) of <see cref="ExecuteCreateBackup"/>: convert the wire-layer
    /// <paramref name="selectedBookIds"/> into a <see cref="BookSet"/>.
    /// </summary>
    /// <remarks>
    /// Null → the project's full <c>BooksPresentSet</c> (documented default per
    /// data-contracts.md §2.1). Non-null → iterate each id through
    /// <see cref="Canon.BookIdToNumber"/> and skip unknown codes (per Test Writer
    /// handoff: the wire layer doesn't surface "unknown book id" as an error
    /// because the UI populates this list from the project's own books).
    /// </remarks>
    private static BookSet BuildBookSet(ScrText scrText, IReadOnlyList<string>? selectedBookIds)
    {
        if (selectedBookIds is null)
            return scrText.BooksPresentSet;

        BookSet bookSet = new();
        foreach (string bookId in selectedBookIds)
        {
            int bookNum = Canon.BookIdToNumber(bookId);
            if (bookNum > 0)
                bookSet.Add(bookNum);
        }
        return bookSet;
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
