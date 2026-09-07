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
    /// Get an extension's data in a project identified by <paramref name="scope"/>.
    /// </summary>
    public abstract object? GetExtensionData(ProjectDataScope scope);

    /// <summary>
    /// Set an extension's data in a project identified by <paramref name="scope"/>.
    /// </summary>
    public abstract bool SetExtensionData(ProjectDataScope scope, string data);

    /// <summary>
    /// List the DataQualifiers that exist for the extension identified by
    /// <paramref name="scope"/>.
    ///
    /// Listing creates nothing, so an extension that has never written any data gets an empty
    /// array. Discovering the same thing by calling <see cref="GetExtensionData"/> does not have
    /// that property — on the Paratext PDP a read creates the data it looked for.
    /// </summary>
    /// <param name="scope">
    /// Whose data to list: ExtensionName selects the extension, and DataQualifierPrefix — when set
    /// — narrows the result to the DataQualifiers starting with it.
    /// </param>
    /// <returns>
    /// Every DataQualifier that exists for that extension, sorted with
    /// <see cref="StringComparer.Ordinal"/>. Each is a valid DataQualifier for
    /// <see cref="GetExtensionData"/> under the same ExtensionName, exactly as it would be passed:
    /// forward slashes, relative to the extension's own data, nested paths included. Empty
    /// documents are included; an extension with no data at all gets an empty array.
    /// </returns>
    public abstract string[] ListExtensionDataQualifiers(ProjectDataScope scope);
}
