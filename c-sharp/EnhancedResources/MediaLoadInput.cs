using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for media resource loading. Images tab excludes "Satellite Bible Atlas",
/// Maps tab includes only "Satellite Bible Atlas".
/// Source: EXT-060, EXT-067, BHV-359
/// </summary>
public record MediaLoadInput(
    VerseRef CurrentReference,
    ScopeEnum Scope,
    WordFilterInput? Filter,
    MediaTabType TabType,
    string UserLanguage,
    string ResourceId
);
