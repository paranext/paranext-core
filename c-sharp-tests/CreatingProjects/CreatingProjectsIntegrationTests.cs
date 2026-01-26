#nullable enable

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Integration tests for the Creating Projects feature.
/// Tests capability call chains across multiple services (Pass 2: Integration).
///
/// These tests verify that services integrate correctly when used together
/// in realistic workflows.
/// </summary>
/// <remarks>
/// <para>
/// Key integration chains tested:
/// <list type="bullet">
/// <item>Project Creation Flow: Type -> Name Validation -> Defaults -> Creation</item>
/// <item>Derived Project Flow: Type -> Base Projects -> Registration -> Copy</item>
/// <item>Validation Chain: Name -> Language -> Project Creation</item>
/// <item>Registration Flow: Type Configuration -> Registration State</item>
/// </list>
/// </para>
/// <para>
/// These tests use REAL service implementations, not mocks, to verify
/// end-to-end behavior across service boundaries.
/// </para>
/// </remarks>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
internal class CreatingProjectsIntegrationTests : PapiTestBase
{
    #region Test Data

    private static readonly IReadOnlyList<string> EmptyExistingNames = Array.Empty<string>();

    #endregion

    #region Project Creation Flow Integration (Type -> Name -> Defaults -> Create)

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-003 -> CAP-EXT-007 -> CAP-012")]
    [Property("ScenarioId", "INT-001")]
    [Description("Full project creation workflow: type configuration -> name validation -> defaults -> creation")]
    public async Task ProjectCreation_FullWorkflow_TypeToNameToDefaultsToCreate()
    {
        // Step 1: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);
        Assert.That(typeConfig.BaseProjectRequired, Is.False, "Standard type should not require base project");
        Assert.That(typeConfig.RegistrationRequired, Is.True, "Standard type should require registration");

        // Step 2: Validate short name (CAP-EXT-003)
        var shortName = "IntTest";
        var nameValidation = ProjectNameService.ValidateShortName(shortName, isNewProject: true);
        Assert.That(nameValidation.IsValid, Is.True, "Valid short name should pass validation");

        // Step 3: Get defaults with type configuration (CAP-EXT-007)
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(typeConfig.NormalizationDefault));
        Assert.That(defaults.Editable, Is.EqualTo(typeConfig.EditableDefault));

