namespace Paranext.DataProvider.Services;

internal static class SharedStoreService
{
    private static SharedStore? _sharedStore;

    public static async Task InitializeAsync(PapiClient papiClient)
    {
        if (_sharedStore != null)
            throw new InvalidOperationException("SharedStoreService already initialized");

        _sharedStore = new SharedStore(papiClient);
        await _sharedStore.InitializeAsync();
    }

    public static SharedStore GetSharedStore()
    {
        CheckForNullStore();
        return _sharedStore!;
    }

    public static bool TryGetValue<T>(SharedStoreKey<T> key, out T? value)
    {
        CheckForNullStore();
        return _sharedStore!.TryGetValue(key, out value);
    }

    public static void Set<T>(SharedStoreKey<T> key, T? value)
    {
        CheckForNullStore();
        _sharedStore!.Set(key, value);
    }

    public static void Remove<T>(SharedStoreKey<T> key)
    {
        CheckForNullStore();
        _sharedStore!.Remove(key);
    }

    private static void CheckForNullStore()
    {
        if (_sharedStore == null)
            throw new InvalidOperationException("SharedStoreService not initialized");
    }
}
