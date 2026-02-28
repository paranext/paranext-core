namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Represents a single item in the dictionary tab display, used for deduplication.
///
/// Behavior: BHV-302 (Deduplication rules)
/// Extraction: EXT-027 (Dictionary Tab Loading)
/// </summary>
public record DictionaryDisplayItem(
    string Lemma,
    string SurfaceText,
    string Translation,
    string Dictionary,
    int BaseFormIndex,
    int MeaningIndex
);
