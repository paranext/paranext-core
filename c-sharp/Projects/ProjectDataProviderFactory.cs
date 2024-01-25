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
        var name = $"platform.pdpFactory-{_projectType}";
        await RegisterNetworkObject(
            name,
            new MessageEventProjectDataProviderFactoryCreated(
                name,
                new[] { "getProjectDataProviderId" },
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

        if (functionName != "getProjectDataProviderId")
            return ResponseToRequest.Failed($"Unknown function call: {functionName}");

        if (jsonArray.Count < 2)
            return ResponseToRequest.Failed(
                $"Not enough arguments provided when calling PDP Factory for {_projectType}"
            );

        try
        {
            return GetProjectDataProviderID((string)jsonArray[0]!, (string)jsonArray[1]!);
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }
    }

    /// <summary>
    /// Return the name of the PDP network object that corresponds to the given project ID and PSI ID
    /// </summary>
    protected abstract ResponseToRequest GetProjectDataProviderID(
        string projectID,
        string projectStorageInterpreterId
    );
}
