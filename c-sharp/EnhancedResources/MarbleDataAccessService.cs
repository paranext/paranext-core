// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs (FindLocalizedGlossesForTerm,
// GetEncyclopediaLanguage, AvailableBibles)
// Reason: Immutable accessor over loaded marble data. Constructor injection only;
// no Initialize/SetTestData lifecycle.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Read-only view over loaded marble data. Exposes:
///   - HaveMarbleData (derived from availableBibles presence)
///   - AvailableGlossLanguages
///   - AvailableBibles
///   - FindLocalizedGlossesForTerm / FindGlossesWithLanguage / ResolveLanguage
/// All state is injected via primary constructor; nothing mutates at runtime.
///
/// Source: CAP-001, EXT-051, data-contracts.md Section 4.1
/// </summary>
internal sealed class MarbleDataAccessService
{
    private readonly GlossData _glossData;
    private readonly LanguageMapping _languageMapping;
    private readonly IReadOnlyList<ResourceScrText> _availableBibles;

    public MarbleDataAccessService(
        GlossData glossData,
        LanguageMapping languageMapping,
        IReadOnlyList<ResourceScrText> availableBibles
    )
    {
        _glossData = glossData ?? throw new ArgumentNullException(nameof(glossData));
        _languageMapping =
            languageMapping ?? throw new ArgumentNullException(nameof(languageMapping));
        _availableBibles =
            availableBibles ?? throw new ArgumentNullException(nameof(availableBibles));
    }

    /// <summary>True iff at least one bible package was loaded.</summary>
    public bool HaveMarbleData => _availableBibles.Count > 0;

    /// <summary>Languages meeting the gloss-coverage threshold.</summary>
    public IReadOnlyList<string> AvailableGlossLanguages => _glossData.AvailableLanguages;

    /// <summary>Installed marble Bible resources as read-only ScrText instances.</summary>
    public IEnumerable<ScrText> AvailableBibles => _availableBibles;

    /// <summary>
    /// Looks up localized glosses for a term lemma with language fallback:
    /// requested language -> mapped variant (e.g. zh-Hant -> zh-Hans) -> English.
    /// </summary>
    public IList<string> FindLocalizedGlossesForTerm(string termLemma, string language)
    {
        return FindGlossesWithLanguage(termLemma, language).Glosses;
    }

    /// <summary>
    /// Resolves the actual language used in gloss lookup by following the fallback chain.
    /// Returns the language code that would yield glosses, or empty string if none found.
    /// </summary>
    internal string ResolveLanguage(string termLemma, string language)
    {
        return FindGlossesWithLanguage(termLemma, language).ResolvedLanguage;
    }

    /// <summary>
    /// Core fallback logic: walks the language chain once and returns both glosses and
    /// the resolved language. Single source of truth for the fallback chain:
    /// requested language -> mapped variant -> English.
    /// </summary>
    internal (IList<string> Glosses, string ResolvedLanguage) FindGlossesWithLanguage(
        string termLemma,
        string language
    )
    {
        if (!HaveMarbleData)
            return ([], string.Empty);

        if (TryGetGlosses(termLemma, language, out var glosses))
            return (glosses, language);

        if (
            _languageMapping.Variants.TryGetValue(language, out var mappedLanguage)
            && TryGetGlosses(termLemma, mappedLanguage, out glosses)
        )
            return (glosses, mappedLanguage);

        if (
            !string.Equals(language, "en", StringComparison.OrdinalIgnoreCase)
            && TryGetGlosses(termLemma, "en", out glosses)
        )
            return (glosses, "en");

        return ([], string.Empty);
    }

    private bool TryGetGlosses(string termLemma, string language, out IList<string> glosses)
    {
        if (
            _glossData.ByLanguage.TryGetValue(language, out var byLemma)
            && byLemma.TryGetValue(termLemma, out var glossList)
        )
        {
            glosses = [.. glossList];
            return true;
        }
        glosses = [];
        return false;
    }
}
