using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a list of summarized inventory items for a given text type. A set of these lists
/// represents the full summarized inventory for a project.
/// <br/>
/// This class must serialize/deserialize to the SummarizedInventoryItemList type defined in
/// TypeScript.
/// </summary>
internal sealed class SummarizedInventoryItemList(InventoryTextType textType)
{
    public InventoryTextType TextType { get; init; } = textType;
    public List<SummarizedInventoryItem> Items { get; init; } = [];
}
