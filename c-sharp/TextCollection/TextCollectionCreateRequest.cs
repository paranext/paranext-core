namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Request to open a Text Collection with the specified projects.
/// </summary>
public record TextCollectionCreateRequest(
    IList<string> ProjectIds,
    ScrollGroup ScrollGroup = ScrollGroup.A
);
