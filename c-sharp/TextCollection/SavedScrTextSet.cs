namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// A named, unordered set of scripture text names.
/// Used by the general "Open" dialog for saved selections.
/// Unlike SavedScrTextList (ordered, with positional indices), a set is unordered.
/// </summary>
public record SavedScrTextSet(string Name, IList<string> TextNames);
