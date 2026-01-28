using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Registers all 13 PAPI commands for project creation and routes them to the appropriate services.
/// Follows the pattern established by ParatextRegistrationService.
/// </summary>
internal class ProjectCreationCommandService(PapiClient papiClient)
{
    private PapiClient PapiClient { get; } = papiClient;

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
            (string shortName, bool isNewProject, string? originalName) =>
                ProjectNameService.ValidateShortName(shortName, isNewProject, originalName)
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
            (string? searchQuery, int? maxResults) =>
                LanguageService.GetAvailableLanguages(searchQuery, maxResults ?? 50)
        );

        // 10. createProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createProject",
            (CreateProjectRequest request) =>
                ProjectDefaultsService.CreateProjectAsync(request).GetAwaiter().GetResult()
        );

        // 11. createBooks
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.createBooks",
            (CreateBooksRequest request) =>
                BookCreationService.CreateBooksAsync(request).GetAwaiter().GetResult()
        );

        // 12. cleanupProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.cleanupProject",
            (string projectGuid, bool wasRegistered) =>
                ProjectCleanupService
                    .CleanupProjectAsync(
                        new CleanupProjectRequest
                        {
                            ProjectGuid = projectGuid,
                            WasRegistered = wasRegistered,
                        }
                    )
                    .GetAwaiter()
                    .GetResult()
        );

        // 13. updateProject
        await PapiClient.RegisterRequestHandlerAsync(
            "command:paratextProjectCreation.updateProject",
            (UpdateProjectRequest request) =>
                ProjectUpdateService.UpdateProjectAsync(request).GetAwaiter().GetResult()
        );
    }

    private static ProjectType ParseProjectType(string projectTypeStr) =>
        Enum.Parse<ProjectType>(projectTypeStr, ignoreCase: true);
}
