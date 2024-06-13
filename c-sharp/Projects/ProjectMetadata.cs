using Newtonsoft.Json;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Low-level information describing a project that Platform.Bible directly manages and uses to load
/// project data
///
/// Returned from Project Data Provider Factories in order to inform others about what projects they
/// support in what form.
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

    public override string ToString()
    {
        return $"[{Name} ({ID}): {string.Join(',', ProjectInterfaces)}]";
    }
}
