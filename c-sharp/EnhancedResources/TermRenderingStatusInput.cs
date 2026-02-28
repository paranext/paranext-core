namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for determining the rendering status of a linked term against
/// a tracked project's Biblical Terms.
///
/// Contract: Section 2.8 TermRenderingStatusInput (data-contracts.md)
/// Behavior: BHV-404 (Highlight Button Toggle State Machine)
/// </summary>
public record TermRenderingStatusInput(
    string? TrackedProjectId,
    LexicalLink Link,
    SIL.Scripture.VerseRef VerseRef,
    string ResourceId
);
