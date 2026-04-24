// === NEW IN PT10 ===
// Reason: Backing record for MarbleDataAccessService gloss lookup.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Language-indexed gloss data. ByLanguage[lang][lemma] -> list of glosses.
/// AvailableLanguages: languages that meet PT9's >=50% sense-coverage threshold.
/// </summary>
internal sealed record GlossData(
    IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>> ByLanguage,
    IReadOnlyList<string> AvailableLanguages
)
{
    public static GlossData Empty { get; } =
        new(new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(), []);
}
