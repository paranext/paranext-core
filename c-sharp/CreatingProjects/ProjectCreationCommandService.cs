using System.Text.Json;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Registers all 12 PAPI commands for project creation and routes them to the appropriate services.
/// Follows the pattern established by ParatextRegistrationService.
/// </summary>
internal class ProjectCreationCommandService(PapiClient papiClient)
{
    private PapiClient PapiClient { get; } = papiClient;

    private static readonly JsonSerializerOptions s_jsonOptions =
        new() { PropertyNameCaseInsensitive = true };

    /// <summary>
    /// Registers all project creation commands on the PAPI.
    /// </summary>
    public async Task InitializeAsync()
    {
        // 1. getTypeConfiguration
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.getTypeConfiguration",
            (string projectTypeStr) =>
            {
                var projectType = Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);
                return ProjectTypeService.GetTypeConfiguration(projectType);
            }
        );

        // 2. canBeBasedOnType
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.canBeBasedOnType",
            (string projectTypeStr, string candidateGuid) =>
            {
                var projectType = Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);
                return ProjectTypeService.CanBeBasedOnType(projectType, candidateGuid);
            }
        );

        // 3. getValidBaseProjects
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.getValidBaseProjects",
            (string projectTypeStr) =>
            {
                var projectType = Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);
                return ProjectTypeService.GetValidBaseProjects(projectType);
            }
        );

        // 4. validateShortName
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.validateShortName",
            (string shortName, bool isNewProject) =>
                ProjectNameService.ValidateShortName(shortName, isNewProject)
        );

        // 5. generateShortName
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.generateShortName",
            (string fullName) => ProjectNameService.GenerateShortName(fullName)
        );

        // 6. generateUniqueName
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.generateUniqueName",
            (string baseShortName, string baseLongName, bool forceNumbered) =>
                ProjectNameService.GenerateUniqueName(baseShortName, baseLongName, forceNumbered)
        );

        // 7. getRegistrationState
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.getRegistrationState",
            (string projectGuid, string baseProjectGuid, string projectTypeStr) =>
            {
                var projectType = Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);
                return RegistrationService.GetRegistrationState(
                    projectGuid,
                    baseProjectGuid,
                    projectType
                );
            }
        );

        // 8. validateLanguage
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.validateLanguage",
            (string languageId, string languageName, bool isNewProject) =>
                LanguageService.ValidateLanguageSelection(languageId, languageName)
        );

        // 9. createProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createProject",
            (string requestJson) =>
            {
                CreateProjectRequest? request;
                try
                {
                    request = JsonSerializer.Deserialize<CreateProjectRequest>(
                        requestJson,
                        s_jsonOptions
                    );
                }
                catch (JsonException)
                {
                    return new CreateProjectResult
                    {
                        Success = false,
                        ErrorCode = "INVALID_REQUEST",
                        ErrorMessage = "Invalid request JSON",
                    };
                }
                if (request == null)
                    return new CreateProjectResult
                    {
                        Success = false,
                        ErrorCode = "INVALID_REQUEST",
                        ErrorMessage = "Invalid request JSON",
                    };
                return ProjectDefaultsService.CreateProjectAsync(request).GetAwaiter().GetResult();
            }
        );

        // 10. createBooks
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createBooks",
            (string requestJson) =>
            {
                CreateBooksRequest? request;
                try
                {
                    request = JsonSerializer.Deserialize<CreateBooksRequest>(
                        requestJson,
                        s_jsonOptions
                    );
                }
                catch (JsonException)
                {
                    return new CreateBooksResult
                    {
                        Success = false,
                        LastCreatedBookNum = 0,
                        Errors = new List<string> { "Invalid request JSON" },
                    };
                }
                if (request == null)
                    return new CreateBooksResult
                    {
                        Success = false,
                        LastCreatedBookNum = 0,
                        Errors = new List<string> { "Invalid request JSON" },
                    };
                return BookCreationService.CreateBooksAsync(request).GetAwaiter().GetResult();
            }
        );

        // 11. cleanupProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.cleanupProject",
            (string requestJson) =>
            {
                CleanupProjectRequest? request;
                try
                {
                    request = JsonSerializer.Deserialize<CleanupProjectRequest>(
                        requestJson,
                        s_jsonOptions
                    );
                }
                catch (JsonException)
                {
                    return;
                }
                if (request == null)
                    return;
                ProjectCleanupService.CleanupProjectAsync(request).GetAwaiter().GetResult();
            }
        );

        // 12. updateProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.updateProject",
            (string requestJson) =>
            {
                UpdateProjectRequest? request;
                try
                {
                    request = JsonSerializer.Deserialize<UpdateProjectRequest>(
                        requestJson,
                        s_jsonOptions
                    );
                }
                catch (JsonException)
                {
                    return new UpdateProjectResult
                    {
                        Success = false,
                        ErrorCode = "INVALID_REQUEST",
                        ErrorMessage = "Invalid request JSON",
                    };
                }
                if (request == null)
                    return new UpdateProjectResult
                    {
                        Success = false,
                        ErrorCode = "INVALID_REQUEST",
                        ErrorMessage = "Invalid request JSON",
                    };
                return ProjectUpdateService.UpdateProjectAsync(request).GetAwaiter().GetResult();
            }
        );
    }
}
