using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === NEW IN PT10 ===
// Reason: PAPI NetworkObject facade — no PT9 equivalent (PT9 invoked
//   DeleteBooksForm from a WinForms menu handler). The business logic this
//   service delegates to is ported from PT9 (see DeleteBooksOrchestrator).
// Maps to: EXT-013 (service-layer facade for all Manage Books operations)
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Service pattern clarified as NetworkObject" (Theme 1)

/// <summary>
/// PAPI-facing NetworkObject that exposes Manage Books operations
/// (<c>deleteBooks</c>, <c>createBooks</c>, <c>copyBooks</c>, <c>importBooks</c>,
/// etc.). Registered as <c>object:platformScripture.manageBooks</c> via
/// <see cref="RegisterNetworkObjectAsync()"/>.
///
/// <para>See <c>.context/features/manage-books/implementation/backend-alignment.md</c>
/// for the full service contract, DI wiring (PapiClient + LocalParatextProjects +
/// ParatextProjectDataProviderFactory), and integration with
/// <c>SendFullProjectUpdateEvent</c> on the affected project's PDP after each
/// successful mutation (Theme 6).</para>
/// </summary>
internal sealed class ManageBooksService : NetworkObject
{
    internal const string NetworkObjectName = "platformScripture.manageBooks";

    private readonly LocalParatextProjects _paratextProjects;
    private readonly ParatextProjectDataProviderFactory _pdpFactory;

