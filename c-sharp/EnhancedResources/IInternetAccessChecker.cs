namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Abstraction for checking internet availability.
/// Allows deterministic testing of update checking without real network access.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/InstallResourcesScheduleManager.cs
///   (checks InternetAccess.Status != Disabled before update check).
/// Contract: data-contracts.md Method 20 precondition.
/// </remarks>
// === NEW IN PT10 ===
// Reason: Interface for dependency injection of internet status in PAPI pattern
// Maps to: CAP-020
public interface IInternetAccessChecker
{
    /// <summary>
    /// Returns true if internet access is available and not disabled.
    /// </summary>
    bool IsInternetAvailable();
}
