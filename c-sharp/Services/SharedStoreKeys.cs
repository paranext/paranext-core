namespace Paranext.DataProvider.Services;

/// <summary>
/// Defines the keys and value types for the shared store to maintain type safety
/// Keep in sync with shared-store.service.ts
/// </summary>
internal static class SharedStoreKeys
{
    /// <summary>
    /// Key for custom network timeouts
    /// </summary>
    public static string CustomNetworkTimeoutMs(string requestType)
    {
        return $"platform.customNetworkTimeoutMs.{requestType}";
    }
}
