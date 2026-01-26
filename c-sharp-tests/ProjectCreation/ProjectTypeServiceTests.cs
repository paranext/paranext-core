using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectTypeService covering CAP-001, CAP-002, CAP-003.
/// These tests verify the project type configuration state machine and base project filtering rules.
///
/// NOTE: These tests use string-based type identifiers to avoid compilation issues with
/// Paratext.Data's PtxUtils.Enum wrapper. The actual implementation will convert as needed.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectTypeServiceTests
{
    #region CAP-001: GetTypeConfiguration - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-001: GetTypeConfiguration.
    /// Given a project type identifier, returns a complete ProjectTypeConfiguration record
    /// with all properties correctly set per the type-specific rules.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Acceptance test: GetTypeConfiguration returns complete configuration for any valid project type")]
    public void GetTypeConfiguration_AcceptanceTest()
    {
        // This test passes when the capability is COMPLETE
        // It calls the public API and verifies the expected outcome for Standard type

        // Act - Call the service method that will be implemented
        var config = ProjectTypeService.GetTypeConfiguration("Standard");

        // Assert - Verify all properties are correctly set
        Assert.That(config, Is.Not.Null, "Configuration should not be null");
        Assert.That(config.ProjectType, Is.EqualTo("Standard"), "ProjectType should match input");
        Assert.That(config.BaseProjectRequired, Is.False, "Standard does not require base project");
        Assert.That(config.EditableDefault, Is.True, "Default editable should be true");
        Assert.That(config.RegistrationRequired, Is.True, "Standard requires registration");
        Assert.That(config.SharesParentRegistration, Is.False, "Standard does not share parent registration");
        Assert.That(config.BooksTabVisible, Is.True, "Books tab should be visible");
        Assert.That(config.EncodingConverterRequired, Is.False, "Encoding converter not required");
        Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"), "Default normalization is NFC");
        Assert.That(config.IsDerivedType, Is.False, "Standard is not derived");
        Assert.That(config.IsScripture, Is.True, "Standard contains Scripture");
        Assert.That(config.AllowedBaseTypes, Is.Empty, "Standard has no allowed base types");
    }

    #endregion

    #region CAP-001: GetTypeConfiguration - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Standard project type returns correct configuration")]
    public void GetTypeConfiguration_Standard_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("Standard");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("Standard"));
            Assert.That(config.BaseProjectRequired, Is.False);
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.True);
            Assert.That(config.SharesParentRegistration, Is.False);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.False);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-002")]
    [Description("BackTranslation project type returns correct configuration")]
    public void GetTypeConfiguration_BackTranslation_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("BackTranslation");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("BackTranslation"));
            Assert.That(config.BaseProjectRequired, Is.True, "BackTranslation requires base project");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.False, "BackTranslation inherits registration");
            Assert.That(config.SharesParentRegistration, Is.True);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Daughter project type returns correct configuration")]
    public void GetTypeConfiguration_Daughter_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("Daughter");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("Daughter"));
            Assert.That(config.BaseProjectRequired, Is.True, "Daughter requires base project");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.True, "Daughter needs its own registration");
            Assert.That(config.SharesParentRegistration, Is.False);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-002")]
    [Description("StudyBibleAdditions project type returns correct configuration")]
    public void GetTypeConfiguration_StudyBibleAdditions_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("StudyBibleAdditions");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("StudyBibleAdditions"));
            Assert.That(config.BaseProjectRequired, Is.True, "StudyBibleAdditions requires base project");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.True, "StudyBibleAdditions needs own registration");
            Assert.That(config.SharesParentRegistration, Is.False);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Auxiliary project type returns correct configuration")]
    public void GetTypeConfiguration_Auxiliary_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("Auxiliary");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("Auxiliary"));
            Assert.That(config.BaseProjectRequired, Is.True, "Auxiliary requires base project");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.False, "Auxiliary shares parent registration");
            Assert.That(config.SharesParentRegistration, Is.True);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.False, "Auxiliary is NOT Scripture");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-002")]
    [Description("ConsultantNotes project type returns correct configuration")]
    public void GetTypeConfiguration_ConsultantNotes_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("ConsultantNotes");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("ConsultantNotes"));
            Assert.That(config.BaseProjectRequired, Is.False, "ConsultantNotes does not require base");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFC"));
            Assert.That(config.RegistrationRequired, Is.False, "ConsultantNotes is not registered");
            Assert.That(config.SharesParentRegistration, Is.False);
            Assert.That(config.BooksTabVisible, Is.False, "Books tab hidden for ConsultantNotes");
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.False);
            Assert.That(config.IsScripture, Is.False, "ConsultantNotes is NOT Scripture");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TransliterationManual project type returns correct configuration with NFD normalization")]
    public void GetTypeConfiguration_TransliterationManual_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("TransliterationManual");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("TransliterationManual"));
            Assert.That(config.BaseProjectRequired, Is.True, "TransliterationManual requires base");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFD"), "Transliteration uses NFD");
            Assert.That(config.RegistrationRequired, Is.False, "TransliterationManual shares parent");
            Assert.That(config.SharesParentRegistration, Is.True);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TransliterationWithEncoder project type returns correct configuration with encoder required")]
    public void GetTypeConfiguration_TransliterationWithEncoder_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("TransliterationWithEncoder");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("TransliterationWithEncoder"));
            Assert.That(config.BaseProjectRequired, Is.True, "TransliterationWithEncoder requires base");
            Assert.That(config.EditableDefault, Is.True);
            Assert.That(config.NormalizationDefault, Is.EqualTo("NFD"), "Transliteration uses NFD");
            Assert.That(config.RegistrationRequired, Is.False, "TransliterationWithEncoder shares parent");
            Assert.That(config.SharesParentRegistration, Is.True);
            Assert.That(config.BooksTabVisible, Is.True);
            Assert.That(config.EncodingConverterRequired, Is.True, "Encoder is required");
            Assert.That(config.IsDerivedType, Is.True);
            Assert.That(config.IsScripture, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-027")]
    [Description("NotSelected project type returns default/empty configuration")]
    public void GetTypeConfiguration_NotSelected_ReturnsDefaultConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration("NotSelected");

        Assert.Multiple(() =>
        {
            Assert.That(config.ProjectType, Is.EqualTo("NotSelected"));
            Assert.That(config.BaseProjectRequired, Is.False);
            Assert.That(config.RegistrationRequired, Is.False);
            Assert.That(config.IsDerivedType, Is.False);
            Assert.That(config.IsScripture, Is.False);
        });
    }

    #endregion

    #region CAP-001: GetTypeConfiguration - Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-002")]
    [TestCase("Standard", false, true, false, false, true, false)]
    [TestCase("BackTranslation", true, false, true, true, true, false)]
    [TestCase("Daughter", true, true, false, true, true, false)]
    [TestCase("StudyBibleAdditions", true, true, false, true, true, false)]
    [TestCase("Auxiliary", true, false, true, true, false, false)]
    [TestCase("ConsultantNotes", false, false, false, false, false, false)]
    [TestCase("TransliterationManual", true, false, true, true, true, false)]
    [TestCase("TransliterationWithEncoder", true, false, true, true, true, true)]
    [Description("Configuration matches golden master expectations (gm-001)")]
    public void GetTypeConfiguration_MatchesGoldenMaster(
        string projectType,
        bool baseRequired,
        bool registrationRequired,
        bool sharesParent,
        bool isDerived,
        bool isScripture,
        bool encoderRequired)
    {
        var config = ProjectTypeService.GetTypeConfiguration(projectType);

        Assert.Multiple(() =>
        {
            Assert.That(config.BaseProjectRequired, Is.EqualTo(baseRequired),
                $"BaseProjectRequired mismatch for {projectType}");
            Assert.That(config.RegistrationRequired, Is.EqualTo(registrationRequired),
                $"RegistrationRequired mismatch for {projectType}");
            Assert.That(config.SharesParentRegistration, Is.EqualTo(sharesParent),
                $"SharesParentRegistration mismatch for {projectType}");
            Assert.That(config.IsDerivedType, Is.EqualTo(isDerived),
                $"IsDerivedType mismatch for {projectType}");
            Assert.That(config.IsScripture, Is.EqualTo(isScripture),
                $"IsScripture mismatch for {projectType}");
            Assert.That(config.EncodingConverterRequired, Is.EqualTo(encoderRequired),
                $"EncodingConverterRequired mismatch for {projectType}");
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-002")]
    [TestCase("TransliterationManual", "NFD")]
    [TestCase("TransliterationWithEncoder", "NFD")]
    [TestCase("Standard", "NFC")]
    [TestCase("BackTranslation", "NFC")]
    [Description("Normalization default matches golden master (NFD for transliteration, NFC otherwise)")]
    public void GetTypeConfiguration_NormalizationDefault_MatchesGoldenMaster(
        string projectType,
        string expectedNormalization)
    {
        var config = ProjectTypeService.GetTypeConfiguration(projectType);

        Assert.That(config.NormalizationDefault, Is.EqualTo(expectedNormalization),
            $"Normalization default mismatch for {projectType}");
    }

    #endregion

    #region CAP-002: CanBeBasedOnType - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-002: CanBeBasedOnType.
    /// Given a creating project type and a candidate project GUID, returns true only if
    /// the candidate project type is in the allowed list for the creating type.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Acceptance test: CanBeBasedOnType correctly filters base projects")]
    public void CanBeBasedOnType_AcceptanceTest()
    {
        // Setup: Create a Standard project that could be used as a base
        var standardProjectGuid = "test-standard-guid-001";

        // Mock the project lookup to return a Standard type project
        // Note: The actual implementation will need to lookup the project

        // Act & Assert - BackTranslation can be based on Standard (scripture type)
        var result = ProjectTypeService.CanBeBasedOnType(
            "BackTranslation",
            standardProjectGuid);

        Assert.That(result, Is.True,
            "BackTranslation should be able to use Standard as base");
    }

    #endregion

    #region CAP-002: CanBeBasedOnType - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation can be based on Standard (scripture type)")]
    public void CanBeBasedOnType_BackTranslation_CanUseStandard()
    {
        // Arrange - Standard project GUID
        var candidateGuid = "standard-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "BackTranslation",
            candidateGuid);

        // Assert
        Assert.That(result, Is.True, "BackTranslation can be based on Standard");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Auxiliary can only be based on Standard")]
    public void CanBeBasedOnType_Auxiliary_RequiresStandard()
    {
        // Arrange - Standard project GUID
        var standardGuid = "standard-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "Auxiliary",
            standardGuid);

        // Assert
        Assert.That(result, Is.True, "Auxiliary can be based on Standard");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Auxiliary cannot be based on BackTranslation")]
    public void CanBeBasedOnType_Auxiliary_CannotUseBackTranslation()
    {
        // Arrange - BackTranslation project GUID
        var btGuid = "backtranslation-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "Auxiliary",
            btGuid);

        // Assert
        Assert.That(result, Is.False, "Auxiliary cannot be based on BackTranslation");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-028")]
    [Description("StudyBibleAdditions cannot be based on StudyBible")]
    public void CanBeBasedOnType_StudyBibleAdditions_CannotUseStudyBible()
    {
        // Arrange - StudyBible project GUID
        var sbGuid = "studybible-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "StudyBibleAdditions",
            sbGuid);

        // Assert
        Assert.That(result, Is.False, "StudyBibleAdditions cannot be based on StudyBible");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-028")]
    [Description("StudyBibleAdditions cannot be based on itself (another StudyBibleAdditions)")]
    public void CanBeBasedOnType_StudyBibleAdditions_CannotUseStudyBibleAdditions()
    {
        // Arrange - Another StudyBibleAdditions project GUID
        var sbaGuid = "studybibleadditions-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "StudyBibleAdditions",
            sbaGuid);

        // Assert
        Assert.That(result, Is.False, "StudyBibleAdditions cannot be based on StudyBibleAdditions");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation cannot be based on Auxiliary (non-scripture)")]
    public void CanBeBasedOnType_BackTranslation_CannotUseAuxiliary()
    {
        // Arrange - Auxiliary project GUID
        var auxGuid = "auxiliary-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "BackTranslation",
            auxGuid);

        // Assert
        Assert.That(result, Is.False, "BackTranslation cannot be based on Auxiliary (non-scripture)");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation cannot be based on ConsultantNotes")]
    public void CanBeBasedOnType_BackTranslation_CannotUseConsultantNotes()
    {
        // Arrange - ConsultantNotes project GUID
        var cnGuid = "consultantnotes-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "BackTranslation",
            cnGuid);

        // Assert
        Assert.That(result, Is.False, "BackTranslation cannot be based on ConsultantNotes");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Daughter can be based on another Daughter (scripture type)")]
    public void CanBeBasedOnType_Daughter_CanUseDaughter()
    {
        // Arrange - Another Daughter project GUID
        var daughterGuid = "daughter-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "Daughter",
            daughterGuid);

        // Assert
        Assert.That(result, Is.True, "Daughter can be based on another Daughter");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-028")]
    [Description("TransliterationManual can be based on Standard (scripture type)")]
    public void CanBeBasedOnType_TransliterationManual_CanUseStandard()
    {
        // Arrange - Standard project GUID
        var standardGuid = "standard-project-guid";

        // Act
        var result = ProjectTypeService.CanBeBasedOnType(
            "TransliterationManual",
            standardGuid);

        // Assert
        Assert.That(result, Is.True, "TransliterationManual can be based on Standard");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Standard does not require base project")]
    public void CanBeBasedOnType_Standard_DoesNotNeedBase()
    {
        // Standard projects don't need a base, so this should return false
        // since Standard cannot have a base project at all
        var anyGuid = "any-project-guid";

        var result = ProjectTypeService.CanBeBasedOnType(
            "Standard",
            anyGuid);

        Assert.That(result, Is.False, "Standard does not use base projects");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-028")]
    [Description("ConsultantNotes does not require base project")]
    public void CanBeBasedOnType_ConsultantNotes_DoesNotNeedBase()
    {
        var anyGuid = "any-project-guid";

        var result = ProjectTypeService.CanBeBasedOnType(
            "ConsultantNotes",
            anyGuid);

        Assert.That(result, Is.False, "ConsultantNotes does not use base projects");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Returns false when candidate project does not exist")]
    public void CanBeBasedOnType_NonExistentProject_ReturnsFalse()
    {
        var nonExistentGuid = "non-existent-guid-12345";

        var result = ProjectTypeService.CanBeBasedOnType(
            "BackTranslation",
            nonExistentGuid);

        Assert.That(result, Is.False, "Non-existent project cannot be used as base");
    }

    #endregion

    #region CAP-002: CanBeBasedOnType - Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation allowed base types match golden master (gm-002)")]
    public void CanBeBasedOnType_BackTranslation_AllowedTypes_MatchGoldenMaster()
    {
        // From gm-002: BackTranslation allowed: Standard, BackTranslation, Daughter, StudyBibleAdditions, TransliterationManual
        var config = ProjectTypeService.GetTypeConfiguration("BackTranslation");

        Assert.Multiple(() =>
        {
            Assert.That(config.AllowedBaseTypes, Does.Contain("Standard"));
            Assert.That(config.AllowedBaseTypes, Does.Contain("BackTranslation"));
            Assert.That(config.AllowedBaseTypes, Does.Contain("Daughter"));
            Assert.That(config.AllowedBaseTypes, Does.Contain("StudyBibleAdditions"));
            Assert.That(config.AllowedBaseTypes, Does.Contain("TransliterationManual"));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("Auxiliary"));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("ConsultantNotes"));
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Auxiliary allowed base types match golden master - Standard only (gm-002)")]
    public void CanBeBasedOnType_Auxiliary_AllowedTypes_MatchGoldenMaster()
    {
        // From gm-002: Auxiliary allowed: Standard ONLY
        var config = ProjectTypeService.GetTypeConfiguration("Auxiliary");

        Assert.Multiple(() =>
        {
            Assert.That(config.AllowedBaseTypes, Does.Contain("Standard"));
            Assert.That(config.AllowedBaseTypes.Count, Is.EqualTo(1),
                "Auxiliary should only allow Standard as base");
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-028")]
    [Description("StudyBibleAdditions excluded types match golden master (gm-002)")]
    public void CanBeBasedOnType_StudyBibleAdditions_ExcludedTypes_MatchGoldenMaster()
    {
        // From gm-002: StudyBibleAdditions excluded: StudyBible, StudyBibleAdditions, ConsultantNotes, Resource
        var config = ProjectTypeService.GetTypeConfiguration("StudyBibleAdditions");

        Assert.Multiple(() =>
        {
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("StudyBible"));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("StudyBibleAdditions"));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("ConsultantNotes"));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain("Resource"));
        });
    }

    #endregion

    #region CAP-003: GetValidBaseProjects - Acceptance Test (Outside-In)

    /// <summary>
    /// Acceptance test for CAP-003: GetValidBaseProjects.
    /// Given a creating project type, returns a list of ProjectReference objects for all
    /// existing projects that satisfy CanBeBasedOnType.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Acceptance test: GetValidBaseProjects returns filtered list of valid base projects")]
    public void GetValidBaseProjects_AcceptanceTest()
    {
        // Act - Call the public API
        var validProjects = ProjectTypeService.GetValidBaseProjects("BackTranslation");

        // Assert - Verify we get a list (content depends on test setup)
        Assert.That(validProjects, Is.Not.Null, "Should return a list (even if empty)");
        Assert.That(validProjects, Is.InstanceOf<IReadOnlyList<ProjectReference>>(),
            "Should return list of ProjectReference");
    }

    #endregion

    #region CAP-003: GetValidBaseProjects - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects returns only scripture projects for BackTranslation")]
    public void GetValidBaseProjects_BackTranslation_ReturnsOnlyScriptureProjects()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("BackTranslation");

        // Assert - All returned projects should be scripture types
        foreach (var project in validProjects)
        {
            Assert.That(project.IsScripture, Is.True,
                $"Project {project.ShortName} should be scripture type");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects returns only Standard projects for Auxiliary")]
    public void GetValidBaseProjects_Auxiliary_ReturnsOnlyStandardProjects()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("Auxiliary");

        // Assert - All returned projects should be Standard type
        foreach (var project in validProjects)
        {
            Assert.That(project.ProjectType, Is.EqualTo("Standard"),
                $"Project {project.ShortName} should be Standard type");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects returns empty list for Standard (no base required)")]
    public void GetValidBaseProjects_Standard_ReturnsEmptyList()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("Standard");

        // Assert - Standard doesn't need base, should return empty
        Assert.That(validProjects, Is.Empty, "Standard does not have valid base projects");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects returns empty list for ConsultantNotes (no base required)")]
    public void GetValidBaseProjects_ConsultantNotes_ReturnsEmptyList()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("ConsultantNotes");

        // Assert
        Assert.That(validProjects, Is.Empty, "ConsultantNotes does not have valid base projects");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects for StudyBibleAdditions excludes StudyBible projects")]
    public void GetValidBaseProjects_StudyBibleAdditions_ExcludesStudyBible()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("StudyBibleAdditions");

        // Assert - No StudyBible or StudyBibleAdditions projects should be included
        foreach (var project in validProjects)
        {
            Assert.That(project.ProjectType, Is.Not.EqualTo("StudyBible"),
                $"StudyBible should not be in valid base projects");
            Assert.That(project.ProjectType, Is.Not.EqualTo("StudyBibleAdditions"),
                $"StudyBibleAdditions should not be in valid base projects");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-028")]
    [Description("GetValidBaseProjects returns ProjectReference with all required properties")]
    public void GetValidBaseProjects_ReturnsCompleteProjectReferences()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects("BackTranslation");

        // Assert - Each project reference should have all required properties
        foreach (var project in validProjects)
        {
            Assert.Multiple(() =>
            {
                Assert.That(project.Guid, Is.Not.Null.And.Not.Empty, "Guid should be set");
                Assert.That(project.ShortName, Is.Not.Null.And.Not.Empty, "ShortName should be set");
                Assert.That(project.FullName, Is.Not.Null, "FullName should be set");
                // Versification, ProjectType, IsScripture, IsResource, IsRegistered are also required
            });
        }
    }

    #endregion
}

#region Stub Types for Compilation (will be replaced by actual implementation)

/// <summary>
/// Project type configuration returned by GetTypeConfiguration.
/// Describes all UI behavior and validation rules for a project type.
/// Uses string identifiers for project types to avoid Paratext.Data enum issues.
/// </summary>
public record ProjectTypeConfiguration
{
    public required string ProjectType { get; init; }
    public required bool BaseProjectRequired { get; init; }
    public required bool EditableDefault { get; init; }
    public required bool AutoNameFromUser { get; init; }
    public required string NormalizationDefault { get; init; }
    public required bool RegistrationRequired { get; init; }
    public required bool SharesParentRegistration { get; init; }
    public required bool BooksTabVisible { get; init; }
    public required bool EncodingConverterRequired { get; init; }
    public required IReadOnlyList<string> AllowedBaseTypes { get; init; }
    public required bool IsDerivedType { get; init; }
    public required bool IsScripture { get; init; }
}

/// <summary>
/// Project reference for dropdowns and selection.
/// Uses string identifiers for project types.
/// </summary>
public record ProjectReference
{
    public required string Guid { get; init; }
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public required string Versification { get; init; }
    public required string ProjectType { get; init; }
    public required bool IsScripture { get; init; }
    public required bool IsResource { get; init; }
    public required bool IsRegistered { get; init; }
}

/// <summary>
/// Stub service - tests will fail until real implementation exists.
/// </summary>
internal static class ProjectTypeService
{
    public static ProjectTypeConfiguration GetTypeConfiguration(string projectType)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectTypeService.GetTypeConfiguration not yet implemented for {projectType}");
    }

    public static bool CanBeBasedOnType(string creatingType, string candidateGuid)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectTypeService.CanBeBasedOnType not yet implemented for {creatingType}");
    }

    public static IReadOnlyList<ProjectReference> GetValidBaseProjects(string creatingType)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectTypeService.GetValidBaseProjects not yet implemented for {creatingType}");
    }
}

#endregion
