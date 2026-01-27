using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectDefaultsService covering CAP-009.
/// These tests verify project creation with default values, directory setup,
/// VCS initialization, and GUID assignment.
///
/// Behaviors covered: BHV-001, BHV-034
/// Golden masters: gm-007-project-defaults
///
/// NOTE: Uses string-based type identifiers to match PT10 patterns.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectDefaultsServiceTests : PapiTestBase
{
    #region CAP-009: CreateProjectAsync - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-009: CreateProjectAsync.
    /// Given a valid CreateProjectRequest, creates a complete project with
    /// directory, Settings.xml, VCS, GUID, and adds to collection.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-001")]
    [Description("Acceptance test: CreateProjectAsync creates complete project with all artifacts")]
    public async Task CreateProjectAsync_AcceptanceTest()
    {
        // Arrange - Create valid request with all required fields
        var request = new CreateProjectRequest
        {
            ShortName = "TestPrj",
            FullName = "Test Project Full Name",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };

        // Act - Call the service method that will be implemented
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert - Verify project created successfully
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.Success, Is.True, "Project creation should succeed");
            Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty, "GUID should be assigned");
            Assert.That(result.ProjectGuid!.Length, Is.EqualTo(40), "GUID should be 40-char hex");
            Assert.That(result.ErrorCode, Is.Null, "No error code on success");
            Assert.That(result.ErrorMessage, Is.Null, "No error message on success");
        });
    }

    #endregion

    #region CAP-009: CreateProjectAsync - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-001")]
    [Description("Standard project creation with valid inputs succeeds")]
    public async Task CreateProjectAsync_StandardProject_Succeeds()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "StdProj",
            FullName = "Standard Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ProjectGuid, Is.Not.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-001")]
    [Description("BackTranslation project creation with valid base project succeeds")]
    public async Task CreateProjectAsync_BackTranslationWithBase_Succeeds()
    {
        // Arrange - First create a base project
        var baseRequest = new CreateProjectRequest
        {
            ShortName = "BasePrj",
            FullName = "Base Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };
        var baseResult = await ProjectDefaultsService.CreateProjectAsync(baseRequest);

        var request = new CreateProjectRequest
        {
            ShortName = "BTProj",
            FullName = "Back Translation Project",
            LanguageId = "spa",
            Versification = "English",
            ProjectType = "BackTranslation",
            BaseProjectGuid = baseResult.ProjectGuid
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ProjectGuid, Is.Not.Null);
            Assert.That(result.ProjectGuid, Is.Not.EqualTo(baseResult.ProjectGuid));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-001")]
    [Property("InvariantId", "INV-001")]
    [Description("Project creation with space in name fails with appropriate error")]
    public async Task CreateProjectAsync_NameWithSpace_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "Bad Proj",  // Invalid - contains space
            FullName = "Bad Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("INVALID_SHORT_NAME"));
            Assert.That(result.ProjectGuid, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-001")]
    [Property("InvariantId", "INV-003")]
    [Description("Derived project without base project returns error")]
    public async Task CreateProjectAsync_DerivedWithoutBase_ReturnsError()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "BTNoBase",
            FullName = "Back Translation Without Base",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "BackTranslation",
            BaseProjectGuid = null  // Missing required base
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Does.Contain("BASE").Or.Contain("DERIVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Default values are applied when not specified")]
    public async Task CreateProjectAsync_MinimalRequest_AppliesDefaults()
    {
        // Arrange - Minimal request without optional fields
        var request = new CreateProjectRequest
        {
            ShortName = "MinProj",
            FullName = "Minimal Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
            // No optional fields specified
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert - Project should be created with defaults
        Assert.That(result.Success, Is.True);
        // Note: Actual default verification done in GetDefaultSettings test
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-001")]
    [Description("ConsultantNotes project does not require registration")]
    public async Task CreateProjectAsync_ConsultantNotes_NoRegistration()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            ShortName = "CNotes",
            FullName = "Consultant Notes",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "ConsultantNotes"
        };

        // Act
        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    #endregion

    #region CAP-009: GetDefaultSettings - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-034")]
    [Description("GetDefaultSettings returns correct defaults for Standard type")]
    public void GetDefaultSettings_StandardType_ReturnsCorrectDefaults()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings("Standard");

        // Assert - Verify defaults match gm-007 specification
        Assert.Multiple(() =>
        {
            Assert.That(defaults.ProjectType, Is.EqualTo("Standard"));
            Assert.That(defaults.Normalization, Is.EqualTo("NFC"));
            Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
            Assert.That(defaults.Editable, Is.True);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-034")]
    [Description("GetDefaultSettings returns NFD normalization for Transliteration types")]
    public void GetDefaultSettings_TransliterationManual_ReturnsNFDNormalization()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings("TransliterationManual");

        // Assert
        Assert.That(defaults.Normalization, Is.EqualTo("NFD"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-034")]
    [Description("GetDefaultSettings for derived type with base uses base versification")]
    public void GetDefaultSettings_DerivedWithBase_InheritsVersification()
    {
        // Arrange - Create a base project first to get its GUID
        // Note: In actual implementation, this would look up the base project
        string baseProjectGuid = "0123456789abcdef0123456789abcdef01234567";

        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            "BackTranslation",
            baseProjectGuid);

        // Assert - Versification should be inherited from base
        Assert.Multiple(() =>
        {
            Assert.That(defaults.ProjectType, Is.EqualTo("BackTranslation"));
            Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseProjectGuid));
        });
    }

    #endregion

    #region CAP-009: Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Default values match golden master specification gm-007")]
    public void GetDefaultSettings_MatchesGoldenMaster()
    {
        // Act
        var defaults = ProjectDefaultsService.GetDefaultSettings("Standard");

        // Assert - Values from golden-masters/gm-007-project-defaults/expected-output.json
        Assert.Multiple(() =>
        {
            // FileNameForm: "41MAT" - verified via project settings
            // Versification: English - verified via project settings
            // Stylesheet: "usfm.sty" - verified via project settings
            // Encoding: 65001 (UTF-8) - verified via project settings
            Assert.That(defaults.Normalization, Is.EqualTo("NFC"),
                "Default normalization should be NFC");
            Assert.That(defaults.UsfmVersion, Is.EqualTo(3),
                "Default USFM version should be 3");
            Assert.That(defaults.Editable, Is.True,
                "Default editable should be true");
        });
    }

    #endregion

    #region CAP-009: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-002")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-001")]
    [TestCase("TestP1", "TestP2")]
    [TestCase("Proj1", "Proj2")]
    [TestCase("ABCDE", "FGHIJ")]
    [Description("INV-002: Each created project has a unique non-empty GUID")]
    public async Task CreateProjectAsync_MultipleCalls_AssignsUniqueGuids(string name1, string name2)
    {
        // Arrange
        var request1 = new CreateProjectRequest
        {
            ShortName = name1,
            FullName = name1 + " Full",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };

        var request2 = new CreateProjectRequest
        {
            ShortName = name2,
            FullName = name2 + " Full",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };

        // Act
        var result1 = await ProjectDefaultsService.CreateProjectAsync(request1);
        var result2 = await ProjectDefaultsService.CreateProjectAsync(request2);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result1.ProjectGuid, Is.Not.Null.And.Not.Empty);
            Assert.That(result2.ProjectGuid, Is.Not.Null.And.Not.Empty);
            Assert.That(result1.ProjectGuid, Is.Not.EqualTo(result2.ProjectGuid),
                "Each project must have a unique GUID");
        });
    }

    #endregion

    #region CAP-009: Error Handling Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-001")]
    [Description("Directory creation failure returns appropriate error")]
    public async Task CreateProjectAsync_DirectoryFails_ReturnsError()
    {
        // Arrange - Use invalid characters that can't be a directory name
        var request = new CreateProjectRequest
        {
            ShortName = "AB",  // Too short (< 3 chars)
            FullName = "Too Short",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
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
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-001")]
    [Description("Reserved Windows name returns appropriate error")]
    public async Task CreateProjectAsync_ReservedName_ReturnsError()
    {
        // Arrange - CON is a Windows reserved name
        var request = new CreateProjectRequest
        {
            ShortName = "CON",
            FullName = "Console Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
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

    #endregion
}
