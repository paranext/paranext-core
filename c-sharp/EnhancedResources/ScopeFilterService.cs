namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Scope-based link filtering service. Filters lexical links by verse/section/chapter scope.
/// Section boundaries detected from ParagraphStart markers in the token stream.
/// Source: EXT-005, EXT-006, BHV-305, BHV-601, BHV-602
/// STUB: Created by tdd-test-writer for CAP-003. Will be implemented by tdd-implementer.
/// </summary>
internal static class ScopeFilterService
{
    /// <summary>
    /// Filter links by scope. Section boundaries detected from ParagraphStart
    /// markers. Full parameter signature maps to BHV-601 GetLinksInScope.
    /// Source: EXT-005, EXT-006, BHV-305, BHV-601
    /// </summary>
    public static ScopeFilterResult GetLinksForScope(ScopeFilterInput input, MarbleToken[] tokens)
    {
        throw new NotImplementedException(
            "CAP-003 GetLinksForScope: STUB - to be implemented by tdd-implementer"
        );
    }
}
