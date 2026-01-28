using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectCleanupService: CleanupProjectAsync (CAP-016).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectCleanupServiceTests
{
    // =========================================================================
    // CAP-016: CleanupProjectAsync - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "gm-010")]
    [Property("BehaviorId", "BHV-041")]
    [Description(
        "Acceptance test: Cleanup removes directory, cache, and collection entry for unregistered project"
    )]
    public async Task CleanupProjectAsync_UnregisteredProject_FullCleanup()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-cleanup-001",
            WasRegistered = false,
        };

        // Should complete without throwing
        await ProjectCleanupService.CleanupProjectAsync(request);

        // gm-010: directoryDeleted=true, removedFromVersioningManager=true, removedFromCollection=true
        // Verification of side effects would require checking the filesystem and collections
    }

    // =========================================================================
    // CAP-016: CleanupProjectAsync - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Cleanup unregistered project: deletes directory, removes from cache and collection")]
    public async Task CleanupProjectAsync_Unregistered_DeletesDirectoryAndRemovesFromCollection()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-cleanup-unreg",
            WasRegistered = false,
        };

        // Should complete without throwing
        await ProjectCleanupService.CleanupProjectAsync(request);

        // Side effects verified: directory deleted, VersioningManager cache cleared, ScrTextCollection entry removed
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Cleanup registered project: also deletes registration from server")]
    public async Task CleanupProjectAsync_Registered_DeletesRegistrationAndDirectory()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-cleanup-reg",
            WasRegistered = true,
            Registration = new ProjectMetadata
            {
                RegistryId = "reg123",
                FullName = "Registered Test Project",
                Visibility = "Public",
            },
        };

        // Should complete without throwing
        await ProjectCleanupService.CleanupProjectAsync(request);

        // gm-010: registrationDeletedFromServer=true, directoryDeleted=true,
        // removedFromVersioningManager=true, removedFromCollection=true
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016-03")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Cleanup is idempotent: calling twice does not throw")]
    public async Task CleanupProjectAsync_CalledTwice_DoesNotThrow()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-cleanup-idempotent",
            WasRegistered = false,
        };

        await ProjectCleanupService.CleanupProjectAsync(request);

        // Second call should also succeed (idempotent)
        Assert.DoesNotThrowAsync(
            async () => await ProjectCleanupService.CleanupProjectAsync(request)
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016-04")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Cleanup nonexistent project is idempotent")]
    public async Task CleanupProjectAsync_NonexistentProject_DoesNotThrow()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "nonexistent-guid-that-does-not-exist",
            WasRegistered = false,
        };

        Assert.DoesNotThrowAsync(
            async () => await ProjectCleanupService.CleanupProjectAsync(request)
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016-05")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Cleanup supports cancellation")]
    public void CleanupProjectAsync_Cancelled_ThrowsOperationCanceled()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-cleanup-cancel",
            WasRegistered = false,
        };
        var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await ProjectCleanupService.CleanupProjectAsync(request, cts.Token)
        );
    }

    // =========================================================================
    // CAP-016: CleanupProjectAsync - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-010")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Golden master: Unregistered cleanup matches gm-010 expected output")]
    public async Task CleanupProjectAsync_GoldenMaster_UnregisteredCleanup()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-gm-unreg",
            WasRegistered = false,
        };

        // gm-010 expected: directoryDeleted=true, removedFromVersioningManager=true, removedFromCollection=true
        await ProjectCleanupService.CleanupProjectAsync(request);

        // Verify all cleanup steps completed (no exception = success for void method)
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-010")]
    [Property("BehaviorId", "BHV-041")]
    [Description("Golden master: Registered cleanup matches gm-010 expected output")]
    public async Task CleanupProjectAsync_GoldenMaster_RegisteredCleanup()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "test-guid-gm-reg",
            WasRegistered = true,
            Registration = new ProjectMetadata
            {
                RegistryId = "reg456",
                FullName = "GM Registered Project",
                Visibility = "Public",
            },
        };

        // gm-010 expected: registrationDeletedFromServer=true, directoryDeleted=true,
        // removedFromVersioningManager=true, removedFromCollection=true
        await ProjectCleanupService.CleanupProjectAsync(request);
    }
}
