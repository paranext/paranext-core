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
                ("getAvailableProjects", GetAvailableProjectsWithFirstRequestMarks),
                ("getProjectDataProviderId", GetProjectDataProviderIDWithFirstRequestMarks),
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
    /// Wraps <see cref="GetAvailableProjects"/> with startup-timing marks around this factory's
    /// first request so a slow first project-metadata enumeration shows up in the startup
    /// waterfall (it is on the critical path to showing scripture). No-ops (beyond the marks'
    /// own enabled check) after the first request.
    /// </summary>
    private List<ProjectMetadata>? GetAvailableProjectsWithFirstRequestMarks(JsonElement ignore)
    {
        Services.StartupTiming.MarkOnce($"first-get-available-projects-start {_pdpfName}");
        var result = GetAvailableProjects(ignore);
        Services.StartupTiming.MarkOnce($"first-get-available-projects-end {_pdpfName}");
        return result;
    }

    /// <summary>
    /// Wraps <see cref="GetProjectDataProviderID"/> with startup-timing marks around this
    /// factory's first request, so the first PDP creation + registration (on the critical path
    /// between a scripture editor web view mounting and its first chapter request) shows up in
    /// the startup waterfall.
    /// </summary>
    private string GetProjectDataProviderIDWithFirstRequestMarks(string projectID)
    {
        Services.StartupTiming.MarkOnce($"first-get-pdp-id-start {_pdpfName}");
        var result = GetProjectDataProviderID(projectID);
        Services.StartupTiming.MarkOnce($"first-get-pdp-id-end {_pdpfName}");
        return result;
    }

    /// <summary>
    /// Return project metadata for all projects available through this PDP factory
    /// </summary>
    protected abstract List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore);

    /// <summary>
    /// Return the name of the PDP network object that corresponds to the given project ID
    /// </summary>
    public abstract string GetProjectDataProviderID(string projectID);
}
