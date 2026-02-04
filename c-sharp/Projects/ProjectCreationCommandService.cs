// === NEW IN PT10 ===
// Reason: PAPI command registration for all project creation commands
// Maps to: CAP-029, data-contracts.md section 1

using Paranext.DataProvider;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service that registers all PAPI commands for project creation.
/// PT9 Provenance: ParatextRegistrationService pattern
/// Maps to: CAP-029
/// </summary>
internal class ProjectCreationCommandService
{
    private readonly PapiClient _papiClient;
    private bool _initialized;

    /// <summary>
    /// Creates a new ProjectCreationCommandService.
    /// </summary>
    /// <param name="papiClient">PAPI client for command registration</param>
    public ProjectCreationCommandService(PapiClient papiClient)
    {
        ArgumentNullException.ThrowIfNull(papiClient);
        _papiClient = papiClient;
    }

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern requires registration of all 13 commands
    // Maps to: CAP-029, data-contracts.md section 3

    /// <summary>
    /// Initializes the service by registering all PAPI commands.
    /// Must be called once during application startup.
    /// Maps to: CAP-029
    /// </summary>
    public async Task InitializeAsync()
    {
        if (_initialized)
            return;

        // Register all 13 project creation commands following ParatextRegistrationService pattern
        // Command 1: validateShortName
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateShortName",
            (ShortNameValidationRequest request) =>
                ProjectValidationService.ValidateShortName(request)
        );

        // Command 2: generateAbbreviation
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.generateAbbreviation",
            (string fullName) => ProjectNameService.GenerateAbbreviation(fullName)
        );

        // Command 3: getProjectTypeRules
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getProjectTypeRules",
            (ProjectTypeRulesRequest request) => ProjectTypeRulesService.GetTypeRules(request)
        );

        // Command 4: validateProjectSettings
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateProjectSettings",
            (ProjectCreateRequest settings, bool isNewProject) =>
                ProjectValidationService.ValidateProjectSettings(settings, isNewProject)
        );

        // Command 5: getUsfmVersionWarning
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getUsfmVersionWarning",
            (UsfmVersionOption version, bool isNewProject) =>
                ProjectCreationService.GetUsfmVersionWarning(version, isNewProject)
        );

        // Command 6: validateCharacterRules
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateCharacterRules",
            (CharacterRulesValidationRequest request) =>
                LanguageValidationService.ValidateCharacterRules(request)
        );

        // Command 7: saveLanguageSettings
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.saveLanguageSettings",
            (LanguageSettingsRequest request, bool canUpdateAllSettings) =>
                LanguageSettingsService.SaveLanguageSettings(request, canUpdateAllSettings)
        );

        // Command 8: getCompatibleDestinations
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getCompatibleDestinations",
            (HexId sourceProjectGuid) =>
                BookOperationsService.GetCompatibleDestinations(sourceProjectGuid).ToList()
        );

        // Command 9: copyBooks
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.copyBooks",
            async (CopyBooksRequest request) => await BookOperationsService.CopyBooksAsync(request)
        );

        // Command 10: analyzeBackup
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.analyzeBackup",
            async (string backupFilePath) =>
                await ProjectRestoreService.AnalyzeBackupAsync(backupFilePath)
        );

        // Command 11: restoreProject
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.restoreProject",
            async (RestoreProjectRequest request) =>
                await ProjectRestoreService.RestoreProjectAsync(request)
        );

        // Command 12: createProject
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.createProject",
            async (ProjectCreateRequest request) =>
                await ProjectCreationService.CreateProjectAsync(request)
        );

        // Command 13: getProjectOptions
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getProjectOptions",
            async () => await ProjectCreationService.GetProjectOptionsAsync()
        );

        _initialized = true;
    }
}
