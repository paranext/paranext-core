namespace Paranext.DataProvider.Services;

/// <summary>
/// A strongly-typed key for the shared store
/// </summary>
/// <typeparam name="T">The type of value associated with this key</typeparam>
public class SharedStoreKey<T>
{
    public string Key { get; }

    internal SharedStoreKey(string key)
    {
        Key = key;
    }
}
