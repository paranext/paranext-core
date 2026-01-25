#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project type configuration and base project filtering.
/// Implements CAP-EXT-001 (ProjectTypeStateMachine) and CAP-EXT-002 (BaseProjectTypeFiltering).
/// </summary>
internal static class ProjectTypeService
{
    #region Private Constants

    /// <summary>
    /// Scripture types that can be used as base projects for derived scripture types.
    /// </summary>
    private static readonly IReadOnlyList<ProjectCreationType> ScriptureTypes =
    [
        ProjectCreationType.Standard,
        ProjectCreationType.BackTranslation,
        ProjectCreationType.Daughter,
        ProjectCreationType.StudyBibleAdditions,
        ProjectCreationType.TransliterationManual,
        ProjectCreationType.TransliterationWithEncoder,
    ];

    /// <summary>
    /// Types allowed as base for StudyBibleAdditions (all except StudyBible types and ConsultantNotes).
    /// </summary>
    private static readonly IReadOnlyList<ProjectCreationType> NotStudyBibleTypes =
    [
        ProjectCreationType.Standard,
        ProjectCreationType.BackTranslation,
        ProjectCreationType.Daughter,
        ProjectCreationType.Auxiliary,
        ProjectCreationType.TransliterationManual,
        ProjectCreationType.TransliterationWithEncoder,
    ];

    #endregion

    #region Public Methods

    /// <summary>
    /// Gets the configuration for a project type.
    /// Returns type-specific settings for UI behavior and validation.
    /// </summary>
    /// <param name="projectType">The project type to configure.</param>
    /// <returns>Configuration with all type-specific settings.</returns>
    /// <remarks>
    /// <para>Pure function - no side effects.</para>
    /// <para>Implements CAP-EXT-001: Project Type State Machine.</para>
    /// <para>Golden master: gm-001-type-state-machine.</para>
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
                AllowedBaseTypes = [],
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
                AllowedBaseTypes = [ProjectCreationType.Standard],
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
                AllowedBaseTypes = [],
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
                AllowedBaseTypes = [],
            },
        };
    }

    /// <summary>
    /// Gets the list of project types that can be used as a base for the given type.
    /// </summary>
    /// <param name="creatingType">Type of project being created.</param>
    /// <returns>List of allowed base project types.</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-002: Base Project Type Filtering.</para>
    /// <para>Golden master: gm-002-base-project-filter.</para>
    /// <para>
    /// Rules:
    /// <list type="bullet">
    /// <item>BackTranslation/Daughter/Transliteration: Scripture types only</item>
    /// <item>Auxiliary: Standard only</item>
    /// <item>StudyBibleAdditions: Anything except StudyBible/StudyBibleAdditions</item>
    /// <item>Standard/ConsultantNotes: Empty (no base project needed)</item>
    /// </list>
    /// </para>
    /// </remarks>
    public static IReadOnlyList<ProjectCreationType> GetAllowedBaseTypes(
        ProjectCreationType creatingType
    )
    {
        ProjectTypeConfiguration config = GetTypeConfiguration(creatingType);
        return config.AllowedBaseTypes;
    }

    /// <summary>
    /// Gets all projects that can be used as a base for the specified project type.
    /// Filters the project collection by type compatibility rules.
    /// </summary>
    /// <param name="creatingType">The type of project being created.</param>
    /// <returns>
    /// A list of <see cref="ProjectReference"/> objects representing projects that can serve
    /// as the base for the specified type. Returns an empty list if the type does not require
    /// a base project or if no compatible projects exist.
    /// </returns>
    /// <remarks>
    /// <para>Implements CAP-003: GetValidBaseProjects.</para>
    /// <para>
    /// Filtering rules by project type:
    /// <list type="bullet">
    /// <item><term>Auxiliary</term><description>Base must be Standard type only.</description></item>
    /// <item><term>StudyBibleAdditions/StudyBible</term><description>Base cannot be StudyBible or StudyBibleAdditions.</description></item>
    /// <item><term>BackTranslation/Daughter/Transliteration</term><description>Base must be a Scripture type.</description></item>
    /// <item><term>Standard/ConsultantNotes</term><description>Returns empty list (no base project needed).</description></item>
    /// </list>
    /// </para>
    /// <para>
    /// <b>Current Implementation:</b> Returns an empty list as a stub. A full implementation
    /// would query <c>ScrTextCollection</c> and filter by the allowed base types from
    /// <see cref="GetTypeConfiguration"/>. Integration with <c>LocalParatextProjects</c>
    /// is required for production use.
    /// </para>
    /// </remarks>
    /// <seealso cref="GetAllowedBaseTypes"/>
    /// <seealso cref="GetTypeConfiguration"/>
    public static IReadOnlyList<ProjectReference> GetValidBaseProjects(
        ProjectCreationType creatingType
    )
    {
        // Get type configuration to check if base project is needed
        ProjectTypeConfiguration config = GetTypeConfiguration(creatingType);

        // If base project is not required, return empty list
        if (!config.BaseProjectRequired)
        {
            return [];
        }

        // Get allowed base types for filtering
        // NOTE: allowedTypes variable retained for future implementation reference
        IReadOnlyList<ProjectCreationType> allowedTypes = config.AllowedBaseTypes;
        _ = allowedTypes; // Suppress unused variable warning until full implementation

        // TODO: Integrate with ScrTextCollection to query and filter projects.
        // Full implementation would:
        // 1. Query LocalParatextProjects.GetAllProjectDetails()
        // 2. Filter by allowedTypes using project.ProjectType
        // 3. Map to ProjectReference records
        return [];
    }

    #endregion
}
