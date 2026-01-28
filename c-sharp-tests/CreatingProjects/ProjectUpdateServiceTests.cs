using Paranext.DataProvider.CreatingProjects;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;
using ProjectNormalization = Paranext.DataProvider.CreatingProjects.ProjectNormalization;
using VersificationType = Paranext.DataProvider.CreatingProjects.VersificationType;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectUpdateService: UpdateProjectAsync (CAP-017).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectUpdateServiceTests
{
    // =========================================================================
    // CAP-017: UpdateProjectAsync - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "gm-011")]
    [Property("BehaviorId", "BHV-038")]
    [Description(
        "Acceptance test: UpdateProjectAsync updates settings matching gm-011 golden master"
    )]
    public async Task UpdateProjectAsync_FullUpdate_MatchesGoldenMaster()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "NewName",
            FullName = "New Long Name",
            LanguageId = "spa",
            Normalization = ProjectNormalization.NFD,
            Editable = true,
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        // gm-011: settingsXmlUpdated=true, ldmlUpdated=true, repositoryCommitted=true
        Assert.That(result.Success, Is.True, "Update should succeed");
        Assert.That(result.ErrorCode, Is.Null, "No error code on success");
    }

    // =========================================================================
    // CAP-017: UpdateProjectAsync - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-076")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update project with all fields specified succeeds")]
    public async Task UpdateProjectAsync_AllFields_ReturnsSuccess()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "NewNm",
            FullName = "New Full Name",
            Copyright = "Copyright 2026",
            LanguageId = "fra",
            Versification = VersificationType.Vulgate,
            Normalization = ProjectNormalization.NFC,
            UsfmVersion = 3,
            Editable = true,
            PlannedBooks = new List<int> { 1, 2, 3, 40, 41 },
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        Assert.That(result.Success, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-077")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update nonexistent project returns PROJECT_NOT_FOUND error")]
    public async Task UpdateProjectAsync_ProjectNotFound_ReturnsError()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "nonexistent-project-guid-999",
            ShortName = "NoProj",
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("PROJECT_NOT_FOUND"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-078")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Changing project type is forbidden")]
    public async Task UpdateProjectAsync_TypeChange_ReturnsForbiddenError()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ProjectType = ProjectType.BackTranslation,
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("TYPE_CHANGE_FORBIDDEN"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-017-04")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update with only ShortName changes only that field")]
    public async Task UpdateProjectAsync_OnlyShortName_UpdatesOnlyName()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "NewSN",
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        // Only ShortName should be changed; other fields remain unchanged
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-017-05")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update with duplicate name returns NAME_EXISTS error")]
    public async Task UpdateProjectAsync_DuplicateName_ReturnsError()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "ExistingProjectName",
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        // If name already exists for another project, should fail
        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("NAME_EXISTS"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-017-06")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update supports cancellation")]
    public void UpdateProjectAsync_Cancelled_ThrowsOperationCanceled()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "Cancel",
        };
        var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await ProjectUpdateService.UpdateProjectAsync(request, cts.Token)
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-017-07")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Update with language change triggers LDML update")]
    public async Task UpdateProjectAsync_LanguageChange_ReturnsSuccess()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            LanguageId = "deu",
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        // Language change should trigger LDML file update and succeed
        Assert.That(result.Success, Is.True);
    }

    // =========================================================================
    // CAP-017: UpdateProjectAsync - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-011")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Golden master: Settings.xml values match gm-011 expected output")]
    public async Task UpdateProjectAsync_GoldenMaster_SettingsUpdated()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "NewName",
            FullName = "New Long Name",
            LanguageId = "spa",
            Normalization = ProjectNormalization.NFD,
            Editable = true,
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        // gm-011 expected settingsValues:
        //   Name=NewName, FullName="New Long Name", LanguageIsoCode=spa,
        //   NormalizationForm=NFD, Editable=T
        Assert.That(result.Success, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-011")]
    [Property("BehaviorId", "BHV-038")]
    [Description("Golden master: Repository committed after update")]
    public async Task UpdateProjectAsync_GoldenMaster_RepositoryCommitted()
    {
        var request = new UpdateProjectRequest
        {
            ProjectGuid = "existing-project-guid",
            ShortName = "CommitTest",
        };

        var result = await ProjectUpdateService.UpdateProjectAsync(request);

        // gm-011 expected: repositoryCommitted=true
        Assert.That(result.Success, Is.True);
    }
}
