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

        // Register all 13 project creation commands (pattern: ParatextRegistrationService)
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateShortName",
            ProjectValidationService.ValidateShortName
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.generateAbbreviation",
            ProjectNameService.GenerateAbbreviation
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getProjectTypeRules",
            ProjectTypeRulesService.GetTypeRules
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateProjectSettings",
            ProjectValidationService.ValidateProjectSettings
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getUsfmVersionWarning",
            ProjectCreationService.GetUsfmVersionWarning
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.validateCharacterRules",
            LanguageValidationService.ValidateCharacterRules
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.saveLanguageSettings",
            LanguageSettingsService.SaveLanguageSettings
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getCompatibleDestinations",
            (HexId sourceProjectGuid) =>
                BookOperationsService.GetCompatibleDestinations(sourceProjectGuid).ToList()
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.copyBooks",
            BookOperationsService.CopyBooksAsync
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.analyzeBackup",
            ProjectRestoreService.AnalyzeBackupAsync
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.restoreProject",
            ProjectRestoreService.RestoreProjectAsync
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.createProject",
            ProjectCreationService.CreateProjectAsync
        );
        await _papiClient.RegisterRequestHandlerAsync(
            "command:platformProjects.getProjectOptions",
            ProjectCreationService.GetProjectOptionsAsync
        );

        _initialized = true;
    }
}
