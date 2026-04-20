using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;
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
}
