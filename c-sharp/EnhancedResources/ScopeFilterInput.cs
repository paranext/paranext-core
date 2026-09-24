using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for scope-based link filtering.
/// Source: EXT-005, BHV-305, BHV-601
/// </summary>
public record ScopeFilterInput(
    VerseRef CurrentRef,
    ScopeEnum Scope,
    MarbleLinkType LinkType,
    string FilterText,
    string FilterSenses,
    FilterClickOrigin FilterClickOrigin,
    string ResourceId
);
