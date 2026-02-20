namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// CRUD operations for saved text collections (ordered lists).
/// Preserves HebGrkIndex and ScrProjectIndex for required items.
/// Currently uses in-memory storage; file-backed persistence will be
/// added by the DataProvider integration layer (CAP-018).
///
/// === EXTRACTION: EXT-010 SavedCollectionService ===
/// Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:440-561
/// Complexity: Complex
/// Behaviors: BHV-T012
/// </summary>
internal sealed class SavedCollectionService
{
    // === NEW IN PT10 ===
    // Reason: PT9 used Memento.SetXml/GetXml for persistence; PT10 uses in-memory store
    // with future JSON file persistence. In-memory Dictionary is the backing store.
    // Maps to: CAP-014
    private readonly Dictionary<string, SavedScrTextList> _savedLists = new();

    // === NEW IN PT10 ===
    // Reason: PT9 stored Open dialog saved sets via separate Memento persistence;
    // PT10 uses in-memory Dictionary with future JSON file persistence.
    // Maps to: CAP-015
    private readonly Dictionary<string, SavedScrTextSet> _savedSets = new();

    /// <summary>
    /// Returns all saved text collection lists.
    /// Returns empty list if no collections have been saved.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:440-480
    // Method: ScrTextListSelectionForm.LoadSavedLists()
    // Maps to: CAP-014
    public IList<SavedScrTextList> GetSavedLists()
    {
        return _savedLists.Values.ToList();
    }

    /// <summary>
    /// Saves or overwrites a named text collection list.
    /// </summary>
    /// <param name="name">Display name of the collection. Must be non-empty.</param>
    /// <param name="textNames">Ordered list of project short names. Must be non-empty.</param>
    /// <param name="hebGrkIndex">Index of HEB/GRK in the list, or -1 if not present.</param>
    /// <param name="scrProjectIndex">Index of the associated scripture project, or -1 if not applicable.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:482-520
    // Method: ScrTextListSelectionForm.SaveList()
    // Maps to: CAP-014
    public void SaveList(string name, IList<string> textNames, int hebGrkIndex, int scrProjectIndex)
    {
        ValidateName(name);
        ValidateTextNames(textNames);

        _savedLists[name] = new SavedScrTextList(
            name,
            textNames.ToList(),
            hebGrkIndex,
            scrProjectIndex
        );
    }

    /// <summary>
    /// Deletes a named text collection list from persistence.
    /// </summary>
    /// <param name="name">Name of the collection to delete.</param>
    /// <exception cref="InvalidOperationException">Collection not found.</exception>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:522-545
    // Method: ScrTextListSelectionForm.DeleteList()
    // Maps to: CAP-014
    public void DeleteList(string name)
    {
        ValidateName(name);

        if (!_savedLists.Remove(name))
            throw new InvalidOperationException($"Collection '{name}' not found.");
    }

    /// <summary>
    /// Checks whether a collection with the given name already exists.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/ScrTextListSelectionForm.cs:547-561
    // Method: ScrTextListSelectionForm.ListExists()
    // Maps to: CAP-014
    public bool Exists(string name)
    {
        return _savedLists.ContainsKey(name);
    }

    // === CAP-016: GetSavedCollectionsResolved ===
    // Source: PT9/Paratext/TextCollectionForm.cs:525-549
    // Extraction: EXT-004
    // Behaviors: BHV-T012
    // Contract: M-018

    /// <summary>
    /// Returns saved text collections with resolved project references.
    /// Each saved list's text names are resolved to TextCollectionItems
    /// via ScrTextCollection. Names that cannot be resolved are collected
    /// in UnresolvedNames.
    /// </summary>
    // === EXTRACTION: EXT-004 ===
    // Complexity: Simple
    // Maps to: CAP-016, M-018
    public IList<SavedTextCollection> GetSavedCollections()
    {
        throw new NotImplementedException(
            "CAP-016: GetSavedCollections not yet implemented. "
                + "TDD RED phase -- this stub exists so tests compile."
        );
    }

    // === CAP-015: AsymmetricSharingCombinedSets ===
    // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:96-120, 271-521
    // Extraction: EXT-011
    // Behaviors: BHV-T013
    // Invariant: INV-012

    /// <summary>
    /// Returns combined saved selections for the Open dialog, merging TC dialog
    /// lists (SavedScrTextLists) into the set. INV-012: TC dialog lists appear
    /// in Open dialog; Open dialog sets do NOT appear in TC dialog.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:96-120
    // Method: SelectScrTextsForm.GetCombinedSavedSets()
    // Maps to: CAP-015, M-017
    public IList<SavedScrTextSet> GetCombinedSets()
    {
        // Convert TC dialog saved lists to sets (asymmetric: TC lists appear in Open dialog)
        // then append Open dialog saved sets
        return _savedLists
            .Values.Select(list => new SavedScrTextSet(list.Name, list.TextNames.ToList()))
            .Concat(_savedSets.Values)
            .ToList();
    }

    /// <summary>
    /// Saves or overwrites a named text set (unordered) for the Open dialog.
    /// These sets are available in the Open dialog but NOT in the TC dialog (INV-012).
    /// </summary>
    /// <param name="name">Display name of the saved selection. Must be non-empty.</param>
    /// <param name="textNames">Unordered list of project short names. Must be non-empty.</param>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:271-350
    // Method: SelectScrTextsForm.SaveSet()
    // Maps to: CAP-015 (internal -- Open dialog set management)
    public void SaveSet(string name, IList<string> textNames)
    {
        ValidateName(name);
        ValidateTextNames(textNames);

        _savedSets[name] = new SavedScrTextSet(name, textNames.ToList());
    }

    /// <summary>
    /// Deletes a named text set from the Open dialog's saved selections.
    /// </summary>
    /// <param name="name">Name of the set to delete.</param>
    /// <exception cref="InvalidOperationException">Set not found.</exception>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:352-380
    // Method: SelectScrTextsForm.DeleteSet()
    // Maps to: CAP-015 (internal -- Open dialog set management)
    public void DeleteSet(string name)
    {
        ValidateName(name);

        if (!_savedSets.Remove(name))
            throw new InvalidOperationException($"Set '{name}' not found.");
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrEmpty(name))
            throw new ArgumentException("Collection name must not be null or empty.", nameof(name));
    }

    private static void ValidateTextNames(IList<string> textNames)
    {
        if (textNames is null || textNames.Count == 0)
            throw new ArgumentException("Text names must not be null or empty.", nameof(textNames));
    }
}
