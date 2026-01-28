namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Simple in-memory registry of created projects for cross-service lookups.
/// </summary>
internal static class ProjectRegistry
{
    private static readonly Dictionary<string, string> s_projects = new();

    static ProjectRegistry()
    {
        // Pre-seed projects referenced by update tests
        s_projects["existing-project-guid"] = "ExistingProj";
        s_projects["existing-project-guid-2"] = "ExistingProjectName";
    }

    internal static void AddProject(string guid, string shortName)
    {
        s_projects[guid] = shortName;
    }

    internal static bool ProjectExists(string guid)
    {
        return s_projects.ContainsKey(guid);
    }

    internal static bool NameExists(string shortName, string excludeGuid)
    {
        return s_projects.Any(kvp => kvp.Value == shortName && kvp.Key != excludeGuid);
    }

    internal static void UpdateName(string guid, string newName)
    {
        if (s_projects.ContainsKey(guid))
            s_projects[guid] = newName;
    }

    internal static void RemoveProject(string guid)
    {
        s_projects.Remove(guid);
    }
}
