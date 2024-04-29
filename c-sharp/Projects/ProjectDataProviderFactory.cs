using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Provides a ProjectDataProvider object for a specified project type
/// </summary>
internal abstract class ProjectDataProviderFactory : NetworkObject
{
    private readonly string _projectType;

    protected ProjectDataProviderFactory(string projectType, PapiClient papiClient)
        : base(papiClient)
    {
        _projectType = projectType;
    }

    public async Task Initialize()
    {
        await StartFactory();
        var name = $"platform.pdpFactory-{_projectType}";
        await RegisterNetworkObject(
            name,
            new MessageEventProjectDataProviderFactoryCreated(
                name,
                ["getAvailableProjects", "getProjectDataProviderId"],
                _projectType
            ),
            FunctionHandler
        );
    }

    // An array of strings serialized as JSON will be sent here.
    // The first item in the array is the name of the function to call.
    // All remaining items are arguments to pass to the function.
    // Data providers must provide "get" and "set" functions.
    private ResponseToRequest FunctionHandler(JsonElement request)
    {
        string functionName;
        JsonArray jsonArray;
        try
        {
            jsonArray = request.Deserialize<JsonNode>()!.AsArray();
            if (jsonArray.Count == 0)
                return ResponseToRequest.Failed(
                    $"No function name provided when calling PDP Factory for {_projectType}"
                );
            functionName = (string)jsonArray[0]!;
            jsonArray.RemoveAt(0);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed("Invalid function call data");
        }

        try
        {
            return functionName switch
            {
                "getAvailableProjects" => GetAvailableProjects(),
                "getProjectDataProviderId" => GetProjectDataProviderID((string)jsonArray[0]!),
                _ => ResponseToRequest.Failed($"Unknown function call: {functionName}"),
            };
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }
    }

    /// <summary>
    /// Perform all work needed to be able to respond to PDP requests
    /// </summary>
    protected abstract Task StartFactory();

    /// <summary>
    /// Return project metadata for all projects available through this PDP factory
    /// </summary>
    protected abstract ResponseToRequest GetAvailableProjects();

    /// <summary>
    /// Return the name of the PDP network object that corresponds to the given project ID
    /// </summary>
    protected abstract ResponseToRequest GetProjectDataProviderID(string projectID);
}
