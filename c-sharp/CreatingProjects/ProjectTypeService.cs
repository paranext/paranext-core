namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project type configuration and base project filtering.
/// Implements EXT-001 (ProjectTypeStateMachine) and EXT-002 (BaseProjectTypeFiltering).
/// </summary>
public static class ProjectTypeService
{
    /// <summary>
    /// Gets the configuration for a project type.
    /// Returns type-specific settings for UI behavior and validation.
    /// </summary>
    /// <param name="projectType">The project type to configure</param>
    /// <returns>Configuration with all type-specific settings</returns>
    /// <remarks>
    /// Pure function - no side effects.
    /// Implements EXT-001: Project Type State Machine
    /// Golden master: gm-001-type-state-machine
    /// </remarks>
    public static ProjectTypeConfiguration GetTypeConfiguration(ProjectCreationType projectType)
    {
        throw new NotImplementedException(
            "EXT-001: GetTypeConfiguration not yet implemented. "
                + "See extraction-plan.md for implementation details."
        );
    }

    /// <summary>
    /// Gets the list of project types that can be used as a base for the given type.
    /// </summary>
    /// <param name="creatingType">Type of project being created</param>
    /// <returns>List of allowed base project types</returns>
    /// <remarks>
    /// Implements EXT-002: Base Project Type Filtering
    /// Golden master: gm-002-base-project-filter
    ///
    /// Rules:
    /// - BackTranslation/Daughter/Transliteration: Scripture types only
    /// - Auxiliary: Standard only
    /// - StudyBibleAdditions: Anything except StudyBible/StudyBibleAdditions
    /// </remarks>
    public static IReadOnlyList<ProjectCreationType> GetAllowedBaseTypes(
        ProjectCreationType creatingType
    )
    {
        throw new NotImplementedException(
            "EXT-002: GetAllowedBaseTypes not yet implemented. "
                + "See extraction-plan.md for implementation details."
        );
    }
}
