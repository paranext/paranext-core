namespace Paranext.DataProvider.EnhancedResources;

internal sealed class MarbleBookTokenProvider : IMarbleBookTokenProvider
{
    /// <summary>
    /// LRU capacity. Single-resource users with adjacent-chapter navigation hit cache
    /// at low capacities; raise if cross-resource patterns emerge.
    /// </summary>
    public const int DefaultCapacity = 4;

    private readonly IMarbleBookXmlSource _xmlSource;
    private readonly int _capacity;
    private readonly object _lock = new();
    private readonly LinkedList<CacheEntry> _lruOrder = new();
    private readonly Dictionary<(string, int), LinkedListNode<CacheEntry>> _index =
        new(EqualityComparer<(string, int)>.Default);

    public MarbleBookTokenProvider(IMarbleBookXmlSource xmlSource)
        : this(xmlSource, DefaultCapacity) { }

    public MarbleBookTokenProvider(IMarbleBookXmlSource xmlSource, int capacity)
    {
        _xmlSource = xmlSource ?? throw new ArgumentNullException(nameof(xmlSource));
        if (capacity < 1)
            throw new ArgumentOutOfRangeException(nameof(capacity));
        _capacity = capacity;
    }

    public IReadOnlyList<MarbleToken> GetTokens(string resourceId, int bookNum)
    {
        var key = (resourceId, bookNum);

        lock (_lock)
        {
            if (_index.TryGetValue(key, out var node))
            {
                _lruOrder.Remove(node);
                _lruOrder.AddFirst(node);
                return node.Value.Tokens;
            }
        }

        // Cold miss: parse outside the lock. Race: two threads may parse the same
        // key; first-wins on insert; loser's parse result is discarded. Idempotent
        // and cheaper than serializing all parses.
        var xml = _xmlSource.ReadBookXml(resourceId, bookNum);
        IReadOnlyList<MarbleToken> tokens = string.IsNullOrEmpty(xml)
            ? Array.Empty<MarbleToken>()
            : MarbleTokenParser.Parse(xml, resourceId, bookNum, chapterNumber: 0).AsReadOnly();

        lock (_lock)
        {
            if (_index.TryGetValue(key, out var existing))
            {
                _lruOrder.Remove(existing);
                _lruOrder.AddFirst(existing);
                return existing.Value.Tokens;
            }

            var entry = new CacheEntry(key, tokens);
            var newNode = _lruOrder.AddFirst(entry);
            _index[key] = newNode;

            while (_index.Count > _capacity)
            {
                var lru = _lruOrder.Last!;
                _index.Remove(lru.Value.Key);
                _lruOrder.RemoveLast();
            }

            return tokens;
        }
    }

    private sealed record CacheEntry(
        (string ResourceId, int BookNum) Key,
        IReadOnlyList<MarbleToken> Tokens
    );
}
