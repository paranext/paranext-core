namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Information about a detected resource type from a zip file.
/// </summary>
/// <remarks>
/// CAP-019: InstallResource.
/// </remarks>
// === NEW IN PT10 ===
// Reason: Return type for DetectResourceType method
// Maps to: CAP-019
public record ResourceDetectionInfo(bool IsMarbleResource, bool HasResearchData, string Version);
