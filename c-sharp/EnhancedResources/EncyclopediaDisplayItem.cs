namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Display item for the Encyclopedia Tab. Contains lexical data and
/// encyclopedia entry references with V1/V2 format handling.
/// Source: CAP-009, BHV-604
/// </summary>
public record EncyclopediaDisplayItem(
    string TokenId,
    string Lemma,
    string SourceText,
    string Translit,
    IList<string> Glosses,
    IList<EncyclopediaEntryRef> Entries,
    IList<string> ImageIds,
    string Collection
);
