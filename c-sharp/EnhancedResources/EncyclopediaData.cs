// === NEW IN PT10 ===
// Reason: Backing record for EncyclopediaService.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// EntriesByTypeAndLanguage[Flora|Fauna|Realia][languageCode] -> entries.
/// ArticlesById keyed by article key (e.g. "REALIA:1.1.8.3").
/// </summary>
internal sealed record EncyclopediaData(
    IReadOnlyDictionary<
        EncyclopediaEntryType,
        IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>
    > EntriesByTypeAndLanguage,
    IReadOnlyDictionary<string, ArticleContent> ArticlesById,
    IReadOnlyDictionary<string, string> Abbreviations,
    IReadOnlySet<string> KnownResourceIds
)
{
    public static EncyclopediaData Empty { get; } =
        new(
            new Dictionary<
                EncyclopediaEntryType,
                IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>
            >(),
            new Dictionary<string, ArticleContent>(StringComparer.OrdinalIgnoreCase),
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase),
            new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );
}
