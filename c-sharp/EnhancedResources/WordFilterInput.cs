namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Active word filter for dictionary/encyclopedia tab loading.
/// Source: CAP-007, data-contracts.md Section 2.7
/// </summary>
public record WordFilterInput(
    string TokenId,
    string Lemma,
    string Source,
    string Translit,
    string Senses,
    string TargetLinks,
    FilterClickOrigin ClickOrigin
);
