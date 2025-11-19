namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents an item in a summarized inventory, including the number of times the item occurs.
/// <br/>
/// This class must serialize/deserialize to the SummarizedInventoryItem type defined in TypeScript.
/// </summary>
internal sealed class SummarizedInventoryItem(string key, int count)
{
    public string Key { get; init; } = key;
    public int Count { get; init; } = count;
}
