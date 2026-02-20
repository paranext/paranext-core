namespace Paranext.DataProvider.EnhancedResources;

// Ported from PT9: Paratext/Marble/MarbleLexicalLink.cs (EXT-009, CAP-005)

/// <summary>
/// Where a filter click originated (affects match behavior).
/// ScripturePane uses exact matching; DictionaryTab uses partial matching.
/// </summary>
public enum FilterOrigin
{
    ScripturePane,
    DictionaryTab,
}
