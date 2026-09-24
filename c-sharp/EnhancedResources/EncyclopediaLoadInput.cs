using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for encyclopedia resource loading. V1 and V2 formats supported.
/// Language fallback: user language > English > any.
/// Source: CAP-009, EXT-057, BHV-604
/// </summary>
public record EncyclopediaLoadInput(
    VerseRef CurrentReference,
    ScopeEnum Scope,
    WordFilterInput? Filter,
    string UserLanguage,
    string ResourceId
);
