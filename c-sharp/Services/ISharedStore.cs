namespace Paranext.DataProvider.Services;

// Created this interface for SharedStoreService to break a dependency loop with PapiClient
internal interface ISharedStore
{
    bool TryGetValue<T>(SharedStoreKey<T> key, out T? value);
    void Set<T>(SharedStoreKey<T> key, T? value);
    void Remove<T>(SharedStoreKey<T> key);
}
