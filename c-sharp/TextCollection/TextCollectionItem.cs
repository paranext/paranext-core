namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// A single text in a Text Collection with its per-text zoom factor.
/// </summary>
public record TextCollectionItem(string ScrTextName, string ScrTextId, double Zoom = 1.0);
