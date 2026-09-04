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
    }

    protected ProjectDetails ProjectDetails { get; }

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getExtensionData", GetExtensionData),
            ("setExtensionData", SetExtensionData),
            ("listExtensionDataQualifiers", ListExtensionDataQualifiers),
        ];
    }

    protected override NetworkObjectCreatedDetails GetDataProviderCreatedDetails()
    {
        var functions = GetFunctions();
        var functionNames = functions.Select(f => f.functionName).ToList();
        functionNames.Sort();
        return new ProjectDataProviderCreatedDetails
        {
            Id = DataProviderName,
            ObjectType = DataProviderType,
            FunctionNames = [.. functionNames],
            Attributes = new ProjectDataProviderAttributes()
            {
                ProjectId = ProjectDetails.Metadata.Id,
                ProjectInterfaces = ProjectDetails.Metadata.ProjectInterfaces,
            },
        };
    }

    /// <summary>
    /// Get an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract object? GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <param name="scope"></param>.
    /// </summary>
    public abstract bool SetExtensionData(ProjectDataScope scope, string data);

    /// <summary>
    /// List the DataQualifiers that exist for the extension identified by
    /// <param name="scope"></param>, optionally narrowed to those starting with the scope's
    /// DataQualifierPrefix.
    ///
    /// Every returned string is a valid DataQualifier for <see cref="GetExtensionData"/> under the
    /// same ExtensionName, exactly as it would be passed: forward slashes, relative to the
    /// extension's own data, nested paths included. Sorted, and includes empty documents.
    ///
    /// Listing creates nothing, so an extension that has never written any data gets an empty array.
    /// </summary>
    public abstract string[] ListExtensionDataQualifiers(ProjectDataScope scope);
}
