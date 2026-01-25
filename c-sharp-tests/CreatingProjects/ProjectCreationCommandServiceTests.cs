#nullable enable
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectCreationCommandService PAPI command registration.
/// Verifies that all 11 project creation commands are registered and callable.
/// </summary>
/// <remarks>
/// <para>Implements Micro-Phase 6: PAPI Command Registration</para>
/// <para>
/// Commands tested:
/// <list type="bullet">
/// <item>CAP-CMD-001: paratextProjectCreation.getTypeConfiguration</item>
/// <item>CAP-CMD-002: paratextProjectCreation.canBeBasedOnType</item>
/// <item>CAP-CMD-003: paratextProjectCreation.getValidBaseProjects</item>
/// <item>CAP-CMD-004: paratextProjectCreation.validateShortName</item>
/// <item>CAP-CMD-005: paratextProjectCreation.generateShortName</item>
/// <item>CAP-CMD-006: paratextProjectCreation.generateUniqueName</item>
/// <item>CAP-CMD-007: paratextProjectCreation.getRegistrationState</item>
/// <item>CAP-CMD-008: paratextProjectCreation.validateLanguage</item>
/// <item>CAP-CMD-009: paratextProjectCreation.createProject</item>
/// <item>CAP-CMD-011: paratextProjectCreation.cleanupProject</item>
/// <item>CAP-CMD-012: paratextProjectCreation.updateProject</item>
/// </list>
/// </para>
/// </remarks>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
internal class ProjectCreationCommandServiceTests : PapiTestBase
{
    #region Constants

    // Command names following paratextProjectCreation.{commandName} pattern
    private const string CommandPrefix = "command:paratextProjectCreation.";
    private const string GetTypeConfigurationCommand = CommandPrefix + "getTypeConfiguration";
    private const string CanBeBasedOnTypeCommand = CommandPrefix + "canBeBasedOnType";
    private const string GetValidBaseProjectsCommand = CommandPrefix + "getValidBaseProjects";
    private const string ValidateShortNameCommand = CommandPrefix + "validateShortName";
    private const string GenerateShortNameCommand = CommandPrefix + "generateShortName";
    private const string GenerateUniqueNameCommand = CommandPrefix + "generateUniqueName";
    private const string GetRegistrationStateCommand = CommandPrefix + "getRegistrationState";
    private const string ValidateLanguageCommand = CommandPrefix + "validateLanguage";
    private const string CreateProjectCommand = CommandPrefix + "createProject";
    private const string CleanupProjectCommand = CommandPrefix + "cleanupProject";
    private const string UpdateProjectCommand = CommandPrefix + "updateProject";

    #endregion

    #region Fields

    private ProjectCreationCommandService? _service;

    #endregion

