namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// This class represents a tree data structure whose children are identified by a unique Tuple&lt;T1, T2&gt;.
/// Each node may contain a value of type TResult. The root node and leaf nodes must contain TResult values.
/// </summary>
internal class TupleTree<T1, T2, TResult>
    where T1 : IEquatable<T1>
    where T2 : IEquatable<T2>
    where TResult : class
{
    private class ChildNode
    {
        public TResult? Result { get; set; }
        public TupleTree<T1, T2, TResult>? SubTree { get; set; }
    }

    private readonly TResult? _defaultValue;
    private readonly Dictionary<(T1 val1, T2 val2), ChildNode> _children = new();

    private TupleTree() { }

    public TupleTree(TResult defaultValue)
    {
        _defaultValue = defaultValue;
    }

    /// <summary>
    /// Add an ordered set of tuples as a new path in the tree with a given result
    /// </summary>
    /// <param name="tuples">Ordered list of tuples that will each represent a node in the tree</param>
    /// <param name="result">Result value to store for the final item in the list</param>
    /// <exception cref="Exception">An exception will be thrown if the given path already has a value</exception>
    public void Add(IList<(T1 val1, T2 val2)> tuples, TResult result)
    {
        var firstTuple = tuples.First();
        if (!_children.TryGetValue(firstTuple, out var childNode))
        {
            childNode = new ChildNode();
            _children[firstTuple] = childNode;
        }

        if (tuples.Count == 1)
        {
            if (childNode.Result != null)
                throw new Exception(
                    $"Value \"{childNode.Result}\" already exists for {firstTuple}, cannot change it to \"{result}\""
                );
            childNode.Result = result;
        }
        else
        {
            childNode.SubTree ??= new TupleTree<T1, T2, TResult>();
            childNode.SubTree.Add(tuples.Skip(1).ToList(), result);
        }
    }

    /// <summary>
    /// Find all values in the tree that match the given set of tuples.
    /// For paths that don't fully match, values from the closest interior node of the tree are used.
    /// For example, take a path A* -> B* -> C -> D* that exists on a tree, where A, B, and D have values assigned.
    /// If the given tuples match C but not D, then the value of B will be returned.
    /// </summary>
    public IEnumerable<TResult> FindAllResults(IEnumerable<(T1 val1, T2 val2)> tuples)
    {
        return FindAllResultsInternal(new HashSet<(T1 val1, T2 val2)>(tuples));
    }

    private IEnumerable<TResult> FindAllResultsInternal(IReadOnlySet<(T1 val1, T2 val2)> tuples)
    {
        bool foundReturnValue = false;
        foreach (var child in _children.Where(child => tuples.Contains(child.Key)))
        {
            if (child.Value.SubTree != null)
            {
                foreach (var returnValue in child.Value.SubTree.FindAllResultsInternal(tuples))
                {
                    foundReturnValue = true;
                    yield return returnValue;
                }
            }
            else if (child.Value.Result != null)
            {
                foundReturnValue = true;
                yield return child.Value.Result;
            }

            if (!foundReturnValue && (child.Value.Result != null))
            {
                foundReturnValue = true;
                yield return child.Value.Result;
            }
        }

        if (!foundReturnValue && _defaultValue != null)
            yield return _defaultValue;
    }
}
