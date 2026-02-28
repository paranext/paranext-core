namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Breadcrumb entry for semantic domain navigation.
///
/// Contract: Section 3.9 (data-contracts.md)
/// Capability: CAP-011 (GetSemanticDomains)
/// </summary>
public record SemanticDomainBreadcrumb(
    /// <summary>Domain ID.</summary>
    string Id,
    /// <summary>Display name for the breadcrumb.</summary>
    string DisplayName
);
