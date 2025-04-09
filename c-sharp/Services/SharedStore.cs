using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Services;

/// <summary>
/// Client for the cross-process shared store service.
/// Allows .NET code to access the same in-memory store that JavaScript processes use.
/// Maintains a local cache for fast reads and synchronizes with other processes asynchronously.
/// Uses Lamport clocks for deterministic conflict resolution across processes.
/// </summary>
internal sealed class SharedStore(PapiClient papiClient) : ISharedStore
{
    private const string SHARED_STORE_PREFIX = "shared-store";
    private const string STORE_GET_REQUEST = $"{SHARED_STORE_PREFIX}:get";
    private const string STORE_CHANGE_EVENT = $"{SHARED_STORE_PREFIX}:change";

    private readonly PapiClient _papiClient = papiClient;
    private readonly ConcurrentDictionary<string, StoreEntry> _localStore = new();
    private readonly ConcurrentDictionary<string, object> _localStoreLock = new();

    private readonly JsonElement _nullElement = JsonDocument.Parse("null").RootElement;
    private readonly JsonSerializerOptions _serializationOptions =
        SerializationOptions.CreateSerializationOptions();

    // https://en.wikipedia.org/wiki/Lamport_timestamp
    private int _localCounter = 0;

    // Unique process ID used for tie-breaking in Lamport clock comparisons
    private readonly string _processId = $"dotnet-{Guid.NewGuid().ToString("N").Substring(0, 8)}";

    /// <summary>
    /// Lamport clock for ordering events across processes
    /// </summary>
    private class LamportClock(int counter, string processId)
    {
        public int Counter { get; } = counter;
        public string ProcessId { get; } = processId;
    }

    /// <summary>
    /// Store entry with Lamport clock for conflict resolution
    /// </summary>
    private class StoreEntry(JsonElement value, LamportClock clock)
    {
        public JsonElement Value { get; } = value;
        public LamportClock Clock { get; } = clock;
    }

    private class StoreChangeEvent(string key, JsonElement value, LamportClock clock)
    {
        public string Key { get; } = key;
        public JsonElement Value { get; } = value;
        public LamportClock Clock { get; } = clock;
    }

    /// <summary>
    /// Increments the local counter and returns a new LamportClock object
    /// </summary>
    private LamportClock GetNextClock()
    {
        return new LamportClock(Interlocked.Increment(ref _localCounter), _processId);
    }

    /// <summary>
    /// Compares two Lamport clocks
    /// </summary>
    /// <param name="x">First clock</param>
    /// <param name="y">Second clock</param>
    /// <returns>Negative value if `x` should be considered before `y`, positive value if `x` should be considered after `y`, and 0 if they are equal</returns>
    private static int CompareLamportClocks(LamportClock x, LamportClock y)
    {
        if (x.Counter != y.Counter)
            return x.Counter - y.Counter;

        return string.Compare(x.ProcessId, y.ProcessId, StringComparison.Ordinal);
    }

    public async Task InitializeAsync()
    {
        // Subscribe to change events
        _papiClient.RegisterEventHandler(
            STORE_CHANGE_EVENT,
            (StoreChangeEvent eventData) =>
            {
                // Ignore events from our own process
                if (eventData == null || eventData.Clock.ProcessId == _processId)
                    return;

                SetFromRemote(eventData.Key, new StoreEntry(eventData.Value, eventData.Clock));
            }
        );

        // Load initial data from the main process
        var storeData = await _papiClient.SendRequestAsync<JsonElement>(STORE_GET_REQUEST);
        foreach (var property in storeData.EnumerateObject())
        {
            var key = property.Name;
            try
            {
                var storeEntry = property.Value.Deserialize<StoreEntry>(_serializationOptions);
                if (storeEntry == null)
                {
                    Console.WriteLine($"Failed to deserialize store entry for key \"{key}\".");
                    continue;
                }

                SetFromRemote(key, storeEntry);
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"Failed to deserialize store entry for key \"{key}\": {ex}");
            }
        }
    }

    /// <summary>
    /// Get a value from the shared store
    /// </summary>
    /// <typeparam name="T">The type to deserialize the value to</typeparam>
    /// <param name="key">The key to get</param>
    /// <returns>The value, or default(T) if not found</returns>
    public bool TryGetValue<T>(SharedStoreKey<T> key, out T? value)
    {
        if (_localStore.TryGetValue(key.Key, out var entry))
        {
            value = entry.Value.Deserialize<T>(_serializationOptions);
            return true;
        }
        else
        {
            value = default;
            return false;
        }
    }

    /// <summary>
    /// Set a value in the shared store and notify other processes
    /// </summary>
    /// <param name="key">The key to set</param>
    /// <param name="value">The value to set (can be null)</param>
    /// <returns>True if the operation was successful, otherwise false</returns>
    public void Set<T>(SharedStoreKey<T> key, T? value)
    {
        try
        {
            var serializedValue =
                (value == null)
                    ? _nullElement
                    : JsonSerializer.SerializeToElement(value, _serializationOptions);
            lock (_localStoreLock.GetOrAdd(key.Key, new object()))
            {
                var clock = GetNextClock();
                _localStore[key.Key] = new StoreEntry(serializedValue, clock);
                _ = _papiClient.SendEventAsync(
                    STORE_CHANGE_EVENT,
                    new StoreChangeEvent(key.Key, serializedValue, clock)
                );
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error setting value \"{key}\" in shared store: {ex}");
        }
    }

    private void SetFromRemote(string key, StoreEntry newEntry)
    {
        // Update our local counter if necessary
        int currentLocalCounter;
        int newLocalCounter;
        do
        {
            currentLocalCounter = _localCounter;
            newLocalCounter = Math.Max(currentLocalCounter, newEntry.Clock.Counter);
        } while (
            Interlocked.CompareExchange(ref _localCounter, newLocalCounter, currentLocalCounter)
            != currentLocalCounter
        );

        lock (_localStoreLock.GetOrAdd(key, new object()))
        {
            if (
                !_localStore.TryGetValue(key, out var existingEntry)
                || CompareLamportClocks(newEntry.Clock, existingEntry.Clock) > 0
            )
            {
                _localStore[key] = newEntry;
            }
        }
    }

    public void Remove<T>(SharedStoreKey<T> key)
    {
        // Don't actually delete the value from the store as that will remove the clock for the latest
        // update, leading to potential race conditions if the value is set again later.
        Set(key, default);
    }
}
