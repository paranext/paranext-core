namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Reference to an encyclopedia article linked from a dictionary entry.
/// Source: CAP-007, data-contracts.md Section 3.7
/// </summary>
public record EncyclopediaLinkRef(string ArticleId, string Title);
