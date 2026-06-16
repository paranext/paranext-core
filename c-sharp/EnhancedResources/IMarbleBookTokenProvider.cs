namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Returns parsed marble tokens for a (resourceId, bookNum) pair. Single producer:
/// services never call MarbleTokenParser directly - they go through the provider so
/// caching is centralized and tokens never leak across the PAPI boundary.
/// </summary>
internal interface IMarbleBookTokenProvider
{
    /// <summary>
    /// Returns parsed tokens for the given resource+book. Empty list if the resource
    /// has no content for that book. Cached; repeated calls for the same key may return
    /// the same instance.
    /// </summary>
    IReadOnlyList<MarbleToken> GetTokens(string resourceId, int bookNum);
}
