using Paranext.DataProvider;

namespace TestParanextDataProvider;

[TestFixture]
public class ConcurrentBatchCollectionTests
{
    private ConcurrentBatchCollection<int> _collection = null!;

    [SetUp]
    public void Setup()
    {
        _collection = new ConcurrentBatchCollection<int>();
    }

    [Test]
    public void Constructor_EmptyCollection_CountIsZero()
    {
        Assert.That(_collection.Count, Is.EqualTo(0));
    }

    [Test]
    public void Add_SingleItem_CountIncreases()
    {
        _collection.Add(42);
        Assert.That(_collection.Count, Is.EqualTo(1));
    }

    [Test]
    public void AddRange_MultipleItems_CountIncreases()
    {
        var items = new List<int> { 1, 2, 3, 4, 5 };
        _collection.AddRange(items);
        Assert.That(_collection.Count, Is.EqualTo(5));
    }

    [Test]
    public void AddRange_EmptyList_CountRemainsZero()
    {
        _collection.AddRange(new List<int>());
        Assert.That(_collection.Count, Is.EqualTo(0));
    }

    [Test]
    public void TryDequeue_SingleItem_ReturnsCorrectItem()
    {
        _collection.Add(42);
        bool success = _collection.TryDequeue(out int result);

        Assert.That(success, Is.True);
        Assert.That(result, Is.EqualTo(42));
        Assert.That(_collection.Count, Is.EqualTo(0));
    }

    [Test]
    public void TryDequeue_EmptyCollection_ReturnsFalse()
    {
        bool success = _collection.TryDequeue(out int result);

        Assert.That(success, Is.False);
        Assert.That(result, Is.EqualTo(0)); // default value
        Assert.That(_collection.Count, Is.EqualTo(0));
    }

    [Test]
    public void DequeueRange_MultipleItems_ReturnsCorrectItems()
    {
        var items = new List<int> { 1, 2, 3, 4, 5 };
        _collection.AddRange(items);

        var result = _collection.DequeueRange(3);

        Assert.That(result.Count, Is.EqualTo(3));
        Assert.That(result, Is.EqualTo(new List<int> { 1, 2, 3 }));
        Assert.That(_collection.Count, Is.EqualTo(2));
    }

    [Test]
    public void DequeueRange_RequestMoreThanAvailable_ReturnsAllAvailable()
    {
        var items = new List<int> { 1, 2, 3 };
        _collection.AddRange(items);

        var result = _collection.DequeueRange(10);

        Assert.That(result.Count, Is.EqualTo(3));
        Assert.That(result, Is.EqualTo(new List<int> { 1, 2, 3 }));
        Assert.That(_collection.Count, Is.EqualTo(0));
    }

    [Test]
    public void DequeueRange_ZeroOrNegative_ReturnsEmpty()
    {
        _collection.AddRange(new List<int> { 1, 2, 3 });

        var result1 = _collection.DequeueRange(0);
        var result2 = _collection.DequeueRange(-5);

        Assert.That(result1.Count, Is.EqualTo(0));
        Assert.That(result2.Count, Is.EqualTo(0));
        Assert.That(_collection.Count, Is.EqualTo(3)); // Nothing should be removed
    }

    [Test]
    public void MultipleBatches_DequeueAcrossBatches_WorksCorrectly()
    {
        _collection.AddRange(new List<int> { 1, 2, 3 });
        _collection.AddRange(new List<int> { 4, 5, 6 });
        _collection.AddRange(new List<int> { 7, 8, 9 });

        var result = _collection.DequeueRange(5);

        Assert.That(result.Count, Is.EqualTo(5));
        Assert.That(result, Is.EqualTo(new List<int> { 1, 2, 3, 4, 5 }));
        Assert.That(_collection.Count, Is.EqualTo(4));
    }

    [Test]
    public void Peek_WithoutRemoving_ReturnsCorrectItems()
    {
        var items = new List<int> { 1, 2, 3, 4, 5 };
        _collection.AddRange(items);

        var result = _collection.Peek(0, 3);

        Assert.That(result.Count, Is.EqualTo(3));
        Assert.That(result, Is.EqualTo(new List<int> { 1, 2, 3 }));
        Assert.That(_collection.Count, Is.EqualTo(5)); // Should not change
    }

    [Test]
    public void Peek_WithSkip_ReturnsCorrectItems()
    {
        var items = new List<int> { 1, 2, 3, 4, 5 };
        _collection.AddRange(items);

        var result = _collection.Peek(2, 2);

        Assert.That(result.Count, Is.EqualTo(2));
        Assert.That(result, Is.EqualTo(new List<int> { 3, 4 }));
        Assert.That(_collection.Count, Is.EqualTo(5)); // Should not change
    }

    [Test]
    public void Clear_RemovesAllItems()
    {
        _collection.AddRange(new List<int> { 1, 2, 3, 4, 5 });

        _collection.Clear();

        Assert.That(_collection.Count, Is.EqualTo(0));
        Assert.That(_collection.TryDequeue(out _), Is.False);
    }

    [Test]
    public void ToList_ReturnsAllItems()
    {
        var items = new List<int> { 1, 2, 3, 4, 5 };
        _collection.AddRange(items);

        var result = _collection.ToList();

        Assert.That(result, Is.EqualTo(items));
        Assert.That(_collection.Count, Is.EqualTo(5)); // Should not change
    }

    [Test]
    public void ConcurrentOperations_AddAndDequeue_WorksCorrectly()
    {
        const int itemsPerBatch = 100;
        const int numberOfBatches = 10;
        var allAddedItems = new List<int>();

        // Add batches from one thread
        var addTask = Task.Run(() =>
        {
            for (int batch = 0; batch < numberOfBatches; batch++)
            {
                var batchItems = Enumerable.Range(batch * itemsPerBatch, itemsPerBatch).ToList();
                lock (allAddedItems)
                {
                    allAddedItems.AddRange(batchItems);
                }
                _collection.AddRange(batchItems);
                Thread.Sleep(10); // Small delay to allow interleaving
            }
        });

        // Remove items from another thread
        var removedItems = new List<int>();
        var removeTask = Task.Run(() =>
        {
            while (addTask.Status == TaskStatus.Running || _collection.Count > 0)
            {
                var items = _collection.DequeueRange(50);
                removedItems.AddRange(items);
                Thread.Sleep(15); // Small delay to allow interleaving
            }
        });

        // Disabled just for this automatically generated multithreaded test
#pragma warning disable VSTHRD002 // Avoid problematic synchronous waits
        Task.WaitAll(addTask, removeTask);
#pragma warning restore VSTHRD002 // Avoid problematic synchronous waits

        // Verify all items were processed
        Assert.That(removedItems.Count, Is.EqualTo(itemsPerBatch * numberOfBatches));
        Assert.That(_collection.Count, Is.EqualTo(0));

        // Verify items are in correct order (FIFO)
        removedItems.Sort();
        allAddedItems.Sort();
        Assert.That(removedItems, Is.EqualTo(allAddedItems));
    }
}
