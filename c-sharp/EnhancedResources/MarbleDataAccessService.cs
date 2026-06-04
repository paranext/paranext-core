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
    /// Searches the union of all dictionaries; callers with dictionary context
    /// should use the <paramref name="dictionary"/> overload to avoid surfacing
    /// senses authored by the wrong dictionary.
    /// </summary>
    public IList<string> FindLocalizedGlossesForTerm(string termLemma, string language)
    {
        return FindGlossesWithLanguage(termLemma, language).Glosses;
    }

    /// <summary>
    /// Dictionary-scoped gloss lookup. PT9's <c>FindLocalizedGlossesForTerm</c>
    /// is reference-driven and routes lemma fallback through
    /// <c>GetDictionaryProject(bookNum)</c> so a Greek lemma in deuterocanonical
    /// text resolves against DCLEX, not SDBG (MarbleDataAccess.cs:373-376,
    /// 387-430). PT10 callers that know the source dictionary - typically from
    /// a token's <c>lexical_links</c> attribute carrying
    /// <c>"Dict:Lemma:Indices"</c> - pass it here so the resolved gloss matches
    /// the authoring dictionary. Falls back to the union view if the dictionary
    /// is empty or unknown so unqualified callers continue to get a result.
    /// </summary>
    public IList<string> FindLocalizedGlossesForTerm(
        string termLemma,
        string language,
        string? dictionary
    )
    {
        return FindGlossesWithLanguage(termLemma, language, dictionary).Glosses;
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
    ) => FindGlossesWithLanguage(termLemma, language, dictionary: null);

    /// <summary>
    /// Dictionary-scoped variant of <see cref="FindGlossesWithLanguage(string, string)"/>.
    /// When <paramref name="dictionary"/> is non-null and that dictionary has
    /// loaded gloss data, the language fallback chain (requested -> mapped ->
    /// English) is walked against the per-dictionary table. If the dictionary
    /// is null, unknown, or has no entry for this lemma at any language in the
    /// chain, the search falls back to the cross-dictionary union view so
    /// callers without precise dictionary context still get a result.
    /// </summary>
    internal (IList<string> Glosses, string ResolvedLanguage) FindGlossesWithLanguage(
        string termLemma,
        string language,
        string? dictionary
    )
    {
        if (!HaveMarbleData)
            return ([], string.Empty);

        if (
            !string.IsNullOrEmpty(dictionary)
            && _glossData.ByDictionary is { } byDict
            && byDict.TryGetValue(dictionary, out var dictView)
        )
        {
            var dictResult = FindInView(dictView, termLemma, language);
            if (dictResult.Glosses.Count > 0)
                return dictResult;
        }

        return FindInView(_glossData.ByLanguage, termLemma, language);
    }

    private (IList<string> Glosses, string ResolvedLanguage) FindInView(
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>> view,
        string termLemma,
        string language
    )
    {
        if (TryGetGlosses(view, termLemma, language, out var glosses))
            return (glosses, language);

        if (
            _languageMapping.Variants.TryGetValue(language, out var mappedLanguage)
            && TryGetGlosses(view, termLemma, mappedLanguage, out glosses)
        )
            return (glosses, mappedLanguage);

        if (
            !string.Equals(language, "en", StringComparison.OrdinalIgnoreCase)
            && TryGetGlosses(view, termLemma, "en", out glosses)
        )
            return (glosses, "en");

        return ([], string.Empty);
    }

    private static bool TryGetGlosses(
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>> view,
        string termLemma,
        string language,
        out IList<string> glosses
    )
    {
        if (
            view.TryGetValue(language, out var byLemma)
            && byLemma.TryGetValue(
                termLemma.Normalize(System.Text.NormalizationForm.FormD),
                out var glossList
            )
        )
        {
            glosses = [.. glossList];
            return true;
        }
        glosses = [];
        return false;
    }
}
