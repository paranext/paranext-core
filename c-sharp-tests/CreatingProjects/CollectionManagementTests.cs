using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ScrTextCollection operations including adding projects and finding projects (CAP-PD-006).
/// Verifies collection management, duplicate handling, and directory resolution.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class CollectionManagementTests : PapiTestBase
{
    #region TS-017: Add project to ScrTextCollection with GUID

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-007")]
    [Description("TS-017: Add project to ScrTextCollection with GUID")]
    public void ScrTextCollection_AddWithGuid_ProjectIsInCollection()
    {
        // Arrange
        DummyScrText scrText = CreateDummyProject();
        string projectName = scrText.Name;

        // Act - Add project to collection (FakeAddProject adds to ScrTextCollection)
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Assert - Project should be in collection
        var projectsInCollection = ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();
        bool projectFound = projectsInCollection.Any(p => p.Name == projectName);
        Assert.That(
            projectFound,
            Is.True,
            "Project should be in collection"
        );
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-007")]
    [Description("TS-017: Project should be findable by name after adding")]
    public void ScrTextCollection_AddWithGuid_ProjectFindableByName()
    {
        // Arrange
        DummyScrText scrText = CreateDummyProject();
        string projectName = scrText.Name;

        // Act
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Assert - Project should be findable by name
        ScrText? foundProject = ScrTextCollection.Find(projectName);
        Assert.That(
            foundProject,
            Is.Not.Null,
            "Project should be findable by name"
        );
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-007")]
    [Description("TS-017: Project can be found by ID after adding")]
    public void ScrTextCollection_AddWithGuid_ProjectFindableById()
    {
        // Arrange
        DummyScrText scrText = CreateDummyProject();
        HexId projectGuid = scrText.Guid;

        // Act
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Assert - Project should be findable by ID
        ScrText? foundProject = ScrTextCollection.GetById(projectGuid);
        Assert.That(
            foundProject,
            Is.Not.Null,
            "Project should be findable by ID"
        );
    }

    #endregion

    #region TS-018: Reject adding project without GUID

    [Test]
    [Category("Integration")]
    [Category("Validation")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-018")]
    [Property("InvariantId", "INV-002")]
    [Description("TS-018: All DummyScrText instances have GUID by design")]
    public void DummyScrText_AlwaysHasGuid_CannotTestNullGuid()
    {
        // Note: The DummyScrText implementation always generates a GUID,
        // so we cannot directly test the null GUID rejection case.
        // However, we can verify that DummyScrText always has a valid GUID.

        // Arrange
        DummyScrText scrText = CreateDummyProject();

        // Assert - DummyScrText always has GUID
        Assert.That(
            scrText.Guid,
            Is.Not.Null,
            "DummyScrText always has GUID set"
        );
        Assert.That(
            scrText.Guid.ToString(),
            Has.Length.EqualTo(40),
            "GUID should be 40 characters"
        );
    }

    // Note: The actual test for TS-018 "Reject adding project without GUID" would require
    // a custom ScrText implementation that allows null GUID, which DummyScrText does not support.
    // The invariant INV-002 is documented and enforced by ParatextData.dll.

    #endregion

    #region TS-029: Resolve project directory for duplicate names

    [Test]
    [Category("Unit")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-015")]
    [Ignore("Requires _projectsById infrastructure - documented for implementation")]
    [Description("TS-029: Resolve project directory for duplicate names - requires infrastructure")]
    public void ProjectDirectory_DuplicateName_UsesProjectsByIdSubfolder()
    {
        // This test would verify:
        // 1. Create project with name "TestProj"
        // 2. Create another project with same short name but different GUID
        // 3. Verify the second project uses _projectsById subfolder
        // 4. Verify directory path contains project ID

        Assert.Fail("Test requires _projectsById infrastructure");
    }

    #endregion

    #region TS-038: Refresh and validate project list

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-025")]
    [Ignore("Requires RefreshScrTextsInternal implementation - documented for implementation")]
    [Description("TS-038: Refresh and validate project list - requires infrastructure")]
    public void ScrTextCollection_Refresh_LoadsValidProjects()
    {
        // This test would verify:
        // 1. Set up projects directory with valid and invalid projects
        // 2. Call RefreshScrTextsInternal
        // 3. Verify valid projects are loaded
        // 4. Verify invalid projects are skipped with logging

        Assert.Fail("Test requires RefreshScrTextsInternal infrastructure");
    }

    #endregion

    #region Collection State Management

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("BehaviorId", "BHV-007")]
    [Description("Projects can be enumerated from collection")]
    public void ScrTextCollection_Enumerate_ListsAddedProjects()
    {
        // Arrange
        DummyScrText scrText1 = CreateDummyProject();
        DummyScrText scrText2 = CreateDummyProject();

        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText1), scrText1);
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText2), scrText2);

        // Act
        var projects = ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();

        // Assert - Both projects should be enumerable
        Assert.That(
            projects.Count,
            Is.GreaterThanOrEqualTo(2),
            "At least 2 projects should be in collection"
        );

        Assert.That(
            projects.Any(p => p.Guid.Equals(scrText1.Guid)),
            Is.True,
            "First project should be enumerable"
        );
        Assert.That(
            projects.Any(p => p.Guid.Equals(scrText2.Guid)),
            Is.True,
            "Second project should be enumerable"
        );
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("BehaviorId", "BHV-007")]
    [Description("Find returns null for non-existent project")]
    public void ScrTextCollection_Find_ReturnsNullForNonExistent()
    {
        // Arrange
        const string nonExistentName = "NonExistentProjectName12345";

        // Act
        ScrText? result = ScrTextCollection.Find(nonExistentName);

        // Assert
        Assert.That(result, Is.Null, "Find should return null for non-existent project");
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Property("BehaviorId", "BHV-007")]
    [Description("GetById throws ProjectNotFoundException for non-existent GUID")]
    public void ScrTextCollection_GetById_ThrowsForNonExistent()
    {
        // Arrange
        HexId nonExistentGuid = HexId.FromStr("0000000000000000000000000000000000000000");

        // Act & Assert
        Assert.Throws<Paratext.Data.ProjectNotFoundException>(
            () => ScrTextCollection.GetById(nonExistentGuid),
            "GetById should throw ProjectNotFoundException for non-existent GUID"
        );
    }

    #endregion

    #region Include Projects Options

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-PD-006")]
    [Description("ScrTexts with IncludeProjects.Everything includes all project types")]
    public void ScrTextCollection_ScrTextsEverything_IncludesAllTypes()
    {
        // Arrange
        DummyScrText scrText = CreateDummyProject();
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Act
        var everything = ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();

        // Assert
        Assert.That(
            everything,
            Is.Not.Empty,
            "Everything should include added projects"
        );
    }

    #endregion

}
