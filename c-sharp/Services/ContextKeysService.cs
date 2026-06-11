namespace Paranext.DataProvider.Services;

/// <summary>
/// Static access to context keys (see ContextKeys). All methods throw InvalidOperationException
/// if SharedStoreService has not been initialized yet.
/// </summary>
internal static class ContextKeysService
{
    private static ContextKeys? _contextKeys;

    private static ContextKeys GetContextKeys()
    {
        return _contextKeys ??= new ContextKeys(SharedStoreService.GetSharedStore());
    }

    public static void Set(string key, string value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, bool value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, int value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, double value)
    {
        GetContextKeys().Set(key, value);
    }

    public static bool TryGetValue<T>(string key, out T? value)
    {
        return GetContextKeys().TryGetValue(key, out value);
    }

    public static void Remove(string key)
    {
        GetContextKeys().Remove(key);
    }
}
