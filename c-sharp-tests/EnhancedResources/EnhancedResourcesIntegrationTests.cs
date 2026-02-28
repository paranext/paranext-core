using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Integration tests for Micro-Phase 1 (BE-1: Foundation) capability chains.
///
/// These tests verify cross-capability interactions between:
/// - CAP-015 (InitializeResources)
/// - CAP-016 (GetAvailableResources)
/// - CAP-020 (CheckResourceUpdate)
///
/// Integration Touchpoints:
/// 1. CAP-015 -> CAP-016: GetAvailableResources requires prior initialization
/// 2. CAP-015 -> CAP-020: CheckResourceUpdate requires prior initialization
/// 3. CAP-016 + CAP-020: After listing resources, check each for updates (full lifecycle)
///
/// These tests use REAL ResourceManager method calls (not mocks). The static test seams
/// on ResourceManager simulate the external environment (ScrTextCollection, network) but
/// the actual capability logic is exercised end-to-end.
/// </summary>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesIntegrationTests
{
    // Save/restore fixture seams so unit tests in other fixtures are not disrupted
    private Func<bool>? _savedIsResourcesDirectoryConfigured;
    private Func<(int, bool)>? _savedResourceDiscovery;
    private Func<IReadOnlyList<ResourceInfo>>? _savedGetAvailableResourceInfos;

    [SetUp]
    public void SetUp()
    {
        // Save fixture seams before overriding for integration context
        _savedIsResourcesDirectoryConfigured = ResourceManager.TestIsResourcesDirectoryConfigured;
        _savedResourceDiscovery = ResourceManager.TestResourceDiscovery;
        _savedGetAvailableResourceInfos = ResourceManager.TestGetAvailableResourceInfos;

        // Clear all test seams to a known baseline for integration tests
        ResourceManager.TestIsResourcesDirectoryConfigured = null;
        ResourceManager.TestResourceDiscovery = null;
        ResourceManager.TestGetAvailableResourceInfos = null;
        ResourceManager.TestResourceLookup = null;
        ResourceManager.TestManifestFetch = null;
        ResourceManager.TestUtcNow = null;
        ResourceManager.TestManifestCacheTimestamp = null;
    }

    [TearDown]
    public void TearDown()
    {
        // Restore fixture seams so other test fixtures are not affected
        ResourceManager.TestIsResourcesDirectoryConfigured = _savedIsResourcesDirectoryConfigured;
        ResourceManager.TestResourceDiscovery = _savedResourceDiscovery;
        ResourceManager.TestGetAvailableResourceInfos = _savedGetAvailableResourceInfos;

        // Clear CAP-020-specific seams
        ResourceManager.TestResourceLookup = null;
        ResourceManager.TestManifestFetch = null;
        ResourceManager.TestUtcNow = null;
        ResourceManager.TestManifestCacheTimestamp = null;
    }

    // =========================================================================
    // CHAIN 1: CAP-015 -> CAP-016 (Init -> GetAvailableResources)
    // =========================================================================

    /// <summary>
    /// Integration: After successful initialization (CAP-015), GetAvailableResources
    /// (CAP-016) returns the discovered resources with full metadata.
    ///
    /// This verifies the primary dependency chain: CAP-016 depends on CAP-015
    /// having set the _isInitialized flag and loaded resource data.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-015 -> CAP-016")]
    [Property("CapabilityId", "CAP-015,CAP-016")]
    [Property("ScenarioId", "TS-007,TS-022")]
    [Property("BehaviorId", "BHV-101,BHV-108")]
    [Description(
        "Init -> GetAvailableResources: initialization enables resource listing with metadata"
    )]
    public async Task InitThenGetAvailable_AfterSuccessfulInit_ReturnsResourceList()
    {
        // Arrange: Configure environment with valid resources
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (1, true);
        ResourceManager.TestGetAvailableResourceInfos = () =>
            new[]
            {
                new ResourceInfo(
                    ResourceId: "ESV16",
                    Name: "ESV",
                    FullName: "English Standard Version 2016 UK",
                    LanguageId: "en",
                    Version: "1.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2016 Crossway",
                    AvailableBooks: new[] { 1, 2, 3, 40, 41, 42 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
            };

        var resourceManager = new ResourceManager();

        // Act: CAP-015 -> CAP-016 chain
        var initResult = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        var listResult = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Init succeeded and enables listing
        Assert.That(initResult.Success, Is.True, "CAP-015: Initialization should succeed");
        Assert.That(
            initResult.ResourceCount,
            Is.GreaterThan(0),
            "CAP-015: Should discover resources"
        );

        Assert.That(
            listResult.Success,
            Is.True,
            "CAP-016: GetAvailableResources should succeed after init"
        );
        Assert.That(listResult.Resources, Is.Not.Null, "CAP-016: Resources list should be present");
        Assert.That(
            listResult.Resources!.Count,
            Is.GreaterThan(0),
            "CAP-016: Should return discovered resources"
        );

        // Verify resource metadata is populated (cross-capability data flow)
        var resource = listResult.Resources[0];
        Assert.That(resource.ResourceId, Is.Not.Null.And.Not.Empty, "Resource ID flows from init");
        Assert.That(
            resource.IsMarbleResource,
            Is.True,
            "MarbleResource type preserved across chain"
        );
        Assert.That(resource.Font, Is.Not.Null, "Font metadata available after init");
    }

    // =========================================================================
    // CHAIN 2: CAP-015 -> CAP-020 (Init -> CheckResourceUpdate)
    // =========================================================================

    /// <summary>
    /// Integration: After successful initialization (CAP-015), CheckResourceUpdate
    /// (CAP-020) can check for updates on installed resources.
    ///
    /// This verifies that CAP-020 correctly depends on CAP-015: initialization must
    /// complete before update checks can proceed.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-015 -> CAP-020")]
    [Property("CapabilityId", "CAP-015,CAP-020")]
    [Property("ScenarioId", "TS-007,TS-018")]
    [Property("BehaviorId", "BHV-101,BHV-106")]
    [Description(
        "Init -> CheckResourceUpdate: initialization enables update checking for resources"
    )]
    public async Task InitThenCheckUpdate_AfterSuccessfulInit_CanCheckForUpdates()
    {
        // Arrange: Configure environment with valid resources and update available
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (1, true);
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "ESV16" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var resourceManager = new ResourceManager();

        // Act: CAP-015 -> CAP-020 chain
        var initResult = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        var updateResult = await resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("ESV16"),
            CancellationToken.None
        );

        // Assert: Init succeeded and enables update checking
        Assert.That(initResult.Success, Is.True, "CAP-015: Initialization should succeed");

        Assert.That(
            updateResult.Success,
            Is.True,
            "CAP-020: CheckResourceUpdate should succeed after init"
        );
        Assert.That(
            updateResult.UpdateAvailable,
            Is.True,
            "CAP-020: Should detect update (2.0 > 1.0)"
        );
        Assert.That(updateResult.CurrentVersion, Is.EqualTo("1.0"), "Current version from lookup");
        Assert.That(
            updateResult.AvailableVersion,
            Is.EqualTo("2.0"),
            "Available version from manifest"
        );
    }

    // =========================================================================
    // CHAIN 3: Full Lifecycle (Init -> List -> CheckUpdate)
    // =========================================================================

    /// <summary>
    /// Integration: Full resource lifecycle -- initialize resources, list them,
    /// then check each discovered resource for updates.
    ///
    /// This tests the complete workflow a user would experience:
    /// 1. CAP-015: Initialize the ER subsystem
    /// 2. CAP-016: List all available ER projects
    /// 3. CAP-020: For each listed resource, check if an update is available
    ///
    /// This verifies that resource IDs flow correctly across all three capabilities.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-015 -> CAP-016 -> CAP-020")]
    [Property("CapabilityId", "CAP-015,CAP-016,CAP-020")]
    [Property("ScenarioId", "TS-007,TS-022,TS-018")]
    [Property("BehaviorId", "BHV-101,BHV-108,BHV-106")]
    [Description("Full lifecycle: Init -> List resources -> Check each for updates")]
    public async Task FullLifecycle_InitListCheckUpdate_ResourceIdsFlowCorrectly()
    {
        // Arrange: Configure environment with two resources, one with update available
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (2, true);
        ResourceManager.TestGetAvailableResourceInfos = () =>
            new[]
            {
                new ResourceInfo(
                    ResourceId: "ESV16",
                    Name: "ESV",
                    FullName: "English Standard Version 2016 UK",
                    LanguageId: "en",
                    Version: "1.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2016 Crossway",
                    AvailableBooks: new[] { 1, 2, 3, 40, 41, 42 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
                new ResourceInfo(
                    ResourceId: "NLT15",
                    Name: "NLT",
                    FullName: "New Living Translation",
                    LanguageId: "en",
                    Version: "2.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2015 Tyndale",
                    AvailableBooks: new[] { 1, 2, 3 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
            };

        // ESV16 has update available (1.0 -> 2.0); NLT15 is up to date (2.0 == 2.0)
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId switch
            {
                "ESV16" => (true, "1.0"),
                "NLT15" => (true, "2.0"),
                _ => (false, null),
            };
        ResourceManager.TestManifestFetch = resourceId =>
            resourceId switch
            {
                "ESV16" => (true, "2.0", false, null),
                "NLT15" => (true, "2.0", false, null),
                _ => (false, null, false, "Unknown resource"),
            };

        var resourceManager = new ResourceManager();

        // Act: Full lifecycle chain
        // Step 1: CAP-015 - Initialize
        var initResult = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        Assert.That(initResult.Success, Is.True, "Step 1 (CAP-015): Init should succeed");

        // Step 2: CAP-016 - List resources
        var listResult = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);
        Assert.That(listResult.Success, Is.True, "Step 2 (CAP-016): List should succeed");
        Assert.That(listResult.Resources, Is.Not.Null);
        Assert.That(listResult.Resources!.Count, Is.EqualTo(2), "Should list both resources");

        // Step 3: CAP-020 - Check each listed resource for updates
        var updateResults = new List<(string ResourceId, ResourceUpdateResult Result)>();
        foreach (var resource in listResult.Resources)
        {
            var updateResult = await resourceManager.CheckResourceUpdateAsync(
                new ResourceIdentityInput(resource.ResourceId),
                CancellationToken.None
            );
            updateResults.Add((resource.ResourceId, updateResult));
        }

        // Assert: All update checks succeeded
        Assert.That(
            updateResults.All(r => r.Result.Success),
            Is.True,
            "Step 3 (CAP-020): All update checks should succeed"
        );

        // Assert: ESV16 has update, NLT15 does not
        var esvUpdate = updateResults.First(r => r.ResourceId == "ESV16").Result;
        Assert.That(
            esvUpdate.UpdateAvailable,
            Is.True,
            "ESV16: Update should be available (1.0 -> 2.0)"
        );
        Assert.That(esvUpdate.CurrentVersion, Is.EqualTo("1.0"));
        Assert.That(esvUpdate.AvailableVersion, Is.EqualTo("2.0"));

        var nltUpdate = updateResults.First(r => r.ResourceId == "NLT15").Result;
        Assert.That(nltUpdate.UpdateAvailable, Is.False, "NLT15: No update (2.0 == 2.0)");
        Assert.That(nltUpdate.CurrentVersion, Is.EqualTo("2.0"));
        Assert.That(nltUpdate.AvailableVersion, Is.EqualTo("2.0"));
    }

    // =========================================================================
    // UNINITIALIZED STATE: CAP-016 without CAP-015
    // =========================================================================

    /// <summary>
    /// Integration: When GetAvailableResources (CAP-016) is called without prior
    /// initialization (CAP-015), it must return INVALID_STATE error.
    ///
    /// This verifies the dependency enforcement: CAP-016 requires CAP-015 to have
    /// completed before it can operate.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-016 without CAP-015")]
    [Property("CapabilityId", "CAP-015,CAP-016")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description(
        "GetAvailableResources without Init returns INVALID_STATE (dependency enforcement)"
    )]
    public async Task GetAvailableResources_WithoutInit_ReturnsInvalidState()
    {
        // Arrange: Fresh ResourceManager, no initialization called
        var resourceManager = new ResourceManager();

        // Act: Skip CAP-015, go directly to CAP-016
        var result = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: INVALID_STATE because CAP-015 precondition not met
        Assert.That(result.Success, Is.False, "Should fail without initialization");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE when CAP-015 not called first"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Resources must be initialized first"),
            "Error message should indicate initialization required"
        );
    }

    // =========================================================================
    // UNINITIALIZED STATE: CAP-020 without CAP-015
    // =========================================================================

    /// <summary>
    /// Integration: When CheckResourceUpdate (CAP-020) is called without prior
    /// initialization (CAP-015), it should still work for known resources
    /// (CAP-020 does not check _isInitialized directly -- it relies on resource
    /// lookup via test seam or ScrTextCollection).
    ///
    /// However, in a properly integrated system, the orchestrator ensures CAP-015
    /// runs first. This test verifies the behavior when the dependency is violated.
    ///
    /// Note: CAP-020's CheckResourceUpdateAsync does not gate on _isInitialized
    /// like CAP-016 does. It will attempt the resource lookup regardless. If the
    /// resource is not found (because ScrTextCollection is not initialized), it
    /// returns NOT_FOUND. This documents the actual integration behavior.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-020 without CAP-015")]
    [Property("CapabilityId", "CAP-015,CAP-020")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("CheckResourceUpdate without Init: resource lookup fails with NOT_FOUND")]
    public async Task CheckResourceUpdate_WithoutInit_ResourceLookupFails()
    {
        // Arrange: Fresh ResourceManager, no initialization called.
        // Without init, ScrTextCollection is not populated, so resource lookup fails.
        ResourceManager.TestResourceLookup = _ => (false, null);

        var resourceManager = new ResourceManager();

        // Act: Skip CAP-015, go directly to CAP-020
        var result = await resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("ESV16"),
            CancellationToken.None
        );

        // Assert: Resource not found because the system is not initialized
        Assert.That(result.Success, Is.False, "Should fail without initialization");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "Error code should be NOT_FOUND when resources not initialized"
        );
    }

    // =========================================================================
    // CHAIN: Init Failure -> CAP-016 still returns INVALID_STATE
    // =========================================================================

    /// <summary>
    /// Integration: When initialization (CAP-015) fails (e.g., no resources found),
    /// subsequent GetAvailableResources (CAP-016) calls still return INVALID_STATE
    /// because _isInitialized remains false.
    ///
    /// This verifies that a failed init does not accidentally set the initialized flag.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-015 (fail) -> CAP-016")]
    [Property("CapabilityId", "CAP-015,CAP-016")]
    [Property("ScenarioId", "TS-006,TS-022")]
    [Property("BehaviorId", "BHV-101,BHV-108")]
    [Description(
        "Failed Init -> GetAvailableResources: still INVALID_STATE (init flag not set on failure)"
    )]
    public async Task FailedInit_ThenGetAvailable_StillReturnsInvalidState()
    {
        // Arrange: Init will fail because no resources found
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (0, false);

        var resourceManager = new ResourceManager();

        // Act: CAP-015 fails, then try CAP-016
        var initResult = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        var listResult = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Init failed
        Assert.That(initResult.Success, Is.False, "CAP-015: Init should fail (no resources)");
        Assert.That(initResult.Error!.Code, Is.EqualTo("NOT_FOUND"));

        // Assert: CAP-016 still returns INVALID_STATE because init did not complete
        Assert.That(listResult.Success, Is.False, "CAP-016: Should fail after failed init");
        Assert.That(listResult.Error, Is.Not.Null);
        Assert.That(
            listResult.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "CAP-016: Should return INVALID_STATE because init failed"
        );
    }

    // =========================================================================
    // CHAIN: Re-initialization -> CAP-016 sees updated data
    // =========================================================================

    /// <summary>
    /// Integration: After initialization (CAP-015) and listing (CAP-016), if the
    /// resource manager is re-initialized with different data, a subsequent
    /// GetAvailableResources (CAP-016) call should reflect the new state.
    ///
    /// This tests that the initialization state is properly refreshed.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-015 -> CAP-016 -> CAP-015 -> CAP-016")]
    [Property("CapabilityId", "CAP-015,CAP-016")]
    [Property("ScenarioId", "TS-007,TS-022")]
    [Property("BehaviorId", "BHV-101,BHV-108")]
    [Description(
        "Re-init -> GetAvailableResources: new initialization data is reflected in listing"
    )]
    public async Task ReInit_ThenGetAvailable_ReflectsUpdatedResourceList()
    {
        // Arrange: First init with 1 resource
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (1, true);
        ResourceManager.TestGetAvailableResourceInfos = () =>
            new[]
            {
                new ResourceInfo(
                    ResourceId: "ESV16",
                    Name: "ESV",
                    FullName: "English Standard Version 2016 UK",
                    LanguageId: "en",
                    Version: "1.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2016 Crossway",
                    AvailableBooks: new[] { 1, 2, 3 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
            };

        var resourceManager = new ResourceManager();

        // Act: First cycle
        var initResult1 = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        var listResult1 = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        Assert.That(initResult1.Success, Is.True);
        Assert.That(listResult1.Resources!.Count, Is.EqualTo(1), "First listing: 1 resource");

        // Arrange: Update environment to have 2 resources
        ResourceManager.TestResourceDiscovery = () => (2, true);
        ResourceManager.TestGetAvailableResourceInfos = () =>
            new[]
            {
                new ResourceInfo(
                    ResourceId: "ESV16",
                    Name: "ESV",
                    FullName: "English Standard Version 2016 UK",
                    LanguageId: "en",
                    Version: "1.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2016 Crossway",
                    AvailableBooks: new[] { 1, 2, 3 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
                new ResourceInfo(
                    ResourceId: "NLT15",
                    Name: "NLT",
                    FullName: "New Living Translation",
                    LanguageId: "en",
                    Version: "2.0.0",
                    IsMarbleResource: true,
                    Copyright: "(c) 2015 Tyndale",
                    AvailableBooks: new[] { 1, 2, 3 },
                    Font: new FontInfo("Charis SIL", 12.0, null),
                    HtmlLanguage: "en"
                ),
            };

        // Act: Re-initialize and re-list
        var initResult2 = await resourceManager.InitializeResourcesAsync(CancellationToken.None);
        var listResult2 = await resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Second listing reflects updated data
        Assert.That(initResult2.Success, Is.True, "Re-init should succeed");
        Assert.That(initResult2.ResourceCount, Is.EqualTo(2), "Re-init: 2 resources");
        Assert.That(listResult2.Success, Is.True, "Re-list should succeed");
        Assert.That(listResult2.Resources!.Count, Is.EqualTo(2), "Second listing: 2 resources");
    }
}
