namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Summary statistics for ER-to-BT mapping analysis.
///
/// Contract: Section 3.8 (data-contracts.md)
/// </summary>
public record ErBtMappingSummary(
    /// <summary>Total number of lexical links analyzed.</summary>
    int TotalLinks,
    /// <summary>Number of links that matched a Biblical Term.</summary>
    int MatchedLinks,
    /// <summary>Number of links that did not match any Biblical Term.</summary>
    int UnmatchedLinks
);
