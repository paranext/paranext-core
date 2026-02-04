using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectCreationCommandService - CAP-029
/// Verifies PAPI command registration for all 13 project creation commands.
/// Reference: ParatextRegistrationService.cs:34-57 (command registration pattern)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectCreationCommandServiceTests : PapiTestBase
{
    #region Constants

    /// <summary>
    /// All 13 PAPI commands that must be registered.
    /// From data-contracts.md and strategic-plan-backend.md.
    /// </summary>
    private static readonly string[] AllCommands =
    {
        "command:platformProjects.validateShortName",
        "command:platformProjects.generateAbbreviation",
        "command:platformProjects.getProjectTypeRules",
        "command:platformProjects.validateProjectSettings",
        "command:platformProjects.getUsfmVersionWarning",
        "command:platformProjects.validateCharacterRules",
        "command:platformProjects.saveLanguageSettings",
        "command:platformProjects.getCompatibleDestinations",
        "command:platformProjects.copyBooks",
        "command:platformProjects.analyzeBackup",
        "command:platformProjects.restoreProject",
        "command:platformProjects.createProject",
        "command:platformProjects.getProjectOptions",
    };

    #endregion

    #region Acceptance Test - CAP-029

    /// <summary>
    /// Acceptance test for CAP-029: PapiCommandRegistration capability.
    /// When this test passes, the capability is complete.
    /// Verifies: All 13 commands registered and routable.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-001")]
    [Description("Acceptance test: All 13 PAPI commands are registered")]
    public async Task PapiCommandRegistration_AcceptanceTest()
    {
        // Arrange
        var commandService = new ProjectCreationCommandService(Client);

        // Act - Initialize (registers all commands)
        await commandService.InitializeAsync();

        // Assert - Verify all 13 commands were registered
        var registeredCommands = Client.GetRegisteredCommands();

        Assert.That(registeredCommands.Count, Is.GreaterThanOrEqualTo(13), "Should register at least 13 commands");

        foreach (var command in AllCommands)
        {
            Assert.That(
                registeredCommands,
                Does.Contain(command),
                $"Command '{command}' should be registered"
            );
        }
    }

    #endregion

    #region Contract Tests - Command Registration

    /// <summary>
    /// Verify validateShortName command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-600")]
    public async Task InitializeAsync_RegistersValidateShortNameCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.validateShortName")
        );
    }

    /// <summary>
    /// Verify generateAbbreviation command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-601")]
    public async Task InitializeAsync_RegistersGenerateAbbreviationCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.generateAbbreviation")
        );
    }

    /// <summary>
    /// Verify getProjectTypeRules command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-100")]
    public async Task InitializeAsync_RegistersGetProjectTypeRulesCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.getProjectTypeRules")
        );
    }

    /// <summary>
    /// Verify validateProjectSettings command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-511")]
    public async Task InitializeAsync_RegistersValidateProjectSettingsCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.validateProjectSettings")
        );
    }

    /// <summary>
    /// Verify getUsfmVersionWarning command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-100")]
    public async Task InitializeAsync_RegistersGetUsfmVersionWarningCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.getUsfmVersionWarning")
        );
    }

    /// <summary>
    /// Verify validateCharacterRules command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-163")]
    public async Task InitializeAsync_RegistersValidateCharacterRulesCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.validateCharacterRules")
        );
    }

    /// <summary>
    /// Verify saveLanguageSettings command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-163")]
    [Property("BehaviorId", "BHV-164")]
    public async Task InitializeAsync_RegistersSaveLanguageSettingsCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.saveLanguageSettings")
        );
    }

    /// <summary>
    /// Verify getCompatibleDestinations command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-513")]
    public async Task InitializeAsync_RegistersGetCompatibleDestinationsCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(
            registeredCommands,
            Does.Contain("command:platformProjects.getCompatibleDestinations")
        );
    }

    /// <summary>
    /// Verify copyBooks command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-514")]
    public async Task InitializeAsync_RegistersCopyBooksCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(registeredCommands, Does.Contain("command:platformProjects.copyBooks"));
    }

    /// <summary>
    /// Verify analyzeBackup command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-501")]
    public async Task InitializeAsync_RegistersAnalyzeBackupCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(registeredCommands, Does.Contain("command:platformProjects.analyzeBackup"));
    }

    /// <summary>
    /// Verify restoreProject command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-501")]
    [Property("BehaviorId", "BHV-502")]
    public async Task InitializeAsync_RegistersRestoreProjectCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(registeredCommands, Does.Contain("command:platformProjects.restoreProject"));
    }

    /// <summary>
    /// Verify createProject command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-510")]
    [Property("BehaviorId", "BHV-511")]
    [Property("BehaviorId", "BHV-512")]
    public async Task InitializeAsync_RegistersCreateProjectCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(registeredCommands, Does.Contain("command:platformProjects.createProject"));
    }

    /// <summary>
    /// Verify getProjectOptions command is registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-159")]
    [Property("BehaviorId", "BHV-161")]
    public async Task InitializeAsync_RegistersGetProjectOptionsCommand()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        Assert.That(registeredCommands, Does.Contain("command:platformProjects.getProjectOptions"));
    }

    #endregion

    #region Contract Tests - Command Count

    /// <summary>
    /// Verify exactly 13 project creation commands are registered
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-001")]
    public async Task InitializeAsync_RegistersExactly13Commands()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        var projectCommands = registeredCommands.Where(c =>
            c.StartsWith("command:platformProjects.")
        );

        Assert.That(projectCommands.Count(), Is.EqualTo(13), "Should register exactly 13 project commands");
    }

    /// <summary>
    /// Verify all commands have correct prefix
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-001")]
    public async Task InitializeAsync_AllCommandsHaveCorrectPrefix()
    {
        var commandService = new ProjectCreationCommandService(Client);

        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        var projectCommands = registeredCommands.Where(c =>
            c.Contains("platformProjects")
        );

        foreach (var command in projectCommands)
        {
            Assert.That(
                command,
                Does.StartWith("command:platformProjects."),
                $"Command '{command}' should have correct prefix"
            );
        }
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Multiple InitializeAsync calls should be idempotent (not register duplicates)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-001")]
    public async Task InitializeAsync_CalledTwice_DoesNotDuplicateRegistrations()
    {
        var commandService = new ProjectCreationCommandService(Client);

        // Call InitializeAsync twice
        await commandService.InitializeAsync();
        await commandService.InitializeAsync();

        var registeredCommands = Client.GetRegisteredCommands();
        var projectCommands = registeredCommands
            .Where(c => c.StartsWith("command:platformProjects."))
            .ToList();

        // Should still have exactly 13 (not 26)
        Assert.That(
            projectCommands.Count,
            Is.EqualTo(13),
            "Should not duplicate registrations on multiple calls"
        );
    }

    /// <summary>
    /// Constructor with null client should throw ArgumentNullException
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-029")]
    [Property("ScenarioId", "TS-CMD-001")]
    public void Constructor_NullClient_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => new ProjectCreationCommandService(null!));
    }

    #endregion
}
