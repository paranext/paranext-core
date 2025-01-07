using System.Collections.Concurrent;

namespace Paranext.DataProvider;

public class ConcurrentHashSet<T>
    where T : notnull
{
    private readonly ConcurrentDictionary<T, bool> _dictionary = new();

    public int Count => _dictionary.Count;

    public bool Add(T item) => _dictionary.TryAdd(item, true);

    public bool Remove(T item) => _dictionary.TryRemove(item, out _);

    public bool Contains(T item) => _dictionary.ContainsKey(item);

    public IEnumerable<T> GetItems() => _dictionary.Keys;
}
