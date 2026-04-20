using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 DESIGN (Theme 1) ===
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Service pattern clarified as NetworkObject"
// Maps to: EXT-013 (the service-layer facade for all ManageBooks operations)
//
// STUB — Test Writer RED skeleton for CAP-005.
// The constructor + register entry compile, but all wire methods throw
// NotImplementedException — the Layer-2 RED signal. The Implementer for
// CAP-005 replaces DeleteBooksAsync in GREEN; later capabilities add the
// other methods (Create/Copy/Import/etc.) in BE-2 through BE-4.

/// <summary>
/// PAPI-facing NetworkObject that exposes Manage Books operations
/// (<c>deleteBooks</c>, <c>createBooks</c>, <c>copyBooks</c>, <c>importBooks</c>,
/// etc.). Registered as <c>object:platformScripture.manageBooks</c> via
/// <see cref="RegisterNetworkObjectAsync"/>.
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
    /// Registers this service with PAPI. The implementer fills in the
    /// function table (<c>deleteBooks</c>, <c>createBooks</c>, ...) in GREEN.
    /// </summary>
    public Task RegisterNetworkObjectAsync()
    {
        // Register on the network with the public name. The function table
        // will include ("deleteBooks", DeleteBooksAsync) once the Implementer
        // wires it up. For now, register with an empty list so the NetworkObject
        // bookkeeping (and InvalidOperationException on double-register) holds.
        return RegisterNetworkObjectAsync(
            NetworkObjectName,
            [],
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [],
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
        throw new NotImplementedException(
            "CAP-005 ManageBooksService.DeleteBooksAsync: not yet implemented. "
                + "Full flow: project lookup → precondition checks → "
                + "DeleteBooksOrchestrator.DeleteBooks → SendFullProjectUpdateEvent on PDP. "
                + "See data-contracts.md Section 4.6 and backend-alignment.md (Themes 6, 7)."
        );
    }
}
