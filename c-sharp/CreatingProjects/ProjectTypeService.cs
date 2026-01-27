using Paratext.Data;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project type configuration and base project validation.
/// </summary>
internal static class ProjectTypeService
{
    private static readonly IReadOnlyList<ProjectType> s_scriptureTypes = new[]
    {
        ProjectType.Standard,
        ProjectType.BackTranslation,
        ProjectType.Daughter,
        ProjectType.TransliterationManual,
        ProjectType.TransliterationWithEncoder,
        ProjectType.StudyBible,
        ProjectType.StudyBibleAdditions,
    };

    private static readonly IReadOnlyList<ProjectType> s_standardOnly = new[]
    {
        ProjectType.Standard,
    };

    private static readonly IReadOnlyList<ProjectType> s_notStudyBible = s_scriptureTypes
        .Where(t => t != ProjectType.StudyBible && t != ProjectType.StudyBibleAdditions)
        .ToList();

    private static readonly IReadOnlyList<ProjectType> s_empty = Array.Empty<ProjectType>();

    public static ProjectTypeConfiguration GetTypeConfiguration(ProjectType projectType)
    {
        return projectType switch
        {
            ProjectType.Standard => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.Standard,
                BaseProjectRequired = false,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_empty,
                IsDerivedType = false,
                IsScripture = true,
            },
            ProjectType.BackTranslation => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.BackTranslation,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_scriptureTypes,
                IsDerivedType = true,
                IsScripture = true,
            },
            ProjectType.Daughter => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.Daughter,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_scriptureTypes,
                IsDerivedType = true,
                IsScripture = true,
            },
            ProjectType.StudyBibleAdditions => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.StudyBibleAdditions,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = true,
                SharesParentRegistration = false,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_notStudyBible,
                IsDerivedType = true,
                IsScripture = true,
            },
            ProjectType.Auxiliary => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.Auxiliary,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_standardOnly,
                IsDerivedType = true,
                IsScripture = false,
            },
            ProjectType.ConsultantNotes => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.ConsultantNotes,
                BaseProjectRequired = false,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFC,
                RegistrationRequired = false,
                SharesParentRegistration = false,
                BooksTabVisible = false,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_empty,
                IsDerivedType = false,
                IsScripture = false,
            },
            ProjectType.TransliterationManual => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.TransliterationManual,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFD,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                EncodingConverterRequired = false,
                AllowedBaseTypes = s_scriptureTypes,
                IsDerivedType = true,
                IsScripture = true,
            },
            ProjectType.TransliterationWithEncoder => new ProjectTypeConfiguration
            {
                ProjectType = ProjectType.TransliterationWithEncoder,
                BaseProjectRequired = true,
                EditableDefault = true,
                AutoNameFromUser = false,
                NormalizationDefault = ProjectNormalization.NFD,
                RegistrationRequired = false,
                SharesParentRegistration = true,
                BooksTabVisible = true,
                EncodingConverterRequired = true,
                AllowedBaseTypes = s_scriptureTypes,
                IsDerivedType = true,
                IsScripture = true,
            },
            _ => throw new ArgumentOutOfRangeException(
                nameof(projectType),
                projectType,
                "Unsupported project type"
            ),
        };
    }

    public static bool CanBeBasedOnType(ProjectType creatingType, string candidateGuid)
    {
        var config = GetTypeConfiguration(creatingType);
        if (!config.BaseProjectRequired)
            return false;

        // Find the candidate project in the collection
        ScrText? candidate = ScrTextCollection
            .ScrTexts(IncludeProjects.Everything)
            .FirstOrDefault(st => st.Settings?.Guid?.ToString() == candidateGuid);

        if (candidate == null)
            return false;

        // Map the ParatextData project type to our enum
        var candidateType = MapParatextDataProjectType(candidate.Settings.TranslationInfo.Type);

        return config.AllowedBaseTypes.Contains(candidateType);
    }

    public static IReadOnlyList<ProjectReference> GetValidBaseProjects(ProjectType creatingType)
    {
        throw new NotImplementedException();
    }

    internal static ProjectType MapParatextDataProjectType(
        PtxUtils.Enum<Paratext.Data.ProjectType> paratextType
    )
    {
        if (paratextType == Paratext.Data.ProjectType.Standard)
            return ProjectType.Standard;
        if (paratextType == Paratext.Data.ProjectType.BackTranslation)
            return ProjectType.BackTranslation;
        if (paratextType == Paratext.Data.ProjectType.Daughter)
            return ProjectType.Daughter;
        if (paratextType == Paratext.Data.ProjectType.TransliterationManual)
            return ProjectType.TransliterationManual;
        if (paratextType == Paratext.Data.ProjectType.TransliterationWithEncoder)
            return ProjectType.TransliterationWithEncoder;
        if (paratextType == Paratext.Data.ProjectType.StudyBible)
            return ProjectType.StudyBible;
        if (paratextType == Paratext.Data.ProjectType.ConsultantNotes)
            return ProjectType.ConsultantNotes;
        if (paratextType == Paratext.Data.ProjectType.StudyBibleAdditions)
            return ProjectType.StudyBibleAdditions;
        if (paratextType == Paratext.Data.ProjectType.Auxiliary)
            return ProjectType.Auxiliary;
        return ProjectType.Standard;
    }
}
