// === NEW IN PT10 ===
// Reason: PAPI event payload for resource install/update notifications
// Maps to: CAP-033
// Contract: data-contracts.md (OnResourceInstalled), backend-alignment.md (Events)

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Event payload sent via PapiClient.SendEventAsync when a resource is installed or updated.
/// Published on the "platformEnhancedResources.enhancedResources:onDidUpdate" event.
/// </summary>
/// <param name="ResourceId">The short name / ID of the installed resource (e.g., "ESV16UK+")</param>
/// <param name="ResourceName">The human-readable name of the resource (e.g., "ESV with Marble Data")</param>
/// <param name="Version">The version string in System.Version format (e.g., "2.1.0.0")</param>
/// <param name="IsUpdate">True if this is an update to an existing resource; false for fresh install</param>
public record ResourceInstalledEvent(
    string ResourceId,
    string ResourceName,
    string Version,
    bool IsUpdate
);
