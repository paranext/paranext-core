using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Low-level information describing a project that Platform.Bible directly manages and uses to load
/// project data
///
/// Returned from Project Data Provider Factories in order to inform others about what projects they
/// support in what form.
/// </summary>
public class ProjectMetadata(string id, List<string> projectInterfaces)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    public string Id { get; } = id.ToUpperInvariant();

    /// <summary>
    /// Indicates what sort of project this is which implies its data shape (e.g., what data streams should be available)
    /// </summary>
    public List<string> ProjectInterfaces { get; } = projectInterfaces;

    /// <summary>
    /// EXPERIMENTAL. Opt-in batch of <c>platform.*</c> setting values for this project, populated
    /// only when <c>getAvailableProjects</c> is called with an <c>includeSettings</c> hint. Lets
    /// consumers read common settings (name, fullName, language, isPublished, …) off the project
    /// list in one server-side pass instead of fanning out a per-project <c>getSetting</c> call per
    /// setting. Keyed by <c>platform.*</c> setting name. Null (and omitted from the wire) when no
    /// settings were requested, and best-effort otherwise: a key absent from the snapshot means the
    /// consumer should fall back to <c>getSetting</c> for that one (project, setting) pair.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object?>? SettingsSnapshot { get; set; }

    public override string ToString()
    {
        return $"[({Id}): {string.Join(',', ProjectInterfaces)}]";
    }
}
