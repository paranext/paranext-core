namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Per-link mapping result from the three-dimensional ER-to-BT analysis.
///
/// Contract: Section 3.8 (data-contracts.md)
/// Behavior: BHV-404 (three-dimensional matching)
/// Extraction: EXT-019
/// </summary>
public record ErBtMapping(
    /// <summary>The lexical link being mapped.</summary>
    LexicalLink Link,
    /// <summary>Matched Biblical Term ID, null if no match.</summary>
    string? BiblicalTermId,
    /// <summary>Match dimension that succeeded (reference, sense, lemma), null if unmatched.</summary>
    string? MatchDimension,
    /// <summary>Match priority level within the dimension, null if unmatched.</summary>
    int? MatchPriority,
    /// <summary>Rendering status against the tracked project.</summary>
    TermRenderingStatusCode RenderingStatus
);
