namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// A named, ordered collection of scripture text names.
/// Used by the "Open text collection" dialog for saved collections.
/// Preserves HebGrkIndex and ScrProjectIndex for required-item positional tracking.
/// </summary>
public record SavedScrTextList(
    string Name,
    IList<string> TextNames,
    int HebGrkIndex = -1,
    int ScrProjectIndex = -1
);
