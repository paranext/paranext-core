namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Where a word-level filter click originated.
/// Scripture: click from scripture pane (exact match).
/// Dictionary: click from dictionary tab (partial match).
/// </summary>
public enum WordFilterSource
{
    Scripture,
    Dictionary,
}

/// <summary>
/// Specifies a word-level filter for the research pane,
/// activated by clicking a word in the scripture pane or dictionary tab.
/// </summary>
/// <remarks>
/// Data contract from data-contracts.md (Group 0 data type).
/// </remarks>
public record WordFilter(
    string Lemma,
    IReadOnlyList<string> LexicalLinks,
    string SurfaceForm,
    WordFilterSource SourcePane
);
