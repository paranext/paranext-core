namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Result of restoring a TC from a memento (EXT-001).
/// </summary>
public record TextCollectionRestoreResult
{
    public IList<TextCollectionItem> RestoredItems { get; init; } = new List<TextCollectionItem>();
    public IList<string> MissingProjectNames { get; init; } = new List<string>();
    public bool HasMissingProjects => MissingProjectNames.Count > 0;
    public TextCollectionMemento? Memento { get; init; }
}
