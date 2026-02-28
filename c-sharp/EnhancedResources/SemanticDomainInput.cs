namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for retrieving semantic domain hierarchy for a given domain identifier.
///
/// Contract: Section 2.10 (data-contracts.md)
/// Capability: CAP-011 (GetSemanticDomains)
/// </summary>
public record SemanticDomainInput(
    /// <summary>Domain ID to look up.</summary>
    string DomainId,
    /// <summary>Dictionary name for domain source ("SDBG" only for code ranges).</summary>
    string Dictionary,
    /// <summary>Resource ID.</summary>
    string ResourceId
);
