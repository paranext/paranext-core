namespace Paranext.DataProvider.Checks;

/// <summary>
/// Describes which key (e.g., a character in the Characters inventory) to retrieve from which parts
/// of which projects. Because a summarized inventory must be run prior to getting itemized results,
/// this class specifies an inventory summary ID instead of the inventory ID and scripture ranges
/// on a project.
/// <br/>
/// This class must serialize/deserialize to the ItemizedInventoryJobScope type defined in
/// TypeScript.
/// </summary>
internal sealed class ItemizedInventoryJobScope
{
    public string SummarizedInventoryId { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;
}
