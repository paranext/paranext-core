using Paratext.Data;
using SIL.Xml;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for creating projects with default values.
/// </summary>
internal static class ProjectDefaultsService
{
    /// <summary>
    /// Gets the default settings for a project type.
    /// </summary>
    public static CreateProjectRequest GetDefaultSettings(
        ProjectType projectType,
        string? baseProjectGuid = null
    )
    {
        var config = ProjectTypeService.GetTypeConfiguration(projectType);

        return new CreateProjectRequest
        {
            ShortName = "",
            FullName = "",
            LanguageId = "",
            Versification = VersificationType.English,
            ProjectType = projectType,
            BaseProjectGuid = baseProjectGuid,
            Normalization = config.NormalizationDefault,
            UsfmVersion = 3,
            Editable = config.EditableDefault,
        };
    }

    /// <summary>
    /// Creates a new project with the specified settings.
    /// </summary>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Validate name: no spaces allowed
        if (request.ShortName.Contains(' '))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "INVALID_NAME",
                    ErrorMessage = "Project short name must not contain spaces",
                }
            );
        }

        // Validate derived types require base project
        var config = ProjectTypeService.GetTypeConfiguration(request.ProjectType);
        if (config.IsDerivedType && string.IsNullOrEmpty(request.BaseProjectGuid))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "BASE_PROJECT_REQUIRED",
                    ErrorMessage = "Derived project types require a base project GUID",
                }
            );
        }

        // ParatextData uses HexId (40-char hex string), not standard GUIDs with dashes
        var projectGuid = HexId.CreateNew().ToString();

        try
        {
            // Determine project root folder from ParatextData
            var projectFolder = Path.Combine(
                ScrTextCollection.SettingsDirectory,
                request.ShortName
            );
            Directory.CreateDirectory(projectFolder);

            // Write Settings.xml — field order matches PT9 format
            var normalization = request.Normalization ?? ProjectNormalization.NFC;
            var settings = new ParatextProjectSettings
            {
                StyleSheet = "usfm.sty",
                Versification = (int)request.Versification,
                Language = request.LanguageName ?? request.LanguageId,
                MinParatextVersion = "8.0.100.76",
                FullName = request.FullName,
                Encoding = 65001, // UTF-8
                Editable = request.Editable ?? true,
                Copyright = request.Copyright,
                NormalizationForm = normalization.ToString(),
                Name = request.ShortName,
                Guid = projectGuid,
                LanguageIsoCode = FormatLanguageIsoCode(request.LanguageId),
                TranslationInfo = $"{request.ProjectType}::",
                UsfmVersion = request.UsfmVersion ?? 3,
            };
            var settingsPath = Path.Combine(projectFolder, "Settings.xml");
            XmlSerializationHelper.SerializeToFileWithWriteThrough(settingsPath, settings);

            // Refresh ScrTextCollection so it discovers the new project on disk
            ScrTextCollection.RefreshScrTexts();

            // Track in registry for UpdateProjectAsync lookups
            ProjectRegistry.AddProject(projectGuid, request.ShortName);

            return Task.FromResult(
                new CreateProjectResult { Success = true, ProjectGuid = projectGuid }
            );
        }
        catch (Exception ex)
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "CREATE_FAILED",
                    ErrorMessage = ex.Message,
                }
            );
        }
    }

    /// <summary>
    /// Converts a BCP-47 language tag (e.g. "eng") to Paratext's "code:::" format.
    /// </summary>
    private static string FormatLanguageIsoCode(string languageId)
    {
        if (string.IsNullOrEmpty(languageId))
            return "und:::";
        return $"{languageId}:::";
    }
}
