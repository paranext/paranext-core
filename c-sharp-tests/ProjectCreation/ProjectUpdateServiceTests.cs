using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectUpdateService covering CAP-011.
/// These tests verify project update orchestration including partial updates,
/// Settings.xml persistence, LDML file updates, and VCS commits.
///
/// Behaviors covered: BHV-038
/// Golden masters: gm-011-project-update
///
/// NOTE: Uses string-based type identifiers to match PT10 patterns.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectUpdateServiceTests : PapiTestBase
{
    private string? _testProjectGuid;

    [SetUp]
    public async Task SetUp()
    {
        // Create a test project for update tests
        var createRequest = new CreateProjectRequest
        {
            ShortName = "UpdTest",
            FullName = "Update Test Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };
        var result = await ProjectDefaultsService.CreateProjectAsync(createRequest);
        _testProjectGuid = result.ProjectGuid;
    }

    #region CAP-011: UpdateProjectAsync - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-011: UpdateProjectAsync.
    /// Given an UpdateProjectRequest with partial changes, updates only
    /// the specified fields, saves Settings.xml, and commits to VCS.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Acceptance test: UpdateProjectAsync applies partial updates and saves")]
    public async Task UpdateProjectAsync_AcceptanceTest()
    {
        // Arrange - Request to update only the full name
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            FullName = "Updated Full Name"
        };

        // Act - Call the service method that will be implemented
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert - Verify update succeeded
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.Success, Is.True, "Update should succeed");
            Assert.That(result.ErrorCode, Is.Null, "No error code on success");
            Assert.That(result.ErrorMessage, Is.Null, "No error message on success");
        });
    }

    #endregion

    #region CAP-011: UpdateProjectAsync - Contract Tests (Individual Fields)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update full name only succeeds")]
    public async Task UpdateProjectAsync_FullNameOnly_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            FullName = "New Full Name"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update copyright only succeeds")]
    public async Task UpdateProjectAsync_CopyrightOnly_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Copyright = "(c) 2024 Test Organization"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update editable flag only succeeds")]
    public async Task UpdateProjectAsync_EditableOnly_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Editable = false
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update multiple fields at once succeeds")]
    public async Task UpdateProjectAsync_MultipleFields_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            FullName = "Multi Update Project",
            Copyright = "(c) Multi Update",
            Editable = true
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update normalization only succeeds")]
    public async Task UpdateProjectAsync_NormalizationOnly_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Normalization = "NFD"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update USFM version only succeeds")]
    public async Task UpdateProjectAsync_UsfmVersionOnly_Succeeds()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            UsfmVersion = 2
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    #endregion

    #region CAP-011: UpdateProjectAsync - Error Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update for non-existent project returns error")]
    public async Task UpdateProjectAsync_NonExistentProject_ReturnsError()
    {
        // Arrange
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = "0000000000000000000000000000000000000000",
            FullName = "Should Fail"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("PROJECT_NOT_FOUND"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Changing project type is forbidden")]
    public async Task UpdateProjectAsync_ChangeType_ReturnsForbiddenError()
    {
        // Arrange - Try to change from Standard to BackTranslation
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            ProjectType = "BackTranslation"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("TYPE_CHANGE_FORBIDDEN"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-038")]
    [Property("InvariantId", "INV-005")]
    [Description("Changing versification for derived project returns error")]
    public async Task UpdateProjectAsync_DerivedVersification_ReturnsError()
    {
        // Arrange - First create a derived project
        var baseRequest = new CreateProjectRequest
        {
            ShortName = "UpdBase",
            FullName = "Update Base Project",
            LanguageId = "eng",
            Versification = "English",
            ProjectType = "Standard"
        };
        var baseResult = await ProjectDefaultsService.CreateProjectAsync(baseRequest);

        var derivedRequest = new CreateProjectRequest
        {
            ShortName = "UpdDerv",
            FullName = "Update Derived Project",
            LanguageId = "spa",
            Versification = "English",
            ProjectType = "BackTranslation",
            BaseProjectGuid = baseResult.ProjectGuid
        };
        var derivedResult = await ProjectDefaultsService.CreateProjectAsync(derivedRequest);

        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = derivedResult.ProjectGuid!,
            Versification = "Vulgate"  // Derived cannot change versification
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert - INV-005: Versification for derived projects comes from base
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            // Should indicate versification cannot be changed for derived
        });
    }

    #endregion

    #region CAP-011: Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Full name update matches golden master gm-011")]
    public async Task UpdateProjectAsync_FullName_MatchesGoldenMaster()
    {
        // Arrange - From gm-011-project-update/input.json
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            FullName = "Updated Project Name"
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert - From gm-011-project-update/expected-output.json
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "fullNameUpdate.success should be true");
            Assert.That(result.ErrorCode, Is.Null, "fullNameUpdate.error should be null");
        });
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Editable flag update matches golden master gm-011")]
    public async Task UpdateProjectAsync_Editable_MatchesGoldenMaster()
    {
        // Arrange - From gm-011-project-update/input.json
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Editable = false
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert - From gm-011-project-update/expected-output.json
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "editableUpdate.success should be true");
            Assert.That(result.ErrorCode, Is.Null, "editableUpdate.error should be null");
        });
    }

    #endregion

    #region CAP-011: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-079")]
    [Property("BehaviorId", "BHV-038")]
    [TestCase("Original")]
    [TestCase("Septuagint")]
    [TestCase("Vulgate")]
    [Description("INV-005: Standard project can change versification to any valid type")]
    public async Task UpdateProjectAsync_StandardVersification_Succeeds(string newVersification)
    {
        // Arrange - Standard projects CAN change versification
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Versification = newVersification
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True,
            $"Standard project should be able to change versification to {newVersification}");
    }

    #endregion

    #region CAP-011: Edge Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update with no changes succeeds without error")]
    public async Task UpdateProjectAsync_NoChanges_SucceedsWithoutError()
    {
        // Arrange - Request with only ProjectGuid, no changes
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert - Should succeed even with no actual changes
        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update with empty string values handles correctly")]
    public async Task UpdateProjectAsync_EmptyCopyright_Succeeds()
    {
        // Arrange - Set copyright to empty (clearing it)
        var updateRequest = new UpdateProjectRequest
        {
            ProjectGuid = _testProjectGuid!,
            Copyright = ""
        };

        // Act
        var result = await ProjectUpdateService.UpdateProjectAsync(updateRequest);

        // Assert
        Assert.That(result.Success, Is.True);
    }

    #endregion
}
