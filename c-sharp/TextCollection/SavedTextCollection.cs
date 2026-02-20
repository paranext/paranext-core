namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// A resolved saved text collection with project references (EXT-004).
/// Each saved list's text names are resolved to TextCollectionItems via
/// ScrTextCollection.Get. Names that cannot be resolved (missing/deleted
/// projects) are collected in UnresolvedNames.
///
/// === EXTRACTION: EXT-004 SavedCollectionService.GetSavedCollections ===
/// Source: PT9/Paratext/TextCollectionForm.cs:525-549
/// Complexity: Simple
/// Behaviors: BHV-T012
/// </summary>
public record SavedTextCollection(
    string Name,
    IList<TextCollectionItem> Items,
    IList<string> UnresolvedNames
);
