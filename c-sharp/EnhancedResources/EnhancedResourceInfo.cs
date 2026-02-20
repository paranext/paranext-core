namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Metadata about an installed Enhanced Resource for listing and selection.
/// Returned by <see cref="EnhancedResourceEnumerationService.GetAvailableEnhancedResources"/>.
/// </summary>
/// <remarks>
/// PT9 Source: ParatextData/Plugins/Host.cs (AllEnhancedResources wraps AvailableBibles).
/// Contract: data-contracts.md Method 1 (GetAvailableEnhancedResources).
/// </remarks>
public record EnhancedResourceInfo(
    string Id,
    string Name,
    string ShortName,
    string Language,
    string Version,
    bool HasResearchData,
    bool IsInstalled,
    bool HasUpdate
);
