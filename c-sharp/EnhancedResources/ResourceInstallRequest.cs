using Paratext.Data.Archiving;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Request to install or update a Marble resource.
/// </summary>
/// <remarks>
/// Contract: data-contracts.md Method 19 (InstallResource).
/// CAP-019: InstallResource.
/// </remarks>
// === NEW IN PT10 ===
// Reason: PAPI command pattern - request record for InstallResource command
// Maps to: CAP-019
public record ResourceInstallRequest(
    string ResourceName,
    ResourceType ResourceType,
    string? Version,
    bool HasResearchData,
    string? SourceUrl,
    string? LocalPath,
    string? DblEntryUid = null
);
