using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

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

    // ---- Non-parameterized user-facing error keys ---------------------------
    // Localize keys + English fallbacks for the service-layer guards. Follows
    // the wire-boundary localization pattern (see
    // patterns.errorHandling.backendLocalization in the decision registry) —
    // the guards throw PlatformErrorCodes.WithCode using the resolved English
    // text (via the Loc helper below) so wire consumers see a human-readable
    // message even if the localization service is unavailable.
    //
    // Translations live in
    // extensions/src/platform-scripture/contributions/localizedStrings.json.
    //
    // Admin-required guard: one unified key covers all three admin-on-shared
    // guards (delete, copy, import). The English fallback matches the PT9
    // PermissionManager.WarnIfNotAdministrator wording (Paratext/ParatextData/
    // Users/PermissionManager.cs:792) rather than the per-action phrasings
    // previously used — the generic message is appropriate because the UI
    // already has the per-operation context from which the error originated.

    internal const string AdminRequiredKey = "%manageBooks_error_adminRequired%";
    internal const string AdminRequiredFallback = "This is only available to administrators.";

    // Write-lock guard: one unified key covers all write-lock obtain failures
    // (delete, copy, import). The earlier per-action wording ("destination
    // project" vs "project") collapsed into one because callers already know
    // which project they were acting on; the shorter "project" form is the
    // more idiomatic translation.

    internal const string WriteLockUnavailableKey = "%manageBooks_error_writeLockUnavailable%";
    internal const string WriteLockUnavailableFallback =
        "Could not obtain write lock for the project";

    // Delete-guard: non-empty BookNumbers precondition.
    internal const string EmptyBookNumbersKey = "%manageBooks_error_emptyBookNumbers%";
    internal const string EmptyBookNumbersFallback = "BookNumbers must be non-empty";

    // Copy/BookComparison guard: From and To must differ.
    internal const string SameSourceAndDestKey = "%manageBooks_error_sameSourceAndDest%";
    internal const string SameSourceAndDestFallback =
        "Source and destination projects must be different";

    // GetToProjectFilter guard: distinct from ProjectFilterService's
    // MissingSourceProjectTypeKey (that one is for the FilterProjects
    // CopyDestination path; this one is the standalone GetToProjectFilter
    // wire method). Kept as a separate key so translators can differentiate
    // the two phrasings; consolidation is deferred to a future pass.
    internal const string MissingSourceProjectTypeForFilterKey =
        "%manageBooks_error_missingSourceProjectTypeForFilter%";
    internal const string MissingSourceProjectTypeForFilterFallback =
        "Source project type is required for copy destination filtering";

    // CopyCustomVersification (M-014) precondition guard. data-contracts §4.14
    // specifies NO_CUSTOM_VERSIFICATION as a FAILED_PRECONDITION returned when
    // the source project has no custom.vrs file (Theme 5, 2026-04-30). The
    // public CopyCustomVersification entry on the wire must surface this so
    // callers can distinguish "copied" from "no file to copy". (The
    // CopyBooks-internal call to TryCopyCustomVersification continues to
    // swallow the missing-file case as a best-effort step inside the broader
    // copy operation — see CopyBooksOrchestrator.)
    internal const string NoCustomVersificationKey =
        "%manageBooks_copyCustomVersification_noCustomVersification%";
    internal const string NoCustomVersificationFallback =
        "Source project does not have a custom versification file";

    // CreateBooks 3-level permission gate (Theme 6, 2026-04-30). PT9 enforces
    // INV-004 / INV-005 via ProjectPermissionManager.CanCreateOrImportBooks
    // which checks: (1) project editable, (2) user is Administrator OR
    // TeamMember, (3) per-book CanEdit. PT10 wire layer enforces level 1
    // (EnsureProjectEditable) and level 2 (this guard); per-book level 3 is
    // enforced inside CreateBooksOrchestrator.CreateBooks where TeamMembers
    // who lack edit rights for a specific book are skipped with an
    // AlertEntry — matching PT9 CreateBooksForm.cs:131-138 "alert and skip
    // per book" semantics.
    internal const string NotAdminOrTeamMemberKey = "%manageBooks_create_notAdminOrTeamMember%";
    internal const string NotAdminOrTeamMemberFallback =
        "You must be an administrator or team member to create books in this project.";

    // Per-book level-3 message (parameterized — UI substitutes the book id).
    internal const string TeamMemberCannotEditBookKey =
        "%manageBooks_create_teamMemberCannotEditBook%";
    internal const string TeamMemberCannotEditBookFallback =
        "Cannot create book {0}: you don't have permission to edit it";

    // Theme 9 (2026-04-30): the overlap-detection invariant branch — reached
    // only if CheckOverlappingFiles returned Severity=Error but Message=null
    // (an invariant violation, not a user-actionable error). Replaces the
    // prior hardcoded English `"Overlapping files detected"` so translators
    // can localize the message for the rare case it surfaces.
    internal const string UnexpectedNullOverlapMessageKey =
        "%manageBooks_internal_unexpectedNullOverlapMessage%";
    internal const string UnexpectedNullOverlapMessageFallback =
        "Internal error: overlap message was null";

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
    /// Registers this service with PAPI. The wire-method registration list
    /// is composed of per-capability helpers so the function table is
    /// auditable by capability banner. Theme 9 (2026-04-30) extracted the
    /// previously-flat 57-line collection into per-capability methods.
    /// </summary>
    public Task RegisterNetworkObjectAsync()
    {
        var functions = new List<(string functionName, Delegate function)>();
        functions.AddRange(CreateDeleteFunctions());
        functions.AddRange(CreateCreateFunctions());
        functions.AddRange(CreateCopyFunctions());
        functions.AddRange(CreateImportFunctions());
        functions.AddRange(CreateUtilityFunctions());

        return RegisterNetworkObjectAsync(
            NetworkObjectName,
            functions,
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [.. functions.Select(f => f.functionName)],
            },
            // EXPERIMENTAL: the entire platformScripture.manageBooks network object is experimental.
            // Experimental = true cascades x-experimental to the object:{name} existence method and
            // every function; Methods supplies the richer per-method docs.
            new NetworkObjectDocumentation
            {
                Experimental = true,
                Methods = BuildExperimentalDocumentation(),
            }
        );
    }

    /// <summary>
    /// Per-function OpenRPC documentation for every method on this network object, each marked
    /// experimental (<c>x-experimental: true</c>). Object-wide fanout: keys must match the function
    /// names registered in <see cref="RegisterNetworkObjectAsync()"/>.
    /// </summary>
    private static Dictionary<
        string,
        OpenRpcSingleMethodDocumentation
    > BuildExperimentalDocumentation() =>
        new()
        {
            ["deleteBooks"] = Create(
                "Delete books from a project.",
                [Param("request", "Delete-books request.")],
                ResultOf("object", "Delete-books result")
            ),
            ["createBooks"] = Create(
                "Create books in a project.",
                [Param("request", "Create-books request.")],
                ResultOf("object", "Create-books result")
            ),
            ["getAvailableBooksForCreation"] = Create(
                "Get the book numbers available to create in a project.",
                [Param("projectId", "Project id.", "string")],
                ResultOf("array", "Available book numbers")
            ),
            ["validateCreateBooks"] = Create(
                "Validate a create-books request before committing.",
                [Param("request", "Validate-create-books request.")],
                ResultOf("object", "Validation result")
            ),
            ["getBookComparison"] = Create(
                "Compare books between a source and destination project (copy pre-flight).",
                [Param("input", "Book-comparison input.")],
                ResultOf("object", "Book-comparison result")
            ),
            ["getProjectBookDates"] = Create(
                "Get a single project's own per-book last-modified dates (Import-grid date comparison).",
                [Param("projectId", "Project id.", "string")],
                ResultOf(
                    "object",
                    "Book-comparison result whose destLastModified is each book's own file date"
                )
            ),
            ["copyBooks"] = Create(
                "Copy books from a source project to a destination project.",
                [Param("request", "Copy-books request.")],
                ResultOf("object", "Copy-books result")
            ),
            ["copyCustomVersification"] = Create(
                "Copy a custom versification from a source project to a destination project.",
                [
                    Param("sourceProjectId", "Source project id.", "string"),
                    Param("destinationProjectId", "Destination project id.", "string"),
                ],
                ResultOf("null", "No return value")
            ),
            ["getToProjectFilter"] = Create(
                "Filter destination projects for the copy dropdown by source type.",
                [Param("input", "Project filter input.")],
                ResultOf("object", "Project list result")
            ),
            ["parseImportFiles"] = Create(
                "Parse import files into a book comparison (import pre-flight, read-only).",
                [Param("input", "Import-books input.")],
                ResultOf("object", "Book-comparison result")
            ),
            ["checkOverlappingFiles"] = Create(
                "Check import files for overlapping books.",
                [Param("entries", "Overlap-check entries.", "array")],
                ResultOf("object", "Validation result")
            ),
            ["importBooks"] = Create(
                "Import books into a project from files.",
                [Param("input", "Import-books input.")],
                ResultOf("object", "Import-books result")
            ),
            ["filterProjects"] = Create(
                "Filter projects for the Manage Books dialogs (unified read-only facade).",
                [Param("input", "Project filter input.")],
                ResultOf("object", "Project list result")
            ),
            ["isProjectShared"] = Create(
                "Whether a project is shared (used to enable shared-project delete-confirm behavior).",
                [Param("projectId", "Project id.", "string")],
                ResultOf("boolean", "True if the project is shared")
            ),
        };

    // CAP-005: DeleteBooks wire registration (single mutation method).
    private List<(string, Delegate)> CreateDeleteFunctions() =>
        [("deleteBooks", new Func<DeleteBooksRequest, Task<DeleteBooksResult>>(DeleteBooksAsync))];

    // CAP-004: Create/Validate/AvailableBooks — the Create Books dialog's
    // pre-flight + commit wire methods.
    private List<(string, Delegate)> CreateCreateFunctions() =>
        [
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
        ];

    // CAP-006 / CAP-007 / CAP-008 / M-014: Copy-side wire methods —
    // book comparison (read-only pre-flight), CopyBooks (commit),
    // CopyCustomVersification (M-014, two positional strings post-Theme-1),
    // and the per-source-type project filter for the destination dropdown.
    private List<(string, Delegate)> CreateCopyFunctions() =>
        [
            (
                "getBookComparison",
                new Func<BookComparisonInput, Task<BookComparisonResult>>(GetBookComparisonAsync)
            ),
            (
                "getProjectBookDates",
                new Func<string, Task<BookComparisonResult>>(GetProjectBookDatesAsync)
            ),
            ("copyBooks", new Func<CopyBooksRequest, Task<CopyBooksResult>>(CopyBooksAsync)),
            (
                "copyCustomVersification",
                new Func<string, string, Task>(CopyCustomVersificationAsync)
            ),
            (
                "getToProjectFilter",
                new Func<ProjectFilterInput, Task<ProjectListResult>>(GetToProjectFilterAsync)
            ),
        ];

    // CAP-009 / CAP-010: Import-side wire methods — parse (read-only),
    // overlap-check (read-only), and ImportBooks (the AlertCapture-wrapped
    // mutation).
    private List<(string, Delegate)> CreateImportFunctions() =>
        [
            (
                "parseImportFiles",
                new Func<ImportBooksInput, Task<BookComparisonResult>>(ParseImportFilesAsync)
            ),
            (
                "checkOverlappingFiles",
                new Func<OverlapCheckEntry[], Task<ValidationResult>>(CheckOverlappingFilesAsync)
            ),
            ("importBooks", new Func<ImportBooksInput, Task<ImportBooksResult>>(ImportBooksAsync)),
        ];

    // CAP-011: cross-cutting project filter (FilterProjects) — used by
    // multiple dialogs as a unified read-only facade.
    // Theme C2 (FN-008, 2026-05-01): isProjectShared added for the
    // ManageBooksDialog wiring layer to detect shared-project context
    // (delete-confirm copy enhancement, BHV-312). Mirrors PT9
    // DeleteBooksForm.cs:77 — `scrText.IsProjectShared && UserCount > 1`.
    private List<(string, Delegate)> CreateUtilityFunctions() =>
        [
            (
                "filterProjects",
                new Func<ProjectFilterInput, Task<ProjectListResult>>(FilterProjectsAsync)
            ),
            ("isProjectShared", new Func<string, Task<bool>>(IsProjectSharedAsync)),
        ];

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
                Loc(AdminRequiredKey, AdminRequiredFallback)
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
                Loc(WriteLockUnavailableKey, WriteLockUnavailableFallback)
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
    /// (data-contracts.md Section 4.6). Instance method (rather than static)
    /// so the error message can be localized via <see cref="Loc"/>.
    /// </summary>
    private void EnsureBookNumbersNonEmpty(int[] bookNumbers)
    {
        // Theme 9 (2026-04-30): NRT is enabled project-wide; the parameter
        // type `int[]` is non-nullable, so the prior `bookNumbers == null`
        // check was unreachable. Length is the only check needed.
        if (bookNumbers.Length == 0)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                Loc(EmptyBookNumbersKey, EmptyBookNumbersFallback)
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
        // Theme 9 (2026-04-30): narrowed from `catch (Exception)` to the
        // expected lookup-failure types only. ScrTextCollection.GetById
        // throws ProjectNotFoundException for an unknown id;
        // HexId.FromStr → StringUtils.HexToByteArr throws ArgumentException
        // for malformed hex input ("Input must have even number of
        // characters" / non-hex characters). Anything else (NRE, IO, etc.)
        // is unexpected — let it propagate so the failure mode and stack
        // trace are visible rather than masquerading as a semantic NOT_FOUND.
        catch (ProjectNotFoundException)
        {
            throw PlatformErrorCodes.WithCode(platformErrorCode, errorMessage);
        }
        catch (ArgumentException)
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

    // === NEW IN PT10 ===
    // Reason: Theme 6 (CreateBooks 3-level permission gate, 2026-04-30).
    //   INV-004 mandates the three-level check (editable → role → per-book).
    //   The role level here is "Administrator OR TeamMember" — strictly less
    //   restrictive than IsSharedProjectWithoutAdmin (used for Delete / Copy /
    //   Import) which forbids TeamMembers entirely. Per-book level-3 lives in
    //   CreateBooksOrchestrator. Matches PT9 ProjectPermissionManager
    //   CanCreateOrImportBooks (Paratext/ParatextData/Users/
    //   ProjectPermissionManager.cs:101-130) for create-style operations.
    /// <summary>
    /// True when the current user is at least a TeamMember (Administrator or
    /// TeamMember) on the project. Distinct from
    /// <see cref="IsSharedProjectWithoutAdmin"/>: this is the create-side
    /// permission gate (INV-004 level 2), used by CreateBooks and
    /// ValidateCreateBooks.
    /// </summary>
    private static bool IsAdministratorOrTeamMember(ScrText scrText) =>
        scrText.Permissions.AmAdministratorOrTeamMember;

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
    public Task<ProjectListResult> FilterProjectsAsync(ProjectFilterInput input)
    {
        try
        {
            return Task.FromResult(ProjectFilterService.FilterProjects(input));
        }
        catch (Exception ex)
            // Theme 9 (2026-04-30): replaced the magic-key indexing
            // `ex.Data["platformErrorCode"] as string` with the typed helper
            // `PlatformErrorCodes.TryGetCode` so the dictionary key stays
            // colocated with its declaration in PlatformErrorCodes.cs.
            when (PlatformErrorCodes.TryGetCode(ex, out string? code)
                && code == PlatformErrorCodes.InvalidArgument
                && IsLocalizeKey(ex.Message)
            )
        {
            // Wire-boundary resolution for the MissingSourceProjectTypeKey
            // thrown by ProjectFilterService.BuildCopyDestinationProjectList
            // (the only localize-keyed throw in that service). The other
            // throw path ("Unknown project filter purpose: ...") is
            // parameterized and passes through unchanged.
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                Loc(
                    ProjectFilterService.MissingSourceProjectTypeKey,
                    ProjectFilterService.MissingSourceProjectTypeFallback
                )
            );
        }
    }

    // === NEW IN PT10 ===
    // Reason: Theme C2 (FN-008 v2.6.0+, 2026-05-01). The unified ManageBooksDialog
    //   needs to know whether the active project is shared with other users so it
    //   can show enhanced delete-confirm copy (BHV-312, A2). PT9 read this state
    //   inline in DeleteBooksForm.cs:77 — `scrText.IsProjectShared && UserCount > 1`.
    //   PT10 surfaces it as a wire method so the React web view can subscribe via
    //   the platformScripture.manageBooks NetworkObject without any per-call
    //   round-trip through other dialog APIs.
    /// <summary>
    /// True iff the project is shared (S/R, registered) AND has more than one
    /// user-of-record. Mirrors the PT9 idiom in
    /// <c>Paratext/ToolsMenu/DeleteBooksForm.cs:77</c>:
    /// <c>scrText.IsProjectShared &amp;&amp; scrText.Permissions.UserCount &gt; 1</c>.
    /// Returns <c>false</c> for unknown project ids rather than throwing —
    /// the React caller invokes this on every project-change event and
    /// stalling the UI on a stale id is unhelpful.
    /// </summary>
    /// <param name="projectId">Target project id (PT10 metadata id, not PT9 GUID).</param>
    /// <returns><c>true</c> when shared+multi-user; <c>false</c> for unshared,
    ///   single-user, or unknown projects.</returns>
    public Task<bool> IsProjectSharedAsync(string projectId)
    {
        try
        {
            ScrText scrText = LocalParatextProjects.GetParatextProject(projectId);
            return Task.FromResult(scrText.IsProjectShared && scrText.Permissions.UserCount > 1);
        }
        // Theme 9 conventions: narrow the catch to the documented lookup-failure
        // types (ProjectNotFoundException for unknown id, ArgumentException for
        // malformed HexId). Anything else propagates so unexpected failures are
        // visible rather than masquerading as "not shared".
        catch (ProjectNotFoundException)
        {
            return Task.FromResult(false);
        }
        catch (ArgumentException)
        {
            return Task.FromResult(false);
        }
    }

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

        // Theme 6 level-2 gate (INV-004): user must be Administrator or
        // TeamMember to invoke CreateBooks. Per-book level-3 (TeamMember
        // CanEdit) is enforced inside the orchestrator's per-book loop so
        // partial-success semantics survive (admins skip level-3 per
        // INV-005). Distinct from IsSharedProjectWithoutAdmin used by
        // Delete/Copy/Import — those forbid TeamMembers entirely; CreateBooks
        // does not.
        if (!IsAdministratorOrTeamMember(scrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.PermissionDenied,
                Loc(NotAdminOrTeamMemberKey, NotAdminOrTeamMemberFallback)
            );

        ScrText? modelScrText = null;
        if (request.CreationMethod == CreationMethod.FromTemplate)
        {
            if (request.ModelProjectId == null)
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.InvalidArgument,
                    Loc(
                        CreateBooksOrchestrator.SelectModelTextKey,
                        CreateBooksOrchestrator.SelectModelTextFallback
                    )
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

        // Theme 6 (2026-04-30): pre-flight validation surfaces the level-2
        // permission gap as a ValidationResult.Error rather than throwing —
        // the UI uses this to disable the Create button before the user
        // commits. (CreateBooksAsync still throws PermissionDenied if a
        // caller bypasses the validate step.)
        if (!IsAdministratorOrTeamMember(scrText))
            return Task.FromResult(
                ValidationResult.Error(Loc(NotAdminOrTeamMemberKey, NotAdminOrTeamMemberFallback))
            );

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

        // Wire-boundary resolution: the orchestrator returns the VAL-009
        // SelectModelTextKey; resolve it to localized English before serializing.
        // Parameterized messages (CheckModelBooks, CheckVersification) pass
        // through unchanged — they are not keys and will be localized in a
        // later structured-fields refactor (see FN-005 forward-note).
        if (IsLocalizeKey(result.Message))
            result = result with
            {
                Message = Loc(
                    CreateBooksOrchestrator.SelectModelTextKey,
                    CreateBooksOrchestrator.SelectModelTextFallback
                ),
            };

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
        // Wire-boundary resolution: TooltipInfo carries localize keys; resolve
        // them via LocalizationService before sending over PAPI.
        List<BookComparisonEntry> resolved = ResolveTooltipEntries(entries);
        return Task.FromResult(new BookComparisonResult(resolved));
    }

    /// <summary>
    /// Return a single project's own per-book last-modified dates (I9). Used by the Import grid:
    /// in pure Import mode no second project is involved, so the regular two-project
    /// <see cref="GetBookComparisonAsync"/> side-channel never populates the destination project's
    /// dates and every imported book would otherwise compare against an unknown date and read as
    /// "New". This compares the project against itself (which <see cref="GetBookComparisonAsync"/>
    /// forbids via <see cref="EnsureDifferentProjects"/>, since that is a copy-comparison guard);
    /// the <c>destLastModified</c> on each returned entry is the real
    /// <c>FileManager.GetLastWriteTime</c> value for the project's books. Read-only.
    ///
    /// SCOPE: reuses <see cref="CopyBooksOrchestrator.LoadBooks"/>, so the returned set is the same
    /// "books the user can edit (or, as admin, create)" universe the copy comparison uses. For a
    /// normal editable target every present book is editable, so all get a date. In the uncommon
    /// case of a per-book-restricted target, a present-but-non-editable book is omitted and would
    /// still read as "New" in the grid — a strict improvement over the prior all-"New" behavior, and
    /// harmless because a non-editable book can't be an Import target anyway. (LoadBooks also reads
    /// each book's USFM for its eligibility comparison, which is more work than dates alone strictly
    /// need; acceptable as a one-time, cached-per-open cost in exchange for reusing the proven
    /// date/eligibility logic rather than duplicating it.)
    /// </summary>
    public Task<BookComparisonResult> GetProjectBookDatesAsync(string projectId)
    {
        ScrText scrText = ResolveProjectOrThrow(
            projectId,
            PlatformErrorCodes.NotFound,
            $"Project not found: {projectId}"
        );
        List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(scrText, scrText);
        List<BookComparisonEntry> resolved = ResolveTooltipEntries(entries);
        return Task.FromResult(new BookComparisonResult(resolved));
    }

    /// <summary>
    /// Precondition: the two project IDs must differ (case-insensitive). A
    /// SAME_PROJECT violation maps to INVALID_ARGUMENT per Theme 7 — the
    /// contract forbids a dedicated SAME_PROJECT code. Matches the
    /// <see cref="EnsureBookNumbersNonEmpty"/> / <see cref="EnsureProjectEditable"/>
    /// guard-naming convention used elsewhere in this service. Instance
    /// method (rather than static) so the error message can be localized via
    /// <see cref="Loc"/>.
    /// </summary>
    private void EnsureDifferentProjects(string fromProjectId, string toProjectId)
    {
        if (string.Equals(fromProjectId, toProjectId, StringComparison.OrdinalIgnoreCase))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                Loc(SameSourceAndDestKey, SameSourceAndDestFallback)
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
                Loc(MissingSourceProjectTypeForFilterKey, MissingSourceProjectTypeForFilterFallback)
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
                Loc(AdminRequiredKey, AdminRequiredFallback)
            );

        CopyBooksResult result;
        try
        {
            result = CopyBooksOrchestrator.CopyBooks(
                fromScrText,
                toScrText,
                ToBookSet(request.BookNumbers),
                request.ReplaceEntireBook
            );
        }
        catch (LockNotObtainedException)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                Loc(WriteLockUnavailableKey, WriteLockUnavailableFallback)
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
    public Task CopyCustomVersificationAsync(string sourceProjectId, string destProjectId)
    {
        ScrText fromScrText = ResolveProjectOrThrow(
            sourceProjectId,
            PlatformErrorCodes.NotFound,
            $"Source project not found: {sourceProjectId}"
        );
        ScrText toScrText = ResolveProjectOrThrow(
            destProjectId,
            PlatformErrorCodes.NotFound,
            $"Destination project not found: {destProjectId}"
        );

        // Theme 5 (2026-04-30): wire-boundary NO_CUSTOM_VERSIFICATION
        // precondition per data-contracts §4.14. Without this check, callers
        // received Task.CompletedTask whether or not the copy actually
        // happened — the orchestrator's swallow-all-exceptions policy
        // (preserved on `TryCopyCustomVersification` for in-CopyBooks use)
        // hid the missing-file case. The wire layer is the right place to
        // surface the precondition so callers can distinguish the two.
        if (!CopyBooksOrchestrator.HasCustomVersification(fromScrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                Loc(NoCustomVersificationKey, NoCustomVersificationFallback)
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
        // Wire-boundary resolution: ParseImportFiles reuses CopyBooksOrchestrator
        // .SetDefaultEligibility (CAP-006), so the Entries carry TooltipInfo
        // localize keys that must be resolved before serializing.
        return Task.FromResult(new BookComparisonResult(ResolveTooltipEntries(result.Entries)));
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
    public Task<ValidationResult> CheckOverlappingFilesAsync(OverlapCheckEntry[] entries)
    {
        ValidationResult result = ImportBooksOrchestrator.CheckOverlappingFiles(entries);
        // Wire-boundary resolution: the orchestrator returns the
        // OverlappingFilesAlertKey; resolve it before serializing.
        if (IsLocalizeKey(result.Message))
            result = result with
            {
                Message = Loc(
                    ImportBooksOrchestrator.OverlappingFilesAlertKey,
                    ImportBooksOrchestrator.OverlappingFilesAlertFallback
                ),
            };
        return Task.FromResult(result);
    }

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
                Loc(AdminRequiredKey, AdminRequiredFallback)
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
                // Resolve the orchestrator's localize-key Message; the null
                // fallback covers an invariant-violation branch (Severity=Error
                // with no message) and now also goes through the localizer
                // (Theme 9, 2026-04-30) so translators can localize even the
                // internal-error case.
                overlap.Message != null
                && IsLocalizeKey(overlap.Message)
                    ? Loc(
                        ImportBooksOrchestrator.OverlappingFilesAlertKey,
                        ImportBooksOrchestrator.OverlappingFilesAlertFallback
                    )
                    : overlap.Message
                        ?? Loc(
                            UnexpectedNullOverlapMessageKey,
                            UnexpectedNullOverlapMessageFallback
                        )
            );

        // Guard 5: WriteLock marker seam — mirrors CAP-005/007 where
        // WriteLockManager.ObtainLock is not mockable. The service-layer
        // marker check throws UNAVAILABLE directly so the wire test sees
        // the Theme 7 code (orchestrator returns Success=false on the same
        // marker, so both layers remain test-friendly). Uses the shared
        // CAP-010 constant on ImportBooksOrchestrator — single source of
        // truth for the marker type name within this capability.
        if (scrText.GetType().Name == ImportBooksOrchestrator.LockNotObtainedMarkerTypeName)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                Loc(WriteLockUnavailableKey, WriteLockUnavailableFallback)
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
                Loc(WriteLockUnavailableKey, WriteLockUnavailableFallback)
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

    // =====================================================================
    // Wire-boundary localization helpers.
    //
    // Orchestrator / service methods may carry localize keys ("%...%") in
    // record fields or throw helper messages. These helpers centralize the
    // "resolve key to localized text" at the wire boundary so the rest of
    // this service can treat keys as normal strings. Pattern:
    // patterns.errorHandling.backendLocalization in the decision registry.
    // =====================================================================

    /// <summary>
    /// Lightweight test for "looks like a localize key" — wrapped in
    /// <c>%</c> sentinels per paranext-core convention. Idempotence guard
    /// ensures calling the resolver twice on the same record does not
    /// re-resolve an already-resolved value.
    /// </summary>
    // Theme 9 (2026-04-30): renamed parameter `s` → `value` for consistency
    // with the calling helpers (ResolveIfKey takes `string? value`).
    private static bool IsLocalizeKey(string? value) =>
        value != null && value.Length >= 2 && value[0] == '%' && value[^1] == '%';

    /// <summary>
    /// Resolves <paramref name="value"/> if it looks like a localize key;
    /// otherwise returns it verbatim (or <paramref name="fallback"/> when
    /// null). Routes through <see cref="LocalizationService.GetLocalizedString"/>
    /// with the supplied <paramref name="fallback"/> so unregistered services
    /// (e.g. unit-test <c>DummyPapiClient</c>) return the fallback English
    /// text.
    /// </summary>
    private string ResolveIfKey(string? value, string fallback) =>
        IsLocalizeKey(value)
            ? LocalizationService.GetLocalizedString(PapiClient, value!, fallback)
            : (value ?? fallback);

    /// <summary>
    /// Convenience wrapper: given a key/fallback pair, resolves via the
    /// localization service, returning the fallback when the service is
    /// unavailable or the key is unregistered.
    /// </summary>
    private string Loc(string key, string fallback) => ResolveIfKey(key, fallback);

    /// <summary>
    /// Tooltip key → fallback map for resolving the localize keys carried in
    /// <see cref="BookComparisonEntry.TooltipInfo"/>. The orchestrator
    /// produces the keys; this service's wire methods resolve them via
    /// <see cref="ResolveTooltipEntries"/> before serialization.
    /// </summary>
    private static readonly IReadOnlyDictionary<string, string> TooltipFallbacks = new Dictionary<
        string,
        string
    >
    {
        [CopyBooksOrchestrator.FilesAreSameTooltipKey] =
            CopyBooksOrchestrator.FilesAreSameTooltipFallback,
        [CopyBooksOrchestrator.SourceDoesNotExistTooltipKey] =
            CopyBooksOrchestrator.SourceDoesNotExistTooltipFallback,
        [CopyBooksOrchestrator.DestDoesNotExistTooltipKey] =
            CopyBooksOrchestrator.DestDoesNotExistTooltipFallback,
        [CopyBooksOrchestrator.SourceIsNewerTooltipKey] =
            CopyBooksOrchestrator.SourceIsNewerTooltipFallback,
        [CopyBooksOrchestrator.SourceIsOlderTooltipKey] =
            CopyBooksOrchestrator.SourceIsOlderTooltipFallback,
    };

    /// <summary>
    /// Walks <paramref name="entries"/> and resolves any
    /// <see cref="BookComparisonEntry.TooltipInfo"/> that is a localize key
    /// into its localized English (or selected-language) form. Returns a new
    /// list with resolved entries so the immutable-record contract is kept.
    /// </summary>
    private List<BookComparisonEntry> ResolveTooltipEntries(List<BookComparisonEntry> entries)
    {
        var result = new List<BookComparisonEntry>(entries.Count);
        foreach (BookComparisonEntry entry in entries)
        {
            if (!IsLocalizeKey(entry.TooltipInfo))
            {
                result.Add(entry);
                continue;
            }
            string fallback = TooltipFallbacks.TryGetValue(entry.TooltipInfo, out string? f)
                ? f
                : entry.TooltipInfo;
            string resolved = LocalizationService.GetLocalizedString(
                PapiClient,
                entry.TooltipInfo,
                fallback
            );
            result.Add(entry with { TooltipInfo = resolved });
        }
        return result;
    }
}
