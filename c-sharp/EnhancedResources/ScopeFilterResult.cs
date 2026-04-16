namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of scope filtering. Contains filtered links, total count,
/// and section boundaries (when scope is CurrentSection).
/// Source: EXT-005, EXT-006, BHV-601
/// </summary>
public record ScopeFilterResult(
    IList<MarbleLexicalLinkOutput> Links,
    int TotalLinkCount,
    bool IsEmpty,
    SectionBoundary? SectionBoundary = null
);
