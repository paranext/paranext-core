// === NEW IN PT10 ===
// Reason: Backing record for MarbleDataAccessService gloss-language fallback chain.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Language-variant fallback map: e.g. zh-Hant -> zh-Hans, pt-BR -> pt.
/// Combines PT9's static mapping (GetEncyclopediaLanguage) with dynamic variant
/// discovery over installed dictionary languages.
/// </summary>
internal sealed record LanguageMapping(IReadOnlyDictionary<string, string> Variants)
{
    public static LanguageMapping Empty { get; } = new(new Dictionary<string, string>());
}
