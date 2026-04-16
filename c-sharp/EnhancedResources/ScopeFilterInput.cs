using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for scope-based link filtering.
/// Source: EXT-005, BHV-305, BHV-601
/// STUB: Created by tdd-test-writer for CAP-003. Will be implemented by tdd-implementer.
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
