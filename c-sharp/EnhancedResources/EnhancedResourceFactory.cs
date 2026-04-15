// TDD RED stub: Compilation-only stubs for RED phase testing.
// The implementer will replace this with the real implementation.
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Factory that enumerates available ER resources and creates per-resource
/// EnhancedResourceNetworkObject instances on demand. Follows the
/// ParatextProjectDataProviderFactory pattern.
///
/// Source: CAP-001, data-contracts.md Section 4.1
/// TDD RED STUB - All methods throw NotImplementedException.
/// </summary>
internal class EnhancedResourceFactory : NetworkObject
{
    public EnhancedResourceFactory(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base(papiClient)
    {
        throw new NotImplementedException("RED stub: EnhancedResourceFactory constructor");
    }

    public Task InitializeAsync()
    {
        throw new NotImplementedException("RED stub: InitializeAsync");
    }

    public string[] GetAvailableResources()
    {
        throw new NotImplementedException("RED stub: GetAvailableResources");
    }

    public string GetResourceObjectId(string resourceId)
    {
        throw new NotImplementedException("RED stub: GetResourceObjectId");
    }

    public InitializeResult GetInitializeResult()
    {
        throw new NotImplementedException("RED stub: GetInitializeResult");
    }
}
