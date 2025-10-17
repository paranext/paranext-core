namespace Paranext.DataProvider.Checks;

/// <summary>
/// Selector for an inventory option.
/// This class must match the structure of InventoryOptionsSelector defined in platform-scripture.d.ts
/// </summary>
public record InventoryOptionsSelector
{
    public string ProjectId { get; init; } = string.Empty;
    public string InventoryId { get; init; } = string.Empty;
    public string? OptionName { get; init; }
};
