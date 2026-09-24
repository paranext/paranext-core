using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for dictionary resource loading. SDBH for OT, SDBG for NT/DC.
/// Source: CAP-007, EXT-053, BHV-364
/// </summary>
public record DictionaryLoadInput(
    VerseRef CurrentReference,
    ScopeEnum Scope,
    WordFilterInput? Filter,
    bool ShowTranslations,
    string GlossLanguage,
    string ResourceId
);
