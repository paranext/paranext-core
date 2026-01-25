namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project type configuration and base project filtering.
/// Implements EXT-001 (ProjectTypeStateMachine) and EXT-002 (BaseProjectTypeFiltering).
/// </summary>
public static class ProjectTypeService
{
    /// <summary>
    /// Scripture types that can be used as base projects for derived scripture types.
    /// </summary>
    private static readonly IReadOnlyList<ProjectCreationType> ScriptureTypes = new[]
    {
        ProjectCreationType.Standard,
        ProjectCreationType.BackTranslation,
        ProjectCreationType.Daughter,
        ProjectCreationType.StudyBibleAdditions,
        ProjectCreationType.TransliterationManual,
        ProjectCreationType.TransliterationWithEncoder,
    };

    /// <summary>
    /// Types allowed as base for StudyBibleAdditions (all except StudyBible types and ConsultantNotes).
    /// </summary>
    private static readonly IReadOnlyList<ProjectCreationType> NotStudyBibleTypes = new[]
    {
        ProjectCreationType.Standard,
        ProjectCreationType.BackTranslation,
        ProjectCreationType.Daughter,
        ProjectCreationType.Auxiliary,
        ProjectCreationType.TransliterationManual,
        ProjectCreationType.TransliterationWithEncoder,
    };

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
        return projectType switch
        {
            ProjectCreationType.Standard => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.Standard,
                BaseProjectRequired = false,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = null,
                AllowedBaseTypes = Array.Empty<ProjectCreationType>(),
            },
            ProjectCreationType.BackTranslation => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.BackTranslation,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = "scriptureOnly",
                AllowedBaseTypes = ScriptureTypes,
            },
            ProjectCreationType.Daughter => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.Daughter,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = "scriptureOnly",
                AllowedBaseTypes = ScriptureTypes,
            },
            ProjectCreationType.Auxiliary => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.Auxiliary,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = "standardOnly",
                AllowedBaseTypes = new[] { ProjectCreationType.Standard },
            },
            ProjectCreationType.StudyBibleAdditions => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.StudyBibleAdditions,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                StudyBibleTabVisible = true,
                EncodingConverterRequired = false,
                BaseProjectFilter = "notStudyBible",
                AllowedBaseTypes = NotStudyBibleTypes,
            },
            ProjectCreationType.ConsultantNotes => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.ConsultantNotes,
                BaseProjectRequired = false,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = false,
                BooksTabVisible = false,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = null,
                AllowedBaseTypes = Array.Empty<ProjectCreationType>(),
            },
            ProjectCreationType.TransliterationManual => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.TransliterationManual,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFD,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = "scriptureOnly",
                AllowedBaseTypes = ScriptureTypes,
            },
            ProjectCreationType.TransliterationWithEncoder => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.TransliterationWithEncoder,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFD,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = true,
                BaseProjectFilter = "scriptureOnly",
                AllowedBaseTypes = ScriptureTypes,
            },
            ProjectCreationType.StudyBible => new ProjectTypeConfiguration
            {
                ProjectType = ProjectCreationType.StudyBible,
                BaseProjectRequired = true,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                StudyBibleTabVisible = true,
                EncodingConverterRequired = false,
                BaseProjectFilter = "notStudyBible",
                AllowedBaseTypes = NotStudyBibleTypes,
            },
            _ => new ProjectTypeConfiguration
            {
                ProjectType = projectType,
                BaseProjectRequired = false,
                EditableDefault = true,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                StudyBibleTabVisible = false,
                EncodingConverterRequired = false,
                BaseProjectFilter = null,
                AllowedBaseTypes = Array.Empty<ProjectCreationType>(),
            },
        };
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
    /// - Standard/ConsultantNotes: Empty (no base project needed)
    /// </remarks>
    public static IReadOnlyList<ProjectCreationType> GetAllowedBaseTypes(
        ProjectCreationType creatingType
    )
    {
        var config = GetTypeConfiguration(creatingType);
        return config.AllowedBaseTypes;
    }
}
