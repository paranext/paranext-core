namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Schedule type for background resource update checks.
/// Determines how often the application checks for newer Enhanced Resource versions.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/InstallResourcesScheduleManager.cs:59
/// Contract: data-contracts.md Method 20 (CheckForResourceUpdates), BHV-509.
/// </remarks>
// === NEW IN PT10 ===
// Reason: Enum for update schedule configuration in PAPI pattern
// Maps to: CAP-020
public enum UpdateScheduleType
{
    /// <summary>No background update checks.</summary>
    Never = 0,

    /// <summary>Check once at application start (10-second delay).</summary>
    OnStartup = 1,

    /// <summary>Check every 24 hours (10-second initial delay, then 24h interval).</summary>
    Daily = 2,
}
