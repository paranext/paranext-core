// === NEW IN PT10 ===
// Reason: Backing record for SourceLanguageSearchService.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Lexicon entries drawn from GNT / BHS / LXXDC source-language packages, indexed
/// by both native lemma (e.g. "λόγος") and Latin transliteration (e.g. "logos").
/// </summary>
internal sealed record SourceLanguageData(
    IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> ByLemma,
    IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> ByTranslit
)
{
    public static SourceLanguageData Empty { get; } =
        new(
            new Dictionary<string, IReadOnlyList<LexiconEntry>>(StringComparer.OrdinalIgnoreCase),
            new Dictionary<string, IReadOnlyList<LexiconEntry>>(StringComparer.OrdinalIgnoreCase)
        );
}
