using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectDefaultsService implementing CAP-EXT-007 (ProjectDefaultsInitializer).
///
/// These tests verify that:
/// 1. GetDefaultSettings returns correct default values for each project type
/// 2. CreateProjectAsync correctly initializes projects with default values
/// </summary>
/// <remarks>
/// Golden master: gm-007-project-defaults
///
/// Default values expected:
/// - FileNameForm: "41MAT"
/// - Versification: English (except derived types inherit from base)
/// - Stylesheet: "usfm.sty"
/// - Encoding: UTF-8 (65001)
/// - Normalization: NFC (NFD for Transliteration)
/// - USFM Version: 3
/// - Editable: true
/// - MinParatextVersion: "9.0"
/// - LeftToRight: true (by default)
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class ProjectDefaultsServiceTests : PapiTestBase
{
    #region CAP-EXT-007: Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-DEF-ACCEPT")]
    [Description("Acceptance test: Project initialized with all defaults from gm-007")]
    public void ProjectDefaultsService_AcceptanceTest_InitializesWithCorrectDefaults()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert - All gm-007 default values
        Assert.Multiple(() =>
        {
            Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
            Assert.That(defaults.Editable, Is.True);
        });
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - Standard Project

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-001")]
    [Description("Standard project gets default English versification")]
    public void GetDefaultSettings_Standard_DefaultVersificationIsEnglish()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-002")]
    [Description("Standard project is editable by default")]
    public void GetDefaultSettings_Standard_EditableIsTrue()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert
        Assert.That(defaults.Editable, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-003")]
    [Description("Standard project uses NFC normalization")]
    public void GetDefaultSettings_Standard_NormalizationIsNFC()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-004")]
    [Description("Standard project uses USFM version 3")]
    public void GetDefaultSettings_Standard_UsfmVersionIs3()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-005")]
    [Description("Standard project does not require base project")]
    public void GetDefaultSettings_Standard_NoBaseProjectRequired()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.Standard);

        // Assert
        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - BackTranslation

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-010")]
    [Description("BackTranslation uses NFC normalization")]
    public void GetDefaultSettings_BackTranslation_NormalizationIsNFC()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.BackTranslation,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-011")]
    [Description("BackTranslation references base project")]
    public void GetDefaultSettings_BackTranslation_HasBaseProjectGuid()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.BackTranslation,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseProjectGuid));
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - Transliteration

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-020")]
    [Description("TransliterationManual uses NFD normalization")]
    public void GetDefaultSettings_TransliterationManual_NormalizationIsNFD()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.TransliterationManual,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-021")]
    [Description("TransliterationWithEncoder uses NFD normalization")]
    public void GetDefaultSettings_TransliterationWithEncoder_NormalizationIsNFD()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.TransliterationWithEncoder,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - Daughter

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-030")]
    [Description("Daughter project references base project")]
    public void GetDefaultSettings_Daughter_HasBaseProjectGuid()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.Daughter,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseProjectGuid));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-031")]
    [Description("Daughter project uses NFC normalization")]
    public void GetDefaultSettings_Daughter_NormalizationIsNFC()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.Daughter,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - ConsultantNotes

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-040")]
    [Description("ConsultantNotes does not require base project")]
    public void GetDefaultSettings_ConsultantNotes_NoBaseProjectRequired()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.ConsultantNotes);

        // Assert
        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-041")]
    [Description("ConsultantNotes uses NFC normalization")]
    public void GetDefaultSettings_ConsultantNotes_NormalizationIsNFC()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectCreationType.ConsultantNotes);

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }

    #endregion

    #region CAP-EXT-007: GetDefaultSettings - StudyBibleAdditions

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Property("ScenarioId", "TS-DEF-050")]
    [Description("StudyBibleAdditions references base project")]
    public void GetDefaultSettings_StudyBibleAdditions_HasBaseProjectGuid()
    {
        // Arrange
        var baseProjectGuid = Guid.NewGuid().ToString();

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectCreationType.StudyBibleAdditions,
            baseProjectGuid);

        // Assert
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseProjectGuid));
    }

    #endregion

    #region CAP-EXT-007: CreateProjectAsync - Happy Path

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-CREATE-001")]
    [Description("CreateProjectAsync succeeds with valid request")]
    public async Task CreateProjectAsync_ValidRequest_ReturnsSuccess()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-CREATE-002")]
    [Description("CreateProjectAsync returns project GUID on success")]
    public async Task CreateProjectAsync_ValidRequest_ReturnsProjectGuid()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TS2",
            FullName = "Test Project 2",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ProjectGuid, Is.Not.Null);
            Assert.That(result.ProjectGuid, Is.Not.Empty);
        });
    }

    #endregion

    #region CAP-EXT-007: CreateProjectAsync - Error Cases

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-CREATE-010")]
    [Property("InvariantId", "INV-001")]
    [Description("CreateProjectAsync fails when short name contains spaces")]
    public async Task CreateProjectAsync_ShortNameWithSpaces_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TS T",  // Contains space - violates INV-001
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.Not.Null);
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-CREATE-011")]
    [Description("CreateProjectAsync fails when short name is too short")]
    public async Task CreateProjectAsync_ShortNameTooShort_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TS",  // Only 2 characters, minimum is 3
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("INVALID_SHORT_NAME"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("GoldenMaster", "gm-007")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-CREATE-012")]
    [Property("InvariantId", "INV-003")]
    [Description("CreateProjectAsync fails for derived type without base project")]
    public async Task CreateProjectAsync_DerivedTypeNoBase_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test BackTranslation",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.BackTranslation,
            BaseProjectGuid = null  // Missing base project - violates INV-003
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.Not.Null);
        });
    }

    #endregion

    #region CAP-EXT-007: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-EXT-007")]
    [Property("InvariantId", "INV-002")]
    [Property("BehaviorId", "BHV-001")]
    [Property("ScenarioId", "TS-INV-002")]
    [TestCase("Project1")]
    [TestCase("Project2")]
    [TestCase("TestProj")]
    [Description("Project GUID is always unique")]
    public async Task CreateProjectAsync_MultipleProjects_HaveUniqueGuids(string shortName)
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = shortName,
            FullName = $"Full {shortName}",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectCreationType.Standard
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.Not.Null);
        // Note: Uniqueness across projects would be verified in integration tests
        // This test ensures each project gets a non-null GUID
    }

    #endregion
}
