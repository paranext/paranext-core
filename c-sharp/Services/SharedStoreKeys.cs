namespace Paranext.DataProvider.Services;

/// <summary>
/// Defines the keys and value types for the shared store to maintain type safety
/// Keep in sync with shared-store.service.ts
/// </summary>
public static class SharedStoreKeys
{
    /// <summary>
    /// Key for custom network timeouts
    /// </summary>
    public static readonly SharedStoreKey<Dictionary<string, int>> CustomNetworkTimeouts =
        new("platform.customNetworkTimeouts");
}
