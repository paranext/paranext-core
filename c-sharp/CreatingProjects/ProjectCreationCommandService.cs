using System.Text.Json;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Registers all 13 PAPI commands for project creation and routes them to the appropriate services.
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
                ProjectTypeService.GetTypeConfiguration(ParseProjectType(projectTypeStr))
        );

        // 2. canBeBasedOnType
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.canBeBasedOnType",
            (string projectTypeStr, string candidateGuid) =>
                ProjectTypeService.CanBeBasedOnType(ParseProjectType(projectTypeStr), candidateGuid)
        );

        // 3. getValidBaseProjects
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.getValidBaseProjects",
            (string projectTypeStr) =>
                ProjectTypeService.GetValidBaseProjects(ParseProjectType(projectTypeStr))
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
                RegistrationService.GetRegistrationState(
                    projectGuid,
                    baseProjectGuid,
                    ParseProjectType(projectTypeStr)
                )
        );

        // 8. validateLanguage
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.validateLanguage",
            (string languageId, string languageName, string? initialLanguageName) =>
                LanguageService.ValidateLanguageSelection(
                    languageId,
                    languageName,
                    initialLanguageName
                )
        );

        // 9. getAvailableLanguages
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.getAvailableLanguages",
            (string? searchQuery) => LanguageService.GetAvailableLanguages(searchQuery)
        );

        // 10. createProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createProject",
            (string requestJson) =>
                DeserializeAndExecute<CreateProjectRequest, CreateProjectResult>(
                    requestJson,
                    request =>
                        ProjectDefaultsService.CreateProjectAsync(request).GetAwaiter().GetResult(),
                    () =>
                        new CreateProjectResult
                        {
                            Success = false,
                            ErrorCode = "INVALID_REQUEST",
                            ErrorMessage = "Invalid request JSON",
                        }
                )
        );

        // 10. createBooks
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createBooks",
            (string requestJson) =>
                DeserializeAndExecute<CreateBooksRequest, CreateBooksResult>(
                    requestJson,
                    request =>
                        BookCreationService.CreateBooksAsync(request).GetAwaiter().GetResult(),
                    () =>
                        new CreateBooksResult
                        {
                            Success = false,
                            LastCreatedBookNum = 0,
                            Errors = new List<string> { "Invalid request JSON" },
                        }
                )
        );

        // 11. cleanupProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.cleanupProject",
            (string requestJson) =>
            {
                var request = DeserializeRequest<CleanupProjectRequest>(requestJson);
                if (request != null)
                    ProjectCleanupService.CleanupProjectAsync(request).GetAwaiter().GetResult();
            }
        );

        // 12. updateProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.updateProject",
            (string requestJson) =>
                DeserializeAndExecute<UpdateProjectRequest, UpdateProjectResult>(
                    requestJson,
                    request =>
                        ProjectUpdateService.UpdateProjectAsync(request).GetAwaiter().GetResult(),
                    () =>
                        new UpdateProjectResult
                        {
                            Success = false,
                            ErrorCode = "INVALID_REQUEST",
                            ErrorMessage = "Invalid request JSON",
                        }
                )
        );
    }

    private static ProjectType ParseProjectType(string projectTypeStr) =>
        Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);

    /// <summary>
    /// Deserializes a JSON string to a request object, returning null on failure.
    /// </summary>
    private static TRequest? DeserializeRequest<TRequest>(string json)
        where TRequest : class
    {
        try
        {
            return JsonSerializer.Deserialize<TRequest>(json, s_jsonOptions);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    /// <summary>
    /// Deserializes a JSON request and executes the handler, returning an error result on
    /// deserialization failure.
    /// </summary>
    private static TResult DeserializeAndExecute<TRequest, TResult>(
        string json,
        Func<TRequest, TResult> handler,
        Func<TResult> createErrorResult
    )
        where TRequest : class
    {
        var request = DeserializeRequest<TRequest>(json);
        return request != null ? handler(request) : createErrorResult();
    }
}
