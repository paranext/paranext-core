using System.Collections.Concurrent;

namespace Paranext.DataProvider;

/// <summary>
/// A thread-safe collection optimized for batch append and remove operations.
/// One thread can efficiently append large batches of items while another thread
/// can efficiently remove batches of items from the front.
/// </summary>
/// <typeparam name="T">The type of items stored in the collection</typeparam>
public class ConcurrentBatchCollection<T>
{
    private readonly ConcurrentQueue<List<T>> _batches = new();
    private readonly object _lock = new();
    private volatile int _totalCount = 0;
    private volatile int _totalCountAdded = 0;
    private List<T>? _currentBatch;
    private int _currentBatchIndex = 0;

    /// <summary>
    /// Gets the total number of items currently in the collection
    /// </summary>
    public int Count => _totalCount;

    /// <summary>
    /// Gets the total number of items ever added to the collection
    /// </summary>
    public int TotalCountAdded => _totalCountAdded;

    /// <summary>
    /// Adds a single item to the collection
    /// </summary>
    /// <param name="item">The item to add</param>
    public void Add(T item)
    {
        AddRange([item]);
    }

    /// <summary>
    /// Adds a batch of items to the collection efficiently
    /// </summary>
    /// <param name="items">The items to add</param>
    public void AddRange(IEnumerable<T> items)
    {
        var itemList = items as List<T> ?? items.ToList();
        if (itemList.Count == 0)
            return;

        _batches.Enqueue(itemList);
        Interlocked.Add(ref _totalCount, itemList.Count);
        Interlocked.Add(ref _totalCountAdded, itemList.Count);
    }

    /// <summary>
    /// Attempts to remove and return a single item from the front of the collection
    /// </summary>
    /// <param name="result">The removed item, if successful</param>
    /// <returns>True if an item was removed, false if the collection is empty</returns>
    public bool TryDequeue(out T? result)
    {
        result = default;

        lock (_lock)
        {
            // Try to get an item from the current batch
            if (_currentBatch != null && _currentBatchIndex < _currentBatch.Count)
            {
                result = _currentBatch[_currentBatchIndex++];
                Interlocked.Decrement(ref _totalCount);
                return true;
            }

            // Current batch is exhausted, try to get the next batch
            if (_batches.TryDequeue(out _currentBatch))
            {
                _currentBatchIndex = 0;
                if (_currentBatch.Count > 0)
                {
                    result = _currentBatch[_currentBatchIndex++];
                    Interlocked.Decrement(ref _totalCount);
                    return true;
                }
            }

            // No items available
            _currentBatch = null;
            _currentBatchIndex = 0;
            return false;
        }
    }

    /// <summary>
    /// Attempts to remove and return multiple items from the front of the collection
    /// </summary>
    /// <param name="maxCount">The maximum number of items to remove</param>
    /// <returns>A list containing the removed items (may be empty if no items available)</returns>
    public List<T> DequeueRange(int maxCount)
    {
        var result = new List<T>();
        if (maxCount <= 0)
            return result;

        lock (_lock)
        {
            while (result.Count < maxCount)
            {
                // Try to get items from the current batch
                if (_currentBatch != null && _currentBatchIndex < _currentBatch.Count)
                {
                    int itemsToTake = Math.Min(
                        maxCount - result.Count,
                        _currentBatch.Count - _currentBatchIndex
                    );
                    for (int i = 0; i < itemsToTake; i++)
                    {
                        result.Add(_currentBatch[_currentBatchIndex++]);
                    }
                    Interlocked.Add(ref _totalCount, -itemsToTake);
                    continue;
                }

                // Current batch is exhausted, try to get the next batch
                if (_batches.TryDequeue(out _currentBatch))
                {
                    _currentBatchIndex = 0;
                    continue;
                }

                // No more batches available
                _currentBatch = null;
                _currentBatchIndex = 0;
                break;
            }
        }

        return result;
    }

    /// <summary>
    /// Gets a snapshot of the items currently in the collection without removing them.
    /// This operation creates a copy and may be expensive for large collections.
    /// </summary>
    /// <param name="skipCount">Number of items to skip from the beginning</param>
    /// <param name="takeCount">Maximum number of items to include</param>
    /// <returns>A list containing the requested items</returns>
    public List<T> Peek(int skipCount = 0, int takeCount = int.MaxValue)
    {
        var result = new List<T>();
        if (takeCount <= 0)
            return result;

        lock (_lock)
        {
            int currentSkipped = 0;
            int currentTaken = 0;

            // First, check items in the current partial batch
            if (_currentBatch != null && _currentBatchIndex < _currentBatch.Count)
            {
                for (
                    int i = _currentBatchIndex;
                    i < _currentBatch.Count && currentTaken < takeCount;
                    i++
                )
                {
                    if (currentSkipped >= skipCount)
                    {
                        result.Add(_currentBatch[i]);
                        currentTaken++;
                    }
                    else
                    {
                        currentSkipped++;
                    }
                }
            }

            // Then, check items in queued batches
            foreach (var batch in _batches)
            {
                if (currentTaken >= takeCount)
                    break;

                foreach (var item in batch)
                {
                    if (currentTaken >= takeCount)
                        break;

                    if (currentSkipped >= skipCount)
                    {
                        result.Add(item);
                        currentTaken++;
                    }
                    else
                    {
                        currentSkipped++;
                    }
                }
            }
        }

        return result;
    }

    /// <summary>
    /// Removes all items from the collection
    /// </summary>
    public void Clear()
    {
        lock (_lock)
        {
            while (_batches.TryDequeue(out _)) { }
            _currentBatch = null;
            _currentBatchIndex = 0;
            _totalCount = 0;
        }
    }

    /// <summary>
    /// Gets all items currently in the collection without removing them.
    /// This operation creates a copy and may be expensive for large collections.
    /// </summary>
    /// <returns>A list containing all items in the collection</returns>
    public List<T> ToList()
    {
        return Peek(0, int.MaxValue);
    }
}