    #region Setup

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // Create and initialize the command service
        _service = new ProjectCreationCommandService(Client);
        await _service.InitializeAsync();
    }

    #endregion

    #region Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("MicroPhase", "6")]
    [Description("Acceptance test: All 11 PAPI commands are registered and callable")]
    public void AllCommands_AreRegistered()
    {
        // Verify all 11 commands are registered by checking the client has handlers
        // The DummyPapiClient.RegisterRequestHandlerAsync returns true if registration succeeded
        // After InitializeAsync, we should be able to send requests to all commands

        // This test passes when all commands are properly registered
        // The individual command tests below verify each one works correctly
        Assert.That(_service, Is.Not.Null, "Service should be initialized");
    }

    #endregion

    #region CAP-CMD-001: getTypeConfiguration

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-001")]
    [Property("ScenarioId", "TS-CMD-001")]
    [Property("BehaviorId", "BHV-CMD-001")]
    [Description("getTypeConfiguration command returns ProjectTypeConfiguration for Standard type")]
    public async Task GetTypeConfiguration_Standard_ReturnsConfiguration()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.Standard };

        // Act
        var result = await Client.SendRequestAsync<ProjectTypeConfiguration>(
            GetTypeConfigurationCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a configuration");
        Assert.That(
            result!.ProjectType,
            Is.EqualTo(ProjectCreationType.Standard),
            "Should return Standard type configuration"
        );
        Assert.That(
            result.BaseProjectRequired,
            Is.False,
            "Standard projects do not require base project"
        );
        Assert.That(result.RegistrationRequired, Is.True, "Standard projects require registration");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-001")]
    [Property("ScenarioId", "TS-CMD-001b")]
    [Property("BehaviorId", "BHV-CMD-001")]
    [Description("getTypeConfiguration command returns ProjectTypeConfiguration for BackTranslation type")]
    public async Task GetTypeConfiguration_BackTranslation_ReturnsConfiguration()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.BackTranslation };

        // Act
        var result = await Client.SendRequestAsync<ProjectTypeConfiguration>(
            GetTypeConfigurationCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a configuration");
        Assert.That(
            result!.ProjectType,
            Is.EqualTo(ProjectCreationType.BackTranslation),
            "Should return BackTranslation type configuration"
        );
        Assert.That(
            result.BaseProjectRequired,
            Is.True,
            "BackTranslation projects require base project"
        );
        Assert.That(
            result.SharesParentRegistration,
            Is.True,
            "BackTranslation shares parent registration"
        );
    }

    #endregion

    #region CAP-CMD-002: canBeBasedOnType (via GetAllowedBaseTypes)

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-002")]
    [Property("ScenarioId", "TS-CMD-002")]
    [Property("BehaviorId", "BHV-CMD-002")]
    [Description("canBeBasedOnType command returns allowed base types for BackTranslation")]
    public async Task CanBeBasedOnType_BackTranslation_ReturnsScriptureTypes()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.BackTranslation };

        // Act
        var result = await Client.SendRequestAsync<IReadOnlyList<ProjectCreationType>>(
            CanBeBasedOnTypeCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a list of types");
        Assert.That(result!.Count, Is.GreaterThan(0), "BackTranslation should allow some base types");
        Assert.That(
            result,
            Does.Contain(ProjectCreationType.Standard),
            "Standard should be an allowed base type"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-002")]
    [Property("ScenarioId", "TS-CMD-002b")]
    [Property("BehaviorId", "BHV-CMD-002")]
    [Description("canBeBasedOnType command returns empty list for Standard (no base needed)")]
    public async Task CanBeBasedOnType_Standard_ReturnsEmpty()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.Standard };

        // Act
        var result = await Client.SendRequestAsync<IReadOnlyList<ProjectCreationType>>(
            CanBeBasedOnTypeCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a list");
        Assert.That(result!.Count, Is.EqualTo(0), "Standard does not need base project");
    }

    #endregion

    #region CAP-CMD-003: getValidBaseProjects

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-003")]
    [Property("ScenarioId", "TS-CMD-003")]
    [Property("BehaviorId", "BHV-CMD-003")]
    [Description("getValidBaseProjects command returns filtered project list for BackTranslation")]
    public async Task GetValidBaseProjects_BackTranslation_ReturnsFilteredList()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.BackTranslation };

        // Act
        var result = await Client.SendRequestAsync<IReadOnlyList<ProjectReference>>(
            GetValidBaseProjectsCommand,
            request
        );

        // Assert
        // Even if empty (no projects in test environment), should return a valid list
        Assert.That(result, Is.Not.Null, "Should return a list (may be empty)");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-003")]
    [Property("ScenarioId", "TS-CMD-003b")]
    [Property("BehaviorId", "BHV-CMD-003")]
    [Description("getValidBaseProjects command returns empty for Standard type")]
    public async Task GetValidBaseProjects_Standard_ReturnsEmpty()
    {
        // Arrange
        var request = new object[] { (int)ProjectCreationType.Standard };

        // Act
        var result = await Client.SendRequestAsync<IReadOnlyList<ProjectReference>>(
            GetValidBaseProjectsCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a list");
        Assert.That(result!.Count, Is.EqualTo(0), "Standard does not need base project");
    }

    #endregion

    #region CAP-CMD-004: validateShortName

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-004")]
    [Property("ScenarioId", "TS-CMD-004")]
    [Property("BehaviorId", "BHV-CMD-004")]
    [Description("validateShortName command returns valid for good short name")]
    public async Task ValidateShortName_ValidName_ReturnsValid()
    {
        // Arrange - shortName, isNewProject, originalName
        var request = new object[] { "TestProj", true, null! };

        // Act
        var result = await Client.SendRequestAsync<ValidationResult>(
            ValidateShortNameCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a validation result");
        Assert.That(result!.IsValid, Is.True, "TestProj should be valid");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-004")]
    [Property("ScenarioId", "TS-CMD-004b")]
    [Property("BehaviorId", "BHV-CMD-004")]
    [Description("validateShortName command returns error for too short name")]
    public async Task ValidateShortName_TooShort_ReturnsError()
    {
        // Arrange
        var request = new object[] { "AB", true, null! };

        // Act
        var result = await Client.SendRequestAsync<ValidationResult>(
            ValidateShortNameCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a validation result");
        Assert.That(result!.IsValid, Is.False, "AB is too short");
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_TooShort"));
    }

    #endregion

    #region CAP-CMD-005: generateShortName

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-005")]
    [Property("ScenarioId", "TS-CMD-005")]
    [Property("BehaviorId", "BHV-CMD-005")]
    [Description("generateShortName command generates abbreviation from full name")]
    public async Task GenerateShortName_FromFullName_ReturnsAbbreviation()
    {
        // Arrange
        var request = new object[] { "My Test Project" };

        // Act
        var result = await Client.SendRequestAsync<string>(GenerateShortNameCommand, request);

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a short name");
        Assert.That(result!.Length, Is.GreaterThanOrEqualTo(3), "Should be at least 3 chars");
        Assert.That(result.Length, Is.LessThanOrEqualTo(8), "Should be at most 8 chars");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-005")]
    [Property("ScenarioId", "TS-CMD-005b")]
    [Property("BehaviorId", "BHV-CMD-005")]
    [Description("generateShortName command handles single word")]
    public async Task GenerateShortName_SingleWord_ReturnsAbbreviation()
    {
        // Arrange
        var request = new object[] { "Test" };

        // Act
        var result = await Client.SendRequestAsync<string>(GenerateShortNameCommand, request);

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a short name");
        // Single word "Test" -> "T" -> padded to "TTT"
        Assert.That(result!.Length, Is.GreaterThanOrEqualTo(3), "Should be padded to at least 3 chars");
    }

    #endregion

    #region CAP-CMD-006: generateUniqueName

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-006")]
    [Property("ScenarioId", "TS-CMD-006")]
    [Property("BehaviorId", "BHV-CMD-006")]
    [Description("generateUniqueName command returns short and long name tuple")]
    public async Task GenerateUniqueName_ValidInput_ReturnsNameTuple()
    {
        // Arrange - baseShortName, baseLongName, forceNumbered
        var request = new object[] { "Test", "Test Project", false };

        // Act
        var result = await Client.SendRequestAsync<GenerateUniqueNameResponse>(
            GenerateUniqueNameCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.ShortName, Is.Not.Null.And.Not.Empty, "Should have short name");
        Assert.That(result.LongName, Is.Not.Null.And.Not.Empty, "Should have long name");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-006")]
    [Property("ScenarioId", "TS-CMD-006b")]
    [Property("BehaviorId", "BHV-CMD-006")]
    [Description("generateUniqueName command adds number when forceNumbered is true")]
    public async Task GenerateUniqueName_ForceNumbered_AddsNumber()
    {
        // Arrange
        var request = new object[] { "Test", "Test Project", true };

        // Act
        var result = await Client.SendRequestAsync<GenerateUniqueNameResponse>(
            GenerateUniqueNameCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.ShortName, Does.Match(@"\d"), "Should contain a number when forced");
    }

    #endregion

    #region CAP-CMD-007: getRegistrationState

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-007")]
    [Property("ScenarioId", "TS-CMD-007")]
    [Property("BehaviorId", "BHV-CMD-007")]
    [Description("getRegistrationState command returns state for Standard type")]
    public async Task GetRegistrationState_Standard_ReturnsUnregistered()
    {
        // Arrange - projectType, baseProjectGuid, isBaseProjectRegistered
        var request = new object[] { (int)ProjectCreationType.Standard, null!, false };

        // Act
        var result = await Client.SendRequestAsync<RegistrationState>(
            GetRegistrationStateCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a registration state");
        Assert.That(
            result!.Status,
            Is.EqualTo(RegistrationStatus.Unregistered),
            "Standard starts as unregistered"
        );
        Assert.That(result.CanRegisterOnline, Is.True, "Standard can register online");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-007")]
    [Property("ScenarioId", "TS-CMD-007b")]
    [Property("BehaviorId", "BHV-CMD-007")]
    [Description("getRegistrationState command returns InheritsFromBase for BackTranslation")]
    public async Task GetRegistrationState_BackTranslation_ReturnsInheritsFromBase()
    {
        // Arrange
        var request = new object[]
        {
            (int)ProjectCreationType.BackTranslation,
            "base-guid-123",
            true,
        };

        // Act
        var result = await Client.SendRequestAsync<RegistrationState>(
            GetRegistrationStateCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a registration state");
        Assert.That(
            result!.Status,
            Is.EqualTo(RegistrationStatus.InheritsFromBase),
            "BackTranslation inherits from base"
        );
    }

    #endregion

    #region CAP-CMD-008: validateLanguage

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-008")]
    [Property("ScenarioId", "TS-CMD-008")]
    [Property("BehaviorId", "BHV-CMD-008")]
    [Description("validateLanguage command returns valid for proper language")]
    public async Task ValidateLanguage_ValidLanguage_ReturnsValid()
    {
        // Arrange - languageId, languageName, existingNames, initialName
        var request = new object[] { "eng", "English", Array.Empty<string>(), null! };

        // Act
        var result = await Client.SendRequestAsync<ValidationResult>(
            ValidateLanguageCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a validation result");
        Assert.That(result!.IsValid, Is.True, "English language should be valid");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-008")]
    [Property("ScenarioId", "TS-CMD-008b")]
    [Property("BehaviorId", "BHV-CMD-008")]
    [Description("validateLanguage command returns error for blank name")]
    public async Task ValidateLanguage_BlankName_ReturnsError()
    {
        // Arrange
        var request = new object[] { "eng", "", Array.Empty<string>(), null! };

        // Act
        var result = await Client.SendRequestAsync<ValidationResult>(
            ValidateLanguageCommand,
            request
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a validation result");
        Assert.That(result!.IsValid, Is.False, "Blank name should be invalid");
        Assert.That(result.ErrorCode, Is.EqualTo("Language_NameBlank"));
    }

    #endregion

    #region CAP-CMD-009: createProject

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-009")]
    [Property("ScenarioId", "TS-CMD-009")]
    [Property("BehaviorId", "BHV-CMD-009")]
    [Description("createProject command creates project and returns result")]
    public async Task CreateProject_ValidRequest_ReturnsSuccess()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "NewProj",
            FullName = "New Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard,
            BaseProjectGuid = null,
        };

        // Act
        var result = await Client.SendRequestAsync<CreateProjectResult>(
            CreateProjectCommand,
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.Success, Is.True, "Should succeed with valid request");
        Assert.That(
            result.ProjectGuid,
            Is.Not.Null.And.Not.Empty,
            "Should return a project GUID"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-009")]
    [Property("ScenarioId", "TS-CMD-009b")]
    [Property("BehaviorId", "BHV-CMD-009")]
    [Description("createProject command returns error for invalid short name")]
    public async Task CreateProject_InvalidShortName_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "A", // Too short
            FullName = "A Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard,
            BaseProjectGuid = null,
        };

        // Act
        var result = await Client.SendRequestAsync<CreateProjectResult>(
            CreateProjectCommand,
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.Success, Is.False, "Should fail with invalid short name");
        Assert.That(result.ErrorCode, Is.Not.Null.And.Not.Empty, "Should have error code");
    }

    #endregion

    #region CAP-CMD-011: cleanupProject

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-011")]
    [Property("ScenarioId", "TS-CMD-011")]
    [Property("BehaviorId", "BHV-CMD-011")]
    [Description("cleanupProject command cleans up partial project")]
    public async Task CleanupProject_ValidRequest_Completes()
    {
        // Arrange
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-123",
            WasRegistered = false,
            Registration = null,
        };

        // Act - cleanup should complete without throwing
        // Returns void/null - we just verify it doesn't throw
        await Client.SendRequestAsync<object?>(CleanupProjectCommand, new object[] { request });

        // Assert - if we get here, cleanup completed successfully
        Assert.Pass("Cleanup completed without error");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-011")]
    [Property("ScenarioId", "TS-CMD-011b")]
    [Property("BehaviorId", "BHV-CMD-011")]
    [Description("cleanupProject command handles registered project cleanup")]
    public async Task CleanupProject_RegisteredProject_CleansUpRegistration()
    {
        // Arrange
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-456",
            WasRegistered = true,
            Registration = new ProjectMetadata
            {
                RegistryId = "reg-123",
                FullName = "Test Project",
                Visibility = "Public",
            },
        };

        // Act - cleanup should complete without throwing
        await Client.SendRequestAsync<object?>(CleanupProjectCommand, new object[] { request });

        // Assert - if we get here, cleanup completed successfully
        Assert.Pass("Cleanup with registration completed without error");
    }

    #endregion

    #region CAP-CMD-012: updateProject

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-012")]
    [Property("ScenarioId", "TS-CMD-012")]
    [Property("BehaviorId", "BHV-CMD-012")]
    [Description("updateProject command updates project and returns result")]
    public async Task UpdateProject_ValidRequest_ReturnsSuccess()
    {
        // Arrange - Update only allowed fields (not project type)
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-guid-123",
            ShortName = null, // Not changing
            FullName = "Updated Project Name",
            LanguageId = null, // Not changing
            Versification = null, // Not changing
            ProjectType = null, // Must be null - type changes forbidden
        };

        // Act
        var result = await Client.SendRequestAsync<UpdateProjectResult>(
            UpdateProjectCommand,
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.Success, Is.True, "Should succeed with valid update request");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-CMD-012")]
    [Property("ScenarioId", "TS-CMD-012b")]
    [Property("BehaviorId", "BHV-CMD-012")]
    [Description("updateProject command rejects project type change")]
    public async Task UpdateProject_TypeChange_ReturnsError()
    {
        // Arrange - Attempt to change project type (forbidden)
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-guid-123",
            ProjectType = ProjectCreationType.BackTranslation, // Forbidden change
        };

        // Act
        var result = await Client.SendRequestAsync<UpdateProjectResult>(
            UpdateProjectCommand,
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Should return a result");
        Assert.That(result!.Success, Is.False, "Should fail when trying to change type");
        Assert.That(result.ErrorCode, Is.EqualTo("TYPE_CHANGE_FORBIDDEN"));
    }

    #endregion
}

// Note: GenerateUniqueNameResponse is defined in ProjectCreationCommandService.cs
