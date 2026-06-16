// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs (GetEncyclopediaLanguage, variant discovery)
// Reason: Static PT9 language-variant mapping, extended with dynamic variants
// discovered from the installed GlossData.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Produces the LanguageMapping record used by MarbleDataAccessService's
/// gloss-language fallback chain. Combines:
///   (a) PT9's static GetEncyclopediaLanguage mapping (zh-Hans/zh-Hant/pt-BR/en-US/en-UK)
///   (b) dynamic variant discovery: for each AvailableLanguages entry, record any
///       obvious variant relation that exists in the gloss data (zh-Hant -> zh-Hans,
///       etc.) so that a requested variant not present in ByLanguage falls back to
///       the one that is.
/// </summary>
internal static class MarbleLanguageMapBuilder
{
    // PT9 GetEncyclopediaLanguage mapping, verbatim.
    private static readonly IReadOnlyDictionary<string, string> Pt9StaticMap = new Dictionary<
        string,
        string
    >(StringComparer.OrdinalIgnoreCase)
    {
        ["zh-Hans"] = "hns",
        ["zh-Hant"] = "hnt",
        ["pt-BR"] = "pt",
        ["en-US"] = "en",
        ["en-UK"] = "en",
    };

    // Dynamic variant candidates: for requested key, which available-language entry
    // should it fall back to if the requested one isn't present in ByLanguage.
    private static readonly (string Requested, string Preferred)[] VariantFallbacks =
    [
        ("zh-Hant", "zh-Hans"),
        ("zh", "zh-Hans"),
        ("pt-PT", "pt"),
    ];

    public static LanguageMapping Build(GlossData glossData)
    {
        var merged = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        foreach (var (k, v) in Pt9StaticMap)
            merged[k] = v;

        var available = new HashSet<string>(
            glossData.AvailableLanguages,
            StringComparer.OrdinalIgnoreCase
        );
        foreach (var (requested, preferred) in VariantFallbacks)
        {
            if (available.Contains(preferred) && !available.Contains(requested))
                merged[requested] = preferred;
        }

        return new LanguageMapping(merged);
    }
}
