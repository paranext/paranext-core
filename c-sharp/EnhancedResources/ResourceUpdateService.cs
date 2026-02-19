using Paratext.Data;

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
    // INV-013: 24-hour manifest cache TTL in seconds
    private const int ManifestCacheTtlSeconds = 86_400;

    // BHV-509: 10-second initial delay for startup/daily checks
    private const int InitialCheckDelayMs = 10_000;

    // BHV-509: 24-hour repeat interval for daily checks
    private const int DailyRepeatIntervalMs = 86_400_000;

    private readonly IInternetAccessChecker _internetAccessChecker;
    private readonly IManifestProvider _manifestProvider;

    // BHV-510: Thread-safe update status tracking
    private readonly object _updateStatusLock = new();
    private readonly Dictionary<string, bool> _updateStatus = new();

    // BHV-507: V2 upgrade tracking
    private readonly HashSet<string> _v2Upgrades = new();

    // INV-013: Manifest cache timestamp
    private DateTime _manifestCacheTimestamp = DateTime.MinValue;

    // BHV-525: Schedule type persistence (in-memory)
    private UpdateScheduleType? _savedScheduleType;

    // === NEW IN PT10 ===
    // Reason: Constructor initializes injected dependencies for PAPI command pattern
    // Maps to: CAP-020
    public ResourceUpdateService(
        IInternetAccessChecker internetAccessChecker,
        IManifestProvider manifestProvider
    )
    {
        _internetAccessChecker = internetAccessChecker;
        _manifestProvider = manifestProvider;
    }

    /// <summary>
    /// Checks for resource updates by comparing installed versions against the remote manifest.
    /// Returns list of resources where remote version > installed version.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: PAPI command for checking resource updates
    // Maps to: CAP-020
    public Task<IReadOnlyList<EnhancedResourceInfo>> CheckForResourceUpdatesAsync(
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Check internet availability
        if (!_internetAccessChecker.IsInternetAvailable())
        {
            throw new InvalidOperationException(
                "Internet access is disabled. Cannot check for resource updates."
            );
        }

        // Fetch manifest (may throw)
        Dictionary<string, string> manifest;
        try
        {
            manifest = _manifestProvider.FetchManifest();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                "Failed to download resource manifest: " + ex.Message,
                ex
            );
        }

        // Update cache timestamp
        _manifestCacheTimestamp = DateTime.UtcNow;

        // Get installed resource names from ScrTextCollection
        var installedNames = new HashSet<string>(
            ScrTextCollection.ScrTexts(IncludeProjects.Everything).Select(s => s.Name)
        );

        var updatesAvailable = new List<EnhancedResourceInfo>();

        lock (_updateStatusLock)
        {
            _updateStatus.Clear();
            _v2Upgrades.Clear();

            foreach (var entry in manifest)
            {
                string resourceName = entry.Key;
                string remoteVersion = entry.Value;

                // Only check resources that are actually installed
                if (!installedNames.Contains(resourceName))
                    continue;

                bool isNewer = ResourceInstallService.IsNewerVersionAvailable(
                    resourceName,
                    remoteVersion
                );

                _updateStatus[resourceName] = isNewer;

                // BHV-507: Check for V2 upgrade
                if (_manifestProvider.HasV2Upgrade(resourceName))
                {
                    _v2Upgrades.Add(resourceName);
                }

                if (isNewer)
                {
                    updatesAvailable.Add(
                        new EnhancedResourceInfo(
                            Id: resourceName,
                            Name: resourceName,
                            ShortName: resourceName,
                            Language: "",
                            Version: remoteVersion,
                            HasResearchData: false,
                            IsInstalled: true,
                            HasUpdate: true
                        )
                    );
                }
            }
        }

        return Task.FromResult<IReadOnlyList<EnhancedResourceInfo>>(updatesAvailable);
    }

    /// <summary>
    /// Returns whether a specific resource has an update available.
    /// Thread-safe per BHV-510.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Thread-safe query for resource update status
    // Maps to: CAP-020, BHV-510
    public bool ResourceHasUpdates(string resourceName)
    {
        lock (_updateStatusLock)
        {
            return _updateStatus.TryGetValue(resourceName, out bool hasUpdate) && hasUpdate;
        }
    }

    /// <summary>
    /// Returns the schedule configuration for the given schedule type.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallResourcesScheduleManager.cs:37-93
    // Method: InstallResourcesScheduleManager.SetScheduleType()
    // Maps to: BHV-509
    public ScheduleConfiguration GetScheduleConfiguration(UpdateScheduleType scheduleType)
    {
        return scheduleType switch
        {
            UpdateScheduleType.Daily => new ScheduleConfiguration(
                InitialDelayMs: InitialCheckDelayMs,
                RepeatIntervalMs: DailyRepeatIntervalMs
            ),
            UpdateScheduleType.OnStartup => new ScheduleConfiguration(
                InitialDelayMs: InitialCheckDelayMs,
                RepeatIntervalMs: 0
            ),
            _ => new ScheduleConfiguration(InitialDelayMs: 0, RepeatIntervalMs: 0),
        };
    }

    /// <summary>
    /// Returns whether an update check should be executed given the current schedule and internet status.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallResourcesScheduleManager.cs:95-120
    // Method: InstallResourcesScheduleManager.ShouldCheckNow()
    // Maps to: BHV-509
    public bool ShouldExecuteCheck(UpdateScheduleType scheduleType)
    {
        if (scheduleType == UpdateScheduleType.Never)
            return false;

        if (!_internetAccessChecker.IsInternetAvailable())
            return false;

        return true;
    }

    /// <summary>
    /// Returns whether the manifest cache is still fresh (within 24-hour TTL).
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallableRemoteResource.cs:166-200
    // Method: InstallableRemoteResource.IsCacheFresh()
    // Maps to: INV-013
    public bool IsManifestCacheFresh()
    {
        if (_manifestCacheTimestamp == DateTime.MinValue)
            return false;

        TimeSpan age = DateTime.UtcNow - _manifestCacheTimestamp;
        return age.TotalSeconds < ManifestCacheTtlSeconds;
    }

    /// <summary>
    /// Sets the manifest cache age for testing purposes.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper to control cache age without waiting real time
    // Maps to: CAP-020
    public void SetManifestCacheAge(TimeSpan age)
    {
        _manifestCacheTimestamp = DateTime.UtcNow - age;
    }

    /// <summary>
    /// Returns the manifest cache TTL in seconds.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Exposes TTL constant for verification
    // Maps to: INV-013
    public int GetManifestCacheTtlSeconds()
    {
        return ManifestCacheTtlSeconds;
    }

    /// <summary>
    /// Persists the update schedule type preference.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallResourcesScheduleManager.cs:200-220
    // Method: InstallResourcesScheduleManager.SaveScheduleType()
    // Maps to: BHV-525
    public void SaveScheduleType(UpdateScheduleType scheduleType)
    {
        _savedScheduleType = scheduleType;
    }

    /// <summary>
    /// Loads the persisted schedule type preference. Defaults to Never.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallResourcesScheduleManager.cs:222-240
    // Method: InstallResourcesScheduleManager.LoadScheduleType()
    // Maps to: BHV-525
    public UpdateScheduleType LoadScheduleType()
    {
        return _savedScheduleType ?? UpdateScheduleType.Never;
    }

    /// <summary>
    /// Returns whether a V2 major upgrade is available for the specified resource.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallableRemoteResource.cs:250-273
    // Method: InstallableRemoteResource.HasV2Upgrade()
    // Maps to: BHV-507
    public bool HasV2UpgradeAvailable(string resourceName)
    {
        lock (_updateStatusLock)
        {
            return _v2Upgrades.Contains(resourceName);
        }
    }
}
