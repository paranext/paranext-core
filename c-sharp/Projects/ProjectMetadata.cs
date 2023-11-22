namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the data inside of a project's meta.json file
/// </summary>
public class ProjectMetadata
{
    // Not sure if this is how we want to handle this long-term, but for now, I'm
    // adding constants here for the various known values of ProjectType (so that
    // LocalProjects can handle them differently as needed.
    public const string PARATEXT = "paratext";

    public ProjectMetadata(string id, string name, string projectStorageType, string projectType)
    {
        ID = id.ToUpperInvariant();
        Name = name;
        ProjectStorageType = projectStorageType;
        ProjectType = projectType;
    }

    /// <summary>
    /// ID of the project (must be unique and case insensitive)
    /// </summary>
    public string ID { get; }

    /// <summary>
    /// Short name of the project (not necessarily unique)
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// Indicates how the project is persisted to storage
    /// </summary>
    public string ProjectStorageType { get; }

    /// <summary>
    /// Indicates what sort of project this is which implies its data shape (e.g., what data streams should be available)
    /// </summary>
    public string ProjectType { get; }

    public bool Contains(string id, string name, bool nameIsCaseSensitive = false)
    {
        return ID.Equals(id, StringComparison.InvariantCultureIgnoreCase)
            && (
                nameIsCaseSensitive
                    ? Name.Equals(name)
                    : Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)
            );
    }

    public override bool Equals(object? obj)
    {
        ProjectMetadata? that = obj as ProjectMetadata;
        return that != null && (this.Equals(that));
    }

    protected bool Equals(ProjectMetadata other)
    {
        return ID.Equals(other.ID)
            && Name == other.Name
            && ProjectStorageType == other.ProjectStorageType
            && ProjectType == other.ProjectType;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(ID, Name, ProjectStorageType, ProjectType);
    }

    public override string ToString()
    {
        return $"[{Name} ({ID}): {ProjectStorageType}, {ProjectType}]";
    }
}
