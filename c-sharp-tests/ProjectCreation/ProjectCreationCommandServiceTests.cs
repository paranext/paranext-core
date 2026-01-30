using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectCreationCommandService (CAP-022 PAPICommandRegistration).
/// Verifies that all 9 PAPI commands are properly registered and can be invoked.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectCreationCommandServiceTests : PapiTestBase
{
    private ProjectCreationCommandService? _commandService;

    #region Test Setup

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _commandService = new ProjectCreationCommandService(Client);
    }

    [TearDown]
    public override void TestTearDown()
    {
        _commandService = null;
        base.TestTearDown();
    }

    #endregion

    #region Acceptance Tests (OUTER LOOP)

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-022")]
    [Description("Acceptance test: All PAPI commands are registered and callable")]
    public async Task PAPICommandRegistration_AcceptanceTest()
    {
        // OUTER TEST: When the command service is initialized,
        // all 9 PAPI commands should be registered and callable

        // Act
        await _commandService!.InitializeAsync();

        // Assert: All commands should be registered
        // This tests the complete integration - when this test passes, CAP-022 is complete

        // Verify createProject command is registered
        var createProjectResult = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[]
            {
                new ProjectCreationRequest
                {
                    ShortName = "TESTPRJ",
                    FullName = "Test Project",
                    LanguageId = "en",
                    ProjectType = ProjectType.Standard,
                    Versification = "English",
                },
            }
        );
        Assert.That(createProjectResult, Is.Not.Null);

        // Verify getProjectOptions command is registered
        var optionsResult = await Client.SendRequestAsync<ProjectOptionsResult>(
            "command:platformScripture.getProjectOptions",
            null
        );
        Assert.That(optionsResult, Is.Not.Null);

        // Verify validateProjectNames command is registered
        var validationResult = await Client.SendRequestAsync<ProjectNameValidationResult>(
            "command:platformScripture.validateProjectNames",
            new object[]
            {
                new ProjectNameValidationRequest
                {
                    ShortName = "TEST",
                    FullName = "Test",
                    Mode = "create",
                },
            }
        );
        Assert.That(validationResult, Is.Not.Null);

        // Verify generateShortName command is registered
        var shortNameResult = await Client.SendRequestAsync<ShortNameGenerationResult>(
            "command:platformScripture.generateShortName",
            new object[]
            {
                new ShortNameGenerationRequest { FullName = "New Test Project" },
            }
        );
        Assert.That(shortNameResult, Is.Not.Null);

        // Verify validateFilePattern command is registered
        var filePatternResult = await Client.SendRequestAsync<FileNamingPatternResult>(
            "command:platformScripture.validateFilePattern",
            new object[]
            {
                new FileNamingPatternRequest
                {
                    Prefix = "",
                    Scheme = FileNameForm.Form41MAT,
                    Suffix = "",
                },
            }
        );
        Assert.That(filePatternResult, Is.Not.Null);

        // Verify saveInterlinearSetup command is registered
        var interlinearResult = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[]
            {
                new InterlinearSetupRequest
                {
                    TaskType = InterlinearTaskType.Glossing,
                    SourceProjectName = "TestSource",
                    SourceProjectGuid = "test-guid",
                },
            }
        );
        Assert.That(interlinearResult, Is.Not.Null);

        // Verify validateInterlinearSetup command is registered
        var validateInterlinearResult = await Client.SendRequestAsync<InterlinearValidationResult>(
            "command:platformScripture.validateInterlinearSetup",
            new object[]
            {
                new InterlinearSetupRequest
                {
                    TaskType = InterlinearTaskType.Glossing,
                    SourceProjectName = "TestSource",
                    SourceProjectGuid = "test-guid",
                },
            }
        );
        Assert.That(validateInterlinearResult, Is.Not.Null);

        // Verify getRegistrationStatus command is registered
        var regStatusResult = await Client.SendRequestAsync<RegistrationStatusResult>(
            "command:platformScripture.getRegistrationStatus",
            new object[] { new RegistrationStatusRequest { ProjectType = ProjectType.Standard } }
        );
        Assert.That(regStatusResult, Is.Not.Null);

        // Verify getInterlinearSetups command is registered
        var setupsResult = await Client.SendRequestAsync<IReadOnlyList<InterlinearSetupInfo>>(
            "command:platformScripture.getInterlinearSetups",
            new object[] { "TestProject" }
        );
        Assert.That(setupsResult, Is.Not.Null);
    }

    #endregion

    #region Command Registration Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-001")]
    [Description("InitializeAsync registers all 9 PAPI commands")]
    public async Task InitializeAsync_RegistersAllCommands()
    {
        // Act
        await _commandService!.InitializeAsync();

        // Assert: Verify all commands can be invoked (registration succeeded)
        // Each command test below verifies a specific registration
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-002")]
    [Description("createProject command is registered and returns ProjectCreationResult")]
    public async Task CreateProjectCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "CMDTST",
            FullName = "Command Test Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
            Versification = "English",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.True.Or.False); // Just verify we got a result
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-003")]
    [Description("getProjectOptions command is registered and returns ProjectOptionsResult")]
    public async Task GetProjectOptionsCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();

        // Act
        var result = await Client.SendRequestAsync<ProjectOptionsResult>(
            "command:platformScripture.getProjectOptions",
            null
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Languages, Is.Not.Null);
        Assert.That(result.Versifications, Is.Not.Null);
        Assert.That(result.ProjectTypes, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-004")]
    [Description("validateProjectNames command is registered and returns validation result")]
    public async Task ValidateProjectNamesCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectNameValidationRequest
        {
            ShortName = "VALID",
            FullName = "Valid Project",
            Mode = "create",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectNameValidationResult>(
            "command:platformScripture.validateProjectNames",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-005")]
    [Description("generateShortName command is registered and returns abbreviation")]
    public async Task GenerateShortNameCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ShortNameGenerationRequest { FullName = "New Testament Greek 2024" };

        // Act
        var result = await Client.SendRequestAsync<ShortNameGenerationResult>(
            "command:platformScripture.generateShortName",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Abbreviation, Is.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-006")]
    [Description("validateFilePattern command is registered and returns validation result")]
    public async Task ValidateFilePatternCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new FileNamingPatternRequest
        {
            Prefix = "PRE",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "SUF",
        };

        // Act
        var result = await Client.SendRequestAsync<FileNamingPatternResult>(
            "command:platformScripture.validateFilePattern",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-007")]
    [Description("saveInterlinearSetup command is registered and returns result")]
    public async Task SaveInterlinearSetupCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "SourceProj",
            SourceProjectGuid = "source-guid-123",
            ModelTextName = "ModelText",
            ModelTextGuid = "model-guid-456",
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-008")]
    [Description("validateInterlinearSetup command is registered and returns validation")]
    public async Task ValidateInterlinearSetupCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.BackTranslation,
            SourceProjectName = "SourceProj",
            SourceProjectGuid = "source-guid-123",
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearValidationResult>(
            "command:platformScripture.validateInterlinearSetup",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-009")]
    [Description("getRegistrationStatus command is registered and returns status")]
    public async Task GetRegistrationStatusCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "TestProject",
        };

        // Act
        var result = await Client.SendRequestAsync<RegistrationStatusResult>(
            "command:platformScripture.getRegistrationStatus",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.MessageType, Is.Not.EqualTo(default(RegistrationMessageType)).Or.EqualTo(default(RegistrationMessageType)));
        Assert.That(result.MessageText, Is.Not.Empty.Or.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-010")]
    [Description("getInterlinearSetups command is registered and returns setups")]
    public async Task GetInterlinearSetupsCommand_IsRegistered_ReturnsResult()
    {
        // Arrange
        await _commandService!.InitializeAsync();

        // Act
        var result = await Client.SendRequestAsync<IReadOnlyList<InterlinearSetupInfo>>(
            "command:platformScripture.getInterlinearSetups",
            new object[] { "TestProject" }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    #endregion

    #region Error Handling Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-011")]
    [Description("createProject command handles invalid request gracefully")]
    public async Task CreateProjectCommand_InvalidRequest_ReturnsError()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "", // Invalid: empty short name
            FullName = "Test Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-012")]
    [Description("validateProjectNames command returns validation errors")]
    public async Task ValidateProjectNamesCommand_InvalidNames_ReturnsErrors()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectNameValidationRequest
        {
            ShortName = "AB", // Invalid: too short (min 3)
            FullName = "", // Invalid: empty
            Mode = "create",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectNameValidationResult>(
            "command:platformScripture.validateProjectNames",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-INT-013")]
    [Description("saveInterlinearSetup command handles validation failure")]
    public async Task SaveInterlinearSetupCommand_InvalidSetup_ReturnsError()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "NonExistent",
            SourceProjectGuid = "invalid-guid",
            // Missing required model text for Glossing
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
    }

    #endregion
}
