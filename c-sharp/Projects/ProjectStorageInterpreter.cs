using System.Text.Json.Nodes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Bridge from persistent storage to a project’s actual data
/// </summary>
internal abstract class ProjectStorageInterpreter : NetworkObjects.DataProvider
{
    private readonly List<string> _functionNames =
        new()
        {
            "getAllProjects",
            "getProjectSettings",
            "getSupportedTypes",
            "getProjectData",
            "setProjectData",
            "getExtensionData",
            "setExtensionData"
        };

    protected ProjectStorageInterpreter(
        string storageType,
        IReadOnlyList<string> projectTypes,
        PapiClient papiClient
    )
        // TODO: Register one network object per (storage type, project type) pair or come up with a better approach
        : base($"platform.{storageType}-{projectTypes[0]}-psi", papiClient)
    {
        StorageType = storageType;
        ProjectTypes = projectTypes;
    }

    protected override List<string> GetFunctionNames()
    {
        return _functionNames;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        // Functions with no arguments go here
        switch (functionName)
        {
            case "getSupportedTypes":
                return GetSupportedTypes();
            case "getAllProjects":
                return GetAllProjects();
        }

        if (
            !ProjectDataScopeConverter.TryGetProjectDataScope(
                args[0]!.ToJsonString(),
                out ProjectDataScope? dataScope,
                out string errorMessage
            )
        )
            return ResponseToRequest.Failed(errorMessage);

        if (dataScope == null)
            return ResponseToRequest.Failed("No data scope provided");

        // Functions with 1 or more arguments go here
        switch (functionName)
        {
            case "getProjectSettings":
                return GetProjectSettings(dataScope);
            case "getProjectData":
                return GetProjectData(dataScope);
            case "setProjectData":
                var setProjectReturn = SetProjectData(dataScope, args[1]!.ToString());
                SendDataUpdateEvent(setProjectReturn.Contents);
                return setProjectReturn;
            case "getExtensionData":
                return GetExtensionData(dataScope);
            case "setExtensionData":
                var setExtensionReturn = SetExtensionData(dataScope, args[1]!.ToString());
                SendDataUpdateEvent(setExtensionReturn.Contents);
                return setExtensionReturn;
            default:
                return ResponseToRequest.Failed($"Unexpected function: {functionName}");
        }
    }

    private ResponseToRequest GetSupportedTypes()
    {
        return ResponseToRequest.Succeeded(
            new JObject
            {
                ["storageType"] = StorageType,
                ["projectTypes"] = JsonConvert.SerializeObject(ProjectTypes)
            }.ToString()
        );
    }

    public string StorageType { get; }
    public IEnumerable<string> ProjectTypes { get; }

    /// <summary>
    /// Get a list of ProjectMetadata objects describing all available projects from this PSI
    /// </summary>
    public abstract ResponseToRequest GetAllProjects();

    /// <summary>
    /// Create a brand new, empty project with the given scope
    /// </summary>
    public abstract ResponseToRequest CreateProject(ProjectDataScope scope);

    /// <summary>
    /// Get the project settings for a specific project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest GetProjectSettings(ProjectDataScope scope);

    /// <summary>
    /// Get data from a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest GetProjectData(ProjectDataScope scope);

    /// <summary>
    /// Set data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest SetProjectData(ProjectDataScope scope, string data);

    /// <summary>
    /// Get an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract ResponseToRequest SetExtensionData(ProjectDataScope scope, string data);
}
