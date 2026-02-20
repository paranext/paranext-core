// === CAP-018: TextCollectionDataProvider ===
// Wires all Text Collection services onto the PAPI network as a DataProvider
// with individual command registrations.
// Source: Strategic plan BE-6, data-contracts.md M-001 through M-018
// Dependencies: All CAP-001 through CAP-017 services

using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;
using SIL.Scripture;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// PAPI DataProvider that exposes all Text Collection services on the network.
/// Registers 5 DataProvider get functions and 14 individual commands.
/// </summary>
internal sealed class TextCollectionDataProvider : NetworkObjects.DataProvider
{
    private readonly SavedCollectionService _savedCollectionService;

    public TextCollectionDataProvider(PapiClient papiClient)
        : base("platformScripture.textCollection", papiClient)
    {
        _savedCollectionService = new SavedCollectionService();
    }

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        throw new NotImplementedException("CAP-018 stub: GetFunctions not yet implemented");
    }

    protected override Task StartDataProviderAsync()
    {
        throw new NotImplementedException(
            "CAP-018 stub: StartDataProviderAsync not yet implemented"
        );
    }
}
