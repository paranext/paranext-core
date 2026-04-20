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
    private static ScrText GetProjectOrThrowNotFound(string projectId)
    {
        try
        {
            return LocalParatextProjects.GetParatextProject(projectId);
        }
        catch (Exception)
        {
            // ScrTextCollection.GetById throws ProjectNotFoundException when the
            // project id is unknown; HexId.FromStr throws for malformed ids.
            // Both map to NOT_FOUND per Theme 7.
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Project not found: {projectId}"
            );
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
}
