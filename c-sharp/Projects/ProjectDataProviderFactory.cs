using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
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
            new ProjectDataProviderFactoryCreatedDetails()
            {
                Id = name,
                ObjectType = NetworkObjectType.PROJECT_DATA_PROVIDER_FACTORY,
                Functions = ["getAvailableProjects", "getProjectDataProviderId"],
                Attributes = new ProjectDataProviderFactoryAttributes()
                {
                    ProjectInterfaces = _projectInterfaces,
                },
            },
            FunctionHandler
        );
    }

    // An array of strings serialized as JSON will be sent here.
    // The first item in the array is the name of the function to call.
    // All remaining items are arguments to pass to the function.
    // Data providers must provide "get" and "set" functions.
    private object? FunctionHandler(JsonElement request)
    {
        JsonArray jsonArray = request.Deserialize<JsonNode>()!.AsArray();
        if (jsonArray.Count == 0)
            throw new InvalidDataException(
                $"No function name provided when calling {_pdpfName} PDP Factory"
            );
        string functionName = (string)jsonArray[0]!;
        jsonArray.RemoveAt(0);

        return functionName switch
        {
            "getAvailableProjects" => GetAvailableProjects(),
            "getProjectDataProviderId" => GetProjectDataProviderID((string)jsonArray[0]!),
            _ => throw new InvalidDataException($"Unknown function call: {functionName}"),
        };
    }

    /// <summary>
    /// Perform all work needed to be able to respond to PDP requests
    /// </summary>
    protected abstract Task StartFactoryAsync();

    /// <summary>
    /// Return project metadata for all projects available through this PDP factory
    /// </summary>
    protected abstract List<ProjectMetadata>? GetAvailableProjects();

    /// <summary>
    /// Return the name of the PDP network object that corresponds to the given project ID
    /// </summary>
    protected abstract string GetProjectDataProviderID(string projectID);
}
