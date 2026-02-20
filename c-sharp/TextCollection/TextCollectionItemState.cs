namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Per-item state for memento serialization.
/// </summary>
public record TextCollectionItemState(string ScrTextName, string ScrTextId, double Zoom);
