namespace Paranext.DataProvider.Projects;

internal class ProjectDetails
{
    public ProjectDetails(ProjectMetadata metadata, string directory)
    {
        Metadata = metadata;
        Directory = directory;
    }

    public ProjectMetadata Metadata { get; }
    public string Directory { get; }

    public override bool Equals(object? obj)
    {
        ProjectDetails? that = obj as ProjectDetails;
        return that != null && (this.Equals(that));
    }

    protected bool Equals(ProjectDetails other)
    {
        return Metadata.Equals(other.Metadata) && Directory == other.Directory;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Metadata, Directory);
    }

    public override string ToString()
    {
        return $"[{Directory}] = {Metadata}";
    }
}
