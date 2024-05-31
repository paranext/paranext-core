using Newtonsoft.Json;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the data inside a project's meta.json file
/// </summary>
public class ProjectMetadata(string id, string name, List<string> projectInterfaces)
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
    [JsonProperty("projectInterfaces")]
    public List<string> ProjectInterfaces { get; } = projectInterfaces;

    public override bool Equals(object? obj)
    {
        ProjectMetadata? that = obj as ProjectMetadata;
        return that != null && this.Equals(that);
    }

    protected bool Equals(ProjectMetadata other)
    {
        return ID.Equals(other.ID)
            && Name == other.Name
            && ProjectInterfaces.Count == other.ProjectInterfaces.Count &&
            ProjectInterfaces.All(other.ProjectInterfaces.Contains);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(ID, Name, string.Join(',', ProjectInterfaces));
    }

    public override string ToString()
    {
        return $"[{Name} ({ID}): {string.Join(',', ProjectInterfaces)}]";
    }
}
