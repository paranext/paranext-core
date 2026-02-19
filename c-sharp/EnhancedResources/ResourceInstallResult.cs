namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of a resource installation operation.
/// </summary>
/// <remarks>
/// Contract: data-contracts.md Method 19 (InstallResource).
/// CAP-019: InstallResource.
/// </remarks>
// === NEW IN PT10 ===
// Reason: PAPI command pattern - result record for InstallResource command
// Maps to: CAP-019
public record ResourceInstallResult(
    bool Success,
    string ResourceName,
    string? ErrorMessage,
    string? ErrorCode
);
