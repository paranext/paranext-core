using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-020: CheckForResourceUpdates.
/// Verifies that the update checking system:
/// - Returns resources with available updates (data-contracts.md Method 20)
/// - Respects three schedule modes: Never, OnStartup, Daily (BHV-509)
/// - Uses System.Version comparison for Marble resources (BHV-107, INV-005)
/// - Provides thread-safe update status queries (BHV-510)
/// - Caches manifests for 24 hours (INV-013)
/// - Persists schedule type preference (BHV-525)
/// - Detects V2 upgrades and auto-queues required data (BHV-507)
///
/// PT9 Source: Paratext/Marble/InstallableRemoteResource.cs:166-273 (manifest fetch/cache)
/// PT9 Source: Paratext/Marble/InstallResourcesScheduleManager.cs:37-261 (schedule/timer)
/// PT9 Source: ParatextData/Archiving/InstallableResource.cs:193-219 (version comparison)
///
/// Contract: data-contracts.md Method 20 (CheckForResourceUpdates)
///
/// These tests will FAIL in RED state because:
/// - ResourceUpdateService does not yet exist
/// - IInternetAccessChecker and IManifestProvider interfaces do not yet exist
/// - The update checking workflow has not been implemented
/// </summary>
[TestFixture]
internal class ResourceUpdateTests : PapiTestBase
{
    #region Acceptance Tests

    /// <summary>
    /// Outer acceptance test for CAP-020: CheckForResourceUpdates full workflow.
    /// Verifies that calling CheckForResourceUpdatesAsync returns a list of
    /// resources that have newer versions available on the server.
    /// When this test passes, the update checking capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-020")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-018")]
    [Description("Acceptance test: CheckForResourceUpdates returns resources with updates")]
    public void CheckForResourceUpdates_FullWorkflow_AcceptanceTest()
    {
        // Arrange: Set up installed resources with known versions
        // and a manifest provider that reports newer versions
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string>
            {
                ["ESV16UK+"] = "2.1.0.0",
                ["KJV+"] = "1.0.0.0",
            }
        );

        // Install ESV16UK+ at version 2.0 (older than manifest's 2.1)
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");
        // Install KJV+ at version 1.0 (same as manifest -- no update)
        ResourceInstallService.SetupInstalledMarbleForTesting("KJV+", version: "1.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> updatesAvailable = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert: Only ESV16UK+ should have an update
        Assert.Multiple(() =>
        {
            Assert.That(updatesAvailable, Is.Not.Null, "Result is not null");
            Assert.That(updatesAvailable, Has.Count.EqualTo(1), "Only one resource has update");
            Assert.That(
                updatesAvailable[0].ShortName,
                Is.EqualTo("ESV16UK+"),
                "ESV16UK+ has a newer version available"
            );
            Assert.That(
                updatesAvailable[0].HasUpdate,
                Is.True,
                "HasUpdate flag set for resource with newer version"
            );
        });
    }

    #endregion

    #region Method 20: CheckForResourceUpdatesAsync Contract

