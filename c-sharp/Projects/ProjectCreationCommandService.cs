// === NEW IN PT10 ===
// Reason: PAPI command registration for all project creation commands
// Maps to: CAP-029, data-contracts.md section 1

using Paranext.DataProvider;

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

    /// <summary>
    /// Initializes the service by registering all PAPI commands.
    /// Must be called once during application startup.
    /// Maps to: CAP-029
    /// </summary>
    public async Task InitializeAsync()
    {
        if (_initialized)
            return;

        // STUB: TDD RED phase - tests will fail until implementation is complete
        // The implementation should register all 13 commands:
        // 1. command:platformProjects.validateShortName
        // 2. command:platformProjects.generateAbbreviation
        // 3. command:platformProjects.getProjectTypeRules
        // 4. command:platformProjects.validateProjectSettings
        // 5. command:platformProjects.getUsfmVersionWarning
        // 6. command:platformProjects.validateCharacterRules
        // 7. command:platformProjects.saveLanguageSettings
        // 8. command:platformProjects.getCompatibleDestinations
        // 9. command:platformProjects.copyBooks
        // 10. command:platformProjects.analyzeBackup
        // 11. command:platformProjects.restoreProject
        // 12. command:platformProjects.createProject
        // 13. command:platformProjects.getProjectOptions

        throw new NotImplementedException("CAP-029: Command registration not yet implemented");
    }
}
