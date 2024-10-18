using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;

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
    protected Dictionary<string, Func<string, object?>> Getters { get; } = [];

    /// <summary>
    /// Upon success, setters should return a ResponseToRequest that contains data scope used to notify the network about data changes.
    /// If there is only a single scope to the data (i.e., it is not partitioned), return a ResponseToRequest containing "*".
    /// </summary>
    protected Dictionary<string, Func<string, string, object?>> Setters { get; } = [];

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

    protected override NetworkObjectCreatedDetails GetDataProviderCreatedDetails()
    {
        var functionNames = GetFunctionNames();
        functionNames.Sort();
        return new ProjectDataProviderCreatedDetails
        {
            Id = DataProviderName,
            ObjectType = DataProviderType,
            Functions = [.. functionNames],
            Attributes = new ProjectDataProviderAttributes()
            {
                ProjectId = ProjectDetails.Metadata.Id,
                ProjectInterfaces = ProjectDetails.Metadata.ProjectInterfaces,
            },
        };
    }

    protected override object? HandleRequest(string functionName, JsonArray args)
    {
        if (functionName.StartsWith("get"))
            return Getters[functionName](args[0]!.ToJsonString());

        if (functionName.StartsWith("set"))
        {
            var setReturn = Setters[functionName](args[0]!.ToJsonString(), args[1]!.ToString());
            ThreadingUtils.RunTask(SendDataUpdateEventAsync(setReturn), "PDP setter event");
            return setReturn;
        }

        throw new InvalidDataException($"Unknown function: {functionName}");
    }

    private object? GetExtensionData(string jsonScope)
    {
        return GetExtensionData(ExtractDataScope(jsonScope));
    }

    private object? SetExtensionData(string jsonScope, string data)
    {
        return SetExtensionData(ExtractDataScope(jsonScope), data);
    }

    /// <summary>
    /// Get an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract object? GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract object? SetExtensionData(ProjectDataScope scope, string data);
}
