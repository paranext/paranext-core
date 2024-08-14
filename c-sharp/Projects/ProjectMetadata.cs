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

    public override string ToString()
    {
        return $"[({Id}): {string.Join(',', ProjectInterfaces)}]";
    }
}
