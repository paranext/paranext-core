using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Registers all 12 PAPI commands for project creation and routes them to the appropriate services.
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
        // TODO: Register all 12 commands
        // This is a stub for RED phase TDD -- tests should fail here.
        await Task.CompletedTask;
        throw new NotImplementedException(
            "ProjectCreationCommandService.InitializeAsync is not yet implemented"
        );
    }
}
