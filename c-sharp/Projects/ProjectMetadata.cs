namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the data inside of a project's meta.json file
/// </summary>
public class ProjectMetadata
{
    public ProjectMetadata(
        Guid id,
        string name,
        ProjectStorageType projectStorageType,
        string projectType
    )
    {
        ID = id;
        Name = name;
        ProjectStorageType = projectStorageType;
        ProjectType = projectType;
    }

    public Guid ID { get; }

    public string Name { get; }

    public ProjectStorageType ProjectStorageType { get; }

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
        return HashCode.Combine(ID, Name, (int)ProjectStorageType, ProjectType);
    }

    public override string ToString()
    {
        return $"[{Name} ({ID}): {ProjectStorageType.ToSerializedString()}, {ProjectType}]";
    }
}
