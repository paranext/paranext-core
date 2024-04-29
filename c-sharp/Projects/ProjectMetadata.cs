using Newtonsoft.Json;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the data inside a project's meta.json file
/// </summary>
public class ProjectMetadata(string id, string name, string projectType)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    [JsonProperty("id")]
    public string ID { get; } = id.ToUpperInvariant();

    /// <summary>
    /// Short name of the project (not necessarily unique)
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; } = name;

    /// <summary>
    /// Indicates what sort of project this is which implies its data shape (e.g., what data streams should be available)
    /// </summary>
    [JsonProperty("projectType")]
    public string ProjectType { get; } = projectType;

    public override bool Equals(object? obj)
    {
        ProjectMetadata? that = obj as ProjectMetadata;
        return that != null && (this.Equals(that));
    }

    protected bool Equals(ProjectMetadata other)
    {
        return ID.Equals(other.ID)
            && Name == other.Name
            && ProjectType == other.ProjectType;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(ID, Name, ProjectType);
    }

    public override string ToString()
    {
        return $"[{Name} ({ID}): {ProjectType}]";
    }
}
