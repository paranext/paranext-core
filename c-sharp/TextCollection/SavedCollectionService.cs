namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// CRUD operations for saved text collections (ordered lists).
/// Preserves HebGrkIndex and ScrProjectIndex for required items.
/// Persists to JSON file in settings directory.
///
/// === EXTRACTION: EXT-010 SavedCollectionService ===
/// Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:440-561
/// Complexity: Complex
/// Behaviors: BHV-T012
/// </summary>
internal class SavedCollectionService
{
    /// <summary>
    /// Returns all saved text collection lists from persistence.
    /// Returns empty list if persistence file is missing.
    /// </summary>
    public IList<SavedScrTextList> GetSavedLists()
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Saves or overwrites a named text collection list.
    /// </summary>
    /// <param name="name">Display name of the collection. Must be non-empty.</param>
    /// <param name="textNames">Ordered list of project short names. Must be non-empty.</param>
    /// <param name="hebGrkIndex">Index of HEB/GRK in the list, or -1 if not present.</param>
    /// <param name="scrProjectIndex">Index of the associated scripture project, or -1 if not applicable.</param>
    public void SaveList(string name, IList<string> textNames, int hebGrkIndex, int scrProjectIndex)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Deletes a named text collection list from persistence.
    /// </summary>
    /// <param name="name">Name of the collection to delete.</param>
    /// <exception cref="InvalidOperationException">Collection not found.</exception>
    public void DeleteList(string name)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Checks whether a collection with the given name already exists.
    /// </summary>
    public bool Exists(string name)
    {
        throw new NotImplementedException();
    }
}
