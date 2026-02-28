using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ResourceManager.CheckResourceUpdateAsync (CAP-020).
///
/// This capability checks whether a newer version of an Enhanced Resource is available
/// for download. Marble resources use semantic Version comparison (INV-005, INV-C05).
/// Not-installed resources always report as newer (TS-019). Manifest cache expires
/// after 24 hours (TS-086, VAL-010).
///
/// Contract: Section 4.20 (data-contracts.md)
/// Input: ResourceIdentityInput (Section 2.12)
/// Output: ResourceUpdateResult
/// Behaviors: BHV-106 (Resource Version Comparison for Updates)
/// Invariants: INV-005 (Marble Version-Based Versioning), INV-C05 (Version-Based Update Detection)
/// Golden Masters: GM-005 (resource installation - versionComparison section)
/// Extractions: EXT-020, EXT-035
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ResourceManagerCheckUpdateTests
{
    private ResourceManager _resourceManager = null!;

    // Save/restore fixture seams so CAP-015/CAP-016 tests are not disrupted
    private Func<bool>? _savedIsResourcesDirectoryConfigured;
    private Func<(int, bool)>? _savedResourceDiscovery;
    private Func<IReadOnlyList<ResourceInfo>>? _savedGetAvailableResourceInfos;

    [SetUp]
    public async Task SetUp()
    {
        // Save fixture seams before overriding for CAP-020 context
        _savedIsResourcesDirectoryConfigured = ResourceManager.TestIsResourcesDirectoryConfigured;
        _savedResourceDiscovery = ResourceManager.TestResourceDiscovery;
        _savedGetAvailableResourceInfos = ResourceManager.TestGetAvailableResourceInfos;

        // Set seams for CAP-020 initialization context
        ResourceManager.TestIsResourcesDirectoryConfigured = () => true;
        ResourceManager.TestResourceDiscovery = () => (2, true);
        ResourceManager.TestGetAvailableResourceInfos = null;
        ResourceManager.TestResourceLookup = null;
        ResourceManager.TestManifestFetch = null;
        ResourceManager.TestUtcNow = null;
        ResourceManager.TestManifestCacheTimestamp = null;

        _resourceManager = new ResourceManager();

        // CAP-020 requires CAP-015 initialization first (Section 4.20 precondition:
        // "Resource installed. Network access available for manifest check.")
        await _resourceManager.InitializeResourcesAsync(CancellationToken.None);
    }

    [TearDown]
    public void TearDown()
    {
        // Restore fixture seams so CAP-015/CAP-016 tests are not disrupted
        ResourceManager.TestIsResourcesDirectoryConfigured = _savedIsResourcesDirectoryConfigured;
        ResourceManager.TestResourceDiscovery = _savedResourceDiscovery;
        ResourceManager.TestGetAvailableResourceInfos = _savedGetAvailableResourceInfos;

        // Clear only CAP-020-specific test seams
        ResourceManager.TestResourceLookup = null;
        ResourceManager.TestManifestFetch = null;
        ResourceManager.TestUtcNow = null;
        ResourceManager.TestManifestCacheTimestamp = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-020
    // =========================================================================

    /// <summary>
    /// Acceptance test: When CheckResourceUpdate is called for an installed Marble
    /// resource with a newer version available on the server, the result indicates
    /// update available with correct version strings using Marble semantic versioning.
    ///
    /// GM-005 versionComparison section expected: newerVersion=true, notInstalled=true
    ///
    /// This test passes when CAP-020 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-005")]
    [Property("GoldenMaster", "GM-005")]
    [Description(
        "Acceptance test: Marble version comparison correctly determines update availability "
            + "using semantic versioning; result includes version strings and major update flag"
    )]
    public async Task CheckResourceUpdate_InstalledWithNewerAvailable_ReportsUpdateAvailable()
    {
        // Arrange: An installed Marble resource at version 1.0 with version 2.0 available
        // on the server. This matches GM-005 versionComparison.newerVersion=true scenario.
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "ESV16UK+" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var input = new ResourceIdentityInput("ESV16UK+");

        // Act: Call the public API defined in data-contracts.md Section 4.20
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Verify the complete outcome
        Assert.That(
            result.Success,
            Is.True,
            "Check should succeed with valid resource and network"
        );
        Assert.That(
            result.UpdateAvailable,
            Is.True,
            "Update should be available when server version (2.0) > installed version (1.0)"
        );
        Assert.That(
            result.CurrentVersion,
            Is.EqualTo("1.0"),
            "CurrentVersion should reflect installed version"
        );
        Assert.That(
            result.AvailableVersion,
            Is.EqualTo("2.0"),
            "AvailableVersion should reflect server version"
        );
        Assert.That(
            result.IsMajorUpdate,
            Is.False,
            "Minor version update should not be flagged as major"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-018: Marble version comparison uses ResourceVersion.
    /// When IsNewerThanCurrentlyInstalled is called for a Marble resource with
    /// a newer version available, the comparison uses semantic ResourceVersion
    /// (not DBL revision/checksum).
    ///
    /// TS-018 input: marbleResource=true, installedVersion="1.0", newVersion="2.0"
    /// TS-018 expected: isNewer=true
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-005")]
    [Description("Marble version comparison uses ResourceVersion, not DBL revision (TS-018)")]
    public async Task CheckResourceUpdate_NewerVersionAvailable_ReturnsUpdateAvailable()
    {
        // Arrange: Installed version 1.0, available version 2.0
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Per TS-018, isNewer=true when newVersion > installedVersion
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.UpdateAvailable,
            Is.True,
            "TS-018: Version 2.0 > 1.0 should report update available"
        );
        Assert.That(result.CurrentVersion, Is.EqualTo("1.0"));
        Assert.That(result.AvailableVersion, Is.EqualTo("2.0"));
    }

    /// <summary>
    /// When the installed version matches the available version, no update
    /// should be reported.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Same version installed and available reports no update")]
    public async Task CheckResourceUpdate_SameVersion_ReturnsNoUpdate()
    {
        // Arrange: Both versions are "2.0"
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "2.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Same version means no update available
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.UpdateAvailable,
            Is.False,
            "Same version should report no update available"
        );
        Assert.That(result.CurrentVersion, Is.EqualTo("2.0"));
        Assert.That(result.AvailableVersion, Is.EqualTo("2.0"));
    }

    /// <summary>
    /// When a major update is available (major version component changes),
    /// the isMajorUpdate flag should be set.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Major version update sets isMajorUpdate flag")]
    public async Task CheckResourceUpdate_MajorUpdateAvailable_SetsMajorUpdateFlag()
    {
        // Arrange: Version 1.0 -> 2.0 with major update flag
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", true, null);

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Major update flag should be set
        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdateAvailable, Is.True);
        Assert.That(
            result.IsMajorUpdate,
            Is.True,
            "Major version update should set IsMajorUpdate flag"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// When the resource ID is not found in the collection, the result should
    /// fail with NOT_FOUND error code per Section 4.20 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Unknown resource returns NOT_FOUND error")]
    public async Task CheckResourceUpdate_ResourceNotFound_ReturnsNotFound()
    {
        // Arrange: Resource lookup returns not found
        ResourceManager.TestResourceLookup = _ => (false, null);

        var input = new ResourceIdentityInput("NonExistentResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Per Section 4.20 error conditions
        Assert.That(result.Success, Is.False, "Should fail for unknown resource");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Resource 'NonExistentResource' not found"),
            "Error message should include resource ID"
        );
    }

    /// <summary>
    /// When the network is unavailable, the result should fail with
    /// NETWORK_ERROR error code per Section 4.20 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Network unavailable returns NETWORK_ERROR")]
    public async Task CheckResourceUpdate_NetworkUnavailable_ReturnsNetworkError()
    {
        // Arrange: Resource exists but network is down
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (false, null, false, "no network connection");

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Per Section 4.20 error conditions
        Assert.That(result.Success, Is.False, "Should fail when network is unavailable");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("NETWORK_ERROR"),
            "Error code should be NETWORK_ERROR"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Cannot check for updates: no network connection"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// When the manifest download fails (network available but download fails),
    /// the result should fail with NETWORK_ERROR and a download-specific message
    /// per Section 4.20 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Manifest download failure returns NETWORK_ERROR with download message")]
    public async Task CheckResourceUpdate_ManifestDownloadFailed_ReturnsNetworkError()
    {
        // Arrange: Resource exists, network is available but manifest download fails
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ =>
            (true, null, false, "Failed to download resource manifest");

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Per Section 4.20 error conditions
        Assert.That(result.Success, Is.False, "Should fail when manifest download fails");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("NETWORK_ERROR"),
            "Error code should be NETWORK_ERROR for download failure"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Failed to download resource manifest"),
            "Error message should match contract for download failure"
        );
    }

    /// <summary>
    /// Cancellation token is respected during update check.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Cancellation during update check is respected")]
    public void CheckResourceUpdate_WhenCancelled_ThrowsOperationCanceled()
    {
        // Arrange
        using var cts = new CancellationTokenSource();
        cts.Cancel();
        var input = new ResourceIdentityInput("TestResource");

        // Act & Assert
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await _resourceManager.CheckResourceUpdateAsync(input, cts.Token)
        );
    }

    // =========================================================================
    // EDGE CASE TESTS
    // =========================================================================

    /// <summary>
    /// TS-019: Not-installed resource always returns isNewer=true.
    /// When IsNewerThanCurrentlyInstalled is called for a resource that is
    /// not yet installed, it should always report as newer regardless of version.
    ///
    /// TS-019 input: installed=false
    /// TS-019 expected: isNewer=true
    ///
    /// This is a critical edge case from the strategic plan.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-106")]
    [Description("TS-019: Not-installed resource always reports as newer (update available)")]
    public async Task CheckResourceUpdate_NotInstalled_AlwaysReportsUpdateAvailable()
    {
        // Arrange: Resource exists in manifest but is not installed locally.
        // The resource lookup returns exists=true but currentVersion is null
        // (representing a resource known to the system but not installed).
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "NewResource" ? (true, null) : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "1.0", false, null);

        var input = new ResourceIdentityInput("NewResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Per TS-019, not-installed always reports isNewer=true
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.UpdateAvailable,
            Is.True,
            "TS-019: Not-installed resource must always report update available"
        );
        Assert.That(
            result.AvailableVersion,
            Is.EqualTo("1.0"),
            "Available version should be from manifest"
        );
    }

    // =========================================================================
    // MANIFEST CACHE TESTS
    // =========================================================================

    /// <summary>
    /// TS-086: Manifest cache expires after 24 hours.
    /// When the manifest cache is older than 24 hours, the system should
    /// re-download the manifest from the server.
    ///
    /// TS-086 input: hoursSinceCache=25
    /// TS-086 expected: cacheValid=false (triggers re-download)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-086")]
    [Property("BehaviorId", "BHV-306")]
    [Description("TS-086: Manifest cache expires after 24 hours, triggers re-download")]
    public async Task CheckResourceUpdate_CacheOlderThan24Hours_RedownloadsManifest()
    {
        // Arrange: Cache timestamp is 25 hours ago; manifest fetch should be invoked
        var fixedNow = new DateTime(2026, 2, 28, 12, 0, 0, DateTimeKind.Utc);
        var cacheTimestamp = fixedNow.AddHours(-25);
        var manifestFetchCalled = false;

        ResourceManager.TestUtcNow = () => fixedNow;
        ResourceManager.TestManifestCacheTimestamp = _ => cacheTimestamp;
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ =>
        {
            manifestFetchCalled = true;
            return (true, "1.1", false, null);
        };

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Cache is stale, so manifest should be re-downloaded
        Assert.That(result.Success, Is.True);
        Assert.That(
            manifestFetchCalled,
            Is.True,
            "TS-086: Manifest should be re-downloaded when cache is older than 24 hours"
        );
        Assert.That(
            result.UpdateAvailable,
            Is.True,
            "Update should be detected from fresh manifest data"
        );
    }

    /// <summary>
    /// TS-087: Manifest cache is valid within 24 hours.
    /// When the manifest cache is less than 24 hours old, the cached
    /// manifest data should be used without a network call.
    ///
    /// TS-087 input: hoursSinceCache=12
    /// TS-087 expected: cacheValid=true (no re-download)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-306")]
    [Description("TS-087: Manifest cache is valid within 24 hours, no re-download")]
    public async Task CheckResourceUpdate_CacheWithin24Hours_UsesCachedManifest()
    {
        // Arrange: Cache timestamp is 12 hours ago; manifest fetch should NOT be invoked
        var fixedNow = new DateTime(2026, 2, 28, 12, 0, 0, DateTimeKind.Utc);
        var cacheTimestamp = fixedNow.AddHours(-12);
        var manifestFetchCalled = false;

        ResourceManager.TestUtcNow = () => fixedNow;
        ResourceManager.TestManifestCacheTimestamp = _ => cacheTimestamp;
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "TestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ =>
        {
            manifestFetchCalled = true;
            return (true, "1.1", false, null);
        };

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Cache is still valid, so manifest should NOT be re-downloaded
        Assert.That(result.Success, Is.True);
        Assert.That(
            manifestFetchCalled,
            Is.False,
            "TS-087: Manifest should NOT be re-downloaded when cache is within 24 hours"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-005: Resource Installation and Identity - versionComparison section.
    /// Verifies Marble version comparison behavior matches the PT9 golden master:
    /// - versionComparison.newerVersion: true (2.0 > 1.0)
    /// - versionComparison.notInstalled: true (not installed always newer)
    ///
    /// Note: Data-contracts.md Section 4.20 explicitly references GM-005.
    /// The strategic plan references gm-003 but gm-003 is about immutability;
    /// gm-005 contains the actual version comparison golden master data.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-005")]
    [Property("GoldenMaster", "GM-005")]
    [Description(
        "GM-005: Version comparison matches PT9 golden master (newerVersion, notInstalled)"
    )]
    public async Task GoldenMaster_GM005_VersionComparison()
    {
        // GM-005 expected output (versionComparison section):
        // newerVersion: true  (version 2.0 > 1.0)
        // notInstalled: true  (not installed always reports as newer)

        // Part 1: newerVersion=true (installedVersion=1.0, newVersion=2.0)
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "MarbleTestResource" ? (true, "1.0") : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var newerResult = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("MarbleTestResource"),
            CancellationToken.None
        );

        Assert.That(newerResult.Success, Is.True);
        Assert.That(
            newerResult.UpdateAvailable,
            Is.True,
            "GM-005: newerVersion should be true (2.0 > 1.0)"
        );

        // Part 2: notInstalled=true (resource not installed, should always be newer)
        ResourceManager.TestResourceLookup = resourceId =>
            resourceId == "NewMarbleResource" ? (true, null) : (false, null);
        ResourceManager.TestManifestFetch = _ => (true, "1.0", false, null);

        var notInstalledResult = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("NewMarbleResource"),
            CancellationToken.None
        );

        Assert.That(notInstalledResult.Success, Is.True);
        Assert.That(
            notInstalledResult.UpdateAvailable,
            Is.True,
            "GM-005: notInstalled should always report as newer"
        );
    }

    // =========================================================================
    // INVARIANT TESTS
    // =========================================================================

    /// <summary>
    /// INV-005: Marble Version-Based Versioning.
    /// Marble resources use semantic Version comparison for update detection.
    /// Non-Marble (DBL) resources use revision/checksum comparison (not tested here
    /// since CAP-020 focuses on Marble resources).
    ///
    /// Verification: version "1.5" < "2.0" and "2.0" == "2.0".
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("INV-005: Marble resources use semantic Version comparison for update detection")]
    public async Task Invariant_INV005_MarbleUsesSemanticVersionComparison()
    {
        // INV-005: "Marble resources use semantic Version comparison for
        // update detection. Non-Marble (DBL) resources use revision/checksum."

        // Case 1: Higher version -> update available
        ResourceManager.TestResourceLookup = _ => (true, "1.5");
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var result1 = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("TestResource"),
            CancellationToken.None
        );

        Assert.That(result1.Success, Is.True);
        Assert.That(
            result1.UpdateAvailable,
            Is.True,
            "INV-005: Version 2.0 > 1.5 should detect update (semantic comparison)"
        );

        // Case 2: Same version -> no update
        ResourceManager.TestResourceLookup = _ => (true, "2.0");
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var result2 = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("TestResource"),
            CancellationToken.None
        );

        Assert.That(result2.Success, Is.True);
        Assert.That(
            result2.UpdateAvailable,
            Is.False,
            "INV-005: Same version should NOT detect update"
        );

        // Case 3: Lower version on server -> no update
        ResourceManager.TestResourceLookup = _ => (true, "3.0");
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var result3 = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("TestResource"),
            CancellationToken.None
        );

        Assert.That(result3.Success, Is.True);
        Assert.That(
            result3.UpdateAvailable,
            Is.False,
            "INV-005: Lower server version should NOT detect update"
        );
    }

    /// <summary>
    /// INV-C05: Version-Based Update Detection.
    /// Formal: isMarble(r) => updateAvailable(r) == (r.availableVersion > r.installedVersion)
    ///
    /// This invariant verifies the formal property that for Marble resources,
    /// update availability is strictly determined by version comparison.
    /// </summary>
    [TestCase("1.0", "2.0", true, Description = "2.0 > 1.0 -> update available")]
    [TestCase("2.0", "2.0", false, Description = "2.0 == 2.0 -> no update")]
    [TestCase("3.0", "2.0", false, Description = "2.0 < 3.0 -> no update")]
    [TestCase("1.0", "1.1", true, Description = "1.1 > 1.0 -> minor update")]
    [TestCase("1.0.0", "1.0.1", true, Description = "1.0.1 > 1.0.0 -> patch update")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-C05")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("INV-C05: updateAvailable == (availableVersion > installedVersion)")]
    public async Task Invariant_INVC05_UpdateAvailableEqualsVersionComparison(
        string installedVersion,
        string availableVersion,
        bool expectedUpdateAvailable
    )
    {
        // INV-C05: "isMarble(r) => updateAvailable(r) == (r.availableVersion > r.installedVersion)"
        ResourceManager.TestResourceLookup = _ => (true, installedVersion);
        ResourceManager.TestManifestFetch = _ => (true, availableVersion, false, null);

        var result = await _resourceManager.CheckResourceUpdateAsync(
            new ResourceIdentityInput("TestResource"),
            CancellationToken.None
        );

        Assert.That(result.Success, Is.True);
        Assert.That(
            result.UpdateAvailable,
            Is.EqualTo(expectedUpdateAvailable),
            $"INV-C05: For installed={installedVersion}, available={availableVersion}, "
                + $"updateAvailable should be {expectedUpdateAvailable}"
        );
    }

    // =========================================================================
    // RESULT TYPE TESTS
    // =========================================================================

    /// <summary>
    /// Success result contains all expected fields per Section 4.20 result type.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Success result has correct structure per Section 4.20")]
    public async Task CheckResourceUpdate_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        ResourceManager.TestResourceLookup = _ => (true, "1.0");
        ResourceManager.TestManifestFetch = _ => (true, "2.0", false, null);

        var input = new ResourceIdentityInput("TestResource");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Verify result structure per data-contracts.md Section 4.20
        // { success: true, updateAvailable: boolean, currentVersion: string,
        //   availableVersion: string|null, isMajorUpdate: boolean }
        Assert.That(result.Success, Is.True);
        Assert.That(result.CurrentVersion, Is.Not.Null.And.Not.Empty, "currentVersion required");
        Assert.That(result.AvailableVersion, Is.Not.Null, "availableVersion should be present");
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Error result contains error code and message fields per Section 4.20.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-106")]
    [Description("Error result has correct structure per Section 4.20")]
    public async Task CheckResourceUpdate_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Trigger NOT_FOUND error
        ResourceManager.TestResourceLookup = _ => (false, null);

        var input = new ResourceIdentityInput("NonExistent");

        // Act
        var result = await _resourceManager.CheckResourceUpdateAsync(input, CancellationToken.None);

        // Assert: Verify error result structure per data-contracts.md Section 4.20
        // { success: false, error: { code: string, message: string } }
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null, "Error object should be present on failure");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code required");
        Assert.That(result.Error.Message, Is.Not.Null.And.Not.Empty, "Error message required");
    }
}
