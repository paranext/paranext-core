// === NEW IN PT10 ===
// Reason: Backing record for MarbleDataAccessService gloss lookup.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Per-language and per-dictionary gloss tables.
/// <para>
/// <see cref="ByLanguage"/> is the union of glosses across all loaded dictionaries
/// (SDBH/SDBG/DCLEX), keyed by language code then by NFD-normalized lemma. It is
/// the fallback used when the caller has no dictionary context.
/// </para>
/// <para>
/// <see cref="ByDictionary"/> preserves per-dictionary glosses so callers that DO
/// know the source dictionary (e.g. tooltip on a token whose
/// <c>lexical_links</c> attribute carries a <c>"Dict:Lemma:Indices"</c> entry) can
/// resolve to the dictionary that actually authored the sense. PT9 keeps each
/// dictionary's <c>cachedLemmaToEntry</c> separate (MarbleDataAccess.cs:1401-1456)
/// and routes lemma fallback by book number via
/// <c>GetDictionaryProject(bookNum)</c>; this field captures that separation in
/// PT10.
/// </para>
/// <para>
/// <see cref="AvailableLanguages"/> is the set of language codes meeting PT9's
/// >=50% sense-coverage threshold across all dictionaries.
/// </para>
/// </summary>
internal sealed record GlossData(
    IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>> ByLanguage,
    IReadOnlyList<string> AvailableLanguages,
    IReadOnlyDictionary<
        string,
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>
    >? ByDictionary = null
)
{
    public static GlossData Empty { get; } =
        new(new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(), []);
}
