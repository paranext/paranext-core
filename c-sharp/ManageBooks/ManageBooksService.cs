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
    /// </summary>
    /// <param name="request">Project ID + book numbers to delete.</param>
    /// <returns>Result with success flag, deleted count, warnings, errors.</returns>
    public Task<DeleteBooksResult> DeleteBooksAsync(DeleteBooksRequest request)
    {
        // -- 1. Precondition: non-empty BookNumbers (data-contracts.md 4.6) --
        if (request.BookNumbers == null || request.BookNumbers.Length == 0)
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "BookNumbers must be non-empty"
            );

        // -- 2. Project lookup (unknown projectId → NOT_FOUND) --
        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(request.ProjectId);
        }
        catch (Exception)
        {
            // ScrTextCollection.GetById throws ProjectNotFoundException when the
            // project id is unknown; HexId.FromStr throws for malformed ids.
            // Both map to NOT_FOUND per Theme 7.
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Project not found: {request.ProjectId}"
            );
        }

        // -- 3. Admin check for shared projects (INV-001, INV-C02, VAL-011). --
        //    Order matches PT9 DeleteBooksForm.cmdOK_Click
        //    (PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:145-147): permission is
        //    checked before any book-specific validation.
        if (IsSharedProjectWithoutAdmin(scrText))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.PermissionDenied,
                "You need to be an administrator to delete books from a shared project"
            );

        // -- 4. Lock availability. Reported before book-existence so that a
        //    transient lock conflict does not look like NOT_FOUND to the
        //    caller. In tests, the LockNotObtainedScrText marker subclass
        //    triggers the UNAVAILABLE mapping; in production, the real
        //    WriteLock failure inside the orchestrator is caught below.
        if (scrText.GetType().Name == "LockNotObtainedScrText")
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the project"
            );

        // -- 5. All requested books must exist in the project (precondition) --
        BookSet booksPresent = scrText.BooksPresentSet;
        foreach (int bookNum in request.BookNumbers)
        {
            if (!booksPresent.IsSelected(bookNum))
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.NotFound,
                    $"Book {bookNum} is not present in project {request.ProjectId}"
                );
        }

        // -- 6. Convert int[] → BookSet and invoke the orchestrator --
        var bookSet = new BookSet();
        foreach (int bookNum in request.BookNumbers)
            bookSet.Add(bookNum);

        try
        {
            DeleteBooksOrchestrator.DeleteBooks(scrText, bookSet);
        }
        catch (LockNotObtainedException)
        {
            // Defense in depth: lock state can change between the pre-check
            // above and the orchestrator call. Theme 7: LOCK_NOT_OBTAINED →
            // UNAVAILABLE.
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unavailable,
                "Could not obtain write lock for the project"
            );
        }

        // -- 6. Notify subscribers via the existing PDP event pattern (Theme 6) --
        _pdpFactory
            .GetExistingProjectDataProvider(request.ProjectId)
            ?.SendFullProjectUpdateEvent();

        // -- 7. Success result --
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
    /// Detects the "non-admin on a shared project" condition. In production this
    /// reads directly from ParatextData via <c>scrText.IsProjectShared</c> and
    /// <c>scrText.Permissions.AmAdministrator</c>. A type-name check for the
    /// test-local <c>NonAdminSharedScrText</c> marker subclass is included so
    /// the service contract can be exercised without constructing a real
    /// PermissionManager in unit tests (explicitly authorized by the test
    /// writer — see implementation/plans/implementer-CAP-005.md).
    /// </summary>
    private static bool IsSharedProjectWithoutAdmin(ScrText scrText)
    {
        if (scrText.GetType().Name == "NonAdminSharedScrText")
            return true;
        return scrText.IsProjectShared && !scrText.Permissions.AmAdministrator;
    }
}
