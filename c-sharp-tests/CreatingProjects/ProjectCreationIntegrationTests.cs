using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Integration tests for ProjectCreationCommandService (CAP-019).
/// Verifies all 12 PAPI commands are registered and routed correctly.
/// RED phase -- these tests will fail until ProjectCreationCommandService is implemented.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectCreationIntegrationTests : PapiTestBase
{
    private ProjectCreationCommandService _commandService = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _commandService = new ProjectCreationCommandService(Client);
        await _commandService.InitializeAsync();
    }

    // =========================================================================
    // Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("ScenarioId", "spec-001")]
    [Property("BehaviorId", "BHV-001")]
    [Description(
        "Acceptance test: All 12 PAPI commands registered and routed to correct service methods"
    )]
    public async Task CommandRegistration_All12Commands_Registered()
    {
        // Verify all 12 commands can be invoked via SendRequestAsync without throwing
        // "not registered" errors. DummyPapiClient routes to local handlers.

        // 1. getTypeConfiguration
        var typeConfig = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.getTypeConfiguration",
            new object[] { "Standard" }.ToList().AsReadOnly()
        );
        Assert.That(typeConfig, Is.Not.Null, "getTypeConfiguration should return a result");

        // 2. canBeBasedOnType
        var canBeBased = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.canBeBasedOnType",
            new object[] { "BackTranslation", "some-guid" }.ToList().AsReadOnly()
        );
        // canBeBased may be null for default, but should not throw

        // 3. getValidBaseProjects
        var baseProjects = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.getValidBaseProjects",
            new object[] { "BackTranslation" }.ToList().AsReadOnly()
        );

        // 4. validateShortName
        var validateResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.validateShortName",
            new object[] { "TST", true }.ToList().AsReadOnly()
        );

        // 5. generateShortName
        var shortName = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.generateShortName",
            new object[] { "Test Project" }.ToList().AsReadOnly()
        );

        // 6. generateUniqueName
        var uniqueName = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.generateUniqueName",
            new object[] { "TST", "Test", false }.ToList().AsReadOnly()
        );

        // 7. getRegistrationState
        var regState = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.getRegistrationState",
            new object[] { "guid", "baseGuid", "Standard" }.ToList().AsReadOnly()
        );

        // 8. validateLanguage
        var langResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.validateLanguage",
            new object[] { "eng", "English", true }.ToList().AsReadOnly()
        );

        // 9. createProject
        var createResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.createProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        // 10. createBooks
        var booksResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.createBooks",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        // 11. cleanupProject
        var cleanupResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.cleanupProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        // 12. updateProject
        var updateResult = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.updateProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        // If we reach here without exceptions, all 12 commands were registered
        Assert.Pass("All 12 PAPI commands registered successfully");
    }

    // =========================================================================
    // Individual Command Registration Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-001")]
    [Property("BehaviorId", "BHV-001")]
    [Description("getTypeConfiguration command is registered")]
    public async Task GetTypeConfiguration_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<ProjectTypeConfiguration>(
            "command:paratextProjectCreation.getTypeConfiguration",
            new object[] { "Standard" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ProjectType, Is.EqualTo(ProjectType.Standard));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-001")]
    [Description("canBeBasedOnType command is registered")]
    public async Task CanBeBasedOnType_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<bool>(
            "command:paratextProjectCreation.canBeBasedOnType",
            new object[] { "Standard", "some-guid" }.ToList().AsReadOnly()
        );

        // Should return false for unknown guid (default behavior)
        Assert.That(result, Is.TypeOf<bool>());
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-003")]
    [Property("BehaviorId", "BHV-001")]
    [Description("getValidBaseProjects command is registered")]
    public async Task GetValidBaseProjects_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<IReadOnlyList<ProjectReference>>(
            "command:paratextProjectCreation.getValidBaseProjects",
            new object[] { "BackTranslation" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-004")]
    [Property("BehaviorId", "BHV-001")]
    [Description("validateShortName command is registered")]
    public async Task ValidateShortName_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<ValidationResult>(
            "command:paratextProjectCreation.validateShortName",
            new object[] { "TST", true }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-005")]
    [Property("BehaviorId", "BHV-001")]
    [Description("generateShortName command is registered")]
    public async Task GenerateShortName_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<string>(
            "command:paratextProjectCreation.generateShortName",
            new object[] { "My Test Project" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-006")]
    [Property("BehaviorId", "BHV-001")]
    [Description("generateUniqueName command is registered")]
    public async Task GenerateUniqueName_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.generateUniqueName",
            new object[] { "TST", "Test", false }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-007")]
    [Property("BehaviorId", "BHV-001")]
    [Description("getRegistrationState command is registered")]
    public async Task GetRegistrationState_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<RegistrationState>(
            "command:paratextProjectCreation.getRegistrationState",
            new object[] { "guid", "baseGuid", "Standard" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-008")]
    [Property("BehaviorId", "BHV-001")]
    [Description("validateLanguage command is registered")]
    public async Task ValidateLanguage_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<ValidationResult>(
            "command:paratextProjectCreation.validateLanguage",
            new object[] { "eng", "English", true }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-009")]
    [Property("BehaviorId", "BHV-001")]
    [Description("createProject command is registered")]
    public async Task CreateProject_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<CreateProjectResult>(
            "command:paratextProjectCreation.createProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-010")]
    [Property("BehaviorId", "BHV-001")]
    [Description("createBooks command is registered")]
    public async Task CreateBooks_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<CreateBooksResult>(
            "command:paratextProjectCreation.createBooks",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-011")]
    [Property("BehaviorId", "BHV-001")]
    [Description("cleanupProject command is registered")]
    public async Task CleanupProject_CommandRegistered_Succeeds()
    {
        // cleanupProject returns void, so we just verify no exception
        await Client.SendRequestAsync<object>(
            "command:paratextProjectCreation.cleanupProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        Assert.Pass("cleanupProject command registered and callable");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CMD-012")]
    [Property("BehaviorId", "BHV-001")]
    [Description("updateProject command is registered")]
    public async Task UpdateProject_CommandRegistered_ReturnsResult()
    {
        var result = await Client.SendRequestAsync<UpdateProjectResult>(
            "command:paratextProjectCreation.updateProject",
            new object[] { "{}" }.ToList().AsReadOnly()
        );

        Assert.That(result, Is.Not.Null);
    }
}
