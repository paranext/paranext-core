namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the three-dimensional ER-to-Biblical Terms mapping analysis.
///
/// Contract: Section 3.8 (data-contracts.md)
/// Behavior: BHV-404 (three-dimensional matching)
/// Extraction: EXT-019
/// Golden Masters: GM-024, GM-038
/// </summary>
public record ErBtMappingResult(
    /// <summary>Whether the analysis completed successfully.</summary>
    bool Success,
    /// <summary>Per-link mapping results (null if failed).</summary>
    IReadOnlyList<ErBtMapping>? Mappings,
    /// <summary>Summary statistics (null if failed).</summary>
    ErBtMappingSummary? Summary,
    /// <summary>Error information (null if successful).</summary>
    ErrorInfo? Error
);
