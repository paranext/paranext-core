namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a summarized inventory for a given inventory ID, including counts of items found.
/// <br/>
/// This class must serialize/deserialize to the SummarizedInventory type defined in TypeScript.
/// </summary>
internal sealed class SummarizedInventory
{
    public string SummarizedInventoryId { get; init; } = Guid.NewGuid().ToString();
    public string InventoryId { get; set; } = string.Empty;
    public string ProjectId { get; set; } = string.Empty;
    public List<SummarizedInventoryItemList> InventoryCountLists { get; set; } = [];
}
