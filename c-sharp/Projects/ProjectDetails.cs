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

    public override bool Equals(object? obj)
    {
        ProjectDetails? that = obj as ProjectDetails;
        return that != null && (this.Equals(that));
    }

    protected bool Equals(ProjectDetails other)
    {
        return Metadata.Equals(other.Metadata) && HomeDirectory == other.HomeDirectory;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Metadata, HomeDirectory);
    }

    public override string ToString()
    {
        return $"[{HomeDirectory}] = {Metadata}";
    }
}
