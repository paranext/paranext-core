using Paratext.Data;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Shared helper for looking up projects by GUID in the ScrTextCollection.
/// </summary>
internal static class ProjectLookupHelper
{
    /// <summary>
    /// Finds a project in ScrTextCollection by its GUID string.
    /// </summary>
    /// <returns>The matching ScrText, or null if not found.</returns>
    internal static ScrText? FindProjectByGuid(string projectGuid)
    {
        foreach (ScrText scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
        {
            string? guid = scrText.Settings?.Guid?.ToString();
            if (guid == projectGuid)
                return scrText;
        }
        return null;
    }
}