    /// <summary>
    /// TS-018: Happy path - returns resources where remote version > installed version.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-107")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Returns resources where remote version is newer than installed")]
    public void CheckForResourceUpdatesAsync_NewerVersionAvailable_ReturnsResource()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["SDBG+"] = "3.0.0.0" }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("SDBG+", version: "2.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> result = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].ShortName, Is.EqualTo("SDBG+"));
    }

    /// <summary>
    /// TS-019: Returns empty list when all resources are at current version.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-107")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Returns empty list when all resources are current")]
    public void CheckForResourceUpdatesAsync_AllCurrent_ReturnsEmptyList()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.0.0.0" }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> result = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert
        Assert.That(result, Is.Empty, "No updates when all resources are current");
    }

    /// <summary>
    /// Error path: Returns error when internet access is disabled.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-100")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Throws when internet access is disabled")]
    public void CheckForResourceUpdatesAsync_InternetDisabled_ThrowsNetworkUnavailable()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: false);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act & Assert: Should throw or return error for NETWORK_UNAVAILABLE
        var ex = Assert.Throws<InvalidOperationException>(
            () => updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult()
        );
        Assert.That(
            ex!.Message,
            Does.Contain("Internet access is disabled").IgnoreCase,
            "Error mentions internet access"
        );
    }

    /// <summary>
    /// Error path: Returns error when manifest fetch fails.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-092")]
    [Property("BehaviorId", "BHV-501")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Throws when manifest fetch fails")]
    public void CheckForResourceUpdatesAsync_ManifestFetchFails_ThrowsManifestFetchFailed()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(throwOnFetch: true);

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(
            () => updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult()
        );
        Assert.That(
            ex!.Message,
            Does.Contain("Failed to download resource manifest").IgnoreCase,
            "Error mentions manifest fetch failure"
        );
    }

    /// <summary>
    /// Returns empty list when no enhanced resources are installed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-107")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Returns empty list when no ERs installed")]
    public void CheckForResourceUpdatesAsync_NoResourcesInstalled_ReturnsEmptyList()
    {
        // Arrange: No resources installed, manifest has entries
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.0.0.0" }
        );

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> result = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert: No installed resources means no updates to report
        Assert.That(result, Is.Empty, "No updates when no resources installed");
    }

    /// <summary>
    /// Supports cancellation token.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-107")]
    [Property("CapabilityId", "CAP-020")]
    [Description("CheckForResourceUpdatesAsync respects cancellation token")]
    public void CheckForResourceUpdatesAsync_Cancelled_ThrowsOperationCancelled()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);
        var cts = new CancellationTokenSource();
        cts.Cancel(); // Pre-cancel

        // Act & Assert
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await updateService.CheckForResourceUpdatesAsync(cts.Token)
        );
    }

    #endregion

    #region BHV-509: Background Update Schedule Manager

    /// <summary>
    /// TS-099: Daily schedule mode configures 10-second first check, 24-hour repeat.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Daily schedule: 10-second first check, 24-hour repeat")]
    public void ScheduleManager_DailyMode_ConfiguresCorrectTimerIntervals()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        var scheduleConfig = updateService.GetScheduleConfiguration(
            UpdateScheduleType.Daily
        );

        // Assert: 10-second initial delay, 24-hour repeat
        Assert.Multiple(() =>
        {
            Assert.That(
                scheduleConfig.InitialDelayMs,
                Is.EqualTo(10_000),
                "BHV-509: 10-second first check delay"
            );
            Assert.That(
                scheduleConfig.RepeatIntervalMs,
                Is.EqualTo(86_400_000),
                "BHV-509: 24-hour repeat interval"
            );
        });
    }

    /// <summary>
    /// OnStartup schedule mode configures single check at start (no repeat).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("OnStartup schedule: single check at start, no repeat")]
    public void ScheduleManager_OnStartupMode_ConfiguresSingleCheck()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        var scheduleConfig = updateService.GetScheduleConfiguration(
            UpdateScheduleType.OnStartup
        );

        // Assert: 10-second initial delay, no repeat (0 or Timeout.Infinite)
        Assert.Multiple(() =>
        {
            Assert.That(
                scheduleConfig.InitialDelayMs,
                Is.EqualTo(10_000),
                "BHV-509: 10-second initial delay for startup check"
            );
            Assert.That(
                scheduleConfig.RepeatIntervalMs,
                Is.EqualTo(0).Or.EqualTo(-1),
                "OnStartup: no repeat interval (single shot)"
            );
        });
    }

    /// <summary>
    /// Never schedule mode returns zero-interval config (no timer started).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Never schedule: no timer started")]
    public void ScheduleManager_NeverMode_ReturnsNoTimerConfig()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        var scheduleConfig = updateService.GetScheduleConfiguration(
            UpdateScheduleType.Never
        );

        // Assert: No timer started
        Assert.Multiple(() =>
        {
            Assert.That(
                scheduleConfig.InitialDelayMs,
                Is.EqualTo(0),
                "Never mode: no initial delay"
            );
            Assert.That(
                scheduleConfig.RepeatIntervalMs,
                Is.EqualTo(0),
                "Never mode: no repeat interval"
            );
        });
    }

    /// <summary>
    /// TS-100: Background update skipped when internet disabled, regardless of schedule mode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-100")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Update check skipped silently when internet disabled")]
    public void ScheduleManager_InternetDisabled_SkipsCheckSilently()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: false);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act: ShouldExecuteCheck returns false when internet is disabled
        bool shouldCheck = updateService.ShouldExecuteCheck(UpdateScheduleType.Daily);

        // Assert
        Assert.That(
            shouldCheck,
            Is.False,
            "BHV-509: Check skipped when internet disabled"
        );
    }

    /// <summary>
    /// ShouldExecuteCheck returns true when internet available and schedule is not Never.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Check proceeds when internet available and schedule active")]
    public void ScheduleManager_InternetAvailableDailyMode_ShouldExecuteCheck()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        bool shouldCheck = updateService.ShouldExecuteCheck(UpdateScheduleType.Daily);

        // Assert
        Assert.That(
            shouldCheck,
            Is.True,
            "Check should execute when internet available and schedule is Daily"
        );
    }

    /// <summary>
    /// ShouldExecuteCheck returns false when schedule is Never, even with internet.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Never mode skips check even with internet")]
    public void ScheduleManager_NeverModeWithInternet_SkipsCheck()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        bool shouldCheck = updateService.ShouldExecuteCheck(UpdateScheduleType.Never);

        // Assert
        Assert.That(
            shouldCheck,
            Is.False,
            "Never mode: no check regardless of internet"
        );
    }

    #endregion

    #region BHV-510: Thread-Safe Update Status Query

    /// <summary>
    /// TS-101: ResourceHasUpdates returns consistent result under concurrent access.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-510")]
    [Property("CapabilityId", "CAP-020")]
    [Description("ResourceHasUpdates is thread-safe via lock")]
    public void ResourceHasUpdates_ConcurrentAccess_ReturnsConsistentResult()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.1.0.0" }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Pre-populate the update status
        updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult();

        // Act: Query from multiple threads concurrently
        var results = new bool[10];
        var tasks = new Task[10];
        for (int i = 0; i < 10; i++)
        {
            int index = i;
            tasks[index] = Task.Run(() =>
            {
                results[index] = updateService.ResourceHasUpdates("ESV16UK+");
            });
        }
        Task.WaitAll(tasks);

        // Assert: All threads see the same consistent result
        Assert.That(
            results,
            Is.All.True,
            "BHV-510: All concurrent queries return consistent true for ESV16UK+"
        );
    }

    /// <summary>
    /// ResourceHasUpdates returns false for a resource with no update.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-510")]
    [Property("CapabilityId", "CAP-020")]
    [Description("ResourceHasUpdates returns false for current resource")]
    public void ResourceHasUpdates_CurrentVersion_ReturnsFalse()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.0.0.0" }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);
        updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult();

        // Act
        bool hasUpdate = updateService.ResourceHasUpdates("ESV16UK+");

        // Assert
        Assert.That(
            hasUpdate,
            Is.False,
            "No update for resource at current version"
        );
    }

    /// <summary>
    /// ResourceHasUpdates returns false for unknown resource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-510")]
    [Property("CapabilityId", "CAP-020")]
    [Description("ResourceHasUpdates returns false for unknown resource")]
    public void ResourceHasUpdates_UnknownResource_ReturnsFalse()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        bool hasUpdate = updateService.ResourceHasUpdates("NonExistent");

        // Assert
        Assert.That(
            hasUpdate,
            Is.False,
            "Unknown resource reports no update"
        );
    }

    #endregion

    #region INV-013: Manifest Cache TTL Is 24 Hours

    /// <summary>
    /// TS-091: Cached manifest valid within 24 hours -- no re-download triggered.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-013")]
    [Property("CapabilityId", "CAP-020")]
    [Description("INV-013: Manifest cache valid within 24 hours")]
    public void ManifestCache_WithinTTL_UsesCache()
    {
        // Arrange: Manifest fetched 12 hours ago (within 24-hour TTL)
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.1.0.0" }
        );
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // First call populates the cache
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");
        updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult();

        // Simulate time passing (but within 24 hours)
        updateService.SetManifestCacheAge(TimeSpan.FromHours(12));

        // Act: Check if manifest is still considered fresh
        bool isCacheFresh = updateService.IsManifestCacheFresh();

        // Assert
        Assert.That(
            isCacheFresh,
            Is.True,
            "INV-013: Cache is fresh at 12 hours (within 24h TTL)"
        );
    }

    /// <summary>
    /// TS-092: Manifest cache expired after 24 hours -- triggers re-download.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-092")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-013")]
    [Property("CapabilityId", "CAP-020")]
    [Description("INV-013: Manifest cache expired after 24 hours")]
    public void ManifestCache_AfterTTL_RequiresReDownload()
    {
        // Arrange: Manifest fetched 25 hours ago (past 24-hour TTL)
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.1.0.0" }
        );
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // First call populates the cache
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "2.0.0.0");
        updateService.CheckForResourceUpdatesAsync().GetAwaiter().GetResult();

        // Simulate 25 hours passing (past TTL)
        updateService.SetManifestCacheAge(TimeSpan.FromHours(25));

        // Act: Check if manifest is stale
        bool isCacheFresh = updateService.IsManifestCacheFresh();

        // Assert
        Assert.That(
            isCacheFresh,
            Is.False,
            "INV-013: Cache is stale at 25 hours (past 24h TTL)"
        );
    }

    /// <summary>
    /// Manifest cache TTL is exactly 86400 seconds (24 hours).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-013")]
    [Property("CapabilityId", "CAP-020")]
    [Description("INV-013: Cache TTL is exactly 86400 seconds")]
    public void ManifestCache_TTL_IsExactly86400Seconds()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        int cacheTtlSeconds = updateService.GetManifestCacheTtlSeconds();

        // Assert
        Assert.That(
            cacheTtlSeconds,
            Is.EqualTo(86_400),
            "INV-013: Manifest cache TTL is 24 hours (86400 seconds)"
        );
    }

    #endregion

    #region BHV-525: Schedule Memento Persistence

    /// <summary>
    /// TS-115: Schedule type persisted and restored.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-115")]
    [Property("BehaviorId", "BHV-525")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Schedule type saved and loaded via persistence")]
    public void ScheduleMemento_SaveAndLoad_RoundTrips()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act: Save a schedule type
        updateService.SaveScheduleType(UpdateScheduleType.Daily);

        // Load it back
        UpdateScheduleType loaded = updateService.LoadScheduleType();

        // Assert
        Assert.That(
            loaded,
            Is.EqualTo(UpdateScheduleType.Daily),
            "BHV-525: Schedule type round-trips correctly"
        );
    }

    /// <summary>
    /// TS-115: Default schedule type is Never.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-115")]
    [Property("BehaviorId", "BHV-525")]
    [Property("CapabilityId", "CAP-020")]
    [Description("Default schedule type is Never")]
    public void ScheduleMemento_Default_IsNever()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act: Load schedule type without having saved one
        UpdateScheduleType defaultType = updateService.LoadScheduleType();

        // Assert
        Assert.That(
            defaultType,
            Is.EqualTo(UpdateScheduleType.Never),
            "BHV-525: Default schedule type is Never"
        );
    }

    /// <summary>
    /// OnStartup schedule type persisted correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-115")]
    [Property("BehaviorId", "BHV-525")]
    [Property("CapabilityId", "CAP-020")]
    [Description("OnStartup schedule type persists and loads")]
    public void ScheduleMemento_OnStartup_PersistsCorrectly()
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(new Dictionary<string, string>());
        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        updateService.SaveScheduleType(UpdateScheduleType.OnStartup);
        UpdateScheduleType loaded = updateService.LoadScheduleType();

        // Assert
        Assert.That(
            loaded,
            Is.EqualTo(UpdateScheduleType.OnStartup),
            "OnStartup schedule type persists correctly"
        );
    }

    #endregion

    #region BHV-507: V2 Upgrade Detection

    /// <summary>
    /// TS-098: V2 upgrade detection auto-queues required data files.
    /// When a resource has a major version upgrade (v1 -> v2), required data
    /// files for the V2 format should be auto-added to the update results.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "BHV-507")]
    [Property("CapabilityId", "CAP-020")]
    [Description("V2 upgrade detection auto-queues required data")]
    public void CheckForResourceUpdates_V2Upgrade_AutoQueuesRequiredData()
    {
        // Arrange: Installed at v1, manifest has v2 (major upgrade)
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["ESV16UK+"] = "2.0.0.0" },
            v2UpgradeAvailable: new HashSet<string> { "ESV16UK+" }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("ESV16UK+", version: "1.0.0.0");

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> updates = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert: V2 upgrade detected
        Assert.That(updates, Is.Not.Empty, "V2 upgrade detected");
        Assert.That(
            updateService.HasV2UpgradeAvailable("ESV16UK+"),
            Is.True,
            "BHV-507: V2 upgrade flagged for auto-queueing"
        );
    }

    #endregion

    #region INV-005: Version Comparison Invariant Tests

    /// <summary>
    /// INV-005: Marble Version Comparison Uses System.Version.
    /// Multiple version format variations tested through the update service.
    /// </summary>
    [TestCase("2.0.0.0", "2.1.0.0", true)]
    [TestCase("2.0.0.0", "2.0.0.0", false)]
    [TestCase("2.1.0.0", "2.0.0.0", false)]
    [TestCase("1.0.0.0", "2.0.0.0", true)]
    [TestCase("1.9.9.9", "2.0.0.0", true)]
    [TestCase("2.0", "2.1", true)]
    [TestCase("2.0", "2.0", false)]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-018")]
    [Property("CapabilityId", "CAP-020")]
    [Description("INV-005: Version comparison uses System.Version semantics")]
    public void Invariant_INV005_VersionComparison_ThroughUpdateService(
        string installedVersion,
        string remoteVersion,
        bool expectUpdate
    )
    {
        // Arrange
        var internetChecker = new FakeInternetAccessChecker(isAvailable: true);
        var manifestProvider = new FakeManifestProvider(
            new Dictionary<string, string> { ["TestRes"] = remoteVersion }
        );
        ResourceInstallService.SetupInstalledMarbleForTesting("TestRes", version: installedVersion);

        var updateService = new ResourceUpdateService(internetChecker, manifestProvider);

        // Act
        IReadOnlyList<EnhancedResourceInfo> result = updateService
            .CheckForResourceUpdatesAsync()
            .GetAwaiter()
            .GetResult();

        // Assert
        bool hasUpdate = result.Any(r => r.ShortName == "TestRes");
        Assert.That(
            hasUpdate,
            Is.EqualTo(expectUpdate),
            $"INV-005: {remoteVersion} vs installed {installedVersion} should have update={expectUpdate}"
        );
    }

    #endregion

    #region UpdateScheduleType Enum

    /// <summary>
    /// Verify UpdateScheduleType enum has exactly three values matching PT9.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("UpdateScheduleType has Never, OnStartup, Daily")]
    public void UpdateScheduleType_HasThreeValues()
    {
        // Act
        var values = Enum.GetValues(typeof(UpdateScheduleType));

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(values, Has.Length.EqualTo(3), "Exactly three schedule types");
            Assert.That(
                Enum.IsDefined(typeof(UpdateScheduleType), "Never"),
                Is.True,
                "Never is defined"
            );
            Assert.That(
                Enum.IsDefined(typeof(UpdateScheduleType), "OnStartup"),
                Is.True,
                "OnStartup is defined"
            );
            Assert.That(
                Enum.IsDefined(typeof(UpdateScheduleType), "Daily"),
                Is.True,
                "Daily is defined"
            );
        });
    }

    #endregion

    #region ScheduleConfiguration Record

    /// <summary>
    /// ScheduleConfiguration record holds InitialDelayMs and RepeatIntervalMs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-509")]
    [Property("CapabilityId", "CAP-020")]
    [Description("ScheduleConfiguration record stores timer parameters")]
    public void ScheduleConfiguration_StoresTimerParameters()
    {
        // Act
        var config = new ScheduleConfiguration(
            InitialDelayMs: 10_000,
            RepeatIntervalMs: 86_400_000
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(config.InitialDelayMs, Is.EqualTo(10_000));
            Assert.That(config.RepeatIntervalMs, Is.EqualTo(86_400_000));
        });
    }

    #endregion

    #region Test Fakes

    /// <summary>
    /// Fake internet access checker for deterministic testing.
    /// Implements IInternetAccessChecker to control internet availability in tests.
    /// </summary>
    private sealed class FakeInternetAccessChecker : IInternetAccessChecker
    {
        private readonly bool _isAvailable;

        public FakeInternetAccessChecker(bool isAvailable)
        {
            _isAvailable = isAvailable;
        }

        public bool IsInternetAvailable() => _isAvailable;
    }

    /// <summary>
    /// Fake manifest provider for deterministic testing.
    /// Implements IManifestProvider to return configured manifest data without HTTP calls.
    /// </summary>
    private sealed class FakeManifestProvider : IManifestProvider
    {
        private readonly Dictionary<string, string>? _remoteVersions;
        private readonly bool _throwOnFetch;
        private readonly HashSet<string>? _v2Upgrades;

        public FakeManifestProvider(
            Dictionary<string, string>? remoteVersions = null,
            bool throwOnFetch = false,
            HashSet<string>? v2UpgradeAvailable = null
        )
        {
            _remoteVersions = remoteVersions;
            _throwOnFetch = throwOnFetch;
            _v2Upgrades = v2UpgradeAvailable;
        }

        public Dictionary<string, string> FetchManifest()
        {
            if (_throwOnFetch)
                throw new InvalidOperationException(
                    "Failed to download resource manifest"
                );
            return _remoteVersions ?? new Dictionary<string, string>();
        }

        public bool HasV2Upgrade(string resourceName)
        {
            return _v2Upgrades?.Contains(resourceName) ?? false;
        }
    }

    #endregion
}
