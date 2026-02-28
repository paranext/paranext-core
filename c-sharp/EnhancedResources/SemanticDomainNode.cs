namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single node in the semantic domain hierarchy tree.
///
/// Contract: Section 3.9 (data-contracts.md)
/// Capability: CAP-011 (GetSemanticDomains)
/// </summary>
public record SemanticDomainNode(
    /// <summary>Domain ID.</summary>
    string Id,
    /// <summary>Display prefix (e.g., "93.11").</summary>
    string Prefix,
    /// <summary>Localized display name.</summary>
    string DisplayName,
    /// <summary>Domain code range for SDBG (null for SDBH). BHV-309.</summary>
    string? DomainRange,
    /// <summary>Whether this node has sub-domains.</summary>
    bool HasSubDomains,
    /// <summary>Whether this domain has lexicon entries.</summary>
    bool HasEntries,
    /// <summary>Child domain nodes.</summary>
    IReadOnlyList<SemanticDomainNode> Children
);
