namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Actions resulting from a write lock change event.
/// Source: EXT-016 (PT9/Paratext/TextCollectionForm.cs:124-143)
/// </summary>
public enum ChangeAction
{
    NoAction,
    Reload,
    RemoveAndReload,
}
