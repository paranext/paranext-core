namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of FindLocalizedGlossesForTerm: localized glosses for a Biblical Term
/// found through reference matching with the ER dictionary data.
///
/// Contract: Section 4.18 FindLocalizedGlossesForTerm (data-contracts.md)
/// Behavior: BHV-111 (IMarbleDataAccess Interface Contract)
/// Invariant: INV-015, INV-C12 (>25% reference overlap threshold)
/// </summary>
public record LocalizedGlossesResult(
    bool Success,
    IEnumerable<string>? Glosses = null,
    ErrorInfo? Error = null
);
