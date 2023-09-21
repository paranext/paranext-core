namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the data inside of a project's meta.json file
/// </summary>
public class ProjectMetadata
{
    public ProjectMetadata(Guid id, string name, string projectStorageType, string projectType)
    {
        ID = id;
        Name = name;
        ProjectStorageType = projectStorageType;
        ProjectType = projectType;
    }

    /// <summary>
    /// ID of the project (must be unique)
    /// </summary>
    public Guid ID { get; }

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