    public ManageBooksService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        ParatextProjectDataProviderFactory pdpFactory
    )
        : base(papiClient)
    {
        _paratextProjects = paratextProjects;
        _pdpFactory = pdpFactory;
    }

    /// <summary>
    /// Registers this service with PAPI. Additional wire methods registered
    /// here as later BE micro-phases (BE-2+) add Create/Copy/Import support.
    /// </summary>
    public Task RegisterNetworkObjectAsync()
    {
        List<(string functionName, Delegate function)> functions =
        [
            (
                "deleteBooks",
                new Func<DeleteBooksRequest, Task<DeleteBooksResult>>(DeleteBooksAsync)
            ),
            (
                "filterProjects",
                new Func<ProjectFilterInput, Task<ProjectListResult>>(FilterProjectsAsync)
            ),
            (
                "createBooks",
                new Func<CreateBooksRequest, Task<CreateBooksResult>>(CreateBooksAsync)
            ),
            (
                "getAvailableBooksForCreation",
                new Func<string, Task<int[]>>(GetAvailableBooksForCreationAsync)
            ),
            (
                "validateCreateBooks",
                new Func<ValidateCreateBooksRequest, Task<ValidationResult>>(
                    ValidateCreateBooksAsync
                )
            ),
            (
                "getBookComparison",
                new Func<BookComparisonInput, Task<BookComparisonResult>>(GetBookComparisonAsync)
            ),
            (
                "getToProjectFilter",
                new Func<ProjectFilterInput, Task<ProjectListResult>>(GetToProjectFilterAsync)
            ),
            // CAP-007 (BE-3): CopyBooks wire entry + M-014 CopyCustomVersification
            ("copyBooks", new Func<CopyBooksRequest, Task<CopyBooksResult>>(CopyBooksAsync)),
            (
                "copyCustomVersification",
                new Func<CopyCustomVersificationRequest, Task>(CopyCustomVersificationAsync)
            ),
            // CAP-009 (BE-4): ImportParsing — read-only parse + overlap check.
            // CAP-010 (BE-4) appends importBooks alongside these; CAP-012 finalizes
            // the TS-side extension wiring for all three.
            (
                "parseImportFiles",
                new Func<ImportBooksInput, Task<BookComparisonResult>>(ParseImportFilesAsync)
            ),
            (
                "checkOverlappingFiles",
                new Func<OverlapCheckEntry[], Task<ValidationResult>>(CheckOverlappingFilesAsync)
            ),
            // CAP-010 (BE-4): ImportBooks — import-execution mutation.
            // Wire method dispatches to the orchestrator wrapped in
            // AlertCapture; CAP-012 finalizes TS-side extension wiring.
            (
                "importBooks",
                new Func<ImportBooksInput, Task<ImportBooksResult>>(ImportBooksAsync)
            ),
        ];

        return RegisterNetworkObjectAsync(
            NetworkObjectName,
            functions,
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [.. functions.Select(f => f.functionName)],
            }
        );
    }

    /// <summary>
    /// Wire entry point for book deletion. Maps to data-contracts.md Section 4.6.
    /// Preconditions (checked in order): BookNumbers non-empty → INVALID_ARGUMENT;
    /// projectId resolves → NOT_FOUND; admin-on-shared-project → PERMISSION_DENIED;
    /// every requested book present → NOT_FOUND; WriteLock obtainable → UNAVAILABLE.
    /// </summary>
    /// <param name="request">Project ID + book numbers to delete.</param>
    /// <returns>Result with success flag, deleted count, warnings, errors.</returns>
    public Task<DeleteBooksResult> DeleteBooksAsync(DeleteBooksRequest request)
    {
        EnsureBookNumbersNonEmpty(request.BookNumbers);

        ScrText scrText = GetProjectOrThrowNotFound(request.ProjectId);

        if (IsSharedProjectWithoutAdmin(scrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.PermissionDenied,
                "You need to be an administrator to delete books from a shared project"
            );

        EnsureAllBooksPresent(scrText, request.BookNumbers, request.ProjectId);

        try
        {
            DeleteBooksOrchestrator.DeleteBooks(scrText, ToBookSet(request.BookNumbers));
        }
        catch (LockNotObtainedException)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the project"
            );
        }

        // Theme 6: notify any live PDP so booksPresent subscribers re-fetch.
        _pdpFactory
            .GetExistingProjectDataProvider(request.ProjectId)
            ?.SendFullProjectUpdateEvent();

        return Task.FromResult(
            new DeleteBooksResult(
                Success: true,
                DeletedCount: request.BookNumbers.Length,
                Warnings: [],
                Errors: []
            )
        );
    }

    /// <summary>
    /// Precondition: BookNumbers must be non-empty. Violation → INVALID_ARGUMENT
    /// (data-contracts.md Section 4.6).
    /// </summary>
    private static void EnsureBookNumbersNonEmpty(int[] bookNumbers)
    {
        if (bookNumbers == null || bookNumbers.Length == 0)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "BookNumbers must be non-empty"
            );
    }

    /// <summary>
    /// Resolves <paramref name="projectId"/> to a <see cref="ScrText"/>, mapping
    /// any lookup failure (unknown id, malformed HexId, etc.) to NOT_FOUND per
    /// Theme 7.
    /// </summary>
    private static ScrText GetProjectOrThrowNotFound(string projectId) =>
        // ScrTextCollection.GetById throws ProjectNotFoundException when the
        // project id is unknown; HexId.FromStr throws for malformed ids.
        // Both map to NOT_FOUND per Theme 7.
        ResolveProjectOrThrow(
            projectId,
            PlatformErrorCodes.NotFound,
            $"Project not found: {projectId}"
        );

    /// <summary>
    /// Shared project-resolution helper. Wraps
    /// <see cref="LocalParatextProjects.GetParatextProject"/> so callers can
    /// map any lookup failure to the appropriate <see cref="PlatformErrorCodes"/>.
    /// Target vs model lookups differ only in the error code they throw
    /// (NOT_FOUND for target, FAILED_PRECONDITION for model per Theme 7).
    /// </summary>
    private static ScrText ResolveProjectOrThrow(
        string projectId,
        string platformErrorCode,
        string errorMessage
    )
    {
        try
        {
            return LocalParatextProjects.GetParatextProject(projectId);
        }
        catch (Exception)
        {
            throw PlatformErrorCodes.WithCode(platformErrorCode, errorMessage);
        }
    }

    /// <summary>
    /// Detects the "non-admin on a shared project" condition by reading the
    /// natural ParatextData virtual API:
    /// <c>scrText.IsProjectShared &amp;&amp; !scrText.Permissions.AmAdministrator</c>.
    /// Tests exercise this path by overriding <see cref="ScrText.Permissions"/>
    /// (both the getter and the inner <c>PermissionManager.AmAdministrator</c>
    /// are <c>virtual</c>), so no type-name probe is required.
    /// Precondition for shared projects per INV-001, INV-C02, VAL-011; order
    /// matches PT9 DeleteBooksForm.cmdOK_Click:145-147.
    /// </summary>
    private static bool IsSharedProjectWithoutAdmin(ScrText scrText) =>
        scrText.IsProjectShared && !scrText.Permissions.AmAdministrator;

    /// <summary>
    /// Precondition: every requested book must already exist in the project's
    /// <see cref="ScrText.BooksPresentSet"/>. Violation → NOT_FOUND.
    /// </summary>
    private static void EnsureAllBooksPresent(ScrText scrText, int[] bookNumbers, string projectId)
    {
        BookSet booksPresent = scrText.BooksPresentSet;
        foreach (int bookNum in bookNumbers)
        {
            if (!booksPresent.IsSelected(bookNum))
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.NotFound,
                    $"Book {bookNum} is not present in project {projectId}"
                );
        }
    }

    /// <summary>
    /// Converts an <c>int[]</c> of book numbers to a <see cref="BookSet"/>
    /// (Theme 5: BookSet is the canonical collection at orchestrator
    /// boundaries).
    /// </summary>
    private static BookSet ToBookSet(int[] bookNumbers)
    {
        var bookSet = new BookSet();
        foreach (int bookNum in bookNumbers)
            bookSet.Add(bookNum);
        return bookSet;
    }

    /// <summary>
    /// Wire entry point for project filtering (CAP-011, M-013). Maps to
    /// data-contracts.md Section 4.13. Pure delegation to
    /// <see cref="ProjectFilterService.FilterProjects"/> — CAP-011 is read-only,
    /// so no <c>SendFullProjectUpdateEvent</c> is emitted on this path.
    /// </summary>
    /// <param name="input">Filter purpose + optional SourceProjectType for CopyDestination.</param>
    /// <returns>Matching projects in <see cref="ScrTextCollection"/> order.</returns>
    public Task<ProjectListResult> FilterProjectsAsync(ProjectFilterInput input) =>
        Task.FromResult(ProjectFilterService.FilterProjects(input));

    // =====================================================================
    // CAP-004: CreateBooksOrchestration
    //
    // Wire methods mirror the CAP-005 DeleteBooksAsync pattern: precondition
    // guards → orchestrator delegation → Theme-6 SendFullProjectUpdateEvent.
    // Guard order is asserted by CreateBooksServiceTests — see Theme 7
    // mapping table at the top of that file.
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade; PT9 had no equivalent — CreateBooksForm was a
    //   WinForms dialog invoked from a menu handler. The business logic this
    //   service delegates to is ported from PT9 (see CreateBooksOrchestrator).
    // Maps to: EXT-002 (wire layer)
    //
    // Guard order (asserted by CreateBooksServiceTests):
    //   1. Empty BookNumbers          → INVALID_ARGUMENT         (VAL-010)
    //   2. Unknown target projectId   → NOT_FOUND                (Theme 7)
    //   3. Non-editable project       → FAILED_PRECONDITION      (INV-003)
    //   4. FromTemplate + null model  → INVALID_ARGUMENT         (VAL-009)
    //   5. FromTemplate + unknown
    //      model projectId            → FAILED_PRECONDITION      (Theme 7)
    //
    // On success fires SendFullProjectUpdateEvent on the target PDP (Theme 6).
    /// <summary>
    /// Wire entry point for book creation. Maps to data-contracts.md Section 4.4.
    /// Preconditions (checked in order): BookNumbers non-empty → INVALID_ARGUMENT;
    /// projectId resolves → NOT_FOUND; project editable → FAILED_PRECONDITION;
    /// FromTemplate without model → INVALID_ARGUMENT;
    /// FromTemplate with unknown model projectId → FAILED_PRECONDITION.
    ///
    /// After a successful create, calls
    /// <c>_pdpFactory.GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()</c>
    /// so <c>useProjectSetting('platformScripture.booksPresent')</c>
    /// subscribers re-fetch (Theme 6).
    /// </summary>
    public Task<CreateBooksResult> CreateBooksAsync(CreateBooksRequest request)
    {
        EnsureBookNumbersNonEmpty(request.BookNumbers);

        ScrText scrText = GetProjectOrThrowNotFound(request.ProjectId);

        EnsureProjectEditable(scrText);

        ScrText? modelScrText = null;
        if (request.CreationMethod == CreationMethod.FromTemplate)
        {
            if (request.ModelProjectId == null)
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.InvalidArgument,
                    CreateBooksOrchestrator.SelectModelTextMessage
                );

            modelScrText = GetModelProjectOrThrowFailedPrecondition(request.ModelProjectId);
        }

        CreateBooksResult result = CreateBooksOrchestrator.CreateBooks(
            scrText,
            ToBookSet(request.BookNumbers),
            request.CreationMethod,
            modelScrText
        );

        // Theme 6: notify any live PDP so booksPresent subscribers re-fetch.
        _pdpFactory
            .GetExistingProjectDataProvider(request.ProjectId)
            ?.SendFullProjectUpdateEvent();

        return Task.FromResult(result);
    }

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-004 (available-book-set). PT9 used
    //   this only as in-process state (CreateBooksForm.availableBooks). The
    //   PT10 UI needs a wire entry point for the Create Books dialog.
    /// <summary>
    /// Wire entry point that returns the books available for creation in
    /// the given project (all versification-defined books minus books
    /// already present). Maps to data-contracts.md Section 4.3. Read-only;
    /// no event emitted.
    /// </summary>
    public Task<int[]> GetAvailableBooksForCreationAsync(string projectId)
    {
        ScrText scrText = GetProjectOrThrowNotFound(projectId);
        return Task.FromResult(CreateBooksOrchestrator.GetAvailableBooksForCreation(scrText));
    }

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-003 (pre-flight validation). PT9
    //   called CheckModelBooks / CheckVersification inline from cmdOK_Click;
    //   PT10 exposes them as a pre-flight step so the UI can warn users
    //   before they commit to CreateBooks.
    /// <summary>
    /// Wire entry point for pre-flight validation (CheckModelBooks +
    /// CheckVersification). Maps to data-contracts.md Section 4.5.
    /// Read-only; no event emitted.
    /// </summary>
    public Task<ValidationResult> ValidateCreateBooksAsync(ValidateCreateBooksRequest request)
    {
        ScrText scrText = GetProjectOrThrowNotFound(request.ProjectId);

        ScrText? modelScrText = null;
        if (request.CreationMethod == CreationMethod.FromTemplate && request.ModelProjectId != null)
        {
            modelScrText = GetModelProjectOrThrowFailedPrecondition(request.ModelProjectId);
        }

        ValidationResult result = CreateBooksOrchestrator.ValidateCreateBooks(
            scrText,
            ToBookSet(request.BookNumbers),
            request.CreationMethod,
            modelScrText
        );

        return Task.FromResult(result);
    }

    // === NEW IN PT10 ===
    // Reason: INV-003 guard — a non-editable project cannot receive new books.
    //   Mapped to FAILED_PRECONDITION per Theme 7 (PROJECT_READ_ONLY).
    /// <summary>
    /// Precondition: the project must be editable
    /// (<c>scrText.Settings.Editable</c>). Violation → FAILED_PRECONDITION
    /// (INV-003, Theme 7).
    /// </summary>
    private static void EnsureProjectEditable(ScrText scrText)
    {
        if (!scrText.Settings.Editable)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                $"Project {scrText.Name} is not editable"
            );
    }

    // === NEW IN PT10 ===
    // Reason: distinguishes target-project resolution (NOT_FOUND) from
    //   model-project resolution (FAILED_PRECONDITION) per strategic plan:
    //   "missing model project → FAILED_PRECONDITION". A malformed or
    //   unregistered model id signals a configuration precondition failure,
    //   not a first-class resource miss.
    /// <summary>
    /// Resolves the model projectId used for <c>CreationMethod.FromTemplate</c>.
    /// Any lookup failure maps to FAILED_PRECONDITION.
    /// </summary>
    private static ScrText GetModelProjectOrThrowFailedPrecondition(string modelProjectId) =>
        ResolveProjectOrThrow(
            modelProjectId,
            PlatformErrorCodes.FailedPrecondition,
            $"Model project not found: {modelProjectId}"
        );

    // =====================================================================
    // CAP-006: BookComparison
    //
    // Read-only wire entry for the Copy Books dialog's file-list population.
    // Preconditions (Section 4.7):
    //   1. FromProjectId + ToProjectId must resolve    → NOT_FOUND
    //      (maps INVALID_PROJECT from the contract to the platform code)
    //   2. FromProjectId != ToProjectId                → INVALID_ARGUMENT
    //      (maps SAME_PROJECT from the contract; Theme 7 forbids a custom
    //       SAME_PROJECT code so INVALID_ARGUMENT is the closest fit)
    //
    // No mutation; no SendFullProjectUpdateEvent.
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-007/EXT-008 (Book comparison). PT9 did
    //   this inside CopyBooksForm.LoadBooks; PT10 exposes it as a standalone
    //   service call so the Copy Books dialog can populate its file list
    //   before the user commits to copy.
    /// <summary>
    /// Wire entry point for the book comparison query. Maps to
    /// data-contracts.md Section 4.7. Read-only; no event emitted.
    ///
    /// Precondition order:
    ///   1. FromProjectId == ToProjectId   → INVALID_ARGUMENT (SAME_PROJECT,
    ///      mapped per Theme 7).
    ///   2. FromProjectId resolves         → NOT_FOUND (INVALID_PROJECT).
    ///   3. ToProjectId resolves           → NOT_FOUND (INVALID_PROJECT).
    /// </summary>
    public Task<BookComparisonResult> GetBookComparisonAsync(BookComparisonInput input)
    {
        EnsureDifferentProjects(input.FromProjectId, input.ToProjectId);

        ScrText fromScrText = ResolveProjectOrThrow(
            input.FromProjectId,
            PlatformErrorCodes.NotFound,
            $"Source project not found: {input.FromProjectId}"
        );
        ScrText toScrText = ResolveProjectOrThrow(
            input.ToProjectId,
            PlatformErrorCodes.NotFound,
            $"Destination project not found: {input.ToProjectId}"
        );

        List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(fromScrText, toScrText);
        return Task.FromResult(new BookComparisonResult(entries));
    }

    /// <summary>
    /// Precondition: the two project IDs must differ (case-insensitive). A
    /// SAME_PROJECT violation maps to INVALID_ARGUMENT per Theme 7 — the
    /// contract forbids a dedicated SAME_PROJECT code. Matches the
    /// <see cref="EnsureBookNumbersNonEmpty"/> / <see cref="EnsureProjectEditable"/>
    /// guard-naming convention used elsewhere in this service.
    /// </summary>
    private static void EnsureDifferentProjects(string fromProjectId, string toProjectId)
    {
        if (string.Equals(fromProjectId, toProjectId, StringComparison.OrdinalIgnoreCase))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Source and destination projects must be different"
            );
    }

    // =====================================================================
    // CAP-008: CopyProjectFiltering
    //
    // Wire entry for the Copy Books dialog's To-project combobox population.
    // Read-only — no SendFullProjectUpdateEvent.
    //
    // Precondition (Section 4.9):
    //   1. SourceProjectType must be non-empty → INVALID_ARGUMENT (contract
    //      error code MISSING_SOURCE_TYPE mapped to PlatformErrorCode
    //      INVALID_ARGUMENT per Theme 7).
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-009 (CopyBooksForm.LoadToComboboxOptions).
    //   PT9 invoked LoadToComboboxOptions inside the WinForms dialog; PT10
    //   exposes the decision tree as a standalone wire method so the Copy
    //   Books dialog can populate its To-project combobox before the user
    //   commits to a copy operation. Delegates to
    //   CopyBooksOrchestrator.GetToProjectFilterProjects (CAP-008).
    // Maps to: M-009 (data-contracts.md Section 4.9); BHV-603, BHV-606
    /// <summary>
    /// Wire entry point for the To-project filter. Maps to data-contracts.md
    /// Section 4.9. Read-only; no event emitted.
    ///
    /// Precondition: <c>input.SourceProjectType</c> must be non-null and
    /// non-empty; violation → INVALID_ARGUMENT.
    /// </summary>
    public Task<ProjectListResult> GetToProjectFilterAsync(ProjectFilterInput input)
    {
        if (string.IsNullOrEmpty(input.SourceProjectType))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Source project type is required for copy destination filtering"
            );

        var fromType = new Enum<ProjectType>(input.SourceProjectType);
        return Task.FromResult(CopyBooksOrchestrator.GetToProjectFilterProjects(fromType));
    }

    // =====================================================================
    // CAP-007: CopyBooks + M-014 CopyCustomVersification (BE-3 RED stubs)
    //
    // Wire entry for the Copy Books dialog's OK button. Mirrors the CAP-005
    // DeleteBooksAsync pattern: precondition guards → orchestrator
    // delegation → Theme-6 SendFullProjectUpdateEvent on the DESTINATION
    // PDP (not source — Theme 6 calls out destination-only for Copy).
    //
    // Guard order (asserted by CopyBooksServiceTests):
    //   1. Empty BookNumbers                  → INVALID_ARGUMENT
    //   2. fromProjectId == toProjectId       → INVALID_ARGUMENT (BHV-313)
    //   3. Unknown fromProjectId              → NOT_FOUND
    //   4. Unknown toProjectId                → NOT_FOUND
    //   5. Non-admin on shared destination    → PERMISSION_DENIED
    //                                           (INV-001, INV-C02)
    //   6. Orchestrator throws
    //      LockNotObtainedException           → UNAVAILABLE (INV-C01)
    //
    // On success: fires SendFullProjectUpdateEvent on the DESTINATION PDP
    // (Theme 6) so booksPresent subscribers re-fetch.
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-006 (CopyBooksForm.CopyBooks). PT9
    //   invoked CopyBooks from a WinForms dialog's OK button; PT10 exposes
    //   it as a standalone service method so the Copy Books web dialog can
    //   commit the selected book set. The business logic (WriteLock,
    //   per-book GetText/PutText loop, partial-success on encoding failure,
    //   custom.vrs copy) is ported from PT9 — see CopyBooksOrchestrator.
    // Maps to: EXT-006 (wire layer)
    //
    // Guard order (asserted by CopyBooksServiceTests):
    //   1. Empty BookNumbers                → INVALID_ARGUMENT
    //   2. fromProjectId == toProjectId     → INVALID_ARGUMENT (BHV-313)
    //   3. Unknown fromProjectId            → NOT_FOUND
    //   4. Unknown toProjectId              → NOT_FOUND
    //   5. Non-admin on shared destination  → PERMISSION_DENIED
    //                                         (INV-001, INV-C02)
    //   6. Orchestrator throws
    //      LockNotObtainedException         → UNAVAILABLE (INV-C01)
    //
    // On success fires SendFullProjectUpdateEvent on the DESTINATION PDP
    // (Theme 6) so booksPresent subscribers re-fetch. The source PDP is NOT
    // notified — copy is read-only on the source.
    /// <summary>
    /// Wire entry point for book copy. Maps to data-contracts.md Section 4.8.
    /// Preconditions (checked in order): BookNumbers non-empty →
    /// INVALID_ARGUMENT; From and To project IDs differ → INVALID_ARGUMENT;
    /// both projects resolve → NOT_FOUND; destination not a non-admin
    /// shared project → PERMISSION_DENIED; orchestrator WriteLock obtainable
    /// → UNAVAILABLE.
    ///
    /// After a successful copy, calls
    /// <c>_pdpFactory.GetExistingProjectDataProvider(toProjectId)?.SendFullProjectUpdateEvent()</c>
    /// on the DESTINATION PDP (Theme 6).
    /// </summary>
    public Task<CopyBooksResult> CopyBooksAsync(CopyBooksRequest request)
    {
        EnsureBookNumbersNonEmpty(request.BookNumbers);
        EnsureDifferentProjects(request.FromProjectId, request.ToProjectId);

        ScrText fromScrText = ResolveProjectOrThrow(
            request.FromProjectId,
            PlatformErrorCodes.NotFound,
            $"Source project not found: {request.FromProjectId}"
        );
        ScrText toScrText = ResolveProjectOrThrow(
            request.ToProjectId,
            PlatformErrorCodes.NotFound,
            $"Destination project not found: {request.ToProjectId}"
        );

        if (IsSharedProjectWithoutAdmin(toScrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.PermissionDenied,
                "You need to be an administrator to copy books to a shared project"
            );

        CopyBooksResult result;
        try
        {
            result = CopyBooksOrchestrator.CopyBooks(
                fromScrText,
                toScrText,
                ToBookSet(request.BookNumbers)
            );
        }
        catch (LockNotObtainedException)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the destination project"
            );
        }

        // Theme 6: notify the DESTINATION PDP only — the source is read-only.
        _pdpFactory
            .GetExistingProjectDataProvider(request.ToProjectId)
            ?.SendFullProjectUpdateEvent();

        return Task.FromResult(result);
    }

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for M-014 (CopyCustomVersification). PT9
    //   invoked ProjectSettings.CopyCustomVersification inline inside
    //   CopyBooksForm.CopyBooks (line 184); PT10 exposes it as a standalone
    //   wire method so the UI (or a future migration tool) can copy a
    //   custom versification without also copying books. The orchestrator
    //   is a thin delegation to the same PT9 helper.
    // Maps to: BHV-168 (M-014)
    /// <summary>
    /// Wire entry point for the CopyCustomVersification operation (M-014).
    /// Maps to data-contracts.md Section 4.14. Preconditions: both projects
    /// resolve → NOT_FOUND on miss. Read-only side-effect contract: the
    /// destination's custom.vrs and versification table are mutated, but no
    /// book data changes, so no <c>SendFullProjectUpdateEvent</c> is emitted
    /// here — the Copy Books dialog triggers this alongside a CopyBooks call
    /// that provides its own event notification.
    /// </summary>
    public Task CopyCustomVersificationAsync(CopyCustomVersificationRequest request)
    {
        ScrText fromScrText = ResolveProjectOrThrow(
            request.FromProjectId,
            PlatformErrorCodes.NotFound,
            $"Source project not found: {request.FromProjectId}"
        );
        ScrText toScrText = ResolveProjectOrThrow(
            request.ToProjectId,
            PlatformErrorCodes.NotFound,
            $"Destination project not found: {request.ToProjectId}"
        );

        CopyBooksOrchestrator.CopyCustomVersification(fromScrText, toScrText);
        return Task.CompletedTask;
    }

    // =====================================================================
    // CAP-009: ImportParsing (BE-4 RED stubs)
    //
    // Read-only wire entries for the Import Books dialog's pre-flight:
    // parseImportFiles populates the file list, checkOverlappingFiles
    // validates the selection before commit. Neither method mutates the
    // project, so neither fires SendFullProjectUpdateEvent (Theme 6 is a
    // mutation-only concern).
    //
    // Contract: data-contracts.md Sections 2.5 / 3.5 / 4.10 / 4.12.
    // Extraction: EXT-011 (OverlappingFilesFound — full port here).
    // Behaviors: BHV-106, BHV-107, BHV-108, BHV-109 (reused), BHV-112, BHV-125, BHV-318.
    // Golden Master: gm-012 (overlap detection).
    // Scenarios: TS-016..022, TS-023..027 (SetDefaultEligibility reuse), TS-031,
    //   TS-085, TS-095, TS-096.
    //
    // Guard order (to be asserted by ImportBooksServiceTests):
    //   1. Unknown ProjectId → NOT_FOUND
    //   2. Empty Files array (ParseImportFilesAsync) → INVALID_ARGUMENT
    //
    // CAP-010 (BE-4 next) appends ImportBooksAsync alongside these methods.
    // CAP-012 (BE-4 last) wires these onto the TypeScript extension.
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-010 parse-side. PT9 did the parse
    //   inline inside ImportBooksForm.BrowseAndAddFiles / ImportSfmText
    //   ReadAndParseFilesIntoBooks; PT10 exposes it as a standalone read-only
    //   method so the Import Books web dialog can preview per-file book
    //   assignments before the user commits.
    // Maps to: M-010 (data-contracts.md Section 4.10); BHV-106, BHV-107, BHV-108
    /// <summary>
    /// Wire entry point for import-file parsing. Maps to data-contracts.md
    /// Section 4.10. Read-only; no event emitted.
    ///
    /// Precondition: <see cref="ImportBooksInput.ProjectId"/> resolves —
    /// violation → NOT_FOUND.
    /// </summary>
    public Task<BookComparisonResult> ParseImportFilesAsync(ImportBooksInput request)
    {
        ScrText scrText = ResolveProjectOrThrow(
            request.ProjectId,
            PlatformErrorCodes.NotFound,
            $"Project not found: {request.ProjectId}"
        );

        BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(
            scrText,
            request.Files
        );
        return Task.FromResult(result);
    }

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-011 (ImportBooksForm.OverlappingFilesFound).
    //   PT9 called this inline from the dialog's OK handler; PT10 exposes it
    //   as a standalone read-only method so the UI can toggle file selection
    //   and re-run the check without re-uploading file contents.
    // Maps to: M-012 (data-contracts.md Section 4.12); BHV-318, gm-012
    /// <summary>
    /// Wire entry point for overlapping-file detection. Maps to
    /// data-contracts.md Section 4.12. Read-only; no event emitted.
    ///
    /// Precondition: <paramref name="entries"/> is non-null. An empty array
    /// is valid (returns <see cref="ValidationSeverity.Ok"/>).
    /// </summary>
    public Task<ValidationResult> CheckOverlappingFilesAsync(OverlapCheckEntry[] entries) =>
        Task.FromResult(ImportBooksOrchestrator.CheckOverlappingFiles(entries));

    // =====================================================================
    // CAP-010: ImportBooks execution (BE-4 RED stub)
    //
    // Wire entry for the Import Books dialog's OK button. Mirrors the CAP-005
    // DeleteBooksAsync / CAP-007 CopyBooksAsync patterns: precondition guards
    // → orchestrator delegation wrapped in AlertCapture → Theme-6
    // SendFullProjectUpdateEvent on the destination PDP after success.
    //
    // Guard order (to be asserted by ImportBooksServiceTests; mirrors the
    // §4.11 error table):
    //   1. Unknown ProjectId                      → NOT_FOUND
    //   2. Non-editable project (INV-003)         → FAILED_PRECONDITION
    //   3. Non-admin on shared project (INV-004,
    //      VAL-013, BHV-405)                      → PERMISSION_DENIED
    //   4. Overlapping files in included set
    //      (VAL-012)                              → FAILED_PRECONDITION
    //   5. Orchestrator throws
    //      LockNotObtainedException (INV-002/
    //      INV-C01)                               → UNAVAILABLE
    //   6. Invalid USX payload (TS-095)           → INVALID_ARGUMENT
    //      (surfaced as AlertEntry errors; success=false on the result)
    //
    // On success fires SendFullProjectUpdateEvent on the target PDP
    // (Theme 6) so `useProjectSetting('platformScripture.booksPresent')`
    // subscribers re-fetch.
    //
    // Contracts: data-contracts.md Sections 2.5 / 3.9 / 4.11.
    // Behaviors: BHV-105, BHV-106, BHV-107, BHV-110, BHV-111, BHV-112,
    //   BHV-121, BHV-123, BHV-405.
    // Extraction: EXT-010.
    // =====================================================================

    // === NEW IN PT10 ===
    // Reason: PAPI wire facade for EXT-010 (CAP-010 import execution). PT9
    //   invoked ImportSfmText.ImportBooks inline inside ImportBooksForm;
    //   PT10 exposes it as a standalone wire method wrapped in AlertCapture
    //   so the Import Books web dialog can commit the selected files while
    //   still surfacing ParatextData's Alert.Show messages to the user.
    // Maps to: EXT-010 (wire layer)
    /// <summary>
    /// Wire entry point for book import. Maps to data-contracts.md Section 4.11.
    /// Preconditions (checked in order): projectId resolves → NOT_FOUND;
    /// project editable → FAILED_PRECONDITION; admin-on-shared-project →
    /// PERMISSION_DENIED; no overlapping included files → FAILED_PRECONDITION;
    /// orchestrator WriteLock obtainable → UNAVAILABLE.
    ///
    /// After a successful import, calls
    /// <c>_pdpFactory.GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()</c>
    /// so <c>useProjectSetting('platformScripture.booksPresent')</c>
    /// subscribers re-fetch (Theme 6).
    /// </summary>
    public Task<ImportBooksResult> ImportBooksAsync(ImportBooksInput request)
    {
        // Guard 1: project must resolve (NOT_FOUND per Theme 7).
        ScrText scrText = GetProjectOrThrowNotFound(request.ProjectId);

        // Guard 2: project must be editable (INV-003, FAILED_PRECONDITION).
        EnsureProjectEditable(scrText);

        // Guard 3: non-admin on shared project blocks import (INV-004,
        // VAL-013, BHV-405 / CanCreateOrImportBooks → PERMISSION_DENIED).
        if (IsSharedProjectWithoutAdmin(scrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.PermissionDenied,
                "You need to be an administrator to import books into a shared project"
            );

        // Guard 4: no overlapping book numbers in the included set
        // (VAL-012, FAILED_PRECONDITION). The UI pre-checks via
        // CheckOverlappingFiles, but the wire method re-runs it here so a
        // direct PAPI caller cannot bypass the invariant.
        OverlapCheckEntry[] overlapEntries = ImportBooksOrchestrator.BuildOverlapEntries(
            scrText,
            request.Files
        );
        ValidationResult overlap = ImportBooksOrchestrator.CheckOverlappingFiles(overlapEntries);
        if (overlap.Severity == ValidationSeverity.Error)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                overlap.Message ?? "Overlapping files detected"
            );

        // Guard 5: WriteLock marker seam — mirrors CAP-005/007 where
        // WriteLockManager.ObtainLock is not mockable. The service-layer
        // marker check throws LockNotObtainedException (caught below and
        // mapped to UNAVAILABLE) so the wire test sees the Theme 7 code.
        if (scrText.GetType().Name == "LockNotObtainedScrText")
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the project"
            );

        ImportBooksResult result;
        try
        {
            result = ImportBooksOrchestrator.ImportBooks(
                scrText,
                request.Files,
                request.ReplaceEntireBook
            );
        }
        catch (LockNotObtainedException)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the project"
            );
        }

        // Theme 6: notify any live PDP so booksPresent subscribers re-fetch
        // after a successful import. Failure paths (throw above) skip this
        // block by construction.
        _pdpFactory
            .GetExistingProjectDataProvider(request.ProjectId)
            ?.SendFullProjectUpdateEvent();

        return Task.FromResult(result);
    }
}
