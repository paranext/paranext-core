namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Configuration for the background update timer.
/// Specifies the initial delay before the first check and the repeat interval.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/InstallResourcesScheduleManager.cs:37
/// Contract: data-contracts.md Method 20 (CheckForResourceUpdates), BHV-509.
/// </remarks>
// === NEW IN PT10 ===
// Reason: Record for schedule timer parameters in PAPI pattern
// Maps to: CAP-020
public record ScheduleConfiguration(int InitialDelayMs, int RepeatIntervalMs);
