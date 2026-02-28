namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Semantic domain hierarchy result for tree rendering in the domain viewer.
///
/// Contract: Section 3.9 (data-contracts.md)
/// Capability: CAP-011 (GetSemanticDomains)
/// </summary>
public record SemanticDomainResult(
    /// <summary>Whether the operation succeeded.</summary>
    bool Success,
    /// <summary>Root domain node (null on failure).</summary>
    SemanticDomainNode? RootDomain,
    /// <summary>Breadcrumb trail from root to current domain (null on failure).</summary>
    IReadOnlyList<SemanticDomainBreadcrumb>? Breadcrumbs,
    /// <summary>Error information (null on success).</summary>
    ErrorInfo? Error
);
