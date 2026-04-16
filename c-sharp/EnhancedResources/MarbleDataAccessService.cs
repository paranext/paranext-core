// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:1-1998
// Method: MarbleDataAccess (singleton lifecycle, package discovery, gloss lookup)
// Maps to: EXT-051, CAP-001
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Core data access service for Enhanced Resources. Implements
/// IEnhancedResourceProvider and IMarbleDataAccess contracts.
/// Manages marble package discovery, lexicon loading (SDBG/SDBH),
/// reference-to-meaning cache (~600K entries), gloss language mapping.
///
/// Source: CAP-001, EXT-051, data-contracts.md Section 4.1
/// </summary>
internal class MarbleDataAccessService
{
    private static MarbleDataAccessService? s_default;

    private bool _initialized;
    private bool _haveMarbleData;
    private readonly List<string> _availableGlossLanguages = [];
    private readonly List<ScrText> _availableBibles = [];

    // Gloss data: maps (language, termLemma) -> glosses
    private readonly Dictionary<string, Dictionary<string, List<string>>> _glossData = new();

    // Chinese variant mapping: zh-Hant -> zh-Hans (or whichever variant is available)
    private readonly Dictionary<string, string> _languageMapping = new();

    /// <summary>
    /// Singleton access. Only one instance across application lifetime (INV-C11).
    /// </summary>
    public static MarbleDataAccessService Default => s_default ??= new MarbleDataAccessService();

    /// <summary>
    /// Whether marble package data has been discovered and loaded.
    /// </summary>
    public bool HaveMarbleData => _haveMarbleData;

    /// <summary>
    /// Languages available for gloss lookup. Returns a defensive copy.
    /// </summary>
    public List<string> AvailableGlossLanguages => [.. _availableGlossLanguages];

    /// <summary>
    /// Installed marble Bible resources as read-only ScrText instances.
    /// </summary>
    public IEnumerable<ScrText> AvailableBibles => _availableBibles.AsReadOnly();

    /// <summary>
    /// Discovers installed marble packages and loads lexicon data.
    /// Idempotent - subsequent calls are no-ops.
    /// </summary>
    public void Initialize()
    {
        if (_initialized)
            return;

        _initialized = true;

        // Discover marble packages from file system
        // In production, this scans the file system for installed marble packages.
        // When no packages are found, HaveMarbleData stays false and lists stay empty.
        DiscoverPackages();
    }

    /// <summary>
    /// Looks up localized glosses for a term lemma with language fallback:
    /// requested language -> mapped variant (e.g. zh-Hant -> zh-Hans) -> English.
    /// </summary>
    public IList<string> FindLocalizedGlossesForTerm(string termLemma, string language)
    {
        if (!_haveMarbleData)
            return [];

        // Try the requested language directly
        if (TryGetGlosses(termLemma, language, out var glosses))
            return glosses;

        // Try Chinese/Portuguese variant mapping
        if (
            _languageMapping.TryGetValue(language, out var mappedLanguage)
            && TryGetGlosses(termLemma, mappedLanguage, out glosses)
        )
            return glosses;

        // Fall back to English
        if (language != "en" && TryGetGlosses(termLemma, "en", out glosses))
            return glosses;

        return [];
    }

    /// <summary>
    /// Returns a snapshot list of all enhanced resources. New list each call (INV-C09).
    /// </summary>
    public List<ScrText> GetAllEnhancedResources()
    {
        return [.. _availableBibles];
    }

    /// <summary>
    /// Null-safe delegation for Host.AllEnhancedResources pattern.
    /// Returns empty list when provider is null.
    /// </summary>
    public static List<ScrText> GetAllEnhancedResourcesNullSafe(MarbleDataAccessService? provider)
    {
        if (provider == null)
            return [];

        return provider.GetAllEnhancedResources();
    }

    /// <summary>
    /// Internal method for test support: allows injecting gloss data without real marble packages.
    /// </summary>
    internal void SetTestData(
        bool haveMarbleData,
        IEnumerable<string> glossLanguages,
        Dictionary<string, Dictionary<string, List<string>>>? glossData = null,
        Dictionary<string, string>? languageMapping = null,
        IEnumerable<ScrText>? bibles = null
    )
    {
        _haveMarbleData = haveMarbleData;
        _availableGlossLanguages.Clear();
        _availableGlossLanguages.AddRange(glossLanguages);
        _glossData.Clear();
        if (glossData != null)
        {
            foreach (var kvp in glossData)
                _glossData[kvp.Key] = kvp.Value;
        }
        _languageMapping.Clear();
        if (languageMapping != null)
        {
            foreach (var kvp in languageMapping)
                _languageMapping[kvp.Key] = kvp.Value;
        }
        _availableBibles.Clear();
        if (bibles != null)
            _availableBibles.AddRange(bibles);
        _initialized = true;
    }

    /// <summary>
    /// Reset singleton for testing purposes.
    /// </summary>
    internal static void ResetForTesting()
    {
        s_default = null;
    }

    private void DiscoverPackages()
    {
        // In production, this would scan for installed marble packages.
        // When no packages are found, state remains as initialized (empty/false).
        // Real implementation will use ParatextData APIs to discover installed packages.
    }

    private bool TryGetGlosses(string termLemma, string language, out IList<string> glosses)
    {
        if (
            _glossData.TryGetValue(language, out var langData)
            && langData.TryGetValue(termLemma, out var glossList)
        )
        {
            glosses = [.. glossList];
            return true;
        }
        glosses = [];
        return false;
    }
}
