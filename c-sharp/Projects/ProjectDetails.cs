using Paratext.Data.DBLServices;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// All information about a project we want to store and pass around internally
/// </summary>
internal class ProjectDetails
{
    public ProjectDetails(string name, ProjectMetadata metadata, string homeDirectory)
    {
        Name = name;
        Metadata = metadata;
        HomeDirectory = homeDirectory;
    }

    public string Name { get; }

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
