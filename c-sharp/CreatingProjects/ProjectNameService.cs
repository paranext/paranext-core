namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project name validation and generation.
/// Stub: all methods throw NotImplementedException until implemented.
/// </summary>
internal static class ProjectNameService
{
    /// <summary>
    /// Validates a short name against all validation rules (VAL-001 through VAL-005).
    /// </summary>
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null
    )
    {
        throw new NotImplementedException(
            "ProjectNameService.ValidateShortName not yet implemented"
        );
    }

    /// <summary>
    /// Generates a short name from a full name.
    /// </summary>
    public static string GenerateShortName(string fullName)
    {
        throw new NotImplementedException(
            "ProjectNameService.GenerateShortName not yet implemented"
        );
    }
}
