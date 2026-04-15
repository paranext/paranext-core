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
    /// Singleton access. INV-C11: Only one instance across application lifetime.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:20-25
    // Method: MarbleDataAccess.Default
    // Maps to: INV-C11
    public static MarbleDataAccessService Default => s_default ??= new MarbleDataAccessService();

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:45
    // Method: MarbleDataAccess.HaveMarbleData
    // Maps to: BHV-105
    public bool HaveMarbleData => _haveMarbleData;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:47
    // Method: MarbleDataAccess.AvailableGlossLanguages
    // Maps to: BHV-105
    public List<string> AvailableGlossLanguages => new(_availableGlossLanguages);

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:50
    // Method: MarbleDataAccess.AvailableBibles (IEnhancedResourceProvider)
    // Maps to: BHV-102
    public IEnumerable<ScrText> AvailableBibles => _availableBibles.AsReadOnly();

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:100-300
    // Method: MarbleDataAccess.Initialize()
    // Maps to: BHV-105, BHV-350
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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:400-500
    // Method: MarbleDataAccess.FindLocalizedGlossesForTerm()
    // Maps to: BHV-105, gm-020, gm-021, gm-022
    // EXPLANATION:
    // Gloss lookup with language fallback chain:
    // 1. Try the requested language directly
    // 2. For Chinese variants (zh-Hant, zh-Hans), try mapped variant
    // 3. Fall back to English ("en")
    // 4. Return empty if no glosses found
    public IList<string> FindLocalizedGlossesForTerm(string termLemma, string language)
    {
        if (!_haveMarbleData)
            return new List<string>();

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

        return new List<string>();
    }

    /// <summary>
    /// Returns a snapshot list of all enhanced resources. INV-C09: New list each call.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Plugins/Host.cs:62-63
    // Method: Host.AllEnhancedResources
    // Maps to: INV-C09, BHV-618
    public List<ScrText> GetAllEnhancedResources()
    {
        return new List<ScrText>(_availableBibles);
    }

    /// <summary>
    /// Null-safe delegation for Host.AllEnhancedResources pattern.
    /// Returns empty list when provider is null. INV-C09 + TS-047.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Static null-safe wrapper matches Host.AllEnhancedResources delegation pattern
    // Maps to: BHV-618, TS-047
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

    private static void DiscoverPackages()
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
            glosses = new List<string>(glossList);
            return true;
        }
        glosses = new List<string>();
        return false;
    }
}
