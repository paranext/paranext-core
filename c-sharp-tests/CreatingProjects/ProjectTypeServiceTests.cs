using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectTypeService implementing CAP-EXT-001 (ProjectTypeStateMachine)
/// and CAP-EXT-002 (BaseProjectTypeFiltering).
///
/// These tests verify that the extracted business logic correctly determines
/// project type configurations and base project filtering rules.
/// </summary>
/// <remarks>
/// Golden masters: gm-001-type-state-machine, gm-002-base-project-filter
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class ProjectTypeServiceTests
{
    #region CAP-EXT-001: GetTypeConfiguration Tests - Standard Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-001")]
    [Description("Standard project does not require a base project")]
    public void GetTypeConfiguration_Standard_BaseProjectNotRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Assert
        Assert.That(config.BaseProjectRequired, Is.False);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-002")]
    [Description("Standard project is editable by default")]
    public void GetTypeConfiguration_Standard_EditableDefault()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Assert
        Assert.That(config.EditableDefault, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-003")]
    [Description("Standard project requires its own registration")]
    public void GetTypeConfiguration_Standard_RegistrationRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Assert
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-004")]
    [Description("Standard project uses NFC normalization")]
    public void GetTypeConfiguration_Standard_UsesNFCNormalization()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Assert
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-005")]
    [Description("Standard project shows Books tab")]
    public void GetTypeConfiguration_Standard_BooksTabVisible()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Standard);

        // Assert
        Assert.That(config.BooksTabVisible, Is.True);
        Assert.That(config.StudyBibleTabVisible, Is.False);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - BackTranslation Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-006")]
    [Description("BackTranslation project requires a base project")]
    public void GetTypeConfiguration_BackTranslation_BaseProjectRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.BackTranslation);

        // Assert
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.BaseProjectFilter, Is.EqualTo("scriptureOnly"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-007")]
    [Description("BackTranslation project inherits parent registration")]
    public void GetTypeConfiguration_BackTranslation_SharesParentRegistration()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.BackTranslation);

        // Assert
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-008")]
    [Description("BackTranslation project uses NFC normalization")]
    public void GetTypeConfiguration_BackTranslation_UsesNFCNormalization()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.BackTranslation);

        // Assert
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - Daughter Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-009")]
    [Description("Daughter project requires a scripture base project")]
    public void GetTypeConfiguration_Daughter_BaseProjectRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Daughter);

        // Assert
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.BaseProjectFilter, Is.EqualTo("scriptureOnly"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-010")]
    [Description("Daughter project requires its own registration (not inherited)")]
    public void GetTypeConfiguration_Daughter_RegistrationRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Daughter);

        // Assert
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - Auxiliary Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-011")]
    [Description("Auxiliary project requires a Standard base project")]
    public void GetTypeConfiguration_Auxiliary_BaseProjectRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Auxiliary);

        // Assert
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.BaseProjectFilter, Is.EqualTo("standardOnly"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-012")]
    [Description("Auxiliary project inherits parent registration")]
    public void GetTypeConfiguration_Auxiliary_SharesParentRegistration()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.Auxiliary);

        // Assert
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - StudyBibleAdditions Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-013")]
    [Description("StudyBibleAdditions project requires a non-StudyBible base project")]
    public void GetTypeConfiguration_StudyBibleAdditions_BaseProjectRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.StudyBibleAdditions
        );

        // Assert
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.BaseProjectFilter, Is.EqualTo("notStudyBible"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-014")]
    [Description("StudyBibleAdditions project shows Study Bible tab")]
    public void GetTypeConfiguration_StudyBibleAdditions_StudyBibleTabVisible()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.StudyBibleAdditions
        );

        // Assert
        Assert.That(config.StudyBibleTabVisible, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-015")]
    [Description("StudyBibleAdditions requires its own registration")]
    public void GetTypeConfiguration_StudyBibleAdditions_RegistrationRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.StudyBibleAdditions
        );

        // Assert
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - ConsultantNotes Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-016")]
    [Description("ConsultantNotes project does not require a base project")]
    public void GetTypeConfiguration_ConsultantNotes_BaseProjectNotRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.ConsultantNotes);

        // Assert
        Assert.That(config.BaseProjectRequired, Is.False);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-017")]
    [Description("ConsultantNotes project does not require registration")]
    public void GetTypeConfiguration_ConsultantNotes_RegistrationNotRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.ConsultantNotes);

        // Assert
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.False);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-018")]
    [Description("ConsultantNotes project hides Books tab")]
    public void GetTypeConfiguration_ConsultantNotes_BooksTabHidden()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(ProjectCreationType.ConsultantNotes);

        // Assert
        Assert.That(config.BooksTabVisible, Is.False);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - TransliterationManual Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-019")]
    [Description("TransliterationManual project requires a scripture base project")]
    public void GetTypeConfiguration_TransliterationManual_BaseProjectRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationManual
        );

        // Assert
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.BaseProjectFilter, Is.EqualTo("scriptureOnly"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-020")]
    [Description("TransliterationManual project uses NFD normalization")]
    public void GetTypeConfiguration_TransliterationManual_UsesNFDNormalization()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationManual
        );

        // Assert
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-021")]
    [Description("TransliterationManual project does not require encoding converter")]
    public void GetTypeConfiguration_TransliterationManual_EncodingConverterNotRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationManual
        );

        // Assert
        Assert.That(config.EncodingConverterRequired, Is.False);
    }

    #endregion

    #region CAP-EXT-001: GetTypeConfiguration Tests - TransliterationWithEncoder Project Type

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-022")]
    [Description("TransliterationWithEncoder project requires an encoding converter")]
    public void GetTypeConfiguration_TransliterationWithEncoder_EncodingConverterRequired()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationWithEncoder
        );

        // Assert
        Assert.That(config.EncodingConverterRequired, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Property("ScenarioId", "TS-EXT-023")]
    [Description("TransliterationWithEncoder project uses NFD normalization")]
    public void GetTypeConfiguration_TransliterationWithEncoder_UsesNFDNormalization()
    {
        // Act
        var config = ProjectTypeService.GetTypeConfiguration(
            ProjectCreationType.TransliterationWithEncoder
        );

        // Assert
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));
    }

    #endregion

    #region CAP-EXT-002: GetAllowedBaseTypes Tests

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-024")]
    [Description("BackTranslation allows scripture types as base projects")]
    public void GetAllowedBaseTypes_BackTranslation_AllowsScriptureTypes()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(
            ProjectCreationType.BackTranslation
        );

        // Assert - Scripture types are allowed
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.BackTranslation));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Daughter));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.StudyBibleAdditions));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.TransliterationManual));

        // Non-scripture types are not allowed
        Assert.That(allowedTypes, Does.Not.Contain(ProjectCreationType.Auxiliary));
        Assert.That(allowedTypes, Does.Not.Contain(ProjectCreationType.ConsultantNotes));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-025")]
    [Description("Daughter allows scripture types as base projects")]
    public void GetAllowedBaseTypes_Daughter_AllowsScriptureTypes()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(ProjectCreationType.Daughter);

        // Assert - Scripture types are allowed
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.BackTranslation));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Daughter));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-026")]
    [Description("Auxiliary allows only Standard type as base project")]
    public void GetAllowedBaseTypes_Auxiliary_AllowsOnlyStandard()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(ProjectCreationType.Auxiliary);

        // Assert - Only Standard is allowed
        Assert.That(allowedTypes, Has.Count.EqualTo(1));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-027")]
    [Description("StudyBibleAdditions excludes StudyBible types as base projects")]
    public void GetAllowedBaseTypes_StudyBibleAdditions_ExcludesStudyBibleTypes()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(
            ProjectCreationType.StudyBibleAdditions
        );

        // Assert - StudyBible types not allowed, others are
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.BackTranslation));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Daughter));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Auxiliary));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.TransliterationManual));

        // StudyBible types are excluded
        Assert.That(allowedTypes, Does.Not.Contain(ProjectCreationType.StudyBible));
        Assert.That(allowedTypes, Does.Not.Contain(ProjectCreationType.StudyBibleAdditions));
        Assert.That(allowedTypes, Does.Not.Contain(ProjectCreationType.ConsultantNotes));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-028")]
    [Description("TransliterationManual allows scripture types as base projects")]
    public void GetAllowedBaseTypes_TransliterationManual_AllowsScriptureTypes()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(
            ProjectCreationType.TransliterationManual
        );

        // Assert - Scripture types are allowed
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.BackTranslation));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Daughter));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-029")]
    [Description("TransliterationWithEncoder allows scripture types as base projects")]
    public void GetAllowedBaseTypes_TransliterationWithEncoder_AllowsScriptureTypes()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(
            ProjectCreationType.TransliterationWithEncoder
        );

        // Assert - Scripture types are allowed
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Standard));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.BackTranslation));
        Assert.That(allowedTypes, Does.Contain(ProjectCreationType.Daughter));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-030")]
    [Description("Standard type returns empty list (no base project needed)")]
    public void GetAllowedBaseTypes_Standard_ReturnsEmptyList()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(ProjectCreationType.Standard);

        // Assert - Standard doesn't need a base project, so empty list
        Assert.That(allowedTypes, Is.Empty);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-002")]
    [Property("GoldenMaster", "gm-002")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-EXT-031")]
    [Description("ConsultantNotes type returns empty list (no base project needed)")]
    public void GetAllowedBaseTypes_ConsultantNotes_ReturnsEmptyList()
    {
        // Act
        var allowedTypes = ProjectTypeService.GetAllowedBaseTypes(
            ProjectCreationType.ConsultantNotes
        );

        // Assert - ConsultantNotes doesn't need a base project
        Assert.That(allowedTypes, Is.Empty);
    }

    #endregion

    #region CAP-003: GetValidBaseProjects Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-003-001")]
    [Description("Standard project returns empty list (no base project needed)")]
    public void GetValidBaseProjects_Standard_ReturnsEmptyList()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(ProjectCreationType.Standard);

        // Assert - Standard doesn't need a base project
        Assert.That(validProjects, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-003-002")]
    [Description("ConsultantNotes project returns empty list (no base project needed)")]
    public void GetValidBaseProjects_ConsultantNotes_ReturnsEmptyList()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(
            ProjectCreationType.ConsultantNotes
        );

        // Assert - ConsultantNotes doesn't need a base project
        Assert.That(validProjects, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-003-003")]
    [Description("BackTranslation returns list of scripture-type projects only")]
    public void GetValidBaseProjects_BackTranslation_ReturnsScriptureProjects()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(
            ProjectCreationType.BackTranslation
        );

        // Assert - All returned projects should be scripture types
        Assert.That(validProjects, Is.Not.Null);
        // When there are projects, all should have IsScripture = true
        Assert.That(
            validProjects,
            Has.All.Matches<ProjectReference>(p => p.IsScripture),
            "All valid base projects for BackTranslation must be scripture types"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-003-004")]
    [Description("Auxiliary returns list of Standard-type projects only")]
    public void GetValidBaseProjects_Auxiliary_ReturnsStandardProjectsOnly()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(ProjectCreationType.Auxiliary);

        // Assert - All returned projects should be Standard type
        Assert.That(validProjects, Is.Not.Null);
        // When there are projects, all should be Standard type
        Assert.That(
            validProjects,
            Has.All.Matches<ProjectReference>(p =>
                p.ProjectType == ProjectCreationType.Standard
            ),
            "All valid base projects for Auxiliary must be Standard type"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-017")]
    [Property("ScenarioId", "TS-003-005")]
    [Description("StudyBibleAdditions excludes StudyBible and StudyBibleAdditions types")]
    public void GetValidBaseProjects_StudyBibleAdditions_ExcludesStudyBibleTypes()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(
            ProjectCreationType.StudyBibleAdditions
        );

        // Assert - No StudyBible or StudyBibleAdditions types should be returned
        Assert.That(validProjects, Is.Not.Null);
        // When there are projects, none should be StudyBible types
        Assert.That(
            validProjects,
            Has.None.Matches<ProjectReference>(p =>
                p.ProjectType == ProjectCreationType.StudyBible
                || p.ProjectType == ProjectCreationType.StudyBibleAdditions
            ),
            "StudyBible and StudyBibleAdditions must be excluded"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("BehaviorId", "BHV-027")]
    [Property("ScenarioId", "TS-003-006")]
    [Description("ProjectReference contains required fields")]
    public void GetValidBaseProjects_ReturnsProjectReferenceWithRequiredFields()
    {
        // Act
        var validProjects = ProjectTypeService.GetValidBaseProjects(
            ProjectCreationType.BackTranslation
        );

        // Assert - Each project reference has required fields
        Assert.That(validProjects, Is.Not.Null);
        foreach (var project in validProjects)
        {
            Assert.That(project.Guid, Is.Not.Null.And.Not.Empty, "GUID is required");
            Assert.That(project.ShortName, Is.Not.Null.And.Not.Empty, "ShortName is required");
            Assert.That(project.FullName, Is.Not.Null.And.Not.Empty, "FullName is required");
        }
    }

    #endregion
}
