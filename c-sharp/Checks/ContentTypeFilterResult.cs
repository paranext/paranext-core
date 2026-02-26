namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication types for content type filter configuration
// Maps to: CAP-013 (shared types)

/// <summary>
/// Content type filter configuration result.
/// </summary>
public record ContentTypeFilterResult
{
    public bool Visible { get; init; }
    public List<ContentTypeOption>? Options { get; init; }
}

/// <summary>
/// Single content type filter option with display label and text type.
/// </summary>
public record ContentTypeOption(string Label, InventoryTextType TextType);
