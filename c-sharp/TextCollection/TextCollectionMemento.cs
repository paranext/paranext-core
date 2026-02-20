namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Complete TC window state for persistence. PT10 uses JSON; PT9 used XML.
/// </summary>
public record TextCollectionMemento
{
    public IList<TextCollectionItemState> Items { get; init; } =
        new List<TextCollectionItemState>();
    public int CurItem { get; init; }
    public bool SingleShown { get; init; }
    public bool MultiShown { get; init; }
    public string ViewName { get; init; } = "Preview";
    public int SingleZoom { get; init; } = 100;
    public int MultiZoom { get; init; } = 100;
    public double SplitterProportion { get; init; } = 0.5;
    public string Reference { get; init; } = "";
    public ScrollGroup ScrollGroup { get; init; } = ScrollGroup.A;
}
