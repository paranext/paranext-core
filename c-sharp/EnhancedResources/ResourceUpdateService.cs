namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for checking whether newer versions of installed Enhanced Resources are available.
/// Manages background update schedule, manifest caching, and version comparison.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/InstallResourcesScheduleManager.cs:37-261 (schedule/timer),
///             Paratext/Marble/InstallableRemoteResource.cs:166-273 (manifest fetch/cache),
///             ParatextData/Archiving/InstallableResource.cs:193-219 (version comparison).
/// Contract: data-contracts.md Method 20 (CheckForResourceUpdates).
/// CAP-020: CheckForResourceUpdates.
/// </remarks>
// === NEW IN PT10 ===
// Reason: PT10 service for background update checking in PAPI command pattern
// Maps to: CAP-020
internal class ResourceUpdateService
{
    public ResourceUpdateService(
        IInternetAccessChecker internetAccessChecker,
        IManifestProvider manifestProvider
    )
    {
        throw new NotImplementedException("CAP-020: ResourceUpdateService not yet implemented");
    }

    /// <summary>
    /// Checks for resource updates by comparing installed versions against the remote manifest.
    /// Returns list of resources where remote version > installed version.
    /// </summary>
    public Task<IReadOnlyList<EnhancedResourceInfo>> CheckForResourceUpdatesAsync(
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException(
            "CAP-020: CheckForResourceUpdatesAsync not yet implemented"
        );
    }

    /// <summary>
    /// Returns whether a specific resource has an update available.
    /// Thread-safe per BHV-510.
    /// </summary>
    public bool ResourceHasUpdates(string resourceName)
    {
        throw new NotImplementedException("CAP-020: ResourceHasUpdates not yet implemented");
    }

    /// <summary>
    /// Returns the schedule configuration for the given schedule type.
    /// </summary>
    public ScheduleConfiguration GetScheduleConfiguration(UpdateScheduleType scheduleType)
    {
        throw new NotImplementedException("CAP-020: GetScheduleConfiguration not yet implemented");
    }

    /// <summary>
    /// Returns whether an update check should be executed given the current schedule and internet status.
    /// </summary>
    public bool ShouldExecuteCheck(UpdateScheduleType scheduleType)
    {
        throw new NotImplementedException("CAP-020: ShouldExecuteCheck not yet implemented");
    }

    /// <summary>
    /// Returns whether the manifest cache is still fresh (within 24-hour TTL).
    /// </summary>
    public bool IsManifestCacheFresh()
    {
        throw new NotImplementedException("CAP-020: IsManifestCacheFresh not yet implemented");
    }

    /// <summary>
    /// Sets the manifest cache age for testing purposes.
    /// </summary>
    public void SetManifestCacheAge(TimeSpan age)
    {
        throw new NotImplementedException("CAP-020: SetManifestCacheAge not yet implemented");
    }

    /// <summary>
    /// Returns the manifest cache TTL in seconds.
    /// </summary>
    public int GetManifestCacheTtlSeconds()
    {
        throw new NotImplementedException(
            "CAP-020: GetManifestCacheTtlSeconds not yet implemented"
        );
    }

    /// <summary>
    /// Persists the update schedule type preference.
    /// </summary>
    public void SaveScheduleType(UpdateScheduleType scheduleType)
    {
        throw new NotImplementedException("CAP-020: SaveScheduleType not yet implemented");
    }

    /// <summary>
    /// Loads the persisted schedule type preference. Defaults to Never.
    /// </summary>
    public UpdateScheduleType LoadScheduleType()
    {
        throw new NotImplementedException("CAP-020: LoadScheduleType not yet implemented");
    }

    /// <summary>
    /// Returns whether a V2 major upgrade is available for the specified resource.
    /// </summary>
    public bool HasV2UpgradeAvailable(string resourceName)
    {
        throw new NotImplementedException("CAP-020: HasV2UpgradeAvailable not yet implemented");
    }
}
