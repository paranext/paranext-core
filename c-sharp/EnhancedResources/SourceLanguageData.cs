// === NEW IN PT10 ===
// Reason: Backing record for SourceLanguageSearchService.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Lemma-indexed lexicon entries drawn from GNT / BHS / LXXDC source-language packages.
/// </summary>
internal sealed record SourceLanguageData(
    IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> ByLemma
)
{
    public static SourceLanguageData Empty { get; } =
        new(new Dictionary<string, IReadOnlyList<LexiconEntry>>(StringComparer.OrdinalIgnoreCase));
}
