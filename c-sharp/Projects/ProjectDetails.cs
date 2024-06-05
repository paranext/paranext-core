namespace Paranext.DataProvider.Projects;

/// <summary>
/// All information about a project we want to store and pass around internally
/// </summary>
internal class ProjectDetails
{
    public ProjectDetails(ProjectMetadata metadata, string homeDirectory)
    {
        Metadata = metadata;
        HomeDirectory = homeDirectory;
    }

    public ProjectMetadata Metadata { get; }

    /// <summary>
    /// Directory where everything we know about a project is stored
    /// </summary>
    public string HomeDirectory { get; }

    public override string ToString()
    {
        return $"[{HomeDirectory}] = {Metadata}";
    }
}
