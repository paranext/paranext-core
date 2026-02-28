namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for identifying and querying Enhanced Resource projects (Contract: Section 2.12).
///
/// Used by CheckResourceUpdate (Section 4.20) and other resource-level operations.
/// </summary>
/// <param name="ResourceId">Resource project ID or short name.</param>
public record ResourceIdentityInput(string ResourceId);
