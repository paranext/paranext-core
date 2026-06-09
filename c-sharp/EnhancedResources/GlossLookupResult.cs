namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of gloss lookup. Language fallback: user > English > any.
/// Chinese variants (Traditional/Simplified) and Portuguese variants
/// have special handling.
/// Source: CAP-006, EXT-051, BHV-105
/// </summary>
public record GlossLookupResult(
    IList<string> Glosses,
    string ActualLanguage,
    IList<string> AvailableLanguages,
    bool HaveMarbleData
);
