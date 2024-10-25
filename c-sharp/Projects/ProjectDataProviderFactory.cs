using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Provides a ProjectDataProvider object for a specified set of projectInterfaces
/// </summary>
internal abstract class ProjectDataProviderFactory : NetworkObject
{
    private readonly List<string> _projectInterfaces;
    private readonly string _pdpfName;

    protected ProjectDataProviderFactory(
        List<string> projectInterfaces,
        string pdpfName,
        PapiClient papiClient
    )
        : base(papiClient)
    {
        _projectInterfaces = projectInterfaces;
        _pdpfName = pdpfName;
    }

    public async Task InitializeAsync()
    {
        await StartFactoryAsync();
        var name = $"platform.{_pdpfName}-pdpf";
        await RegisterNetworkObjectAsync(
            name,
            [
                ("getAvailableProjects", GetAvailableProjects),
                ("getProjectDataProviderId", GetProjectDataProviderID),
            ],
            new ProjectDataProviderFactoryCreatedDetails()
            {
                Id = name,
                ObjectType = NetworkObjectType.PROJECT_DATA_PROVIDER_FACTORY,
                FunctionNames = ["getAvailableProjects", "getProjectDataProviderId"],
                Attributes = new ProjectDataProviderFactoryAttributes()
                {
                    ProjectInterfaces = _projectInterfaces,
                },
            }
        );
    }

    /// <summary>
    /// Perform all work needed to be able to respond to PDP requests
    /// </summary>
    protected abstract Task StartFactoryAsync();

    /// <summary>
    /// Return project metadata for all projects available through this PDP factory
    /// </summary>
    protected abstract List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore);

    /// <summary>
    /// Return the name of the PDP network object that corresponds to the given project ID
    /// </summary>
    protected abstract string GetProjectDataProviderID(string projectID);
}