        // Step 4: Create project (CAP-012)
        var createRequest = new CreateProjectRequest
        {
            ShortName = shortName,
            FullName = "Integration Test Project",
            LanguageId = "eng",
            Versification = defaults.Versification,
            ProjectType = ProjectCreationType.Standard
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.True, "Project creation should succeed");
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty, "Project should have GUID");
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-003 -> CAP-012")]
    [Property("ScenarioId", "INT-002")]
    [Description("Project creation fails when name validation fails")]
    public async Task ProjectCreation_NameValidationFails_CreationFails()
    {
        // Step 1: Get type configuration
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);
        Assert.That(typeConfig, Is.Not.Null);

        // Step 2: Validate short name with invalid input
        var shortName = "AB"; // Too short (less than 3 chars)
        var nameValidation = ProjectNameService.ValidateShortName(shortName, isNewProject: true);
        Assert.That(nameValidation.IsValid, Is.False);
        Assert.That(nameValidation.ErrorCode, Is.EqualTo("ShortName_TooShort"));

        // Step 3: Create project with invalid name - should fail
        var createRequest = new CreateProjectRequest
        {
            ShortName = shortName,
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.False, "Project creation should fail with invalid short name");
        Assert.That(result.ErrorCode, Is.Not.Null, "Error code should be set");
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-003 -> CAP-EXT-004 -> CAP-012")]
    [Property("ScenarioId", "INT-003")]
    [Description("Full workflow using generated short name")]
    public async Task ProjectCreation_WithGeneratedShortName_Succeeds()
    {
        // Step 1: Generate short name from full name (CAP-EXT-004)
        var fullName = "My New Translation Project";
        var generatedShortName = ProjectNameService.GenerateShortName(fullName);
        Assert.That(generatedShortName, Is.Not.Null.And.Not.Empty);
        Assert.That(generatedShortName.Length, Is.GreaterThanOrEqualTo(3).And.LessThanOrEqualTo(8));

        // Step 2: Validate the generated name (CAP-EXT-003)
        var nameValidation = ProjectNameService.ValidateShortName(generatedShortName, isNewProject: true);
        Assert.That(nameValidation.IsValid, Is.True, "Generated short name should be valid");

        // Step 3: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Step 4: Create project (CAP-012)
        var createRequest = new CreateProjectRequest
        {
            ShortName = generatedShortName,
            FullName = fullName,
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.True, "Project creation with generated name should succeed");
    }

    #endregion

    #region Derived Project Flow Integration (Type -> Base -> Registration -> Defaults)

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-002 -> CAP-EXT-005 -> CAP-EXT-007")]
    [Property("ScenarioId", "INT-010")]
    [Description("BackTranslation project flow: type config -> allowed base types -> registration -> defaults")]
    public void DerivedProject_BackTranslation_FullConfigurationFlow()
    {
        // Step 1: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.BackTranslation);
        Assert.That(typeConfig.BaseProjectRequired, Is.True, "BackTranslation requires base project");
        Assert.That(typeConfig.SharesParentRegistration, Is.True, "BackTranslation inherits registration");
        Assert.That(typeConfig.BaseProjectFilter, Is.EqualTo("scriptureOnly"));

        // Step 2: Get allowed base types (CAP-EXT-002)
        var allowedBaseTypes = ProjectTypeService.GetAllowedBaseTypes(ProjectCreationType.BackTranslation);
        Assert.That(allowedBaseTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedBaseTypes, Does.Contain(ProjectCreationType.Daughter));
        Assert.That(allowedBaseTypes, Does.Not.Contain(ProjectCreationType.Auxiliary));
        Assert.That(allowedBaseTypes, Does.Not.Contain(ProjectCreationType.ConsultantNotes));

        // Step 3: Get registration state for BackTranslation with registered base (CAP-EXT-005)
        var baseGuid = Guid.NewGuid().ToString();
        var registrationState = RegistrationService.GetRegistrationState(
            ProjectCreationType.BackTranslation,
            baseGuid,
            isBaseProjectRegistered: true
        );
        Assert.That(registrationState.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(registrationState.CanOptOutOfInheritance, Is.True, "BackTranslation can opt out");

        // Step 4: Get defaults with base project (CAP-EXT-007)
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.BackTranslation,
            baseGuid
        );
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseGuid));
        Assert.That(defaults.Normalization, Is.EqualTo(typeConfig.NormalizationDefault));
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-002 -> CAP-EXT-005")]
    [Property("ScenarioId", "INT-011")]
    [Description("Auxiliary project flow: type config -> allowed base types (Standard only) -> registration")]
    public void DerivedProject_Auxiliary_OnlyAllowsStandardBase()
    {
        // Step 1: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Auxiliary);
        Assert.That(typeConfig.BaseProjectRequired, Is.True, "Auxiliary requires base project");
        Assert.That(typeConfig.SharesParentRegistration, Is.True, "Auxiliary inherits registration");
        Assert.That(typeConfig.BaseProjectFilter, Is.EqualTo("standardOnly"));

        // Step 2: Get allowed base types - only Standard (CAP-EXT-002)
        var allowedBaseTypes = ProjectTypeService.GetAllowedBaseTypes(ProjectCreationType.Auxiliary);
        Assert.That(allowedBaseTypes, Has.Count.EqualTo(1));
        Assert.That(allowedBaseTypes, Does.Contain(ProjectCreationType.Standard));

        // Step 3: Get registration state - cannot opt out (CAP-EXT-005)
        var baseGuid = Guid.NewGuid().ToString();
        var registrationState = RegistrationService.GetRegistrationState(
            ProjectCreationType.Auxiliary,
            baseGuid,
            isBaseProjectRegistered: true
        );
        Assert.That(registrationState.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(registrationState.CanOptOutOfInheritance, Is.False, "Auxiliary cannot opt out");
        Assert.That(registrationState.CanRegisterOnline, Is.False, "Auxiliary cannot register online");
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-002 -> CAP-EXT-005 -> CAP-012")]
    [Property("ScenarioId", "INT-012")]
    [Description("Derived project creation fails without base project")]
    public async Task DerivedProject_WithoutBaseProject_CreationFails()
    {
        // Step 1: Get type configuration - confirms base is required (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.BackTranslation);
        Assert.That(typeConfig.BaseProjectRequired, Is.True);

        // Step 2: Attempt to create without base project
        var createRequest = new CreateProjectRequest
        {
            ShortName = "BTTest",
            FullName = "BackTranslation Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.BackTranslation,
            BaseProjectGuid = null // Missing required base
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    #endregion

    #region Validation Chain Integration (Name -> Language -> Create)

    [Test]
    [Property("IntegrationChain", "CAP-EXT-003 -> CAP-EXT-006 -> CAP-012")]
    [Property("ScenarioId", "INT-020")]
    [Description("Full validation chain: name validation -> language validation -> project creation")]
    public async Task ValidationChain_AllValidationsPass_ProjectCreated()
    {
        // Step 1: Validate short name (CAP-EXT-003)
        var shortName = "ValTest";
        var nameResult = ProjectNameService.ValidateShortName(shortName, isNewProject: true);
        Assert.That(nameResult.IsValid, Is.True);

        // Step 2: Validate language selection (CAP-EXT-006)
        var languageResult = LanguageService.ValidateLanguageSelection(
            "eng",
            "English",
            EmptyExistingNames
        );
        Assert.That(languageResult.IsValid, Is.True);

        // Step 3: Create project with validated inputs (CAP-012)
        var createRequest = new CreateProjectRequest
        {
            ShortName = shortName,
            FullName = "Validation Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-003 -> CAP-EXT-006")]
    [Property("ScenarioId", "INT-021")]
    [Description("Windows reserved names rejected by both name and language validators")]
    public void ValidationChain_ReservedNames_RejectedByBothValidators()
    {
        // Test Windows reserved name rejected by both validators
        var reservedName = "CON";

        // Name validator rejects (CAP-EXT-003)
        var nameResult = ProjectNameService.ValidateShortName(reservedName, isNewProject: true);
        Assert.That(nameResult.IsValid, Is.False);
        Assert.That(nameResult.ErrorCode, Is.EqualTo("ShortName_Reserved"));

        // Language validator also rejects if used as language ID (CAP-EXT-006)
        var languageResult = LanguageService.ValidateLanguageSelection(
            reservedName,
            "Test Language",
            EmptyExistingNames
        );
        Assert.That(languageResult.IsValid, Is.False);
        Assert.That(languageResult.ErrorCode, Is.EqualTo("Language_ReservedName"));
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-006 -> CAP-011")]
    [Property("ScenarioId", "INT-022")]
    [Description("Language selection flow: search available -> validate selection")]
    public void LanguageFlow_SearchAndValidateSelection()
    {
        // Step 1: Search available languages (CAP-011)
        var allLanguages = LanguageService.GetAvailableLanguages();
        Assert.That(allLanguages, Is.Not.Empty);

        // Step 2: Filter by search query
        var filteredLanguages = LanguageService.GetAvailableLanguages("eng");
        Assert.That(filteredLanguages.Count, Is.LessThanOrEqualTo(allLanguages.Count));

        // Step 3: Validate the selection (CAP-EXT-006)
        if (filteredLanguages.Count > 0)
        {
            var selectedLanguage = filteredLanguages[0];
            var validationResult = LanguageService.ValidateLanguageSelection(
                selectedLanguage.LanguageId,
                selectedLanguage.LanguageName,
                EmptyExistingNames
            );
            Assert.That(validationResult.IsValid, Is.True);
        }
    }

    #endregion

    #region Registration Flow Integration (Type -> Registration -> Server Check)

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-005 -> CAP-008 -> CAP-009")]
    [Property("ScenarioId", "INT-030")]
    [Description("Registration flow for Standard project: type config -> registration state -> server check -> initiate")]
    public void RegistrationFlow_StandardProject_CanInitiateRegistration()
    {
        // Step 1: Get type configuration - Standard requires registration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);
        Assert.That(typeConfig.RegistrationRequired, Is.True);
        Assert.That(typeConfig.SharesParentRegistration, Is.False);

        // Step 2: Get registration state (CAP-EXT-005)
        var registrationState = RegistrationService.GetRegistrationState(ProjectCreationType.Standard);
        Assert.That(registrationState.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(registrationState.CanRegisterOnline, Is.True);

        // Step 3: Check if registration server is available (CAP-008)
        var serverAvailable = RegistrationService.IsRegistryServerAvailable();
        Assert.That(serverAvailable, Is.TypeOf<bool>());

        // Step 4: If available, initiate registration (CAP-009)
        var projectGuid = Guid.NewGuid().ToString();
        var registrationUrl = RegistrationService.InitiateOnlineRegistration(projectGuid);
        Assert.That(registrationUrl, Does.StartWith("http"));
        Assert.That(registrationUrl, Does.Contain(projectGuid));
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-005")]
    [Property("ScenarioId", "INT-031")]
    [Description("Registration flow for ConsultantNotes: registration not applicable")]
    public void RegistrationFlow_ConsultantNotes_NotApplicable()
    {
        // Step 1: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.ConsultantNotes);
        Assert.That(typeConfig.RegistrationRequired, Is.False);
        Assert.That(typeConfig.SharesParentRegistration, Is.False);

        // Step 2: Get registration state - should be NotApplicable (CAP-EXT-005)
        var registrationState = RegistrationService.GetRegistrationState(
            ProjectCreationType.ConsultantNotes
        );
        Assert.That(registrationState.Status, Is.EqualTo(RegistrationStatus.NotApplicable));
        Assert.That(registrationState.CanRegisterOnline, Is.False);
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-005")]
    [Property("ScenarioId", "INT-032")]
    [Description("Registration flow for Transliteration: inherits from base, cannot opt out")]
    public void RegistrationFlow_Transliteration_InheritsNoOptOut()
    {
        // Step 1: Get type configuration (CAP-EXT-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationManual
        );
        Assert.That(typeConfig.RegistrationRequired, Is.False);
        Assert.That(typeConfig.SharesParentRegistration, Is.True);

        // Step 2: Get registration state - inherits but cannot opt out (CAP-EXT-005)
        var baseGuid = Guid.NewGuid().ToString();
        var registrationState = RegistrationService.GetRegistrationState(
            ProjectCreationType.TransliterationManual,
            baseGuid,
            isBaseProjectRegistered: true
        );
        Assert.That(registrationState.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(registrationState.CanOptOutOfInheritance, Is.False);
        Assert.That(registrationState.CanRegisterOnline, Is.False);
    }

    #endregion

    #region Unique Name Generation Integration (Generate -> Validate -> Create)

    [Test]
    [Property("IntegrationChain", "CAP-EXT-004 -> CAP-EXT-008 -> CAP-EXT-003 -> CAP-012")]
    [Property("ScenarioId", "INT-040")]
    [Description("Unique name flow: generate short -> generate unique -> validate -> create")]
    public async Task UniqueNameFlow_GenerateAndValidateAndCreate()
    {
        // Step 1: Generate short name from full name (CAP-EXT-004)
        var fullName = "Test Project for Integration";
        var shortName = ProjectNameService.GenerateShortName(fullName);
        Assert.That(shortName, Is.Not.Null.And.Not.Empty);

        // Step 2: Generate unique name (CAP-EXT-008)
        var (uniqueShort, uniqueLong) = ProjectNameService.GenerateUniqueName(
            shortName,
            fullName,
            forceNumbered: false
        );
        Assert.That(uniqueShort, Is.Not.Null.And.Not.Empty);
        Assert.That(uniqueLong, Is.Not.Null.And.Not.Empty);

        // Step 3: Validate the unique name (CAP-EXT-003)
        var validation = ProjectNameService.ValidateShortName(uniqueShort, isNewProject: true);
        Assert.That(validation.IsValid, Is.True);

        // Step 4: Create project with unique name (CAP-012)
        var createRequest = new CreateProjectRequest
        {
            ShortName = uniqueShort,
            FullName = uniqueLong,
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-004 -> CAP-EXT-008")]
    [Property("ScenarioId", "INT-041")]
    [Description("Force numbered unique name generation")]
    public void UniqueNameFlow_ForceNumbered_AppendsNumber()
    {
        // Step 1: Generate short name (CAP-EXT-004)
        var fullName = "Numbered Project";
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Step 2: Generate with forceNumbered (CAP-EXT-008)
        var (uniqueShort, uniqueLong) = ProjectNameService.GenerateUniqueName(
            shortName,
            fullName,
            forceNumbered: true
        );

        // Should have number appended
        Assert.That(uniqueShort, Does.Match(@"\d"));
        Assert.That(uniqueLong, Does.Match(@"\d"));
    }

    #endregion

    #region Type Configuration Consistency Tests

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-007")]
    [Property("ScenarioId", "INT-050")]
    [Description("Type configuration and defaults are consistent for all project types")]
    public void TypeConfigAndDefaults_AllTypes_AreConsistent()
    {
        var projectTypes = new[]
        {
            ProjectCreationType.Standard,
            ProjectCreationType.BackTranslation,
            ProjectCreationType.Daughter,
            ProjectCreationType.Auxiliary,
            ProjectCreationType.StudyBibleAdditions,
            ProjectCreationType.ConsultantNotes,
            ProjectCreationType.TransliterationManual,
            ProjectCreationType.TransliterationWithEncoder,
        };

        foreach (var projectType in projectTypes)
        {
            // Get type configuration (CAP-EXT-001)
            var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);

            // Get defaults (CAP-EXT-007)
            var defaults = ProjectDefaultsService.GetDefaultSettings(projectType);

            // Verify consistency
            Assert.That(
                defaults.Normalization,
                Is.EqualTo(typeConfig.NormalizationDefault),
                $"Normalization mismatch for {projectType}"
            );
            Assert.That(
                defaults.Editable,
                Is.EqualTo(typeConfig.EditableDefault),
                $"Editable mismatch for {projectType}"
            );
        }
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-002")]
    [Property("ScenarioId", "INT-051")]
    [Description("Base project requirements are consistent between config and filter")]
    public void BaseProjectConfig_AllTypes_FilterMatchesRequirement()
    {
        var derivedTypes = new[]
        {
            ProjectCreationType.BackTranslation,
            ProjectCreationType.Daughter,
            ProjectCreationType.Auxiliary,
            ProjectCreationType.StudyBibleAdditions,
            ProjectCreationType.TransliterationManual,
            ProjectCreationType.TransliterationWithEncoder,
        };

        foreach (var projectType in derivedTypes)
        {
            // Get type configuration (CAP-EXT-001)
            var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);

            // Get allowed base types (CAP-EXT-002)
            var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(projectType);

            // If base is required, allowed types should not be empty
            if (typeConfig.BaseProjectRequired)
            {
                Assert.That(
                    allowedTypes,
                    Is.Not.Empty,
                    $"Type {projectType} requires base but has no allowed base types"
                );
                Assert.That(
                    typeConfig.BaseProjectFilter,
                    Is.Not.Null,
                    $"Type {projectType} requires base but has no filter"
                );
            }
        }
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-005")]
    [Property("ScenarioId", "INT-052")]
    [Description("Registration settings are consistent between config and state")]
    public void RegistrationConfig_AllTypes_StateMatchesConfig()
    {
        var testCases = new[]
        {
            (Type: ProjectCreationType.Standard, ExpectsOwn: true, Shares: false),
            (Type: ProjectCreationType.Daughter, ExpectsOwn: true, Shares: false),
            (Type: ProjectCreationType.BackTranslation, ExpectsOwn: false, Shares: true),
            (Type: ProjectCreationType.Auxiliary, ExpectsOwn: false, Shares: true),
            (Type: ProjectCreationType.ConsultantNotes, ExpectsOwn: false, Shares: false),
        };

        foreach (var testCase in testCases)
        {
            // Get type configuration (CAP-EXT-001)
            var typeConfig = ProjectTypeService.GetTypeConfiguration(testCase.Type);
            Assert.That(
                typeConfig.RegistrationRequired,
                Is.EqualTo(testCase.ExpectsOwn),
                $"RegistrationRequired mismatch for {testCase.Type}"
            );
            Assert.That(
                typeConfig.SharesParentRegistration,
                Is.EqualTo(testCase.Shares),
                $"SharesParentRegistration mismatch for {testCase.Type}"
            );
        }
    }

    #endregion

    #region Error Propagation Integration Tests

    [Test]
    [Property("IntegrationChain", "CAP-EXT-003 -> CAP-012")]
    [Property("ScenarioId", "INT-060")]
    [Description("Name validation errors propagate to project creation")]
    public async Task ErrorPropagation_InvalidName_PropagatesCorrectly()
    {
        // Various invalid names and expected behaviors
        var invalidCases = new[]
        {
            ("AB", "ShortName_TooShort"),
            ("Test@Name", "ShortName_InvalidChar"),
            ("Test Name", "ShortName_HasSpace"),
            ("CON", "ShortName_Reserved"),
            ("TOOLONGNAME", "ShortName_TooLong"),
        };

        foreach (var (invalidName, expectedError) in invalidCases)
        {
            // Validate name first
            var nameResult = ProjectNameService.ValidateShortName(invalidName, isNewProject: true);
            Assert.That(nameResult.IsValid, Is.False, $"Name '{invalidName}' should be invalid");
            Assert.That(
                nameResult.ErrorCode,
                Is.EqualTo(expectedError),
                $"Wrong error code for '{invalidName}'"
            );

            // Try to create project - should also fail
            var createRequest = new CreateProjectRequest
            {
                ShortName = invalidName,
                FullName = "Test Project",
                LanguageId = "eng",
                Versification = VersificationType.English,
                ProjectType = ProjectCreationType.Standard
            };

            var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
            Assert.That(
                result.Success,
                Is.False,
                $"Project creation with name '{invalidName}' should fail"
            );
        }
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-012")]
    [Property("ScenarioId", "INT-061")]
    [Description("Base project requirement errors propagate correctly")]
    public async Task ErrorPropagation_MissingBase_PropagatesCorrectly()
    {
        var derivedTypes = new[]
        {
            ProjectCreationType.BackTranslation,
            ProjectCreationType.Daughter,
            ProjectCreationType.Auxiliary,
            ProjectCreationType.TransliterationManual,
        };

        foreach (var projectType in derivedTypes)
        {
            // Verify type requires base
            var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);
            Assert.That(
                typeConfig.BaseProjectRequired,
                Is.True,
                $"{projectType} should require base"
            );

            // Try to create without base
            var createRequest = new CreateProjectRequest
            {
                ShortName = "Test",
                FullName = "Test Project",
                LanguageId = "eng",
                Versification = VersificationType.English,
                ProjectType = projectType,
                BaseProjectGuid = null // Missing
            };

            var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
            Assert.That(result.Success, Is.False, $"Creating {projectType} without base should fail");
        }
    }

    #endregion

    #region Normalization Flow Integration Tests

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-007")]
    [Property("ScenarioId", "INT-070")]
    [Description("Transliteration types use NFD normalization consistently")]
    public void NormalizationFlow_Transliteration_UsesNFD()
    {
        var transliterationTypes = new[]
        {
            ProjectCreationType.TransliterationManual,
            ProjectCreationType.TransliterationWithEncoder,
        };

        foreach (var projectType in transliterationTypes)
        {
            // Get type configuration (CAP-EXT-001)
            var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);
            Assert.That(
                typeConfig.NormalizationDefault,
                Is.EqualTo(ProjectNormalization.NFD),
                $"{projectType} should default to NFD"
            );

            // Get defaults (CAP-EXT-007)
            var baseGuid = Guid.NewGuid().ToString();
            var defaults = ProjectDefaultsService.GetDefaultSettings(projectType, baseGuid);
            Assert.That(
                defaults.Normalization,
                Is.EqualTo(ProjectNormalization.NFD),
                $"{projectType} defaults should be NFD"
            );
        }
    }

    [Test]
    [Property("IntegrationChain", "CAP-EXT-001 -> CAP-EXT-007")]
    [Property("ScenarioId", "INT-071")]
    [Description("Non-transliteration types use NFC normalization consistently")]
    public void NormalizationFlow_NonTransliteration_UsesNFC()
    {
        var nfcTypes = new[]
        {
            ProjectCreationType.Standard,
            ProjectCreationType.BackTranslation,
            ProjectCreationType.Daughter,
            ProjectCreationType.Auxiliary,
            ProjectCreationType.ConsultantNotes,
            ProjectCreationType.StudyBibleAdditions,
        };

        foreach (var projectType in nfcTypes)
        {
            // Get type configuration (CAP-EXT-001)
            var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);
            Assert.That(
                typeConfig.NormalizationDefault,
                Is.EqualTo(ProjectNormalization.NFC),
                $"{projectType} should default to NFC"
            );

            // Get defaults (CAP-EXT-007)
            var defaults = ProjectDefaultsService.GetDefaultSettings(projectType);
            Assert.That(
                defaults.Normalization,
                Is.EqualTo(ProjectNormalization.NFC),
                $"{projectType} defaults should be NFC"
            );
        }
    }

    #endregion
}
