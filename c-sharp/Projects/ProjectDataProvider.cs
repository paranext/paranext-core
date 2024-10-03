using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Manages reading/writing to a project
/// Subclasses are expected to define and add get/set methods to the Getters/Setters
/// ProjectDataProviders are meant to be created/owned by ProjectDataProviderFactory instances
/// </summary>
internal abstract class ProjectDataProvider : NetworkObjects.DataProvider
{
    protected ProjectDataProvider(string name, PapiClient papiClient, ProjectDetails projectDetails)
        : base(name + "-pdp", papiClient, NetworkObjectType.PROJECT_DATA_PROVIDER)
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

    private ProjectDataScope ExtractDataScope(string jsonString)
    {
        ProjectDataScope? dataScope =
            jsonString.DeserializeFromJson<ProjectDataScope>()
            ?? throw new InvalidDataException("No data scope provided");
        dataScope.ProjectID = ProjectDetails.Metadata.Id;
        dataScope.ProjectName = ProjectDetails.Name;
        return dataScope;
    }

    protected override List<string> GetFunctionNames()
    {
        var functionNames = new List<string>();
        functionNames.AddRange(Getters.Keys);
        functionNames.AddRange(Setters.Keys);
        return functionNames;
    }

    protected override MessageEvent GetDataProviderCreatedEvent()
    {
        var functionNames = GetFunctionNames();
        functionNames.Sort();
        return new MessageEventProjectDataProviderCreated(
            DataProviderName,
            functionNames.ToArray(),
            ProjectDetails.Metadata.Id,
            ProjectDetails.Metadata.ProjectInterfaces
        );
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        // TODO: Handle wrong number of parameters (e.g. none) more gracefully

        try
        {
            if (functionName.StartsWith("get"))
                return Getters[functionName](args[0]!.ToJsonString());

            if (functionName.StartsWith("set"))
            {
                var setReturn = Setters[functionName](args[0]!.ToJsonString(), args[1]!.ToString());
                SendDataUpdateEvent(setReturn.Contents);
                return setReturn;
            }

            return ResponseToRequest.Failed($"Unknown function: {functionName}");
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed(e.ToString());
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
            return ResponseToRequest.Failed(ex.ToString());
        }
    }

    private ResponseToRequest SetExtensionData(string jsonScope, string data)
    {
        try
        {
            var retVal = SetExtensionData(ExtractDataScope(jsonScope), data);
            return retVal;
        }
        catch (Exception ex)
        {
            return ResponseToRequest.Failed(ex.ToString());
        }
    }

    /// <summary>
    /// Get an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest SetExtensionData(ProjectDataScope scope, string data);
}
