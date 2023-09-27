using System.Text.Json.Nodes;
using Newtonsoft.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Manages reading/writing to a project
/// Subclasses are expected to define and add get/set methods to the Getters/Setters
/// Subclasses are also expected to use a ProjectStorageInterpreter for implementing all get/set methods as appropriate
/// ProjectDataProviders are meant to be created/owned by ProjectDataProviderFactory instances
/// </summary>
internal abstract class ProjectDataProvider : NetworkObjects.DataProvider
{
    protected ProjectDataProvider(string name, PapiClient papiClient, ProjectDetails projectDetails)
        : base(name + "-pdp", papiClient)
    {
        ProjectDetails = projectDetails;
        Getters.Add("getExtensionData", GetExtensionData);
        Setters.Add("setExtensionData", SetExtensionData);
    }

    protected ProjectDetails ProjectDetails { get; }

    /// <summary>
    /// Upon success, getters should return a ResponseToRequest that contains the requested data.
    /// </summary>
    protected Dictionary<string, Func<string, ResponseToRequest>> Getters { get; } = new();

    /// <summary>
    /// Upon success, setters should return a ResponseToRequest that contains data scope used to notify the network about data changes.
    /// If there is only a single scope to the data (i.e., it is not partitioned), return a ResponseToRequest containing "*".
    /// </summary>
    protected Dictionary<string, Func<string, string, ResponseToRequest>> Setters { get; } = new();

    protected ProjectDataScope ExtractDataScope(string jsonString)
    {
        if (
            !ProjectDataScopeConverter.TryGetProjectDataScope(
                jsonString,
                out ProjectDataScope? dataScope,
                out string errorMessage
            )
        )
            throw new Exception(errorMessage);

        if (dataScope == null)
            throw new Exception("No data scope provided");

        dataScope.ProjectID = ProjectDetails.Metadata.ID;
        dataScope.ProjectName = ProjectDetails.Metadata.Name;
        return dataScope;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        try
        {
            if (functionName.StartsWith("get"))
                return Getters[functionName](args[0]!.ToJsonString());

            if (functionName.StartsWith("set"))
            {
                var setReturn = Setters[functionName](
                    args[0]!.ToJsonString(),
                    args[1]!.ToJsonString()
                );
                SendDataUpdateEvent(setReturn.Contents);
                return setReturn;
            }

            return ResponseToRequest.Failed($"Unknown function: {functionName}");
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed(e.Message);
        }
    }

    private ResponseToRequest GetExtensionData(string jsonScope)
    {
        try
        {
            return GetExtensionData(ExtractDataScope(jsonScope));
        }
        catch (Exception ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }
    }

    private ResponseToRequest SetExtensionData(string jsonScope, string jsonData)
    {
        try
        {
            var retVal = SetExtensionData(
                ExtractDataScope(jsonScope),
                JsonConvert.DeserializeObject<string>(jsonData)!
            );
            return retVal;
        }
        catch (Exception ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }
    }

    /// <summary>
    /// Get an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    protected abstract ResponseToRequest GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    protected abstract ResponseToRequest SetExtensionData(ProjectDataScope scope, string data);
}
