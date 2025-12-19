using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Selector for an inventory item status.
/// This class corresponds to the InventoryItemStatusSelector type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal sealed class InventoryItemStatusSelector
{
    public string ProjectId { get; set; } = string.Empty;
    public string InventoryId { get; set; } = string.Empty;
    public InventoryTextType? TextType { get; set; }
    public string? Key { get; set; }
};
