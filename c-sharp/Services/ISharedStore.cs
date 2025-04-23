namespace Paranext.DataProvider.Services;

// Created this interface for SharedStoreService to break a dependency loop with PapiClient
internal interface ISharedStore
{
    bool TryGetValue<T>(string key, out T? value);
    void Set<T>(string key, T? value);
    void Remove<T>(string key);
}
